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

// Calcule les aspects entre les planètes en transit aujourd'hui et le thème natal
export function calculateTransitAspects(natalPositions: Record<string, PlanetPosition>): TransitAspect[] {
  const today = new Date();
  // Les longitudes écliptiques sont géocentriques, la lat/lon n'influence pas le signe
  const transitPositions = calculatePlanetPositions({ date: today, latitude: 0, longitude: 0 });

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
  name: string
): CoStarAnalysis {
  const planets = chartData.planetPositions;

  // Calculer les transits du jour (positions planétaires actuelles) en aspect avec le thème natal
  const transitAspects = calculateTransitAspects(planets);
  
  // Déterminer la graine basée sur la date du jour (même pour toute la journée)
  const today = new Date();
  const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  // Déterminer les signes clés
  const sunSign = planets.sun?.sign || 'Bélier';
  const moonSign = planets.moon?.sign || 'Taureau';
  const venusSign = planets.venus?.sign || 'Gémeaux';
  const marsSign = planets.mars?.sign || 'Cancer';
  
  // Générer le mood basé sur les transits du jour — unique pour chaque jour de l'année
  const generateMood = (): string => {
    const signMoods: string[] = [
      // Bélier
      'Impulsif et vif', 'Direct et sans filtre', 'Énergique et spontané', 'Ardent et décidé', 'Courageux et frontal',
      // Taureau
      'Ancré et sensuel', 'Patient et réceptif', 'Calme et déterminé', 'Stable et indulgent', 'Solide et persistant',
      // Gémeaux
      'Léger et curieux', 'Communicatif et agile', 'Vif et insaisissable', 'Espiègle et alerte', 'Changeant et bavard',
      // Cancer
      'Émotionnel et intuitif', 'Nostalgique et bienveillant', 'Protecteur et poreux', 'Doux et mémoriel', 'Attaché et sensible',
      // Lion
      'Expressif et lumineux', 'Généreux et chaleureux', 'Créatif et rayonnant', 'Fier et magnanime', 'Flamboyant et loyal',
      // Vierge
      'Analytique et attentif', 'Discret et précis', 'Ordonné et sobre', 'Rigoureux et serviable', 'Méticuleux et modeste',
      // Balance
      'Harmonieux et doux', 'Élégant et indécis', 'Diplomate et raffiné', 'Gracieux et juste', 'Esthète et pacifique',
      // Scorpion
      'Intense et perceptif', 'Profond et magnétique', 'Silencieux et transformateur', 'Acéré et clairvoyant', 'Tenace et secret',
      // Sagittaire
      'Optimiste et libre', 'Expansif et direct', 'Philosophe et enthousiaste', 'Idéaliste et nomade', 'Audacieux et décomplexé',
      // Capricorne
      'Structuré et patient', 'Sobre et ambitieux', 'Discipliné et prévoyant', 'Méthodique et austère', 'Solide et accompli',
      // Verseau
      'Décalé et électrique', 'Original et libre', 'Visionnaire et détaché', 'Rebelle et idéaliste', 'Frondeur et brillant',
      // Poissons
      'Rêveur et poreux', 'Intuitif et sensible', 'Mystique et compassionnel', 'Mélancolique et inspiré', 'Doux et insaisissable',
    ];

    const tonalities: string[] = [
      // Fluidité / harmonie
      'tout s\'aligne sans effort',
      'les choses se mettent en place',
      'un courant favorable se dessine',
      'l\'élan vient naturellement',
      'quelque chose se dénoue',
      // Ouverture / réceptivité
      'une fenêtre s\'ouvre',
      'ce qui semblait lointain se rapproche',
      'les signaux sont là',
      'l\'intuition guide les pas',
      'quelque chose vaut la peine d\'être remarqué',
      // Intensité / concentration
      'l\'intensité est palpable',
      'tout prend relief et profondeur',
      'rien ne passe inaperçu',
      'la concentration atteint son pic',
      'l\'énergie est dense et chargée',
      // Tension / croissance
      'la pression est là, mais utile',
      'les résistances poussent à avancer',
      'un inconfort productif se fait sentir',
      'quelque chose demande à être dépassé',
      'le mouvement est forcé, et c\'est bien',
      // Équilibre / choix
      'une décision attend dans l\'ombre',
      'deux directions se font face',
      'l\'équilibre reste à trouver',
      'ce qui résiste mérite d\'être regardé',
      'un choix silencieux se pose',
    ];

    // Construire toutes les combinaisons (60 × 25 = 1500)
    const all: string[] = [];
    for (const base of signMoods) {
      for (const tone of tonalities) {
        all.push(`${base} — ${tone}`);
      }
    }

    // Mélange déterministe basé sur l'année → même ordre toute l'année
    const year = new Date().getFullYear().toString();
    const shuffled = [...all];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom(year + 'shuffle' + i) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Offset personnel basé sur les signes natals de l'utilisateur → chaque utilisateur a son propre parcours
    const userSeed = `${sunSign}|${moonSign}|${marsSign}`;
    const userHash = Math.abs([...userSeed].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 0x9e3779b1), 0x12345678));
    const personalOffset = userHash % shuffled.length;

    // Indexer par jour de l'année + offset personnel → unique chaque jour ET propre à chaque utilisateur
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
    return shuffled[(dayOfYear + personalOffset) % shuffled.length];
  };

  const mood = generateMood();

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

      return `${withArticleCap(p1Fr)} en ${p1Sign}${flavor} ${dynamic} ${withArticle(p2Fr)} en ${p2Sign}. Une résonance s'établit entre ${domainP1} et ${domainP2}. ${consequence}`;
    };

    // Fallback : aucun aspect disponible → lecture pure des signes
    if (priorityPool.length === 0) {
      const sunDesc = signDescription[sunSign] || 'une énergie singulière';
      const moonDesc = signDescription[moonSign] || 'une sensibilité particulière';
      return `Le Soleil en ${sunSign} porte en toi ${sunDesc}. Cette énergie solaire guide tes choix depuis ton centre le plus profond — écoute-la.\n\nLa Lune en ${moonSign} teinte tes émotions de ${moonDesc}. Ces murmures intérieurs ne mentent jamais sur ce dont tu as vraiment besoin.`;
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
      para2 = `${withArticleCap(compFr)} en ${compSign} teinte ${compDomain} de ${compFlavor}. Laisse cette énergie enrichir ton regard sur la journée qui s'ouvre.`;
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
    const p1s = (p1: string, s: string) => `${artDef(p1, true)}${p1}${s ? ` en ${s}` : ''}`;
    const p1m = (p1: string, s: string) => `${artDef(p1, false)}${p1}${s ? ` en ${s}` : ''}`;
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
        `Le cosmos est silencieux aujourd'hui. Profites-en pour souffler.`,
        `Aucun transit majeur à signaler — c'est l'Univers qui te dit de lever le pied.`,
        `Journée cosmiquement calme. Idéal pour procrastiner avec bonne conscience.`,
        `Les planètes font une pause. Toi aussi, vas-y.`,
      ];
    }

    const usedTemplateIndices: Record<string, Set<number>> = {};

    const buildHumorLine = (aspect: any, seed: string): string => {
      const p1 = tP(aspect.planet1 as string);
      const p2 = tP(aspect.planet2 as string);
      const type = aspect.type as string;
      const sign = aspect.transitSign || '';
      const tpls = templates[type];
      if (!tpls) return `${p1s(p1, sign)} forme un aspect avec ${nr(p2).a} ${p2} ${nr(p2).adj}. Une énergie particulière circule aujourd'hui entre ces deux forces.`;
      if (!usedTemplateIndices[type]) usedTemplateIndices[type] = new Set();
      let idx = Math.floor(seededRandom(seed + type + p1 + p2 + 'tpl') * tpls.length);
      let attempts = 0;
      while (usedTemplateIndices[type].has(idx) && attempts < tpls.length) {
        idx = (idx + 1) % tpls.length;
        attempts++;
      }
      usedTemplateIndices[type].add(idx);
      return tpls[idx](p1, sign, p2);
    };

    // Ordre de vitesse des planètes en transit : Lune > Mercure > Vénus > Soleil > Mars > Jupiter > Saturne...
    const speedOrder = ['moon', 'mercury', 'venus', 'sun', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
    const sortedPool = [...pool].sort((a, b) => {
      const ia = speedOrder.indexOf(a.planet1);
      const ib = speedOrder.indexOf(b.planet1);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

    // Sélectionner jusqu'à 4 aspects distincts, en prioritisant les planètes les plus rapides
    const selected: any[] = [];
    const usedPlanets = new Set<string>();
    for (const aspect of sortedPool) {
      if (!usedPlanets.has(aspect.planet1)) {
        usedPlanets.add(aspect.planet1);
        selected.push(aspect);
      }
      if (selected.length >= 4) break;
    }

    return selected.map((aspect, i) => buildHumorLine(aspect, dateKey + 'hline' + i));
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
    `Exprime ce que tu ressens — les émotions tues prennent de la place sans rien résoudre.`,
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
    dayAtGlance,
    advice,
    pillars,
    favorableAspects: allAspects,
  };
}
