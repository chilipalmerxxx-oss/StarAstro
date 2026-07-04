import { type CSSProperties, type PointerEvent, useMemo, useRef, useState } from 'react';
import './NightstarCompatibilityModule.css';

type SignKey =
  | 'Aries'
  | 'Aquarius'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Pisces';

type SignPreset = {
  label: string;
  glyph: string;
  element: string;
  color: string;
  animation: string;
};

type NightstarCompatibilityModuleProps = {
  signLeft?: SignKey;
  signRight?: SignKey;
  score?: number;
  intensity?: string;
  imageSrc?: string;
  partnerLeft?: string;
  partnerRight?: string;
  className?: string;
};

type CompatibilityStyle = CSSProperties & {
  '--orbit-x': number;
  '--orbit-y': number;
  '--left-color': string;
  '--right-color': string;
};

const SIGN_PRESETS: Record<SignKey, SignPreset> = {
  Aries: {
    label: 'Bélier',
    glyph: '♈',
    element: 'Feu cardinal',
    color: 'var(--ns-red)',
    animation: 'breathing_glow',
  },
  Aquarius: {
    label: 'Verseau',
    glyph: '♒',
    element: 'Air fixe',
    color: 'var(--ns-blue)',
    animation: 'water_stream',
  },
  Taurus: { label: 'Taureau', glyph: '♉', element: 'Terre fixe', color: 'var(--ns-gold)', animation: 'earth_pulse' },
  Gemini: { label: 'Gémeaux', glyph: '♊', element: 'Air mutable', color: 'var(--ns-blue)', animation: 'air_shimmer' },
  Cancer: { label: 'Cancer', glyph: '♋', element: 'Eau cardinale', color: 'var(--ns-blue)', animation: 'water_stream' },
  Leo: { label: 'Lion', glyph: '♌', element: 'Feu fixe', color: 'var(--ns-red)', animation: 'breathing_glow' },
  Virgo: { label: 'Vierge', glyph: '♍', element: 'Terre mutable', color: 'var(--ns-gold)', animation: 'earth_pulse' },
  Libra: { label: 'Balance', glyph: '♎', element: 'Air cardinal', color: 'var(--ns-blue)', animation: 'air_shimmer' },
  Scorpio: { label: 'Scorpion', glyph: '♏', element: 'Eau fixe', color: 'var(--ns-red)', animation: 'breathing_glow' },
  Sagittarius: { label: 'Sagittaire', glyph: '♐', element: 'Feu mutable', color: 'var(--ns-red)', animation: 'breathing_glow' },
  Capricorn: { label: 'Capricorne', glyph: '♑', element: 'Terre cardinale', color: 'var(--ns-gold)', animation: 'earth_pulse' },
  Pisces: { label: 'Poissons', glyph: '♓', element: 'Eau mutable', color: 'var(--ns-blue)', animation: 'water_stream' },
};

export const nightstarCompatibilityPreset = {
  sign_left: 'Aries',
  sign_right: 'Aquarius',
  theme: 'cosmic_dark_gold',
  animation_left: 'breathing_glow',
  animation_right: 'water_stream',
  animation_center: 'infinity_pulse',
  interactions: ['hover_glow', 'tap_expand', 'drag_orbit'],
  resolution: '1920x1080',
};

export function buildCompatibilityConfig({
  signLeft = 'Aries',
  signRight = 'Aquarius',
  score = 89,
  intensity = 'Étincelle vive',
}: Pick<NightstarCompatibilityModuleProps, 'signLeft' | 'signRight' | 'score' | 'intensity'> = {}) {
  return {
    ...nightstarCompatibilityPreset,
    sign_left: signLeft,
    sign_right: signRight,
    score,
    intensity,
    animation_left: SIGN_PRESETS[signLeft].animation,
    animation_right: SIGN_PRESETS[signRight].animation,
  };
}

