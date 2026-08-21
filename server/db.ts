import {
  User,
  PatientProfile,
  VaccineRule,
  VaccinationScheduleItem,
  MedicineItem,
  MedicineLog,
  NotificationLog,
  NotificationPreferences,
  VaccinationCenter,
  AreaRequirement,
  AIKnowledgeDoc,
  GrowthLog,
  MilestoneProgressItem
} from '../src/types';

// Complete Universal Immunization Programme (UIP India) & IAP Standard Vaccine Dataset
export const officialVaccineRules: VaccineRule[] = [
  {
    id: 'vax-bcg',
    vaccineCode: 'BCG',
    vaccineName: 'BCG (Bacillus Calmette-Guérin)',
    diseaseTarget: 'Tuberculosis (TB & TB Meningitis)',
    doseNumber: 1,
    totalDoses: 1,
    recommendedAgeWeeks: 0,
    recommendedAgeText: 'At Birth (within 1 year)',
    minAgeDays: 0,
    maxAgeDays: 365,
    route: 'Intradermal',
    site: 'Left Upper Arm',
    isNationalSchedule: true,
    description: 'Protects infants against severe forms of childhood tuberculosis including tubercular meningitis.',
    importance: 'CRITICAL',
    sideEffects: 'Small red swelling at site in 2-3 weeks, followed by small nodule and mild scar. Normal response.',
    catchUpRules: 'Can be given up to 1 year of age if missed at birth.'
  },
  {
    id: 'vax-opv-0',
    vaccineCode: 'OPV-0',
    vaccineName: 'Oral Polio Vaccine (OPV 0 - Birth Dose)',
    diseaseTarget: 'Poliomyelitis (Infantile Paralysis)',
    doseNumber: 1,
    totalDoses: 4,
    recommendedAgeWeeks: 0,
    recommendedAgeText: 'At Birth (within first 15 days)',
    minAgeDays: 0,
    maxAgeDays: 15,
    route: 'Oral (2 drops)',
    site: 'Mouth',
    isNationalSchedule: true,
    description: 'Provides early gut mucosal immunity against poliovirus strains.',
    importance: 'CRITICAL',
    sideEffects: 'Extremely rare. No special precaution needed.',
    catchUpRules: 'Given strictly within first 15 days of birth as birth dose.'
  },
  {
    id: 'vax-hepb-0',
    vaccineCode: 'HepB-0',
    vaccineName: 'Hepatitis B (Birth Dose)',
    diseaseTarget: 'Hepatitis B (Liver Infection & Cirrhosis)',
    doseNumber: 1,
    totalDoses: 4,
    recommendedAgeWeeks: 0,
    recommendedAgeText: 'At Birth (strictly within 24 hours)',
    minAgeDays: 0,
    maxAgeDays: 1,
    route: 'Intramuscular',
    site: 'Anterolateral mid-thigh (Left)',
    isNationalSchedule: true,
    description: 'Crucial within 24 hours to prevent perinatal vertical transmission from mother to baby.',
    importance: 'CRITICAL',
    sideEffects: 'Mild pain or tenderness at injection site.',
    catchUpRules: 'Must be given within 24 hours of birth for birth dose.'
  },
  {
    id: 'vax-penta-1',
    vaccineCode: 'Penta-1',
    vaccineName: 'Pentavalent 1 (DPT + HepB + Hib)',
    diseaseTarget: 'Diphtheria, Pertussis (Whooping Cough), Tetanus, Hepatitis B, Hib Pneumonia/Meningitis',
    doseNumber: 1,
    totalDoses: 3,
    recommendedAgeWeeks: 6,
    recommendedAgeText: '6 Weeks (1.5 Months)',
    minAgeDays: 42,
    maxAgeDays: 365,
    route: 'Intramuscular',
    site: 'Anterolateral mid-thigh (Left)',
    isNationalSchedule: true,
    description: 'Single 5-in-1 combo injection offering broad protection against five major deadly childhood illnesses.',
    importance: 'CRITICAL',
    sideEffects: 'Mild fever, swelling or irritability for 24-48 hours. Paracetamol drops can be used if prescribed.',
    catchUpRules: 'Can be given up to 1 year (or up to 7 years in catch-up protocols with 4 weeks interval).'
  },
  {
    id: 'vax-opv-1',
    vaccineCode: 'OPV-1',
    vaccineName: 'Oral Polio Vaccine 1 (OPV 1)',
    diseaseTarget: 'Poliomyelitis',
    doseNumber: 2,
    totalDoses: 4,
    recommendedAgeWeeks: 6,
    recommendedAgeText: '6 Weeks (1.5 Months)',
    minAgeDays: 42,
    maxAgeDays: 1825,
    route: 'Oral (2 drops)',
    site: 'Mouth',
    isNationalSchedule: true,
    description: 'Primary oral polio booster dose.',
    importance: 'CRITICAL',
    sideEffects: 'Virtually none.',
    catchUpRules: 'Can be given at any time with minimum 4 weeks gap from prior OPV.'
  },
  {
    id: 'vax-rota-1',
    vaccineCode: 'Rota-1',
    vaccineName: 'Rotavirus Vaccine 1 (RVV)',
    diseaseTarget: 'Rotaviral Diarrhea & Severe Dehydration',
    doseNumber: 1,
    totalDoses: 3,
    recommendedAgeWeeks: 6,
    recommendedAgeText: '6 Weeks (1.5 Months)',
    minAgeDays: 42,
    maxAgeDays: 365,
    route: 'Oral (5 drops or 2.5 ml)',
    site: 'Mouth',
    isNationalSchedule: true,
    description: 'Prevents severe lethal diarrhea and electrolyte loss caused by rotaviruses.',
    importance: 'CRITICAL',
    sideEffects: 'Mild loose stools or irritability in rare cases.',
    catchUpRules: 'Administer with Pentavalent series up to 1 year.'
  },
  {
    id: 'vax-ipv-1',
    vaccineCode: 'fIPV-1',
    vaccineName: 'Fractional Inactivated Polio Vaccine 1 (fIPV)',
    diseaseTarget: 'Poliomyelitis (Inactivated Virus Protection)',
    doseNumber: 1,
    totalDoses: 2,
    recommendedAgeWeeks: 6,
    recommendedAgeText: '6 Weeks (1.5 Months)',
    minAgeDays: 42,
    maxAgeDays: 365,
    route: 'Intradermal (0.1 ml)',
    site: 'Right Upper Arm',
    isNationalSchedule: true,
    description: 'Enhances systemic immunity and safeguards against circulating vaccine-derived polioviruses.',
    importance: 'CRITICAL',
    sideEffects: 'Mild redness at site.',
    catchUpRules: 'Minimum 8 weeks gap before second dose.'
  },
  {
    id: 'vax-pcv-1',
    vaccineCode: 'PCV-1',
    vaccineName: 'Pneumococcal Conjugate Vaccine 1 (PCV)',
    diseaseTarget: 'Pneumococcal Pneumonia, Sepsis & Meningitis',
    doseNumber: 1,
    totalDoses: 3,
    recommendedAgeWeeks: 6,
    recommendedAgeText: '6 Weeks (1.5 Months)',
    minAgeDays: 42,
    maxAgeDays: 365,
    route: 'Intramuscular',
    site: 'Anterolateral mid-thigh (Right)',
    isNationalSchedule: true,
    description: 'Protects infants against Streptococcus pneumoniae respiratory infection.',
    importance: 'CRITICAL',
    sideEffects: 'Mild pain or low fever.',
    catchUpRules: 'Given as 2 primary doses + 1 booster.'
  },
  {
    id: 'vax-penta-2',
    vaccineCode: 'Penta-2',
    vaccineName: 'Pentavalent 2 (DPT + HepB + Hib)',
    diseaseTarget: 'Diphtheria, Pertussis, Tetanus, Hep B, Hib',
    doseNumber: 2,
    totalDoses: 3,
    recommendedAgeWeeks: 10,
    recommendedAgeText: '10 Weeks (2.5 Months)',
    minAgeDays: 70,
    maxAgeDays: 365,
    route: 'Intramuscular',
    site: 'Anterolateral mid-thigh (Left)',
    isNationalSchedule: true,
    description: 'Second dose of Pentavalent combo vaccine.',
    importance: 'CRITICAL',
    sideEffects: 'Low fever, local tenderness.',
    catchUpRules: 'Maintain minimum 4 weeks gap from Pentavalent 1.'
  },
  {
    id: 'vax-opv-2',
    vaccineCode: 'OPV-2',
    vaccineName: 'Oral Polio Vaccine 2 (OPV 2)',
    diseaseTarget: 'Poliomyelitis',
    doseNumber: 3,
    totalDoses: 4,
    recommendedAgeWeeks: 10,
    recommendedAgeText: '10 Weeks (2.5 Months)',
    minAgeDays: 70,
    maxAgeDays: 1825,
    route: 'Oral (2 drops)',
    site: 'Mouth',
    isNationalSchedule: true,
    description: 'Second routine oral polio booster.',
    importance: 'CRITICAL',
    sideEffects: 'None.',
    catchUpRules: 'Minimum 4 weeks interval.'
  },
  {
    id: 'vax-rota-2',
    vaccineCode: 'Rota-2',
    vaccineName: 'Rotavirus Vaccine 2 (RVV)',
    diseaseTarget: 'Rotavirus Diarrhea',
    doseNumber: 2,
    totalDoses: 3,
    recommendedAgeWeeks: 10,
    recommendedAgeText: '10 Weeks (2.5 Months)',
    minAgeDays: 70,
    maxAgeDays: 365,
    route: 'Oral',
    site: 'Mouth',
    isNationalSchedule: true,
    description: 'Second dose of Rotavirus oral drops.',
    importance: 'CRITICAL',
    sideEffects: 'None.',
    catchUpRules: 'Minimum 4 weeks from Dose 1.'
  },
  {
    id: 'vax-penta-3',
    vaccineCode: 'Penta-3',
    vaccineName: 'Pentavalent 3 (DPT + HepB + Hib)',
    diseaseTarget: 'Diphtheria, Pertussis, Tetanus, Hep B, Hib',
    doseNumber: 3,
    totalDoses: 3,
    recommendedAgeWeeks: 14,
    recommendedAgeText: '14 Weeks (3.5 Months)',
    minAgeDays: 98,
    maxAgeDays: 365,
    route: 'Intramuscular',
    site: 'Anterolateral mid-thigh (Left)',
    isNationalSchedule: true,
    description: 'Final primary dose completing the infant Pentavalent series.',
    importance: 'CRITICAL',
    sideEffects: 'Mild fever, swelling.',
    catchUpRules: 'Minimum 4 weeks from Dose 2.'
  },
  {
    id: 'vax-opv-3',
    vaccineCode: 'OPV-3',
    vaccineName: 'Oral Polio Vaccine 3 (OPV 3)',
    diseaseTarget: 'Poliomyelitis',
    doseNumber: 4,
    totalDoses: 4,
    recommendedAgeWeeks: 14,
    recommendedAgeText: '14 Weeks (3.5 Months)',
    minAgeDays: 98,
    maxAgeDays: 1825,
    route: 'Oral (2 drops)',
    site: 'Mouth',
    isNationalSchedule: true,
    description: 'Third routine OPV dose.',
    importance: 'CRITICAL',
    sideEffects: 'None.',
    catchUpRules: 'Minimum 4 weeks from OPV 2.'
  },
  {
    id: 'vax-rota-3',
    vaccineCode: 'Rota-3',
    vaccineName: 'Rotavirus Vaccine 3 (RVV)',
    diseaseTarget: 'Rotavirus Diarrhea',
    doseNumber: 3,
    totalDoses: 3,
    recommendedAgeWeeks: 14,
    recommendedAgeText: '14 Weeks (3.5 Months)',
    minAgeDays: 98,
    maxAgeDays: 365,
    route: 'Oral',
    site: 'Mouth',
    isNationalSchedule: true,
    description: 'Completes primary rotavirus immunization course.',
    importance: 'CRITICAL',
    sideEffects: 'None.',
    catchUpRules: 'Minimum 4 weeks from Dose 2.'
  },
  {
    id: 'vax-ipv-2',
    vaccineCode: 'fIPV-2',
    vaccineName: 'Fractional Inactivated Polio Vaccine 2 (fIPV)',
    diseaseTarget: 'Poliomyelitis',
    doseNumber: 2,
    totalDoses: 2,
    recommendedAgeWeeks: 14,
    recommendedAgeText: '14 Weeks (3.5 Months)',
    minAgeDays: 98,
    maxAgeDays: 365,
    route: 'Intradermal (0.1 ml)',
    site: 'Right Upper Arm',
    isNationalSchedule: true,
    description: 'Second fractional IPV injection.',
    importance: 'CRITICAL',
    sideEffects: 'Mild local redness.',
    catchUpRules: 'Minimum 8 weeks gap after fIPV-1.'
  },
  {
    id: 'vax-pcv-2',
    vaccineCode: 'PCV-2',
    vaccineName: 'Pneumococcal Conjugate Vaccine 2 (PCV)',
    diseaseTarget: 'Pneumococcal Pneumonia & Meningitis',
    doseNumber: 2,
    totalDoses: 3,
    recommendedAgeWeeks: 14,
    recommendedAgeText: '14 Weeks (3.5 Months)',
    minAgeDays: 98,
    maxAgeDays: 365,
    route: 'Intramuscular',
    site: 'Anterolateral mid-thigh (Right)',
    isNationalSchedule: true,
    description: 'Second primary PCV dose.',
    importance: 'CRITICAL',
    sideEffects: 'Mild fever, site pain.',
    catchUpRules: 'Minimum 8 weeks gap after PCV-1.'
  },
  {
    id: 'vax-mr-1',
    vaccineCode: 'MR-1',
    vaccineName: 'Measles-Rubella 1 (MR 1)',
    diseaseTarget: 'Measles (Khasra) and Congenital Rubella Syndrome',
    doseNumber: 1,
    totalDoses: 2,
    recommendedAgeWeeks: 39,
    recommendedAgeText: '9-12 Months',
    minAgeDays: 270,
    maxAgeDays: 1825,
    route: 'Subcutaneous (0.5 ml)',
    site: 'Right Upper Arm',
    isNationalSchedule: true,
    description: 'First dose of Measles-Rubella vaccine protecting against blindness, encephalitis and birth defects.',
    importance: 'CRITICAL',
    sideEffects: 'Mild rash or fever 7-10 days later in small % of children.',
    catchUpRules: 'Can be administered up to 5 years of age if missed.'
  },
  {
    id: 'vax-je-1',
    vaccineCode: 'JE-1',
    vaccineName: 'Japanese Encephalitis 1 (JE 1)',
    diseaseTarget: 'Japanese Encephalitis (Brain Fever / Dimagi Bukhar)',
    doseNumber: 1,
    totalDoses: 2,
    recommendedAgeWeeks: 39,
    recommendedAgeText: '9-12 Months (Endemic Districts)',
    minAgeDays: 270,
    maxAgeDays: 5475,
    route: 'Subcutaneous',
    site: 'Left Upper Arm',
    isNationalSchedule: true,
    description: 'Given in designated endemic districts in India against mosquito-borne encephalitis.',
    importance: 'RECOMMENDED',
    sideEffects: 'Mild pain at site.',
    catchUpRules: 'Administered in endemic districts up to 15 years.'
  },
  {
    id: 'vax-pcv-booster',
    vaccineCode: 'PCV-Booster',
    vaccineName: 'PCV Booster',
    diseaseTarget: 'Pneumococcal Disease',
    doseNumber: 3,
    totalDoses: 3,
    recommendedAgeWeeks: 39,
    recommendedAgeText: '9 Months (Booster)',
    minAgeDays: 270,
    maxAgeDays: 730,
    route: 'Intramuscular',
    site: 'Right Anterolateral thigh',
    isNationalSchedule: true,
    description: 'Crucial booster dose consolidating long-term pneumococcal protection.',
    importance: 'CRITICAL',
    sideEffects: 'Mild local swelling.',
    catchUpRules: 'Given at 9 months completed.'
  },
  {
    id: 'vax-vit-a-1',
    vaccineCode: 'VitA-1',
    vaccineName: 'Vitamin A (Dose 1 - 1 Lakh IU)',
    diseaseTarget: 'Night Blindness & Immune Deficiency',
    doseNumber: 1,
    totalDoses: 9,
    recommendedAgeWeeks: 39,
    recommendedAgeText: '9 Months (with MR 1)',
    minAgeDays: 270,
    maxAgeDays: 1825,
    route: 'Oral (1 ml syrup)',
    site: 'Mouth',
    isNationalSchedule: true,
    description: 'Protects eye health, prevents corneal xerosis and strengthens mucosal immunity.',
    importance: 'CRITICAL',
    sideEffects: 'None.',
    catchUpRules: 'Followed by 2 Lakh IU every 6 months until age 5.'
  },
  {
    id: 'vax-mr-2',
    vaccineCode: 'MR-2',
    vaccineName: 'Measles-Rubella 2 (MR 2)',
    diseaseTarget: 'Measles and Rubella',
    doseNumber: 2,
    totalDoses: 2,
    recommendedAgeWeeks: 70,
    recommendedAgeText: '16-24 Months (1.5 - 2 Years)',
    minAgeDays: 480,
    maxAgeDays: 1825,
    route: 'Subcutaneous',
    site: 'Right Upper Arm',
    isNationalSchedule: true,
    description: 'Second booster dose achieving >95% permanent community immunity against measles.',
    importance: 'CRITICAL',
    sideEffects: 'Rare mild rash.',
    catchUpRules: 'Can be given with DPT Booster 1.'
  },
  {
    id: 'vax-dpt-booster-1',
    vaccineCode: 'DPT-B1',
    vaccineName: 'DPT Booster 1',
    diseaseTarget: 'Diphtheria, Pertussis, Tetanus',
    doseNumber: 1,
    totalDoses: 2,
    recommendedAgeWeeks: 70,
    recommendedAgeText: '16-24 Months (1.5 - 2 Years)',
    minAgeDays: 480,
    maxAgeDays: 2555,
    route: 'Intramuscular',
    site: 'Anterolateral mid-thigh (Left)',
    isNationalSchedule: true,
    description: 'Essential toddler booster ensuring persistent toxin neutralization.',
    importance: 'CRITICAL',
    sideEffects: 'Moderate fever and local lump. Resolves in 2-3 days.',
    catchUpRules: 'Administer at 16-24 months or ASAP if delayed.'
  },
  {
    id: 'vax-opv-booster',
    vaccineCode: 'OPV-Booster',
    vaccineName: 'OPV Booster',
    diseaseTarget: 'Poliomyelitis',
    doseNumber: 1,
    totalDoses: 1,
    recommendedAgeWeeks: 70,
    recommendedAgeText: '16-24 Months',
    minAgeDays: 480,
    maxAgeDays: 1825,
    route: 'Oral (2 drops)',
    site: 'Mouth',
    isNationalSchedule: true,
    description: 'Polio booster administered alongside DPT booster 1.',
    importance: 'CRITICAL',
    sideEffects: 'None.',
    catchUpRules: 'Given concurrently with DPT booster.'
  },
  {
    id: 'vax-dpt-booster-2',
    vaccineCode: 'DPT-B2',
    vaccineName: 'DPT Booster 2 (School Entry Dose)',
    diseaseTarget: 'Diphtheria, Pertussis, Tetanus',
    doseNumber: 2,
    totalDoses: 2,
    recommendedAgeWeeks: 260,
    recommendedAgeText: '5-6 Years',
    minAgeDays: 1825,
    maxAgeDays: 2555,
    route: 'Intramuscular',
    site: 'Upper Arm (Deltoid)',
    isNationalSchedule: true,
    description: 'Pre-school booster maintaining strong antibody titers during school socialization.',
    importance: 'CRITICAL',
    sideEffects: 'Local pain, mild fever.',
    catchUpRules: 'Can be given up to 7 years. Above 7 years, use Td.'
  },
  {
    id: 'vax-td-10',
    vaccineCode: 'Td-10',
    vaccineName: 'Tetanus and adult Diphtheria (Td 10 Yrs)',
    diseaseTarget: 'Tetanus & Diphtheria',
    doseNumber: 1,
    totalDoses: 2,
    recommendedAgeWeeks: 520,
    recommendedAgeText: '10 Years',
    minAgeDays: 3650,
    maxAgeDays: 5840,
    route: 'Intramuscular',
    site: 'Upper Arm (Deltoid)',
    isNationalSchedule: true,
    description: 'Adolescent Td booster replacing plain TT in national guidelines.',
    importance: 'CRITICAL',
    sideEffects: 'Arm soreness for 1-2 days.',
    catchUpRules: 'Can be given at 10-15 years if delayed.'
  },
  {
    id: 'vax-hpv',
    vaccineCode: 'HPV',
    vaccineName: 'Human Papillomavirus Vaccine (HPV)',
    diseaseTarget: 'Cervical Cancer & HPV Strains 16, 18',
    doseNumber: 1,
    totalDoses: 2,
    recommendedAgeWeeks: 520,
    recommendedAgeText: '9-14 Years (Adolescent Girls)',
    minAgeDays: 3285,
    maxAgeDays: 5475,
    route: 'Intramuscular',
    site: 'Upper Arm (Deltoid)',
    isNationalSchedule: false,
    description: 'Highly effective vaccine protecting young girls from HPV strains that cause 70-80% of cervical cancers.',
    importance: 'RECOMMENDED',
    sideEffects: 'Mild arm soreness.',
    catchUpRules: '2 doses 6 months apart for 9-14 years; 3 doses if started after 15 years.'
  },
  {
    id: 'vax-td-16',
    vaccineCode: 'Td-16',
    vaccineName: 'Tetanus and adult Diphtheria (Td 16 Yrs)',
    diseaseTarget: 'Tetanus & Diphtheria',
    doseNumber: 2,
    totalDoses: 2,
    recommendedAgeWeeks: 832,
    recommendedAgeText: '16 Years',
    minAgeDays: 5840,
    maxAgeDays: 7300,
    route: 'Intramuscular',
    site: 'Upper Arm (Deltoid)',
    isNationalSchedule: true,
    description: 'Secondary adolescent Td booster establishing adult baseline immunity.',
    importance: 'CRITICAL',
    sideEffects: 'Local stiffness.',
    catchUpRules: 'Administer at 16 years or during subsequent pregnancy/adult booster check.'
  }
];

