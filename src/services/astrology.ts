import * as Astronomy from 'astronomy-engine';

export interface BirthData {
  date: Date;
  latitude: number;
  longitude: number;
}

export interface PlanetPosition {
  longitude: number;
  latitude: number;
  distance: number;
  sign: string;
  signDegree: number;
  house: number;
}

export interface House {
  cusp: number;
  sign: string;
  signDegree: number;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  type: string;
  angle: number;
  orb: number;
}

const ZODIAC_SIGNS = [
  'Bélier', 'Taureau', 'Gémeaux', 'Cancer',
  'Lion', 'Vierge', 'Balance', 'Scorpion',
  'Sagittaire', 'Capricorne', 'Verseau', 'Poissons'
];

const PLANETS = [
  { key: 'sun', name: 'Soleil', body: Astronomy.Body.Sun },
  { key: 'moon', name: 'Lune', body: Astronomy.Body.Moon },
  { key: 'mercury', name: 'Mercure', body: Astronomy.Body.Mercury },
  { key: 'venus', name: 'Vénus', body: Astronomy.Body.Venus },
  { key: 'mars', name: 'Mars', body: Astronomy.Body.Mars },
  { key: 'jupiter', name: 'Jupiter', body: Astronomy.Body.Jupiter },
  { key: 'saturn', name: 'Saturne', body: Astronomy.Body.Saturn },
  { key: 'uranus', name: 'Uranus', body: Astronomy.Body.Uranus },
  { key: 'neptune', name: 'Neptune', body: Astronomy.Body.Neptune },
  { key: 'pluto', name: 'Pluton', body: Astronomy.Body.Pluto },
];

const ASPECT_TYPES = [
  { name: 'Conjonction', angle: 0, orb: 2 },
  { name: 'Sextile', angle: 60, orb: 6 },
  { name: 'Carré', angle: 90, orb: 8 },
  { name: 'Trigone', angle: 120, orb: 8 },
  { name: 'Opposition', angle: 180, orb: 8 },
];

function getZodiacSign(longitude: number): { sign: string; degree: number } {
  const normalizedLon = ((longitude % 360) + 360) % 360;
  const signIndex = Math.floor(normalizedLon / 30);
  const degree = normalizedLon % 30;
  return {
    sign: ZODIAC_SIGNS[signIndex],
    degree: degree,
  };
}

function eclipticToZodiac(ecliptic: Astronomy.Ecliptic): number {
  return ecliptic.elon;
}

export function calculatePlanetPositions(birthData: BirthData): Record<string, PlanetPosition> {
  const positions: Record<string, PlanetPosition> = {};

  for (const planet of PLANETS) {
    const geoVector = Astronomy.GeoVector(planet.body, birthData.date, false);
    const ecliptic = Astronomy.Ecliptic(geoVector);

    const longitude = eclipticToZodiac(ecliptic);
    const { sign, degree } = getZodiacSign(longitude);

    positions[planet.key] = {
      longitude,
      latitude: ecliptic.elat,
      distance: 0,
      sign,
      signDegree: degree,
      house: 0,
    };
  }

  return positions;
}

function calculateAscendant(birthData: BirthData): number {
  const time = Astronomy.MakeTime(birthData.date);

  const jd = time.ut + 2451545.0;
  const T = (jd - 2451545.0) / 36525.0;

  const gmst0 = 280.46061837 + 360.98564736629 * (jd - 2451545.0) +
                0.000387933 * T * T - T * T * T / 38710000.0;

  let gmst = gmst0 % 360;
  if (gmst < 0) gmst += 360;

  let lst = gmst + birthData.longitude;
  if (lst < 0) lst += 360;
  if (lst >= 360) lst -= 360;

  const obliquity = 23.4392911 - 0.0130042 * T - 0.00000016 * T * T + 0.000000504 * T * T * T;

  const lstRad = lst * Math.PI / 180;
  const latRad = birthData.latitude * Math.PI / 180;
  const oblRad = obliquity * Math.PI / 180;

  const y = -Math.cos(lstRad);
  const x = Math.sin(lstRad) * Math.cos(oblRad) + Math.tan(latRad) * Math.sin(oblRad);

  let ascendant = Math.atan2(y, x) * 180 / Math.PI;

  if (ascendant < 0) ascendant += 360;

  ascendant = (ascendant + 180) % 360;

  return ascendant;
}

export function calculateHouses(birthData: BirthData, planetPositions: Record<string, PlanetPosition>): House[] {
  const houses: House[] = [];
  const ascendantLon = calculateAscendant(birthData);

  for (let i = 0; i < 12; i++) {
    const cuspLon = (ascendantLon + i * 30) % 360;
    const { sign, degree } = getZodiacSign(cuspLon);
    houses.push({
      cusp: cuspLon,
      sign,
      signDegree: degree,
    });
  }

  Object.keys(planetPositions).forEach(planetKey => {
    const planet = planetPositions[planetKey];
    for (let i = 0; i < 12; i++) {
      const nextHouse = (i + 1) % 12;
      const currentCusp = houses[i].cusp;
      const nextCusp = houses[nextHouse].cusp;

      if (nextCusp > currentCusp) {
        if (planet.longitude >= currentCusp && planet.longitude < nextCusp) {
          planet.house = i + 1;
          break;
        }
      } else {
        if (planet.longitude >= currentCusp || planet.longitude < nextCusp) {
          planet.house = i + 1;
          break;
        }
      }
    }
  });

  return houses;
}

export function calculateAspects(planetPositions: Record<string, PlanetPosition>, ascendantLongitude?: number): Aspect[] {
  const aspects: Aspect[] = [];
  const positions: Record<string, number> = {};

  Object.keys(planetPositions).forEach(key => {
    positions[key] = planetPositions[key].longitude;
  });

  if (ascendantLongitude !== undefined) {
    positions['ascendant'] = ascendantLongitude;
  }

  const keys = Object.keys(positions);

  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const planet1 = keys[i];
      const planet2 = keys[j];
      const lon1 = positions[planet1];
      const lon2 = positions[planet2];

      let angle = Math.abs(lon1 - lon2);
      if (angle > 180) angle = 360 - angle;

      for (const aspectType of ASPECT_TYPES) {
        const orb = Math.abs(angle - aspectType.angle);
        if (orb <= aspectType.orb) {
          aspects.push({
            planet1,
            planet2,
            type: aspectType.name,
            angle: aspectType.angle,
            orb,
          });
        }
      }
    }
  }

  return aspects;
}

export function calculateBirthChart(birthData: BirthData) {
  const planetPositions = calculatePlanetPositions(birthData);
  const houses = calculateHouses(birthData, planetPositions);
  const aspects = calculateAspects(planetPositions, houses[0]?.cusp);

  return {
    planetPositions,
    houses,
    aspects,
  };
}

export interface TransitAspect {
  transitPlanet: string;
  natalPlanet: string;
  type: string;
  angle: number;
  orb: number;
  transitSign: string;
}

// Calcule les aspects entre les planètes en transit à une date donnée et le thème natal
export function calculateTransitAspects(
  natalPositions: Record<string, PlanetPosition>,
  transitDate = new Date()
): TransitAspect[] {
  // Les longitudes écliptiques sont géocentriques, la lat/lon n'influence pas le signe
  const transitPositions = calculatePlanetPositions({ date: transitDate, latitude: 0, longitude: 0 });

  const aspects: TransitAspect[] = [];

  for (const transitKey of Object.keys(transitPositions)) {
    for (const natalKey of Object.keys(natalPositions)) {
      const lon1 = transitPositions[transitKey].longitude;
      const lon2 = natalPositions[natalKey].longitude;

      let angle = Math.abs(lon1 - lon2);
      if (angle > 180) angle = 360 - angle;

      for (const aspectType of ASPECT_TYPES) {
        const orb = Math.abs(angle - aspectType.angle);
        if (orb <= aspectType.orb) {
          aspects.push({
            transitPlanet: transitKey,
            natalPlanet: natalKey,
            type: aspectType.name,
            angle: aspectType.angle,
            orb,
            transitSign: transitPositions[transitKey].sign,
          });
        }
      }
    }
  }

  // Trier par orbe croissant (aspects les plus exacts en premier)
  return aspects.sort((a, b) => a.orb - b.orb);
}

export interface CoStarAnalysis {
  mood: string;
  dailyMove: string;
  dailyChallenge: string;
  dayAtGlance: string;
  advice: string;
  personalizationSeed: string;
  pillars: Array<{
    title: string;
    text: string;
  }>;
  favorableAspects: Array<{
    planet1: string;
    planet2: string;
    type: string;
    symbol: string;
    color: string;
    text: string;
    transitSign?: string;
    natalSign?: string;
  }>;
}

// Fonction pour générer un nombre pseudo-aléatoire déterministe basé sur une seed
const seededRandom = (seed: string): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Conversion en entier 32-bit
  }
  return Math.abs(hash % 10000) / 10000;
};

const hashToInt = (seed: string): number => {
  let hash = 0x12345678;
  for (let i = 0; i < seed.length; i++) {
    hash = Math.imul(hash ^ seed.charCodeAt(i), 0x9e3779b1);
  }
  return Math.abs(hash);
};

const getLocalDateKey = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const getDateFromLocalDateKey = (dateKey: string): Date => {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const formatSeedNumber = (value: unknown): string => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue.toFixed(3) : '';
};

const formatSeedDate = (value: unknown): string => {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'string') return value;
  return '';
};

const getCoStarPersonalizationSeed = (chartData: any, name: string): string => {
  const planets = chartData?.planetPositions ?? {};
  const planetSeed = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']
    .map(planetKey => {
      const planet = planets[planetKey] ?? {};
      return [
        planetKey,
        planet.sign ?? '',
        formatSeedNumber(planet.longitude),
        formatSeedNumber(planet.house),
      ].join(':');
    })
    .join('|');
  const houseSeed = Array.isArray(chartData?.houses)
    ? chartData.houses.map((house: any) => formatSeedNumber(house?.cusp)).join('|')
    : '';

  return [
    name?.trim().toLocaleLowerCase('fr-FR') || 'ami(e) des étoiles',
    formatSeedDate(chartData?.birthDate),
    chartData?.birthPlace ?? '',
    planetSeed,
    houseSeed,
  ].join('|');
};

type ElementName = 'Feu' | 'Terre' | 'Air' | 'Eau';
type ModalityName = 'Cardinal' | 'Fixe' | 'Mutable';
type AspectTone = 'harmonique' | 'tendu' | 'mixte';

interface CoStarProfile {
  dominantElement: ElementName;
  secondaryElement: ElementName;
  dominantModality: ModalityName;
  sunSign: string;
  moonSign: string;
  ascendantSign: string;
  focusPlanet: string;
  focusPlanetLabel: string;
  focusSign: string;
  focusHouse?: number;
  aspectTone: AspectTone;
  activeTransit?: TransitAspect;
}

interface CoStarDailyGuidance {
  mood: string;
  dailyMove: string;
  dailyChallenge: string;
}

interface CoStarGuidanceSource {
  energy: string[];
  move: string[];
  challenge: string[];
}

const PLANET_LABELS: Record<string, string> = {
  sun: 'Soleil',
  moon: 'Lune',
  mercury: 'Mercure',
  venus: 'Vénus',
  mars: 'Mars',
  jupiter: 'Jupiter',
  saturn: 'Saturne',
  uranus: 'Uranus',
  neptune: 'Neptune',
  pluto: 'Pluton',
};

const SIGN_PROFILES: Record<string, { element: ElementName; modality: ModalityName; energy: string; challenge: string }> = {
  Bélier: { element: 'Feu', modality: 'Cardinal', energy: 'l’audace veut ouvrir une porte neuve', challenge: 'ne confonds pas vitesse et vérité' },
  Taureau: { element: 'Terre', modality: 'Fixe', energy: 'ton corps réclame du concret et du fiable', challenge: 'ne t’attache pas à ce qui demande à bouger' },
  Gémeaux: { element: 'Air', modality: 'Mutable', energy: 'l’esprit capte plusieurs signaux à la fois', challenge: 'ne disperse pas ton attention dans toutes les directions' },
  Cancer: { element: 'Eau', modality: 'Cardinal', energy: 'l’intuition protège ce qui compte vraiment', challenge: 'ne laisse pas l’émotion décider seule' },
  Lion: { element: 'Feu', modality: 'Fixe', energy: 'la présence veut rayonner sans demander permission', challenge: 'ne transforme pas le besoin d’expression en besoin d’approbation' },
  Vierge: { element: 'Terre', modality: 'Mutable', energy: 'le détail juste peut remettre toute la journée en ordre', challenge: 'ne fais pas de la perfection une condition pour avancer' },
  Balance: { element: 'Air', modality: 'Cardinal', energy: 'l’équilibre passe par une décision claire', challenge: 'ne sacrifie pas ta vérité pour garder la paix' },
  Scorpion: { element: 'Eau', modality: 'Fixe', energy: 'la lucidité perce sous la surface', challenge: 'ne serre pas plus fort ce qui doit se transformer' },
  Sagittaire: { element: 'Feu', modality: 'Mutable', energy: 'l’horizon s’élargit et redonne du sens', challenge: 'ne promets pas plus que ton présent ne peut porter' },
  Capricorne: { element: 'Terre', modality: 'Cardinal', energy: 'une ambition calme cherche une structure', challenge: 'ne confonds pas maîtrise et dureté envers toi-même' },
  Verseau: { element: 'Air', modality: 'Fixe', energy: 'l’idée différente devient une vraie ressource', challenge: 'ne t’isole pas au nom de ton indépendance' },
  Poissons: { element: 'Eau', modality: 'Mutable', energy: 'l’imaginaire ouvre une voie plus subtile', challenge: 'ne laisse pas la compassion dissoudre tes limites' },
};