export default function NightstarCompatibilityModule({
  signLeft = 'Aries',
  signRight = 'Aquarius',
  score = 89,
  intensity = 'Étincelle vive',
  imageSrc,
  partnerLeft = 'Ariane',
  partnerRight = 'Noa',
  className = '',
}: NightstarCompatibilityModuleProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [orbit, setOrbit] = useState({ x: 0, y: 0 });

  const left = SIGN_PRESETS[signLeft];
  const right = SIGN_PRESETS[signRight];
  const config = useMemo(
    () => buildCompatibilityConfig({ signLeft, signRight, score, intensity }),
    [signLeft, signRight, score, intensity],
  );

  function pulseCenter() {
    setExpanded(true);
    window.setTimeout(() => setExpanded(false), 720);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragging || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (event.clientY - rect.top - rect.height / 2) / rect.height;

    setOrbit({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    });
  }

  function endDrag() {
    setDragging(false);
    setOrbit({ x: 0, y: 0 });
  }

  return (
    <section
      className={`nightstar-compatibility ${expanded ? 'is-expanded' : ''} ${dragging ? 'is-dragging' : ''} ${className}`}
      style={{
        '--orbit-x': orbit.x,
        '--orbit-y': orbit.y,
        '--left-color': left.color,
        '--right-color': right.color,
      } as CompatibilityStyle}
      aria-label={`Rapport de compatibilité premium ${left.label} et ${right.label}`}
    >
      <div
        ref={stageRef}
        className="ns-stage"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture?.(event.pointerId);
          setDragging(true);
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {imageSrc ? (
          <img
            className="ns-artwork-base"
            src={imageSrc}
            alt=""
            aria-hidden="true"
            draggable="false"
          />
        ) : null}

        <div className="ns-cosmos" aria-hidden="true">
          {Array.from({ length: 22 }).map((_, index) => (
            <span key={index} className="ns-particle" />
          ))}
        </div>

        <svg className="ns-sacred-geometry" viewBox="0 0 720 520" aria-hidden="true">
          <defs>
            <radialGradient id="nsCoreGlow" cx="50%" cy="48%" r="45%">
              <stop offset="0%" stopColor="rgba(255, 244, 204, .8)" />
              <stop offset="44%" stopColor="rgba(226, 174, 85, .2)" />
              <stop offset="100%" stopColor="rgba(226, 174, 85, 0)" />
            </radialGradient>
            <linearGradient id="nsBridgeGradient" x1="0%" x2="100%">
              <stop offset="0%" stopColor="rgba(255, 66, 56, .95)" />
              <stop offset="48%" stopColor="rgba(255, 237, 184, 1)" />
              <stop offset="100%" stopColor="rgba(111, 196, 255, .95)" />
            </linearGradient>
          </defs>
          <circle cx="360" cy="258" r="214" className="ns-orbit ns-orbit-a" />
          <circle cx="360" cy="258" r="154" className="ns-orbit ns-orbit-b" />
          <circle cx="360" cy="258" r="94" className="ns-core-glow" fill="url(#nsCoreGlow)" />
          <path
            className="ns-bridge ns-bridge-soft"
            d="M180 248 C245 160 302 170 360 250 C418 330 475 340 540 248"
          />
          <path
            className="ns-bridge ns-bridge-main"
            d="M176 248 C246 132 300 154 360 250 C420 346 474 368 544 248"
          />
          <path
            className="ns-bridge ns-bridge-main ns-bridge-return"
            d="M176 272 C246 388 300 366 360 270 C420 174 474 152 544 272"
          />
          <circle cx="180" cy="248" r="10" className="ns-anchor ns-anchor-left" />
          <circle cx="540" cy="248" r="10" className="ns-anchor ns-anchor-right" />
        </svg>

        <article className="ns-sign ns-sign-left" aria-label={`${left.label}, ${left.element}`}>
          <span className="ns-sign-orbit" aria-hidden="true" />
          <span className="ns-glyph">{left.glyph}</span>
          <span className="ns-sign-label">{left.label}</span>
        </article>

        <button className="ns-infinity" type="button" onClick={pulseCenter} aria-label="Activer la connexion astrale">
          <svg viewBox="0 0 220 118" aria-hidden="true">
            <path d="M62 59C38 25 12 28 12 59s26 34 50 0c25-34 71-34 96 0 24 34 50 31 50 0s-26-34-50 0c-25 34-71 34-96 0Z" />
          </svg>
        </button>

        <article className="ns-sign ns-sign-right" aria-label={`${right.label}, ${right.element}`}>
          <span className="ns-sign-orbit" aria-hidden="true" />
          <span className="ns-glyph">{right.glyph}</span>
          <span className="ns-sign-label">{right.label}</span>
        </article>

        <div className="ns-score" aria-live="polite">
          <span className="ns-score-value">{score}</span>
          <span className="ns-score-label">compatibilité</span>
        </div>
      </div>

      <footer className="ns-reading">
        <div>
          <p className="ns-kicker">{partnerLeft} x {partnerRight}</p>
          <h2>{intensity}</h2>
        </div>
        <p>
          Une dynamique rare : impulsion du feu, vision de l'air, et une boucle centrale qui transforme
          l'attirance en trajectoire commune.
        </p>
      </footer>

      <script type="application/json" className="ns-config-json">
        {JSON.stringify(config)}
      </script>
    </section>
  );
}
