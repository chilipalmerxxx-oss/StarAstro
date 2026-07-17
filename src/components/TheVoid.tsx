import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  Send, RotateCcw, Heart, Pin, Share2, X,
  ArrowLeft, Clock, MapPin, Calendar, Menu,
} from 'lucide-react';

// ─── Icônes ésotériques SVG ─────────────────────────────────
const EsotericEye = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4a0ff" strokeWidth="1">
    {/* Arbre de vie mystique */}
    <line x1="12" y1="22" x2="12" y2="6" strokeWidth="1" />
    {/* Branches */}
    <path d="M12 8c-3-1-5.5 0-7 2" strokeWidth="0.8" fill="none" />
    <path d="M12 8c3-1 5.5 0 7 2" strokeWidth="0.8" fill="none" />
    <path d="M12 12c-2.5-0.5-4.5 0.5-5.5 2" strokeWidth="0.8" fill="none" />
    <path d="M12 12c2.5-0.5 4.5 0.5 5.5 2" strokeWidth="0.8" fill="none" />
    <path d="M12 16c-2 0-3 1-3.5 2" strokeWidth="0.8" fill="none" />
    <path d="M12 16c2 0 3 1 3.5 2" strokeWidth="0.8" fill="none" />
    {/* Couronne / cercle sommital */}
    <circle cx="12" cy="4.5" r="2.5" strokeWidth="0.8" strokeDasharray="1.5 1" />
    <circle cx="12" cy="4.5" r="0.7" fill="#c4a0ff" stroke="none" />
    {/* Racines */}
    <path d="M12 22c-1 0-2.5 0.5-3.5 1" strokeWidth="0.6" opacity="0.5" />
    <path d="M12 22c1 0 2.5 0.5 3.5 1" strokeWidth="0.6" opacity="0.5" />
  </svg>
);

const EsotericMoon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff8fa3" strokeWidth="1">
    {/* Cœur sacré */}
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    {/* Œil au centre du cœur */}
    <ellipse cx="12" cy="10.5" rx="3" ry="1.8" strokeWidth="0.8" />
    <circle cx="12" cy="10.5" r="0.7" fill="#ff8fa3" stroke="none" />
    {/* Étoiles décoratives */}
    <path d="M5 2.5l.2.6.6.2-.6.2-.2.6-.2-.6-.6-.2.6-.2z" fill="#ff8fa3" stroke="none" opacity="0.4" />
    <path d="M19.5 2l.15.5.5.15-.5.15-.15.5-.15-.5-.5-.15.5-.15z" fill="#ff8fa3" stroke="none" opacity="0.35" />
  </svg>
);

const EsotericTriangle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffd07a" strokeWidth="1">
    {/* Hexagramme / Étoile de Salomon */}
    <polygon points="12,2 15.5,8.5 22,8.5 17,13 19,20 12,16 5,20 7,13 2,8.5 8.5,8.5" />
    <circle cx="12" cy="11.5" r="3" strokeWidth="0.8" />
    <circle cx="12" cy="11.5" r="0.8" fill="#ffd07a" stroke="none" />
    {/* Rayons */}
    <line x1="12" y1="2" x2="12" y2="0.5" strokeWidth="0.6" opacity="0.4" />
    <line x1="22" y1="8.5" x2="23.5" y2="8.5" strokeWidth="0.6" opacity="0.4" />
    <line x1="2" y1="8.5" x2="0.5" y2="8.5" strokeWidth="0.6" opacity="0.4" />
    <line x1="19" y1="20" x2="20" y2="21.5" strokeWidth="0.6" opacity="0.4" />
    <line x1="5" y1="20" x2="4" y2="21.5" strokeWidth="0.6" opacity="0.4" />
  </svg>
);

const EsotericConstellation = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ecfcf" strokeWidth="0.8">
    <circle cx="6" cy="5" r="1.5" fill="#7ecfcf" stroke="none" opacity="0.9" />
    <circle cx="18" cy="4" r="1" fill="#7ecfcf" stroke="none" opacity="0.7" />
    <circle cx="14" cy="10" r="1.3" fill="#7ecfcf" stroke="none" opacity="0.85" />
    <circle cx="4" cy="14" r="1" fill="#7ecfcf" stroke="none" opacity="0.7" />
    <circle cx="10" cy="17" r="1.5" fill="#7ecfcf" stroke="none" opacity="0.9" />
    <circle cx="20" cy="16" r="1.2" fill="#7ecfcf" stroke="none" opacity="0.8" />
    <circle cx="16" cy="21" r="0.8" fill="#7ecfcf" stroke="none" opacity="0.6" />
    <line x1="6" y1="5" x2="14" y2="10" strokeDasharray="2 2" />
    <line x1="18" y1="4" x2="14" y2="10" strokeDasharray="2 2" />
    <line x1="14" y1="10" x2="10" y2="17" strokeDasharray="2 2" />
    <line x1="4" y1="14" x2="10" y2="17" strokeDasharray="2 2" />
    <line x1="10" y1="17" x2="20" y2="16" strokeDasharray="2 2" />
    <line x1="20" y1="16" x2="16" y2="21" strokeDasharray="2 2" />
  </svg>
);

type EsotericIcon = () => JSX.Element;
import { calculateBirthChart } from '../services/astrology';
import { parseBirthDateTime } from '../lib/birthDate';

// ─── Cities ─────────────────────────────────────────────────
const CITIES = [
  { name: 'Paris', lat: 48.8566, lon: 2.3522, tz: 1 },
  { name: 'Lyon', lat: 45.7640, lon: 4.8357, tz: 1 },
  { name: 'Marseille', lat: 43.2965, lon: 5.3698, tz: 1 },
  { name: 'Toulouse', lat: 43.6047, lon: 1.4442, tz: 1 },
  { name: 'Bordeaux', lat: 44.8378, lon: -0.5792, tz: 1 },
  { name: 'Lille', lat: 50.6292, lon: 3.0573, tz: 1 },
  { name: 'Nice', lat: 43.7102, lon: 7.2620, tz: 1 },
  { name: 'Nantes', lat: 47.2184, lon: -1.5536, tz: 1 },
  { name: 'Strasbourg', lat: 48.5734, lon: 7.7521, tz: 1 },
  { name: 'Montpellier', lat: 43.6108, lon: 3.8767, tz: 1 },
  { name: 'Bruxelles', lat: 50.8503, lon: 4.3517, tz: 1 },
  { name: 'Genève', lat: 46.2044, lon: 6.1432, tz: 1 },
  { name: 'Londres', lat: 51.5074, lon: -0.1278, tz: 0 },
  { name: 'New York', lat: 40.7128, lon: -74.0060, tz: -5 },
  { name: 'Los Angeles', lat: 34.0522, lon: -118.2437, tz: -8 },
];

// ─── Types ──────────────────────────────────────────────────
interface AspectSource { planet1: string; planet2: string; type: string; }
interface VoidResponse { text: string; planet: string; sign: string; aspect?: AspectSource; }
interface HistoryEntry { question: string; response: VoidResponse; pinned: boolean; liked: boolean | null; timestamp: number; }
interface VoidBirthData { date: string; time: string; city: string; latitude: number; longitude: number; }

type Screen = 'birth-form' | 'void' | 'result';

// ─── Questions bloquées ─────────────────────────────────────
const BLOCKED_PATTERNS = [
  /\b(mourir|suicide|mort|tuer|meurtre)\b/i,
  /\b(loterie|numéro gagnant|loto)\b/i,
  /\b(date exacte|jour précis|heure exacte)\b/i,
];
const BLOCKED_ALTERNATIVES = [
  'Comment puis-je trouver la paix intérieure ?',
  'Que me réservent les étoiles cette semaine ?',
  'Quel est mon plus grand potentiel ?',
];



// ─── Catégories void ────────────────────────────────────────
type VoidCategory = 'soi' | 'amour' | 'travail' | 'social';

const VOID_CATEGORIES: { id: VoidCategory; label: string; symbol: string; icon: EsotericIcon; color: string }[] = [
  { id: 'soi', label: 'MOI', symbol: '✦', icon: EsotericEye, color: '#c4a0ff' },
  { id: 'amour', label: 'AMOUR', symbol: '♡', icon: EsotericMoon, color: '#ff8fa3' },
  { id: 'travail', label: 'TRAVAIL', symbol: '⬥', icon: EsotericTriangle, color: '#ffd07a' },
  { id: 'social', label: 'SOCIAL', symbol: '⊹', icon: EsotericConstellation, color: '#7ecfcf' },
];

function shuffleQuestions<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function filterAndLimitQuestions(pool: string[], askedQuestions: string[]): string[] {
  const askedSet = new Set(askedQuestions.map(q => q.toUpperCase()));
  const available = pool.filter(q => !askedSet.has(q.toUpperCase()));
  return shuffleQuestions(available).slice(0, 5);
}

const VOID_QUESTIONS_POOL: Record<VoidCategory, string[]> = {
  soi: [
    'EST-CE QUE JE RÊVE TROP',
    'QU\'EST-CE QUI ME FERA AVANCER',
    'COMMENT ÊTRE PLUS PATIENT(E)',
    'SUIS-JE EN TRAIN DE PERDRE MON TEMPS',
    'QUELLE EST MA MISSION DE VIE',
    'QUELLE EST MA PLUS GRANDE FORCE CACHÉE',
    'QU\'EST-CE QUE JE REFUSE DE VOIR EN MOI',
    'COMMENT DÉPASSER MES PEURS',
    'POURQUOI JE DOUTE AUTANT DE MOI',
    'QUEL EST MON PLUS GRAND BLOCAGE',
    'QUELLE LEÇON DOIS-JE ENCORE APPRENDRE',
    'COMMENT ME RECONNECTER À MOI-MÊME',
    'QUE RÉVÈLE MON OMBRE INTÉRIEURE',
    'COMMENT TROUVER MA PAIX INTÉRIEURE',
    'QUE DOIS-JE ACCEPTER EN MOI',
    'SUIS-JE SUR LE BON CHEMIN',
    'QU\'EST-CE QUI ME RETIENT VRAIMENT',
    'COMMENT RETROUVER CONFIANCE EN MOI',
    'QUEL DON JE N\'EXPLOITE PAS ASSEZ',
    'COMMENT TRANSFORMER MA SOUFFRANCE EN FORCE',
  ],
  amour: [
    'EST-CE QUE CETTE PERSONNE M\'AIME',
    'SUIS-JE PRÊT(E) À AIMER DE NOUVEAU',
    'QUE ME CACHE MON CŒUR',
    'DOIS-JE PARDONNER',
    'COMMENT SAVOIR SI C\'EST LA BONNE PERSONNE',
    'POURQUOI J\'ATTIRE TOUJOURS LE MÊME TYPE',
    'EST-CE LE BON MOMENT POUR AIMER',
    'QUE DOIS-JE LÂCHER EN AMOUR',
    'COMMENT ATTIRER LA BONNE PERSONNE',
    'COMMENT AMÉLIORER MA RELATION ACTUELLE',
    'SUIS-JE AIMÉ(E) SINCÈREMENT',
    'POURQUOI J\'AI PEUR DE M\'ENGAGER',
    'QU\'EST-CE QUE L\'AMOUR ATTEND DE MOI',
    'COMMENT OUVRIR MON CŒUR SANS ME PERDRE',
    'QUELLE BLESSURE M\'EMPÊCHE D\'AIMER',
    'DOIS-JE RESTER OU PARTIR',
    'COMMENT FAIRE REVIVRE LA FLAMME',
    'POURQUOI JE SABOTE MES RELATIONS',
    'QUE M\'APPREND MA SOLITUDE AMOUREUSE',
    'QUEL SCHÉMA AMOUREUX DOIS-JE BRISER',
  ],
  travail: [
    'QUEL EST MON DON PROFESSIONNEL',
    'DOIS-JE PRENDRE CE RISQUE',
    'SUIS-JE SUR LA BONNE VOIE',
    'COMMENT DÉBLOQUER MA CARRIÈRE',
    'DOIS-JE ME LANCER SEUL(E)',
    'QUEL TALENT DEVRAIS-JE EXPLOITER',
    'COMMENT ATTIRER L\'ABONDANCE',
    'QUE DOIS-JE LAISSER DERRIÈRE MOI AU TRAVAIL',
    'QUEL TYPE DE MÉTIER ME CORRESPOND VRAIMENT',
    'POURQUOI JE ME SENS BLOQUÉ(E)',
    'COMMENT OSER DEMANDER PLUS',
    'EST-CE QUE JE MÉRITE MIEUX',
    'QUEL EST MON VRAI POTENTIEL PROFESSIONNEL',
    'COMMENT TROUVER DU SENS DANS MON TRAVAIL',
    'DOIS-JE CHANGER DE DIRECTION',
    'QUELLE PEUR M\'EMPÊCHE DE RÉUSSIR',
    'COMMENT TRANSFORMER MA PASSION EN MÉTIER',
    'SUIS-JE FAIT(E) POUR DIRIGER',
    'QUE M\'APPREND CET ÉCHEC',
    'COMMENT CONCILIER ARGENT ET ÉPANOUISSEMENT',
  ],
  social: [
    'EST-CE QUE MON ENTOURAGE ME COMPREND',
    'QUI SONT MES VRAIS ALLIÉS',
    'POURQUOI JE ME SENS SEUL(E)',
    'COMMENT ATTIRER LES BONNES PERSONNES',
    'DOIS-JE COUPER CERTAINS LIENS',
    'QUEL RÔLE JE JOUE POUR LES AUTRES',
    'POURQUOI JE DONNE TOUJOURS TROP',
    'COMMENT POSER MES LIMITES',
    'EST-CE QUE JE PLAIS AUX AUTRES',
    'QUI ME TIRE VERS LE BAS',
    'COMMENT ÊTRE MOI-MÊME EN SOCIÉTÉ',
    'POURQUOI JE ME SENS INCOMPRIS(E)',
    'COMMENT CRÉER DES LIENS AUTHENTIQUES',
    'QUEL IMPACT J\'AI SUR LES AUTRES',
    'COMMENT GÉRER LES CONFLITS AVEC MON ENTOURAGE',
    'DOIS-JE FAIRE CONFIANCE À CETTE PERSONNE',
    'POURQUOI CERTAINES AMITIÉS S\'ÉLOIGNENT',
    'COMMENT ATTIRER DES RELATIONS PROFONDES',
    'QUEL MASQUE JE PORTE EN PUBLIC',
    'EST-CE QUE JE SAIS RECEVOIR AUTANT QUE DONNER',
  ],
};

