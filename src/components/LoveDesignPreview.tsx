import { ArrowRight, Lock, Sparkles } from 'lucide-react';

interface LoveDesignPreviewProps {
  onClosePreview: () => void;
}

// Exemple réel (Bélier × Gémeaux, sextile Feu–Air), tel que la page Love l'affiche.
const SAMPLE = {
  pair: 'Bélier · Gémeaux',
  aspect: 'Sextile · 60°',
  aspectPlain: 'Signes complices',
  lead: 'L’élan du Bélier rencontre la curiosité des Gémeaux.',
  body: 'Le sextile entre le Feu et l’Air rend l’échange vif et léger : l’un donne l’impulsion, l’autre ouvre l’espace, et l’énergie circule presque sans effort.',
};

const PREMIUM = {
  kicker: 'Pour aller plus loin',
  title: 'Votre lien mérite une lecture complète.',
  description: 'Ce score ne lit que vos Soleils. Le rapport complet superpose vos deux cartes du ciel : découvrez si vous êtes faits l’un pour l’autre.',
  cta: 'Rapport complet',
};

const readingOptions = [
  { id: 'current', name: 'A · Actuel', note: 'Nom technique de l’aspect, accroche dorée, texte centré.' },
  { id: 'plain', name: 'B · Langage clair', note: 'Même mise en page, mais « Signes complices » au lieu de « Sextile · 60° ».' },
  { id: 'quote', name: 'C · Citation', note: 'L’accroche devient une citation, guillemet doré, sans jargon.' },
  { id: 'column', name: 'D · Colonne', note: 'Aligné à gauche, filet doré vertical, ton magazine.' },
  { id: 'dropcap', name: 'E · Lettrine', note: 'Texte justifié avec grande lettrine dorée, façon livre.' },
  { id: 'minimal', name: 'F · Minimal', note: 'Aucun titre ni ornement : accroche, filet court, texte.' },
  { id: 'constellation', name: 'G · Constellation', note: 'Accroche en petites capitales espacées, points d’étoiles.' },
];

const premiumOptions = [
  { id: 'current', name: '1 · Actuel', note: 'Carte sombre, bouton dégradé pastel.' },
  { id: 'smoke', name: '2 · Fumée dorée', note: 'Le signal premium de la marque : texture fumée et bouton or.' },
  { id: 'editorial', name: '3 · Éditorial sans cadre', note: 'Centré, posé sur la page, bouton contour doré.' },
  { id: 'teaser', name: '4 · Aperçu flouté', note: 'On devine le rapport derrière un voile, cadenas doré.' },
  { id: 'banner', name: '5 · Bandeau compact', note: 'Une seule ligne, prend peu de place sous le texte.' },
  { id: 'black', name: '6 · Carte noire', note: 'Noir profond, double filet or, très luxe.' },
];

function ReadingSample({ id }: { id: string }) {
  if (id === 'quote') {
    return (
      <div className="ldp-quote">
        <span className="ldp-quote__mark" aria-hidden="true">“</span>
        <p className="ldp-quote__lead">{SAMPLE.lead}</p>
        <p className="ldp-quote__body">{SAMPLE.body}</p>
        <p className="ldp-quote__sign">{SAMPLE.pair}</p>
      </div>
    );
  }
  if (id === 'column') {
    return (
      <div className="ldp-column">
        <p className="ldp-column__kicker">Ce que disent vos Soleils</p>
        <p className="ldp-column__lead">{SAMPLE.lead}</p>
        <p className="ldp-column__body">{SAMPLE.body}</p>
      </div>
    );
  }
  if (id === 'dropcap') {
    return (
      <div className="ldp-dropcap">
        <p className="ldp-dropcap__text" lang="fr">
          <span className="ldp-dropcap__cap"><span>L’</span></span>
          <span className="ldp-dropcap__lead">{SAMPLE.lead.slice(2)}</span>{' '}
          {SAMPLE.body}
        </p>
        <div className="ldp-ornament" aria-hidden="true"><span /></div>
      </div>
    );
  }
  if (id === 'minimal') {
    return (
      <div className="ldp-minimal">
        <p className="ldp-minimal__lead">{SAMPLE.lead}</p>
        <span className="ldp-minimal__rule" aria-hidden="true" />
        <p className="ldp-minimal__body">{SAMPLE.body}</p>
      </div>
    );
  }
  if (id === 'constellation') {
    return (
      <div className="ldp-constellation">
        <p className="ldp-constellation__lead">{SAMPLE.lead}</p>
        <div className="ldp-constellation__stars" aria-hidden="true"><span /><span /><span /></div>
        <p className="ldp-constellation__body">{SAMPLE.body}</p>
      </div>
    );
  }
  return (
    <div className="ldp-reading">
      <p className="ldp-tag">{id === 'plain' ? SAMPLE.aspectPlain : SAMPLE.aspect}</p>
      <p className="ldp-reading__lead">{SAMPLE.lead}</p>
      <p className="ldp-reading__body">{SAMPLE.body}</p>
      <div className="ldp-ornament" aria-hidden="true"><span /></div>
    </div>
  );
}

