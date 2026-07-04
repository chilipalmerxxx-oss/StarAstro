import { useState, useEffect, useRef, type CSSProperties } from 'react';
import { Heart, ChevronDown, ArrowRight, RotateCcw, Sparkles, Plus } from 'lucide-react';

const SIGNS = [
  { id: 0,  name: 'Bélier',     glyph: '🐏', element: 'fire'  },
  { id: 1,  name: 'Taureau',    glyph: '🐂', element: 'earth' },
  { id: 2,  name: 'Gémeaux',    glyph: '👯', element: 'air'   },
  { id: 3,  name: 'Cancer',     glyph: '🦀', element: 'water' },
  { id: 4,  name: 'Lion',       glyph: '🦁', element: 'fire'  },
  { id: 5,  name: 'Vierge',     glyph: '🌸', element: 'earth' },
  { id: 6,  name: 'Balance',    glyph: '⚖️', element: 'air'   },
  { id: 7,  name: 'Scorpion',   glyph: '🦂', element: 'water' },
  { id: 8,  name: 'Sagittaire', glyph: '🏹', element: 'fire'  },
  { id: 9,  name: 'Capricorne', glyph: '🐐', element: 'earth' },
  { id: 10, name: 'Verseau',    glyph: '🏺', element: 'air'   },
  { id: 11, name: 'Poissons',   glyph: '🐟', element: 'water' },
];

const ELEMENT_COLORS: Record<string, string> = {
  fire:  '#FF7A45',
  earth: '#8DB56A',
  air:   '#7EC8E3',
  water: '#5B9BD5',
};

// Base score by aspect distance (0 = same sign, 6 = opposition)
const BASE_SCORES: Record<number, number> = {
  0: 82, 1: 54, 2: 76, 3: 43, 4: 91, 5: 37, 6: 67,
};

// Compatible element pairs get a bonus
const COMPAT_PAIRS = new Set(['fire-air', 'air-fire', 'earth-water', 'water-earth']);
const SAME_PAIRS   = new Set(['fire-fire', 'earth-earth', 'air-air', 'water-water']);

const SIGN_MODALITIES = [
  'cardinal', 'fixed', 'mutable', 'cardinal', 'fixed', 'mutable',
  'cardinal', 'fixed', 'mutable', 'cardinal', 'fixed', 'mutable',
];

const ELEMENT_LABELS: Record<string, string> = {
  fire: 'feu',
  earth: 'terre',
  air: 'air',
  water: 'eau',
};

const MODALITY_LABELS: Record<string, string> = {
  cardinal: 'cardinal',
  fixed: 'fixe',
  mutable: 'mutable',
};

const MODALITY_PLURALS: Record<string, string> = {
  cardinal: 'cardinaux',
  fixed: 'fixes',
  mutable: 'mutables',
};

const ASPECT_DESCS: Record<number, string> = {
  0: 'une conjonction de signes : mêmes réflexes amoureux, même rythme, et parfois les mêmes angles morts.',
  1: 'un semi-sextile : deux langages proches en apparence, mais des priorités qui ne se devinent pas toutes seules.',
  2: 'un sextile : l’accord se construit facilement, avec de la curiosité, du dialogue et des ajustements naturels.',
  3: 'un carré : une tension réelle, stimulante si elle devient une conversation plutôt qu’un bras de fer.',
  4: 'un trigone : une circulation naturelle entre les deux signes, avec une compréhension presque instinctive.',
  5: 'un quinconce : l’attirance existe, mais la relation demande traduction, patience et un peu de mode d’emploi.',
  6: 'une opposition : deux pôles complémentaires, capables de se révéler autant que de se provoquer.',
};

function getElementInsight(el1: string, el2: string): string {
  if (el1 === el2) {
    const sameElementInsights: Record<string, string> = {
      fire: 'Vous partez vite, parfois très vite. Gardez l’élan, mais laissez aussi la tendresse reprendre son souffle.',
      earth: 'Vous cherchez du fiable, du concret, du présent. Très rassurant, sauf si la routine commence à gérer la relation à votre place.',
      air: 'Vos mots créent le lien. Le risque : tout analyser avant d’avoir vraiment ressenti. Oui, même le flirt a droit au silence.',
      water: 'Vous vous captez facilement. C’est précieux, tant que l’intuition ne remplace pas une phrase claire.',
    };
    return sameElementInsights[el1] || `Votre élément ${ELEMENT_LABELS[el1]} crée une base commune. Reste à la vivre clairement, pas seulement à la ressentir.`;
  }
  const key = `${el1}-${el2}`;
  if (key === 'fire-air' || key === 'air-fire') {
    return 'L’un allume, l’autre fait circuler. L’émotion passe mieux quand l’enthousiasme devient aussi une vraie écoute.';
  }
  if (key === 'earth-water' || key === 'water-earth') {
    return 'Sécurité et sensibilité peuvent très bien s’accorder. La proximité grandit dans les gestes réguliers, pas dans les grandes promesses lancées à minuit.';
  }
  if (key === 'fire-water' || key === 'water-fire') {
    return 'L’un réagit vite, l’autre absorbe d’abord. Le lien tient mieux quand personne ne confond vitesse et vérité.';
  }
  if (key === 'fire-earth' || key === 'earth-fire') {
    return 'L’un veut avancer, l’autre veut vérifier le sol. Décidez ensemble du prochain pas, sinon chacun croit tirer la relation dans le bon sens.';
  }
  if (key === 'air-water' || key === 'water-air') {
    return 'L’un met des mots, l’autre sent les nuances. La magie arrive quand l’explication ne vient pas écraser le ressenti.';
  }
  return 'Vos priorités ne tombent pas toujours au même endroit. Dites ce que vous attendez vraiment ; le télépathique, c’est joli, mais peu fiable.';
}

function getModalityInsight(m1: string, m2: string): string {
  if (m1 === m2) {
    if (m1 === 'cardinal') return 'Vous savez lancer les choses. Pour éviter le petit concours de direction artistique, partagez les décisions.';
    if (m1 === 'fixed') return 'Vous pouvez tenir fort. Le défi : ne pas appeler “loyauté” ce qui est juste une belle obstination.';
    return 'Vous vous adaptez vite. Donnez quand même une forme au lien, sinon tout reste ouvert, même les questions importantes.';
  }
  const pair = new Set([m1, m2]);
  if (pair.has('cardinal') && pair.has('fixed')) return 'L’un lance, l’autre stabilise. C’est puissant si la décision ne devient pas un match retour.';
  if (pair.has('cardinal') && pair.has('mutable')) return 'L’un donne l’impulsion, l’autre ajuste. Très utile, à condition de ne pas changer le plan toutes les dix minutes.';
  return 'L’un apporte de la constance, l’autre de la souplesse. Bon équilibre, si chacun respecte le tempo de l’autre.';
}

type InstantReadingAxis = {
  id: 'emotion' | 'desire' | 'potential';
  label: string;
  score: number;
  verdict: string;
  detail: string;
  color: string;
};

const DESIRE_SCORES: Record<number, number> = {
  0: 88, 1: 62, 2: 78, 3: 91, 4: 85, 5: 74, 6: 94,
};

const DESIRE_INSIGHTS: Record<number, string> = {
  0: 'L’attirance part d’un terrain familier. C’est naturel, mais il faut garder un peu de surprise au programme.',
  1: 'Le désir se construit par couches. Plus la confiance monte, plus le lien devient intéressant.',
  2: 'Le désir passe par les mots, les jeux, les regards qui comprennent avant la phrase complète.',
  3: 'La tension attire fort. À surveiller : ne pas confondre intensité et mini-drame bien emballé.',
  4: 'L’attirance circule facilement. Le risque n’est pas le manque, mais l’habitude de croire que tout va de soi.',
  5: 'Le désir demande un temps d’adaptation. Quand chacun comprend le langage de l’autre, ça devient plus subtil.',
  6: 'L’attirance est magnétique et contrastée. Les différences allument le désir, mais elles demandent aussi du tact.',
};

const EMOTION_ELEMENT_SCORES: Record<string, number> = {
  'fire-fire': 82,
  'fire-earth': 54,
  'fire-air': 78,
  'fire-water': 46,
  'earth-fire': 54,
  'earth-earth': 86,
  'earth-air': 49,
  'earth-water': 88,
  'air-fire': 78,
  'air-earth': 49,
  'air-air': 84,
  'air-water': 57,
  'water-fire': 46,
  'water-earth': 88,
  'water-air': 57,
  'water-water': 90,
};

const ASPECT_EMOTION_MODIFIERS: Record<number, number> = {
  0: 7, 1: -3, 2: 5, 3: -9, 4: 8, 5: -6, 6: -1,
};

const ASPECT_POTENTIAL_MODIFIERS: Record<number, number> = {
  0: 2, 1: -7, 2: 7, 3: -4, 4: 9, 5: -6, 6: 4,
};

const MODALITY_POTENTIAL_MODIFIERS: Record<string, number> = {
  'cardinal-cardinal': -3,
  'cardinal-fixed': 3,
  'cardinal-mutable': 6,
  'fixed-cardinal': 3,
  'fixed-fixed': -6,
  'fixed-mutable': 5,
  'mutable-cardinal': 6,
  'mutable-fixed': 5,
  'mutable-mutable': 1,
};

function clampScore(value: number): number {
  return Math.min(98, Math.max(18, Math.round(value)));
}

function getAxisVerdict(_axis: InstantReadingAxis['id'], score: number): string {
  if (score >= 86) return 'Intense';
  if (score >= 72) return 'Fluide';
  if (score >= 58) return 'En devenir';
  return 'Délicat';
}

const LOVE_GAUGE_SEGMENTS = 10;

function getGaugeSegments(score: number): number {
  return Math.max(1, Math.min(LOVE_GAUGE_SEGMENTS, Math.round(score / 10)));
}

function getInstantReading(score: number, s1: number, s2: number): InstantReadingAxis[] {
  const el1 = SIGNS[s1].element;
  const el2 = SIGNS[s2].element;
  const elementKey = `${el1}-${el2}`;
  const diff = Math.abs(s1 - s2);
  const distance = Math.min(diff, 12 - diff);
  const modality1 = SIGN_MODALITIES[s1];
  const modality2 = SIGN_MODALITIES[s2];
  const modalityKey = `${modality1}-${modality2}`;

  const emotionScore = clampScore(
    (EMOTION_ELEMENT_SCORES[elementKey] ?? 62) +
    (ASPECT_EMOTION_MODIFIERS[distance] ?? 0) +
    (modality1 === modality2 ? -2 : 2)
  );
  const desireScore = clampScore(
    DESIRE_SCORES[distance] +
    (COMPAT_PAIRS.has(elementKey) ? 4 : 0) +
    (SAME_PAIRS.has(elementKey) ? -2 : 0) +
    (distance === 3 || distance === 6 ? 3 : 0)
  );
  const potentialScore = clampScore(
    score +
    (ASPECT_POTENTIAL_MODIFIERS[distance] ?? 0) +
    (MODALITY_POTENTIAL_MODIFIERS[modalityKey] ?? 0) +
    (COMPAT_PAIRS.has(elementKey) ? 3 : 0) -
    (elementKey === 'fire-water' || elementKey === 'water-fire' ? 4 : 0)
  );

  const potentialLead = potentialScore >= 80
    ? 'Le lien a une vraie marge de construction dans le temps.'
    : potentialScore >= 60
      ? 'Le lien peut évoluer dans le bon sens si vos différences sont nommées assez tôt.'
      : 'La relation demande des règles claires, sinon chacun risque de jouer à un jeu différent.';

  const axes: InstantReadingAxis[] = [
    {
      id: 'emotion',
      label: 'Émotion',
      score: emotionScore,
      verdict: '',
      detail: getElementInsight(el1, el2),
      color: '#F08DA5',
    },
    {
      id: 'desire',
      label: 'Désir',
      score: desireScore,
      verdict: '',
      detail: DESIRE_INSIGHTS[distance],
      color: '#F0B45B',
    },
    {
      id: 'potential',
      label: 'Potentiel',
      score: potentialScore,
      verdict: '',
      detail: `${potentialLead} ${getModalityInsight(modality1, modality2)}`,
      color: '#F8EFE1',
    },
  ];

  return axes.map(axis => ({ ...axis, verdict: getAxisVerdict(axis.id, axis.score) }));
}

type RelationshipKey = {
  title: string;
  text: string;
  practice: string;
};

