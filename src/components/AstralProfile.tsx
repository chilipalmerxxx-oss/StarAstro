import { useState, useRef, useEffect } from 'react';
import './AstralProfile.glow.css';
import { RotateCcw } from 'lucide-react';
import { getDetailedInterpretation, SIGN_SYMBOLS } from '../data/signDetailedInterpretations';
import { PLANET_INFO, getAspectInterpretation } from '../data/interpretations';
import NatalChart from './NatalChart';

type PlanetKey = 'sun' | 'moon' | 'ascendant' | 'venus' | 'mars' | 'mercury' | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto';

const PLANET_GLYPHS: Record<PlanetKey, string> = {
  sun: '☉',
  moon: '☽',
  ascendant: 'AS',
  mercury: '☿',
  venus: '♀',
  mars: '♂',
  jupiter: '♃',
  saturn: '♄',
  uranus: '♅',
  neptune: '♆',
  pluto: '♇',
};

const ASPECT_SYMBOLS: Record<string, string> = {
  'Conjonction': '☌',
  'Opposition': '☍',
  'Trigone': '△',
  'Carré': '□',
  'Sextile': '⚹',
};

const PLANET_LABELS: Record<PlanetKey, string> = {
  sun: 'Soleil',
  moon: 'Lune',
  ascendant: 'Ascendant',
  mercury: 'Mercure',
  venus: 'Vénus',
  mars: 'Mars',
  jupiter: 'Jupiter',
  saturn: 'Saturne',
  uranus: 'Uranus',
  neptune: 'Neptune',
  pluto: 'Pluton',
};

interface AstralProfileProps {
  name: string;
  birthDate?: Date;
  birthPlace?: string;
  planetPositions: Record<string, any>;
  houses: any[];
  aspects?: any[];
  onOpenFriends: () => void;
  initialActivePlanet?: PlanetKey;
  fullscreenMode?: boolean;
}

function getSignForPlanet(
  key: PlanetKey,
  planetPositions: Record<string, any>,
  houses: any[]
): string {
  if (key === 'ascendant') {
    const firstHouse = houses?.[0];
    return firstHouse?.sign || 'Bélier';
  }
  return planetPositions[key]?.sign || 'Bélier';
}