// Seed Indian Vaccination Centers across government PHCs, district hospitals, camps, private clinics
export const initialVaccinationCenters: VaccinationCenter[] = [
  {
    id: 'center-1',
    name: 'Primary Health Center (PHC) Bandra West',
    type: 'GOVT_PHC',
    address: 'Near Hill Road Market, Bandra West',
    city: 'Mumbai',
    district: 'Mumbai Suburban',
    state: 'Maharashtra',
    pinCode: '400050',
    lat: 19.0596,
    lng: 72.8295,
    phone: '+91 22 2642 1234',
    timings: 'Mon-Sat: 09:00 AM - 04:00 PM',
    availableVaccines: ['BCG', 'OPV', 'HepB', 'Pentavalent', 'Rotavirus', 'fIPV', 'PCV', 'MR', 'DPT', 'Td'],
    isFree: true,
    facilities: ['Cold Chain Maintained', 'Free Government Supply', 'Pediatric Nurse on Site', 'RCH Card Issuance'],
    rating: 4.6
  },
  {
    id: 'center-2',
    name: 'District Sub-District Hospital & Maternal Center',
    type: 'GOVT_HOSPITAL',
    address: 'Opposite Railway Station, Kothrud',
    city: 'Pune',
    district: 'Pune',
    state: 'Maharashtra',
    pinCode: '411038',
    lat: 18.5074,
    lng: 73.8077,
    phone: '+91 20 2544 5678',
    timings: 'Mon-Sun: 08:30 AM - 05:00 PM (Emergency 24x7)',
    availableVaccines: ['BCG', 'OPV', 'HepB', 'Pentavalent', 'Rotavirus', 'PCV', 'MR', 'JE', 'DPT', 'Td'],
    isFree: true,
    facilities: ['Specialized Pediatrician', 'Emergency Resuscitation', 'Free Immunization Booths', 'Digital Records'],
    rating: 4.8
  },
  {
    id: 'center-3',
    name: 'Urban Primary Health Center (UPHC) Saket',
    type: 'GOVT_PHC',
    address: 'Sector 3, Community Center Complex, Saket',
    city: 'New Delhi',
    district: 'South Delhi',
    state: 'Delhi',
    pinCode: '110017',
    lat: 28.5244,
    lng: 77.2167,
    phone: '+91 11 2956 7890',
    timings: 'Mon-Sat: 09:00 AM - 03:30 PM',
    availableVaccines: ['BCG', 'OPV', 'Pentavalent', 'Rotavirus', 'fIPV', 'PCV', 'MR', 'DPT', 'Td', 'Vitamin A'],
    isFree: true,
    facilities: ['Govt Accredited', 'Dedicated Post-Vaccination Observation Room', 'Child Growth Monitoring'],
    rating: 4.5
  },
  {
    id: 'center-4',
    name: 'Mission Indradhanush Special Outreach Camp',
    type: 'CAMP',
    address: 'Anganwadi Center 12, Indiranagar',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    pinCode: '560038',
    lat: 12.9784,
    lng: 77.6408,
    phone: '+91 80 2525 9900',
    timings: 'Every Wednesday & Friday: 09:00 AM - 01:00 PM',
    availableVaccines: ['Pentavalent', 'MR', 'OPV', 'Rotavirus', 'PCV', 'DPT Booster', 'Td'],
    isFree: true,
    facilities: ['Outreach Immunization', 'Doorstep Tracking', 'Immediate On-spot Verification', 'ANM Supported'],
    rating: 4.9
  },
  {
    id: 'center-5',
    name: 'Apollo Cradle & Children Hospital',
    type: 'PRIVATE_HOSPITAL',
    address: 'Plot 15, Near Ring Road, Vastrapur',
    city: 'Ahmedabad',
    district: 'Ahmedabad',
    state: 'Gujarat',
    pinCode: '380015',
    lat: 23.0365,
    lng: 72.5284,
    phone: '+91 79 4000 8888',
    timings: 'Mon-Sat: 08:00 AM - 08:00 PM',
    availableVaccines: ['BCG', '6-in-1 Hexaxim', 'Prevenar PCV-13', 'Rotarix', 'MMR', 'Varicella', 'HPV Gardasil-9', 'FluQuadri', 'Meningococcal', 'Hepatitis A'],
    isFree: false,
    facilities: ['Painless Injection Options', 'Pediatric Specialists', 'Air-Conditioned Waiting Lounge', 'Digital Card Export'],
    rating: 4.7
  },
  {
    id: 'center-6',
    name: 'Civil Hospital & Community Health Center',
    type: 'GOVT_HOSPITAL',
    address: 'Civil Lines, Near Collectorate',
    city: 'Nagpur',
    district: 'Nagpur',
    state: 'Maharashtra',
    pinCode: '440001',
    lat: 21.1458,
    lng: 79.0882,
    phone: '+91 712 256 3456',
    timings: 'Mon-Sat: 09:00 AM - 05:00 PM',
    availableVaccines: ['BCG', 'OPV', 'HepB', 'Pentavalent', 'Rotavirus', 'PCV', 'MR', 'JE', 'DPT', 'Td'],
    isFree: true,
    facilities: ['District Cold Storage Hub', 'All UIP Vaccines Available', 'Nutrition Rehabilitation Center'],
    rating: 4.4
  }
];

