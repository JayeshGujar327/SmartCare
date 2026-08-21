import React, { useState } from 'react';
import {
  ShieldCheck,
  Calendar,
  AlertTriangle,
  Clock,
  Pill,
  CheckCircle2,
  MapPin,
  Bot,
  ArrowRight,
  Sparkles,
  QrCode,
  HeartPulse,
  Info,
  Check,
  Plus,
  FileDown,
  FileText,
  TrendingUp,
  Scale,
  Phone,
  Navigation,
  ChevronRight
} from 'lucide-react';
import {
  Language,
  PatientProfile,
  VaccinationScheduleItem,
  VaccinationScoreData,
  MedicineLog,
  VaccinationCenter
} from '../types';
import { translations } from '../services/i18n';
import { VaccinationPdfSummaryModal } from './VaccinationPdfSummaryModal';

interface DashboardViewProps {
  language: Language;
  patient: PatientProfile | null;
  patientAge: string;
  metrics: VaccinationScoreData | null;
  scheduleItems?: VaccinationScheduleItem[];
  todayMedicineSlots: (MedicineLog & { medicineName: string; dosage: string; foodTiming: string; instructions?: string })[];
  nearbyCenters: VaccinationCenter[];
  onNavigate: (tab: string) => void;
  onMarkMedicineTaken: (logId: string) => void;
  onOpenRecordVaccineModal: (item: VaccinationScheduleItem) => void;
  onOpenAddMedicineModal: () => void;
  onAskAiQuestion: (question: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  language,
  patient,
  patientAge,
  metrics,
  scheduleItems = [],
  todayMedicineSlots,
  nearbyCenters,
  onNavigate,
  onMarkMedicineTaken,
  onOpenRecordVaccineModal,
  onOpenAddMedicineModal,
  onAskAiQuestion,
}) => {
  const t = translations[language];
  const [showPdfSummaryModal, setShowPdfSummaryModal] = useState(false);

  if (!patient) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl shadow-sm border border-slate-200 my-4">
        <HeartPulse className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-slate-800">No Patient Profile Selected</h2>
        <p className="text-slate-500 mt-1 text-sm">Please add or select a child or family profile to view their schedule.</p>
      </div>
    );
  }

  const effectiveSchedule = scheduleItems.length > 0 ? scheduleItems : (metrics?.schedule || []);
  const score = metrics ? metrics.scorePercentage : 0;
  const nextVax = metrics?.nextUpcoming;
  const missedVax = metrics?.missedItems || [];
  const dueVax = metrics?.dueItems || [];

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Patient Header Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center space-x-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-extrabold shadow-sm shrink-0">
              {patient.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                  {patient.name}
                </h1>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100 uppercase">
                  {patient.gender}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-1.5 text-xs text-slate-600">
                <span className="bg-slate-100 px-2.5 py-0.5 rounded-md text-slate-700 font-medium">
                  DOB: {patient.dob}
                </span>
                <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-md font-semibold border border-blue-100">
                  {patientAge}
                </span>
                {patient.bloodGroup && (
                  <span className="bg-slate-100 px-2.5 py-0.5 rounded-md text-slate-700 font-medium">
                    🩸 {patient.bloodGroup}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 sm:pt-0">
            <button
              id="export-pdf-summary-btn"
              onClick={() => setShowPdfSummaryModal(true)}
              className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-3.5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition shadow-xs whitespace-nowrap min-h-[44px]"
            >
              <FileDown className="w-4 h-4 shrink-0" />
              <span>PDF Summary</span>
            </button>
            <button
              id="view-digital-card-btn"
              onClick={() => onNavigate('digitalCard')}
              className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-3.5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition shadow-xs whitespace-nowrap min-h-[44px]"
            >
              <QrCode className="w-4 h-4 shrink-0" />
              <span>Digital Card</span>
            </button>
            <button
              id="view-schedule-btn"
              onClick={() => onNavigate('vaccinations')}
              className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 px-3.5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition whitespace-nowrap min-h-[44px]"
            >
              <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
              <span>Schedule</span>
            </button>
          </div>
        </div>

        {/* Quick Horizontal Action Shortcut Carousel for Mobile */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-gray-100 text-center">
          <button
            onClick={() => onNavigate('vaccinations')}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 hover:bg-blue-50 active:bg-blue-100 border border-gray-100 transition min-h-[64px]"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-1">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-semibold text-slate-800 leading-tight">Vaccines</span>
          </button>

          <button
            onClick={onOpenAddMedicineModal}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 hover:bg-blue-50 active:bg-blue-100 border border-gray-100 transition min-h-[64px]"
          >
            <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-1">
              <Pill className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-semibold text-slate-800 leading-tight">+ Medicine</span>
          </button>

          <button
            onClick={() => onNavigate('growth')}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 hover:bg-blue-50 active:bg-blue-100 border border-gray-100 transition min-h-[64px]"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-semibold text-slate-800 leading-tight">Growth</span>
          </button>

          <button
            onClick={() => onNavigate('centers')}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 hover:bg-blue-50 active:bg-blue-100 border border-gray-100 transition min-h-[64px]"
          >
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-1">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <span className="text-[11px] font-semibold text-slate-800 leading-tight">Centers</span>
          </button>
        </div>
      </div>

      {/* Missed Vaccine Alert Banner (If Overdue) */}
      {missedVax.length > 0 && (
        <div className="bg-red-50/80 border-2 border-red-300 p-4 sm:p-5 rounded-2xl shadow-xs">
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-red-900 text-sm sm:text-base">
                  {missedVax.length} Missed Vaccination{missedVax.length > 1 ? 's' : ''} Overdue
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-red-600 text-white">
                  Action Required
                </span>
              </div>
              <p className="text-xs text-red-800 mt-1 leading-relaxed">
                Overdue: <span className="font-bold">{missedVax.map(m => m.vaccineName).join(', ')}</span>. Under UIP guidelines, missed doses can still be safely administered without restarting the series.
              </p>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {missedVax.slice(0, 2).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onOpenRecordVaccineModal(item)}
                    className="text-xs bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-3.5 py-2.5 rounded-xl font-bold transition shadow-xs min-h-[44px] flex items-center space-x-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Record {item.vaccineCode} Given</span>
                  </button>
                ))}
                <button
                  onClick={() => onNavigate('vaccinations')}
                  className="text-xs bg-white text-red-900 border border-red-300 hover:bg-red-50 px-3.5 py-2.5 rounded-xl font-semibold transition min-h-[44px]"
                >
                  View Catch-up Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 Metric Cards Grid: Mobile Stack, Tablet 3-Col */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
        
        {/* 1. Vaccination Score Card */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-xs sm:text-sm font-bold text-slate-700">{t.dashboard.vaccinationScore}</span>
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>

            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{score}%</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                score >= 80 ? 'bg-green-100 text-green-700' : score >= 50 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-700'
              }`}>
                {score >= 80 ? 'Fully Protected' : score >= 50 ? 'On Track' : 'Needs Action'}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-100 h-2.5 rounded-full mt-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  score >= 80 ? 'bg-green-600' : score >= 50 ? 'bg-amber-500' : 'bg-red-600'
                }`}
                style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-1 text-center mt-3 pt-3 border-t border-gray-100 text-xs">
              <div className="bg-slate-50 p-1.5 rounded-lg">
                <span className="font-bold text-slate-900 text-sm block">{metrics?.completed || 0}</span>
                <span className="text-gray-500 text-[10px]">Given</span>
              </div>
              <div className="bg-amber-50/60 p-1.5 rounded-lg">
                <span className="font-bold text-amber-600 text-sm block">{dueVax.length}</span>
                <span className="text-gray-500 text-[10px]">Due Now</span>
              </div>
              <div className="bg-red-50/60 p-1.5 rounded-lg">
                <span className="font-bold text-red-600 text-sm block">{missedVax.length}</span>
                <span className="text-gray-500 text-[10px]">Missed</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => onNavigate('vaccinations')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1 py-1"
            >
              <span>{t.dashboard.viewFullSchedule}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setShowPdfSummaryModal(true)}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1 py-1"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>PDF Report</span>
            </button>
          </div>
        </div>

        {/* 2. Next Upcoming Vaccination Card */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-xs sm:text-sm font-bold text-slate-700">{t.dashboard.nextVaccination}</span>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>

            {nextVax ? (
              <div className="mt-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                    {nextVax.vaccineName}
                  </div>
                  <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md shrink-0 border border-blue-100">
                    {nextVax.vaccineCode}
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-2 flex items-center space-x-2">
                  <span className="font-semibold text-slate-800">Target Age:</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">
                    {nextVax.recommendedAgeText}
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-1 flex items-center space-x-2">
                  <span className="font-semibold text-slate-800">Target Date:</span>
                  <span className="text-blue-700 font-bold">{nextVax.expectedDate}</span>
                </div>
                <p className="mt-1.5 text-[11px] text-gray-500 truncate">
                  Protects: {nextVax.diseaseTarget}
                </p>
              </div>
            ) : (
              <div className="text-slate-500 text-xs py-4">
                No immediate upcoming vaccines scheduled. All current milestones up to date!
              </div>
            )}
          </div>

          {nextVax ? (
            <button
              onClick={() => onOpenRecordVaccineModal(nextVax)}
              className="mt-3 text-xs bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2.5 px-3.5 rounded-xl flex items-center justify-center space-x-1.5 transition shadow-xs min-h-[44px]"
            >
              <Check className="w-4 h-4" />
              <span>Record as Administered</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('vaccinations')}
              className="mt-3 text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center justify-between pt-2 border-t border-gray-100 min-h-[44px]"
            >
              <span>View All UIP Milestones</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 3. Today's Medicine Summary Card */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-gray-500 mb-1">
              <span className="text-xs sm:text-sm font-bold text-slate-700">{t.dashboard.todaysMedicines}</span>
              <Pill className="w-5 h-5 text-indigo-600" />
            </div>

            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {todayMedicineSlots.length}
              </span>
              <span className="text-xs text-indigo-700 font-bold bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                Scheduled Today
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {todayMedicineSlots.length > 0 ? (
                todayMedicineSlots.slice(0, 2).map((slot) => (
                  <div key={slot.id} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-gray-200 text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{slot.medicineName}</div>
                      <div className="text-gray-500 text-[11px]">{slot.dosage} • {slot.scheduledTime}</div>
                    </div>
                    {slot.status === 'TAKEN' ? (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-green-100 text-green-700 flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        <span>Taken</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => onMarkMedicineTaken(slot.id)}
                        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-3 py-1.5 rounded-lg font-bold text-xs transition min-h-[36px]"
                      >
                        {t.dashboard.markTaken}
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-xs py-2">
                  No active medicine doses scheduled for today.
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-100">
            <button
              onClick={onOpenAddMedicineModal}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center space-x-1 py-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Medicine</span>
            </button>
            <button
              onClick={() => onNavigate('medicines')}
              className="text-xs text-slate-600 hover:text-slate-900 font-bold flex items-center space-x-1 py-1"
            >
              <span>{t.dashboard.viewAllMedicines}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section: Today's Full Medicine Schedule & Nearby Centers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Today's Medicine Timeline */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden flex flex-col">
          <div className="px-4 sm:px-5 py-3.5 bg-slate-50 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider">
                {t.dashboard.todaysMedicines}
              </h2>
            </div>
            <button
              onClick={onOpenAddMedicineModal}
              className="text-xs bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1 transition shadow-xs min-h-[36px]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          <div className="p-4 sm:p-5 flex-1">
            {todayMedicineSlots.length > 0 ? (
              <div className="space-y-2.5">
                {todayMedicineSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between transition ${
                      slot.status === 'TAKEN'
                        ? 'bg-green-50/50 border-green-200'
                        : 'bg-white border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-sm sm:text-base">{slot.medicineName}</span>
                        <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                          {slot.dosage}
                        </span>
                        <span className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-semibold border border-blue-100">
                          {slot.foodTiming === 'AFTER_FOOD' ? 'After Food' : slot.foodTiming === 'BEFORE_FOOD' ? 'Before Food' : 'Anytime'}
                        </span>
                      </div>
                      {slot.instructions && (
                        <p className="text-xs text-gray-500 mt-1">{slot.instructions}</p>
                      )}
                      <div className="text-xs font-semibold text-slate-600 mt-1 flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>Slot: {slot.scheduledTime}</span>
                      </div>
                    </div>

                    <div className="shrink-0 ml-2">
                      {slot.status === 'TAKEN' ? (
                        <span className="inline-flex items-center space-x-1 bg-green-100 text-green-800 text-xs px-3 py-2 rounded-xl font-bold min-h-[44px]">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>Taken</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => onMarkMedicineTaken(slot.id)}
                          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-xs transition min-h-[44px] flex items-center space-x-1"
                        >
                          <Check className="w-4 h-4" />
                          <span>{t.dashboard.markTaken}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                <Pill className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p>No active prescriptions or doses scheduled for today.</p>
                <button
                  onClick={onOpenAddMedicineModal}
                  className="mt-3 text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold transition min-h-[44px]"
                >
                  + Add Daily Medicine
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Nearby Vaccination Centers Quick Locator */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden flex flex-col">
          <div className="px-4 sm:px-5 py-3.5 bg-slate-50 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <h2 className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wider">
                {t.dashboard.nearbyCenters}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('centers')}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center space-x-1"
            >
              <span>{t.dashboard.viewMap}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 sm:p-5 flex-1 space-y-2.5">
            {nearbyCenters.slice(0, 3).map((center) => (
              <div key={center.id} className="p-3.5 rounded-2xl border border-gray-200 hover:border-blue-300 bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">{center.name}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      center.isFree ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {center.isFree ? 'Free (Govt)' : 'Private'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{center.address}, {center.city}</p>
                  <div className="text-xs text-gray-500 mt-1 flex items-center space-x-3">
                    <span>🕒 {center.timings}</span>
                    {center.distanceKm && (
                      <span className="font-bold text-blue-600">📍 {center.distanceKm} km away</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 sm:pt-0">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.name + ' ' + center.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none text-center text-xs bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 px-3 py-2 rounded-xl font-bold transition min-h-[44px] flex items-center justify-center space-x-1"
                  >
                    <Navigation className="w-3.5 h-3.5 text-blue-600" />
                    <span>Directions</span>
                  </a>
                  {center.contactPhone && (
                    <a
                      href={`tel:${center.contactPhone}`}
                      className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 active:bg-blue-200 px-3 py-2 rounded-xl font-bold transition min-h-[44px] flex items-center justify-center space-x-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Child Growth & Milestone Tracking Quick Card */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-4 sm:p-5 border border-blue-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Child Growth & Milestones</h3>
              <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">WHO</span>
            </div>
            <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
              Track weight, height, BMI percentiles & milestone progress for {patient?.name || 'your child'}.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('growth')}
          className="text-xs bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold px-4 py-2.5 rounded-xl transition shadow-xs flex items-center justify-center space-x-1.5 shrink-0 min-h-[44px]"
        >
          <span>Open Growth Tracker</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* SmartCare AI Quick Ask Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">{t.dashboard.askAiTitle}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{t.dashboard.askAiSubtitle}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {t.ai.suggestedQuestions.slice(0, 2).map((q, idx) => (
            <button
              key={idx}
              onClick={() => onAskAiQuestion(q)}
              className="text-xs bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 px-3 py-2 rounded-xl transition text-left font-medium min-h-[40px] truncate max-w-xs"
            >
              "{q}"
            </button>
          ))}
          <button
            onClick={() => onNavigate('aiAssistant')}
            className="text-xs bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold px-4 py-2.5 rounded-xl transition shadow-xs min-h-[44px]"
          >
            Open AI Chat
          </button>
        </div>
      </div>

      {/* PDF Vaccination History Summary Modal */}
      {showPdfSummaryModal && (
        <VaccinationPdfSummaryModal
          isOpen={showPdfSummaryModal}
          onClose={() => setShowPdfSummaryModal(false)}
          patient={patient}
          patientAge={patientAge}
          metrics={metrics}
          scheduleItems={effectiveSchedule}
          language={language}
        />
      )}
    </div>
  );
};