export default function AstralProfile({
  name,
  birthDate,
  birthPlace,
  planetPositions,
  houses,
  aspects = [],
  onOpenFriends,
  initialActivePlanet,
  fullscreenMode = false,
}: AstralProfileProps) {
  const [activePlanet, setActivePlanet] = useState<PlanetKey>(initialActivePlanet || 'sun');
  const [activeAspect, setActiveAspect] = useState<any | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pillsContainerRef = useRef<HTMLDivElement>(null);
  const activePillRef = useRef<HTMLButtonElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Set active planet when initialActivePlanet prop changes
  useEffect(() => {
    if (initialActivePlanet) {
      setActivePlanet(initialActivePlanet);
      setActiveAspect(null);
      // Délai plus long pour laisser le temps au DOM de se rendre avant le scroll
      setTimeout(() => {
        // Scroller vers la pill sélectionnée
        if (activePillRef.current) {
          activePillRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
        // Puis scroller vers le contenu
        if (contentRef.current) {
          contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    } else {
      // Pas de planète sélectionnée : scroll en haut
      topRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, [initialActivePlanet]);

  // Scroller vers la pill quand activePlanet change
  useEffect(() => {
    if (activePillRef.current) {
      activePillRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activePlanet]);

  const sign = getSignForPlanet(activePlanet, planetPositions, houses);
  const interpretation = getDetailedInterpretation(activePlanet, sign);
  const symbol = SIGN_SYMBOLS[sign] || '★';

  const handlePlanetClick = (key: PlanetKey) => {
    setActivePlanet(key);
    setActiveAspect(null);
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  const handleAspectClick = (aspect: any) => {
    setActiveAspect(aspect);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const getAspectClass = (aspectType: string): { color: string; border: string } => {
    const typeMap: Record<string, string> = {
      'Conjonction': 'conjonction',
      'Trigone': 'trigone',
      'Carré': 'carre',
      'Opposition': 'opposition',
      'Sextile': 'sextile',
    };
    const key = typeMap[aspectType] || 'conjonction';
    return {
      color: `aspect-${key}`,
      border: `aspect-${key}-border`,
    };
  };

  return (
    <div className="min-h-screen bg-[#111111]">
      <div ref={topRef} />
      {/* Roue Zodiacale en haut */}
      {birthDate && birthPlace && (
        <div className={`${fullscreenMode ? 'astral-profile-wheel-page w-full' : 'relative mb-6 pt-2 pb-6 px-2 sm:px-4'} relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#1a1a1a] before:via-[#141414] before:to-[#111111] before:pointer-events-none before:opacity-80 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[500px] after:h-[500px] after:blur-3xl after:opacity-20 after:pointer-events-none after:rounded-full`} style={{ '--tw-gradient-stops': 'rgb(160, 160, 160), rgb(120, 120, 120)' } as React.CSSProperties}>
          <style>{`
            .zodiac-space-bg::after {
              background: radial-gradient(circle, rgba(160, 160, 160, 0.15) 0%, rgba(120, 120, 120, 0.08) 40%, transparent 70%);
            }
            @keyframes float-glow {
              0%, 100% { 
                box-shadow: 0 0 60px rgba(160, 160, 160, 0.15), 
                           0 0 100px rgba(120, 120, 120, 0.08),
                           inset 0 0 100px rgba(160, 160, 160, 0.05);
              }
              50% { 
                box-shadow: 0 0 100px rgba(160, 160, 160, 0.25), 
                           0 0 150px rgba(120, 120, 120, 0.12),
                           inset 0 0 120px rgba(160, 160, 160, 0.08);
              }
            }
            .zodiac-wheel-container {
              animation: float-glow 5s ease-in-out infinite;
              filter: drop-shadow(0 0 30px rgba(160, 160, 160, 0.1));
            }
          `}</style>
          <div className="relative z-10 zodiac-wheel-container">
            <NatalChart
              name={name}
              birthDate={birthDate}
              birthPlace={birthPlace}
              planetPositions={planetPositions}
              houses={houses}
              aspects={aspects}
              onAspectClick={handleAspectClick}
              onPlanetClick={(key) => handlePlanetClick(key as PlanetKey)}
              fullscreenMode={fullscreenMode}
            />
          </div>
        </div>
      )}

      {/* Profil Astral */}
      <div className="astral-profile">
        {/* ── Header ── */}
        <header className="astral-profile__header">
          <h1 className="astral-profile__name">{name}</h1>
          <p className="astral-profile__subtitle">Ton thème astral</p>
        </header>

      {/* ── Sign pills ── */}
      <h3 className="astral-profile__aspects-title">Planètes</h3>
      <div className="astral-profile__pills" ref={pillsContainerRef}>
        {(['ascendant', 'sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'] as PlanetKey[]).map((key) => {
          const pillSign = getSignForPlanet(key, planetPositions, houses);
          const isActive = activePlanet === key;
          return (
            <button
              key={key}
              ref={isActive ? activePillRef : null}
              className={`astral-profile__sign-pill ${isActive ? 'astral-profile__sign-pill--active' : ''}`}
              onClick={() => handlePlanetClick(key)}
            >
              <span className={`astral-profile__pill-glyph planet-${key}`}>{PLANET_GLYPHS[key]}</span>
              <span>{PLANET_LABELS[key]}</span>
              <span className="astral-profile__pill-sign">{pillSign}</span>
            </button>
          );
        })}
      </div>

      {/* ── Aspects List ── */}
      {aspects && aspects.length > 0 && (
        <div className="astral-profile__aspects">
          <h3 className="astral-profile__aspects-title">Aspects</h3>
          <div className="astral-profile__aspects-list">
            {aspects
              .filter((a) => {
                if (a.type === 'Conjonction' && a.orb > 2) {
                  return false;
                }
                return ['Conjonction', 'Trigone', 'Carré', 'Opposition', 'Sextile'].includes(a.type);
              })
              .slice(0, 20)
              .map((aspect, index) => {
                const p1Name = PLANET_INFO[aspect.planet1]?.name || aspect.planet1;
                const p2Name = PLANET_INFO[aspect.planet2]?.name || aspect.planet2;
                const aspectSymbol = ASPECT_SYMBOLS[aspect.type] || '◆';
                const isActive = activeAspect?.planet1 === aspect.planet1 && activeAspect?.planet2 === aspect.planet2 && activeAspect?.type === aspect.type;
                
                const { color: colorClass, border: borderClass } = getAspectClass(aspect.type);
                
                return (
                  <button
                    key={index}
                    className={`astral-profile__aspect-item ${borderClass} ${isActive ? 'astral-profile__aspect-item--active' : ''}`}
                    onClick={() => {
                      setActiveAspect(isActive ? null : aspect);
                      setTimeout(() => {
                        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }, 0);
                    }}
                  >
                    <span className={`astral-profile__aspect-glyph planet-${aspect.planet1 as PlanetKey}`}>
                      {PLANET_GLYPHS[aspect.planet1 as PlanetKey] || '◆'}
                    </span>
                    <span className="astral-profile__aspect-planet">{p1Name}</span>
                    <span className={`astral-profile__aspect-symbol ${colorClass}`}>{aspectSymbol}</span>
                    <span className="astral-profile__aspect-planet">{p2Name}</span>
                    <span className={`astral-profile__aspect-glyph planet-${aspect.planet2 as PlanetKey}`}>
                      {PLANET_GLYPHS[aspect.planet2 as PlanetKey] || '◆'}
                    </span>
                    <span className="astral-profile__aspect-orb">{aspect.orb.toFixed(1)}°</span>
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* ── Content area ── */}
      {activeAspect ? (
        <div className="astral-profile__content" key={`${activeAspect.planet1}-${activeAspect.type}-${activeAspect.planet2}`} ref={contentRef}>
          <div className="astral-profile__symbol">
            {ASPECT_SYMBOLS[activeAspect.type] || '◆'}
          </div>
          <h2 className="astral-profile__title">
            {PLANET_INFO[activeAspect.planet1]?.name || activeAspect.planet1} {activeAspect.type}{' '}
            {PLANET_INFO[activeAspect.planet2]?.name || activeAspect.planet2}
          </h2>
          <p className="astral-profile__sign-subtitle">
            {PLANET_GLYPHS[activeAspect.planet1 as PlanetKey] || '◆'}{' '}
            {activeAspect.type}{' '}
            {PLANET_GLYPHS[activeAspect.planet2 as PlanetKey] || '◆'}
            <span className="astral-profile__orb-display">{activeAspect.orb.toFixed(1)}° d'orbe</span>
          </p>

          {getAspectInterpretation(activeAspect.planet1, activeAspect.planet2, activeAspect.type).split('\n\n').map((paragraph, i) => (
            <p key={i} className="astral-profile__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        <div className="astral-profile__content" key={`${activePlanet}-${sign}`} ref={contentRef}>
          <div className="astral-profile__symbol">{symbol}</div>
          <h2 className="astral-profile__title">
            {PLANET_LABELS[activePlanet]} en {sign}
          </h2>
          <p className="astral-profile__sign-subtitle">
            {PLANET_GLYPHS[activePlanet]} {sign} {symbol}
          </p>

          {interpretation ? (
            interpretation.split('\n\n').map((paragraph, i) => (
              <p key={i} className="astral-profile__paragraph">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="astral-profile__paragraph">
              Interprétation détaillée bientôt disponible.
            </p>
          )}
        </div>
      )}

      {/* ── CTA ── */}
      <button className="astral-profile__cta glow-blink" onClick={onOpenFriends}>
        <RotateCcw className="w-5 h-5" />
        Comparer avec un ami
      </button>
      </div>
    </div>
  );
}