// Area-specific immunization drives (State / District level)
export const initialAreaRequirements: AreaRequirement[] = [
  {
    id: 'area-1',
    title: 'Intensified Mission Indradhanush (IMI 5.0)',
    description: 'Special catch-up drive focusing on zero-dose and missed-dose children in urban slums, rural pockets, and migrant families. All routine vaccines administered completely free of cost.',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Pune',
    campaignName: 'Intensified Mission Indradhanush (IMI 5.0)',
    targetAgeGroup: 'Children 0-5 Years & Pregnant Women',
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    vaccines: ['MR-1', 'MR-2', 'Pentavalent', 'PCV', 'DPT Booster', 'Td'],
    vaccinesOffered: ['MR-1', 'MR-2', 'Pentavalent', 'PCV', 'DPT Booster', 'Td'],
    instructions: 'Special focus on zero-dose and missed-dose children in urban slums and construction sites. All vaccines administered free with instant digital certificate & mother-child protection card stamp.',
    priority: 'HIGH',
    isUrgent: true,
    isFree: true,
    source: 'Public Health Department, Govt of Maharashtra',
    lastUpdated: '2026-08-15'
  },
  {
    id: 'area-2',
    title: 'Japanese Encephalitis (JE) Special Vector Season Drive',
    description: 'High-priority regional campaign in endemic district clusters to ensure protection against acute encephalitis syndrome.',
    state: 'Uttar Pradesh',
    district: 'Gorakhpur',
    campaignName: 'Japanese Encephalitis & AES Special Drive',
    targetAgeGroup: 'Children 9 Months - 15 Years',
    startDate: '2026-08-10',
    endDate: '2026-10-15',
    vaccines: ['JE-1 (Live Attenuated SA 14-14-2)', 'JE-2 Booster'],
    vaccinesOffered: ['JE-1 (Live Attenuated SA 14-14-2)', 'JE-2 Booster'],
    instructions: 'High-priority vector season drive in Terai and Eastern UP belt. Ensure all children receiving dose 1 complete second dose.',
    priority: 'HIGH',
    isUrgent: true,
    isFree: true,
    source: 'National Health Mission (NHM UP)',
    lastUpdated: '2026-08-12'
  },
  {
    id: 'area-3',
    title: 'National Immunization Day (NID) Pulse Polio Drive',
    description: 'Universal booth-day followed by transit booth coverage. Sustaining India polio-free certification through high mucosal immunity.',
    state: 'All India',
    district: 'National',
    campaignName: 'National Immunization Day (NID) Pulse Polio Drive',
    targetAgeGroup: 'All Children Under 5 Years',
    startDate: '2026-09-15',
    endDate: '2026-09-17',
    vaccines: ['bOPV - Two Drops (Do Boond)'],
    vaccinesOffered: ['Bivalent Oral Polio Vaccine (bOPV) - "Do Boond Zindagi Ki"'],
    instructions: 'Universal booth-day followed by house-to-house verification regardless of prior routine doses.',
    priority: 'ROUTINE',
    isUrgent: false,
    isFree: true,
    source: 'Ministry of Health and Family Welfare (MoHFW), Govt of India',
    lastUpdated: '2026-08-01'
  },
  {
    id: 'area-4',
    title: 'State-wide Measles-Rubella (MR) Elimination Catch-up Campaign',
    description: 'Supplemental immunization campaign providing a supplementary dose of Measles-Rubella vaccine to eliminate indigenous transmission.',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    city: 'Mumbai',
    campaignName: 'MR Elimination Supplementary Campaign',
    targetAgeGroup: '9 Months to 15 Years',
    startDate: '2026-08-20',
    endDate: '2026-10-30',
    vaccines: ['Measles-Rubella (MR)'],
    vaccinesOffered: ['Measles-Rubella (MR Vaccine Live)'],
    instructions: 'Administered in all municipal schools, anganwadis, and primary health clinics. Mandatory consent slip provided to parents.',
    priority: 'HIGH',
    isUrgent: true,
    isFree: true,
    source: 'BMC Public Health Department & MoHFW',
    lastUpdated: '2026-08-18'
  },
  {
    id: 'area-5',
    title: 'National Vitamin A Prophylaxis & Deworming Fortnight',
    description: 'Semi-annual biannual child survival drive providing high-dose Vitamin A oral syrup and Albendazole deworming tablets.',
    state: 'All India',
    district: 'National',
    campaignName: 'National Vitamin A & Deworming Round',
    targetAgeGroup: '12 Months to 59 Months',
    startDate: '2026-09-01',
    endDate: '2026-09-20',
    vaccines: ['Vitamin A Syrup (2 Lakh IU)', 'Albendazole 400mg chewable'],
    vaccinesOffered: ['Vitamin A Mega Dose Syrup', 'Albendazole Deworming'],
    instructions: 'Administered orally by Anganwadi workers and ASHA volunteers during Village Health Sanitation and Nutrition Days (VHSND).',
    priority: 'ROUTINE',
    isUrgent: false,
    isFree: true,
    source: 'Rashtriya Bal Swasthya Karyakram (RBSK), MoHFW',
    lastUpdated: '2026-08-10'
  },
  {
    id: 'area-6',
    title: 'Adolescent HPV Cervical Cancer Protection Drive',
    description: 'Subsidized & public demonstration drive offering Human Papillomavirus (HPV) vaccination for school-going adolescent girls.',
    state: 'Delhi',
    district: 'South Delhi',
    city: 'New Delhi',
    campaignName: 'Adolescent HPV School Health Drive',
    targetAgeGroup: 'Girls 9-14 Years',
    startDate: '2026-08-25',
    endDate: '2026-11-15',
    vaccines: ['HPV Quadrivalent / Bivalent'],
    vaccinesOffered: ['HPV Vaccine (2 Dose Series)'],
    instructions: 'Two doses given at 0 and 6-month intervals. Pre-screening and medical officer counseling provided at all Delhi Govt polyclinics.',
    priority: 'MEDIUM',
    isUrgent: false,
    isFree: true,
    source: 'Directorate General of Health Services (DGHS Delhi)',
    lastUpdated: '2026-08-16'
  }
];

