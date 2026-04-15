import React, { useState } from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';

interface BirthDataFormProps {
  onSubmit: (data: {
    name: string;
    date: string;
    time: string;
    place: string;
    latitude: number;
    longitude: number;
    timezoneOffset: number;
  }) => void;
  loading?: boolean;
}

const CITIES = [
  { name: 'Paris', lat: 48.8566, lon: 2.3522, tz: 1 },
  { name: 'Lyon', lat: 45.7640, lon: 4.8357, tz: 1 },
  { name: 'Marseille', lat: 43.2965, lon: 5.3698, tz: 1 },
  { name: 'Toulouse', lat: 43.6047, lon: 1.4442, tz: 1 },
  { name: 'Bordeaux', lat: 44.8378, lon: -0.5792, tz: 1 },
  { name: 'Lille', lat: 50.6292, lon: 3.0573, tz: 1 },
  { name: 'Nice', lat: 43.7102, lon: 7.2620, tz: 1 },
  { name: 'Nantes', lat: 47.2184, lon: -1.5536, tz: 1 },
  { name: 'Strasbourg', lat: 48.5734, lon: 7.7521, tz: 1 },
  { name: 'Montpellier', lat: 43.6108, lon: 3.8767, tz: 1 },
  { name: 'Bruxelles', lat: 50.8503, lon: 4.3517, tz: 1 },
  { name: 'Genève', lat: 46.2044, lon: 6.1432, tz: 1 },
  { name: 'Londres', lat: 51.5074, lon: -0.1278, tz: 0 },
  { name: 'New York', lat: 40.7128, lon: -74.0060, tz: -5 },
  { name: 'Los Angeles', lat: 34.0522, lon: -118.2437, tz: -8 },
];

export default function BirthDataForm({ onSubmit, loading = false }: BirthDataFormProps) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [dateDisplay, setDateDisplay] = useState('');
  const [time, setTime] = useState('12:00');
  const [timeDisplay, setTimeDisplay] = useState('12:00');
  const [selectedCity, setSelectedCity] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [selectedCityData, setSelectedCityData] = useState<any>(null);

  // Calcul approximatif du fuseau horaire basé sur la longitude
  const getTimezoneFromLongitude = (lon: number): number => {
    return Math.round(lon / 15);
  };

  const handleCityInputChange = async (value: string) => {
    setCityInput(value);
    setSelectedCity(value);

    if (value.length > 2) {
      setLoadingSuggestions(true);
      setShowSuggestions(true);
      try {
        // Utilise l'API Nominatim (OpenStreetMap) pour rechercher les villes
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(value)}&format=json&limit=10&addresstype=city`
        );
        const data = await response.json();
        const cities = data.map((item: any) => ({
          name: item.address?.city || item.address?.town || item.address?.village || item.name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          tz: getTimezoneFromLongitude(parseFloat(item.lon)),
          country: item.address?.country,
        }));
        // Déduplique par nom de ville
        const uniqueCities = Array.from(
          new Map(cities.map(c => [c.name, c])).values()
        );
        setSuggestions(uniqueCities);
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        setSuggestions([]);
      }
      setLoadingSuggestions(false);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectCity = (city: any) => {
    setCityInput(city.name);
    setSelectedCity(city.name);
    setSelectedCityData(city);
    setShowSuggestions(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let formatted = '';
    
    if (value.length > 0) {
      formatted = value.slice(0, 2);
      if (value.length > 2) {
        formatted += '/' + value.slice(2, 4);
      }
      if (value.length > 4) {
        formatted += '/' + value.slice(4, 8);
      }
    }
    
    setDateDisplay(formatted);
    
    // Convert dd/mm/yyyy to yyyy-mm-dd for the hidden input
    if (value.length === 8) {
      const day = value.slice(0, 2);
      const month = value.slice(2, 4);
      const year = value.slice(4, 8);
      setDate(`${year}-${month}-${day}`);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let formatted = '';
    
    if (value.length > 0) {
      formatted = value.slice(0, 2);
      if (value.length > 2) {
        formatted += ':' + value.slice(2, 4);
      }
    }
    
    setTimeDisplay(formatted);
    
    // Keep time in hh:mm format
    if (value.length >= 4) {
      const hours = value.slice(0, 2);
      const minutes = value.slice(2, 4);
      setTime(`${hours}:${minutes}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Si une ville a été sélectionnée via les suggestions, utilise ses données
    let cityData = selectedCityData;
    
    // Sinon, cherche dans les villes pré-existantes
    if (!cityData) {
      cityData = CITIES.find(c => c.name === selectedCity);
    }

    // Utilise des coordonnées par défaut si rien n'a été trouvé
    if (!cityData) {
      cityData = CITIES[0];
    }

    onSubmit({
      name,
      date,
      time,
      place: selectedCity,
      latitude: cityData.lat,
      longitude: cityData.lon,
      timezoneOffset: cityData.tz,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Votre Thème Astral</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nom
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="Entrez votre nom"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Date de naissance
            </label>
            <input
              type="text"
              value={dateDisplay}
              onChange={handleDateChange}
              placeholder="jj/mm/aaaa"
              maxLength="10"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Clock className="inline w-4 h-4 mr-1" />
              Heure de naissance
            </label>
            <input
              type="text"
              value={timeDisplay}
              onChange={handleTimeChange}
              placeholder="hh:mm"
              maxLength="5"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Lieu de naissance
          </label>
          <div className="relative">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => handleCityInputChange(e.target.value)}
              onFocus={() => cityInput.length > 2 && setShowSuggestions(true)}
              placeholder="Entrez le nom de votre ville"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {loadingSuggestions ? (
                  <div className="px-4 py-3 text-slate-500 text-center">Recherche en cours...</div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((city, idx) => (
                    <button
                      key={`${city.name}-${idx}`}
                      type="button"
                      onClick={() => handleSelectCity(city)}
                      className="w-full text-left px-4 py-3 hover:bg-blue-50 transition border-b border-slate-100 last:border-b-0"
                    >
                      <div className="text-slate-700 font-medium">{city.name}</div>
                      <div className="text-xs text-slate-500">{city.country}</div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-slate-500 text-center">Aucune ville trouvée</div>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Calcul en cours...' : 'Générer mon thème astral'}
        </button>
      </div>
    </form>
  );
}
