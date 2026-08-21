import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  CheckCircle2,
  Pill,
  MapPin,
  Building,
  User,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import {
  PatientProfile,
  VaccinationScheduleItem,
  MedicineItem,
  VaccinationCenter,
  FoodTiming,
  MedicineFrequency,
  AreaRequirement
} from '../types';

// =========================================================================
// 1. ADD / EDIT PATIENT PROFILE MODAL
// =========================================================================

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patientData: Partial<PatientProfile>) => void;
  initialData?: PatientProfile | null;
}

export const PatientModal: React.FC<PatientModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: 'MALE' as const,
    relation: 'CHILD' as const,
    parentGuardianName: '',
    mobile: '9876543210',
    bloodGroup: 'B+',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Pune',
    emergencyContact: '+91 9876543210',
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        dob: initialData.dob,
        gender: initialData.gender,
        relation: initialData.relation,
        parentGuardianName: initialData.parentGuardianName || '',
        mobile: initialData.mobile || '',
        bloodGroup: initialData.bloodGroup || '',
        state: initialData.state,
        district: initialData.district,
        city: initialData.city || '',
        emergencyContact: initialData.emergencyContact || '',
        notes: initialData.notes || ''
      });
    } else {
      setFormData({
        name: '',
        dob: new Date().toISOString().split('T')[0],
        gender: 'MALE',
        relation: 'CHILD',
        parentGuardianName: 'Priya & Rahul Sharma',
        mobile: '9876543210',
        bloodGroup: 'O+',
        state: 'Maharashtra',
        district: 'Pune',
        city: 'Pune',
        emergencyContact: '+91 9876543210',
        notes: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dob) {
      alert('Please fill out child name and date of birth.');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-gray-200 space-y-4 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-slate-900 text-base">
              {initialData ? 'Edit Profile' : 'Add New Child / Family Member'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-slate-700">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Baby Aarav Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Date of Birth (DOB) *</label>
              <input
                type="date"
                required
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
              <span className="text-[10px] text-gray-400">Generates UIP schedule automatically</span>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Relation</label>
              <select
                value={formData.relation}
                onChange={(e) => setFormData({ ...formData, relation: e.target.value as any })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              >
                <option value="CHILD">Child / Newborn</option>
                <option value="SELF">Self (Adult / Booster)</option>
                <option value="SPOUSE">Spouse</option>
                <option value="PARENT">Parent / Senior</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Blood Group</label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Parent / Guardian Name</label>
              <input
                type="text"
                placeholder="e.g. Priya Sharma"
                value={formData.parentGuardianName}
                onChange={(e) => setFormData({ ...formData, parentGuardianName: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Contact Mobile</label>
              <input
                type="tel"
                placeholder="10-digit mobile"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">District / City</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value, city: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Medical Notes & Allergies (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Egg allergy, premature birth at 36 weeks"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg text-xs"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 text-slate-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs transition"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =========================================================================
// 2. RECORD VACCINATION ADMINISTERED MODAL
// =========================================================================

interface RecordVaccineModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: VaccinationScheduleItem | null;
  onSave: (completionData: {
    itemId: string;
    completedDate: string;
    administeredCenter: string;
    administeredDoctor?: string;
    batchNumber?: string;
    remarks?: string;
  }) => void;
}

export const RecordVaccineModal: React.FC<RecordVaccineModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
}) => {
  const [completedDate, setCompletedDate] = useState(new Date().toISOString().split('T')[0]);
  const [administeredCenter, setAdministeredCenter] = useState('Pune Urban Primary Health Center');
  const [administeredDoctor, setAdministeredDoctor] = useState('Dr. Anjali Patil (Medical Officer)');
  const [batchNumber, setBatchNumber] = useState(`BATCH-UIP-${Math.floor(1000 + Math.random() * 9000)}`);
  const [remarks, setRemarks] = useState('No adverse reactions. Left anterolateral thigh.');

  useEffect(() => {
    if (item) {
      if (item.completedDate) setCompletedDate(item.completedDate);
      if (item.administeredCenter) setAdministeredCenter(item.administeredCenter);
      if (item.administeredDoctor) setAdministeredDoctor(item.administeredDoctor);
      if (item.batchNumber) setBatchNumber(item.batchNumber);
      if (item.remarks) setRemarks(item.remarks);
    }
  }, [item, isOpen]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      itemId: item.id,
      completedDate,
      administeredCenter,
      administeredDoctor,
      batchNumber,
      remarks
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-gray-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <div>
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              Immunization Record Entry
            </span>
            <h2 className="font-bold text-slate-900 text-base sm:text-lg mt-1">
              Record: {item.vaccineName} (Dose {item.doseNumber})
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs text-slate-700">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Date Administered *</label>
            <input
              type="date"
              required
              value={completedDate}
              onChange={(e) => setCompletedDate(e.target.value)}
              className="w-full p-2.5 border border-gray-200 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Health Center / Hospital Facility *</label>
            <input
              type="text"
              required
              placeholder="e.g. Pune Urban Primary Health Center (PHC)"
              value={administeredCenter}
              onChange={(e) => setAdministeredCenter(e.target.value)}
              className="w-full p-2.5 border border-gray-200 rounded-lg text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Vaccinator / Doctor Name</label>
              <input
                type="text"
                placeholder="e.g. Dr. Anjali Patil"
                value={administeredDoctor}
                onChange={(e) => setAdministeredDoctor(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Vaccine Batch Number</label>
              <input
                type="text"
                placeholder="e.g. BATCH-8941"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Clinical Remarks & Site</label>
            <input
              type="text"
              placeholder="e.g. Given in right anterolateral thigh, well tolerated"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg text-xs"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 text-slate-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs transition"
            >
              Save Vaccination Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =========================================================================
// 3. ADD / EDIT MEDICINE MODAL
// =========================================================================

interface MedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  onSave: (medData: Partial<MedicineItem>) => void;
  initialData?: MedicineItem | null;
}

export const MedicineModal: React.FC<MedicineModalProps> = ({
  isOpen,
  onClose,
  patientId,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '5 ml',
    frequency: 'TWICE_DAILY' as MedicineFrequency,
    reminderTimes: ['08:00', '20:00'],
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    foodTiming: 'AFTER_FOOD' as FoodTiming,
    instructions: 'Give with water after morning & dinner meals',
    purpose: 'Cough & cold pediatric relief'
  });

  const [time1, setTime1] = useState('08:00');
  const [time2, setTime2] = useState('20:00');
  const [time3, setTime3] = useState('14:00');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        dosage: initialData.dosage,
        frequency: initialData.frequency,
        reminderTimes: initialData.reminderTimes,
        startDate: initialData.startDate,
        endDate: initialData.endDate || '',
        foodTiming: initialData.foodTiming,
        instructions: initialData.instructions || '',
        purpose: initialData.purpose || ''
      });
      if (initialData.reminderTimes[0]) setTime1(initialData.reminderTimes[0]);
      if (initialData.reminderTimes[1]) setTime2(initialData.reminderTimes[1]);
      if (initialData.reminderTimes[2]) setTime3(initialData.reminderTimes[2]);
    } else {
      setFormData({
        name: '',
        dosage: '5 ml syrup',
        frequency: 'TWICE_DAILY',
        reminderTimes: ['08:00', '20:00'],
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        foodTiming: 'AFTER_FOOD',
        instructions: 'Give with water after meals',
        purpose: 'Fever / Pediatric prescription'
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert('Please specify medicine name.');
      return;
    }

    let times = [time1];
    if (formData.frequency === 'TWICE_DAILY') times = [time1, time2];
    if (formData.frequency === 'THRICE_DAILY') times = [time1, time3, time2];

    onSave({
      ...formData,
      patientId,
      reminderTimes: times
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-gray-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-slate-900 text-base">
              {initialData ? 'Edit Prescription' : 'Add Medicine Reminder'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-slate-700">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Medicine Name & Form *</label>
            <input
              type="text"
              required
              placeholder="e.g. Paracetamol 120mg Syrup, Amoxicillin Drops"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Dosage Amount *</label>
              <input
                type="text"
                required
                placeholder="e.g. 5 ml, 1 tablet, 3 drops"
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Food Timing</label>
              <select
                value={formData.foodTiming}
                onChange={(e) => setFormData({ ...formData, foodTiming: e.target.value as any })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              >
                <option value="AFTER_FOOD">After Food</option>
                <option value="BEFORE_FOOD">Before Food (Empty Stomach)</option>
                <option value="WITH_FOOD">With Food</option>
                <option value="EMPTY_STOMACH">Early Morning Empty Stomach</option>
                <option value="NO_RESTRICTION">Anytime</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Daily Frequency</label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              >
                <option value="ONCE_DAILY">Once Daily (1x)</option>
                <option value="TWICE_DAILY">Twice Daily (2x)</option>
                <option value="THRICE_DAILY">Thrice Daily (3x)</option>
                <option value="AS_NEEDED">As Needed (SOS)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Purpose / Diagnosis</label>
              <input
                type="text"
                placeholder="e.g. Fever relief, Vitamin D"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Time Picker Slots */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">Daily Alarm Times</label>
            <div className="flex flex-wrap gap-2">
              <input
                type="time"
                value={time1}
                onChange={(e) => setTime1(e.target.value)}
                className="p-1.5 border border-gray-200 rounded text-xs"
              />
              {formData.frequency !== 'ONCE_DAILY' && (
                <input
                  type="time"
                  value={time2}
                  onChange={(e) => setTime2(e.target.value)}
                  className="p-1.5 border border-gray-200 rounded text-xs"
                />
              )}
              {formData.frequency === 'THRICE_DAILY' && (
                <input
                  type="time"
                  value={time3}
                  onChange={(e) => setTime3(e.target.value)}
                  className="p-1.5 border border-gray-200 rounded text-xs"
                />
              )}
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Doctor's Instructions & Notes</label>
            <input
              type="text"
              placeholder="e.g. Give for 5 days only. Shake bottle well before use."
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg text-xs"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 text-slate-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs transition"
            >
              Save Medicine Reminder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =========================================================================
// 4. ADD CENTER MODAL
// =========================================================================

interface AddCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (centerData: Partial<VaccinationCenter>) => void;
}

export const AddCenterModal: React.FC<AddCenterModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'GOVT_PHC' as const,
    address: '',
    city: 'Pune',
    district: 'Pune',
    state: 'Maharashtra',
    pinCode: '411001',
    phone: '+91 20 2550 0000',
    timings: 'Mon-Sat: 09:00 AM - 04:00 PM',
    isFree: true,
    availableVaccinesText: 'BCG, OPV, Pentavalent, Rotavirus, PCV, MR, DPT, Td'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address) {
      alert('Please specify center name and address.');
      return;
    }
    onSave({
      ...formData,
      availableVaccines: formData.availableVaccinesText.split(',').map(v => v.trim())
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-gray-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-slate-900 text-base">Add Vaccination Facility</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs text-slate-700">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Center / Facility Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Shivaji Nagar Urban Health Center"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 border border-gray-200 rounded-lg text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Facility Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              >
                <option value="GOVT_PHC">Govt Primary Health Center (PHC)</option>
                <option value="GOVT_HOSPITAL">Govt District Hospital / CHC</option>
                <option value="CAMP">Special Immunization Camp</option>
                <option value="PRIVATE_HOSPITAL">Private Hospital</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Cost Structure</label>
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  checked={formData.isFree}
                  onChange={(e) => setFormData({ ...formData, isFree: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="font-semibold text-slate-800">100% Free Govt Supply</span>
              </div>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Address *</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg text-xs"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="font-bold text-slate-800 block mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">District</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">Pincode</label>
              <input
                type="text"
                value={formData.pinCode}
                onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Contact Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">Timings</label>
              <input
                type="text"
                value={formData.timings}
                onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Available Vaccines (Comma-separated)</label>
            <input
              type="text"
              value={formData.availableVaccinesText}
              onChange={(e) => setFormData({ ...formData, availableVaccinesText: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg text-xs"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 text-slate-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs transition"
            >
              Add Center
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// =========================================================================
// 5. ADD / ANNOUNCE CAMPAIGN DRIVE MODAL (Admin & Public Health Officer)
// =========================================================================

interface AddCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (campaignData: Partial<AreaRequirement>) => void;
}

export const AddCampaignModal: React.FC<AddCampaignModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Pune',
    targetAgeGroup: 'Children 0-5 Years & Pregnant Women',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    vaccinesText: 'MR-1, MR-2, Pentavalent, PCV, OPV, DPT Booster',
    instructions: 'Administered free of cost at all Government PHCs, Sub-centers, Anganwadis, and special mobile booths.',
    priority: 'HIGH' as const,
    isFree: true,
    source: 'Public Health Department / MoHFW'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.startDate || !formData.endDate) {
      alert('Please fill out campaign title, start date, and end date.');
      return;
    }

    const vaccines = formData.vaccinesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      title: formData.title,
      description: formData.description,
      state: formData.state,
      district: formData.district,
      city: formData.city,
      campaignName: formData.title,
      targetAgeGroup: formData.targetAgeGroup,
      startDate: formData.startDate,
      endDate: formData.endDate,
      vaccines: vaccines.length > 0 ? vaccines : ['Routine UIP Vaccines'],
      vaccinesOffered: vaccines.length > 0 ? vaccines : ['Routine UIP Vaccines'],
      instructions: formData.instructions,
      priority: formData.priority,
      isUrgent: formData.priority === 'HIGH',
      isFree: formData.isFree,
      source: formData.source
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-gray-200 space-y-4 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base">Announce Health & Vaccination Campaign</h2>
              <p className="text-[11px] text-gray-500">Add official UIP or special community immunization drive</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs text-slate-700">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Campaign Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Special Catch-up Mission Indradhanush Drive"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Description & Objective *</label>
            <textarea
              rows={2}
              required
              placeholder="Explain who should attend and purpose of drive..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">State / Province</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
                placeholder="e.g. Maharashtra or All India"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">District / Region</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
                placeholder="e.g. Pune or National"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Start Date *</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">End Date *</label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Target Age Group</label>
              <input
                type="text"
                value={formData.targetAgeGroup}
                onChange={(e) => setFormData({ ...formData, targetAgeGroup: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
                placeholder="e.g. 0-5 Years, 9-14 Years"
              />
            </div>
            <div>
              <label className="font-bold text-slate-800 block mb-1">Priority Level</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              >
                <option value="HIGH">High Priority (Urgent Catch-up)</option>
                <option value="MEDIUM">Medium Priority (Subsidized Drive)</option>
                <option value="ROUTINE">Routine National Day (e.g. Pulse Polio)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Vaccines Administered (Comma-separated)</label>
            <input
              type="text"
              value={formData.vaccinesText}
              onChange={(e) => setFormData({ ...formData, vaccinesText: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              placeholder="e.g. MR, OPV, Pentavalent, PCV, Td"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Public Health Authority / Source</label>
            <input
              type="text"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              placeholder="e.g. Directorate of Health Services / MoHFW"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-3 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 text-slate-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold shadow-xs transition"
            >
              Announce Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

