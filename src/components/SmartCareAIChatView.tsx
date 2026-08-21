import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  BookOpen,
  AlertCircle,
  User as UserIcon,
  RefreshCw,
  Info
} from 'lucide-react';
import {
  Language,
  PatientProfile,
  ChatMessage
} from '../types';
import { translations } from '../services/i18n';

interface SmartCareAIChatViewProps {
  language: Language;
  patient: PatientProfile | null;
  patientAge: string;
  initialPrompt?: string;
}

export const SmartCareAIChatView: React.FC<SmartCareAIChatViewProps> = ({
  language,
  patient,
  patientAge,
  initialPrompt,
}) => {
  const t = translations[language];
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'ASSISTANT',
      text: language === 'hi'
        ? `नमस्ते! मैं स्मार्टकेयर टीकाकरण एवं स्वास्थ्य सहायक हूँ। ${patient ? `${patient.name} (उम्र: ${patientAge}) के ` : ''}टीकों, छूटे हुए डोज़, दवाओं के नियम या नजदीकी केंद्रों के बारे में कोई भी प्रश्न पूछें।`
        : language === 'mr'
        ? `नमस्कार! मी स्मार्टकेअर लसीकरण व आरोग्य सहाय्यक आहे. ${patient ? `${patient.name} (वय: ${patientAge}) यांच्या ` : ''}लसी, चुकलेले डोस किंवा औषधांबद्दल काहीही विचारा.`
        : `Hello! I am your SmartCare Immunization & Health Assistant. Ask me anything regarding ${patient ? `${patient.name}'s (${patientAge}) ` : ''}vaccines, catch-up schedules, side effects, medicine timings, or nearby PHCs.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      references: ['UIP India National Guidelines', 'WHO Vaccine Safety Standards']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (initialPrompt) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text.trim(),
          language,
          patientId: patient?.id
        })
      });

      const data = await res.json();

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'ASSISTANT',
        text: data.text || 'Thank you for your question. Please consult your local PHC medical officer.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        references: data.references || ['UIP Guidelines']
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('AI chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'ASSISTANT',
          text: 'SmartCare AI is temporarily unable to connect. Please check your network and retry in a few moments.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          references: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleTextToSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported by your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown asterisks
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[700px]">
      
      {/* Chat Header */}
      <div className="bg-white text-slate-900 p-5 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-bold text-base sm:text-lg text-slate-900">{t.ai.title}</h2>
              <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-100">
                Grounded Clinical AI
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {t.ai.subtitle} {patient ? `• Active: ${patient.name} (${patientAge})` : ''}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (window.speechSynthesis) window.speechSynthesis.cancel();
            setIsSpeaking(false);
            setMessages([messages[0]]);
          }}
          className="text-xs text-gray-500 hover:text-slate-900 flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 transition font-medium"
          title="Reset conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Suggested Question Chips */}
      <div className="bg-gray-50/70 p-3 border-b border-gray-200 overflow-x-auto flex items-center gap-2 text-xs">
        <span className="text-gray-500 font-semibold whitespace-nowrap pl-1 flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Quick Ask:</span>
        </span>
        {t.ai.suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="bg-white hover:bg-blue-50/70 hover:border-blue-200 text-slate-700 hover:text-blue-700 border border-gray-200 px-3.5 py-1.5 rounded-full whitespace-nowrap transition font-medium text-left shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50/40">
        {messages.map((msg) => {
          const isBot = msg.sender === 'ASSISTANT';
          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  isBot ? 'bg-blue-600 text-white' : 'bg-slate-800 text-white'
                }`}
              >
                {isBot ? <Bot className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className="max-w-[85%] sm:max-w-[75%] space-y-1.5">
                <div
                  className={`p-4 rounded-xl text-sm leading-relaxed ${
                    isBot
                      ? 'bg-white text-slate-900 border border-gray-200 shadow-xs rounded-tl-none'
                      : 'bg-blue-600 text-white rounded-tr-none shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* RAG Reference tags if bot */}
                  {isBot && msg.references && msg.references.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600 mr-0.5" />
                      <span className="font-semibold text-slate-700">Verified Sources:</span>
                      {msg.references.map((ref, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium border border-blue-100"
                        >
                          {ref}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className={`flex items-center space-x-2 text-[11px] text-gray-400 px-1 ${isBot ? '' : 'justify-end'}`}>
                  <span>{msg.timestamp}</span>
                  {isBot && (
                    <button
                      onClick={() => handleTextToSpeech(msg.text)}
                      className="hover:text-blue-700 text-gray-400 flex items-center space-x-1 font-medium"
                      title="Listen with Text to Speech"
                    >
                      {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-red-500" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs rounded-tl-none flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></div>
              <span className="ml-2 font-medium">SmartCare Assistant is checking verified clinical rules...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form & Medical Disclaimer */}
      <div className="p-4 bg-white border-t border-gray-200 space-y-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder={t.ai.inputPlaceholder}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
            className="flex-1 text-sm px-4 py-2.5 bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-slate-800"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 text-white px-5 py-2.5 rounded-full font-semibold text-sm flex items-center space-x-1.5 shadow-xs transition"
          >
            <span>{t.common.send}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center space-x-1.5 text-[11px] text-gray-400 px-1">
          <Info className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{t.ai.disclaimer}</span>
        </div>
      </div>
    </div>
  );
};
