import { Crown, Heart, Home, Orbit, Sparkles, UserRound, UsersRound } from 'lucide-react';
import './CoStarPagePreview.css';

interface CoStarPagePreviewProps {
  onClosePreview: () => void;
}

const previewAspects = [
  {
    colorClass: 'costar-preview-dot-moon',
    title: 'La Lune défie ta Vénus natale d\'un carré serré.',
    body: 'L\'effort demandé dépasse ce que tu attendais. Cherche un équilibre clair entre tes désirs immédiats et tes engagements.',
  },
  {
    colorClass: 'costar-preview-dot-mars',
    title: 'Mars trigone ton Soleil.',
    body: 'Une énergie vitale revient au premier plan. C\'est un excellent moment pour lancer une intention concrète.',
  },
];

export default function CoStarPagePreview({ onClosePreview }: CoStarPagePreviewProps) {
  return (
    <div className="costar-preview-root">
      <div className="costar-preview-bg-glow" aria-hidden="true" />

      <header className="costar-preview-header">
        <button type="button" className="costar-preview-back" onClick={onClosePreview}>
          Retour
        </button>
        <span className="costar-preview-badge">PREVIEW</span>
      </header>

      <main className="costar-preview-content">
        <section className="costar-preview-hero" aria-label="Éclipse astrale">
          <img
            className="costar-preview-sun-image"
            src="/costar-solar-premium-background.png"
            alt="Ciel étoilé avec constellations"
          />
        </section>

        <section className="costar-preview-energy" aria-label="Énergie du jour">
          <p className="costar-preview-kicker">TON ÉNERGIE DU JOUR</p>
          <h1 className="costar-preview-title">
            Direct et sans filtre <span>quelque chose vaut la peine d\'être remarqué.</span>
          </h1>
        </section>

        <hr className="costar-preview-divider" />

        <section aria-label="Résumé de la journée">
          <p className="costar-preview-kicker">TA JOURNÉE EN UN COUP D\'ŒIL</p>

          <div className="costar-preview-list">
            {previewAspects.map((aspect) => (
              <article key={aspect.title} className="costar-preview-item">
                <span className={`costar-preview-dot ${aspect.colorClass}`} aria-hidden="true" />
                <div>
                  <h2>{aspect.title}</h2>
                  <p>{aspect.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <nav className="costar-preview-nav" aria-label="Navigation principale">
        <button type="button" className="costar-preview-nav-item is-active">
          <Home size={18} />
          <span>Home</span>
        </button>
        <button type="button" className="costar-preview-nav-item">
          <UsersRound size={18} />
          <span>Friends</span>
        </button>
        <button type="button" className="costar-preview-nav-item">
          <Orbit size={18} />
          <span>Void</span>
        </button>
        <button type="button" className="costar-preview-nav-item">
          <Heart size={18} />
          <span>Love</span>
        </button>
        <button type="button" className="costar-preview-nav-item">
          <UserRound size={18} />
          <span>You</span>
        </button>
        <button type="button" className="costar-preview-nav-item">
          <Crown size={18} />
          <span>Premium</span>
        </button>
      </nav>

      <div className="costar-preview-stars" aria-hidden="true">
        <Sparkles size={16} />
        <Sparkles size={10} />
        <Sparkles size={14} />
      </div>
    </div>
  );
}
