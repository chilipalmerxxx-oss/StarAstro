import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import {
  ArrowRight,
  Heart,
  Moon,
  Orbit,
  Sparkles,
  Sun,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { generateCoStarAnalysis, type Aspect, type CoStarAnalysis, type House, type PlanetPosition } from '../services/astrology';
import './HomeDashboard.css';

type DashboardTab = 'costar' | 'love' | 'profile' | 'void';
type FocusId = 'today' | 'checkin' | 'you' | 'love';

interface HomeDashboardChart {
  name: string;
  birthDate: Date;
  birthPlace: string;
  planetPositions: Record<string, PlanetPosition>;
  houses: House[];
  aspects: Aspect[];
}

interface HomeDashboardProps {
  chartData: HomeDashboardChart;
  onNavigate: (tab: DashboardTab) => void;
}

interface FocusItem {
  id: FocusId;
  label: string;
  glyph: string;
  icon: LucideIcon;
  accent: string;
  tab?: DashboardTab;
}

interface CheckInOption {
  id: string;
  label: string;
  glyph: string;
  accent: string;
}

const HOME_CHECKINS_KEY = 'nightstarHomeCheckins';
const HOME_VISIT_KEY = 'nightstarHomeVisit';

const FOCUS_ITEMS: FocusItem[] = [
  { id: 'today', label: 'Ciel', glyph: '☉', icon: Sparkles, accent: '#f2c86f', tab: 'costar' },
  { id: 'checkin', label: 'Ressenti', glyph: '☽', icon: Moon, accent: '#8fc8ee' },
  { id: 'you', label: 'Thème', glyph: '♄', icon: UserRound, accent: '#b9a3ff', tab: 'profile' },
  { id: 'love', label: 'Love', glyph: '♀', icon: Heart, accent: '#e99ab0', tab: 'love' },
];

const CHECKIN_OPTIONS: CheckInOption[] = [
  { id: 'clair', label: 'Clair', glyph: '☉', accent: '#f2c86f' },
  { id: 'tendu', label: 'Tendu', glyph: '□', accent: '#f19a78' },
  { id: 'inspire', label: 'Inspiré', glyph: '✦', accent: '#b9a3ff' },
  { id: 'fatigue', label: 'Fatigué', glyph: '☽', accent: '#8fc8ee' },
];

const SIGN_ELEMENTS: Record<string, 'Feu' | 'Terre' | 'Air' | 'Eau'> = {
  Bélier: 'Feu',
  Lion: 'Feu',
  Sagittaire: 'Feu',
  Taureau: 'Terre',
  Vierge: 'Terre',
  Capricorne: 'Terre',
  Gémeaux: 'Air',
  Balance: 'Air',
  Verseau: 'Air',
  Cancer: 'Eau',
  Scorpion: 'Eau',
  Poissons: 'Eau',
};

const ELEMENT_COPY: Record<'Feu' | 'Terre' | 'Air' | 'Eau', string> = {
  Feu: 'Élan disponible. Agis, mais garde la main sur le volant.',
  Terre: 'Ancrage utile. Une petite décision concrète vaut mieux qu’un grand scénario.',
  Air: 'Clarté mentale. Trie le signal avant de lancer trois conversations.',
  Eau: 'Ressenti fort. Écoute-le, puis vérifie avec des faits simples.',
};

const EDITORIAL_LINES = [
  'Le ciel est sérieux. La panique, elle, reste optionnelle.',
  'Astrologie précise, ego en observation discrète.',
  'On lit le transit, pas une boule de brouillard.',
  'Le cosmos propose. Toi, tu gardes le bouton volume.',
] as const;

function getLocalDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = Math.imul(hash ^ value.charCodeAt(i), 0x9e3779b1);
  }
  return Math.abs(hash);
}

function getPlanetSign(chartData: HomeDashboardChart, planet: string, fallback: string) {
  return chartData.planetPositions?.[planet]?.sign || fallback;
}

function clampWords(text: string, limit = 22) {
  const words = text.replace(/\s+/g, ' ').trim().split(/\s+/).filter(Boolean);
  if (words.length <= limit) return words.join(' ');
  return `${words.slice(0, limit).join(' ')}...`;
}

function splitGlanceLine(text: string) {
  const cleanText = text.trim();
  const sentences = cleanText.split(/(?<=[.!?])\s+/);
  return {
    title: sentences[0] || cleanText,
    body: sentences.slice(1).join(' ') || sentences[0] || cleanText,
  };
}

