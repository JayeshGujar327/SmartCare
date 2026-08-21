import React, { useState, useMemo } from 'react';
import {
  Megaphone,
  Calendar,
  MapPin,
  ShieldCheck,
  Users,
  AlertCircle,
  Clock,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  PlusCircle,
  Share2,
  Bell,
  Building,
  Info,
  Layers,
  Check,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  BookmarkPlus,
  Compass
} from 'lucide-react';
import {
  Language,
  AreaVaccinationRequirement,
  PatientProfile,
  VaccinationScheduleItem
} from '../types';
import { translations } from '../services/i18n';

interface AreaCampaignsViewProps {
  language: Language;
  campaigns: AreaVaccinationRequirement[];
  userState?: string;
  userDistrict?: string;
  activePatient?: PatientProfile | null;
  patientAge?: string;
  scheduleItems?: VaccinationScheduleItem[];
  isAdmin?: boolean;
  onNavigateToCenters?: () => void;
  onNavigateToAi?: (prompt: string) => void;
  onAnnounceCampaign?: () => void;
  onSetReminderForCampaign?: (campaign: AreaVaccinationRequirement) => void;
  onRecordVaccineForPatient?: (vaccineName: string) => void;
}

export const AreaCampaignsView: React.FC<AreaCampaignsViewProps> = ({
  language,
  campaigns,
  userState = 'Maharashtra',
  userDistrict = 'Pune',
  activePatient,
  patientAge,
  scheduleItems = [],
  isAdmin = false,
  onNavigateToCenters,
  onNavigateToAi,
  onAnnounceCampaign,
  onSetReminderForCampaign,
  onRecordVaccineForPatient,
}) => {
  const t = translations[language];

  // Interactive filtering states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'ROUTINE'>('ALL');
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'past' | 'all'>('active');

  // Interactive detail modal / drawer state
  const [selectedCampaign, setSelectedCampaign] = useState<AreaVaccinationRequirement | null>(null);
  const [savedCampaignIds, setSavedCampaignIds] = useState<string[]>([]);
  const [reminderToast, setReminderToast] = useState<string | null>(null);

  // Extract unique states and districts
  const uniqueStates = useMemo(() => {
    const states = new Set<string>();
    campaigns.forEach(c => {
      if (c.state) states.add(c.state);
    });
    return Array.from(states);
  }, [campaigns]);

  const uniqueDistricts = useMemo(() => {
    const districts = new Set<string>();
    campaigns.forEach(c => {
      if (selectedState === 'ALL' || c.state === selectedState || c.state === 'All India') {
        if (c.district) districts.add(c.district);
      }
    });
    return Array.from(districts);
  }, [campaigns, selectedState]);

  // Today ISO string for date comparisons
  const todayStr = new Date().toISOString().split('T')[0];

  // Filtered campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(camp => {
      // 1. Search Query
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = camp.title?.toLowerCase().includes(q);
        const matchesDesc = camp.description?.toLowerCase().includes(q);
        const matchesRegion = (camp.district + ' ' + camp.state + ' ' + (camp.city || '')).toLowerCase().includes(q);
        const matchesVaccines = camp.vaccines?.some(v => v.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesRegion && !matchesVaccines) {
          return false;
        }
      }

      // 2. State Filter
      if (selectedState !== 'ALL') {
        if (camp.state !== selectedState && camp.state !== 'All India') return false;
      }

      // 3. District Filter
      if (selectedDistrict !== 'ALL') {
        if (camp.district !== selectedDistrict && camp.district !== 'National') return false;
      }

      // 4. Priority Filter
      if (priorityFilter !== 'ALL') {
        if (camp.priority !== priorityFilter) return false;
      }

      // 5. Active / Upcoming / Past Date Filter
      if (activeTab === 'active') {
        return camp.startDate <= todayStr && camp.endDate >= todayStr;
      } else if (activeTab === 'upcoming') {
        return camp.startDate > todayStr;
      } else if (activeTab === 'past') {
        return camp.endDate < todayStr;
      }

      return true;
    });
  }, [campaigns, searchTerm, selectedState, selectedDistrict, priorityFilter, activeTab, todayStr]);

  // Toggle bookmark / saved
  const toggleSaveCampaign = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedCampaignIds.includes(id)) {
      setSavedCampaignIds(prev => prev.filter(item => item !== id));
    } else {
      setSavedCampaignIds(prev => [...prev, id]);
    }
  };

  const handleSetReminder = (camp: AreaVaccinationRequirement, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onSetReminderForCampaign) {
      onSetReminderForCampaign(camp);
    } else {
      setReminderToast(`SMS & WhatsApp reminder set for ${camp.title}`);
      setTimeout(() => setReminderToast(null), 3500);
    }
  };

  // Check if any vaccine in campaign matches child's pending schedule
  const checkChildEligibility = (camp: AreaVaccinationRequirement) => {
    if (!activePatient || !scheduleItems.length) return null;

    const pendingOrMissed = scheduleItems.filter(s => s.status === 'MISSED' || s.status === 'DUE' || s.status === 'UPCOMING');
    const matchedVaccines = camp.vaccines.filter(campVax => {
      return pendingOrMissed.some(p => 
        campVax.toLowerCase().includes(p.vaccineCode.toLowerCase()) || 
        p.vaccineName.toLowerCase().includes(campVax.toLowerCase()) ||
        (campVax.includes('MR') && p.vaccineCode.includes('MR')) ||
        (campVax.includes('Polio') && p.vaccineCode.includes('OPV')) ||
        (campVax.includes('Pentavalent') && p.vaccineCode.includes('Penta'))
      );
    });

    if (matchedVaccines.length > 0) {
      return {
        isEligible: true,
        matchedVaccines,
        message: `High benefit for ${activePatient.name}: Matches ${matchedVaccines.join(', ')} in current schedule.`
      };
    }
    return {
      isEligible: false,
      matchedVaccines: [],
      message: `Universal protection drive open for ${camp.targetAgeGroup}`
    };
  };

  return (
    <div className="space-y-6">
      {/* Toast banner */}
      {reminderToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center space-x-3 text-sm animate-bounce">
          <Bell className="w-5 h-5 text-emerald-400" />
          <span>{reminderToast}</span>
        </div>
      )}

      {/* Header Banner with High-Level Metrics & Quick Actions */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-6 rounded-2xl shadow-md border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                <Megaphone className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {t.campaigns.title}
              </h1>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                Live Public Health Drives
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {t.campaigns.subtitle} Track national pulse polio rounds, Intensified Mission Indradhanush (IMI), Vitamin A weeks, and district catch-up drives.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {onAnnounceCampaign && (
              <button
                onClick={onAnnounceCampaign}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Announce Drive</span>
              </button>
            )}

            {onNavigateToCenters && (
              <button
                onClick={onNavigateToCenters}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 border border-white/10"
              >
                <Building className="w-4 h-4 text-blue-300" />
                <span>View Vaccination Booths</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Insight Bar for Active Patient */}
        {activePatient && (
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Active Child Profile: <strong>{activePatient.name}</strong> ({patientAge || '6 months'}, {activePatient.district || userDistrict}, {activePatient.state || userState})</span>
            </div>
            <div className="text-slate-400 flex items-center space-x-4">
              <span>Total Active Drives: <strong className="text-white">{campaigns.length}</strong></span>
              <span>100% Free at Government PHCs & Anganwadis</span>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Controls Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('active')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'active'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-gray-600 hover:text-slate-900'
              }`}
            >
              Active Now ({campaigns.filter(c => c.startDate <= todayStr && c.endDate >= todayStr).length})
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'upcoming'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-gray-600 hover:text-slate-900'
              }`}
            >
              Upcoming ({campaigns.filter(c => c.startDate > todayStr).length})
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'all'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-gray-600 hover:text-slate-900'
              }`}
            >
              All Drives ({campaigns.length})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns by vaccine, district, or program..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Region & Priority Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-gray-100 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-gray-500 block mb-1">State / Region</label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('ALL');
              }}
              className="w-full p-2 border border-gray-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="ALL">All States & National Drives</option>
              {uniqueStates.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 block mb-1">District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="ALL">All Districts</option>
              {uniqueDistricts.map((dst) => (
                <option key={dst} value={dst}>{dst}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-gray-500 block mb-1">Priority Level</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
              className="w-full p-2 border border-gray-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="ALL">All Priorities</option>
              <option value="HIGH">High Priority (Urgent Catch-up)</option>
              <option value="MEDIUM">Medium Priority (Subsidized)</option>
              <option value="ROUTINE">Routine National Rounds</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Active Filter Tags */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-1">
        <span>
          Showing <strong>{filteredCampaigns.length}</strong> campaigns matching your criteria
        </span>
        {(searchTerm || selectedState !== 'ALL' || selectedDistrict !== 'ALL' || priorityFilter !== 'ALL') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedState('ALL');
              setSelectedDistrict('ALL');
              setPriorityFilter('ALL');
              setActiveTab('active');
            }}
            className="text-blue-600 hover:text-blue-700 font-bold hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Campaign Cards Grid */}
      {filteredCampaigns.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No campaigns found</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
              No government or community immunization campaigns match your filter selection. Try changing state or search keywords.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedState('ALL');
              setSelectedDistrict('ALL');
              setPriorityFilter('ALL');
              setActiveTab('all');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-xs transition"
          >
            Show All Available Campaigns
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCampaigns.map((camp) => {
            const eligibility = checkChildEligibility(camp);
            const isSaved = savedCampaignIds.includes(camp.id);
            const isLive = camp.startDate <= todayStr && camp.endDate >= todayStr;

            return (
              <div
                key={camp.id}
                onClick={() => setSelectedCampaign(camp)}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer group hover:border-blue-300 relative"
              >
                <div>
                  {/* Priority & Free Status Badges */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          camp.priority === 'HIGH'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : camp.priority === 'MEDIUM'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {camp.priority} Priority
                      </span>

                      {isLive ? (
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>Active Now</span>
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
                          Starts {camp.startDate}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <span className="text-[11px] bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded-full border border-teal-200">
                        {camp.isFree ? '100% Free (Govt)' : 'Subsidized'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => toggleSaveCampaign(camp.id, e)}
                        title={isSaved ? 'Remove from Saved' : 'Save Drive'}
                        className={`p-1 rounded-lg border transition ${
                          isSaved
                            ? 'bg-amber-50 border-amber-300 text-amber-600'
                            : 'border-gray-200 text-gray-400 hover:text-slate-700 hover:bg-gray-50'
                        }`}
                      >
                        <BookmarkPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition">
                    {camp.title}
                  </h2>
                  <p className="text-xs text-gray-600 mt-1.5 leading-relaxed line-clamp-2">
                    {camp.description}
                  </p>

                  {/* Child Personalized Match Alert */}
                  {eligibility && eligibility.isEligible && (
                    <div className="mt-3 p-2.5 bg-emerald-50/80 rounded-xl border border-emerald-200 flex items-start space-x-2 text-xs text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-emerald-800">Child Milestone Match</span>
                        <span className="text-[11px] text-emerald-700 leading-snug">{eligibility.message}</span>
                      </div>
                    </div>
                  )}

                  {/* Campaign Meta Specifications Box */}
                  <div className="mt-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>
                        <strong>Region:</strong> {camp.state} {camp.district && camp.district !== 'National' ? `(${camp.district})` : ''} {camp.city ? `• ${camp.city}` : ''}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>
                        <strong>Dates:</strong> {camp.startDate} to {camp.endDate}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>
                        <strong>Target Group:</strong> {camp.targetAgeGroup}
                      </span>
                    </div>
                  </div>

                  {/* Vaccines Offered Badges */}
                  <div className="mt-3 pt-2.5 border-t border-gray-100">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                      Vaccines Administered:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {camp.vaccines.map((v, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded-lg font-medium border border-blue-100"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Campaign Interactive Action Footer */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2 text-xs">
                  <button
                    type="button"
                    onClick={(e) => handleSetReminder(camp, e)}
                    className="text-slate-600 hover:text-blue-600 font-semibold flex items-center space-x-1 py-1 px-2 rounded-lg hover:bg-blue-50 transition"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Set Reminder</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Government Primary Health Center PHC ' + (camp.city || camp.district) + ' ' + camp.state)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg transition flex items-center space-x-1"
                    >
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>Map PHC</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSelectedCampaign(camp)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3.5 py-1.5 rounded-lg shadow-xs transition flex items-center space-x-1"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Campaign Detailed Drawer / Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 space-y-5 my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3.5 border-b border-gray-200 gap-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      selectedCampaign.priority === 'HIGH'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {selectedCampaign.priority} Priority Campaign
                  </span>
                  <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {selectedCampaign.isFree ? '100% Free Govt Drive' : 'Subsidized'}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {selectedCampaign.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="text-gray-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-gray-100 font-bold transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs text-slate-700 max-h-[65vh] overflow-y-auto pr-1">
              {/* Objective */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                  Campaign Objective & Summary
                </h4>
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  {selectedCampaign.description}
                </p>
              </div>

              {/* Instructions & Guidelines */}
              {selectedCampaign.instructions && (
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                    Beneficiary Instructions & Protocols
                  </h4>
                  <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-200/80 text-blue-950 flex items-start space-x-2.5">
                    <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{selectedCampaign.instructions}</p>
                  </div>
                </div>
              )}

              {/* Key Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                <div className="space-y-1">
                  <span className="text-gray-500 font-semibold block text-[11px]">Region & Jurisdictions:</span>
                  <span className="font-bold text-slate-900 text-xs">
                    {selectedCampaign.state} ({selectedCampaign.district}) {selectedCampaign.city ? `• ${selectedCampaign.city}` : ''}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 font-semibold block text-[11px]">Active Dates:</span>
                  <span className="font-bold text-slate-900 text-xs">
                    {selectedCampaign.startDate} through {selectedCampaign.endDate}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 font-semibold block text-[11px]">Eligible Cohort:</span>
                  <span className="font-bold text-slate-900 text-xs">{selectedCampaign.targetAgeGroup}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-gray-500 font-semibold block text-[11px]">Issuing Health Authority:</span>
                  <span className="font-bold text-slate-900 text-xs">{selectedCampaign.source || 'Public Health Department'}</span>
                </div>
              </div>

              {/* Vaccines Given List */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  Vaccines Administered in this Round:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCampaign.vaccines.map((v, i) => (
                    <div
                      key={i}
                      className="bg-white border border-blue-200 text-blue-800 px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1.5 shadow-2xs"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Child Matching Advice */}
              {activePatient && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 space-y-1">
                  <span className="font-bold text-xs flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Parent Advisory for {activePatient.name}</span>
                  </span>
                  <p className="text-[11px] leading-relaxed text-amber-800">
                    You can visit any authorized Primary Health Center (PHC), Community Health Center (CHC), or Anganwadi booth in {selectedCampaign.district || userDistrict} with your child's Mother & Child Protection (MCP) card to receive these doses.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleSetReminder(selectedCampaign)}
                  className="px-3.5 py-2 border border-gray-200 rounded-xl font-bold text-slate-700 hover:bg-gray-50 flex items-center space-x-1.5 transition"
                >
                  <Bell className="w-4 h-4 text-slate-600" />
                  <span>Notify Me</span>
                </button>

                {onNavigateToAi && (
                  <button
                    type="button"
                    onClick={() => {
                      const prompt = `Tell me more about the "${selectedCampaign.title}" campaign in ${selectedCampaign.state}, including who is eligible, which vaccines are administered, and why it is important for my child.`;
                      setSelectedCampaign(null);
                      onNavigateToAi(prompt);
                    }}
                    className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl font-bold flex items-center space-x-1.5 transition"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Ask AI About Drive</span>
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Government Primary Health Center PHC ' + (selectedCampaign.city || selectedCampaign.district) + ' ' + selectedCampaign.state)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition flex items-center space-x-1.5 shadow-xs"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Find Nearest Center / Booth</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