function getRelationshipKey(score: number, s1: number, s2: number): RelationshipKey {
  const first = SIGNS[s1];
  const second = SIGNS[s2];
  const diff = Math.abs(s1 - s2);
  const distance = Math.min(diff, 12 - diff);
  const elementKey = `${first.element}-${second.element}`;

  if (distance === 3 || distance === 6) {
    return {
      title: 'Clarifier les besoins',
      text: `${first.name} et ${second.name} ne réagissent pas toujours au même signal. Les non-dits peuvent vite devenir un sport de combat.`,
      practice: 'À privilégier : dire le besoin précis derrière chaque désaccord.',
    };
  }
  if (SAME_PAIRS.has(elementKey)) {
    return {
      title: 'Préserver l’autonomie',
      text: 'Vos réflexes se ressemblent, ce qui aide beaucoup. Garder un espace à soi évite de transformer la fusion en abonnement illimité.',
      practice: 'À privilégier : soutenir un projet personnel de l’autre, sans le piloter.',
    };
  }
  if (COMPAT_PAIRS.has(elementKey)) {
    return {
      title: 'Structurer la relation',
      text: 'Votre complémentarité aide le lien à respirer. Elle devient vraiment forte quand elle s’incarne dans des habitudes simples.',
      practice: 'À privilégier : créer un rendez-vous régulier, même court, consacré au lien.',
    };
  }
  if (score >= 75) {
    return {
      title: 'Aborder les sujets sensibles',
      text: 'La compatibilité est bonne, mais elle ne lit pas dans les pensées. Les sujets évités finissent toujours par prendre une voix plus forte.',
      practice: 'À privilégier : poser une question directe et écouter la réponse sans préparer la défense.',
    };
  }
  return {
    title: 'Traduire vos attentes',
    text: `${first.name} et ${second.name} n’expriment pas l’attachement de la même manière. Ce n’est pas un problème si chacun donne la légende de sa carte.`,
    practice: 'À privilégier : préciser ce qui permet à chacun de se sentir choisi.',
  };
}

const PAIR_VERDICTS: Record<string, string> = {
  '0-0': 'Impulsion jumelle',
  '0-1': 'Élan terrestre',
  '0-2': 'Étincelle vive',
  '0-3': 'Flamme tendre',
  '0-4': 'Soleil ardent',
  '0-5': 'Geste précis',
  '0-6': 'Choc harmonique',
  '0-7': 'Passion profonde',
  '0-8': 'Aventure brûlante',
  '0-9': 'Ambition directe',
  '0-10': 'Liberté pionnière',
  '0-11': 'Rêve incandescent',
  '1-1': 'Ancrage fidèle',
  '1-2': 'Calme curieux',
  '1-3': 'Douce sécurité',
  '1-4': 'Velours solaire',
  '1-5': 'Confiance patiente',
  '1-6': 'Charme sensuel',
  '1-7': 'Aimant secret',
  '1-8': 'Horizon stable',
  '1-9': 'Royaume durable',
  '1-10': 'Tradition libre',
  '1-11': 'Refuge tendre',
  '2-2': 'Esprit miroir',
  '2-3': 'Parole sensible',
  '2-4': 'Jeu solaire',
  '2-5': 'Intelligence fine',
  '2-6': 'Grâce mentale',
  '2-7': 'Mystère léger',
  '2-8': 'Mouvement complice',
  '2-9': 'Humour sérieux',
  '2-10': 'Fréquence rare',
  '2-11': 'Brume claire',
  '3-3': 'Lunes jumelles',
  '3-4': 'Tendresse rayonnante',
  '3-5': 'Soin discret',
  '3-6': 'Douce harmonie',
  '3-7': 'Fusion abyssale',
  '3-8': 'Nid voyageur',
  '3-9': 'Sécurité ambitieuse',
  '3-10': 'Intimité libre',
  '3-11': 'Rêve ancré',
  '4-4': 'Éclat double',
  '4-5': 'Chaleur précise',
  '4-6': 'Charme royal',
  '4-7': 'Loyauté intense',
  '4-8': 'Joie ardente',
  '4-9': 'Fierté maîtrisée',
  '4-10': 'Soleil libre',
  '4-11': 'Romance lumineuse',
  '5-5': 'Précision fidèle',
  '5-6': 'Élégance attentive',
  '5-7': 'Secret analysé',
  '5-8': 'Ordre sauvage',
  '5-9': 'Loyauté concrète',
  '5-10': 'Idéal précis',
  '5-11': 'Rêve utile',
  '6-6': 'Miroir élégant',
  '6-7': 'Charme profond',
  '6-8': 'Joie légère',
  '6-9': 'Tendresse noble',
  '6-10': 'Accord original',
  '6-11': 'Beauté sensible',
  '7-7': 'Profondeur loyale',
  '7-8': 'Intensité libre',
  '7-9': 'Confiance dense',
  '7-10': 'Distance magnétique',
  '7-11': 'Intuition profonde',
  '8-8': 'Liberté jumelle',
  '8-9': 'Rêve construit',
  '8-10': 'Futur aventureux',
  '8-11': 'Foi rêveuse',
  '9-9': 'Patience souveraine',
  '9-10': 'Structure nouvelle',
  '9-11': 'Réalisme doux',
  '10-10': 'Indépendance complice',
  '10-11': 'Vision intuitive',
  '11-11': 'Sensibilité jumelle',
};

function getRelationshipVerdict(score: number, s1: number, s2: number): string {
  const key = `${Math.min(s1, s2)}-${Math.max(s1, s2)}`;
  const pairVerdict = PAIR_VERDICTS[key];
  if (pairVerdict) return pairVerdict;
  if (score >= 88) return 'Fusion naturelle';
  if (score >= 75) return 'Complicité claire';
  if (score >= 60) return 'Équilibre vivant';
  if (score >= 45) return 'Lien exigeant';
  return 'Accord à construire';
}

function getPairResultLine(s1: number, s2: number): string {
  const first = SIGNS[s1];
  const second = SIGNS[s2];
  const diff = Math.abs(s1 - s2);
  const distance = Math.min(diff, 12 - diff);
  const elementKey = `${first.element}-${second.element}`;

  if (s1 === s2) {
    return `${first.name} et ${second.name} se reconnaissent vite. Le lien est naturel, mais il gagne à garder un peu de mystère, juste assez pour ne pas finir en miroir de salle de bain.`;
  }
  if (distance === 6) {
    return `${first.name} et ${second.name} se répondent par contraste. L’attirance est forte quand chacun arrête de croire que sa façon d’aimer est le mode par défaut.`;
  }
  if (distance === 3) {
    return `${first.name} et ${second.name} créent une vraie tension. Elle peut réveiller le désir, à condition de parler avant que le désaccord ne prenne le micro.`;
  }
  if (distance === 5) {
    return `${first.name} et ${second.name} ne lisent pas toujours la même notice. Le lien devient intéressant quand chacun traduit ses attentes au lieu de les faire deviner.`;
  }
  if (COMPAT_PAIRS.has(elementKey)) {
    return `${first.name} et ${second.name} ont une complémentarité facile à sentir. Pour qu’elle dure, il faut la nourrir par des gestes réguliers, pas seulement par une belle impression.`;
  }
  if (SAME_PAIRS.has(elementKey)) {
    return `${first.name} et ${second.name} partagent un même élément. La complicité vient vite, mais l’équilibre demande de ne pas aimer exactement de la même place.`;
  }

  return `${first.name} et ${second.name} avancent avec des réflexes différents. Le lien peut tenir si chacun explique son rythme avant de juger celui de l’autre.`;
}

function computeScore(s1: number, s2: number): number {
  const diff = Math.abs(s1 - s2);
  const dist = Math.min(diff, 12 - diff);
  const base = BASE_SCORES[dist];
  const el1  = SIGNS[s1].element;
  const el2  = SIGNS[s2].element;
  const key  = `${el1}-${el2}`;
  const bonus = SAME_PAIRS.has(key) ? 8 : COMPAT_PAIRS.has(key) ? 5 : 0;
  return Math.min(98, Math.max(14, base + bonus));
}

function getLabel(score: number): { title: string; desc: string; color: string } {
  if (score >= 88) return {
    title: 'Âmes jumelles',
    desc: 'Une connexion très fluide, presque trop évidente. Reste à la vivre, pas seulement à l’admirer.',
    color: '#FFD700',
  };
  if (score >= 75) return {
    title: 'Harmonie stellaire',
    desc: 'Une belle complicité. Le lien circule bien quand chacun reste clair sur ce qu’il attend.',
    color: '#FFB86B',
  };
  if (score >= 60) return {
    title: 'Équilibre délicat',
    desc: 'Un vrai potentiel, avec quelques réglages à faire. Rien de dramatique, juste humain.',
    color: '#A78BFA',
  };
  if (score >= 45) return {
    title: 'Tension créatrice',
    desc: "De l’intensité, oui. Mais elle doit devenir un dialogue, pas une série à suspense.",
    color: '#F97316',
  };
  return {
    title: 'Accord à traduire',
    desc: "L’attirance peut exister, mais le lien demande de vraies traductions. Les sous-titres sont recommandés.",
    color: '#EF4444',
  };
}

// ─── Per-pair mystical descriptions ─────────────────────
const PAIR_DESCS: Record<string, string> = {};

function getPairDesc(s1: number, s2: number): string {
  const key = `${Math.min(s1, s2)}-${Math.max(s1, s2)}`;
  return POETIC_PAIR_DESCS[key] || PAIR_DESCS[key] || '';
}

function getPairSubtitle(s1: number, s2: number): string {
  const description = getPairDesc(s1, s2);
  const opening = (description.split('—')[0] || description.split('.')[0] || description)
    .trim()
    .replace(/[.,;:]$/, '');

  if (opening) return opening;
  return `${SIGNS[s1].name} et ${SIGNS[s2].name}, une alchimie singulière`;
}

