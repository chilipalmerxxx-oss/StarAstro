import { useState } from 'react';
import { ChevronLeft, Share2 } from 'lucide-react';
import './TestCompatibilityPage.css';

interface TestCompatibilityPageProps {
  imageSrc: string;
}

export default function TestCompatibilityPage({ imageSrc }: TestCompatibilityPageProps) {
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
    window.setTimeout(() => setToastVisible(false), 1400);
  };

  return (
    <main className="compat-test-stage">
      <section className="compat-test-phone" aria-label="Apercu mobile Nightstar">
        <div className="compat-test-screen">
          <div className="compat-test-stars" aria-hidden="true" />

          <header className="compat-test-topbar">
            <button className="compat-test-icon-btn" type="button" aria-label="Retour">
              <ChevronLeft size={20} strokeWidth={1.8} />
            </button>
            <div className="compat-test-brand">Nightstar</div>
            <button className="compat-test-icon-btn" type="button" aria-label="Partager">
              <Share2 size={18} strokeWidth={1.8} />
            </button>
          </header>

          <section className="compat-test-hero" data-od-id="compatibility-header">
            <p className="compat-test-eyebrow">Rapport de compatibilite</p>
            <h1>Belier x Verseau</h1>
            <p className="compat-test-summary">
              Une attraction vive, mentale et magnetique, portee par un lien astral qui reste visible au centre du rapport.
            </p>
          </section>

          <section className="compat-test-art-card" data-od-id="compatibility-artwork">
            <img
              src={imageSrc}
              alt="Illustration premium de compatibilite astrale entre Belier et Verseau"
            />
            <div className="compat-test-link" aria-label="Lien entre les deux signes">
              <div className="compat-test-sign">
                <div className="compat-test-glyph">♈</div>
                <span>Belier</span>
              </div>
              <div className="compat-test-infinity" aria-hidden="true">
                <svg viewBox="0 0 120 54" role="img">
                  <defs>
                    <linearGradient id="compatTestLinkGradient" x1="0" x2="1">
                      <stop offset="0%" stopColor="oklch(69% 0.18 350)" />
                      <stop offset="52%" stopColor="oklch(92% 0.11 88)" />
                      <stop offset="100%" stopColor="oklch(76% 0.12 205)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 27 C25 3 48 3 60 27 C72 51 95 51 108 27 C95 3 72 3 60 27 C48 51 25 51 12 27Z"
                    fill="none"
                    stroke="url(#compatTestLinkGradient)"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 27 C25 3 48 3 60 27 C72 51 95 51 108 27"
                    fill="none"
                    stroke="white"
                    strokeOpacity="0.5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="compat-test-sign">
                <div className="compat-test-glyph">♒</div>
                <span>Verseau</span>
              </div>
            </div>
          </section>

          <section className="compat-test-score-card" data-od-id="compatibility-score">
            <div className="compat-test-score">89</div>
            <div className="compat-test-score-copy">
              <strong>Etincelle vive</strong>
              <p>
                Le feu du Belier active la vision du Verseau : la connexion demarre vite,
                puis demande un langage commun.
              </p>
            </div>
          </section>

          <section className="compat-test-metrics" data-od-id="compatibility-metrics">
            <div className="compat-test-metric"><b>92</b><span>Desir immediat</span></div>
            <div className="compat-test-metric"><b>87</b><span>Connexion mentale</span></div>
            <div className="compat-test-metric"><b>84</b><span>Potentiel durable</span></div>
          </section>

          <section className="compat-test-reading" data-od-id="compatibility-reading">
            <h2>Lecture astrale</h2>
            <p>
              Votre duo fonctionne comme une impulsion et une vision : l'un declenche,
              l'autre elargit. Le lien est fort quand chacun garde sa liberte sans couper
              la presence de l'autre.
            </p>
          </section>

          <div className="compat-test-actions">
            <button type="button" onClick={showToast}>Sauvegarder le rapport</button>
            <button
              className="compat-test-ghost"
              type="button"
              onClick={showToast}
              aria-label="Copier le resume"
            >
              <Share2 size={18} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </section>

      <div
        className={`compat-test-toast ${toastVisible ? 'is-visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        Rapport pret a integrer
      </div>
    </main>
  );
}
