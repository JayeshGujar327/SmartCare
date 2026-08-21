import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Check,
  Filter,
  Info,
  ShieldCheck,
  Plus,
  Hospital,
  UserCheck,
  Tag,
  Search,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import {
  Language,
  PatientProfile,
  VaccinationScheduleItem,
  VaccineStatus
} from '../types';
import { translations } from '../services/i18n';

interface VaccinationTrackerViewProps {
  language: Language;
  patient: PatientProfile | null;
  patientAge: string;
  scheduleItems: VaccinationScheduleItem[];
  onOpenRecordVaccineModal: (item: VaccinationScheduleItem) => void;
  onQuickComplete: (item: VaccinationScheduleItem) => void;
}

export const VaccinationTrackerView: React.FC<VaccinationTrackerViewProps> = ({
  language,
  patient,
  patientAge,
  scheduleItems,
  onOpenRecordVaccineModal,
  onQuickComplete,
}) => {
  const t = translations[language];
  const [statusFilter, setStatusFilter] = useState<'ALL' | VaccineStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  if (!patient) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-xs my-4">
        <p className="text-slate-500 font-medium text-sm">Please select a patient profile to view vaccination schedules.</p>
      </div>
    );
  }

  // Filter items
  const filtered = scheduleItems.filter((item) => {
    const matchesFilter = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      item.vaccineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vaccineCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.diseaseTarget.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recommendedAgeText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Group by Age Milestones
  const ageGroups: { label: string; items: VaccinationScheduleItem[] }[] = [];
  const groupMap = new Map<string, VaccinationScheduleItem[]>();

  for (const item of filtered) {
    const ageKey = item.recommendedAgeText;
    if (!groupMap.has(ageKey)) {
      groupMap.set(ageKey, []);
    }
    groupMap.get(ageKey)!.push(item);
  }

  groupMap.forEach((items, label) => {
    ageGroups.push({ label, items });
  });

  const completedCount = scheduleItems.filter(i => i.status === 'COMPLETED').length;
  const dueCount = scheduleItems.filter(i => i.status === 'DUE').length;
  const missedCount = scheduleItems.filter(i => i.status === 'MISSED').length;
  const upcomingCount = scheduleItems.filter(i => i.status === 'UPCOMING').length;

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Header & Overview Card */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {t.vaccines.title}
              </h1>
              <span className="text-[10px] sm:text-xs bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded-full border border-blue-100 uppercase">
                UIP India
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Tracking milestones for <span className="font-bold text-slate-800">{patient.name}</span> ({patientAge})
            </p>
          </div>

          {/* Mobile-Friendly Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search vaccines, diseases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 hover:bg-slate-200/60 focus:bg-white border border-transparent focus:border-blue-500 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm outline-none text-slate-900 transition min-h-[44px]"
            />
          </div>
        </div>

        {/* Status Filter Chips (Touch Friendly Carousel) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 mt-3 border-t border-gray-100 text-xs">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition min-h-[40px] flex items-center space-x-1.5 ${
              statusFilter === 'ALL'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>All Doses</span>
            <span className="bg-white/20 px-1.5 py-0.2 rounded-full text-[10px]">{scheduleItems.length}</span>
          </button>

          <button
            onClick={() => setStatusFilter('COMPLETED')}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition min-h-[40px] flex items-center space-x-1.5 ${
              statusFilter === 'COMPLETED'
                ? 'bg-green-600 text-white shadow-xs'
                : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed</span>
            <span className="bg-green-700 text-white px-1.5 py-0.2 rounded-full text-[10px]">{completedCount}</span>
          </button>

          <button
            onClick={() => setStatusFilter('DUE')}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition min-h-[40px] flex items-center space-x-1.5 ${
              statusFilter === 'DUE'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Due</span>
            <span className="bg-amber-700 text-white px-1.5 py-0.2 rounded-full text-[10px]">{dueCount}</span>
          </button>

          <button
            onClick={() => setStatusFilter('MISSED')}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition min-h-[40px] flex items-center space-x-1.5 ${
              statusFilter === 'MISSED'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Missed</span>
            <span className="bg-red-600 text-white px-1.5 py-0.2 rounded-full text-[10px]">{missedCount}</span>
          </button>

          <button
            onClick={() => setStatusFilter('UPCOMING')}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition min-h-[40px] flex items-center space-x-1.5 ${
              statusFilter === 'UPCOMING'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Upcoming</span>
            <span className="bg-indigo-700 text-white px-1.5 py-0.2 rounded-full text-[10px]">{upcomingCount}</span>
          </button>
        </div>
      </div>

      {/* Schedule Items Grouped by Age Milestone */}
      {ageGroups.length > 0 ? (
        <div className="space-y-4 sm:space-y-6">
          {ageGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
              
              {/* Milestone Age Header */}
              <div className="bg-slate-50 px-4 sm:px-6 py-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <h2 className="font-extrabold text-slate-800 text-xs sm:text-sm uppercase tracking-wider">
                    Milestone: {group.label}
                  </h2>
                </div>
                <span className="text-[11px] text-slate-600 font-bold bg-white px-2.5 py-0.5 rounded-full border border-gray-200">
                  {group.items.length} dose{group.items.length > 1 ? 's' : ''}
                </span>
              </div>

              {/* Doses in this group: Mobile Card Stack */}
              <div className="divide-y divide-gray-100">
                {group.items.map((item) => (
                  <div key={item.id} className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Left: Vaccine Info */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-base sm:text-lg">
                          {item.vaccineName}
                        </span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
                          {item.vaccineCode} • Dose {item.doseNumber}
                        </span>
                        {item.isNationalSchedule && (
                          <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded-md border border-green-200">
                            Free at Govt PHC
                          </span>
                        )}
                      </div>

                      <div className="text-xs sm:text-sm text-slate-600 flex items-baseline space-x-1">
                        <span className="font-semibold text-slate-700">Protects:</span>
                        <span>{item.diseaseTarget}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                          📅 Target: <span className="font-bold text-slate-900">{item.expectedDate}</span>
                        </span>
                        {item.completedDate && (
                          <span className="bg-green-50 text-green-800 border border-green-200 px-2.5 py-1 rounded-lg font-bold">
                            ✅ Given: {item.completedDate}
                          </span>
                        )}
                        {item.batchNumber && (
                          <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                            Batch: {item.batchNumber}
                          </span>
                        )}
                      </div>

                      {/* Catch-up guidance card if missed */}
                      {item.status === 'MISSED' && item.catchUpGuidance && (
                        <div className="mt-2 bg-red-50 border border-red-200 p-3 rounded-xl text-xs text-red-900 leading-relaxed">
                          <span className="font-bold">IAP Catch-up Guidance: </span>
                          <span>{item.catchUpGuidance}</span>
                        </div>
                      )}
                    </div>

                    {/* Right: Status badge & Action buttons */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      
                      {/* Status Badge */}
                      <div>
                        {item.status === 'COMPLETED' && (
                          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-green-100 text-green-700 inline-flex items-center space-x-1">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                            <span>{t.statuses.completed}</span>
                          </span>
                        )}
                        {item.status === 'DUE' && (
                          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 text-amber-800 inline-flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <span>{t.statuses.due}</span>
                          </span>
                        )}
                        {item.status === 'MISSED' && (
                          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-red-100 text-red-700 inline-flex items-center space-x-1">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <span>{t.statuses.missed}</span>
                          </span>
                        )}
                        {item.status === 'UPCOMING' && (
                          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 inline-flex items-center space-x-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{t.statuses.upcoming}</span>
                          </span>
                        )}
                      </div>

                      {/* Action buttons (44px min height touch target) */}
                      {item.status !== 'COMPLETED' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onQuickComplete(item)}
                            className="text-xs bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-bold px-3 py-2.5 rounded-xl transition min-h-[44px]"
                            title="Quick mark completed with today's date"
                          >
                            Mark Done
                          </button>
                          <button
                            onClick={() => onOpenRecordVaccineModal(item)}
                            className="text-xs bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold px-3.5 py-2.5 rounded-xl shadow-xs transition min-h-[44px] flex items-center space-x-1"
                          >
                            <span>Record</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => onOpenRecordVaccineModal(item)}
                          className="text-xs bg-slate-100 hover:bg-blue-50 text-blue-700 font-bold px-3 py-2 rounded-xl transition min-h-[40px]"
                        >
                          Edit Record
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-10 text-center bg-white rounded-2xl border border-gray-200 shadow-xs">
          <p className="text-gray-500 font-medium text-sm">{t.vaccines.noVaccinesFound}</p>
        </div>
      )}

      {/* Official Guidelines Disclaimer */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 text-xs text-gray-600 flex items-start space-x-2.5 shadow-xs">
        <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
        <div className="leading-relaxed">
          <span className="font-bold text-slate-900">Official Immunization Protocol: </span>
          Generated according to National Universal Immunization Programme (UIP India) & IAP recommendations. Always present your physical RCH / MCP booklet during clinic consultations.
        </div>
      </div>
    </div>
  );
};