// RAG Knowledge Base Docs with Authoritative Healthcare Data
export const initialKnowledgeDocs: AIKnowledgeDoc[] = [
  {
    id: 'doc-uip-1',
    title: 'Universal Immunization Programme (UIP) India Official Schedule',
    source: 'Ministry of Health & Family Welfare (MoHFW), Government of India',
    category: 'UIP_INDIA',
    content: `The Universal Immunization Programme provides life-saving vaccines free of cost to all infants, children, and pregnant women in India.
Key milestone schedule:
- Birth: BCG (Intradermal left arm), OPV-0 (Oral 2 drops within 15 days), HepB-0 (Intramuscular left thigh within 24 hours).
- 6 Weeks: Pentavalent-1 (Diphtheria, Pertussis, Tetanus, Hep B, Hib), OPV-1, Rotavirus-1, Fractional IPV-1 (fIPV), PCV-1.
- 10 Weeks: Pentavalent-2, OPV-2, Rotavirus-2.
- 14 Weeks: Pentavalent-3, OPV-3, Rotavirus-3, fIPV-2, PCV-2.
- 9-12 Months: Measles-Rubella-1 (MR-1 Subcutaneous right arm), PCV Booster, Vitamin A (1 lakh IU oral syrup), JE-1 (in endemic districts).
- 16-24 Months: MR-2, DPT Booster-1, OPV Booster, JE-2.
- 5-6 Years: DPT Booster-2.
- 10 Years & 16 Years: Td (Tetanus & adult Diphtheria) replacing older plain TT.`,
    version: '2026.2',
    status: 'ACTIVE',
    tags: ['UIP', 'India', 'Schedule', 'Vaccines', 'BCG', 'Pentavalent', 'Polio'],
    updatedAt: '2026-08-10'
  },
  {
    id: 'doc-missed-2',
    title: 'Indian Academy of Pediatrics (IAP) Catch-up Rules for Delayed Vaccinations',
    source: 'IAP Advisory Committee on Vaccines & Immunization Practices (ACVIP)',
    category: 'MISSED_DOSE',
    content: `When a child misses a scheduled vaccination dose, DO NOT restart the entire series from the beginning.
General Catch-up Principles:
1. Simply administer the missed dose at the earliest possible opportunity.
2. Count previously given doses as valid, provided minimum recommended time intervals between consecutive doses are maintained (usually minimum 4 weeks gap between multidose vaccines like Pentavalent/DPT/Rotavirus).
3. Pentavalent can be given up to 1 year; if older than 1 year and under 7 years, use DPT + HepB combo.
4. BCG can be administered up to 1 year of age.
5. Measles-Rubella (MR) catch-up can be administered up to 5 years (and up to 15 years in outbreak or zero-dose situations).
6. Always consult a pediatrician or local PHC medical officer to review child health condition before catch-up.`,
    version: '2026.1',
    status: 'ACTIVE',
    tags: ['Missed Dose', 'Catch-up', 'IAP', 'Intervals', 'Delayed Vaccination'],
    updatedAt: '2026-08-05'
  },
  {
    id: 'doc-side-effects-3',
    title: 'Post-Vaccination Common Reactions, Mild Symptoms and Home Care',
    source: 'World Health Organization (WHO) & National Adverse Events Following Immunization (AEFI) Guidelines',
    category: 'SIDE_EFFECTS',
    content: `Mild post-vaccination reactions are signs that the child's immune system is actively building protective antibodies:
- Mild fever (up to 38.5°C / 101.3°F): Common after Pentavalent and DPT. Paracetamol drops (as prescribed by doctor for infant body weight) may be given. Never give Aspirin to infants or children.
- Local pain, redness, mild lump at injection site: Apply a clean, cool damp cloth (do not rub or massage). BCG typically develops a tiny blister/crust in 2-3 weeks which heals into a small scar; do not squeeze or apply ointments.
- Irritability or mild drowsiness: Offer plenty of fluids/breastmilk, light comfortable cotton clothing.
- Red Flag Emergency Signs (Seek immediate hospital care / call 108): High fever >39°C (102.2°F), persistent inconsolable crying for >3 hours, seizures/convulsions, breathing difficulty, swelling of face or lips, extreme lethargy.`,
    version: '2026.1',
    status: 'ACTIVE',
    tags: ['Side Effects', 'Fever', 'Paracetamol', 'AEFI', 'Home Care', 'Safety'],
    updatedAt: '2026-07-28'
  },
  {
    id: 'doc-med-safety-4',
    title: 'Pediatric & General Medicine Administration & Food Timing Rules',
    source: 'National Formulary of India (NFI) & Pediatric Pharmacology Guidelines',
    category: 'MEDICINE_SAFETY',
    content: `Proper medicine adherence and food timing are essential for safety and therapeutic efficacy:
1. Before Food (Empty Stomach): Certain antibiotics (like Ampicillin) or gastric acid inhibitors are best absorbed 30-60 minutes before meals.
2. After Food: Pain relievers, NSAIDs, Ibuprofen, Paracetamol (when indicated), and iron supplements should usually be taken after food to prevent gastric irritation.
3. Liquid Syrups / Suspensions: Always shake suspensions thoroughly before measuring. Use standard calibrated oral syringes or measuring cups, not kitchen spoons.
4. Antibiotic Courses: Must always be completed for the full prescribed duration (e.g. 5-7 days) even if the patient feels completely well after 2 days to prevent drug-resistant superbugs.
5. Missed Medicine Dose: Take it as soon as remembered unless it is almost time for the next scheduled dose. Never double up doses.`,
    version: '2026.3',
    status: 'ACTIVE',
    tags: ['Medicines', 'Timing', 'Dosage', 'Antibiotics', 'Safety', 'Food Instructions'],
    updatedAt: '2026-08-14'
  }
];