const ALL_SUGGESTIONS: Record<string, string[]> = {
  amour: [
    "Est-ce le bon moment pour aimer ?", "Que dois-je lâcher en amour ?", "Comment attirer la bonne personne ?",
    "Suis-je prêt(e) à aimer de nouveau ?", "Pourquoi est-ce que j'attire toujours le même type ?",
    "Comment savoir si c'est la bonne personne ?", "Que me cache mon cœur ?",
    "Dois-je pardonner à mon ex ?", "Comment améliorer ma relation actuelle ?", "Suis-je aimé(e) sincèrement ?",
  ],
  travail: [
    "Quel est mon don professionnel ?", "Dois-je prendre ce risque ?",
    "Suis-je dans la bonne voie professionnelle ?", "Comment débloquer ma carrière ?",
    "Dois-je me lancer à mon compte ?", "Quel talent devrais-je exploiter ?",
    "Comment attirer l'abondance ?", "Que dois-je laisser derrière moi au travail ?",
    "Quel type de métier me correspond vraiment ?", "Pourquoi je me sens bloqué(e) ?",
  ],
  soi: [
    "Quelle est ma mission de vie ?", "Comment dépasser mes peurs ?", "Que dois-je accepter en moi ?",
    "Pourquoi je doute autant de moi ?", "Quelle leçon dois-je encore apprendre ?",
    "Comment me reconnecter à moi-même ?", "Quel est mon plus grand blocage ?",
    "Que révèle mon ombre intérieure ?", "Comment trouver ma paix intérieure ?",
    "Quelle est ma plus grande force cachée ?", "Suis-je sur le bon chemin ?",
  ],
  social: [
    "Est-ce que mon entourage me comprend ?", "Comment attirer les bonnes personnes ?",
    "Dois-je couper certains liens ?", "Quel rôle je joue pour les autres ?",
    "Comment me sentir moins seul(e) ?", "Qui sont mes vrais alliés ?",
  ],
  general: [
    "Que disent les étoiles aujourd'hui ?", "Quel message l'univers m'envoie ?", "Sur quoi dois-je me concentrer ?",
    "Qu'est-ce qui m'empêche d'avancer ?", "Quel conseil les astres ont pour moi ?",
    "Que dois-je comprendre en ce moment ?", "Quelle énergie domine ma vie ?",
    "Comment trouver mon équilibre ?", "De quoi ai-je vraiment besoin ?",
    "Quelle vérité dois-je affronter ?", "Quel est le thème principal de ma vie ?",
  ],
};

function getRandomSuggestions(category: string, count: number = 3): string[] {
  const pool = [...(ALL_SUGGESTIONS[category] || []), ...(ALL_SUGGESTIONS.general || [])];
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ─── Catégorisation ─────────────────────────────────────────
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  amour: ['amour','aimer','couple','relation','cœur','coeur','crush','ex','mariage','âme sœur','célibataire','sentiments','amoureuse','amoureux','copain','copine','love','romantique','passion','désir','intimité','rupture','séparation','aime'],
  travail: ['travail','carrière','job','emploi','argent','business','entreprise','projet','succès','réussite','ambition','profession','métier','études','promotion','salaire','finances','objectif','mission','quitter'],
  soi: ['moi','qui suis-je','identité','personnalité','confiance','estime','suis-je','force','faiblesse','qualité','talent','potentiel','grandir','évoluer','comprendre','pourquoi je','prêt'],
  avenir: ['avenir','futur','demain','prochain','attendre','prédiction','destin','destinée','chemin','direction','quand','bientôt','changement','nouveau'],
  social: ['ami','amis','amitié','entourage','groupe','solitude','seul','seule','gens','monde','autres','famille','frère','sœur','parent','conflit','lien','liens','réseau','communauté','appartenir','comprend','allié','alliés','toxique','sociable','populaire','rejet','exclusion','isolé'],
};

