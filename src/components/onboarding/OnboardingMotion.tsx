import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { SoundContext, useOnboardingSound, type OnboardingSoundKind } from './onboardingSound';
import { getWritingInterval } from './writing';

export function OnboardingSound({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(true);
  const audioRef = useRef<AudioContext | null>(null);
  const lastTick = useRef(0);
  const unlock = useCallback(() => {
    if (!enabledRef.current) return;
    try {
      const Audio = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Audio) return;
      audioRef.current ??= new Audio();
      if (audioRef.current.state === 'suspended') void audioRef.current.resume().catch(() => {});
    } catch { /* Audio is optional on restricted browsers. */ }
  }, []);
  const toggle = useCallback(() => {
    enabledRef.current = !enabledRef.current;
    setEnabled(enabledRef.current);
    if (enabledRef.current) unlock();
  }, [unlock]);
  const play = useCallback((kind: OnboardingSoundKind) => {
    const context = audioRef.current;
    if (!enabledRef.current || !context || context.state !== 'running' || document.hidden) return;
    const now = context.currentTime;
    if (now - lastTick.current < 0.055) return;
    lastTick.current = now;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(kind === 'letter' ? 1150 : 640, now);
    oscillator.frequency.exponentialRampToValueAtTime(kind === 'letter' ? 750 : 390, now + 0.025);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(kind === 'letter' ? 0.009 : 0.016, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    oscillator.start(now);
    oscillator.stop(now + 0.035);
  }, []);
  useEffect(() => () => {
    if (audioRef.current) void audioRef.current.close().catch(() => {});
    audioRef.current = null;
  }, []);
  return <SoundContext.Provider value={{ enabled, toggle, unlock, play }}>{children}</SoundContext.Provider>;
}

// Every letter occupies its final space from the start, preventing layout jumps.
export function WrittenText({ children, delay = 0 }: { children: string; delay?: number }) {
  const { play } = useOnboardingSound();
  const letters = useMemo(() => Array.from(children), [children]);
  const interval = getWritingInterval(children);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    let frame = 0;
    let previous = -1;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const index = Math.floor((now - start) / interval);
      if (!media.matches && index >= 0 && index < letters.length && index !== previous && letters[index].trim()) play('letter');
      previous = index;
      if (index < letters.length && !media.matches) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [letters, delay, interval, play]);
  let index = 0;
  return <span className="premium-y-written"><span className="premium-y-sr-only">{children}</span><span aria-hidden="true">{children.split(/(\s+)/).map((word, wordIndex) => {
    if (/^\s+$/.test(word)) { index += word.length; return <span key={wordIndex}>{word}</span>; }
    return <span className="premium-y-written-word" key={wordIndex}>{Array.from(word).map((letter) => {
      const letterIndex = index++;
      return <span className="premium-y-letter" key={letterIndex} style={{ '--letter-delay': `${delay + letterIndex * interval}ms` } as CSSProperties}>{letter}</span>;
    })
    }</span>
  })}</span></span>;
}
