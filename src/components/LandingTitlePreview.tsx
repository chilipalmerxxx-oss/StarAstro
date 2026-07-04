interface LandingTitlePreviewProps {
  onClosePreview: () => void;
}

const titleOptions = [
  {
    id: 'current-gold',
    name: 'Gravure actuelle',
    note: 'La base actuelle, luxe discret',
  },
  {
    id: 'eclipse-crown',
    name: 'Couronne d’éclipse',
    note: 'Plus solaire, plus cérémoniel',
  },
  {
    id: 'lunar-silver',
    name: 'Argent lunaire',
    note: 'Plus froid, plus nocturne',
  },
  {
    id: 'obsidian-foil',
    name: 'Feuille d’obsidienne',
    note: 'Très luxe, sombre et doré',
  },
  {
    id: 'astral-outline',
    name: 'Contour astral',
    note: 'Léger, moderne, presque gravé',
  },
  {
    id: 'solar-ember',
    name: 'Braise solaire',
    note: 'Plus chaud, plus vivant',
  },
  {
    id: 'couture-minimal',
    name: 'Couture minimal',
    note: 'Mode, très espacé, très clean',
  },
  {
    id: 'ancient-oracle',
    name: 'Oracle ancien',
    note: 'Plus rituel, plus antique',
  },
  {
    id: 'spectral-glass',
    name: 'Verre spectral',
    note: 'Éthéré, transparent, premium',
  },
  {
    id: 'observatory',
    name: 'Observatoire',
    note: 'Instrument astronomique, précis',
  },
  {
    id: 'black-sun',
    name: 'Soleil noir',
    note: 'Fort, intense, très marque',
  },
  {
    id: 'starlit-script',
    name: 'Étoile gravée',
    note: 'Plus poétique, mais encore sobre',
  },
];

