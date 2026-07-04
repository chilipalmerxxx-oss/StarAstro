import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, Check, ChevronRight, MapPin, Sparkles, X } from 'lucide-react';
import type { OnboardingBirthData } from './Onboarding';
import OnboardingFinalReveal from './onboarding/OnboardingFinalReveal';
import './PremiumOnboardingY.css';

type PremiumOnboardingYProps = {
  onComplete: (data: OnboardingBirthData) => Promise<void> | void;
  onSkipAccount: () => void;
  onExit: () => void;
};

type City = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz: number;
  population?: number;
  importance?: number;
};

type NominatimResult = {
  lat: string;
  lon: string;
  name?: string;
  display_name: string;
  type?: string;
  addresstype?: string;
  importance?: number;
  extratags?: { population?: string };
  address?: Record<string, string>;
};

const CITIES: City[] = [
  { name: 'Paris', region: 'Île-de-France', country: 'FR', lat: 48.8566, lon: 2.3522, tz: 1 },
  { name: 'Lyon', region: 'Auvergne-Rhône-Alpes', country: 'FR', lat: 45.764, lon: 4.8357, tz: 1 },
  { name: 'Marseille', region: 'Provence-Alpes-Côte d’Azur', country: 'FR', lat: 43.2965, lon: 5.3698, tz: 1 },
  { name: 'Toulouse', region: 'Occitanie', country: 'FR', lat: 43.6047, lon: 1.4442, tz: 1 },
  { name: 'Bordeaux', region: 'Nouvelle-Aquitaine', country: 'FR', lat: 44.8378, lon: -0.5792, tz: 1 },
  { name: 'Lille', region: 'Hauts-de-France', country: 'FR', lat: 50.6292, lon: 3.0573, tz: 1 },
  { name: 'Nice', region: 'Provence-Alpes-Côte d’Azur', country: 'FR', lat: 43.7102, lon: 7.262, tz: 1 },
  { name: 'Nantes', region: 'Pays de la Loire', country: 'FR', lat: 47.2184, lon: -1.5536, tz: 1 },
  { name: 'Strasbourg', region: 'Grand Est', country: 'FR', lat: 48.5734, lon: 7.7521, tz: 1 },
  { name: 'Montpellier', region: 'Occitanie', country: 'FR', lat: 43.6108, lon: 3.8767, tz: 1 },
  { name: 'Bruxelles', region: 'Bruxelles-Capitale', country: 'BE', lat: 50.8503, lon: 4.3517, tz: 1 },
  { name: 'Genève', region: 'Genève', country: 'CH', lat: 46.2044, lon: 6.1432, tz: 1 },
  { name: 'Londres', region: 'Angleterre', country: 'GB', lat: 51.5074, lon: -0.1278, tz: 0 },
  { name: 'New York', region: 'New York', country: 'US', lat: 40.7128, lon: -74.006, tz: -5 },
  { name: 'Montréal', region: 'Québec', country: 'CA', lat: 45.5017, lon: -73.5673, tz: -5 },
];

const MAJOR_CITY_NAMES = new Set([
  'amsterdam', 'athenes', 'barcelone', 'berlin', 'bordeaux', 'bruxelles', 'buenos aires',
  'chicago', 'copenhague', 'dubai', 'geneve', 'hong kong', 'istanbul', 'lille', 'lisbonne',
  'londres', 'los angeles', 'lyon', 'madrid', 'marseille', 'melbourne', 'mexico', 'mexico city',
  'milan', 'miami', 'montreal', 'munich', 'nantes', 'new york', 'nice', 'oslo', 'paris', 'pekin',
  'prague', 'rio de janeiro', 'rome', 'san francisco', 'sao paulo', 'seoul', 'singapour',
  'stockholm', 'strasbourg', 'sydney', 'tokyo', 'toronto', 'toulouse', 'vienne', 'varsovie',
  'washington', 'zurich',
]);

const MONTHS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
];

