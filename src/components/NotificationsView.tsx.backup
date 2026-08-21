import React, { useState } from 'react';
import {
  Bell,
  MessageSquare,
  Smartphone,
  Mail,
  PhoneCall,
  Send,
  CheckCircle2,
  Clock,
  RefreshCw,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import {
  Language,
  NotificationPreference,
  NotificationLog,
  PatientProfile
} from '../types';
import { translations } from '../services/i18n';

interface NotificationsViewProps {
  language: Language;
  preferences: NotificationPreference | null;
  logs: NotificationLog[];
  activePatient: PatientProfile | null;
  onUpdatePreferences: (prefs: Partial<NotificationPreference>) => void;
  onTriggerReminders: () => void;
  onSendTestNotification: (channel: 'WHATSAPP' | 'SMS' | 'EMAIL', msg: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  language,
  preferences,
  logs,
  activePatient,
  onUpdatePreferences,
  onTriggerReminders,
  onSendTestNotification,
}) => {
  const t = translations[language];
  const [triggering, setTriggering] = useState(false);
  const [testMessage, setTestMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<'WHATSAPP' | 'SMS' | 'EMAIL'>('WHATSAPP');
  const [testSuccessMessage, setTestSuccessMessage] = useState<string | null>(null);

  const handleRunTrigger = async () => {
    setTriggering(true);
    await onTriggerReminders();
    setTriggering(false);
  };

  const handleSendTest = () => {
    const msg = testMessage.trim() || `SmartCare Alert: ${activePatient?.name || 'Child'} has an upcoming vaccination scheduled. Check the SmartCare app for full details.`;
    onSendTestNotification(selectedChannel, msg);
    setTestSuccessMessage(`Test ${selectedChannel} notification successfully dispatched!`);
    setTestMessage('');
    setTimeout(() => setTestSuccessMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t.notifications.title}</h1>
            <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full border border-blue-100">
              Multi-Channel Dispatch
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t.notifications.subtitle}
          </p>
        </div>

        <button
          onClick={handleRunTrigger}
          disabled={triggering}
          className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-xs transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${triggering ? 'animate-spin' : ''}`} />
          <span>{triggering ? 'Generating...' : t.notifications.triggerNow}</span>
        </button>
      </div>

      {/* Main 2-Column: Channels Preferences & Test Dispatcher */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Channel Preferences */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 font-bold text-slate-900 text-base pb-2 border-b border-gray-100">
            <Sliders className="w-5 h-5 text-blue-600" />
            <span>Delivery Channels & Frequency</span>
          </div>

          <div className="space-y-3">
            {/* WhatsApp */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">WhatsApp Reminders</div>
                  <div className="text-xs text-gray-500">Instant alerts directly to your WhatsApp mobile number</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences?.whatsappEnabled ?? true}
                onChange={(e) => onUpdatePreferences({ whatsappEnabled: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>

            {/* SMS */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">SMS Text Alerts</div>
                  <div className="text-xs text-gray-500">Standard cellular SMS for high reliability</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences?.smsEnabled ?? true}
                onChange={(e) => onUpdatePreferences({ smsEnabled: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">Email Immunization Digest</div>
                  <div className="text-xs text-gray-500">Weekly schedule summary & monthly dose reviews</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences?.emailEnabled ?? true}
                onChange={(e) => onUpdatePreferences({ emailEnabled: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>

            {/* In-App */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">In-App Notification Center</div>
                  <div className="text-xs text-gray-500">Popups and dashboard badge reminders</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences?.inAppEnabled ?? true}
                onChange={(e) => onUpdatePreferences({ inAppEnabled: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Reminder Interval Chips */}
          <div className="pt-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">
              {t.notifications.reminderIntervals}:
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-medium">
              <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full">
                ✓ 10 Days Before
              </span>
              <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full">
                ✓ 7 Days Before
              </span>
              <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full">
                ✓ 5 Days Before
              </span>
              <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full">
                ✓ 1 Day Before
              </span>
              <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full">
                ✓ On the Day (Today)
              </span>
            </div>
          </div>
        </div>

        {/* 2. Test Notification Dispatcher */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 font-bold text-slate-900 text-base pb-2 border-b border-gray-100">
              <Send className="w-5 h-5 text-blue-600" />
              <span>Test Notification Simulator</span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Dispatch a real-time test reminder payload to verify message delivery templates across selected communication channels.
            </p>

            {testSuccessMessage && (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-3 rounded-lg text-xs font-medium flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{testSuccessMessage}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Target Channel:
              </label>
              <div className="flex space-x-2 text-xs font-medium">
                {(['WHATSAPP', 'SMS', 'EMAIL'] as const).map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setSelectedChannel(ch)}
                    className={`px-3.5 py-1.5 rounded-full border transition ${
                      selectedChannel === ch
                        ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-xs'
                        : 'bg-white text-slate-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Custom Message Content (Optional):
              </label>
              <textarea
                rows={3}
                placeholder={`SmartCare Alert: ${activePatient?.name || 'Aarav'} has an upcoming Pentavalent Dose scheduled for next Monday at Pune Urban PHC.`}
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                className="w-full text-xs p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>

          <button
            onClick={handleSendTest}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-xs flex items-center justify-center space-x-1.5 shadow-xs transition mt-3"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Test Alert to {selectedChannel}</span>
          </button>
        </div>
      </div>

      {/* 3. Dispatched Notifications Audit Log Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <h2 className="font-bold text-slate-800 text-sm">{t.notifications.recentLogs}</h2>
          </div>
          <span className="text-xs text-gray-500 font-medium">{logs.length} logged dispatches</span>
        </div>

        {logs.length > 0 ? (
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
            {logs.map((log) => (
              <div key={log.id} className="p-3.5 sm:p-4 hover:bg-gray-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">{log.title}</span>
                    <span className="text-[11px] bg-gray-100 text-slate-700 px-2 py-0.5 rounded-full font-mono">
                      {log.channel}
                    </span>
                    {log.patientName && (
                      <span className="text-[11px] bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium border border-blue-100">
                        {log.patientName}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs">{log.message}</p>
                  <div className="text-[11px] text-gray-400">
                    Recipient: {log.recipient} • Sent: {new Date(log.sentAt).toLocaleString()}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-full border border-emerald-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{log.status}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500 text-xs">
            No notification logs yet. Click "Simulate & Trigger Reminders Now" to test.
          </div>
        )}
      </div>
    </div>
  );
};
