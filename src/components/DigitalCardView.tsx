import React, { useState, useEffect } from 'react';
import {
  QrCode,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  UserCheck,
  Eye,
  Share2,
  Info
} from 'lucide-react';
import {
  Language,
  PatientProfile,
  DigitalVaccinationCard
} from '../types';
import { translations } from '../services/i18n';

interface DigitalCardViewProps {
  language: Language;
  patient: PatientProfile | null;
  patientAge: string;
}

export const DigitalCardView: React.FC<DigitalCardViewProps> = ({
  language,
  patient,
  patientAge,
}) => {
  const t = translations[language];
  const [cardData, setCardData] = useState<DigitalVaccinationCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  useEffect(() => {
    if (!patient) return;
    setLoading(true);
    fetch(`/api/qr/card/${patient.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.card) {
          setCardData(data.card);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching card:', err);
        setLoading(false);
      });
  }, [patient]);

  if (!patient) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
        <p className="text-slate-500">Please select a patient profile to view their digital vaccination card.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent"></div>
        <p className="mt-3 text-slate-600 text-sm font-medium">Generating digital QR vaccination record...</p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Action Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{t.card.title}</h1>
          <p className="text-xs text-slate-500">{t.card.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowVerifyModal(true)}
            className="flex items-center space-x-1.5 bg-gray-100 hover:bg-gray-200 text-slate-700 px-3.5 py-2 rounded-lg text-xs font-semibold transition"
          >
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>Simulate QR Scan</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.common.print}</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Style Digital Vaccination Card */}
      <div
        id="digital-vaccination-card"
        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6 sm:p-8 relative print:border-none print:shadow-none print:p-0"
      >
        {/* Official Header */}
        <div className="border-b border-gray-200 pb-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xs flex-shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider text-blue-600 uppercase block">
                Government & Public Health Compliant Record
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                DIGITAL IMMUNIZATION RECORD
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                National Universal Immunization Programme (UIP India) Reference Standard
              </p>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="text-xs font-mono font-bold text-slate-800 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200 inline-block">
              {cardData?.verificationId || 'SC-IND-2026'}
            </div>
            <div className="text-[11px] text-gray-400 mt-0.5">
              Issued: {cardData?.issuedDate || new Date().toISOString().split('T')[0]}
            </div>
          </div>
        </div>

        {/* Patient Demographics & QR Code Block */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-gray-50 p-5 rounded-xl border border-gray-200 mb-6">
          
          {/* Demographics */}
          <div className="sm:col-span-2 space-y-2 text-xs text-slate-700">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-1 mb-2">
              {t.card.patientDetails}
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <span className="text-gray-500 block">Full Name:</span>
                <span className="font-bold text-slate-900 text-sm">{patient.name}</span>
              </div>
              <div>
                <span className="text-gray-500 block">{t.card.dob}:</span>
                <span className="font-semibold text-slate-900">{patient.dob} ({patientAge})</span>
              </div>
              <div>
                <span className="text-gray-500 block">{t.card.gender}:</span>
                <span className="font-semibold text-slate-900">{patient.gender}</span>
              </div>
              <div>
                <span className="text-gray-500 block">{t.card.bloodGroup}:</span>
                <span className="font-semibold text-slate-900">{patient.bloodGroup || 'Not Recorded'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">{t.card.parentGuardian}:</span>
                <span className="font-semibold text-slate-900">{patient.parentGuardianName || 'Parent'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">State / District:</span>
                <span className="font-semibold text-slate-900">{patient.district}, {patient.state}</span>
              </div>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="flex flex-col items-center justify-center text-center p-3 bg-white rounded-lg border border-gray-200 shadow-xs">
            {cardData?.qrCodeDataUrl ? (
              <img
                src={cardData.qrCodeDataUrl}
                alt="Vaccination Verification QR Code"
                className="w-32 h-32 object-contain"
              />
            ) : (
              <QrCode className="w-24 h-24 text-gray-400" />
            )}
            <span className="text-[11px] font-bold text-blue-600 mt-1 uppercase tracking-tight">
              Scan to Verify Record
            </span>
            <span className="text-[10px] text-gray-400">Cryptographically verifiable</span>
          </div>
        </div>

        {/* Completed Immunizations Table */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>{t.card.completedDoses} ({cardData?.completedVaccinations.length || 0})</span>
            </h3>
            <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full">
              Score: {cardData?.vaccinationScore || 0}% Complete
            </span>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 font-bold uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-3">Vaccine Name</th>
                  <th className="py-2.5 px-3">Dose</th>
                  <th className="py-2.5 px-3">Date Given</th>
                  <th className="py-2.5 px-3 hidden sm:table-cell">Batch Number</th>
                  <th className="py-2.5 px-3 hidden sm:table-cell">Center / Facility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cardData && cardData.completedVaccinations.length > 0 ? (
                  cardData.completedVaccinations.map((vax) => (
                    <tr key={vax.id} className="hover:bg-gray-50/80">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        {vax.vaccineName}
                      </td>
                      <td className="py-2.5 px-3 text-gray-600">Dose {vax.doseNumber}</td>
                      <td className="py-2.5 px-3 font-medium text-green-700">{vax.completedDate || '-'}</td>
                      <td className="py-2.5 px-3 text-gray-500 font-mono hidden sm:table-cell">{vax.batchNumber || 'UIP-GEN-491'}</td>
                      <td className="py-2.5 px-3 text-gray-600 hidden sm:table-cell">{vax.administeredCenter || 'Govt PHC'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-400">
                      No completed vaccinations recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Next Recommended Immunization Banner */}
        {cardData?.nextVaccineName && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 mb-6 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-blue-950 block">{t.card.nextRecommended}:</span>
              <span className="text-blue-900 font-semibold">{cardData.nextVaccineName}</span>
            </div>
            <div className="text-right">
              <span className="text-gray-500 block">Expected Date:</span>
              <span className="font-bold text-blue-700">{cardData.nextDueDate}</span>
            </div>
          </div>
        )}

        {/* Bottom Official Disclaimer */}
        <div className="border-t border-gray-200 pt-4 text-[11px] text-gray-500 text-center leading-relaxed">
          <p className="font-semibold text-gray-600 mb-0.5">{t.card.officialDisclaimer}</p>
          <p>Verified through SmartCare UIP Immunization Protocol • Retain physical Mother & Child Protection (MCP) card for statutory requirements.</p>
        </div>
      </div>

      {/* QR Verification Modal Simulator */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center space-x-2 text-green-700 font-bold">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Verified Official Record</span>
              </div>
              <button
                onClick={() => setShowVerifyModal(false)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-2 text-slate-700 bg-green-50/70 p-4 rounded-xl border border-green-200">
              <div><span className="font-semibold text-slate-900">Certificate Status:</span> <span className="text-green-700 font-bold">AUTHENTIC & VALID</span></div>
              <div><span className="font-semibold text-slate-900">Verification ID:</span> <span className="font-mono text-slate-800">{cardData?.verificationId}</span></div>
              <div><span className="font-semibold text-slate-900">Patient:</span> <span className="font-bold text-slate-900">{patient.name}</span> (DOB: {patient.dob})</div>
              <div><span className="font-semibold text-slate-900">Total Doses Administered:</span> <span className="font-bold text-blue-700">{cardData?.completedVaccinations.length} doses</span></div>
              <div><span className="font-semibold text-slate-900">Vaccination Progress Score:</span> <span className="font-bold text-blue-700">{cardData?.vaccinationScore}%</span></div>
              <div><span className="font-semibold text-slate-900">Verification Authority:</span> SmartCare National Immunization Digital Protocol</div>
            </div>

            <button
              onClick={() => setShowVerifyModal(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition shadow-xs"
            >
              Close Verification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