const POETIC_PAIR_DESCS: Record<string, string> = {
  '0-0': "Deux impulsions franches se reconnaissent vite. C’est vivant, direct, parfois un peu trop rapide pour la tendresse.",
  '0-1': "L’un veut foncer, l’autre veut sécuriser. Le lien devient fort quand l’élan respecte le besoin de preuve.",
  '0-2': "L’attirance passe par le jeu et la conversation. Le feu ose, l’air répond, et la complicité se réveille vite.",
  '0-3': "L’un agit, l’autre ressent. Le lien peut être très attachant si la vitesse du premier laisse de la place à la sensibilité du second.",
  '0-4': "Deux tempéraments solaires se stimulent. C’est chaud, généreux, parfois très fier, donc pensez à laisser une place à l’autre sur scène.",
  '0-5': "L’élan rencontre la précision. Ça fonctionne quand l’action accepte les nuances et que l’analyse ne transforme pas tout en audit.",
  '0-6': "L’attirance vient du contraste. L’un décide vite, l’autre cherche l’accord, et la relation devient belle quand personne ne force le tempo.",
  '0-7': "Connexion magnétique, difficile à ignorer. Le lien demande de la franchise, sinon la passion peut vite mettre une couronne au contrôle.",
  '0-8': "Deux feux qui aiment l’espace. La relation respire dans l’aventure, l’humour et la liberté qui ne sert pas d’excuse pour disparaître.",
  '0-9': "L’un pousse, l’autre structure. Si l’impatience accepte la maturité, le lien peut devenir solide sans perdre son feu.",
  '0-10': "Attirance stimulante, parfois imprévisible. Ça marche quand chacun garde sa liberté sans traiter l’engagement comme une alarme incendie.",
  '0-11': "Le feu réveille l’eau, l’eau adoucit le feu. C’est beau quand le désir apprend à écouter avant d’accélérer.",
  '1-1': "Deux signes qui cherchent la paix, la fidélité et le concret. Le lien avance lentement, mais il peut devenir très rassurant.",
  '1-2': "La stabilité rencontre la curiosité. L’attirance tient si l’un accepte le mouvement et si l’autre respecte le besoin de calme.",
  '1-3': "Un lien doux, protecteur, presque familier. La terre rassure l’eau, et l’eau donne plus de profondeur à la tendresse.",
  '1-4': "Beaucoup de sensualité et de chaleur. L’un cherche le confort, l’autre la reconnaissance, et chacun peut nourrir l’autre.",
  '1-5': "Compatibilité calme et concrète. Ici, l’amour se prouve dans la présence, les gestes fiables et les petites attentions régulières.",
  '1-6': "Lien charmeur, sensuel et esthétique. Il devient très doux quand les attentes restent simples, sincères, et pas trop scénarisées.",
  '1-7': "Attirance profonde, parfois possessive. Le lien devient puissant quand la confiance remplace le besoin de vérifier trois fois.",
  '1-8': "La sécurité rencontre le besoin d’horizon. Pour durer, la relation doit protéger sans enfermer.",
  '1-9': "Deux énergies patientes et constructives. Le lien peut manquer de légèreté, mais il sait tenir quand les choses deviennent réelles.",
  '1-10': "La stabilité croise l’indépendance. Relation intéressante si chacun accepte une façon différente d’aimer, sans vouloir corriger le logiciel de l’autre.",
  '1-11': "Lien tendre et enveloppant. La terre donne un appui, l’eau apporte l’imaginaire, et l’amour peut devenir très doux.",
  '2-2': "Deux esprits rapides se captent facilement. La relation vit de conversation, de jeu et d’une curiosité toujours rallumée.",
  '2-3': "L’un parle, l’autre ressent. Le lien devient beau quand les mots ne remplacent pas l’écoute émotionnelle.",
  '2-4': "Relation vive et lumineuse. L’un amuse, l’autre rayonne, mais les petits jeux d’ego méritent une pause café.",
  '2-5': "Deux signes qui observent beaucoup. L’amour passe par l’intelligence, les détails et une complicité qui se construit.",
  '2-6': "Affinité élégante et légère. Les mots circulent bien, le charme agit vite, et le lien reste agréable s’il ne fuit pas les vrais sujets.",
  '2-7': "La légèreté rencontre l’intensité. L’attirance intrigue, mais la relation demande plus de profondeur que d’esquive.",
  '2-8': "Deux signes qui ont besoin d’air. La complicité est forte quand l’amour reste vivant, mobile et ouvert.",
  '2-9': "L’humour rencontre le sérieux. La relation gagne en force quand chacun respecte la façon d’avancer de l’autre.",
  '2-10': "Connexion mentale très naturelle. Le lien peut être libre, original et nourri par des idées que personne d’autre ne suit.",
  '2-11': "L’esprit rencontre l’intuition. Il y a de la magie, à condition de clarifier les attentes et les silences.",
  '3-3': "Deux sensibilités se comprennent sans beaucoup parler. C’est doux, protecteur, mais il faut éviter d’absorber chaque variation d’humeur.",
  '3-4': "La tendresse rencontre la chaleur. L’un nourrit, l’autre rassure par sa présence, et le cœur peut s’ouvrir vite.",
  '3-5': "Relation faite de soin et de discrétion. L’amour se montre dans les attentions concrètes plus que dans les grands discours.",
  '3-6': "Lien tendre qui cherche l’harmonie. La douceur est la clé, surtout quand les émotions changent de météo.",
  '3-7': "Deux signes d’eau, beaucoup d’intuition. La relation peut être profonde si elle garde des repères simples.",
  '3-8': "Le besoin de refuge rencontre le besoin d’ailleurs. L’amour tient si l’aventure sait revenir vers le cœur.",
  '3-9': "La sensibilité rencontre l’ambition. Le lien devient fort quand la pudeur émotionnelle trouve une vraie sécurité.",
  '3-10': "Relation délicate, entre besoin d’intimité et besoin d’espace. Elle demande confiance, douceur et un peu moins de devinettes.",
  '3-11': "Deux imaginaires se rejoignent facilement. Le lien est tendre et inspiré, mais il doit rester ancré dans le réel.",
  '4-4': "Deux cœurs fiers et généreux. L’amour peut être magnifique si chacun admire l’autre sans chercher à prendre toute la lumière.",
  '4-5': "L’éclat rencontre la précision. La relation fonctionne quand la chaleur du cœur respecte les détails de l’autre.",
  '4-6': "Alliance de charme et de lumière. Le lien aime la beauté, les attentions et le sentiment d’être choisi.",
  '4-7': "Attirance intense entre lumière et profondeur. Pour durer, il faut de la loyauté et beaucoup de vérité.",
  '4-8': "Deux feux qui aiment vivre grand. La relation est joyeuse, directe, et a besoin de projets qui donnent envie.",
  '4-9': "La fierté rencontre la maîtrise. Le lien devient solide quand l’admiration remplace la compétition.",
  '4-10': "Le besoin d’être vu rencontre le besoin d’être libre. C’est fort si chacun respecte la singularité de l’autre.",
  '4-11': "Le soleil réchauffe l’eau. La relation peut être très romantique si la sensibilité ne se sent pas brusquée.",
  '5-5': "Deux signes attentifs, parfois exigeants. L’amour se construit par la confiance, la fiabilité et les gestes utiles.",
  '5-6': "Relation fine, polie, attentive aux détails. Elle devient très belle quand elle ose aussi la spontanéité.",
  '5-7': "L’analyse rencontre le mystère. Le lien grandit quand la prudence accepte de se laisser toucher.",
  '5-8': "L’ordre rencontre l’appel du large. L’amour demande de la souplesse pour ne pas transformer la différence en critique.",
  '5-9': "Deux signes de terre, sérieux et loyaux. Le lien peut sembler discret, mais il sait devenir très fiable.",
  '5-10': "La précision rencontre l’originalité. La relation marche si chacun voit la richesse de l’autre au lieu de la corriger.",
  '5-11': "Le concret rencontre le rêve. L’amour peut être doux et réparateur si les promesses restent simples.",
  '6-6': "Deux signes qui cherchent la justesse. Le lien est charmeur et raffiné, mais doit parfois oser dire ce qui dérange.",
  '6-7': "La douceur rencontre l’intensité. L’attirance est forte, surtout quand le charme laisse place à la confiance.",
  '6-8': "Relation légère et vivante. L’amour respire quand il garde de la joie, de la sincérité et un peu d’espace.",
  '6-9': "L’élégance rencontre la retenue. Le lien peut devenir noble et stable si la tendresse n’est pas trop contrôlée.",
  '6-10': "Deux signes d’air, libres et curieux. La relation peut être originale, complice et très stimulante mentalement.",
  '6-11': "La beauté rencontre la sensibilité. Le lien est doux, parfois idéalisé, mais il peut inspirer beaucoup de tendresse.",
  '7-7': "Deux intensités se reconnaissent. Le lien est profond et loyal, mais il demande de ne pas tester l’amour comme une alarme.",
  '7-8': "La profondeur rencontre la liberté. L’attirance est forte si le besoin d’espace ne blesse pas le besoin de sécurité.",
  '7-9': "Relation dense, sérieuse, capable de tenir. Le lien grandit dans la confiance et les preuves discrètes.",
  '7-10': "L’intensité rencontre l’indépendance. Relation puissante si chacun accepte de ne pas tout comprendre.",
  '7-11': "Deux eaux intuitives et profondes. Le lien peut être très fusionnel, à condition de garder des repères clairs.",
  '8-8': "Deux esprits libres se reconnaissent vite. L’amour a besoin d’horizon, de sincérité et de mouvement.",
  '8-9': "L’aventure rencontre la construction. Le lien devient fort quand le rêve trouve une direction concrète.",
  '8-10': "Relation libre, inventive, parfois surprenante. Elle fonctionne si l’engagement ne ressemble pas à une contrainte.",
  '8-11': "L’élan rencontre le rêve. Le lien peut être inspirant, mais il doit garder un cap pour ne pas se disperser.",
  '9-9': "Deux signes solides, pudiques, ambitieux. L’amour se construit lentement, mais avec une vraie profondeur.",
  '9-10': "La structure rencontre l’imprévu. La relation devient intéressante quand la sécurité accepte un peu de nouveauté.",
  '9-11': "Le réalisme rencontre la sensibilité. L’un stabilise, l’autre adoucit, et le lien peut devenir très protecteur.",
  '10-10': "Deux indépendances se comprennent. Le lien est fort quand personne ne cherche à posséder l’autre.",
  '10-11': "La vision rencontre l’intuition. La relation peut être douce et singulière si elle reste honnête sur ses besoins.",
  '11-11': "Deux sensibilités se devinent facilement. L’amour peut être très tendre, presque silencieux, s’il reste ancré.",
};

function getCompatibilityDescription(score: number, s1: number, s2: number): string {
  const key = `${Math.min(s1, s2)}-${Math.max(s1, s2)}`;
  return POETIC_PAIR_DESCS[key] || getPairDesc(s1, s2);
}

function withoutFinalPeriod(text: string): string {
  return text.replace(/\.\s*$/, '');
}

function playSoftSelectChime() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const t = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, t);
    master.gain.exponentialRampToValueAtTime(0.08, t + 0.018);
    master.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    master.connect(ctx.destination);

    [660, 990].forEach((frequency, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = frequency;
      gain.gain.value = index === 0 ? 0.42 : 0.22;
      osc.connect(gain);
      gain.connect(master);
      osc.start(t + index * 0.025);
      osc.stop(t + 0.18);
    });

    setTimeout(() => ctx.close(), 260);
  } catch (_) { /* silently ignore if AudioContext unavailable */ }
}

// ─── Astral whoosh via Web Audio API ─────────────────────
function playAstralWhoosh() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const t = ctx.currentTime;
    const totalDuration = 3.5;

    // ── Reverb 4s ─────────────────────────────────────────
    const reverbBuf = ctx.createBuffer(2, ctx.sampleRate * 4.0, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = reverbBuf.getChannelData(ch);
      for (let i = 0; i < d.length; i++)
        d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2.0);
    }
    const convolver = ctx.createConvolver();
    convolver.buffer = reverbBuf;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.75, t);
    convolver.connect(master);
    master.connect(ctx.destination);
    const dry = ctx.createGain(); dry.gain.value = 0.35; dry.connect(master);
    const wet = ctx.createGain(); wet.gain.value = 0.65; wet.connect(convolver);
    const route = (g: GainNode) => { g.connect(dry); g.connect(wet); };

    // ── Drum body — pitch sweep 180 → 40 Hz ──────────────
    const drum = ctx.createOscillator();
    const drumG = ctx.createGain();
    drum.type = 'sine';
    drum.frequency.setValueAtTime(180, t);
    drum.frequency.exponentialRampToValueAtTime(40, t + 0.35);
    drumG.gain.setValueAtTime(0.35, t);
    drumG.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    drum.connect(drumG); route(drumG);

    // ── Attack noise transient ────────────────────────────
    const noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.08), ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    const noiseS = ctx.createBufferSource(); noiseS.buffer = noiseBuf;
    const noiseG = ctx.createGain();
    noiseG.gain.setValueAtTime(0.25, t);
    noiseG.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    noiseS.connect(noiseG); route(noiseG);

    // ── Overtone singing — harmonics bloom after 0.8s ────
    ([[220, 0.8, 0.12, 2.2], [330, 0.85, 0.07, 1.8], [440, 0.9, 0.04, 1.4], [528, 0.95, 0.03, 1.0]] as [number,number,number,number][]).forEach(([f, del, amp, dur]) => {
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0, t + del);
      g.gain.linearRampToValueAtTime(amp, t + del + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + del + dur);
      o.connect(g); route(g); o.start(t + del); o.stop(t + del + dur + 0.2);
    });

    // ── Sub pulse — grounding ─────────────────────────────
    const subO = ctx.createOscillator();
    const subG = ctx.createGain();
    subO.type = 'sine'; subO.frequency.value = 40;
    subG.gain.setValueAtTime(0.30, t);
    subG.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
    subO.connect(subG); route(subG);

    drum.start(t); drum.stop(t + 0.6);
    noiseS.start(t);
    subO.start(t); subO.stop(t + 0.5);

    setTimeout(() => ctx.close(), (totalDuration + 0.5) * 1000);
  } catch (_) { /* silently ignore if AudioContext unavailable */ }
}

