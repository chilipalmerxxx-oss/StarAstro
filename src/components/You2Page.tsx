import { useCallback, useRef, type PointerEvent } from 'react';
import AstralProfile from './AstralProfile';

type EditableBirthData = {
  name: string;
  date: string;
  time: string;
  place: string;
  latitude: number;
  longitude: number;
  timezoneOffset: number;
};

interface You2PageProps {
  name: string;
  birthDate?: Date;
  birthPlace?: string;
  birthLatitude?: number;
  birthLongitude?: number;
  birthTimezoneOffset?: number;
  planetPositions: Record<string, any>;
  houses: any[];
  aspects?: any[];
  initialActivePlanet?: any;
  onEditBirthData?: (data: EditableBirthData) => Promise<void> | void;
  editBirthDataLoading?: boolean;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function You2Page({
  name,
  birthDate,
  birthPlace,
  birthLatitude,
  birthLongitude,
  birthTimezoneOffset,
  planetPositions,
  houses,
  aspects = [],
  initialActivePlanet,
  onEditBirthData,
  editBirthDataLoading = false,
}: You2PageProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  const resetMotion = useCallback(() => {
    const page = pageRef.current;
    if (!page) return;
    page.style.setProperty('--you2-tilt-x', '0deg');
    page.style.setProperty('--you2-tilt-y', '0deg');
    page.style.setProperty('--you2-shift-x', '0px');
    page.style.setProperty('--you2-shift-y', '0px');
    page.style.setProperty('--you2-halo-x', '0px');
    page.style.setProperty('--you2-halo-y', '0px');
    page.style.setProperty('--you2-particle-x', '0px');
    page.style.setProperty('--you2-particle-y', '0px');
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const page = pageRef.current;
    if (!page || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const wheel = page.querySelector('.zodiac-wheel-container--you2') as HTMLElement | null;
    const bounds = (wheel || page).getBoundingClientRect();
    const relativeX = clamp((event.clientX - bounds.left) / bounds.width - 0.5, -0.5, 0.5);
    const relativeY = clamp((event.clientY - bounds.top) / bounds.height - 0.5, -0.5, 0.5);
    const tiltY = relativeX * 5.2;
    const tiltX = relativeY * -5.2;

    page.style.setProperty('--you2-tilt-x', `${tiltX.toFixed(2)}deg`);
    page.style.setProperty('--you2-tilt-y', `${tiltY.toFixed(2)}deg`);
    page.style.setProperty('--you2-shift-x', `${(-relativeX * 8).toFixed(2)}px`);
    page.style.setProperty('--you2-shift-y', `${(-relativeY * 8).toFixed(2)}px`);
    page.style.setProperty('--you2-halo-x', `${(relativeX * 5).toFixed(2)}px`);
    page.style.setProperty('--you2-halo-y', `${(relativeY * 5).toFixed(2)}px`);
    page.style.setProperty('--you2-particle-x', `${(relativeX * 12).toFixed(2)}px`);
    page.style.setProperty('--you2-particle-y', `${(relativeY * 12).toFixed(2)}px`);
  }, []);

  return (
    <div
      ref={pageRef}
      className="you2-page"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetMotion}
      onPointerCancel={resetMotion}
    >
      <AstralProfile
        name={name}
        birthDate={birthDate}
        birthPlace={birthPlace}
        birthLatitude={birthLatitude}
        birthLongitude={birthLongitude}
        birthTimezoneOffset={birthTimezoneOffset}
        planetPositions={planetPositions}
        houses={houses}
        aspects={aspects}
        initialActivePlanet={initialActivePlanet}
        fullscreenMode={true}
        onEditBirthData={onEditBirthData}
        editBirthDataLoading={editBirthDataLoading}
        variant="you2"
      />
    </div>
  );
}