function PremiumSample({ id }: { id: string }) {
  if (id === 'editorial') {
    return (
      <div className="ldp-premium-editorial">
        <p className="ldp-kicker">{PREMIUM.kicker}</p>
        <p className="ldp-premium-editorial__title">{PREMIUM.title}</p>
        <p className="ldp-premium-editorial__text">{PREMIUM.description}</p>
        <button type="button" className="ldp-button ldp-button--outline">{PREMIUM.cta}<ArrowRight size={13} strokeWidth={1.8} /></button>
      </div>
    );
  }
  if (id === 'teaser') {
    return (
      <div className="ldp-premium-teaser">
        <div className="ldp-premium-teaser__ghost" aria-hidden="true">
          <span>Vénus en Lion trigone Mars en Bélier · 2,4°</span>
          <span>La Lune de l’un tombe dans la maison VII de l’autre…</span>
          <span>Saturne carré Vénus · 1,1° : la fidélité s’apprend…</span>
        </div>
        <div className="ldp-premium-teaser__veil">
          <span className="ldp-premium-teaser__lock"><Lock size={15} strokeWidth={1.6} /></span>
          <p className="ldp-premium-teaser__title">{PREMIUM.title}</p>
          <p className="ldp-premium-teaser__text">{PREMIUM.description}</p>
          <button type="button" className="ldp-button ldp-button--gold">{PREMIUM.cta}<ArrowRight size={13} strokeWidth={1.8} /></button>
        </div>
      </div>
    );
  }
  if (id === 'banner') {
    return (
      <button type="button" className="ldp-premium-banner">
        <span className="ldp-premium-banner__icon"><Sparkles size={16} strokeWidth={1.4} /></span>
        <span className="ldp-premium-banner__copy">
          <span className="ldp-premium-banner__title">{PREMIUM.cta}</span>
          <span className="ldp-premium-banner__text">Découvrez si vous êtes faits l’un pour l’autre.</span>
        </span>
        <span className="ldp-premium-banner__arrow"><ArrowRight size={15} strokeWidth={1.8} /></span>
      </button>
    );
  }
  if (id === 'black') {
    return (
      <div className="ldp-premium-black">
        <p className="ldp-kicker">{PREMIUM.kicker}</p>
        <p className="ldp-premium-black__title">{PREMIUM.title}</p>
        <p className="ldp-premium-black__text">{PREMIUM.description}</p>
        <button type="button" className="ldp-button ldp-button--gold">{PREMIUM.cta}<ArrowRight size={13} strokeWidth={1.8} /></button>
      </div>
    );
  }
  return (
    <div className={`ldp-premium-card${id === 'smoke' ? ' ldp-premium-card--smoke' : ''}`}>
      <div className="ldp-premium-card__head">
        <span className="ldp-premium-card__icon"><Sparkles size={15} strokeWidth={1.35} /></span>
        <div>
          <p className="ldp-kicker ldp-kicker--left">{PREMIUM.kicker}</p>
          <p className="ldp-premium-card__title">{PREMIUM.title}</p>
        </div>
      </div>
      <p className="ldp-premium-card__text">{PREMIUM.description}</p>
      <button type="button" className={`ldp-button ${id === 'smoke' ? 'ldp-button--gold' : 'ldp-button--pastel'}`}>
        {PREMIUM.cta}<ArrowRight size={13} strokeWidth={1.8} />
      </button>
    </div>
  );
}