// ─── Glow keyframes injected once ────────────────────────
const GLOW_STYLE = `
  @keyframes glow-fire {
    0%,100% { text-shadow: 0 0 6px #FF7A4588, 0 0 14px #FF7A4540; transform: scale(1); }
    50%      { text-shadow: 0 0 14px #FF7A45CC, 0 0 28px #FF7A4566; transform: scale(1.08); }
  }
  @keyframes glow-earth {
    0%,100% { text-shadow: 0 0 6px #8DB56A88, 0 0 14px #8DB56A40; transform: scale(1); }
    50%      { text-shadow: 0 0 14px #8DB56ACC, 0 0 28px #8DB56A66; transform: scale(1.08); }
  }
  @keyframes glow-air {
    0%,100% { text-shadow: 0 0 6px #7EC8E388, 0 0 14px #7EC8E340; transform: scale(1); }
    50%      { text-shadow: 0 0 14px #7EC8E3CC, 0 0 28px #7EC8E366; transform: scale(1.08); }
  }
  @keyframes glow-water {
    0%,100% { text-shadow: 0 0 6px #5B9BD588, 0 0 14px #5B9BD540; transform: scale(1); }
    50%      { text-shadow: 0 0 14px #5B9BD5CC, 0 0 28px #5B9BD566; transform: scale(1.08); }
  }

  @keyframes love-restart-pulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 rgba(255, 199, 146, 0);
    }
    50% {
      transform: scale(1.04);
      box-shadow: 0 0 16px rgba(255, 199, 146, 0.35);
    }
  }

  @keyframes love-orbit-drift {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes love-breathe {
    0%, 100% { transform: scale(1); opacity: .76; }
    50% { transform: scale(1.08); opacity: 1; }
  }

  @keyframes love-sign-confirm {
    0% { transform: scale(.985); filter: brightness(1); }
    45% { transform: scale(1.025); filter: brightness(1.2); }
    100% { transform: scale(1); filter: brightness(1); }
  }

  @keyframes love-rise {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes love-bridge-draw {
    0% {
      stroke-dashoffset: 1;
      opacity: 0;
      filter: drop-shadow(0 0 0 rgba(255, 226, 194, 0));
    }
    24% { opacity: .72; }
    100% {
      stroke-dashoffset: 0;
      opacity: 1;
      filter: drop-shadow(0 0 8px rgba(255, 226, 194, .28));
    }
  }

  @keyframes love-bridge-rung-in {
    from { opacity: 0; transform: scaleY(.4); }
    to { opacity: 1; transform: scaleY(1); }
  }

  @keyframes love-bridge-node-pop {
    0% { opacity: 0; transform: scale(.45); }
    58% { opacity: 1; transform: scale(1.28); }
    100% { opacity: 1; transform: scale(1); }
  }

  @keyframes love-result-sign-connect {
    0% {
      opacity: 0;
      transform: translateX(var(--love-sign-drift, 0)) scale(.84);
      filter: brightness(.85);
    }
    58% {
      opacity: 1;
      transform: translateX(0) scale(1.08);
      filter: brightness(1.22);
    }
    100% {
      opacity: 1;
      transform: translateX(0) scale(1);
      filter: brightness(1);
    }
  }

  @keyframes love-axis-fill {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }

  @keyframes love-axis-light {
    0% { opacity: 0; transform: translate(10px, -50%) scale(.72); }
    35% { opacity: 1; }
    100% { opacity: .88; transform: translate(0, -50%) scale(1); }
  }

  @keyframes love-axis-segment-in {
    0% { opacity: 0; transform: scaleX(.18); }
    100% { opacity: 1; transform: scaleX(1); }
  }

  @keyframes love-score-arc-awake {
    0% { opacity: 0; filter: drop-shadow(0 0 0 rgba(255,255,255,0)); }
    100% { opacity: 1; filter: drop-shadow(0 0 10px rgba(255,226,194,.14)); }
  }

  .love-bridge-line {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: love-bridge-draw 1.45s cubic-bezier(.18, .78, .18, 1) forwards;
  }

  .love-bridge-line--soft {
    animation-delay: .24s;
  }

  .love-bridge-rung {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
    animation: love-bridge-rung-in .64s ease forwards;
  }

  .love-bridge-node {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
    animation: love-bridge-node-pop .68s ease forwards;
  }

  .love-result-sign {
    opacity: 0;
    animation: love-result-sign-connect 1.05s cubic-bezier(.16, 1, .3, 1) forwards;
  }

  .love-result-sign--left {
    --love-sign-drift: -22px;
    animation-delay: .1s;
  }

  .love-result-sign--right {
    --love-sign-drift: 22px;
    animation-delay: .26s;
  }

  .love-axis-fill {
    position: relative;
    overflow: visible;
    transform-origin: left center;
    animation: love-axis-fill 1.35s var(--love-axis-delay, 0ms) cubic-bezier(.18, .78, .18, 1) both;
  }

  .love-axis-light {
    position: absolute;
    top: 50%;
    right: -3px;
    width: 18px;
    height: 18px;
    border-radius: 999px;
    background: radial-gradient(circle, var(--love-axis-color, #E4BE91) 0%, color-mix(in srgb, var(--love-axis-color, #E4BE91) 32%, transparent) 38%, transparent 72%);
    filter: blur(3px);
    opacity: 0;
    animation: love-axis-light 1.35s var(--love-axis-delay, 0ms) ease both;
    pointer-events: none;
  }

  .love-axis-segments {
    display: grid;
    grid-template-columns: repeat(10, minmax(0, 1fr));
    gap: 3px;
    margin-top: 9px;
  }

  .love-axis-segment {
    height: 3px;
    min-width: 0;
    border-radius: 1px;
    background: linear-gradient(180deg, rgba(255, 255, 255, .07), rgba(255, 255, 255, .018));
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .055);
    opacity: .45;
    transform-origin: left center;
    animation: love-axis-segment-in 1.85s var(--love-axis-delay, 0ms) cubic-bezier(.18, .78, .18, 1) both;
  }

  .love-axis-segment.is-filled {
    background:
      linear-gradient(180deg, rgba(255, 255, 255, .28), transparent 64%),
      linear-gradient(180deg, color-mix(in srgb, var(--love-axis-color, #E4BE91) 82%, #fff 8%), color-mix(in srgb, var(--love-axis-color, #E4BE91) 72%, #000 28%));
    box-shadow:
      0 0 9px color-mix(in srgb, var(--love-axis-color, #E4BE91) 32%, transparent),
      inset 0 0 0 1px color-mix(in srgb, var(--love-axis-color, #E4BE91) 24%, rgba(255, 255, 255, .08));
    opacity: 1;
  }

  .love-score-arc {
    animation: love-score-arc-awake .9s .48s ease both;
  }

  .love-page button {
    -webkit-tap-highlight-color: transparent;
  }

  .love-page .love-interactive {
    transition: transform .28s ease, border-color .28s ease, box-shadow .28s ease, background .28s ease;
  }

  .love-page .love-interactive:hover {
    transform: translateY(-2px);
  }

  .love-page .love-interactive:active {
    transform: translateY(0) scale(.985);
  }

  .love-page .love-scrollbar {
    scrollbar-width: none;
  }

  .love-page .love-scrollbar::-webkit-scrollbar {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .love-page *, .love-page *::before, .love-page *::after {
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
    }
  }
`;

