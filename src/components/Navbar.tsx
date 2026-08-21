import React, { useState } from 'react';
import {
  Shield,
  User as UserIcon,
  Globe,
  Bell,
  Plus,
  Settings,
  ChevronDown,
  CheckCircle2,
  Calendar,
  Pill,
  QrCode,
  MapPin,
  Bot,
  Megaphone,
  UserCheck,
  TrendingUp,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Home,
  SlidersHorizontal
} from 'lucide-react';
import { Language, PatientProfile, User } from '../types';
import { translations } from '../services/i18n';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  patients: PatientProfile[];
  activePatient: PatientProfile | null;
  setActivePatientId: (id: string) => void;
  onOpenAddPatient: () => void;
  user: User;
  onToggleAdmin: () => void;
  unreadNotifsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  patients,
  activePatient,
  setActivePatientId,
  onOpenAddPatient,
  user,
  onToggleAdmin,
  unreadNotifsCount,
}) => {
  const t = translations[language];
  const [patientDropdownOpen, setPatientDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMoreDrawerOpen, setMobileMoreDrawerOpen] = useState(false);

  // Core navigation items
  const allNavItems = [
    { id: 'dashboard', label: t.nav.dashboard, icon: Home },
    { id: 'vaccinations', label: t.nav.vaccinations, icon: Calendar },
    { id: 'medicines', label: t.nav.medicines, icon: Pill },
    { id: 'growth', label: t.nav.growth, icon: TrendingUp },
    { id: 'aiAssistant', label: t.nav.aiAssistant, icon: Bot },
    { id: 'digitalCard', label: t.nav.digitalCard, icon: QrCode },
    { id: 'centers', label: t.nav.centers, icon: MapPin },
    { id: 'campaigns', label: t.nav.campaigns, icon: Megaphone },
    { id: 'notifications', label: t.nav.notifications, icon: Bell, badge: unreadNotifsCount },
  ];

  // Primary bottom navigation items (5 items)
  const bottomNavItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'vaccinations', label: 'Vaccines', icon: Calendar },
    { id: 'medicines', label: 'Medicines', icon: Pill },
    { id: 'growth', label: 'Growth', icon: TrendingUp },
    { id: 'aiAssistant', label: 'Ask AI', icon: Bot },
  ];

  const isMoreActive = !bottomNavItems.some(item => item.id === currentTab);

  return (
    <>
      {/* Top Header Bar */}
      <header className="bg-white text-slate-800 sticky top-0 z-30 border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* Logo & Brand */}
            <div
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer select-none active:opacity-80 transition py-1"
              onClick={() => setCurrentTab('dashboard')}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-xs text-white font-black text-base sm:text-lg">
                S
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                    SmartCare
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-full border border-blue-100 uppercase">
                    UIP
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-gray-500 hidden sm:block leading-none">
                  Vaccination & Medicine Companion
                </p>
              </div>
            </div>

            {/* Center: Patient Switcher Chip */}
            <div className="relative">
              <button
                id="patient-switcher-btn"
                onClick={() => setPatientDropdownOpen(!patientDropdownOpen)}
                className="flex items-center space-x-1.5 sm:space-x-2 bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200 text-slate-800 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold border border-slate-200 transition min-h-[36px] sm:min-h-[40px]"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] sm:text-xs font-bold shadow-xs">
                  {activePatient ? activePatient.name.charAt(0).toUpperCase() : 'P'}
                </div>
                <div className="text-left max-w-[85px] sm:max-w-[140px] truncate">
                  <span className="font-semibold text-slate-900 block truncate text-xs sm:text-sm">
                    {activePatient ? activePatient.name : 'Select Profile'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              </button>

              {/* Patient Dropdown Menu */}
              {patientDropdownOpen && (
                <div className="absolute right-0 sm:left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in-50 duration-100">
                  <div className="px-4 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Family Profiles</span>
                    <span className="text-blue-600">{patients.length} Active</span>
                  </div>
                  <div className="max-h-60 overflow-y-auto divide-y divide-gray-50">
                    {patients.map((patient) => (
                      <button
                        key={patient.id}
                        onClick={() => {
                          setActivePatientId(patient.id);
                          setPatientDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between hover:bg-gray-50 active:bg-blue-50 transition min-h-[44px] ${
                          activePatient?.id === patient.id ? 'bg-blue-50/80 text-blue-700 font-semibold' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                            {patient.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">{patient.name}</div>
                            <div className="text-[11px] text-gray-500">
                              DOB: {patient.dob} ({patient.relation})
                            </div>
                          </div>
                        </div>
                        {activePatient?.id === patient.id && (
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 mt-1 pt-2 px-3">
                    <button
                      onClick={() => {
                        setPatientDropdownOpen(false);
                        onOpenAddPatient();
                      }}
                      className="w-full text-left px-3 py-2.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-xl flex items-center space-x-2 transition min-h-[44px]"
                    >
                      <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                      <span>Add New Child / Profile</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right utility buttons */}
            <div className="flex items-center space-x-1.5 sm:space-x-2.5">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  id="language-select-btn"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200 text-slate-700 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-200 transition min-h-[36px] sm:min-h-[40px]"
                >
                  <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="uppercase text-[11px] sm:text-xs">
                    {language}
                  </span>
                  <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-200 py-1.5 z-50">
                    <button
                      onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3.5 py-2 text-xs hover:bg-gray-50 flex items-center justify-between min-h-[40px] ${
                        language === 'en' ? 'text-blue-600 font-bold bg-blue-50/60' : 'text-slate-700'
                      }`}
                    >
                      <span>English</span>
                      {language === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                    </button>
                    <button
                      onClick={() => { setLanguage('hi'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3.5 py-2 text-xs hover:bg-gray-50 flex items-center justify-between min-h-[40px] ${
                        language === 'hi' ? 'text-blue-600 font-bold bg-blue-50/60' : 'text-slate-700'
                      }`}
                    >
                      <span>हिन्दी</span>
                      {language === 'hi' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                    </button>
                    <button
                      onClick={() => { setLanguage('mr'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3.5 py-2 text-xs hover:bg-gray-50 flex items-center justify-between min-h-[40px] ${
                        language === 'mr' ? 'text-blue-600 font-bold bg-blue-50/60' : 'text-slate-700'
                      }`}
                    >
                      <span>मराठी</span>
                      {language === 'mr' && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                    </button>
                  </div>
                )}
              </div>

              {/* Notification icon button */}
              <button
                onClick={() => setCurrentTab('notifications')}
                className={`relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition min-w-[36px] min-h-[36px] flex items-center justify-center ${
                  currentTab === 'notifications' ? 'bg-blue-50 text-blue-600' : ''
                }`}
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
                )}
              </button>

              {/* Admin Portal Switcher (Desktop or Tablet) */}
              <button
                id="admin-toggle-btn"
                onClick={onToggleAdmin}
                className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition min-h-[36px] ${
                  user.role === 'ADMIN'
                    ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200/80'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-slate-600" />
                <span>{user.role === 'ADMIN' ? 'Admin Portal' : 'Parent View'}</span>
              </button>

              {/* Mobile More/Menu Drawer Toggle Button */}
              <button
                onClick={() => setMobileMoreDrawerOpen(true)}
                className="md:hidden p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition min-w-[36px] min-h-[36px] flex items-center justify-center"
                title="More Options"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links Strip */}
          <nav className="hidden md:flex space-x-1 pb-2 pt-1 border-t border-gray-100 overflow-x-auto text-sm no-scrollbar">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors min-h-[40px] ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-slate-900'
                  }`}
                >
                  {isActive ? (
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0"></span>
                  ) : null}
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 ? (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-red-100 text-red-600 rounded-full">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}

            {user.role === 'ADMIN' && (
              <button
                id="nav-admin"
                onClick={() => setCurrentTab('admin')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors min-h-[40px] ${
                  currentTab === 'admin'
                    ? 'bg-amber-50 text-amber-700 font-semibold'
                    : 'text-amber-700 hover:bg-amber-50/60'
                }`}
              >
                {currentTab === 'admin' ? (
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full shrink-0"></span>
                ) : null}
                <Settings className="w-4 h-4 text-amber-600" />
                <span>{t.nav.admin}</span>
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Persistent Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-lg px-2 pt-1 pb-[calc(0.4rem+env(safe-area-inset-bottom,0px))]">
        <div className="grid grid-cols-6 gap-1 items-center max-w-md mx-auto">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMoreDrawerOpen(false);
                }}
                className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition touch-manipulation min-h-[50px] ${
                  isActive
                    ? 'text-blue-600 font-bold'
                    : 'text-gray-500 hover:text-slate-800'
                }`}
              >
                <div className={`relative p-1 rounded-xl transition ${isActive ? 'bg-blue-50 text-blue-600' : ''}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                </div>
                <span className={`text-[10px] tracking-tight mt-0.5 leading-none ${isActive ? 'font-bold text-blue-600' : 'font-medium text-gray-500'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* More Menu Pill Button */}
          <button
            onClick={() => setMobileMoreDrawerOpen(!mobileMoreDrawerOpen)}
            className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition touch-manipulation min-h-[50px] ${
              isMoreActive || mobileMoreDrawerOpen
                ? 'text-blue-600 font-bold'
                : 'text-gray-500 hover:text-slate-800'
            }`}
          >
            <div className={`relative p-1 rounded-xl transition ${isMoreActive || mobileMoreDrawerOpen ? 'bg-blue-50 text-blue-600' : ''}`}>
              <SlidersHorizontal className={`w-5 h-5 ${isMoreActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </div>
            <span className={`text-[10px] tracking-tight mt-0.5 leading-none ${isMoreActive || mobileMoreDrawerOpen ? 'font-bold text-blue-600' : 'font-medium text-gray-500'}`}>
              More
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Up "More" Sheet Drawer */}
      {mobileMoreDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end animate-in fade-in duration-200">
          <div className="w-full bg-white rounded-t-3xl shadow-2xl border-t border-gray-200 p-5 space-y-4 max-h-[85vh] overflow-y-auto pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
            
            {/* Top Sheet Drag Handle & Close */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Quick Healthcare Navigation</h3>
              </div>
              <button
                onClick={() => setMobileMoreDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Grid of additional healthcare tools */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => {
                  setCurrentTab('digitalCard');
                  setMobileMoreDrawerOpen(false);
                }}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition min-h-[88px] ${
                  currentTab === 'digitalCard'
                    ? 'bg-blue-50 border-blue-200 text-blue-900'
                    : 'bg-slate-50/80 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{t.nav.digitalCard}</h4>
                  <p className="text-[10px] text-gray-500">QR Code Certificate</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('centers');
                  setMobileMoreDrawerOpen(false);
                }}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition min-h-[88px] ${
                  currentTab === 'centers'
                    ? 'bg-blue-50 border-blue-200 text-blue-900'
                    : 'bg-slate-50/80 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{t.nav.centers}</h4>
                  <p className="text-[10px] text-gray-500">Find Nearby PHC/Hospitals</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('campaigns');
                  setMobileMoreDrawerOpen(false);
                }}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition min-h-[88px] ${
                  currentTab === 'campaigns'
                    ? 'bg-blue-50 border-blue-200 text-blue-900'
                    : 'bg-slate-50/80 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{t.nav.campaigns}</h4>
                  <p className="text-[10px] text-gray-500">Pulse Polio & Drives</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('notifications');
                  setMobileMoreDrawerOpen(false);
                }}
                className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition min-h-[88px] ${
                  currentTab === 'notifications'
                    ? 'bg-blue-50 border-blue-200 text-blue-900'
                    : 'bg-slate-50/80 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 flex items-center justify-center mb-2 relative">
                  <Bell className="w-4 h-4" />
                  {unreadNotifsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{t.nav.notifications}</h4>
                  <p className="text-[10px] text-gray-500">{unreadNotifsCount} New Alerts</p>
                </div>
              </button>
            </div>

            {/* Profile and Admin Switcher bar inside Drawer */}
            <div className="pt-2 space-y-2 border-t border-gray-100">
              <button
                onClick={() => {
                  onToggleAdmin();
                  setMobileMoreDrawerOpen(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition min-h-[44px]"
              >
                <div className="flex items-center space-x-2.5">
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span>Switch Mode ({user.role === 'ADMIN' ? 'Parent Mode' : 'Admin Portal'})</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => {
                  setMobileMoreDrawerOpen(false);
                  onOpenAddPatient();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100 transition min-h-[44px]"
              >
                <div className="flex items-center space-x-2.5">
                  <Plus className="w-4 h-4 text-blue-600" />
                  <span>Add New Child / Family Profile</span>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
