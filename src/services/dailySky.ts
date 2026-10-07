import * as Astronomy from 'astronomy-engine';
import { MISSIONS, PAIR_LINES, YES_NO, type CopyNature } from '../data/dailySkyCopy';

// Fast-planet transits to the natal chart, for the daily CoStar carousel.
// Each transit carries what makes it worth coming back for: how exact it is,
// whether it is building or fading, and how long it lasts.

type TransitKey = 'moon' | 'sun' | 'mercury' | 'venus' | 'mars';
type NatalKey =
  | 'sun' | 'moon' | 'mercury' | 'venus' | 'mars'
  | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto';

export type SkyNature = 'fluide' | 'tendu' | 'fusion';
export type SkyTrend = 'exact' | 'monte' | 'retombe';

export interface SkyTransit {
  id: string;
  transitKey: TransitKey;
  transitName: string;
  natalKey: NatalKey;
  natalName: string;
  natalPossessive: string;
  aspectName: string;
  aspectAngle: number;
  nature: SkyNature;
  copyNature: CopyNature;
  orb: number;
  intensity: number;
  trend: SkyTrend;
  durationLabel: string;
  domain: string;
  title: string;
  headline: string;
  why: string;
}

interface NatalPoint {
  longitude: number;
}

const HOUR = 60 * 60 * 1000;

const TRANSITS: Record<TransitKey, {
  body: Astronomy.Body;
  name: string;
  subject: string;
  orb: number;
  step: number;
  horizon: number;
}> = {
  moon: { body: Astronomy.Body.Moon, name: 'Lune', subject: 'La Lune', orb: 5, step: HOUR, horizon: 72 * HOUR },
  sun: { body: Astronomy.Body.Sun, name: 'Soleil', subject: 'Le Soleil', orb: 3, step: 6 * HOUR, horizon: 40 * 24 * HOUR },
  mercury: { body: Astronomy.Body.Mercury, name: 'Mercure', subject: 'Mercure', orb: 3, step: 6 * HOUR, horizon: 40 * 24 * HOUR },
  venus: { body: Astronomy.Body.Venus, name: 'Vénus', subject: 'Vénus', orb: 3, step: 6 * HOUR, horizon: 40 * 24 * HOUR },
  mars: { body: Astronomy.Body.Mars, name: 'Mars', subject: 'Mars', orb: 2.5, step: 12 * HOUR, horizon: 40 * 24 * HOUR },
};

const NATAL: Record<NatalKey, { name: string; possessive: string; domain: string; theme: string }> = {
  sun: { name: 'Soleil', possessive: 'ton Soleil', domain: 'Identité', theme: 'ton identité profonde' },
  moon: { name: 'Lune', possessive: 'ta Lune', domain: 'Émotions', theme: 'ta sensibilité' },
  mercury: { name: 'Mercure', possessive: 'ton Mercure', domain: 'Mental', theme: 'ta manière de penser' },
  venus: { name: 'Vénus', possessive: 'ta Vénus', domain: 'Amour', theme: 'ta façon d’aimer' },
  mars: { name: 'Mars', possessive: 'ton Mars', domain: 'Énergie', theme: 'ton élan' },
  jupiter: { name: 'Jupiter', possessive: 'ton Jupiter', domain: 'Chance', theme: 'ta confiance' },
  saturn: { name: 'Saturne', possessive: 'ton Saturne', domain: 'Travail', theme: 'ton sens des responsabilités' },
  uranus: { name: 'Uranus', possessive: 'ton Uranus', domain: 'Liberté', theme: 'ton besoin de liberté' },
  neptune: { name: 'Neptune', possessive: 'ton Neptune', domain: 'Intuition', theme: 'ton imaginaire' },
  pluto: { name: 'Pluton', possessive: 'ton Pluton', domain: 'Transformation', theme: 'tes transformations intimes' },
};