function InjectGlowStyles() {
  useEffect(() => {
    if (document.getElementById('love-glow-styles')) return;
    const el = document.createElement('style');
    el.id = 'love-glow-styles';
    el.textContent = GLOW_STYLE;
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, []);
  return null;
}

// ─── Animated counter ─────────────────────────────────────
function useCountUp(target: number | null, duration = 3400): number | null {
  const [value, setValue] = useState<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (target === null) { setValue(null); return; }
    const start = Date.now();
    const startVal = 0;
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(startVal + (target - startVal) * ease));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

// ─── Sign Picker Modal ─────────────────────────────────────
function SignPicker({ onSelect, onClose, sign1, sign2, clearSelectionHighlights = false }: {
  onSelect: (id: number) => void;
  onClose: () => void;
  sign1?: number | null;
  sign2?: number | null;
  clearSelectionHighlights?: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(5,3,6,0.78)', backdropFilter: 'blur(10px)', paddingBottom: 72 }}
      onClick={onClose}
    >
      <div
        className="love-scrollbar w-full max-w-md pt-3 px-4"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(190,132,132,0.15), transparent 34%), linear-gradient(180deg, #1D151C, #100C11)',
          borderTop: '1px solid rgba(231,198,165,0.38)',
          borderRadius: '18px 18px 0 0',
          maxHeight: '76vh',
          overflowY: 'auto',
          paddingBottom: 26,
          boxShadow: '0 -24px 80px rgba(0,0,0,0.5)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center mb-5">
          <div className="w-9 rounded-full" style={{ height: 3, background: 'rgba(229,196,164,0.32)' }} />
        </div>
        <div className="text-center" style={{ marginBottom: 18 }}>
          <p style={{ margin: 0, fontSize: 8.5, color: '#C6A783', letterSpacing: 3, textTransform: 'uppercase', fontWeight: 750 }}>Les douze archétypes</p>
          <h2 style={{ margin: '5px 0 0', fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#FFF8EF', fontSize: 25, fontWeight: 500 }}>Choisissez un signe</h2>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {SIGNS.map(s => {
            const isSelected = !clearSelectionHighlights && ((typeof sign1 === 'number' && s.id === sign1) || (typeof sign2 === 'number' && s.id === sign2));
            const isVeryLongName = s.name.length >= 10;
            const isLongName = s.name.length >= 8;

            return (
              <button
                key={s.id}
                onClick={() => { onSelect(s.id); onClose(); }}
                className="love-interactive flex flex-col items-center justify-center gap-1 py-2"
                style={{
                  background: isSelected
                    ? 'radial-gradient(circle at 50% 10%, rgba(229,196,164,0.16), transparent 62%), rgba(255,255,255,0.055)'
                    : 'rgba(255,255,255,0.025)',
                  border: isSelected ? '1px solid rgba(229, 196, 164, 0.68)' : '1px solid rgba(229, 196, 164, 0.13)',
                  borderRadius: 6,
                  minHeight: 64,
                  boxShadow: isSelected
                    ? '0 10px 24px rgba(0,0,0,0.3), 0 0 18px rgba(229,196,164,0.09), inset 0 1px 0 rgba(255,255,255,0.09)'
                    : '0 6px 16px rgba(0,0,0,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: isSelected ? 'love-sign-confirm .62s ease both' : undefined,
                }}
              >
                <span
                  style={{
                    fontFamily: 'system-ui',
                    fontSize: 23,
                    lineHeight: 0.9,
                    color: isSelected ? '#EAC89F' : ELEMENT_COLORS[s.element],
                    fontWeight: isSelected ? 700 : 500,
                    textShadow: isSelected
                      ? '0 0 10px rgba(255, 207, 142, 0.28), 0 1px 4px rgba(0,0,0,0.7)'
                      : undefined,
                  }}
                >{s.glyph}</span>
                <span
                  style={{
                    fontSize: isVeryLongName ? 8.2 : isLongName ? 8.8 : 9.5,
                    color: isSelected ? '#F3DECA' : '#CBBEC2',
                    letterSpacing: isVeryLongName ? 0.35 : isLongName ? 0.55 : 0.8,
                    fontFamily: '"Avenir Next", system-ui, sans-serif',
                    fontWeight: isSelected ? 750 : 600,
                    lineHeight: 1.05,
                    textAlign: 'center',
                    maxWidth: '100%',
                    whiteSpace: 'nowrap',
                    textShadow: isSelected
                      ? '0 0 10px rgba(255, 207, 142, 0.22), 0 1px 4px rgba(0,0,0,0.7)'
                      : '0 1px 4px rgba(0,0,0,0.45)'
                  }}
                >
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────
export default function LovePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sign1, setSign1] = useState<number | null>(null);
  const [sign2, setSign2] = useState<number | null>(null);
  const [picker, setPicker] = useState<'sign1' | 'sign2' | null>(null);
  const [clearSelectionHighlights, setClearSelectionHighlights] = useState(false);
  const [showPremiumSales, setShowPremiumSales] = useState(false);

  const baseScore = sign1 !== null && sign2 !== null ? computeScore(sign1, sign2) : null;
  const instantAxes = baseScore !== null && sign1 !== null && sign2 !== null ? getInstantReading(baseScore, sign1, sign2) : [];
  const score = instantAxes.length > 0
    ? clampScore(instantAxes.reduce((sum, axis) => sum + axis.score, 0) / instantAxes.length)
    : null;
  const animatedScore = useCountUp(score);
  const label = score !== null ? getLabel(score) : null;
  const hasResult = score !== null && label !== null && animatedScore !== null;
  const relationshipVerdict = hasResult ? getRelationshipVerdict(score!, sign1!, sign2!) : '';
  const pairResultLine = hasResult ? getPairResultLine(sign1!, sign2!) : '';
  const compatibilityDescription = hasResult ? getCompatibilityDescription(score!, sign1!, sign2!) : '';
  const isMobileViewport = typeof window !== 'undefined' && window.matchMedia('(max-width: 480px)').matches;
  const compactResult = hasResult && isMobileViewport;

  const handleSignSelect = (id: number) => {
    const completesPair = picker === 'sign1' ? sign2 !== null : sign1 !== null;

    if (picker === 'sign1') setSign1(id);
    if (picker === 'sign2') setSign2(id);

    if (completesPair) {
      playAstralWhoosh();
      navigator.vibrate?.([28, 35, 70]);
    } else {
      playSoftSelectChime();
      navigator.vibrate?.(12);
    }
  };

  const resetAnalysis = () => {
    playAstralWhoosh();
    navigator.vibrate?.([22, 25, 48]);
    setClearSelectionHighlights(true);
    setSign1(null);
    setSign2(null);
    setPicker(null);
    requestAnimationFrame(() => setClearSelectionHighlights(false));
  };

  // Starfield
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.002 + 0.001,
      warm: Math.random() > 0.5,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() * 0.001;
      stars.forEach(s => {
        const opacity = 0.08 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.speed * 60 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.warm ? `rgba(255,200,120,${opacity})` : `rgba(220,200,255,${opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  if (showPremiumSales) {
    return <LovePremiumSalesPage onBack={() => setShowPremiumSales(false)} />;
  }

  return (
    <div className="love-page relative flex flex-col items-center overflow-hidden px-4"
      style={{
        background: 'radial-gradient(circle at 50% -12%, rgba(190, 132, 132, 0.22), transparent 32%), radial-gradient(circle at 92% 38%, rgba(111, 78, 129, 0.16), transparent 34%), linear-gradient(165deg, #120D14 0%, #1B111A 48%, #0E0B11 100%)',
        height: 'calc(100dvh - 36px)',
        color: '#FDF6ED',
      }}>
      <InjectGlowStyles />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.035), transparent 18%), radial-gradient(ellipse at 50% 24%, rgba(255, 210, 188, 0.075) 0%, transparent 54%), radial-gradient(ellipse at 50% 100%, rgba(63, 38, 67, 0.3), transparent 58%)' }} />
      <div className="absolute inset-x-0 top-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,226,194,0.42), transparent)' }} />

      <div
        className="love-scrollbar relative z-10 w-full max-w-md h-full min-h-0 min-w-0 flex flex-col items-center"
        style={{
          color: '#FDF6ED',
          justifyContent: 'flex-start',
          paddingTop: compactResult ? 14 : 20,
          paddingBottom: hasResult ? 28 : 20,
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center" style={{ flexShrink: 0, marginTop: hasResult ? 0 : 14, marginBottom: hasResult ? (compactResult ? 10 : 12) : 30 }}>
          {hasResult && (
            <div className="flex items-center gap-3" style={{ marginBottom: 9 }}>
              <div className="h-px w-9" style={{ background: 'linear-gradient(90deg, transparent, rgba(238,201,163,0.55))' }} />
              <p style={{ margin: 0, fontSize: 8.5, color: '#D8B995', letterSpacing: 3.5, textTransform: 'uppercase', fontWeight: 750 }}>
                Nightstar · Synastrie
              </p>
              <div className="h-px w-9" style={{ background: 'linear-gradient(90deg, rgba(238,201,163,0.55), transparent)' }} />
            </div>
          )}
          <h1 style={{ margin: 0, fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: hasResult ? (compactResult ? 24 : 27) : 36, fontWeight: 400, color: '#FFF9F1', letterSpacing: hasResult ? 0 : -0.5, lineHeight: 0.94, textShadow: '0 14px 34px rgba(0,0,0,0.42)' }}>
            Compatibilité astrale
          </h1>
          <p style={{ margin: hasResult ? '8px 0 0' : '11px 0 0', fontSize: hasResult ? (compactResult ? 8.5 : 9) : 10.5, color: hasResult ? '#A997A2' : '#B5A7AF', letterSpacing: hasResult ? 1.9 : 1.25, textTransform: hasResult ? 'uppercase' : 'none', fontFamily: '"Avenir Next", "SF Pro Text", system-ui, sans-serif', fontWeight: hasResult ? 650 : 450 }}>
            {hasResult ? 'Explorez la signature de votre lien' : 'Compatibilité astrologique entre deux signes'}
          </p>
        </div>

        {/* Sign selectors */}
        {!hasResult && (
          <div
            className="relative w-full flex items-center justify-between gap-3"
            style={{
              boxSizing: 'border-box',
              maxWidth: '100%',
              overflow: 'hidden',
              flexShrink: 0,
              padding: compactResult ? '18px 12px' : '22px 14px',
              border: '1px solid rgba(220, 185, 151, 0.2)',
              borderRadius: 8,
              background: 'radial-gradient(circle at 50% 45%, rgba(194, 132, 143, 0.11), transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.012)), rgba(13,9,14,0.56)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.055)',
            }}
          >
            <div className="absolute left-1/2 top-0 h-px -translate-x-1/2" style={{ width: '42%', background: 'linear-gradient(90deg, transparent, rgba(241,206,170,0.68), transparent)' }} />

            <SignCard
              sign={sign1 !== null ? SIGNS[sign1] : null}
              label="Ton signe"
              onClick={() => setPicker('sign1')}
            />

            <div className="relative flex flex-col items-center justify-center flex-shrink-0" style={{ width: 38, height: 82 }}>
              <div className="absolute rounded-full" style={{ inset: 2, border: '1px solid rgba(222,185,152,0.18)', animation: 'love-orbit-drift 18s linear infinite' }}>
                <span className="absolute rounded-full" style={{ width: 3, height: 3, top: 2, left: '50%', background: '#E4BE91', boxShadow: '0 0 8px rgba(228,190,145,0.8)' }} />
              </div>
              <div
                className="relative flex items-center justify-center rounded-full"
                style={{
                  width: 28,
                  height: 28,
                  border: '1px solid rgba(237,199,165,0.32)',
                  background: 'rgba(38,21,28,0.82)',
                  boxShadow: '0 0 22px rgba(201,120,137,0.14)',
                  animation: 'love-breathe 2.4s ease-in-out infinite',
                }}
              >
                <Heart size={12} style={{ color: '#EAB6AF', filter: 'drop-shadow(0 0 8px rgba(234,182,175,0.42))' }} fill="rgba(234,182,175,0.22)" strokeWidth={1.35} />
              </div>
              {sign1 !== null && sign2 !== null && (
                <div className="absolute bottom-0" style={{ width: 1, height: 15, background: 'linear-gradient(180deg, rgba(228,190,145,0.44), transparent)' }} />
              )}
            </div>

            <SignCard
              sign={sign2 !== null ? SIGNS[sign2] : null}
              label="Son signe"
              onClick={() => setPicker('sign2')}
            />
          </div>
        )}

        {/* Result */}
        {hasResult && label && (
          <section
            className="w-full"
            style={{
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
              marginTop: compactResult ? 12 : 16,
              padding: compactResult ? '18px 16px 16px' : '20px 18px 18px',
              borderRadius: 16,
              border: `1px solid ${label.color}42`,
              background: `radial-gradient(circle at 50% 32%, ${label.color}36, transparent 34%), radial-gradient(circle at 16% 12%, rgba(255,231,203,0.16), transparent 30%), radial-gradient(circle at 88% 90%, rgba(196,161,220,0.14), transparent 34%), linear-gradient(145deg, rgba(255,255,255,0.076), rgba(255,255,255,0.014)), rgba(11,7,12,0.92)`,
              boxShadow: `0 24px 62px rgba(0,0,0,0.36), 0 0 46px ${label.color}20, inset 0 1px 0 rgba(255,255,255,0.09)`,
              animation: 'love-rise 0.55s ease forwards',
            }}
          >
            <div className="absolute left-0 top-0 h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${label.color}9A, transparent)` }} />
            <div className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 rounded-full" style={{ width: 210, height: 156, background: `radial-gradient(circle, ${label.color}26 0%, ${label.color}10 42%, transparent 72%)`, filter: 'blur(4px)' }} />
            <div className="relative flex flex-col items-center text-center">
              <div className="flex items-center gap-2" style={{ color: '#D7BE9F', fontSize: 8.5, letterSpacing: 2.6, textTransform: 'uppercase', fontWeight: 800 }}>
                <Sparkles size={10} strokeWidth={1.4} />
                Lecture instantanée
              </div>

              <div className="relative flex w-full items-center justify-center" style={{ marginTop: compactResult ? 11 : 14, marginBottom: compactResult ? 34 : 38, gap: compactResult ? 14 : 20 }}>
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  width={compactResult ? 198 : 218}
                  height={compactResult ? 64 : 68}
                  viewBox="0 0 218 68"
                  style={{ opacity: 0.78, filter: `drop-shadow(0 0 10px ${label.color}3E)` }}
                >
                  <path className="love-bridge-line" pathLength={1} d="M28 34 C54 10, 82 10, 109 34 S164 58, 190 34" fill="none" stroke={`url(#love-bridge-${sign1}-${sign2})`} strokeWidth="1.15" strokeLinecap="round" />
                  <path className="love-bridge-line love-bridge-line--soft" pathLength={1} d="M28 34 C54 58, 82 58, 109 34 S164 10, 190 34" fill="none" stroke={`url(#love-bridge-soft-${sign1}-${sign2})`} strokeWidth="1.05" strokeLinecap="round" />
                  {[
                    [48, 21, 48, 47],
                    [68, 16, 68, 52],
                    [88, 23, 88, 45],
                    [130, 45, 130, 23],
                    [150, 52, 150, 16],
                    [170, 47, 170, 21],
                  ].map(([x1, y1, x2, y2], index) => (
                    <path
                      key={`${x1}-${y1}`}
                      className="love-bridge-rung"
                      d={`M${x1} ${y1} L${x2} ${y2}`}
                      stroke="rgba(255,239,224,0.18)"
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      style={{ animationDelay: `${560 + index * 92}ms` }}
                    />
                  ))}
                  <circle className="love-bridge-node" cx="28" cy="34" r="2.2" fill={ELEMENT_COLORS[SIGNS[sign1!].element]} style={{ animationDelay: '180ms' }} />
                  <circle className="love-bridge-node" cx="109" cy="34" r="1.8" fill="rgba(255,239,224,0.72)" style={{ animationDelay: '820ms' }} />
                  <circle className="love-bridge-node" cx="190" cy="34" r="2.2" fill={ELEMENT_COLORS[SIGNS[sign2!].element]} style={{ animationDelay: '360ms' }} />
                  <defs>
                    <linearGradient id={`love-bridge-${sign1}-${sign2}`} x1="28" x2="190" y1="34" y2="34" gradientUnits="userSpaceOnUse">
                      <stop stopColor={ELEMENT_COLORS[SIGNS[sign1!].element]} stopOpacity="0.68" />
                      <stop offset="0.5" stopColor={label.color} stopOpacity="0.72" />
                      <stop offset="1" stopColor={ELEMENT_COLORS[SIGNS[sign2!].element]} stopOpacity="0.68" />
                    </linearGradient>
                    <linearGradient id={`love-bridge-soft-${sign1}-${sign2}`} x1="28" x2="190" y1="34" y2="34" gradientUnits="userSpaceOnUse">
                      <stop stopColor={ELEMENT_COLORS[SIGNS[sign1!].element]} stopOpacity="0.24" />
                      <stop offset="0.5" stopColor="rgba(255,239,224,0.44)" />
                      <stop offset="1" stopColor={ELEMENT_COLORS[SIGNS[sign2!].element]} stopOpacity="0.24" />
                    </linearGradient>
                  </defs>
                </svg>
                {[SIGNS[sign1!]].map((sign, index) => (
                  <span
                    key={`${sign.id}-${index}`}
                    className="love-result-sign love-result-sign--left flex items-center justify-center"
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      width: compactResult ? 38 : 42,
                      height: compactResult ? 38 : 42,
                      borderRadius: 999,
                      border: `1px solid ${ELEMENT_COLORS[sign.element]}66`,
                      background: `radial-gradient(circle, ${ELEMENT_COLORS[sign.element]}20, rgba(255,255,255,0.025))`,
                      color: ELEMENT_COLORS[sign.element],
                      fontSize: compactResult ? 20 : 22,
                      boxShadow: `0 0 22px ${ELEMENT_COLORS[sign.element]}18, inset 0 1px 0 rgba(255,255,255,0.08)`,
                    }}
                    aria-hidden="true"
                  >
                    {sign.glyph}
                  </span>
                ))}
                <div style={{ position: 'relative', zIndex: 1, transform: 'translateY(44px)' }}>
                  <ScoreArc value={animatedScore} color={label.color} compact={compactResult} />
                </div>
                {[SIGNS[sign2!]].map((sign, index) => (
                  <span
                    key={`${sign.id}-${index}`}
                    className="love-result-sign love-result-sign--right flex items-center justify-center"
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      width: compactResult ? 38 : 42,
                      height: compactResult ? 38 : 42,
                      borderRadius: 999,
                      border: `1px solid ${ELEMENT_COLORS[sign.element]}66`,
                      background: `radial-gradient(circle, ${ELEMENT_COLORS[sign.element]}20, rgba(255,255,255,0.025))`,
                      color: ELEMENT_COLORS[sign.element],
                      fontSize: compactResult ? 20 : 22,
                      boxShadow: `0 0 22px ${ELEMENT_COLORS[sign.element]}18, inset 0 1px 0 rgba(255,255,255,0.08)`,
                    }}
                    aria-hidden="true"
                  >
                    {sign.glyph}
                  </span>
                ))}
              </div>

              <span style={{ marginTop: compactResult ? 18 : 21, color: label.color, fontSize: 8.8, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 850 }}>
                {label.title}
              </span>
              <p style={{ margin: '16px 0 0', color: '#FFF6EF', fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: compactResult ? 22 : 24, lineHeight: 1.02, fontWeight: 560, letterSpacing: 0.1, textShadow: '0 10px 28px rgba(0,0,0,0.36)' }}>
                {relationshipVerdict}
              </p>
              <p style={{ margin: '16px auto 0', maxWidth: 358, color: '#EDE2E4', fontSize: compactResult ? 13.7 : 14.5, lineHeight: 1.5, fontWeight: 460 }}>
                {withoutFinalPeriod(compatibilityDescription)}
              </p>
            </div>
            <InstantReadingReport
              key={`${sign1}-${sign2}`}
              axes={instantAxes}
              compact={compactResult}
              embedded
            />
            <p style={{ margin: compactResult ? '14px 0 0' : '17px 0 0', paddingTop: 13, borderTop: '1px solid rgba(229,196,164,0.14)', color: '#D9CACE', fontSize: compactResult ? 13.2 : 14.2, lineHeight: 1.52, fontWeight: 470 }}>
              {withoutFinalPeriod(pairResultLine)}
            </p>
          </section>
        )}

        {hasResult && (
          <div
            className="w-full"
            style={{
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
              marginTop: compactResult ? 14 : 16,
              padding: compactResult ? '15px 15px 14px' : '17px 17px 15px',
              borderRadius: 14,
              border: '1px solid rgba(232, 203, 172, 0.24)',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.052), rgba(255,255,255,0.01)), rgba(13,9,13,0.82)',
              boxShadow: '0 18px 46px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.065)',
            }}
          >
            <div className="absolute left-0 top-0 h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(239,203,167,0.58), transparent)' }} />
            <div className="flex items-center gap-3">
              <span
                className="flex flex-shrink-0 items-center justify-center rounded-full"
                style={{
                  width: 34,
                  height: 34,
                  color: '#E4BE91',
                  border: '1px solid rgba(229, 196, 164, 0.28)',
                  background: 'radial-gradient(circle, rgba(229,196,164,0.11), rgba(229,196,164,0.025))',
                }}
              >
                <Sparkles size={15} strokeWidth={1.35} />
              </span>
              <div className="min-w-0">
                <p style={{ margin: 0, fontSize: 8.2, color: '#D8B995', letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 800 }}>
                  Pour aller plus loin
                </p>
                <h2 style={{ margin: '4px 0 0', fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: compactResult ? 20 : 22, lineHeight: 1.08, fontWeight: 520, color: '#FFF8F0', letterSpacing: 0.1 }}>
                  Votre lien mérite une lecture complète.
                </h2>
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <button
                type="button"
                onClick={() => setShowPremiumSales(true)}
                className="love-interactive flex items-center justify-center gap-2"
                style={{
                  width: '100%',
                  minHeight: 42,
                  padding: '11px 14px',
                  borderRadius: 999,
                  border: '1px solid rgba(255, 239, 218, 0.62)',
                  background: 'linear-gradient(100deg, #F4DDC1 0%, #E7B9AE 52%, #C7A7C8 100%)',
                  color: '#25181E',
                  fontSize: compactResult ? 9 : 9.5,
                  fontWeight: 850,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.62)',
                }}
              >
                Rapport complet
                <ArrowRight size={13} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        )}

        {hasResult && (
          <button
            onClick={resetAnalysis}
            className="love-interactive relative flex w-full flex-shrink-0 items-center justify-center gap-2"
            style={{
              minHeight: 40,
              marginTop: compactResult ? 12 : 14,
              padding: '9px 16px',
              overflow: 'hidden',
              borderRadius: 999,
              border: '1px solid rgba(229, 205, 184, 0.18)',
              background: 'rgba(255,255,255,0.018)',
              color: 'rgba(231, 216, 207, 0.72)',
              fontFamily: '"Crimson Pro", "Cormorant Garamond", Georgia, serif',
              fontSize: compactResult ? 13.2 : 14,
              fontWeight: 400,
              letterSpacing: 0.22,
              textTransform: 'none',
              cursor: 'pointer',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.035), 0 10px 24px rgba(0,0,0,0.12)',
            }}
          >
            <RotateCcw size={12} strokeWidth={1.35} />
            Modifier les signes
          </button>
        )}

        {/* Hint when nothing selected */}
        {!hasResult && (
          <div style={{ width: '100%', marginTop: 24, textAlign: 'center', animation: 'love-rise .6s ease both' }}>
            <div style={{ width: 34, height: 1, margin: '0 auto 13px', background: 'rgba(229,196,164,0.26)' }} />
            <p style={{ margin: 0, color: '#AFA1A9', fontSize: 10.5, lineHeight: 1.5, letterSpacing: 0.35 }}>
              Sélectionnez les deux signes pour commencer l’analyse.
            </p>
          </div>
        )}
      </div>

      {/* Picker modal */}
      {picker && (
        <SignPicker
          onSelect={handleSignSelect}
          onClose={() => setPicker(null)}
          sign1={sign1}
          sign2={sign2}
          clearSelectionHighlights={clearSelectionHighlights}
        />
      )}
    </div>
  );
}

