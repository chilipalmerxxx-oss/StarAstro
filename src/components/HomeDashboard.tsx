import { useMemo, useState } from 'react';
import { generateCoStarAnalysis, type Aspect, type CoStarAnalysis, type House, type PlanetPosition } from '../services/astrology';
import './HomeDashboard.css';

type DashboardTab = 'costar' | 'love' | 'profile' | 'void';
type TimePhase = 'morning' | 'day' | 'evening' | 'night';

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

function getLocalDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function getTimePhase(date = new Date()): TimePhase {
  const hour = date.getHours();
  if (hour >= 5 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 17) return 'day';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

function getGreeting(phase: TimePhase) {
  if (phase === 'morning') return 'Bonjour';
  if (phase === 'day') return 'Belle journée';
  if (phase === 'evening') return 'Bonsoir';
  return 'Bonne nuit';
}

function clampText(text: string, max = 28) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

function getHighlightLabel(analysis: CoStarAnalysis) {
  const aspect = analysis.favorableAspects[0];
  if (aspect) {
    return clampText(`${aspect.planet1} ${aspect.type.toLowerCase()} ${aspect.planet2}`, 32);
  }
  return clampText(analysis.mood, 32);
}

function getMoodLine(analysis: CoStarAnalysis) {
  const glance = analysis.dayAtGlance.split('||').find((line) => line.trim().length > 0);
  if (glance) return clampText(glance.replace(/^Aujourd'hui,\s*/i, ''), 72);
  return clampText(analysis.dailyMove || analysis.mood, 72);
}

export default function HomeDashboard({ chartData, onNavigate }: HomeDashboardProps) {
  const [isExiting, setIsExiting] = useState(false);
  const now = useMemo(() => new Date(), []);
  const dateKey = useMemo(() => getLocalDateKey(now), [now]);
  const timePhase = useMemo(() => getTimePhase(now), [now]);
  const firstName = chartData.name?.trim().split(/\s+/)[0] || 'toi';

  const todayAnalysis = useMemo(
    () => generateCoStarAnalysis(chartData, chartData.name, dateKey),
    [chartData, dateKey],
  );

  const highlightLabel = useMemo(() => getHighlightLabel(todayAnalysis), [todayAnalysis]);
  const moodLine = useMemo(() => getMoodLine(todayAnalysis), [todayAnalysis]);
  const greeting = getGreeting(timePhase);

  const handleStart = () => {
    if (isExiting) return;
    setIsExiting(true);
    window.navigator.vibrate?.(12);
    window.setTimeout(() => onNavigate('costar'), 520);
  };

  return (
    <main
      className={`tide-landing tide-landing--${timePhase} ${isExiting ? 'is-exiting' : ''}`}
    >
      <div className="tide-landing__backdrop" aria-hidden="true">
        <div className="tide-landing__cosmos" />
        <div className="tide-landing__nebula tide-landing__nebula--a" />
        <div className="tide-landing__nebula tide-landing__nebula--b" />
        <div className="tide-landing__nebula tide-landing__nebula--c" />
        <div className="tide-landing__stars tide-landing__stars--far" />
        <div className="tide-landing__stars tide-landing__stars--near" />
        <div className="tide-landing__glow" />
        <div className="tide-landing__tone" />
        <div className="tide-landing__shade" />
        <div className="tide-landing__grain" />
      </div>

      <div className="tide-landing__content">
        <header className="tide-landing__top">
          <span className="tide-landing__highlight tide-landing__reveal tide-landing__reveal--1">
            {highlightLabel}
          </span>
          <p className="tide-landing__greeting tide-landing__reveal tide-landing__reveal--1">
            {greeting}, {firstName}
          </p>
        </header>

        <div className="tide-landing__hero">
          <h1 className="tide-landing__logo tide-landing__reveal tide-landing__reveal--2">
            NIGHTSTAR
          </h1>
          <p className="tide-landing__tagline tide-landing__reveal tide-landing__reveal--3">
            Un espace pour ton ciel, ton souffle, ta présence et ton calme.
          </p>
          <p className="tide-landing__mood tide-landing__reveal tide-landing__reveal--4">
            {moodLine}
          </p>
        </div>

        <div className="tide-landing__footer tide-landing__reveal tide-landing__reveal--5">
          <button
            type="button"
            className="tide-landing__start"
            onClick={handleStart}
            disabled={isExiting}
          >
            <span>{isExiting ? 'Ouverture…' : 'Start'}</span>
          </button>
        </div>
      </div>

      <div className="tide-landing__exit-veil" aria-hidden="true" />
    </main>
  );
}
