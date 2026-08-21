import React, { useState, useEffect, useMemo } from 'react';
import {
  TrendingUp,
  Plus,
  Scale,
  Ruler,
  Brain,
  Activity,
  CheckCircle2,
  Clock,
  Circle,
  AlertTriangle,
  Info,
  Calendar,
  Sparkles,
  Award,
  ChevronRight,
  Filter,
  Trash2,
  Edit2,
  FileText,
  User,
  Heart,
  Baby,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Area,
  ComposedChart
} from 'recharts';
import { GrowthLog, MilestoneProgressItem, PatientProfile, Language } from '../types';
import { translations } from '../services/i18n';
import {
  whoBoysWeightStandards,
  whoGirlsWeightStandards,
  whoBoysHeightStandards,
  whoGirlsHeightStandards,
  developmentalMilestonesList,
  calculateBMI,
  evaluateGrowthStatus
} from '../data/growthStandards';

interface GrowthTrackingViewProps {
  activePatient: PatientProfile | null;
  language: Language;
  onOpenConsultation?: () => void;
}

export const GrowthTrackingView: React.FC<GrowthTrackingViewProps> = ({
  activePatient,
  language,
  onOpenConsultation
}) => {
  const t = translations[language];
  const gT = t.growth;

  const [growthLogs, setGrowthLogs] = useState<GrowthLog[]>([]);
  const [milestoneProgress, setMilestoneProgress] = useState<MilestoneProgressItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'charts' | 'milestones' | 'history'>('charts');
  const [activeMetric, setActiveMetric] = useState<'weight' | 'height' | 'bmi'>('weight');

  // Milestone filters
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedAgeBand, setSelectedAgeBand] = useState<string>('CURRENT');

  // Modal for new measurement
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    recordedDate: new Date().toISOString().split('T')[0],
    weightKg: '',
    heightCm: '',
    headCircumferenceCm: '',
    notes: '',
    recordedBy: ''
  });
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch patient growth data
  useEffect(() => {
    if (!activePatient) return;
    fetchGrowthData();
  }, [activePatient?.id]);

  const fetchGrowthData = async () => {
    if (!activePatient) return;
    setLoading(true);
    try {
      const [growthRes, milestoneRes] = await Promise.all([
        fetch(`/api/growth/${activePatient.id}`),
        fetch(`/api/milestones/${activePatient.id}`)
      ]);

      if (growthRes.ok) {
        const gData = await growthRes.json();
        setGrowthLogs(gData.logs || []);
      }

      if (milestoneRes.ok) {
        const mData = await milestoneRes.json();
        setMilestoneProgress(mData.progress || []);
      }
    } catch (err) {
      console.error('Failed to fetch growth records:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate current patient age in months
  const patientAgeMonths = useMemo(() => {
    if (!activePatient?.dob) return 0;
    const dob = new Date(activePatient.dob);
    const now = new Date();
    const months = (now.getFullYear() - dob.getFullYear()) * 12 + (now.getMonth() - dob.getMonth());
    const days = now.getDate() - dob.getDate();
    return Math.max(0, Math.round((months + days / 30.4375) * 10) / 10);
  }, [activePatient?.dob]);

  // Latest growth record
  const latestLog = useMemo(() => {
    if (growthLogs.length === 0) return null;
    return [...growthLogs].sort((a, b) => new Date(b.recordedDate).getTime() - new Date(a.recordedDate).getTime())[0];
  }, [growthLogs]);

  // Current growth evaluation
  const currentGrowthStatus = useMemo(() => {
    if (!latestLog || !activePatient) return null;
    return evaluateGrowthStatus(
      activePatient.gender,
      latestLog.ageMonths,
      latestLog.weightKg,
      latestLog.heightCm
    );
  }, [latestLog, activePatient]);

  // Merge child logs with WHO standard points for charts
  const chartData = useMemo(() => {
    if (!activePatient) return [];
    const isGirl = activePatient.gender === 'FEMALE';
    const weightStd = isGirl ? whoGirlsWeightStandards : whoBoysWeightStandards;
    const heightStd = isGirl ? whoGirlsHeightStandards : whoBoysHeightStandards;

    // Define standard timeline milestones up to 60 months (5 years) or max logged age
    const maxAge = Math.max(12, Math.ceil(patientAgeMonths * 1.3), ...growthLogs.map(l => l.ageMonths));
    const relevantStdMonths = [0, 1, 2, 3, 4, 5, 6, 9, 12, 15, 18, 24, 36, 48, 60].filter(m => m <= Math.max(maxAge, 12));

    // Combine standard points with logged points
    const pointsMap = new Map<number, any>();

    // Add standard curves
    relevantStdMonths.forEach(m => {
      const wPoint = weightStd.find(w => w.month === m) || weightStd[weightStd.length - 1];
      const hPoint = heightStd.find(h => h.month === m) || heightStd[heightStd.length - 1];
      pointsMap.set(m, {
        month: m,
        monthLabel: m === 0 ? 'Birth' : `${m}m`,
        whoWeightP3: wPoint.p3,
        whoWeightP50: wPoint.p50,
        whoWeightP97: wPoint.p97,
        whoHeightP3: hPoint.p3,
        whoHeightP50: hPoint.p50,
        whoHeightP97: hPoint.p97,
      });
    });

    // Overlay child actual logged points
    growthLogs.forEach(log => {
      const m = Math.round(log.ageMonths * 10) / 10;
      const existing = pointsMap.get(m) || {
        month: m,
        monthLabel: m === 0 ? 'Birth' : `${m}m`
      };

      // Find interpolated WHO values if not exactly on standard month
      const closestWeight = weightStd.reduce((prev, curr) => Math.abs(curr.month - m) < Math.abs(prev.month - m) ? curr : prev, weightStd[0]);
      const closestHeight = heightStd.reduce((prev, curr) => Math.abs(curr.month - m) < Math.abs(prev.month - m) ? curr : prev, heightStd[0]);

      pointsMap.set(m, {
        ...existing,
        whoWeightP3: existing.whoWeightP3 ?? closestWeight.p3,
        whoWeightP50: existing.whoWeightP50 ?? closestWeight.p50,
        whoWeightP97: existing.whoWeightP97 ?? closestWeight.p97,
        whoHeightP3: existing.whoHeightP3 ?? closestHeight.p3,
        whoHeightP50: existing.whoHeightP50 ?? closestHeight.p50,
        whoHeightP97: existing.whoHeightP97 ?? closestHeight.p97,
        childWeight: log.weightKg,
        childHeight: log.heightCm,
        childBmi: log.bmi || calculateBMI(log.weightKg, log.heightCm),
        childDate: log.recordedDate,
        notes: log.notes
      });
    });

    return Array.from(pointsMap.values()).sort((a, b) => a.month - b.month);
  }, [activePatient, growthLogs, patientAgeMonths]);

  // Milestone stats
  const milestoneStats = useMemo(() => {
    // Milestones applicable for patient current age
    const ageAppropriate = developmentalMilestonesList.filter(m => m.maxAgeMonths <= Math.max(6, patientAgeMonths + 3));
    const achievedCount = ageAppropriate.filter(m => {
      const p = milestoneProgress.find(prog => prog.milestoneId === m.id);
      return p?.status === 'ACHIEVED';
    }).length;

    const percentage = ageAppropriate.length > 0 ? Math.round((achievedCount / ageAppropriate.length) * 100) : 100;
    return {
      total: ageAppropriate.length,
      achieved: achievedCount,
      percentage
    };
  }, [patientAgeMonths, milestoneProgress]);

  // Filtered milestones
  const filteredMilestones = useMemo(() => {
    return developmentalMilestonesList.filter(m => {
      // Category filter
      if (selectedCategory !== 'ALL' && m.category !== selectedCategory) {
        return false;
      }
      // Age band filter
      if (selectedAgeBand === 'CURRENT') {
        return m.minAgeMonths <= patientAgeMonths && m.maxAgeMonths >= patientAgeMonths - 3;
      }
      if (selectedAgeBand === '0_6') return m.maxAgeMonths <= 6;
      if (selectedAgeBand === '6_12') return m.minAgeMonths >= 6 && m.maxAgeMonths <= 12;
      if (selectedAgeBand === '12_24') return m.minAgeMonths >= 12 && m.maxAgeMonths <= 24;
      if (selectedAgeBand === '24_60') return m.minAgeMonths >= 24;
      return true;
    });
  }, [selectedCategory, selectedAgeBand, patientAgeMonths]);

  // Handle milestone status change
  const handleUpdateMilestone = async (milestoneId: string, status: 'ACHIEVED' | 'IN_PROGRESS' | 'NOT_YET') => {
    if (!activePatient) return;
    try {
      const res = await fetch(`/api/milestones/${activePatient.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          milestoneId,
          status,
          achievedDate: status === 'ACHIEVED' ? new Date().toISOString().split('T')[0] : undefined
        })
      });
      if (res.ok) {
        const data = await res.json();
        setMilestoneProgress(prev => {
          const filtered = prev.filter(p => p.milestoneId !== milestoneId);
          return [...filtered, data.item];
        });
      }
    } catch (err) {
      console.error('Failed to update milestone:', err);
    }
  };

  // Handle measurement submit
  const handleSaveMeasurement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePatient) return;

    if (!formData.weightKg || !formData.heightCm || !formData.recordedDate) {
      setFormError('Please enter Date, Weight (kg) and Height (cm).');
      return;
    }

    setFormSubmitting(true);
    setFormError(null);

    try {
      const url = editingLogId
        ? `/api/growth/${activePatient.id}/${editingLogId}`
        : `/api/growth/${activePatient.id}`;
      const method = editingLogId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recordedDate: formData.recordedDate,
          weightKg: parseFloat(formData.weightKg),
          heightCm: parseFloat(formData.heightCm),
          headCircumferenceCm: formData.headCircumferenceCm ? parseFloat(formData.headCircumferenceCm) : undefined,
          notes: formData.notes,
          recordedBy: formData.recordedBy || 'Parent / Caregiver'
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save measurement');
      }

      await fetchGrowthData();
      setIsModalOpen(false);
      setEditingLogId(null);
      setFormData({
        recordedDate: new Date().toISOString().split('T')[0],
        weightKg: '',
        heightCm: '',
        headCircumferenceCm: '',
        notes: '',
        recordedBy: ''
      });
    } catch (err: any) {
      setFormError(err.message || 'Error occurred while saving');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteLog = async (logId: string) => {
    if (!activePatient || !window.confirm('Are you sure you want to delete this growth measurement record?')) return;
    try {
      const res = await fetch(`/api/growth/${activePatient.id}/${logId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setGrowthLogs(prev => prev.filter(l => l.id !== logId));
      }
    } catch (err) {
      console.error('Failed to delete growth record:', err);
    }
  };

  const openEditModal = (log: GrowthLog) => {
    setEditingLogId(log.id);
    setFormData({
      recordedDate: log.recordedDate,
      weightKg: log.weightKg.toString(),
      heightCm: log.heightCm.toString(),
      headCircumferenceCm: log.headCircumferenceCm ? log.headCircumferenceCm.toString() : '',
      notes: log.notes || '',
      recordedBy: log.recordedBy || ''
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  // Preview BMI calculation inside modal
  const modalPreviewBMI = useMemo(() => {
    const w = parseFloat(formData.weightKg);
    const h = parseFloat(formData.heightCm);
    return calculateBMI(w, h);
  }, [formData.weightKg, formData.heightCm]);

  if (!activePatient) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Baby className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Active Child Profile Selected</h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Please select a child or family member profile from the top navigation bar to view their growth charts and developmental milestones.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Header Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shrink-0">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {gT.title}
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  WHO Growth Standards (0-5 Yrs)
                </span>
              </div>
              <p className="text-sm text-gray-500 max-w-2xl">
                Tracking development metrics for <strong className="text-slate-800">{activePatient.name}</strong> ({activePatient.gender === 'FEMALE' ? 'Female' : 'Male'}, {patientAgeMonths} Months Old).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              id="log-measurement-btn"
              onClick={() => {
                setEditingLogId(null);
                setFormData({
                  recordedDate: new Date().toISOString().split('T')[0],
                  weightKg: '',
                  heightCm: '',
                  headCircumferenceCm: '',
                  notes: '',
                  recordedBy: ''
                });
                setFormError(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl shadow-xs transition"
            >
              <Plus className="w-4 h-4 mr-2" />
              {gT.logMeasurement}
            </button>
          </div>
        </div>

        {/* Child Snapshot Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div className="bg-slate-50/70 p-3.5 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-2 text-gray-500 text-xs font-medium mb-1">
              <Scale className="w-4 h-4 text-blue-600" />
              <span>Current Weight</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-bold text-slate-900">
                {latestLog ? `${latestLog.weightKg} kg` : '--'}
              </span>
              {currentGrowthStatus && (
                <span className="text-xs text-blue-700 font-semibold">
                  ~P{currentGrowthStatus.weightPercentileEst}
                </span>
              )}
            </div>
            <span className="text-[11px] text-gray-400">
              {latestLog ? `Recorded on ${latestLog.recordedDate}` : 'No records yet'}
            </span>
          </div>

          <div className="bg-slate-50/70 p-3.5 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-2 text-gray-500 text-xs font-medium mb-1">
              <Ruler className="w-4 h-4 text-indigo-600" />
              <span>Current Height</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-bold text-slate-900">
                {latestLog ? `${latestLog.heightCm} cm` : '--'}
              </span>
              {currentGrowthStatus && (
                <span className="text-xs text-indigo-700 font-semibold">
                  ~P{currentGrowthStatus.heightPercentileEst}
                </span>
              )}
            </div>
            <span className="text-[11px] text-gray-400">
              {latestLog ? `Length/Stature` : 'No records yet'}
            </span>
          </div>

          <div className="bg-slate-50/70 p-3.5 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-2 text-gray-500 text-xs font-medium mb-1">
              <Activity className="w-4 h-4 text-purple-600" />
              <span>Body Mass Index (BMI)</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-bold text-slate-900">
                {latestLog?.bmi ? `${latestLog.bmi}` : latestLog ? `${calculateBMI(latestLog.weightKg, latestLog.heightCm)}` : '--'}
              </span>
              <span className="text-xs text-purple-700 font-semibold">kg/m²</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">
              {currentGrowthStatus?.status === 'HEALTHY' ? 'Normal WHO Range' : currentGrowthStatus?.label || 'Healthy'}
            </span>
          </div>

          <div className="bg-slate-50/70 p-3.5 rounded-xl border border-gray-100">
            <div className="flex items-center space-x-2 text-gray-500 text-xs font-medium mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Milestone Progress</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-bold text-slate-900">
                {milestoneStats.percentage}%
              </span>
              <span className="text-xs text-gray-500">
                ({milestoneStats.achieved}/{milestoneStats.total} Milestones)
              </span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${milestoneStats.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Clinical Growth Advice Alert if any */}
        {currentGrowthStatus && (
          <div className={`mt-6 p-4 rounded-xl border flex items-start space-x-3 text-sm ${
            currentGrowthStatus.status === 'HEALTHY'
              ? 'bg-blue-50/70 border-blue-100 text-blue-900'
              : 'bg-amber-50/70 border-amber-200 text-amber-900'
          }`}>
            <Info className={`w-5 h-5 shrink-0 mt-0.5 ${
              currentGrowthStatus.status === 'HEALTHY' ? 'text-blue-600' : 'text-amber-600'
            }`} />
            <div className="flex-1">
              <p className="font-semibold">{currentGrowthStatus.label}</p>
              <p className="mt-0.5 text-xs text-slate-700 leading-relaxed">
                {currentGrowthStatus.advice}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation View Tabs */}
      <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('charts')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === 'charts'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-gray-600 hover:text-slate-900 hover:bg-gray-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Interactive Growth Charts</span>
        </button>

        <button
          onClick={() => setActiveTab('milestones')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === 'milestones'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-gray-600 hover:text-slate-900 hover:bg-gray-100'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>Developmental Milestones</span>
          <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-semibold">
            {milestoneStats.achieved}/{milestoneStats.total}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === 'history'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-gray-600 hover:text-slate-900 hover:bg-gray-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Measurement Logs ({growthLogs.length})</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE GROWTH CHARTS */}
      {activeTab === 'charts' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {activeMetric === 'weight' && 'Weight-for-Age Growth Curve (WHO Standards)'}
                  {activeMetric === 'height' && 'Height / Length-for-Age Curve (WHO Standards)'}
                  {activeMetric === 'bmi' && 'Body Mass Index (BMI) Curve'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Comparing <strong className="text-slate-800">{activePatient.name}</strong> against the World Health Organization (WHO) 3rd, 50th (Median), and 97th percentile growth curves.
                </p>
              </div>

              {/* Metric Switcher Pills */}
              <div className="flex items-center bg-gray-100 p-1 rounded-xl shrink-0">
                <button
                  onClick={() => setActiveMetric('weight')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                    activeMetric === 'weight'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-gray-600 hover:text-slate-900'
                  }`}
                >
                  Weight (kg)
                </button>
                <button
                  onClick={() => setActiveMetric('height')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                    activeMetric === 'height'
                      ? 'bg-white text-indigo-600 shadow-xs'
                      : 'text-gray-600 hover:text-slate-900'
                  }`}
                >
                  Height (cm)
                </button>
                <button
                  onClick={() => setActiveMetric('bmi')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                    activeMetric === 'bmi'
                      ? 'bg-white text-purple-600 shadow-xs'
                      : 'text-gray-600 hover:text-slate-900'
                  }`}
                >
                  BMI (kg/m²)
                </button>
              </div>
            </div>

            {/* Recharts Container */}
            <div className="w-full h-80 sm:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="month"
                    label={{ value: 'Age in Months', position: 'insideBottom', offset: -10, fontSize: 12, fill: '#64748b' }}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <YAxis
                    label={{
                      value: activeMetric === 'weight' ? 'Weight (kg)' : activeMetric === 'height' ? 'Height (cm)' : 'BMI (kg/m²)',
                      angle: -90,
                      position: 'insideLeft',
                      offset: 5,
                      fontSize: 12,
                      fill: '#64748b'
                    }}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    domain={['auto', 'auto']}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload || !payload.length) return null;
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1.5 border border-slate-700">
                          <p className="font-bold text-slate-200 border-b border-slate-700 pb-1">
                            Age: {label} Months {data.childDate && `(${data.childDate})`}
                          </p>
                          {activeMetric === 'weight' && (
                            <>
                              {data.childWeight !== undefined && (
                                <p className="text-emerald-400 font-bold">
                                  {activePatient.name}: {data.childWeight} kg
                                </p>
                              )}
                              <p className="text-gray-300">WHO 97th Percentile (Upper): {data.whoWeightP97} kg</p>
                              <p className="text-blue-300 font-semibold">WHO 50th Percentile (Median): {data.whoWeightP50} kg</p>
                              <p className="text-gray-300">WHO 3rd Percentile (Lower): {data.whoWeightP3} kg</p>
                            </>
                          )}
                          {activeMetric === 'height' && (
                            <>
                              {data.childHeight !== undefined && (
                                <p className="text-emerald-400 font-bold">
                                  {activePatient.name}: {data.childHeight} cm
                                </p>
                              )}
                              <p className="text-gray-300">WHO 97th Percentile (Upper): {data.whoHeightP97} cm</p>
                              <p className="text-indigo-300 font-semibold">WHO 50th Percentile (Median): {data.whoHeightP50} cm</p>
                              <p className="text-gray-300">WHO 3rd Percentile (Lower): {data.whoHeightP3} cm</p>
                            </>
                          )}
                          {activeMetric === 'bmi' && data.childBmi !== undefined && (
                            <p className="text-purple-400 font-bold">
                              {activePatient.name} BMI: {data.childBmi} kg/m²
                            </p>
                          )}
                          {data.notes && (
                            <p className="text-gray-400 italic pt-1 border-t border-slate-800">
                              "{data.notes}"
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />

                  {/* Standard WHO reference lines */}
                  {activeMetric === 'weight' && (
                    <>
                      <Line
                        type="monotone"
                        dataKey="whoWeightP97"
                        name="WHO P97 (Upper Limit)"
                        stroke="#94a3b8"
                        strokeDasharray="4 4"
                        dot={false}
                        strokeWidth={1.5}
                      />
                      <Line
                        type="monotone"
                        dataKey="whoWeightP50"
                        name="WHO P50 (Standard Median)"
                        stroke="#3b82f6"
                        dot={false}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="whoWeightP3"
                        name="WHO P3 (Lower Limit)"
                        stroke="#cbd5e1"
                        strokeDasharray="4 4"
                        dot={false}
                        strokeWidth={1.5}
                      />
                      <Line
                        type="monotone"
                        dataKey="childWeight"
                        name={`${activePatient.name}'s Recorded Weight`}
                        stroke="#10b981"
                        strokeWidth={3.5}
                        dot={{ r: 6, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
                        activeDot={{ r: 8, fill: '#059669' }}
                        connectNulls
                      />
                    </>
                  )}

                  {activeMetric === 'height' && (
                    <>
                      <Line
                        type="monotone"
                        dataKey="whoHeightP97"
                        name="WHO P97 (Upper Limit)"
                        stroke="#94a3b8"
                        strokeDasharray="4 4"
                        dot={false}
                        strokeWidth={1.5}
                      />
                      <Line
                        type="monotone"
                        dataKey="whoHeightP50"
                        name="WHO P50 (Standard Median)"
                        stroke="#6366f1"
                        dot={false}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="whoHeightP3"
                        name="WHO P3 (Lower Limit)"
                        stroke="#cbd5e1"
                        strokeDasharray="4 4"
                        dot={false}
                        strokeWidth={1.5}
                      />
                      <Line
                        type="monotone"
                        dataKey="childHeight"
                        name={`${activePatient.name}'s Recorded Height`}
                        stroke="#06b6d4"
                        strokeWidth={3.5}
                        dot={{ r: 6, fill: '#06b6d4', stroke: '#ffffff', strokeWidth: 2 }}
                        activeDot={{ r: 8, fill: '#0891b2' }}
                        connectNulls
                      />
                    </>
                  )}

                  {activeMetric === 'bmi' && (
                    <Line
                      type="monotone"
                      dataKey="childBmi"
                      name={`${activePatient.name}'s BMI`}
                      stroke="#8b5cf6"
                      strokeWidth={3.5}
                      dot={{ r: 6, fill: '#8b5cf6', stroke: '#ffffff', strokeWidth: 2 }}
                      activeDot={{ r: 8, fill: '#7c3aed' }}
                      connectNulls
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Growth Guide Legend */}
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-slate-800">Green Dots: Actual Child Records</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-1 bg-blue-500 rounded-full" />
                  <span>Blue Solid: WHO Median (50th Percentile)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-1 bg-slate-400 border-dashed border-t-2" />
                  <span>Dashed: ±2 Standard Deviation Limits</span>
                </div>
              </div>

              <span className="text-gray-400 italic">
                Source: WHO Multicentre Growth Reference Study (MGRS)
              </span>
            </div>
          </div>

          {/* Pediatric Health & Nutrition Guidance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Scale className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Growth Velocity (0-12m)</h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Infants typically double their birth weight by 5–6 months and triple it by 1 year. Height increases by approximately 25 cm in the first year of life.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Optimal Nutrition</h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Exclusive breastfeeding is recommended for the first 6 months. From 6 months onward, introduce nutrient-dense complementary foods (iron, protein, zinc) alongside continuation of milk feeds.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Growth Red Flags</h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Seek pediatrician advice if child crosses two major percentile lines downward, fails to gain weight for 2 consecutive visits, or exhibits head circumference lagging behind standards.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEVELOPMENTAL MILESTONES */}
      {activeTab === 'milestones' && (
        <div className="space-y-6">
          {/* Milestone Filter Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-gray-500 mr-2 flex items-center">
                <Filter className="w-3.5 h-3.5 mr-1" /> Category:
              </span>
              {[
                { id: 'ALL', label: 'All Categories' },
                { id: 'MOTOR', label: '🏃 Gross & Fine Motor' },
                { id: 'LANGUAGE', label: '🗣️ Language & Speech' },
                { id: 'COGNITIVE', label: '🧠 Cognitive & Learning' },
                { id: 'SOCIAL', label: '❤️ Social & Emotional' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Age Range Filter */}
            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-xs font-semibold text-gray-500">Age Bracket:</span>
              <select
                value={selectedAgeBand}
                onChange={e => setSelectedAgeBand(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="CURRENT">Current Age ({patientAgeMonths}m)</option>
                <option value="ALL">All Milestones (0-5 Yrs)</option>
                <option value="0_6">0 - 6 Months</option>
                <option value="6_12">6 - 12 Months</option>
                <option value="12_24">12 - 24 Months</option>
                <option value="24_60">2 - 5 Years</option>
              </select>
            </div>
          </div>

          {/* Milestones Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMilestones.map(milestone => {
              const progressItem = milestoneProgress.find(p => p.milestoneId === milestone.id);
              const currentStatus = progressItem?.status || 'NOT_YET';

              return (
                <div
                  key={milestone.id}
                  className={`p-5 rounded-2xl border transition ${
                    currentStatus === 'ACHIEVED'
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : currentStatus === 'IN_PROGRESS'
                      ? 'bg-amber-50/40 border-amber-200'
                      : 'bg-white border-gray-200/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          {milestone.ageRangeText}
                        </span>
                        <span className="text-[11px] font-semibold text-gray-500">
                          {milestone.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">
                        {milestone.title}
                      </h4>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0">
                      {currentStatus === 'ACHIEVED' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                          Achieved
                        </span>
                      )}
                      {currentStatus === 'IN_PROGRESS' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          In Progress
                        </span>
                      )}
                      {currentStatus === 'NOT_YET' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                          <Circle className="w-3.5 h-3.5 mr-1" />
                          Not Yet
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    {milestone.description}
                  </p>

                  {/* Parent Tips */}
                  {milestone.tipsForParents && (
                    <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-slate-700 mb-3 border border-slate-100">
                      <span className="font-semibold text-blue-700">Parenting Tip: </span>
                      {milestone.tipsForParents}
                    </div>
                  )}

                  {/* Red Flag Warning */}
                  {milestone.redFlags && (
                    <div className="text-[11px] text-red-600 bg-red-50/80 p-2 rounded-lg mb-4 flex items-start space-x-1.5 border border-red-100">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span><strong>Red Flag:</strong> {milestone.redFlags}</span>
                    </div>
                  )}

                  {/* Action Buttons to Set Status */}
                  <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleUpdateMilestone(milestone.id, 'NOT_YET')}
                      className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition ${
                        currentStatus === 'NOT_YET'
                          ? 'bg-gray-200 text-gray-800 border-gray-300 font-semibold'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      Not Yet
                    </button>
                    <button
                      onClick={() => handleUpdateMilestone(milestone.id, 'IN_PROGRESS')}
                      className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition ${
                        currentStatus === 'IN_PROGRESS'
                          ? 'bg-amber-500 text-white border-amber-600 font-semibold shadow-xs'
                          : 'bg-white text-amber-700 border-amber-200 hover:bg-amber-50'
                      }`}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleUpdateMilestone(milestone.id, 'ACHIEVED')}
                      className={`px-3 py-1 text-xs font-medium rounded-lg border transition ${
                        currentStatus === 'ACHIEVED'
                          ? 'bg-emerald-600 text-white border-emerald-700 font-semibold shadow-xs'
                          : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50'
                      }`}
                    >
                      ✓ Achieved
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: MEASUREMENT HISTORY TABLE */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {gT.historyLogs}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Complete timeline of weight, height, BMI and head circumference records for {activePatient.name}.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingLogId(null);
                setFormData({
                  recordedDate: new Date().toISOString().split('T')[0],
                  weightKg: '',
                  heightCm: '',
                  headCircumferenceCm: '',
                  notes: '',
                  recordedBy: ''
                });
                setFormError(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-xl shadow-xs transition"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Add Record
            </button>
          </div>

          {growthLogs.length === 0 ? (
            <div className="p-12 text-center">
              <Scale className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-800">{gT.noGrowthLogs}</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg shadow-xs hover:bg-blue-700"
              >
                Log First Measurement
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-gray-500 font-semibold uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Date Recorded</th>
                    <th className="py-3 px-4">Age</th>
                    <th className="py-3 px-4">Weight (kg)</th>
                    <th className="py-3 px-4">Height (cm)</th>
                    <th className="py-3 px-4">BMI (kg/m²)</th>
                    <th className="py-3 px-4">Head Cir.</th>
                    <th className="py-3 px-4">Evaluated Status</th>
                    <th className="py-3 px-4">Recorded By / Remarks</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-slate-700">
                  {growthLogs.map(log => {
                    const evalRes = evaluateGrowthStatus(
                      activePatient.gender,
                      log.ageMonths,
                      log.weightKg,
                      log.heightCm
                    );

                    return (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 font-semibold text-slate-900">
                          {log.recordedDate}
                        </td>
                        <td className="py-3.5 px-4">
                          {log.ageMonths === 0 ? 'At Birth' : `${log.ageMonths} Months`}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {log.weightKg} kg
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {log.heightCm} cm
                        </td>
                        <td className="py-3.5 px-4 font-medium text-purple-700">
                          {log.bmi || calculateBMI(log.weightKg, log.heightCm)}
                        </td>
                        <td className="py-3.5 px-4 text-gray-500">
                          {log.headCircumferenceCm ? `${log.headCircumferenceCm} cm` : '--'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            evalRes.status === 'HEALTHY'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {evalRes.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs truncate text-gray-500">
                          {log.notes ? log.notes : log.recordedBy || 'Caregiver'}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => openEditModal(log)}
                            className="p-1 hover:bg-gray-100 text-gray-600 rounded"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteLog(log.id)}
                            className="p-1 hover:bg-red-50 text-red-600 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* LOG MEASUREMENT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Scale className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">
                  {editingLogId ? 'Edit Growth Measurement' : gT.logMeasurement}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveMeasurement} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Measurement Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.recordedDate}
                    onChange={e => setFormData({ ...formData, recordedDate: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Recorded By
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Verma / PHC / Parent"
                    value={formData.recordedBy}
                    onChange={e => setFormData({ ...formData, recordedBy: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.5"
                    max="100"
                    required
                    placeholder="e.g. 7.5"
                    value={formData.weightKg}
                    onChange={e => setFormData({ ...formData, weightKg: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Height / Length (cm) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="20"
                    max="200"
                    required
                    placeholder="e.g. 68.5"
                    value={formData.heightCm}
                    onChange={e => setFormData({ ...formData, heightCm: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Head Circumference (Optional cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="20"
                  max="70"
                  placeholder="e.g. 43.5"
                  value={formData.headCircumferenceCm}
                  onChange={e => setFormData({ ...formData, headCircumferenceCm: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              {/* Real-time calculated BMI indicator */}
              {modalPreviewBMI > 0 && (
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 flex items-center justify-between text-xs">
                  <span className="text-purple-900 font-medium">Estimated Body Mass Index (BMI):</span>
                  <span className="font-bold text-purple-700 text-sm">{modalPreviewBMI} kg/m²</span>
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Clinical Notes / Observations
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Normal feeding, complementary solids introduced, teething symptoms..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition disabled:opacity-50"
                >
                  {formSubmitting ? 'Saving...' : 'Save Measurement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