// Seed Users
export const initialUsers: User[] = [
  {
    id: 'user-demo-1',
    name: 'Priya & Rahul Sharma',
    mobile: '9876543210',
    email: 'priya.sharma@example.in',
    role: 'USER',
    preferredLanguage: 'en',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Pune',
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'user-admin-1',
    name: 'Dr. Suresh Patil (Admin)',
    mobile: '9820012345',
    email: 'admin.health@smartcare.gov.in',
    role: 'ADMIN',
    preferredLanguage: 'en',
    state: 'Maharashtra',
    district: 'Mumbai Suburban',
    city: 'Mumbai',
    createdAt: '2026-01-01T08:00:00Z'
  }
];

// Seed Patients
export const initialPatients: PatientProfile[] = [
  {
    id: 'patient-aarav-1',
    userId: 'user-demo-1',
    name: 'Baby Aarav Sharma',
    dob: '2026-02-15', // ~6 months old relative to current date (2026-08-20)
    gender: 'MALE',
    relation: 'CHILD',
    parentGuardianName: 'Priya Sharma (Mother)',
    mobile: '9876543210',
    bloodGroup: 'B+',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Pune',
    emergencyContact: '+91 9876543210',
    notes: 'Born at 38 weeks. Normal delivery at Kothrud Maternal Hospital. Weight at birth: 3.2 kg.',
    createdAt: '2026-02-16T12:00:00Z'
  },
  {
    id: 'patient-ananya-2',
    userId: 'user-demo-1',
    name: 'Ananya Sharma',
    dob: '2021-04-10', // ~5 years old
    gender: 'FEMALE',
    relation: 'CHILD',
    parentGuardianName: 'Rahul Sharma (Father)',
    mobile: '9876543210',
    bloodGroup: 'O+',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Pune',
    emergencyContact: '+91 9876543210',
    notes: 'Pre-school child. Due for 5-Year DPT Booster-2.',
    createdAt: '2026-01-15T10:30:00Z'
  }
];

