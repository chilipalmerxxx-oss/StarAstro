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

export interface CoStarAnalysis {
  mood: string;
  dayAtGlance: string;
  advice: string;
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

export function generateCoStarAnalysis(
  chartData: any,
  name: string
): CoStarAnalysis {
  const planets = chartData.planetPositions;
  
  // Déterminer la graine basée sur la date du jour (même pour toute la journée)
  const today = new Date();
  const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  // Déterminer les signes clés
  const sunSign = planets.sun?.sign || 'Bélier';
  const moonSign = planets.moon?.sign || 'Taureau';
  const venusSign = planets.venus?.sign || 'Gémeaux';
  const marsSign = planets.mars?.sign || 'Cancer';
  
  // Générer le mood basé sur les positions planétaires réelles
  const generateMood = (sunSign: string, moonSign: string, marsSign: string, venusSign: string): string => {
    const moods: Record<string, string[]> = {
      'Bélier': ['Dynamique et audacieux', 'Impulsif et passionné', 'Leader naturel', 'Énergique et direct'],
      'Taureau': ['Stable et déterminé', 'Sensuel et patient', 'Fiable et constant', 'Terre à terre'],
      'Gémeaux': ['Curieux et adaptable', 'Communicatif et sociable', 'Intellectuel et versatile', 'Léger et joueur'],
      'Cancer': ['Émotionnellement riche', 'Protecteur et intuitif', 'Nurturant et sensible', 'Familial et attachant'],
      'Lion': ['Charismatique et créatif', 'Confiance en soi', 'Généreux et loyal', 'Rayonnant et théâtral'],
      'Vierge': ['Pratique et analytique', 'Méticuleux et serviable', 'Intelligent et modeste', 'Travailleur et organisé'],
      'Balance': ['Harmonieux et diplomate', 'Élégant et sociable', 'Équilibré et juste', 'Romantique et raffiné'],
      'Scorpion': ['Intense et passionné', 'Mystérieux et profond', 'Puissant et transformateur', 'Déterminé et loyal'],
      'Sagittaire': ['Aventurier et optimiste', 'Philosophe et libre', 'Enthousiaste et honnête', 'Explorateur et joyeux'],
      'Capricorne': ['Ambition et discipline', 'Responsable et fiable', 'Patient et déterminé', 'Pratique et traditionnel'],
      'Verseau': ['Innovateur et humaniste', 'Indépendant et original', 'Intellectuel et progressiste', 'Utopique et amical'],
      'Poissons': ['Créatif et empathique', 'Intuitif et rêveur', 'Compassionnel et artistique', 'Spirituel et mystique']
    };

    // Combiner les énergies du Soleil (personnalité), Lune (émotions), Mars (action), Vénus (amour)
    const sunMoods = moods[sunSign] || ['Équilibré'];
    const moonMoods = moods[moonSign] || ['Serein'];
    const marsMoods = moods[marsSign] || ['Motivé'];
    const venusMoods = moods[venusSign] || ['Aimant'];

    // Sélectionner un mood principal basé sur le Soleil, avec influence des autres planètes
    const primaryMood = sunMoods[Math.floor(seededRandom(dateKey + 'mood1') * sunMoods.length)];
    const secondaryMood = seededRandom(dateKey + 'mood2') > 0.5 ? 
      moonMoods[Math.floor(seededRandom(dateKey + 'mood3') * moonMoods.length)] : 
      marsMoods[Math.floor(seededRandom(dateKey + 'mood4') * marsMoods.length)];

    // Parfois combiner deux énergies pour plus de profondeur
    if (seededRandom(dateKey + 'mood5') > 0.7) {
      return `${primaryMood} et ${secondaryMood.toLowerCase()}`;
    }

    return primaryMood;
  };

  const mood = generateMood(sunSign, moonSign, marsSign, venusSign);

  // Générer l'analyse du jour
  const dayAtGlance = `Vénus en ${venusSign} favorise tes connexions émotionnelles et tes relations. C'est un moment propice pour exprimer tes sentiments authentiques et créer des liens profonds. 

Mars en ${marsSign} te donne une énergie dynamique. Canalise cette force dans des projets créatifs ou des initiatives qui te tiennent à cœur. L'action combinée à la réflexion sera ton meilleur atout.`;

  // Générer les pilliers
  const pillars = [
    {
      title: 'Cœur',
      text: `Ta Vénus en ${venusSign} magnifie ta capacité à aimer et à créer des connexions authentiques. Tes sentiments sont profonds et sincères aujourd'hui.`,
    },
    {
      title: 'Esprit',
      text: `Mercure active ta communication. Tes idées sont claires et percutantes. C'est le moment idéal pour avoir des conversations importantes et partager ta vision.`,
    },
    {
      title: 'Corps',
      text: `Mars en ${marsSign} te remplit d'énergie physique. Tu te sentiras vital et dynamique. C'est le moment de passer à l'action.`,
    },
    {
      title: 'Âme',
      text: `Ton ${sunSign} rayonne aujourd'hui. Connecte-toi avec ton essence profonde. C'est ta véritable puissance.`,
    },
  ];

  // Générer le conseil
  const advices = [
    `Écoute ton intuition - elle est particulièrement aiguisée aujourd'hui.`,
    `Ose te montrer vulnérable, c'est ta force en ce moment.`,
    `Une rencontre inattendue apportera de la couleur à ta journée.`,
    `Prendre soin de toi est un acte de rébellion contre le chaos externe.`,
    `Ta créativité est à son apogée, explore-la.`,
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

  const allAspects = (chartData.aspects || [])
    .filter((aspect: any) => {
      // Garder les aspects où au moins une planète est personnelle
      return personalPlanets.includes(aspect.planet1) || personalPlanets.includes(aspect.planet2);
    })
    .slice(0, 6) // Limiter à 6 aspects maximum pour éviter surcharge
    .map((aspect: any) => {
      let symbol = '';
      let color = 'bg-gray-400';

      switch (aspect.type) {
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

      return {
        planet1: translatePlanet(aspect.planet1),
        planet2: translatePlanet(aspect.planet2),
        type: aspect.type,
        symbol,
        color,
        text: `${translatePlanet(aspect.planet1)} ${symbol} ${translatePlanet(aspect.planet2)}`,
      };
    });

  return {
    mood,
    dayAtGlance,
    advice,
    pillars,
    favorableAspects: allAspects,
  };
}
