import { useState, useEffect, useRef, type CSSProperties } from 'react';
import { Heart, ChevronDown, ArrowRight, RotateCcw, Sparkles, Plus } from 'lucide-react';

const SIGNS = [
  { id: 0,  name: 'Bélier',     glyph: '🐏', element: 'fire',  iconPath: '/assets/zodiac-enamel-v1/aries.png' },
  { id: 1,  name: 'Taureau',    glyph: '🐂', element: 'earth', iconPath: '/assets/zodiac-enamel-refined/taurus-head-v2.png' },
  { id: 2,  name: 'Gémeaux',    glyph: '👯', element: 'air',   iconPath: '/assets/zodiac-enamel-refined/gemini-masks-v2.png' },
  { id: 3,  name: 'Cancer',     glyph: '🦀', element: 'water', iconPath: '/assets/zodiac-enamel-v1/cancer.png' },
  { id: 4,  name: 'Lion',       glyph: '🦁', element: 'fire',  iconPath: '/assets/zodiac-enamel-v1/leo.png' },
  { id: 5,  name: 'Vierge',     glyph: '🌸', element: 'earth', iconPath: '/assets/zodiac-enamel-v1/virgo-pink-v2.png' },
  { id: 6,  name: 'Balance',    glyph: '⚖️', element: 'air',   iconPath: '/assets/zodiac-enamel-v1/libra.png' },
  { id: 7,  name: 'Scorpion',   glyph: '🦂', element: 'water', iconPath: '/assets/zodiac-enamel-refined/scorpio.png' },
  { id: 8,  name: 'Sagittaire', glyph: '🏹', element: 'fire',  iconPath: '/assets/zodiac-enamel-v1/sagittarius.png' },
  { id: 9,  name: 'Capricorne', glyph: '🐐', element: 'earth', iconPath: '/assets/zodiac-enamel-refined/capricorn.png' },
  { id: 10, name: 'Verseau',    glyph: '🏺', element: 'air',   iconPath: '/assets/zodiac-enamel-v1/aquarius.png' },
  { id: 11, name: 'Poissons',   glyph: '🐟', element: 'water', iconPath: '/assets/zodiac-enamel-refined/pisces.png' },
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

const LOVE_ELEMENT_NOTES: Record<string, number> = {
  earth: 392,
  air: 523.25,
  fire: 587.33,
  water: 440,
};

function playLoveRevealNotes(firstElement: string, secondElement: string) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const storedSoundPreference = localStorage.getItem('nightstarSound');
  const soundIsMuted = storedSoundPreference === 'off'
    || storedSoundPreference === 'muted'
    || storedSoundPreference === 'false'
    || document.documentElement.dataset.sound === 'muted'
    || document.body.classList.contains('sound-muted');
  if (reduceMotion || soundIsMuted || document.hidden) return;

  try {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const start = ctx.currentTime + 0.02;
    const firstNote = LOVE_ELEMENT_NOTES[firstElement] || 440;
    const secondNote = LOVE_ELEMENT_NOTES[secondElement] || 523.25;
    const fusionNote = Math.sqrt(firstNote * secondNote) * 1.5;
    const master = ctx.createGain();
    master.gain.value = 0.2;
    master.connect(ctx.destination);

    const scheduleNote = (frequency: number, delay: number, duration: number, peak: number, type: OscillatorType) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteStart = start + delay;
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, noteStart);
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.exponentialRampToValueAtTime(peak, noteStart + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + duration);
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start(noteStart);
      oscillator.stop(noteStart + duration + 0.03);
    };

    scheduleNote(firstNote, 0, 0.34, 0.08, 'sine');
    scheduleNote(secondNote, 0.22, 0.36, 0.075, 'sine');
    scheduleNote(fusionNote, 0.54, 0.58, 0.095, 'triangle');
    scheduleNote(fusionNote * 2, 0.56, 0.48, 0.025, 'sine');
    window.setTimeout(() => void ctx.close(), 1350);
  } catch (_) { /* Audio is optional and must never block the reveal. */ }
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

  @keyframes love-score-star-unfold {
    0% {
      opacity: 0;
      transform: scale(0) rotate(-5deg);
      filter: drop-shadow(0 0 0 rgba(232,199,125,0));
    }
    64% {
      opacity: 1;
      transform: scale(1.045) rotate(1.5deg);
      filter: drop-shadow(0 0 16px rgba(232,199,125,.22));
    }
    100% {
      opacity: 1;
      transform: scale(1) rotate(0deg);
      filter: drop-shadow(0 0 12px rgba(232,199,125,.18));
    }
  }

  @keyframes love-score-star-shimmer {
    0% { opacity: 0; stroke-dashoffset: 1; }
    28% { opacity: .82; }
    100% { opacity: .52; stroke-dashoffset: 0; }
  }

  @keyframes love-score-star-dot-pop {
    0% { opacity: 0; transform: scale(.34); }
    62% { opacity: 1; transform: scale(1.32); }
    100% { opacity: 1; transform: scale(1); }
  }

  @keyframes love-score-star-core-pulse {
    0%, 100% { opacity: .74; filter: drop-shadow(0 0 6px rgba(255,248,239,.28)); }
    50% { opacity: 1; filter: drop-shadow(0 0 14px rgba(232,199,125,.48)); }
  }

  @keyframes love-score-fusion-spoke {
    0% { opacity: 0; stroke-dashoffset: 1; }
    22% { opacity: .92; }
    100% { opacity: .5; stroke-dashoffset: 0; }
  }

  @keyframes love-editorial-line-reveal {
    from { opacity: 0; transform: translateY(8px); clip-path: inset(0 0 100% 0); }
    to { opacity: 1; transform: translateY(0); clip-path: inset(0); }
  }

  @keyframes love-score-orbit-turn {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes love-score-aura-breathe {
    0%, 100% { opacity: .42; transform: scale(.96); }
    50% { opacity: .72; transform: scale(1.04); }
  }

  @keyframes love-score-seal-awake {
    0% { opacity: 0; transform: scale(.3) rotate(-18deg); }
    70% { opacity: 1; transform: scale(1.08) rotate(2deg); }
    100% { opacity: 1; transform: scale(1) rotate(0); }
  }

  @keyframes love-reveal-glint {
    0%, 100% { opacity: .45; transform: scale(.92); }
    50% { opacity: 1; transform: scale(1.08); }
  }

  @keyframes love-ceremony-veil {
    0%, 12% { opacity: .96; }
    48% { opacity: .38; }
    100% { opacity: 0; }
  }

  @keyframes love-ceremony-flash {
    0%, 22% { opacity: 0; transform: scale(.18); }
    48% { opacity: .88; transform: scale(1); }
    100% { opacity: 0; transform: scale(2.2); }
  }

  @keyframes love-ceremony-curtain-left {
    0% { opacity: .42; transform: translateX(-18%) scale(.72); }
    46% { opacity: .72; transform: translateX(18%) scale(1.08); }
    100% { opacity: 0; transform: translateX(32%) scale(1.62); }
  }

  @keyframes love-ceremony-curtain-right {
    0% { opacity: .42; transform: translateX(18%) scale(.72); }
    46% { opacity: .72; transform: translateX(-18%) scale(1.08); }
    100% { opacity: 0; transform: translateX(-32%) scale(1.62); }
  }

  @keyframes love-ceremony-title {
    0%, 12% { opacity: 0; transform: translateY(10px); filter: blur(7px); }
    36%, 68% { opacity: 1; transform: translateY(0); filter: blur(0); }
    100% { opacity: 0; transform: translateY(-18px); filter: blur(0); }
  }

  @keyframes love-ceremony-line {
    0%, 16% { opacity: 0; transform: scaleX(0); }
    42%, 70% { opacity: 1; transform: scaleX(1); }
    100% { opacity: 0; transform: scaleX(.3); }
  }

  @keyframes love-ceremony-sign-left {
    0% { opacity: 0; transform: translateX(-68px) scale(.68) rotate(-9deg); filter: blur(5px); }
    38%, 68% { opacity: 1; transform: translateX(0) scale(1) rotate(0); filter: blur(0); }
    100% { opacity: 0; transform: translateX(-8px) scale(.76); filter: blur(3px); }
  }

  @keyframes love-ceremony-sign-right {
    0% { opacity: 0; transform: translateX(68px) scale(.68) rotate(9deg); filter: blur(5px); }
    38%, 68% { opacity: 1; transform: translateX(0) scale(1) rotate(0); filter: blur(0); }
    100% { opacity: 0; transform: translateX(8px) scale(.76); filter: blur(3px); }
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

  .love-score-star {
    filter: drop-shadow(0 20px 34px rgba(0,0,0,.34));
  }

  .love-score-star-aura {
    transform-box: fill-box;
    transform-origin: center;
    animation: love-score-aura-breathe 4.8s ease-in-out infinite;
  }

  .love-score-star-orbit {
    transform-box: fill-box;
    transform-origin: center;
    animation: love-score-orbit-turn 34s linear infinite;
  }

  .love-score-star-fill {
    transform-box: fill-box;
    transform-origin: center;
    animation: love-score-star-unfold 1.05s .38s cubic-bezier(.16, 1, .3, 1) both;
  }

  .love-score-fusion-spoke {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: love-score-fusion-spoke .68s var(--love-spoke-delay, 0ms) cubic-bezier(.16,1,.3,1) both;
  }

  .love-score-star-sheen {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    path-length: 1;
    animation: love-score-star-shimmer 1.45s .54s cubic-bezier(.18, .78, .18, 1) both;
  }

  .love-score-star-dot {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
    filter: drop-shadow(0 0 8px rgba(255,248,239,.46));
    animation: love-score-star-dot-pop .7s cubic-bezier(.16, 1, .3, 1) both;
  }

  .love-score-star-core {
    animation: love-score-star-core-pulse 2.6s ease-in-out infinite;
  }

  .love-score-star-seal {
    transform-box: fill-box;
    transform-origin: center;
    animation: love-score-seal-awake 1s .72s cubic-bezier(.16, 1, .3, 1) both;
  }

  .love-reveal-glint {
    animation: love-reveal-glint 2.8s ease-in-out infinite;
  }

  .love-ceremony-veil {
    animation: love-ceremony-veil 1.9s cubic-bezier(.2,.7,.2,1) both;
  }

  .love-ceremony-flash {
    animation: love-ceremony-flash 1.72s cubic-bezier(.16,1,.3,1) both;
  }

  .love-ceremony-curtain-left {
    animation: love-ceremony-curtain-left 1.9s cubic-bezier(.16,1,.3,1) both;
  }

  .love-ceremony-curtain-right {
    animation: love-ceremony-curtain-right 1.9s cubic-bezier(.16,1,.3,1) both;
  }

  .love-ceremony-title {
    animation: love-ceremony-title 1.82s cubic-bezier(.2,.7,.2,1) both;
  }

  .love-ceremony-line {
    transform-origin: center;
    animation: love-ceremony-line 1.78s cubic-bezier(.16,1,.3,1) both;
  }

  .love-ceremony-sign-left {
    animation: love-ceremony-sign-left 1.82s cubic-bezier(.16,1,.3,1) both;
  }

  .love-ceremony-sign-right {
    animation: love-ceremony-sign-right 1.82s cubic-bezier(.16,1,.3,1) both;
  }

  .love-editorial-line {
    display: block;
    opacity: 0;
    animation: love-editorial-line-reveal .42s var(--love-line-delay, 0ms) cubic-bezier(.16,1,.3,1) both;
  }


  .love-score-star-label {
    fill: rgba(248,239,226,.82);
    font-family: Cinzel, Cormorant Garamond, Georgia, serif;
    font-size: 7.2px;
    font-weight: 650;
    letter-spacing: 2.4px;
    text-transform: uppercase;
  }

  .love-score-star-value {
    fill: rgba(232,199,125,.9);
    font-family: Avenir Next, SF Pro Text, system-ui, sans-serif;
    font-size: 6.5px;
    font-weight: 760;
    letter-spacing: 1.2px;
  }

  .love-zodiac-medallion {
    position: relative;
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
  }

  .love-zodiac-medallion img {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: .94;
    filter:
      drop-shadow(0 2px 3px rgba(0, 0, 0, .82))
      drop-shadow(0 0 4px rgba(255, 239, 210, .12));
  }

  .love-zodiac-medallion.is-selected {
    transform: scale(1.02);
  }

  .love-zodiac-medallion.is-selected img {
    opacity: 1;
    filter:
      brightness(1.06) saturate(1.08)
      drop-shadow(0 2px 3px rgba(0, 0, 0, .8))
      drop-shadow(0 0 6px rgba(244, 203, 135, .2));
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
function ZodiacMedallion({ sign, size, selected = false }: {
  sign: typeof SIGNS[0];
  size: number;
  selected?: boolean;
}) {
  return (
    <span
      className={`love-zodiac-medallion${selected ? ' is-selected' : ''}`}
      style={{
        width: size,
        height: size,
      } as CSSProperties}
      aria-hidden="true"
    >
      <img src={sign.iconPath} alt="" draggable={false} />
    </span>
  );
}

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
          background: 'radial-gradient(ellipse at 50% 0%, rgba(211,139,158,0.16), transparent 34%), linear-gradient(180deg, #1A1118, #0E0A0F)',
          borderTop: '1px solid rgba(224,177,104,0.48)',
          borderRadius: '8px 8px 0 0',
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
          <h2 style={{ margin: '5px 0 0', fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#FFF8EF', fontSize: 25, fontWeight: 500 }}>Choisis un signe</h2>
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
                  minHeight: 76,
                  boxShadow: isSelected
                    ? '0 10px 24px rgba(0,0,0,0.3), 0 0 18px rgba(229,196,164,0.09), inset 0 1px 0 rgba(255,255,255,0.09)'
                    : '0 6px 16px rgba(0,0,0,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: isSelected ? 'love-sign-confirm .62s ease both' : undefined,
                }}
              >
                <ZodiacMedallion sign={s} size={40} selected={isSelected} />
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
function LoveRevealCeremony({ sign1, sign2 }: { sign1: number; sign2: number }) {
  const firstColor = ELEMENT_COLORS[SIGNS[sign1].element];
  const secondColor = ELEMENT_COLORS[SIGNS[sign2].element];

  return (
    <div className="love-reveal-ceremony pointer-events-none fixed inset-0" style={{ zIndex: 80, overflow: 'hidden' }} aria-hidden="true">
      <div
        className="love-ceremony-veil absolute inset-0"
        style={{
          background: 'rgba(7,5,8,.96)',
        }}
      />

      <div
        className="love-ceremony-curtain-left absolute"
        style={{
          width: '76vw',
          height: '76vw',
          maxWidth: 520,
          maxHeight: 520,
          left: '-28vw',
          top: 'calc(43% - min(38vw, 260px))',
          borderRadius: '50%',
          background: `radial-gradient(circle at 76% 50%, ${firstColor}72 0%, ${firstColor}26 28%, transparent 70%)`,
          filter: 'blur(24px)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        className="love-ceremony-curtain-right absolute"
        style={{
          width: '76vw',
          height: '76vw',
          maxWidth: 520,
          maxHeight: 520,
          right: '-28vw',
          top: 'calc(43% - min(38vw, 260px))',
          borderRadius: '50%',
          background: `radial-gradient(circle at 24% 50%, ${secondColor}72 0%, ${secondColor}26 28%, transparent 70%)`,
          filter: 'blur(24px)',
          mixBlendMode: 'screen',
        }}
      />

      <div className="absolute left-1/2 top-[43%]" style={{ width: 1, height: 1 }}>
        <span
          className="love-ceremony-flash absolute"
          style={{
            width: 112,
            height: 112,
            left: -56,
            top: -56,
            borderRadius: '50%',
            background: `radial-gradient(circle, #FFF7DF 0%, ${firstColor}54 28%, ${secondColor}38 48%, transparent 72%)`,
            filter: 'blur(12px)',
          }}
        />
        <span
          className="love-ceremony-line absolute"
          style={{
            width: 'min(72vw, 420px)',
            height: 1,
            left: 'max(-36vw, -210px)',
            top: 0,
            background: `linear-gradient(90deg, transparent, ${firstColor}B8 22%, #FFF3CC 50%, ${secondColor}B8 78%, transparent)`,
            boxShadow: '0 0 12px rgba(255,240,191,.38)',
          }}
        />
        <span className="love-ceremony-sign-left absolute" style={{ left: -52, top: -24 }}><ZodiacMedallion sign={SIGNS[sign1]} size={48} selected /></span>
        <span className="love-ceremony-sign-right absolute" style={{ left: 4, top: -24 }}><ZodiacMedallion sign={SIGNS[sign2]} size={48} selected /></span>
        <div className="love-ceremony-title absolute text-center" style={{ width: 'min(86vw, 460px)', left: 'max(-43vw, -230px)', top: -96 }}>
          <p style={{ margin: 0, color: 'rgba(232,199,125,.78)', fontSize: 8, fontWeight: 750, letterSpacing: 3.6, textTransform: 'uppercase' }}>
            Compatibilité astrale
          </p>
          <p style={{ margin: '12px 0 0', color: '#FFF8EF', fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(28px, 8vw, 40px)', fontWeight: 420, lineHeight: 1, letterSpacing: 0, textShadow: '0 14px 36px rgba(0,0,0,.55)' }}>
            {SIGNS[sign1].name} <span style={{ color: '#E8C77D', fontSize: '.62em', margin: '0 .18em' }}>×</span> {SIGNS[sign2].name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LovePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sign1, setSign1] = useState<number | null>(null);
  const [sign2, setSign2] = useState<number | null>(null);
  const [picker, setPicker] = useState<'sign1' | 'sign2' | null>(null);
  const [clearSelectionHighlights, setClearSelectionHighlights] = useState(false);
  const [showPremiumSales, setShowPremiumSales] = useState(false);
  const [revealStage, setRevealStage] = useState(0);

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
  const isMobileViewport = typeof window !== 'undefined' && window.matchMedia('(max-width: 480px)').matches;
  const compactResult = hasResult && isMobileViewport;

  useEffect(() => {
    if (score === null || sign1 === null || sign2 === null) {
      setRevealStage(0);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealStage(5);
      return;
    }

    setRevealStage(0);
    const timers = [
      window.setTimeout(() => setRevealStage(1), 160),
      window.setTimeout(() => setRevealStage(2), 560),
      window.setTimeout(() => setRevealStage(3), 1080),
      window.setTimeout(() => setRevealStage(4), 1900),
      window.setTimeout(() => setRevealStage(5), 2700),
    ];
    return () => timers.forEach(timer => window.clearTimeout(timer));
  }, [score, sign1, sign2]);

  const handleSignSelect = (id: number) => {
    const completesPair = picker === 'sign1' ? sign2 !== null : sign1 !== null;

    if (picker === 'sign1') setSign1(id);
    if (picker === 'sign2') setSign2(id);

    if (completesPair) {
      const firstSign = picker === 'sign1' ? SIGNS[id] : sign1 !== null ? SIGNS[sign1] : null;
      const secondSign = picker === 'sign2' ? SIGNS[id] : sign2 !== null ? SIGNS[sign2] : null;
      if (firstSign && secondSign) playLoveRevealNotes(firstSign.element, secondSign.element);
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
    // Relancé au retour de la page premium : le canvas est recréé, l'ancien ne s'affiche plus.
  }, [showPremiumSales]);

  if (showPremiumSales) {
    return <LovePremiumSalesPage onBack={() => setShowPremiumSales(false)} />;
  }

  return (
    <div className="love-page relative flex flex-col items-center overflow-hidden px-4"
      style={{
        background: 'radial-gradient(ellipse at 50% -8%, rgba(218, 145, 164, 0.24), transparent 36%), radial-gradient(ellipse at 90% 42%, rgba(133, 78, 119, 0.16), transparent 38%), radial-gradient(ellipse at 18% 92%, rgba(179, 94, 128, 0.12), transparent 42%), linear-gradient(165deg, #171018 0%, #1B1119 48%, #100C12 100%)',
        height: 'calc(100dvh - 36px)',
        color: '#FDF6ED',
      }}>
      <InjectGlowStyles />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {hasResult && sign1 !== null && sign2 !== null && revealStage < 4 && (
        <LoveRevealCeremony key={`ceremony-${sign1}-${sign2}`} sign1={sign1} sign2={sign2} />
      )}

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(255,225,230,0.035), transparent 20%), radial-gradient(ellipse at 50% 28%, rgba(238, 175, 190, 0.055) 0%, transparent 50%), linear-gradient(90deg, rgba(0,0,0,0.14), transparent 16%, transparent 84%, rgba(0,0,0,0.14))' }} />
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
        <div className="flex flex-col items-center" style={{ flexShrink: 0, marginTop: hasResult ? 0 : 16, marginBottom: hasResult ? (compactResult ? 10 : 12) : 34 }}>
          <div className="flex items-center gap-3" style={{ marginBottom: hasResult ? 9 : 14 }}>
            <div className="h-px w-9" style={{ background: 'linear-gradient(90deg, transparent, rgba(224,177,104,0.62))' }} />
            <p style={{ margin: 0, fontSize: 8, color: '#D8B57F', letterSpacing: 3.2, textTransform: 'uppercase', fontWeight: 700 }}>
              Night One · Synastrie
            </p>
            <div className="h-px w-9" style={{ background: 'linear-gradient(90deg, rgba(224,177,104,0.62), transparent)' }} />
          </div>
          <h1 style={{ margin: 0, fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: hasResult ? (compactResult ? 25 : 28) : 32, fontWeight: 420, color: '#F8F0E5', letterSpacing: 0, lineHeight: 0.96, textAlign: 'center', whiteSpace: 'nowrap', textShadow: '0 14px 34px rgba(0,0,0,0.48)' }}>
            Compatibilité astrale
          </h1>
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
              padding: 0,
              border: 'none',
              borderRadius: 0,
              background: 'transparent',
              boxShadow: 'none',
            }}
          >
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
            aria-label={`Révélation de compatibilité : ${relationshipVerdict}`}
            style={{
              position: 'relative',
              overflow: 'visible',
              flexShrink: 0,
              marginTop: compactResult ? 8 : 12,
              padding: compactResult ? '12px 4px 18px' : '14px 8px 22px',
              border: 'none',
              background: 'transparent',
              boxShadow: 'none',
              animation: 'love-rise 0.55s ease forwards',
            }}
          >
            <div className="relative flex flex-col items-center text-center">
              <div className="flex items-center gap-2" style={{ color: '#D7BE9F', fontSize: 8.5, letterSpacing: 2.6, textTransform: 'uppercase', fontWeight: 800 }}>
                <Sparkles size={10} strokeWidth={1.4} />
                Lecture instantanée
              </div>

              <div
                className="relative flex w-full items-center justify-center"
                style={{
                  marginTop: compactResult ? 18 : 22,
                  marginBottom: compactResult ? 22 : 26,
                  gap: compactResult ? 22 : 30,
                  opacity: revealStage >= 1 ? 1 : 0,
                  transform: revealStage >= 1 ? 'translateY(0) scale(1)' : 'translateY(8px) scale(.94)',
                  transition: 'opacity .7s ease, transform .9s cubic-bezier(.16, 1, .3, 1)',
                }}
              >
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
                      width: compactResult ? 44 : 48,
                      height: compactResult ? 44 : 48,
                      borderRadius: 999,
                      border: 'none',
                      background: 'transparent',
                      color: ELEMENT_COLORS[sign.element],
                      fontSize: compactResult ? 20 : 22,
                      boxShadow: 'none',
                    }}
                    aria-hidden="true"
                  >
                    <ZodiacMedallion sign={sign} size={compactResult ? 44 : 48} selected />
                  </span>
                ))}
                <div
                  className="love-reveal-glint flex items-center justify-center"
                  style={{ position: 'relative', zIndex: 1, width: 34, height: 34, color: '#E8C77D', filter: 'drop-shadow(0 0 12px rgba(232,199,125,.55))' }}
                  aria-hidden="true"
                >
                  <Sparkles size={18} strokeWidth={1.1} />
                </div>
                {[SIGNS[sign2!]].map((sign, index) => (
                  <span
                    key={`${sign.id}-${index}`}
                    className="love-result-sign love-result-sign--right flex items-center justify-center"
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      width: compactResult ? 44 : 48,
                      height: compactResult ? 44 : 48,
                      borderRadius: 999,
                      border: 'none',
                      background: 'transparent',
                      color: ELEMENT_COLORS[sign.element],
                      fontSize: compactResult ? 20 : 22,
                      boxShadow: 'none',
                    }}
                    aria-hidden="true"
                  >
                    <ZodiacMedallion sign={sign} size={compactResult ? 44 : 48} selected />
                  </span>
                ))}
              </div>

              <span style={{ color: '#D8B36A', fontSize: 8.8, letterSpacing: 2.4, textTransform: 'uppercase', fontWeight: 850, opacity: revealStage >= 2 ? 1 : 0, transition: 'opacity .6s ease' }}>
                {SIGNS[sign1!].name} · {SIGNS[sign2!].name}
              </span>
            </div>
            <div style={{ opacity: revealStage >= 3 ? 1 : 0, transform: revealStage >= 3 ? 'scale(1)' : 'scale(.72)', filter: revealStage >= 3 ? 'blur(0)' : 'blur(6px)', transition: 'opacity .8s ease, transform 1s cubic-bezier(.16, 1, .3, 1), filter .8s ease' }}>
              <CompatibilityScoreStar
                key={`star-${sign1}-${sign2}`}
                axes={instantAxes}
                score={animatedScore}
                compact={compactResult}
              />
            </div>
            <div style={{ opacity: revealStage >= 4 ? 1 : 0, transform: revealStage >= 4 ? 'translateY(0)' : 'translateY(10px)', transition: 'opacity .7s .12s ease, transform .8s .12s ease' }}>
              {revealStage >= 4 && (
                <PremiumLinkEditorial
                  key={`editorial-${sign1}-${sign2}`}
                  text={pairResultLine}
                  compact={compactResult}
                />
              )}
            </div>
          </section>
        )}

        {hasResult && revealStage >= 5 && (
          <div
            className="w-full"
            style={{
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
              marginTop: compactResult ? 14 : 16,
              padding: compactResult ? '15px 15px 14px' : '17px 17px 15px',
              borderRadius: 8,
              border: '1px solid rgba(224, 177, 104, 0.28)',
              background: 'linear-gradient(180deg, rgba(202,128,148,0.065), rgba(255,255,255,0.008)), rgba(16,10,15,0.92)',
              boxShadow: '0 18px 46px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,245,224,0.045)',
              animation: 'love-rise .58s cubic-bezier(.16,1,.3,1) both',
            }}
          >
            <div className="absolute left-0 top-0 h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(239,203,167,0.58), transparent)' }} />
            <div className="flex items-center gap-3">
              <span
                className="flex flex-shrink-0 items-center justify-center"
                style={{
                  width: 34,
                  height: 34,
                  color: '#E4BE91',
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
              borderRadius: 4,
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
              Sélectionne les deux signes pour commencer l’analyse.
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
      note: 'Tu vois ce qui attire, ce qui rassure, et ce qui peut créer une distance.',
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
            Découvre ce que votre lien révèle vraiment
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
            Obtiens ta lecture complète, personnelle et détaillée.
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
          ? 'rgba(255,255,255,0.01)'
          : 'linear-gradient(180deg, rgba(207,135,152,0.1), rgba(255,235,239,0.018) 40%, rgba(0,0,0,0.1)), rgba(18,11,16,0.8)',
        border: `1px solid rgba(224, 177, 104, ${sign ? (quiet ? 0.3 : 0.48) : (quiet ? 0.16 : 0.26)})`,
        borderRadius: 6,
        boxShadow: quiet
          ? 'none'
          : '0 20px 48px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,245,224,0.06)',
        minHeight: quiet ? 118 : 154,
        paddingTop: 16,
        paddingBottom: 14,
        animation: sign && !quiet ? 'love-sign-confirm .62s ease both' : undefined,
      }}
    >
      {!quiet && (
        <span className="absolute top-0 h-px" style={{ left: '18%', right: '18%', background: 'linear-gradient(90deg, transparent, rgba(241,206,170,0.72), transparent)' }} />
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
              color: '#C9A873',
              marginBottom: 8,
              lineHeight: 1,
            }}
          >
            {labelStyled}
          </span>
          <ZodiacMedallion sign={sign} size={quiet ? 42 : 54} selected />
          <span style={{ marginTop: 8, fontFamily: 'Cormorant Garamond, serif', fontSize: 19, color: '#F4EADF', letterSpacing: 0, fontWeight: 560 }}>
            {sign.name}
          </span>
          <ChevronDown size={11} style={{ color: 'rgba(220,190,164,0.58)' }} strokeWidth={1.5} />
        </>
      ) : (
        <>
          <span className="flex items-center justify-center" style={{ width: 36, height: 36, marginBottom: 10, color: '#D9B47B' }}>
            <Plus size={22} strokeWidth={1.1} aria-hidden="true" />
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

function PremiumLinkEditorial({ text, compact }: { text: string; compact: boolean }) {
  const maxCharacters = compact ? 38 : 44;
  const lines = text.split(/\s+/).reduce<string[]>((result, word) => {
    const currentLine = result[result.length - 1];
    if (!currentLine || `${currentLine} ${word}`.length > maxCharacters) {
      result.push(word);
    } else {
      result[result.length - 1] = `${currentLine} ${word}`;
    }
    return result;
  }, []);

  return (
    <article
      style={{
        position: 'relative',
        width: 'min(100%, 360px)',
        margin: compact ? '0 auto' : '3px auto 0',
        padding: compact ? '12px 14px 10px' : '15px 18px 12px',
        textAlign: 'center',
      }}
    >
      <div className="flex items-center justify-center gap-3" aria-hidden="true">
        <span style={{ width: 42, height: 1, background: 'linear-gradient(90deg, transparent, rgba(232,199,125,.3))' }} />
        <span style={{ width: 4, height: 4, background: '#E8C77D', transform: 'rotate(45deg)', boxShadow: '0 0 9px rgba(232,199,125,.32)' }} />
        <span style={{ width: 42, height: 1, background: 'linear-gradient(90deg, rgba(232,199,125,.3), transparent)' }} />
      </div>
      <p style={{ margin: compact ? '15px 0 0' : '18px 0 0', color: 'rgba(236,222,222,.72)', fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: compact ? 17.5 : 19, fontWeight: 410, lineHeight: 1.5, letterSpacing: '.008em', textShadow: '0 8px 24px rgba(0,0,0,.3)' }}>
        {lines.map((line, index) => (
          <span
            key={`${line}-${index}`}
            className="love-editorial-line"
            style={{
              '--love-line-delay': `${70 + index * 105}ms`,
              color: index === 0 ? '#FFF7EE' : undefined,
              fontStyle: index === 0 ? 'italic' : undefined,
            } as CSSProperties}
          >
            {line}
          </span>
        ))}
      </p>
    </article>
  );
}

function CompatibilityScoreStar({ axes, score, compact }: { axes: InstantReadingAxis[]; score: number; compact: boolean }) {
  const cx = 130;
  const cy = 143;
  const maxRadius = 76;
  const guideRadii = [0.34, 0.58, 0.82, 1];
  const angles = [-90, 30, 150];
  const points = axes.map((axis, index) => {
    const angle = (angles[index] * Math.PI) / 180;
    const outerRadius = maxRadius + 17;
    const labelAnchor: 'start' | 'middle' | 'end' = index === 0 ? 'middle' : index === 1 ? 'start' : 'end';
    return {
      ...axis,
      x: cx + Math.cos(angle) * maxRadius * (axis.score / 100),
      y: cy + Math.sin(angle) * maxRadius * (axis.score / 100),
      guideX: cx + Math.cos(angle) * maxRadius,
      guideY: cy + Math.sin(angle) * maxRadius,
      labelX: cx + Math.cos(angle) * outerRadius,
      labelY: cy + Math.sin(angle) * outerRadius,
      anchor: labelAnchor,
    };
  });
  const polygonPoints = points.map(point => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(' ');
  const guidePoints = points.map(point => `${point.guideX.toFixed(2)},${point.guideY.toFixed(2)}`).join(' ');
  const scoreKey = axes.map(axis => axis.score).join('-');
  const gradientId = `love-score-star-gradient-${scoreKey}`;
  const auraId = `love-score-star-aura-${scoreKey}`;
  const coreId = `love-score-star-core-${scoreKey}`;
  const glowId = `love-score-star-glow-${scoreKey}`;

  return (
    <section
      className="love-score-star-wrap"
      aria-label="Carte des scores de compatibilite"
      style={{
        width: '100%',
        marginTop: compact ? 14 : 18,
      }}
    >
      <svg
        className="love-score-star"
        viewBox="0 0 260 286"
        role="img"
        aria-label={axes.map(axis => `${axis.label} ${axis.score}%`).join(', ')}
        style={{
          display: 'block',
          width: '100%',
          maxWidth: compact ? 320 : 346,
          height: compact ? 250 : 270,
          margin: '0 auto',
          overflow: 'visible',
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor={axes[2]?.color ?? '#F8EFE1'} stopOpacity="0.34" />
            <stop offset="48%" stopColor={axes[0]?.color ?? '#F08DA5'} stopOpacity="0.54" />
            <stop offset="100%" stopColor={axes[1]?.color ?? '#F0B45B'} stopOpacity="0.42" />
          </linearGradient>
          <radialGradient id={auraId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8C77D" stopOpacity="0.2" />
            <stop offset="48%" stopColor="#D997AA" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#D997AA" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={coreId} cx="38%" cy="30%" r="72%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="34%" stopColor="#FFF0BF" />
            <stop offset="100%" stopColor="#C9903E" />
          </radialGradient>
          <filter id={glowId} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`love-score-ring-${scoreKey}`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#E8C77D" stopOpacity="0.12" />
            <stop offset="0.48" stopColor="#FFF5DD" stopOpacity="0.62" />
            <stop offset="1" stopColor="#D997AA" stopOpacity="0.14" />
          </linearGradient>
        </defs>

        <g className="love-score-signature-heading" aria-hidden="true">
          <path d="M18 17 H78" stroke="rgba(232,199,125,.28)" strokeWidth=".7" />
          <path d="M182 17 H242" stroke="rgba(232,199,125,.28)" strokeWidth=".7" />
          <path d="M130 11 l4 6 -4 6 -4 -6 Z" fill="rgba(232,199,125,.72)" />
          <text x="130" y="35" textAnchor="middle" fill="rgba(232,199,125,.84)" fontFamily="Cinzel, Cormorant Garamond, Georgia, serif" fontSize="7.2" fontWeight="650" letterSpacing="2.8">SIGNATURE DU LIEN</text>
        </g>

        <circle className="love-score-star-aura" cx={cx} cy={cy} r="105" fill={`url(#${auraId})`} />
        <g className="love-score-star-orbit" aria-hidden="true">
          <circle cx={cx} cy={cy} r="96" fill="none" stroke={`url(#love-score-ring-${scoreKey})`} strokeWidth="0.8" strokeDasharray="2 8 18 8" />
          <circle cx={cx} cy={cy} r="88" fill="none" stroke="rgba(242,232,216,0.09)" strokeWidth="0.65" strokeDasharray="1 5" />
          {[[-90, 96], [0, 96], [90, 96], [180, 96]].map(([angle, radius]) => {
            const radians = (angle * Math.PI) / 180;
            const x = cx + Math.cos(radians) * radius;
            const y = cy + Math.sin(radians) * radius;
            return <circle key={angle} cx={x} cy={y} r="1.8" fill="#E8C77D" opacity="0.72" />;
          })}
        </g>

        <g className="love-score-star-guides" aria-hidden="true">
          {guideRadii.map(radius => (
            <polygon
              key={radius}
              points={points.map(point => `${(cx + (point.guideX - cx) * radius).toFixed(2)},${(cy + (point.guideY - cy) * radius).toFixed(2)}`).join(' ')}
              fill="none"
              stroke="rgba(242,232,216,0.11)"
              strokeWidth="0.8"
            />
          ))}
          <polygon points={guidePoints} fill="rgba(255,255,255,0.014)" stroke="rgba(232,199,125,0.25)" strokeWidth="0.95" />
          {points.map(point => (
            <line
              key={`spoke-${point.id}`}
              x1={cx}
              y1={cy}
              x2={point.guideX}
              y2={point.guideY}
              stroke={point.color}
              strokeOpacity="0.28"
              strokeWidth="0.9"
            />
          ))}
        </g>

        <g aria-hidden="true">
          {points.map((point, index) => (
            <line
              key={`fusion-${point.id}`}
              className="love-score-fusion-spoke"
              pathLength={1}
              x1={cx}
              y1={cy}
              x2={point.x}
              y2={point.y}
              stroke={point.color}
              strokeWidth="1.35"
              strokeLinecap="round"
              style={{ '--love-spoke-delay': `${index * 110}ms` } as CSSProperties}
            />
          ))}
          <circle className="love-score-star-core" cx={cx} cy={cy} r="2.4" fill="#FFF8EF" filter={`url(#${glowId})`} />
        </g>

        <polygon
          points={polygonPoints}
          fill={axes[0]?.color ?? '#E8C77D'}
          stroke="none"
          filter={`url(#${glowId})`}
          opacity="0.62"
        />

        <polygon
          className="love-score-star-fill"
          points={polygonPoints}
          fill={`url(#${gradientId})`}
          stroke="rgba(255,248,239,0.78)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <polygon
          className="love-score-star-sheen"
          pathLength={1}
          points={polygonPoints}
          fill="none"
          stroke="rgba(255,248,239,0.5)"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {points.map((point, index) => (
          <g key={point.id}>
            <circle
              className="love-score-star-dot"
              cx={point.x}
              cy={point.y}
              r="2.5"
              fill="#FFF8EF"
              stroke={point.color}
              strokeWidth="1"
              style={{ animationDelay: `${520 + index * 135}ms` }}
            />
            <text
              x={point.labelX}
              y={point.labelY}
              textAnchor={point.anchor}
              dominantBaseline="middle"
              className="love-score-star-label"
            >
              {point.label}
            </text>
            <text
              x={point.labelX}
              y={point.labelY + 10}
              textAnchor={point.anchor}
              dominantBaseline="middle"
              className="love-score-star-value"
            >
              {point.score}%
            </text>
          </g>
        ))}

        <g className="love-score-star-seal">
          <path d={`M${cx} ${cy - 30} L${cx + 7} ${cy - 7} L${cx + 30} ${cy} L${cx + 7} ${cy + 7} L${cx} ${cy + 30} L${cx - 7} ${cy + 7} L${cx - 30} ${cy} L${cx - 7} ${cy - 7} Z`} fill={`url(#${coreId})`} opacity="0.38" filter={`url(#${glowId})`} aria-hidden="true" />
          <circle cx={cx} cy={cy} r="22" fill="rgba(9,7,10,0.94)" stroke="rgba(232,199,125,0.68)" strokeWidth="0.9" />
          <circle cx={cx} cy={cy} r="18" fill="none" stroke="rgba(255,248,239,0.14)" strokeWidth="0.6" strokeDasharray="1 3" aria-hidden="true" />
          <text x={cx} y={cy - 1} textAnchor="middle" dominantBaseline="middle" fill="#FFF8EF" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="17" fontWeight="520">
            {score}%
          </text>
          <text x={cx} y={cy + 12} textAnchor="middle" dominantBaseline="middle" fill="rgba(232,199,125,.82)" fontFamily="Avenir Next, system-ui, sans-serif" fontSize="5.5" fontWeight="700" letterSpacing="1.4">
            SCORE
          </text>
        </g>
        <circle className="love-score-star-core" cx={cx} cy={cy - 22} r="1.6" fill="#FFF8EF" aria-hidden="true" />
      </svg>
    </section>
  );
}

// ─── Score Arc SVG ─────────────────────────────────────────
