import { useEffect, useId, useRef } from 'react';
import { useOnboardingSound } from './onboardingSound';

export type WheelOption = { value: number; label: string };
const ITEM_HEIGHT = 52;

export default function BirthWheel({ label, value, onChange, options }: {
  label: string; value: number; onChange: (value: number) => void; options: WheelOption[];
}) {
  const id = useId();
  const wheelRef = useRef<HTMLDivElement>(null);
  const current = useRef(value);
  const scrolling = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const frame = useRef(0);
  const drag = useRef<{ y: number; top: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const { unlock, play } = useOnboardingSound();
  const selectedIndex = Math.max(0, options.findIndex(option => option.value === value));

  useEffect(() => {
    current.current = value;
    if (!scrolling.current && wheelRef.current) wheelRef.current.scrollTop = selectedIndex * ITEM_HEIGHT;
  }, [selectedIndex, value, options]);
  useEffect(() => () => { clearTimeout(timer.current); cancelAnimationFrame(frame.current); }, []);

  const select = (index: number) => {
    const safeIndex = Math.min(options.length - 1, Math.max(0, index));
    scrolling.current = true;
    unlock();
    wheelRef.current?.scrollTo({ top: safeIndex * ITEM_HEIGHT, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  const sync = () => {
    const index = Math.min(options.length - 1, Math.max(0, Math.round((wheelRef.current?.scrollTop ?? 0) / ITEM_HEIGHT)));
    const next = options[index].value;
    if (next !== current.current) { current.current = next; onChange(next); play('wheel'); }
  };

  return <div className="premium-y-wheel">
    <div ref={wheelRef} className="premium-y-wheel-scroll" role="listbox" aria-label={label}
      aria-activedescendant={`${id}-${value}`} tabIndex={0}
      onKeyDown={event => {
        const targets: Record<string, number> = { ArrowUp: selectedIndex - 1, ArrowDown: selectedIndex + 1, Home: 0, End: options.length - 1, PageUp: selectedIndex - 5, PageDown: selectedIndex + 5 };
        if (event.key in targets) { event.preventDefault(); select(targets[event.key]); }
      }}
      onScroll={() => {
        scrolling.current = true;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(sync);
        clearTimeout(timer.current);
        // Native scroll snap handles alignment after momentum finishes. Never interrupt it.
        timer.current = setTimeout(() => { sync(); scrolling.current = false; }, 180);
      }}
      onPointerDown={event => {
        unlock();
        suppressClick.current = false;
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        drag.current = { y: event.clientY, top: event.currentTarget.scrollTop, moved: false };
      }}
      onPointerMove={event => {
        if (!drag.current) return;
        const distance = event.clientY - drag.current.y;
        if (Math.abs(distance) > 4) {
          drag.current.moved = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.style.scrollSnapType = 'none';
          event.currentTarget.scrollTop = drag.current.top - distance;
        }
      }}
      onPointerUp={event => {
        if (drag.current?.moved) {
          event.currentTarget.style.scrollSnapType = '';
          select(Math.round(event.currentTarget.scrollTop / ITEM_HEIGHT));
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        }
        suppressClick.current = Boolean(drag.current?.moved);
        drag.current = null;
      }}
      onPointerCancel={event => { drag.current = null; event.currentTarget.style.scrollSnapType = ''; }}
      onLostPointerCapture={event => { event.currentTarget.style.scrollSnapType = ''; }}
      onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); } suppressClick.current = false; }}
    >{options.map((option, index) => <div key={option.value} id={`${id}-${option.value}`} role="option"
      aria-selected={value === option.value} className={`premium-y-wheel-option${value === option.value ? ' is-selected' : ''}`}
      onClick={() => select(index)}>{option.label}</div>)}</div>
  </div>;
}
