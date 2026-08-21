export type Language = 'en' | 'hi' | 'mr';

export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  role: UserRole;
  preferredLanguage: Language;
  state: string;
  district: string;
  city?: string;
  createdAt: string;
}

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface PatientProfile {
  id: string;
  userId: string;
  name: string;
  dob: string; // YYYY-MM-DD
  gender: Gender;
  relation: 'SELF' | 'CHILD' | 'PARENT' | 'SPOUSE' | 'OTHER';
  parentGuardianName?: string;
  mobile?: string;
  bloodGroup?: string;
  state: string;
  district: string;
  city?: string;
  emergencyContact?: string;
  notes?: string;
  createdAt: string;
}

export type VaccineStatus = 'COMPLETED' | 'DUE' | 'UPCOMING' | 'MISSED';

export interface VaccineRule {
  id: string;
  vaccineCode: string;
  vaccineName: string;
  diseaseTarget: string;
  doseNumber: number;
  totalDoses?: number;
  recommendedAgeWeeks: number;
  recommendedAgeText: string;
  minAgeDays?: number;
  maxAgeDays?: number;
  route?: string;
  site?: string;
  routeAndSite?: string;
  isNationalSchedule: boolean;
  description?: string;
  importance?: 'CRITICAL' | 'RECOMMENDED' | 'OPTIONAL';
  sideEffects?: string;
  catchUpRules?: string;
}

export type VaccineScheduleRule = VaccineRule;

export interface VaccinationScheduleItem {
  id: string;
  patientId: string;
  vaccineRuleId: string;
  vaccineName: string;
  vaccineCode: string;
  doseNumber: number;
  diseaseTarget: string;
  recommendedAgeText: string;
  expectedDate: string; // YYYY-MM-DD
  status: VaccineStatus;
  completedDate?: string;
  administeredCenter?: string;
  administeredDoctor?: string;
  batchNumber?: string;
  remarks?: string;
  isNationalSchedule: boolean;
  catchUpGuidance?: string;
}

export type FoodTiming = 'BEFORE_FOOD' | 'AFTER_FOOD' | 'WITH_FOOD' | 'EMPTY_STOMACH' | 'NO_RESTRICTION';

export type MedicineFrequency = 'ONCE_DAILY' | 'TWICE_DAILY' | 'THRICE_DAILY' | 'FOUR_TIMES_DAILY' | 'AS_NEEDED' | 'WEEKLY';

export interface MedicineItem {
  id: string;
  patientId: string;
  userId: string;
  name: string;
  dosage: string;
  frequency: MedicineFrequency;
  reminderTimes: string[];
  startDate: string;
  endDate?: string;
  foodTiming: FoodTiming;
  instructions?: string;
  purpose?: string;
  isActive: boolean;
  createdAt: string;
}

export type MedicineLogStatus = 'TAKEN' | 'MISSED' | 'SKIPPED' | 'UPCOMING';

export interface MedicineLog {
  id: string;
  medicineId: string;
  patientId: string;
  date: string;
  scheduledTime: string;
  status: MedicineLogStatus;
  takenAt?: string;
  notes?: string;
}

export type NotificationChannel = 'SMS' | 'WHATSAPP' | 'EMAIL' | 'VOICE' | 'IN_APP';
export type NotificationType = 'VACCINATION_REMINDER' | 'MEDICINE_REMINDER' | 'MISSED_VACCINE_ALERT' | 'SPECIAL_CAMPAIGN';

export interface NotificationLog {
  id: string;
  userId: string;
  patientId?: string;
  patientName?: string;
  type: NotificationType;
  channel: NotificationChannel;
  title: string;
  message: string;
  scheduledFor: string;
  sentAt?: string;
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED';
  recipient: string;
}

export interface NotificationPreferences {
  userId: string;
  smsEnabled: boolean;
  whatsappEnabled: boolean;
  emailEnabled: boolean;
  voiceEnabled: boolean;
  inAppEnabled: boolean;
  reminderIntervalsDays: number[];
  preferredLanguage: Language;
}

export type NotificationPreference = NotificationPreferences;

export type CenterType = 'GOVT_PHC' | 'GOVT_HOSPITAL' | 'PRIVATE_HOSPITAL' | 'CLINIC' | 'CAMP';

export interface VaccinationCenter {
  id: string;
  name: string;
  type: CenterType;
  address: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
  lat: number;
  lng: number;
  phone: string;
  timings: string;
  availableVaccines: string[];
  isFree: boolean;
  facilities: string[];
  rating: number;
  distanceKm?: number;
}

export interface AreaRequirement {
  id: string;
  title: string;
  description: string;
  state: string;
  district: string;
  city?: string;
  campaignName?: string;
  targetAgeGroup: string;
  startDate: string;
  endDate: string;
  vaccines: string[];
  vaccinesOffered?: string[];
  instructions?: string;
  priority: 'HIGH' | 'MEDIUM' | 'ROUTINE';
  isUrgent?: boolean;
  isFree: boolean;
  source?: string;
  lastUpdated?: string;
}

export type AreaVaccinationRequirement = AreaRequirement;

export interface DigitalVaccinationCard {
  verificationId: string;
  patient: PatientProfile;
  completedVaccinations: VaccinationScheduleItem[];
  pendingVaccinations: VaccinationScheduleItem[];
  vaccinationScore: number;
  totalRequired: number;
  totalCompleted: number;
  nextDueDate?: string;
  nextVaccineName?: string;
  qrCodeDataUrl: string;
  issuedDate: string;
}

export interface AIKnowledgeDoc {
  id: string;
  title: string;
  source: string;
  category: 'UIP_INDIA' | 'IAP_GUIDELINES' | 'MEDICINE_SAFETY' | 'MISSED_DOSE' | 'SIDE_EFFECTS' | 'GENERAL' | 'VACCINE_FACTS';
  content: string;
  version: string;
  status: 'ACTIVE' | 'ARCHIVED';
  tags: string[];
  updatedAt: string;
}

export type KnowledgeDoc = AIKnowledgeDoc;

export interface ChatMessage {
  id: string;
  sender: 'USER' | 'ASSISTANT';
  role?: 'user' | 'assistant';
  text: string;
  timestamp: string;
  references?: string[];
}

export interface VaccinationScoreData {
  total: number;
  completed: number;
  due: number;
  upcoming: number;
  missed: number;
  scorePercentage: number;
  nextUpcoming?: VaccinationScheduleItem;
  missedItems: VaccinationScheduleItem[];
  dueItems: VaccinationScheduleItem[];
}

export interface GrowthLog {
  id: string;
  patientId: string;
  recordedDate: string; // YYYY-MM-DD
  ageMonths: number;
  weightKg: number;
  heightCm: number;
  headCircumferenceCm?: number;
  bmi: number;
  weightPercentile?: number;
  heightPercentile?: number;
  growthStatus?: 'HEALTHY' | 'UNDERWEIGHT' | 'OVERWEIGHT' | 'STUNTED' | 'NORMAL';
  notes?: string;
  recordedBy?: string;
}

export interface DevelopmentMilestone {
  id: string;
  category: 'MOTOR' | 'COGNITIVE' | 'LANGUAGE' | 'SOCIAL';
  minAgeMonths: number;
  maxAgeMonths: number;
  ageRangeText: string;
  title: string;
  description: string;
  tipsForParents: string;
  redFlags?: string;
}

export interface MilestoneProgressItem {
  id: string;
  patientId: string;
  milestoneId: string;
  status: 'ACHIEVED' | 'IN_PROGRESS' | 'NOT_YET';
  achievedDate?: string;
  notes?: string;
}
