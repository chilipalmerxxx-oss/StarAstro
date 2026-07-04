interface LandingOrnamentPreviewProps {
  onClosePreview: () => void;
}

const ornamentOptions = [
  {
    id: 'native-wheel',
    title: 'Mini roue natale',
    description: 'Le plus clair pour rappeler le thème astral',
  },
  {
    id: 'constellation',
    title: 'Constellation géométrique',
    description: 'Plus poétique, plus aérien',
  },
  {
    id: 'eclipse-seal',
    title: 'Sceau d’éclipse',
    description: 'Sombre, intense, proche du portail',
  },
  {
    id: 'axis-mundi',
    title: 'Axis mundi',
    description: 'Très minimal, vertical, presque sacré',
  },
  {
    id: 'astral-trigram',
    title: 'Trigramme astral',
    description: 'Plus symbolique, comme une marque secrète',
  },
  {
    id: 'celestial-arc',
    title: 'Arc céleste',
    description: 'Fin, doux, comme un instrument ancien',
  },
  {
    id: 'mini-dial',
    title: 'Mini cadran',
    description: 'Raffiné, observatoire, astrolabe',
  },
  {
    id: 'double-orbit',
    title: 'Orbite double',
    description: 'Plus dynamique, plus cosmique',
  },
  {
    id: 'current-sigil',
    title: 'Sigil actuel',
    description: 'Celui en place sur la landing',
  },
];

function Ornament({ id }: { id: string }) {
  return (
    <div className={`lop-ornament lop-ornament--${id}`} aria-hidden>
      {id === 'native-wheel' && (
        <>
          <span className="lop-wheel" />
          {Array.from({ length: 12 }, (_, index) => (
            <span key={index} className="lop-wheel-tick" style={{ transform: `translate(-50%, -50%) rotate(${index * 30}deg)` }} />
          ))}
        </>
      )}

      {id === 'constellation' && (
        <>
          <span className="lop-const-line lop-const-line--a" />
          <span className="lop-const-line lop-const-line--b" />
          <span className="lop-const-line lop-const-line--c" />
          <span className="lop-const-dot lop-const-dot--a" />
          <span className="lop-const-dot lop-const-dot--b" />
          <span className="lop-const-dot lop-const-dot--c" />
          <span className="lop-const-dot lop-const-dot--d" />
        </>
      )}

      {id === 'eclipse-seal' && (
        <>
          <span className="lop-eclipse" />
          <span className="lop-eclipse-ring lop-eclipse-ring--a" />
          <span className="lop-eclipse-ring lop-eclipse-ring--b" />
        </>
      )}

      {id === 'axis-mundi' && (
        <>
          <span className="lop-axis-line" />
          <span className="lop-axis-core" />
          <span className="lop-axis-dot lop-axis-dot--top" />
          <span className="lop-axis-dot lop-axis-dot--bottom" />
        </>
      )}

      {id === 'astral-trigram' && (
        <>
          <span className="lop-trigram-line lop-trigram-line--top" />
          <span className="lop-trigram-line lop-trigram-line--middle" />
          <span className="lop-trigram-line lop-trigram-line--bottom" />
          <span className="lop-trigram-core" />
        </>
      )}

      {id === 'celestial-arc' && (
        <>
          <span className="lop-arc-base" />
          <span className="lop-arc" />
          <span className="lop-arc-dot lop-arc-dot--left" />
          <span className="lop-arc-dot lop-arc-dot--center" />
          <span className="lop-arc-dot lop-arc-dot--right" />
        </>
      )}

      {id === 'mini-dial' && (
        <>
          <span className="lop-dial-arc" />
          {Array.from({ length: 7 }, (_, index) => (
            <span key={index} className="lop-dial-tick" style={{ transform: `translateX(-50%) rotate(${-54 + index * 18}deg)` }} />
          ))}
          <span className="lop-dial-core" />
        </>
      )}

      {id === 'double-orbit' && (
        <>
          <span className="lop-orbit lop-orbit--a" />
          <span className="lop-orbit lop-orbit--b" />
          <span className="lop-orbit-core" />
          <span className="lop-orbit-dot" />
        </>
      )}

      {id === 'current-sigil' && (
        <>
          <span className="lop-current-dot lop-current-dot--left" />
          <span className="lop-current-tick lop-current-tick--left" />
          <span className="lop-current-core" />
          <span className="lop-current-tick lop-current-tick--right" />
          <span className="lop-current-dot lop-current-dot--right" />
        </>
      )}
    </div>
  );
}

