import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { ArrowLeft } from 'lucide-react';
import './OnboardingFinalReveal.css';
import { WrittenText } from './OnboardingMotion';
import { getWritingDuration } from './writing';

export type RevealChart = {
  /** Plusieurs signes possibles quand l'heure de naissance est inconnue et que l'astre change de signe ce jour-là. */
  sun: { signs: string[]; longitude: number };
  moon: { signs: string[]; longitude: number };
  /** `null` quand l'heure de naissance est inconnue : l'Ascendant ne peut pas être calculé. */
  ascendant: { sign: string; longitude: number } | null;
};

type OnboardingFinalRevealProps = {
  chart: RevealChart;
  onComplete: () => Promise<void> | void;
  onBack: () => void;
};

const ZODIAC_LABELS = ['BÉL', 'TAU', 'GÉM', 'CAN', 'LIO', 'VIE', 'BAL', 'SCO', 'SAG', 'CAP', 'VER', 'POI'];

const SUN_KEYS: Record<string, string> = {
  'Bélier': 'Élan, courage, goût du commencement',
  'Taureau': 'Constance, sens du concret et du beau',
  'Gémeaux': 'Curiosité, mots, esprit en mouvement',
  'Cancer': 'Protection, mémoire, attachement aux siens',
  'Lion': 'Création, générosité, besoin de briller',
  'Vierge': 'Précision, utilité, art du détail',
  'Balance': 'Harmonie, lien, sens de la justice',
  'Scorpion': 'Intensité, vérité, transformation',
  'Sagittaire': 'Vision, liberté, quête de sens',
  'Capricorne': 'Ambition, endurance, construction patiente',
  'Verseau': 'Indépendance, idées, regard en avance',
  'Poissons': 'Imagination, empathie, perméabilité au monde',
};

const MOON_KEYS: Record<string, string> = {
  'Bélier': 'Émotions vives, besoin d’agir vite',
  'Taureau': 'Besoin de calme, de stabilité, de confort',
  'Gémeaux': 'Mettre des mots sur ce que tu ressens',
  'Cancer': 'Sensibilité profonde, besoin d’un refuge',
  'Lion': 'Besoin de chaleur et de reconnaissance',
  'Vierge': 'Apaisement par l’ordre et l’utile',
  'Balance': 'Besoin d’harmonie dans tes liens',
  'Scorpion': 'Émotions intenses, gardées secrètes',
  'Sagittaire': 'Besoin d’espace et d’horizons',
  'Capricorne': 'Pudeur, émotions tenues sous contrôle',
  'Verseau': 'Recul émotionnel, besoin de liberté',
  'Poissons': 'Intuition, sensibilité profonde',
};

const ASCENDANT_KEYS: Record<string, string> = {
  'Bélier': 'Un abord direct, sans détour',
  'Taureau': 'Une présence calme qui rassure',
  'Gémeaux': 'Un regard vif, curieux de tout',
  'Cancer': 'Une douceur qui met en confiance',
  'Lion': 'Un rayonnement qui ne passe pas inaperçu',
  'Vierge': 'Une réserve attentive au moindre détail',
  'Balance': 'Une élégance qui apaise les tensions',
  'Scorpion': 'Un magnétisme qui intrigue',
  'Sagittaire': 'Un enthousiasme qui ouvre les portes',
  'Capricorne': 'Une sobriété qui inspire confiance',
  'Verseau': 'Une singularité qui surprend',
  'Poissons': 'Une présence rêveuse, perméable',
};

// Apparition des trois lignes (Soleil, Lune, Ascendant) : doit suivre les --point-delay du rendu.
const POINT_DELAYS_MS = [8950, 9750, 10550];
const PLANET_RADIUS = 110;
const LABEL_GAP = 14;
const BODY_DELAYS = { sun: 6.6, moon: 6.75, ascendant: 6.9 };

