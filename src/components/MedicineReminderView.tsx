import React, { useState } from 'react';
import {
  Pill,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  Info,
  Check,
  X,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import {
  Language,
  PatientProfile,
  MedicineItem,
  MedicineLog,
  FoodTiming
} from '../types';
import { translations } from '../services/i18n';

interface MedicineReminderViewProps {
  language: Language;
  patient: PatientProfile | null;
  medicines: MedicineItem[];
  todaySlots: (MedicineLog & { medicineName: string; dosage: string; foodTiming: string; instructions?: string })[];
  onOpenAddModal: () => void;
  onOpenEditModal: (med: MedicineItem) => void;
  onDeleteMedicine: (id: string) => void;
  onUpdateSlotStatus: (logId: string, status: 'TAKEN' | 'MISSED' | 'SKIPPED' | 'UPCOMING') => void;
}

export const MedicineReminderView: React.FC<MedicineReminderViewProps> = ({
  language,
  patient,
  medicines,
  todaySlots,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteMedicine,
  onUpdateSlotStatus,
}) => {
  const t = translations[language];
  const [activeSubTab, setActiveSubTab] = useState<'TODAY' | 'ACTIVE_LIST'>('TODAY');

  if (!patient) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-xs my-4">
        <p className="text-slate-500 font-medium text-sm">Please select a patient profile to manage medicines.</p>
      </div>
    );
  }

  const getFoodTimingBadge = (timing: string) => {
    switch (timing) {
      case 'AFTER_FOOD':
        return <span className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-blue-100">After Food</span>;
      case 'BEFORE_FOOD':
        return <span className="bg-amber-50 text-amber-800 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-amber-100">Before Food</span>;
      case 'WITH_FOOD':
        return <span className="bg-purple-50 text-purple-700 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-purple-100">With Food</span>;
      case 'EMPTY_STOMACH':
        return <span className="bg-amber-50 text-amber-800 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-amber-100">Empty Stomach</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">Anytime</span>;
    }
  };

  const takenSlotsCount = todaySlots.filter(s => s.status === 'TAKEN').length;

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Header */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">{t.medicines.title}</h1>
            <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2.5 py-0.5 rounded-full border border-indigo-100">
              {medicines.length} Prescriptions
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Prescription scheduling & adherence tracking for <span className="font-bold text-slate-800">{patient.name}</span>
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-xs min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          <span>{t.medicines.addMedicine}</span>
        </button>
      </div>

      {/* Sub Tabs Toggle */}
      <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl">
        <button
          onClick={() => setActiveSubTab('TODAY')}
          className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition min-h-[44px] flex items-center justify-center space-x-1.5 ${
            activeSubTab === 'TODAY'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Today's Doses ({todaySlots.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('ACTIVE_LIST')}
          className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition min-h-[44px] flex items-center justify-center space-x-1.5 ${
            activeSubTab === 'ACTIVE_LIST'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>All Prescriptions ({medicines.length})</span>
        </button>
      </div>

      {/* Subtab 1: Today's Schedule Timeline */}
      {activeSubTab === 'TODAY' && (
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
            
            {/* Header with progress */}
            <div className="bg-slate-50 px-4 sm:px-6 py-3 border-b border-gray-200 flex items-center justify-between">
              <div>
                <span className="font-extrabold text-slate-800 text-xs sm:text-sm uppercase tracking-wider block">
                  Today's Adherence Schedule
                </span>
                <span className="text-[11px] text-gray-500">
                  {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                </span>
              </div>
              <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                {takenSlotsCount} of {todaySlots.length} Taken
              </span>
            </div>

            {todaySlots.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {todaySlots.map((slot) => (
                  <div key={slot.id} className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-base">{slot.medicineName}</span>
                        <span className="text-xs font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md">
                          {slot.dosage}
                        </span>
                        {getFoodTimingBadge(slot.foodTiming)}
                      </div>
                      
                      {slot.instructions && (
                        <p className="text-xs text-gray-500 leading-relaxed">{slot.instructions}</p>
                      )}

                      <div className="text-xs font-semibold text-slate-600 flex items-center space-x-2 pt-0.5">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span>Slot: {slot.scheduledTime}</span>
                        </span>
                        {slot.takenAt && (
                          <span className="text-green-700 font-bold">
                            • Confirmed {new Date(slot.takenAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      {slot.status === 'TAKEN' ? (
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                          <span className="px-3.5 py-2 rounded-xl text-xs font-bold bg-green-100 text-green-700 flex items-center space-x-1.5 min-h-[44px]">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span>Dose Taken</span>
                          </span>
                          <button
                            onClick={() => onUpdateSlotStatus(slot.id, 'UPCOMING')}
                            className="text-xs bg-slate-100 text-slate-600 hover:bg-slate-200 px-3 py-2 rounded-xl font-semibold flex items-center space-x-1 min-h-[44px]"
                            title="Undo taken status"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Undo</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => onUpdateSlotStatus(slot.id, 'TAKEN')}
                            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 shadow-xs transition min-h-[44px]"
                          >
                            <Check className="w-4 h-4" />
                            <span>Mark Taken</span>
                          </button>
                          <button
                            onClick={() => onUpdateSlotStatus(slot.id, 'SKIPPED')}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-xl transition min-h-[44px]"
                          >
                            Skip
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 sm:p-12 text-center text-gray-500">
                <Pill className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-medium">{t.medicines.noMedicines}</p>
                <button
                  onClick={onOpenAddModal}
                  className="mt-3 text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold shadow-xs min-h-[44px]"
                >
                  + Add Prescription Medicine
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subtab 2: Active Prescriptions Management */}
      {activeSubTab === 'ACTIVE_LIST' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
          {medicines.map((med) => (
            <div key={med.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between hover:border-blue-200 transition">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">{med.name}</h3>
                    <p className="text-xs text-gray-500">{med.purpose || 'Prescription medication'}</p>
                  </div>
                  {getFoodTimingBadge(med.foodTiming)}
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-slate-700">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="font-bold text-slate-900">Dosage:</span> {med.dosage} • <span className="font-bold text-slate-900">Frequency:</span> {med.frequency.replace('_', ' ')}
                  </div>
                  <div><span className="font-bold text-slate-800">Alarms:</span> {med.reminderTimes.join(', ')}</div>
                  <div><span className="font-bold text-slate-800">Period:</span> {med.startDate} {med.endDate ? `to ${med.endDate}` : '(Ongoing)'}</div>
                  {med.instructions && (
                    <div className="bg-blue-50/60 p-2.5 rounded-xl border border-blue-100 text-slate-700 mt-2">
                      <span className="font-bold text-blue-900">Doctor Instructions:</span> {med.instructions}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => onOpenEditModal(med)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center space-x-1 py-2 px-3 rounded-lg hover:bg-blue-50 min-h-[40px]"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => onDeleteMedicine(med.id)}
                  className="text-xs text-red-600 hover:text-red-800 font-bold flex items-center space-x-1 py-2 px-3 rounded-lg hover:bg-red-50 min-h-[40px]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={onOpenAddModal}
            className="p-6 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 hover:bg-blue-50/30 text-slate-500 hover:text-blue-700 flex flex-col items-center justify-center transition min-h-[160px]"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
              <Plus className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm text-slate-900">+ Add New Medicine</span>
            <span className="text-xs text-gray-400 mt-0.5">Syrup, drops, tablet, or tonic</span>
          </button>
        </div>
      )}

      {/* Safety & Adherence Guidelines */}
      <div className="bg-white border border-gray-200 p-4 sm:p-5 rounded-2xl text-xs text-gray-600 space-y-1.5 shadow-xs">
        <div className="font-bold text-sm flex items-center space-x-2 text-slate-900">
          <Info className="w-4 h-4 text-blue-600" />
          <span>Medicine Safety & Compliance Rules</span>
        </div>
        <p>• <strong className="text-slate-900">Antibiotics:</strong> Complete the full course prescribed by your doctor even if symptoms resolve earlier.</p>
        <p>• <strong className="text-slate-900">Fever/Pain Syrups:</strong> Follow pediatric measuring syringes/droppers carefully; administer after food when instructed.</p>
        <p>• <strong className="text-slate-900">Missed Dose:</strong> Administer as soon as remembered unless it is close to the next scheduled dose. Never double the dose.</p>
      </div>
    </div>
  );
};