export default function LoveDesignPreview({ onClosePreview }: LoveDesignPreviewProps) {
  return (
    <main className="ldp-root">
      <style>{`
        .ldp-root {
          min-height: 100vh;
          padding: 0 16px 64px;
          color: #F7E8D6;
          background: radial-gradient(circle at 50% 0%, rgba(218,145,164,.12), transparent 40%), #0B080C;
          font-family: "Playfair Display", Georgia, serif;
        }
        .ldp-header {
          position: sticky;
          top: 0;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          max-width: 1180px;
          margin: 0 auto;
          /* À droite, la place du bouton de thème (fixe) de l'app. */
          padding: 18px 72px 16px 0;
          background: linear-gradient(180deg, rgba(11,8,12,.96) 70%, rgba(11,8,12,0));
        }
        .ldp-heading { margin: 0; font-size: clamp(20px, 4vw, 30px); font-weight: 500; }
        .ldp-subheading { margin: 4px 0 0; color: rgba(240,228,226,.6); font-size: 13px; }
        .ldp-close {
          flex-shrink: 0;
          padding: 9px 14px;
          border: 1px solid rgba(232,199,125,.4);
          border-radius: 999px;
          background: transparent;
          color: #F3DECA;
          font: 600 11px/1 Cinzel, Georgia, serif;
          letter-spacing: .14em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .ldp-section { max-width: 1180px; margin: 26px auto 0; }
        .ldp-section-title {
          margin: 0 0 4px;
          color: #E8C77D;
          font: 600 12px/1.4 Cinzel, Georgia, serif;
          letter-spacing: .2em;
          text-transform: uppercase;
        }
        .ldp-section-note { margin: 0 0 18px; color: rgba(240,228,226,.62); font-size: 14px; line-height: 1.6; }
        .ldp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr)); gap: 18px; }
        .ldp-option-name { margin: 0; font-size: 17px; font-weight: 600; }
        .ldp-option-note { margin: 4px 0 12px; color: rgba(240,228,226,.58); font-size: 13px; line-height: 1.5; }
        .ldp-phone {
          padding: 30px 22px;
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 20px;
          background:
            radial-gradient(ellipse at 50% -8%, rgba(218,145,164,.2), transparent 42%),
            linear-gradient(165deg, #171018 0%, #1B1119 48%, #100C12 100%);
        }

        .ldp-gold-text {
          background: linear-gradient(180deg, #FFF6DF 0%, #EBC77E 55%, #B8843A 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }
        .ldp-kicker {
          margin: 0;
          color: rgba(232,199,125,.88);
          font: 600 10px/1.4 Cinzel, Georgia, serif;
          letter-spacing: .22em;
          text-align: center;
          text-transform: uppercase;
        }
        .ldp-kicker--left { text-align: left; }
        .ldp-ornament { display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 18px; }
        .ldp-ornament::before, .ldp-ornament::after { content: ""; width: 38px; height: 1px; background: linear-gradient(90deg, transparent, rgba(232,199,125,.42)); }
        .ldp-ornament::after { transform: scaleX(-1); }
        .ldp-ornament span { width: 5px; height: 5px; background: #E8C77D; transform: rotate(45deg); box-shadow: 0 0 10px rgba(232,199,125,.4); }

        /* A, B */
        .ldp-reading { text-align: center; }
        .ldp-tag {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          margin: 0 0 16px;
          color: rgba(232,199,125,.88);
          font: 600 10.5px/1.4 Cinzel, Georgia, serif;
          letter-spacing: .24em;
          text-transform: uppercase;
        }
        .ldp-tag::before, .ldp-tag::after { content: ""; width: 34px; height: 1px; background: linear-gradient(90deg, transparent, rgba(232,199,125,.55)); }
        .ldp-tag::after { transform: scaleX(-1); }
        .ldp-reading__lead { margin: 0 0 8px; color: #F3DDB0; font-size: 19px; font-style: italic; font-weight: 500; line-height: 1.42; text-wrap: balance; text-shadow: 0 0 18px rgba(232,199,125,.22); }
        .ldp-reading__body { margin: 0; color: rgba(240,230,226,.74); font-size: 15px; line-height: 1.75; text-wrap: balance; }

        /* C */
        .ldp-quote { position: relative; padding-top: 34px; text-align: center; }
        .ldp-quote__mark {
          position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
          font-size: 86px; font-weight: 600; line-height: 1;
          background: linear-gradient(180deg, #FFF6DF 0%, #EBC77E 55%, #B8843A 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
          opacity: .9;
        }
        .ldp-quote__lead { margin: 0; color: #FFF1DA; font-size: 21px; font-style: italic; line-height: 1.42; text-wrap: balance; }
        .ldp-quote__body { margin: 16px 0 0; color: rgba(240,230,226,.7); font-size: 14.5px; line-height: 1.75; text-wrap: balance; }
        .ldp-quote__sign { margin: 18px 0 0; color: rgba(232,199,125,.82); font: 600 10px/1 Cinzel, Georgia, serif; letter-spacing: .24em; text-transform: uppercase; }
        .ldp-quote__sign::before, .ldp-quote__sign::after { content: " — "; color: rgba(232,199,125,.45); }

        /* D */
        .ldp-column {
          position: relative;
          padding-left: 18px;
          text-align: left;
        }
        .ldp-column::before {
          content: ""; position: absolute; left: 0; top: 2px; bottom: 2px; width: 1px;
          background: linear-gradient(180deg, rgba(232,199,125,0), rgba(232,199,125,.8) 18%, rgba(232,199,125,.8) 70%, rgba(232,199,125,0));
        }
        .ldp-column__kicker { margin: 0 0 12px; color: rgba(232,199,125,.88); font: 600 10px/1.4 Cinzel, Georgia, serif; letter-spacing: .22em; text-transform: uppercase; }
        .ldp-column__lead { margin: 0 0 10px; color: #FFF1DA; font-size: 19px; font-weight: 500; line-height: 1.4; }
        .ldp-column__body { margin: 0; color: rgba(240,230,226,.72); font-size: 14.5px; line-height: 1.75; }

        /* E */
        .ldp-dropcap__text { margin: 0; color: rgba(240,230,226,.76); font-size: 15px; line-height: 1.72; text-align: justify; hyphens: auto; }
        .ldp-dropcap__cap { float: left; margin: .08em .1em 0 0; font-size: 3.4em; font-weight: 600; line-height: .8; filter: drop-shadow(0 0 10px rgba(232,199,125,.3)); }
        .ldp-dropcap__cap span {
          background: linear-gradient(180deg, #FFF6DF 0%, #EBC77E 55%, #B8843A 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
        }
        .ldp-dropcap__lead { color: #F3DDB0; font-style: italic; font-weight: 500; }

        /* F */
        .ldp-minimal { text-align: center; }
        .ldp-minimal__lead { margin: 0; color: #FFF6EA; font-size: 20px; font-style: italic; line-height: 1.42; text-wrap: balance; }
        .ldp-minimal__rule { display: block; width: 28px; height: 1px; margin: 16px auto; background: rgba(232,199,125,.7); }
        .ldp-minimal__body { margin: 0; color: rgba(240,230,226,.66); font-size: 14.5px; line-height: 1.75; text-wrap: balance; }

        /* G */
        .ldp-constellation { text-align: center; }
        .ldp-constellation__lead { margin: 0; color: #EBC77E; font: 600 12.5px/1.9 Cinzel, Georgia, serif; letter-spacing: .16em; text-transform: uppercase; text-wrap: balance; }
        .ldp-constellation__stars { display: flex; justify-content: center; gap: 14px; margin: 16px 0; }
        .ldp-constellation__stars span { width: 3px; height: 3px; border-radius: 50%; background: #FFF3DD; box-shadow: 0 0 8px rgba(255,243,221,.8); }
        .ldp-constellation__stars span:nth-child(2) { transform: translateY(-4px); width: 4px; height: 4px; }
        .ldp-constellation__body { margin: 0; color: rgba(240,230,226,.74); font-size: 15px; font-style: italic; line-height: 1.75; text-wrap: balance; }

        /* Boutons */
        .ldp-button {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; min-height: 44px; margin-top: 16px; padding: 11px 16px;
          border-radius: 999px;
          font: 700 11px/1 Cinzel, Georgia, serif; letter-spacing: .16em; text-transform: uppercase;
          cursor: pointer;
        }
        .ldp-button--pastel { border: 1px solid rgba(255,239,218,.62); background: linear-gradient(100deg, #F4DDC1 0%, #E7B9AE 52%, #C7A7C8 100%); color: #25181E; }
        .ldp-button--gold { border: 1px solid rgba(255,236,190,.7); background: linear-gradient(180deg, #F6DEA4 0%, #D9AA55 60%, #B9833A 100%); color: #21160C; box-shadow: 0 10px 26px rgba(185,131,58,.25), inset 0 1px 0 rgba(255,255,255,.5); }
        .ldp-button--outline { border: 1px solid rgba(232,199,125,.6); background: transparent; color: #F3DECA; }

        /* 1, 2 */
        .ldp-premium-card {
          padding: 17px 16px 16px;
          border: 1px solid rgba(224,177,104,.28);
          border-radius: 8px;
          background: linear-gradient(180deg, rgba(202,128,148,.065), rgba(255,255,255,.008)), rgba(16,10,15,.92);
          box-shadow: 0 18px 46px rgba(0,0,0,.34);
        }
        .ldp-premium-card--smoke {
          border-color: rgba(232,199,125,.5);
          background:
            radial-gradient(ellipse at 15% 0%, rgba(232,199,125,.22), transparent 55%),
            radial-gradient(ellipse at 90% 100%, rgba(201,150,63,.18), transparent 55%),
            radial-gradient(ellipse at 60% 40%, rgba(255,236,190,.06), transparent 40%),
            #120C0A;
          box-shadow: 0 18px 46px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,236,190,.12);
        }
        .ldp-premium-card__head { display: flex; align-items: center; gap: 12px; }
        .ldp-premium-card__icon { display: flex; flex-shrink: 0; align-items: center; justify-content: center; width: 34px; height: 34px; color: #E4BE91; }
        .ldp-premium-card__title { margin: 4px 0 0; color: #FFF8F0; font-size: 20px; font-weight: 500; line-height: 1.15; }
        .ldp-premium-card__text { margin: 12px 0 0; color: rgba(240,230,226,.8); font-size: 14px; line-height: 1.62; }

        /* 3 */
        .ldp-premium-editorial { text-align: center; }
        .ldp-premium-editorial::before { content: ""; display: block; width: 46px; height: 1px; margin: 0 auto 18px; background: rgba(232,199,125,.5); }
        .ldp-premium-editorial__title { margin: 10px 0 0; color: #FFF6EA; font-size: 24px; font-weight: 500; line-height: 1.2; text-wrap: balance; }
        .ldp-premium-editorial__text { margin: 12px 0 0; color: rgba(240,230,226,.72); font-size: 14.5px; line-height: 1.7; text-wrap: balance; }

        /* 4 */
        .ldp-premium-teaser { position: relative; overflow: hidden; border: 1px solid rgba(232,199,125,.3); border-radius: 10px; background: #120C11; }
        .ldp-premium-teaser__ghost { display: grid; gap: 12px; padding: 20px 18px 150px; color: rgba(240,230,226,.8); font-size: 14px; filter: blur(4px); user-select: none; }
        .ldp-premium-teaser__veil {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; justify-content: flex-end; align-items: center;
          padding: 18px 18px 18px;
          text-align: center;
          background: linear-gradient(180deg, rgba(18,12,17,.2) 0%, rgba(18,12,17,.86) 40%, #120C11 70%);
        }
        .ldp-premium-teaser__lock { display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border: 1px solid rgba(232,199,125,.55); border-radius: 50%; color: #EBC77E; }
        .ldp-premium-teaser__title { margin: 12px 0 0; color: #FFF6EA; font-size: 19px; font-weight: 500; line-height: 1.25; }
        .ldp-premium-teaser__text { margin: 8px 0 0; color: rgba(240,230,226,.72); font-size: 13.5px; line-height: 1.6; }

        /* 5 */
        .ldp-premium-banner {
          display: flex; align-items: center; gap: 12px;
          width: 100%; padding: 14px 14px 14px 16px;
          border: 1px solid rgba(232,199,125,.36);
          border-radius: 14px;
          background: linear-gradient(100deg, rgba(232,199,125,.1), rgba(232,199,125,.02)), #140D12;
          color: inherit; text-align: left; cursor: pointer;
        }
        .ldp-premium-banner__icon { display: flex; flex-shrink: 0; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: rgba(232,199,125,.12); color: #EBC77E; }
        .ldp-premium-banner__copy { display: flex; flex: 1; flex-direction: column; gap: 3px; min-width: 0; }
        .ldp-premium-banner__title { color: #FFF3DD; font: 600 12px/1.3 Cinzel, Georgia, serif; letter-spacing: .14em; text-transform: uppercase; }
        .ldp-premium-banner__text { color: rgba(240,230,226,.72); font-size: 13.5px; line-height: 1.4; }
        .ldp-premium-banner__arrow { display: flex; flex-shrink: 0; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(180deg, #F6DEA4, #C9963F); color: #21160C; }

        /* 6 */
        .ldp-premium-black {
          position: relative;
          padding: 24px 20px 20px;
          text-align: center;
          border: 1px solid rgba(232,199,125,.55);
          border-radius: 4px;
          background: #050405;
          box-shadow: inset 0 0 0 4px #050405, inset 0 0 0 5px rgba(232,199,125,.25), 0 22px 50px rgba(0,0,0,.5);
        }
        .ldp-premium-black__title { margin: 12px 0 0; color: #FFF6EA; font-size: 23px; font-weight: 500; line-height: 1.22; text-wrap: balance; }
        .ldp-premium-black__text { margin: 12px 0 0; color: rgba(240,230,226,.7); font-size: 14px; line-height: 1.68; text-wrap: balance; }
      `}</style>

      <header className="ldp-header">
        <div>
          <h1 className="ldp-heading">Page Love · propositions</h1>
          <p className="ldp-subheading">Exemple réel : Bélier × Gémeaux (sextile Feu–Air). Choisis une lettre et un chiffre.</p>
        </div>
        <button type="button" className="ldp-close" onClick={onClosePreview}>Revenir</button>
      </header>

      <section className="ldp-section">
        <h2 className="ldp-section-title">Texte sous le triangle</h2>
        <p className="ldp-section-note">
          « Sextile · 60° » est le nom de l’aspect formé par les deux Soleils : le Bélier et les Gémeaux sont à deux signes l’un de l’autre, soit 60° sur le zodiaque. Les versions B à G le remplacent par des mots simples ou le retirent.
        </p>
        <div className="ldp-grid">
          {readingOptions.map(option => (
            <article key={option.id}>
              <h3 className="ldp-option-name">{option.name}</h3>
              <p className="ldp-option-note">{option.note}</p>
              <div className="ldp-phone"><ReadingSample id={option.id} /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="ldp-section">
        <h2 className="ldp-section-title">Encart premium</h2>
        <p className="ldp-section-note">Même texte partout (le bandeau n’en garde que la dernière phrase) ; seule la mise en forme change.</p>
        <div className="ldp-grid">
          {premiumOptions.map(option => (
            <article key={option.id}>
              <h3 className="ldp-option-name">{option.name}</h3>
              <p className="ldp-option-note">{option.note}</p>
              <div className="ldp-phone"><PremiumSample id={option.id} /></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
