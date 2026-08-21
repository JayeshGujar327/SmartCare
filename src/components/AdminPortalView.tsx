import React, { useState, useEffect } from 'react';
import {
  Settings,
  Users,
  ShieldCheck,
  Building,
  BookOpen,
  Plus,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Layers
} from 'lucide-react';
import {
  Language,
  VaccineScheduleRule,
  VaccinationCenter,
  KnowledgeDoc
} from '../types';
import { translations } from '../services/i18n';

interface AdminPortalViewProps {
  language: Language;
  onOpenAddCenter: () => void;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
  language,
  onOpenAddCenter,
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'STATS' | 'VACCINES' | 'KNOWLEDGE' | 'CENTERS'>('STATS');
  const [stats, setStats] = useState<any>(null);
  const [vaccineRules, setVaccineRules] = useState<VaccineScheduleRule[]>([]);
  const [knowledgeDocs, setKnowledgeDocs] = useState<KnowledgeDoc[]>([]);
  const [centers, setCenters] = useState<VaccinationCenter[]>([]);
  const [loading, setLoading] = useState(true);

  // New Rule Form
  const [newRuleModalOpen, setNewRuleModalOpen] = useState(false);
  const [newRule, setNewRule] = useState({
    vaccineCode: '',
    vaccineName: '',
    doseNumber: 1,
    recommendedAgeWeeks: 0,
    recommendedAgeText: '',
    diseaseTarget: '',
    isNationalSchedule: true,
    routeAndSite: 'Intramuscular'
  });

