import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft } from 'lucide-react';
import './OnboardingFinalReveal.css';

const FINAL_PLANET_SRC = '/assets/onboarding/final-volcanic-planet.png';
const PARTICLE_COUNT = 16;

type OnboardingFinalRevealProps = {
  onComplete: () => Promise<void> | void;
  onBack: () => void;
};

export default function OnboardingFinalReveal({ onComplete, onBack }: OnboardingFinalRevealProps) {
  const [isRevealing, setIsRevealing] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setPrefersReducedMotion(query.matches);
    syncPreference();
    query.addEventListener('change', syncPreference);
    return () => query.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
  }, []);

  const particles = useMemo(() => (
    Array.from({ length: PARTICLE_COUNT }, (_, index) => {
      const angle = (index / PARTICLE_COUNT) * Math.PI * 2 + (index % 3) * 0.18;
      const distance = 120 + (index % 5) * 26;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance * 0.82;

      return {
        '--particle-x': `${x.toFixed(1)}px`,
        '--particle-y': `${y.toFixed(1)}px`,
        '--particle-delay': `${80 + index * 28}ms`,
      } as CSSProperties;
    })
  ), []);

  const handleReveal = () => {
    if (isRevealing) return;
    setIsRevealing(true);

    if ('vibrate' in navigator) {
      navigator.vibrate(prefersReducedMotion ? 18 : [16, 28, 20]);
    }

    timeoutRef.current = window.setTimeout(async () => {
      try {
        await onComplete();
      } catch {
        setIsRevealing(false);
      }
    }, prefersReducedMotion ? 260 : 1320);
  };

  return (
    <section className={`final-reveal${isRevealing ? ' is-revealing' : ''}`} aria-label="Votre ciel est pret">
      <div className="final-reveal__next-preview" aria-hidden="true" />
      <div className="final-reveal__background" aria-hidden="true" />
      <div className="final-reveal__stars" aria-hidden="true" />
      <div className="final-reveal__back-glow" aria-hidden="true" />

      <button
        type="button"
        className="final-reveal__back-button"
        onClick={onBack}
        disabled={isRevealing}
        aria-label="Retour au recapitulatif"
      >
        <ArrowLeft size={18} strokeWidth={1.6} />
      </button>

      <div className="final-reveal__planet-stage">
        <button
          type="button"
          className="final-reveal__planet-button"
          onClick={handleReveal}
          disabled={isRevealing}
          aria-label="Activer la planete et entrer dans mon univers astrologique"
        >
          <span className="final-reveal__planet-aura" aria-hidden="true" />
          <img src={FINAL_PLANET_SRC} alt="" className="final-reveal__planet" draggable="false" />
          <img src={FINAL_PLANET_SRC} alt="" className="final-reveal__planet-glow-layer" draggable="false" aria-hidden="true" />
          <span className="final-reveal__scar-glow" aria-hidden="true" />
          <span className="final-reveal__center-flash" aria-hidden="true" />
        </button>

        <div className="final-reveal__energy-rings" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="final-reveal__particles" aria-hidden="true">
          {particles.map((style, index) => (
            <span key={index} style={style} />
          ))}
        </div>
      </div>

      <div className="final-reveal__portal" aria-hidden="true" />

      <div className="final-reveal__content">
        <p className="final-reveal__kicker">Nightstar</p>
        <h1>Votre ciel est prêt</h1>
        <p>Votre univers astrologique peut maintenant se révéler.</p>
        <button
          type="button"
          className="final-reveal__cta"
          onClick={handleReveal}
          disabled={isRevealing}
          aria-label="Entrer dans mon univers astrologique"
        >
          Entrer dans mon univers
        </button>
      </div>
    </section>
  );
}