function detectCategory(q: string): string {
  const n = q.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  let best = 'general', bestS = 0;
  for (const [cat, kws] of Object.entries(CATEGORY_KEYWORDS)) {
    let s = 0;
    for (const kw of kws) { if (n.includes(kw.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) s++; }
    if (s > bestS) { bestS = s; best = cat; }
  }
  return best;
}
function isBlocked(q: string): boolean { return BLOCKED_PATTERNS.some(p => p.test(q)); }

// ─── Symboles ───────────────────────────────────────────────
const AS: Record<string, string> = { 'Conjonction':'☌', 'Trigone':'△', 'Carré':'□', 'Opposition':'☍', 'Sextile':'⚹' };
const PS: Record<string, string> = { sun:'☉', moon:'☽', mercury:'☿', venus:'♀', mars:'♂', jupiter:'♃', saturn:'♄', uranus:'♅', neptune:'♆', pluto:'♇' };
const PN: Record<string, string> = { sun:'Soleil', moon:'Lune', mercury:'Mercure', venus:'Vénus', mars:'Mars', jupiter:'Jupiter', saturn:'Saturne', uranus:'Uranus', neptune:'Neptune', pluto:'Pluton' };

// ─── Éléments & Qualités ────────────────────────────────────
const SIGN_ELEMENT: Record<string, string> = {
  'Bélier':'Feu','Taureau':'Terre','Gémeaux':'Air','Cancer':'Eau',
  'Lion':'Feu','Vierge':'Terre','Balance':'Air','Scorpion':'Eau',
  'Sagittaire':'Feu','Capricorne':'Terre','Verseau':'Air','Poissons':'Eau',
};
const SIGN_MODALITY: Record<string, string> = {
  'Bélier':'Cardinal','Taureau':'Fixe','Gémeaux':'Mutable','Cancer':'Cardinal',
  'Lion':'Fixe','Vierge':'Mutable','Balance':'Cardinal','Scorpion':'Fixe',
  'Sagittaire':'Mutable','Capricorne':'Cardinal','Verseau':'Fixe','Poissons':'Mutable',
};
const ELEMENT_WORDS: Record<string, string[]> = {
  Feu: ['flamme','feu','braise','brûler','incandescence','éclat','étincelle'],
  Terre: ['terre','racine','sol','fondation','montagne','roche','ancrage'],
  Air: ['vent','souffle','envol','courant','nuée','brise','mouvement'],
  Eau: ['eau','océan','marée','courant','rivière','source','profondeurs'],
};
const MODALITY_WORDS: Record<string, string> = {
  Cardinal: 'initier et diriger',
  Fixe: 'approfondir et persévérer',
  Mutable: 's\'adapter et transformer',
};
const ASPECT_VERBS: Record<string, string[]> = {
  'Conjonction': ['fusionne avec','unit sa force à','se mêle à','amplifie'],
  'Trigone': ['soutient harmonieusement','coule naturellement vers','nourrit','éclaire'],
  'Carré': ['défie','entre en tension avec','pousse contre','provoque'],
  'Opposition': ['fait face à','se confronte à','reflète en miroir','équilibre'],
  'Sextile': ['ouvre une porte vers','offre une opportunité via','stimule','dialogue avec'],
};

// ─── Générateur de réponses personnalisées ──────────────────
interface ChartInfo {
  planetPositions: Record<string, { sign: string; signDegree?: number; [key: string]: any }>;
  aspects: Array<{ planet1: string; planet2: string; type: string; angle: number }>;
}

// Templates par catégorie — chaque fonction reçoit le thème complet
type TemplGen = (ch: ChartInfo) => VoidResponse[];

function pick(arr: string[]): string { return arr[Math.floor(Math.random() * arr.length)]; }

function elWord(sign: string): string {
  const el = SIGN_ELEMENT[sign] || 'Eau';
  return pick(ELEMENT_WORDS[el] || ELEMENT_WORDS.Eau);
}

function verbFor(type: string): string {
  return pick(ASPECT_VERBS[type] || ASPECT_VERBS.Conjonction);
}

function findAspects(ch: ChartInfo, planet: string): ChartInfo['aspects'] {
  return ch.aspects.filter(a => a.planet1 === planet || a.planet2 === planet);
}

function pickAspect(ch: ChartInfo, planet: string): AspectSource | undefined {
  const asps = findAspects(ch, planet);
  if (!asps.length) return undefined;
  const a = asps[Math.floor(Math.random() * asps.length)];
  return { planet1: a.planet1, planet2: a.planet2, type: a.type };
}

function pickAspectBetween(ch: ChartInfo, p1: string, p2: string): AspectSource | undefined {
  const a = ch.aspects.find(a => (a.planet1 === p1 && a.planet2 === p2) || (a.planet1 === p2 && a.planet2 === p1));
  return a ? { planet1: a.planet1, planet2: a.planet2, type: a.type } : undefined;
}

// ─── Rich astral context ────────────────────────────────────
interface RichCtx {
  dominantElement: string;
  dominantModality: string;
  elementCounts: Record<string, number>;
  modalityCounts: Record<string, number>;
  stellium: { sign: string; planets: string[] } | null;
  venusMars: AspectSource | undefined;
  sunSaturn: AspectSource | undefined;
  moonPluto: AspectSource | undefined;
  mercuryJupiter: AspectSource | undefined;
  jupiterSaturn: AspectSource | undefined;
  marsPluto: AspectSource | undefined;
  venusNeptune: AspectSource | undefined;
  sunMercury: AspectSource | undefined;
  sunVenus: AspectSource | undefined;
  moonVenus: AspectSource | undefined;
  mercuryVenus: AspectSource | undefined;
  venusJupiter: AspectSource | undefined;
  venusSaturn: AspectSource | undefined;
  marsSaturn: AspectSource | undefined;
  moonSaturn: AspectSource | undefined;
  moonNeptune: AspectSource | undefined;
  marsUranus: AspectSource | undefined;
  sunJupiter: AspectSource | undefined;
  sunUranus: AspectSource | undefined;
  mercurySaturn: AspectSource | undefined;
  totalAspects: number;
  tenseAspects: number;
  harmoniousAspects: number;
}

function buildRichCtx(ch: ChartInfo): RichCtx {
  const planets = ['sun','moon','mercury','venus','mars','jupiter','saturn','uranus','neptune','pluto'];
  const elCounts: Record<string, number> = { Feu: 0, Terre: 0, Air: 0, Eau: 0 };
  const modCounts: Record<string, number> = { Cardinal: 0, Fixe: 0, Mutable: 0 };
  const signCount: Record<string, string[]> = {};

  for (const p of planets) {
    const pp = ch.planetPositions[p];
    if (!pp) continue;
    const sign = pp.sign;
    const el = SIGN_ELEMENT[sign];
    const mod = SIGN_MODALITY[sign];
    if (el) elCounts[el]++;
    if (mod) modCounts[mod]++;
    if (!signCount[sign]) signCount[sign] = [];
    signCount[sign].push(p);
  }

  const domEl = Object.entries(elCounts).sort((a, b) => b[1] - a[1])[0][0];
  const domMod = Object.entries(modCounts).sort((a, b) => b[1] - a[1])[0][0];

  let stellium: { sign: string; planets: string[] } | null = null;
  for (const [sign, ps] of Object.entries(signCount)) {
    if (ps.length >= 3) { stellium = { sign, planets: ps }; break; }
  }

  let tense = 0, harmonious = 0;
  for (const a of ch.aspects) {
    if (a.type === 'Carré' || a.type === 'Opposition') tense++;
    if (a.type === 'Trigone' || a.type === 'Sextile') harmonious++;
  }

  return {
    dominantElement: domEl,
    dominantModality: domMod,
    elementCounts: elCounts,
    modalityCounts: modCounts,
    stellium,
    venusMars: pickAspectBetween(ch, 'venus', 'mars'),
    sunSaturn: pickAspectBetween(ch, 'sun', 'saturn'),
    moonPluto: pickAspectBetween(ch, 'moon', 'pluto'),
    mercuryJupiter: pickAspectBetween(ch, 'mercury', 'jupiter'),
    jupiterSaturn: pickAspectBetween(ch, 'jupiter', 'saturn'),
    marsPluto: pickAspectBetween(ch, 'mars', 'pluto'),
    venusNeptune: pickAspectBetween(ch, 'venus', 'neptune'),
    sunMercury: pickAspectBetween(ch, 'sun', 'mercury'),
    sunVenus: pickAspectBetween(ch, 'sun', 'venus'),
    moonVenus: pickAspectBetween(ch, 'moon', 'venus'),
    mercuryVenus: pickAspectBetween(ch, 'mercury', 'venus'),
    venusJupiter: pickAspectBetween(ch, 'venus', 'jupiter'),
    venusSaturn: pickAspectBetween(ch, 'venus', 'saturn'),
    marsSaturn: pickAspectBetween(ch, 'mars', 'saturn'),
    moonSaturn: pickAspectBetween(ch, 'moon', 'saturn'),
    moonNeptune: pickAspectBetween(ch, 'moon', 'neptune'),
    marsUranus: pickAspectBetween(ch, 'mars', 'uranus'),
    sunJupiter: pickAspectBetween(ch, 'sun', 'jupiter'),
    sunUranus: pickAspectBetween(ch, 'sun', 'uranus'),
    mercurySaturn: pickAspectBetween(ch, 'mercury', 'saturn'),
    totalAspects: ch.aspects.length,
    tenseAspects: tense,
    harmoniousAspects: harmonious,
  };
}

const AMOR_TEMPLATES: TemplGen = (ch) => {
  const v = ch.planetPositions.venus;
  const m = ch.planetPositions.moon;
  const s = ch.planetPositions.sun;
  const mars = ch.planetPositions.mars;
  const nep = ch.planetPositions.neptune;
  const pluto = ch.planetPositions.pluto;
  const jup = ch.planetPositions.jupiter;
  const sat = ch.planetPositions.saturn;
  const vSign = v?.sign || 'Bélier';
  const mSign = m?.sign || 'Cancer';
  const sSign = s?.sign || 'Bélier';
  const marsSign = mars?.sign || 'Bélier';
  const nepSign = nep?.sign || 'Capricorne';
  const plSign = pluto?.sign || 'Scorpion';
  const jupSign = jup?.sign || 'Sagittaire';
  const satSign = sat?.sign || 'Capricorne';
  const vAsp = pickAspect(ch, 'venus');
  const mAsp = pickAspect(ch, 'moon');
  const smAsp = pickAspectBetween(ch, 'sun', 'moon');
  const vmAsp = pickAspectBetween(ch, 'venus', 'moon');
  const vsAsp = pickAspectBetween(ch, 'venus', 'saturn');
  const vEl = SIGN_ELEMENT[vSign] || 'Eau';
  const mEl = SIGN_ELEMENT[mSign] || 'Eau';
  const rc = buildRichCtx(ch);

  return [
    { text: `Vénus en ${vSign} — tu aimes comme seul peut aimer une âme inscrite dans ce ciel. Le ${elWord(vSign)} de ta Vénus te pousse à chercher l'intensité, pas le confort. Ton cœur a des standards que peu comprendront.`, planet: 'venus', sign: vSign, aspect: vAsp },
    { text: `Ta Lune en ${mSign} capte chaque imperceptible vibration. Les non-dits, les mensonges qui se cachent sous les mots — tu les sens avant même qu'on ne les prononce. En amour, cette intuition lunaire est ton arme la plus redoutable.`, planet: 'moon', sign: mSign, aspect: mAsp },
    { text: `Soleil en ${sSign}, Vénus en ${vSign} : tu refuses l'amour par accident. Ton cœur filtre avec une précision chirurgicale ce qui est digne d'y entrer — et ce filtre te protège bien plus qu'il ne te limite.`, planet: 'sun', sign: sSign },
    { text: `Mars en ${marsSign} inscrit ta façon de conquérir dans les étoiles. En amour, tu ne restes jamais passif(ve) — tu ${SIGN_ELEMENT[marsSign] === 'Feu' ? "fonces tête baissée, incandescence vivante" : SIGN_ELEMENT[marsSign] === 'Eau' ? "séduis par la profondeur, infiltrant les âmes" : SIGN_ELEMENT[marsSign] === 'Terre' ? "construis pierre après pierre, solidement" : "charmes par l'esprit, magnétisme cérébral"}.`, planet: 'mars', sign: marsSign },
    { text: `Neptune en ${nepSign} dessine ton idéal amoureux en rêve. C'est beau, ce rêve — il t'empêche de te contenter du médiocre. Mais apprends à le distinguer du mirage : tout ce qui brille sous Neptune n'est pas de l'or.`, planet: 'neptune', sign: nepSign },
    { text: `Avec ${rc.elementCounts[rc.dominantElement]} planètes en ${rc.dominantElement}, tu as besoin d'une alchimie spécifique pour aimer. Tu ne négocies pas avec ta nature — elle est ta boussole.`, planet: 'venus', sign: vSign },
    { text: `Pluton en ${plSign} transforme chaque relation en rite initiatique. Tu ne tombes pas amoureux — tu mutes. Et ceux qui survivent à cette transformation deviennent des parts sacrées de toi.`, planet: 'pluto', sign: plSign },
    { text: `Saturne en ${satSign} te rappelle une vérité que les autres ignorent : l'amour durable se bâtit. Les feux d'artifice te tentent, mais le ${elWord(satSign)} de Saturne exige des assises que seule la patience construit.`, planet: 'saturn', sign: satSign },
    { text: `Jupiter en ${jupSign} promet l'expansion de ton cœur. Une rencontre inattendue pourrait tout changer — si tu restes ${vEl === 'Feu' ? "audacieux(se)" : vEl === 'Eau' ? "ouvert(e)" : vEl === 'Terre' ? "réceptif(ve)" : "curieux(se)"}.`, planet: 'jupiter', sign: jupSign },
    { text: `Ton Mars en ${marsSign} et ta Vénus en ${vSign} ne parlent pas le même langage. L'un veut conquérir, l'autre veut être touché(e). Cette dualité rend tes relations inoubliables.`, planet: 'mars', sign: marsSign },
    { text: `Avec une modalité ${rc.dominantModality}, tu as tendance à ${MODALITY_WORDS[rc.dominantModality]} dans tes relations. C'est ta nature profonde — pas un défaut à corriger.`, planet: 'venus', sign: vSign },
    { text: `La Lune en ${mSign} veille sur tes blessures invisibles. En amour, ta vulnérabilité n'est pas une faiblesse — c'est la porte d'entrée vers l'intimité réelle.`, planet: 'moon', sign: mSign },
    { text: `Vénus en ${vSign}, Lune en ${mSign} — ton cœur est un ${vEl === mEl ? `pur ${elWord(vSign)}` : `mélange de ${elWord(vSign)} et de ${elWord(mSign)}`}. Personne n'aime exactement comme toi.`, planet: 'venus', sign: vSign },
    { text: `${rc.harmoniousAspects} aspects harmonieux dans ton thème : l'amour peut couler naturellement vers toi, si tu arrêtes de le chercher là où il n'est pas.`, planet: 'venus', sign: vSign },
    { text: `${rc.tenseAspects} aspects tendus dans ton ciel natal — ce sont tes cicatrices d'amour cosmiques. Chacune t'a enseigné ce que tu refuses désormais de tolérer.`, planet: 'pluto', sign: plSign },
    ...(vAsp ? [{ text: `${PN[vAsp.planet1]} ${verbFor(vAsp.type)} ${PN[vAsp.planet2]} : ta façon d'aimer est complexe. Tu exiges d'être compris(e) jusqu'à l'os — et ce filtre éloigne les mauvais et attire les bons.`, planet: 'venus', sign: vSign, aspect: vAsp }] : []),
    ...(mAsp ? [{ text: `Lune en ${mSign} ${verbFor(mAsp.type)} ${PN[mAsp.planet1 === 'moon' ? mAsp.planet2 : mAsp.planet1]} — tu sens quand c'est fini avant l'autre. Tu sens quand ça commence aussi.`, planet: 'moon', sign: mSign, aspect: mAsp }] : []),
    ...(smAsp ? [{ text: `Soleil en ${sSign} ${smAsp.type.toLowerCase()} Lune en ${mSign} : tes désirs conscients et tes besoins profonds ${smAsp.type === 'Trigone' || smAsp.type === 'Sextile' ? "s'harmonisent — tu sais ce que tu veux" : "se confrontent — et c'est cette friction qui donne de la profondeur à tes relations"}.`, planet: 'sun', sign: sSign, aspect: { planet1: 'sun', planet2: 'moon', type: smAsp.type } }] : []),
    ...(vmAsp ? [{ text: `Vénus ${verbFor(vmAsp.type)} ta Lune : ton cœur et ton instinct ${vmAsp.type === 'Trigone' || vmAsp.type === 'Sextile' ? "parlent la même langue — rare et précieux" : "se disputent en permanence. Écoute celui qui parle le plus bas"}.`, planet: 'venus', sign: vSign, aspect: vmAsp }] : []),
    ...(vsAsp ? [{ text: `Vénus en ${vSign} ${verbFor(vsAsp.type)} Saturne en ${satSign} — tu as appris à aimer avec prudence. Ce n'est pas de la froideur, c'est de la sagesse durement acquise.`, planet: 'venus', sign: vSign, aspect: vsAsp }] : []),
    ...(rc.venusMars ? [{ text: `Vénus ${verbFor(rc.venusMars.type)} Mars dans ton ciel : désir et tendresse ${rc.venusMars.type === 'Trigone' || rc.venusMars.type === 'Sextile' ? "dansent ensemble naturellement" : "se tirent la couverture"}. Ton magnétisme vient de cette tension.`, planet: 'venus', sign: vSign, aspect: rc.venusMars }] : []),
    ...(rc.venusNeptune ? [{ text: `Vénus ${verbFor(rc.venusNeptune.type)} Neptune : tu vois le meilleur en l'autre. C'est ton don le plus pur — mais ${rc.venusNeptune.type === 'Carré' || rc.venusNeptune.type === 'Opposition' ? "apprends à distinguer le potentiel réel du mirage" : "cette lucidité romantique est ta plus grande force"}.`, planet: 'venus', sign: vSign, aspect: rc.venusNeptune }] : []),
    ...(rc.moonPluto ? [{ text: `Lune ${verbFor(rc.moonPluto.type)} Pluton : chaque relation significative te transforme en profondeur. Tu n'aimes pas — tu mues.`, planet: 'moon', sign: mSign, aspect: rc.moonPluto }] : []),
    ...(rc.sunVenus ? [{ text: `Soleil ${verbFor(rc.sunVenus.type)} Vénus : ton identité et ta capacité d'aimer brillent ensemble. ${rc.sunVenus.type === 'Conjonction' ? "Tu ES l'amour que tu cherches — les autres le voient avant toi" : "Quand tu t'acceptes, l'amour suit naturellement"}.`, planet: 'sun', sign: sSign, aspect: rc.sunVenus }] : []),
    ...(rc.moonVenus ? [{ text: `Lune ${verbFor(rc.moonVenus.type)} Vénus : ${rc.moonVenus.type === 'Trigone' || rc.moonVenus.type === 'Sextile' ? "tes émotions et tes désirs sont alignés — quand tu aimes, c'est avec tout ton être. Pas de demi-mesure" : "ce que tu veux et ce dont tu as besoin se confrontent. Le bon partenaire comprend cette nuance"}.`, planet: 'venus', sign: vSign, aspect: rc.moonVenus }] : []),
    ...(rc.marsUranus ? [{ text: `Mars ${verbFor(rc.marsUranus.type)} Uranus : en amour, tu as besoin d'électricité. La routine te tue — tu cherches quelqu'un qui te surprend encore après des années.`, planet: 'mars', sign: marsSign, aspect: rc.marsUranus }] : []),
    ...(rc.moonSaturn ? [{ text: `Lune ${verbFor(rc.moonSaturn.type)} Saturne : ${rc.moonSaturn.type === 'Carré' || rc.moonSaturn.type === 'Opposition' ? "la peur d'être vulnérable te protège mais t'isole aussi. L'amour demande le courage de baisser ta garde" : "ta maturité émotionnelle te fait préférer l'amour patient à la passion éphémère. C'est une force rare"}.`, planet: 'moon', sign: mSign, aspect: rc.moonSaturn }] : []),
    ...(rc.moonNeptune ? [{ text: `Lune ${verbFor(rc.moonNeptune.type)} Neptune : tu idéalises l'amour comme un art. ${rc.moonNeptune.type === 'Trigone' || rc.moonNeptune.type === 'Sextile' ? "Cette vision romantique attire des connexions d'une profondeur rare" : "Apprends à voir l'autre tel qu'il est, pas tel que tu le rêves — la réalité peut être encore plus belle"}.`, planet: 'moon', sign: mSign, aspect: rc.moonNeptune }] : []),
    ...(rc.stellium ? [{ text: `Stellium en ${rc.stellium.sign} — ${rc.stellium.planets.map(p => PN[p]).join(', ')} concentrés ensemble. En amour, c'est un laser : puissant, précis, mais parfois trop focalisé sur un seul mode.`, planet: rc.stellium.planets[0], sign: rc.stellium.sign }] : []),
  ];
};

const TRAVAIL_TEMPLATES: TemplGen = (ch) => {
  const s = ch.planetPositions.sun;
  const mars = ch.planetPositions.mars;
  const jup = ch.planetPositions.jupiter;
  const sat = ch.planetPositions.saturn;
  const merc = ch.planetPositions.mercury;
  const pluto = ch.planetPositions.pluto;
  const ura = ch.planetPositions.uranus;
  const v = ch.planetPositions.venus;
  const m = ch.planetPositions.moon;
  const sSign = s?.sign || 'Bélier';
  const marsSign = mars?.sign || 'Bélier';
  const jupSign = jup?.sign || 'Sagittaire';
  const satSign = sat?.sign || 'Capricorne';
  const mercSign = merc?.sign || 'Bélier';
  const plSign = pluto?.sign || 'Scorpion';
  const uraSign = ura?.sign || 'Verseau';
  const vSign = v?.sign || 'Bélier';
  const mSign = m?.sign || 'Cancer';
  const marsAsp = pickAspect(ch, 'mars');
  const satAsp = pickAspect(ch, 'saturn');
  const jupAsp = pickAspect(ch, 'jupiter');
  const mercAsp = pickAspect(ch, 'mercury');
  const smAsp = pickAspectBetween(ch, 'sun', 'mars');
  const mercEl = SIGN_ELEMENT[mercSign] || 'Air';
  const rc = buildRichCtx(ch);

  return [
    { text: `Soleil en ${sSign} — ta carrière doit résonner avec le ${elWord(sSign)} qui brûle en toi. Les rôles trop petits te consument de l'intérieur.`, planet: 'sun', sign: sSign },
    { text: `Mars en ${marsSign} te pousse à avancer quand tout le monde s'arrête. Cette endurance est ta signature professionnelle — ceux qui comptent le remarquent.`, planet: 'mars', sign: marsSign, aspect: marsAsp },
    { text: `Saturne en ${satSign} construit lentement mais définitivement. Tes succès ne seront pas des feux de paille — ils seront des monuments.`, planet: 'saturn', sign: satSign, aspect: satAsp },
    { text: `Jupiter en ${jupSign} promet l'expansion. Bouge d'abord, comprends après. Les meilleures portes sont celles que tu ne vois pas encore.`, planet: 'jupiter', sign: jupSign, aspect: jupAsp },
    { text: `Mercure en ${mercSign} — un mental de ${elWord(mercSign)}. ${mercEl === 'Feu' || mercEl === 'Air' ? "L'ennui est ton pire ennemi professionnel" : "Tu vois ce que les autres survolent"}. Ta curiosité est ton oxygène.`, planet: 'mercury', sign: mercSign },
    { text: `La reconnaissance viendra, mais Saturne en ${satSign} te la livrera à son rythme. Chaque détour était en réalité un raccourci — tu le comprendras bientôt.`, planet: 'saturn', sign: satSign },
    { text: `Pluton en ${plSign} dans ton thème : chaque crise professionnelle est un portail de renaissance. Ce qui s'effondre te libère.`, planet: 'pluto', sign: plSign },
    { text: `Uranus en ${uraSign} injecte l'imprévu dans ta trajectoire. Les bifurcations soudaines sont souvent tes meilleurs raccourcis.`, planet: 'uranus', sign: uraSign },
    { text: `Ton Soleil en ${sSign} et Mars en ${marsSign} : quand tu trouves un projet qui résonne, tu deviens inarrêtable. Le problème n'est jamais l'énergie — c'est la direction.`, planet: 'sun', sign: sSign },
    { text: `Vénus en ${vSign} au travail, c'est le besoin d'esthétique, d'harmonie dans l'environnement. Tu performes mieux là où tu te sens beau/belle.`, planet: 'venus', sign: vSign },
    { text: `Ta Lune en ${mSign} dans le contexte professionnel : ton intuition vaut plus que dix analyses de marché. Fais-lui plus de place.`, planet: 'moon', sign: mSign },
    { text: `Élément dominant ${rc.dominantElement} — tu excelles dans les rôles de ${rc.dominantElement === 'Feu' ? "leadership et création" : rc.dominantElement === 'Eau' ? "soin et accompagnement" : rc.dominantElement === 'Terre' ? "construction et expertise" : "innovation et stratégie"}.`, planet: 'sun', sign: sSign },
    { text: `${rc.tenseAspects} aspects tendus dans ton ciel : la friction est ton moteur professionnel. Sans obstacle, tu stagnes. Avec, tu excelles.`, planet: 'mars', sign: marsSign },
    { text: `${rc.harmoniousAspects} aspects harmonieux : certains talents coulent naturellement chez toi. Le piège serait de ne pas les exploiter parce qu'ils te semblent trop faciles.`, planet: 'jupiter', sign: jupSign },
    { text: `Modalité ${rc.dominantModality} : ta nature profonde est de ${MODALITY_WORDS[rc.dominantModality]}. Les rôles qui respectent ce rythme te libèrent. Les autres t'étouffent.`, planet: 'saturn', sign: satSign },
    { text: `Jupiter en ${jupSign}, Saturne en ${satSign} — expansion et structure. Tu as besoin des deux : un rêve ET un plan. L'un sans l'autre te laisse insatisfait(e).`, planet: 'jupiter', sign: jupSign },
    { text: `Mars en ${marsSign} et Mercure en ${mercSign} : la force brute rencontre l'intelligence. Dans ta carrière, c'est quand tu combines action et réflexion que tu frappes le plus fort.`, planet: 'mars', sign: marsSign },
    ...(marsAsp ? [{ text: `${PN[marsAsp.planet1]} ${verbFor(marsAsp.type)} ${PN[marsAsp.planet2]} — chaque obstacle est une rampe de lancement. Tu ne contournes pas les problèmes, tu les traverses.`, planet: 'mars', sign: marsSign, aspect: marsAsp }] : []),
    ...(satAsp ? [{ text: `Saturne ${verbFor(satAsp.type)} ${PN[satAsp.planet1 === 'saturn' ? satAsp.planet2 : satAsp.planet1]} : la discipline et la patience sont tes armes secrètes dans un monde qui récompense la vitesse.`, planet: 'saturn', sign: satSign, aspect: satAsp }] : []),
    ...(jupAsp ? [{ text: `Jupiter ${verbFor(jupAsp.type)} ${PN[jupAsp.planet1 === 'jupiter' ? jupAsp.planet2 : jupAsp.planet1]} dans ton ciel : une fenêtre d'expansion s'ouvre. L'action crée la chance — ta nature jupitérienne le sait.`, planet: 'jupiter', sign: jupSign, aspect: jupAsp }] : []),
    ...(mercAsp ? [{ text: `Mercure ${verbFor(mercAsp.type)} ${PN[mercAsp.planet1 === 'mercury' ? mercAsp.planet2 : mercAsp.planet1]} : tes idées ont un pouvoir que tu sous-estimes. Ose les partager — elles changeront la donne.`, planet: 'mercury', sign: mercSign, aspect: mercAsp }] : []),
    ...(smAsp ? [{ text: `Soleil ${verbFor(smAsp.type)} Mars : ton identité est liée à l'action. ${smAsp.type === 'Trigone' || smAsp.type === 'Sextile' ? "Tu brilles quand tu agis" : "Le conflit entre être et faire te pousse à dépasser tes limites"}.`, planet: 'sun', sign: sSign, aspect: smAsp }] : []),
    ...(rc.mercuryJupiter ? [{ text: `Mercure ${verbFor(rc.mercuryJupiter.type)} Jupiter — pensée et vision se parlent. ${rc.mercuryJupiter.type === 'Trigone' || rc.mercuryJupiter.type === 'Sextile' ? "Stratège naturel : le détail ET la vue d'ensemble" : "Quand le petit et le grand se réconcilient, tes idées deviennent imbattables"}.`, planet: 'mercury', sign: mercSign, aspect: rc.mercuryJupiter }] : []),
    ...(rc.jupiterSaturn ? [{ text: `Jupiter ${verbFor(rc.jupiterSaturn.type)} Saturne : le rêve rencontre la discipline. ${rc.jupiterSaturn.type === 'Trigone' || rc.jupiterSaturn.type === 'Sextile' ? "Tu rêves grand et construis solide" : "Cette tension entre expansion et restriction forge les stratèges les plus redoutables"}.`, planet: 'jupiter', sign: jupSign, aspect: rc.jupiterSaturn }] : []),
    ...(rc.marsPluto ? [{ text: `Mars ${verbFor(rc.marsPluto.type)} Pluton — volonté de fer, concentration laser. Quand tu décides quelque chose, l'univers le sent.`, planet: 'mars', sign: marsSign, aspect: rc.marsPluto }] : []),
    ...(rc.sunSaturn ? [{ text: `Soleil ${verbFor(rc.sunSaturn.type)} Saturne : ${rc.sunSaturn.type === 'Carré' || rc.sunSaturn.type === 'Opposition' ? "tu as toujours l'impression de devoir prouver ta valeur. Chaque épreuve passée te rend plus solide" : "ambition et patience s'allient naturellement. Floraison lente mais inébranlable"}.`, planet: 'sun', sign: sSign, aspect: rc.sunSaturn }] : []),
    ...(rc.sunMercury ? [{ text: `Soleil ${verbFor(rc.sunMercury.type)} Mercure : ${rc.sunMercury.type === 'Conjonction' ? "ta pensée et ton identité ne font qu'un. Chaque idée que tu lances porte ta signature — les bonnes personnes le reconnaissent" : "ton intelligence est un outil de pouvoir professionnel. Utilise-la stratégiquement"}.`, planet: 'mercury', sign: mercSign, aspect: rc.sunMercury }] : []),
    ...(rc.marsSaturn ? [{ text: `Mars ${verbFor(rc.marsSaturn.type)} Saturne : ${rc.marsSaturn.type === 'Trigone' || rc.marsSaturn.type === 'Sextile' ? "discipline et action s'allient — tu es une machine de productivité quand tu trouves le bon rythme" : "la frustration professionnelle cache un moteur surpuissant. Chaque obstacle pulvérisé te forge davantage"}.`, planet: 'mars', sign: marsSign, aspect: rc.marsSaturn }] : []),
    ...(rc.sunJupiter ? [{ text: `Soleil ${verbFor(rc.sunJupiter.type)} Jupiter : une vision expansive de ta carrière. ${rc.sunJupiter.type === 'Trigone' || rc.sunJupiter.type === 'Sextile' ? "Les opportunités te sourient naturellement — mais c'est ton audace qui les transforme en succès" : "Tu oscilles entre ambition démesurée et prudence. Le juste milieu est ton terrain de victoire"}.`, planet: 'jupiter', sign: jupSign, aspect: rc.sunJupiter }] : []),
    ...(rc.sunUranus ? [{ text: `Soleil ${verbFor(rc.sunUranus.type)} Uranus : ta carrière ne suivra jamais une trajectoire conventionnelle. ${rc.sunUranus.type === 'Trigone' || rc.sunUranus.type === 'Sextile' ? "Embrasse l'imprévisible — c'est là que tu brilles" : "Cesse de forcer les cases classiques. Tu es fait(e) pour inventer ta propre voie"}.`, planet: 'uranus', sign: uraSign, aspect: rc.sunUranus }] : []),
    ...(rc.mercurySaturn ? [{ text: `Mercure ${verbFor(rc.mercurySaturn.type)} Saturne : ${rc.mercurySaturn.type === 'Trigone' || rc.mercurySaturn.type === 'Sextile' ? "une rigueur intellectuelle redoutable. Tes analyses sont des armes de précision" : "tu mets parfois trop de temps à formuler. Mais quand tu parles, chaque mot compte et chaque mot frappe"}.`, planet: 'mercury', sign: mercSign, aspect: rc.mercurySaturn }] : []),
    ...(rc.venusJupiter ? [{ text: `Vénus ${verbFor(rc.venusJupiter.type)} Jupiter : le networking est un talent inné chez toi. Les partenariats professionnels prospèrent sous cette configuration.`, planet: 'venus', sign: vSign, aspect: rc.venusJupiter }] : []),
    ...(rc.stellium ? [{ text: `Stellium en ${rc.stellium.sign} (${rc.stellium.planets.map(p => PN[p]).join(', ')}) — une puissance concentrée. Professionnellement, c'est ta zone de génie et ton plus grand avantage compétitif.`, planet: rc.stellium.planets[0], sign: rc.stellium.sign }] : []),
  ];
};

const SOI_TEMPLATES: TemplGen = (ch) => {
  const s = ch.planetPositions.sun;
  const m = ch.planetPositions.moon;
  const pluto = ch.planetPositions.pluto;
  const nep = ch.planetPositions.neptune;
  const mars = ch.planetPositions.mars;
  const sat = ch.planetPositions.saturn;
  const ura = ch.planetPositions.uranus;
  const merc = ch.planetPositions.mercury;
  const v = ch.planetPositions.venus;
  const jup = ch.planetPositions.jupiter;
  const sSign = s?.sign || 'Bélier';
  const mSign = m?.sign || 'Cancer';
  const plSign = pluto?.sign || 'Scorpion';
  const nepSign = nep?.sign || 'Capricorne';
  const marsSign = mars?.sign || 'Bélier';
  const satSign = sat?.sign || 'Capricorne';
  const uraSign = ura?.sign || 'Verseau';
  const mercSign = merc?.sign || 'Bélier';
  const vSign = v?.sign || 'Bélier';
  const jupSign = jup?.sign || 'Sagittaire';
  const smAsp = pickAspectBetween(ch, 'sun', 'moon');
  const plAsp = pickAspect(ch, 'pluto');
  const sAsp = pickAspect(ch, 'sun');
  const mAsp = pickAspect(ch, 'moon');
  const nepAsp = pickAspect(ch, 'neptune');
  const spAsp = pickAspectBetween(ch, 'sun', 'pluto');
  const rc = buildRichCtx(ch);

  return [
    { text: `Soleil en ${sSign}, Lune en ${mSign} — ce que tu montres au monde et ce que tu portes en toi sont deux paysages différents. Les deux sont vrais.`, planet: 'sun', sign: sSign },
    { text: `Ta Lune en ${mSign} porte des tempêtes silencieuses. Cesse de t'excuser d'être intense — c'est ta nature, pas un défaut.`, planet: 'moon', sign: mSign },
    { text: `Pluton en ${plSign} promet : chaque effondrement est une mue. Ce que tu perds te libère toujours de quelque chose qui ne te servait plus.`, planet: 'pluto', sign: plSign },
    { text: `Neptune en ${nepSign} te permet de voir au-delà des masques. Ce don est un phare — utilise-le pour te guider, pas pour juger.`, planet: 'neptune', sign: nepSign },
    { text: `L'essence du ${sSign} et l'instinct du ${mSign} — cette combinaison te donne une intuition que la logique ne peut pas égaler. Fie-toi à elle.`, planet: 'sun', sign: sSign },
    { text: `Tu n'es pas perdu(e). Le ${elWord(sSign)} de ton Soleil te guide toujours vers la vérité, même quand le chemin semble disparaître.`, planet: 'sun', sign: sSign },
    { text: `Mercure en ${mercSign} porte les mots que tu n'oses pas dire. Ils brûlent tant que tu les gardes — libère-les et regarde ce qui émerge.`, planet: 'mercury', sign: mercSign },
    { text: `Mars en ${marsSign} est ta force brute intérieure. Quand le doute te paralyse, rappelle-toi : tu as survécu à tout ce que tu croyais insurmontable.`, planet: 'mars', sign: marsSign },
    { text: `Saturne en ${satSign} t'a appris la patience par la douleur. Ce savoir n'est pas une blessure — c'est une armure.`, planet: 'saturn', sign: satSign },
    { text: `Uranus en ${uraSign} insuffle en toi le besoin de briser les moules. Tu n'es pas fait(e) pour rentrer dans les cases — tu es fait(e) pour les redéfinir.`, planet: 'uranus', sign: uraSign },
    { text: `Vénus en ${vSign} te murmure : tes zones d'ombre ne sont pas des ennemies. Chaque peur porte en elle un courage que tu n'as pas encore découvert.`, planet: 'venus', sign: vSign },
    { text: `Élément dominant ${rc.dominantElement} — tu es fondamentalement une âme de ${rc.dominantElement === 'Feu' ? "feu : la tiédeur est ta kryptonite" : rc.dominantElement === 'Eau' ? "eau : tu absorbes le monde à travers un filtre émotionnel puissant" : rc.dominantElement === 'Terre' ? "terre : quand tout s'effondre, tu es la dernière personne debout" : "air : mille idées à la seconde, apprendre à en choisir une est ta leçon"}.`, planet: 'sun', sign: sSign },
    { text: `Modalité ${rc.dominantModality} — ta nature profonde est de ${MODALITY_WORDS[rc.dominantModality]}. Accepte ce compas intérieur au lieu de lutter contre lui.`, planet: 'sun', sign: sSign },
    { text: `Ce que tu appelles chaos, Pluton en ${plSign} appelle gestation. Quelque chose naît dans le ${elWord(mSign)} de ton être — tu ne peux pas encore le nommer, et c'est normal.`, planet: 'pluto', sign: plSign },
    { text: `Jupiter en ${jupSign} te rappelle que tes limites actuelles ne sont pas permanentes. Tu grandis encore — et tu n'as même pas atteint la moitié de ton potentiel.`, planet: 'jupiter', sign: jupSign },
    { text: `Tout ce qui vibre à ta fréquence finira par te trouver. Arrête de forcer. Ton ${elWord(sSign)} intérieur fera le reste.`, planet: 'sun', sign: sSign },
    { text: `Tes ${rc.totalAspects} aspects nataux forment une architecture unique. ${rc.tenseAspects} tensions, ${rc.harmoniousAspects} harmonies — tu n'es pas contradictoire, tu es multidimensionnel(le).`, planet: 'sun', sign: sSign },
    { text: `La Lune en ${mSign} et Neptune en ${nepSign} : tu perçois des fréquences que la plupart ignorent. Ce n'est pas de l'hypersensibilité — c'est de la clairvoyance.`, planet: 'moon', sign: mSign },
    ...(smAsp ? [{ text: `Soleil ${smAsp.type.toLowerCase()} Lune : ton conscient et ton inconscient ${smAsp.type === 'Trigone' || smAsp.type === 'Sextile' ? "coulent dans le même sens — quand tu te fais confiance, tu es inarrêtable" : "se défient sans cesse. Cette tension est épuisante mais te rend extraordinairement vivant(e)"}.`, planet: 'sun', sign: sSign, aspect: { planet1: 'sun', planet2: 'moon', type: smAsp.type } }] : []),
    ...(plAsp ? [{ text: `${PN[plAsp.planet1]} ${verbFor(plAsp.type)} ${PN[plAsp.planet2]} : chaque crise te forge. Tu es un phénix — les autres voient la destruction, toi tu sens déjà la renaissance.`, planet: 'pluto', sign: plSign, aspect: plAsp }] : []),
    ...(sAsp ? [{ text: `${PN[sAsp.planet1]} ${verbFor(sAsp.type)} ${PN[sAsp.planet2]} — une dualité fascinante au cœur de ton identité. Tu n'es pas contradictoire, tu es complexe.`, planet: 'sun', sign: sSign, aspect: sAsp }] : []),
    ...(mAsp ? [{ text: `Lune ${verbFor(mAsp.type)} ${PN[mAsp.planet1 === 'moon' ? mAsp.planet2 : mAsp.planet1]} : ton monde émotionnel est plus vaste que ce que tu montres. C'est ta profondeur secrète.`, planet: 'moon', sign: mSign, aspect: mAsp }] : []),
    ...(nepAsp ? [{ text: `Neptune ${verbFor(nepAsp.type)} ${PN[nepAsp.planet1 === 'neptune' ? nepAsp.planet2 : nepAsp.planet1]} : ta sensibilité capte des vérités invisibles aux autres. Protège ce don sans le fermer.`, planet: 'neptune', sign: nepSign, aspect: nepAsp }] : []),
    ...(spAsp ? [{ text: `Soleil ${verbFor(spAsp.type)} Pluton : ton identité est forgée par la transformation. Tu ne stationnes jamais — tu évolues ou tu meurs.`, planet: 'sun', sign: sSign, aspect: spAsp }] : []),
    ...(rc.sunSaturn ? [{ text: `Soleil ${verbFor(rc.sunSaturn.type)} Saturne : ${rc.sunSaturn.type === 'Carré' || rc.sunSaturn.type === 'Opposition' ? "tu portes un poids invisible — celui de responsabilités que personne ne t'a demandées. Cette gravité n'est pas une malédiction, c'est une initiation" : "maturité naturelle et discipline instinctive. La liberté vient après la structure"}.`, planet: 'sun', sign: sSign, aspect: rc.sunSaturn }] : []),
    ...(rc.moonPluto ? [{ text: `Lune ${verbFor(rc.moonPluto.type)} Pluton : tu as accès à des couches de la psyché que la plupart ne visitent jamais. Tu sens les non-dits, les motivations cachées, les mues nécessaires.`, planet: 'moon', sign: mSign, aspect: rc.moonPluto }] : []),
    ...(rc.sunMercury ? [{ text: `Soleil ${verbFor(rc.sunMercury.type)} Mercure : ta pensée nourrit ton essence. ${rc.sunMercury.type === 'Conjonction' ? "Tu comprends le monde à travers les mots — écrire ou parler est ta forme de méditation" : "Entre ce que tu penses et ce que tu es, il y a un dialogue fascinant qui ne s'arrête jamais"}.`, planet: 'sun', sign: sSign, aspect: rc.sunMercury }] : []),
    ...(rc.sunVenus ? [{ text: `Soleil ${verbFor(rc.sunVenus.type)} Vénus : tu te découvres à travers ce que tu aimes. Tes goûts, tes passions, tes attirances — tout cela est un miroir de qui tu es vraiment.`, planet: 'sun', sign: sSign, aspect: rc.sunVenus }] : []),
    ...(rc.moonSaturn ? [{ text: `Lune ${verbFor(rc.moonSaturn.type)} Saturne : une gravité émotionnelle que tu portes depuis l'enfance. ${rc.moonSaturn.type === 'Carré' || rc.moonSaturn.type === 'Opposition' ? "Ce poids t'a rendu(e) plus fort(e) que la plupart — accepte-le comme un don déguisé" : "Ta maturité émotionnelle est un phare dans la tempête"}.`, planet: 'moon', sign: mSign, aspect: rc.moonSaturn }] : []),
    ...(rc.moonNeptune ? [{ text: `Lune ${verbFor(rc.moonNeptune.type)} Neptune : ta sensibilité est un instrument accordé sur des fréquences que l'œil ne capte pas. Fais-en un art, pas un fardeau.`, planet: 'moon', sign: mSign, aspect: rc.moonNeptune }] : []),
    ...(rc.marsUranus ? [{ text: `Mars ${verbFor(rc.marsUranus.type)} Uranus : une énergie rebelle coule en toi. ${rc.marsUranus.type === 'Carré' || rc.marsUranus.type === 'Opposition' ? "Cette impatience n'est pas un défaut — c'est le cri d'une âme qui refuse la médiocrité" : "Tu agis par éclairs de génie. Apprends à surfer sur ces impulsions au lieu de les brider"}.`, planet: 'mars', sign: marsSign, aspect: rc.marsUranus }] : []),
    ...(rc.sunJupiter ? [{ text: `Soleil ${verbFor(rc.sunJupiter.type)} Jupiter : un optimisme fondamental te traverse. Tu crois en toi-même plus que tu ne le penses — et c'est ce qui te porte quand tout semble s'effondrer.`, planet: 'sun', sign: sSign, aspect: rc.sunJupiter }] : []),
    ...(rc.stellium ? [{ text: `Stellium en ${rc.stellium.sign} : ${rc.stellium.planets.length} planètes concentrées ensemble. Tu es un spécialiste existentiel — une puissance unique et un risque de tunnel vision. Explore tes maisons vides.`, planet: rc.stellium.planets[0], sign: rc.stellium.sign }] : []),
  ];
};

const AVENIR_TEMPLATES: TemplGen = (ch) => {
  const s = ch.planetPositions.sun;
  const mars = ch.planetPositions.mars;
  const jup = ch.planetPositions.jupiter;
  const sat = ch.planetPositions.saturn;
  const ura = ch.planetPositions.uranus;
  const nep = ch.planetPositions.neptune;
  const pluto = ch.planetPositions.pluto;
  const m = ch.planetPositions.moon;
  const merc = ch.planetPositions.mercury;
  const v = ch.planetPositions.venus;
  const sSign = s?.sign || 'Bélier';
  const marsSign = mars?.sign || 'Bélier';
  const jupSign = jup?.sign || 'Sagittaire';
  const satSign = sat?.sign || 'Capricorne';
  const uraSign = ura?.sign || 'Verseau';
  const nepSign = nep?.sign || 'Capricorne';
  const plSign = pluto?.sign || 'Scorpion';
  const mSign = m?.sign || 'Cancer';
  const mercSign = merc?.sign || 'Bélier';
  const vSign = v?.sign || 'Bélier';
  const jupAsp = pickAspect(ch, 'jupiter');
  const uraAsp = pickAspect(ch, 'uranus');
  const satAsp = pickAspect(ch, 'saturn');
  const marsAsp = pickAspect(ch, 'mars');
  const plAsp = pickAspect(ch, 'pluto');
  const juAsp = pickAspectBetween(ch, 'jupiter', 'uranus');
  const rc = buildRichCtx(ch);

  return [
    { text: `Le ${elWord(sSign)} de ton Soleil en ${sSign} change de direction. L'avenir n'est pas un lieu — c'est une mue. Tu le sens déjà dans cette impatience inexplicable.`, planet: 'sun', sign: sSign },
    { text: `Mars en ${marsSign} et Jupiter en ${jupSign} ouvrent des portes invisibles. L'action crée la chance — fais le premier pas dans le noir.`, planet: 'mars', sign: marsSign },
    { text: `Saturne en ${satSign} marche au rythme du destin. Le rêve et la réalité convergent enfin, mais pas en un éclair — en une succession de petits signes.`, planet: 'saturn', sign: satSign },
    { text: `Uranus en ${uraSign} prépare l'inattendu. Ce qui semble chaotique maintenant se révélera être exactement ce qu'il te fallait.`, planet: 'uranus', sign: uraSign },
    { text: `Tout ce que tu as traversé t'a préparé à ce qui arrive. Chaque fin était un espace libéré pour quelque chose de meilleur.`, planet: 'pluto', sign: plSign },
    { text: `Les limites que tu vois sont des lignes tracées par d'autres. Ton Mars en ${marsSign} te le rappelle : la prochaine vague — ta vague — les effacera.`, planet: 'mars', sign: marsSign },
    { text: `Le cycle qui commence est guidé par Saturne en ${satSign}. Patience — les plus belles cathédrales se construisent grain par grain.`, planet: 'saturn', sign: satSign },
    { text: `Jupiter en ${jupSign} amplifie tout ce qu'il touche. Tes efforts, tes rêves, mais aussi l'inaction. C'est maintenant qu'il faut oser.`, planet: 'jupiter', sign: jupSign },
    { text: `Neptune en ${nepSign} souffle une vision que tu ne vois pas encore clairement. Laisse-la se préciser — ne la force pas dans une forme prématurée.`, planet: 'neptune', sign: nepSign },
    { text: `Pluton en ${plSign} garantit : les tournants les plus radicaux accouchent des versions les plus fortes de toi.`, planet: 'pluto', sign: plSign },
    { text: `Ta Lune en ${mSign} sent déjà ce que ton mental n'a pas encore compris. Ce pressentiment flou est la boussole la plus fiable que tu possèdes.`, planet: 'moon', sign: mSign },
    { text: `Mercure en ${mercSign} aiguise ta perception de l'avenir. Les signes sont partout — tu commences tout juste à les décoder.`, planet: 'mercury', sign: mercSign },
    { text: `${rc.harmoniousAspects > rc.tenseAspects ? "La prédominance d'aspects harmonieux indique un avenir fluide — ton défi sera de ne pas t'endormir dans cette facilité" : rc.tenseAspects > rc.harmoniousAspects ? "Tes aspects tendus ne sont pas un mauvais signe — les plus grandes réalisations naissent de la friction, pas du confort" : "Équilibre parfait entre tension et harmonie — tu avances avec les deux pieds sur terre et la tête dans les étoiles"}.`, planet: 'sun', sign: sSign },
    { text: `Ton Soleil en ${sSign} et Saturne en ${satSign} tracent une trajectoire lente mais spectaculaire. Le monde récompense la vitesse ; les étoiles récompensent la profondeur.`, planet: 'sun', sign: sSign },
    { text: `Uranus en ${uraSign} et Neptune en ${nepSign} colorent ta génération d'une teinte unique. Ton avenir s'inscrit dans un mouvement plus vaste que toi — et c'est exactement ce qui le rend puissant.`, planet: 'uranus', sign: uraSign },
    { text: `Mars en ${marsSign} fournit le carburant. Jupiter en ${jupSign} ouvre la route. Saturne en ${satSign} consolide les acquis. Tout est prêt — il ne manque que ta décision.`, planet: 'mars', sign: marsSign },
    { text: `Avec ${rc.elementCounts[rc.dominantElement]} planètes en ${rc.dominantElement}, ton avenir est ${rc.dominantElement === 'Feu' ? "une ascension fulgurante" : rc.dominantElement === 'Eau' ? "une transformation profonde" : rc.dominantElement === 'Terre' ? "une construction monumentale" : "une révolution intellectuelle"} qui ne demande qu'à s'amorcer.`, planet: 'sun', sign: sSign },
    ...(jupAsp ? [{ text: `Jupiter ${verbFor(jupAsp.type)} ${PN[jupAsp.planet1 === 'jupiter' ? jupAsp.planet2 : jupAsp.planet1]} : une fenêtre d'expansion s'ouvre. Agis avec l'instinct du ${elWord(marsSign)} — le moment est venu.`, planet: 'jupiter', sign: jupSign, aspect: jupAsp }] : []),
    ...(uraAsp ? [{ text: `Uranus ${verbFor(uraAsp.type)} ${PN[uraAsp.planet1 === 'uranus' ? uraAsp.planet2 : uraAsp.planet1]} : le prochain chapitre sera une métamorphose, pas une explosion. Accueille l'imprévu avec curiosité.`, planet: 'uranus', sign: uraSign, aspect: uraAsp }] : []),
    ...(satAsp ? [{ text: `Saturne ${verbFor(satAsp.type)} ${PN[satAsp.planet1 === 'saturn' ? satAsp.planet2 : satAsp.planet1]} : tes résultats seront lents à arriver mais permanents. Cette patience est ta stratégie, pas ta faiblesse.`, planet: 'saturn', sign: satSign, aspect: satAsp }] : []),
    ...(marsAsp ? [{ text: `Mars ${verbFor(marsAsp.type)} ${PN[marsAsp.planet1 === 'mars' ? marsAsp.planet2 : marsAsp.planet1]} : l'énergie d'action est là. Chaque initiative active un engrenage cosmique en ta faveur.`, planet: 'mars', sign: marsSign, aspect: marsAsp }] : []),
    ...(plAsp ? [{ text: `Pluton ${verbFor(plAsp.type)} ${PN[plAsp.planet1 === 'pluto' ? plAsp.planet2 : plAsp.planet1]} : un pouvoir de renaissance titanesque se prépare. Le néant n'est qu'un prélude.`, planet: 'pluto', sign: plSign, aspect: plAsp }] : []),
    ...(juAsp ? [{ text: `Jupiter ${verbFor(juAsp.type)} Uranus : expansion et rupture s'allient. Ton prochain virage sera à la fois surprenant et libérateur.`, planet: 'jupiter', sign: jupSign, aspect: juAsp }] : []),
    ...(rc.jupiterSaturn ? [{ text: `Jupiter ${verbFor(rc.jupiterSaturn.type)} Saturne : ${rc.jupiterSaturn.type === 'Trigone' || rc.jupiterSaturn.type === 'Sextile' ? "un rythme naturel d'avancée — chaque palier plus haut que le précédent" : "Jupiter veut courir, Saturne veut consolider. Les percées arrivent quand les deux s'alignent enfin"}.`, planet: 'jupiter', sign: jupSign, aspect: rc.jupiterSaturn }] : []),
    ...(rc.marsPluto ? [{ text: `Mars ${verbFor(rc.marsPluto.type)} Pluton : quand tu décides quelque chose, l'univers se réorganise pour te faire de la place. Utilise ce pouvoir consciemment.`, planet: 'mars', sign: marsSign, aspect: rc.marsPluto }] : []),
    ...(rc.sunJupiter ? [{ text: `Soleil ${verbFor(rc.sunJupiter.type)} Jupiter : le prochain cycle porte la signature de la croissance. ${rc.sunJupiter.type === 'Trigone' || rc.sunJupiter.type === 'Sextile' ? "Tout ce que tu touches va se déployer — concentre-toi sur ce qui compte vraiment" : "Les excès sont tentants mais le discernement sera ta plus grande victoire"}.`, planet: 'sun', sign: sSign, aspect: rc.sunJupiter }] : []),
    ...(rc.sunUranus ? [{ text: `Soleil ${verbFor(rc.sunUranus.type)} Uranus : un virage inattendu se profile. ${rc.sunUranus.type === 'Trigone' || rc.sunUranus.type === 'Sextile' ? "Ce changement te libérera — accueille-le avec les bras ouverts" : "La résistance au changement est ton seul vrai obstacle. Le cosmos te pousse vers une version de toi que tu n'as pas encore imaginée"}.`, planet: 'uranus', sign: uraSign, aspect: rc.sunUranus }] : []),
    ...(rc.marsUranus ? [{ text: `Mars ${verbFor(rc.marsUranus.type)} Uranus : des impulsions d'action vont te traverser comme des éclairs. Fais confiance à ces sursauts — ils sont des messages de ton instinct le plus pur.`, planet: 'mars', sign: marsSign, aspect: rc.marsUranus }] : []),
    ...(rc.moonSaturn ? [{ text: `Lune ${verbFor(rc.moonSaturn.type)} Saturne : un ancrage émotionnel profond te stabilise face à l'incertitude. ${rc.moonSaturn.type === 'Carré' || rc.moonSaturn.type === 'Opposition' ? "Les peurs sont réelles mais temporaires — la patience est ton futur allié" : "Tu avances avec une sérénité qui force le respect du destin lui-même"}.`, planet: 'moon', sign: mSign, aspect: rc.moonSaturn }] : []),
    ...(rc.venusNeptune ? [{ text: `Vénus ${verbFor(rc.venusNeptune.type)} Neptune : une aspiration profonde se cristallise. ${rc.venusNeptune.type === 'Trigone' || rc.venusNeptune.type === 'Sextile' ? "Ton intuition créative est ton meilleur guide pour la suite" : "Distingue le rêve réalisable du mirage — la différence entre les deux, c'est l'action"}.`, planet: 'venus', sign: vSign, aspect: rc.venusNeptune }] : []),
    ...(rc.stellium ? [{ text: `Stellium en ${rc.stellium.sign} : toute cette puissance focalisée oriente ton avenir vers un domaine spécifique. La concentration est ton super-pouvoir.`, planet: rc.stellium.planets[0], sign: rc.stellium.sign }] : []),
  ];
};

const GENERAL_TEMPLATES: TemplGen = (ch) => {
  const s = ch.planetPositions.sun;
  const m = ch.planetPositions.moon;
  const v = ch.planetPositions.venus;
  const mars = ch.planetPositions.mars;
  const jup = ch.planetPositions.jupiter;
  const sat = ch.planetPositions.saturn;
  const ura = ch.planetPositions.uranus;
  const nep = ch.planetPositions.neptune;
  const pluto = ch.planetPositions.pluto;
  const merc = ch.planetPositions.mercury;
  const sSign = s?.sign || 'Bélier';
  const mSign = m?.sign || 'Cancer';
  const vSign = v?.sign || 'Bélier';
  const marsSign = mars?.sign || 'Bélier';
  const jupSign = jup?.sign || 'Sagittaire';
  const satSign = sat?.sign || 'Capricorne';
  const uraSign = ura?.sign || 'Verseau';
  const nepSign = nep?.sign || 'Capricorne';
  const plSign = pluto?.sign || 'Scorpion';
  const mercSign = merc?.sign || 'Bélier';
  const sAsp = pickAspect(ch, 'sun');
  const mAsp = pickAspect(ch, 'moon');
  const vAsp = pickAspect(ch, 'venus');
  const marsAsp = pickAspect(ch, 'mars');
  const jupAsp = pickAspect(ch, 'jupiter');
  const smAsp = pickAspectBetween(ch, 'sun', 'moon');
  const svAsp = pickAspectBetween(ch, 'sun', 'venus');
  const rc = buildRichCtx(ch);

  return [
    { text: `Soleil en ${sSign}, Lune en ${mSign} — la force d'agir et la profondeur de ressentir. Tes mains portent les étoiles, même quand elles tremblent.`, planet: 'sun', sign: sSign, aspect: sAsp },
    { text: `Saturne en ${satSign} t'enseigne : le silence entre les notes est ce qui fait la musique. Les pauses ne sont pas des échecs — ce sont des gestations.`, planet: 'saturn', sign: satSign },
    { text: `Ta Lune en ${mSign} connaît déjà la réponse. Tu veux juste qu'on te donne la permission de la suivre. La voici : vas-y.`, planet: 'moon', sign: mSign, aspect: mAsp },
    { text: `Mars en ${marsSign} et Jupiter en ${jupSign} — les étoiles ne jugent pas ton impatience. Elles l'appellent élan vital.`, planet: 'mars', sign: marsSign },
    { text: `Ce que tu appelles chaos, Pluton en ${plSign} appelle gestation. Quelque chose naît — tu ne peux pas encore le nommer.`, planet: 'pluto', sign: plSign },
    { text: `La réponse est dans le ${elWord(sSign)}. Ton Soleil te guide toujours vers la vérité, même quand elle murmure au lieu de crier.`, planet: 'sun', sign: sSign },
    { text: `Vénus en ${vSign} te le dit : tes zones d'ombre ne sont pas des ennemies. Chaque peur cache un courage en germination.`, planet: 'venus', sign: vSign },
    { text: `Tout ce qui vibre à ta fréquence finira par te trouver. Arrête de forcer — ton ${elWord(sSign)} intérieur fera le reste.`, planet: 'sun', sign: sSign },
    { text: `L'univers conspire en ta faveur, surtout quand il semble silencieux. Jupiter en ${jupSign} prépare l'expansion. Saturne en ${satSign} solidifie. Ta Lune en ${mSign} maintient la flamme.`, planet: 'jupiter', sign: jupSign },
    { text: `Mercure en ${mercSign} aiguise tes perceptions. Ce que tu cherches te cherche aussi — avec la même urgence, la même intensité.`, planet: 'mercury', sign: mercSign },
    { text: `Ton thème : ${rc.dominantElement} dominant, modalité ${rc.dominantModality}. Tu es fondamentalement ${rc.dominantElement === 'Feu' ? "passion et vision" : rc.dominantElement === 'Eau' ? "intuition et profondeur" : rc.dominantElement === 'Terre' ? "ancrage et fiabilité" : "mouvement et curiosité"}.`, planet: 'sun', sign: sSign },
    { text: `Neptune en ${nepSign} brouille parfois ta vision. Mais sous le voile, la vérité attend — patiente, intacte, prête à se révéler.`, planet: 'neptune', sign: nepSign },
    { text: `Uranus en ${uraSign} te rappelle : tu n'es pas obligé(e) de tout faire dans l'ordre. Les meilleurs chemins sont ceux que personne n'a tracés.`, planet: 'uranus', sign: uraSign },
    { text: `Tes ${rc.harmoniousAspects} aspects harmonieux sont tes talents naturels. Tes ${rc.tenseAspects} aspects tendus sont tes zones de croissance. Ensemble, ils font de toi un être d'une complexité magnifique.`, planet: 'sun', sign: sSign },
    { text: `Soleil ${sSign}, Vénus ${vSign}, Mars ${marsSign} — la trinité de ton expression : identité, amour, action. Trois notes, une seule mélodie.`, planet: 'sun', sign: sSign },
    { text: `Pluton en ${plSign} et Saturne en ${satSign} veillent — le premier te transforme, le second te structure. Tu es entre de bonnes mains cosmiques.`, planet: 'pluto', sign: plSign },
    { text: `Le ${elWord(mSign)} de ta Lune en ${mSign} et le ${elWord(sSign)} de ton Soleil en ${sSign} créent un courant unique. Baigne-toi dedans au lieu de le combattre.`, planet: 'moon', sign: mSign },
    { text: `Avec ${rc.totalAspects} aspects nataux, ton ciel est une toile d'interactions complexes. Tu n'es pas simple — et c'est un compliment cosmique.`, planet: 'sun', sign: sSign },
    ...(sAsp ? [{ text: `${PN[sAsp.planet1]} ${verbFor(sAsp.type)} ${PN[sAsp.planet2]} : une dualité au cœur de ton identité. Tu es la règle ET l'exception.`, planet: 'sun', sign: sSign, aspect: sAsp }] : []),
    ...(mAsp ? [{ text: `Lune ${verbFor(mAsp.type)} ${PN[mAsp.planet1 === 'moon' ? mAsp.planet2 : mAsp.planet1]} : ton monde émotionnel a des courants que tu ne montres à personne. C'est ta richesse secrète.`, planet: 'moon', sign: mSign, aspect: mAsp }] : []),
    ...(vAsp ? [{ text: `Vénus ${verbFor(vAsp.type)} ${PN[vAsp.planet1 === 'venus' ? vAsp.planet2 : vAsp.planet1]} : ta façon d'aimer et de créer est marquée par cette tension. Elle te rend unique.`, planet: 'venus', sign: vSign, aspect: vAsp }] : []),
    ...(marsAsp ? [{ text: `Mars ${verbFor(marsAsp.type)} ${PN[marsAsp.planet1 === 'mars' ? marsAsp.planet2 : marsAsp.planet1]} : ton énergie d'action est canalisée par cette configuration. La friction est ton carburant.`, planet: 'mars', sign: marsSign, aspect: marsAsp }] : []),
    ...(jupAsp ? [{ text: `Jupiter ${verbFor(jupAsp.type)} ${PN[jupAsp.planet1 === 'jupiter' ? jupAsp.planet2 : jupAsp.planet1]} : la chance n'est jamais aveugle dans ton thème. Elle récompense tes mouvements.`, planet: 'jupiter', sign: jupSign, aspect: jupAsp }] : []),
    ...(smAsp ? [{ text: `Soleil ${smAsp.type.toLowerCase()} Lune — ${smAsp.type === 'Trigone' || smAsp.type === 'Sextile' ? "cohérence intérieure rare. Quand tu parles, ton cœur et ta tête disent la même chose" : "dialogue intérieur permanent. C'est fatigant, mais ça te rend vivant(e) comme peu de gens le sont"}.`, planet: 'sun', sign: sSign, aspect: { planet1: 'sun', planet2: 'moon', type: smAsp.type } }] : []),
    ...(svAsp ? [{ text: `Soleil ${verbFor(svAsp.type)} Vénus : ton identité et tes valeurs sont intimement liées. Tu ne peux pas être toi-même sans être authentique dans ce que tu aimes.`, planet: 'sun', sign: sSign, aspect: svAsp }] : []),
    ...(rc.sunSaturn ? [{ text: `Soleil ${verbFor(rc.sunSaturn.type)} Saturne : ${rc.sunSaturn.type === 'Carré' || rc.sunSaturn.type === 'Opposition' ? "la tension entre qui tu es et ce qu'on attend de toi forge une résilience rare" : "l'autorité que tu émanes n'est pas imposée — elle est naturelle"}.`, planet: 'sun', sign: sSign, aspect: rc.sunSaturn }] : []),
    ...(rc.moonVenus ? [{ text: `Lune ${verbFor(rc.moonVenus.type)} Vénus : une sensibilité esthétique profonde qui colore tout ce que tu fais. ${rc.moonVenus.type === 'Trigone' || rc.moonVenus.type === 'Sextile' ? "La beauté n'est pas un luxe pour toi — c'est un besoin vital" : "Ce que tu trouves beau et ce qui te rassure ne coïncident pas toujours. Explore cette tension"}.`, planet: 'moon', sign: mSign, aspect: rc.moonVenus }] : []),
    ...(rc.sunMercury ? [{ text: `Soleil ${verbFor(rc.sunMercury.type)} Mercure : tes mots sont des extensions directes de ton âme. ${rc.sunMercury.type === 'Conjonction' ? "Chaque phrase que tu prononces porte ta signature cosmique" : "Le décalage entre ta pensée et ton être est une source de créativité inépuisable"}.`, planet: 'sun', sign: sSign, aspect: rc.sunMercury }] : []),
    ...(rc.mercuryVenus ? [{ text: `Mercure ${verbFor(rc.mercuryVenus.type)} Vénus : une intelligence doublée de charme. Tes idées ne sont pas seulement brillantes — elles sont belles.`, planet: 'mercury', sign: mercSign, aspect: rc.mercuryVenus }] : []),
    ...(rc.marsUranus ? [{ text: `Mars ${verbFor(rc.marsUranus.type)} Uranus : une électricité traverse tes actions. ${rc.marsUranus.type === 'Trigone' || rc.marsUranus.type === 'Sextile' ? "Tes coups d'audace sont tes plus grandes réussites" : "L'impulsivité est ton défi, mais aussi ta force la plus brute et la plus authentique"}.`, planet: 'mars', sign: marsSign, aspect: rc.marsUranus }] : []),
    ...(rc.venusMars ? [{ text: `Vénus ${verbFor(rc.venusMars.type)} Mars : douceur et puissance coexistent en toi. ${rc.venusMars.type === 'Trigone' || rc.venusMars.type === 'Sextile' ? "Tu sais quand caresser et quand frapper — cet instinct est rare" : "La guerre entre ton cœur et ton énergie crée une tension magnétique que les autres sentent sans comprendre"}.`, planet: 'venus', sign: vSign, aspect: rc.venusMars }] : []),
    ...(rc.moonNeptune ? [{ text: `Lune ${verbFor(rc.moonNeptune.type)} Neptune : ton monde intérieur est un océan sans fond. Cette immensité émotionnelle est ta plus grande richesse — à condition de ne pas t'y noyer.`, planet: 'moon', sign: mSign, aspect: rc.moonNeptune }] : []),
    ...(rc.mercuryJupiter ? [{ text: `Mercure ${verbFor(rc.mercuryJupiter.type)} Jupiter : pensée et vision s'entrelacent. Tu vois le détail ET la grande image — les deux en même temps. C'est un don rare.`, planet: 'mercury', sign: mercSign, aspect: rc.mercuryJupiter }] : []),
    ...(rc.stellium ? [{ text: `Stellium en ${rc.stellium.sign} — ${rc.stellium.planets.map(p => PN[p]).join(', ')} concentrés. Un laser cosmique : puissance focalisée, direction claire, impact maximal.`, planet: rc.stellium.planets[0], sign: rc.stellium.sign }] : []),
  ];
};

const SOCIAL_TEMPLATES: TemplGen = (ch) => {
  const s = ch.planetPositions.sun;
  const m = ch.planetPositions.moon;
  const v = ch.planetPositions.venus;
  const mars = ch.planetPositions.mars;
  const jup = ch.planetPositions.jupiter;
  const sat = ch.planetPositions.saturn;
  const merc = ch.planetPositions.mercury;
  const nep = ch.planetPositions.neptune;
  const pluto = ch.planetPositions.pluto;
  const ura = ch.planetPositions.uranus;
  const sSign = s?.sign || 'Bélier';
  const mSign = m?.sign || 'Cancer';
  const vSign = v?.sign || 'Bélier';
  const marsSign = mars?.sign || 'Bélier';
  const jupSign = jup?.sign || 'Sagittaire';
  const satSign = sat?.sign || 'Capricorne';
  const mercSign = merc?.sign || 'Bélier';
  const nepSign = nep?.sign || 'Capricorne';
  const plSign = pluto?.sign || 'Scorpion';
  const uraSign = ura?.sign || 'Verseau';
  const vAsp = pickAspect(ch, 'venus');
  const mAsp = pickAspect(ch, 'moon');
  const mercAsp = pickAspect(ch, 'mercury');
  const jupAsp = pickAspect(ch, 'jupiter');
  const marsAsp = pickAspect(ch, 'mars');
  const sAsp = pickAspect(ch, 'sun');
  const rc = buildRichCtx(ch);
  const vEl = SIGN_ELEMENT[vSign] || 'Eau';
  const mEl = SIGN_ELEMENT[mSign] || 'Eau';
  const mercEl = SIGN_ELEMENT[mercSign] || 'Air';

  return [
    { text: `Vénus en ${vSign} dessine ta carte sociale. Tu attires les gens comme le ${elWord(vSign)} — ${vEl === 'Feu' ? "par ton énergie magnétique" : vEl === 'Eau' ? "par ta profondeur émotionnelle" : vEl === 'Terre' ? "par ta fiabilité rassurante" : "par ton esprit vif et ton charme"}.`, planet: 'venus', sign: vSign, aspect: vAsp },
    { text: `Mercure en ${mercSign} façonne ta voix dans le groupe. ${mercEl === 'Feu' ? "Tu parles avec feu et conviction — impossible de t'ignorer" : mercEl === 'Eau' ? "Tu captes les non-dits et le sous-texte de chaque conversation" : mercEl === 'Terre' ? "Tes mots sont mesurés, concrets, rassurants" : "Tu jongle entre les idées et les gens avec une agilité déconcertante"}.`, planet: 'mercury', sign: mercSign, aspect: mercAsp },
    { text: `Ta Lune en ${mSign} absorbe l'atmosphère de chaque pièce avant même d'y entrer. Cette ${mEl === 'Eau' ? "éponge émotionnelle" : mEl === 'Feu' ? "antenne passionnelle" : mEl === 'Terre' ? "radar sensoriel" : "réceptivité mentale"} est à la fois ton superpouvoir et ton talon d'Achille en société.`, planet: 'moon', sign: mSign, aspect: mAsp },
    { text: `Jupiter en ${jupSign} t'offre une générosité sociale rare. Tu donnes sans compter — mais Saturne en ${satSign} te rappelle de filtrer ceux qui en profitent.`, planet: 'jupiter', sign: jupSign },
    { text: `Mars en ${marsSign} influence ta façon de défendre tes proches. Quand quelqu'un touche à ton cercle, le ${elWord(marsSign)} de ton Mars se réveille.`, planet: 'mars', sign: marsSign, aspect: marsAsp },
    { text: `Saturne en ${satSign} trace des frontières invisibles autour de toi. Ce ne sont pas des murs — ce sont des filtres. Tu choisis qui entre, et ce discernement te protège.`, planet: 'saturn', sign: satSign },
    { text: `Soleil en ${sSign} — le rôle que tu joues dans le groupe est celui du ${SIGN_ELEMENT[sSign] === 'Feu' ? "catalyseur : tu enflammes les conversations" : SIGN_ELEMENT[sSign] === 'Eau' ? "confident : on vient à toi pour les confidences" : SIGN_ELEMENT[sSign] === 'Terre' ? "pilier : tu es celui/celle sur qui on compte" : "connecteur : tu relie les gens entre eux"}.`, planet: 'sun', sign: sSign, aspect: sAsp },
    { text: `Neptune en ${nepSign} te rend perméable aux énergies des autres. Apprends à distinguer tes émotions de celles que tu absorbes — ce tri est la clé de ta sérénité sociale.`, planet: 'neptune', sign: nepSign },
    { text: `Pluton en ${plSign} transforme chaque relation significative en miroir. Les gens te montrent ce que tu refuses de voir en toi — et c'est un cadeau, même quand ça fait mal.`, planet: 'pluto', sign: plSign },
    { text: `Uranus en ${uraSign} te pousse à chercher des gens qui pensent différemment. Le conformisme social te suffoque — tu fleuris dans les cercles qui osent être décalés.`, planet: 'uranus', sign: uraSign },
    { text: `Élément dominant ${rc.dominantElement} : en groupe, tu apportes ${rc.dominantElement === 'Feu' ? "l'élan et l'enthousiasme" : rc.dominantElement === 'Eau' ? "l'empathie et la cohésion émotionnelle" : rc.dominantElement === 'Terre' ? "la stabilité et le sens pratique" : "la créativité et la stimulation intellectuelle"}. C'est ce qui te rend irremplaçable.`, planet: 'sun', sign: sSign },
    { text: `${rc.tenseAspects} aspects tendus dans ton ciel : tes amitiés les plus profondes sont nées de frictions. Tu ne t'attaches pas facilement — mais quand tu le fais, c'est pour de vrai.`, planet: 'venus', sign: vSign },
    { text: `Modalité ${rc.dominantModality} dans tes liens : tu as besoin de ${rc.dominantModality === 'Cardinal' ? "lancer des projets avec les autres" : rc.dominantModality === 'Fixe' ? "loyauté et constance dans tes amitiés" : "renouvellement et variété dans tes relations"}. C'est non-négociable.`, planet: 'venus', sign: vSign },
    ...(vAsp ? [{ text: `Vénus ${verbFor(vAsp.type)} ${PN[vAsp.planet1 === 'venus' ? vAsp.planet2 : vAsp.planet1]} : cette configuration colore chacune de tes interactions sociales. Tu ${vAsp.type === 'Trigone' || vAsp.type === 'Sextile' ? "charmes sans effort — les gens gravitent naturellement autour de toi" : "testes inconsciemment les gens avant de leur faire confiance"}.`, planet: 'venus', sign: vSign, aspect: vAsp }] : []),
    ...(mercAsp ? [{ text: `Mercure ${verbFor(mercAsp.type)} ${PN[mercAsp.planet1 === 'mercury' ? mercAsp.planet2 : mercAsp.planet1]} : ta communication a une complexité fascinante. ${mercAsp.type === 'Trigone' || mercAsp.type === 'Sextile' ? "Les mots te viennent facilement — mais c'est entre les lignes que tu brilles vraiment" : "Le malentendu te guette parfois, mais quand tu es compris(e), c'est une connexion fulgurante"}.`, planet: 'mercury', sign: mercSign, aspect: mercAsp }] : []),
    ...(mAsp ? [{ text: `Lune ${verbFor(mAsp.type)} ${PN[mAsp.planet1 === 'moon' ? mAsp.planet2 : mAsp.planet1]} : tes besoins émotionnels dans le groupe sont uniques. Tu ne cherches pas des amis — tu cherches des âmes qui résonnent à ta fréquence.`, planet: 'moon', sign: mSign, aspect: mAsp }] : []),
    ...(jupAsp ? [{ text: `Jupiter ${verbFor(jupAsp.type)} ${PN[jupAsp.planet1 === 'jupiter' ? jupAsp.planet2 : jupAsp.planet1]} : une expansion sociale se dessine. De nouvelles connexions arrivent — celles qui comptent, pas celles qui remplissent.`, planet: 'jupiter', sign: jupSign, aspect: jupAsp }] : []),
    ...(marsAsp ? [{ text: `Mars ${verbFor(marsAsp.type)} ${PN[marsAsp.planet1 === 'mars' ? marsAsp.planet2 : marsAsp.planet1]} : en société, tu oscilles entre retrait et affirmation. Cette dynamique n'est pas un défaut — c'est un instinct de survie ancestral.`, planet: 'mars', sign: marsSign, aspect: marsAsp }] : []),
    ...(sAsp ? [{ text: `${PN[sAsp.planet1]} ${verbFor(sAsp.type)} ${PN[sAsp.planet2]} : ton identité sociale est en perpétuelle redéfinition. C'est ce qui te rend impossible à étiqueter — et donc impossible à oublier.`, planet: 'sun', sign: sSign, aspect: sAsp }] : []),
    ...(rc.sunMercury ? [{ text: `Soleil ${verbFor(rc.sunMercury.type)} Mercure : ${rc.sunMercury.type === 'Conjonction' ? "ta pensée et ton identité fusionnent — tu ES ce que tu dis. Chaque mot porte ta signature" : "ta façon de t'exprimer révèle des couches de ta personnalité que tu ne montres pas autrement"}.`, planet: 'sun', sign: sSign, aspect: rc.sunMercury }] : []),
    ...(rc.sunVenus ? [{ text: `Soleil ${verbFor(rc.sunVenus.type)} Vénus : un charme naturel qui ne se force pas. Les gens sont attirés par ta lumière sans que tu aies besoin de la projeter.`, planet: 'sun', sign: sSign, aspect: rc.sunVenus }] : []),
    ...(rc.moonVenus ? [{ text: `Lune ${verbFor(rc.moonVenus.type)} Vénus : ${rc.moonVenus.type === 'Trigone' || rc.moonVenus.type === 'Sextile' ? "une douceur sociale innée. Les gens se sentent immédiatement en sécurité avec toi" : "une tension entre ce que tu ressens et ce que tu montres. Tes proches apprennent à lire entre tes lignes"}.`, planet: 'moon', sign: mSign, aspect: rc.moonVenus }] : []),
    ...(rc.mercuryVenus ? [{ text: `Mercure ${verbFor(rc.mercuryVenus.type)} Vénus : tes mots ont une grâce particulière. Tu sais dire les choses difficiles avec une élégance qui désarme.`, planet: 'mercury', sign: mercSign, aspect: rc.mercuryVenus }] : []),
    ...(rc.venusJupiter ? [{ text: `Vénus ${verbFor(rc.venusJupiter.type)} Jupiter : ton cercle social est voué à s'élargir. ${rc.venusJupiter.type === 'Trigone' || rc.venusJupiter.type === 'Sextile' ? "Les rencontres significatives viendront naturellement — laisse la porte ouverte" : "Tu oscilles entre vouloir tout le monde et vouloir personne. Trouve l'entre-deux"}.`, planet: 'venus', sign: vSign, aspect: rc.venusJupiter }] : []),
    ...(rc.venusSaturn ? [{ text: `Vénus ${verbFor(rc.venusSaturn.type)} Saturne : ${rc.venusSaturn.type === 'Carré' || rc.venusSaturn.type === 'Opposition' ? "la confiance sociale se gagne lentement chez toi. Mais chaque lien que tu formes est en titane — incassable" : "tu choisis tes proches avec une sagesse rare. Peu et bien plutôt que beaucoup et vide"}.`, planet: 'venus', sign: vSign, aspect: rc.venusSaturn }] : []),
    ...(rc.moonSaturn ? [{ text: `Lune ${verbFor(rc.moonSaturn.type)} Saturne : une maturité émotionnelle qui surpasse ton âge. En société, tu es souvent celui/celle vers qui on se tourne dans la tempête.`, planet: 'moon', sign: mSign, aspect: rc.moonSaturn }] : []),
    ...(rc.moonNeptune ? [{ text: `Lune ${verbFor(rc.moonNeptune.type)} Neptune : tu perçois les courants invisibles du groupe. Cette clairvoyance sociale est un don — mais apprends à ne pas tout porter sur tes épaules.`, planet: 'moon', sign: mSign, aspect: rc.moonNeptune }] : []),
    ...(rc.marsSaturn ? [{ text: `Mars ${verbFor(rc.marsSaturn.type)} Saturne : ${rc.marsSaturn.type === 'Carré' || rc.marsSaturn.type === 'Opposition' ? "les conflits sociaux te rongent plus que tu ne le montres. Mais cette tension forge un sens de la justice implacable" : "tu sais exactement quand agir et quand attendre dans tes relations. Ce timing est ton arme secrète"}.`, planet: 'mars', sign: marsSign, aspect: rc.marsSaturn }] : []),
    ...(rc.moonPluto ? [{ text: `Lune ${verbFor(rc.moonPluto.type)} Pluton : tes amitiés ne sont jamais superficielles. Tu transformes les gens qui t'entourent — et ils te transforment en retour. C'est un pacte cosmique.`, planet: 'moon', sign: mSign, aspect: rc.moonPluto }] : []),
    ...(rc.marsPluto ? [{ text: `Mars ${verbFor(rc.marsPluto.type)} Pluton : quand tu défends tes proches, tu dégages une puissance qui surprend même toi. Cette loyauté féroce est ta marque.`, planet: 'mars', sign: marsSign, aspect: rc.marsPluto }] : []),
    ...(rc.stellium ? [{ text: `Stellium en ${rc.stellium.sign} — ${rc.stellium.planets.map(p => PN[p]).join(', ')} concentrés. En société, tu polarises : on t'adore ou on ne te comprend pas. Ceux qui restent sont les bons.`, planet: rc.stellium.planets[0], sign: rc.stellium.sign }] : []),
  ];
};

const TEMPLATE_MAP: Record<string, TemplGen> = {
  amour: AMOR_TEMPLATES,
  travail: TRAVAIL_TEMPLATES,
  soi: SOI_TEMPLATES,
  avenir: AVENIR_TEMPLATES,
  social: SOCIAL_TEMPLATES,
  general: GENERAL_TEMPLATES,
};

function generateResponsesForChart(ch: ChartInfo): Record<string, VoidResponse[]> {
  const result: Record<string, VoidResponse[]> = {};
  for (const [cat, gen] of Object.entries(TEMPLATE_MAP)) {
    result[cat] = gen(ch);
  }
  return result;
}

function getVoidResponse(q: string, responses: Record<string, VoidResponse[]>): VoidResponse {
  const cat = detectCategory(q);
  const rs = responses[cat] || responses.general;
  // Mix hash with randomness for variety — same question can give different responses
  const h = q.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const offset = Math.floor(Math.random() * rs.length);
  return rs[(h + offset) % rs.length];
}

// ─── LocalStorage ───────────────────────────────────────────
const HK = 'void_history';
const BK = 'void_birth_data';
function loadH(): HistoryEntry[] { try { return JSON.parse(localStorage.getItem(HK) || '[]'); } catch { return []; } }
function saveH(h: HistoryEntry[]) { localStorage.setItem(HK, JSON.stringify(h.slice(0, 50))); }
function loadBD(): VoidBirthData | null { try { const d = localStorage.getItem(BK); return d ? JSON.parse(d) : null; } catch { return null; } }
function saveBD(d: VoidBirthData) { localStorage.setItem(BK, JSON.stringify(d)); }

// ─── Loader texts ───────────────────────────────────────────
const LOADER_TEXTS = [
  'Les étoiles consultent ton thème…',
  'Les planètes s\'alignent…',
  'L\'univers prépare ta réponse…',
  'Les astres déchiffrent ton ciel…',
  'Connexion au cosmos en cours…',
];

// ═══════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════
export default function TheVoid({ onBack }: { onBack?: () => void }) {
  // ─── Birth data ─────────────────────────────────────────
  const savedBD = loadBD();
  const [birthDate, setBirthDate] = useState(savedBD?.date || '');
  const [birthDateDisplay, setBirthDateDisplay] = useState(() => {
    if (!savedBD?.date) return '';
    const [y, m, d] = savedBD.date.split('-');
    return `${d}/${m}/${y}`;
  });
  const [birthTime, setBirthTime] = useState(savedBD?.time || '12:00');
  const [birthTimeDisplay, setBirthTimeDisplay] = useState(savedBD?.time || '12:00');
  const [birthCity, setBirthCity] = useState(savedBD?.city || CITIES[0].name);
  const [chartInfo, setChartInfo] = useState<ChartInfo | null>(null);

  // ─── App state ──────────────────────────────────────────
  const [screen, setScreen] = useState<Screen>(savedBD ? 'void' : 'birth-form');
  const [question, setQuestion] = useState('');
  const [resp, setResp] = useState<VoidResponse | null>(null);
  const [_cat, setCat] = useState('general');
  const [displayed, setDisplayed] = useState('');
  const [revealing, setRevealing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(loadH);
  const [, setFeedback] = useState<boolean | null>(null);
  const [pinned, setPinned] = useState(false);
  const [hearted, setHearted] = useState(false);
  const [chartSum, setChartSum] = useState('');
  const [, setRelatedSuggestions] = useState<string[]>([]);
  const [loaderText, setLoaderText] = useState('');
  const [activeCategory, setActiveCategory] = useState<VoidCategory>('soi');
  const [displayedQuestions, setDisplayedQuestions] = useState<Record<VoidCategory, string[]>>({
    soi: filterAndLimitQuestions(VOID_QUESTIONS_POOL.soi, []),
    amour: filterAndLimitQuestions(VOID_QUESTIONS_POOL.amour, []),
    travail: filterAndLimitQuestions(VOID_QUESTIONS_POOL.travail, []),
    social: filterAndLimitQuestions(VOID_QUESTIONS_POOL.social, []),
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);

  // ─── Compute chart ─────────────────────────────────────
  const computeChart = useCallback((bd: VoidBirthData) => {
    try {
      const city = CITIES.find(c => c.name === bd.city) || CITIES[0];
      const dateTime = parseBirthDateTime(bd.date, bd.time, city.tz);
      const ch = calculateBirthChart({ date: dateTime, latitude: bd.latitude || city.lat, longitude: bd.longitude || city.lon });
      const info: ChartInfo = { planetPositions: ch.planetPositions, aspects: ch.aspects };
      setChartInfo(info);
      setChartSum(`☉ ${ch.planetPositions.sun?.sign || '?'} · ☽ ${ch.planetPositions.moon?.sign || '?'}`);
    } catch (err) {
      console.error('Chart calc error:', err);
    }
  }, []);

  // Init chart from saved data
  useEffect(() => {
    if (savedBD && !chartInfo) computeChart(savedBD);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Memoized responses
  const responses = useMemo(() => {
    if (!chartInfo) return null;
    return generateResponsesForChart(chartInfo);
  }, [chartInfo]);

  // Auto-focus input when entering void screen
  useEffect(() => {
    if (screen === 'void') {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [screen]);

  // ─── Starry sky canvas ─────────────────────────────────
  useEffect(() => {
    const canvas = starsRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars: { x: number; y: number; r: number; a: number; s: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random(),
        s: Math.random() * 0.003 + 0.001,
      });
    }

    let frame = 0;
    let animId: number;
    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        const flicker = star.a + Math.sin(frame * star.s * 2 * Math.PI) * 0.3;
        const alpha = Math.max(0.05, Math.min(1, flicker));
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ─── Typewriter effect ─────────────────────────────────
  useEffect(() => {
    if (!revealing || !resp) return;
    const full = resp.text; let i = 0; setDisplayed('');
    const iv = setInterval(() => {
      if (i < full.length) { setDisplayed(full.slice(0, i + 1)); i++; }
      else { clearInterval(iv); setRevealing(false); }
    }, 30);
    return () => clearInterval(iv);
  }, [revealing, resp]);

  // Remélanger les questions quand on change de catégorie
  useEffect(() => {
    const askedQuestions = history.map(h => h.question);
    setDisplayedQuestions(prev => ({
      ...prev,
      [activeCategory]: filterAndLimitQuestions(VOID_QUESTIONS_POOL[activeCategory], askedQuestions),
    }));
  }, [activeCategory, history]);

  // ─── Form handlers ─────────────────────────────────────
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let formatted = '';
    if (value.length > 0) { formatted = value.slice(0, 2); }
    if (value.length > 2) { formatted += '/' + value.slice(2, 4); }
    if (value.length > 4) { formatted += '/' + value.slice(4, 8); }
    setBirthDateDisplay(formatted);
    if (value.length === 8) {
      const day = value.slice(0, 2), month = value.slice(2, 4), year = value.slice(4, 8);
      setBirthDate(`${year}-${month}-${day}`);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let formatted = '';
    if (value.length > 0) { formatted = value.slice(0, 2); }
    if (value.length > 2) { formatted += ':' + value.slice(2, 4); }
    setBirthTimeDisplay(formatted);
    if (value.length >= 4) {
      const hours = value.slice(0, 2), minutes = value.slice(2, 4);
      setBirthTime(`${hours}:${minutes}`);
    }
  };

  const handleBirthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const city = CITIES.find(c => c.name === birthCity) || CITIES[0];
    const bd: VoidBirthData = { date: birthDate, time: birthTime, city: birthCity, latitude: city.lat, longitude: city.lon };
    saveBD(bd);
    computeChart(bd);
    setScreen('void');
  };

  const canSubmitBirth = birthDate.length === 10 && birthTime.length === 5;

  // ─── Navigation ─────────────────────────────────────────
  const goVoid = useCallback(() => {
    setScreen('void'); setQuestion(''); setResp(null); setDisplayed('');
    setBlocked(false); setFeedback(null); setPinned(false); setHearted(false);
    setShowMenu(false);
    // Renouveller les questions affichées (filtrées des questions déjà posées)
    const askedQuestions = history.map(h => h.question);
    setDisplayedQuestions({
      soi: filterAndLimitQuestions(VOID_QUESTIONS_POOL.soi, askedQuestions),
      amour: filterAndLimitQuestions(VOID_QUESTIONS_POOL.amour, askedQuestions),
      travail: filterAndLimitQuestions(VOID_QUESTIONS_POOL.travail, askedQuestions),
      social: filterAndLimitQuestions(VOID_QUESTIONS_POOL.social, askedQuestions),
    });
  }, [history]);

  const submit = useCallback(() => {
    const q = question.trim();
    if (!q || !responses) return;
    if (isBlocked(q)) { setBlocked(true); return; }
    setBlocked(false); setScreen('result'); setLoading(true);
    setFeedback(null); setPinned(false); setHearted(false);
    setLoaderText(LOADER_TEXTS[Math.floor(Math.random() * LOADER_TEXTS.length)]);
    const c = detectCategory(q); setCat(c);
    setTimeout(() => {
      const r = getVoidResponse(q, responses);
      setResp(r); setLoading(false); setRevealing(true);
      setRelatedSuggestions(getRandomSuggestions(c, 3));
      const entry: HistoryEntry = { question: q, response: r, pinned: false, liked: null, timestamp: Date.now() };
      const nh = [entry, ...history];
      setHistory(nh); saveH(nh);
    }, 1800);
  }, [question, history, responses]);

  const doShare = useCallback(() => {
    if (!resp) return;
    const t = `✨ The Void :\n\n« ${resp.text} »\n\n— ${PS[resp.planet]} ${PN[resp.planet]} en ${resp.sign}`;
    navigator.share ? navigator.share({ text: t }).catch(() => {}) : navigator.clipboard.writeText(t).catch(() => {});
  }, [resp]);

  const doPin = useCallback(() => {
    setPinned(p => !p);
    if (history.length) { const nh = [...history]; nh[0] = { ...nh[0], pinned: !pinned }; setHistory(nh); saveH(nh); }
  }, [history, pinned]);

  const fmtText = (text: string) => {
    const ew = ['force','lave','eau','phénix','alchimie','superpouvoir','cathédrale','rêve','vérité','lumière','ombres','feu','océan','trésor','boussole','renaissance','métamorphose','volcan','inarrêtable','nager','sixième sens','permission','étoiles','gestation','rayonner','laser','flamme','braise','montagne','ancrage','envol','profondeurs','vent','racine'];
    let r = text;
    ew.forEach(w => { r = r.replace(new RegExp(`(${w})`, 'gi'), '**$1**'); });
    return r.split(/\*\*(.*?)\*\*/g).map((p, i) =>
      i % 2 === 1 ? <span key={i} className="void-emph">{p}</span> : <span key={i}>{p}</span>
    );
  };

  // ═══ RENDER ═══
  return (
    <div className="void-page">
      <canvas ref={starsRef} className="tv-stars-canvas" />

      {/* ═══ ÉCRAN 0 : FORMULAIRE NAISSANCE ═══ */}
      {screen === 'birth-form' && (
        <div className="tv-page tv-emerge">
          {onBack && (
            <button onClick={onBack} className="tv-corner-btn tv-corner-left" aria-label="Retour">
              <ArrowLeft size={18} />
            </button>
          )}
          <div className="tv-center">
            <form onSubmit={handleBirthSubmit} className="tv-birth-form">
              <p className="tv-birth-hint">Pour que le vide te réponde, il a besoin de savoir quand tu es né(e).</p>
              <div className="tv-birth-fields">
                <div>
                  <label className="tv-birth-label"><Calendar size={12} /> Naissance</label>
                  <input type="text" value={birthDateDisplay} onChange={handleDateChange} placeholder="JJ/MM/AAAA" maxLength={10} className="tv-birth-input" required autoFocus aria-label="Date de naissance" />
                </div>
                <div>
                  <label className="tv-birth-label"><Clock size={12} /> Heure</label>
                  <input type="text" value={birthTimeDisplay} onChange={handleTimeChange} placeholder="HH:MM" maxLength={5} className="tv-birth-input" required aria-label="Heure de naissance" />
                </div>
                <div>
                  <label className="tv-birth-label"><MapPin size={12} /> Lieu</label>
                  <select value={birthCity} onChange={e => setBirthCity(e.target.value)} className="tv-birth-input" aria-label="Lieu de naissance">
                    {CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" disabled={!canSubmitBirth} className="tv-birth-submit">
                Entrer dans le vide
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ═══ ÉCRAN 1 : THE VOID ═══ */}
      {screen === 'void' && (
        <div className="tv-page tv-emerge">
          {onBack && (
            <button onClick={onBack} className="tv-corner-btn tv-corner-left" aria-label="Quitter">
              <X size={18} />
            </button>
          )}
          <button className="tv-corner-btn tv-corner-right" onClick={() => setShowMenu(m => !m)} aria-label="Menu">
            {showMenu ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Catégories */}
          <div className="tv-categories">
            {VOID_CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`tv-category-btn ${isActive ? 'active' : ''}`}
                  aria-pressed={isActive}
                  title={cat.label}
                >
                  <div className="tv-cat-icon-ring" style={isActive ? { borderColor: cat.color, boxShadow: `0 0 16px ${cat.color}33, 0 0 32px ${cat.color}18, inset 0 0 10px ${cat.color}12` } : {}}>
                    <Icon />
                  </div>
                  <span className="tv-cat-label" style={isActive ? { color: cat.color } : {}}>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Questions prédéfinies */}
          <div className="tv-questions-zone" key={activeCategory}>
            {displayedQuestions[activeCategory].map((q, i) => (
              <button
                key={q}
                className="tv-question-item"
                style={{ animationDelay: `${i * 70}ms` }}
                onClick={() => { setQuestion(q.charAt(0) + q.slice(1).toLowerCase()); inputRef.current?.focus(); }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Champ de saisie en bas */}
          <div className="tv-bottom-input">
            <div className="tv-input-wrap-v2">
              <input
                ref={inputRef}
                type="text"
                value={question}
                onChange={e => { setQuestion(e.target.value); setBlocked(false); }}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
                placeholder="DEMANDE CE QUE TU VEUX…"
                className="tv-input-field-v2"
                autoComplete="off"
                spellCheck={false}
                aria-label="Pose ta question"
              />
              <button onClick={submit} disabled={!question.trim()} className="tv-send-icon-v2" aria-label="Envoyer">
                <Send size={18} />
              </button>
            </div>

            {blocked && (
              <div className="tv-blocked tv-emerge" style={{ marginTop: 12 }}>
                <p className="tv-blocked-text">Le vide ne peut répondre à cela.</p>
                <div className="tv-blocked-alts">
                  {BLOCKED_ALTERNATIVES.map(a => (
                    <button key={a} onClick={() => { setQuestion(a); setBlocked(false); }} className="tv-blocked-btn">{a}</button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {showMenu && (
            <div className="tv-menu-overlay" onClick={() => setShowMenu(false)}>
              <div className="tv-menu-panel tv-emerge" onClick={e => e.stopPropagation()}>
                {chartSum && <p className="tv-menu-chart">{chartSum}</p>}
                <button onClick={() => { setShowMenu(false); setScreen('birth-form'); }} className="tv-menu-item">
                  <RotateCcw size={14} /> Changer mes données
                </button>
                {onBack && (
                  <button onClick={onBack} className="tv-menu-item">
                    <ArrowLeft size={14} /> Retour à AstroThème
                  </button>
                )}
                {history.length > 0 && (
                  <div className="tv-menu-history">
                    <p className="tv-menu-history-label">Récent</p>
                    {history.slice(0, 5).map((e, i) => (
                      <button key={i} onClick={() => {
                        setShowMenu(false);
                        setQuestion(e.question); setResp(e.response); setCat(detectCategory(e.question));
                        setDisplayed(e.response.text); setRevealing(false); setLoading(false);
                        setFeedback(e.liked); setPinned(e.pinned); setScreen('result');
                      }} className="tv-menu-hist-item">
                        <span>« {e.question} »</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ ÉCRAN 2 : RÉSULTAT ═══ */}
      {screen === 'result' && (
        <div className="tv-page tv-emerge">
          <button onClick={goVoid} className="tv-corner-btn tv-corner-left" aria-label="Retour">
            <X size={18} />
          </button>

          <div className="tv-center">
            {loading ? (
              <div className="tv-loading">
                <div className="tv-loading-dot" />
                <p className="tv-loading-text">{loaderText}</p>
              </div>
            ) : (
              <div className="tv-response tv-emerge">
                <p className="tv-response-question">« {question} »</p>
                <p className="tv-response-text">
                  {revealing ? <>{displayed}<span className="tv-cursor-blink" /></> : resp && fmtText(resp.text)}
                </p>

                {!revealing && resp && (
                  <>
                    <p className="tv-response-source">
                      {PS[resp.planet]} {PN[resp.planet]} en {resp.sign}
                      {resp.aspect && ` · ${PS[resp.aspect.planet1]} ${AS[resp.aspect.type]} ${PS[resp.aspect.planet2]}`}
                    </p>

                    <div className="tv-response-actions">
                      <button onClick={() => setHearted(h => !h)} className={`tv-action-btn ${hearted ? 'active' : ''}`} aria-label="Aimer">
                        <Heart size={14} fill={hearted ? '#fff' : 'none'} />
                      </button>
                      <button onClick={doPin} className={`tv-action-btn ${pinned ? 'active' : ''}`} aria-label="Épingler">
                        <Pin size={14} />
                      </button>
                      <button onClick={doShare} className="tv-action-btn" aria-label="Partager">
                        <Share2 size={14} />
                      </button>
                    </div>

                    <button onClick={goVoid} className="tv-ask-again">
                      Poser une autre question
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
