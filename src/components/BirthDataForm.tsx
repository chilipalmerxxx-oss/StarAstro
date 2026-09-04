import React, { useState } from 'react';

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
    <div className="relative max-w-2xl w-full">
      {/* Outer glow */}
      <div className="absolute -inset-1 rounded-2xl bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.10),transparent_60%)] blur-2xl pointer-events-none" />

      <form
        onSubmit={handleSubmit}
        className="relative overflow-hidden bg-[#0E0E0E] border border-[rgba(212,175,55,0.22)] rounded-2xl p-10"
        style={{ boxShadow: '0 0 60px rgba(212,175,55,0.04), inset 0 0 40px rgba(212,175,55,0.02)' }}
      >
        {/* Animated top gold line */}
        <div className="d-top-line" />

        {/* Stars */}
        <div className="d-star" style={{ width:'2px', height:'2px', top:'8%', left:'12%', animationDelay:'0s' }} />
        <div className="d-star" style={{ width:'1px', height:'1px', top:'14%', left:'78%', animationDelay:'0.7s' }} />
        <div className="d-star" style={{ width:'3px', height:'3px', top:'20%', left:'92%', animationDelay:'1.4s', opacity:0.5 }} />
        <div className="d-star" style={{ width:'1px', height:'1px', top:'35%', left:'4%', animationDelay:'2.1s' }} />
        <div className="d-star" style={{ width:'2px', height:'2px', top:'62%', left:'95%', animationDelay:'0.4s' }} />
        <div className="d-star" style={{ width:'1px', height:'1px', top:'72%', left:'7%', animationDelay:'1.8s' }} />
        <div className="d-star" style={{ width:'2px', height:'2px', top:'85%', left:'88%', animationDelay:'1.1s' }} />
        <div className="d-star" style={{ width:'1px', height:'1px', top:'90%', left:'30%', animationDelay:'2.6s' }} />
        <div className="d-star" style={{ width:'3px', height:'3px', top:'50%', left:'2%', animationDelay:'0.9s', opacity:0.4 }} />
        <div className="d-star" style={{ width:'1px', height:'1px', top:'5%', left:'55%', animationDelay:'1.6s' }} />
        <div className="d-cross" style={{ top:'10%', left:'88%', animationDelay:'0.5s' }} />
        <div className="d-cross" style={{ top:'78%', left:'5%', animationDelay:'2s', transform:'scale(0.7)' }} />

        {/* Header */}
        <div className="relative z-10 text-center mb-10">
          <h2
            className="text-2xl font-normal tracking-[0.22em] uppercase mb-3"
            style={{
              background: 'linear-gradient(135deg, #F5E6B0, #D4AF37, #F0D060)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Votre Thème Astral
          </h2>
          <div className="flex items-center justify-center gap-2 text-[11px] text-[#8A7A5A] tracking-[0.2em] uppercase">
            <span className="d-dot-blink inline-block w-1 h-1 rounded-full bg-[#D4AF37] opacity-70" />
            Thème Natal
            <span className="d-dot-blink inline-block w-1 h-1 rounded-full bg-[#D4AF37] opacity-70" style={{ animationDelay: '0.8s' }} />
            Calculs Précis
            <span className="d-dot-blink inline-block w-1 h-1 rounded-full bg-[#D4AF37] opacity-70" style={{ animationDelay: '1.6s' }} />
          </div>
        </div>

        <div className="relative z-10 space-y-5">
          {/* Nom */}
          <div>
            <label className="block text-[10px] font-medium tracking-[0.3em] uppercase text-[#B09A6A] mb-2">
              Nom
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3.5 bg-[#F8F5EE] border border-[rgba(212,175,55,0.35)] text-[#1A1200] rounded-lg outline-none transition-all duration-300 text-sm font-medium tracking-wide focus:border-[rgba(212,175,55,0.6)]"
              style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)' }}
              placeholder="Votre prénom ou nom"
              required
            />
          </div>

          {/* Date & Heure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-medium tracking-[0.3em] uppercase text-[#B09A6A] mb-2">
                Date de naissance
              </label>
              <input
                type="text"
                value={dateDisplay}
                onChange={handleDateChange}
                placeholder="jj/mm/aaaa"
                maxLength={10}
                className="w-full px-4 py-3.5 bg-[#F8F5EE] border border-[rgba(212,175,55,0.35)] text-[#1A1200] rounded-lg outline-none transition-all duration-300 text-sm font-medium tracking-wide focus:border-[rgba(212,175,55,0.6)]"
                style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)' }}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium tracking-[0.3em] uppercase text-[#B09A6A] mb-2">
                Heure de naissance
              </label>
              <input
                type="text"
                value={timeDisplay}
                onChange={handleTimeChange}
                placeholder="hh:mm"
                maxLength={5}
                className="w-full px-4 py-3.5 bg-[#F8F5EE] border border-[rgba(212,175,55,0.35)] text-[#1A1200] rounded-lg outline-none transition-all duration-300 text-sm font-medium tracking-wide focus:border-[rgba(212,175,55,0.6)]"
                style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)' }}
                required
              />
            </div>
          </div>

          {/* Lieu */}
          <div>
            <label className="block text-[10px] font-medium tracking-[0.3em] uppercase text-[#B09A6A] mb-2">
              Lieu de naissance
            </label>
            <div className="relative">
              <input
                type="text"
                value={cityInput}
                onChange={(e) => handleCityInputChange(e.target.value)}
                onFocus={() => cityInput.length > 2 && setShowSuggestions(true)}
                placeholder="Votre ville de naissance"
                className="w-full px-4 py-3.5 bg-[#F8F5EE] border border-[rgba(212,175,55,0.35)] text-[#1A1200] rounded-lg outline-none transition-all duration-300 text-sm font-medium tracking-wide focus:border-[rgba(212,175,55,0.6)]"
                style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)' }}
                required
              />
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#0A0A0A] border border-[rgba(212,175,55,0.15)] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20 max-h-48 overflow-y-auto">
                  {loadingSuggestions ? (
                    <div className="px-4 py-3 text-[#8A7A5A] text-center text-xs tracking-widest uppercase">
                      <span className="animate-pulse">Recherche…</span>
                    </div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((city, idx) => (
                      <button
                        key={`${city.name}-${idx}`}
                        type="button"
                        onClick={() => handleSelectCity(city)}
                        className="w-full text-left px-4 py-3 hover:bg-amber-400/5 transition-all duration-200 border-b border-[rgba(212,175,55,0.06)] last:border-b-0"
                      >
                        <div className="text-[#F5EDD5] font-medium text-sm">{city.name}</div>
                        <div className="text-xs text-[#5A4A3A]">{city.country}</div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-[#8A7A5A] text-center text-xs">Aucune ville trouvée</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.18)] to-transparent" />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="d-btn relative w-full py-4 rounded-lg overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.06))',
              border: '1px solid rgba(212,175,55,0.65)',
              color: '#E8CC6A',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
            }}
          >
            <div className="d-btn-shimmer absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.18)] to-transparent pointer-events-none" />
            <div className="d-top-line" style={{ top: 'auto', bottom: 0, left: '20%', right: '20%' }} />
            {loading ? (
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
                Calcul en cours…
              </span>
            ) : (
              <span className="relative z-10">✦ Générer mon thème astral ✦</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
