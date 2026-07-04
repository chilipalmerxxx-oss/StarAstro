import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, MapPin, Moon, Sparkles } from 'lucide-react';
import './Onboarding.css';

export interface OnboardingBirthData {
  name: string;
  date: string;
  time: string;
  place: string;
  latitude: number;
  longitude: number;
  timezoneOffset: number;
}

interface OnboardingProps {
  onComplete: (data: OnboardingBirthData) => Promise<void> | void;
  onSkipAccount: () => void;
}

type City = {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz: number;
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

const MONTHS = [
  'Jan',
  'Fév',
  'Mar',
  'Avr',
  'Mai',
  'Juin',
  'Juil',
  'Août',
  'Sep',
  'Oct',
  'Nov',
  'Déc',
];

const FULL_MONTHS = [
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

type WheelOption = {
  value: number;
  label: string;
  detail?: string;
};

function WheelPicker({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: number;
  options: WheelOption[];
  onChange: (value: number) => void;
}) {
  const selectedOption = options.find((option) => option.value === value) || options[0];

  return (
    <div className="onboarding-wheel">
      <span className="onboarding-wheel-label">{label}</span>
      <label className="onboarding-native-wheel">
        <select value={value} onChange={(event) => onChange(Number(event.target.value))} aria-label={label}>
          {options.map((option) => (
            <option
              key={`${label}-${option.value}`}
              value={option.value}
            >
              {option.detail ? `${option.label} - ${option.detail}` : option.label}
            </option>
          ))}
        </select>
        <strong>{selectedOption?.label}</strong>
        {selectedOption?.detail && <small>{selectedOption.detail}</small>}
      </label>
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
  variant = 'dark',
}: {
  children: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'dark' | 'light';
}) {
  return (
    <button
      className={`onboarding-action onboarding-action--${variant}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default function Onboarding({ onComplete, onSkipAccount }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [day, setDay] = useState(12);
  const [month, setMonth] = useState(6);
  const [year, setYear] = useState(1998);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [cityInput, setCityInput] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [name, setName] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const daysInSelectedMonth = useMemo(() => new Date(year, month, 0).getDate(), [month, year]);
  const dayOptions = useMemo<WheelOption[]>(
    () => Array.from({ length: daysInSelectedMonth }, (_, index) => ({ value: index + 1, label: pad(index + 1) })),
    [daysInSelectedMonth]
  );
  const monthOptions = useMemo<WheelOption[]>(
    () => MONTHS.map((label, index) => ({ value: index + 1, label, detail: FULL_MONTHS[index] })),
    []
  );
  const yearOptions = useMemo<WheelOption[]>(
    () => Array.from({ length: currentYear - 1925 + 1 }, (_, index) => {
      const value = currentYear - index;
      return { value, label: String(value) };
    }),
    [currentYear]
  );
  const hourOptions = useMemo<WheelOption[]>(
    () => Array.from({ length: 24 }, (_, index) => ({ value: index, label: pad(index) })),
    []
  );
  const minuteOptions = useMemo<WheelOption[]>(
    () => Array.from({ length: 60 }, (_, index) => ({ value: index, label: pad(index) })),
    []
  );

  const citySuggestions = useMemo(() => {
    const query = cityInput.trim().toLowerCase();
    if (query.length < 2) return [];
    return CITIES
      .filter((city) => `${city.name} ${city.region} ${city.country}`.toLowerCase().includes(query))
      .slice(0, 5);
  }, [cityInput]);

  useEffect(() => {
    if (day > daysInSelectedMonth) {
      setDay(daysInSelectedMonth);
    }
  }, [day, daysInSelectedMonth]);

  const goNext = () => setStep((value) => Math.min(7, value + 1));
  const goBack = () => setStep((value) => Math.max(0, value - 1));

  const cityReady = cityInput.trim().length > 1;
  const nameReady = name.trim().length > 0;
  const progressStep = clamp(step, 1, 7);
  const showProgress = step > 0;

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
    if (isRevealing) return;
    const birthCity = getBirthCity();
    setIsRevealing(true);
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
      setIsRevealing(false);
    }
  };

  return (
    <div className="onboarding-shell">
      <div className="onboarding-aura" aria-hidden="true" />
      <div className="onboarding-stars" aria-hidden="true">
        {Array.from({ length: 54 }, (_, index) => (
          <span
            key={index}
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 61) % 100}%`,
              opacity: 0.12 + ((index * 11) % 6) * 0.055,
              width: 1.5 + (index % 3),
              height: 1.5 + (index % 3),
            }}
          />
        ))}
      </div>

      <header className="onboarding-header">
        {step > 0 ? (
          <button className="onboarding-back" type="button" onClick={goBack} aria-label="Retour">
            <ChevronLeft size={26} strokeWidth={1.45} />
          </button>
        ) : <span className="onboarding-header-spacer" />}
        {showProgress && (
          <div className="onboarding-progress" aria-label={`Étape ${progressStep} sur 7`}>
            <span style={{ width: `${(progressStep / 7) * 100}%` }} />
          </div>
        )}
        <span className="onboarding-lang">FR</span>
      </header>

      <main className={`onboarding-screen onboarding-screen--${step}`}>
        {step === 0 && (
          <>
            <section className="onboarding-hero">
              <span className="onboarding-orbit"><Moon size={22} strokeWidth={1.4} /></span>
              <p className="onboarding-brand">nightstar</p>
              <h1>Apprenez à vous connaître et à mieux comprendre vos relations.</h1>
              <p>Une expérience astrologique personnelle, pensée autour de votre ciel de naissance.</p>
            </section>
            <div className="onboarding-actions">
              <PrimaryButton onClick={goNext}>Commencer</PrimaryButton>
              <button className="onboarding-link" type="button" onClick={onSkipAccount}>J’ai déjà un compte</button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <section className="onboarding-panel">
              <span className="onboarding-kicker">Votre carte personnelle</span>
              <h2>Personnalisons votre expérience</h2>
              <p>
                Votre thème astral est la carte du ciel au moment et à l’endroit de votre naissance.
                Ces données permettent à nightstar de lire vos placements, vos cycles et vos dynamiques relationnelles avec précision.
              </p>
            </section>
            <div className="onboarding-actions">
              <PrimaryButton onClick={goNext}>Continuer</PrimaryButton>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <section className="onboarding-panel onboarding-panel--compact">
              <span className="onboarding-kicker">Naissance</span>
              <h2>Quelle est votre date de naissance ?</h2>
            </section>
            <div className="onboarding-wheel-grid onboarding-wheel-grid--date">
              <WheelPicker label="Jour" value={day} options={dayOptions} onChange={setDay} />
              <WheelPicker label="Mois" value={month} options={monthOptions} onChange={setMonth} />
              <WheelPicker label="Année" value={year} options={yearOptions} onChange={setYear} />
            </div>
            <div className="onboarding-actions">
              <PrimaryButton onClick={goNext}>Continuer</PrimaryButton>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <section className="onboarding-panel onboarding-panel--compact">
              <span className="onboarding-kicker">Heure exacte</span>
              <h2>À quelle heure êtes-vous né(e) ?</h2>
            </section>
            <div className="onboarding-wheel-grid onboarding-wheel-grid--time">
              <WheelPicker label="Heure" value={hour} options={hourOptions} onChange={setHour} />
              <WheelPicker label="Minute" value={minute} options={minuteOptions} onChange={setMinute} />
            </div>
            <div className="onboarding-actions">
              <PrimaryButton onClick={goNext}>Continuer</PrimaryButton>
              <button className="onboarding-underlink" type="button" onClick={() => { setHour(12); setMinute(0); goNext(); }}>
                Je ne connais pas mon heure de naissance
              </button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <section className="onboarding-panel onboarding-panel--compact">
              <span className="onboarding-kicker">Lieu de naissance</span>
              <h2>Dans quelle ville êtes-vous né(e) ?</h2>
            </section>
            <div className="onboarding-field-card">
              <label>
                <MapPin size={17} strokeWidth={1.6} />
                Ville de naissance
              </label>
              <input
                value={cityInput}
                onChange={(event) => {
                  setCityInput(event.target.value);
                  setSelectedCity(null);
                }}
                placeholder="Tapez votre ville"
                autoComplete="off"
              />
              <div className="onboarding-suggestions">
                {citySuggestions.map((city) => (
                  <button
                    key={`${city.name}-${city.country}`}
                    type="button"
                    className={selectedCity?.name === city.name ? 'is-selected' : ''}
                    onClick={() => {
                      setSelectedCity(city);
                      setCityInput(city.name);
                    }}
                  >
                    <span>{city.name}<small>{city.region}</small></span>
                    <strong>{city.country}</strong>
                  </button>
                ))}
              </div>
            </div>
            <div className="onboarding-actions">
              <PrimaryButton onClick={goNext} disabled={!cityReady}>Continuer</PrimaryButton>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <section className="onboarding-panel onboarding-panel--compact">
              <span className="onboarding-kicker">Votre espace</span>
              <h2>Ton prénom</h2>
            </section>
            <div className="onboarding-field-card">
              <label>
                <Sparkles size={17} strokeWidth={1.6} />
                Prénom
              </label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Prénom"
                autoComplete="given-name"
              />
            </div>
            <div className="onboarding-actions">
              <PrimaryButton onClick={goNext} disabled={!nameReady}>Continuer</PrimaryButton>
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <section className="onboarding-panel">
              <span className="onboarding-kicker">Conseils personnels</span>
              <h2>Comprenez-vous mieux</h2>
              <p>
                Votre thème natal sert de base à des conseils plus justes : personnalité, relations,
                cycles du moment et compatibilités. Chaque lecture part de votre carte, pas d’un profil générique.
              </p>
            </section>
            <div className="onboarding-actions">
              <p className="onboarding-question">Voulez-vous des conseils personnalisés ?</p>
              <div className="onboarding-choice-row">
                <PrimaryButton variant="dark" onClick={goNext}>Non</PrimaryButton>
                <PrimaryButton variant="light" onClick={goNext}>Oui</PrimaryButton>
              </div>
            </div>
          </>
        )}

        {step === 7 && (
          <>
            <section className="onboarding-reveal">
              <span className="onboarding-kicker">Votre ciel est prêt</span>
              <h2>Révélez votre thème astral</h2>
              <p>
                Votre carte de naissance est prête à être lue. Les placements, les maisons et les
                aspects vont maintenant composer votre expérience.
              </p>
              <div className="onboarding-reveal-card" aria-label="Résumé de naissance">
                <strong>{name.trim() || 'Votre prénom'}</strong>
                <span>{pad(day)} {FULL_MONTHS[month - 1]} {year} · {pad(hour)}:{pad(minute)}</span>
                <small>{cityInput.trim() || 'Ville de naissance'}</small>
              </div>
            </section>
            <div className="onboarding-actions">
              <PrimaryButton onClick={handleReveal} disabled={isRevealing}>
                {isRevealing ? 'Révélation en cours…' : 'Révéler mon thème astral'}
              </PrimaryButton>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