  // New Knowledge Doc Form
  const [newDocModalOpen, setNewDocModalOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({
    title: '',
    source: 'National UIP / IAP Guidelines 2026',
    category: 'VACCINE_FACTS' as any,
    content: '',
    tags: 'uip, vaccine, catch-up'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, vaxRes, knowRes, cenRes] = await Promise.all([
        fetch('/api/admin/stats').then(r => r.json()),
        fetch('/api/vaccines').then(r => r.json()),
        fetch('/api/admin/knowledge').then(r => r.json()),
        fetch('/api/centers').then(r => r.json())
      ]);

      setStats(statsRes.stats);
      setVaccineRules(vaxRes.rules || []);
      setKnowledgeDocs(knowRes.docs || []);
      setCenters(cenRes.centers || []);
    } catch (err) {
      console.error('Admin data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/vaccine-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRule)
      });
      if (res.ok) {
        setNewRuleModalOpen(false);
        fetchData();
      }
    } catch (err) {
      console.error('Error creating rule:', err);
    }
  };

  const handleCreateDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newDoc,
          tags: newDoc.tags.split(',').map(t => t.trim())
        })
      });
      if (res.ok) {
        setNewDocModalOpen(false);
        fetchData();
      }
    } catch (err) {
      console.error('Error creating doc:', err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded-full border border-blue-100">
              Admin & Health Officer Portal
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">SmartCare System Administration</h1>
          <p className="text-xs text-gray-500">Manage immunization schedule matrices, verified clinical knowledge documents, and facility directories.</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('STATS')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition border ${
              activeTab === 'STATS'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('VACCINES')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition border ${
              activeTab === 'VACCINES'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            Schedule Rules ({vaccineRules.length})
          </button>
          <button
            onClick={() => setActiveTab('KNOWLEDGE')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition border ${
              activeTab === 'KNOWLEDGE'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            Knowledge Base ({knowledgeDocs.length})
          </button>
          <button
            onClick={() => setActiveTab('CENTERS')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition border ${
              activeTab === 'CENTERS'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            Health Centers ({centers.length})
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      {activeTab === 'STATS' && stats && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-xs text-gray-500 font-medium">Registered Families</span>
              <div className="text-2xl font-bold text-slate-900 mt-1">{stats.totalUsers}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-xs text-gray-500 font-medium">Patient Profiles</span>
              <div className="text-2xl font-bold text-blue-600 mt-1">{stats.totalPatients}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-xs text-gray-500 font-medium">Vaccines Recorded</span>
              <div className="text-2xl font-bold text-emerald-600 mt-1">{stats.totalVaccinesRecorded}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-xs text-gray-500 font-medium">Verified Centers</span>
              <div className="text-2xl font-bold text-indigo-600 mt-1">{stats.totalCenters}</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base mb-3">Universal Immunization Compliance Overview</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              The SmartCare database automatically syncs National Universal Immunization Programme (UIP India) standards with Indian Academy of Pediatrics (IAP) guidelines. The RAG AI engine references in-memory verified documents before rendering answers to patients.
            </p>
          </div>
        </div>
      )}

      {/* Vaccine Rules Table */}
      {activeTab === 'VACCINES' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-bold text-slate-800 text-sm">Universal Immunization Schedule Matrix (UIP)</h2>
            <button
              onClick={() => setNewRuleModalOpen(true)}
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1 shadow-xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Dose Rule</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-700 font-bold uppercase border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-3">Vaccine Code</th>
                  <th className="py-2.5 px-3">Vaccine Name</th>
                  <th className="py-2.5 px-3">Dose #</th>
                  <th className="py-2.5 px-3">Age Milestone</th>
                  <th className="py-2.5 px-3">Disease Protection</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {vaccineRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-700">{rule.vaccineCode}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{rule.vaccineName}</td>
                    <td className="py-2.5 px-3 text-gray-700">Dose {rule.doseNumber}</td>
                    <td className="py-2.5 px-3 text-gray-600">{rule.recommendedAgeText}</td>
                    <td className="py-2.5 px-3 text-gray-500">{rule.diseaseTarget}</td>
                    <td className="py-2.5 px-3">
                      <span className="bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-100 text-[10px]">
                        Active UIP
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RAG Knowledge Docs */}
      {activeTab === 'KNOWLEDGE' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-base">Grounded Medical Knowledge Documents (RAG Store)</h2>
            <button
              onClick={() => setNewDocModalOpen(true)}
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3.5 py-2 rounded-lg flex items-center space-x-1 shadow-xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Knowledge Document</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {knowledgeDocs.map((doc) => (
              <div key={doc.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-900 text-base">{doc.title}</h3>
                    <span className="text-[10px] bg-gray-100 text-slate-700 font-mono px-2 py-0.5 rounded-full uppercase">
                      {doc.category}
                    </span>
                  </div>
                  <div className="text-xs text-blue-700 font-medium mt-1">Source: {doc.source}</div>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-4 leading-relaxed">{doc.content}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-1">
                  {doc.tags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] px-2.5 py-0.5 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Health Centers Directory Management */}
      {activeTab === 'CENTERS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900 text-base">Verified Health Facilities & Immunization Centers</h2>
              <p className="text-xs text-gray-500">Government PHCs, Community Hospitals, and Temporary Vaccination Booths</p>
            </div>
            <button
              onClick={onOpenAddCenter}
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3.5 py-2 rounded-lg flex items-center space-x-1 shadow-xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Health Center</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {centers.map((center) => (
              <div key={center.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{center.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{center.address}, {center.city}, {center.state} - {center.pinCode}</p>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                      center.isFree
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : 'bg-purple-50 text-purple-700 border-purple-100'
                    }`}>
                      {center.type}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1 text-xs text-slate-600">
                    <div><strong>Timings:</strong> {center.timings}</div>
                    <div><strong>Contact:</strong> {center.phone}</div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-gray-100">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Available Vaccines:</span>
                    <div className="flex flex-wrap gap-1">
                      {center.availableVaccines.map((vax, idx) => (
                        <span key={idx} className="bg-gray-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-medium">
                          {vax}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Facility</span>
                  </span>
                  <a
                    href={`tel:${center.phone}`}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Direct Helpline
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Rule Modal */}
      {newRuleModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-slate-900 text-base">Add Immunization Schedule Rule</h3>
              <button onClick={() => setNewRuleModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>
            <form onSubmit={handleCreateRule} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Vaccine Code (e.g. HEP-B-0)</label>
                <input
                  type="text"
                  required
                  value={newRule.vaccineCode}
                  onChange={e => setNewRule({ ...newRule, vaccineCode: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Vaccine Name</label>
                <input
                  type="text"
                  required
                  value={newRule.vaccineName}
                  onChange={e => setNewRule({ ...newRule, vaccineName: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Dose Number</label>
                  <input
                    type="number"
                    min="1"
                    value={newRule.doseNumber}
                    onChange={e => setNewRule({ ...newRule, doseNumber: parseInt(e.target.value) || 1 })}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Age in Weeks</label>
                  <input
                    type="number"
                    min="0"
                    value={newRule.recommendedAgeWeeks}
                    onChange={e => setNewRule({ ...newRule, recommendedAgeWeeks: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Milestone Text (e.g. 6 Weeks, 14 Weeks, 9 Months)</label>
                <input
                  type="text"
                  required
                  value={newRule.recommendedAgeText}
                  onChange={e => setNewRule({ ...newRule, recommendedAgeText: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Disease Target</label>
                <input
                  type="text"
                  required
                  value={newRule.diseaseTarget}
                  onChange={e => setNewRule({ ...newRule, diseaseTarget: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setNewRuleModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-slate-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs transition"
                >
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Knowledge Doc Modal */}
      {newDocModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-slate-900 text-base">Add Clinical Knowledge Document (RAG)</h3>
              <button onClick={() => setNewDocModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>
            <form onSubmit={handleCreateDoc} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newDoc.title}
                  onChange={e => setNewDoc({ ...newDoc, title: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Official Source</label>
                <input
                  type="text"
                  required
                  value={newDoc.source}
                  onChange={e => setNewDoc({ ...newDoc, source: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Content / Clinical Advisory</label>
                <textarea
                  rows={5}
                  required
                  value={newDoc.content}
                  onChange={e => setNewDoc({ ...newDoc, content: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={newDoc.tags}
                  onChange={e => setNewDoc({ ...newDoc, tags: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setNewDocModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-slate-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs transition"
                >
                  Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
