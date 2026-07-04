import { ArrowLeft } from 'lucide-react';
import './CoStarBackgroundExamplesPage.css';

interface CoStarBackgroundExamplesPageProps {
  onClosePreview: () => void;
}

const examples = [
  {
    id: 'active-red',
    title: 'Rouge actuel',
    tone: 'Intense, dramatique, tres immersif.',
    className: 'costar-bg-example--image-red',
  },
  {
    id: 'blue-moon',
    title: 'Lune bleue sauvegardee',
    tone: 'Froid, premium, plus calme.',
    className: 'costar-bg-example--image-blue',
  },
  {
    id: 'ivory-eclipse',
    title: 'Eclipse ivoire',
    tone: 'Minimal, lumineux, tres lisible.',
    className: 'costar-bg-example--ivory',
  },
  {
    id: 'gold-horizon',
    title: 'Horizon dore',
    tone: 'Luxueux, solaire, moins agressif.',
    className: 'costar-bg-example--gold',
  },
  {
    id: 'red-nebula',
    title: 'Nebuleuse rouge',
    tone: 'Abstrait, dense, sans disque visible.',
    className: 'costar-bg-example--nebula',
  },
  {
    id: 'ghost-map',
    title: 'Carte fantome',
    tone: 'Astrologique, discret, interactif.',
    className: 'costar-bg-example--map',
  },
  {
    id: 'soft-black-hole',
    title: 'Trou noir doux',
    tone: 'Moderne, spatial, un peu plus sci-fi.',
    className: 'costar-bg-example--black-hole',
  },
];

export default function CoStarBackgroundExamplesPage({ onClosePreview }: CoStarBackgroundExamplesPageProps) {
  return (
    <main className="costar-bg-examples-page">
      <header className="costar-bg-examples-header">
        <button type="button" className="costar-bg-examples-back" onClick={onClosePreview}>
          <ArrowLeft size={18} />
          <span>Retour</span>
        </button>
        <div>
          <p>CoStar background lab</p>
          <h1>Exemples de fonds</h1>
        </div>
      </header>

      <section className="costar-bg-examples-grid" aria-label="Exemples de fonds CoStar">
        {examples.map((example) => (
          <article className="costar-bg-example" key={example.id}>
            <div className={`costar-bg-example__visual ${example.className}`} aria-hidden="true">
              <span className="costar-bg-example__phone-top" />
              <span className="costar-bg-example__copy costar-bg-example__copy--main" />
              <span className="costar-bg-example__copy costar-bg-example__copy--sub" />
              <span className="costar-bg-example__card" />
            </div>
            <div className="costar-bg-example__body">
              <h2>{example.title}</h2>
              <p>{example.tone}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
