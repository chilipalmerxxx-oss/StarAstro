import { useState, useEffect, useRef } from 'react';
import { Heart, ChevronDown } from 'lucide-react';

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
    desc: 'Une connexion cosmique rare — vos énergies se fondent naturellement.',
    color: '#FFD700',
  };
  if (score >= 75) return {
    title: 'Harmonie stellaire',
    desc: 'Belle complicité, vos astres dansent ensemble avec grâce.',
    color: '#FFB86B',
  };
  if (score >= 60) return {
    title: 'Équilibre délicat',
    desc: 'Fort potentiel — la différence crée la complémentarité.',
    color: '#A78BFA',
  };
  if (score >= 45) return {
    title: 'Tension créatrice',
    desc: "Des défis à surmonter, mais aussi de l'intensité et de la passion.",
    color: '#F97316',
  };
  return {
    title: 'Opposition cosmique',
    desc: "Les contraires s'attirent — cette union forge l'âme.",
    color: '#EF4444',
  };
}

// ─── Per-pair mystical descriptions ─────────────────────
const PAIR_DESCS: Record<string, string> = {
  '0-0':  "Deux flammes qui s'embrasent — leur éclat commun peut tout illuminer ou tout consumer.",
  '0-1':  "Le feu cherche la terre, la terre résiste — une alchimie lente qui façonne l'or.",
  '0-2':  "L'étincelle rencontre le vent — ensemble ils allument des incendies de curiosité.",
  '0-3':  "La flamme et la marée — une attraction magnétique entre deux mondes qui se cherchent.",
  '0-4':  "Deux soleils dans le même ciel — leur lumière combinée illumine tout ce qu'ils touchent.",
  '0-5':  "L'impulsion rencontre la précision — l'un agit, l'autre sublime chaque geste.",
  '0-6':  "Les opposés cosmiques s'attirent — le chaos et l'harmonie dansent en équilibre parfait.",
  '0-7':  "Deux forces primordiales — une passion qui transforme et consume à la fois.",
  '0-8':  "Deux archers de feu lancés vers l'infini — une aventure sans horizon visible.",
  '0-9':  "L'élan contre la montagne — ensemble ils déplacent des mondes entiers.",
  '0-10': "Le pionnier et le visionnaire — leur union trace des chemins que nul n'a encore foulés.",
  '0-11': "La flamme et l'océan — une douce extase entre le rêve ardent et l'action pure.",
  '1-1':  "Deux rocs de la même veine — une stabilité éternelle, précieuse comme une ancre céleste.",
  '1-2':  "La terre s'étonne du vent — une fascination mutuelle pleine de surprises infinies.",
  '1-3':  "La terre nourrit l'eau, l'eau féconde la terre — un amour profond et fondateur.",
  '1-4':  "Le trône de velours et la couronne d'or — une union royale d'une sensualité rare.",
  '1-5':  "Deux gardiens de la terre — ils construisent ensemble quelque chose destiné à l'éternité.",
  '1-6':  "Vénus règne sur deux cœurs — beauté, désir et harmonie tissés dans chaque instant.",
  '1-7':  "Les opposés magnétiques — une attraction intense qui transforme l'âme en profondeur.",
  '1-8':  "La forteresse et l'aventurier — l'un rêve de partir, l'autre d'enraciner leurs racines.",
  '1-9':  "Deux bâtisseurs de la terre — leur alliance forge des royaumes durables et sacrés.",
  '1-10': "La tradition face à la révolution — un dialogue fertile entre deux visions du monde.",
  '1-11': "La terre porte l'océan — douceur infinie et rêves partagés au bord du crépuscule.",
  '2-2':  "Quatre esprits dans deux corps — une symphonie perpétuelle de mots et d'éclats.",
  '2-3':  "L'esprit et l'âme — l'un danse, l'autre ressent, ensemble ils créent une magie rare.",
  '2-4':  "Le conteur et le roi — leurs récits communs embrasent des foules entières d'étoiles.",
  '2-5':  "Deux enfants de Mercure — leur complicité intellectuelle est d'une précision céleste.",
  '2-6':  "Deux souffles d'air libres — une valse légère d'idées et de beautés sans fin.",
  '2-7':  "La lumière plonge dans les abysses — fascination et mystère à chaque regard échangé.",
  '2-8':  "Entre aventure de l'esprit et voyage du corps — deux chercheurs d'absolu qui se cherchent.",
  '2-9':  "L'oiseau libre et la montagne — l'un s'envole, l'autre ancre, ensemble ils s'élèvent.",
  '2-10': "Deux esprits en orbite commune — leur connexion vibre à une fréquence unique et rare.",
  '2-11': "L'éclair et la brume — entre clarté et mystère, un lien infiniment envoûtant.",
  '3-3':  "Deux lunes face à face — une profondeur émotionnelle d'une rareté précieuse.",
  '3-4':  "La lune et le soleil — ensemble ils gouvernent le ciel du crépuscule à l'aube.",
  '3-5':  "Le soin et la tendresse — deux âmes qui se protègent et se perfectionnent mutuellement.",
  '3-6':  "Le cœur et l'harmonie — une douceur qui cherche toujours l'équilibre le plus pur.",
  '3-7':  "Deux profondeurs abyssales — une union qui touche l'essence même de l'âme.",
  '3-8':  "Le nid et l'horizon — l'un garde la flamme, l'autre explore les confins du cosmos.",
  '3-9':  "Les opposés fondateurs — la tendresse et l'ambition forgent ensemble un empire durable.",
  '3-10': "Le cœur et la vision — entre intime et universel, un lien d'une singularité absolue.",
  '3-11': "Deux eaux mêlées — une fusion intuitive où les âmes se reconnaissent sans un mot.",
  '4-4':  "Deux astres solaires — leur lumière est aveuglante, leur amour, destiné à la légende.",
  '4-5':  "La grandeur et la grâce — l'un rayonne, l'autre sublime chaque éclat de lumière.",
  '4-6':  "Le roi et l'artiste — ensemble ils créent une cour de beauté et de gloire éternelle.",
  '4-7':  "Deux puissances du zodiaque — une tension magnétique qui consume et révèle tout.",
  '4-8':  "Deux feux libres et ardents — leur union est une fête permanente de l'âme en feu.",
  '4-9':  "L'éclat et la profondeur — l'un rayonne, l'autre bâtit sous la lumière des étoiles.",
  '4-10': "Le solaire et l'humaniste — l'individu et le collectif en dialogue cosmique lumineux.",
  '4-11': "Le soleil et l'océan — leur amour est un coucher de soleil sans fin sur les flots.",
  '5-5':  "Deux perfectionnistes alignés — une précision rare qui affine chaque détail de l'existence.",
  '5-6':  "L'art de raffiner et l'art d'harmoniser — un duo d'une élégance absolument souveraine.",
  '5-7':  "L'analyse et le mystère — ensemble ils percent les secrets les mieux gardés de l'univers.",
  '5-8':  "L'ordre et la liberté — leur dialogue fertile engendre une sagesse singulière et libre.",
  '5-9':  "Deux artisans de la réalité — leur alliance bâtit des cathédrales de sens et de beauté.",
  '5-10': "La précision et l'idéal — deux visions distinctes qui s'enrichissent à l'infini.",
  '5-11': "Les opposés qui se complètent — le concret et le rêve, en équilibre parfait et sacré.",
  '6-6':  "Deux miroirs qui s'admirent — beauté, raffinement et quête de l'harmonie absolue.",
  '6-7':  "La grâce rencontre l'intensité — une attraction envoûtante et profondément transformatrice.",
  '6-8':  "L'harmonie et l'aventure — un duo léger et lumineux qui embrasse les confins du monde.",
  '6-9':  "L'élégance et la maîtrise — ensemble ils sculptent quelque chose de noble et de durable.",
  '6-10': "Deux esprits de l'air en quête d'idéal — une union rare, avant-gardiste et lumineuse.",
  '6-11': "La beauté et le rêve — un amour délicat comme un voile de lumière posé sur l'eau.",
  '7-7':  "Deux abysses face à face — une intensité totale qui touche les confins de l'absolu.",
  '7-8':  "L'ombre et la flèche — une tension créatrice entre la profondeur et l'envol vers le ciel.",
  '7-9':  "Deux maîtres des profondeurs — leur union forge une puissance rare et redoutable.",
  '7-10': "La profondeur et la vision — un dialogue de titans qui illumine les plus sombres abysses.",
  '7-11': "Deux âmes des eaux profondes — une fusion mystique d'une intensité absolument rare.",
  '8-8':  "Deux archers vers l'infini — une liberté partagée, une fête perpétuelle de l'existence.",
  '8-9':  "L'horizon et le sommet — l'un explore, l'autre gravit, ensemble ils conquièrent tout.",
  '8-10': "Deux explorateurs du futur — leur union est une prophétie cosmique en marche constante.",
  '8-11': "Le philosophe et le rêveur — ensemble ils touchent les portes de l'invisible sacré.",
  '9-9':  "Deux gardiens du temps — leur alliance est solide et sacrée comme une montagne primordiale.",
  '9-10': "La tradition et la révolution — un dialogue de fond qui façonne silencieusement le monde.",
  '9-11': "La roche et l'océan — une douce érosion qui crée les plus belles côtes de l'existence.",
  '10-10':"Deux prophètes de demain — leur vision commune transcende toutes les frontières connues.",
  '10-11':"La vision et l'intuition — deux rêveurs qui perçoivent au-delà du voile des apparences.",
  '11-11':"Deux âmes de l'au-delà — une fusion spirituelle où les frontières entre les êtres s'effacent.",
};

