import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  Send, RotateCcw, Heart, Pin, Share2, X,
  ArrowLeft, Clock, MapPin, Calendar, Menu, Sparkles, ChevronRight,
} from 'lucide-react';
import { fetchVoidCloudData, pushVoidCloudData } from '../lib/voidSync';

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
  { name: 'Paris', lat: 48.8566, lon: 2.3522, tz: 'Europe/Paris' },
  { name: 'Lyon', lat: 45.7640, lon: 4.8357, tz: 'Europe/Paris' },
  { name: 'Marseille', lat: 43.2965, lon: 5.3698, tz: 'Europe/Paris' },
  { name: 'Toulouse', lat: 43.6047, lon: 1.4442, tz: 'Europe/Paris' },
  { name: 'Bordeaux', lat: 44.8378, lon: -0.5792, tz: 'Europe/Paris' },
  { name: 'Lille', lat: 50.6292, lon: 3.0573, tz: 'Europe/Paris' },
  { name: 'Nice', lat: 43.7102, lon: 7.2620, tz: 'Europe/Paris' },
  { name: 'Nantes', lat: 47.2184, lon: -1.5536, tz: 'Europe/Paris' },
  { name: 'Strasbourg', lat: 48.5734, lon: 7.7521, tz: 'Europe/Paris' },
  { name: 'Montpellier', lat: 43.6108, lon: 3.8767, tz: 'Europe/Paris' },
  { name: 'Bruxelles', lat: 50.8503, lon: 4.3517, tz: 'Europe/Brussels' },
  { name: 'Genève', lat: 46.2044, lon: 6.1432, tz: 'Europe/Zurich' },
  { name: 'Londres', lat: 51.5074, lon: -0.1278, tz: 'Europe/London' },
  { name: 'New York', lat: 40.7128, lon: -74.0060, tz: 'America/New_York' },
  { name: 'Los Angeles', lat: 34.0522, lon: -118.2437, tz: 'America/Los_Angeles' },
];

// Calcule le décalage UTC réel (en heures) d'un fuseau IANA pour une date précise,
// en tenant compte de l'heure d'été/hiver — contrairement à un simple offset fixe
// à l'année (ex. Paris n'est pas toujours UTC+1 : c'est UTC+2 l'été).
function getUtcOffsetHours(naiveUtcDate: Date, timeZone: string): number {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'shortOffset',
      hour: '2-digit',
    }).formatToParts(naiveUtcDate);
    const offsetPart = parts.find(p => p.type === 'timeZoneName')?.value || 'GMT+0';
    const match = offsetPart.match(/GMT([+-]\d+)(?::(\d+))?/);
    if (!match) return 0;
    const hours = parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) / 60 : 0;
    return hours >= 0 ? hours + minutes : hours - minutes;
  } catch {
    return 0;
  }
}

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
// Expressions idiomatiques courantes et inoffensives contenant des mots
// autrement bloqués (ex. "tuer le temps", "mourir de rire") — on les retire
// du texte avant de tester les motifs bloqués, sans jamais toucher aux
// mots isolés ("mourir", "tuer"...) qui doivent, eux, rester bloqués.
const SAFE_IDIOM_PATTERNS = [
  /tuer le temps/gi,
  /mourir de rire/gi,
  /mort de rire/gi,
  /mourir de faim/gi,
  /mort de faim/gi,
  /mourir d'envie/gi,
];
const BLOCKED_ALTERNATIVES = [
  'Comment puis-je trouver la paix intérieure ?',
  'Que me réservent les étoiles cette semaine ?',
  'Quel est mon plus grand potentiel ?',
];



// ─── Catégories void ────────────────────────────────────────
type VoidCategory = 'soi' | 'amour' | 'travail' | 'social';

// Nombre de questions gratuites autorisées par jour dans le Vide.
const FREE_DAILY_QUESTIONS = 1;

const VOID_CATEGORIES: { id: VoidCategory; label: string; symbol: string; icon: EsotericIcon; color: string }[] = [
  { id: 'soi', label: 'MOI', symbol: '✦', icon: EsotericEye, color: '#c4a0ff' },
  { id: 'amour', label: 'AMOUR', symbol: '♡', icon: EsotericMoon, color: '#ff8fa3' },
  { id: 'travail', label: 'TRAVAIL', symbol: '⬥', icon: EsotericTriangle, color: '#ffd07a' },
  { id: 'social', label: 'SOCIAL', symbol: '⊹', icon: EsotericConstellation, color: '#7ecfcf' },
];

// Toutes les catégories possibles pour une réponse (les 4 ci-dessus + les 2
// catégories "libres" détectées par detectCategory à partir d'une question tapée).
const CATEGORY_BADGE: Record<string, { label: string; color: string }> = {
  soi: { label: 'Toi', color: '#c4a0ff' },
  amour: { label: 'Amour', color: '#ff8fa3' },
  travail: { label: 'Travail', color: '#ffd07a' },
  social: { label: 'Social', color: '#7ecfcf' },
  avenir: { label: 'Avenir', color: '#8fb8ff' },
  general: { label: 'Général', color: 'rgba(255,255,255,0.6)' },
};

function shuffleQuestions<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function filterAndLimitQuestions(pool: string[], askedQuestions: string[], limit: number = 5): string[] {
  const askedSet = new Set(askedQuestions.map(q => q.toUpperCase()));
  const available = pool.filter(q => !askedSet.has(q.toUpperCase()));
  return shuffleQuestions(available).slice(0, limit);
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
    'QUE ME RÉVÈLE MON SILENCE',
    'POURQUOI J\'AI PEUR DE RÉUSSIR',
    'QU\'EST-CE QUE JE FUIS EN CE MOMENT',
    'COMMENT ARRÊTER DE ME COMPARER AUX AUTRES',
    'QUELLE VERSION DE MOI DOIS-JE LAISSER PARTIR',
    'SUIS-JE TROP DUR(E) AVEC MOI-MÊME',
    'QU\'EST-CE QUI ME REND VRAIMENT UNIQUE',
    'COMMENT ACCEPTER MES CONTRADICTIONS',
    'POURQUOI J\'AI DU MAL À ME REPOSER',
    'QUEL EST MON RAPPORT AU CONTRÔLE',
    'COMMENT SAVOIR CE QUE JE VEUX VRAIMENT',
    'QU\'EST-CE QUE MON CORPS ESSAIE DE ME DIRE',
    'SUIS-JE FIDÈLE À MES VALEURS',
    'POURQUOI JE ME SENS DÉCALÉ(E)',
    'QUEL RÔLE JOUE LA PEUR DANS MES CHOIX',
    'COMMENT HONORER MA SENSIBILITÉ',
    'QU\'EST-CE QUE JE DOIS PARDONNER EN MOI',
    'SUIS-JE PRÊT(E) À CHANGER',
    'QUELLE PARTIE DE MOI AI-JE ABANDONNÉE',
    'COMMENT ARRÊTER DE ME JUSTIFIER',
    'POURQUOI JE REPOUSSE TOUJOURS LE MÊME PROJET',
    'QU\'EST-CE QUE LA LIBERTÉ SIGNIFIE POUR MOI',
    'SUIS-JE À L\'ÉCOUTE DE MON INTUITION',
    'COMMENT SORTIR DE MA ZONE DE CONFORT SANS ME PERDRE',
    'QUEL HÉRITAGE FAMILIAL DOIS-JE QUESTIONNER',
    'POURQUOI JE ME SENS EXTÉNUÉ(E) SANS RAISON',
    'QU\'EST-CE QUI DONNE VRAIMENT DU SENS À MA VIE',
    'SUIS-JE EN PAIX AVEC MON PASSÉ',
    'COMMENT CULTIVER PLUS DE PATIENCE ENVERS MOI-MÊME',
    'QUELLE VÉRITÉ SUR MOI AI-JE DU MAL À ACCEPTER',
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
    'QUE DOIS-JE APPRENDRE DE MA DERNIÈRE RUPTURE',
    'COMMENT ARRÊTER D\'IDÉALISER L\'AUTRE',
    'SUIS-JE CAPABLE DE VULNÉRABILITÉ EN AMOUR',
    'POURQUOI J\'AI PEUR D\'ÊTRE ABANDONNÉ(E)',
    'QUEL EST MON LANGAGE AMOUREUX',
    'COMMENT SAVOIR SI JE SUIS PRÊT(E) POUR UNE RELATION SÉRIEUSE',
    'QU\'EST-CE QUE JE PROJETTE SUR MES PARTENAIRES',
    'DOIS-JE DONNER UNE DEUXIÈME CHANCE',
    'COMMENT DIFFÉRENCIER AMOUR ET HABITUDE',
    'POURQUOI JE M\'ATTACHE SI VITE',
    'QUELLE BLESSURE D\'ENFANCE REJOUE DANS MES RELATIONS',
    'SUIS-JE AMOUREUX(SE) OU AMOUREUX(SE) DE L\'IDÉE',
    'COMMENT GUÉRIR AVANT DE RENCONTRER QUELQU\'UN',
    'QUE CACHE MA PEUR DE LA SOLITUDE',
    'DOIS-JE EXPRIMER CE QUE JE RESSENS MAINTENANT',
    'COMMENT ARRÊTER DE FUIR L\'INTIMITÉ',
    'QUEL RÔLE JOUE LA JALOUSIE DANS MA VIE AMOUREUSE',
    'SUIS-JE PRÊT(E) À ÊTRE VU(E) TEL(LE) QUE JE SUIS',
    'POURQUOI J\'AI DU MAL À RECEVOIR DE L\'AMOUR',
    'COMMENT SAVOIR SI CETTE RELATION A UN AVENIR',
    'QUEL EST MON PLUS GRAND BESOIN NON EXPRIMÉ EN COUPLE',
    'DOIS-JE ME REFAIRE CONFIANCE APRÈS AVOIR ÉTÉ TRAHI(E)',
    'COMMENT AIMER SANS ME DILUER',
    'QU\'EST-CE QUI ME REND DIFFICILE À AIMER',
    'SUIS-JE EN TRAIN DE ME SABOTER PAR PEUR DU BONHEUR',
    'POURQUOI JE CHOISIS DES PERSONNES INDISPONIBLES',
    'COMMENT RECONNAÎTRE UN AMOUR SAIN',
    'QUELLE PART DE MOI DOIS-JE GUÉRIR AVANT D\'AIMER PLEINEMENT',
    'DOIS-JE ATTENDRE OU PROVOQUER LA RENCONTRE',
    'QU\'EST-CE QUE CETTE RELATION M\'ENSEIGNE VRAIMENT',
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
    'COMMENT SAVOIR QUAND IL FAUT PARTIR',
    'QUEL EST LE PROCHAIN PALIER DE MA CARRIÈRE',
    'SUIS-JE PAYÉ(E) À MA JUSTE VALEUR',
    'POURQUOI J\'AI PEUR DE NÉGOCIER',
    'COMMENT ARRÊTER DE PROCRASTINER SUR CE PROJET',
    'QU\'EST-CE QUI FREINE VRAIMENT MON AMBITION',
    'DOIS-JE ACCEPTER CETTE OFFRE',
    'COMMENT GÉRER UN COLLÈGUE OU UN(E) SUPÉRIEUR(E) DIFFICILE',
    'SUIS-JE ENCORE ALIGNÉ(E) AVEC MES OBJECTIFS DE DÉPART',
    'QUEL EST LE COÛT DE RESTER DANS MA ZONE DE CONFORT',
    'COMMENT TROUVER L\'ÉQUILIBRE ENTRE TRAVAIL ET VIE PERSONNELLE',
    'POURQUOI JE RESSENS AUTANT LE SYNDROME DE L\'IMPOSTEUR',
    'QUEL PROJET DEVRAIS-JE ABANDONNER',
    'COMMENT REPRENDRE CONFIANCE APRÈS UN ÉCHEC PROFESSIONNEL',
    'SUIS-JE ENTOURÉ(E) DES BONNES PERSONNES AU TRAVAIL',
    'QU\'EST-CE QUI ME MANQUE POUR PASSER À L\'ÉTAPE SUIVANTE',
    'DOIS-JE INVESTIR DANS CE PROJET MAINTENANT',
    'COMMENT ARRÊTER DE TOUT VOULOIR CONTRÔLER AU TRAVAIL',
    'QUELLE COMPÉTENCE DEVRAIS-JE DÉVELOPPER EN PRIORITÉ',
    'POURQUOI JE ME SENS EN COMPÉTITION PERMANENTE',
    'SUIS-JE FAIT(E) POUR L\'ENTREPRENARIAT',
    'COMMENT SAVOIR SI C\'EST LE BON MOMENT POUR CHANGER DE VOIE',
    'QUEL EST LE SENS PROFOND DE MON TRAVAIL ACTUEL',
    'DOIS-JE PRENDRE PLUS D\'ESPACE DANS MON ÉQUIPE',
    'COMMENT NE PLUS ME COMPARER À DES COLLÈGUES PLUS RAPIDES',
    'QU\'EST-CE QUE LA RÉUSSITE SIGNIFIE VRAIMENT POUR MOI',
    'SUIS-JE PRÊT(E) À PRENDRE PLUS DE RESPONSABILITÉS',
    'POURQUOI J\'AI DU MAL À DÉLÉGUER',
    'COMMENT TRANSFORMER LA PRESSION EN MOTEUR',
    'QUEL SIGNE DOIS-JE ÉCOUTER POUR CHANGER DE CAP',
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
    'COMMENT SAVOIR QUI EST SINCÈRE AVEC MOI',
    'POURQUOI JE ME SENS DIFFÉRENT(E) DE MON ENTOURAGE',
    'QUEL EST MON RÔLE DANS LES CONFLITS QUE JE VIS',
    'SUIS-JE TROP DÉPENDANT(E) DU REGARD DES AUTRES',
    'COMMENT SORTIR DE L\'ISOLEMENT',
    'QU\'EST-CE QUI ATTIRE LES PERSONNES TOXIQUES DANS MA VIE',
    'DOIS-JE PARDONNER À UN(E) AMI(E) QUI M\'A DÉÇU(E)',
    'COMMENT ME FAIRE DE NOUVEAUX AMIS À CETTE ÉTAPE DE MA VIE',
    'POURQUOI JE ME SENS DE TROP DANS CERTAINS GROUPES',
    'QUEL LIEN AI-JE BESOIN DE RÉPARER',
    'SUIS-JE UN(E) BON(NE) AMI(E) POUR LES AUTRES',
    'COMMENT AFFIRMER MON OPINION SANS PEUR DU JUGEMENT',
    'QU\'EST-CE QUE MA FAMILLE ATTEND DE MOI QUE JE NE VEUX PLUS PORTER',
    'DOIS-JE PRENDRE MES DISTANCES AVEC UN MEMBRE DE MA FAMILLE',
    'COMMENT ARRÊTER DE CHERCHER L\'APPROBATION DE TOUS',
    'POURQUOI CERTAINES PERSONNES ME DRAINENT',
    'QUEL TYPE DE COMMUNAUTÉ ME FERAIT VRAIMENT DU BIEN',
    'SUIS-JE TROP DISPONIBLE POUR LES AUTRES',
    'COMMENT GÉRER LA DISTANCE AVEC UN PROCHE',
    'QU\'EST-CE QUE LA LOYAUTÉ SIGNIFIE VRAIMENT POUR MOI',
    'DOIS-JE PARLER OU LAISSER PASSER CETTE TENSION',
    'COMMENT RECONNAÎTRE UNE AMITIÉ QUI M\'ÉLÈVE',
    'POURQUOI J\'AI PEUR DE DÉCEVOIR MON ENTOURAGE',
    'QUEL MASQUE SOCIAL DOIS-JE ENFIN RETIRER',
    'SUIS-JE ENTOURÉ(E) DE GENS QUI ME RESSEMBLENT VRAIMENT',
    'COMMENT ARRÊTER DE M\'EFFACER DEVANT LES AUTRES',
    'QU\'EST-CE QUE MES AMITIÉS RÉVÈLENT DE MOI',
    'DOIS-JE RENOUER AVEC UNE PERSONNE DU PASSÉ',
    'COMMENT TROUVER MA PLACE DANS UN NOUVEAU GROUPE',
    'QUEL EST LE PRIX QUE JE PAIE POUR APPARTENIR',
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

function getRandomSuggestions(category: string, askedQuestions: string[], count: number = 3): string[] {
  const pool = [...(ALL_SUGGESTIONS[category] || []), ...(ALL_SUGGESTIONS.general || [])];
  return filterAndLimitQuestions(pool, askedQuestions, count);
}

// ─── Catégorisation ─────────────────────────────────────────
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  amour: ['amour','aimer','couple','relation','cœur','coeur','crush','ex','mariage','âme sœur','célibataire','sentiments','amoureuse','amoureux','copain','copine','love','romantique','passion','désir','intimité','rupture','séparation','aime'],
  travail: ['travail','carrière','job','emploi','argent','business','entreprise','projet','succès','réussite','ambition','profession','métier','études','promotion','salaire','finances','objectif','mission','quitter'],
  soi: ['moi','qui suis-je','identité','personnalité','confiance','estime','suis-je','force','faiblesse','qualité','talent','potentiel','grandir','évoluer','comprendre','pourquoi je','prêt'],
  avenir: ['avenir','futur','demain','prochain','attendre','prédiction','destin','destinée','chemin','direction','quand','bientôt','changement','nouveau'],
  social: ['ami','amis','amitié','entourage','groupe','solitude','seul','seule','gens','monde','autres','famille','frère','sœur','parent','conflit','lien','liens','réseau','communauté','appartenir','comprend','allié','alliés','toxique','sociable','populaire','rejet','exclusion','isolé'],
};

