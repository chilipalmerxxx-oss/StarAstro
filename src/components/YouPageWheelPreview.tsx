import './YouPageWheelPreview.css';

interface YouPageWheelPreviewProps {
  userName?: string;
  birthDateLabel?: string;
  birthPlaceLabel?: string;
  onClosePreview: () => void;
}

export default function YouPageWheelPreview({
  userName = 'Gil',
  birthDateLabel = '14 juin 1998, 06:42',
  birthPlaceLabel = 'Paris, France',
  onClosePreview,
}: YouPageWheelPreviewProps) {
  const signs = ['\u2648', '\u2649', '\u264A', '\u264B', '\u264C', '\u264D', '\u264E', '\u264F', '\u2650', '\u2651', '\u2652', '\u2653'];

  return (
    <section className="you-preview" aria-label="You page preview">
      <div className="you-preview-stars" aria-hidden="true" />

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
                  key={`${sign}-${index}`}
                  className="you-wheel-sign"
                  style={{
                    transform: `rotate(${angle}deg) translateY(calc(-1 * var(--wheel-radius))) rotate(-${angle}deg)`,
                  }}
                >
                  {sign}
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