const polarPoint = (radius: number, degrees: number) => {
  const angle = (degrees - 90) * Math.PI / 180;
  return { x: 200 + Math.cos(angle) * radius, y: 200 + Math.sin(angle) * radius };
};

const describeSigns = (signs: string[], keys: Record<string, string>) =>
  signs.length > 1 ? 'Ton heure de naissance tranchera' : keys[signs[0]] ?? '';

type WheelBody = { key: 'sun' | 'moon' | 'ascendant'; label: string; longitude: number };

// Place chaque astre à sa vraie longitude. Étiquette côté centre (jamais sur les noms de signe),
// décalée verticalement si deux astres proches se chevauchent.
const layoutBodies = (bodies: WheelBody[]) => {
  const placed = bodies.map((body) => {
    const point = polarPoint(PLANET_RADIUS, body.longitude);
    return { ...body, point, labelX: point.x, labelY: point.y + (point.y <= 200 ? 15 : -15) };
  }).sort((a, b) => a.labelY - b.labelY);
  for (let index = 1; index < placed.length; index++) {
    for (let previous = 0; previous < index; previous++) {
      const overlapsX = Math.abs(placed[index].labelX - placed[previous].labelX) < 64;
      if (overlapsX && placed[index].labelY - placed[previous].labelY < LABEL_GAP) {
        placed[index].labelY = placed[previous].labelY + LABEL_GAP;
      }
    }
  }
  return placed;
};

// Titre puis détail écrits lettre à lettre, avec le même son que les écrans de l'onboarding.
function RevealPointText({ title, detail, delay }: { title: string; detail: string; delay: number }) {
  return (
    <span>
      <strong><WrittenText delay={delay}>{title}</WrittenText></strong>
      <small><WrittenText delay={delay + getWritingDuration(title) + 120}>{detail}</WrittenText></small>
    </span>
  );
}