function getPrimaryGlance(analysis: CoStarAnalysis, fallback: string) {
  const firstLine = analysis.dayAtGlance.split('||').find((item) => item.trim().length > 0);
  if (!firstLine) return fallback;
  return clampWords(splitGlanceLine(firstLine).body, 20);
}

function getPrimaryAspect(analysis: CoStarAnalysis) {
  const aspect = analysis.favorableAspects[0];
  if (!aspect) return null;

  return {
    title: `${aspect.planet1} ${aspect.type.toLocaleLowerCase('fr-FR')} ${aspect.planet2}`,
    meta: [
      aspect.transitSign ? `Transit en ${aspect.transitSign}` : 'Transit actif',
      aspect.natalSign ? `Natal en ${aspect.natalSign}` : null,
    ].filter(Boolean).join(' • '),
  };
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return 'Bonjour';
  if (hour < 18) return 'Belle journée';
  return 'Bonsoir';
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const stored = window.localStorage.getItem(key);
    if (!stored) return fallback;
    return JSON.parse(stored) as T;
  } catch {
    return fallback;
  }
}

export default function HomeDashboard({ chartData, onNavigate }: HomeDashboardProps) {
  const [activeFocus, setActiveFocus] = useState<FocusId>('today');
  const today = useMemo(() => new Date(), []);
  const dateKey = useMemo(() => getLocalDateKey(today), [today]);
  const tomorrowKey = useMemo(() => getLocalDateKey(addDays(today, 1)), [today]);
  const yesterdayKey = useMemo(() => getLocalDateKey(addDays(today, -1)), [today]);
  const firstName = chartData.name?.trim().split(/\s+/)[0] || 'toi';
  const sunSign = getPlanetSign(chartData, 'sun', 'Bélier');
  const moonSign = getPlanetSign(chartData, 'moon', 'Cancer');
  const venusSign = getPlanetSign(chartData, 'venus', 'Balance');
  const dayTone = ELEMENT_COPY[SIGN_ELEMENTS[moonSign] || 'Feu'];

  const [checkIns, setCheckIns] = useState<Record<string, string>>(() => {
    const parsed = readJson<Record<string, string>>(HOME_CHECKINS_KEY, {});
    return parsed && typeof parsed === 'object' ? parsed : {};
  });
  const [streak, setStreak] = useState(1);

  const todayAnalysis = useMemo(
    () => generateCoStarAnalysis(chartData, chartData.name, dateKey),
    [chartData, dateKey],
  );
  const tomorrowAnalysis = useMemo(
    () => generateCoStarAnalysis(chartData, chartData.name, tomorrowKey),
    [chartData, tomorrowKey],
  );
  const primaryAspect = useMemo(() => getPrimaryAspect(todayAnalysis), [todayAnalysis]);
  const dailyPreview = useMemo(
    () => getPrimaryGlance(todayAnalysis, todayAnalysis.dailyMove || dayTone),
    [dayTone, todayAnalysis],
  );
  const editorialLine = useMemo(
    () => EDITORIAL_LINES[hashString(`${chartData.name}|${dateKey}|line`) % EDITORIAL_LINES.length],
    [chartData.name, dateKey],
  );

  const dateLabel = useMemo(() => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(today);
  }, [today]);

  useEffect(() => {
    const stored = readJson<{ date?: string; streak?: number } | null>(HOME_VISIT_KEY, null);
    const previousStreak = typeof stored?.streak === 'number' ? stored.streak : 0;
    const nextStreak = stored?.date === dateKey
      ? Math.max(previousStreak, 1)
      : stored?.date === yesterdayKey
        ? previousStreak + 1
        : 1;

    setStreak(nextStreak);
    window.localStorage.setItem(HOME_VISIT_KEY, JSON.stringify({ date: dateKey, streak: nextStreak }));
  }, [dateKey, yesterdayKey]);

  useEffect(() => {
    window.localStorage.setItem(HOME_CHECKINS_KEY, JSON.stringify(checkIns));
  }, [checkIns]);

  const selectedCheckIn = CHECKIN_OPTIONS.find((item) => item.id === checkIns[dateKey]);
  const activeItem = FOCUS_ITEMS.find((item) => item.id === activeFocus) ?? FOCUS_ITEMS[0];

  const focusContent = {
    today: {
      eyebrow: 'Ciel du jour',
      title: primaryAspect?.title || todayAnalysis.mood,
      text: dailyPreview,
      meta: primaryAspect?.meta || todayAnalysis.dailyMove,
      action: 'Lire CoStar',
      tab: 'costar' as DashboardTab,
    },
    checkin: {
      eyebrow: 'Ressenti',
      title: selectedCheckIn ? `Tu notes: ${selectedCheckIn.label}` : 'Comment ça résonne ?',
      text: selectedCheckIn
        ? 'Ton vécu est enregistré. C’est là que l’astrologie devient vraiment personnelle.'
        : 'Choisis ton état du jour. Le ciel est calculé, mais ton corps donne le contexte.',
      meta: selectedCheckIn ? 'Check-in du jour enregistré' : 'Un tap suffit',
      action: 'Voir le ciel',
      tab: 'costar' as DashboardTab,
    },
    you: {
      eyebrow: 'Socle natal',
      title: `Soleil ${sunSign}, Lune ${moonSign}`,
      text: 'Ton thème de naissance est la carte fixe. Les transits du jour viennent appuyer dessus, pas inventer une météo vague.',
      meta: `Vénus en ${venusSign}`,
      action: 'Voir mon thème',
      tab: 'profile' as DashboardTab,
    },
    love: {
      eyebrow: 'Alchimie',
      title: 'Lire le lien sans verdict',
      text: 'Une compatibilité intéressante ne dit pas “oui” ou “non”. Elle montre où ça circule, où ça pique, et pourquoi.',
      meta: 'Synastrie et nuances',
      action: 'Ouvrir Love',
      tab: 'love' as DashboardTab,
    },
  }[activeFocus];

  const handleFocusAction = () => {
    onNavigate(focusContent.tab);
  };

  const handleCheckIn = (id: string) => {
    window.navigator.vibrate?.(8);
    setActiveFocus('checkin');
    setCheckIns((current) => ({
      ...current,
      [dateKey]: id,
    }));
  };

  return (
    <main className="home-dashboard">
      <section className="home-dashboard__stage" aria-label="Accueil Nightstar">
        <header className="home-dashboard__topline">
          <div>
            <p>{dateLabel}</p>
            <h1>{getGreeting()}, {firstName}</h1>
          </div>
          <span className="home-dashboard__streak">
            <strong>{streak}</strong>
            {streak > 1 ? 'jours' : 'jour'}
          </span>
        </header>

        <div
          className="home-dashboard__compass"
          style={{ '--home-dashboard-active': activeItem.accent } as CSSProperties}
        >
          <span className="home-dashboard__ring home-dashboard__ring--outer" aria-hidden="true" />
          <span className="home-dashboard__ring home-dashboard__ring--inner" aria-hidden="true" />
          <span className="home-dashboard__axis home-dashboard__axis--one" aria-hidden="true" />
          <span className="home-dashboard__axis home-dashboard__axis--two" aria-hidden="true" />

          {FOCUS_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeFocus === item.id;

            return (
              <button
                type="button"
                key={item.id}
                className={`home-dashboard__node home-dashboard__node--${item.id} ${isActive ? 'is-active' : ''}`}
                style={{ '--home-dashboard-accent': item.accent } as CSSProperties}
                onClick={() => setActiveFocus(item.id)}
                aria-label={item.label}
                title={item.label}
              >
                <span>{item.glyph}</span>
                <Icon size={14} aria-hidden="true" />
              </button>
            );
          })}

          <article className="home-dashboard__focus" aria-live="polite">
            <span className="home-dashboard__focus-eyebrow">{focusContent.eyebrow}</span>
            <h2>{focusContent.title}</h2>
            <p>{focusContent.text}</p>
            <small>{focusContent.meta}</small>
          </article>
        </div>

        {activeFocus === 'checkin' && (
          <div className="home-dashboard__checkins" aria-label="Ressenti du jour">
            {CHECKIN_OPTIONS.map((option) => (
              <button
                type="button"
                key={option.id}
                className={selectedCheckIn?.id === option.id ? 'is-active' : ''}
                style={{ '--home-dashboard-accent': option.accent } as CSSProperties}
                onClick={() => handleCheckIn(option.id)}
              >
                <span>{option.glyph}</span>
                {option.label}
              </button>
            ))}
          </div>
        )}

        <footer className="home-dashboard__bottom">
          <p>{editorialLine}</p>
          <button type="button" onClick={handleFocusAction}>
            <span>{focusContent.action}</span>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </footer>

        <aside className="home-dashboard__tomorrow" aria-label="Aperçu de demain">
          <Orbit size={14} aria-hidden="true" />
          <span>Demain: {tomorrowAnalysis.mood}</span>
        </aside>
      </section>
    </main>
  );
}