const ASPECTS: { name: string; angle: number; orbFactor: number; nature: SkyNature; mechanic: string }[] = [
  { name: 'Conjonction', angle: 0, orbFactor: 1, nature: 'fusion', mechanic: 'Une conjonction fusionne les deux énergies : leur effet se renforce.' },
  { name: 'Sextile', angle: 60, orbFactor: 0.8, nature: 'fluide', mechanic: 'Un sextile ouvre une porte : l’occasion est là si tu fais le premier pas.' },
  { name: 'Carré', angle: 90, orbFactor: 1, nature: 'tendu', mechanic: 'Un carré crée une friction : inconfortable, mais c’est elle qui te fait avancer.' },
  { name: 'Trigone', angle: 120, orbFactor: 1, nature: 'fluide', mechanic: 'Un trigone fait circuler l’énergie sans effort, comme un courant porteur.' },
  { name: 'Opposition', angle: 180, orbFactor: 1, nature: 'tendu', mechanic: 'Une opposition met deux besoins face à face : l’enjeu est de trouver l’équilibre.' },
];

const NATAL_KEYS = Object.keys(NATAL) as NatalKey[];
const TRANSIT_KEYS = Object.keys(TRANSITS) as TransitKey[];

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
};

const localDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const pick = <T,>(items: T[], seed: string) => items[hashString(seed) % items.length];

// Conjunctions read as tense with Mars or with the heavy natal planets.
const copyNatureOf = (transitKey: TransitKey, natalKey: NatalKey, nature: SkyNature): CopyNature => {
  if (nature !== 'fusion') return nature;
  return transitKey === 'mars' || natalKey === 'saturn' || natalKey === 'pluto' ? 'tendu' : 'fluide';
};

const eclipticLongitude = (body: Astronomy.Body, date: Date) =>
  Astronomy.Ecliptic(Astronomy.GeoVector(body, date, false)).elon;

const separation = (a: number, b: number) => {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
};

const orbAt = (transitKey: TransitKey, natalLongitude: number, angle: number, date: Date) =>
  Math.abs(separation(eclipticLongitude(TRANSITS[transitKey].body, date), natalLongitude) - angle);

const formatDuration = (now: Date, end: Date | null) => {
  if (!end) return 'plusieurs semaines';
  const hours = Math.round((end.getTime() - now.getTime()) / HOUR);
  if (hours < 1) return 'moins d’une heure';
  if (hours < 24) return `encore ${hours}\u00A0h`;

  const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const days = Math.round((startOfDay(end) - startOfDay(now)) / (24 * HOUR));
  if (days === 1) return 'jusqu’à demain';
  if (days < 7) return `jusqu’à ${end.toLocaleDateString('fr-FR', { weekday: 'long' })}`;
  return `jusqu’au ${end.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}`;
};

interface RawTransit {
  transitKey: TransitKey;
  natalKey: NatalKey;
  natalLongitude: number;
  aspect: (typeof ASPECTS)[number];
  orb: number;
  maxOrb: number;
}

const findRawTransits = (natal: Record<string, NatalPoint | undefined>, date: Date): RawTransit[] => {
  const found: RawTransit[] = [];

  for (const transitKey of TRANSIT_KEYS) {
    const transitLongitude = eclipticLongitude(TRANSITS[transitKey].body, date);
    for (const natalKey of NATAL_KEYS) {
      const natalLongitude = natal[natalKey]?.longitude;
      if (typeof natalLongitude !== 'number' || Number.isNaN(natalLongitude)) continue;

      const sep = separation(transitLongitude, natalLongitude);
      for (const aspect of ASPECTS) {
        const maxOrb = TRANSITS[transitKey].orb * aspect.orbFactor;
        const orb = Math.abs(sep - aspect.angle);
        if (orb <= maxOrb) {
          found.push({ transitKey, natalKey, natalLongitude, aspect, orb, maxOrb });
        }
      }
    }
  }

  return found.sort((a, b) => a.orb / a.maxOrb - b.orb / b.maxOrb);
};