export default function OnboardingFinalReveal({ chart, onComplete, onBack }: OnboardingFinalRevealProps) {
  const [run, setRun] = useState(0);
  const [percent, setPercent] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const textTiming = skipped || reducedMotion ? 'now' : 'timed';
  const pointTextDelay = (index: number) => (textTiming === 'now' ? index * 600 : POINT_DELAYS_MS[index] + 150);

  const bodies = useMemo(() => layoutBodies([
    { key: 'sun', label: 'Soleil', longitude: chart.sun.longitude },
    { key: 'moon', label: 'Lune', longitude: chart.moon.longitude },
    ...(chart.ascendant ? [{ key: 'ascendant' as const, label: 'Ascendant', longitude: chart.ascendant.longitude }] : []),
  ]), [chart]);
  const moonPoint = bodies.find((body) => body.key === 'moon')?.point;

  const stars = useMemo(() => Array.from({ length: 38 }, (_, index) => ({
    left: `${(index * 37 + (index % 6) * 9) % 97}%`,
    top: `${(index * 53 + (index % 5) * 13) % 91}%`,
    width: `${1 + (index % 3) * 0.55}px`,
    height: `${1 + (index % 3) * 0.55}px`,
    animationDelay: `${(index % 9) * 0.37}s`,
    animationDuration: `${2.6 + (index % 5) * 0.45}s`,
  })), []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (skipped || reducedMotion) {
      setPercent(100);
      return;
    }
    setPercent(0);
    let frame = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - startedAt) / 3250) * 100));
      setPercent(next);
      if (next < 100) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [run, skipped, reducedMotion]);

  const replay = () => {
    setSkipped(false);
    setRun((value) => value + 1);
  };

  const complete = async () => {
    if (isCompleting) return;
    setIsCompleting(true);
    if ('vibrate' in navigator) navigator.vibrate([14, 24, 14]);
    try {
      await onComplete();
    } catch {
      setIsCompleting(false);
    }
  };

  return (
    <section key={run} className={`night-one-reveal${skipped || reducedMotion ? ' is-skipped' : ''}`} aria-label="Révélation de ton thème astral">
      <div className="night-one-reveal__flash" aria-hidden="true" />
      <div className="night-one-reveal__grain" aria-hidden="true" />
      <div className="night-one-reveal__horizon" aria-hidden="true" />
      <div className="night-one-reveal__stars" aria-hidden="true">
        {stars.map((style, index) => <span key={index} style={style} />)}
      </div>

      <button className="night-one-reveal__back" type="button" onClick={onBack} aria-label="Retour au récapitulatif"><ArrowLeft size={18} strokeWidth={1.5} /></button>
      <button className="night-one-reveal__skip" type="button" onClick={() => setSkipped(true)}>Passer</button>

      <main className="night-one-reveal__stage">
        <div className="night-one-reveal__anticipation" aria-live="polite">
          <div className="night-one-reveal__constellation">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              {Array.from({ length: 12 }, (_, index) => {
                const firstAngle = index * 30 - 90;
                const secondAngle = (index + 1) * 30 - 90;
                const a = { x: 60 + Math.cos(firstAngle * Math.PI / 180) * 46, y: 60 + Math.sin(firstAngle * Math.PI / 180) * 46 };
                const b = { x: 60 + Math.cos(secondAngle * Math.PI / 180) * 46, y: 60 + Math.sin(secondAngle * Math.PI / 180) * 46 };
                return <line key={index} className={index < 6 ? 'is-silver' : 'is-ember'} pathLength="1" x1={a.x} y1={a.y} x2={b.x} y2={b.y} style={{ animationDelay: `${0.15 + index * 0.25}s` }} />;
              })}
              {Array.from({ length: 12 }, (_, index) => {
                const angle = index * 30 - 90;
                return <circle key={index} className={index < 6 ? 'is-silver' : 'is-ember'} cx={60 + Math.cos(angle * Math.PI / 180) * 46} cy={60 + Math.sin(angle * Math.PI / 180) * 46} r={index % 6 === 0 ? 2.1 : 1.7} style={{ animationDelay: `${0.05 + index * 0.25}s` }} />;
              })}
            </svg>
            <span className="night-one-reveal__percent"><b>{percent}</b><i>%</i></span>
          </div>
          <div className="night-one-reveal__loading-copy"><span>Calcul des positions planétaires</span><span>{chart.ascendant ? 'Tracé de tes maisons' : 'Lecture de tes signes'}</span><span>Mise en place des aspects</span></div>
        </div>

        <div className="night-one-reveal__signature" aria-label="Night One"><span className="night-one-reveal__mini-mark" aria-hidden="true" /><span>Night One</span></div>

        <div className="night-one-reveal__wheel-zone" aria-hidden="true">
          <div className="night-one-reveal__wheel-glow" />
          <div className="night-one-reveal__chart-collapse">
            <div className="night-one-reveal__chart-wrap">
              <svg className="night-one-reveal__chart" viewBox="0 0 400 400">
                <defs>
                  <radialGradient id="nightOneMarkGradient" cx="35%" cy="30%" r="75%"><stop offset="0%" stopColor="#fff" /><stop offset="50%" stopColor="#d9d8d4" /><stop offset="100%" stopColor="#9a9a96" /></radialGradient>
                  <clipPath id="nightOneCenterClip"><circle cx="200" cy="200" r="24" /></clipPath>
                  {moonPoint && <clipPath id="nightOneMoonClip"><circle cx={moonPoint.x} cy={moonPoint.y} r="7" /></clipPath>}
                </defs>
                <circle className="night-one-reveal__ring-outer" pathLength="1" cx="200" cy="200" r="174" />
                <circle className="night-one-reveal__ring-inner" pathLength="1" cx="200" cy="200" r="60" />
                <g>{Array.from({ length: 36 }, (_, index) => {
                  const outer = polarPoint(index % 3 === 0 ? 188 : 181, index * 10);
                  const inner = polarPoint(174, index * 10);
                  return <line key={index} className={`night-one-reveal__tick ${index % 3 === 0 ? 'is-major' : ''}`} pathLength="1" x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} style={{ animationDelay: `${4.6 + index * 0.012}s` }} />;
                })}</g>
                <g>{ZODIAC_LABELS.map((label, index) => {
                  const point = polarPoint(152, index * 30 + 15);
                  return <text key={label} className="night-one-reveal__zodiac" x={point.x} y={point.y} style={{ animationDelay: `${5.5 + index * 0.045}s` }}>{label}</text>;
                })}</g>
                <g className="night-one-reveal__center-mark"><g clipPath="url(#nightOneCenterClip)"><circle cx="200" cy="200" r="24" fill="url(#nightOneMarkGradient)" /><circle cx="192.8" cy="200" r="24" fill="#100f16" /></g><circle cx="200" cy="200" r="24" fill="none" stroke="#f5f4f1" strokeWidth="1" opacity=".5" /></g>
                {bodies.map((body) => {
                  const { x, y } = body.point;
                  const delay = BODY_DELAYS[body.key];
                  return (
                    <g key={body.key}>
                      {body.key === 'sun' && <g className="night-one-reveal__planet" style={{ animationDelay: `${delay}s` }}><circle cx={x} cy={y} r="6.5" /><circle cx={x} cy={y} r="1.8" fill="#d3d3d8" /></g>}
                      {body.key === 'moon' && <g className="night-one-reveal__planet" style={{ animationDelay: `${delay}s` }} clipPath="url(#nightOneMoonClip)"><circle cx={x} cy={y} r="7" fill="#cfd2d6" /><circle cx={x - 2.1} cy={y} r="7" fill="#100f16" /></g>}
                      {body.key === 'ascendant' && <g className="night-one-reveal__planet" style={{ animationDelay: `${delay}s` }}><circle cx={x} cy={y} r="9" /><text x={x} y={y + 0.4} className="night-one-reveal__ac">AC</text></g>}
                      <text className="night-one-reveal__planet-label" textAnchor="middle" x={body.labelX} y={body.labelY} style={{ animationDelay: `${delay + 0.35}s` }}>{body.label}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        <div className="night-one-reveal__anchor" aria-hidden="true"><span /><i /></div>
        <div className="night-one-reveal__points">
          <div className="night-one-reveal__point" style={{ '--point-delay': '8.95s' } as CSSProperties}><span className="night-one-reveal__sun-icon" aria-hidden="true"><i /></span><RevealPointText key={textTiming} delay={pointTextDelay(0)} title={`Soleil en ${chart.sun.signs.join(' ou ')}`} detail={describeSigns(chart.sun.signs, SUN_KEYS)} /></div>
          <div className="night-one-reveal__point" style={{ '--point-delay': '9.75s' } as CSSProperties}><span className="night-one-reveal__moon-icon" aria-hidden="true"><i /></span><RevealPointText key={textTiming} delay={pointTextDelay(1)} title={`Lune en ${chart.moon.signs.join(' ou ')}`} detail={describeSigns(chart.moon.signs, MOON_KEYS)} /></div>
          <div className="night-one-reveal__point" style={{ '--point-delay': '10.55s' } as CSSProperties}><span className="night-one-reveal__asc-icon" aria-hidden="true">AC</span>{chart.ascendant
                ? <RevealPointText key={textTiming} delay={pointTextDelay(2)} title={`Ascendant ${chart.ascendant.sign}`} detail={ASCENDANT_KEYS[chart.ascendant.sign] ?? ''} />
                : <RevealPointText key={textTiming} delay={pointTextDelay(2)} title="Ascendant" detail="Révélé avec ton heure de naissance" />}</div>
        </div>
        <button className="night-one-reveal__cta" type="button" onClick={complete} disabled={isCompleting}>{isCompleting ? 'Ouverture…' : 'Découvrir mon thème astral'}</button>
      </main>
      <button className="night-one-reveal__replay" type="button" onClick={replay}>Rejouer</button>
    </section>
  );
}