// ─── Sign Card ─────────────────────────────────────────────
function LovePremiumSalesPage({ onBack }: { onBack: () => void }) {
  const modules = [
    {
      label: 'Cartes superposées',
      detail: 'Une vraie synastrie : vos deux thèmes sont lus ensemble, point par point.',
      note: 'Planètes, angles, maisons et aspects sont croisés pour lire la rencontre exacte.',
    },
    {
      label: 'Désir et sécurité',
      detail: 'Vénus, Mars, la Lune et les aspects exacts révèlent l’attraction, les besoins et les tensions.',
      note: 'Vous voyez ce qui attire, ce qui rassure, et ce qui peut créer une distance.',
    },
    {
      label: 'Potentiel du lien',
      detail: 'Les maisons activées montrent où la relation peut grandir, résister ou se transformer.',
      note: 'Une lecture claire des forces du lien, mais aussi de ses zones sensibles.',
    },
  ];
  const deliverables = [
    'La dynamique émotionnelle entre vos deux Lunes',
    'Le style d’attachement, de désir et de communication',
    'Les aspects qui créent l’attraction ou les tensions',
    'Les maisons activées par l’autre personne',
    'Les forces du lien et les zones à manier avec lucidité',
  ];

  return (
    <div
      className="love-page love-page--premium relative flex flex-col items-center overflow-hidden px-4"
      style={{
        minHeight: 'calc(100dvh - 36px)',
        height: 'calc(100dvh - 36px)',
        color: '#FFF8F0',
        background:
          'radial-gradient(circle at 50% -10%, rgba(255, 214, 190, 0.32), transparent 38%), radial-gradient(circle at 84% 18%, rgba(196, 157, 255, 0.2), transparent 34%), linear-gradient(180deg, #25182f 0%, #3a2844 48%, #211827 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.075), transparent 25%), radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.14) 84%)',
        }}
      />

      <div
        className="relative z-10 flex h-full w-full max-w-md flex-col overflow-y-auto py-5"
        style={{ paddingBottom: 132 }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            alignSelf: 'flex-start',
            marginBottom: 22,
            color: '#F6D8D1',
            border: '1px solid rgba(255, 214, 190, 0.22)',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.035)',
            padding: '8px 13px',
            fontSize: 11,
            letterSpacing: 1.8,
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          Retour
        </button>

        <section style={{ textAlign: 'center' }}>
          <div className="flex items-center gap-3" style={{ marginBottom: 18 }}>
            <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, transparent, rgba(255,214,190,0.32))' }} />
            <Heart size={15} style={{ color: '#FFD6BE' }} strokeWidth={1.5} />
            <div style={{ height: 1, flex: 1, background: 'linear-gradient(90deg, rgba(255,214,190,0.32), transparent)' }} />
          </div>

          <p style={{ margin: 0, color: '#FFD6BE', fontSize: 10, letterSpacing: 3.2, textTransform: 'uppercase', fontWeight: 800, textAlign: 'center' }}>
            Rapport de compatibilité
          </p>
          <h1
            style={{
              margin: '12px 0 0',
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 38,
              lineHeight: 0.98,
              fontWeight: 500,
              letterSpacing: 0,
              color: '#FFF8F0',
              textShadow: '0 12px 34px rgba(0,0,0,0.42)',
            }}
          >
            Découvrez ce que votre lien révèle vraiment
          </h1>
          <div
            style={{
              position: 'relative',
              width: 152,
              height: 112,
              margin: '20px auto 0',
              filter: 'drop-shadow(0 18px 34px rgba(0,0,0,0.34))',
            }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 152 112" width="152" height="112" focusable="false">
              <circle cx="60" cy="56" r="42" fill="none" stroke="rgba(255, 227, 198, 0.42)" strokeWidth="1.1" />
              <circle cx="92" cy="56" r="42" fill="none" stroke="rgba(200, 165, 255, 0.38)" strokeWidth="1.1" />
              <circle cx="60" cy="56" r="23" fill="rgba(255,255,255,0.018)" stroke="rgba(255, 214, 190, 0.18)" strokeWidth="1" />
              <circle cx="92" cy="56" r="23" fill="rgba(255,255,255,0.018)" stroke="rgba(255, 214, 190, 0.18)" strokeWidth="1" />
              <path d="M35 44 L92 33 L116 70 L55 81 Z" fill="none" stroke="rgba(255, 214, 190, 0.54)" strokeWidth="1" />
              <path d="M48 27 L105 86" fill="none" stroke="rgba(255, 182, 200, 0.46)" strokeWidth="1" />
              <circle cx="35" cy="44" r="2.8" fill="#FFE3C6" />
              <circle cx="92" cy="33" r="2.8" fill="#FFB6C8" />
              <circle cx="116" cy="70" r="2.8" fill="#C8A5FF" />
              <circle cx="55" cy="81" r="2.8" fill="#FFE3C6" />
              <circle cx="76" cy="56" r="5.2" fill="rgba(10,7,14,0.96)" stroke="rgba(255, 227, 198, 0.55)" strokeWidth="1" />
            </svg>
          </div>
          <p
            style={{
              margin: '16px auto 0',
              maxWidth: 345,
              color: '#EBD9DF',
              fontSize: 15,
              lineHeight: 1.56,
            }}
          >
            Une analyse premium de synastrie qui superpose réellement vos deux cartes astrales pour révéler l’attirance, les zones sensibles, les forces et les défis de votre relation.
          </p>
        </section>

        <div className="grid gap-2" style={{ marginTop: 26 }}>
          {modules.map((item, index) => (
            <div
              key={item.label}
              style={{
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                border: '1px solid rgba(255, 230, 173, 0.24)',
                borderRadius: 8,
                padding: '15px 14px',
                background:
                  'radial-gradient(circle at 50% -20%, rgba(255, 230, 173, 0.12), transparent 46%), linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.016)), rgba(8, 7, 11, 0.48)',
                boxShadow:
                  '0 16px 40px rgba(0,0,0,0.24), 0 0 24px rgba(255, 184, 107, 0.05), inset 0 1px 0 rgba(255,255,255,0.08)',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: '18%',
                  right: '18%',
                  top: 0,
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(255, 230, 173, 0.48), transparent)',
                }}
              />
              <span
                style={{
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 999,
                  border: '1px solid rgba(255, 230, 173, 0.28)',
                  color: '#FFD6BE',
                  background: 'rgba(255, 184, 107, 0.07)',
                  fontSize: 10,
                  fontWeight: 800,
                }}
              >
                {index + 1}
              </span>
              <span>
                <span style={{ display: 'block', color: '#FFF4EE', fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 800 }}>
                  {item.label}
                </span>
                <span style={{ display: 'block', marginTop: 4, color: '#D7C7D0', fontSize: 12.5, lineHeight: 1.42 }}>
                  {item.detail}
                </span>
                <span style={{ display: 'block', marginTop: 8, color: 'rgba(255, 230, 173, 0.76)', fontSize: 11.5, lineHeight: 1.38 }}>
                  {item.note}
                </span>
              </span>
            </div>
          ))}
        </div>

        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            marginTop: 24,
            border: '1px solid rgba(255, 230, 173, 0.28)',
            borderRadius: 8,
            padding: '22px 18px',
            background:
              'radial-gradient(circle at 50% -10%, rgba(255, 230, 173, 0.16), transparent 48%), linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.018)), rgba(8, 7, 11, 0.5)',
            boxShadow:
              '0 24px 60px rgba(0,0,0,0.3), 0 0 30px rgba(255, 184, 107, 0.07), inset 0 1px 0 rgba(255,255,255,0.09)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '14%',
              right: '14%',
              top: 0,
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255, 230, 173, 0.68), transparent)',
            }}
          />
          <p style={{ margin: 0, color: '#FFD6BE', fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 850 }}>
            Inclus dans le rapport
          </p>
          <h2 style={{ margin: '8px 0 0', fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 25, lineHeight: 1.08, fontWeight: 500 }}>
            Une lecture complète de votre mécanique relationnelle.
          </h2>
          <div className="grid gap-2" style={{ marginTop: 14 }}>
            {deliverables.map((item) => (
              <div
                key={item}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  minHeight: 42,
                  padding: '10px 11px',
                  border: '1px solid rgba(255, 230, 173, 0.14)',
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.028)',
                  color: '#EADBE1',
                  fontSize: 13.5,
                  lineHeight: 1.42,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 12,
                    right: 12,
                    top: 0,
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(255, 230, 173, 0.28), transparent)',
                  }}
                />
                <span style={{ color: '#FFD6BE', fontWeight: 900 }}>+</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            marginTop: 18,
            padding: '24px 18px',
            borderRadius: 8,
            border: '1px solid rgba(255, 230, 173, 0.28)',
            background:
              'radial-gradient(circle at 50% -10%, rgba(255, 230, 173, 0.18), transparent 48%), linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.018)), rgba(8, 7, 11, 0.52)',
            boxShadow:
              '0 24px 60px rgba(0,0,0,0.34), 0 0 34px rgba(255, 184, 107, 0.08), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '14%',
              right: '14%',
              top: 0,
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255, 230, 173, 0.72), transparent)',
            }}
          />
          <p style={{ margin: 0, color: '#FFD6BE', fontSize: 10, letterSpacing: 2.6, textTransform: 'uppercase', fontWeight: 850 }}>
            Lecture premium
          </p>
          <h2 style={{ margin: '9px 0 0', fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 28, lineHeight: 1.04, fontWeight: 500, color: '#FFFFFF' }}>
            Pensé pour les liens qui méritent plus qu’un simple pourcentage.
          </h2>
          <p style={{ margin: '13px 0 0', color: '#E6D6DC', fontSize: 14.5, lineHeight: 1.62 }}>
            Le rapport transforme les données astrologiques en une lecture claire, sensible et exploitable : ce qui vous rapproche, ce qui vous déclenche, ce qui peut devenir solide, et ce qui demande de la conscience.
          </p>
        </section>

        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            marginTop: 22,
            border: '1px solid rgba(255, 230, 173, 0.3)',
            borderRadius: 8,
            padding: '18px 14px',
            background:
              'radial-gradient(circle at 50% -10%, rgba(255, 230, 173, 0.16), transparent 50%), radial-gradient(circle at 50% 100%, rgba(255, 143, 160, 0.12), transparent 56%), linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.024)), rgba(8, 7, 11, 0.54)',
            boxShadow:
              '0 24px 60px rgba(0,0,0,0.34), 0 0 36px rgba(255, 184, 107, 0.08), inset 0 1px 0 rgba(255,255,255,0.1)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '14%',
              right: '14%',
              top: 0,
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255, 230, 173, 0.72), transparent)',
            }}
          />
          <p style={{ margin: 0, color: '#FFD6BE', fontSize: 9.5, letterSpacing: 2.4, textTransform: 'uppercase', fontWeight: 800 }}>
            Accès premium
          </p>
          <h2 style={{ margin: '7px 0 0', fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 22, lineHeight: 1.08, fontWeight: 500 }}>
            Obtenez votre lecture complète, personnelle et détaillée.
          </h2>
        </section>
      </div>

      <div
        className="absolute bottom-0 left-4 right-4 z-20 mx-auto max-w-md pb-4 pt-8"
        style={{
          background: 'linear-gradient(180deg, rgba(33, 24, 39, 0), rgba(33, 24, 39, 0.9) 42%, #211827 100%)',
        }}
      >
        <button
          type="button"
          className="w-full"
          style={{
            padding: '13px 14px',
            borderRadius: 999,
            border: '1px solid rgba(255, 238, 218, 0.58)',
            background: 'linear-gradient(90deg, #FFE7C9, #FFB6C8 55%, #D9C0FF)',
            color: '#24121D',
            fontSize: 11,
            fontWeight: 850,
            letterSpacing: 1.7,
            textTransform: 'uppercase',
            boxShadow: '0 0 26px rgba(255, 143, 160, 0.25), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          Débloquer mon rapport
        </button>
      </div>
    </div>
  );
}

