import { createContext, useContext } from 'react';

export type OnboardingSoundKind = 'letter' | 'wheel';
export const SoundContext = createContext<{
  enabled: boolean;
  toggle: () => void;
  unlock: () => void;
  play: (kind: OnboardingSoundKind) => void;
}>({ enabled: true, toggle: () => {}, unlock: () => {}, play: () => {} });

export const useOnboardingSound = () => useContext(SoundContext);
