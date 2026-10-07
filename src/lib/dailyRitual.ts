// Device-local daily ritual state for the CoStar page: which days the user
// opened the page, and what they did with the daily challenge.

export type MissionState = 'idle' | 'accepted' | 'done' | 'skipped';

const VISITS_KEY = 'nightstarSkyVisits';
const MISSIONS_KEY = 'nightstarMissions';
const CHANGE_EVENT = 'nightstar:ritual-change';
const MAX_DAYS = 60;

const readJson = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode): state lives for this session only.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
};

export const readVisits = (): string[] => {
  const visits = readJson<unknown>(VISITS_KEY, []);
  return Array.isArray(visits) ? visits.filter((day): day is string => typeof day === 'string') : [];
};

export const recordVisit = (dateKey: string) => {
  const visits = readVisits();
  if (!visits.includes(dateKey)) {
    writeJson(VISITS_KEY, [...visits, dateKey].slice(-MAX_DAYS));
  }
};

export const readMissions = (): Record<string, MissionState> =>
  readJson<Record<string, MissionState>>(MISSIONS_KEY, {});

export const writeMission = (dateKey: string, state: MissionState) => {
  const missions = { ...readMissions(), [dateKey]: state };
  const recent = Object.keys(missions).sort().slice(-MAX_DAYS);
  writeJson(MISSIONS_KEY, Object.fromEntries(recent.map((day) => [day, missions[day]])));
};

export const subscribeRitual = (listener: () => void) => {
  window.addEventListener(CHANGE_EVENT, listener);
  return () => window.removeEventListener(CHANGE_EVENT, listener);
};