const rawId = (raw: RawTransit) => `${raw.transitKey}-${raw.aspect.name}-${raw.natalKey}`;

const describe = (raw: RawTransit, now: Date, withTiming: boolean): SkyTransit => {
  const transit = TRANSITS[raw.transitKey];
  const natal = NATAL[raw.natalKey];
  const copyNature = copyNatureOf(raw.transitKey, raw.natalKey, raw.aspect.nature);

  let trend: SkyTrend = 'exact';
  let durationLabel = '';
  if (withTiming) {
    const exactThreshold = raw.transitKey === 'moon' ? 0.5 : 0.3;
    if (raw.orb > exactThreshold) {
      const soon = orbAt(raw.transitKey, raw.natalLongitude, raw.aspect.angle, new Date(now.getTime() + transit.step));
      trend = soon < raw.orb ? 'monte' : 'retombe';
    }

    let end: Date | null = null;
    for (let t = now.getTime() + transit.step; t <= now.getTime() + transit.horizon; t += transit.step) {
      const date = new Date(t);
      if (orbAt(raw.transitKey, raw.natalLongitude, raw.aspect.angle, date) > raw.maxOrb) {
        end = date;
        break;
      }
    }
    durationLabel = formatDuration(now, end);
  }

  return {
    id: rawId(raw),
    transitKey: raw.transitKey,
    transitName: transit.name,
    natalKey: raw.natalKey,
    natalName: natal.name,
    natalPossessive: natal.possessive,
    aspectName: raw.aspect.name,
    aspectAngle: raw.aspect.angle,
    nature: raw.aspect.nature,
    copyNature,
    orb: raw.orb,
    intensity: Math.max(0.08, 1 - raw.orb / raw.maxOrb),
    trend,
    durationLabel,
    domain: natal.domain,
    title: `${transit.name} ${raw.aspect.name.toLocaleLowerCase('fr-FR')} ${natal.possessive}`,
    headline: pick(PAIR_LINES[raw.transitKey][raw.natalKey][copyNature], `${localDateKey(now)}|${rawId(raw)}`),
    why: `${transit.subject} du ciel forme ${raw.aspect.name === 'Opposition' || raw.aspect.name === 'Conjonction' ? 'une' : 'un'} ${raw.aspect.name.toLocaleLowerCase('fr-FR')} (${raw.aspect.angle}°) avec ${natal.possessive} de naissance. ${raw.aspect.mechanic} Ce qui est touché\u00A0: ${natal.theme}.`,
  };
};

// The most exact fast transits, at most two per transit planet, always
// including the Moon when she aspects the chart (she changes every day).
const selectTopRaws = (natal: Record<string, NatalPoint | undefined>, date: Date, limit: number) => {
  const raws = findRawTransits(natal, date);
  const picked: RawTransit[] = [];
  const perPlanet = new Map<TransitKey, number>();

  const moon = raws.find((raw) => raw.transitKey === 'moon');
  if (moon) {
    picked.push(moon);
    perPlanet.set('moon', 1);
  }

  for (const raw of raws) {
    if (picked.length >= limit) break;
    if (picked.includes(raw)) continue;
    const count = perPlanet.get(raw.transitKey) ?? 0;
    if (count >= 2) continue;
    picked.push(raw);
    perPlanet.set(raw.transitKey, count + 1);
  }

  return picked.sort((a, b) => a.orb / a.maxOrb - b.orb / b.maxOrb);
};

// Today's carousel cards, timed from the current moment.
export const getDailySkyTransits = (natal: Record<string, NatalPoint | undefined>, now = new Date(), limit = 5) =>
  selectTopRaws(natal, now, limit).map((raw) => describe(raw, now, true));