function TitleSample({ id }: { id: string }) {
  return (
    <div className={`ltp-sample ltp-sample--${id}`}>
      <div className="ltp-title-wrap" aria-hidden>
        <div className="ltp-brand-rule" />
        <div className={`ltp-brand-title ltp-brand-title--${id}`}>NIGHTSTAR</div>
        <div className="ltp-brand-rule" />
        <div className="ltp-mini-sigil">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export default function LandingTitlePreview({ onClosePreview }: LandingTitlePreviewProps) {
  return (
    <main className="ltp-root">
      <style>{`
        .ltp-root {
          min-height: 100vh;
          padding: 32px 18px 48px;
          color: #F7E8C3;
          background:
            radial-gradient(circle at 50% 0%, rgba(255,164,52,0.13), transparent 34%),
            radial-gradient(circle at 50% 54%, rgba(255,198,96,0.08), transparent 38%),
            #050506;
          font-family: 'Cormorant Garamond', serif;
        }
        .ltp-header {
          position: sticky;
          top: 0;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          max-width: 1180px;
          margin: 0 auto 28px;
          padding: 14px 0 20px;
          background: linear-gradient(180deg, rgba(5,5,6,0.94), rgba(5,5,6,0));
          backdrop-filter: blur(8px);
        }
        .ltp-heading {
          margin: 0;
          font-size: clamp(25px, 5vw, 42px);
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .ltp-kicker {
          margin: 4px 0 0;
          color: rgba(247,232,195,0.58);
          font-family: Raleway, sans-serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .ltp-close {
          min-width: 40px;
          height: 40px;
          border: 1px solid rgba(255,226,168,0.28);
          border-radius: 999px;
          color: rgba(255,238,198,0.9);
          background: rgba(255,255,255,0.04);
          cursor: pointer;
          font-size: 22px;
          line-height: 1;
        }
        .ltp-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          max-width: 1180px;
          margin: 0 auto;
        }
        .ltp-card {
          min-height: 245px;
          border: 1px solid rgba(255,226,168,0.16);
          border-radius: 8px;
          background:
            radial-gradient(circle at 50% 32%, rgba(255,210,128,0.10), transparent 42%),
            linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.016));
          box-shadow: 0 20px 50px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.08);
          overflow: hidden;
        }
        .ltp-sample {
          position: relative;
          display: flex;
          min-height: 162px;
          align-items: center;
          justify-content: center;
          padding: 28px 18px 18px;
          background:
            radial-gradient(ellipse at center, rgba(0,0,0,0.34), transparent 70%),
            linear-gradient(180deg, rgba(255,255,255,0.018), transparent);
          overflow: hidden;
        }
        .ltp-sample::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.08;
          background-image:
            linear-gradient(rgba(255,226,168,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,226,168,0.14) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(circle at center, black, transparent 74%);
        }
        .ltp-title-wrap {
          position: relative;
          z-index: 1;
          width: min(92%, 320px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 9px;
        }
        .ltp-brand-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,232,176,0.72), transparent);
          box-shadow: 0 0 12px rgba(255,210,128,0.12);
        }
        .ltp-brand-title {
          position: relative;
          width: 100%;
          text-align: center;
          line-height: 0.95;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .ltp-mini-sigil {
          position: relative;
          width: 96px;
          height: 18px;
        }
        .ltp-mini-sigil::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
          transform: translateY(-50%);
          background: linear-gradient(90deg, transparent, rgba(255,232,176,0.42), transparent);
        }
        .ltp-mini-sigil span {
          position: absolute;
          top: 50%;
          width: 3px;
          height: 3px;
          border-radius: 999px;
          background: rgba(255,232,176,0.58);
          transform: translateY(-50%);
          box-shadow: 0 0 8px rgba(255,210,128,0.18);
        }
        .ltp-mini-sigil span:nth-child(1) { left: 24px; }
        .ltp-mini-sigil span:nth-child(2) { left: 50%; width: 5px; height: 5px; transform: translate(-50%, -50%); }
        .ltp-mini-sigil span:nth-child(3) { right: 24px; }
        .ltp-meta {
          padding: 16px 18px 18px;
          border-top: 1px solid rgba(255,226,168,0.10);
        }
        .ltp-name {
          margin: 0;
          color: rgba(255,239,203,0.94);
          font-size: 18px;
          letter-spacing: 0.04em;
        }
        .ltp-note {
          margin: 5px 0 0;
          color: rgba(247,232,195,0.58);
          font-family: Raleway, sans-serif;
          font-size: 12px;
          line-height: 1.45;
        }
        .ltp-brand-title--current-gold {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(30px, 4.2vw, 42px);
          font-weight: 500;
          letter-spacing: 0.23em;
          text-indent: 0.23em;
          background: linear-gradient(180deg, #FFF4CD 0%, #E3C57A 48%, #A9782D 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.54)) drop-shadow(0 0 12px rgba(255,210,128,0.14));
        }
        .ltp-brand-title--eclipse-crown {
          font-family: Cinzel, serif;
          font-size: clamp(28px, 4vw, 39px);
          font-weight: 300;
          letter-spacing: 0.20em;
          text-indent: 0.20em;
          color: #FFE7AE;
          text-shadow: 0 0 18px rgba(255,184,76,0.35), 0 1px 2px rgba(0,0,0,0.7);
        }
        .ltp-brand-title--eclipse-crown::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 70px;
          height: 70px;
          border-radius: 999px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(0,0,0,0.88) 0 34%, rgba(255,193,92,0.24) 36% 41%, rgba(255,226,168,0.34) 42% 45%, transparent 54%);
          z-index: -1;
        }
        .ltp-brand-title--lunar-silver {
          font-family: 'Playfair Display', serif;
          font-size: clamp(31px, 4.2vw, 43px);
          font-weight: 300;
          letter-spacing: 0.18em;
          text-indent: 0.18em;
          background: linear-gradient(180deg, #FFFFFF 0%, #C9D4E8 46%, #73819E 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 18px rgba(180,205,255,0.16);
        }
        .ltp-brand-title--obsidian-foil {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 4.3vw, 45px);
          font-weight: 500;
          letter-spacing: 0.15em;
          text-indent: 0.15em;
          color: #0A0704;
          -webkit-text-stroke: 0.8px rgba(255,223,154,0.78);
          text-shadow: 0 0 2px rgba(255,244,212,0.44), 0 0 28px rgba(255,176,68,0.14);
        }
        .ltp-brand-title--astral-outline {
          font-family: Raleway, sans-serif;
          font-size: clamp(25px, 3.7vw, 36px);
          font-weight: 200;
          letter-spacing: 0.30em;
          text-indent: 0.30em;
          color: transparent;
          -webkit-text-stroke: 0.8px rgba(255,232,176,0.70);
          text-shadow: 0 0 18px rgba(255,210,128,0.10);
        }
        .ltp-brand-title--solar-ember {
          font-family: Marcellus, serif;
          font-size: clamp(29px, 4.1vw, 41px);
          font-weight: 400;
          letter-spacing: 0.17em;
          text-indent: 0.17em;
          background: linear-gradient(180deg, #FFF1B7 0%, #FF9A3D 52%, #9E2F12 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 16px rgba(255,112,34,0.22));
        }
        .ltp-brand-title--couture-minimal {
          font-family: Raleway, sans-serif;
          font-size: clamp(22px, 3.4vw, 32px);
          font-weight: 100;
          letter-spacing: 0.42em;
          text-indent: 0.42em;
          color: rgba(255,242,214,0.90);
          text-shadow: 0 1px 2px rgba(0,0,0,0.7);
        }
        .ltp-brand-title--ancient-oracle {
          font-family: Cinzel, serif;
          font-size: clamp(27px, 3.9vw, 38px);
          font-weight: 300;
          letter-spacing: 0.16em;
          text-indent: 0.16em;
          color: #EED89D;
          text-shadow: 0 1px 0 rgba(255,255,255,0.12), 0 2px 0 rgba(66,35,8,0.8), 0 0 18px rgba(255,204,118,0.10);
        }
        .ltp-brand-title--spectral-glass {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(31px, 4.2vw, 43px);
          font-weight: 300;
          letter-spacing: 0.21em;
          text-indent: 0.21em;
          color: rgba(255,255,255,0.10);
          -webkit-text-stroke: 0.7px rgba(255,244,220,0.52);
          text-shadow: 0 0 24px rgba(255,244,220,0.18), 0 0 4px rgba(255,255,255,0.18);
        }
        .ltp-brand-title--observatory {
          font-family: 'Josefin Sans', sans-serif;
          font-size: clamp(25px, 3.7vw, 36px);
          font-weight: 200;
          letter-spacing: 0.26em;
          text-indent: 0.26em;
          color: rgba(255,232,176,0.90);
          text-shadow: 0 0 14px rgba(255,210,128,0.10);
        }
        .ltp-brand-title--observatory::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -9px;
          width: 64%;
          height: 1px;
          transform: translateX(-50%);
          background: repeating-linear-gradient(90deg, rgba(255,232,176,0.55) 0 1px, transparent 1px 9px);
        }
        .ltp-brand-title--black-sun {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(34px, 4.5vw, 48px);
          font-weight: 500;
          letter-spacing: 0.12em;
          text-indent: 0.12em;
          color: #090908;
          -webkit-text-stroke: 1px rgba(255,214,140,0.85);
          text-shadow: 0 0 18px rgba(255,166,54,0.22), 0 0 2px rgba(255,244,212,0.34);
        }
        .ltp-brand-title--black-sun::before,
        .ltp-brand-title--black-sun::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          border-radius: 999px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: -1;
        }
        .ltp-brand-title--black-sun::before {
          width: 92px;
          height: 92px;
          background: radial-gradient(circle, rgba(255,178,70,0.26), transparent 60%);
        }
        .ltp-brand-title--black-sun::after {
          width: 42px;
          height: 42px;
          background: #050506;
          border: 1px solid rgba(255,214,140,0.20);
        }
        .ltp-brand-title--starlit-script {
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px, 4.2vw, 42px);
          font-weight: 300;
          font-style: italic;
          letter-spacing: 0.13em;
          text-indent: 0.13em;
          color: #F8E6B8;
          text-shadow: 0 0 10px rgba(255,224,158,0.16), 0 1px 2px rgba(0,0,0,0.62);
        }
        .ltp-brand-title--starlit-script::after {
          content: '✦';
          position: absolute;
          right: 5%;
          top: -8px;
          color: rgba(255,232,176,0.72);
          font-size: 12px;
          font-style: normal;
          text-shadow: 0 0 12px rgba(255,210,128,0.34);
        }
        @media (max-width: 920px) {
          .ltp-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 600px) {
          .ltp-root {
            padding: 22px 12px 36px;
          }
          .ltp-header {
            align-items: flex-start;
            margin-bottom: 18px;
          }
          .ltp-grid {
            grid-template-columns: 1fr;
          }
          .ltp-card {
            min-height: 226px;
          }
          .ltp-title-wrap {
            width: min(94%, 320px);
          }
        }
      `}</style>

      <header className="ltp-header">
        <div>
          <h1 className="ltp-heading">Titres</h1>
          <p className="ltp-kicker">Choix du mot NIGHTSTAR</p>
        </div>
        <button className="ltp-close" type="button" onClick={onClosePreview} aria-label="Fermer la preview">
          ×
        </button>
      </header>

      <section className="ltp-grid" aria-label="Options de design du titre NIGHTSTAR">
        {titleOptions.map(option => (
          <article className="ltp-card" key={option.id}>
            <TitleSample id={option.id} />
            <div className="ltp-meta">
              <h2 className="ltp-name">{option.name}</h2>
              <p className="ltp-note">{option.note}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