// In-Memory Database Store Class with Persistence in Memory
class DatabaseStore {
  public users: User[] = [...initialUsers];
  public patients: PatientProfile[] = [...initialPatients];
  public vaccineRules: VaccineRule[] = [...officialVaccineRules];
  public scheduleItems: VaccinationScheduleItem[] = [];
  public medicines: MedicineItem[] = [];
  public medicineLogs: MedicineLog[] = [];
  public notificationLogs: NotificationLog[] = [];
  public preferences: Record<string, NotificationPreferences> = {};
  public centers: VaccinationCenter[] = [...initialVaccinationCenters];
  public areaRequirements: AreaRequirement[] = [...initialAreaRequirements];
  public knowledgeDocs: AIKnowledgeDoc[] = [...initialKnowledgeDocs];
  public growthLogs: GrowthLog[] = [];
  public milestoneProgress: MilestoneProgressItem[] = [];

  constructor() {
    this.initDemoData();
  }

  public initDemoData() {
    // Generate initial schedules for demo patients
    for (const patient of this.patients) {
      this.generateSchedulesForPatient(patient);
    }

    // Set demo notification preferences
    this.preferences['user-demo-1'] = {
      userId: 'user-demo-1',
      smsEnabled: true,
      whatsappEnabled: true,
      emailEnabled: true,
      voiceEnabled: false,
      inAppEnabled: true,
      reminderIntervalsDays: [10, 7, 5, 1],
      preferredLanguage: 'en'
    };

    // Seed active medicines for Baby Aarav and Ananya
    const todayStr = new Date().toISOString().split('T')[0];

    const med1: MedicineItem = {
      id: 'med-vitd3-1',
      patientId: 'patient-aarav-1',
      userId: 'user-demo-1',
      name: 'Vitamin D3 Pediatric Drops (400 IU)',
      dosage: '0.5 ml (1 dropper)',
      frequency: 'ONCE_DAILY',
      reminderTimes: ['09:00'],
      startDate: '2026-03-01',
      foodTiming: 'AFTER_FOOD',
      instructions: 'Give directly or with morning breastfeed for strong bone & teeth development.',
      purpose: 'Daily Bone & Immune Support',
      isActive: true,
      createdAt: '2026-03-01T09:00:00Z'
    };

    const med2: MedicineItem = {
      id: 'med-para-2',
      patientId: 'patient-aarav-1',
      userId: 'user-demo-1',
      name: 'Crocin / Paracetamol Infant Drops (100mg/ml)',
      dosage: '0.8 ml',
      frequency: 'AS_NEEDED',
      reminderTimes: ['14:00', '20:00'],
      startDate: todayStr,
      foodTiming: 'AFTER_FOOD',
      instructions: 'Only if rectal/axillary fever exceeds 38°C (100.4°F) post-immunization.',
      purpose: 'Fever & Pain Relief',
      isActive: true,
      createdAt: new Date().toISOString()
    };

    const med3: MedicineItem = {
      id: 'med-iron-3',
      patientId: 'patient-ananya-2',
      userId: 'user-demo-1',
      name: 'Zinc & Iron Multivitamin Tonic',
      dosage: '5 ml (1 teaspoon)',
      frequency: 'TWICE_DAILY',
      reminderTimes: ['08:30', '19:30'],
      startDate: '2026-08-01',
      foodTiming: 'AFTER_FOOD',
      instructions: 'Give with fruit juice or after breakfast and dinner.',
      purpose: 'Immunity & Appetite Tonic',
      isActive: true,
      createdAt: '2026-08-01T08:30:00Z'
    };

    this.medicines = [med1, med2, med3];

    // Seed Today's medicine logs
    this.medicineLogs = [
      {
        id: 'log-1',
        medicineId: 'med-vitd3-1',
        patientId: 'patient-aarav-1',
        date: todayStr,
        scheduledTime: '09:00',
        status: 'TAKEN',
        takenAt: `${todayStr}T09:15:00Z`
      },
      {
        id: 'log-2',
        medicineId: 'med-iron-3',
        patientId: 'patient-ananya-2',
        date: todayStr,
        scheduledTime: '08:30',
        status: 'TAKEN',
        takenAt: `${todayStr}T08:40:00Z`
      },
      {
        id: 'log-3',
        medicineId: 'med-iron-3',
        patientId: 'patient-ananya-2',
        date: todayStr,
        scheduledTime: '19:30',
        status: 'UPCOMING'
      }
    ];

    // Seed sample notification logs
    this.notificationLogs = [
      {
        id: 'notif-1',
        userId: 'user-demo-1',
        patientId: 'patient-aarav-1',
        patientName: 'Baby Aarav Sharma',
        type: 'VACCINATION_REMINDER',
        channel: 'WHATSAPP',
        title: 'Upcoming Vaccination Alert: MR-1 & PCV Booster',
        message: 'Namaste Priya, Baby Aarav is due for Measles-Rubella (MR-1) & PCV Booster at 9 Months. Locate your nearest free Govt PHC on SmartCare.',
        scheduledFor: '2026-08-20T09:00:00Z',
        sentAt: '2026-08-20T09:00:15Z',
        status: 'DELIVERED',
        recipient: '+91 9876543210 (WhatsApp)'
      },
      {
        id: 'notif-2',
        userId: 'user-demo-1',
        patientId: 'patient-aarav-1',
        patientName: 'Baby Aarav Sharma',
        type: 'MEDICINE_REMINDER',
        channel: 'SMS',
        title: 'Medicine Reminder: Vitamin D3 Drops',
        message: 'Reminder: Give Vitamin D3 Pediatric Drops 0.5ml after morning feed.',
        scheduledFor: '2026-08-20T09:00:00Z',
        sentAt: '2026-08-20T09:00:05Z',
        status: 'DELIVERED',
        recipient: '+91 9876543210 (SMS)'
      }
    ];

    // Seed sample growth logs for Baby Aarav (~6 months old)
    this.growthLogs = [
      {
        id: 'growth-aarav-0',
        patientId: 'patient-aarav-1',
        recordedDate: '2026-02-15',
        ageMonths: 0,
        weightKg: 3.2,
        heightCm: 50.0,
        headCircumferenceCm: 34.5,
        bmi: 12.8,
        weightPercentile: 50,
        heightPercentile: 50,
        growthStatus: 'HEALTHY',
        notes: 'Birth assessment at hospital. Healthy crying, APGAR 9/10.',
        recordedBy: 'Dr. Meena Deshmukh'
      },
      {
        id: 'growth-aarav-1',
        patientId: 'patient-aarav-1',
        recordedDate: '2026-03-30',
        ageMonths: 1.5,
        weightKg: 4.8,
        heightCm: 56.2,
        headCircumferenceCm: 37.0,
        bmi: 15.2,
        weightPercentile: 55,
        heightPercentile: 60,
        growthStatus: 'HEALTHY',
        notes: '6-Week vaccination visit. Exclusive breastfeeding established.',
        recordedBy: 'PHC Kothrud'
      },
      {
        id: 'growth-aarav-2',
        patientId: 'patient-aarav-1',
        recordedDate: '2026-04-28',
        ageMonths: 2.5,
        weightKg: 5.9,
        heightCm: 60.1,
        headCircumferenceCm: 39.2,
        bmi: 16.3,
        weightPercentile: 58,
        heightPercentile: 62,
        growthStatus: 'HEALTHY',
        notes: '10-Week checkup. Neck holding steadily improving.',
        recordedBy: 'Dr. Rajesh K.'
      },
      {
        id: 'growth-aarav-3',
        patientId: 'patient-aarav-1',
        recordedDate: '2026-05-28',
        ageMonths: 3.5,
        weightKg: 6.8,
        heightCm: 63.4,
        headCircumferenceCm: 41.0,
        bmi: 16.9,
        weightPercentile: 55,
        heightPercentile: 58,
        growthStatus: 'HEALTHY',
        notes: '14-Week checkup. Rolling from tummy to back.',
        recordedBy: 'Dr. Rajesh K.'
      },
      {
        id: 'growth-aarav-4',
        patientId: 'patient-aarav-1',
        recordedDate: '2026-08-15',
        ageMonths: 6.0,
        weightKg: 7.9,
        heightCm: 67.8,
        headCircumferenceCm: 43.1,
        bmi: 17.2,
        weightPercentile: 52,
        heightPercentile: 55,
        growthStatus: 'HEALTHY',
        notes: '6-Month milestone review. Started complementary soft solids (ragi porridge, mashed banana).',
        recordedBy: 'Dr. Meena Deshmukh'
      },
      // Ananya (5 years old)
      {
        id: 'growth-ananya-1',
        patientId: 'patient-ananya-2',
        recordedDate: '2022-04-10',
        ageMonths: 12,
        weightKg: 9.0,
        heightCm: 74.5,
        headCircumferenceCm: 45.2,
        bmi: 16.2,
        weightPercentile: 50,
        heightPercentile: 52,
        growthStatus: 'HEALTHY',
        notes: '1st birthday checkup. Walking with support.',
        recordedBy: 'PHC Bandra West'
      },
      {
        id: 'growth-ananya-2',
        patientId: 'patient-ananya-2',
        recordedDate: '2023-04-10',
        ageMonths: 24,
        weightKg: 11.6,
        heightCm: 86.8,
        headCircumferenceCm: 47.5,
        bmi: 15.4,
        weightPercentile: 52,
        heightPercentile: 54,
        growthStatus: 'HEALTHY',
        notes: '2-Year checkup. Speaks in 2-word phrases.',
        recordedBy: 'PHC Bandra West'
      },
      {
        id: 'growth-ananya-3',
        patientId: 'patient-ananya-2',
        recordedDate: '2024-04-10',
        ageMonths: 36,
        weightKg: 14.1,
        heightCm: 95.5,
        headCircumferenceCm: 49.0,
        bmi: 15.5,
        weightPercentile: 54,
        heightPercentile: 55,
        growthStatus: 'HEALTHY',
        notes: '3-Year checkup. Active preschooler, jumping and running.',
        recordedBy: 'Dr. A. Verma'
      },
      {
        id: 'growth-ananya-4',
        patientId: 'patient-ananya-2',
        recordedDate: '2025-04-10',
        ageMonths: 48,
        weightKg: 16.3,
        heightCm: 103.0,
        headCircumferenceCm: 50.1,
        bmi: 15.4,
        weightPercentile: 53,
        heightPercentile: 53,
        growthStatus: 'HEALTHY',
        notes: '4-Year checkup. High vocabulary, draws circles.',
        recordedBy: 'Dr. A. Verma'
      },
      {
        id: 'growth-ananya-5',
        patientId: 'patient-ananya-2',
        recordedDate: '2026-04-10',
        ageMonths: 60,
        weightKg: 18.4,
        heightCm: 109.8,
        headCircumferenceCm: 50.8,
        bmi: 15.3,
        weightPercentile: 52,
        heightPercentile: 53,
        growthStatus: 'HEALTHY',
        notes: '5-Year milestone review. Pre-school school health check.',
        recordedBy: 'Dr. A. Verma'
      }
    ];

    // Seed sample milestone progress
    this.milestoneProgress = [
      {
        id: 'mp-aarav-1',
        patientId: 'patient-aarav-1',
        milestoneId: 'm-0-2-motor-1',
        status: 'ACHIEVED',
        achievedDate: '2026-03-01',
        notes: 'Lifts head well during tummy time'
      },
      {
        id: 'mp-aarav-2',
        patientId: 'patient-aarav-1',
        milestoneId: 'm-0-2-social-1',
        status: 'ACHIEVED',
        achievedDate: '2026-03-10',
        notes: 'Smiled back at mother'
      },
      {
        id: 'mp-aarav-3',
        patientId: 'patient-aarav-1',
        milestoneId: 'm-0-2-lang-1',
        status: 'ACHIEVED',
        achievedDate: '2026-03-20',
        notes: 'Cooing and responding to music'
      },
      {
        id: 'mp-aarav-4',
        patientId: 'patient-aarav-1',
        milestoneId: 'm-2-4-motor-1',
        status: 'ACHIEVED',
        achievedDate: '2026-04-15'
      },
      {
        id: 'mp-aarav-5',
        patientId: 'patient-aarav-1',
        milestoneId: 'm-2-4-motor-2',
        status: 'ACHIEVED',
        achievedDate: '2026-04-20'
      },
      {
        id: 'mp-aarav-6',
        patientId: 'patient-aarav-1',
        milestoneId: 'm-4-6-motor-1',
        status: 'ACHIEVED',
        achievedDate: '2026-06-05'
      },
      {
        id: 'mp-aarav-7',
        patientId: 'patient-aarav-1',
        milestoneId: 'm-4-6-motor-2',
        status: 'ACHIEVED',
        achievedDate: '2026-06-25'
      },
      {
        id: 'mp-aarav-8',
        patientId: 'patient-aarav-1',
        milestoneId: 'm-6-9-motor-1',
        status: 'IN_PROGRESS',
        notes: 'Sits for 10-20 seconds with minor wobbling'
      },
      {
        id: 'mp-aarav-9',
        patientId: 'patient-aarav-1',
        milestoneId: 'm-6-9-lang-1',
        status: 'IN_PROGRESS',
        notes: 'Babbling da-da, ba-ba'
      }
    ];
  }

