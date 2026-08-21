import { GoogleGenAI } from '@google/genai';
import { db } from './db';
import { AIKnowledgeDoc } from '../src/types';

export interface RAGContextResult {
  relevantDocs: {
    title: string;
    source: string;
    category: string;
    snippet: string;
  }[];
  contextText: string;
}

export class SmartCareAIEngine {
  private static geminiClient: GoogleGenAI | null = null;

  private static getClient(): GoogleGenAI | null {
    if (!this.geminiClient && process.env.GEMINI_API_KEY) {
      this.geminiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return this.geminiClient;
  }

  /**
   * Search knowledge base documents relevant to user prompt
   */
  public static retrieveContext(query: string): RAGContextResult {
    const queryLower = query.toLowerCase();
    const queryTokens = queryLower.split(/\s+/).filter(t => t.length > 2);

    const scoredDocs = db.knowledgeDocs
      .filter(doc => doc.status === 'ACTIVE')
      .map(doc => {
        let score = 0;
        const text = (doc.title + ' ' + doc.content + ' ' + doc.tags.join(' ')).toLowerCase();

        for (const token of queryTokens) {
          if (text.includes(token)) score += 2;
          if (doc.title.toLowerCase().includes(token)) score += 5;
          if (doc.tags.some(tag => tag.toLowerCase().includes(token))) score += 4;
        }

        return { doc, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    // If query is broad, take top 2 docs by default
    const selected = (scoredDocs.length > 0 ? scoredDocs.slice(0, 3) : db.knowledgeDocs.slice(0, 2)).map(s => s.doc ? s.doc : s as unknown as AIKnowledgeDoc);

    const relevantDocs = selected.map(doc => ({
      title: doc.title,
      source: doc.source,
      category: doc.category,
      snippet: doc.content.substring(0, 350) + (doc.content.length > 350 ? '...' : '')
    }));

    const contextText = selected.map(doc => `--- SOURCE: ${doc.title} (${doc.source}) ---\n${doc.content}`).join('\n\n');

    return { relevantDocs, contextText };
  }

  /**
   * Generate an evidence-grounded, medical-safety-compliant answer
   */
  public static async answerQuestion(
    prompt: string,
    language: 'en' | 'hi' | 'mr' = 'en',
    patientContextSummary?: string
  ): Promise<{ text: string; references: { title: string; source: string; snippet?: string }[] }> {
    const { relevantDocs, contextText } = this.retrieveContext(prompt);

    const langInstruction =
      language === 'hi'
        ? 'Respond primarily in clear, empathetic, and respectful Hindi (Devanagari script), keeping medical vaccine names (like BCG, OPV, Pentavalent) recognizable in Hindi/English.'
        : language === 'mr'
        ? 'Respond primarily in clear, helpful Marathi (Devanagari script), keeping vaccine abbreviations and standard medical terms understandable.'
        : 'Respond in clear, reassuring, and concise English.';

    const systemInstruction = `You are SmartCare AI, an evidence-based vaccination and medicine healthcare assistant for families in India.

CRITICAL SAFETY & MEDICAL GUARDRAILS:
1. Always prioritize authoritative Indian public health guidelines (Universal Immunization Programme - UIP, IAP, WHO, Ministry of Health & Family Welfare).
2. DO NOT diagnose diseases, prescribe new prescription medications, or alter doctor-directed dosages.
3. For acute severe symptoms (high fever >102°F/39°C, breathing difficulty, seizures, severe allergic reaction, lethargy), urge the user to seek immediate hospital emergency care or call 108 immediately.
4. Provide structured, reassuring, easy-to-read bullet points.
5. Highlight that standard childhood vaccines (BCG, OPV, Hep B, Pentavalent, Rotavirus, fIPV, PCV, MR, DPT, Td) are provided free of cost at all Government Primary Health Centers (PHCs) and Community Health Centers across India.
6. Include a brief concluding reminder: "This information is for guidance and does not replace the clinical judgment of a qualified pediatrician or medical professional."

LANGUAGE PREFERENCE:
${langInstruction}

TRUSTED KNOWLEDGE BASE CONTEXT (RAG):
${contextText}

${patientContextSummary ? `CURRENT PATIENT CONTEXT:\n${patientContextSummary}` : ''}
`;

    const client = this.getClient();

    if (client) {
      try {
        const response = await client.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.3,
          },
        });

        const replyText = response.text || '';
        if (replyText.trim()) {
          return {
            text: replyText,
            references: relevantDocs
          };
        }
      } catch (err) {
        console.error('Error invoking Gemini API, falling back to trusted knowledge synthesizer:', err);
      }
    }

    // Fallback Knowledge Synthesizer (Ensures 100% reliability even if API key is missing during initial local load)
    const fallbackReply = this.generateFallbackAnswer(prompt, relevantDocs, language);
    return {
      text: fallbackReply,
      references: relevantDocs
    };
  }

  private static generateFallbackAnswer(
    query: string,
    docs: { title: string; source: string; snippet: string }[],
    language: 'en' | 'hi' | 'mr'
  ): string {
    const q = query.toLowerCase();

    if (language === 'hi') {
      if (q.includes('बुखार') || q.includes('fever') || q.includes('साइड इफेक्ट') || q.includes('side effect')) {
        return `टीकाकरण के बाद हल्का बुखार और सूजन सामान्य है:\n\n• **सामान्य प्रतिक्रियाएं**: पेंटावेलेंट या डीपीटी के बाद 24-48 घंटों के लिए हल्का बुखार (99°-100.5°F) या लगाने के स्थान पर हल्की लाली हो सकती है।\n• **घरेलू देखभाल**: यदि डॉक्टर ने पैरासिटामोल ड्रॉप्स लिखी हैं, तो वजन के अनुसार दें। कपड़े हल्के रखें और पर्याप्त स्तनपान/तरल पदार्थ दें।\n• **सावधानी**: शिशु को कभी भी एस्पिरिन न दें। यदि बुखार 102°F से अधिक हो या बच्चा लगातार 3 घंटे से अधिक रोए, तो तुरंत डॉक्टर से संपर्क करें।\n\n*यह जानकारी केवल मार्गदर्शन के लिए है और डॉक्टर के परामर्श का विकल्प नहीं है।*`;
      }
      if (q.includes('छूट') || q.includes('miss') || q.includes('उम्र') || q.includes('age')) {
        return `यदि कोई टीका छूट गया है, तो राष्ट्रीय टीकाकरण कार्यक्रम (UIP) के अनुसार:\n\n• **नया चक्र शुरू न करें**: शुरू से सभी टीके दोबारा लगाने की आवश्यकता नहीं होती।\n• **जल्द से जल्द लगवाएं**: जो टीका छूटा है, उसे नजदीकी सरकारी प्राथमिक स्वास्थ्य केंद्र (PHC) या अस्पताल में तुरंत लगवाएं।\n• **न्यूनतम अंतर**: लगातार खुराकों के बीच कम से कम 4 सप्ताह का अंतर आवश्यक है।\n\n*कृपया बच्चे के स्वास्थ्य की जांच हेतु नजदीकी स्वास्थ्य केंद्र के डॉक्टर से मिलें।*`;
      }
      return `राष्ट्रीय टीकाकरण कार्यक्रम (UIP भारत) के तहत सभी आवश्यक टीके सरकारी केंद्रों (PHC/CHC) पर निःशुल्क उपलब्ध हैं।\n\n• जन्म पर: बीसीजी (BCG), ओपीवी-0 (OPV-0), हेपेटाइटिस बी-0\n• 6, 10, 14 सप्ताह पर: पेंटावेलेंट (1, 2, 3), रोटावायरस, ओरल पोलियो, fIPV और पीसीवी (PCV)\n• 9-12 महीने: खसरा-रूबेला-1 (MR-1), पीसीवी बूस्टर और विटामिन ए\n• 16-24 महीने: एमआर-2, डीपीटी बूस्टर-1\n\n*कृपया व्यक्तिगत खुराक विवरण के लिए अपना टीकाकरण कार्ड देखें या डॉक्टर से परामर्श लें।*`;
    }

    if (language === 'mr') {
      return `राष्ट्रीय लसीकरण कार्यक्रम (UIP भारत) अंतर्गत सर्व प्रमुख लसी शासकीय प्राथमिक आरोग्य केंद्रांमध्ये (PHC) मोफत दिल्या जातात.\n\n• **चुकलेला डोस**: जर लस चुकली असेल तर सर्व लसी पुन्हा सुरु करण्याची गरज नसते. फक्त चुकलेली लस लवकरात लवकर द्यावी.\n• **लसीनंतरचा ताप**: पेंटाव्हॅलेंट किंवा डीपीटी नंतर हलका ताप येणे सामान्य आहे. डॉक्टरांच्या सल्ल्यानुसार पॅरासिटामॉल ड्रॉप्स द्याव्यात.\n• **मोफत सुविधा**: जवळचे शासकीय प्राथमिक आरोग्य केंद्र किंवा जिल्हा रुग्णालयात संपर्क साधावा.\n\n*ही माहिती मार्गदर्शनासाठी आहे. अचूक माहितीसाठी बालरोगतज्ज्ञ किंवा डॉक्टरांचा सल्ला घ्यावा.*`;
    }

    // Default English fallback
    if (q.includes('fever') || q.includes('side effect') || q.includes('paracetamol')) {
      return `Mild post-vaccination reactions are a normal indication that the immune system is actively responding:\n\n• **Common Expected Reactions**: Low-grade fever (99°-100.4°F) and mild tenderness at the thigh/arm injection site are common after Pentavalent and DPT. These typically subside within 24 to 48 hours.\n• **Comfort Measures**: Apply a clean, cool damp cloth over the injection site. If prescribed by your pediatrician, pediatric Paracetamol drops may be administered based on the baby's exact weight. Never give Aspirin to infants.\n• **When to Seek Immediate Care**: Contact a doctor immediately if fever exceeds 39°C (102.2°F), if there is difficulty breathing, persistent high-pitched crying for over 3 hours, or extreme lethargy.\n\n*Disclaimer: This information is for educational guidance and does not replace professional medical diagnosis or pediatric consultation.*`;
    }

    if (q.includes('miss') || q.includes('catch') || q.includes('late') || q.includes('delayed')) {
      return `According to Indian Academy of Pediatrics (IAP) and National Immunization Guidelines for missed doses:\n\n• **Do Not Restart the Series**: There is no need to repeat earlier successfully completed doses.\n• **Administer Next Dose Promptly**: Simply schedule and receive the overdue dose as soon as possible.\n• **Minimum Intervals**: Ensure a minimum 4-week interval between consecutive multidose vaccines (e.g. Pentavalent doses).\n• **All UIP Vaccines Free**: All primary vaccines can be caught up at your local Government Primary Health Center (PHC).\n\n*Please consult your pediatrician or local PHC medical officer to finalize the catch-up timeline.*`;
    }

    return `Under India's Universal Immunization Programme (UIP), all essential childhood vaccinations are provided free of cost at Government Primary Health Centers (PHCs), CHCs, and Sub-district Hospitals:\n\n• **Birth**: BCG (Left Arm), Oral Polio (OPV-0), Hepatitis B (Birth dose within 24h).\n• **6, 10 & 14 Weeks**: Pentavalent 1-3 (5-in-1 combo), Rotavirus drops, OPV 1-3, fIPV, and Pneumococcal (PCV 1-2).\n• **9-12 Months**: Measles-Rubella (MR-1), PCV Booster, Vitamin A oral dose.\n• **16-24 Months**: MR-2, DPT Booster-1, OPV Booster.\n• **5 Years & 10/16 Years**: 5-Year DPT Booster-2 and Adolescent Td (Tetanus & adult Diphtheria).\n\n*Always verify child health records with your healthcare provider.*`;
  }
}
