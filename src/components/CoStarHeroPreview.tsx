import './CoStarHeroPreview.css';

interface CoStarHeroPreviewProps {
  userName?: string;
  onClosePreview: () => void;
}

export default function CoStarHeroPreview({ userName = 'Voyageur', onClosePreview }: CoStarHeroPreviewProps) {
  return (
    <section className="costar-hero-preview" aria-label="Hero Co-Star">
      <div className="costar-hero-stars" aria-hidden="true" />

      <header className="costar-hero-header">
        <button type="button" className="costar-hero-back" onClick={onClosePreview}>
          Retour
        </button>
        <span className="costar-hero-chip">HERO ONLY</span>
      </header>

      <div className="costar-hero-content">
        <img
          className="costar-hero-sun"
          src="/costar-sun.png"
          alt="Soleil mystique"
        />

        <h1 className="costar-hero-title">Bonjour, {userName}</h1>
        <p className="costar-hero-subtitle">Une clarté rare traverse ton ciel aujourd'hui.</p>
      </div>
    </section>
  );
}