  public generateSchedulesForPatient(patient: PatientProfile): VaccinationScheduleItem[] {
    const dob = new Date(patient.dob);
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Remove existing for this patient if regenerating
    this.scheduleItems = this.scheduleItems.filter(item => item.patientId !== patient.id);

    const generated: VaccinationScheduleItem[] = [];

    for (const rule of this.vaccineRules) {
      // Calculate expected date = DOB + (recommendedAgeWeeks * 7 days)
      const expectedDateObj = new Date(dob);
      expectedDateObj.setDate(expectedDateObj.getDate() + Math.round(rule.recommendedAgeWeeks * 7));
      const expectedDateStr = expectedDateObj.toISOString().split('T')[0];

      let status: 'COMPLETED' | 'DUE' | 'UPCOMING' | 'MISSED' = 'UPCOMING';
      let completedDate: string | undefined = undefined;
      let administeredCenter: string | undefined = undefined;
      let administeredDoctor: string | undefined = undefined;
      let batchNumber: string | undefined = undefined;

      const isPastExpected = expectedDateStr < todayStr;
      const isDueSoon = Math.abs((expectedDateObj.getTime() - today.getTime()) / (1000 * 3600 * 24)) <= 7;

      // Realistic completed seeds for older milestones
      if (patient.id === 'patient-aarav-1') {
        if (rule.vaccineCode === 'BCG' || rule.vaccineCode === 'OPV-0' || rule.vaccineCode === 'HepB-0') {
          status = 'COMPLETED';
          completedDate = '2026-02-15';
          administeredCenter = 'District Sub-District Hospital, Pune';
          administeredDoctor = 'Dr. Meena Deshmukh';
          batchNumber = 'SII-BCG-9022';
        } else if (
          rule.vaccineCode === 'Penta-1' ||
          rule.vaccineCode === 'OPV-1' ||
          rule.vaccineCode === 'Rota-1' ||
          rule.vaccineCode === 'fIPV-1' ||
          rule.vaccineCode === 'PCV-1'
        ) {
          status = 'COMPLETED';
          completedDate = '2026-03-30';
          administeredCenter = 'PHC Kothrud, Pune';
          administeredDoctor = 'Staff Nurse Sunita G.';
          batchNumber = 'PENT-IND-4481';
        } else if (
          rule.vaccineCode === 'Penta-2' ||
          rule.vaccineCode === 'OPV-2' ||
          rule.vaccineCode === 'Rota-2'
        ) {
          status = 'COMPLETED';
          completedDate = '2026-04-28';
          administeredCenter = 'PHC Kothrud, Pune';
          administeredDoctor = 'Dr. Rajesh K.';
          batchNumber = 'PENT-IND-4912';
        } else if (
          rule.vaccineCode === 'Penta-3' ||
          rule.vaccineCode === 'OPV-3' ||
          rule.vaccineCode === 'Rota-3' ||
          rule.vaccineCode === 'fIPV-2' ||
          rule.vaccineCode === 'PCV-2'
        ) {
          // At 14 weeks (~May 2026): mark completed
          status = 'COMPLETED';
          completedDate = '2026-05-28';
          administeredCenter = 'PHC Kothrud, Pune';
          administeredDoctor = 'Dr. Rajesh K.';
          batchNumber = 'PENT-IND-5201';
        } else {
          // Upcoming 9 months (Nov 2026)
          status = isDueSoon ? 'DUE' : (isPastExpected ? 'MISSED' : 'UPCOMING');
        }
      } else if (patient.id === 'patient-ananya-2') {
        // 5-year-old child: early infant & toddler vaccines completed, due for 5-Year DPT-B2
        if (rule.vaccineCode === 'DPT-B2') {
          status = 'DUE';
        } else if (rule.recommendedAgeWeeks < 260) {
          status = 'COMPLETED';
          completedDate = expectedDateStr;
          administeredCenter = 'PHC Bandra West, Mumbai';
          administeredDoctor = 'Dr. A. Verma';
          batchNumber = 'DPT-MUM-8812';
        } else {
          status = 'UPCOMING';
        }
      } else {
        // Default rule for new patient
        if (isPastExpected) {
          status = 'MISSED';
        } else if (isDueSoon) {
          status = 'DUE';
        } else {
          status = 'UPCOMING';
        }
      }

      const item: VaccinationScheduleItem = {
        id: `sched-${patient.id}-${rule.id}`,
        patientId: patient.id,
        vaccineRuleId: rule.id,
        vaccineName: rule.vaccineName,
        vaccineCode: rule.vaccineCode,
        doseNumber: rule.doseNumber,
        diseaseTarget: rule.diseaseTarget,
        recommendedAgeText: rule.recommendedAgeText,
        expectedDate: expectedDateStr,
        status,
        completedDate,
        administeredCenter,
        administeredDoctor,
        batchNumber,
        isNationalSchedule: rule.isNationalSchedule,
        catchUpGuidance: rule.catchUpRules
      };

      generated.push(item);
    }

    this.scheduleItems.push(...generated);
    return generated;
  }
}

export const db = new DatabaseStore();
