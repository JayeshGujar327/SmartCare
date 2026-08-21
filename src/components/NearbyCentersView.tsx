import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  Plus
} from 'lucide-react';
import {
  Language,
  VaccinationCenter,
  CenterType
} from '../types';
import { translations } from '../services/i18n';

interface NearbyCentersViewProps {
  language: Language;
  centers: VaccinationCenter[];
  onAddCenterClick?: () => void;
  isAdmin?: boolean;
}

export const NearbyCentersView: React.FC<NearbyCentersViewProps> = ({
  language,
  centers,
  onAddCenterClick,
  isAdmin = false,
}) => {
  const t = translations[language];
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocating(false);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        // Default to Pune/Mumbai reference coords for preview if user declines
        setUserCoords({ lat: 18.5204, lng: 73.8567 });
        setLocating(false);
      }
    );
  };

  const filteredCenters = centers.filter((center) => {
    const matchesType = selectedType === 'ALL' || center.type === selectedType;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      center.name.toLowerCase().includes(q) ||
      center.city.toLowerCase().includes(q) ||
      center.district.toLowerCase().includes(q) ||
      center.address.toLowerCase().includes(q) ||
      center.availableVaccines.some(v => v.toLowerCase().includes(q));
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{t.centers.title}</h1>
            <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full border border-blue-100">
              Free Govt PHCs & Camps
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {t.centers.subtitle}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleGetLocation}
            disabled={locating}
            className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-xs transition"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{locating ? 'Locating...' : t.centers.useMyLocation}</span>
          </button>
          
          {isAdmin && onAddCenterClick && (
            <button
              onClick={onAddCenterClick}
              className="flex items-center space-x-1 bg-gray-50 hover:bg-gray-100 text-slate-800 border border-gray-200 px-3 py-2 rounded-lg text-xs font-semibold transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Center</span>
            </button>
          )}
        </div>
      </div>

      {/* Search and Facility Type Filter */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder={t.centers.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedType('ALL')}
            className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition border ${
              selectedType === 'ALL'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {t.common.all} ({centers.length})
          </button>
          <button
            onClick={() => setSelectedType('GOVT_PHC')}
            className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition border ${
              selectedType === 'GOVT_PHC'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-blue-700 border-blue-100 hover:bg-blue-50'
            }`}
          >
            {t.centers.govtPhc}
          </button>
          <button
            onClick={() => setSelectedType('GOVT_HOSPITAL')}
            className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition border ${
              selectedType === 'GOVT_HOSPITAL'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {t.centers.govtHospital}
          </button>
          <button
            onClick={() => setSelectedType('CAMP')}
            className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition border ${
              selectedType === 'CAMP'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-amber-800 border-amber-200 hover:bg-amber-50'
            }`}
          >
            {t.centers.camp}
          </button>
          <button
            onClick={() => setSelectedType('PRIVATE_HOSPITAL')}
            className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition border ${
              selectedType === 'PRIVATE_HOSPITAL'
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-purple-800 border-purple-200 hover:bg-purple-50'
            }`}
          >
            {t.centers.privateHospital}
          </button>
        </div>
      </div>

      {/* Centers Cards Grid */}
      {filteredCenters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCenters.map((center) => (
            <div
              key={center.id}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Center Title & Type Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">{center.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {center.address}, {center.city}, {center.state} - {center.pinCode}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border whitespace-nowrap ${
                    center.isFree
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      : 'bg-purple-50 text-purple-700 border-purple-100'
                  }`}>
                    {center.isFree ? t.common.free : t.common.paid}
                  </span>
                </div>

                {/* Details list */}
                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span><strong>Timings:</strong> {center.timings}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <a href={`tel:${center.phone}`} className="text-blue-600 hover:underline font-semibold">
                      {center.phone}
                    </a>
                  </div>
                  {center.distanceKm && (
                    <div className="flex items-center space-x-2 text-blue-700 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>{center.distanceKm} km away from your location</span>
                    </div>
                  )}
                </div>

                {/* Available Vaccines Pills */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                    {t.centers.availableVaccines}:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {center.availableVaccines.map((vax, idx) => (
                      <span key={idx} className="bg-gray-100 text-slate-700 text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                        {vax}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                {center.facilities && center.facilities.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px] text-gray-500">
                    {center.facilities.map((fac, idx) => (
                      <span key={idx} className="text-gray-500">
                        • {fac}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <a
                  href={`tel:${center.phone}`}
                  className="text-xs bg-gray-50 hover:bg-gray-100 text-slate-700 font-semibold px-3 py-1.5 rounded-lg border border-gray-200 flex items-center space-x-1 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t.common.call}</span>
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.name + ' ' + center.address + ' ' + center.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3.5 py-1.5 rounded-lg flex items-center space-x-1 shadow-xs transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{t.common.directions}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">{t.centers.noCentersFound}</p>
        </div>
      )}
    </div>
  );
};
