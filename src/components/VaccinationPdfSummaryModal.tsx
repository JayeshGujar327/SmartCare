import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  Printer,
  Download,
  FileText,
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  QrCode,
  Building,
  User,
  Calendar,
  Share2,
  Check,
  Copy,
  FileSpreadsheet
} from 'lucide-react';
import {
  Language,
  PatientProfile,
  VaccinationScheduleItem,
  VaccinationScoreData
} from '../types';
import { translations } from '../services/i18n';

interface VaccinationPdfSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientProfile;
  patientAge: string;
  metrics: VaccinationScoreData | null;
  scheduleItems: VaccinationScheduleItem[];
  language: Language;
}

export const VaccinationPdfSummaryModal: React.FC<VaccinationPdfSummaryModalProps> = ({
  isOpen,
  onClose,
  patient,
  patientAge,
  metrics,
  scheduleItems,
  language,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'COMPLETED' | 'DUE_UPCOMING'>('ALL');
  const [copied, setCopied] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const t = translations[language];
  const reportDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const filteredItems = scheduleItems.filter((item) => {
    if (filter === 'COMPLETED') return item.status === 'COMPLETED';
    if (filter === 'DUE_UPCOMING') return item.status === 'DUE' || item.status === 'UPCOMING' || item.status === 'MISSED';
    return true;
  });

  const completedCount = scheduleItems.filter(i => i.status === 'COMPLETED').length;
  const dueCount = scheduleItems.filter(i => i.status === 'DUE').length;
  const missedCount = scheduleItems.filter(i => i.status === 'MISSED').length;
  const upcomingCount = scheduleItems.filter(i => i.status === 'UPCOMING').length;
  const score = metrics ? metrics.scorePercentage : Math.round((completedCount / (scheduleItems.length || 1)) * 100);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCsv = () => {
    const headers = [
      'Vaccine Code',
      'Vaccine Name',
      'Dose Number',
      'Target Disease',
      'Recommended Age',
      'Expected Date',
      'Status',
      'Administered Date',
      'Health Center',
      'Doctor/ANM Name',
      'Batch Number',
      'Remarks'
    ];

    const rows = scheduleItems.map(item => [
      `"${item.vaccineCode}"`,
      `"${item.vaccineName}"`,
      item.doseNumber,
      `"${item.diseaseTarget}"`,
      `"${item.recommendedAgeText}"`,
      item.expectedDate || '',
      item.status,
      item.completedDate || '',
      `"${item.administeredCenter || ''}"`,
      `"${item.administeredDoctor || ''}"`,
      `"${item.batchNumber || ''}"`,
      `"${item.remarks || ''}"`
    ]);

    const csvContent = [
      `"Child Name: ${patient.name}"`,
      `"DOB: ${patient.dob}"`,
      `"Age: ${patientAge}"`,
      `"Blood Group: ${patient.bloodGroup || 'N/A'}"`,
      `"Immunization Score: ${score}% (${completedCount}/${scheduleItems.length} completed)"`,
      `"Report Generated: ${reportDate}"`,
      '',
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${patient.name.replace(/\s+/g, '_')}_Vaccination_History_Summary.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySummaryText = () => {
    const summaryText = `*VACCINATION HISTORY SUMMARY REPORT*
Child Name: ${patient.name}
DOB: ${patient.dob} (Age: ${patientAge})
Blood Group: ${patient.bloodGroup || 'Not specified'}
Location: ${patient.city || patient.district}, ${patient.state}
Immunization Score: ${score}% (${completedCount} of ${scheduleItems.length} doses completed)

*COMPLETED VACCINES:*
${scheduleItems.filter(i => i.status === 'COMPLETED').map(i => `✓ ${i.vaccineName} (Dose ${i.doseNumber}) - Administered on ${i.completedDate || 'Recorded'} at ${i.administeredCenter || 'Health Facility'}`).join('\n') || 'None recorded yet'}

*UPCOMING & DUE DOSES:*
${scheduleItems.filter(i => i.status !== 'COMPLETED').map(i => `• ${i.vaccineName} (Dose ${i.doseNumber}) - ${i.status}: Due around ${i.expectedDate} (${i.recommendedAgeText})`).join('\n') || 'All current milestone doses complete!'}

Report Generated on: ${reportDate} via SmartCare Universal Immunization System.`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-gray-200 flex flex-col max-h-[92vh] overflow-hidden my-auto">
        
        {/* Modal Top Controls (Hidden in Print) */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 print-hidden">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base">Vaccination History PDF Summary</h2>
              <p className="text-xs text-gray-500">Official UIP compliant immunization record for {patient.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-wrap">
            <button
              onClick={handleCopySummaryText}
              className="flex items-center space-x-1.5 bg-white hover:bg-gray-100 text-slate-700 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
              title="Copy Summary Text to Clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleDownloadCsv}
              className="flex items-center space-x-1.5 bg-white hover:bg-gray-100 text-slate-700 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
              title="Download CSV spreadsheet"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200 transition"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Switcher Bar (Hidden in Print) */}
        <div className="px-6 py-2.5 bg-white border-b border-gray-100 flex items-center justify-between text-xs print-hidden">
          <div className="flex items-center space-x-1.5">
            <span className="text-gray-500 font-medium">Filter View:</span>
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1 rounded-full font-medium transition ${
                filter === 'ALL'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
              }`}
            >
              All Doses ({scheduleItems.length})
            </button>
            <button
              onClick={() => setFilter('COMPLETED')}
              className={`px-3 py-1 rounded-full font-medium transition ${
                filter === 'COMPLETED'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
              }`}
            >
              Completed ({completedCount})
            </button>
            <button
              onClick={() => setFilter('DUE_UPCOMING')}
              className={`px-3 py-1 rounded-full font-medium transition ${
                filter === 'DUE_UPCOMING'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
              }`}
            >
              Pending & Due ({dueCount + upcomingCount + missedCount})
            </button>
          </div>

          <span className="text-[11px] text-gray-400 hidden sm:inline">
            Print preview matches standard A4 document margins
          </span>
        </div>

        {/* Scrollable Document Body (The printable PDF document) */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-white print-container" ref={printRef}>
          
          {/* Official Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 text-center sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-xs">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase block">
                    Universal Immunization Programme (UIP India) • National Standard
                  </span>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    OFFICIAL VACCINATION HISTORY SUMMARY
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">
                    Mother & Child Protection (MCP) Cumulative Immunization Record
                  </p>
                </div>
              </div>

              <div className="text-center sm:text-right text-xs">
                <div className="font-mono font-bold text-slate-800 bg-gray-50 border border-gray-200 px-3 py-1 rounded-md inline-block">
                  DOC ID: UIP-{patient.id.slice(0, 8).toUpperCase()}
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  Issued On: <span className="font-semibold text-slate-700">{reportDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Child & Guardian Demographics Card */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 sm:p-5 mb-6 text-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-1.5 mb-3 flex items-center justify-between">
              <span>Patient & Guardian Profile Details</span>
              <span className="text-blue-600 font-semibold">Status: Active Beneficiary</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-gray-500 block text-[11px]">Child / Patient Name:</span>
                <span className="font-bold text-slate-900 text-sm block">{patient.name}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Date of Birth (Age):</span>
                <span className="font-semibold text-slate-900 block">{patient.dob} ({patientAge})</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Gender & Blood Group:</span>
                <span className="font-semibold text-slate-900 block">{patient.gender} • {patient.bloodGroup || 'Not Recorded'}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Guardian Name:</span>
                <span className="font-semibold text-slate-900 block">{patient.parentGuardianName || 'Primary Caregiver'}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Contact Mobile:</span>
                <span className="font-semibold text-slate-900 block">{patient.mobile || patient.emergencyContact || 'Registered'}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Residential Region:</span>
                <span className="font-semibold text-slate-900 block">{patient.city || patient.district}, {patient.state}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Vaccination Registry ID:</span>
                <span className="font-mono font-semibold text-slate-900 block">UID-{patient.id.slice(-6).toUpperCase()}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">National Schedule:</span>
                <span className="font-semibold text-emerald-700 block">UIP + IAP Aligned</span>
              </div>
            </div>
          </div>

          {/* Immunization Score & Status Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-center">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
              <span className="text-[11px] text-blue-700 font-bold uppercase block">Coverage Score</span>
              <span className="text-2xl font-black text-blue-800">{score}%</span>
              <span className="text-[10px] text-blue-600 block mt-0.5">{completedCount} of {scheduleItems.length} doses complete</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
              <span className="text-[11px] text-emerald-700 font-bold uppercase block">Completed Doses</span>
              <span className="text-2xl font-black text-emerald-800">{completedCount}</span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">Administered & verified</span>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
              <span className="text-[11px] text-amber-700 font-bold uppercase block">Due / Upcoming</span>
              <span className="text-2xl font-black text-amber-800">{dueCount + upcomingCount}</span>
              <span className="text-[10px] text-amber-600 block mt-0.5">Scheduled for age</span>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-3">
              <span className="text-[11px] text-red-700 font-bold uppercase block">Missed / Overdue</span>
              <span className="text-2xl font-black text-red-800">{missedCount}</span>
              <span className="text-[10px] text-red-600 block mt-0.5">Catch-up recommended</span>
            </div>
          </div>

          {/* Detailed Vaccination Schedule & History Table */}
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center justify-between">
              <span>Chronological Immunization Log & Record</span>
              <span className="text-gray-500 font-normal">Displaying {filteredItems.length} of {scheduleItems.length} items</span>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200 text-slate-800 font-bold uppercase text-[10px]">
                    <th className="py-2.5 px-3">Vaccine & Code</th>
                    <th className="py-2.5 px-2">Dose</th>
                    <th className="py-2.5 px-3">Target Disease</th>
                    <th className="py-2.5 px-3">Milestone / Expected</th>
                    <th className="py-2.5 px-2">Status</th>
                    <th className="py-2.5 px-3">Administered Date & Facility</th>
                    <th className="py-2.5 px-3">Batch / Doctor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredItems.map((item, index) => (
                    <tr
                      key={item.id}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                    >
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-slate-900">{item.vaccineName}</div>
                        <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                          {item.vaccineCode}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 font-semibold text-slate-700">
                        #{item.doseNumber}
                      </td>
                      <td className="py-2.5 px-3 text-gray-600 text-[11px] max-w-[150px]">
                        {item.diseaseTarget}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">
                        <div className="font-medium">{item.recommendedAgeText}</div>
                        <div className="text-[10px] text-gray-400 font-mono">{item.expectedDate}</div>
                      </td>
                      <td className="py-2.5 px-2">
                        {item.status === 'COMPLETED' && (
                          <span className="inline-flex items-center space-x-0.5 bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[10px] border border-emerald-100">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Given</span>
                          </span>
                        )}
                        {item.status === 'DUE' && (
                          <span className="inline-flex items-center space-x-0.5 bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full text-[10px] border border-amber-100">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>Due</span>
                          </span>
                        )}
                        {item.status === 'UPCOMING' && (
                          <span className="inline-flex items-center space-x-0.5 bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full text-[10px] border border-blue-100">
                            <span>Upcoming</span>
                          </span>
                        )}
                        {item.status === 'MISSED' && (
                          <span className="inline-flex items-center space-x-0.5 bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded-full text-[10px] border border-red-100">
                            <AlertTriangle className="w-3 h-3 text-red-600" />
                            <span>Missed</span>
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">
                        {item.status === 'COMPLETED' ? (
                          <div>
                            <div className="font-semibold text-emerald-800">{item.completedDate || 'Recorded'}</div>
                            <div className="text-[10px] text-gray-500 truncate max-w-[140px]">{item.administeredCenter || 'Primary Health Center'}</div>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-[11px]">— Pending —</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 text-[11px]">
                        {item.status === 'COMPLETED' ? (
                          <div>
                            <div>{item.administeredDoctor ? `Dr. ${item.administeredDoctor}` : 'Medical Officer / ANM'}</div>
                            {item.batchNumber && (
                              <div className="text-[10px] font-mono text-gray-400">Batch: {item.batchNumber}</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-[11px]">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Clinical Catch-up & Safety Advisory */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-6 text-xs text-slate-700 space-y-1.5">
            <div className="font-bold text-blue-900 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>National Immunization Guidelines & Catch-Up Policy</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              1. <strong>Delayed Doses:</strong> If any scheduled vaccination dose is delayed or missed, do not restart the vaccination series from dose 1. Administer the missed dose at the earliest opportunity and maintain recommended minimum intervals between subsequent doses.
            </p>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              2. <strong>Free Public Healthcare:</strong> All National Universal Immunization Programme (UIP) vaccines are provided free of cost at all Government Primary Health Centres (PHCs), Community Health Centres (CHCs), Sub-Centres, and Anganwadi outreach camps across India.
            </p>
          </div>

          {/* Official Verification Seal & Signatures Block */}
          <div className="border-t-2 border-gray-200 pt-6 mt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-center sm:text-left">
            <div>
              <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-8">
                Official Digital QR Verification
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-slate-800 border border-gray-300">
                  <QrCode className="w-6 h-6" />
                </div>
                <div className="text-[10px] text-gray-500">
                  <div className="font-bold text-slate-800">SmartCare Digital Card</div>
                  <div>Verify online via Portal</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-8">
                Parent / Guardian Acknowledgement
              </div>
              <div className="border-t border-dashed border-gray-400 pt-1 text-[11px] font-medium text-slate-700">
                Signature of Parent / Guardian
              </div>
            </div>

            <div>
              <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-8">
                Attending Medical Officer / ANM
              </div>
              <div className="border-t border-dashed border-gray-400 pt-1 text-[11px] font-medium text-slate-700">
                Authorized Signature & PHC Stamp
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-[10px] text-gray-400 mt-8 pt-4 border-t border-gray-100">
            This document is generated automatically by SmartCare Child Vaccination & Universal Immunization Management System. Valid across public and private healthcare facilities.
          </div>
        </div>

        {/* Modal Bottom Toolbar (Hidden in Print) */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs print-hidden">
          <span className="text-gray-500">
            Total {scheduleItems.length} UIP doses recorded for {patient.name}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-slate-700 hover:bg-gray-100 rounded-lg font-semibold transition"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs flex items-center space-x-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