const ELEMENT_PROFILES: Record<ElementName, { energy: string[]; move: string[]; challenge: string[] }> = {
  Feu: {
    energy: [
      'une envie d’agir revient franchement',
      'l’élan revient quand tu passes à l’action',
      'un élan courageux cherche sa forme',
      'la vitalité monte dès que tu choisis une direction',
      'ton instinct sait avant ton mental',
      'l’envie de créer ou de décider devient plus forte',
      'une intensité intérieure demande une direction',
      'ta présence gagne en intensité quand tu arrêtes d’attendre',
    ],
    move: [
      'Choisis une action visible et fais-la sans te disperser.',
      'Transforme l’impulsion en décision simple.',
      'Mets ton énergie dans une seule bataille utile.',
      'Ose initier, mais garde un rythme respirable.',
      'Fais quelque chose qui te rend fier sans chercher l’effet.',
      'Utilise ton courage pour clarifier, pas pour forcer.',
    ],
    challenge: [
      'Ne confonds pas intensité et urgence.',
      'Ne brûle pas une étape juste parce que tu sens l’élan.',
      'Ne fais pas porter aux autres ta pression intérieure.',
      'Ne transforme pas une intuition juste en réaction trop rapide.',
      'Ne cherche pas la victoire quand la clarté suffit.',
      'Ne laisse pas la fierté parler plus fort que le besoin réel.',
    ],
  },
  Terre: {
    energy: [
      'tu as besoin de concret',
      'la journée se construit par petits gestes',
      'ton corps devient une boussole plus fiable que le bruit mental',
      'la stabilité revient quand tu simplifies',
      'une patience active rend les choses possibles',
      'tu retrouves de la stabilité dans ce qui dure',
      'le réel te répond mieux que les suppositions',
      'ton énergie devient claire quand elle devient concrète',
    ],
    move: [
      'Pose une base concrète avant d’élargir le plan.',
      'Fais moins, mais fais-le vraiment.',
      'Range, trie ou consolide une chose qui te soutient.',
      'Choisis le geste utile plutôt que le grand scénario.',
      'Écoute ton corps avant de remplir ton agenda.',
      'Avance par preuve, pas par pression.',
    ],
    challenge: [
      'Ne confonds pas sécurité et immobilité.',
      'Ne transforme pas la prudence en refus du changement.',
      'Ne t’accroche pas à une forme qui a cessé de te nourrir.',
      'Ne mesure pas ta valeur à ce que tu produis aujourd’hui.',
      'Ne laisse pas le confort décider à ta place.',
      'Ne rigidifie pas ce qui demande seulement à être ajusté.',
    ],
  },
  Air: {
    energy: [
      'tu repères des liens que tu n’avais pas vus',
      'une conversation peut déplacer toute la perspective',
      'la clarté vient quand les idées circulent',
      'ta curiosité réveille une piste importante',
      'ça respire mieux quand tu nommes les choses',
      'une idée légère peut ouvrir une porte sérieuse',
      'ton recul devient une force si tu restes présent',
      'les échanges peuvent ouvrir un angle neuf',
    ],
    move: [
      'Pose une vraie question et écoute jusqu’au bout.',
      'Écris l’idée avant qu’elle ne se dilue.',
      'Choisis une conversation claire plutôt que dix signaux flous.',
      'Mets de l’ordre dans tes pensées sans les enfermer.',
      'Partage une idée seulement après l’avoir reliée au réel.',
      'Laisse une information neuve changer ton angle.',
    ],
    challenge: [
      'Ne remplace pas la présence par trop de mots.',
      'Ne disperse pas ton attention dans tous les possibles.',
      'Ne transforme pas le recul en distance affective.',
      'Ne choisis pas une idée brillante si elle t’éloigne de toi.',
      'Ne parle pas plus vite que ce que tu ressens.',
      'Ne laisse pas le mental court-circuiter l’intuition simple.',
    ],
  },
  Eau: {
    energy: [
      'ton intuition devient plus précise que tes explications',
      'les ressentis subtils prennent plus de place',
      'une émotion demande à être comprise, pas contrôlée',
      'ta sensibilité capte la vérité avant les mots',
      'l’intime prend plus de place que la performance',
      'un ancien ressenti éclaire un choix actuel',
      'ton calme revient quand tu respectes tes limites',
      'la profondeur devient une ressource si tu restes ancré',
    ],
    move: [
      'Nomme ce que tu ressens avant de répondre.',
      'Protège ton calme comme une ressource précieuse.',
      'Fais un geste de soin sans t’oublier dedans.',
      'Laisse l’émotion informer le choix, pas le gouverner seule.',
      'Crée une limite douce mais réelle.',
      'Écoute le signal intérieur qui revient plusieurs fois.',
    ],
    challenge: [
      'Ne prends pas une vague émotionnelle pour une vérité définitive.',
      'Ne t’absorbe pas dans ce qui appartient aux autres.',
      'Ne confonds pas compassion et effacement.',
      'Ne laisse pas le passé écrire la réponse d’aujourd’hui.',
      'Ne te protège pas en disparaissant.',
      'Ne cherche pas à tout ressentir avant d’avancer.',
    ],
  },
};

const MODALITY_PROFILES: Record<ModalityName, { energy: string[]; move: string[]; challenge: string[] }> = {
  Cardinal: {
    energy: [
      'quelque chose veut commencer simplement',
      'l’initiative revient au centre',
      'la journée répond bien aux décisions nettes',
      'un nouveau départ devient plus clair',
      'ton énergie demande un premier pas, même imparfait',
    ],
    move: [
      'Initie une chose sans exiger que tout soit prêt.',
      'Choisis le premier mouvement plutôt que le plan parfait.',
      'Ouvre la porte, puis ajuste en marchant.',
    ],
    challenge: [
      'Ne démarre pas trois choses pour éviter d’en choisir une.',
      'Ne confonds pas commencer avec contrôler tout le déroulé.',
      'Ne force pas une réponse immédiate là où une intention suffit.',
    ],
  },
  Fixe: {
    energy: [
      'ce qui compte demande à être tenu',
      'la constance devient magnétique',
      'ta constance reprend de la force',
      'ton énergie se concentre autour d’un axe stable',
      'la journée favorise ce qui mérite d’être approfondi',
    ],
    move: [
      'Reste fidèle à une priorité claire.',
      'Consolide ce que tu as déjà commencé.',
      'Tiens une promesse simple envers toi-même.',
    ],
    challenge: [
      'Ne prends pas la résistance pour de la sagesse.',
      'Ne reste pas figé par loyauté envers une ancienne version de toi.',
      'Ne serre pas plus fort ce qui demande de l’espace.',
    ],
  },
  Mutable: {
    energy: [
      'une transition devient plus lisible',
      'l’adaptation ouvre une meilleure route',
      'quelque chose évolue sans perdre son sens',
      'la journée récompense la souplesse intelligente',
      'un petit ajustement peut tout fluidifier',
    ],
    move: [
      'Adapte le plan sans abandonner l’intention.',
      'Laisse une information neuve modifier le chemin.',
      'Fais de la souplesse une stratégie, pas une fuite.',
    ],
    challenge: [
      'Ne change pas de direction juste pour éviter l’inconfort.',
      'Ne transforme pas la flexibilité en dispersion.',
      'Ne laisse pas l’avis des autres diluer ton centre.',
    ],
  },
};

const PLANET_PROFILES: Record<string, { energy: string[]; move: string[]; challenge: string[] }> = {
  sun: {
    energy: ['tu as besoin d’être plus aligné', 'ta volonté cherche une direction plus claire', 'le besoin d’être pleinement toi revient fort'],
    move: ['Fais un choix qui respecte mieux ton centre.', 'Agis depuis ce qui te ressemble vraiment.', 'Montre une part de toi sans la surjouer.'],
    challenge: ['Ne cherche pas à rayonner là où tu as surtout besoin d’être vrai.', 'Ne laisse pas l’ego parler à la place de l’élan sincère.', 'Ne confonds pas visibilité et alignement.'],
  },
  moon: {
    energy: ['tes besoins émotionnels demandent plus d’attention', 'le ressenti passe au premier plan', 'ton monde intérieur donne le ton'],
    move: ['Écoute ton besoin avant de répondre à la demande extérieure.', 'Protège un espace qui te nourrit.', 'Laisse ton ressenti être une information valable.'],
    challenge: ['Ne nie pas un besoin simplement parce qu’il dérange le programme.', 'Ne laisse pas une humeur momentanée écrire toute l’histoire.', 'Ne demande pas aux autres de deviner ce que tu n’as pas nommé.'],
  },
  mercury: {
    energy: ['ta pensée cherche des mots plus justes', 'les mots peuvent remettre de l’ordre', 'une idée peut devenir un levier très concret'],
    move: ['Écris ou dis la phrase qui remet de l’ordre.', 'Clarifie une conversation au lieu de l’imaginer.', 'Vérifie l’information avant de conclure.'],
    challenge: ['Ne te réfugie pas dans l’analyse si le cœur a déjà répondu.', 'Ne laisse pas le mental multiplier les scénarios inutiles.', 'Ne rends pas compliqué ce qui demande seulement d’être dit.'],
  },
  venus: {
    energy: ['tes désirs cherchent plus de vérité', 'ce que tu aimes demande plus de clarté', 'la beauté devient un signal de justesse'],
    move: ['Choisis ce qui te nourrit vraiment, pas ce qui impressionne.', 'Fais un geste de tendresse clair.', 'Honore une envie sans te perdre dedans.'],
    challenge: ['Ne cherche pas l’harmonie au prix de ton désir réel.', 'Ne dis pas oui pour rester aimable.', 'Ne confonds pas manque et amour.'],
  },
  mars: {
    energy: ['le courage revient avec plus de direction', 'ton énergie d’action demande une cible nette', 'la volonté revient par le corps et le mouvement'],
    move: ['Donne une mission claire à ton énergie.', 'Bouge avant de ruminer.', 'Transforme la frustration en geste utile.'],
    challenge: ['Ne fais pas de la colère un pilote automatique.', 'Ne force pas une porte qui demande une stratégie.', 'Ne gaspille pas ton énergie dans une réaction secondaire.'],
  },
  jupiter: {
    energy: ['ton envie de grandir cherche une forme réaliste', 'la perspective s’élargit doucement', 'la confiance revient quand le sens est clair'],
    move: ['Choisis une action qui élargit vraiment ton horizon.', 'Apprends, demande, explore une piste nouvelle.', 'Vise plus haut, puis ancre le premier pas.'],
    challenge: ['Ne promets pas plus que tu ne peux habiter.', 'Ne prends pas l’optimisme pour un plan.', 'Ne cherche pas grand si le vrai appel est profond.'],
  },
  saturn: {
    energy: ['une maturité calme devient disponible', 'la structure peut te redonner de la force', 'ce qui tient dans le temps reprend de la valeur'],
    move: ['Pose une limite qui protège ton avenir.', 'Fais la chose sérieuse sans te punir avec elle.', 'Construis une base que demain pourra remercier.'],
    challenge: ['Ne transforme pas la discipline en dureté.', 'Ne confonds pas lenteur et échec.', 'Ne laisse pas la peur du jugement rétrécir ton choix.'],
  },
};

const getDateOrdinal = (dateKey: string): number => {
  const [year, month, day] = dateKey.split('-').map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / 86400000);
};

const pickDailyValue = <T,>(items: T[], seed: string, dateKey: string, salt: string): T =>
  items[(getDateOrdinal(dateKey) + hashToInt(`${seed}|${dateKey}|${salt}`)) % items.length];

const rankScores = <T extends string>(scores: Record<T, number>): T[] =>
  (Object.keys(scores) as T[]).sort((a, b) => scores[b] - scores[a]);