function getPairDesc(s1: number, s2: number): string {
  const key = `${Math.min(s1, s2)}-${Math.max(s1, s2)}`;
  return PAIR_DESCS[key] || '';
}

function getCompatibilityDescription(score: number, s1: number, s2: number): string {
  const scoreDesc = getLabel(score).desc;
  const pairDesc = getPairDesc(s1, s2);
  return pairDesc ? `${scoreDesc} ${pairDesc}` : scoreDesc;
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
function useCountUp(target: number | null, duration = 6000): number | null {
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
      style={{ background: 'rgba(0,0,0,0.75)', paddingBottom: 72 }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-3xl pt-4 px-4"
        style={{ background: '#13101A', borderTop: '1px solid rgba(255,184,107,0.3)', maxHeight: '72vh', overflowY: 'auto', paddingBottom: 24 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(255,184,107,0.4)' }} />
        </div>
        <p className="text-center text-xs tracking-widest uppercase mb-4" style={{ color: '#8A7A6A' }}>
          Choisir un signe
        </p>
        <div className="grid grid-cols-4 gap-1.5">
          {SIGNS.map(s => {
            const isSelected = !clearSelectionHighlights && ((typeof sign1 === 'number' && s.id === sign1) || (typeof sign2 === 'number' && s.id === sign2));
            const isVeryLongName = s.name.length >= 10;
            const isLongName = s.name.length >= 8;

            return (
              <button
                key={s.id}
                onClick={() => { onSelect(s.id); onClose(); }}
                className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl transition-all"
                style={{
                  background: 'rgba(255,255,255,0.10)',
                  border: isSelected ? '2.5px solid #FFD700' : '1.5px solid #FFD580',
                  boxShadow: isSelected
                    ? '0 0 18px 4px #FFD700cc, 0 2px 8px 0 #0006'
                    : '0 0 12px 2px #FFD58088, 0 2px 8px 0 #0006',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    fontSize: 19,
                    color: isSelected ? '#FFD700' : ELEMENT_COLORS[s.element],
                    fontWeight: isSelected ? 700 : 500,
                    textShadow: isSelected
                      ? '0 0 8px #FFD700cc, 0 1px 4px #000a'
                      : undefined,
                  }}
                >{s.glyph}</span>
                <span
                  style={{
                    fontSize: isVeryLongName ? 9.5 : isLongName ? 10.2 : 11,
                    color: isSelected ? '#FFD700' : '#FFF',
                    letterSpacing: isVeryLongName ? 0.35 : isLongName ? 0.55 : 0.8,
                    fontFamily: 'system-ui',
                    fontWeight: isSelected ? 800 : 600,
                    lineHeight: 1.05,
                    textAlign: 'center',
                    maxWidth: '100%',
                    whiteSpace: 'nowrap',
                    textShadow: isSelected
                      ? '0 0 8px #FFD700cc, 0 1px 4px #000a'
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

  const score = sign1 !== null && sign2 !== null ? computeScore(sign1, sign2) : null;
  const animatedScore = useCountUp(score);
  const label = score !== null ? getLabel(score) : null;
  const hasResult = score !== null && label !== null && animatedScore !== null;
  const isMobileViewport = typeof window !== 'undefined' && window.matchMedia('(max-width: 480px)').matches;
  const compactResult = hasResult && isMobileViewport;

  // Play whoosh on every new score
  const prevScore = useRef<number | null>(null);
  useEffect(() => {
    if (score !== null && score !== prevScore.current) playAstralWhoosh();
    prevScore.current = score;
  }, [score]);

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

  return (
    <div className="relative flex flex-col items-center px-4 py-3 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #18121F 0%, #2B2340 100%)', height: 'calc(100dvh - 56px)', color: '#FDF6ED' }}>
      <InjectGlowStyles />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(255,100,150,0.06) 0%, transparent 60%)' }} />

      <div className="relative z-10 w-full max-w-md h-full flex flex-col items-center gap-2" style={{ color: '#FDF6ED', justifyContent: 'flex-start', paddingTop: compactResult ? 2 : 6 }}>

        {/* Header */}
        <div className="flex flex-col items-center gap-1" style={{ marginBottom: compactResult ? 8 : 12 }}>
          <div className="flex items-center gap-3">
            <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,130,160,0.5))' }} />
            <Heart size={14} style={{ color: '#FF8FA0' }} fill="#FF8FA0" />
            <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, rgba(255,130,160,0.5), transparent)' }} />
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: compactResult ? 22 : 24, fontWeight: 500, color: '#FFF8F0', letterSpacing: 4, textShadow: '0 2px 8px #2B2340AA' }}>
            Compatibilité
          </h1>
          <p style={{ fontSize: compactResult ? 10 : 11, color: '#D2BDCF', letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'system-ui', fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
            Simulateur astral
          </p>
        </div>

        {/* Sign selectors */}
        <div className="w-full flex items-center justify-between gap-3" style={{ marginTop: compactResult ? 4 : 10 }}>

          {/* Sign 1 */}
          <SignCard
            sign={sign1 !== null ? SIGNS[sign1] : null}
            label="Ton signe"
            onClick={() => setPicker('sign1')}
          />

          {/* Heart divider */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div style={{ fontSize: 20, color: '#FF8FA0', filter: 'drop-shadow(0 0 8px rgba(255,130,160,0.5))' }}>♥</div>
            {sign1 !== null && sign2 !== null && (
              <div style={{ width: 1, height: 20, background: 'linear-gradient(180deg, rgba(255,130,160,0.5), transparent)' }} />
            )}
          </div>

          {/* Sign 2 */}
          <SignCard
            sign={sign2 !== null ? SIGNS[sign2] : null}
            label="Son signe"
            onClick={() => setPicker('sign2')}
          />
        </div>

        {/* Result */}
        {hasResult && (
          <div
            className="w-full flex flex-col items-center gap-1.5 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${label.color}33`,
              boxShadow: `0 0 40px ${label.color}12`,
              animation: 'fade-in 0.5s ease forwards',
              padding: compactResult ? '10px 12px' : '12px 16px',
            }}
          >
            {/* Score arc */}
            <ScoreArc value={animatedScore} color={label.color} compact={compactResult} />

            {/* Title */}
            <div className="flex flex-col items-center gap-1">
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: compactResult ? 21 : 24, fontWeight: 400, color: label.color, letterSpacing: 2 }}>
                {label.title}
              </span>
              <p style={{ fontSize: compactResult ? 13.5 : 15, color: '#E6D6E6', textAlign: 'center', lineHeight: 1.35, maxWidth: 290, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', textShadow: '0 1px 3px rgba(0,0,0,0.45)', display: '-webkit-box', WebkitLineClamp: compactResult ? 2 : 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {getCompatibilityDescription(score!, sign1!, sign2!)}
              </p>
            </div>

            {/* Signs summary */}
            <div className="flex items-center gap-3 mt-1">
              {sign1 !== null && (
                <span style={{
                  fontSize: 26,
                  color: ELEMENT_COLORS[SIGNS[sign1].element],
                  animation: `glow-${SIGNS[sign1].element} 2.4s ease-in-out infinite`,
                  display: 'inline-block',
                }}>
                  {SIGNS[sign1].glyph}
                </span>
              )}
              <span style={{ fontSize: 12, color: '#6A5A6A', letterSpacing: 3 }}>✦</span>
              {sign2 !== null && (
                <span style={{
                  fontSize: 26,
                  color: ELEMENT_COLORS[SIGNS[sign2].element],
                  animation: `glow-${SIGNS[sign2].element} 2.4s ease-in-out infinite 0.3s`,
                  display: 'inline-block',
                }}>
                  {SIGNS[sign2].glyph}
                </span>
              )}
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setClearSelectionHighlights(true);
                setSign1(null);
                setSign2(null);
                setPicker(null);
                requestAnimationFrame(() => setClearSelectionHighlights(false));
              }}
              style={{
                fontSize: compactResult ? 11 : 12,
                color: '#FFE2C7',
                letterSpacing: 2.2,
                fontFamily: 'system-ui',
                fontWeight: 700,
                marginTop: compactResult ? 4 : 6,
                background: 'rgba(255, 176, 110, 0.12)',
                border: '1px solid rgba(255, 176, 110, 0.45)',
                borderRadius: 999,
                padding: compactResult ? '5px 12px' : '6px 14px',
                cursor: 'pointer',
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                animation: 'love-restart-pulse 1.8s ease-in-out infinite',
              }}
            >
              Recommencer
            </button>
          </div>
        )}

        {/* Hint when nothing selected */}
        {sign1 === null && sign2 === null && (
          <p style={{ fontSize: 14, color: '#E7D5E4', fontStyle: 'italic', fontFamily: 'Cormorant Garamond, serif', textAlign: 'center', marginTop: 18, lineHeight: 1.5, textShadow: '0 1px 3px rgba(0,0,0,0.45)' }}>
            Sélectionnez deux signes pour révéler leur affinité cosmique
          </p>
        )}
      </div>

      {/* Picker modal */}
      {picker && (
        <SignPicker
          onSelect={id => { if (picker === 'sign1') setSign1(id); else setSign2(id); }}
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
function SignCard({ sign, label, onClick }: {
  sign: typeof SIGNS[0] | null;
  label: string;
  onClick: () => void;
}) {
  const labelStyled = label.toUpperCase();

  return (
    <button
      onClick={onClick}
      className="flex-1 flex flex-col items-center justify-center gap-1 rounded-2xl py-3 transition-all"
      style={{
        background: sign ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.07)',
        border: sign
          ? `1.5px solid ${ELEMENT_COLORS[sign.element]}B3`
          : '1.5px dashed rgba(255,255,255,0.45)',
        boxShadow: sign
          ? `0 8px 22px ${ELEMENT_COLORS[sign.element]}30, inset 0 0 0 1px rgba(255,255,255,0.08)`
          : '0 6px 18px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.05)',
        minHeight: sign ? 88 : 96,
        paddingTop: sign ? 8 : 12,
        paddingBottom: sign ? 8 : 12,
      }}
    >
      {sign ? (
        <>
          <span
            style={{
              fontFamily: 'Cinzel, Cormorant Garamond, serif',
              fontSize: 10.5,
              letterSpacing: 2.6,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#FDE2C7',
              textShadow: '0 1px 4px rgba(0,0,0,0.55), 0 0 10px rgba(255,190,130,0.18)',
              marginBottom: 2,
              lineHeight: 1,
            }}
          >
            {labelStyled}
          </span>
          <span style={{
            fontSize: 30,
            color: ELEMENT_COLORS[sign.element],
            animation: `glow-${sign.element} 2.8s ease-in-out infinite`,
            display: 'inline-block',
            filter: 'drop-shadow(0 1px 6px rgba(0,0,0,0.45))',
          }}>
            {sign.glyph}
          </span>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, color: '#FFF3E8', letterSpacing: 1.2, fontWeight: 600, textShadow: '0 1px 3px rgba(0,0,0,0.45)' }}>
            {sign.name}
          </span>
          <ChevronDown size={12} style={{ color: 'rgba(255,255,255,0.75)' }} />
        </>
      ) : (
        <>
          <span style={{ fontSize: 26, color: 'rgba(255,255,255,0.68)', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>?</span>
          <span
            style={{
              fontFamily: 'Cinzel, Cormorant Garamond, serif',
              fontSize: 12,
              letterSpacing: 2.8,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#E8D6C9',
              textShadow: '0 1px 4px rgba(0,0,0,0.55), 0 0 10px rgba(255,190,130,0.12)',
              lineHeight: 1.15,
              textAlign: 'center',
            }}
          >
            {labelStyled}
          </span>
        </>
      )}
    </button>
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
  const circumference = Math.PI * r; // half circle
  const filled = circumference * (value / 100);

  return (
    <div className="flex flex-col items-center" style={{ position: 'relative', width, height }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Track */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* Fill */}
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
      {/* Percentage text */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center' }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: compact ? 28 : 32, fontWeight: 300, color, lineHeight: 1, filter: `drop-shadow(0 0 12px ${color}80)` }}>
          {value}
        </span>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: compact ? 13 : 15, color: `${color}AA`, marginLeft: 1 }}>%</span>
      </div>
    </div>
  );
}
