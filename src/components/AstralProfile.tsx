import { useState, useRef, useEffect, useMemo, type FormEvent, type MouseEvent } from 'react';
import { ArrowRight, Calendar, ChevronDown, Clock, MapPin, Pencil, Save, Sparkles, X } from 'lucide-react';
import { getDetailedInterpretation } from '../data/signDetailedInterpretations';
import { PLANET_INFO, getAspectInterpretation } from '../data/interpretations';
import NatalChart from './NatalChart';

type PlanetKey = 'sun' | 'moon' | 'ascendant' | 'venus' | 'mars' | 'mercury' | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto';
type AstralProfileVariant = 'default' | 'you2';
type AstralProfileSection = 'planets' | 'signs' | 'houses' | 'aspects';

const ASTRAL_PROFILE_PLANET_KEYS: PlanetKey[] = ['ascendant', 'sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

type EditableBirthData = {
  name: string;
  date: string;
  time: string;
  place: string;
  latitude: number;
  longitude: number;
  timezoneOffset: number;
};

type BirthCity = {
  name: string;
  region?: string;
  country: string;
  aliases?: string[];
  lat: number;
  lon: number;
  tz: number;
};

type WheelOption = {
  value: number;
  label: string;
  detail?: string;
};

const MONTH_OPTIONS = [
  { value: 1, label: 'Jan', detail: 'janvier' },
  { value: 2, label: 'Fév', detail: 'février' },
  { value: 3, label: 'Mar', detail: 'mars' },
  { value: 4, label: 'Avr', detail: 'avril' },
  { value: 5, label: 'Mai', detail: 'mai' },
  { value: 6, label: 'Juin', detail: 'juin' },
  { value: 7, label: 'Juil', detail: 'juillet' },
  { value: 8, label: 'Août', detail: 'août' },
  { value: 9, label: 'Sep', detail: 'septembre' },
  { value: 10, label: 'Oct', detail: 'octobre' },
  { value: 11, label: 'Nov', detail: 'novembre' },
  { value: 12, label: 'Déc', detail: 'décembre' },
];

const BIRTH_CITY_OPTIONS: BirthCity[] = [
  { name: 'Paris', region: 'Île-de-France', country: 'France', lat: 48.8566, lon: 2.3522, tz: 1 },
  { name: 'Lyon', region: 'Auvergne-Rhône-Alpes', country: 'France', lat: 45.764, lon: 4.8357, tz: 1 },
  { name: 'Marseille', region: 'Provence-Alpes-Côte d’Azur', country: 'France', lat: 43.2965, lon: 5.3698, tz: 1 },
  { name: 'Toulouse', region: 'Occitanie', country: 'France', lat: 43.6047, lon: 1.4442, tz: 1 },
  { name: 'Bordeaux', region: 'Nouvelle-Aquitaine', country: 'France', lat: 44.8378, lon: -0.5792, tz: 1 },
  { name: 'Lille', region: 'Hauts-de-France', country: 'France', lat: 50.6292, lon: 3.0573, tz: 1 },
  { name: 'Nice', region: 'Provence-Alpes-Côte d’Azur', country: 'France', lat: 43.7102, lon: 7.262, tz: 1 },
  { name: 'Nantes', region: 'Pays de la Loire', country: 'France', lat: 47.2184, lon: -1.5536, tz: 1 },
  { name: 'Strasbourg', region: 'Grand Est', country: 'France', lat: 48.5734, lon: 7.7521, tz: 1 },
  { name: 'Montpellier', region: 'Occitanie', country: 'France', lat: 43.6108, lon: 3.8767, tz: 1 },
  { name: 'Rennes', region: 'Bretagne', country: 'France', lat: 48.1173, lon: -1.6778, tz: 1 },
  { name: 'Reims', region: 'Grand Est', country: 'France', lat: 49.2583, lon: 4.0317, tz: 1 },
  { name: 'Saint-Étienne', region: 'Auvergne-Rhône-Alpes', country: 'France', lat: 45.4397, lon: 4.3872, tz: 1 },
  { name: 'Toulon', region: 'Provence-Alpes-Côte d’Azur', country: 'France', lat: 43.1242, lon: 5.928, tz: 1 },
  { name: 'Le Havre', region: 'Normandie', country: 'France', lat: 49.4944, lon: 0.1079, tz: 1 },
  { name: 'Grenoble', region: 'Auvergne-Rhône-Alpes', country: 'France', lat: 45.1885, lon: 5.7245, tz: 1 },
  { name: 'Dijon', region: 'Bourgogne-Franche-Comté', country: 'France', lat: 47.322, lon: 5.0415, tz: 1 },
  { name: 'Angers', region: 'Pays de la Loire', country: 'France', lat: 47.4784, lon: -0.5632, tz: 1 },
  { name: 'Nîmes', region: 'Occitanie', country: 'France', lat: 43.8367, lon: 4.3601, tz: 1 },
  { name: 'Villeurbanne', region: 'Auvergne-Rhône-Alpes', country: 'France', lat: 45.7719, lon: 4.8902, tz: 1 },
  { name: 'Clermont-Ferrand', region: 'Auvergne-Rhône-Alpes', country: 'France', lat: 45.7772, lon: 3.087, tz: 1 },
  { name: 'Aix-en-Provence', region: 'Provence-Alpes-Côte d’Azur', country: 'France', lat: 43.5297, lon: 5.4474, tz: 1 },
  { name: 'Brest', region: 'Bretagne', country: 'France', lat: 48.3904, lon: -4.4861, tz: 1 },
  { name: 'Limoges', region: 'Nouvelle-Aquitaine', country: 'France', lat: 45.8336, lon: 1.2611, tz: 1 },
  { name: 'Tours', region: 'Centre-Val de Loire', country: 'France', lat: 47.3941, lon: 0.6848, tz: 1 },
  { name: 'Amiens', region: 'Hauts-de-France', country: 'France', lat: 49.8941, lon: 2.2958, tz: 1 },
  { name: 'Metz', region: 'Grand Est', country: 'France', lat: 49.1193, lon: 6.1757, tz: 1 },
  { name: 'Besançon', region: 'Bourgogne-Franche-Comté', country: 'France', lat: 47.2378, lon: 6.0241, tz: 1 },
  { name: 'Perpignan', region: 'Occitanie', country: 'France', lat: 42.6887, lon: 2.8948, tz: 1 },
  { name: 'Orléans', region: 'Centre-Val de Loire', country: 'France', lat: 47.9029, lon: 1.9093, tz: 1 },
  { name: 'Mulhouse', region: 'Grand Est', country: 'France', lat: 47.7508, lon: 7.3359, tz: 1 },
  { name: 'Rouen', region: 'Normandie', country: 'France', lat: 49.4431, lon: 1.0993, tz: 1 },
  { name: 'Caen', region: 'Normandie', country: 'France', lat: 49.1829, lon: -0.3707, tz: 1 },
  { name: 'Nancy', region: 'Grand Est', country: 'France', lat: 48.6921, lon: 6.1844, tz: 1 },
  { name: 'Argenteuil', region: 'Île-de-France', country: 'France', lat: 48.9472, lon: 2.2467, tz: 1 },
  { name: 'Montreuil', region: 'Île-de-France', country: 'France', lat: 48.8638, lon: 2.4485, tz: 1 },
  { name: 'Saint-Denis', region: 'Île-de-France', country: 'France', lat: 48.9362, lon: 2.3574, tz: 1 },
  { name: 'Roubaix', region: 'Hauts-de-France', country: 'France', lat: 50.6927, lon: 3.1778, tz: 1 },
  { name: 'Tourcoing', region: 'Hauts-de-France', country: 'France', lat: 50.724, lon: 3.1612, tz: 1 },
  { name: 'Avignon', region: 'Provence-Alpes-Côte d’Azur', country: 'France', lat: 43.9493, lon: 4.8055, tz: 1 },
  { name: 'Poitiers', region: 'Nouvelle-Aquitaine', country: 'France', lat: 46.5802, lon: 0.3404, tz: 1 },
  { name: 'Pau', region: 'Nouvelle-Aquitaine', country: 'France', lat: 43.2951, lon: -0.3708, tz: 1 },
  { name: 'La Rochelle', region: 'Nouvelle-Aquitaine', country: 'France', lat: 46.1603, lon: -1.1511, tz: 1 },
  { name: 'Annecy', region: 'Auvergne-Rhône-Alpes', country: 'France', lat: 45.8992, lon: 6.1294, tz: 1 },
  { name: 'Bayonne', region: 'Nouvelle-Aquitaine', country: 'France', lat: 43.4929, lon: -1.4748, tz: 1 },
  { name: 'Biarritz', region: 'Nouvelle-Aquitaine', country: 'France', lat: 43.4832, lon: -1.5586, tz: 1 },
  { name: 'Ajaccio', region: 'Corse', country: 'France', lat: 41.9192, lon: 8.7386, tz: 1 },
  { name: 'Bastia', region: 'Corse', country: 'France', lat: 42.6973, lon: 9.4509, tz: 1 },
  { name: 'Bruxelles', region: 'Bruxelles-Capitale', country: 'Belgique', lat: 50.8503, lon: 4.3517, tz: 1 },
  { name: 'Liège', region: 'Wallonie', country: 'Belgique', lat: 50.6326, lon: 5.5797, tz: 1 },
  { name: 'Charleroi', region: 'Wallonie', country: 'Belgique', lat: 50.4108, lon: 4.4446, tz: 1 },
  { name: 'Genève', region: 'Genève', country: 'Suisse', aliases: ['Geneve'], lat: 46.2044, lon: 6.1432, tz: 1 },
  { name: 'Lausanne', region: 'Vaud', country: 'Suisse', lat: 46.5197, lon: 6.6323, tz: 1 },
  { name: 'Zurich', region: 'Zurich', country: 'Suisse', lat: 47.3769, lon: 8.5417, tz: 1 },
  { name: 'Monaco', region: 'Monaco', country: 'Monaco', lat: 43.7384, lon: 7.4246, tz: 1 },
  { name: 'Luxembourg', region: 'Luxembourg', country: 'Luxembourg', lat: 49.6116, lon: 6.1319, tz: 1 },
  { name: 'Londres', region: 'Angleterre', country: 'Royaume-Uni', aliases: ['London'], lat: 51.5074, lon: -0.1278, tz: 0 },
  { name: 'Dublin', region: 'Leinster', country: 'Irlande', lat: 53.3498, lon: -6.2603, tz: 0 },
  { name: 'Madrid', region: 'Communauté de Madrid', country: 'Espagne', lat: 40.4168, lon: -3.7038, tz: 1 },
  { name: 'Barcelone', region: 'Catalogne', country: 'Espagne', aliases: ['Barcelona'], lat: 41.3874, lon: 2.1686, tz: 1 },
  { name: 'Lisbonne', region: 'Lisbonne', country: 'Portugal', aliases: ['Lisboa'], lat: 38.7223, lon: -9.1393, tz: 0 },
  { name: 'Rome', region: 'Latium', country: 'Italie', lat: 41.9028, lon: 12.4964, tz: 1 },
  { name: 'Milan', region: 'Lombardie', country: 'Italie', aliases: ['Milano'], lat: 45.4642, lon: 9.19, tz: 1 },
  { name: 'Berlin', region: 'Berlin', country: 'Allemagne', lat: 52.52, lon: 13.405, tz: 1 },
  { name: 'Munich', region: 'Bavière', country: 'Allemagne', aliases: ['München'], lat: 48.1351, lon: 11.582, tz: 1 },
  { name: 'Amsterdam', region: 'Hollande-Septentrionale', country: 'Pays-Bas', lat: 52.3676, lon: 4.9041, tz: 1 },
  { name: 'Vienne', region: 'Vienne', country: 'Autriche', aliases: ['Wien'], lat: 48.2082, lon: 16.3738, tz: 1 },
  { name: 'Copenhague', region: 'Hovedstaden', country: 'Danemark', aliases: ['Copenhagen'], lat: 55.6761, lon: 12.5683, tz: 1 },
  { name: 'Stockholm', region: 'Stockholm', country: 'Suède', lat: 59.3293, lon: 18.0686, tz: 1 },
  { name: 'Oslo', region: 'Oslo', country: 'Norvège', lat: 59.9139, lon: 10.7522, tz: 1 },
  { name: 'New York', region: 'État de New York', country: 'États-Unis', lat: 40.7128, lon: -74.006, tz: -5 },
  { name: 'Los Angeles', region: 'Californie', country: 'États-Unis', lat: 34.0522, lon: -118.2437, tz: -8 },
  { name: 'San Francisco', region: 'Californie', country: 'États-Unis', lat: 37.7749, lon: -122.4194, tz: -8 },
  { name: 'Chicago', region: 'Illinois', country: 'États-Unis', lat: 41.8781, lon: -87.6298, tz: -6 },
  { name: 'Miami', region: 'Floride', country: 'États-Unis', lat: 25.7617, lon: -80.1918, tz: -5 },
  { name: 'Montréal', region: 'Québec', country: 'Canada', aliases: ['Montreal'], lat: 45.5017, lon: -73.5673, tz: -5 },
  { name: 'Québec', region: 'Québec', country: 'Canada', aliases: ['Quebec'], lat: 46.8139, lon: -71.2082, tz: -5 },
  { name: 'Toronto', region: 'Ontario', country: 'Canada', lat: 43.6532, lon: -79.3832, tz: -5 },
  { name: 'Vancouver', region: 'Colombie-Britannique', country: 'Canada', lat: 49.2827, lon: -123.1207, tz: -8 },
  { name: 'Casablanca', region: 'Casablanca-Settat', country: 'Maroc', lat: 33.5731, lon: -7.5898, tz: 1 },
  { name: 'Rabat', region: 'Rabat-Salé-Kénitra', country: 'Maroc', lat: 34.0209, lon: -6.8416, tz: 1 },
  { name: 'Marrakech', region: 'Marrakech-Safi', country: 'Maroc', lat: 31.6295, lon: -7.9811, tz: 1 },
  { name: 'Alger', region: 'Alger', country: 'Algérie', lat: 36.7538, lon: 3.0588, tz: 1 },
  { name: 'Tunis', region: 'Tunis', country: 'Tunisie', lat: 36.8065, lon: 10.1815, tz: 1 },
  { name: 'Dakar', region: 'Dakar', country: 'Sénégal', lat: 14.7167, lon: -17.4677, tz: 0 },
  { name: 'Abidjan', region: 'Abidjan', country: 'Côte d’Ivoire', lat: 5.36, lon: -4.0083, tz: 0 },
  { name: 'Tokyo', region: 'Kantō', country: 'Japon', lat: 35.6762, lon: 139.6503, tz: 9 },
  { name: 'Séoul', region: 'Séoul', country: 'Corée du Sud', aliases: ['Seoul'], lat: 37.5665, lon: 126.978, tz: 9 },
  { name: 'Sydney', region: 'Nouvelle-Galles du Sud', country: 'Australie', lat: -33.8688, lon: 151.2093, tz: 10 },
];

const padBirthValue = (value: number) => String(value).padStart(2, '0');

const getBirthDateParts = (date?: Date) => {
  const safeDate = date && !Number.isNaN(date.getTime()) ? date : new Date(1998, 5, 12, 12, 0);
  return {
    day: safeDate.getDate(),
    month: safeDate.getMonth() + 1,
    year: safeDate.getFullYear(),
    hour: safeDate.getHours(),
    minute: safeDate.getMinutes(),
  };
};

const getDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

const normalizeBirthPlace = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const getTimezoneFromLongitude = (longitude: number) => Math.round(longitude / 15);

const findBirthCity = (place: string) => {
  const normalizedPlace = normalizeBirthPlace(place);
  if (!normalizedPlace) return null;

  return BIRTH_CITY_OPTIONS.find((city) => {
    const normalizedCity = normalizeBirthPlace(`${city.name} ${city.region || ''} ${city.country} ${(city.aliases || []).join(' ')}`);
    return normalizedCity.includes(normalizedPlace) || normalizedPlace.includes(normalizeBirthPlace(city.name));
  }) || null;
};

const formatBirthCityValue = (city: BirthCity) => (
  city.region ? `${city.name}, ${city.region}` : city.name
);

const formatBirthCityDetail = (city: BirthCity) => (
  city.region && city.region !== city.country ? `${city.region}, ${city.country}` : city.country
);

function BirthEditorWheelPicker({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: number;
  options: WheelOption[];
  onChange: (value: number) => void;
}) {
  const selectedOption = options.find((option) => option.value === value) || options[0];

  return (
    <div className="astral-profile__birth-wheel">
      <span className="astral-profile__birth-wheel-label">{label}</span>
      <label className="astral-profile__birth-wheel-control">
        <select value={value} onChange={(event) => onChange(Number(event.target.value))} aria-label={label}>
          {options.map((option) => (
            <option key={`${label}-${option.value}`} value={option.value}>
              {option.detail ? `${option.label} - ${option.detail}` : option.label}
            </option>
          ))}
        </select>
        <strong>{selectedOption?.label}</strong>
        {selectedOption?.detail && <small>{selectedOption.detail}</small>}
      </label>
    </div>
  );
}

const PLANET_GLYPHS: Record<PlanetKey, string> = {
  sun: '☉',
  moon: '☽',
  ascendant: 'AS',
  mercury: '☿',
  venus: '♀',
  mars: '♂',
  jupiter: '♃',
  saturn: '♄',
  uranus: '♅',
  neptune: '♆',
  pluto: '♇',
};

const ASPECT_SYMBOLS: Record<string, string> = {
  'Conjonction': '☌',
  'Opposition': '☍',
  'Trigone': '△',
  'Carré': '□',
  'Sextile': '⚹',
};

const PLANET_LABELS: Record<PlanetKey, string> = {
  sun: 'Soleil',
  moon: 'Lune',
  ascendant: 'Ascendant',
  mercury: 'Mercure',
  venus: 'Vénus',
  mars: 'Mars',
  jupiter: 'Jupiter',
  saturn: 'Saturne',
  uranus: 'Uranus',
  neptune: 'Neptune',
  pluto: 'Pluton',
};

const isMarsTrineUranusAspect = (aspect: any) => (
  aspect?.type === 'Trigone'
  && [aspect?.planet1, aspect?.planet2].sort().join('-') === 'mars-uranus'
);

const isVenusSquareUranusAspect = (aspect: any) => (
  aspect?.type === 'Carré'
  && [aspect?.planet1, aspect?.planet2].sort().join('-') === 'uranus-venus'
);

const usesAstroAspectBackground = (aspect: any) => (
  isMarsTrineUranusAspect(aspect) || isVenusSquareUranusAspect(aspect)
);

const renderAstroAspectBackground = () => (
  <>
    <div className="astro-aspect-background__stars" aria-hidden="true" />
    <div className="astro-aspect-background__grain" aria-hidden="true" />
    <div className="astro-aspect-background__halo astro-aspect-background__halo--gold" aria-hidden="true" />
    <div className="astro-aspect-background__halo astro-aspect-background__halo--red" aria-hidden="true" />
    <div className="astro-aspect-background__halo astro-aspect-background__halo--blue" aria-hidden="true" />
    <div className="astro-aspect-background__circle astro-aspect-background__circle--top" aria-hidden="true" />
    <div className="astro-aspect-background__circle astro-aspect-background__circle--bottom" aria-hidden="true" />
  </>
);

const renderPlanetGlyph = (key: PlanetKey, className: string) => (
  <span className={`${className} planet-${key}`}>
    {key === 'jupiter' ? (
      <svg
        className="astral-profile__jupiter-glyph"
        viewBox="-28 -32 64 70"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M -22,-8 C -22,-44 8,-44 8,-8" />
        <path d="M 8,-8 C 4,4 -10,8 -18,8 L 30,8" />
        <line x1="22" y1="-25" x2="22" y2="32" />
      </svg>
    ) : (
      <span className="astral-profile__planet-glyph-character">{PLANET_GLYPHS[key]}</span>
    )}
  </span>
);

interface AstralProfileProps {
  name: string;
  birthDate?: Date;
  birthPlace?: string;
  birthLatitude?: number;
  birthLongitude?: number;
  birthTimezoneOffset?: number;
  planetPositions: Record<string, any>;
  houses: any[];
  aspects?: any[];
  initialActivePlanet?: PlanetKey;
  fullscreenMode?: boolean;
  variant?: AstralProfileVariant;
  onEditBirthData?: (data: EditableBirthData) => Promise<void> | void;
  editBirthDataLoading?: boolean;
}

function getSignForPlanet(
  key: PlanetKey,
  planetPositions: Record<string, any>,
  houses: any[]
): string {
  if (key === 'ascendant') {
    const firstHouse = houses?.[0];
    return firstHouse?.sign || 'Bélier';
  }
  return planetPositions[key]?.sign || 'Bélier';
}

const HOUSE_ROMANS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

function getHouseRomanForPlanet(key: PlanetKey, planetPositions: Record<string, any>): string | null {
  const house = key === 'ascendant' ? 1 : Number(planetPositions[key]?.house);
  return Number.isInteger(house) && house >= 1 && house <= 12 ? HOUSE_ROMANS[house - 1] : null;
}

export default function AstralProfile({
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
  fullscreenMode = false,
  variant = 'default',
  onEditBirthData,
  editBirthDataLoading = false,
}: AstralProfileProps) {
  const isYou2 = variant === 'you2';
  const [activePlanet, setActivePlanet] = useState<PlanetKey>(initialActivePlanet || 'sun');
  const [expandedPlanet, setExpandedPlanet] = useState<PlanetKey | null>(initialActivePlanet || null);
  const [activeAspect, setActiveAspect] = useState<any | null>(null);
  const [activeSection, setActiveSection] = useState<AstralProfileSection>('planets');
  const [sectionSwitchVisible, setSectionSwitchVisible] = useState(false);
  const [isEditingBirthData, setIsEditingBirthData] = useState(false);
  const [editName, setEditName] = useState(name);
  const [birthEditorDate, setBirthEditorDate] = useState(() => getBirthDateParts(birthDate));
  const [editPlace, setEditPlace] = useState(birthPlace || '');
  const [selectedEditCity, setSelectedEditCity] = useState<BirthCity | null>(() => findBirthCity(birthPlace || ''));
  const contentRef = useRef<HTMLDivElement>(null);
  const pillsContainerRef = useRef<HTMLDivElement>(null);
  const activePillRef = useRef<HTMLButtonElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const sectionSwitchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditingBirthData) return;
    setEditName(name);
    setBirthEditorDate(getBirthDateParts(birthDate));
    setEditPlace(birthPlace || '');
    setSelectedEditCity(findBirthCity(birthPlace || ''));
  }, [birthDate, birthPlace, isEditingBirthData, name]);

  // Set active planet when initialActivePlanet prop changes
  useEffect(() => {
    if (initialActivePlanet) {
      setActivePlanet(initialActivePlanet);
      setExpandedPlanet(initialActivePlanet);
      setActiveAspect(null);
      setActiveSection('planets');
      window.setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    } else {
      topRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, [initialActivePlanet]);

  useEffect(() => {
    const sectionSwitch = sectionSwitchRef.current;
    if (!sectionSwitch) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSectionSwitchVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSectionSwitchVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.24 });

    observer.observe(sectionSwitch);
    return () => observer.disconnect();
  }, []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const daysInSelectedMonth = useMemo(
    () => getDaysInMonth(birthEditorDate.year, birthEditorDate.month),
    [birthEditorDate.month, birthEditorDate.year]
  );
  const dayOptions = useMemo<WheelOption[]>(
    () => Array.from({ length: daysInSelectedMonth }, (_, index) => ({ value: index + 1, label: padBirthValue(index + 1) })),
    [daysInSelectedMonth]
  );
  const yearOptions = useMemo<WheelOption[]>(
    () => Array.from({ length: currentYear - 1925 + 1 }, (_, index) => {
      const value = currentYear - index;
      return { value, label: String(value) };
    }),
    [currentYear]
  );
  const hourOptions = useMemo<WheelOption[]>(
    () => Array.from({ length: 24 }, (_, index) => ({ value: index, label: padBirthValue(index) })),
    []
  );
  const minuteOptions = useMemo<WheelOption[]>(
    () => Array.from({ length: 60 }, (_, index) => ({ value: index, label: padBirthValue(index) })),
    []
  );

  useEffect(() => {
    if (birthEditorDate.day <= daysInSelectedMonth) return;
    setBirthEditorDate((current) => ({ ...current, day: daysInSelectedMonth }));
  }, [birthEditorDate.day, daysInSelectedMonth]);

  const updateBirthEditorDate = (key: keyof typeof birthEditorDate, value: number) => {
    setBirthEditorDate((current) => {
      const next = { ...current, [key]: value };
      const nextDaysInMonth = getDaysInMonth(next.year, next.month);
      return {
        ...next,
        day: Math.min(next.day, nextDaysInMonth),
      };
    });
  };

  const sign = getSignForPlanet(activePlanet, planetPositions, houses);
  const activeHouseRoman = getHouseRomanForPlanet(activePlanet, planetPositions);
  const interpretation = getDetailedInterpretation(activePlanet, sign);
  const scrollDescriptionToTop = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const description = contentRef.current;
        if (!description) {
          return;
        }

        const scrollContainer = description.closest('.app-content') as HTMLElement | null;
        if (scrollContainer) {
          const containerRect = scrollContainer.getBoundingClientRect();
          const descriptionRect = description.getBoundingClientRect();
          scrollContainer.scrollTo({
            top: scrollContainer.scrollTop + descriptionRect.top - containerRect.top - 12,
            behavior: 'smooth',
          });
          return;
        }

        window.scrollTo({
          top: window.scrollY + description.getBoundingClientRect().top - 12,
          behavior: 'smooth',
        });
      });
    });
  };

  const triggerHaptic = (duration = 7) => {
    if (window.matchMedia('(pointer: coarse)').matches && 'vibrate' in navigator) {
      navigator.vibrate(duration);
    }
  };

  const handlePlanetClick = (key: PlanetKey) => {
    triggerHaptic();
    const shouldOpen = expandedPlanet !== key || Boolean(activeAspect);
    setActiveSection('planets');
    setActivePlanet(key);
    setExpandedPlanet(shouldOpen ? key : null);
    setActiveAspect(null);
    if (shouldOpen) {
      scrollDescriptionToTop();
    }
  };

  const handleAspectClick = (aspect: any) => {
    if (!aspect) {
      setActiveAspect(null);
      return;
    }
    triggerHaptic();
    const isSameAspect = activeAspect?.planet1 === aspect.planet1 && activeAspect?.planet2 === aspect.planet2 && activeAspect?.type === aspect.type;
    setExpandedPlanet(null);
    setActiveAspect(isSameAspect ? null : aspect);
    setActiveSection('aspects');
    if (!isSameAspect) {
      scrollDescriptionToTop();
    }
  };

  const getAspectClass = (aspectType: string): { color: string; border: string } => {
    const typeMap: Record<string, string> = {
      'Conjonction': 'conjonction',
      'Trigone': 'trigone',
      'Carré': 'carre',
      'Opposition': 'opposition',
      'Sextile': 'sextile',
    };
    const key = typeMap[aspectType] || 'conjonction';
    return {
      color: `aspect-${key}`,
      border: `aspect-${key}-border`,
    };
  };

  const visibleAspects = (aspects || [])
    .filter((a) => {
      if (a.type === 'Conjonction' && a.orb > 2) {
        return false;
      }
      return ['Conjonction', 'Trigone', 'Carré', 'Opposition', 'Sextile'].includes(a.type);
    })
    .slice(0, 20);

  const signActivations = useMemo(() => {
    const signs = new Map<string, PlanetKey[]>();

    ASTRAL_PROFILE_PLANET_KEYS.forEach((key) => {
      const signName = getSignForPlanet(key, planetPositions, houses);
      const currentKeys = signs.get(signName) || [];
      currentKeys.push(key);
      signs.set(signName, currentKeys);
    });

    return Array.from(signs.entries()).map(([signName, keys]) => ({
      signName,
      keys,
    }));
  }, [houses, planetPositions]);

  const houseActivations = useMemo(() => (
    (houses || []).slice(0, 12).map((house, index) => ({
      index: index + 1,
      roman: HOUSE_ROMANS[index] || String(index + 1),
      signName: house?.sign || 'Signe non disponible',
      cusp: typeof house?.cusp === 'number' ? house.cusp : null,
    }))
  ), [houses]);

  const editCitySuggestions = useMemo(() => {
    const query = normalizeBirthPlace(editPlace);
    if (query.length < 2) return BIRTH_CITY_OPTIONS.slice(0, 10);

    return BIRTH_CITY_OPTIONS
      .filter((city) => normalizeBirthPlace(`${city.name} ${city.region || ''} ${city.country} ${(city.aliases || []).join(' ')}`).includes(query))
      .slice(0, 10);
  }, [editPlace]);

  const resetBirthEditor = () => {
    setEditName(name);
    setBirthEditorDate(getBirthDateParts(birthDate));
    setEditPlace(birthPlace || '');
    setSelectedEditCity(findBirthCity(birthPlace || ''));
  };

  const closeBirthEditor = () => {
    resetBirthEditor();
    setIsEditingBirthData(false);
  };

  const handleBirthEditSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!onEditBirthData || editBirthDataLoading) return;

    const place = editPlace.trim();
    const normalizedPlace = normalizeBirthPlace(place);
    const matchedSelectedCity = selectedEditCity && normalizeBirthPlace(formatBirthCityValue(selectedEditCity)) === normalizedPlace
      ? selectedEditCity
      : null;
    const matchedCity = matchedSelectedCity || findBirthCity(place) || editCitySuggestions[0] || findBirthCity(birthPlace || '');
    const fallbackLongitude = birthLongitude ?? matchedCity?.lon ?? BIRTH_CITY_OPTIONS[0].lon;
    const latitude = matchedCity?.lat ?? birthLatitude ?? BIRTH_CITY_OPTIONS[0].lat;
    const longitude = matchedCity?.lon ?? fallbackLongitude;
    const timezoneOffset = matchedCity?.tz ?? birthTimezoneOffset ?? getTimezoneFromLongitude(longitude);

    await onEditBirthData({
      name: editName.trim() || name,
      date: `${birthEditorDate.year}-${padBirthValue(birthEditorDate.month)}-${padBirthValue(birthEditorDate.day)}`,
      time: `${padBirthValue(birthEditorDate.hour)}:${padBirthValue(birthEditorDate.minute)}`,
      place: place || birthPlace || BIRTH_CITY_OPTIONS[0].name,
      latitude,
      longitude,
      timezoneOffset,
    });

    setIsEditingBirthData(false);
  };

  const closeExpandedSection = (
    event: MouseEvent<HTMLButtonElement>,
    close: () => void,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const trigger = event.currentTarget;
    const section = trigger.closest('.astral-profile__inline-section') as HTMLElement | null;
    const scrollContainer = trigger.closest('.app-content') as HTMLElement | null;
    trigger.blur();

    close();

    window.requestAnimationFrame(() => {
      if (!section) {
        return;
      }

      if (scrollContainer) {
        const containerRect = scrollContainer.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();
        scrollContainer.scrollTo({
          top: scrollContainer.scrollTop + sectionRect.top - containerRect.top - 12,
          behavior: 'auto',
        });
        return;
      }

      window.scrollTo({
        top: window.scrollY + section.getBoundingClientRect().top - 12,
        behavior: 'auto',
      });
    });
  };

  const scrollToPremiumReading = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const root = event.currentTarget.closest('.min-h-screen') as HTMLElement | null;
    const premium = (root ?? document).querySelector(
      '.astral-profile__action-suite--eclipse, .astral-profile__premium-cta',
    ) as HTMLElement | null;
    const scroller = event.currentTarget.closest('.app-content') as HTMLElement | null;
    if (!premium) return;

    if (scroller) {
      const containerRect = scroller.getBoundingClientRect();
      const targetRect = premium.getBoundingClientRect();
      scroller.scrollTo({
        top: scroller.scrollTop + targetRect.top - containerRect.top - 18,
        behavior: 'smooth',
      });
      return;
    }

    premium.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const renderPremiumTeaser = () => (
    <div className="astral-profile__premium-teaser">
      <p className="astral-profile__premium-teaser-text">
        Ceci n’est qu’un aperçu. La lecture complète révèle les liens entre planètes, maisons et aspects.
      </p>
      <button
        type="button"
        className="astral-profile__premium-teaser-btn"
        onMouseDown={(event) => event.preventDefault()}
        onClick={scrollToPremiumReading}
      >
        <span>Découvrir la lecture complète</span>
        <ArrowRight size={14} strokeWidth={1.7} aria-hidden="true" />
      </button>
    </div>
  );

  const renderAspectDescription = (aspect: any, className = 'astral-profile__content astral-profile__content--inline') => (
    <div className={`${className}${usesAstroAspectBackground(aspect) ? ' astro-aspect-background astro-aspect-background--active' : ''}`} key={`${aspect.planet1}-${aspect.type}-${aspect.planet2}`} ref={contentRef}>
      {usesAstroAspectBackground(aspect) && renderAstroAspectBackground()}
      <h2 className="astral-profile__title">
        {PLANET_INFO[aspect.planet1]?.name || aspect.planet1} {aspect.type}{' '}
        {PLANET_INFO[aspect.planet2]?.name || aspect.planet2}
      </h2>
      <p className="astral-profile__sign-subtitle astral-profile__description-aspect-signature">
        {renderPlanetGlyph(aspect.planet1 as PlanetKey, 'astral-profile__aspect-glyph astral-profile__description-aspect-glyph')}
        <span className="astral-profile__aspect-planet">{PLANET_INFO[aspect.planet1]?.name || aspect.planet1}</span>
        <span className={`astral-profile__aspect-symbol ${getAspectClass(aspect.type).color}`}>
          <span className="astral-profile__aspect-symbol-mark">{ASPECT_SYMBOLS[aspect.type] || '◆'}</span>
        </span>
        <span className="astral-profile__aspect-planet">{PLANET_INFO[aspect.planet2]?.name || aspect.planet2}</span>
        {renderPlanetGlyph(aspect.planet2 as PlanetKey, 'astral-profile__aspect-glyph astral-profile__description-aspect-glyph')}
        <span className="astral-profile__orb-display astral-profile__description-meta">
          {aspect.orb.toFixed(1)}° d'orbe
        </span>
      </p>

      {getAspectInterpretation(aspect.planet1, aspect.planet2, aspect.type).split('\n\n').map((paragraph, i) => (
        <p key={i} className="astral-profile__paragraph">
          {paragraph}
        </p>
      ))}
      {renderPremiumTeaser()}
      <button
        type="button"
        className="astral-profile__collapse-bottom"
        onMouseDown={(event) => event.preventDefault()}
        onClick={(event) => closeExpandedSection(event, () => setActiveAspect(null))}
        aria-label="Replier la description"
      >
        <ChevronDown size={18} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </div>
  );

  const renderPlanetDescription = (className = 'astral-profile__content astral-profile__content--inline') => (
    <div className={className} key={`${activePlanet}-${sign}`} ref={contentRef}>
      <h2 className="astral-profile__title">
        {PLANET_LABELS[activePlanet]} en {sign}
      </h2>
      <p className="astral-profile__sign-subtitle astral-profile__description-planet-signature">
        {renderPlanetGlyph(activePlanet, 'astral-profile__pill-glyph astral-profile__description-planet-medallion')}
        <span className="astral-profile__description-planet-sign">{sign}</span>
        {activeHouseRoman && (
          <span className="astral-profile__description-planet-house astral-profile__description-meta">
            {activeHouseRoman}
          </span>
        )}
      </p>

      {interpretation ? (
        interpretation.split('\n\n').map((paragraph, i) => (
          <p key={i} className="astral-profile__paragraph">
            {paragraph}
          </p>
        ))
      ) : (
        <p className="astral-profile__paragraph">
          Interprétation détaillée bientôt disponible.
        </p>
      )}
      {renderPremiumTeaser()}
      <button
        type="button"
        className="astral-profile__collapse-bottom"
        onMouseDown={(event) => event.preventDefault()}
        onClick={(event) => closeExpandedSection(event, () => setExpandedPlanet(null))}
        aria-label="Replier la description"
      >
        <ChevronDown size={18} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <div className={`min-h-screen bg-[#06070a]${isYou2 ? ' astral-profile--you2' : ''}`}>
      <div ref={topRef} />
      {/* Roue Zodiacale en haut */}
      {birthDate && birthPlace && (<>
        <div className={`${fullscreenMode ? 'astral-profile-wheel-page w-full' : 'relative mb-6 pt-2 pb-6 px-2 sm:px-4'}${isYou2 ? ' astral-profile-wheel-page--you2' : ''} relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#0d0d10] before:via-[#09090c] before:to-[#06070a] before:pointer-events-none before:opacity-95 after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[500px] after:h-[500px] after:blur-3xl after:opacity-20 after:pointer-events-none after:rounded-full`} style={{ '--tw-gradient-stops': 'rgb(40, 39, 42), rgb(18, 18, 22)' } as React.CSSProperties}>
          <style>{`
            .zodiac-space-bg::after {
              background: radial-gradient(circle, rgba(160, 160, 160, 0.15) 0%, rgba(120, 120, 120, 0.08) 40%, transparent 70%);
            }
            @keyframes float-glow {
              0%, 100% { 
                box-shadow: 0 0 60px rgba(160, 160, 160, 0.15), 
                           0 0 100px rgba(120, 120, 120, 0.08),
                           inset 0 0 100px rgba(160, 160, 160, 0.05);
              }
              50% { 
                box-shadow: 0 0 100px rgba(160, 160, 160, 0.25), 
                           0 0 150px rgba(120, 120, 120, 0.12),
                           inset 0 0 120px rgba(160, 160, 160, 0.08);
              }
            }
            .zodiac-wheel-container {
              animation: float-glow 5s ease-in-out infinite;
              filter: drop-shadow(0 0 30px rgba(160, 160, 160, 0.1));
            }
          `}</style>
          <div className={`relative z-10 zodiac-wheel-container${isYou2 ? ' zodiac-wheel-container--you2' : ''}`} data-you2-focus={activeAspect ? 'aspect' : activePlanet}>
            {isYou2 && (
              <>
                <div className="you2-depth-layer you2-depth-layer--stars" aria-hidden="true" />
                <div className="you2-depth-layer you2-depth-layer--halo" aria-hidden="true" />
                <div className="you2-depth-layer you2-depth-layer--particles" aria-hidden="true" />
              </>
            )}
            <div className={isYou2 ? 'you2-wheel-depth-shell' : undefined}>
            <NatalChart
              name={name}
              birthDate={birthDate}
              birthPlace={birthPlace}
              planetPositions={planetPositions}
              houses={houses}
              aspects={aspects}
              onAspectClick={handleAspectClick}
              onPlanetClick={(key) => handlePlanetClick(key as PlanetKey)}
              fullscreenMode={fullscreenMode}
            />
            {onEditBirthData && (
              <div className="astral-profile__edit-theme-bar">
                <button
                  type="button"
                  className="astral-profile__edit-theme-button"
                  onClick={() => setIsEditingBirthData(true)}
                >
                  <Pencil size={15} strokeWidth={1.8} aria-hidden="true" />
                  <span>Modifier mon thème</span>
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
        <div className="astral-profile__gold-divider" aria-hidden="true" />
        {onEditBirthData && isEditingBirthData && (
          <div className="astral-profile__birth-editor" role="dialog" aria-modal="true" aria-labelledby="birth-editor-title">
            <div className="astral-profile__birth-editor-panel">
              <button
                type="button"
                className="astral-profile__birth-editor-close"
                onClick={closeBirthEditor}
                aria-label="Fermer"
              >
                <X size={18} strokeWidth={1.7} aria-hidden="true" />
              </button>

              <div className="astral-profile__birth-editor-heading">
                <span>Thème natal</span>
                <h2 id="birth-editor-title">Modifier mes infos de naissance</h2>
              </div>

              <form className="astral-profile__birth-editor-form" onSubmit={handleBirthEditSubmit}>
                <label className="astral-profile__birth-editor-field">
                  <span>Prénom</span>
                  <input
                    value={editName}
                    onChange={(event) => setEditName(event.target.value)}
                    autoComplete="given-name"
                    required
                  />
                </label>

                <div className="astral-profile__birth-editor-wheel-section">
                  <div className="astral-profile__birth-editor-section-title">
                    <Calendar size={14} strokeWidth={1.7} aria-hidden="true" />
                    <span>Date de naissance</span>
                  </div>
                  <div className="astral-profile__birth-editor-wheel-grid astral-profile__birth-editor-wheel-grid--date">
                    <BirthEditorWheelPicker
                      label="Jour"
                      value={birthEditorDate.day}
                      options={dayOptions}
                      onChange={(value) => updateBirthEditorDate('day', value)}
                    />
                    <BirthEditorWheelPicker
                      label="Mois"
                      value={birthEditorDate.month}
                      options={MONTH_OPTIONS}
                      onChange={(value) => updateBirthEditorDate('month', value)}
                    />
                    <BirthEditorWheelPicker
                      label="Année"
                      value={birthEditorDate.year}
                      options={yearOptions}
                      onChange={(value) => updateBirthEditorDate('year', value)}
                    />
                  </div>
                </div>

                <div className="astral-profile__birth-editor-wheel-section">
                  <div className="astral-profile__birth-editor-section-title">
                    <Clock size={14} strokeWidth={1.7} aria-hidden="true" />
                    <span>Heure de naissance</span>
                  </div>
                  <div className="astral-profile__birth-editor-wheel-grid astral-profile__birth-editor-wheel-grid--time">
                    <BirthEditorWheelPicker
                      label="Heure"
                      value={birthEditorDate.hour}
                      options={hourOptions}
                      onChange={(value) => updateBirthEditorDate('hour', value)}
                    />
                    <BirthEditorWheelPicker
                      label="Minute"
                      value={birthEditorDate.minute}
                      options={minuteOptions}
                      onChange={(value) => updateBirthEditorDate('minute', value)}
                    />
                  </div>
                </div>

                <label className="astral-profile__birth-editor-field">
                  <span><MapPin size={13} strokeWidth={1.7} aria-hidden="true" /> Ville</span>
                  <input
                    value={editPlace}
                    onChange={(event) => {
                      setEditPlace(event.target.value);
                      setSelectedEditCity(null);
                    }}
                    list="astral-profile-birth-cities"
                    autoComplete="off"
                    placeholder="Ville de naissance"
                    required
                  />
                  <datalist id="astral-profile-birth-cities">
                    {BIRTH_CITY_OPTIONS.map((city) => (
                      <option
                        key={`${city.name}-${city.country}`}
                        value={formatBirthCityValue(city)}
                      />
                    ))}
                  </datalist>
                  <small className="astral-profile__birth-editor-help">
                    Tape ta ville ou choisis une suggestion pour recalculer ton thème.
                  </small>
                </label>

                {editCitySuggestions.length > 0 ? (
                  <div className="astral-profile__birth-editor-suggestions" aria-label="Suggestions de villes">
                    {editCitySuggestions.map((city) => {
                      const cityValue = formatBirthCityValue(city);
                      const isSelected = normalizeBirthPlace(editPlace) === normalizeBirthPlace(cityValue);

                      return (
                        <button
                          key={`${city.name}-${city.country}`}
                          type="button"
                          className={isSelected ? 'is-selected' : ''}
                          onClick={() => {
                            setEditPlace(cityValue);
                            setSelectedEditCity(city);
                          }}
                        >
                          <span>{city.name}</span>
                          <small>{formatBirthCityDetail(city)}</small>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="astral-profile__birth-editor-empty">
                    Aucune ville trouvée dans la liste. Tu peux quand même enregistrer avec le lieu saisi.
                  </p>
                )}

                <div className="astral-profile__birth-editor-actions">
                  <button type="button" onClick={closeBirthEditor}>
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={editBirthDataLoading || !editPlace.trim()}
                  >
                    <Save size={15} strokeWidth={1.8} aria-hidden="true" />
                    <span>{editBirthDataLoading ? 'Mise à jour...' : 'Enregistrer'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>)}

      {/* Profil Astral */}
      <div className="astral-profile">
      <div
        ref={sectionSwitchRef}
        className={`astral-profile__section-switch astral-profile__section-switch--reveal${isYou2 ? ' astral-profile__section-switch--you2' : ''} ${sectionSwitchVisible ? 'is-revealed' : ''}`}
        role="tablist"
        aria-label="Sections du theme astral"
      >
        <button
          type="button"
          className={`astral-profile__section-card ${activeSection === 'planets' ? 'astral-profile__section-card--active' : ''}`}
          onClick={() => {
            triggerHaptic(10);
            setActiveSection('planets');
            setActiveAspect(null);
            setExpandedPlanet(null);
          }}
          role="tab"
          aria-selected={activeSection === 'planets'}
        >
          <span className="astral-profile__section-card-title">Planètes</span>
          <span className="astral-profile__planet-mark" aria-hidden="true">
            <svg className="astral-profile__saturn-mark" viewBox="0 0 64 34" focusable="false">
              <circle className="astral-profile__saturn-body" cx="32" cy="18" r="9.4" />
            </svg>
          </span>
        </button>
        {isYou2 && (
          <>
            <button
              type="button"
              className={`astral-profile__section-card ${activeSection === 'signs' ? 'astral-profile__section-card--active' : ''}`}
              onClick={() => {
                triggerHaptic(10);
                setActiveSection('signs');
                setExpandedPlanet(null);
                setActiveAspect(null);
              }}
              role="tab"
              aria-selected={activeSection === 'signs'}
            >
              <span className="astral-profile__section-card-title">Signes</span>
              <span className="astral-profile__link-mark" aria-hidden="true">
                <svg className="astral-profile__mini-wheel" viewBox="0 0 64 34" focusable="false">
                  <circle className="astral-profile__mini-wheel-ring" cx="32" cy="17" r="14" />
                  <path className="astral-profile__mini-wheel-chord" d="M 18 17 H 46" />
                  <path className="astral-profile__mini-wheel-chord" d="M 32 3 V 31" />
                </svg>
              </span>
            </button>
            <button
              type="button"
              className={`astral-profile__section-card ${activeSection === 'houses' ? 'astral-profile__section-card--active' : ''}`}
              onClick={() => {
                triggerHaptic(10);
                setActiveSection('houses');
                setExpandedPlanet(null);
                setActiveAspect(null);
              }}
              role="tab"
              aria-selected={activeSection === 'houses'}
            >
              <span className="astral-profile__section-card-title">Maisons</span>
              <span className="astral-profile__link-mark" aria-hidden="true">
                <svg className="astral-profile__mini-wheel" viewBox="0 0 64 34" focusable="false">
                  <circle className="astral-profile__mini-wheel-ring" cx="32" cy="17" r="14" />
                  <path className="astral-profile__mini-wheel-chord" d="M 32 17 L 45 10" />
                  <path className="astral-profile__mini-wheel-chord" d="M 32 17 L 21 27" />
                  <circle className="astral-profile__mini-wheel-point" cx="32" cy="17" r="2.4" />
                </svg>
              </span>
            </button>
          </>
        )}
        <button
          type="button"
          className={`astral-profile__section-card ${activeSection === 'aspects' ? 'astral-profile__section-card--active' : ''}`}
          onClick={() => {
            triggerHaptic(10);
            setActiveSection('aspects');
            setExpandedPlanet(null);
            setActiveAspect(null);
          }}
          role="tab"
          aria-selected={activeSection === 'aspects'}
          disabled={visibleAspects.length === 0}
        >
          <span className="astral-profile__section-card-title">Aspects</span>
          <span className="astral-profile__link-mark" aria-hidden="true">
            <svg className="astral-profile__mini-wheel" viewBox="0 0 64 34" focusable="false">
              <circle className="astral-profile__mini-wheel-ring" cx="32" cy="17" r="14" />
              <path className="astral-profile__mini-wheel-chord" d="M 20.5 9.5 L 43.5 24.5" />
              <circle className="astral-profile__mini-wheel-point" cx="20.5" cy="9.5" r="3.1" />
              <circle className="astral-profile__mini-wheel-point" cx="43.5" cy="24.5" r="3.1" />
            </svg>
          </span>
        </button>
      </div>

      {activeSection === 'planets' && (
        <div className="astral-profile__drawer" role="tabpanel">
          <div className="astral-profile__pills" ref={pillsContainerRef}>
            {ASTRAL_PROFILE_PLANET_KEYS.map((key) => {
              const pillSign = getSignForPlanet(key, planetPositions, houses);
              const pillHouse = getHouseRomanForPlanet(key, planetPositions);
              const isExpanded = expandedPlanet === key && !activeAspect;
              return (
                <div key={key} className={`astral-profile__inline-section astral-profile__accordion-card ${isExpanded ? 'astral-profile__accordion-card--active' : ''}`}>
                  <button
                    ref={isExpanded ? activePillRef : null}
                    className={`astral-profile__sign-pill planet-row-${key} ${isExpanded ? 'astral-profile__sign-pill--active' : ''}`}
                    onClick={() => handlePlanetClick(key)}
                    aria-expanded={isExpanded}
                  >
                    {renderPlanetGlyph(key, 'astral-profile__pill-glyph')}
                    <span>{PLANET_LABELS[key]}</span>
                    <span className="astral-profile__pill-sign">{pillSign}</span>
                    {pillHouse && (
                      <span className="astral-profile__pill-house" title={`Maison ${pillHouse}`} aria-label={`Maison ${pillHouse}`}>
                        {pillHouse}
                      </span>
                    )}
                    <ChevronDown className={`astral-profile__row-chevron ${isExpanded ? 'astral-profile__row-chevron--open' : ''}`} size={16} strokeWidth={1.8} aria-hidden="true" />
                  </button>
                  {isExpanded && (
                    <div className="astral-profile__accordion-motion">
                      <div className="astral-profile__accordion-motion-inner">
                        {renderPlanetDescription('astral-profile__content astral-profile__content--accordion')}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isYou2 && activeSection === 'signs' && (
        <div className="astral-profile__drawer astral-profile__drawer--you2" role="tabpanel">
          <div className="astral-profile__you2-panel-handle" aria-hidden="true" />
          <div className="astral-profile__you2-grid">
            {signActivations.map(({ signName, keys }) => (
              <article className="astral-profile__you2-insight-card" key={signName}>
                <span className="astral-profile__you2-card-kicker">Signe active</span>
                <h2 className="astral-profile__title">{signName}</h2>
                <p className="astral-profile__sign-subtitle">
                  {keys.map((key) => PLANET_LABELS[key]).join(' · ')}
                </p>
                <p className="astral-profile__paragraph">
                  Ce signe colore les points clefs de ton theme. Il indique la tonalite dominante a observer avant d'ouvrir une lecture plus detaillee.
                </p>
                <button type="button" className="astral-profile__you2-panel-action">
                  Voir l'analyse complete
                </button>
              </article>
            ))}
          </div>
        </div>
      )}

      {isYou2 && activeSection === 'houses' && (
        <div className="astral-profile__drawer astral-profile__drawer--you2" role="tabpanel">
          <div className="astral-profile__you2-panel-handle" aria-hidden="true" />
          <div className="astral-profile__you2-grid astral-profile__you2-grid--houses">
            {houseActivations.map((house) => (
              <article className="astral-profile__you2-insight-card" key={`house-${house.index}`}>
                <span className="astral-profile__you2-card-kicker">Maison {house.roman}</span>
                <h2 className="astral-profile__title">Maison {house.roman}</h2>
                <p className="astral-profile__sign-subtitle">
                  {house.signName}
                  {house.cusp !== null ? ` · ${Math.round(((house.cusp % 30) + 30) % 30)}°` : ''}
                </p>
                <p className="astral-profile__paragraph">
                  Cette zone montre ou ton energie s'exprime le plus naturellement. Elle conserve les separations exactes de ton theme natal.
                </p>
                <button type="button" className="astral-profile__you2-panel-action">
                  Voir l'analyse complete
                </button>
              </article>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'aspects' && (
        <div className="astral-profile__drawer" role="tabpanel">
          {visibleAspects.length > 0 ? (
            <>
              <div className="astral-profile__aspects-list">
                {visibleAspects.map((aspect, index) => {
                  const p1Name = PLANET_INFO[aspect.planet1]?.name || aspect.planet1;
                  const p2Name = PLANET_INFO[aspect.planet2]?.name || aspect.planet2;
                  const aspectSymbol = ASPECT_SYMBOLS[aspect.type] || '◆';
                  const isActive = activeAspect?.planet1 === aspect.planet1 && activeAspect?.planet2 === aspect.planet2 && activeAspect?.type === aspect.type;
                  const { color: colorClass, border: borderClass } = getAspectClass(aspect.type);

                  return (
                    <div key={`${aspect.planet1}-${aspect.type}-${aspect.planet2}-${index}`} className={`astral-profile__inline-section astral-profile__accordion-card ${borderClass} ${isActive ? 'astral-profile__accordion-card--active' : ''}`}>
                    <button
                      key={`${aspect.planet1}-${aspect.type}-${aspect.planet2}-${index}`}
                      className={`astral-profile__aspect-item ${borderClass} ${isActive ? 'astral-profile__aspect-item--active' : ''}`}
                      onClick={() => handleAspectClick(aspect)}
                      aria-expanded={isActive}
                    >
                      {renderPlanetGlyph(aspect.planet1 as PlanetKey, 'astral-profile__aspect-glyph')}
                      <span className="astral-profile__aspect-planet">{p1Name}</span>
                      <span className={`astral-profile__aspect-symbol ${colorClass}`}>
                        <span className="astral-profile__aspect-symbol-mark">{aspectSymbol}</span>
                      </span>
                      <span className="astral-profile__aspect-planet">{p2Name}</span>
                      {renderPlanetGlyph(aspect.planet2 as PlanetKey, 'astral-profile__aspect-glyph')}
                      <ChevronDown className={`astral-profile__row-chevron ${isActive ? 'astral-profile__row-chevron--open' : ''}`} size={16} strokeWidth={1.8} aria-hidden="true" />
                    </button>
                    {isActive && activeAspect && (
                      <div className="astral-profile__accordion-motion">
                        <div className="astral-profile__accordion-motion-inner">
                          {renderAspectDescription(aspect, 'astral-profile__content astral-profile__content--accordion')}
                        </div>
                      </div>
                    )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="astral-profile__content astral-profile__content--drawer">
              <h2 className="astral-profile__title">Aucun aspect majeur</h2>
              <p className="astral-profile__paragraph">
                Aucun aspect majeur détecté dans ce thème natal.
              </p>
            </div>
          )}
        </div>
      )}

      <section className="astral-profile__action-suite astral-profile__action-suite--eclipse" aria-label="Explorer davantage ton thème astral">
        <div className="astral-profile__premium-cta">
          <div className="astral-profile__premium-cta-frame" aria-hidden="true" />
          <div className="astral-profile__premium-cta-aura" aria-hidden="true" />
          <div className="astral-profile__premium-cta-shine" aria-hidden="true" />
          <svg className="astral-profile__premium-constellation" viewBox="0 0 110 74" aria-hidden="true">
            <path d="M8 58 L34 27 L60 45 L82 14 L103 31" />
            <circle cx="8" cy="58" r="2" />
            <circle cx="34" cy="27" r="2.6" />
            <circle cx="60" cy="45" r="1.8" />
            <circle cx="82" cy="14" r="2.3" />
            <circle cx="103" cy="31" r="1.7" />
          </svg>

          <div className="astral-profile__premium-cta-heading">
            <div className="astral-profile__premium-cta-icon" aria-hidden="true">
              <Sparkles size={18} strokeWidth={1.6} />
            </div>
            <span className="astral-profile__premium-cta-kicker">Portrait astral complet</span>
            <span className="astral-profile__premium-cta-badge">Premium</span>
          </div>

          <div className="astral-profile__premium-celestial-seal" aria-hidden="true">
            <svg viewBox="0 0 72 72" focusable="false">
              <circle className="astral-profile__premium-seal-ring" cx="36" cy="36" r="31" />
              <circle className="astral-profile__premium-seal-orbit" cx="36" cy="36" r="23" />
              <path className="astral-profile__premium-seal-star" d="M36 13 L40.5 31.5 L59 36 L40.5 40.5 L36 59 L31.5 40.5 L13 36 L31.5 31.5 Z" />
              <circle className="astral-profile__premium-seal-core" cx="36" cy="36" r="3.2" />
            </svg>
          </div>

          <div className="astral-profile__premium-cta-copy">
            <h2 className="astral-profile__premium-cta-title">Le ciel de {name}, révélé dans l'ombre.</h2>
            <p className="astral-profile__premium-cta-text">
              Explore les dynamiques invisibles qui façonnent ta manière d'aimer, d'agir et de devenir.
            </p>
          </div>

          <div className="astral-profile__premium-cta-topics" aria-label="Contenu de l'analyse">
            <span><small>01</small>Planètes</span>
            <span><small>02</small>Maisons</span>
            <span><small>03</small>Aspects</span>
          </div>

          <button type="button" className="astral-profile__premium-cta-button">
            <span>Ouvrir ma lecture complète</span>
            <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </div>

      </section>
      </div>
    </div>
  );
}