function LoveResultPanel({
  sign1,
  sign2,
  score,
  label,
  title,
  description,
  axes,
  compact,
  onOpenFullReport,
}: {
  sign1: number;
  sign2: number;
  score: number;
  label: { title: string; desc: string; color: string };
  title: string;
  description: string;
  axes: InstantReadingAxis[];
  compact: boolean;
  onOpenFullReport: () => void;
}) {
  const first = SIGNS[sign1];
  const second = SIGNS[sign2];
  const firstColor = first.element === 'fire' ? '#D98FA2' : ELEMENT_COLORS[first.element];
  const secondColor = second.element === 'air' ? '#E8C77D' : ELEMENT_COLORS[second.element];
  const scoreColor = score >= 88 ? '#E8C77D' : '#D8A84E';
  const specks = [
    ['14%', '15%', 0.18],
    ['82%', '13%', 0.2],
    ['9%', '34%', 0.16],
    ['91%', '39%', 0.15],
    ['50%', '18%', 0.22],
    ['23%', '73%', 0.14],
    ['76%', '76%', 0.16],
  ] as const;

  return (
    <section
      className="love-result-panel w-full"
      style={{
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        boxSizing: 'border-box',
        marginTop: compact ? 0 : 4,
        padding: compact ? '26px 21px 24px' : '34px 38px 34px',
        borderRadius: compact ? 30 : 38,
        border: '1px solid rgba(216,168,78,0.36)',
        background: `radial-gradient(circle at 50% 21%, ${label.color}12, transparent 28%), radial-gradient(circle at 50% 33%, rgba(216,168,78,0.13), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.026), rgba(255,255,255,0.006) 32%, rgba(255,255,255,0.018)), rgba(7,8,11,0.96)`,
        boxShadow: '0 28px 78px rgba(0,0,0,0.56), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 0 1px rgba(255,223,174,0.035)',
        animation: 'love-rise .72s ease both',
      }}
    >
      {specks.map(([left, top, opacity], index) => (
        <span
          key={`${left}-${top}`}
          className="love-result-speck"
          style={{ left, top, opacity, animationDelay: `${index * 180}ms` }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="love-result-kicker" style={{ color: '#E8C77D' }}>
          <span aria-hidden="true" style={{ display: 'block', marginBottom: compact ? 10 : 12, fontSize: compact ? 19 : 22, lineHeight: 1 }}>✶</span>
          Compatibilité astrale
        </div>
        <p
          style={{
            margin: compact ? '12px 0 0' : '14px 0 0',
            color: 'rgba(242,232,216,0.74)',
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(21px, 5.7vw, 30px)',
            lineHeight: 1.06,
            fontWeight: 360,
          }}
        >
          Explorez la signature de votre lien
        </p>

        <div
          className="relative w-full"
          style={{
            marginTop: compact ? 34 : 50,
            minHeight: compact ? 164 : 204,
          }}
        >
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
            width="100%"
            height={compact ? 132 : 158}
            viewBox="0 0 360 150"
            preserveAspectRatio="none"
            style={{
              maxWidth: compact ? 330 : 500,
              opacity: 0.92,
              filter: 'drop-shadow(0 0 12px rgba(216,168,78,0.24))',
            }}
          >
            <defs>
              <radialGradient id={`love-center-aura-${sign1}-${sign2}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F7C46F" stopOpacity="0.45" />
                <stop offset="46%" stopColor="#D8A84E" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#D8A84E" stopOpacity="0" />
              </radialGradient>
              <linearGradient id={`love-premium-bridge-${sign1}-${sign2}`} x1="62" x2="298" y1="70" y2="70" gradientUnits="userSpaceOnUse">
                <stop stopColor={firstColor} stopOpacity="0.68" />
                <stop offset="0.5" stopColor="#E8C77D" stopOpacity="0.88" />
                <stop offset="1" stopColor={secondColor} stopOpacity="0.72" />
              </linearGradient>
              <linearGradient id={`love-premium-bridge-soft-${sign1}-${sign2}`} x1="62" x2="298" y1="70" y2="70" gradientUnits="userSpaceOnUse">
                <stop stopColor={firstColor} stopOpacity="0.22" />
                <stop offset="0.5" stopColor="#F2E8D8" stopOpacity="0.34" />
                <stop offset="1" stopColor={secondColor} stopOpacity="0.22" />
              </linearGradient>
            </defs>
            <circle className="love-result-orbit" cx="180" cy="70" r="47" fill="none" stroke="rgba(216,168,78,0.18)" strokeWidth="0.75" />
            <circle className="love-result-orbit" cx="180" cy="70" r="30" fill="none" stroke="rgba(216,168,78,0.12)" strokeWidth="0.75" />
            <circle cx="180" cy="70" r="54" fill={`url(#love-center-aura-${sign1}-${sign2})`} />
            <path className="love-bridge-line" pathLength={1} d="M64 70 C106 20, 140 20, 180 70 S254 120, 296 70" fill="none" stroke={`url(#love-premium-bridge-${sign1}-${sign2})`} strokeWidth="1.2" strokeLinecap="round" />
            <path className="love-bridge-line love-bridge-line--soft" pathLength={1} d="M64 70 C106 120, 140 120, 180 70 S254 20, 296 70" fill="none" stroke={`url(#love-premium-bridge-soft-${sign1}-${sign2})`} strokeWidth="1" strokeLinecap="round" />
            <g className="love-center-star" style={{ transformOrigin: '180px 70px' }}>
              <path d="M180 47 L185 65 L203 70 L185 75 L180 93 L175 75 L157 70 L175 65 Z" fill="#F7C46F" opacity="0.95" />
              <circle cx="180" cy="70" r="4.5" fill="#FFF0BF" opacity="0.98" />
            </g>
            <circle className="love-bridge-node" cx="64" cy="70" r="2.8" fill={firstColor} style={{ animationDelay: '180ms' }} />
            <circle className="love-bridge-node" cx="296" cy="70" r="2.8" fill={secondColor} style={{ animationDelay: '320ms' }} />
          </svg>

          <div className="relative z-10 flex w-full items-start justify-between">
            {[{ sign: first, color: firstColor, side: 'left' as const }, { sign: second, color: secondColor, side: 'right' as const }].map(({ sign, color, side }) => (
              <div
                key={`${side}-${sign.id}`}
                className={`love-result-sign love-result-sign--${side} flex flex-col items-center`}
                style={{
                  width: compact ? '38%' : '34%',
                  minWidth: 0,
                  color,
                }}
                aria-hidden="true"
              >
                <span
                  className="love-result-medallion love-result-zodiac flex items-center justify-center"
                  style={{
                    width: 'clamp(92px, 27vw, 128px)',
                    height: 'clamp(92px, 27vw, 128px)',
                    borderRadius: 999,
                    border: `1px solid ${color}88`,
                    background: `radial-gradient(circle at 50% 42%, ${color}28, rgba(255,255,255,0.028) 48%, rgba(6,6,8,0.8)), linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.006))`,
                    color,
                    fontSize: 'clamp(38px, 11vw, 56px)',
                    boxShadow: `0 0 32px ${color}22, inset 0 1px 0 rgba(255,255,255,0.08)`,
                  }}
                >
                  {sign.glyph}
                </span>
                <span
                  style={{
                    marginTop: compact ? 14 : 18,
                    color,
                    fontFamily: 'Cinzel, Cormorant Garamond, Georgia, serif',
                    fontSize: 'clamp(10px, 2.8vw, 13px)',
                    letterSpacing: compact ? 3.2 : 4.4,
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {sign.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: compact ? 20 : 28, width: '100%' }}>
          <div className="flex items-center justify-center gap-4" aria-hidden="true">
            <span style={{ width: compact ? 20 : 34, height: 1, background: 'linear-gradient(90deg, transparent, rgba(232,199,125,0.7))' }} />
            <span style={{ color: '#E8C77D', fontSize: compact ? 16 : 19, lineHeight: 1 }}>✦</span>
            <span style={{ width: compact ? 20 : 34, height: 1, background: 'linear-gradient(90deg, rgba(232,199,125,0.7), transparent)' }} />
          </div>
          <h2
            style={{
              margin: compact ? '8px auto 0' : '10px auto 0',
              maxWidth: 470,
              color: '#F2E8D8',
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(48px, 13.8vw, 76px)',
              lineHeight: 0.92,
              fontWeight: 360,
              letterSpacing: 0,
              textShadow: '0 0 22px rgba(242,232,216,0.15), 0 14px 42px rgba(0,0,0,0.5)',
            }}
          >
            {title}
          </h2>
          <div className="flex items-center justify-center gap-4" style={{ marginTop: compact ? 16 : 20 }}>
            <span style={{ width: compact ? 54 : 88, height: 1, background: 'linear-gradient(90deg, transparent, rgba(216,168,78,0.45))' }} />
            <p
              style={{
                margin: 0,
                color: scoreColor,
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(42px, 11vw, 56px)',
                lineHeight: 0.9,
                fontWeight: 360,
                textShadow: '0 0 18px rgba(216,168,78,0.22)',
              }}
            >
              {score}<small style={{ fontSize: '0.45em', marginLeft: 6 }}>%</small>
            </p>
            <span style={{ width: compact ? 54 : 88, height: 1, background: 'linear-gradient(90deg, rgba(216,168,78,0.45), transparent)' }} />
          </div>
          <p
            style={{
              margin: compact ? '22px auto 0' : '26px auto 0',
              maxWidth: 420,
              color: 'rgba(242,232,216,0.78)',
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(21px, 5.4vw, 29px)',
              lineHeight: 1.3,
              fontWeight: 360,
            }}
          >
            {withoutFinalPeriod(description)}
          </p>
        </div>

        <InstantReadingReport
          key={`${sign1}-${sign2}`}
          axes={axes}
          compact={compact}
          embedded
        />

        <p
          style={{
            margin: compact ? '28px auto 0' : '36px auto 0',
            maxWidth: 460,
            color: 'rgba(242,232,216,0.76)',
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(22px, 5.9vw, 31px)',
            lineHeight: 1.34,
            fontWeight: 360,
          }}
        >
          Entre vous, la curiosité, l'élan et la réponse<br />
          créent une <span style={{ color: '#E8C77D' }}>alchimie vivante</span>
        </p>

        <div style={{ marginTop: compact ? 30 : 38, width: '100%' }}>
          <div style={{ width: '46%', height: 1, margin: '0 auto 18px', background: 'linear-gradient(90deg, transparent, rgba(216,168,78,0.4), transparent)' }} />
          <button
            type="button"
            onClick={onOpenFullReport}
            className="love-result-action love-interactive flex w-full items-center justify-center gap-4"
            style={{
              minHeight: 58,
              padding: compact ? '15px 18px' : '18px 24px',
              borderRadius: 999,
              border: '1px solid rgba(232,199,125,0.72)',
              background: 'linear-gradient(180deg, rgba(63,46,30,0.52), rgba(12,10,9,0.86))',
              color: '#E8C77D',
              fontFamily: 'Cinzel, Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(10px, 2.8vw, 13px)',
              fontWeight: 600,
              letterSpacing: compact ? 2.2 : 3.4,
              textTransform: 'uppercase',
              boxShadow: '0 0 26px rgba(216,168,78,0.18), inset 0 1px 0 rgba(255,243,205,0.11)',
              cursor: 'pointer',
            }}
          >
            <Sparkles size={compact ? 16 : 20} strokeWidth={1.25} />
            Découvrir la lecture complète
          </button>
        </div>
      </div>
    </section>
  );
}

function SignCard({ sign, label, onClick, quiet = false }: {
  sign: typeof SIGNS[0] | null;
  label: string;
  onClick: () => void;
  quiet?: boolean;
}) {
  const labelStyled = label.toUpperCase();

  return (
    <button
      onClick={onClick}
      className="love-interactive flex-1 flex flex-col items-center justify-center gap-1"
      style={{
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        minWidth: 0,
        background: quiet
          ? (sign ? `linear-gradient(180deg, ${ELEMENT_COLORS[sign.element]}0D, rgba(255,255,255,0.01))` : 'rgba(255,255,255,0.012)')
          : (sign
              ? `radial-gradient(circle at 50% 12%, ${ELEMENT_COLORS[sign.element]}18, transparent 48%), linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.014))`
              : 'linear-gradient(180deg, rgba(255,255,255,0.038), rgba(255,255,255,0.01))'),
        border: sign
          ? `1px solid ${ELEMENT_COLORS[sign.element]}${quiet ? '40' : '62'}`
          : `1px solid rgba(229, 196, 164, ${quiet ? 0.13 : 0.18})`,
        borderRadius: 6,
        boxShadow: quiet
          ? 'none'
          : (sign
              ? `0 14px 30px rgba(0,0,0,0.28), 0 0 20px ${ELEMENT_COLORS[sign.element]}0C, inset 0 1px 0 rgba(255,255,255,0.07)`
              : '0 12px 28px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.045)'),
        minHeight: quiet ? 102 : 108,
        paddingTop: 12,
        paddingBottom: 11,
        animation: sign && !quiet ? 'love-sign-confirm .62s ease both' : undefined,
      }}
    >
      {!quiet && (
        <span className="absolute top-0 h-px" style={{ left: '22%', right: '22%', background: sign ? `linear-gradient(90deg, transparent, ${ELEMENT_COLORS[sign.element]}96, transparent)` : 'linear-gradient(90deg, transparent, rgba(229,196,164,0.42), transparent)' }} />
      )}
      {sign ? (
        <>
          <span
            style={{
              fontFamily: 'Cinzel, Cormorant Garamond, serif',
              fontSize: 8,
              letterSpacing: 2.3,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#BCA79F',
              marginBottom: 4,
              lineHeight: 1,
            }}
          >
            {labelStyled}
          </span>
          <span style={{
            fontFamily: 'system-ui',
            fontSize: 34,
            lineHeight: 0.9,
            color: ELEMENT_COLORS[sign.element],
            display: 'inline-block',
            filter: `drop-shadow(0 0 10px ${ELEMENT_COLORS[sign.element]}42)`,
          }}>
            {sign.glyph}
          </span>
          <span style={{ marginTop: 4, fontFamily: 'Cormorant Garamond, serif', fontSize: 16.5, color: '#F7EDE6', letterSpacing: 0.4, fontWeight: 600 }}>
            {sign.name}
          </span>
          <ChevronDown size={11} style={{ color: 'rgba(220,190,164,0.58)' }} strokeWidth={1.5} />
        </>
      ) : (
        <>
          <span className="flex items-center justify-center rounded-full" style={{ width: 32, height: 32, marginBottom: 6, border: `1px solid rgba(229,196,164,${quiet ? 0.16 : 0.22})`, color: '#D7B99B', background: quiet ? 'transparent' : 'rgba(229,196,164,0.035)' }}>
            <Plus size={15} strokeWidth={1.45} aria-hidden="true" />
          </span>
          <span
            style={{
              fontFamily: 'Cinzel, Cormorant Garamond, serif',
              fontSize: 9,
              letterSpacing: 2.2,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#C7B2AA',
              lineHeight: 1.15,
              textAlign: 'center',
            }}
          >
            {labelStyled}
          </span>
          <span style={{ marginTop: 5, color: '#796B72', fontSize: 8, letterSpacing: 1.1, textTransform: 'uppercase' }}>Choisir</span>
        </>
      )}
    </button>
  );
}

function RelationshipKeyCard({ insight, compact }: { insight: RelationshipKey; compact: boolean }) {
  return (
    <section
      className="w-full flex-shrink-0"
      style={{
        position: 'relative',
        overflow: 'hidden',
        marginTop: compact ? 12 : 14,
        padding: compact ? '15px 15px 16px' : '17px 17px 18px',
        borderRadius: 14,
        border: '1px solid rgba(229,196,164,0.25)',
        background: 'radial-gradient(circle at 0% 0%, rgba(229,196,164,0.12), transparent 40%), linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01)), rgba(8,6,9,0.88)',
        boxShadow: '0 16px 38px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      <div className="absolute left-1/2 top-0 h-px -translate-x-1/2" style={{ width: '38%', background: 'linear-gradient(90deg, transparent, rgba(238,207,176,0.62), transparent)' }} />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2" style={{ color: '#DCBF9B', fontSize: 8.4, letterSpacing: 2.4, textTransform: 'uppercase', fontWeight: 800 }}>
          <Sparkles size={10} strokeWidth={1.45} />
          Clé du lien
        </div>
        <span style={{ width: 28, height: 1, background: 'rgba(229,196,164,0.22)' }} />
      </div>
      <h3 style={{ margin: '8px 0 0', color: '#FFF6EF', fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: compact ? 20 : 22, lineHeight: 1.06, fontWeight: 550 }}>
        {insight.title}
      </h3>
      <p style={{ margin: '8px 0 0', color: '#EDE4E6', fontSize: compact ? 12.5 : 13.1, lineHeight: 1.48, fontWeight: 450, textShadow: '0 1px 2px rgba(0,0,0,0.35)' }}>
        {insight.text}
      </p>
      <p style={{ margin: '10px 0 0', paddingTop: 10, borderTop: '1px solid rgba(229,196,164,0.14)', color: '#EBC69F', fontSize: compact ? 11.8 : 12.4, lineHeight: 1.45, fontWeight: 520, fontStyle: 'italic' }}>
        {insight.practice}
      </p>
    </section>
  );
}

function InstantReadingReport({ axes, compact, embedded = false }: { axes: InstantReadingAxis[]; compact: boolean; embedded?: boolean }) {
  const revealKey = axes.map(axis => axis.score).join('-');

  useEffect(() => {
    const timers = [0, 1, 2].map(index => window.setTimeout(() => {
      navigator.vibrate?.(index === 2 ? 16 : 10);
    }, 260 + index * 230));
    return () => timers.forEach(timer => window.clearTimeout(timer));
  }, [revealKey]);

  if (false && embedded) {
    return (
      <section
        className="love-instant-reading w-full"
        style={{
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
          marginTop: compact ? 30 : 42,
          padding: compact ? '11px 10px' : '16px 15px',
          borderRadius: compact ? 24 : 26,
          border: '1px solid rgba(216,168,78,0.36)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.024), rgba(255,255,255,0.006)), rgba(24,18,17,0.82)',
          boxShadow: '0 20px 52px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.045)',
        }}
      >
        <div className="absolute left-1/2 top-0 h-px -translate-x-1/2" style={{ width: '72%', background: 'linear-gradient(90deg, transparent, rgba(216,168,78,0.56), transparent)' }} />
        <div className="grid w-full">
          {axes.map((axis, index) => {
            const AxisIcon = axis.id === 'emotion' ? Heart : Sparkles;
            const displayColor = axis.id === 'emotion' ? '#D98FA2' : axis.id === 'desire' ? '#E8B65D' : '#F2E8D8';
            return (
              <div
                key={axis.id}
                className="love-instant-row"
                style={{
                  position: 'relative',
                  display: 'grid',
                  gridTemplateColumns: compact ? '42px minmax(0,1fr) minmax(70px, auto)' : '54px minmax(0,1fr) minmax(112px, auto)',
                  gap: compact ? 10 : 15,
                  alignItems: 'center',
                  width: '100%',
                  minWidth: 0,
                  padding: compact ? '12px 8px' : '14px 12px',
                  borderTop: index === 0 ? 'none' : '1px solid rgba(216,168,78,0.12)',
                  animation: `love-rise .5s ${index * 130}ms ease both`,
                }}
              >
                <span
                  className="flex items-center justify-center"
                  style={{
                    width: compact ? 38 : 48,
                    height: compact ? 38 : 48,
                    borderRadius: 999,
                    border: `1px solid ${displayColor}52`,
                    color: displayColor,
                    background: `radial-gradient(circle, ${displayColor}24, rgba(255,255,255,0.02) 58%, rgba(6,6,8,0.78))`,
                    boxShadow: `0 0 18px ${displayColor}1F, inset 0 1px 0 rgba(255,255,255,0.08)`,
                  }}
                  aria-hidden="true"
                >
                  <AxisIcon size={compact ? 19 : 23} strokeWidth={1.35} fill={axis.id === 'emotion' ? `${displayColor}44` : 'none'} />
                </span>
                <div style={{ minWidth: 0, textAlign: 'left' }}>
                  <div style={{ color: displayColor, fontFamily: 'Cinzel, Cormorant Garamond, Georgia, serif', fontSize: compact ? 10 : 12, letterSpacing: compact ? 2.8 : 4.4, textTransform: 'uppercase', fontWeight: 600, lineHeight: 1.1 }}>
                    {axis.label}
                  </div>
                  <div style={{ marginTop: compact ? 5 : 7, color: 'rgba(242,232,216,0.74)', fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: compact ? 16 : 20, lineHeight: 1.08, fontWeight: 360 }}>
                    {axis.detail}
                  </div>
                </div>
                <div
                  style={{
                    minWidth: 0,
                    paddingLeft: compact ? 8 : 17,
                    borderLeft: '1px dotted rgba(216,168,78,0.28)',
                    color: displayColor,
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: compact ? 17 : 22,
                    lineHeight: 1.05,
                    fontWeight: 420,
                    textAlign: 'right',
                    overflowWrap: 'anywhere',
                    textShadow: `0 0 15px ${displayColor}26`,
                  }}
                >
                  {axis.verdict}
                  <span aria-hidden="true" style={{ marginLeft: compact ? 6 : 10, color: '#E8C77D', fontSize: compact ? 12 : 15 }}>✦</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full"
      style={{
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        marginTop: embedded ? (compact ? 14 : 16) : (compact ? 10 : 12),
        padding: embedded ? '0' : (compact ? '13px 14px 12px' : '14px 16px 13px'),
        border: embedded ? 'none' : '1px solid rgba(229,196,164,0.2)',
        borderRadius: embedded ? 0 : 14,
        background: embedded ? 'transparent' : 'linear-gradient(145deg, rgba(255,255,255,0.048), rgba(255,255,255,0.01)), rgba(8,6,9,0.86)',
        boxShadow: embedded ? 'none' : '0 16px 38px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.055)',
      }}
    >
      {!embedded && (
        <div className="absolute left-1/2 top-0 h-px -translate-x-1/2" style={{ width: '48%', background: 'linear-gradient(90deg, transparent, rgba(238,207,176,0.55), transparent)' }} />
      )}
      <div className="grid w-full" style={{ gap: compact ? 10 : 11 }}>
        {axes.map((axis, index) => {
          const filledSegments = getGaugeSegments(axis.score);

          return (
            <div
              key={axis.id}
              style={{
                width: '100%',
                animation: `love-rise .42s ${index * 130}ms ease both`,
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <span style={{ color: '#EEE3E1', fontSize: compact ? 11.4 : 12.1, letterSpacing: 1.7, textTransform: 'uppercase', fontWeight: 850, lineHeight: 1.1 }}>
                  {axis.label}
                </span>
              </div>
              <div
                className="love-axis-segments"
                role="meter"
                aria-label={`${axis.label} : ${axis.verdict}`}
                aria-valuemin={0}
                aria-valuemax={LOVE_GAUGE_SEGMENTS}
                aria-valuenow={filledSegments}
              >
                {Array.from({ length: LOVE_GAUGE_SEGMENTS }).map((_, segmentIndex) => (
                  <span
                    key={segmentIndex}
                    className={`love-axis-segment ${segmentIndex < filledSegments ? 'is-filled' : ''}`}
                    style={{
                      '--love-axis-color': axis.color,
                      '--love-axis-delay': `${780 + index * 520 + segmentIndex * 170}ms`,
                    } as CSSProperties}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Score Arc SVG ─────────────────────────────────────────
function ScoreArc({ value, color, compact = false }: { value: number; color: string; compact?: boolean }) {
  const r = compact ? 36 : 42;
  const cx = compact ? 48 : 56;
  const cy = compact ? 48 : 56;
  const stroke = compact ? 4.5 : 5;
  const width = compact ? 96 : 112;
  const height = compact ? 56 : 64;
  const circumference = Math.PI * r;
  const filled = circumference * (value / 100);

  return (
    <div className="flex flex-col items-center" style={{ position: 'relative', width, height }}>
      <svg className="love-score-arc" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
          style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: 'stroke-dasharray 0.05s' }}
        />
      </svg>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center' }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: compact ? 28 : 32, fontWeight: 300, color, lineHeight: 1, filter: `drop-shadow(0 0 12px ${color}80)` }}>
          {value}
        </span>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: compact ? 13 : 15, color: `${color}AA`, marginLeft: 1 }}>%</span>
      </div>
    </div>
  );
}
