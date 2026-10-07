import { ArrowRight, Sparkles } from 'lucide-react';
import { useId } from 'react';
import './PremiumPortraitCard.css';

interface PremiumPortraitCardProps {
  onExplore?: () => void;
}

export default function PremiumPortraitCard({ onExplore }: PremiumPortraitCardProps) {
  const titleId = useId();
  const statusId = useId();

  return (
    <article className="premium-ivory-card" aria-labelledby={titleId}>
      <img className="premium-ivory-card__art" src="/premium-ivory-art-v1.png" alt="" loading="lazy" decoding="async" />
      <div className="premium-ivory-card__body">
        <p className="premium-ivory-card__brand"><Sparkles aria-hidden="true" size={22} strokeWidth={1.2} /><span>Night One Premium</span></p>
        <h2 id={titleId} className="premium-ivory-card__title">Tu es plus<br />que ton signe.</h2>
        <p className="premium-ivory-card__intro">Explore toute la richesse de ton thème astral.</p>
        <button className="premium-ivory-card__button" type="button" onClick={onExplore} disabled={!onExplore} aria-describedby={!onExplore ? statusId : undefined}>
          <span>Explorer mon thème</span><ArrowRight aria-hidden="true" size={18} strokeWidth={1.5} />
        </button>
        {!onExplore && <p id={statusId} className="premium-ivory-card__status">Accès premium non disponible pour le moment.</p>}
      </div>
    </article>
  );
}