const getCoStarProfile = (
  chartData: any,
  transitAspects: TransitAspect[],
  dateKey: string,
  personalizationSeed: string
): CoStarProfile => {
  const planets = chartData?.planetPositions ?? {};
  const elementScores: Record<ElementName, number> = { Feu: 0, Terre: 0, Air: 0, Eau: 0 };
  const modalityScores: Record<ModalityName, number> = { Cardinal: 0, Fixe: 0, Mutable: 0 };
  const planetWeights: Record<string, number> = {
    sun: 4,
    moon: 4,
    mercury: 2,
    venus: 2,
    mars: 2,
    jupiter: 1.2,
    saturn: 1.2,
    uranus: 0.8,
    neptune: 0.8,
    pluto: 0.8,
  };

  Object.entries(planetWeights).forEach(([planetKey, weight]) => {
    const sign = planets[planetKey]?.sign;
    const profile = sign ? SIGN_PROFILES[sign] : undefined;
    if (!profile) return;
    elementScores[profile.element] += weight;
    modalityScores[profile.modality] += weight;
  });

  const ascendantSign = chartData?.houses?.[0]?.sign || planets.sun?.sign || 'Bélier';
  const ascendantProfile = SIGN_PROFILES[ascendantSign];
  if (ascendantProfile) {
    elementScores[ascendantProfile.element] += 3;
    modalityScores[ascendantProfile.modality] += 3;
  }

  const focusPlanets = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'].filter(key => planets[key]);
  const focusPlanet = pickDailyValue(focusPlanets.length ? focusPlanets : ['sun'], personalizationSeed, dateKey, 'focus-planet');

  const aspects = Array.isArray(chartData?.aspects) ? chartData.aspects : [];
  const tenseCount = aspects.filter((aspect: any) => aspect?.type === 'Carré' || aspect?.type === 'Opposition').length;
  const harmonyCount = aspects.filter((aspect: any) => aspect?.type === 'Trigone' || aspect?.type === 'Sextile').length;
  const aspectTone: AspectTone = tenseCount > harmonyCount + 1 ? 'tendu' : harmonyCount > tenseCount + 1 ? 'harmonique' : 'mixte';

  const personalTransits = transitAspects.filter(transit => ['sun', 'moon', 'mercury', 'venus', 'mars'].includes(transit.natalPlanet));
  const activeTransit = personalTransits.length
    ? pickDailyValue(personalTransits.slice(0, 10), personalizationSeed, dateKey, 'active-transit')
    : undefined;

  const rankedElements = rankScores(elementScores);
  const rankedModalities = rankScores(modalityScores);
  const focusPosition = planets[focusPlanet];

  return {
    dominantElement: rankedElements[0],
    secondaryElement: rankedElements[1] ?? rankedElements[0],
    dominantModality: rankedModalities[0],
    sunSign: planets.sun?.sign || 'Bélier',
    moonSign: planets.moon?.sign || 'Taureau',
    ascendantSign,
    focusPlanet,
    focusPlanetLabel: PLANET_LABELS[focusPlanet] || focusPlanet,
    focusSign: focusPosition?.sign || planets.sun?.sign || 'Bélier',
    focusHouse: focusPosition?.house,
    aspectTone,
    activeTransit,
  };
};

const transitEnergyText = (transit?: TransitAspect): string | undefined => {
  if (!transit) return undefined;
  const aspectText: Record<string, string> = {
    Trigone: 'les choses coulent avec plus de facilité',
    Sextile: 'une petite ouverture devient disponible',
    Conjonction: 'tout semble plus intense et plus présent',
    Carré: 'une tension utile pousse à clarifier',
    Opposition: 'deux envies cherchent un meilleur équilibre',
  };
  return aspectText[transit.type] || 'une énergie particulière demande ton attention';
};

const transitChallengeText = (transit?: TransitAspect): string | undefined => {
  if (!transit) return undefined;
  const aspectText: Record<string, string> = {
    Trigone: 'Ne t’endors pas dans la facilité.',
    Sextile: 'Ne laisse pas passer une ouverture discrète.',
    Conjonction: 'Ne laisse pas cette intensité prendre toute la place.',
    Carré: 'Ne transforme pas cette friction en conflit automatique.',
    Opposition: 'Ne choisis pas un côté en oubliant l’autre.',
  };
  return aspectText[transit.type] || 'Reste attentif à ce que la journée réveille.';
};

const aspectToneEnergy: Record<AspectTone, string[]> = {
  harmonique: [
    'une progression fluide devient possible',
    'les gestes simples et alignés portent loin',
    'la facilité peut devenir une vraie force si tu l’habites',
  ],
  tendu: [
    'la friction peut devenir une force utile',
    'une tension peut t’aider à grandir',
    'ce qui résiste peut montrer où agir',
  ],
  mixte: [
    'tu cherches l’équilibre entre douceur et exigence',
    'la journée demande de tenir deux vérités à la fois',
    'une nuance importante apparaît entre élan et retenue',
  ],
};

const aspectToneChallenge: Record<AspectTone, string[]> = {
  harmonique: [
    'Ne prends pas la fluidité pour une raison de remettre à demain.',
    'Ne laisse pas la facilité devenir passivité.',
    'Ne minimise pas ce qui se présente simplement parce que ça semble naturel.',
  ],
  tendu: [
    'Ne confonds pas tension et mauvais signe.',
    'Ne réponds pas à la friction par une dureté inutile.',
    'Ne laisse pas un inconfort productif devenir une guerre intérieure.',
  ],
  mixte: [
    'Ne simplifie pas trop vite une situation qui demande de la nuance.',
    'Ne choisis pas le confort si la vérité demande un ajustement.',
    'Ne te disperse pas entre deux directions sans nommer ce que tu veux vraiment.',
  ],
};

const toShortEnergyText = (text: string): string => {
  const trimmed = text.trim().replace(/[.!?]+$/g, '');
  return trimmed.charAt(0).toLocaleUpperCase('fr-FR') + trimmed.slice(1);
};

const buildPersonalizedGuidance = (profile: CoStarProfile, dateKey: string, seed: string): CoStarDailyGuidance => {
  const focusSignProfile = SIGN_PROFILES[profile.focusSign] ?? SIGN_PROFILES[profile.sunSign];
  const guidanceSources: CoStarGuidanceSource[] = [
    {
      energy: [
        'une énergie calme cherche une direction claire',
        'quelque chose en toi se remet doucement en mouvement',
        'tu avances mieux en choisissant l’essentiel',
        'la journée demande une présence simple et vraie',
        'ton énergie devient plus nette quand tu ralentis',
        'une force tranquille revient au premier plan',
        'un déclic discret peut changer ton rythme',
        'tu as besoin de clarté plus que d’intensité',
        'la journée t’invite à agir sans te disperser',
        'une douceur lucide peut guider tes choix',
      ],
      move: [
        'Choisis un geste simple et fais-le avec présence.',
        'Commence par ce qui te rend plus clair.',
        'Avance doucement, mais sans te quitter.',
        'Fais moins, mais fais-le avec justesse.',
        'Garde ton attention sur une seule priorité.',
      ],
      challenge: [
        'Ne cherche pas à tout résoudre aujourd’hui.',
        'Ne laisse pas l’agitation choisir à ta place.',
        'Ne confonds pas lenteur et blocage.',
        'Ne complique pas ce qui demande seulement de la présence.',
        'Ne te disperse pas pour éviter l’essentiel.',
      ],
    },
    ELEMENT_PROFILES[profile.dominantElement],
    ELEMENT_PROFILES[profile.secondaryElement],
    MODALITY_PROFILES[profile.dominantModality],
    PLANET_PROFILES[profile.focusPlanet],
    {
      energy: [focusSignProfile.energy],
      move: ['Réponds à ce que tu sens juste, sans forcer le rythme.'],
      challenge: [focusSignProfile.challenge],
    },
    {
      energy: aspectToneEnergy[profile.aspectTone],
      move: [
        'Transforme ce climat en choix concret.',
        'Écoute ce que la situation t’apprend avant d’agir.',
        'Avance avec nuance plutôt qu’avec certitude.',
      ],
      challenge: aspectToneChallenge[profile.aspectTone],
    },
  ];

  const transitEnergy = transitEnergyText(profile.activeTransit);
  const transitChallenge = transitChallengeText(profile.activeTransit);
  if (transitEnergy && transitChallenge) {
    guidanceSources.push({
      energy: [transitEnergy],
      move: ['Réponds par un geste conscient plutôt qu’une réaction.'],
      challenge: [transitChallenge],
    });
  }

  if (profile.focusHouse) {
    guidanceSources.push({
      energy: ['un point important demande ton attention'],
      move: ['Fais un petit geste concret dans ce qui demande ton attention.'],
      challenge: ['Ne laisse pas un seul sujet absorber toute ton attention.'],
    });
  }

  const source = pickDailyValue(guidanceSources, seed, dateKey, 'guidance-source');
  const index = hashToInt(`${seed}|${dateKey}|guidance-index`);

  return {
    mood: toShortEnergyText(source.energy[index % source.energy.length]),
    dailyMove: toShortEnergyText(source.move[index % source.move.length]),
    dailyChallenge: toShortEnergyText(source.challenge[index % source.challenge.length]),
  };
};

// Helpers pour ajouter l'article défini devant les noms de planètes en français
const withArticle = (name: string): string => {
  if (name === 'Soleil') return 'le Soleil';
  if (name === 'Lune') return 'la Lune';
  return name;
};

const withArticleCap = (name: string): string => {
  const a = withArticle(name);
  return a.charAt(0).toUpperCase() + a.slice(1);
};

