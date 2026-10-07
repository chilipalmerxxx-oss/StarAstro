import { useRef, useState } from 'react';
import type { SkyTransit } from '../services/dailySky';
import { WeekRitual } from './DailyRitual';
import './DailySkyCarousel.css';

interface DailySkyCarouselProps {
  transits: SkyTransit[];
  tomorrow: SkyTransit | null;
  dateKey: string;
}

const PLANET_STYLE: Record<string, { glyph: string; color: string }> = {
  sun: { glyph: '☉', color: '#f4c85d' },
  moon: { glyph: '☽', color: '#d9e2f0' },
  mercury: { glyph: '☿', color: '#67d4df' },
  venus: { glyph: '♀', color: '#ef8fba' },
  mars: { glyph: '♂', color: '#ff7d70' },
  jupiter: { glyph: '♃', color: '#ddb77d' },
  saturn: { glyph: '♄', color: '#c5ad82' },
  uranus: { glyph: '♅', color: '#76b8ff' },
  neptune: { glyph: '♆', color: '#9c91ff' },
  pluto: { glyph: '♇', color: '#c784ed' },
};

const TREND_LABEL: Record<SkyTransit['trend'], string> = {
  exact: 'exact',
  monte: 'monte',
  retombe: 'retombe',
};

function CardHeading({ transit }: { transit: SkyTransit }) {
  const from = PLANET_STYLE[transit.transitKey];
  const to = PLANET_STYLE[transit.natalKey];

  return (
    <div className="sky-card__heading">
      <span className="sky-card__pair" aria-hidden="true">
        <span className="sky-card__disc" style={{ color: from.color }}>{from.glyph}</span>
        <span className="sky-card__disc" style={{ color: to.color }}>{to.glyph}</span>
      </span>
      <h3 className="sky-card__title">{transit.title}</h3>
    </div>
  );
}

export default function DailySkyCarousel({ transits, tomorrow, dateKey }: DailySkyCarouselProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openWhy, setOpenWhy] = useState<string | null>(null);

  const slideCount = transits.length + (tomorrow ? 1 : 0);

  const syncActiveFromScroll = () => {
    const list = listRef.current;
    if (!list) return;
    const center = list.scrollLeft + list.clientWidth / 2;
    let closest = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    Array.from(list.children).forEach((child, index) => {
      const item = child as HTMLElement;
      const distance = Math.abs(item.offsetLeft + item.offsetWidth / 2 - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = index;
      }
    });
    if (closest !== activeIndex) {
      setActiveIndex(closest);
      setOpenWhy(null);
    }
  };

  const goTo = (index: number) => {
    const item = listRef.current?.children[index] as HTMLElement | undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    item?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
  };

  if (slideCount === 0) return null;

  return (
    <section className="sky-carousel" aria-label="Ta journée en un coup d'œil">
      <header className="sky-carousel__header">
        <p className="costar-section-title text-sm uppercase tracking-widest">Ta journée en un coup d'œil</p>
        <WeekRitual dateKey={dateKey} />
      </header>

      <ul ref={listRef} className="sky-carousel__list" onScroll={syncActiveFromScroll}>
        {transits.map((transit) => {
          const isOpen = openWhy === transit.id;
          return (
            <li key={transit.id} className={`sky-card sky-card--${transit.nature}`}>
              <div className="sky-card__meta">
                <span className="sky-card__domain">{transit.domain}</span>
                <span className="sky-card__duration">{transit.durationLabel}</span>
              </div>

              <CardHeading transit={transit} />
              <p className="sky-card__headline">{transit.headline}</p>

              <div className="sky-card__footer">
                <div className="sky-card__intensity" aria-label={`Intensité ${Math.round(transit.intensity * 100)} %`}>
                  {[0, 1, 2, 3, 4].map((step) => (
                    <span
                      key={step}
                      className={`sky-card__intensity-bar${transit.intensity > step / 5 ? ' is-on' : ''}`}
                    />
                  ))}
                  <span className="sky-card__orb">
                    {transit.orb.toLocaleString('fr-FR', { maximumFractionDigits: 1, minimumFractionDigits: 1 })}° · {TREND_LABEL[transit.trend]}
                  </span>
                </div>
                <button
                  type="button"
                  className="sky-card__why-toggle"
                  aria-expanded={isOpen}
                  onClick={() => setOpenWhy(isOpen ? null : transit.id)}
                >
                  {isOpen ? 'Fermer' : 'Pourquoi ?'}
                </button>
              </div>
              {isOpen && <p className="sky-card__why">{transit.why}</p>}
            </li>
          );
        })}

        {tomorrow && (
          <li className="sky-card sky-card--tomorrow">
            <div className="sky-card__meta">
              <span className="sky-card__domain">Demain dans ton ciel</span>
              <span className="sky-card__duration">{tomorrow.domain}</span>
            </div>
            <CardHeading transit={tomorrow} />
            <p className="sky-card__headline sky-card__headline--veiled" aria-hidden="true">{tomorrow.headline}</p>
            <p className="sky-card__teaser">Ce message se dévoile demain. Reviens le lire.</p>
          </li>
        )}
      </ul>

      <div className="sky-carousel__dots" role="tablist" aria-label="Cartes du jour">
        {Array.from({ length: slideCount }, (_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={index === transits.length ? 'Demain' : `Carte ${index + 1}`}
            className={`sky-carousel__dot${index === activeIndex ? ' is-active' : ''}${index === transits.length ? ' sky-carousel__dot--tomorrow' : ''}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