export default function LandingOrnamentPreview({ onClosePreview }: LandingOrnamentPreviewProps) {
  return (
    <main className="lop-root">
      <style>{`
        .lop-root {
          min-height: 100vh;
          padding: 32px 18px 48px;
          color: #F7E8C3;
          background:
            radial-gradient(circle at 50% 0%, rgba(255,164,52,0.14), transparent 34%),
            radial-gradient(circle at 50% 52%, rgba(255,198,96,0.08), transparent 36%),
            #050506;
          font-family: 'Cormorant Garamond', serif;
        }
        .lop-header {
          position: sticky;
          top: 0;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          max-width: 1120px;
          margin: 0 auto 28px;
          padding: 14px 0 20px;
          background: linear-gradient(180deg, rgba(5,5,6,0.94), rgba(5,5,6,0));
          backdrop-filter: blur(8px);
        }
        .lop-title {
          margin: 0;
          font-size: clamp(25px, 5vw, 42px);
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .lop-kicker {
          margin: 4px 0 0;
          color: rgba(247,232,195,0.58);
          font-family: Raleway, sans-serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .lop-close {
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
        .lop-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          max-width: 1120px;
          margin: 0 auto;
        }
        .lop-card {
          min-height: 230px;
          border: 1px solid rgba(255,226,168,0.16);
          border-radius: 8px;
          background:
            radial-gradient(circle at 50% 30%, rgba(255,210,128,0.10), transparent 42%),
            linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.016));
          box-shadow: 0 20px 50px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.08);
          overflow: hidden;
        }
        .lop-sample {
          display: flex;
          min-height: 150px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 24px 18px 18px;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.30), transparent 70%);
        }
        .lop-brand {
          width: min(82%, 280px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .lop-brand-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,232,176,0.72), transparent);
          box-shadow: 0 0 12px rgba(255,210,128,0.12);
        }
        .lop-brand-word {
          font-size: clamp(24px, 3vw, 34px);
          line-height: 0.95;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-indent: 0.22em;
          background: linear-gradient(180deg, #FFF4CD 0%, #DDBE70 54%, #9F6F25 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5));
        }
        .lop-meta {
          padding: 16px 18px 18px;
          border-top: 1px solid rgba(255,226,168,0.10);
        }
        .lop-name {
          margin: 0;
          color: rgba(255,239,203,0.94);
          font-size: 18px;
          letter-spacing: 0.04em;
        }
        .lop-description {
          margin: 5px 0 0;
          color: rgba(247,232,195,0.58);
          font-family: Raleway, sans-serif;
          font-size: 12px;
          line-height: 1.45;
        }
        .lop-ornament {
          position: relative;
          width: 210px;
          height: 34px;
        }
        .lop-ornament::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
          transform: translateY(-50%);
          background: linear-gradient(90deg, transparent, rgba(255,218,142,0.18), rgba(255,232,176,0.56), rgba(255,218,142,0.18), transparent);
          box-shadow: 0 0 12px rgba(255,200,110,0.12);
        }
        .lop-wheel {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 26px;
          height: 26px;
          border: 1px solid rgba(255,232,176,0.68);
          border-radius: 999px;
          transform: translate(-50%, -50%);
          box-shadow: inset 0 0 10px rgba(255,232,176,0.08), 0 0 16px rgba(255,210,128,0.20);
        }
        .lop-wheel::before {
          content: '';
          position: absolute;
          inset: 6px;
          border: 1px solid rgba(255,232,176,0.30);
          border-radius: inherit;
        }
        .lop-wheel-tick {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 1px;
          height: 34px;
          background: linear-gradient(180deg, rgba(255,232,176,0.58) 0 8%, transparent 8% 92%, rgba(255,232,176,0.58) 92% 100%);
          transform-origin: center;
        }
        .lop-const-line {
          position: absolute;
          height: 1px;
          background: rgba(255,232,176,0.38);
          transform-origin: left center;
          box-shadow: 0 0 10px rgba(255,210,128,0.14);
        }
        .lop-const-line--a { left: 62px; top: 18px; width: 34px; transform: rotate(-18deg); }
        .lop-const-line--b { left: 94px; top: 8px; width: 38px; transform: rotate(28deg); }
        .lop-const-line--c { left: 128px; top: 26px; width: 30px; transform: rotate(-14deg); }
        .lop-const-dot {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: rgba(255,232,176,0.78);
          box-shadow: 0 0 13px rgba(255,210,128,0.32);
        }
        .lop-const-dot--a { left: 58px; top: 16px; }
        .lop-const-dot--b { left: 92px; top: 6px; width: 4px; height: 4px; }
        .lop-const-dot--c { left: 128px; top: 24px; }
        .lop-const-dot--d { left: 158px; top: 17px; width: 3px; height: 3px; }
        .lop-eclipse {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 28px;
          height: 28px;
          border-radius: 999px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, #050506 0 42%, rgba(255,204,110,0.32) 43% 48%, rgba(255,232,176,0.76) 49% 53%, rgba(255,160,50,0.12) 58%, transparent 72%);
          box-shadow: 0 0 24px rgba(255,178,82,0.24);
        }
        .lop-eclipse-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(255,232,176,0.24);
          border-radius: 999px;
          transform: translate(-50%, -50%);
        }
        .lop-eclipse-ring--a { width: 46px; height: 14px; }
        .lop-eclipse-ring--b { width: 14px; height: 46px; opacity: 0.5; }
        .lop-axis-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          transform: translateX(-50%);
          background: linear-gradient(180deg, transparent, rgba(255,232,176,0.72), transparent);
        }
        .lop-axis-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 18px;
          height: 18px;
          border: 1px solid rgba(255,232,176,0.66);
          border-radius: 999px;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 16px rgba(255,210,128,0.20);
        }
        .lop-axis-dot {
          position: absolute;
          left: 50%;
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(255,232,176,0.76);
          transform: translateX(-50%);
          box-shadow: 0 0 10px rgba(255,210,128,0.25);
        }
        .lop-axis-dot--top { top: 0; }
        .lop-axis-dot--bottom { bottom: 0; }
        .lop-trigram-line {
          position: absolute;
          left: 50%;
          width: 86px;
          height: 1px;
          transform: translateX(-50%);
          background: linear-gradient(90deg, transparent, rgba(255,232,176,0.70), transparent);
        }
        .lop-trigram-line--top { top: 9px; }
        .lop-trigram-line--middle { top: 17px; width: 112px; }
        .lop-trigram-line--bottom { top: 25px; }
        .lop-trigram-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #050506;
          border: 1px solid rgba(255,232,176,0.76);
          transform: translate(-50%, -50%);
          box-shadow: 0 0 14px rgba(255,210,128,0.22);
        }
        .lop-arc-base {
          position: absolute;
          left: 44px;
          right: 44px;
          bottom: 8px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,232,176,0.62), transparent);
        }
        .lop-arc {
          position: absolute;
          left: 50%;
          bottom: 7px;
          width: 92px;
          height: 34px;
          border: 1px solid rgba(255,232,176,0.46);
          border-bottom: 0;
          border-radius: 92px 92px 0 0;
          transform: translateX(-50%);
        }
        .lop-arc-dot {
          position: absolute;
          bottom: 6px;
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(255,232,176,0.74);
          box-shadow: 0 0 10px rgba(255,210,128,0.25);
        }
        .lop-arc-dot--left { left: 58px; }
        .lop-arc-dot--center { left: 50%; bottom: 28px; transform: translateX(-50%); }
        .lop-arc-dot--right { right: 58px; }
        .lop-dial-arc {
          position: absolute;
          left: 50%;
          bottom: 4px;
          width: 80px;
          height: 40px;
          border: 1px solid rgba(255,232,176,0.52);
          border-bottom: 0;
          border-radius: 80px 80px 0 0;
          transform: translateX(-50%);
        }
        .lop-dial-tick {
          position: absolute;
          left: 50%;
          bottom: 4px;
          width: 1px;
          height: 40px;
          transform-origin: bottom center;
          background: linear-gradient(180deg, rgba(255,232,176,0.58) 0 12%, transparent 12%);
        }
        .lop-dial-core {
          position: absolute;
          left: 50%;
          bottom: 1px;
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: rgba(255,232,176,0.78);
          transform: translateX(-50%);
          box-shadow: 0 0 12px rgba(255,210,128,0.28);
        }
        .lop-orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 56px;
          height: 18px;
          border: 1px solid rgba(255,232,176,0.44);
          border-radius: 999px;
          transform: translate(-50%, -50%) rotate(24deg);
        }
        .lop-orbit--b {
          transform: translate(-50%, -50%) rotate(-24deg);
          opacity: 0.72;
        }
        .lop-orbit-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: rgba(255,232,176,0.82);
          transform: translate(-50%, -50%);
          box-shadow: 0 0 13px rgba(255,210,128,0.32);
        }
        .lop-orbit-dot {
          position: absolute;
          left: calc(50% + 23px);
          top: calc(50% - 9px);
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(255,232,176,0.76);
          box-shadow: 0 0 10px rgba(255,210,128,0.25);
        }
        .lop-current-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          border: 1px solid rgba(255,232,176,0.64);
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(255,235,190,0.24), transparent 66%);
          box-shadow: 0 0 16px rgba(255,210,128,0.22);
        }
        .lop-current-core::before,
        .lop-current-core::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 30px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,232,176,0.58), transparent);
          transform-origin: center;
        }
        .lop-current-core::before { transform: translate(-50%, -50%) rotate(42deg); }
        .lop-current-core::after { transform: translate(-50%, -50%) rotate(-42deg); }
        .lop-current-dot {
          position: absolute;
          top: 50%;
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(255,232,176,0.72);
          box-shadow: 0 0 10px rgba(255,210,128,0.28);
          transform: translateY(-50%);
        }
        .lop-current-dot--left { left: 21%; }
        .lop-current-dot--right { right: 21%; }
        .lop-current-tick {
          position: absolute;
          top: 50%;
          width: 1px;
          height: 12px;
          background: linear-gradient(180deg, transparent, rgba(255,232,176,0.54), transparent);
          transform: translateY(-50%) rotate(24deg);
        }
        .lop-current-tick--left { left: 35%; }
        .lop-current-tick--right { right: 35%; transform: translateY(-50%) rotate(-24deg); }
        @media (max-width: 860px) {
          .lop-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 560px) {
          .lop-root {
            padding: 22px 12px 36px;
          }
          .lop-header {
            align-items: flex-start;
            margin-bottom: 18px;
          }
          .lop-grid {
            grid-template-columns: 1fr;
          }
          .lop-card {
            min-height: 210px;
          }
        }
      `}</style>

      <header className="lop-header">
        <div>
          <h1 className="lop-title">Ornements</h1>
          <p className="lop-kicker">Choix du sceau sous NIGHTSTAR</p>
        </div>
        <button className="lop-close" type="button" onClick={onClosePreview} aria-label="Fermer la preview">
          ×
        </button>
      </header>

      <section className="lop-grid" aria-label="Options d’ornements NIGHTSTAR">
        {ornamentOptions.map(option => (
          <article className="lop-card" key={option.id}>
            <div className="lop-sample">
              <div className="lop-brand" aria-hidden>
                <div className="lop-brand-rule" />
                <div className="lop-brand-word">NIGHTSTAR</div>
                <div className="lop-brand-rule" />
                <Ornament id={option.id} />
              </div>
            </div>
            <div className="lop-meta">
              <h2 className="lop-name">{option.title}</h2>
              <p className="lop-description">{option.description}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
