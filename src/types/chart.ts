import type { Aspect, House, PlanetPosition } from '../services/astrology';

export type BirthInput = {
  name: string;
  date: string;
  time: string;
  place: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  timezoneOffset: number;
};

export type ChartData = {
  id?: string;
  name: string;
  birthDate: Date;
  birthPlace: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  timezoneOffset: number;
  planetPositions: Record<string, PlanetPosition>;
  houses: House[];
  aspects: Aspect[];
};
