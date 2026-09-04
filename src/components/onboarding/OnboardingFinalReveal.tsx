import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { ArrowLeft } from 'lucide-react';
import './OnboardingFinalReveal.css';

type OnboardingFinalRevealProps = {
  onComplete: () => Promise<void> | void;
  onBack: () => void;
};

const ZODIAC_LABELS = ['BÉL', 'TAU', 'GÉM', 'CAN', 'LIO', 'VIE', 'BAL', 'SCO', 'SAG', 'CAP', 'VER', 'POI'];

const polarPoint = (radius: number, degrees: number) => {
  const angle = (degrees - 90) * Math.PI / 180;
  return { x: 200 + Math.cos(angle) * radius, y: 200 + Math.sin(angle) * radius };
};

export default function OnboardingFinalReveal({ onComplete, onBack }: OnboardingFinalRevealProps) {
  const [run, setRun] = useState(0);
  const [percent, setPercent] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

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
    <section key={run} className={`night-one-reveal${skipped || reducedMotion ? ' is-skipped' : ''}`} aria-label="Révélation de votre thème astral">
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
          <div className="night-one-reveal__loading-copy"><span>Lecture des positions célestes</span><span>Alignement de vos astres</span><span>Chargement de votre thème astral</span></div>
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
                  <clipPath id="nightOneMoonClip"><circle cx="162.4" cy="96.6" r="7" /></clipPath>
                </defs>
                <circle className="night-one-reveal__ring-outer" pathLength="1" cx="200" cy="200" r="174" />
                <circle className="night-one-reveal__ring-inner" pathLength="1" cx="200" cy="200" r="60" />
                <g>{Array.from({ length: 36 }, (_, index) => {
                  const outer = polarPoint(index % 3 === 0 ? 188 : 181, index * 10);
                  const inner = polarPoint(174, index * 10);
                  return <line key={index} className={`night-one-reveal__tick ${index % 3 === 0 ? 'is-major' : ''}`} pathLength="1" x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} style={{ animationDelay: `${4.6 + index * 0.012}s` }} />;
                })}</g>
                <g>{ZODIAC_LABELS.map((label, index) => {
                  const point = polarPoint(152, index * 30);
                  return <text key={label} className="night-one-reveal__zodiac" x={point.x} y={point.y} style={{ animationDelay: `${5.5 + index * 0.045}s` }}>{label}</text>;
                })}</g>
                <g className="night-one-reveal__center-mark"><g clipPath="url(#nightOneCenterClip)"><circle cx="200" cy="200" r="24" fill="url(#nightOneMarkGradient)" /><circle cx="192.8" cy="200" r="24" fill="#100f16" /></g><circle cx="200" cy="200" r="24" fill="none" stroke="#f5f4f1" strokeWidth="1" opacity=".5" /></g>
                <g className="night-one-reveal__planet" style={{ animationDelay: '6.6s' }}><circle cx="284.3" cy="270.7" r="6.5" /><circle cx="284.3" cy="270.7" r="1.8" fill="#d3d3d8" /></g>
                <text className="night-one-reveal__planet-label" x="298.8" y="282.9" style={{ animationDelay: '6.95s' }}>Soleil</text>
                <g className="night-one-reveal__planet" style={{ animationDelay: '6.75s' }} clipPath="url(#nightOneMoonClip)"><circle cx="162.4" cy="96.6" r="7" fill="#cfd2d6" /><circle cx="160.3" cy="96.6" r="7" fill="#100f16" /></g>
                <text className="night-one-reveal__planet-label is-end" x="155.9" y="78.8" style={{ animationDelay: '7.1s' }}>Lune</text>
                <g className="night-one-reveal__planet" style={{ animationDelay: '6.9s' }}><circle cx="96.6" cy="237.6" r="9" /><text x="96.6" y="238" className="night-one-reveal__ac">AC</text></g>
                <text className="night-one-reveal__planet-label is-end" x="78.8" y="244.1" style={{ animationDelay: '7.25s' }}>Ascendant</text>
              </svg>
            </div>
          </div>
        </div>

        <div className="night-one-reveal__anchor" aria-hidden="true"><span /><i /></div>
        <div className="night-one-reveal__points">
          <div className="night-one-reveal__point" style={{ '--point-delay': '8.95s' } as CSSProperties}><span className="night-one-reveal__sun-icon" aria-hidden="true"><i /></span><span><strong>Soleil en Sagittaire</strong><small>Vision, liberté, quête de sens</small></span></div>
          <div className="night-one-reveal__point" style={{ '--point-delay': '9.75s' } as CSSProperties}><span className="night-one-reveal__moon-icon" aria-hidden="true"><i /></span><span><strong>Lune en Poissons</strong><small>Intuition, sensibilité profonde</small></span></div>
          <div className="night-one-reveal__point" style={{ '--point-delay': '10.55s' } as CSSProperties}><span className="night-one-reveal__asc-icon" aria-hidden="true">AC</span><span><strong>Ascendant Lion</strong><small>Un rayonnement qui ne passe pas inaperçu</small></span></div>
        </div>
        <button className="night-one-reveal__cta" type="button" onClick={complete} disabled={isCompleting}>{isCompleting ? 'Ouverture…' : 'Découvrir mon thème astral'}</button>
      </main>
      <button className="night-one-reveal__replay" type="button" onClick={replay}>Rejouer</button>
    </section>
  );
}
