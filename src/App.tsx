import React, { useState, useEffect } from 'react';
import {
  Shield,
  HeartPulse,
  Plus,
  RefreshCw,
  Bell,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

import {
  Language,
  PatientProfile,
  User,
  VaccinationScheduleItem,
  VaccinationScoreData,
  MedicineItem,
  MedicineLog,
  VaccinationCenter,
  AreaVaccinationRequirement,
  NotificationPreference,
  NotificationLog
} from './types';
import { translations } from './services/i18n';

import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { VaccinationTrackerView } from './components/VaccinationTrackerView';
import { MedicineReminderView } from './components/MedicineReminderView';
import { GrowthTrackingView } from './components/GrowthTrackingView';
import { DigitalCardView } from './components/DigitalCardView';
import { NearbyCentersView } from './components/NearbyCentersView';
import { SmartCareAIChatView } from './components/SmartCareAIChatView';
import { AreaCampaignsView } from './components/AreaCampaignsView';
import { NotificationsView } from './components/NotificationsView';
import { AdminPortalView } from './components/AdminPortalView';

import {
  PatientModal,
  RecordVaccineModal,
  MedicineModal,
  AddCenterModal,
  AddCampaignModal
} from './components/Modals';

export default function App() {
  // App-level state
  const [language, setLanguage] = useState<Language>('en');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [user, setUser] = useState<User>({
    id: 'user-demo-1',
    name: 'Priya & Rahul Sharma',
    mobile: '9876543210',
    email: 'sharma.family@example.com',
    role: 'USER',
    preferredLanguage: 'en',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Pune',
    createdAt: new Date().toISOString()
  });

  // Patient profiles & Active patient
  const [patients, setPatients] = useState<PatientProfile[]>([]);
  const [activePatientId, setActivePatientId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Active patient data
  const [scheduleItems, setScheduleItems] = useState<VaccinationScheduleItem[]>([]);
  const [patientAge, setPatientAge] = useState<string>('6 months');
  const [metrics, setMetrics] = useState<VaccinationScoreData | null>(null);

  // Medicines
  const [medicines, setMedicines] = useState<MedicineItem[]>([]);
  const [todaySlots, setTodaySlots] = useState<(MedicineLog & { medicineName: string; dosage: string; foodTiming: string; instructions?: string })[]>([]);

  // Directory & Campaigns
  const [centers, setCenters] = useState<VaccinationCenter[]>([]);
  const [campaigns, setCampaigns] = useState<AreaVaccinationRequirement[]>([]);

  // Notifications
  const [preferences, setPreferences] = useState<NotificationPreference | null>(null);
  const [notificationLogs, setNotificationLogs] = useState<NotificationLog[]>([]);

  // AI Prompt Bridge
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | undefined>(undefined);

  // Modals state
  const [patientModalOpen, setPatientModalOpen] = useState(false);
  const [selectedPatientForEdit, setSelectedPatientForEdit] = useState<PatientProfile | null>(null);

  const [recordVaccineModalOpen, setRecordVaccineModalOpen] = useState(false);
  const [selectedScheduleItemForRecord, setSelectedScheduleItemForRecord] = useState<VaccinationScheduleItem | null>(null);

  const [medicineModalOpen, setMedicineModalOpen] = useState(false);
  const [selectedMedicineForEdit, setSelectedMedicineForEdit] = useState<MedicineItem | null>(null);

  const [addCenterModalOpen, setAddCenterModalOpen] = useState(false);
  const [addCampaignModalOpen, setAddCampaignModalOpen] = useState(false);

  // Toast banner
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Active patient object
  const activePatient = patients.find(p => p.id === activePatientId) || patients[0] || null;

  // 1. Initial Load: Fetch Patients, Centers, Campaigns, Preferences
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [patientsRes, centersRes, campRes, prefsRes, notifsRes] = await Promise.all([
        fetch('/api/patients', { headers: { 'x-user-id': user.id } }).then(r => r.json()),
        fetch('/api/centers').then(r => r.json()),
        fetch('/api/area-requirements').then(r => r.json()),
        fetch(`/api/notifications/preferences/${user.id}`).then(r => r.json()),
        fetch(`/api/notifications/logs/${user.id}`).then(r => r.json())
      ]);

      if (patientsRes.patients && patientsRes.patients.length > 0) {
        setPatients(patientsRes.patients);
        if (!activePatientId) {
          setActivePatientId(patientsRes.patients[0].id);
        }
      }

      if (centersRes.centers) setCenters(centersRes.centers);
      if (campRes.campaigns) setCampaigns(campRes.campaigns);
      if (prefsRes.preferences) setPreferences(prefsRes.preferences);
      if (notifsRes.logs) setNotificationLogs(notifsRes.logs);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [user.id]);

  // 2. When Active Patient Changes: Fetch Schedules & Medicines
  const fetchPatientDetails = async (patientId: string) => {
    if (!patientId) return;
    try {
      const [schedRes, medsRes, todayMedsRes] = await Promise.all([
        fetch(`/api/schedules/${patientId}`).then(r => r.json()),
        fetch(`/api/medicines/${patientId}`).then(r => r.json()),
        fetch(`/api/medicines/${patientId}/today`).then(r => r.json())
      ]);

      if (schedRes.items) {
        setScheduleItems(schedRes.items);
        setPatientAge(schedRes.age ? schedRes.age.formattedText : 'Child');
        setMetrics(schedRes.metrics);
      }

      if (medsRes.medicines) setMedicines(medsRes.medicines);
      if (todayMedsRes.slots) setTodaySlots(todayMedsRes.slots);
    } catch (err) {
      console.error('Failed to load patient schedule and medicines:', err);
    }
  };

  useEffect(() => {
    if (activePatient?.id) {
      fetchPatientDetails(activePatient.id);
    }
  }, [activePatient?.id]);

  // Handle Switch Role (Demo Admin vs Parent)
  const handleToggleAdmin = async () => {
    const nextRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
    try {
      const res = await fetch('/api/auth/demo-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: nextRole })
      });
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        showToast(
          nextRole === 'ADMIN' ? 'Switched to System Admin / Health Officer Mode' : 'Switched to Parent / Patient View',
          'info'
        );
        if (nextRole === 'ADMIN') setCurrentTab('admin');
        else setCurrentTab('dashboard');
      }
    } catch (err) {
      console.error('Role switch error:', err);
    }
  };

  // Handle Save Patient
  const handleSavePatient = async (patientData: Partial<PatientProfile>) => {
    try {
      if (selectedPatientForEdit) {
        const res = await fetch(`/api/patients/${selectedPatientForEdit.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(patientData)
        });
        const data = await res.json();
        if (data.patient) {
          setPatients(patients.map(p => p.id === data.patient.id ? data.patient : p));
          fetchPatientDetails(data.patient.id);
          showToast(`Updated profile for ${data.patient.name}`);
        }
      } else {
        const res = await fetch('/api/patients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-user-id': user.id },
          body: JSON.stringify(patientData)
        });
        const data = await res.json();
        if (data.patient) {
          setPatients([...patients, data.patient]);
          setActivePatientId(data.patient.id);
          fetchPatientDetails(data.patient.id);
          showToast(`Added profile & auto-generated UIP schedule for ${data.patient.name}`);
        }
      }
    } catch (err) {
      console.error('Save patient error:', err);
    }
  };

  // Handle Record Vaccine Completed
  const handleSaveVaccineCompletion = async (completionData: {
    itemId: string;
    completedDate: string;
    administeredCenter: string;
    administeredDoctor?: string;
    batchNumber?: string;
    remarks?: string;
  }) => {
    if (!activePatient) return;
    try {
      const res = await fetch(`/api/schedules/${activePatient.id}/record-completion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completionData)
      });
      const data = await res.json();
      if (data.success && data.item) {
        setScheduleItems(scheduleItems.map(i => i.id === data.item.id ? data.item : i));
        if (data.metrics) setMetrics(data.metrics);
        showToast(`Vaccination recorded: ${data.item.vaccineName}`);
      }
    } catch (err) {
      console.error('Record vaccine error:', err);
    }
  };

  // Quick mark complete
  const handleQuickComplete = (item: VaccinationScheduleItem) => {
    handleSaveVaccineCompletion({
      itemId: item.id,
      completedDate: new Date().toISOString().split('T')[0],
      administeredCenter: 'Primary Health Center (PHC)',
      batchNumber: `BATCH-${Math.floor(1000 + Math.random() * 9000)}`
    });
  };

  // Handle Medicine Status change
  const handleUpdateMedicineSlotStatus = async (logId: string, status: 'TAKEN' | 'MISSED' | 'SKIPPED' | 'UPCOMING') => {
    try {
      const res = await fetch(`/api/medicines/log/${logId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setTodaySlots(todaySlots.map(s => s.id === logId ? { ...s, status, takenAt: data.log.takenAt } : s));
        showToast(status === 'TAKEN' ? 'Dose marked as Taken! Good job.' : `Dose status updated to ${status}`);
      }
    } catch (err) {
      console.error('Medicine status update error:', err);
    }
  };

  // Handle Save Medicine
  const handleSaveMedicine = async (medData: Partial<MedicineItem>) => {
    if (!activePatient) return;
    try {
      if (selectedMedicineForEdit) {
        const res = await fetch(`/api/medicines/${selectedMedicineForEdit.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(medData)
        });
        const data = await res.json();
        if (data.medicine) {
          setMedicines(medicines.map(m => m.id === data.medicine.id ? data.medicine : m));
          fetchPatientDetails(activePatient.id);
          showToast(`Updated prescription for ${data.medicine.name}`);
        }
      } else {
        const res = await fetch('/api/medicines', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-user-id': user.id },
          body: JSON.stringify({ ...medData, patientId: activePatient.id })
        });
        const data = await res.json();
        if (data.medicine) {
          setMedicines([...medicines, data.medicine]);
          fetchPatientDetails(activePatient.id);
          showToast(`Added medicine reminder for ${data.medicine.name}`);
        }
      }
    } catch (err) {
      console.error('Save medicine error:', err);
    }
  };

  // Handle Delete Medicine
  const handleDeleteMedicine = async (id: string) => {
    try {
      const res = await fetch(`/api/medicines/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMedicines(medicines.filter(m => m.id !== id));
        setTodaySlots(todaySlots.filter(s => s.medicineId !== id));
        showToast('Prescription removed');
      }
    } catch (err) {
      console.error('Delete medicine error:', err);
    }
  };

  // Handle Add Center
  const handleSaveCenter = async (centerData: Partial<VaccinationCenter>) => {
    try {
      const res = await fetch('/api/centers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(centerData)
      });
      const data = await res.json();
      if (data.center) {
        setCenters([...centers, data.center]);
        showToast(`Added facility: ${data.center.name}`);
      }
    } catch (err) {
      console.error('Save center error:', err);
    }
  };

  // Handle Add Campaign
  const handleSaveCampaign = async (campaignData: Partial<AreaVaccinationRequirement>) => {
    try {
      const res = await fetch('/api/area-requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData)
      });
      const data = await res.json();
      if (data.campaign) {
        setCampaigns([data.campaign, ...campaigns]);
        showToast(`Announced immunization drive: ${data.campaign.title}`);
      }
    } catch (err) {
      console.error('Save campaign error:', err);
    }
  };

  // Handle Set Campaign Reminder & SMS/WhatsApp Notification Log
  const handleSetCampaignReminder = async (campaign: AreaVaccinationRequirement) => {
    try {
      const res = await fetch('/api/notifications/test-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': user.id },
        body: JSON.stringify({
          channel: 'WHATSAPP',
          message: `SmartCare Drive Alert: "${campaign.title}" is running in ${campaign.district} from ${campaign.startDate} to ${campaign.endDate}. Free vaccines: ${campaign.vaccines.join(', ')}.`,
          title: `Campaign Alert: ${campaign.title}`,
          patientId: activePatient?.id,
          patientName: activePatient?.name
        })
      });
      const data = await res.json();
      if (data.log) {
        setNotificationLogs([data.log, ...notificationLogs]);
      }
      showToast(`Reminder alert registered for ${campaign.title}`);
    } catch (err) {
      console.error('Campaign reminder error:', err);
      showToast(`Reminder alert registered for ${campaign.title}`);
    }
  };

  // Handle Update Notification Preferences
  const handleUpdatePreferences = async (updated: Partial<NotificationPreference>) => {
    try {
      const res = await fetch(`/api/notifications/preferences/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      if (data.preferences) {
        setPreferences(data.preferences);
        showToast('Notification preferences saved');
      }
    } catch (err) {
      console.error('Update preferences error:', err);
    }
  };

  // Handle Trigger Daily Reminders
  const handleTriggerReminders = async () => {
    try {
      const res = await fetch('/api/notifications/trigger-reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': user.id }
      });
      const data = await res.json();
      if (data.logs) {
        setNotificationLogs(data.logs);
      }
      showToast(data.message || 'Reminders evaluated and dispatched successfully!');
    } catch (err) {
      console.error('Trigger reminders error:', err);
    }
  };

  // Handle Send Test Notification
  const handleSendTestNotification = async (channel: 'WHATSAPP' | 'SMS' | 'EMAIL', msg: string) => {
    try {
      const res = await fetch('/api/notifications/test-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': user.id },
        body: JSON.stringify({
          channel,
          message: msg,
          title: `SmartCare ${channel} Alert`,
          patientId: activePatient?.id,
          patientName: activePatient?.name
        })
      });
      const data = await res.json();
      if (data.log) {
        setNotificationLogs([data.log, ...notificationLogs]);
      }
    } catch (err) {
      console.error('Test notification error:', err);
    }
  };

  // Ask AI Helper from dashboard cards
  const handleAskAiQuestion = (question: string) => {
    setAiInitialPrompt(question);
    setCurrentTab('aiAssistant');
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center space-x-2 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-teal-400" />
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        patients={patients}
        activePatient={activePatient}
        setActivePatientId={setActivePatientId}
        onOpenAddPatient={() => {
          setSelectedPatientForEdit(null);
          setPatientModalOpen(true);
        }}
        user={user}
        onToggleAdmin={handleToggleAdmin}
        unreadNotifsCount={metrics?.missedItems ? metrics.missedItems.length : 0}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-28 md:pb-8">
        
        {loading ? (
          <div className="p-12 text-center bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-teal-600 border-t-transparent"></div>
            <p className="mt-3 text-slate-600 font-semibold text-sm">Loading SmartCare Immunization & Medicine Records...</p>
          </div>
        ) : (
          <>
            {currentTab === 'dashboard' && (
              <DashboardView
                language={language}
                patient={activePatient}
                patientAge={patientAge}
                metrics={metrics}
                scheduleItems={scheduleItems}
                todayMedicineSlots={todaySlots}
                nearbyCenters={centers}
                onNavigate={setCurrentTab}
                onMarkMedicineTaken={(logId) => handleUpdateMedicineSlotStatus(logId, 'TAKEN')}
                onOpenRecordVaccineModal={(item) => {
                  setSelectedScheduleItemForRecord(item);
                  setRecordVaccineModalOpen(true);
                }}
                onOpenAddMedicineModal={() => {
                  setSelectedMedicineForEdit(null);
                  setMedicineModalOpen(true);
                }}
                onAskAiQuestion={handleAskAiQuestion}
              />
            )}

            {currentTab === 'vaccinations' && (
              <VaccinationTrackerView
                language={language}
                patient={activePatient}
                patientAge={patientAge}
                scheduleItems={scheduleItems}
                onOpenRecordVaccineModal={(item) => {
                  setSelectedScheduleItemForRecord(item);
                  setRecordVaccineModalOpen(true);
                }}
                onQuickComplete={handleQuickComplete}
              />
            )}

            {currentTab === 'medicines' && (
              <MedicineReminderView
                language={language}
                patient={activePatient}
                medicines={medicines}
                todaySlots={todaySlots}
                onOpenAddModal={() => {
                  setSelectedMedicineForEdit(null);
                  setMedicineModalOpen(true);
                }}
                onOpenEditModal={(med) => {
                  setSelectedMedicineForEdit(med);
                  setMedicineModalOpen(true);
                }}
                onDeleteMedicine={handleDeleteMedicine}
                onUpdateSlotStatus={handleUpdateMedicineSlotStatus}
              />
            )}

            {currentTab === 'growth' && (
              <GrowthTrackingView
                activePatient={activePatient}
                language={language}
                onOpenConsultation={() => {
                  setAiInitialPrompt('What are the recommended nutrition, feeding schedule, and developmental milestone activities for my child?');
                  setCurrentTab('aiAssistant');
                }}
              />
            )}

            {currentTab === 'digitalCard' && (
              <DigitalCardView
                language={language}
                patient={activePatient}
                patientAge={patientAge}
              />
            )}

            {currentTab === 'centers' && (
              <NearbyCentersView
                language={language}
                centers={centers}
                isAdmin={user.role === 'ADMIN'}
                onAddCenterClick={() => setAddCenterModalOpen(true)}
              />
            )}

            {currentTab === 'aiAssistant' && (
              <SmartCareAIChatView
                language={language}
                patient={activePatient}
                patientAge={patientAge}
                initialPrompt={aiInitialPrompt}
              />
            )}

            {currentTab === 'campaigns' && (
              <AreaCampaignsView
                language={language}
                campaigns={campaigns}
                userState={user.state}
                userDistrict={user.district}
                activePatient={activePatient}
                patientAge={patientAge}
                scheduleItems={scheduleItems}
                isAdmin={user.role === 'ADMIN'}
                onNavigateToCenters={() => setCurrentTab('centers')}
                onNavigateToAi={(prompt) => {
                  setAiInitialPrompt(prompt);
                  setCurrentTab('aiAssistant');
                }}
                onAnnounceCampaign={() => setAddCampaignModalOpen(true)}
                onSetReminderForCampaign={handleSetCampaignReminder}
              />
            )}

            {currentTab === 'notifications' && (
              <NotificationsView
                language={language}
                preferences={preferences}
                logs={notificationLogs}
                activePatient={activePatient}
                onUpdatePreferences={handleUpdatePreferences}
                onTriggerReminders={handleTriggerReminders}
                onSendTestNotification={handleSendTestNotification}
              />
            )}

            {currentTab === 'admin' && (
              <AdminPortalView
                language={language}
                onOpenAddCenter={() => setAddCenterModalOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 print:hidden mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-teal-400" />
            <span className="font-bold text-slate-200">SmartCare Universal Immunization & Medicine Manager</span>
          </div>
          <div className="text-center sm:text-right">
            <span>Aligned with National Universal Immunization Programme (UIP India) & IAP Guidelines</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <PatientModal
        isOpen={patientModalOpen}
        onClose={() => setPatientModalOpen(false)}
        onSave={handleSavePatient}
        initialData={selectedPatientForEdit}
      />

      <RecordVaccineModal
        isOpen={recordVaccineModalOpen}
        onClose={() => setRecordVaccineModalOpen(false)}
        item={selectedScheduleItemForRecord}
        onSave={handleSaveVaccineCompletion}
      />

      <MedicineModal
        isOpen={medicineModalOpen}
        onClose={() => setMedicineModalOpen(false)}
        patientId={activePatient?.id || ''}
        onSave={handleSaveMedicine}
        initialData={selectedMedicineForEdit}
      />

      <AddCenterModal
        isOpen={addCenterModalOpen}
        onClose={() => setAddCenterModalOpen(false)}
        onSave={handleSaveCenter}
      />

      <AddCampaignModal
        isOpen={addCampaignModalOpen}
        onClose={() => setAddCampaignModalOpen(false)}
        onSave={handleSaveCampaign}
      />
    </div>
  );
}