function normalizeForMatch(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
function detectCategory(q: string): string {
  const n = normalizeForMatch(q.toLowerCase());
  let best = 'general', bestS = 0;
  for (const [cat, kws] of Object.entries(CATEGORY_KEYWORDS)) {
    let s = 0;
    for (const kw of kws) {
      const nkw = normalizeForMatch(kw).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (new RegExp(`\\b${nkw}\\b`, 'i').test(n)) s++;
    }
    if (s > bestS) { bestS = s; best = cat; }
  }
  return best;
}
function isBlocked(q: string): boolean {
  let stripped = q;
  SAFE_IDIOM_PATTERNS.forEach(idiom => { stripped = stripped.replace(idiom, ''); });
  return BLOCKED_PATTERNS.some(p => p.test(stripped));
}

// ─── Symboles ───────────────────────────────────────────────
const AS: Record<string, string> = { 'Conjonction':'☌', 'Trigone':'△', 'Carré':'□', 'Opposition':'☍', 'Sextile':'⚹' };
const PS: Record<string, string> = { sun:'☉', moon:'☽', mercury:'☿', venus:'♀', mars:'♂', jupiter:'♃', saturn:'♄', uranus:'♅', neptune:'♆', pluto:'♇' };
const PN: Record<string, string> = { sun:'Soleil', moon:'Lune', mercury:'Mercure', venus:'Vénus', mars:'Mars', jupiter:'Jupiter', saturn:'Saturne', uranus:'Uranus', neptune:'Neptune', pluto:'Pluton' };
const PLANET_THEMES: Record<string, string> = {
  sun: 'ton identité, ton élan vital et la manière dont tu prends ta place',
  moon: 'tes besoins émotionnels, tes réflexes intimes et ce qui te sécurise',
  mercury: 'ta pensée, ta parole et la façon dont tu donnes du sens aux événements',
  venus: 'tes valeurs, ton désir de lien et ta manière de recevoir l’affection',
  mars: 'ton désir, ta volonté et la façon dont tu passes à l’action',
  jupiter: 'ce qui t’aide à grandir, à croire et à élargir ton horizon',
  saturn: 'tes limites, tes responsabilités et ce que tu apprends à construire',
  uranus: 'ton besoin de liberté, de rupture et de renouvellement',
  neptune: 'ton intuition, ton imaginaire et les zones où tes frontières deviennent plus fines',
  pluto: 'tes transformations profondes, ton pouvoir et ce que tu ne peux plus éviter',
};

function structureVoidResponse(text: string) {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(sentence => sentence.trim()).filter(Boolean) || [text];
  return {
    essence: sentences[0] || text,
    explanation: sentences.slice(1).join(' '),
  };
}

function getVoidAction(category: string): string {
  if (category === 'amour') return 'Aujourd’hui, formule clairement un besoin affectif au lieu d’attendre qu’il soit deviné.';
  if (category === 'travail') return 'Aujourd’hui, choisis une décision concrète et accomplis-en la première étape, même imparfaite.';
  if (category === 'social') return 'Aujourd’hui, observe le lien dans lequel tu peux être pleinement toi sans ajuster ta lumière.';
  return 'Aujourd’hui, note la première réaction que ce message provoque en toi avant de chercher à l’expliquer.';
}

function getSourceExplanation(response: VoidResponse): string {
  const planetName = PN[response.planet] || response.planet;
  const theme = PLANET_THEMES[response.planet] || 'une zone sensible de ton thème';
  const aspect = response.aspect
    ? ` L’aspect ${PS[response.aspect.planet1]} ${AS[response.aspect.type]} ${PS[response.aspect.planet2]} précise la dynamique qui s’active.`
    : '';
  return `${planetName} en ${response.sign} éclaire ${theme}.${aspect}`;
}

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
  // Le moteur d'aspects (astrology.ts) range toujours planet1/planet2 selon un
  // ordre canonique fixe (Soleil, Lune, Mercure, Vénus...), pas selon la planète
  // demandée ici. On normalise pour que `planet` soit toujours le sujet
  // grammatical (planet1) des templates qui utilisent PN[x.planet1] ... PN[x.planet2].
  if (a.planet2 === planet) {
    return { planet1: a.planet2, planet2: a.planet1, type: a.type };
  }
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
    { text: `Vénus en ${vSign} ne connaît pas la demi-mesure : ${SIGN_ELEMENT[vSign] === 'Feu' ? "elle embrase, vite et sans détour" : SIGN_ELEMENT[vSign] === 'Eau' ? "elle s'infiltre, lente et profonde comme une marée qui monte" : SIGN_ELEMENT[vSign] === 'Terre' ? "elle s'ancre, patiente comme une racine qui ne se voit pas pousser" : "elle circule, vive comme une conversation qui refuse de finir"}. C'est ainsi que tu aimes — rien ne t'obligera à aimer autrement.`, planet: 'venus', sign: vSign, aspect: vAsp },
    { text: `Ta Lune en ${mSign} garde en mémoire chaque silence un peu trop long, chaque regard qui a fui une seconde de trop. Ce n'est pas de la méfiance — c'est un capteur d'une précision que la plupart des gens n'ont jamais eu à développer.`, planet: 'moon', sign: mSign, aspect: mAsp },
    { text: `Mars en ${marsSign} : ton désir ne demande la permission à personne. Il se lève, il avance — tant pis si le monde n'était pas prêt à l'accueillir.`, planet: 'mars', sign: marsSign },
    { text: `Jupiter en ${jupSign} garde une porte entrouverte quelque part dans ton cœur, même les jours où tu jures l'avoir condamnée. C'est ta part increvable — celle qui continue de croire, après tout.`, planet: 'jupiter', sign: jupSign },
    { text: `Saturne en ${satSign} a posé une règle dans ton cœur que tu n'as jamais formulée à voix haute : on n'entre pas ici sans avoir prouvé qu'on reste. Les feux de paille se cognent contre ce mur, et c'est très bien ainsi.`, planet: 'saturn', sign: satSign },
    { text: `Neptune en ${nepSign} floute les contours de qui tu aimes, juste assez pour que tu tombes. C'est nécessaire au début — dangereux si tu n'atterris jamais.`, planet: 'neptune', sign: nepSign },
    { text: `Pluton en ${plSign} ne fait pas dans la romance de surface. Il t'oblige à descendre, à regarder ce qu'il y a sous le vernis de l'autre — et ce que tu y trouves te terrifie autant que ça te délivre.`, planet: 'pluto', sign: plSign },
    { text: `Soleil en ${sSign}, Vénus en ${vSign} : qui tu es et ce que tu désires ${sSign === vSign ? "parlent la même langue depuis toujours — un luxe rare" : "négocient sans cesse, comme deux voix qui s'entêtent à ne pas chanter la même note. C'est cette tension qui te rend intéressant(e) à aimer"}.`, planet: 'sun', sign: sSign },
    { text: `${rc.dominantModality} avant tout : en amour, tu ${MODALITY_WORDS[rc.dominantModality]}. Ce n'est pas un trait à corriger — demande à n'importe qui t'ayant vraiment connu(e).`, planet: 'venus', sign: vSign },
    { text: `Vénus en ${vSign}, Lune en ${mSign} : ton cœur est ${vEl === mEl ? `un ${elWord(vSign)} pur, sans mélange — rare, et un peu intimidant pour qui ne s'y attend pas` : `un alliage de ${elWord(vSign)} et de ${elWord(mSign)}, deux métaux qui ne fondent pas à la même température`}.`, planet: 'venus', sign: vSign },
    { text: `Mars en ${marsSign} face à Vénus en ${vSign} : l'un veut prendre, l'autre veut qu'on la mérite. Cette friction-là, loin de t'abîmer, est ce qui te rend inoubliable une fois qu'on t'a vraiment connu(e).`, planet: 'mars', sign: marsSign },
    { text: `Il y a quelque chose d'presque insolent dans la façon dont Vénus en ${vSign} refuse de se contenter de peu. On appellera ça de l'exigence — c'est en réalité du respect pour toi-même, décliné en amour.`, planet: 'venus', sign: vSign },
    { text: `Ta Lune en ${mSign} n'oublie jamais qui t'a fait sentir en sécurité un jour où tu en avais besoin. Cette dette-là, tu la rends au centuple à qui sait la mériter.`, planet: 'moon', sign: mSign },
    { text: `${rc.harmoniousAspects} aspects harmonieux dans ton thème : une part de toi sait déjà que l'amour n'a pas besoin d'être un combat permanent. Écoute cette part-là plus souvent.`, planet: 'venus', sign: vSign },
    { text: `${rc.tenseAspects} tensions dans ton ciel natal — chacune a laissé une trace précise de ce que tu refuses désormais de vivre deux fois. Ce ne sont pas des blessures, ce sont des frontières.`, planet: 'pluto', sign: plSign },
    { text: `Jupiter en ${jupSign}, Saturne en ${satSign} : tu veux à la fois l'ampleur et la solidité. La plupart des gens choisissent l'un ou l'autre — toi, tu refuses de trancher, et tu as raison de refuser.`, planet: 'jupiter', sign: jupSign },
    { text: `Il y a une différence entre attendre l'amour et le laisser passer devant toi sans le reconnaître. Saturne en ${satSign} te rend prudent(e) — pas aveugle. Vérifie que tu ne confonds pas les deux, en ce moment précis.`, planet: 'saturn', sign: satSign },
    { text: `Neptune en ${nepSign}, Vénus en ${vSign} : tu tombes amoureux(se) de qui les gens pourraient devenir, pas seulement de qui ils sont. C'est une forme de foi rare — protège-la, mais ne la confonds jamais avec un contrat.`, planet: 'neptune', sign: nepSign },
    { text: `Mars en ${marsSign} : ce que les autres lisent comme de l'indifférence, chez toi, c'est en réalité de la sélectivité. Tu ne t'enflammes pas pour tout le monde — c'est précisément pour ça que ça compte quand tu t'enflammes.`, planet: 'mars', sign: marsSign },
    { text: `Pluton en ${plSign}, Lune en ${mSign} : les ruptures ne t'effleurent jamais — elles te traversent entièrement, et ce que tu deviens de l'autre côté ne ressemble plus à qui tu étais avant.`, planet: 'pluto', sign: plSign },
    { text: `Vénus en ${vSign} n'a jamais eu besoin d'un mode d'emploi. Le vrai risque n'est pas que tu aimes mal — c'est que tu finisses par aimer quelqu'un qui ne prend jamais la peine de te lire.`, planet: 'venus', sign: vSign },
    { text: `Soleil en ${sSign} : la version de toi qui existe en dehors du regard d'un partenaire n'est pas un à-côté — c'est la fondation. Ceux qui t'aiment bien l'ont déjà compris ; ceux qui te veulent diminué(e) ne resteront pas longtemps.`, planet: 'sun', sign: sSign },
    { text: `Jupiter en ${jupSign} : une histoire qui compte vraiment ne suivra jamais le scénario que tu avais en tête. Le jour où tu arrêtes de comparer, elle a enfin la place d'exister telle qu'elle est.`, planet: 'jupiter', sign: jupSign },
    { text: `Il y a une lenteur particulière dans la façon dont Saturne en ${satSign} construit un lien — et une rapidité tout aussi particulière dans la façon dont il sait reconnaître ce qui ne vaut pas la peine d'attendre.`, planet: 'saturn', sign: satSign },
    { text: `Mars en ${marsSign}, Pluton en ${plSign} : quand tu désires quelqu'un, ce n'est jamais à moitié. La question n'est pas de savoir si tu en es capable — c'est de savoir qui mérite d'en être la cible.`, planet: 'mars', sign: marsSign },
    ...(vAsp ? [{ text: `${PN[vAsp.planet1]} ${verbFor(vAsp.type)} ${PN[vAsp.planet2]} : ${vAsp.type === 'Carré' || vAsp.type === 'Opposition' ? "ta façon d'aimer se heurte régulièrement à ce que tu crois devoir être. Le jour où les deux cessent de se battre, quelque chose de très stable naît" : "ta façon d'aimer coule sans effort apparent — un talent que tu risques de sous-estimer simplement parce qu'il ne t'a jamais coûté"}.`, planet: 'venus', sign: vSign, aspect: vAsp }] : []),
    ...(rc.venusJupiter ? [{ text: `Vénus ${verbFor(rc.venusJupiter.type)} Jupiter : ${rc.venusJupiter.type === 'Trigone' || rc.venusJupiter.type === 'Sextile' ? "ton cœur a un talent presque injuste pour attirer l'abondance — profite-en sans culpabilité" : "ton désir d'aimer grand se heurte parfois à la réalité plus modeste de ce qui t'est offert. Apprends à aimer l'échelle réelle, pas seulement l'ambition"}.`, planet: 'venus', sign: vSign, aspect: rc.venusJupiter }] : []),
    ...(rc.venusSaturn ? [{ text: `Vénus ${verbFor(rc.venusSaturn.type)} Saturne : tu n'as jamais donné ton cœur à la légère, et certains ont confondu ça avec de la distance. C'est en réalité la preuve que ce que tu offres, une fois offert, ne se reprend pas.`, planet: 'venus', sign: vSign, aspect: rc.venusSaturn }] : []),
    ...(rc.marsSaturn ? [{ text: `Mars ${verbFor(rc.marsSaturn.type)} Saturne : ${rc.marsSaturn.type === 'Carré' || rc.marsSaturn.type === 'Opposition' ? "ton désir se cogne souvent à ta propre retenue avant même de rencontrer un obstacle extérieur. Le frein est en toi, pas en face" : "tu sais désirer avec patience, ce qui est presque une contradiction dans les termes — et pourtant, chez toi, ça fonctionne"}.`, planet: 'mars', sign: marsSign, aspect: rc.marsSaturn }] : []),
    ...(rc.marsPluto ? [{ text: `Mars ${verbFor(rc.marsPluto.type)} Pluton : ton désir n'a rien de tiède ni de raisonnable. Ceux qui cherchent une passade s'en éloignent instinctivement — ceux qui cherchent quelque chose de vrai s'en approchent pour la même raison.`, planet: 'mars', sign: marsSign, aspect: rc.marsPluto }] : []),
    ...(rc.sunSaturn ? [{ text: `Soleil ${verbFor(rc.sunSaturn.type)} Saturne : tu as appris tôt que se faire aimer se mérite, ce qui t'a rendu(e) exigeant(e) envers toi-même bien avant de l'être envers les autres. Cette exigence n'a plus besoin d'être aussi lourde à porter.`, planet: 'sun', sign: sSign, aspect: rc.sunSaturn }] : []),
    ...(rc.sunUranus ? [{ text: `Soleil ${verbFor(rc.sunUranus.type)} Uranus : les histoires trop prévisibles t'ennuient avant même qu'elles ne commencent vraiment. Ce n'est pas de l'instabilité — c'est un besoin d'oxygène que peu de partenaires savent fournir sur la durée.`, planet: 'sun', sign: sSign, aspect: rc.sunUranus }] : []),
    ...(rc.mercuryVenus ? [{ text: `Mercure ${verbFor(rc.mercuryVenus.type)} Vénus : tu sais nommer précisément ce que tu ressens, ce qui est plus rare qu'il n'y paraît. Trouve quelqu'un capable d'écouter avec la même précision — le reste suit.`, planet: 'venus', sign: vSign, aspect: rc.mercuryVenus }] : []),
    ...(rc.mercuryJupiter ? [{ text: `Mercure ${verbFor(rc.mercuryJupiter.type)} Jupiter : tes conversations amoureuses ont tendance à devenir de vraies explorations plutôt que de simples échanges polis. Un(e) partenaire qui s'ennuie de parler avec toi n'a probablement pas cherché assez loin.`, planet: 'venus', sign: vSign, aspect: rc.mercuryJupiter }] : []),
    ...(rc.jupiterSaturn ? [{ text: `Jupiter ${verbFor(rc.jupiterSaturn.type)} Saturne : tu veux à la fois l'aventure et la promesse que ça durera. Ce n'est pas contradictoire — c'est simplement rare, et ça vaut la peine d'attendre que quelqu'un puisse tenir les deux bouts.`, planet: 'jupiter', sign: jupSign, aspect: rc.jupiterSaturn }] : []),
    ...(rc.venusMars ? [{ text: `Vénus ${verbFor(rc.venusMars.type)} Mars, vus autrement : la tendresse et l'appétit ne sont pas censés cohabiter sans friction chez toi — et c'est exactement cette friction qui empêche tes histoires de sombrer dans la tiédeur.`, planet: 'venus', sign: vSign, aspect: rc.venusMars }] : []),
    ...(rc.moonNeptune ? [{ text: `Lune ${verbFor(rc.moonNeptune.type)} Neptune, vu sous un autre angle : tu sens l'état émotionnel d'un partenaire avant qu'il ne le formule lui-même. Un don, à condition de ne jamais l'utiliser pour deviner à sa place ce qu'il devrait te dire lui-même.`, planet: 'moon', sign: mSign, aspect: rc.moonNeptune }] : []),
    { text: `Jupiter en ${jupSign}, Vénus en ${vSign} : ton cœur a une capacité d'expansion que peu de gens autour de toi possèdent. Ne la rétrécis jamais pour rassurer quelqu'un qui a peur de sa propre petitesse.`, planet: 'jupiter', sign: jupSign },
    { text: `Il y a, dans ta Lune en ${mSign}, une carte précise de tout ce qui t'a un jour manqué. Le bon partenaire ne la lit pas pour te sauver — il la lit pour savoir où marcher doucement.`, planet: 'moon', sign: mSign },
    { text: `Saturne en ${satSign}, Vénus en ${vSign} : ce que tu appelles ta peur de t'engager est peut-être simplement ton refus instinctif de t'engager envers la mauvaise personne. Les deux se ressemblent de l'extérieur, jamais de l'intérieur.`, planet: 'saturn', sign: satSign },
    { text: `Neptune en ${nepSign} : il existe une version de l'amour que tu portes en toi depuis toujours, plus ancienne que n'importe quelle relation vécue. Chaque histoire réelle est mesurée à cette aune — c'est exigeant, mais ce n'est pas malsain tant que tu restes capable d'aimer ce qui est devant toi, pas seulement ce que tu imagines.`, planet: 'neptune', sign: nepSign },
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
    { text: `Soleil en ${sSign} : il existe un métier où tu n'aurais jamais l'impression de "travailler" au sens où les autres l'entendent. Tu ne l'as peut-être pas encore trouvé, mais Soleil en ${sSign} sait exactement à quoi il ressemble.`, planet: 'sun', sign: sSign },
    { text: `Mars en ${marsSign} : ce que tes collègues appellent de l'impatience, c'est en réalité ton corps qui refuse de rester assis sur une bonne idée trop longtemps.`, planet: 'mars', sign: marsSign },
    { text: `Jupiter en ${jupSign} : dire non à un poste médiocre libère un espace que tu ne peux pas encore voir depuis là où tu te trouves. Ce vide n'est pas une perte — c'est une réservation.`, planet: 'jupiter', sign: jupSign },
    { text: `Saturne en ${satSign} construit en secret. Ce que personne ne remarque cette année sera ce qu'on citera en exemple dans cinq ans — mais seulement si tu tiens jusque-là sans réclamer d'applaudissements.`, planet: 'saturn', sign: satSign },
    { text: `Mercure en ${mercSign} : tu formules une idée trois fois plus vite que tu n'oses la partager. L'écart entre les deux, c'est exactement ce qui te coûte des opportunités.`, planet: 'mercury', sign: mercSign },
    { text: `Pluton en ${plSign} : chaque licenciement, chaque projet avorté, chaque "on ne prend pas votre candidature" a discrètement affiné la version de toi qui finira par percer.`, planet: 'pluto', sign: plSign },
    { text: `Uranus en ${uraSign} : le poste stable et prévisible que ta famille imaginait pour toi n'a jamais vraiment été une option. Ce n'est pas de la rébellion — c'est un désaccord de fabrication.`, planet: 'uranus', sign: uraSign },
    { text: `Vénus en ${vSign} au travail : un bureau laid, une équipe hostile, une mission sans âme — ça ne te coûte pas seulement du moral, ça te coûte littéralement en performance. Ce n'est pas un caprice, c'est une donnée de ton thème.`, planet: 'venus', sign: vSign },
    { text: `Ta Lune en ${mSign} sait avant les chiffres qu'une négociation tourne mal. Le jour où tu apprendras à écouter ce malaise avant qu'il ne se justifie sur le papier, tu gagneras un temps précieux.`, planet: 'moon', sign: mSign },
    { text: `Mars en ${marsSign}, Saturne en ${satSign} : tu tiens la distance là où d'autres s'essoufflent au premier virage. Peu de gens possèdent réellement cette endurance-là — la plupart se contentent d'en parler.`, planet: 'mars', sign: marsSign },
    { text: `Il y a une différence entre douter de son projet et douter de soi en travaillant sur son projet. Mercure en ${mercSign} confond parfois les deux — prends dix minutes pour démêler lequel te freine vraiment aujourd'hui.`, planet: 'mercury', sign: mercSign },
    { text: `Soleil en ${sSign} : le syndrome de l'imposteur que tu ressens n'a jamais été une mesure fiable de ta compétence. C'est simplement ce que ressent quiconque grandit plus vite que son propre sentiment de légitimité.`, planet: 'sun', sign: sSign },
    { text: `Saturne en ${satSign} : chaque "non" que tu as reçu t'a discrètement appris à reconnaître un "oui" le jour où il finirait par arriver. Ce jour-là approche plus vite que ta patience actuelle ne le laisse croire.`, planet: 'saturn', sign: satSign },
    { text: `${rc.harmoniousAspects} talents qui te semblent d'une évidence presque gênante — au point que tu oublies qu'ils sont rares pour quelqu'un d'autre. Arrête de les considérer comme allant de soi.`, planet: 'jupiter', sign: jupSign },
    { text: `${rc.tenseAspects} tensions dans ton thème natal : ta trajectoire professionnelle ne se racontera jamais en une phrase simple — et c'est précisément ce qui la rendra digne d'être racontée un jour.`, planet: 'mars', sign: marsSign },
    { text: `Uranus en ${uraSign}, Jupiter en ${jupSign} : le métier qui te correspond n'existait peut-être pas il y a dix ans. Reste en alerte du côté des intitulés de poste que personne ne sait encore bien nommer.`, planet: 'uranus', sign: uraSign },
    { text: `Pluton en ${plSign}, Mars en ${marsSign} : ta capacité à te reconstruire professionnellement après un effondrement dépasse largement ce que tu t'accordes le droit de croire.`, planet: 'pluto', sign: plSign },
    { text: `Il existe un mot pour ce que tu ressens quand une réunion s'éternise sans but : c'est ton Mars en ${marsSign} qui réclame, tout simplement, qu'on avance. Ce n'est pas de l'impatience mal placée, c'est un instinct correct.`, planet: 'mars', sign: marsSign },
    { text: `Vénus en ${vSign}, Jupiter en ${jupSign} : ton réseau ne se construit jamais aussi bien que lorsque tu arrêtes de le construire stratégiquement et que tu laisses simplement l'intérêt sincère faire le travail.`, planet: 'venus', sign: vSign },
    { text: `Modalité ${rc.dominantModality} au travail : tu es fait(e) pour ${rc.dominantModality === 'Cardinal' ? "démarrer les choses, pas pour les faire tourner indéfiniment une fois lancées" : rc.dominantModality === 'Fixe' ? "aller au fond d'un seul sujet plutôt que d'en effleurer dix" : "circuler entre les rôles, pas pour rester assigné(e) à un seul pour toujours"}.`, planet: 'saturn', sign: satSign },
    { text: `Mercure en ${mercSign}, Pluton en ${plSign} : tu remarques ce que la salle entière a manqué, et ce détail invisible pour les autres finit souvent par être celui qui change toute la décision.`, planet: 'mercury', sign: mercSign },
    { text: `Saturne en ${satSign} : demander ce que tu vaux n'a jamais été de l'arrogance. C'est juste la première personne qui devait le reconnaître avant que quelqu'un d'autre ne s'en charge à ta place — et cette personne, c'est toi.`, planet: 'saturn', sign: satSign },
    { text: `${rc.dominantElement === 'Feu' ? "Un travail qui ne bouge jamais t'éteint lentement, comme une flamme privée d'air" : rc.dominantElement === 'Eau' ? "Un travail sans sens te vide de l'intérieur, même quand le salaire est correct" : rc.dominantElement === 'Terre' ? "Un travail instable te fait douter de tout, même de ce que tu maîtrises parfaitement" : "Un travail qui n'échange jamais d'idées t'ennuie jusqu'à l'épuisement, même bien payé"} — ton thème ne fait pas de compromis là-dessus.`, planet: 'sun', sign: sSign },
    { text: `Mars en ${marsSign} : ce que tu appelles procrastiner sur ce projet précis n'est peut-être pas de la paresse. C'est parfois ton instinct qui te dit, à raison, que ce n'est pas encore le bon projet pour toi.`, planet: 'mars', sign: marsSign },
    { text: `Pluton en ${plSign} : les environnements toxiques laissent chez toi une marque plus profonde et plus durable que chez la moyenne. Ce n'est pas de la fragilité — c'est une forme aiguë de lucidité que tout le monde n'a pas.`, planet: 'pluto', sign: plSign },
    { text: `Ta Lune en ${mSign} au bureau : ton équilibre émotionnel n'est pas un luxe secondaire, c'est une condition directe de ta performance. Ne le sacrifie jamais pour une ligne de plus sur une fiche de paie sans y avoir vraiment réfléchi.`, planet: 'moon', sign: mSign },
    { text: `Jupiter en ${jupSign}, Uranus en ${uraSign} : ta plus grande réussite professionnelle viendra probablement d'un domaine que tu n'envisages pas encore comme une vraie option aujourd'hui.`, planet: 'jupiter', sign: jupSign },
    ...(marsAsp ? [{ text: `${PN[marsAsp.planet1]} ${verbFor(marsAsp.type)} ${PN[marsAsp.planet2]} : ${marsAsp.type === 'Carré' || marsAsp.type === 'Opposition' ? "chaque obstacle professionnel te met en colère avant de t'apprendre quelque chose — dans cet ordre précis, et ce n'est pas un problème" : "l'action te vient avec une facilité presque déloyale par rapport à ceux qui doivent se forcer chaque matin"}.`, planet: 'mars', sign: marsSign, aspect: marsAsp }] : []),
    ...(rc.venusSaturn ? [{ text: `Vénus ${verbFor(rc.venusSaturn.type)} Saturne : tu ne t'investis jamais dans une collaboration à la légère, et certains ont pris ça pour de la froideur. C'est en réalité la raison pour laquelle ce que tu bâtis professionnellement tient debout plus longtemps que le reste.`, planet: 'venus', sign: vSign, aspect: rc.venusSaturn }] : []),
    ...(rc.moonSaturn ? [{ text: `Lune ${verbFor(rc.moonSaturn.type)} Saturne : tu portes une charge de responsabilité émotionnelle au travail que peu de collègues devinent. Personne ne te demande de tout porter seul(e) — même si une partie de toi continue d'agir comme si c'était le cas.`, planet: 'moon', sign: mSign, aspect: rc.moonSaturn }] : []),
    ...(rc.moonPluto ? [{ text: `Lune ${verbFor(rc.moonPluto.type)} Pluton : les crises professionnelles ne t'effleurent jamais — elles remontent d'anciennes peurs bien plus profondes que la situation présente ne le justifie. Sépare les deux avant de réagir.`, planet: 'moon', sign: mSign, aspect: rc.moonPluto }] : []),
    ...(rc.venusMars ? [{ text: `Vénus ${verbFor(rc.venusMars.type)} Mars : tu sais autant charmer une salle que t'y imposer, ce qui te rend difficile à catégoriser pour une hiérarchie qui préfère les profils simples à comprendre. Ce n'est pas un défaut — c'est simplement rare.`, planet: 'venus', sign: vSign, aspect: rc.venusMars }] : []),
    ...(rc.mercuryVenus ? [{ text: `Mercure ${verbFor(rc.mercuryVenus.type)} Vénus : tu sais présenter une idée pour qu'elle donne envie d'être suivie, pas seulement comprise. C'est une compétence de négociation à part entière, même si personne ne l'a jamais nommée ainsi sur ton CV.`, planet: 'mercury', sign: mercSign, aspect: rc.mercuryVenus }] : []),
    ...(rc.venusNeptune ? [{ text: `Vénus ${verbFor(rc.venusNeptune.type)} Neptune : tu recherches un sens presque vocationnel dans ce que tu fais, ce qui rend le travail purement alimentaire particulièrement difficile à supporter pour toi, même bien rémunéré.`, planet: 'venus', sign: vSign, aspect: rc.venusNeptune }] : []),
    ...(rc.moonNeptune ? [{ text: `Lune ${verbFor(rc.moonNeptune.type)} Neptune : tu absorbes l'ambiance d'une équipe avant même d'en comprendre les raisons concrètes. Fais confiance à ce malaise diffus — il arrive souvent avant les faits qui viendront le confirmer.`, planet: 'moon', sign: mSign, aspect: rc.moonNeptune }] : []),
    { text: `Il y a une forme de courage discret dans le fait de rester à un poste qu'on maîtrise déjà par choix, et non par peur du changement. Vérifie honnêtement, avec Saturne en ${satSign}, de quel côté tu te trouves en ce moment.`, planet: 'saturn', sign: satSign },
    { text: `Mercure en ${mercSign} : vulgariser une idée complexe pour la rendre accessible n'est pas une trahison de sa profondeur. C'est souvent la seule façon qu'elle a d'atteindre les bonnes personnes.`, planet: 'mercury', sign: mercSign },
    { text: `Soleil en ${sSign}, Mars en ${marsSign} : le jour où tu arrêtes de demander la permission d'être ambitieux(se), les portes ne s'ouvrent pas différemment — c'est toi qui remarques enfin qu'elles étaient déjà entrouvertes.`, planet: 'sun', sign: sSign },
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
    { text: `Ta Lune en ${mSign} garde en mémoire des choses que ton mental a depuis longtemps classées comme oubliées. Ce que tu appelles rumination est en réalité une archive émotionnelle d'une précision presque chirurgicale.`, planet: 'moon', sign: mSign },
    { text: `Vénus en ${vSign} : ta valeur ne s'est jamais construite dans le regard de quelqu'un d'autre. Elle était déjà écrite avant que qui que ce soit n'ait eu l'occasion de te juger.`, planet: 'venus', sign: vSign },
    { text: `Mercure en ${mercSign} pense en ${elWord(mercSign)} : ${SIGN_ELEMENT[mercSign] === 'Air' ? "vite, par bonds, en réseau d'idées qui se répondent" : SIGN_ELEMENT[mercSign] === 'Feu' ? "par intuitions qui arrivent avant la démonstration" : SIGN_ELEMENT[mercSign] === 'Terre' ? "par étapes qu'on peut vérifier une à une, sans sauter aucune marche" : "par ressenti, bien avant que les mots ne suivent"}. Personne n'a le droit de te faire croire que c'est la mauvaise façon de réfléchir.`, planet: 'mercury', sign: mercSign },
    { text: `Jupiter en ${jupSign} : ta plus grande erreur ne serait pas d'échouer. Ce serait de rapetisser volontairement pour que ton existence dérange moins de monde.`, planet: 'jupiter', sign: jupSign },
    { text: `Uranus en ${uraSign} fait de toi quelqu'un d'irréductible à une seule case. Arrête d'essayer de rentrer dans un moule qui n'a de toute façon jamais été taillé pour toi.`, planet: 'uranus', sign: uraSign },
    { text: `Ton Soleil en ${sSign} sait déjà, avec certitude, qui tu es. C'est ton mental qui doute — pas ton essence, qui elle n'a jamais vacillé.`, planet: 'sun', sign: sSign },
    { text: `Saturne en ${satSign} t'a obligé(e) à grandir plus vite que d'autres sur certains points précis. Ce n'était pas juste — mais ce n'est pas non plus une malédiction. C'est une longueur d'avance qui n'a simplement pas encore de nom.`, planet: 'saturn', sign: satSign },
    { text: `Pluton en ${plSign} : tu n'as jamais eu besoin de tout contrôler pour être en sécurité. Cette croyance appartient à une version plus jeune de toi — pas à celle que tu es en train de devenir.`, planet: 'pluto', sign: plSign },
    { text: `Neptune en ${nepSign} t'a donné une sensibilité que le monde qualifie parfois de "trop". Elle n'a jamais été de trop. Elle est simplement rare, et les gens rares dérangent avant d'être compris.`, planet: 'neptune', sign: nepSign },
    { text: `Mars en ${marsSign} : ta colère n'est pas un défaut de caractère qu'il faudrait polir. C'est une information brute qui te dit, sans détour, exactement où une limite vient d'être franchie.`, planet: 'mars', sign: marsSign },
    { text: `Avec ${rc.totalAspects} aspects dans ton thème, aucune formule d'une seule ligne ne pourra jamais te résumer. Cesse de chercher une explication unique à ce que tu es — tu n'en as jamais eu besoin.`, planet: 'sun', sign: sSign },
    { text: `Ce que tu ressens comme un besoin de repartir de zéro, ${rc.dominantModality === 'Cardinal' ? "c'est ta modalité Cardinale qui parle — elle ne sait pas rester immobile bien longtemps" : rc.dominantModality === 'Fixe' ? "c'est étrange venant de ta modalité Fixe, qui préfère creuser un seul sillon très profond — regarde si ce n'est pas plutôt de la fatigue" : "c'est ta modalité Mutable qui réclame de l'air — elle s'étouffe dans les routines figées"}. Écoute-la sans t'en excuser.`, planet: 'sun', sign: sSign },
    { text: `Ta Lune en ${mSign} et ton Soleil en ${sSign} ne sont pas toujours d'accord sur la direction à prendre. C'est normal — même les cieux ont leurs tensions internes, et ça ne les empêche pas de tourner.`, planet: 'moon', sign: mSign },
    { text: `Vénus en ${vSign} : ce que tu admires chez les autres est très souvent ce que tu portes déjà en toi, mais que tu n'as pas encore osé reconnaître à voix haute.`, planet: 'venus', sign: vSign },
    { text: `Jupiter en ${jupSign} et Saturne en ${satSign} cohabitent rarement aussi bien que chez toi : l'élan d'un côté, la structure de l'autre. La plupart des gens n'ont accès qu'à l'un des deux à la fois.`, planet: 'jupiter', sign: jupSign },
    { text: `Ce que tu appelles indécision est peut-être simplement du discernement mal aimé. Ton Mercure en ${mercSign} pèse chaque option plus longtemps que la moyenne avant de trancher — ce n'est pas une faiblesse, c'est de la rigueur.`, planet: 'mercury', sign: mercSign },
    { text: `Uranus en ${uraSign} : les périodes où tu te sens décalé(e) par rapport à tout le monde sont, la plupart du temps, celles où tu es le plus proche de ta vraie nature — pas le plus éloigné(e).`, planet: 'uranus', sign: uraSign },
    { text: `Pluton en ${plSign}, Mars en ${marsSign} : ta force ne se donne jamais à voir depuis l'extérieur. Elle se mesure à tout ce que tu as traversé sans jamais t'effondrer complètement — même les fois où personne ne l'a su.`, planet: 'pluto', sign: plSign },
    { text: `${rc.harmoniousAspects} aspects harmonieux dans ton thème : certains de tes talents te paraissent si naturels que tu as oublié qu'ils en étaient. Regarde-les à nouveau, comme si tu venais de les découvrir.`, planet: 'venus', sign: vSign },
    { text: `Neptune en ${nepSign} : le doute que tu ressens face à ton intuition n'a jamais enlevé la moindre once de justesse à ce qu'elle te souffle. Écoute-la même sans pouvoir l'expliquer d'un point à un autre.`, planet: 'neptune', sign: nepSign },
    { text: `Ton élément dominant, ${rc.dominantElement}, ne se négocie pas avec le monde extérieur. Un environnement qui l'ignore t'épuise en silence ; un environnement qui l'honore te fait respirer différemment.`, planet: 'sun', sign: sSign },
    { text: `Saturne en ${satSign} bâtit en toi une autorité intérieure que rien d'extérieur ne peut réellement t'enlever — même les jours où tu ne la sens pas du tout.`, planet: 'saturn', sign: satSign },
    { text: `Mercure en ${mercSign} et Lune en ${mSign} ne racontent pas toujours la même histoire : ce que tu penses et ce que tu ressens divergent parfois. Les deux ont raison — juste pas au même moment.`, planet: 'mercury', sign: mercSign },
    { text: `Soleil en ${sSign} : tu n'as jamais eu besoin de devenir quelqu'un d'autre pour mériter d'être aimé(e). Ce ciel a déjà tout prévu pour que ta version brute, non retouchée, suffise amplement.`, planet: 'sun', sign: sSign },
    { text: `Ce que tu appelles procrastination cache le plus souvent une peur bien précise : celle de vouloir vraiment quelque chose, et d'échouer quand même après s'y être investi(e) pour de vrai.`, planet: 'mars', sign: marsSign },
    { text: `Jupiter en ${jupSign} : ta capacité à espérer, malgré tout ce que tu as traversé, n'est jamais de la naïveté. C'est une force que beaucoup ont perdue en chemin sans même s'en rendre compte — protège-la comme une ressource rare.`, planet: 'jupiter', sign: jupSign },
    { text: `Vénus en ${vSign}, Mars en ${marsSign} : le désir et la tendresse ne cohabitent pas de la même façon en toi que chez les autres. Personne ne ressent exactement de cette manière-là — c'est une signature, pas une anomalie.`, planet: 'venus', sign: vSign },
    { text: `Pluton en ${plSign} : tu n'as pas besoin de tout comprendre pour continuer à avancer. Certaines transformations se font entièrement dans le noir, bien avant que la moindre lumière n'arrive pour les éclairer.`, planet: 'pluto', sign: plSign },
    { text: `${rc.tenseAspects} tensions natales, ce sont ${rc.tenseAspects} endroits précis où tu as appris, seul(e), à te débrouiller sans qu'on te montre le chemin. Ce n'est pas rien — c'est une compétence que peu de gens ont eu à développer aussi tôt.`, planet: 'saturn', sign: satSign },
    { text: `Uranus en ${uraSign} : ta différence n'a jamais été le problème, aussi loin que tu remontes. Le problème, c'est le nombre de fois où on t'a poliment demandé de la ranger dans un tiroir.`, planet: 'uranus', sign: uraSign },
    { text: `Neptune en ${nepSign}, Lune en ${mSign} : tu perçois des couches de réalité que la logique pure n'atteint tout simplement pas. Ce n'est pas un délire, ni une fragilité — c'est un autre type d'intelligence, moins reconnu, tout aussi réel.`, planet: 'neptune', sign: nepSign },
    { text: `Soleil en ${sSign}, Mercure en ${mercSign} : la façon dont tu racontes qui tu es change avec le temps, et c'est très bien ainsi. C'est le signe d'un esprit encore vivant, pas d'un manque de constance qu'il faudrait corriger.`, planet: 'sun', sign: sSign },
    { text: `Mars en ${marsSign}, Pluton en ${plSign} : ta détermination silencieuse pèse plus lourd que n'importe quelle démonstration de force bruyante. Ceux qui savent vraiment te lire n'ont besoin d'aucune preuve supplémentaire.`, planet: 'mars', sign: marsSign },
    { text: `Vénus en ${vSign} : apprendre à te préférer à toi-même de temps en temps n'a rien d'égoïste. C'est la condition minimale pour aimer les autres sans t'y dissoudre entièrement.`, planet: 'venus', sign: vSign },
    { text: `Il y a une différence entre se protéger et se murer, et Saturne en ${satSign} a parfois du mal à distinguer les deux. Demande-toi honnêtement, aujourd'hui, de quel côté tu te situes en ce moment précis.`, planet: 'saturn', sign: satSign },
    { text: `Jupiter en ${jupSign} : sous-estimer systématiquement ta propre portée est probablement, en ce moment, ta seule limite réelle — bien plus que n'importe quelle circonstance extérieure.`, planet: 'jupiter', sign: jupSign },
    ...(rc.mercuryJupiter ? [{ text: `Mercure ${verbFor(rc.mercuryJupiter.type)} Jupiter : ta pensée a naturellement de l'ampleur, ${rc.mercuryJupiter.type === 'Trigone' || rc.mercuryJupiter.type === 'Sextile' ? "et tu arrives rarement à voir grand sans perdre le fil du détail — un équilibre peu commun" : "même si le grand écart entre le détail et la vue d'ensemble reste ton terrain d'entraînement permanent"}.`, planet: 'mercury', sign: mercSign, aspect: rc.mercuryJupiter }] : []),
    ...(rc.venusSaturn ? [{ text: `Vénus ${verbFor(rc.venusSaturn.type)} Saturne : tu n'accordes jamais ta confiance à la légère, et c'est une qualité, pas un mur. Ce que tu choisis finalement de garder dure, précisément parce que tu ne l'as pas donné à n'importe qui.`, planet: 'venus', sign: vSign, aspect: rc.venusSaturn }] : []),
    ...(rc.marsPluto ? [{ text: `Mars ${verbFor(rc.marsPluto.type)} Pluton : ta volonté possède une intensité que peu de gens autour de toi possèdent réellement. Ne t'excuse jamais de vouloir les choses aussi fort que tu les veux.`, planet: 'mars', sign: marsSign, aspect: rc.marsPluto }] : []),
    ...(rc.venusMars ? [{ text: `Vénus ${verbFor(rc.venusMars.type)} Mars : douceur et intensité se disputent en permanence ta façon d'exister au monde. C'est précisément cette friction interne qui te rend difficile à oublier, une fois qu'on t'a vraiment rencontré(e).`, planet: 'venus', sign: vSign, aspect: rc.venusMars }] : []),
    ...(rc.mercurySaturn ? [{ text: `Mercure ${verbFor(rc.mercurySaturn.type)} Saturne : tu réfléchis longtemps avant de parler, parfois trop longtemps au goût des autres. Mais quand tu finis par t'exprimer, ce que tu dis a un poids que les mots impulsifs des autres n'ont pas.`, planet: 'mercury', sign: mercSign, aspect: rc.mercurySaturn }] : []),
    ...(rc.venusJupiter ? [{ text: `Vénus ${verbFor(rc.venusJupiter.type)} Jupiter : ta capacité à t'émerveiller n'a jamais vraiment disparu, même dans les périodes les plus dures. Elle sait simplement se faire discrète — pas absente.`, planet: 'venus', sign: vSign, aspect: rc.venusJupiter }] : []),
    ...(rc.jupiterSaturn ? [{ text: `Jupiter ${verbFor(rc.jupiterSaturn.type)} Saturne : tu portes en toi à la fois l'élan qui pousse à commencer et la rigueur qui pousse à finir. C'est rare de posséder les deux sans que l'un n'écrase l'autre — chez toi, ils cohabitent.`, planet: 'jupiter', sign: jupSign, aspect: rc.jupiterSaturn }] : []),
    ...(rc.moonVenus ? [{ text: `Lune ${verbFor(rc.moonVenus.type)} Vénus : ce que tu ressens et ce que tu désires ne sont pas toujours parfaitement alignés, et ce n'est pas une contradiction à résoudre à tout prix — c'est simplement une richesse intérieure de plus.`, planet: 'moon', sign: mSign, aspect: rc.moonVenus }] : []),
    ...(rc.venusNeptune ? [{ text: `Vénus ${verbFor(rc.venusNeptune.type)} Neptune : tu perçois la beauté là où d'autres ne voient qu'ordinaire. C'est un vrai talent, à condition de ne jamais t'en servir pour fuir ce qui, précisément, a besoin d'être regardé en face.`, planet: 'venus', sign: vSign, aspect: rc.venusNeptune }] : []),
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
    { text: `Ton Soleil en ${sSign} entre dans une phase où il devient chaque jour un peu plus difficile de rester invisible. Prépare-toi doucement — l'attention qui arrive n'a pas besoin d'être méritée pour être réelle.`, planet: 'sun', sign: sSign },
    { text: `Mars en ${marsSign} : la prochaine étape ne réclame pas davantage de force que celle que tu as déjà. Ce qui lui manque, c'est une direction plus nette — pas un moteur plus puissant.`, planet: 'mars', sign: marsSign },
    { text: `Jupiter en ${jupSign} : ce qui te semble fermé aujourd'hui n'est fermé que temporairement. Certaines portes ont simplement besoin d'être poussées deux fois avant de céder.`, planet: 'jupiter', sign: jupSign },
    { text: `Saturne en ${satSign} : les trois prochaines années comptent plus que tu ne le devines aujourd'hui. Chaque effort discret que tu fournis maintenant deviendra visible bien plus tard, sous une forme que tu n'anticipes pas encore.`, planet: 'saturn', sign: satSign },
    { text: `Uranus en ${uraSign} : attends-toi à un virage qui ne figurait dans aucun de tes plans. Ce ne sera pas un accident de parcours — ce sera une correction de trajectoire, arrivée exactement au bon moment.`, planet: 'uranus', sign: uraSign },
    { text: `Neptune en ${nepSign} : ce que tu rêves depuis longtemps commence à prendre une forme presque tangible. Ne le juge pas trop tôt sous prétexte qu'il n'est pas encore parfait — rien ne l'est au moment où ça naît.`, planet: 'neptune', sign: nepSign },
    { text: `Pluton en ${plSign} : la personne que tu seras dans deux ans regardera cette période précise comme un tournant, même si aujourd'hui elle te paraît d'une banalité presque décevante.`, planet: 'pluto', sign: plSign },
    { text: `Ta Lune en ${mSign} sent déjà que quelque chose approche, avant même que ton esprit n'ait trouvé les mots pour le nommer. Ce n'est pas de l'anxiété — c'est de l'anticipation qui n'a pas encore été identifiée comme telle.`, planet: 'moon', sign: mSign },
    { text: `Mercure en ${mercSign} : une conversation que tu n'as pas encore eue comptera plus que tu ne l'imagines aujourd'hui. Fais attention à qui tu choisis de parler de tes projets dans les semaines à venir.`, planet: 'mercury', sign: mercSign },
    { text: `Vénus en ${vSign} : quelque chose de nouveau s'apprête à entrer dans ta vie affective ou créative, presque sans prévenir. Reste disponible, sans pour autant l'attendre de façon anxieuse.`, planet: 'venus', sign: vSign },
    { text: `Soleil en ${sSign}, Jupiter en ${jupSign} : une phase d'expansion commence à peine. Le seul vrai risque, ici, serait de rester trop prudent(e) pour la saisir pleinement quand elle se présentera.`, planet: 'sun', sign: sSign },
    { text: `Mars en ${marsSign}, Uranus en ${uraSign} : une décision prise presque sur un coup de tête pourrait, avec le recul, s'avérer être la plus juste de toute l'année.`, planet: 'mars', sign: marsSign },
    { text: `Saturne en ${satSign} : ce que tu construis actuellement sans la moindre reconnaissance deviendra, d'ici quelques années, ta plus grande source de fierté silencieuse.`, planet: 'saturn', sign: satSign },
    { text: `${rc.dominantElement === 'Feu' ? "Ton avenir s'écrit dans l'action, pas dans la planification interminable" : rc.dominantElement === 'Eau' ? "Ton avenir se dessine à travers tes intuitions, bien avant qu'un tableau ne le confirme" : rc.dominantElement === 'Terre' ? "Ton avenir se construit brique après brique, sans raccourci qui tienne vraiment la route" : "Ton avenir prend forme à travers tes connexions et tes idées, jamais dans l'isolement"} — c'est écrit noir sur blanc dans la répartition de ton thème.`, planet: 'sun', sign: sSign },
    { text: `Jupiter en ${jupSign}, Neptune en ${nepSign} : une vision encore floue aujourd'hui deviendra une évidence d'ici quelques mois. Fais-lui confiance même en l'absence de détails précis pour la justifier.`, planet: 'jupiter', sign: jupSign },
    { text: `Pluton en ${plSign}, Mars en ${marsSign} : le changement qui approche demandera du courage plus que de la chance. Tu en as, en réalité, largement assez — même si ça ne se sent pas encore ce matin.`, planet: 'pluto', sign: plSign },
    { text: `Uranus en ${uraSign} : ce qui te paraît instable en ce moment est, en réalité, en train de se réorganiser doucement vers une forme meilleure que celle que tu quittes.`, planet: 'uranus', sign: uraSign },
    { text: `Ta Lune en ${mSign}, Neptune en ${nepSign} : un pressentiment que tu portes depuis des semaines commence tout juste à se préciser. Prête attention aux coïncidences plutôt qu'aux certitudes.`, planet: 'moon', sign: mSign },
    { text: `Mercure en ${mercSign} : une information qui te semble aujourd'hui presque anodine deviendra centrale dans une décision à venir. Note-la quelque part avant qu'elle ne se dilue.`, planet: 'mercury', sign: mercSign },
    { text: `Vénus en ${vSign}, Jupiter en ${jupSign} : une rencontre ou une collaboration que tu n'avais pas vue venir élargit ton horizon plus largement que prévu.`, planet: 'venus', sign: vSign },
    { text: `Saturne en ${satSign}, Pluton en ${plSign} : la version future de toi ne surgira pas d'un seul événement spectaculaire. Elle se construit par accumulation lente de choix justes, presque invisibles pris un par un.`, planet: 'saturn', sign: satSign },
    { text: `${rc.harmoniousAspects > rc.tenseAspects ? "Ton thème favorise une avancée relativement fluide dans les mois à venir — le risque, ici, serait de t'endormir dans ce confort" : "Ton thème annonce des mois exigeants mais formateurs — le confort n'a jamais vraiment été ta voie de croissance, et tu le sais déjà"}.`, planet: 'jupiter', sign: jupSign },
    { text: `Soleil en ${sSign}, Uranus en ${uraSign} : attends-toi à ne plus désirer la même chose qu'avant. Ce revirement n'a rien d'une trahison envers toi-même — c'est simplement une évolution qui a fini par rattraper ta trajectoire.`, planet: 'sun', sign: sSign },
    { text: `Mars en ${marsSign} : le moment d'agir se rapproche plus vite que tu ne le crois. Prépare-toi intérieurement plutôt que d'attendre un signe extérieur parfaitement clair, qui ne viendra probablement jamais.`, planet: 'mars', sign: marsSign },
    { text: `Neptune en ${nepSign}, Vénus en ${vSign} : une inspiration créative ou affective majeure se prépare en toi, même si elle n'a pour l'instant aucune forme définie à laquelle se raccrocher.`, planet: 'neptune', sign: nepSign },
    { text: `Pluton en ${plSign} : ce qui va s'effondrer dans les mois à venir n'était de toute façon plus fait pour toi depuis un moment. Laisse-le partir sans t'accrocher au vide qu'il laissera derrière lui.`, planet: 'pluto', sign: plSign },
    { text: `Jupiter en ${jupSign} : dis oui, cette année, à quelque chose qui te fait légèrement peur. C'est exactement le genre de risque que ton thème a l'habitude de récompenser.`, planet: 'jupiter', sign: jupSign },
    { text: `Mercure en ${mercSign}, Uranus en ${uraSign} : une idée qui te paraît trop originale pour être prise au sérieux pourrait, précisément, être celle qu'il fallait suivre sans en douter davantage.`, planet: 'mercury', sign: mercSign },
    { text: `Ta Lune en ${mSign} : les mois qui viennent réclameront plus de repos que d'action. Ce n'est pas du retard sur ta propre trajectoire — c'est une gestation dont tu as réellement besoin.`, planet: 'moon', sign: mSign },
    { text: `Saturne en ${satSign}, Uranus en ${uraSign} : la structure et la rupture s'apprêtent à se croiser dans ta trajectoire. De cette tension naîtra quelque chose à la fois solide et neuf, plus rare qu'on ne le pense.`, planet: 'saturn', sign: satSign },
    { text: `Vénus en ${vSign} : quelque chose ou quelqu'un que tu croyais définitivement perdu pourrait revenir sous une forme différente. Reste ouvert(e), mais sans t'y accrocher trop tôt.`, planet: 'venus', sign: vSign },
    { text: `Modalité ${rc.dominantModality} : ton avenir se dessine selon ${rc.dominantModality === 'Cardinal' ? "les débuts que tu oses provoquer toi-même, sans attendre le bon moment" : rc.dominantModality === 'Fixe' ? "ce que tu choisis de ne jamais lâcher, même quand tout pousse à abandonner" : "ta capacité à t'ajuster sans jamais perdre le fil de ta propre direction"}.`, planet: 'sun', sign: sSign },
    { text: `Mars en ${marsSign}, Saturne en ${satSign} : l'endurance que tu développes en ce moment deviendra ton avantage décisif dans un an — probablement plus tôt que ça, si tu tiens la distance.`, planet: 'mars', sign: marsSign },
    { text: `Soleil en ${sSign} : ce qui ressemble aujourd'hui à une pause forcée est, en réalité, une préparation pour quelque chose de plus grand que ce que tu envisages sérieusement pour l'instant.`, planet: 'sun', sign: sSign },
    { text: `Jupiter en ${jupSign}, Pluton en ${plSign} : une transformation profonde s'accompagne rarement seule — l'expansion arrive presque toujours avec elle, même si les deux ne se ressemblent pas au premier regard.`, planet: 'jupiter', sign: jupSign },
    ...(rc.moonPluto ? [{ text: `Lune ${verbFor(rc.moonPluto.type)} Pluton : une transformation émotionnelle profonde se prépare, plus intérieure que visible depuis l'extérieur pour les gens qui t'entourent.`, planet: 'moon', sign: mSign, aspect: rc.moonPluto }] : []),
    ...(rc.sunSaturn ? [{ text: `Soleil ${verbFor(rc.sunSaturn.type)} Saturne : les prochains mois demandent de la persévérance plus que de la vitesse d'exécution. ${rc.sunSaturn.type === 'Carré' || rc.sunSaturn.type === 'Opposition' ? "Le résultat viendra, mais rarement au rythme que tu voudrais qu'il vienne" : "Ta discipline naturelle est en train de porter des fruits qui ne se voient pas encore"}.`, planet: 'sun', sign: sSign, aspect: rc.sunSaturn }] : []),
    ...(rc.venusJupiter ? [{ text: `Vénus ${verbFor(rc.venusJupiter.type)} Jupiter : une expansion dans ta vie affective ou créative se profile à l'horizon — reste disponible pour ce qui se présentera, même sous une forme que tu n'avais pas envisagée.`, planet: 'venus', sign: vSign, aspect: rc.venusJupiter }] : []),
    ...(rc.mercuryJupiter ? [{ text: `Mercure ${verbFor(rc.mercuryJupiter.type)} Jupiter : une idée que tu t'apprêtes à partager aura plus de portée que tu ne l'imagines aujourd'hui. Ne la garde pas trop longtemps pour toi seul(e).`, planet: 'mercury', sign: mercSign, aspect: rc.mercuryJupiter }] : []),
    ...(rc.marsSaturn ? [{ text: `Mars ${verbFor(rc.marsSaturn.type)} Saturne : ${rc.marsSaturn.type === 'Trigone' || rc.marsSaturn.type === 'Sextile' ? "ta capacité à tenir l'effort dans la durée est sur le point de payer, plus vite que tu ne l'anticipes" : "la frustration que tu accumules cherche une sortie constructive — trouve-la avant qu'elle ne s'en trouve une par elle-même"}.`, planet: 'mars', sign: marsSign, aspect: rc.marsSaturn }] : []),
    ...(rc.sunVenus ? [{ text: `Soleil ${verbFor(rc.sunVenus.type)} Vénus : ce que tu deviens et ce que tu désires commencent à converger vers un même point sur ta trajectoire, après une période où les deux semblaient tirer chacun de leur côté.`, planet: 'sun', sign: sSign, aspect: rc.sunVenus }] : []),
    ...(rc.moonVenus ? [{ text: `Lune ${verbFor(rc.moonVenus.type)} Vénus : les mois à venir réconcilient peu à peu ce que tu ressens et ce que tu désires vraiment, deux voix qui n'ont pas toujours chanté juste ensemble jusqu'ici.`, planet: 'moon', sign: mSign, aspect: rc.moonVenus }] : []),
    ...(rc.mercurySaturn ? [{ text: `Mercure ${verbFor(rc.mercurySaturn.type)} Saturne : une réflexion que tu mûris depuis longtemps est sur le point d'atteindre une forme suffisamment solide pour être formulée à voix haute, sans trembler.`, planet: 'mercury', sign: mercSign, aspect: rc.mercurySaturn }] : []),
    ...(rc.moonNeptune ? [{ text: `Lune ${verbFor(rc.moonNeptune.type)} Neptune : un rêve récurrent ou une intuition tenace mérite d'être pris au sérieux dans les semaines à venir, même sans preuve tangible pour l'instant.`, planet: 'moon', sign: mSign, aspect: rc.moonNeptune }] : []),
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
    { text: `Soleil en ${sSign} : ce que tu cherches désespérément à l'extérieur porte, la plupart du temps, le même nom que ce que tu refuses obstinément de te donner toi-même.`, planet: 'sun', sign: sSign },
    { text: `Ta Lune en ${mSign} connaît la réponse depuis le tout début de la conversation. Ta question n'était qu'un moyen détourné de te forcer à la dire à voix haute, enfin.`, planet: 'moon', sign: mSign },
    { text: `Vénus en ${vSign} : ce que tu trouves beau en dit toujours plus long sur toi que sur l'objet que tu regardes en ce moment.`, planet: 'venus', sign: vSign },
    { text: `Mars en ${marsSign} : une action imparfaite en dit toujours plus long qu'une certitude parfaitement théorique, jamais mise à l'épreuve du réel.`, planet: 'mars', sign: marsSign },
    { text: `Jupiter en ${jupSign} : ce qui t'attend dépasse largement ce que tu oses imaginer aujourd'hui, à cette heure précise, dans cet état d'esprit précis.`, planet: 'jupiter', sign: jupSign },
    { text: `Saturne en ${satSign} : la patience n'a jamais été de l'attente passive. C'est un effort silencieux que personne ne remarque avant d'en voir enfin le résultat.`, planet: 'saturn', sign: satSign },
    { text: `Uranus en ${uraSign} : ce qui te dérange le plus chez les autres est, très souvent, un miroir tendu vers ce que tu refuses encore de regarder chez toi.`, planet: 'uranus', sign: uraSign },
    { text: `Neptune en ${nepSign} : entre le rêve et l'illusion, il n'existe qu'une seule vraie différence — l'action que tu es réellement prêt(e) à entreprendre pour le faire exister.`, planet: 'neptune', sign: nepSign },
    { text: `Pluton en ${plSign} : rien de ce qui compte vraiment ne se construit sans une part de démolition préalable, aussi inconfortable soit-elle à traverser.`, planet: 'pluto', sign: plSign },
    { text: `Mercure en ${mercSign} : les mots que tu choisis de te répéter façonnent la réalité que tu vis bien plus que tu ne veux généralement l'admettre.`, planet: 'mercury', sign: mercSign },
    { text: `Soleil en ${sSign}, Lune en ${mSign} : ta vérité personnelle n'a jamais eu besoin d'être validée par quelqu'un d'autre pour être parfaitement réelle.`, planet: 'sun', sign: sSign },
    { text: `Jupiter en ${jupSign}, Saturne en ${satSign} : la chance ne remplace jamais l'effort fourni en amont — elle se contente de l'amplifier, quand il est déjà là.`, planet: 'jupiter', sign: jupSign },
    { text: `Vénus en ${vSign}, Mars en ${marsSign} : ce que tu désires et ce que tu aimes vraiment ne sont pas toujours exactement la même chose. Apprends patiemment à distinguer les deux, l'un de l'autre.`, planet: 'venus', sign: vSign },
    { text: `Ta Lune en ${mSign} : ce que tu ressens mérite d'exister pleinement, sans avoir constamment besoin d'être justifié auprès de qui que ce soit.`, planet: 'moon', sign: mSign },
    { text: `Pluton en ${plSign}, Saturne en ${satSign} : ce que tu es en train de traverser a une fin, même si elle demeure complètement invisible depuis l'endroit où tu te trouves actuellement.`, planet: 'pluto', sign: plSign },
    { text: `Uranus en ${uraSign} : le chaos apparent d'aujourd'hui est très souvent l'ordre de demain, simplement encore mal compris par tout le monde, y compris par toi.`, planet: 'uranus', sign: uraSign },
    { text: `Mercure en ${mercSign}, Jupiter en ${jupSign} : une bonne question vaut fréquemment bien plus qu'une réponse toute faite, prête à l'emploi, qu'on n'a même pas eu à chercher.`, planet: 'mercury', sign: mercSign },
    { text: `Soleil en ${sSign} : tu n'as jamais eu besoin d'attendre de te sentir prêt(e) pour commencer réellement. La préparation parfaite, celle-là, n'a jamais existé pour personne.`, planet: 'sun', sign: sSign },
    { text: `Neptune en ${nepSign}, Lune en ${mSign} : fais confiance à ce que tu ressens avant même d'être capable de l'expliquer clairement avec des mots qui tiennent la route.`, planet: 'neptune', sign: nepSign },
    { text: `Mars en ${marsSign} : ce que tu remets sans cesse à plus tard cache très probablement une peur précise que tu n'as pas encore pris la peine de nommer clairement.`, planet: 'mars', sign: marsSign },
    { text: `${rc.dominantElement} dominant dans ton thème : la réponse à cette question est déjà en toi, écrite dans une langue que ${rc.dominantElement === 'Feu' ? "l'instinct" : rc.dominantElement === 'Eau' ? "l'émotion" : rc.dominantElement === 'Terre' ? "le corps" : "la pensée"} comprend bien avant que les mots n'arrivent à suivre.`, planet: 'sun', sign: sSign },
    { text: `Vénus en ${vSign} : ce qui te semble aujourd'hui être une perte de temps pourrait bien s'avérer, demain, être la préparation la plus précieuse que tu aies jamais eue.`, planet: 'venus', sign: vSign },
    { text: `Saturne en ${satSign}, Jupiter en ${jupSign} : structure et expansion ne s'opposent jamais réellement — elles se complètent, même dans les moments où elles semblent activement se contredire.`, planet: 'saturn', sign: satSign },
    { text: `Jupiter en ${jupSign} : sous-estimer systématiquement ta propre capacité reste, en ce moment précis, ta seule limite véritable — bien avant n'importe quelle circonstance extérieure.`, planet: 'jupiter', sign: jupSign },
    { text: `Ta Lune en ${mSign}, Vénus en ${vSign} : ce que tu ressens et ce que tu désires méritent tous les deux d'être entendus, même dans les moments où ils se contredisent ouvertement.`, planet: 'moon', sign: mSign },
    { text: `Mercure en ${mercSign} : réfléchir trop longtemps à une décision est parfois une manière élégante d'éviter de la prendre pour de bon, sans se l'avouer clairement.`, planet: 'mercury', sign: mercSign },
    { text: `Pluton en ${plSign} : ce qui t'effraie le plus dissimule très souvent ce que tu désires le plus profondément, quelque part sous la peur elle-même.`, planet: 'pluto', sign: plSign },
    { text: `Uranus en ${uraSign}, Mercure en ${mercSign} : la solution que tu cherches ne se trouve probablement pas là où tu regardes depuis le tout début de ta recherche.`, planet: 'uranus', sign: uraSign },
    { text: `${rc.tenseAspects} tensions dans ton thème : ce n'est jamais ce qui est facile qui finit par te définir. C'est ce que tu traverses, précisément dans les moments où c'est difficile.`, planet: 'saturn', sign: satSign },
    { text: `Soleil en ${sSign}, Mars en ${marsSign} : agir avant d'être totalement certain(e) reste, parfois, le seul moyen réel de le devenir un jour.`, planet: 'sun', sign: sSign },
    { text: `Neptune en ${nepSign} : certaines réponses ne se trouvent jamais par la recherche active — elles se laissent simplement traverser, avec le temps, sans qu'on ait à les forcer.`, planet: 'neptune', sign: nepSign },
    { text: `Vénus en ${vSign}, Saturne en ${satSign} : ce que tu construis avec patience finit toujours, sur la durée, par valoir davantage que ce que tu obtiens dans la précipitation.`, planet: 'venus', sign: vSign },
    { text: `Modalité ${rc.dominantModality} : ${rc.dominantModality === 'Cardinal' ? "tu n'as jamais eu besoin de la permission de qui que ce soit pour commencer quelque chose de nouveau" : rc.dominantModality === 'Fixe' ? "ta persévérance vaut, à elle seule, bien plus que n'importe quelle stratégie compliquée qu'on pourrait t'imposer" : "ta capacité à t'adapter sans cesse est une force réelle, jamais un manque de direction à corriger"}.`, planet: 'sun', sign: sSign },
    { text: `Mars en ${marsSign}, Pluton en ${plSign} : ta prochaine transformation ne sera probablement pas douce à traverser. Mais elle sera nécessaire, et elle en vaudra très largement la peine, au bout du compte.`, planet: 'mars', sign: marsSign },
    { text: `Jupiter en ${jupSign} : ce que la vie finit par t'offrir ne ressemble jamais exactement à ce que tu avais imaginé au départ. C'est très souvent bien mieux que prévu, une fois qu'on a fait le deuil du plan initial.`, planet: 'jupiter', sign: jupSign },
    { text: `Il y a une différence nette entre écouter un conseil et attendre qu'on décide à ta place. Aujourd'hui, plus que jamais, seule la deuxième option te maintient immobile.`, planet: 'saturn', sign: satSign },
    { text: `Mercure en ${mercSign} : parfois la question que tu poses n'est pas celle qui compte vraiment. Regarde une seconde fois ce qui se cache juste en dessous, avant de te satisfaire d'une première réponse trop rapide.`, planet: 'mercury', sign: mercSign },
    ...(rc.moonPluto ? [{ text: `Lune ${verbFor(rc.moonPluto.type)} Pluton : tu perçois des couches de vérité que la plupart des gens préfèrent délibérément ignorer. Ce n'est pas un fardeau à porter seul(e) — c'est une forme de lucidité peu commune.`, planet: 'moon', sign: mSign, aspect: rc.moonPluto }] : []),
    ...(rc.sunJupiter ? [{ text: `Soleil ${verbFor(rc.sunJupiter.type)} Jupiter : ${rc.sunJupiter.type === 'Trigone' || rc.sunJupiter.type === 'Sextile' ? "une confiance fondamentale te traverse, même dans les moments les plus difficiles à vivre" : "ton optimisme naturel et ta prudence instinctive se disputent constamment la direction à prendre. Écoute les deux avant de trancher pour de bon"}.`, planet: 'sun', sign: sSign, aspect: rc.sunJupiter }] : []),
    ...(rc.venusSaturn ? [{ text: `Vénus ${verbFor(rc.venusSaturn.type)} Saturne : ce que tu choisis d'aimer ou de valoriser, tu le fais avec un sérieux et un engagement rares. Rien chez toi n'est jamais vraiment superficiel, même quand ça y ressemble de loin.`, planet: 'venus', sign: vSign, aspect: rc.venusSaturn }] : []),
    ...(rc.moonSaturn ? [{ text: `Lune ${verbFor(rc.moonSaturn.type)} Saturne : ta maturité émotionnelle dépasse largement ton âge réel, depuis longtemps déjà. Ce n'est pas toujours confortable à porter, mais c'est une vraie force qui ne trompe jamais.`, planet: 'moon', sign: mSign, aspect: rc.moonSaturn }] : []),
    ...(rc.sunUranus ? [{ text: `Soleil ${verbFor(rc.sunUranus.type)} Uranus : ta trajectoire ne ressemblera jamais vraiment à celle de personne d'autre, et c'est précisément ce qui en fait la valeur. Cesse de la comparer à des chemins qui ne sont pas les tiens.`, planet: 'uranus', sign: uraSign, aspect: rc.sunUranus }] : []),
    ...(rc.venusNeptune ? [{ text: `Vénus ${verbFor(rc.venusNeptune.type)} Neptune : tu vois systématiquement le meilleur potentiel chez les gens et dans les situations. C'est un vrai don, à condition de ne jamais t'en servir pour ignorer ce qui est concrètement devant toi.`, planet: 'venus', sign: vSign, aspect: rc.venusNeptune }] : []),
    ...(rc.jupiterSaturn ? [{ text: `Jupiter ${verbFor(rc.jupiterSaturn.type)} Saturne : ${rc.jupiterSaturn.type === 'Trigone' || rc.jupiterSaturn.type === 'Sextile' ? "tu avances avec un rythme rare : ambitieux sans jamais être précipité, patient sans jamais être passif" : "l'écart entre tes rêves les plus grands et ta prudence naturelle est ta plus grande source de frustration — et, une fois réconcilié, ta plus grande force"}.`, planet: 'jupiter', sign: jupSign, aspect: rc.jupiterSaturn }] : []),
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
    { text: `Vénus en ${vSign} : les gens qui te méritent réellement ne te demanderont jamais de te faire plus petit(e) simplement pour qu'ils se sentent plus grands à côté de toi.`, planet: 'venus', sign: vSign },
    { text: `Ta Lune en ${mSign} sait, presque instantanément, qui est sincère dans une pièce — souvent avant même que la personne n'ait ouvert la bouche pour se présenter.`, planet: 'moon', sign: mSign },
    { text: `Mercure en ${mercSign} : la façon dont tu choisis de t'exprimer détermine largement qui finit par se sentir proche de toi. Ne t'excuse jamais de parler avec autant de précision.`, planet: 'mercury', sign: mercSign },
    { text: `Jupiter en ${jupSign} : ton cercle social est sur le point de s'élargir dans une direction que tu n'avais pas du tout anticipée. Reste curieux(se) face aux rencontres qui sortent du script habituel.`, planet: 'jupiter', sign: jupSign },
    { text: `Saturne en ${satSign} : tu n'as jamais eu besoin d'un grand nombre d'amis. Tu as besoin des bons — et il y a fort à parier que tu les as déjà identifiés depuis un moment.`, planet: 'saturn', sign: satSign },
    { text: `Mars en ${marsSign} : poser une limite claire n'a rien d'un acte d'agressivité. C'est simplement le strict minimum pour te faire respecter dans un groupe, sur la durée.`, planet: 'mars', sign: marsSign },
    { text: `Uranus en ${uraSign} : tu n'as jamais été taillé(e) pour plaire à tout le monde en même temps. Ceux qui te comprennent vraiment ne seront jamais nombreux — et c'est très bien ainsi.`, planet: 'uranus', sign: uraSign },
    { text: `Neptune en ${nepSign} : tu absorbes les états d'âme d'un groupe entier comme une éponge absorbe l'eau. Apprends à te délimiter, pas seulement à ressentir tout ce qui passe.`, planet: 'neptune', sign: nepSign },
    { text: `Pluton en ${plSign} : les amitiés purement superficielles ne te retiennent jamais très longtemps. Ton besoin de profondeur trie naturellement ton entourage, sans même que tu aies à le décider consciemment.`, planet: 'pluto', sign: plSign },
    { text: `Soleil en ${sSign} : la personne que tu es en société et celle que tu es dans la solitude ne devraient jamais être aussi différentes qu'elles le sont parfois.`, planet: 'sun', sign: sSign },
    { text: `Vénus en ${vSign}, Lune en ${mSign} : ce que tu offres si généreusement aux autres, offre-le-toi aussi de temps en temps à toi-même. La générosité commence toujours par soi, avant de se répandre ailleurs.`, planet: 'venus', sign: vSign },
    { text: `Jupiter en ${jupSign}, Mars en ${marsSign} : ton énergie dans un groupe peut soit soulever toute une pièce, soit t'épuiser entièrement en une soirée. Choisis consciemment où tu décides de la mettre, la prochaine fois.`, planet: 'jupiter', sign: jupSign },
    { text: `Saturne en ${satSign} : couper un lien qui ne te sert plus depuis longtemps n'est jamais un échec relationnel. C'est un acte de respect envers toi-même, qui a simplement pris du temps à mûrir.`, planet: 'saturn', sign: satSign },
    { text: `Mercure en ${mercSign} : le malentendu récent que tu ressasses encore n'est peut-être pas exactement ce que tu crois. Reformule-le à voix haute avant d'en tirer une conclusion définitive.`, planet: 'mercury', sign: mercSign },
    { text: `${rc.dominantElement} dominant : en société, tu apportes une énergie que personne d'autre autour de toi ne peut vraiment reproduire de la même façon, même en essayant sincèrement.`, planet: 'venus', sign: vSign },
    { text: `Mars en ${marsSign}, Uranus en ${uraSign} : les groupes trop conventionnels finissent toujours par t'épuiser rapidement. Cherche ceux qui acceptent, sans discuter, que tu penses différemment des autres.`, planet: 'mars', sign: marsSign },
    { text: `Neptune en ${nepSign}, Vénus en ${vSign} : tu vois le meilleur potentiel chez les gens, parfois avant qu'ils ne le voient eux-mêmes. C'est un vrai don — à condition de rester suffisamment lucide pour ne pas te mentir à toi-même.`, planet: 'neptune', sign: nepSign },
    { text: `Pluton en ${plSign}, Lune en ${mSign} : tu n'accordes ta confiance que lentement, et c'est une forme de sagesse — jamais de la méfiance excessive comme certains ont pu te le faire croire.`, planet: 'pluto', sign: plSign },
    { text: `Soleil en ${sSign}, Mercure en ${mercSign} : ta façon de communiquer qui tu es évolue avec le temps, et c'est parfaitement normal. C'est le signe d'un esprit encore vivant, pas d'un manque de constance à corriger.`, planet: 'sun', sign: sSign },
    { text: `Jupiter en ${jupSign} : une personne que tu vas croiser prochainement pourrait bien devenir beaucoup plus importante que ta toute première impression ne le laisse penser aujourd'hui.`, planet: 'jupiter', sign: jupSign },
    { text: `Saturne en ${satSign}, Vénus en ${vSign} : les amitiés que tu construis lentement, sans les précipiter, sont systématiquement celles qui traversent le mieux le temps qui passe.`, planet: 'saturn', sign: satSign },
    { text: `Ta Lune en ${mSign} : sentir que tu ne rentres pas dans un groupe donné n'est pas toujours un problème qu'il faut absolument résoudre. Parfois, c'est simplement le mauvais groupe pour toi, un point c'est tout.`, planet: 'moon', sign: mSign },
    { text: `Mercure en ${mercSign}, Uranus en ${uraSign} : tes idées peuvent déranger avant même d'être réellement comprises par les autres. Ne les édulcore surtout pas juste pour les rendre plus digestes.`, planet: 'mercury', sign: mercSign },
    { text: `Mars en ${marsSign} : poser une limite claire, dite une seule fois, fait souvent plus pour une relation que d'accumuler du ressentiment en silence pendant des mois entiers.`, planet: 'mars', sign: marsSign },
    { text: `Vénus en ${vSign}, Jupiter en ${jupSign} : ta capacité à créer du lien est bien plus solide que tu ne le crois, surtout les jours où tu arrêtes complètement d'y penser stratégiquement.`, planet: 'venus', sign: vSign },
    { text: `Pluton en ${plSign} : les personnes qui ont vraiment vu qui tu es en profondeur, un jour, ne t'oublient jamais complètement — même après plusieurs années sans le moindre contact entre vous.`, planet: 'pluto', sign: plSign },
    { text: `Neptune en ${nepSign} : il existe une frontière fine entre l'empathie et l'auto-sacrifice. Ressentir pour les autres ne devrait jamais te vider entièrement de toi-même, sur la durée.`, planet: 'neptune', sign: nepSign },
    { text: `Soleil en ${sSign} : tu n'as jamais eu besoin d'être aimé(e) par tout le monde pour être en paix avec la personne que tu es réellement, au fond.`, planet: 'sun', sign: sSign },
    { text: `${rc.harmoniousAspects} aspects harmonieux : certaines de tes relations te semblent faciles parce qu'elles le sont vraiment, sincèrement. Ne va pas chercher de complication là où il n'y en a, en réalité, aucune.`, planet: 'venus', sign: vSign },
    { text: `Uranus en ${uraSign}, Saturne en ${satSign} : tu as besoin à la fois de liberté et de stabilité dans tes relations. Ce n'est absolument pas contradictoire — c'est simplement rare à trouver réuni chez la même personne.`, planet: 'uranus', sign: uraSign },
    { text: `Jupiter en ${jupSign} : ouvre-toi à des cercles sociaux que tu n'aurais jamais sérieusement envisagés avant aujourd'hui. L'expansion vient rarement de l'endroit où on l'attendait le plus.`, planet: 'jupiter', sign: jupSign },
    { text: `Mars en ${marsSign}, Pluton en ${plSign} : ta loyauté, une fois accordée, est absolue et ne se négocie plus. Ceux qui la trahissent finissent presque toujours par le regretter, souvent trop tard.`, planet: 'mars', sign: marsSign },
    { text: `Modalité ${rc.dominantModality} : dans un groupe, tu as tendance à ${rc.dominantModality === 'Cardinal' ? "prendre naturellement les devants, même sans jamais chercher activement à le faire" : rc.dominantModality === 'Fixe' ? "devenir le pilier stable sur lequel tout le monde finit par s'appuyer sans même te le dire" : "faire circuler les idées et les gens entre eux, comme un pont vivant"}.`, planet: 'venus', sign: vSign },
    { text: `Mercure en ${mercSign} : les silences dans une conversation t'en disent parfois plus long que n'importe quel mot prononcé à voix haute. Continue à les écouter attentivement.`, planet: 'mercury', sign: mercSign },
    { text: `Vénus en ${vSign} : appartenir à un groupe ne devrait jamais te coûter le prix de te trahir toi-même, quelle que soit la valeur apparente de ce groupe.`, planet: 'venus', sign: vSign },
    { text: `Il y a une différence nette entre s'adapter à quelqu'un et disparaître pour lui. Ta Lune en ${mSign} connaît très bien cette frontière — la question est de savoir si tu la respectes vraiment, en ce moment.`, planet: 'moon', sign: mSign },
    { text: `Saturne en ${satSign} : le silence prolongé d'un ami n'est pas toujours un signal négatif à interpréter. Parfois, les gens traversent des périodes qui n'ont absolument rien à voir avec toi.`, planet: 'saturn', sign: satSign },
    { text: `Jupiter en ${jupSign}, Neptune en ${nepSign} : une communauté qui te correspond vraiment existe quelque part, même si tu ne l'as pas encore trouvée. Continue de chercher un peu en dehors des cercles habituels et attendus.`, planet: 'jupiter', sign: jupSign },
    ...(rc.sunSaturn ? [{ text: `Soleil ${verbFor(rc.sunSaturn.type)} Saturne : en société, tu portes une forme de sérieux qui inspire confiance sans effort particulier de ta part, même quand tu ne le recherches pas activement.`, planet: 'sun', sign: sSign, aspect: rc.sunSaturn }] : []),
    ...(rc.venusMars ? [{ text: `Vénus ${verbFor(rc.venusMars.type)} Mars : ta présence sociale mélange douceur et intensité d'une manière que les gens remarquent instinctivement, sans toujours en comprendre précisément la raison.`, planet: 'venus', sign: vSign, aspect: rc.venusMars }] : []),
    ...(rc.venusNeptune ? [{ text: `Vénus ${verbFor(rc.venusNeptune.type)} Neptune : tu crées du lien avec une qualité presque poétique, rare chez la plupart des gens. ${rc.venusNeptune.type === 'Carré' || rc.venusNeptune.type === 'Opposition' ? "Vérifie simplement que l'idéal que tu vois chez l'autre correspond bien à ce qu'il est réellement" : "C'est un vrai don, celui de faire sentir les gens véritablement vus"}.`, planet: 'venus', sign: vSign, aspect: rc.venusNeptune }] : []),
    ...(rc.sunJupiter ? [{ text: `Soleil ${verbFor(rc.sunJupiter.type)} Jupiter : ta présence a naturellement un effet d'entraînement sur les groupes que tu fréquentes. Les gens se sentent souvent plus grands en ta compagnie, sans savoir pourquoi exactement.`, planet: 'sun', sign: sSign, aspect: rc.sunJupiter }] : []),
    ...(rc.mercuryJupiter ? [{ text: `Mercure ${verbFor(rc.mercuryJupiter.type)} Jupiter : tes conversations ont tendance à élargir durablement les perspectives des autres. On ressort rarement d'un échange avec toi exactement comme on y est entré au départ.`, planet: 'mercury', sign: mercSign, aspect: rc.mercuryJupiter }] : []),
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

function getVoidResponse(q: string, responses: Record<string, VoidResponse[]>, history: HistoryEntry[] = []): VoidResponse {
  const cat = detectCategory(q);
  const rs = responses[cat] || responses.general;
  // Mix hash with randomness for variety — same question can give different responses
  const h = q.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const offset = Math.floor(Math.random() * rs.length);
  let candidate = rs[(h + offset) % rs.length];
  // Évite de redonner mot pour mot la même réponse que la dernière fois
  // où cette question précise a été posée.
  const qNorm = q.trim().toLowerCase();
  const lastSame = history.find(e => e.question.trim().toLowerCase() === qNorm);
  if (lastSame && rs.length > 1 && candidate.text === lastSame.response.text) {
    candidate = rs[(h + offset + 1) % rs.length];
  }
  return candidate;
}

// ─── LocalStorage ───────────────────────────────────────────
const HK = 'void_history';
const BK = 'void_birth_data';
function loadH(): HistoryEntry[] { try { return JSON.parse(localStorage.getItem(HK) || '[]'); } catch { return []; } }
function saveH(h: HistoryEntry[]) {
  localStorage.setItem(HK, JSON.stringify(h.slice(0, 50)));
  pushVoidCloudData({ history: h.slice(0, 50) });
}
function loadBD(): VoidBirthData | null { try { const d = localStorage.getItem(BK); return d ? JSON.parse(d) : null; } catch { return null; } }
function saveBD(d: VoidBirthData) {
  localStorage.setItem(BK, JSON.stringify(d));
  pushVoidCloudData({ birthData: d });
}

// ─── Loader texts ───────────────────────────────────────────
const LOADER_TEXTS = [
  'Les étoiles consultent ton thème…',
  'Les planètes s\'alignent…',
  'L\'univers prépare ta réponse…',
  'Les astres déchiffrent ton ciel…',
  'Connexion au cosmos en cours…',
];

// ─── Validation date/heure de naissance ──────────────────────
// Date.UTC() ne rejette jamais une valeur hors plage : un mois 13 ou un jour
// 32 "roule" silencieusement vers la date suivante valide au lieu d'échouer.
// Ces helpers vérifient donc de vraies bornes calendaires avant de laisser
// passer la valeur, pour ne jamais calculer un thème sur une date erronée
// sans que la personne s'en aperçoive.
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
function daysInMonth(month: number, year: number): number {
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}
function isValidCalendarDate(day: number, month: number, year: number): boolean {
  const currentYear = new Date().getFullYear();
  if (!Number.isFinite(day) || !Number.isFinite(month) || !Number.isFinite(year)) return false;
  if (year < 1900 || year > currentYear) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > daysInMonth(month, year)) return false;
  return true;
}
function isValidClockTime(hours: number, minutes: number): boolean {
  return Number.isFinite(hours) && Number.isFinite(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

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
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [chartInfo, setChartInfo] = useState<ChartInfo | null>(null);

  // ─── App state ──────────────────────────────────────────
  const [screen, setScreen] = useState<Screen>(savedBD ? 'void' : 'birth-form');
  const [question, setQuestion] = useState('');
  const [resp, setResp] = useState<VoidResponse | null>(null);
  const [cat, setCat] = useState('general');
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(loadH);
  // ─── Limite quotidienne de questions gratuites ─────────────
  // Dérivée de l'historique existant plutôt que d'un compteur séparé : pas de
  // nouvel état à synchroniser, et impossible à contourner en rechargeant la page.
  // TODO produit : remplacer `isPremium` par le vrai statut d'abonnement une
  // fois le système de paiement branché ailleurs dans l'app (il n'existe pas
  // encore dans le code à ce jour — tout le monde est donc en gratuit pour
  // l'instant, ce qui est exact).
  const isPremium = false;
  const todayQuestionCount = useMemo(() => {
    const todayStr = new Date().toDateString();
    return history.filter(h => new Date(h.timestamp).toDateString() === todayStr).length;
  }, [history]);
  const hasReachedDailyLimit = !isPremium && todayQuestionCount >= FREE_DAILY_QUESTIONS;
  const [pinned, setPinned] = useState(false);
  const [hearted, setHearted] = useState(false);
  const [chartSum, setChartSum] = useState('');
  const [relatedSuggestions, setRelatedSuggestions] = useState<string[]>([]);
  const [loaderText, setLoaderText] = useState('');
  const [showSourceDetails, setShowSourceDetails] = useState(false);
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
      // Décalage réel pour CETTE date précise (été/hiver), pas un offset fixe à l'année.
      const [y, mo, d] = bd.date.split('-').map(Number);
      const [hh, mi] = (bd.time || '12:00').split(':').map(Number);
      const naiveUtc = new Date(Date.UTC(y || 2000, (mo || 1) - 1, d || 1, hh ?? 12, mi ?? 0));
      const offsetHours = getUtcOffsetHours(naiveUtc, city.tz);
      const dateTime = parseBirthDateTime(bd.date, bd.time, offsetHours);
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

  // ─── Synchro cloud (cross-device) ──────────────────────────
  // Best-effort : le localStorage reste la source instantanée, Supabase est
  // une copie qui permet de retrouver ses données sur un autre appareil.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cloud = await fetchVoidCloudData();
      if (cancelled || !cloud) return;

      // Historique : fusion sans perte (union locale + distante, dédupliquée
      // par question + horodatage, triée, plafonnée à 50).
      const localH = loadH();
      const cloudH = Array.isArray(cloud.history) ? (cloud.history as HistoryEntry[]) : [];
      if (cloudH.length) {
        const merged = [...localH, ...cloudH]
          .filter((e, i, arr) => arr.findIndex(x => x.timestamp === e.timestamp && x.question === e.question) === i)
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, 50);
        if (merged.length !== localH.length) {
          setHistory(merged);
          localStorage.setItem(HK, JSON.stringify(merged));
        }
      } else if (localH.length) {
        // Rien encore côté cloud pour cette session/ce compte : on pousse l'historique local.
        pushVoidCloudData({ history: localH });
      }

      // Thème de naissance : on n'adopte le thème distant que si l'appareil actuel n'en a pas.
      const cloudBD = (cloud.birthData as VoidBirthData | null) || null;
      const localBD = loadBD();
      if (cloudBD && !localBD) {
        localStorage.setItem(BK, JSON.stringify(cloudBD));
        computeChart(cloudBD);
      } else if (!cloudBD && localBD) {
        pushVoidCloudData({ birthData: localBD });
      }
    })();
    return () => { cancelled = true; };
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
      const day = Number(value.slice(0, 2)), month = Number(value.slice(2, 4)), year = Number(value.slice(4, 8));
      if (isValidCalendarDate(day, month, year)) {
        setBirthDate(`${value.slice(4, 8)}-${value.slice(2, 4)}-${value.slice(0, 2)}`);
        setDateError('');
      } else {
        // On efface toute date stockée précédemment : le bouton doit rester
        // désactivé tant que ce qui est affiché à l'écran n'est pas valide.
        setBirthDate('');
        const currentYear = new Date().getFullYear();
        setDateError(
          month < 1 || month > 12 ? 'Mois invalide (01–12)' :
          (year < 1900 || year > currentYear) ? `Année invalide (1900–${currentYear})` :
          'Ce jour n\'existe pas pour ce mois'
        );
      }
    } else {
      setDateError('');
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let formatted = '';
    if (value.length > 0) { formatted = value.slice(0, 2); }
    if (value.length > 2) { formatted += ':' + value.slice(2, 4); }
    setBirthTimeDisplay(formatted);
    if (value.length >= 4) {
      const hours = Number(value.slice(0, 2)), minutes = Number(value.slice(2, 4));
      if (isValidClockTime(hours, minutes)) {
        setBirthTime(`${value.slice(0, 2)}:${value.slice(2, 4)}`);
        setTimeError('');
      } else {
        setBirthTime('');
        setTimeError(hours > 23 ? 'Heure invalide (00–23)' : 'Minutes invalides (00–59)');
      }
    } else {
      setTimeError('');
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
    setScreen('void'); setQuestion(''); setResp(null);
    setBlocked(false); setPinned(false); setHearted(false);
    setShowMenu(false); setShowSourceDetails(false);
    // Renouveller les questions affichées (filtrées des questions déjà posées)
    const askedQuestions = history.map(h => h.question);
    setDisplayedQuestions({
      soi: filterAndLimitQuestions(VOID_QUESTIONS_POOL.soi, askedQuestions),
      amour: filterAndLimitQuestions(VOID_QUESTIONS_POOL.amour, askedQuestions),
      travail: filterAndLimitQuestions(VOID_QUESTIONS_POOL.travail, askedQuestions),
      social: filterAndLimitQuestions(VOID_QUESTIONS_POOL.social, askedQuestions),
    });
  }, [history]);

  const askQuestion = useCallback((raw: string) => {
    const q = raw.trim();
    if (!q || !responses) return;
    if (hasReachedDailyLimit) { setScreen('void'); return; }
    if (isBlocked(q)) { setQuestion(q); setBlocked(true); return; }
    setQuestion(q); setBlocked(false); setScreen('result'); setLoading(true);
    setPinned(false); setHearted(false); setShowSourceDetails(false);
    setLoaderText(LOADER_TEXTS[Math.floor(Math.random() * LOADER_TEXTS.length)]);
    const c = detectCategory(q); setCat(c);
    setTimeout(() => {
      const r = getVoidResponse(q, responses, history);
      setResp(r); setLoading(false);
      setRelatedSuggestions(getRandomSuggestions(c, [...history.map(h => h.question), q]));
      const entry: HistoryEntry = { question: q, response: r, pinned: false, liked: null, timestamp: Date.now() };
      const nh = [entry, ...history];
      setHistory(nh); saveH(nh);
    }, 1800);
  }, [history, responses, hasReachedDailyLimit]);

  const submit = useCallback(() => { askQuestion(question); }, [askQuestion, question]);

  // Pioche une question au hasard, toutes catégories confondues, parmi celles pas encore posées.
  const surpriseMe = useCallback(() => {
    const allQuestions = [
      ...VOID_QUESTIONS_POOL.soi, ...VOID_QUESTIONS_POOL.amour,
      ...VOID_QUESTIONS_POOL.travail, ...VOID_QUESTIONS_POOL.social,
    ];
    const askedQuestions = history.map(h => h.question);
    const remaining = filterAndLimitQuestions(allQuestions, askedQuestions, allQuestions.length);
    const pick = remaining[0] || allQuestions[Math.floor(Math.random() * allQuestions.length)];
    askQuestion(pick.charAt(0) + pick.slice(1).toLowerCase());
  }, [history, askQuestion]);

  const doShare = useCallback(() => {
    if (!resp) return;
    const t = `✨ The Void :\n\n« ${resp.text} »\n\n— ${PS[resp.planet]} ${PN[resp.planet]} en ${resp.sign}`;
    navigator.share ? navigator.share({ text: t }).catch(() => {}) : navigator.clipboard.writeText(t).catch(() => {});
  }, [resp]);

  const doPin = useCallback(() => {
    setPinned(p => !p);
    if (history.length) { const nh = [...history]; nh[0] = { ...nh[0], pinned: !pinned }; setHistory(nh); saveH(nh); }
  }, [history, pinned]);

  // Persiste le "cœur" dans l'historique, exactement comme doPin le fait pour l'épingle.
  const doLike = useCallback(() => {
    setHearted(h => !h);
    if (history.length) { const nh = [...history]; nh[0] = { ...nh[0], liked: !hearted }; setHistory(nh); saveH(nh); }
  }, [history, hearted]);

  // Ouvre une entrée d'historique (récente ou épinglée) — logique partagée entre les deux listes du menu.
  const openHistoryEntry = useCallback((e: HistoryEntry) => {
    setShowMenu(false);
    setQuestion(e.question); setResp(e.response); setCat(detectCategory(e.question));
    setLoading(false); setShowSourceDetails(false);
    setHearted(e.liked === true); setPinned(e.pinned); setScreen('result');
  }, []);

  const fmtText = (text: string) => {
    const ew = ['force','lave','eau','phénix','alchimie','superpouvoir','cathédrale','rêve','vérité','lumière','ombres','feu','océan','trésor','boussole','renaissance','métamorphose','volcan','inarrêtable','nager','sixième sens','permission','étoiles','gestation','rayonner','laser','flamme','braise','montagne','ancrage','envol','profondeurs','vent','racine'];
    let r = text;
    ew.forEach(w => { r = r.replace(new RegExp(`\\b(${w})\\b`, 'gi'), '**$1**'); });
    return r.split(/\*\*(.*?)\*\*/g).map((p, i) =>
      i % 2 === 1 ? <span key={i} className="void-emph">{p}</span> : <span key={i}>{p}</span>
    );
  };

  // Pendant le chargement, la catégorie est déjà connue (detectCategory tourne
  // avant le délai d'attente) : l'icône correspondante se distingue des 3 autres
  // plutôt que de pulser à égalité. Si la question est "avenir"/"général" (aucune
  // des 4 icônes ne correspond), on garde le pulse d'origine sur les 4.
  const knownCategoryDetected = VOID_CATEGORIES.some(vc => vc.id === cat);
  const loadingSatState = (id: VoidCategory): 'main' | 'dim' | '' => {
    if (!knownCategoryDetected) return '';
    return cat === id ? 'main' : 'dim';
  };
  const loadingSatStyle = (id: VoidCategory): React.CSSProperties | undefined => {
    if (loadingSatState(id) !== 'main') return undefined;
    const color = CATEGORY_BADGE[id]?.color;
    return color ? { color, background: `${color}22`, boxShadow: `0 0 18px ${color}55` } : undefined;
  };
  const responseStructure = resp ? structureVoidResponse(resp.text) : null;
  const responseAction = getVoidAction(cat);

  // ═══ RENDER ═══
  return (
    <div className="void-page">
      <canvas ref={starsRef} className="tv-stars-canvas" />

      {/* ═══ ÉCRAN 0 : FORMULAIRE NAISSANCE ═══ */}
      {screen === 'birth-form' && (
        <div className="tv-page tv-page--birth tv-emerge">
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
                  {dateError && <p className="tv-birth-error">{dateError}</p>}
                </div>
                <div>
                  <label className="tv-birth-label"><Clock size={12} /> Heure</label>
                  <input type="text" value={birthTimeDisplay} onChange={handleTimeChange} placeholder="HH:MM" maxLength={5} className="tv-birth-input" required aria-label="Heure de naissance" />
                  {timeError && <p className="tv-birth-error">{timeError}</p>}
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
        <div className="tv-page tv-page--void tv-emerge">
          {onBack && (
            <button onClick={onBack} className="tv-corner-btn tv-corner-left" aria-label="Quitter">
              <X size={18} />
            </button>
          )}
          <button className="tv-corner-btn tv-corner-right" onClick={() => setShowMenu(m => !m)} aria-label="Menu">
            {showMenu ? <X size={18} /> : <Menu size={18} />}
          </button>

          {hasReachedDailyLimit ? (
            <div className="tv-limit-reached tv-emerge">
              <p className="tv-limit-title">Le vide se repose jusqu'à demain</p>
              <p className="tv-limit-text">
                Tu as posé ta question gratuite d'aujourd'hui. Reviens demain pour une nouvelle réponse —
                l'accès illimité arrive bientôt.
              </p>
            </div>
          ) : (
            <main className="tv-void-shell">
              <header className="tv-void-header">
                <span className="tv-void-kicker">Oracle personnel</span>
                <h1 className="tv-void-title">Le Vide</h1>
                <span className="tv-void-sigil" aria-hidden="true">✦</span>
              </header>

              {/* Catégories */}
              <div className="tv-categories" role="tablist" aria-label="Catégories de questions">
                {VOID_CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`tv-category-btn ${isActive ? 'active' : ''}`}
                      role="tab"
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
              <section className="tv-question-section">
                <div className="tv-question-toolbar">
                  <p className="tv-question-heading">Questions suggérées</p>
                  <button onClick={surpriseMe} className="tv-surprise-btn">
                    <Sparkles size={14} />
                    <span>Surprends-moi</span>
                  </button>
                </div>
                <div className="tv-questions-zone" key={activeCategory}>
                  {displayedQuestions[activeCategory].map((q, i) => {
                    const label = q.charAt(0) + q.slice(1).toLowerCase();
                    return (
                      <button
                        key={q}
                        className="tv-question-item"
                        style={{ animationDelay: `${i * 55}ms` }}
                        onClick={() => askQuestion(label)}
                      >
                        <span>{label}</span>
                        <ChevronRight size={16} aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
                </section>

              {/* Champ de saisie en bas */}
              <div className="tv-bottom-input">
                <div className="tv-input-wrap-v2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={question}
                    onChange={e => { setQuestion(e.target.value); setBlocked(false); }}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
                    placeholder="Demande ce que tu veux…"
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
                        <button key={a} onClick={() => askQuestion(a)} className="tv-blocked-btn">{a}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </main>
          )}

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
                {history.some(h => h.pinned) && (
                  <div className="tv-menu-history">
                    <p className="tv-menu-history-label">Épinglées</p>
                    {history.filter(h => h.pinned).map((e, i) => (
                      <button key={`pin-${i}`} onClick={() => openHistoryEntry(e)} className="tv-menu-hist-item">
                        <span>« {e.question} »</span>
                      </button>
                    ))}
                  </div>
                )}
                {history.length > 0 && (
                  <div className="tv-menu-history">
                    <p className="tv-menu-history-label">Récent</p>
                    {history.slice(0, 5).map((e, i) => (
                      <button key={i} onClick={() => openHistoryEntry(e)} className="tv-menu-hist-item">
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
        <div className="tv-page tv-page--result tv-emerge">
          <button onClick={goVoid} className="tv-corner-btn tv-corner-left" aria-label="Retour">
            <X size={18} />
          </button>

          <div className="tv-center">
            {loading ? (
              <div className="tv-loading">
                <p
                  className="tv-question-absorb"
                  style={{ '--tv-ritual-color': CATEGORY_BADGE[cat]?.color || '#ffd07a' } as React.CSSProperties}
                >
                  « {question} »
                </p>
                <div className="tv-loading-orbit">
                  <div className="tv-loading-ring" />
                  <div className="tv-loading-core" />
                  <div className={`tv-loading-sat tv-sat-top ${loadingSatState('soi') === 'main' ? 'tv-sat-main' : loadingSatState('soi') === 'dim' ? 'tv-sat-dim' : ''}`} style={loadingSatStyle('soi')}><EsotericEye /></div>
                  <div className={`tv-loading-sat tv-sat-right ${loadingSatState('amour') === 'main' ? 'tv-sat-main' : loadingSatState('amour') === 'dim' ? 'tv-sat-dim' : ''}`} style={loadingSatStyle('amour')}><EsotericMoon /></div>
                  <div className={`tv-loading-sat tv-sat-bottom ${loadingSatState('travail') === 'main' ? 'tv-sat-main' : loadingSatState('travail') === 'dim' ? 'tv-sat-dim' : ''}`} style={loadingSatStyle('travail')}><EsotericTriangle /></div>
                  <div className={`tv-loading-sat tv-sat-left ${loadingSatState('social') === 'main' ? 'tv-sat-main' : loadingSatState('social') === 'dim' ? 'tv-sat-dim' : ''}`} style={loadingSatStyle('social')}><EsotericConstellation /></div>
                </div>
                <p className="tv-loading-text">{loaderText}</p>
              </div>
            ) : (
              <div className="tv-response tv-emerge">
                {CATEGORY_BADGE[cat] && (
                  <span className="tv-response-badge" style={{ color: CATEGORY_BADGE[cat].color, borderColor: CATEGORY_BADGE[cat].color }}>
                    {CATEGORY_BADGE[cat].label}
                  </span>
                )}
                <p className="tv-response-question">« {question} »</p>
                {resp && responseStructure && (
                  <>
                    <section className="tv-response-reading" aria-label="Lecture du Vide">
                      <div className="tv-response-phase tv-response-essence">
                        <span className="tv-response-phase-label">Le message</span>
                        <p>{fmtText(responseStructure.essence)}</p>
                      </div>

                      {responseStructure.explanation && (
                        <div className="tv-response-phase tv-response-explanation">
                          <span className="tv-response-phase-label">Ce que cela éclaire</span>
                          <p>{fmtText(responseStructure.explanation)}</p>
                        </div>
                      )}

                      <div className="tv-response-phase tv-response-practice">
                        <span className="tv-response-phase-label">À faire aujourd’hui</span>
                        <p>{responseAction}</p>
                      </div>
                    </section>

                    <div className={`tv-source-wrap${showSourceDetails ? ' is-open' : ''}`}>
                      <button
                        type="button"
                        className="tv-source-seal"
                        onClick={() => setShowSourceDetails(value => !value)}
                        aria-expanded={showSourceDetails}
                      >
                        <span className="tv-source-glyph" aria-hidden="true">{PS[resp.planet]}</span>
                        <span className="tv-source-copy">
                          <small>Source du message</small>
                          <strong>{PN[resp.planet]} en {resp.sign}</strong>
                        </span>
                        <ChevronRight className="tv-source-chevron" size={16} aria-hidden="true" />
                      </button>
                      {showSourceDetails && (
                        <p className="tv-source-detail tv-emerge">{getSourceExplanation(resp)}</p>
                      )}
                    </div>

                    <div className="tv-response-actions">
                      <button onClick={doLike} className={`tv-action-btn ${hearted ? 'active' : ''}`} aria-label="Aimer">
                        <Heart size={14} fill={hearted ? '#fff' : 'none'} />
                      </button>
                      <button onClick={doPin} className={`tv-action-btn ${pinned ? 'active' : ''}`} aria-label="Épingler">
                        <Pin size={14} />
                      </button>
                      <button onClick={doShare} className="tv-action-btn" aria-label="Partager">
                        <Share2 size={14} />
                      </button>
                    </div>

                    {relatedSuggestions.length > 0 && (
                      <div className="tv-related">
                        <p className="tv-related-label">Tu pourrais aussi te demander</p>
                        <div className="tv-related-chips">
                          {relatedSuggestions.map(s => (
                            <button key={s} onClick={() => askQuestion(s)} className="tv-related-chip">
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

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