const pad = (value: number) => value.toString().padStart(2, '0');
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const normalizeSearch = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const usesLatinAlphabet = (value: string) =>
  /^[\p{Script=Latin}\p{Mark}\s'’.-]+$/u.test(value.normalize('NFD'));

type WheelOption = {
  value: number;
  label: string;
};

const WHEEL_ITEM_HEIGHT = 54;
let wheelAudioContext: AudioContext | null = null;

const triggerHaptic = (pattern: number | number[] = 10) => {
  if ('vibrate' in navigator) navigator.vibrate(pattern);
};

const playWheelTick = () => {
  const AudioContextClass = window.AudioContext
    || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  wheelAudioContext ||= new AudioContextClass();
  if (wheelAudioContext.state === 'suspended') void wheelAudioContext.resume();
  const oscillator = wheelAudioContext.createOscillator();
  const gain = wheelAudioContext.createGain();
  const now = wheelAudioContext.currentTime;

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(720, now);
  oscillator.frequency.exponentialRampToValueAtTime(460, now + 0.028);
  gain.gain.setValueAtTime(0.012, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
  oscillator.connect(gain);
  gain.connect(wheelAudioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.04);
};

function StepLine({ step }: { step: number }) {
  const lineStyle = {
    '--step-position': `${8 + ((step - 1) / 6) * 84}%`,
  } as CSSProperties;

  return <span className="premium-y-step-line" style={lineStyle} aria-hidden="true" />;
}

function WheelPicker({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  options: WheelOption[];
}) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const currentValueRef = useRef(value);
  const isScrollingRef = useRef(false);
  const isTouchingRef = useRef(false);

  useEffect(() => {
    const wheel = wheelRef.current;
    const selectedIndex = options.findIndex((option) => option.value === value);
    if (!wheel || selectedIndex < 0) return;

    currentValueRef.current = value;
    if (isScrollingRef.current) return;

    const target = selectedIndex * WHEEL_ITEM_HEIGHT;
    if (Math.abs(wheel.scrollTop - target) > 1) {
      wheel.scrollTo({ top: target, behavior: 'auto' });
    }
  }, [options, value]);

  useEffect(() => () => {
    if (scrollTimeoutRef.current !== null) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current);
    }
  }, []);

  const selectIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const safeIndex = clamp(index, 0, options.length - 1);
    const option = options[safeIndex];
    if (!option) return;
    if (option.value !== currentValueRef.current) {
      currentValueRef.current = option.value;
      onChange(option.value);
      triggerHaptic(8);
      playWheelTick();
    }
    wheelRef.current?.scrollTo({ top: safeIndex * WHEEL_ITEM_HEIGHT, behavior });
  };

  const syncSelectionFromScroll = () => {
    const index = Math.round((wheelRef.current?.scrollTop || 0) / WHEEL_ITEM_HEIGHT);
    const option = options[clamp(index, 0, options.length - 1)];
    if (option && option.value !== currentValueRef.current) {
      currentValueRef.current = option.value;
      onChange(option.value);
      triggerHaptic(8);
      playWheelTick();
    }
  };

  const settleScroll = (behavior: ScrollBehavior = 'smooth') => {
    const finalIndex = Math.round((wheelRef.current?.scrollTop || 0) / WHEEL_ITEM_HEIGHT);
    wheelRef.current?.scrollTo({ top: finalIndex * WHEEL_ITEM_HEIGHT, behavior });
  };

  const handleScroll = () => {
    isScrollingRef.current = true;

    if (scrollFrameRef.current === null) {
      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        syncSelectionFromScroll();
      });
    }

    if (scrollTimeoutRef.current !== null) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = window.setTimeout(() => {
      if (isTouchingRef.current) return;
      isScrollingRef.current = false;
      settleScroll('smooth');
    }, isTouchingRef.current ? 220 : 150);
  };

  const handleTouchStart = () => {
    isTouchingRef.current = true;
    if (scrollTimeoutRef.current !== null) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
  };

  const handleTouchEnd = () => {
    isTouchingRef.current = false;
    if (scrollTimeoutRef.current !== null) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = window.setTimeout(() => {
      isScrollingRef.current = false;
      settleScroll('smooth');
    }, 220);
  };

  const selectedIndex = options.findIndex((option) => option.value === value);

  return (
    <div
      className="premium-y-wheel"
      role="listbox"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          selectIndex(selectedIndex - 1);
        }
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          selectIndex(selectedIndex + 1);
        }
      }}
    >
      <div
        ref={wheelRef}
        className="premium-y-wheel-scroll"
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {options.map((option, optionIndex) => {
          const distance = clamp(optionIndex - selectedIndex, -4, 4);
          const depth = Math.abs(distance);
          const wheelStyle = {
            '--wheel-rotation': `${distance * -21}deg`,
            '--wheel-z': `${depth * -34}px`,
            '--wheel-shift': `${distance * -6}px`,
            '--wheel-scale': Math.max(0.64, 1 - depth * 0.1),
            '--wheel-opacity': Math.max(0.18, 0.72 - depth * 0.13),
            '--wheel-blur': `${Math.max(0, depth - 1) * 0.42}px`,
            '--wheel-brightness': Math.max(0.34, 1 - depth * 0.16),
          } as CSSProperties;

          return (
            <button
              key={`${label}-${option.value}`}
              type="button"
              role="option"
              aria-selected={option.value === value}
              className={option.value === value ? 'is-selected' : ''}
              style={wheelStyle}
              onClick={() => selectIndex(optionIndex)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PremiumOnboardingY({ onComplete, onSkipAccount, onExit }: PremiumOnboardingYProps) {
  const [step, setStep] = useState(0);
  const [day, setDay] = useState(12);
  const [month, setMonth] = useState(6);
  const [year, setYear] = useState(1998);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [cityInput, setCityInput] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [remoteCitySuggestions, setRemoteCitySuggestions] = useState<City[]>([]);
  const [isSearchingCities, setIsSearchingCities] = useState(false);
  const [citySearchFailed, setCitySearchFailed] = useState(false);
  const [name, setName] = useState('');
  const [wantsPersonalAdvice, setWantsPersonalAdvice] = useState(true);

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const daysInMonth = useMemo(() => new Date(year, month, 0).getDate(), [month, year]);
  const dayOptions = useMemo(
    () => Array.from({ length: daysInMonth }, (_, index) => ({ value: index + 1, label: pad(index + 1) })),
    [daysInMonth]
  );
  const monthOptions = useMemo(
    () => MONTHS.map((label, index) => ({ value: index + 1, label })),
    []
  );
  const yearOptions = useMemo(
    () => Array.from({ length: currentYear - 1925 + 1 }, (_, index) => {
      const value = currentYear - index;
      return { value, label: String(value) };
    }),
    [currentYear]
  );
  const hourOptions = useMemo(
    () => Array.from({ length: 24 }, (_, index) => ({ value: index, label: pad(index) })),
    []
  );
  const minuteOptions = useMemo(
    () => Array.from({ length: 60 }, (_, index) => ({ value: index, label: pad(index) })),
    []
  );

  const localCitySuggestions = useMemo(() => {
    const query = normalizeSearch(cityInput.trim());
    if (query.length < 3) return [];
    return CITIES
      .filter((city) => normalizeSearch(`${city.name} ${city.region} ${city.country}`).includes(query))
      .slice(0, 3);
  }, [cityInput]);

  const citySuggestions = remoteCitySuggestions.length > 0
    ? remoteCitySuggestions
    : citySearchFailed ? localCitySuggestions : [];

  useEffect(() => {
    const query = cityInput.trim();
    if (query.length < 3 || selectedCity) {
      setRemoteCitySuggestions([]);
      setIsSearchingCities(false);
      setCitySearchFailed(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsSearchingCities(true);
      setCitySearchFailed(false);
      try {
        const params = new URLSearchParams({
          q: query,
          format: 'jsonv2',
          addressdetails: '1',
          extratags: '1',
          limit: '10',
          'accept-language': 'fr',
        });
        const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error(`City search failed with ${response.status}`);

        const results = await response.json() as NominatimResult[];
        const settlementResults = results.filter((item) => {
          const address = item.address || {};
          const name = address.city || address.town || item.name || item.display_name.split(',')[0];
          const placeType = item.addresstype || item.type || '';
          const population = Number(String(item.extratags?.population || '').replace(/\D/g, ''));
          const isLargeSettlement = placeType === 'city'
            || placeType === 'town'
            || (placeType === 'administrative' && population >= 50000);
          const isLargeEnough = population === 0 || population >= 15000;
          return Boolean(name && usesLatinAlphabet(name) && isLargeSettlement && isLargeEnough);
        });
        const cities = settlementResults.map((item) => {
          const address = item.address || {};
          const lon = Number(item.lon);
          return {
            name: address.city || address.town || item.name || item.display_name.split(',')[0],
            region: address.state || address.region || address.county || '',
            country: (address.country_code || address.country || '').toUpperCase(),
            lat: Number(item.lat),
            lon,
            tz: Math.round(lon / 15),
            population: Number(String(item.extratags?.population || '').replace(/\D/g, '')) || undefined,
            importance: item.importance || 0,
          };
        }).filter((city) => city.name && Number.isFinite(city.lat) && Number.isFinite(city.lon));

        const uniqueCities = Array.from(
          new Map(cities.map((city) => [`${normalizeSearch(city.name)}|${city.country}`, city])).values()
        );
        const queryKey = normalizeSearch(query);
        const cityScore = (city: City) => {
          const nameKey = normalizeSearch(city.name);
          const majorCityScore = MAJOR_CITY_NAMES.has(nameKey) ? 1_000_000_000 : 0;
          const nameScore = nameKey === queryKey ? 60_000_000
            : nameKey.startsWith(queryKey) ? 20_000_000
            : 0;
          const populationScore = (city.population || 0) * 4;
          const importanceScore = (city.importance || 0) * 500_000_000;
          return majorCityScore + nameScore + populationScore + importanceScore;
        };
        const rankedCities = uniqueCities.sort((a, b) => cityScore(b) - cityScore(a)).slice(0, 3);
        setRemoteCitySuggestions(rankedCities);
        setCitySearchFailed(rankedCities.length === 0);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setRemoteCitySuggestions([]);
          setCitySearchFailed(true);
        }
      } finally {
        if (!controller.signal.aborted) setIsSearchingCities(false);
      }
    }, 550);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [cityInput, selectedCity]);

  useEffect(() => {
    if (day > daysInMonth) {
      setDay(daysInMonth);
    }
  }, [day, daysInMonth]);

  const totalSteps = 7;
  const finalRevealStep = totalSteps + 1;
  const progress = step === 0 ? 0 : (Math.min(step, totalSteps) / totalSteps) * 100;
  const cityReady = Boolean(selectedCity || citySuggestions.length > 0);
  const nameReady = name.trim().length > 0;

  const canContinue =
    step === 4 ? cityReady :
    step === 5 ? nameReady :
    true;

  const goNext = () => setStep((value) => Math.min(finalRevealStep, value + 1));
  const goBack = () => setStep((value) => Math.max(0, value - 1));

  const getBirthCity = () => {
    if (selectedCity && selectedCity.name.toLowerCase() === cityInput.trim().toLowerCase()) {
      return selectedCity;
    }
    return citySuggestions[0] || {
      ...CITIES[0],
      name: cityInput.trim() || CITIES[0].name,
      region: '',
    };
  };

  const handleReveal = async () => {
    const birthCity = getBirthCity();
    try {
      await onComplete({
        name: name.trim() || 'Ami(e)',
        date: `${year}-${pad(month)}-${pad(day)}`,
        time: `${pad(hour)}:${pad(minute)}`,
        place: birthCity.region ? `${birthCity.name}, ${birthCity.region}` : birthCity.name,
        latitude: birthCity.lat,
        longitude: birthCity.lon,
        timezoneOffset: birthCity.tz,
      });
    } catch {
      throw new Error('Onboarding completion failed');
    }
  };

  const mainAction = goNext;
  const mainActionText = step === totalSteps ? 'Voir mon ciel' : step === 0 ? 'Commencer' : 'Continuer';

  if (step === finalRevealStep) {
    return (
      <OnboardingFinalReveal
        onBack={() => setStep(totalSteps)}
        onComplete={handleReveal}
      />
    );
  }

  return (
    <div
      className="premium-y-shell"
      onClickCapture={(event) => {
        const target = event.target as HTMLElement;
        if (target.closest('.premium-y-wheel')) return;
        triggerHaptic(target.closest('.premium-y-primary') ? [12, 22, 12] : 10);
      }}
    >
      <div className={`premium-y-sky premium-y-sky--${step}`} aria-hidden="true">
        {Array.from({ length: 118 }, (_, index) => {
          const size = 1 + ((index * 7) % 3);
          return (
            <span
              key={index}
              style={{
                left: `${(index * 29 + (index % 7) * 11) % 100}%`,
                top: `${(index * 47 + (index % 11) * 7) % 100}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: 0.2 + ((index * 7) % 7) * 0.08,
              }}
            />
          );
        })}
      </div>

      <header className="premium-y-header">
        {step > 0 ? (
          <button type="button" className="premium-y-icon-button" onClick={goBack} aria-label="Retour">
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
        ) : (
          <span className="premium-y-icon-spacer" />
        )}
        <div className="premium-y-progress" aria-label={`Étape ${clamp(step, 1, totalSteps)} sur ${totalSteps}`}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <button type="button" className="premium-y-icon-button premium-y-exit-button" onClick={onExit} aria-label="Quitter l’onboarding">
          <X size={18} strokeWidth={1.5} />
        </button>
      </header>

      <main className={`premium-y-stage premium-y-stage--${step}`}>
        <aside className="premium-y-rail" aria-hidden="true">
          {Array.from({ length: totalSteps }, (_, index) => (
            <span key={index} className={index + 1 <= clamp(step, 1, totalSteps) ? 'is-active' : ''} />
          ))}
        </aside>

        <section className="premium-y-card">
          {step === 0 && (
            <div className="premium-y-copy premium-y-copy--center">
              <p className="premium-y-kicker">Carte natale personnelle</p>
              <h1>nightstar</h1>
              <p>
                Une lecture claire et personnelle de ton ciel, conçue à partir de tes données de naissance.
              </p>
            </div>
          )}

          {step === 1 && (
            <div className="premium-y-copy">
              <StepLine step={1} />
              <h2>Ton ciel commence ici.</h2>
              <p>
                La date, l’heure et le lieu permettent de calculer précisément tes maisons, tes aspects et tes cycles.
              </p>
              <div className="premium-y-proof">
                <span>Maisons</span>
                <span>Aspects</span>
                <span>Cycles</span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="premium-y-copy premium-y-copy--wheel premium-y-copy--birth-data">
              <StepLine step={2} />
              <h2>Quand es-tu né(e) ?</h2>
              <div className="premium-y-wheel-grid premium-y-wheel-grid--date">
                <WheelPicker label="Jour" value={day} onChange={setDay} options={dayOptions} />
                <WheelPicker label="Mois" value={month} onChange={setMonth} options={monthOptions} />
                <WheelPicker label="Année" value={year} onChange={setYear} options={yearOptions} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="premium-y-copy premium-y-copy--wheel premium-y-copy--birth-data">
              <StepLine step={3} />
              <h2>À quelle heure es-tu né(e) ?</h2>
              <div className="premium-y-wheel-grid premium-y-wheel-grid--time">
                <WheelPicker label="Heure" value={hour} onChange={setHour} options={hourOptions} />
                <span className="premium-y-time-separator" aria-hidden="true">:</span>
                <WheelPicker label="Minute" value={minute} onChange={setMinute} options={minuteOptions} />
              </div>
              <button type="button" className="premium-y-text-button" onClick={() => { setHour(12); setMinute(0); goNext(); }}>
                Je ne connais pas mon heure
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="premium-y-copy premium-y-copy--form-title premium-y-copy--birth-data premium-y-copy--city">
              <StepLine step={4} />
              <h2>Où es-tu né(e) ?</h2>
              <label className="premium-y-input">
                <span><MapPin size={14} strokeWidth={1.6} /> Ville</span>
                <input
                  value={cityInput}
                  onChange={(event) => {
                    setCityInput(event.target.value);
                    setSelectedCity(null);
                    setRemoteCitySuggestions([]);
                    setCitySearchFailed(false);
                  }}
                  placeholder="Tape ta ville"
                  autoComplete="off"
                />
              </label>
              <div className="premium-y-suggestions">
                {isSearchingCities && <p className="premium-y-search-status">Recherche dans le monde entier…</p>}
                {citySuggestions.map((city) => (
                  <button
                    key={`${city.name}-${city.country}`}
                    type="button"
                    className={selectedCity?.name === city.name ? 'is-selected' : ''}
                    onClick={() => {
                      setCityInput(city.name);
                      setSelectedCity(city);
                    }}
                  >
                    <span>{city.name}<small>{city.region}</small></span>
                    <strong>{city.country}</strong>
                  </button>
                ))}
                {!isSearchingCities && citySearchFailed && localCitySuggestions.length === 0 && (
                  <p className="premium-y-search-status">Recherche indisponible. Vérifie le nom de la ville.</p>
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="premium-y-copy">
              <StepLine step={5} />
              <h2>Comment t’appelles-tu ?</h2>
              <label className="premium-y-input">
                <span><Sparkles size={14} strokeWidth={1.6} /> Prénom</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Écris ton prénom"
                  autoComplete="given-name"
                />
              </label>
            </div>
          )}

          {step === 6 && (
            <div className="premium-y-copy">
              <StepLine step={6} />
              <h2>Veux-tu des conseils sur mesure ?</h2>
              <p>
                Nightstar peut mettre en avant les conseils les plus pertinents selon ton thème et tes transits.
              </p>
              <div className="premium-y-choice">
                <button
                  type="button"
                  className={!wantsPersonalAdvice ? 'is-selected' : ''}
                  onClick={() => setWantsPersonalAdvice(false)}
                >
                  Non
                </button>
                <button
                  type="button"
                  className={wantsPersonalAdvice ? 'is-selected' : ''}
                  onClick={() => setWantsPersonalAdvice(true)}
                >
                  Oui
                </button>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="premium-y-copy premium-y-copy--center">
              <StepLine step={7} />
              <div className="premium-y-reveal-core" aria-hidden="true">
                <span className="premium-y-reveal-ring premium-y-reveal-ring--outer" />
                <span className="premium-y-reveal-ring premium-y-reveal-ring--inner" />
                <Sparkles size={19} strokeWidth={1.25} />
              </div>
              <h2>Ton thème est prêt.</h2>
              <div className="premium-y-summary">
                <button type="button" onClick={() => setStep(5)} aria-label="Modifier le prénom">
                  <span><Check size={14} /> {name.trim() || 'Prénom'}</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => setStep(2)} aria-label="Modifier la date de naissance">
                  <span><Check size={14} /> {pad(day)} {MONTHS[month - 1]} {year}</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => setStep(3)} aria-label="Modifier l’heure de naissance">
                  <span><Check size={14} /> {pad(hour)}:{pad(minute)}</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => setStep(4)} aria-label="Modifier la ville de naissance">
                  <span><Check size={14} /> {cityInput.trim() || 'Ville'}</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </section>

        <footer className="premium-y-footer">
          <button
            type="button"
            className="premium-y-primary"
            onClick={mainAction}
            disabled={!canContinue}
          >
            {mainActionText}
          </button>
          {step === 0 && (
            <button type="button" className="premium-y-secondary" onClick={onSkipAccount}>
              J’ai déjà un compte
            </button>
          )}
        </footer>
      </main>
    </div>
  );
}
