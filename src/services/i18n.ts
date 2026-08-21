import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  nav: {
    dashboard: string;
    vaccinations: string;
    medicines: string;
    digitalCard: string;
    centers: string;
    aiAssistant: string;
    campaigns: string;
    notifications: string;
    growth: string;
    admin: string;
    profiles: string;
  };
  common: {
    save: string;
    cancel: string;
    add: string;
    edit: string;
    delete: string;
    view: string;
    close: string;
    status: string;
    actions: string;
    search: string;
    filter: string;
    all: string;
    loading: string;
    date: string;
    time: string;
    dose: string;
    age: string;
    hospital: string;
    notes: string;
    print: string;
    download: string;
    share: string;
    call: string;
    directions: string;
    free: string;
    paid: string;
    emergencyDisclaimer: string;
    language: string;
  };
  statuses: {
    completed: string;
    due: string;
    upcoming: string;
    missed: string;
    taken: string;
    skipped: string;
    pending: string;
  };
  dashboard: {
    welcome: string;
    familySchedule: string;
    vaccinationScore: string;
    scoreSubtitle: string;
    nextVaccination: string;
    dueVaccinations: string;
    missedVaccinations: string;
    todaysMedicines: string;
    markTaken: string;
    alreadyTaken: string;
    nearbyCenters: string;
    askAiTitle: string;
    askAiSubtitle: string;
    viewFullSchedule: string;
    viewAllMedicines: string;
    viewMap: string;
    fivePillarsTitle: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    benefit4: string;
    benefit5: string;
  };
  vaccines: {
    title: string;
    subtitle: string;
    nationalScheduleBadge: string;
    recordCompletion: string;
    markAsCompleted: string;
    expectedDate: string;
    completedOn: string;
    batchNumber: string;
    administeredCenter: string;
    doctorName: string;
    routeSite: string;
    diseaseTarget: string;
    catchUpAdvice: string;
    filterAll: string;
    filterCompleted: string;
    filterDue: string;
    filterUpcoming: string;
    filterMissed: string;
    noVaccinesFound: string;
  };
  medicines: {
    title: string;
    subtitle: string;
    addMedicine: string;
    medicineName: string;
    dosage: string;
    frequency: string;
    reminderTime: string;
    timing: string;
    beforeFood: string;
    afterFood: string;
    withFood: string;
    emptyStomach: string;
    noRestriction: string;
    instructions: string;
    activeMedicines: string;
    todaySchedule: string;
    adherenceHistory: string;
    noMedicines: string;
  };
  card: {
    title: string;
    subtitle: string;
    patientDetails: string;
    dob: string;
    gender: string;
    bloodGroup: string;
    parentGuardian: string;
    verificationId: string;
    scanToVerify: string;
    officialDisclaimer: string;
    completedDoses: string;
    nextRecommended: string;
  };
  centers: {
    title: string;
    subtitle: string;
    useMyLocation: string;
    searchPlaceholder: string;
    filterType: string;
    govtPhc: string;
    govtHospital: string;
    privateHospital: string;
    clinic: string;
    camp: string;
    availableVaccines: string;
    timings: string;
    distance: string;
    noCentersFound: string;
  };
  ai: {
    title: string;
    subtitle: string;
    placeholder: string;
    disclaimer: string;
    suggestedQuestions: string[];
    send: string;
    thinking: string;
    sourcesConsulted: string;
  };
  growth: {
    title: string;
    subtitle: string;
    logMeasurement: string;
    weightForAge: string;
    heightForAge: string;
    bmiForAge: string;
    headCircumference: string;
    whoStandards: string;
    milestonesTracker: string;
    milestoneStatus: string;
    achieved: string;
    inProgress: string;
    notYet: string;
    normalTrack: string;
    underweightAlert: string;
    overweightAlert: string;
    stuntingAlert: string;
    growthVelocity: string;
    pediatricianAdvice: string;
    historyLogs: string;
    noGrowthLogs: string;


  };
  


  campaigns: {
    title: string;
    subtitle: string;
  };

  notifications: {
    title: string;
    subtitle: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'SmartCare Vaccination & Medicine System',
    tagline: 'Never miss a vaccine dose or daily medicine schedule',
    nav: {
      dashboard: 'Dashboard',
      vaccinations: 'Vaccinations',
      medicines: 'Medicines',
      growth: 'Growth Tracking',
      digitalCard: 'Digital Card',
      centers: 'Nearby Centers',
      aiAssistant: 'SmartCare AI',
      campaigns: 'Area Campaigns',
      notifications: 'Reminders & Logs',
      admin: 'Admin Portal',
      profiles: 'Family Profiles',
    },
    common: {
      save: 'Save',
      cancel: 'Cancel',
      add: 'Add New',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      close: 'Close',
      status: 'Status',
      actions: 'Actions',
      search: 'Search...',
      filter: 'Filter',
      all: 'All',
      loading: 'Loading data...',
      date: 'Date',
      time: 'Time',
      dose: 'Dose',
      age: 'Age',
      hospital: 'Hospital / Center',
      notes: 'Notes & Remarks',
      print: 'Print Card',
      download: 'Download QR Card',
      share: 'Share Link',
      call: 'Call Center',
      directions: 'Get Directions',
      free: 'Free (Govt)',
      paid: 'Private',
      emergencyDisclaimer: 'Medical Emergency? Please call 108 or visit the nearest emergency room immediately.',
      language: 'Language',
    },
    statuses: {
      completed: 'Completed',
      due: 'Due Now',
      upcoming: 'Upcoming',
      missed: 'Missed Dose',
      taken: 'Taken',
      skipped: 'Skipped',
      pending: 'Pending',
    },
    dashboard: {
      welcome: 'Welcome',
      familySchedule: "Family's Healthcare & Vaccination Plan",
      vaccinationScore: 'Vaccination Score',
      scoreSubtitle: 'doses completed of total required',
      nextVaccination: 'Next Upcoming Vaccination',
      dueVaccinations: 'Vaccines Due Now',
      missedVaccinations: 'Missed Vaccine Alerts',
      todaysMedicines: "Today's Medicine Schedule",
      markTaken: 'Mark as Taken',
      alreadyTaken: 'Taken',
      nearbyCenters: 'Nearby Vaccination Centers',
      askAiTitle: 'SmartCare AI Health Assistant',
      askAiSubtitle: 'Have a question about vaccines, doses, or side effects?',
      viewFullSchedule: 'View Full Schedule',
      viewAllMedicines: 'Manage Medicines',
      viewMap: 'View Center Locator',
      fivePillarsTitle: '5 Key Health Safeguards',
      benefit1: '1. Never Miss a Vaccination',
      benefit2: '2. Never Forget Daily Medicines',
      benefit3: '3. Digital QR-Verifiable Vaccination Card',
      benefit4: '4. Locate Free Govt PHCs & Centers',
      benefit5: '5. Certified Clinical Health Guidance',
    },
    vaccines: {
      title: 'Personalized Vaccination Schedule',
      subtitle: 'Universal Immunization Programme (UIP India) & IAP Guidelines',
      nationalScheduleBadge: 'National UIP Schedule (Free at Govt Centers)',
      recordCompletion: 'Record Vaccination Given',
      markAsCompleted: 'Mark as Completed',
      expectedDate: 'Recommended Expected Date',
      completedOn: 'Administered On',
      batchNumber: 'Vaccine Batch Number',
      administeredCenter: 'Healthcare Center / Hospital',
      doctorName: 'Administered By (Doctor/Nurse)',
      routeSite: 'Route & Injection Site',
      diseaseTarget: 'Protects Against',
      catchUpAdvice: 'Catch-up Recommendation',
      filterAll: 'All Doses',
      filterCompleted: 'Completed',
      filterDue: 'Due Now',
      filterUpcoming: 'Upcoming',
      filterMissed: 'Missed Doses',
      noVaccinesFound: 'No vaccination records found for this filter.',
    },
    medicines: {
      title: 'Daily Medicine Reminders',
      subtitle: 'Track prescriptions, dosages, timing, and daily adherence',
      addMedicine: 'Add Medicine',
      medicineName: 'Medicine Name (e.g. Paracetamol)',
      dosage: 'Dosage (e.g. 500mg, 1 tablet, 5ml)',
      frequency: 'Frequency',
      reminderTime: 'Reminder Time(s)',
      timing: 'Food Timing',
      beforeFood: 'Before Food (Empty stomach / 30m prior)',
      afterFood: 'After Food (Post meal)',
      withFood: 'With Food (During meal)',
      emptyStomach: 'Empty Stomach (Early morning)',
      noRestriction: 'Anytime / No food restriction',
      instructions: 'Doctor Instructions / Notes',
      activeMedicines: 'Active Prescriptions',
      todaySchedule: "Today's Time Slots",
      adherenceHistory: 'Adherence Log',
      noMedicines: 'No active medicines currently added.',
    },
    card: {
      title: 'Digital Vaccination Record Card',
      subtitle: 'Official-format digital record with secure verification QR code',
      patientDetails: 'Patient Information',
      dob: 'Date of Birth',
      gender: 'Gender',
      bloodGroup: 'Blood Group',
      parentGuardian: 'Parent / Guardian',
      verificationId: 'Digital Verification ID',
      scanToVerify: 'Scan QR to verify authentic vaccination record',
      officialDisclaimer: 'This digital record is generated from user-verified healthcare entries. Please carry physical immunization cards for official immigration or passport requirements.',
      completedDoses: 'Completed Immunizations',
      nextRecommended: 'Next Recommended Dose',
    },
    centers: {
      title: 'Vaccination Centers & Camps',
      subtitle: 'Find Government PHCs, District Hospitals, and Vaccination Camps',
      useMyLocation: 'Use My Current Location',
      searchPlaceholder: 'Search by city, center name, or vaccine...',
      filterType: 'Filter by Facility Type',
      govtPhc: 'Govt Primary Health Center (PHC)',
      govtHospital: 'Govt Hospital / CHC',
      privateHospital: 'Private Hospital',
      clinic: 'Pediatric Clinic',
      camp: 'Special Immunization Camp',
      availableVaccines: 'Available Vaccines',
      timings: 'Operating Timings',
      distance: 'Distance',
      noCentersFound: 'No centers found matching your search criteria.',
    },
    ai: {
      title: 'SmartCare AI Assistant',
      subtitle: 'Evidence-based vaccination & medicine assistant with RAG validation',
      placeholder: 'Ask about vaccination schedules, mild side-effects, or medicine timing...',
      disclaimer: 'SmartCare AI provides general public health information. It is not a diagnostic tool and does not replace consultation with a qualified doctor.',
      suggestedQuestions: [
        'What vaccines are due at 6 weeks for my baby?',
        'What should I do if a vaccine dose was missed by 2 months?',
        'Is mild fever normal after the Pentavalent vaccine?',
        'Can Paracetamol be given after food for teething or fever?',
        'Where can I get the free BCG and OPV vaccine in India?',
      ],
      send: 'Ask Assistant',
      thinking: 'Analyzing medical knowledge base...',
      sourcesConsulted: 'Authoritative Sources Consulted:',
    },
    campaigns: {
      title: 'Area Vaccination Campaigns',
      subtitle: 'Track public immunization drives, catch-up campaigns, and community vaccination programs.',
    },
    notifications: {
      title: 'Reminders & Notification Logs',
      subtitle: 'Manage medicine reminders, vaccination alerts, and notification history.',
    },    growth: {
      title: "Child's Growth & Development Tracking",
      subtitle: 'Monitor weight, height, BMI percentiles and developmental milestones based on WHO standards',
      logMeasurement: 'Log New Growth Measurement',
      weightForAge: 'Weight-for-Age (WHO Percentile)',
      heightForAge: 'Height-for-Age (WHO Percentile)',
      bmiForAge: 'BMI & Body Mass Index',
      headCircumference: 'Head Circumference',
      whoStandards: 'WHO Global Growth Reference (Median & ±2 SD Bands)',
      milestonesTracker: 'Developmental Milestones Tracker',
      milestoneStatus: 'Milestone Progress',
      achieved: 'Achieved',
      inProgress: 'In Progress',
      notYet: 'Not Started',
      normalTrack: 'Healthy Growth Trajectory (Within WHO P15-P85)',
      underweightAlert: 'Weight Below Standard Range (Consult Pediatrician)',
      overweightAlert: 'Weight Above Recommended Standard',
      stuntingAlert: 'Height Growth Slowdown Detected',
      growthVelocity: 'Growth Velocity Rate',
      pediatricianAdvice: 'Clinical Growth Guidance',
      historyLogs: 'Historical Growth Records',
      noGrowthLogs: 'No growth measurements logged yet. Click below to add the first entry.',
    },
  },
  hi: {
    appName: 'स्मार्टकेयर टीकाकरण व दवा रिमाइंडर',
    tagline: 'टीकाकरण और दैनिक दवाओं का सही समय पर अनुस्मारक',
    nav: {
      dashboard: 'डैशबोर्ड',
      vaccinations: 'टीकाकरण सूची',
      medicines: 'दवाइयां',
      growth: 'विकास व वृद्धि ट्रैकिंग',
      digitalCard: 'डिजिटल कार्ड',
      centers: 'नजदीकी केंद्र',
      aiAssistant: 'स्मार्टकेयर AI',
      campaigns: 'क्षेत्रीय अभियान',
      notifications: 'रिमाइंडर व लॉग्स',
      admin: 'एडमिन पैनल',
      profiles: 'पारिवारिक प्रोफाइल',
    },
    common: {
      save: 'सुरक्षित करें',
      cancel: 'रद्द करें',
      add: 'नया जोड़ें',
      edit: 'संशोधित करें',
      delete: 'हटाएं',
      view: 'देखें',
      close: 'बंद करें',
      status: 'स्थिति',
      actions: 'क्रियाएँ',
      search: 'खोजें...',
      filter: 'फ़िल्टर',
      all: 'सभी',
      loading: 'डेटा लोड हो रहा है...',
      date: 'तारीख',
      time: 'समय',
      dose: 'खुराक',
      age: 'उम्र',
      hospital: 'अस्पताल / केंद्र',
      notes: 'टिप्पणी व विवरण',
      print: 'प्रिंट कार्ड',
      download: 'QR कार्ड डाउनलोड',
      share: 'शेयर लिंक',
      call: 'कॉल करें',
      directions: 'रास्ता देखें',
      free: 'निःशुल्क (सरकारी)',
      paid: 'निजी (प्राइवेट)',
      emergencyDisclaimer: 'आपातकालीन स्थिति? कृपया तुरंत 108 पर कॉल करें या नजदीकी अस्पताल जाएं।',
      language: 'भाषा',
    },
    statuses: {
      completed: 'पूर्ण हुआ (Completed)',
      due: 'आज देय (Due Now)',
      upcoming: 'आगामी (Upcoming)',
      missed: 'छूटा हुआ (Missed)',
      taken: 'ली गई',
      skipped: 'छोड़ी गई',
      pending: 'लंबित',
    },
    dashboard: {
      welcome: 'स्वागत है',
      familySchedule: 'परिवार का स्वास्थ्य व टीकाकरण कार्यक्रम',
      vaccinationScore: 'टीकाकरण स्कोर',
      scoreSubtitle: 'कुल आवश्यक में से पूर्ण खुराकें',
      nextVaccination: 'अगला आने वाला टीका',
      dueVaccinations: 'वर्तमान देय टीके',
      missedVaccinations: 'छूटे हुए टीकों की चेतावनी',
      todaysMedicines: 'आज की दवाओं की समय-सारिणी',
      markTaken: 'ली गई के रूप में चिन्हित करें',
      alreadyTaken: 'ली जा चुकी है',
      nearbyCenters: 'नजदीकी टीकाकरण केंद्र',
      askAiTitle: 'स्मार्टकेयर AI स्वास्थ्य सहायक',
      askAiSubtitle: 'टीकों, खुराक या दवा के बारे में कोई प्रश्न पूछें',
      viewFullSchedule: 'पूरी टीकाकरण सूची देखें',
      viewAllMedicines: 'दवाइयां प्रबंधित करें',
      viewMap: 'केंद्र खोजक देखें',
      fivePillarsTitle: '5 मुख्य स्वास्थ्य सुरक्षा स्तंभ',
      benefit1: '1. कभी न भूलें कोई टीका',
      benefit2: '2. दैनिक दवाओं का सटीक रिमाइंडर',
      benefit3: '3. डिजिटल व QR प्रमाणित टीकाकरण कार्ड',
      benefit4: '4. नजदीकी सरकारी प्राथमिक स्वास्थ्य केंद्र खोजें',
      benefit5: '5. प्रमाणित स्वास्थ्य व टीकाकरण मार्गदर्शन',
    },
    vaccines: {
      title: 'व्यक्तिगत टीकाकरण सारिणी',
      subtitle: 'राष्ट्रीय टीकाकरण कार्यक्रम (UIP भारत) व IAP दिशानिर्देश',
      nationalScheduleBadge: 'राष्ट्रीय कार्यक्रम (सरकारी केंद्रों पर निःशुल्क)',
      recordCompletion: 'टीका लगाने की प्रविष्टि करें',
      markAsCompleted: 'पूर्ण चिन्हित करें',
      expectedDate: 'अनुशंसित संभावित तिथि',
      completedOn: 'लगवाने की तिथि',
      batchNumber: 'वैक्सीन बैच नंबर',
      administeredCenter: 'स्वास्थ्य केंद्र / अस्पताल',
      doctorName: 'लगाने वाले डॉक्टर/नर्स का नाम',
      routeSite: 'मार्ग व लगाने का स्थान',
      diseaseTarget: 'किस बीमारी से बचाव',
      catchUpAdvice: 'छूटे हुए टीके की सलाह',
      filterAll: 'सभी टीके',
      filterCompleted: 'पूर्ण टीके',
      filterDue: 'देय टीके',
      filterUpcoming: 'आगामी टीके',
      filterMissed: 'छूटे हुए टीके',
      noVaccinesFound: 'इस फ़िल्टर के लिए कोई रिकॉर्ड नहीं मिला।',
    },
    medicines: {
      title: 'दैनिक दवा रिमाइंडर',
      subtitle: 'दवा की खुराक, समय और नियमितता का रिकॉर्ड',
      addMedicine: 'दवा जोड़ें',
      medicineName: 'दवा का नाम (उदा. पेरासिटामोल)',
      dosage: 'खुराक (उदा. 500mg, 1 गोली, 5ml)',
      frequency: 'लेने की आवृत्ति',
      reminderTime: 'रिमाइंडर का समय',
      timing: 'भोजन का समय',
      beforeFood: 'खाने से पहले (खाली पेट / 30 मिनट पहले)',
      afterFood: 'खाने के बाद (भोजन उपरांत)',
      withFood: 'भोजन के साथ',
      emptyStomach: 'सुबह खाली पेट',
      noRestriction: 'कभी भी / कोई पाबंदी नहीं',
      instructions: 'डॉक्टर के निर्देश',
      activeMedicines: 'सक्रिय दवाइयां',
      todaySchedule: 'आज का समय',
      adherenceHistory: 'दवा लेने का इतिहास',
      noMedicines: 'वर्तमान में कोई सक्रिय दवा नहीं जोड़ी गई है।',
    },
    card: {
      title: 'डिजिटल टीकाकरण प्रमाण पत्र कार्ड',
      subtitle: 'सुरक्षित QR कोड सत्यापन के साथ आधिकारिक प्रारूप रिकॉर्ड',
      patientDetails: 'मरीज का विवरण',
      dob: 'जन्म तिथि',
      gender: 'लिंग',
      bloodGroup: 'रक्त समूह (Blood Group)',
      parentGuardian: 'माता/पिता या अभिभावक',
      verificationId: 'डिजिटल सत्यापन आईडी',
      scanToVerify: 'सत्यापन के लिए QR कोड स्कैन करें',
      officialDisclaimer: 'यह रिकॉर्ड उपयोगकर्ता द्वारा दर्ज डेटा पर आधारित है। पासपोर्ट या आव्रजन के लिए मूल अस्पताल कार्ड साथ रखें।',
      completedDoses: 'लगे हुए टीके',
      nextRecommended: 'अगला अनुशंसित टीका',
    },
    centers: {
      title: 'टीकाकरण केंद्र व स्वास्थ्य शिविर',
      subtitle: 'सरकारी प्राथमिक स्वास्थ्य केंद्र (PHC) व जिला अस्पताल खोजें',
      useMyLocation: 'मेरी वर्तमान लोकेशन का उपयोग करें',
      searchPlaceholder: 'शहर, केंद्र या वैक्सीन के नाम से खोजें...',
      filterType: 'केंद्र के प्रकार से फ़िल्टर करें',
      govtPhc: 'सरकारी प्राथमिक स्वास्थ्य केंद्र (PHC)',
      govtHospital: 'सरकारी अस्पताल / CHC',
      privateHospital: 'निजी अस्पताल',
      clinic: 'बच्चों का क्लिनिक',
      camp: 'विशेष टीकाकरण शिविर',
      availableVaccines: 'उपलब्ध टीके',
      timings: 'खुलने का समय',
      distance: 'दूरी',
      noCentersFound: 'खोज के अनुसार कोई केंद्र नहीं मिला।',
    },
    ai: {
      title: 'स्मार्टकेयर AI स्वास्थ्य सहायक',
      subtitle: 'सत्यापित चिकित्सा ज्ञान पर आधारित टीकाकरण व दवा सहायक',
      placeholder: 'टीकाकरण, हल्के साइड-इफेक्ट या दवा के समय के बारे में पूछें...',
      disclaimer: 'स्मार्टकेयर AI केवल सामान्य जन-स्वास्थ्य जानकारी प्रदान करता है। यह डॉक्टर के परामर्श का विकल्प नहीं है।',
      suggestedQuestions: [
        'मेरे बच्चे के लिए 6 सप्ताह पर कौन से टीके लगते हैं?',
        'यदि 2 महीने टीका छूट गया हो तो क्या करें?',
        'क्या पेंटावेलेंट टीके के बाद हल्का बुखार सामान्य है?',
        'पेरासिटामोल दवा खाने के बाद कैसे देनी चाहिए?',
        'भारत में निःशुल्क बीसीजी और पोलियो टीका कहाँ मिलता है?',
      ],
      send: 'पूछें',
      thinking: 'चिकित्सा ज्ञान भंडार की जांच हो रही है...',
      sourcesConsulted: 'विश्वसनीय संदर्भ स्रोत:',
    },
    campaigns: {
      title: 'क्षेत्रीय टीकाकरण अभियान',
      subtitle: 'सार्वजनिक टीकाकरण अभियानों, कैच-अप ड्राइव और सामुदायिक टीकाकरण कार्यक्रमों को ट्रैक करें।',
    },
    notifications: {
      title: 'रिमाइंडर और नोटिफिकेशन लॉग्स',
      subtitle: 'दवा रिमाइंडर, टीकाकरण अलर्ट और नोटिफिकेशन इतिहास प्रबंधित करें।',
    },    growth: {
      title: 'शिशु का विकास व वृद्धि ट्रैकिंग',
      subtitle: 'WHO मानकों के आधार पर वजन, ऊंचाई, बीएमआई और विकास के प्रमुख पड़ावों (Milestones) की निगरानी',
      logMeasurement: 'नया माप दर्ज करें',
      weightForAge: 'उम्र के अनुसार वजन (WHO प्रतिशतक)',
      heightForAge: 'उम्र के अनुसार ऊंचाई (WHO प्रतिशतक)',
      bmiForAge: 'बॉडी मास इंडेक्स (BMI)',
      headCircumference: 'सिर की परिधि (Head Circumference)',
      whoStandards: 'WHO वैश्विक विकास मानक संदर्भ (औसत व ±2 SD बैंड)',
      milestonesTracker: 'विकासात्मक पड़ाव ट्रैकर (Milestones)',
      milestoneStatus: 'पड़ाव की प्रगति',
      achieved: 'प्राप्त किया (Achieved)',
      inProgress: 'प्रगति पर (In Progress)',
      notYet: 'शुरू नहीं हुआ',
      normalTrack: 'स्वस्थ विकास दर (WHO मानक के भीतर)',
      underweightAlert: 'कम वजन चेतावनी (डॉक्टर से परामर्श लें)',
      overweightAlert: 'अधिक वजन की चेतावनी',
      stuntingAlert: 'ऊंचाई वृद्धि में कमी का संकेत',
      growthVelocity: 'विकास की गति दर',
      pediatricianAdvice: 'बाल रोग विशेषज्ञ परामर्श',
      historyLogs: 'वृद्धि माप का इतिहास',
      noGrowthLogs: 'अभी तक कोई माप दर्ज नहीं किया गया है। नया माप जोड़ने के लिए नीचे क्लिक करें।',
    },
  },
  mr: {
    appName: 'स्मार्टकेअर लसिकरण व औषध स्मरण प्रणाली',
    tagline: 'लस आणि दैनंदिन औषधांची वेळ कधीही विसरू नका',
    nav: {
      dashboard: 'डॅशबोर्ड',
      vaccinations: 'लसीकरण वेळापत्रक',
      medicines: 'औषधे',
      growth: 'वाढ व विकास ट्रॅकिंग',
      digitalCard: 'डिजिटल कार्ड',
      centers: 'जवळची केंद्रे',
      aiAssistant: 'स्मार्टकेअर AI',
      campaigns: 'प्रादेशिक मोहिमा',
      notifications: 'स्मरणपत्रे व नोंदी',
      admin: 'प्रशासक कक्ष',
      profiles: 'कौटुंबिक प्रोफाइल',
    },
    common: {
      save: 'जतन करा',
      cancel: 'रद्द करा',
      add: 'नवीन जोडा',
      edit: 'बदल करा',
      delete: 'हटवा',
      view: 'पहा',
      close: 'बंद करा',
      status: 'स्थिती',
      actions: 'कृती',
      search: 'शोधा...',
      filter: 'फिल्टर',
      all: 'सर्व',
      loading: 'माहिती लोड होत आहे...',
      date: 'तारीख',
      time: 'वेळ',
      dose: 'डोस',
      age: 'वय',
      hospital: 'रुग्णालय / केंद्र',
      notes: 'नोंदी व शेरा',
      print: 'कार्ड मुद्रित करा (प्रिंट)',
      download: 'QR कार्ड डाउनलोड',
      share: 'लिंक शेअर करा',
      call: 'कॉल करा',
      directions: 'दिशा दाखवा',
      free: 'मोफत (शासकीय)',
      paid: 'खाजगी',
      emergencyDisclaimer: 'वैद्यकीय आणीबाणी? कृपया तातडीने १०८ वर कॉल करा किंवा जवळच्या रुग्णालयात जा.',
      language: 'भाषा',
    },
    statuses: {
      completed: 'पूर्ण झाले',
      due: 'आज देय आहे',
      upcoming: 'पुढील डोस',
      missed: 'चुकलेला डोस (Missed)',
      taken: 'घेतले',
      skipped: 'वगळले',
      pending: 'प्रलंबित',
    },
    dashboard: {
      welcome: 'स्वागत आहे',
      familySchedule: 'कुटुंबाचे आरोग्य व लसीकरण नियोजन',
      vaccinationScore: 'लसीकरण गुण (Score)',
      scoreSubtitle: 'एकूण आवश्यक पैकी पूर्ण झालेले डोस',
      nextVaccination: 'पुढील येणारी लस',
      dueVaccinations: 'सध्या देय असलेल्या लसी',
      missedVaccinations: 'चुकलेल्या लसींची सूचना',
      todaysMedicines: 'आजचे औषध वेळापत्रक',
      markTaken: 'घेतल्याची नोंद करा',
      alreadyTaken: 'औषध घेतले',
      nearbyCenters: 'जवळची लसीकरण केंद्रे',
      askAiTitle: 'स्मार्टकेअर AI आरोग्य सहाय्यक',
      askAiSubtitle: 'लसीकरण किंवा औषधांबद्दल काही प्रश्न विचारा',
      viewFullSchedule: 'संपूर्ण वेळापत्रक पहा',
      viewAllMedicines: 'औषधांचे व्यवस्थापन',
      viewMap: 'केंद्रांचा नकाशा पहा',
      fivePillarsTitle: '५ प्रमुख आरोग्य सुरक्षा फायदे',
      benefit1: '१. एकही लस कधीही चुकणार नाही',
      benefit2: '२. दैनंदिन औषधांची वेळेवर आठवण',
      benefit3: '३. डिजिटल व QR प्रमाणित लसीकरण कार्ड',
      benefit4: '४. मोफत शासकीय प्राथमिक आरोग्य केंद्र शोधणे',
      benefit5: '५. प्रमाणित आरोग्य व लसीकरण मार्गदर्शन',
    },
    vaccines: {
      title: 'वैयक्तिक लसीकरण वेळापत्रक',
      subtitle: 'राष्ट्रीय लसीकरण कार्यक्रम (UIP भारत) आणि IAP मार्गदर्शक तत्त्वे',
      nationalScheduleBadge: 'राष्ट्रीय कार्यक्रम (शासकीय केंद्रांवर मोफत)',
      recordCompletion: 'लस दिल्याची नोंद करा',
      markAsCompleted: 'पूर्ण म्हणून नोंदवा',
      expectedDate: 'अपेक्षित तारीख',
      completedOn: 'लस दिल्याचा दिनांक',
      batchNumber: 'लस बॅच क्रमांक',
      administeredCenter: 'आरोग्य केंद्र / रुग्णालय',
      doctorName: 'लस देणाऱ्या डॉक्टर/परिचारिकांचे नाव',
      routeSite: 'मार्ग व शरीराचा भाग',
      diseaseTarget: 'कोणत्या आजारापासून संरक्षण',
      catchUpAdvice: 'चुकलेल्या लसीबाबत मार्गदर्शन',
      filterAll: 'सर्व लसी',
      filterCompleted: 'पूर्ण झालेल्या',
      filterDue: 'देय असलेल्या',
      filterUpcoming: 'आगामी लसी',
      filterMissed: 'चुकलेल्या लसी',
      noVaccinesFound: 'या फिल्टरसाठी कोणतीही नोंद आढळली नाही.',
    },
    medicines: {
      title: 'दैनंदिन औषध स्मरण',
      subtitle: 'औषधांचे प्रमाण, वेळ आणि नियमिततेचा मागोवा घ्या',
      addMedicine: 'औषध जोडा',
      medicineName: 'औषधाचे नाव (उदा. पॅरासिटामॉल)',
      dosage: 'मात्रा (उदा. 500mg, १ गोळी, 5ml)',
      frequency: 'वारंवारता',
      reminderTime: 'आठवणीची वेळ',
      timing: 'जेवणाची वेळ',
      beforeFood: 'जेवणापूर्वी (रिकाम्या पोटी / ३० मिनिटे आधी)',
      afterFood: 'जेवणानंतर',
      withFood: 'जेवणासोबत',
      emptyStomach: 'सकाळी रिकाम्या पोटी',
      noRestriction: 'कधीही / कोणतेही बंधन नाही',
      instructions: 'डॉक्टरांच्या सूचना',
      activeMedicines: 'सध्या चालू असलेली औषधे',
      todaySchedule: 'आजचे वेळापत्रक',
      adherenceHistory: 'औषध घेतल्याचा इतिहास',
      noMedicines: 'सध्या कोणतीही औषधे जोडलेली नाहीत.',
    },
    card: {
      title: 'डिजिटल लसीकरण प्रमाणपत्र कार्ड',
      subtitle: 'सुरक्षित QR कोड पडताळणीसह अधिकृत फॉरमॅट नोंद',
      patientDetails: 'रुग्णाची माहिती',
      dob: 'जन्म तारीख',
      gender: 'लिंग',
      bloodGroup: 'रक्तगट',
      parentGuardian: 'पालक / संरक्षक',
      verificationId: 'डिजिटल पडताळणी ओळख (ID)',
      scanToVerify: 'पडताळणीसाठी QR कोड स्कॅन करा',
      officialDisclaimer: 'हे डिजिटल कार्ड युझर नोंदणीवर आधारित आहे. शासकीय किंवा पासपोर्ट कामांसाठी मूळ रुग्णालय कार्ड जवळ ठेवा.',
      completedDoses: 'दिलेल्या लसी',
      nextRecommended: 'पुढील शिफारस केलेली लस',
    },
    centers: {
      title: 'लसीकरण केंद्रे व आरोग्य शिबिरे',
      subtitle: 'शासकीय प्राथमिक आरोग्य केंद्रे (PHC) आणि जिल्हा रुग्णालये शोधा',
      useMyLocation: 'माझे चालू स्थान वापरा',
      searchPlaceholder: 'शहर, केंद्र किंवा लसीच्या नावाने शोधा...',
      filterType: 'केंद्राच्या प्रकारानुसार फिल्टर करा',
      govtPhc: 'शासकीय प्राथमिक आरोग्य केंद्र (PHC)',
      govtHospital: 'शासकीय रुग्णालय / CHC',
      privateHospital: 'खाजगी रुग्णालय',
      clinic: 'बालरोग क्लिनिक',
      camp: 'विशेष लसीकरण शिबिर',
      availableVaccines: 'उपलब्ध लसी',
      timings: 'कामाची वेळ',
      distance: 'अंतर',
      noCentersFound: 'शोध निकषांनुसार कोणतेही केंद्र आढळले नाही.',
    },
    ai: {
      title: 'स्मार्टकेअर AI आरोग्य सहाय्यक',
      subtitle: 'प्रमाणित वैद्यकीय माहितीवर आधारित लसीकरण व औषध सहाय्यक',
      placeholder: 'लसीकरण, किरकोळ दुष्परिणाम किंवा औषधांच्या वेळेबद्दल विचारा...',
      disclaimer: 'स्मार्टकेअर AI केवळ सामान्य माहिती पुरवते. हे डॉक्टरांच्या सल्ल्याचा पर्याय नाही.',
      suggestedQuestions: [
        'माझ्या बाळाला ६ व्या आठवड्यात कोणत्या लसी लागतात?',
        '२ महिने लस उशिरा झाली असल्यास काय करावे?',
        'पेंटाव्हॅलेंट लसीनंतर हलका ताप येणे सामान्य आहे का?',
        'पॅरासिटामॉल औषध जेवणानंतर कसे द्यावे?',
        'भारतात मोफत बीसीजी आणि पोलिओ लस कुठे मिळते?',
      ],
      send: 'विचारा',
      thinking: 'वैद्यकीय माहिती तपासून पाहत आहे...',
      sourcesConsulted: 'आधारभूत वैद्यकीय संदर्भ:',
    },
    campaigns: {
      title: 'प्रादेशिक लसीकरण मोहिमा',
      subtitle: 'सार्वजनिक लसीकरण मोहिमा, कॅच-अप ड्राइव्ह आणि सामुदायिक लसीकरण कार्यक्रमांचा मागोवा घ्या.',
    },
    notifications: {
      title: 'स्मरणपत्रे आणि सूचना नोंदी',
      subtitle: 'औषध स्मरणपत्रे, लसीकरण सूचना आणि सूचना इतिहास व्यवस्थापित करा.',
    },    growth: {
      title: 'बाळाची वाढ व विकास ट्रॅकिंग',
      subtitle: 'WHO मानकांनुसार वजन, उंची, बीएमआय आणि विकासात्मक टप्प्यांचे (Milestones) निरीक्षण',
      logMeasurement: 'नवीन मोजमाप नोंदवा',
      weightForAge: 'वयानुसार वजन (WHO टक्केवारी)',
      heightForAge: 'वयानुसार उंची (WHO टक्केवारी)',
      bmiForAge: 'बॉडी मास इंडेक्स (BMI)',
      headCircumference: 'डोक्याचा परीघ (Head Circumference)',
      whoStandards: 'WHO जागतिक वाढ संदर्भ मानके (सरासरी व ±2 SD श्रेणी)',
      milestonesTracker: 'विकासात्मक टप्पे ट्रॅकर (Milestones)',
      milestoneStatus: 'टप्प्यांची प्रगती',
      achieved: 'साध्य केले (Achieved)',
      inProgress: 'चालू आहे (In Progress)',
      notYet: 'सुरू नाही',
      normalTrack: 'निरोगी वाढीचा दर (WHO मानकांच्या कक्षेत)',
      underweightAlert: 'कमी वजन इशारा (बालरोगतज्ज्ञांचा सल्ला घ्या)',
      overweightAlert: 'जास्त वजन इशारा',
      stuntingAlert: 'उंची वाढ मंदावल्याचे संकेत',
      growthVelocity: 'वाढीचा गती दर',
      pediatricianAdvice: 'बालरोगतज्ज्ञ मार्गदर्शन',
      historyLogs: 'वाढ मोजमापांचा इतिहास',
      noGrowthLogs: 'अद्याप कोणतेही मोजमाप नोंदवले गेले नाही. नवीन नोंद जोडण्यासाठी खाली क्लिक करा.',
    },
  },
};