// Tomorrow's teaser: the strongest transit at tomorrow noon that is not already
// on today's cards.
export const getTomorrowSkyTransit = (
  natal: Record<string, NatalPoint | undefined>,
  todayIds: string[],
  now = new Date(),
): SkyTransit | null => {
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 12);
  const raws = findRawTransits(natal, tomorrow);
  const raw = raws.find((item) => !todayIds.includes(rawId(item))) ?? raws[0];
  return raw ? describe(raw, tomorrow, false) : null;
};

const ZODIAC_SIGNS = [
  'Bélier', 'Taureau', 'Gémeaux', 'Cancer', 'Lion', 'Vierge',
  'Balance', 'Scorpion', 'Sagittaire', 'Capricorne', 'Verseau', 'Poissons',
];

export const getMoonSign = (date: Date) => {
  const longitude = ((eclipticLongitude(Astronomy.Body.Moon, date) % 360) + 360) % 360;
  return ZODIAC_SIGNS[Math.floor(longitude / 30)];
};

export interface DailyMission {
  text: string;
  reason: string;
  transitTitle: string;
}

export interface DailyRitual {
  mission: DailyMission | null;
  yesNo: { oui: string[]; non: string[] };
}

const noonOf = (dateKey: string, dayOffset = 0) => {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day + dayOffset, 12);
};

const ritualFor = (
  natal: Record<string, NatalPoint & { sign?: string } | undefined>,
  dateKey: string,
  date: Date,
  previous: DailyRitual | null,
): DailyRitual => {
  const sources = selectTopRaws(natal, date, 3);
  const rank = (seed: string) => hashString(`${dateKey}|${seed}`);

  // Mission: one action for a life area of the user's chart touched today,
  // never the same as yesterday's.
  const missionCandidates = sources
    .flatMap((raw) => {
      const nature = copyNatureOf(raw.transitKey, raw.natalKey, raw.aspect.nature);
      return MISSIONS[raw.natalKey][nature].map((text) => ({ text, raw }));
    })
    .filter((candidate) => candidate.text !== previous?.mission?.text)
    .sort((a, b) => rank(a.text) - rank(b.text));

  const chosen = missionCandidates[0];
  let mission: DailyMission | null = null;
  if (chosen) {
    const transit = TRANSITS[chosen.raw.transitKey];
    const area = NATAL[chosen.raw.natalKey];
    const natalSign = natalSignOf(natal[chosen.raw.natalKey]?.sign);
    mission = {
      text: chosen.text,
      reason: `${transit.subject} du ciel touche ${area.possessive}${natalSign}\u00A0: ${area.theme}.`,
      transitTitle: `${transit.name} ${chosen.raw.aspect.name.toLocaleLowerCase('fr-FR')} ${area.possessive}`,
    };
  }

  // Yes / No: three of each from the life areas touched, none repeated from yesterday.
  const collect = (side: 'oui' | 'non') => {
    const used = new Set(previous?.yesNo[side] ?? []);
    const pool = sources.flatMap((raw) => {
      const nature = copyNatureOf(raw.transitKey, raw.natalKey, raw.aspect.nature);
      return YES_NO[raw.natalKey][nature][side];
    });
    return Array.from(new Set(pool))
      .filter((item) => !used.has(item))
      .sort((a, b) => rank(`${side}|${a}`) - rank(`${side}|${b}`))
      .slice(0, 3);
  };

  return { mission, yesNo: { oui: collect('oui'), non: collect('non') } };
};

const natalSignOf = (sign: string | undefined) => (sign ? ` en ${sign}` : '');

// "Ton défi du jour" and "Oui / Non du jour", computed at noon so they stay the
// same all day, and steered away from yesterday's picks so they change daily.
export const getDailyRitual = (
  natal: Record<string, NatalPoint & { sign?: string } | undefined>,
  dateKey: string,
): DailyRitual => {
  const yesterdayKey = localDateKey(noonOf(dateKey, -1));
  const yesterday = ritualFor(natal, yesterdayKey, noonOf(dateKey, -1), null);
  return ritualFor(natal, dateKey, noonOf(dateKey), yesterday);
};