export function generateCoStarAnalysis(
  chartData: any,
  name: string,
  dateKeyOverride?: string
): CoStarAnalysis {
  const planets = chartData.planetPositions;
  const personalizationSeed = getCoStarPersonalizationSeed(chartData, name);

  // Fixer les calculs à midi local pour garantir le même résultat pendant toute la journée.
  const today = dateKeyOverride ? getDateFromLocalDateKey(dateKeyOverride) : new Date();
  const dateKey = dateKeyOverride ?? getLocalDateKey(today);
  const transitDate = getDateFromLocalDateKey(dateKey);
  transitDate.setHours(12, 0, 0, 0);

  // Calculer les transits du jour en aspect avec le thème natal.
  const transitAspects = calculateTransitAspects(planets, transitDate);
  
  // Déterminer les signes clés
  const sunSign = planets.sun?.sign || 'Bélier';
  const moonSign = planets.moon?.sign || 'Taureau';
  const venusSign = planets.venus?.sign || 'Gémeaux';
  const marsSign = planets.mars?.sign || 'Cancer';
  
  const coStarProfile = getCoStarProfile(chartData, transitAspects, dateKey, personalizationSeed);
  const dailyGuidance = buildPersonalizedGuidance(coStarProfile, dateKey, personalizationSeed);
  const mood = dailyGuidance.mood;
  const dailyMove = dailyGuidance.dailyMove;
  const dailyChallenge = dailyGuidance.dailyChallenge;

  // Générer la journée en un coup d'œil basé sur les aspects planétaires réels de l'utilisateur
  const generateDayAtGlance = (): string => {
    const translatePlanetLocal = (key: string): string => {
      const t: Record<string, string> = {
        sun: 'Soleil', moon: 'Lune', mercury: 'Mercure', venus: 'Vénus',
        mars: 'Mars', jupiter: 'Jupiter', saturn: 'Saturne', uranus: 'Uranus',
        neptune: 'Neptune', pluto: 'Pluton',
      };
      return t[key] || key;
    };

    const planetDomain: Record<string, string> = {
      sun: 'ton identité et ta direction de vie',
      moon: 'tes émotions et ton monde intérieur',
      mercury: 'ta pensée et ta façon de communiquer',
      venus: 'tes désirs, tes valeurs et tes relations',
      mars: 'ton élan, ton courage et ta force d\'action',
      jupiter: 'ton optimisme et ta capacité à t\'épanouir',
      saturn: 'ta structure intérieure et ta discipline',
      uranus: 'ton besoin de liberté et d\'originalité',
      neptune: 'ton intuition et ta sensibilité profonde',
      pluto: 'tes transformations intérieures et ta puissance',
    };

    const signFlavor: Record<string, string> = {
      'Bélier': 'une énergie vive, directe et sans détour',
      'Taureau': 'une profondeur ancrée, sensuelle et persistante',
      'Gémeaux': 'une curiosité agile et une pensée en mouvement constant',
      'Cancer': 'une sensibilité protectrice et une mémoire émotionnelle forte',
      'Lion': 'une générosité rayonnante et une expression créatrice affirmée',
      'Vierge': 'une précision analytique et un souci sincère du détail',
      'Balance': 'une recherche d\'harmonie et de justesse relationnelle',
      'Scorpion': 'une intensité profonde et une quête irréductible de vérité',
      'Sagittaire': 'un élan vers le sens, la liberté et l\'exploration',
      'Capricorne': 'une volonté tenace et une vision ancrée dans le long terme',
      'Verseau': 'une indépendance d\'esprit et une vision avant-gardiste',
      'Poissons': 'une perméabilité émotionnelle et une ouverture au mystère',
    };

    const signDescription: Record<string, string> = {
      'Bélier': 'une impulsion vers l\'avant et un désir d\'initier',
      'Taureau': 'un besoin d\'enracinement, de beauté et de durée',
      'Gémeaux': 'une agilité mentale et un désir sincère d\'échanger',
      'Cancer': 'une tendresse protectrice et une résonance intérieure fine',
      'Lion': 'un rayonnement créatif et une soif de s\'exprimer pleinement',
      'Vierge': 'un sens du service et une attention précieuse aux détails',
      'Balance': 'une quête de juste milieu et d\'harmonie relationnelle',
      'Scorpion': 'une plongée vers la profondeur et la vérité essentielle',
      'Sagittaire': 'un appel vers l\'horizon, le sens et la liberté',
      'Capricorne': 'une ambition patiente et un ancrage dans le réel',
      'Verseau': 'une rupture avec les conventions et une vision renouvelée',
      'Poissons': 'une dissolution des frontières et une ouverture au mystère',
    };

    const aspectDynamics: Record<string, string[]> = {
      'Trigone': [
        'coule en harmonie naturelle avec',
        's\'allie fluidement à',
        'amplifie l\'énergie de',
        'rejoint en douceur celle de',
        'se fond dans un accord parfait avec',
      ],
      'Sextile': [
        'crée une ouverture fertile avec',
        'dialogue avantageusement avec',
        'entrouvre une porte prometteuse vers',
        'tisse une connivence positive avec',
        'invite à une action concertée avec',
      ],
      'Conjonction': [
        'fusionne toute son intensité avec',
        'concentre son énergie au cœur de',
        'se fond dans la puissance de',
        'densifie son pouvoir en rejoignant',
        'décuple sa force en s\'unissant à',
      ],
      'Carré': [
        'entre en friction dynamique avec',
        'provoque une tension productive avec',
        'défie l\'influence de',
        'lance un appel à l\'action face à',
        'crée une résistance fertile avec',
      ],
      'Opposition': [
        'cherche un équilibre délicat avec',
        'polarise son énergie face à',
        'appelle à l\'intégration consciente de',
        'invite à la réconciliation avec',
        'dialogue en miroir avec',
      ],
    };

    const aspectConsequences: Record<string, string[]> = {
      'Trigone': [
        `Laisse-toi porter — cette fluidité est un cadeau à accueillir sans forcer.`,
        `C'est une énergie naturellement fluide. Exprime-toi avec confiance.`,
        `Profite de cette aisance cosmique : les choses avancent presque d'elles-mêmes.`,
        `Un talent naturel émerge à la surface aujourd'hui. Fais-lui pleinement confiance.`,
        `Agir sans forcer produit ici les meilleurs résultats — la voie est dégagée.`,
        `C'est un de ces rares moments où tout s'aligne. Saisis-le.`,
      ],
      'Sextile': [
        `Une opportunité subtile s'ouvre — elle ne crie pas, mais elle est bien là.`,
        `Saisis cet élan avec intention : les graines plantées aujourd'hui germeront.`,
        `Une petite action bien ciblée suffit pour activer tout ce potentiel.`,
        `L'énergie est favorable. Un pas concret peut ouvrir un long chemin.`,
        `Reste à l'écoute des petits signes — ils révèlent une voie féconde.`,
        `C'est une invitation douce, pas un coup de tonnerre. Réponds-y avec soin.`,
      ],
      'Conjonction': [
        `Cette concentration d'énergie demande à être canalisée avec intention.`,
        `Une double puissance est disponible — utilise-la avec discernement.`,
        `Ce n'est pas le moment de disperser ton énergie : concentre-toi sur l'essentiel.`,
        `L'intensité est au rendez-vous. Dompte-la plutôt que de la subir.`,
        `Ce que tu ressens profondément en ce moment mérite toute ton attention.`,
        `Deux énergies fusionnent en toi — écoute ce mouvement intérieur fort.`,
      ],
      'Carré': [
        `La tension ici n'est pas une malédiction — c'est l'énergie brute de la transformation.`,
        `Ce défi est précisément là où tu grandiras le plus vite.`,
        `Résiste à l'envie de fuir l'inconfort — c'est à cet endroit que tout commence.`,
        `L'obstacle est le chemin. Avance malgré la friction — c'est elle qui te forge.`,
        `C'est inconfortable, mais cette résistance t'oblige à trouver ta force vraie.`,
        `Une tension ne se résout pas en la fuyant, mais en la traversant avec lucidité.`,
      ],
      'Opposition': [
        `L'équilibre ne se trouve pas en choisissant un camp — il se tisse entre les deux.`,
        `Ce n'est pas une contradiction à résoudre, mais une danse à apprendre.`,
        `Deux forces se font face. Écoute chacune avant d'agir.`,
        `La sagesse du jour est dans l'intégration, pas dans le choix exclusif.`,
        `Ce qui semble opposé en toi cherche en réalité à trouver un dialogue.`,
        `Tenir les deux bouts de la corde sans lâcher — c'est ta force aujourd'hui.`,
      ],
    };

    const personalPlanets = ['sun', 'moon', 'mars', 'mercury', 'venus'];

    // Utiliser les transits du jour : planètes actuelles en aspect avec thème natal
    const normalizedTransits = transitAspects.map(ta => ({
      planet1: ta.transitPlanet,
      planet2: ta.natalPlanet,
      type: ta.type,
      transitSign: ta.transitSign,
    }));

    // Priorité : transits touchant une planète personnelle natale
    const p2pAspects = normalizedTransits.filter(a => personalPlanets.includes(a.planet2));
    const priorityPool = p2pAspects.length > 0 ? p2pAspects : normalizedTransits;

    const buildParagraph = (aspect: any): string => {
      const p1 = aspect.planet1 as string;
      const p2 = aspect.planet2 as string;
      const type = aspect.type as string;
      // p1Sign = signe du transit (position actuelle), p2Sign = signe natal
      const p1Sign = aspect.transitSign || planets[p1]?.sign || sunSign;
      const p2Sign = planets[p2]?.sign || moonSign;
      const p1Fr = translatePlanetLocal(p1);
      const p2Fr = translatePlanetLocal(p2);

      const dynamics = aspectDynamics[type] || ['interagit avec'];
      const dynamic = dynamics[Math.floor(seededRandom(dateKey + p1 + p2 + 'dyn') * dynamics.length)];

      const consequences = aspectConsequences[type] || ['Observe comment cette énergie se manifeste dans ta journée.'];
      const consequence = consequences[Math.floor(seededRandom(dateKey + p1 + p2 + 'con') * consequences.length)];

      const flavor = signFlavor[p1Sign] ? `, portant ${signFlavor[p1Sign]},` : '';
      const domainP1 = planetDomain[p1] || 'ton énergie';
      const domainP2 = planetDomain[p2] || 'une autre force planétaire';
      const domainP1Cap = domainP1.charAt(0).toUpperCase() + domainP1.slice(1);

      return `${withArticleCap(p1Fr)}${flavor} ${dynamic} ${withArticle(p2Fr)}. Une résonance s'établit entre ${domainP1} et ${domainP2}. ${consequence}`;
    };

    // Fallback : aucun aspect disponible → lecture pure des signes
    if (priorityPool.length === 0) {
      const sunDesc = signDescription[sunSign] || 'une énergie singulière';
      const moonDesc = signDescription[moonSign] || 'une sensibilité particulière';
      return `Le Soleil porte en toi ${sunDesc}. Cette énergie solaire guide tes choix depuis ton centre le plus profond — écoute-la.\n\nLa Lune teinte tes émotions de ${moonDesc}. Ces murmures intérieurs ne mentent jamais sur ce dont tu as vraiment besoin.`;
    }

    // Sélectionner 2 aspects distincts pour la journée
    const idx1 = Math.floor(seededRandom(dateKey + 'dag_a1') * priorityPool.length);
    const aspect1 = priorityPool[idx1];
    const remaining = priorityPool.filter((_: any, i: number) => i !== idx1);

    let para2: string;
    if (remaining.length > 0) {
      const idx2 = Math.floor(seededRandom(dateKey + 'dag_a2') * remaining.length);
      para2 = buildParagraph(remaining[idx2]);
    } else {
      // Un seul aspect : compléter avec la lecture d'un signe personnel
      const complementPlanet = personalPlanets.find(p => p !== aspect1.planet1 && p !== aspect1.planet2) || 'sun';
      const compSign = planets[complementPlanet]?.sign || sunSign;
      const compFr = translatePlanetLocal(complementPlanet);
      const compDomain = planetDomain[complementPlanet] || 'ton énergie';
      const compFlavor = signFlavor[compSign] || 'une couleur particulière';
      para2 = `${withArticleCap(compFr)} teinte ${compDomain} de ${compFlavor}. Laisse cette énergie enrichir ton regard sur la journée qui s'ouvre.`;
    }

    return `${buildParagraph(aspect1)}\n\n${para2}`;
  };

  const generateHumorousAdvice = (): string[] => {
    const tP = (key: string): string => ({
      sun: 'Soleil', moon: 'Lune', mercury: 'Mercure', venus: 'Vénus',
      mars: 'Mars', jupiter: 'Jupiter', saturn: 'Saturne', uranus: 'Uranus',
      neptune: 'Neptune', pluto: 'Pluton',
    }[key] || key);

    // Humour par planète de transit
    const transitHumor: Record<string, string[]> = {
      sun: [
        `le Soleil se pointe en fanfare dans ton thème`,
        `le Soleil décide aujourd'hui de mettre son nez dans tes affaires`,
        `le Soleil braque son projecteur sur toi`,
      ],
      moon: [
        `la Lune est d'humeur capricieuse`,
        `la Lune fait des siennes dans ton ciel`,
        `la Lune remue ce que tu préférais laisser tranquille`,
      ],
      mercury: [
        `Mercure, toujours bavard, s'invite dans la conversation`,
        `Mercure fait des heures sup' dans ta tête`,
        `Mercure relit ton dernier message et lève un sourcil`,
      ],
      venus: [
        `Vénus passe par là avec ses grands airs charmeurs`,
        `Vénus glisse un mot doux dans ton oreille cosmique`,
        `Vénus débarque avec une bonne bouteille et des intentions floues`,
      ],
      mars: [
        `Mars arrive en mode "on y va ou on y va ?"`,
        `Mars frappe à ta porte sans prévenir`,
        `Mars tape du poing sur la table du cosmos`,
      ],
      jupiter: [
        `Jupiter s'étire dans ton thème comme s'il était chez lui`,
        `Jupiter apporte son optimisme (et ses excès) dans la pièce`,
        `Jupiter grossit ce qui mérite d'être vu`,
      ],
      saturn: [
        `Saturne, le sérieux de service, sort son carnet de notes`,
        `Saturne te regarde avec ses lunettes de bilan`,
        `Saturne arrive avec sa liste de choses à faire depuis 3 ans`,
      ],
      uranus: [
        `Uranus, l'électron libre, court-circuite ton programme`,
        `Uranus décide de réorganiser ta vie sans te demander ton avis`,
        `Uranus appuie sur le bouton "chaos créatif"`,
      ],
      neptune: [
        `Neptune flotte dans ton thème comme un brouillard parfumé`,
        `Neptune brouille les cartes avec une grâce déconcertante`,
        `Neptune rêvasse dans ton thème et oublie l'heure`,
      ],
      pluto: [
        `Pluton, discret mais implacable, creuse en silence`,
        `Pluton remue ce que tu croyais enterré`,
        `Pluton débarque avec une pelle et un sourire énigmatique`,
      ],
    };

    // Templates complets par type d'aspect — p1=planète transit, s=signe, p2=planète natale
    // Helpers accord grammatical français
    // p2 (planète natale) : Lune et Vénus sont féminines
    const nr = (p: string) => (['Lune', 'Vénus'].includes(p)
      ? { a: 'ta', adj: 'natale' }
      : { a: 'ton', adj: 'natal' });
    // p1 (planète de transit) : article défini La/Le, vide pour Mars/Mercure/etc.
    const artDef = (p: string, cap: boolean): string => {
      if (p === 'Lune') return cap ? 'La ' : 'la ';
      if (p === 'Soleil') return cap ? 'Le ' : 'le ';
      return '';
    };
    const p1s = (p1: string, _s: string) => `${artDef(p1, true)}${p1}`;
    const p1m = (p1: string, _s: string) => `${artDef(p1, false)}${p1}`;
    const polishDayAtGlanceLine = (text: string): string =>
      text
        .replace(/\s+—\s+/g, ', ')
        .replace(/\s{2,}/g, ' ')
        .replace(/\s+([,.;!?])/g, '$1')
        .replace(/\s*:\s*/g, ' : ')
        .trim();
    type TplFn = (p1: string, s: string, p2: string) => string;
    const templates: Record<string, TplFn[]> = {
      Trigone: [
        // T1 — alliance naturelle, laisser faire
        (p1, s, p2) => `${p1s(p1, s)} tend la main à ${nr(p2).a} ${p2} ${nr(p2).adj} en Trigone. Ces deux énergies ont toujours su cohabiter — laisse-les travailler pour toi sans en demander davantage.`,
        // T2 — fenêtre rare, savourer sans analyser
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} forment un Trigone aujourd'hui. Ce genre d'alignement est rare — savoure-le plutôt que de chercher à comprendre pourquoi ça va bien.`,
        // T3 — facilité, rien à forcer
        (p1, s, p2) => `${p1s(p1, s)} caresse ${nr(p2).a} ${p2} ${nr(p2).adj} d'un Trigone tout en douceur. Rien n'a besoin d'être forcé aujourd'hui — l'élan est là, il te suffit de le suivre.`,
        // T4 — signal intérieur, direction indiquée
        (p1, s, p2) => `Trigone entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. Quand les choses avancent aussi facilement, ce n'est pas du hasard — l'Univers pointe quelque chose, tends-y l'oreille.`,
        // T5 — circonstances conspirent, fruit de ce qui a été semé
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} tirent dans le même sens aujourd'hui. Les circonstances semblent conspirer en ta faveur — ce n'est pas un hasard, c'est le signe que quelque chose de semé a enfin germé.`,
        // T6 — talent sous-estimé qui s'exprime sans effort
        (p1, s, p2) => `${p1s(p1, s)} forme un Trigone avec ${nr(p2).a} ${p2} ${nr(p2).adj}. Un talent que tu possèdes depuis toujours mais que tu sous-estimes s'exprime avec une facilité déconcertante aujourd'hui — laisse-lui prendre de l'espace.`,
        // T7 — énergie communicative, présence ressentie par l'entourage
        (p1, s, p2) => `${p1s(p1, s)} est en Trigone avec ${nr(p2).a} ${p2} ${nr(p2).adj}. L'énergie que tu dégages est communicative — les gens autour de toi le sentent sans que tu aies à l'expliquer, et c'est précisément ce qui donne du poids à ta présence.`,
        // T8 — regain d'élan oublié, fatigue qui disparaît
        (p1, s, p2) => `Trigone harmonieux entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. Ce qui te coûtait de l'énergie ces derniers temps semble aller de soi aujourd'hui — un regain d'élan dont tu avais oublié qu'il était possible.`,
        // T9 — moment optimal pour formuler une demande ou une proposition
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} s'accordent en Trigone. Si tu attendais le bon moment pour formuler une demande ou faire une proposition, ce moment-là est aujourd'hui.`,
        // T10 — ce qui est fait maintenant laisse une trace durable
        (p1, s, p2) => `${p1s(p1, s)} soutient ${nr(p2).a} ${p2} ${nr(p2).adj} d'un Trigone solide. Ce que tu crées ou décides maintenant a une qualité de durée — agis de façon à ce que ton futur toi s'en félicite.`,
        // T11 — vent dans le dos mais les voiles ne se hissent pas seules
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} s'alignent en Trigone. Le vent est dans ton dos, mais les voiles ne se hissent pas seules — une intention claire et une présence active sont encore nécessaires.`,
        // T12 — précision plus efficace que la force
        (p1, s, p2) => `Trigone entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. Ce n'est pas la force qui compte aujourd'hui, c'est la précision — un ajustement subtil produira bien plus qu'un grand effort bruyant.`,
        // T13 — confirmation d'une direction sur le long terme
        (p1, s, p2) => `${p1s(p1, s)} confirme ${nr(p2).a} ${p2} ${nr(p2).adj} d'un Trigone porteur. Ce que tu construis pas à pas depuis un moment trouve ici une validation silencieuse — continue dans cette direction.`,
        // T14 — générosité naturellement récompensée
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} vibrent en Trigone. Ce que tu as donné sans compter trouve aujourd'hui son écho — la générosité sincère a un retour, simplement pas toujours immédiat.`,
        // T15 — expression sincère plus percutante que ce qui est calculé
        (p1, s, p2) => `${p1s(p1, s)} libère ${nr(p2).a} ${p2} ${nr(p2).adj} d'un Trigone fluide. Ce que tu exprimes avec sincérité — sans calcul ni retenue — a nettement plus d'impact que ce que tu aurais soigneusement construit.`,
      ],
      Sextile: [
        // S1 — opportunité fugace, vigilance
        (p1, s, p2) => `${p1s(p1, s)} adresse un clin d'œil à ${nr(p2).a} ${p2} ${nr(p2).adj} via un Sextile. L'occasion est là, feutrée mais réelle — elle ne prendra pas la peine de frapper deux fois.`,
        // S2 — petite action, grande portée
        (p1, s, p2) => `Un Sextile relie ${p1m(p1, s)} à ${nr(p2).a} ${p2} ${nr(p2).adj}. Rien de tapageur, mais une porte entrouverte — un geste modeste posé maintenant peut ouvrir un chemin bien plus long qu'il n'y paraît.`,
        // S3 — quelque chose se débloque doucement
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} forment en coulisses un Sextile discret en ta faveur. Quelque chose se débloque doucement — reste attentif aux petits signes de la journée.`,
        // S4 — terrain fertile, graine à planter
        (p1, s, p2) => `Sextile entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. Le terrain est fertile aujourd'hui dans ce domaine — c'est le bon moment pour planter une graine, même petite.`,
        // S5 — connexion inattendue, curiosité utile
        (p1, s, p2) => `${p1s(p1, s)} forme un Sextile avec ${nr(p2).a} ${p2} ${nr(p2).adj}. Une connexion s'établit là où tu ne l'attendais pas — laisse ta curiosité te guider, elle sait quelque chose que ton mental ignore encore.`,
        // S6 — conversation anodine qui révèle quelque chose
        (p1, s, p2) => `${p1s(p1, s)} s'allie à ${nr(p2).a} ${p2} ${nr(p2).adj} via un Sextile. Une conversation anodine peut aujourd'hui révéler quelque chose d'important — écoute ce qui se dit sans chercher à conclure trop vite.`,
        // S7 — invitation douce à sortir d'une ornière comfortable
        (p1, s, p2) => `Sextile délicat entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. Cette configuration t'invite doucement à quitter une ornière confortable — pas un grand saut, juste un pas de côté suffit.`,
        // S8 — idée latente attendant un petit élan extérieur
        (p1, s, p2) => `${p1s(p1, s)} effleure ${nr(p2).a} ${p2} ${nr(p2).adj} d'un Sextile. Une idée qui dormait en toi depuis un moment n'attendait que ce petit élan extérieur pour enfin prendre forme.`,
        // S9 — soutien venant d'où on ne l'attendait pas
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} forment un Sextile favorable. Un soutien arrive d'où tu ne l'attendais pas — reste ouvert aux aides qui n'ont pas le visage que tu imaginais.`,
        // S10 — résistance habituelle diminuée, fenêtre à saisir
        (p1, s, p2) => `${p1s(p1, s)} active ${nr(p2).a} ${p2} ${nr(p2).adj} d'un Sextile. La résistance habituelle est moindre en ce moment — c'est précisément la fenêtre pour initier ce que tu remettais à plus tard.`,
        // S11 — effort minimal pour retour maximal
        (p1, s, p2) => `Sextile entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. La règle du moindre effort s'applique ici — un geste ciblé au bon endroit vaut infiniment plus qu'une dépense d'énergie inconsidérée.`,
        // S12 — collaboration plus productive que l'effort solitaire
        (p1, s, p2) => `${p1s(p1, s)} tisse un Sextile avec ${nr(p2).a} ${p2} ${nr(p2).adj}. Demander un avis ou travailler à deux produira aujourd'hui quelque chose qu'aucun effort solitaire n'aurait atteint seul.`,
        // S13 — détail que l'on passerait habituellement à côté
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} échangent via un Sextile. Un détail que tu aurais normalement laissé passer mérite d'être examiné — il contient peut-être une information plus utile qu'il n'y paraît.`,
        // S14 — oser sans trop calculer les risques
        (p1, s, p2) => `${p1s(p1, s)} encourage ${nr(p2).a} ${p2} ${nr(p2).adj} d'un Sextile tout en légèreté. Ose sans trop peser les risques — dans ce contexte, l'action spontanée est souvent plus juste que la stratégie réfléchie.`,
        // S15 — potentiel endormi qui s'éveille
        (p1, s, p2) => `Sextile entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. Quelque chose en toi qui semblait s'être assoupi se réveille doucement — fais-lui de la place, même s'il ne sait pas encore très bien ce qu'il veut.`,
      ],
      Conjonction: [
        // C1 — fusion, concentration, ne pas disperser
        (p1, s, p2) => `${p1s(p1, s)} fusionne avec ${nr(p2).a} ${p2} ${nr(p2).adj} en Conjonction. Deux forces au même point — c'est dense et chargé. Pas le moment de te disperser : concentre cette énergie sur ce qui compte vraiment.`,
        // C2 — amplification, angles morts visibles
        (p1, s, p2) => `Conjonction puissante : ${p1m(p1, s)} rejoint ${nr(p2).a} ${p2} ${nr(p2).adj}. Tout est amplifié aujourd'hui — tes forces comme tes angles morts. Reste lucide, c'est une opportunité de te voir clairement.`,
        // C3 — pression qui cherche une sortie
        (p1, s, p2) => `${p1s(p1, s)} se colle à ${nr(p2).a} ${p2} ${nr(p2).adj} en Conjonction. Une pression s'accumule dans ce secteur — elle cherche une sortie. À toi de lui en offrir une qui serve quelque chose.`,
        // C4 — signal insistant qui remonte, attention requise
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} occupent le même espace en Conjonction. Observe sans filtrer ce qui remonte à la surface — une pensée insistante ou un besoin récurrent indique avec fiabilité l'endroit où ton attention est réellement nécessaire.`,
        // C5 — chance conditionnelle, intention requise
        (p1, s, p2) => `Conjonction entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. Ces deux énergies vibrent au même endroit — c'est une chance, mais seulement si tu choisis consciemment dans quelle direction les emmener.`,
        // C6 — moment de vérité inconfortable mais précieux
        (p1, s, p2) => `${p1s(p1, s)} est en Conjonction exacte avec ${nr(p2).a} ${p2} ${nr(p2).adj}. Une clarté inconfortable mais précieuse émerge sur toi-même — ce genre de moment de vérité ne se présente pas souvent, ne t'en détourne pas.`,
        // C7 — surcharge sensorielle, besoin de calme pour entendre le message
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} fusionnent en Conjonction. La stimulation est intensive — ménage-toi des moments de calme pour ne pas étouffer ce que cette énergie cherche à te dire.`,
        // C8 — brouillard se dissipe, quelque chose se cristallise
        (p1, s, p2) => `Conjonction directe entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. Ce qui était flou ou en suspens depuis un moment peut maintenant prendre une forme concrète — le brouillard se dissipe, si tu veux bien y regarder.`,
        // C9 — pensée et action ne font qu'un, aligner sans délai
        (p1, s, p2) => `${p1s(p1, s)} se superpose à ${nr(p2).a} ${p2} ${nr(p2).adj} en Conjonction. C'est l'un de ces rares moments où ce que tu penses et ce que tu fais se rejoignent naturellement — ne sépare pas la réflexion de l'action.`,
        // C10 — identité mise à l'épreuve, se positionner
        (p1, s, p2) => `${p1s(p1, s)} percute ${nr(p2).a} ${p2} ${nr(p2).adj} en Conjonction. Cette rencontre intense t'oblige à te positionner — qui es-tu vraiment face à cette situation ? La réponse qui émerge mérite d'être entendue.`,
        // C11 — deux parties de soi se rencontrent face à face
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} convergent au même point en Conjonction. C'est comme si deux parties de toi se trouvaient enfin face à face — écoute ce dialogue intérieur, il est rarement aussi direct.`,
        // C12 — ce qui était latent devient manifeste
        (p1, s, p2) => `Conjonction intense : ${p1m(p1, s)} active ${nr(p2).a} ${p2} ${nr(p2).adj}. Ce qui était en coulisses — une envie, un besoin, une vérité — cherche à se manifester clairement. La surface de l'eau monte, il serait dommage de la retenir.`,
        // C13 — début d'un nouveau cycle, intentions qui portent loin
        (p1, s, p2) => `${p1s(p1, s)} rejoint ${nr(p2).a} ${p2} ${nr(p2).adj} en Conjonction : un nouveau cycle commence. Ce que tu poses comme intention dans les prochaines heures peut influencer ce cycle bien au-delà de la journée.`,
        // C14 — authenticité forcée par l'intensité, demi-mesures impossibles
        (p1, s, p2) => `${p1s(p1, s)} se fond dans ${nr(p2).a} ${p2} ${nr(p2).adj} en Conjonction. Une intensité comme celle-ci rend impossible les demi-mesures — ce que tu vois, ce que tu ressens, ce que tu veux : tout est plus net, plus vrai, moins négociable.`,
        // C15 — densité qui appelle à la solitude et au recentrage
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} convergent en Conjonction. Cette densité d'énergie peut être inconfortable dans le bruit — cherche un espace de calme pour laisser cette convergence opérer à son rythme.`,
      ],
      Carré: [
        // Ca1 — friction formatrice si on ne se braque pas
        (p1, s, p2) => `${p1s(p1, s)} est en Carré avec ${nr(p2).a} ${p2} ${nr(p2).adj}. Cette friction est agaçante, c'est certain — mais c'est précisément là qu'elle devient formatrice, si tu ne te braques pas.`,
        // Ca2 — journée dont on se souvient comme d'un tournant
        (p1, s, p2) => `Carré entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. Les jours marqués par ce genre de friction sont souvent ceux dont on se souvient comme d'un tournant — pas très agréables sur le moment, mais déterminants sur la durée.`,
        // Ca3 — examiner à froid, pas réagir à chaud
        (p1, s, p2) => `${p1s(p1, s)} cherche des noises à ${nr(p2).a} ${p2} ${nr(p2).adj} via un Carré. Ce que cette tension active en toi mérite d'être examiné à froid — sans te laisser emporter par la première réaction venue.`,
        // Ca4 — résistance = information sur ce qui doit changer
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} se heurtent en Carré. La résistance que tu ressens n'est pas là pour te bloquer — elle est là pour te renseigner sur ce qui doit changer.`,
        // Ca5 — outil tranchant, construit ou blesse selon comment on le tient
        (p1, s, p2) => `Un Carré tendu entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. L'énergie est là, vive et tranchante — comme un outil, elle peut construire ou blesser selon la façon dont tu la tiens.`,
        // Ca6 — impatience = signal que quelque chose a trop duré
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} se frictionnent en Carré. L'impatience que tu ressens n'est pas une faiblesse — c'est le signal que quelque chose a trop duré et qu'un changement n'est plus optionnel.`,
        // Ca7 — limites révélées, contour du réellement possible
        (p1, s, p2) => `Carré actif entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. Les limites que tu rencontres ne sont pas là pour te punir — elles définissent le contour de ce qui est à ta portée réelle, et cette information est précieuse.`,
        // Ca8 — ce qui résiste pointe où tu t'accroches encore
        (p1, s, p2) => `${p1s(p1, s)} bouscule ${nr(p2).a} ${p2} ${nr(p2).adj} en Carré. Ce qui résiste le plus fort en toi pointe invariablement vers l'endroit où tu t'accroches encore à quelque chose qui ne te sert plus.`,
        // Ca9 — inconfort qui précède la clarté, ne pas fuir trop tôt
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} s'arc-boutent en Carré. Cet inconfort est souvent celui qui précède une clarté — reste avec lui un peu avant de chercher à t'en débarrasser trop vite.`,
        // Ca10 — tentation de forcer vs. laisser mûrir
        (p1, s, p2) => `Carré tenace entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. L'envie de forcer pour en finir est forte aujourd'hui — mais certaines choses ne s'accélèrent pas sans qu'on le paie plus tard.`,
        // Ca11 — effort supérieur aux attentes mais résultat supérieur aussi
        (p1, s, p2) => `${p1s(p1, s)} défie ${nr(p2).a} ${p2} ${nr(p2).adj} d'un Carré serré. L'effort que cela exige dépasse ce que tu espérais — mais ce qu'il produit finalement dépasse aussi ce que l'aisance aurait jamais pu donner.`,
        // Ca12 — ce qui n'a pas été dit et devrait l'être
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} se heurtent en Carré direct. Quelque chose qui aurait dû être exprimé ne l'a pas été — une bonne partie de la tension du moment vient peut-être de là.`,
        // Ca13 — rester dans le flou n'est plus une option confortable
        (p1, s, p2) => `Carré entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. Rester dans le flou n'est plus une option confortable ici — cette tension réclame une position franche, même si elle dérange.`,
        // Ca14 — frustration comme carburant ou comme poison
        (p1, s, p2) => `${p1s(p1, s)} est en Carré avec ${nr(p2).a} ${p2} ${nr(p2).adj}. La frustration que tu ressens peut devenir du carburant ou te ronger — la différence tient entièrement à l'endroit où tu la diriges.`,
        // Ca15 — remise en question que le confort ne peut jamais provoquer
        (p1, s, p2) => `${p1s(p1, s)} secoue ${nr(p2).a} ${p2} ${nr(p2).adj} d'un Carré brutalement honnête. Ce genre de remise en question est rarement agréable — mais elle te met face à quelque chose de réel, ce que le confort ne peut jamais faire.`,
      ],
      Opposition: [
        // O1 — tenir les deux à la fois plutôt que choisir
        (p1, s, p2) => `${p1s(p1, s)} fait face à ${nr(p2).a} ${p2} ${nr(p2).adj} en Opposition. Deux pôles opposés cherchent leur centre — l'équilibre ne se trouve pas en choisissant l'un, mais en tenant les deux à la fois.`,
        // O2 — ce qui était dans l'ombre remonte
        (p1, s, p2) => `Opposition entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. Ce qui était dans l'ombre depuis un moment cherche aujourd'hui à être reconnu — quelque chose remonte à la surface, que tu l'aies invité ou non.`,
        // O3 — nommer suffit à réduire le poids
        (p1, s, p2) => `${p1s(p1, s)} est en Opposition avec ${nr(p2).a} ${p2} ${nr(p2).adj}. Cette tension n'a pas besoin d'être résolue aujourd'hui — parfois, la nommer clairement suffit à en réduire considérablement le poids.`,
        // O4 — ce qui agace chez l'autre n'est pas encore accepté en soi
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} s'affrontent en Opposition directe. Ce qui te dérange chez les autres aujourd'hui est souvent quelque chose que tu n'as pas encore accepté en toi.`,
        // O5 — pression révèle qui tu es vraiment
        (p1, s, p2) => `Opposition nette entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. Cette opposition te donne une rare occasion d'observer comment tu réagis sous pression — c'est là que se révèle ce que tu es vraiment, au-delà de ce que tu crois être.`,
        // O6 — ce que l'autre incarne est un miroir de soi
        (p1, s, p2) => `${p1s(p1, s)} est en Opposition avec ${nr(p2).a} ${p2} ${nr(p2).adj}. Ce que tu vois chez les autres aujourd'hui — ce qui t'attire ou t'agace — parle de toi avec une précision que ta propre introspection n'atteint pas toujours.`,
        // O7 — oscillation naturelle, point de calme dans le mouvement
        (p1, s, p2) => `Opposition active entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. Tu oscilles entre deux positions — c'est l'état naturel du balancier. Le point de calme ne se trouve pas à l'arrêt, mais dans le mouvement lui-même.`,
        // O8 — deux vérités simultanément vraies, élargir le cadre
        (p1, s, p2) => `${p1s(p1, s)} fait face à ${nr(p2).a} ${p2} ${nr(p2).adj} en Opposition directe. Deux choses apparemment contradictoires peuvent être vraies en même temps — cette configuration t'invite à élargir ton cadre plutôt qu'à trancher.`,
        // O9 — prendre de la distance pour voir plus clairement
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} s'affrontent en Opposition. Parfois, la meilleure façon de sortir d'une polarité est de s'en éloigner momentanément — un peu de recul peut tout éclairer.`,
        // O10 — ce qui échappe au contrôle, acceptation = libération
        (p1, s, p2) => `Opposition entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. Ce qui se joue ici échappe en partie à ton contrôle — et l'acceptation de ce fait n'est pas une capitulation, c'est une libération.`,
        // O11 — réconciliation avec une partie de soi longtemps niée
        (p1, s, p2) => `${p1s(p1, s)} dialogue en Opposition avec ${nr(p2).a} ${p2} ${nr(p2).adj}. Une partie de toi que tu as longtemps ignorée ou mise de côté demande aujourd'hui à être réintégrée — non par obligation, mais parce qu'elle t'appartient.`,
        // O12 — laisser l'oscillation aller à son rythme, ne pas forcer le retour
        (p1, s, p2) => `${p1s(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj} se font face en Opposition. Ne force pas le retour au centre — l'oscillation est naturelle et nécessaire. Ce qui part d'un côté revient toujours, à sa propre cadence.`,
        // O13 — renoncement apparent qui libère un espace nécessaire
        (p1, s, p2) => `Opposition nette entre ${p1m(p1, s)} et ${nr(p2).a} ${p2} ${nr(p2).adj}. Ce qui ressemble aujourd'hui à une perte ou un renoncement peut s'avérer être l'espace qu'il manquait pour que quelque chose de nouveau puisse respirer.`,
        // O14 — épuisement du tiraillement, nommer la fatigue sans jugement
        (p1, s, p2) => `${p1s(p1, s)} tire en sens contraire de ${nr(p2).a} ${p2} ${nr(p2).adj} en Opposition. Ce tiraillement peut être épuisant — reconnaître cette fatigue, sans jugement, est déjà une façon de ne pas la laisser te vider.`,
        // O15 — urgence de décider = signe que le moment n'est pas mûr
        (p1, s, p2) => `${p1s(p1, s)} est en Opposition exacte avec ${nr(p2).a} ${p2} ${nr(p2).adj}. La décision que tu sens la pression de prendre peut attendre — l'urgence que tu ressens est souvent le signe que le moment n'est pas encore mûr pour trancher.`,
      ],
    };

    const fastPlanets = ['sun', 'moon', 'mercury', 'venus', 'mars'];
    const normalizedTransits = transitAspects
      .filter((ta: any) => fastPlanets.includes(ta.transitPlanet))
      .map((ta: any) => ({
        planet1: ta.transitPlanet,
        planet2: ta.natalPlanet,
        type: ta.type,
        transitSign: ta.transitSign,
      }));

    const personalPlanets = ['sun', 'moon', 'mars', 'mercury', 'venus'];
    const p2pAspects = normalizedTransits.filter((a: any) => personalPlanets.includes(a.planet2));
    const pool = p2pAspects.length > 0 ? p2pAspects : normalizedTransits;

    if (pool.length === 0) {
      return [
        `Aucun transit personnel ne domine aujourd’hui. Avance à ton rythme et laisse de la place à l’imprévu.`,
      ].map(polishDayAtGlanceLine);
    }

    const usedTemplateIndices: Record<string, Set<number>> = {};

    const buildHumorLine = (aspect: any, seed: string): string => {
      const p1 = tP(aspect.planet1 as string);
      const p2 = tP(aspect.planet2 as string);
      const type = aspect.type as string;
      const sign = aspect.transitSign || '';
      const tpls = templates[type];
      if (!tpls) {
        return polishDayAtGlanceLine(`${p1s(p1, sign)} forme un aspect avec ${nr(p2).a} ${p2} ${nr(p2).adj}. Ce transit attire ton attention sur un réglage concret à faire aujourd’hui.`);
      }
      if (!usedTemplateIndices[type]) usedTemplateIndices[type] = new Set();
      let idx = Math.floor(seededRandom(seed + type + p1 + p2 + 'tpl') * tpls.length);
      let attempts = 0;
      while (usedTemplateIndices[type].has(idx) && attempts < tpls.length) {
        idx = (idx + 1) % tpls.length;
        attempts++;
      }
      usedTemplateIndices[type].add(idx);
      return polishDayAtGlanceLine(tpls[idx](p1, sign, p2));
    };

    const planetFocus: Record<string, string> = {
      sun: 'ton affirmation personnelle',
      moon: 'ton équilibre émotionnel',
      mercury: 'ta manière de penser',
      venus: 'ta vie affective',
      mars: 'ta capacité d’agir',
      jupiter: 'ta confiance en l’avenir',
      saturn: 'ton sens des responsabilités',
      uranus: 'ton besoin de liberté',
      neptune: 'ton intuition',
      pluto: 'ta capacité de transformation',
    };

    const practicalMove: Record<string, string> = {
      sun: 'faire un choix qui te ressemble',
      moon: 'nommer ce que tu ressens',
      mercury: 'clarifier un message ou une décision',
      venus: 'exprimer clairement tes envies',
      mars: 'agir de façon précise',
      jupiter: 'oser un pas plus ambitieux',
      saturn: 'poser une limite durable',
      uranus: 'essayer une autre méthode',
      neptune: 'écouter ton intuition sans oublier les faits',
      pluto: 'laisser évoluer ce qui doit changer',
    };

    type ReadingTemplate = (transitFocus: string, natalFocus: string, move: string) => string;
    const clearReadings: Record<string, ReadingTemplate[]> = {
      Trigone: [
        (transitFocus, natalFocus, move) => `Un accord se crée entre ${transitFocus} et ${natalFocus}. Profite de cet élan pour ${move}.`,
        (transitFocus, natalFocus, move) => `Tout circule mieux entre ${transitFocus} et ${natalFocus}. Profite de cette fluidité pour ${move}.`,
        (transitFocus, natalFocus, move) => `Aujourd’hui, ${transitFocus} et ${natalFocus} avancent naturellement ensemble. Appuie-toi sur cette fluidité pour ${move}.`,
        (transitFocus, natalFocus, move) => `Le climat favorise à la fois ${transitFocus} et ${natalFocus}. Utilise cette aisance pour ${move}.`,
      ],
      Sextile: [
        (transitFocus, natalFocus, move) => `Une ouverture relie ${transitFocus} à ${natalFocus}. Un premier pas suffit pour ${move}.`,
        (transitFocus, natalFocus, move) => `Un soutien se crée entre ${transitFocus} et ${natalFocus}. Saisis l’occasion pour ${move}.`,
        (transitFocus, natalFocus, move) => `Un lien favorable rapproche ${transitFocus} de ${natalFocus}. Une initiative simple peut suffire pour ${move}.`,
        (transitFocus, natalFocus, move) => `Une possibilité se dessine entre ${transitFocus} et ${natalFocus}. À toi de l’activer : ${move}.`,
      ],
      Conjonction: [
        (transitFocus, natalFocus, move) => `La rencontre entre ${transitFocus} et ${natalFocus} intensifie la journée. Canalise cet élan pour ${move}.`,
        (transitFocus, natalFocus, move) => `Aujourd’hui, ${transitFocus} et ${natalFocus} se renforcent. Concentre-toi sur une chose : ${move}.`,
        (transitFocus, natalFocus, move) => `Aujourd’hui, ${transitFocus} se mêle étroitement à ${natalFocus}. Donne une direction claire à cette intensité : ${move}.`,
        (transitFocus, natalFocus, move) => `L’accent se pose sur ${transitFocus} autant que sur ${natalFocus}. Évite la dispersion et cherche à ${move}.`,
      ],
      Carré: [
        (transitFocus, natalFocus, move) => `Une friction oppose ${transitFocus} à ${natalFocus}. Ralentis, puis commence par ${move}.`,
        (transitFocus, natalFocus, move) => `Un décalage apparaît entre ${transitFocus} et ${natalFocus}. Ajuste-toi en commençant par ${move}.`,
        (transitFocus, natalFocus, move) => `Aujourd’hui, ${transitFocus} et ${natalFocus} tirent dans des directions différentes. Transforme cette tension en cherchant à ${move}.`,
        (transitFocus, natalFocus, move) => `Le contact entre ${transitFocus} et ${natalFocus} manque de souplesse. Ne force pas ; commence par ${move}.`,
      ],
      Opposition: [
        (transitFocus, natalFocus, move) => `Tu peux hésiter entre ${transitFocus} et ${natalFocus}. Prends du recul, puis cherche à ${move}.`,
        (transitFocus, natalFocus, move) => `Un tiraillement oppose ${transitFocus} à ${natalFocus}. Écoute les deux avant d’agir.`,
        (transitFocus, natalFocus) => `Aujourd’hui, ${transitFocus} demande autant de place que ${natalFocus}. Cherche un équilibre avant d’agir.`,
        (transitFocus, natalFocus, move) => `Deux élans se répondent sans encore s’accorder : ${transitFocus} et ${natalFocus}. Accueille cette nuance avant de choisir.`,
      ],
    };

    const samePlanetReadings: Record<string, ReadingTemplate[]> = {
      Trigone: [
        (_transitFocus, natalFocus, move) => `Cette harmonie renforce ${natalFocus}. Appuie-toi sur cette cohérence pour ${move}.`,
        (_transitFocus, natalFocus, move) => `Ici, ${natalFocus} gagne en fluidité. Profite de ce mouvement pour ${move}.`,
      ],
      Sextile: [
        (_transitFocus, natalFocus, move) => `Une ouverture stimule ${natalFocus}. Saisis-la pour ${move}.`,
        (_transitFocus, natalFocus, move) => `Aujourd’hui, ${natalFocus} devient plus facile à mobiliser. Un premier pas suffit pour ${move}.`,
      ],
      Conjonction: [
        (_transitFocus, natalFocus, move) => `Toute l’attention se concentre sur ${natalFocus}. Canalise cet élan pour ${move}.`,
        (_transitFocus, natalFocus, move) => `Aujourd’hui, ${natalFocus} s’intensifie. Garde un seul cap : ${move}.`,
      ],
      Carré: [
        (_transitFocus, natalFocus, move) => `Une tension traverse ${natalFocus}. Ralentis, puis commence par ${move}.`,
        (_transitFocus, natalFocus, move) => `Aujourd’hui, ${natalFocus} demande un ajustement. Évite de forcer et cherche à ${move}.`,
      ],
      Opposition: [
        (_transitFocus, natalFocus) => `Deux besoins contraires traversent ${natalFocus}. Prends du recul avant d’agir.`,
        (_transitFocus, natalFocus) => `Aujourd’hui, ${natalFocus} oscille entre deux directions. Laisse la tension retomber avant de choisir.`,
      ],
    };

    const usedReadingIndices: Record<string, Set<number>> = {};
    const usedTitleIndices: Record<string, Set<number>> = {};

    const pickUnusedIndex = (preferred: number, count: number, used: Set<number>): number => {
      let index = preferred % count;
      let attempts = 0;
      while (used.has(index) && attempts < count) {
        index = (index + 1) % count;
        attempts++;
      }
      used.add(index);
      return index;
    };

    const improveDayAtGlanceLine = (_original: string, aspect: any): string => {
      const p1Key = aspect.planet1 as string;
      const p2Key = aspect.planet2 as string;
      const p1 = tP(p1Key);
      const p2 = tP(p2Key);
      const type = aspect.type as string;
      const sign = aspect.transitSign || '';
      const signLabel = sign ? ` en ${sign}` : '';
      const aspectArticle = type === 'Conjonction' || type === 'Opposition' ? 'une' : 'un';
      const aspectLabel = type.toLocaleLowerCase('fr-FR');
      const natalPlanet = `${nr(p2).a} ${p2} ${nr(p2).adj}`;
      const titleTemplates = [
        `${p1s(p1, sign)}${signLabel} forme ${aspectArticle} ${aspectLabel} avec ${natalPlanet}.`,
        `${type} entre ${p1m(p1, sign)}${signLabel} et ${natalPlanet}.`,
        `${p1s(p1, sign)}${signLabel} est en ${aspectLabel} avec ${natalPlanet}.`,
      ];
      const titleKey = `${type}|title`;
      if (!usedTitleIndices[titleKey]) usedTitleIndices[titleKey] = new Set();
      const preferredTitleIndex = getDateOrdinal(dateKey)
        + hashToInt(`${personalizationSeed}|${p1Key}|${p2Key}|${type}|title`);
      const titleIndex = pickUnusedIndex(preferredTitleIndex, titleTemplates.length, usedTitleIndices[titleKey]);
      const generatedTitle = titleTemplates[titleIndex];
      const title = generatedTitle;
      const compactFocus: Record<string, string> = {
        sun: 'ton cap',
        moon: 'ton équilibre émotionnel',
        mercury: 'ta communication',
        venus: 'tes relations',
        mars: 'ta façon d’agir',
        jupiter: 'ta confiance',
        saturn: 'tes limites',
        uranus: 'ta liberté',
        neptune: 'ton intuition',
        pluto: 'ce que tu dois transformer',
      };
      const compactMove: Record<string, string> = {
        sun: 'clarifie ton choix',
        moon: 'nomme ce que tu ressens',
        mercury: 'reformule avant de répondre',
        venus: 'dis clairement ce que tu veux',
        mars: 'choisis une action précise',
        jupiter: 'ouvre une option plus large',
        saturn: 'pose une limite nette',
        uranus: 'essaie une autre méthode',
        neptune: 'vérifie les faits',
        pluto: 'lâche ce qui doit changer',
      };
      const transitFocus = compactFocus[p1Key] || planetFocus[p1Key] || 'ton élan';
      const natalFocus = compactFocus[p2Key] || planetFocus[p2Key] || 'ton équilibre';
      const move = compactMove[p2Key] || practicalMove[p2Key] || 'choisis simple';
      const transitTextures: Record<string, string[]> = {
        sun: [
          'Ton cap devient plus net',
          'Tu vois mieux ce que tu veux défendre',
          'Une décision personnelle demande plus de clarté',
        ],
        moon: [
          'Ton humeur met un besoin en évidence',
          'Ce que tu ressens prend plus de place',
          'Une réaction spontanée révèle ce qui compte vraiment',
        ],
        mercury: [
          'Une idée change l’angle de la situation',
          'Tes mots demandent plus de précision',
          'Une conversation peut débloquer un malentendu',
        ],
        venus: [
          'Un désir devient plus lisible',
          'Une relation demande plus de nuance',
          'Ce que tu apprécies vraiment devient plus évident',
        ],
        mars: [
          'Ton énergie monte',
          'Tu as envie d’agir vite',
          'Ton élan a besoin d’une direction claire',
        ],
        jupiter: [
          'Tu vois plus large',
          'La confiance revient doucement',
          'Une possibilité prend plus d’ampleur',
        ],
        saturn: [
          'Une limite devient utile',
          'Le réel te demande d’être plus simple',
          'Une responsabilité te ramène à l’essentiel',
        ],
        uranus: [
          'Tu as besoin d’air',
          'Une autre méthode devient possible',
          'L’imprévu ouvre une porte praticable',
        ],
        neptune: [
          'Ton intuition parle plus fort',
          'Un flou demande à être vérifié avec douceur',
          'Un ressenti important remonte',
        ],
        pluto: [
          'Un vieux réflexe remonte',
          'Une vérité intérieure insiste',
          'Un changement intérieur devient difficile à ignorer',
        ],
      };
      const pickTexture = (options: string[] | undefined, salt: string): string => {
        const values = options && options.length > 0 ? options : ['ce qui bouge en toi'];
        const index = Math.floor(seededRandom(`${dateKey}|${personalizationSeed}|${p1Key}|${p2Key}|${type}|${salt}`) * values.length);
        return values[index];
      };
      const transitTexture = pickTexture(transitTextures[p1Key], 'transit-texture');
      const bridgeEffects: Record<string, string[]> = {
        sun: [
          'clarifie ce que tu veux vraiment décider',
          'choisis une position plus nette',
          'évite de jouer un rôle qui ne te ressemble pas',
        ],
        moon: [
          'distingue ce que tu ressens de ce que tu dois faire',
          'repère ce dont tu as besoin pour te sentir stable',
          'nomme le besoin avant de réagir',
        ],
        mercury: [
          'clarifie ce qui est un fait, un ressenti et une interprétation',
          'reformule avant de répondre',
          'choisis des mots simples pour éviter le malentendu',
        ],
        venus: [
          'dis ce que tu attends sans tourner autour',
          'mets des mots nets sur ce que tu veux',
          'évite de deviner à la place des autres',
        ],
        mars: [
          'choisis une action précise plutôt qu’une réaction rapide',
          'dirige ton énergie au lieu de la disperser',
          'avance sans confondre vitesse et efficacité',
        ],
        jupiter: [
          'élargis l’option sans perdre le concret',
          'fais confiance à l’ouverture, mais garde une mesure',
          'vois plus grand sans promettre trop vite',
        ],
        saturn: [
          'pose un cadre clair avant d’avancer',
          'choisis une limite qui protège ton énergie',
          'fais la chose sérieuse sans te punir avec elle',
        ],
        uranus: [
          'essaie une méthode différente',
          'sors d’un automatisme qui te fatigue',
          'garde ta liberté sans tout renverser',
        ],
        neptune: [
          'sépare intuition, peur et projection',
          'vérifie les faits avant d’y croire trop fort',
          'accorde-toi de la douceur sans abandonner la lucidité',
        ],
        pluto: [
          'lâche un vieux réflexe qui te coûte trop',
          'regarde ce qui doit vraiment changer',
          'ne reprends pas le contrôle par habitude',
        ],
      };
      const bridgeEffect = pickTexture(bridgeEffects[p2Key], 'bridge-effect');
      const aspectBridge = p1Key === p2Key
        ? `${transitTexture} : ${bridgeEffect}`
        : `${transitTexture} ; ${bridgeEffect}`;
      const readings = (p1Key === p2Key ? samePlanetReadings[type] : clearReadings[type]) || [
        (left: string, right: string, action: string) => `Cette configuration met en relation ${left} et ${right}. Observe ce qui se présente, puis commence par ${action}.`,
      ];
      const readingKey = `${type}|${p1Key === p2Key ? 'same' : 'mixed'}`;
      if (!usedReadingIndices[readingKey]) usedReadingIndices[readingKey] = new Set();
      const preferredReadingIndex = (
        getDateOrdinal(dateKey)
        + hashToInt(`${personalizationSeed}|${p1Key}|${p2Key}|${type}|clear-reading`)
      ) % readings.length;
      const readingIndex = pickUnusedIndex(preferredReadingIndex, readings.length, usedReadingIndices[readingKey]);

      const compactReadings: Record<string, string[]> = {
        Trigone: [
          `${aspectBridge}. Appuie-toi sur cette facilité pour ${move}, sans en faire un dossier.`,
          `${transitFocus} et ${natalFocus} coopèrent. Choisis le geste qui simplifie la journée : ${move}.`,
          `Le soutien est déjà là. Avance sans surjouer : ${move}. C’est assez bien pour aujourd’hui.`,
        ],
        Sextile: [
          `${aspectBridge}. L’occasion est concrète : fais le premier pas, même petit.`,
          `Une option devient praticable. Teste-la sans tout reconfigurer : ${move}.`,
          `${transitTexture}. Avant de négocier avec tes doutes, fais juste le premier geste : ${move}.`,
        ],
        Conjonction: [
          `${aspectBridge}. L’intensité est là : choisis une priorité, puis ${move}.`,
          `Une priorité ressort plus fort que les autres. Donne-lui une direction simple : ${move}.`,
          `${transitTexture}. Transforme l’élan en geste net : ${move}. Pas besoin de faire monter le volume.`,
        ],
        Carré: [
          `${aspectBridge}. Il y a un frottement : ralentis, repère le vrai point dur, puis ${move}.`,
          `Une résistance apparaît. Ne force pas : ajuste l’approche, puis ${move}.`,
          `${transitTexture}. Réponds au sujet réel, pas au pic d’agacement : ${move}.`,
        ],
        Opposition: [
          `${aspectBridge}. Deux besoins se font face : écoute les deux avant de choisir.`,
          `${transitFocus} et ${natalFocus} demandent chacun leur espace. Cherche le compromis utile, pas le scénario parfait : ${move}.`,
          `Un ajustement est nécessaire. Avant de répondre, respire ; ton ego survivra à vingt secondes de silence.`,
        ],
      };
      const compactOptions = compactReadings[type] || [
        `${transitFocus} active ${natalFocus}. ${move}.`,
      ];

      return polishDayAtGlanceLine(`${title} ${compactOptions[readingIndex % compactOptions.length]}`);
    };

    // Ordre de vitesse des planètes en transit : Lune > Mercure > Vénus > Soleil > Mars > Jupiter > Saturne...
    const speedOrder = ['moon', 'mercury', 'venus', 'sun', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
    const sortedPool = [...pool].sort((a, b) => {
      const ia = speedOrder.indexOf(a.planet1);
      const ib = speedOrder.indexOf(b.planet1);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

    // Sélectionner jusqu'à 3 aspects en variant d'abord les planètes de transit et natales.
    const selected: any[] = [];
    const usedTransitPlanets = new Set<string>();
    const usedNatalPlanets = new Set<string>();
    const usedPlanetPairs = new Set<string>();
    const getPlanetPair = (aspect: any) => [aspect.planet1, aspect.planet2].sort().join('|');

    for (const aspect of sortedPool) {
      const pair = getPlanetPair(aspect);
      if (
        !usedTransitPlanets.has(aspect.planet1)
        && !usedNatalPlanets.has(aspect.planet2)
        && !usedPlanetPairs.has(pair)
      ) {
        usedTransitPlanets.add(aspect.planet1);
        usedNatalPlanets.add(aspect.planet2);
        usedPlanetPairs.add(pair);
        selected.push(aspect);
      }
      if (selected.length >= 3) break;
    }

    return selected.map((aspect, i) => {
      const original = buildHumorLine(aspect, dateKey + 'hline' + i);
      return improveDayAtGlanceLine(original, aspect);
    });
  };

  const dayAtGlance = generateHumorousAdvice().join('||');

  // Générer les pilliers
  const pillars = [
    {
      title: 'Cœur',
      text: `Vénus en ${venusSign} magnifie ta capacité à aimer et à créer des connexions authentiques. Tes sentiments sont profonds et sincères aujourd'hui.`,
    },
    {
      title: 'Esprit',
      text: `Mercure stimule ta communication. Tes idées sont claires et percutantes — c'est le moment idéal pour avoir des conversations importantes et partager ta vision.`,
    },
    {
      title: 'Corps',
      text: `Mars en ${marsSign} te remplit d'énergie physique. Tu te sens vital et dynamique — c'est le moment de passer à l'action.`,
    },
    {
      title: 'Âme',
      text: `Ton signe ${sunSign} rayonne aujourd'hui. Connecte-toi à ton essence profonde — c'est là que réside ta véritable puissance.`,
    },
  ];

  // Générer le conseil — pool maximisé basé sur la date
  const advices = [
    // Intuition & intériorité
    `Écoute ton intuition — elle est particulièrement aiguisée aujourd'hui.`,
    `Ton calme intérieur est ta plus grande protection aujourd'hui.`,
    `Ta sensibilité est une forme d'intelligence, pas une faiblesse.`,
    `Les réponses que tu cherches sont déjà en toi — fais le silence et laisse-les remonter.`,
    `Ce que tu perçois sans pouvoir l'expliquer mérite autant de crédit que ce que tu analyses.`,
    `Reviens à toi. Tout le bruit extérieur peut attendre.`,
    `C'est souvent entre deux pensées que l'essentiel se révèle.`,
    `Observe sans juger ce qui traverse ton esprit aujourd'hui — tu y trouveras une piste.`,
    `Ton corps sait des choses que ton mental n'a pas encore acceptées.`,
    `Ce que tu ressens au fond de toi n'a pas besoin d'être justifié pour être vrai.`,
    // Courage & action
    `Ose te montrer vulnérable — c'est là que réside ta vraie force en ce moment.`,
    `Prends cette décision que tu reportes depuis trop longtemps. Le moment idéal, c'est maintenant.`,
    `Fais quelque chose qui te fait un peu peur. C'est précisément là que tu grandis.`,
    `Ce que tu n'oses pas dire occupe plus de place que ce que tu exprimes.`,
    `Un seul pas dans la direction qui t'effraie vaut dix pas dans celle du confort.`,
    `Le courage ne précède pas toujours l'action — parfois, il vient juste après.`,
    `Commence, même imparfaitement. C'est le mouvement qui crée la clarté.`,
    `Agir de manière imparfaite vaut infiniment mieux que d'attendre d'être prêt.`,
    `Ce que tu remets à plus tard par peur deviendra demain une charge plus lourde.`,
    `La meilleure façon de gagner en confiance, c'est de tenir tes propres engagements.`,
    // Relations & connexion
    `Une rencontre inattendue pourrait bien apporter de la couleur à ta journée.`,
    `Les personnes qui te voient vraiment méritent toute ton attention.`,
    `Une conversation honnête vaut mieux que mille silences polis.`,
    `Ose demander ce dont tu as besoin. Les autres ne peuvent pas le deviner.`,
    `Un acte de gentillesse sans raison peut changer une vie — peut-être la tienne.`,
    `Ce que tu donnes sans rien attendre en retour revient toujours sous une forme inattendue.`,
    `Être pleinement présent pour quelqu'un est le plus rare des cadeaux.`,
    `Parfois, écouter sans donner de conseil est la forme d'amour la plus précieuse.`,
    `Les liens qui comptent méritent d'être nourris, pas seulement entretenus.`,
    `Dis à quelqu'un ce qu'il représente pour toi — aujourd'hui est le bon jour pour le faire.`,
    `La vraie connexion commence là où le masque tombe.`,
    `Choisis la franchise bienveillante plutôt que la douceur mensongère.`,
    // Soin de soi & repos
    `Prendre soin de toi est un acte de rébellion contre le chaos du monde extérieur.`,
    `Le repos n'est pas une pause dans ta vie — il en fait pleinement partie.`,
    `Reviens à l'essentiel. Simplifie. Respire.`,
    `Accorde-toi la même compassion que celle que tu offres aux autres.`,
    `Ce dont ton corps a besoin aujourd'hui est un message de sagesse — écoute-le.`,
    `Ralentir, ce n'est pas reculer. C'est reprendre son souffle pour aller plus loin.`,
    `La productivité ne se mesure pas à l'agitation, mais à la justesse de l'action.`,
    `Ce que tu nourris en toi finit par nourrir tout le reste — commence par là.`,
    `Tu as le droit de ne rien accomplir d'exceptionnel aujourd'hui. Être, c'est déjà suffisant.`,
    `Dormir, manger, se reposer : ce sont des actes révolutionnaires dans un monde qui pousse toujours à l'excès.`,
    // Croissance & perspective
    `Ta créativité est à son apogée — explore-la sans retenue.`,
    `Ce que tu admires chez les autres existe déjà en toi, encore à l'état de graine.`,
    `Sois patient avec ton propre rythme. Chaque floraison a son temps.`,
    `Un obstacle d'aujourd'hui cache souvent une redirection vers quelque chose de meilleur.`,
    `La gratitude transforme ce que tu as en suffisance. Commence par là.`,
    `Ce que tu plantes aujourd'hui, même en secret, finira par fleurir quand tu n'y penseras plus.`,
    `Chaque fin est le début déguisé de quelque chose que tu n'imagines pas encore.`,
    `Tes erreurs ne te définissent pas — c'est la façon dont tu en tires des leçons qui compte.`,
    `Là où tu vois un mur, il y a peut-être une porte que tu n'as pas encore cherchée.`,
    `Ce qui te résiste te sculpte. Considère les défis comme des outils, pas comme des ennemis.`,
    `Chaque version de toi que tu as laissée derrière toi a rendu possible celle d'aujourd'hui.`,
    `La croissance est invisible de l'intérieur — fais confiance au processus, même quand tu ne vois rien bouger.`,
    // Lâcher prise & liberté
    `Laisse tomber ce qui pèse. La légèreté est un choix autant qu'un cadeau.`,
    `Le silence est une forme de réponse. Accorde-toi le droit de ne pas tout expliquer.`,
    `Fais confiance au rythme de ta vie — tout arrive exactement quand c'est nécessaire.`,
    `Lâche le contrôle sur ce qui ne dépend pas de toi, et concentre ton énergie sur ce qui en dépend.`,
    `Ne cours pas après la validation des autres — ce que tu ressens au fond de toi est déjà ta réponse.`,
    `Ce qui devait rester est resté. Ce qui est parti avait sa raison de partir.`,
    `Accepter ce que tu ne peux pas changer libère une énergie immense pour ce que tu peux changer.`,
    `Parfois, la meilleure action est de ne rien faire et de laisser la situation se déposer.`,
    `Ce que tu contrôles trop finit par t'échapper. Desserre les doigts.`,
    `Le résultat t'appartient moins que l'intention et l'effort — concentre-toi là-dessus.`,
    `Lâche l'histoire que tu te racontes sur toi-même. Elle date peut-être d'hier.`,
    `Certaines douleurs disparaissent dès qu'on cesse de les alimenter par la pensée.`,
    // Présence & pleine conscience
    `Observe avant d'agir. Ce que tu vois changera ce que tu décides.`,
    `Tu n'as pas besoin de tout comprendre pour avancer. La confiance se cultive dans le mouvement.`,
    `La réponse à ta question se trouve peut-être dans ce que tu évites de regarder.`,
    `Le moment présent est le seul endroit où ta vie se déroule vraiment.`,
    `Remarque la beauté ordinaire autour de toi — elle guérit ce que les grandes choses ne peuvent pas guérir.`,
    `Une journée vécue avec attention vaut dix journées vécues en pilote automatique.`,
    `Ce que tu manges, ce que tu dis, ce que tu regardes : tout cela façonne la personne que tu deviens.`,
    `Sois pleinement là, même dans les moments qui semblent anodins.`,
    `Le jugement que tu portes sur toi-même consomme une énergie précieuse que tu pourrais investir ailleurs.`,
    `Ce que tu perds en cherchant la perfection, c'est la joie du chemin.`,
    // Créativité & expression
    `Exprime ce que tu ressens — les émotions refoulées prennent de la place sans rien résoudre.`,
    `Ce que tu as envie de créer mérite une tentative, même maladroite.`,
    `L'art que tu portes en toi n'attend que ta permission pour exister.`,
    `Joue, expérimente, tente. L'univers récompense ceux qui osent.`,
    `Ta voix unique est un cadeau que toi seul peux offrir au monde.`,
    `Ce qui te passe par la tête aujourd'hui mérite d'être noté, dessiné ou chantonné.`,
    `La créativité n'attend pas l'inspiration — elle se convoque par le geste.`,
    `Ose l'expression imparfaite. Elle touche souvent plus juste que le silence poli.`,
    // Vision & sens
    `Ce que tu cherches depuis longtemps commence à prendre forme — reste attentif aux signes.`,
    `Les bonnes questions valent toujours plus que les mauvaises certitudes.`,
    `Ce à quoi tu consacres ton attention est ce que tu construis. Choisis-le avec soin.`,
    `Demande-toi ce que tu regretteras de ne pas avoir fait, et commence par là.`,
    `Tes valeurs les plus profondes sont ta boussole — reviens à elles quand tu te sens perdu.`,
    `Ce que tu fais aujourd'hui parle de qui tu veux devenir, pas de qui tu étais.`,
    `Le sens ne se trouve pas — il se crée, acte après acte, jour après jour.`,
    `Ce qui t'anime vraiment est rarement bruyant — c'est un murmure qu'il faut apprendre à reconnaître.`,
    `Ta vision mérite d'être défendue, même quand personne d'autre ne la voit encore.`,
    `Vis cette journée de façon à ce que ton futur toi t'en remercie.`,
    // Confiance & foi
    `Le monde a besoin de ta présence authentique, pas d'une version parfaite de toi.`,
    `Ce que tu traverses en ce moment te façonne d'une manière que tu comprendras plus tard.`,
    `Les périodes de doute précèdent souvent les plus grandes percées.`,
    `Tu es exactement là où tu dois être — même si cela ne ressemble pas encore à ce que tu imaginais.`,
    `Fais confiance à ce que tu as appris. C'est ce qui t'a mené jusqu'ici.`,
    `L'univers conspire davantage en ta faveur que tu ne le crois.`,
    `Tes ressources intérieures sont bien plus vastes que ce que tes peurs te laissent croire.`,
    `Ce que tu es suffit. Ce que tu fais compte. Ta place est ici.`,
  ];
  const advice = advices[Math.floor(seededRandom(dateKey + 'advice') * advices.length)];

  // Analyser tous les aspects où au moins une planète personnelle interagit avec n'importe quelle planète
  const personalPlanets = ['sun', 'moon', 'mars', 'mercury', 'venus'];

  // Fonction pour traduire les noms de planètes en français
  const translatePlanet = (planetKey: string): string => {
    const translations: Record<string, string> = {
      'sun': 'Soleil',
      'moon': 'Lune',
      'mercury': 'Mercure',
      'venus': 'Vénus',
      'mars': 'Mars',
      'jupiter': 'Jupiter',
      'saturn': 'Saturne',
      'uranus': 'Uranus',
      'neptune': 'Neptune',
      'pluto': 'Pluton'
    };
    return translations[planetKey] || planetKey;
  };

  // Planètes rapides (en transit) vs lentes — les rapides changent chaque jour, prioritaires
  const fastTransitPlanets = ['moon', 'mercury', 'venus', 'sun', 'mars'];
  const slowTransitPlanets = ['jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

  // Aspects de transit : planètes actuelles en aspect avec planètes natales personnelles
  // On trie : d'abord les transits par planètes rapides (orbe croissant), puis lentes (orbe croissant)
  const filteredTransits = transitAspects.filter(ta => personalPlanets.includes(ta.natalPlanet));
  const fastTransits = filteredTransits.filter(ta => fastTransitPlanets.includes(ta.transitPlanet));
  const slowTransits = filteredTransits.filter(ta => slowTransitPlanets.includes(ta.transitPlanet));
  const sortedTransits = [...fastTransits, ...slowTransits];

  const allAspects = sortedTransits
    .slice(0, 6)
    .map(ta => {
      let symbol = '';
      let color = 'bg-gray-400';

      switch (ta.type) {
        case 'Trigone':
          symbol = '△';
          color = 'bg-green-400';
          break;
        case 'Sextile':
          symbol = '✱';
          color = 'bg-blue-400';
          break;
        case 'Conjonction':
          symbol = '⚡';
          color = 'bg-yellow-400';
          break;
        case 'Carré':
          symbol = '□';
          color = 'bg-red-400';
          break;
        case 'Opposition':
          symbol = '☍';
          color = 'bg-purple-400';
          break;
        default:
          symbol = '○';
          break;
      }

      const p1Fr = translatePlanet(ta.transitPlanet);
      const p2Fr = translatePlanet(ta.natalPlanet);
      return {
        planet1: p1Fr,
        planet2: p2Fr,
        type: ta.type,
        symbol,
        color,
        text: `${p1Fr} ${symbol} ${p2Fr}`,
        transitSign: ta.transitSign,
        natalSign: planets[ta.natalPlanet]?.sign,
      };
    });

  return {
    mood,
    dailyMove,
    dailyChallenge,
    dayAtGlance,
    advice,
    personalizationSeed,
    pillars,
    favorableAspects: allAspects,
  };
}
