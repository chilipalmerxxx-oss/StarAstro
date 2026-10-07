import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { ArrowLeft, Check, ChevronRight, MapPin, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import type { OnboardingBirthData } from './Onboarding';
import OnboardingFinalReveal, { type RevealChart } from './onboarding/OnboardingFinalReveal';
import './PremiumOnboardingY.css';
import WheelPicker from './onboarding/BirthWheel';
import { OnboardingSound, WrittenText } from './onboarding/OnboardingMotion';
import { useOnboardingSound } from './onboarding/onboardingSound';
import { parseBirthDateTime } from '../lib/birthDate';
import { getBirthOffsetAt, resolveBirthTimeZone } from '../lib/birthTimezone';
import { calculateBirthChart, getPossibleDaySigns } from '../services/astrology';
import { formatBirthPlace, useCitySearch, type BirthPlace } from '../lib/useCitySearch';

type PremiumOnboardingYProps = {
  onComplete: (data: OnboardingBirthData) => Promise<void> | void;
  onSkipAccount: () => void;
  onExit: () => void;
};

type City = BirthPlace;

const CITIES: City[] = [
  { name: 'Paris', region: 'Île-de-France', country: 'FR', lat: 48.8566, lon: 2.3522, timeZone: 'Europe/Paris' },
  { name: 'Lyon', region: 'Auvergne-Rhône-Alpes', country: 'FR', lat: 45.764, lon: 4.8357, timeZone: 'Europe/Paris' },
  { name: 'Marseille', region: 'Provence-Alpes-Côte d’Azur', country: 'FR', lat: 43.2965, lon: 5.3698, timeZone: 'Europe/Paris' },
  { name: 'Toulouse', region: 'Occitanie', country: 'FR', lat: 43.6047, lon: 1.4442, timeZone: 'Europe/Paris' },
  { name: 'Bordeaux', region: 'Nouvelle-Aquitaine', country: 'FR', lat: 44.8378, lon: -0.5792, timeZone: 'Europe/Paris' },
  { name: 'Lille', region: 'Hauts-de-France', country: 'FR', lat: 50.6292, lon: 3.0573, timeZone: 'Europe/Paris' },
  { name: 'Nice', region: 'Provence-Alpes-Côte d’Azur', country: 'FR', lat: 43.7102, lon: 7.262, timeZone: 'Europe/Paris' },
  { name: 'Nantes', region: 'Pays de la Loire', country: 'FR', lat: 47.2184, lon: -1.5536, timeZone: 'Europe/Paris' },
  { name: 'Strasbourg', region: 'Grand Est', country: 'FR', lat: 48.5734, lon: 7.7521, timeZone: 'Europe/Paris' },
  { name: 'Montpellier', region: 'Occitanie', country: 'FR', lat: 43.6108, lon: 3.8767, timeZone: 'Europe/Paris' },
  { name: 'Bruxelles', region: 'Bruxelles-Capitale', country: 'BE', lat: 50.8503, lon: 4.3517, timeZone: 'Europe/Brussels' },
  { name: 'Genève', region: 'Genève', country: 'CH', lat: 46.2044, lon: 6.1432, timeZone: 'Europe/Zurich' },
  { name: 'Londres', region: 'Angleterre', country: 'GB', lat: 51.5074, lon: -0.1278, timeZone: 'Europe/London' },
  { name: 'New York', region: 'New York', country: 'US', lat: 40.7128, lon: -74.006, timeZone: 'America/New_York' },
  { name: 'Montréal', region: 'Québec', country: 'CA', lat: 45.5017, lon: -73.5673, timeZone: 'America/Toronto' },
];

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
const triggerHaptic = (pattern: number | number[] = 10) => {
  if ('vibrate' in navigator) navigator.vibrate(pattern);
};

function StepLine({ step }: { step: number }) {
  const lineStyle = {
    '--step-position': `${8 + ((step - 1) / 6) * 84}%`,
  } as CSSProperties;

  return <span className="premium-y-step-line" style={lineStyle} aria-hidden="true" />;
}

function PremiumOnboardingFlow({ onComplete, onSkipAccount, onExit }: PremiumOnboardingYProps) {
  const { enabled, toggle, unlock } = useOnboardingSound();
  const [step, setStep] = useState(0);
  const [day, setDay] = useState(12);
  const [month, setMonth] = useState(6);
  const [year, setYear] = useState(1998);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [revealChart, setRevealChart] = useState<RevealChart | null>(null);
  const [birthPayload, setBirthPayload] = useState<OnboardingBirthData | null>(null);
  const [isPreparingReveal, setIsPreparingReveal] = useState(false);
  const [revealError, setRevealError] = useState(false);
  const [cityInput, setCityInput] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
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

  const { suggestions: citySuggestions, isSearching: isSearchingCities, noResult: cityNoResult } =
    useCitySearch(cityInput, { enabled: !selectedCity, localCities: CITIES });

  useEffect(() => {
    if (day > daysInMonth) {
      setDay(daysInMonth);
    }
  }, [day, daysInMonth]);

  const recapStep = 7;
  const finalRevealStep = 8;
  const totalSteps = recapStep;
  const progress = step === 0 ? 0 : (Math.min(step, recapStep) / recapStep) * 100;
  // Sélection explicite obligatoire : jamais de ville devinée, les coordonnées font le thème.
  const cityReady = Boolean(selectedCity);
  const nameReady = name.trim().length > 0;

  const canContinue =
    step === 2 ? nameReady :
    step === 5 ? cityReady :
    true;

  const goNext = () => setStep((value) => Math.min(finalRevealStep, value + 1));
  const goBack = () => setStep((value) => Math.max(0, value - 1));

  const isSameCity = (a: City | null, b: City) =>
    Boolean(a && a.name === b.name && a.country === b.country && a.region === b.region);

  const setBirthHour = (value: number) => { setHour(value); setTimeUnknown(false); };
  const setBirthMinute = (value: number) => { setMinute(value); setTimeUnknown(false); };

  // Calcule le vrai thème avant la révélation : l'écran final montre les positions de l'utilisateur.
  const prepareReveal = async () => {
    if (!selectedCity) {
      setStep(5);
      return;
    }
    setIsPreparingReveal(true);
    setRevealError(false);
    try {
      const date = `${year}-${pad(month)}-${pad(day)}`;
      const time = `${pad(hour)}:${pad(minute)}`;
      const timeZone = await resolveBirthTimeZone(selectedCity.lat, selectedCity.lon, selectedCity.timeZone);
      const instantAt = (localTime: string) =>
        parseBirthDateTime(date, localTime, getBirthOffsetAt(date, localTime, timeZone, selectedCity.lon));
      const timezoneOffset = getBirthOffsetAt(date, time, timeZone, selectedCity.lon);
      const { planetPositions, houses } = calculateBirthChart({
        date: instantAt(time),
        latitude: selectedCity.lat,
        longitude: selectedCity.lon,
      });

      // Heure inconnue : Soleil ou Lune peuvent changer de signe dans la journée, on le dit plutôt que de trancher.
      const possibleSigns = timeUnknown
        ? getPossibleDaySigns(instantAt('00:00'), instantAt('23:59'))
        : { sun: [planetPositions.sun.sign], moon: [planetPositions.moon.sign] };

      setRevealChart({
        sun: { signs: possibleSigns.sun, longitude: planetPositions.sun.longitude },
        moon: { signs: possibleSigns.moon, longitude: planetPositions.moon.longitude },
        ascendant: timeUnknown ? null : { sign: houses[0].sign, longitude: houses[0].cusp },
      });
      setBirthPayload({
        name: name.trim() || 'Ami',
        date,
        time,
        place: formatBirthPlace(selectedCity),
        latitude: selectedCity.lat,
        longitude: selectedCity.lon,
        timezoneOffset,
        timeUnknown,
      });
      setStep(finalRevealStep);
    } catch (error) {
      console.error('Onboarding chart calculation failed', error);
      setRevealError(true);
    } finally {
      setIsPreparingReveal(false);
    }
  };

  const handleReveal = async () => {
    if (!birthPayload) {
      setStep(recapStep);
      return;
    }
    await onComplete(birthPayload);
  };

  const mainAction = step === recapStep ? prepareReveal : goNext;
  const mainActionText = step === recapStep
    ? (isPreparingReveal ? 'Calcul de ton ciel…' : 'Voir mon ciel')
    : step === 0 ? 'Commencer' : 'Continuer';
  const displayName = name.trim();

  if (step === finalRevealStep && revealChart) {
    return <OnboardingFinalReveal chart={revealChart} onBack={() => setStep(recapStep)} onComplete={handleReveal} />;
  }

  return (
    <div
      className="premium-y-shell"
      onPointerDownCapture={unlock}
      onKeyDownCapture={unlock}
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
        <button type="button" className="premium-y-icon-button" onClick={toggle} aria-label={enabled ? "Couper les sons" : "Activer les sons"} aria-pressed={enabled}>
          {enabled ? <Volume2 size={17} strokeWidth={1.5} /> : <VolumeX size={17} strokeWidth={1.5} />}
        </button>
        <button type="button" className="premium-y-icon-button premium-y-exit-button" onClick={onExit} aria-label="Quitter l'onboarding">
          <X size={18} strokeWidth={1.5} />
        </button>
      </header>

      <main className={`premium-y-stage premium-y-stage--${step}`}>
        <section key={step} className="premium-y-card">
          {step === 0 && (
            <div className="premium-y-copy premium-y-copy--center">
              <div className="premium-y-eclipse-mark" aria-hidden="true"><span /><i /></div>
              <p className="premium-y-kicker">la nuit où tout a commencé</p>
              <p className="premium-y-word">Night One</p>
              <h1><WrittenText>Le temps a gravé une nuit à ton nom</WrittenText></h1>
              <p><WrittenText delay={650}>Le ciel de ta naissance ne ressemble à aucun autre. Retrouve les étoiles de ton premier instant.</WrittenText></p>
            </div>
          )}

          {step === 1 && (
            <div className="premium-y-copy">
              <StepLine step={1} />
              <p className="premium-y-kicker">comment ça marche</p>
              <h2><WrittenText>Trois repères, une carte entière</WrittenText></h2>
              <p><WrittenText delay={650}>Une date, une heure, un lieu. Night One dessine ton ciel de naissance et t’aide à le comprendre.</WrittenText></p>
              <div className="premium-y-explain-list">
                <div><span /><strong>Planètes</strong><p><WrittenText delay={650}>Ce qui agit en toi : élan, émotions, pensée.</WrittenText></p></div>
                <div><span /><strong>Signes</strong><p><WrittenText delay={650}>La manière dont chaque planète s’exprime.</WrittenText></p></div>
                <div><span /><strong>Maisons</strong><p><WrittenText delay={650}>Où elle agit : amour, travail, famille…</WrittenText></p></div>
                <div><span /><strong>Aspects</strong><p><WrittenText delay={650}>Les dialogues entre les planètes.</WrittenText></p></div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="premium-y-copy">
              <StepLine step={2} />
              <p className="premium-y-kicker">pour commencer</p>
              <h2><WrittenText>Quel est ton prénom ?</WrittenText></h2>
              <label className="premium-y-input">
                <span><Sparkles size={14} strokeWidth={1.6} /> Prénom</span>
                <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ton prénom" autoComplete="given-name" />
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="premium-y-copy premium-y-copy--wheel premium-y-copy--birth-data">
              <StepLine step={3} />
              <p className="premium-y-kicker">naissance</p>
              <h2><WrittenText>{displayName ? `Quand es-tu né, ${displayName} ?` : 'Quand es-tu né ?'}</WrittenText></h2>
              <div className="premium-y-wheel-grid premium-y-wheel-grid--date">
                <WheelPicker label="Jour" value={day} onChange={setDay} options={dayOptions} />
                <WheelPicker label="Mois" value={month} onChange={setMonth} options={monthOptions} />
                <WheelPicker label="Année" value={year} onChange={setYear} options={yearOptions} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="premium-y-copy premium-y-copy--wheel premium-y-copy--birth-data">
              <StepLine step={4} />
              <p className="premium-y-kicker">heure exacte</p>
              <h2><WrittenText>À quelle heure es-tu né ?</WrittenText></h2>
              <p className="premium-y-time-intro"><WrittenText delay={650}>La minute qui rend ton ciel unique.</WrittenText></p>
              <div className="premium-y-time-instrument">
                <div className="premium-y-time-labels" aria-hidden="true"><span>Heures</span><span>Minutes</span></div>
                <div className="premium-y-wheel-grid premium-y-wheel-grid--time">
                  <WheelPicker label="Heure" value={hour} onChange={setBirthHour} options={hourOptions} />
                  <span className="premium-y-time-separator" aria-hidden="true">:</span>
                  <WheelPicker label="Minute" value={minute} onChange={setBirthMinute} options={minuteOptions} />
                </div>
                <div className="premium-y-time-caption"><span aria-hidden="true">✦</span> Fais glisser les chiffres</div>
              </div>
              <button type="button" className="premium-y-text-button" onClick={() => { setHour(12); setMinute(0); setTimeUnknown(true); goNext(); }}>Je ne connais pas mon heure de naissance</button>
            </div>
          )}

          {step === 5 && (
            <div className="premium-y-copy premium-y-copy--form-title premium-y-copy--birth-data premium-y-copy--city">
              <StepLine step={5} />
              <p className="premium-y-kicker">lieu de naissance</p>
              <h2><WrittenText>Où es-tu né ?</WrittenText></h2>
              <label className="premium-y-input">
                <span><MapPin size={14} strokeWidth={1.6} /> Ville</span>
                <input value={cityInput} onChange={(event) => { setCityInput(event.target.value); setSelectedCity(null); }} placeholder="Ta ville de naissance" autoComplete="off" />
              </label>
              <div className="premium-y-suggestions">
                {isSearchingCities && <p className="premium-y-search-status">Recherche dans le monde entier…</p>}
                {(selectedCity ? [selectedCity] : citySuggestions).map((city) => (
                  <button key={`${city.name}-${city.region}-${city.country}`} type="button" className={isSameCity(selectedCity, city) ? 'is-selected' : ''} onClick={() => { setCityInput(city.name); setSelectedCity(city); }}>
                    <span>{city.name}<small>{city.region}</small></span><strong>{city.country}</strong>
                  </button>
                ))}
                {!selectedCity && !isSearchingCities && citySuggestions.length > 0 && <p className="premium-y-search-status">Choisis ta ville dans la liste.</p>}
                {cityNoResult && <p className="premium-y-search-status">Aucune ville trouvée. Vérifie l’orthographe ou choisis la ville la plus proche.</p>}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="premium-y-copy">
              <StepLine step={6} />
              <p className="premium-y-kicker">conseils personnels</p>
              <h2><WrittenText>Veux-tu des conseils sur mesure ?</WrittenText></h2>
              <p><WrittenText delay={650}>Inspirés de ton ciel de naissance et du mouvement des astres, au fil des jours.</WrittenText></p>
              <div className="premium-y-choice">
                <button type="button" className={!wantsPersonalAdvice ? 'is-selected' : ''} onClick={() => setWantsPersonalAdvice(false)}>Non</button>
                <button type="button" className={wantsPersonalAdvice ? 'is-selected' : ''} onClick={() => setWantsPersonalAdvice(true)}>Oui</button>
              </div>
            </div>
          )}

          {step === recapStep && (
            <div className="premium-y-copy premium-y-copy--center">
              <StepLine step={recapStep} />
              <p className="premium-y-kicker">avant de lever le voile</p>
              <h2><WrittenText>Tout est exact ?</WrittenText></h2>
              <div className="premium-y-summary">
                <button type="button" onClick={() => setStep(2)} aria-label="Modifier le prénom"><span><Check size={14} /> {name.trim() || 'Prénom'}</span><ChevronRight size={15} aria-hidden="true" /></button>
                <button type="button" onClick={() => setStep(3)} aria-label="Modifier la date de naissance"><span><Check size={14} /> {pad(day)} {MONTHS[month - 1]} {year}</span><ChevronRight size={15} aria-hidden="true" /></button>
                <button type="button" onClick={() => setStep(4)} aria-label="Modifier l'heure de naissance"><span><Check size={14} /> {timeUnknown ? 'Heure inconnue' : `${pad(hour)}:${pad(minute)}`}</span><ChevronRight size={15} aria-hidden="true" /></button>
                <button type="button" onClick={() => setStep(5)} aria-label="Modifier la ville de naissance"><span><Check size={14} /> {selectedCity ? [selectedCity.name, selectedCity.region, selectedCity.country].filter(Boolean).join(', ') : 'Ville'}</span><ChevronRight size={15} aria-hidden="true" /></button>
              </div>
              {revealError && <p className="premium-y-search-status" role="alert">Le calcul de ton ciel a échoué. Réessaie dans un instant.</p>}
            </div>
          )}

        </section>

        <footer className="premium-y-footer">
          <button type="button" className="premium-y-primary" onClick={mainAction} disabled={!canContinue || isPreparingReveal}>{mainActionText}</button>
          {step === 0 && <button type="button" className="premium-y-secondary" onClick={onSkipAccount}>J’ai déjà un compte</button>}
        </footer>
      </main>
    </div>
  );
}

export default function PremiumOnboardingY(props: PremiumOnboardingYProps) {
  return <OnboardingSound><PremiumOnboardingFlow {...props} /></OnboardingSound>;
}
