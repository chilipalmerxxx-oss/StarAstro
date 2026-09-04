import './YouPageWheelPreview.css';

interface YouPageWheelPreviewProps {
  userName?: string;
  birthDateLabel?: string;
  birthPlaceLabel?: string;
  onClosePreview: () => void;
}

const signs = [
  { label: 'Belier', iconPath: '/assets/zodiac-enamel-v1/aries.png' },
  { label: 'Taureau', iconPath: '/assets/zodiac-enamel-refined/taurus-head-v2.png' },
  { label: 'Gemeaux', iconPath: '/assets/zodiac-enamel-refined/gemini-masks-v2.png' },
  { label: 'Cancer', iconPath: '/assets/zodiac-enamel-v1/cancer.png' },
  { label: 'Lion', iconPath: '/assets/zodiac-enamel-v1/leo.png' },
  { label: 'Vierge', iconPath: '/assets/zodiac-enamel-v1/virgo.png' },
  { label: 'Balance', iconPath: '/assets/zodiac-enamel-v1/libra.png' },
  { label: 'Scorpion', iconPath: '/assets/zodiac-enamel-refined/scorpio.png' },
  { label: 'Sagittaire', iconPath: '/assets/zodiac-enamel-v1/sagittarius.png' },
  { label: 'Capricorne', iconPath: '/assets/zodiac-enamel-refined/capricorn.png' },
  { label: 'Verseau', iconPath: '/assets/zodiac-enamel-v1/aquarius.png' },
  { label: 'Poissons', iconPath: '/assets/zodiac-enamel-refined/pisces.png' },
];

export default function YouPageWheelPreview({
  userName = 'Gil',
  birthDateLabel = '14 juin 1998, 06:42',
  birthPlaceLabel = 'Paris, France',
  onClosePreview,
}: YouPageWheelPreviewProps) {
  return (
    <section className="you-preview" aria-label="You page preview">
      <div className="you-preview-stars" aria-hidden="true" />
      <div className="stars-layer-2" aria-hidden="true">
        <div className="star-drift star-drift--one" />
        <div className="star-drift star-drift--two" />
      </div>

      <header className="you-preview-header">
        <button type="button" className="you-preview-back" onClick={onClosePreview}>
          Retour
        </button>
        <span className="you-preview-chip">YOU PREVIEW</span>
      </header>

      <main className="you-preview-main">
        <div className="you-wheel-glass">
          <div className="you-wheel-halo" aria-hidden="true" />

          <div className="you-wheel" role="img" aria-label="Roue astrale mystique">
            <div className="you-wheel-ring you-wheel-ring--outer" />
            <div className="you-wheel-ring you-wheel-ring--mid" />
            <div className="you-wheel-ring you-wheel-ring--inner" />
            <div className="you-wheel-center" />

            {signs.map((sign, index) => {
              const angle = (index / signs.length) * 360;
              return (
                <span
                  key={sign.label}
                  className={`you-wheel-sign${sign.label === 'Vierge' ? ' you-wheel-sign--virgo' : ''}`}
                  style={{
                    transform: `rotate(${angle}deg) translateY(calc(-1 * var(--wheel-radius))) rotate(-${angle}deg)`,
                  }}
                >
                  <img
                    src={sign.iconPath}
                    alt={sign.label}
                    style={
                      sign.label === 'Gemeaux'
                        ? { transform: 'scale(1.06)' }
                        : sign.label === 'Vierge'
                        ? {
                            filter:
                              'sepia(0.3) saturate(1.7) hue-rotate(285deg) brightness(1.08)',
                          }
                        : sign.label === 'Scorpion'
                        ? { transform: 'scale(1.1)' }
                        : sign.label === 'Taureau'
                          ? { transform: 'scale(1.08)' }
                          : undefined
                    }
                  />
                </span>
              );
            })}
          </div>
        </div>

        <div className="you-preview-text">
          <h1>{userName}</h1>
          <p>{birthDateLabel}</p>
          <p>{birthPlaceLabel}</p>
        </div>
      </main>
    </section>
  );
}
