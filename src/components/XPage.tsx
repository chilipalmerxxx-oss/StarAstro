import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import firstLookImage from '../assets/compatibility/lea-sacha-first-look.jpg';
import communicationImage from '../assets/compatibility/lea-sacha-communication.jpg';
import repairImage from '../assets/compatibility/lea-sacha-repair.jpg';
import './XPage.css';

interface RegisterThread {
  anchor: string;
  astro: string;
  reading: string;
}

interface AspectFamily {
  family: string;
  scope: string;
  reading: string;
}

interface ThemeBalancePerson {
  name: string;
  strengths: string[];
  flaws: string[];
}

interface RegisterThemeBalance {
  subtitle: string;
  people: ThemeBalancePerson[];
}

interface RegisterPage {
  id: string;
  chapter: string;
  cinemaTitle: string;
  kicker: string;
  title: string;
  tagline: string;
  chemistry: number;
  intensityLabel: string;
  image: string;
  imageAlt: string;
  body: string[];
  threads: RegisterThread[];
  aspectFamilies: AspectFamily[];
  signals: string[];
  synthesis?: Array<{ label: string; value: string }>;
  mantra?: string;
}

const REGISTER_THEME_BALANCES: Record<string, RegisterThemeBalance> = {
  character: {
    subtitle: 'Registre du caractère : ce que chacun apporte quand le lien démarre.',
    people: [
      {
        name: 'Léa',
        strengths: ['Présence solaire', 'Charme direct', 'Sens du jeu relationnel'],
        flaws: ['Besoin d’être rassurée vite', 'Peut surinterpréter les silences lorsque le lien manque de clarté'],
      },
      {
        name: 'Sacha',
        strengths: ['Élan spontané', 'Esprit libre', 'Capacité à surprendre'],
        flaws: ['Distance difficile à lire', 'Peut renforcer le flou lorsqu’il cherche à préserver son espace'],
      },
    ],
  },
  emotion: {
    subtitle: 'Registre émotionnel : comment chacun protège son monde intérieur.',
    people: [
      {
        name: 'Léa',
        strengths: ['Grande intuition', 'Tendresse profonde', 'Lecture fine des ambiances'],
        flaws: ['Imagine vite le scénario complet', 'Attend parfois que l’autre devine ce qu’elle n’a pas encore dit'],
      },
      {
        name: 'Sacha',
        strengths: ['Présence stable', 'Fidélité tranquille', 'Gestes concrets'],
        flaws: ['Met du temps à verbaliser', 'Exprime parfois sa présence sans assez nommer ce qu’il ressent'],
      },
    ],
  },
  desire: {
    subtitle: 'Registre du désir : ce qui attire, active et intensifie le lien.',
    people: [
      {
        name: 'Léa',
        strengths: ['Intensité assumée', 'Magnétisme physique', 'Loyauté du désir'],
        flaws: ['Teste la solidité du lien', 'Peut confondre profondeur et preuve immédiate'],
      },
      {
        name: 'Sacha',
        strengths: ['Feu joueur', 'Désir expressif', 'Goût de la conquête'],
        flaws: ['Protège trop sa liberté', 'Peut se retirer lorsque l’intensité devient trop exigeante'],
      },
    ],
  },
  synthesis: {
    subtitle: 'Registre du bilan : ce que le duo peut construire et stabiliser ensemble.',
    people: [
      {
        name: 'Léa',
        strengths: ['Chaleur durable', 'Lucidité affective', 'Capacité à rendre le lien vivant'],
        flaws: ['Interprète les écarts', 'Peut demander une preuve quand une conversation suffirait presque'],
      },
      {
        name: 'Sacha',
        strengths: ['Ancrage progressif', 'Vision large', 'Capacité à calmer le drame'],
        flaws: ['Intellectualise trop', 'Peut analyser le lien au lieu de rester simplement présent'],
      },
    ],
  },
};

function getAspectTone(title: string): 'harmony' | 'tension' | 'adjustment' | 'intensity' | 'spark' | 'growth' {
  const normalized = title.toLowerCase();
  if (normalized.includes('sextile') || normalized.includes('trigone') || normalized.includes('forces')) return 'harmony';
  if (normalized.includes('carré') || normalized.includes('opposé') || normalized.includes('opposition') || normalized.includes('défis')) return 'tension';
  if (normalized.includes('quinconce') || normalized.includes('conseil')) return 'adjustment';
  if (normalized.includes('pluton') || normalized.includes('conjoint vénus') || normalized.includes('conjoint soleil')) return 'intensity';
  if (normalized.includes('uranus')) return 'spark';
  return 'growth';
}

function getAspectNatureLabel(title: string): string {
  const normalized = title.toLowerCase();
  if (normalized.includes('conjoint')) return 'Conjonction';
  if (normalized.includes('opposé') || normalized.includes('opposition')) return 'Opposition';
  if (normalized.includes('carré')) return 'Carré';
  if (normalized.includes('trigone')) return 'Trigone';
  if (normalized.includes('sextile')) return 'Sextile';
  if (normalized.includes('quinconce')) return 'Quinconce';
  if (normalized.includes('forces')) return 'Forces';
  if (normalized.includes('défis')) return 'Défis';
  if (normalized.includes('conseil')) return 'Conseil';
  if (normalized.includes('mantra')) return 'Mantra';
  return 'Aspect';
}

const PLANET_GLYPHS: Record<string, string> = {
  soleil: '☉',
  lune: '☽',
  mercure: '☿',
  venus: '♀',
  mars: '♂',
  jupiter: '♃',
  saturne: '♄',
  uranus: '♅',
  neptune: '♆',
  pluton: '♇',
  ascendant: 'ASC',
};

function normalizeAstroLabel(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getAspectGlyphBadge(title: string): string {
  const normalized = normalizeAstroLabel(title);
  const aspectGlyph = normalized.includes('conjoint')
    ? '☌'
    : normalized.includes('oppose') || normalized.includes('opposition')
      ? '☍'
      : normalized.includes('carre')
        ? '□'
        : normalized.includes('trigone')
          ? '△'
          : normalized.includes('sextile')
            ? '✶'
            : normalized.includes('quinconce')
              ? '⚻'
              : normalized.includes('defis')
                ? '!'
                : normalized.includes('forces')
                  ? '✧'
                  : '•';

  const foundPlanets: string[] = [];
  const planetRegex = /soleil|lune|mercure|venus|mars|jupiter|saturne|uranus|neptune|pluton|ascendant/g;
  let match = planetRegex.exec(normalized);
  while (match) {
    foundPlanets.push(PLANET_GLYPHS[match[0]]);
    match = planetRegex.exec(normalized);
  }

  if (foundPlanets.length >= 2) return `${foundPlanets[0]} ${aspectGlyph} ${foundPlanets[1]}`;
  if (foundPlanets.length === 1) return `${foundPlanets[0]} ${aspectGlyph}`;
  return aspectGlyph;
}

function renderAspectGlyphBadge(title: string) {
  return getAspectGlyphBadge(title).split(' ').map((part, index) => {
    const isAscendant = part === 'ASC';
    const isPlanet = isAscendant || Object.values(PLANET_GLYPHS).includes(part);
    const glyphClass = isPlanet
      ? isAscendant ? 'x-report__aspect-glyph--ascendant' : 'x-report__aspect-glyph--planet'
      : 'x-report__aspect-glyph--aspect';

    return (
      <i className={`x-report__aspect-glyph ${glyphClass}`} key={`${part}-${index}`}>
        {part}
      </i>
    );
  });
}

const THREAD_CONTEXT_NOTES: Record<string, Record<string, string>> = {
  character: {
    'Léa': 'Le point de contact se joue dans son besoin d’intensité visible : le contraste Lion-Verseau devient pour elle une scène vivante, pas seulement une opposition.',
    'Sacha': 'Chez lui, le même contact passe par l’espace et le mouvement : sa distance garde le lien respirable, tout en renforçant la curiosité entre eux.',
  },
  emotion: {
    'Léa': 'Le refuge commun se crée quand elle accepte que le geste visible puisse être aussi profond que le signe caché qu’elle cherche.',
    'Sacha': 'Pour lui, ce refuge demande de rendre sa constance plus lisible : dire un peu plus ce qu’il prouve déjà par sa présence.',
  },
  desire: {
    'Léa': 'Le point de fusion ajoute une note très physique : son intensité devient plus belle quand elle reste invitation plutôt que test.',
    'Sacha': 'De son côté, l’attraction gagne en maturité quand le feu, le jeu et la profondeur coexistent sans devenir une prise de pouvoir.',
  },
  synthesis: {
    'Dominantes': 'La durée possible du lien vient de cette base affective : soutien lunaire, chaleur qui s’ouvre, et présence à réapprendre ensemble.',
    'Maisons clés': 'La trajectoire reste évolutive si le plaisir, la profondeur et l’espace avancent ensemble, sans qu’un registre écrase les autres.',
  },
};

function getVisibleThreads(page: RegisterPage): RegisterThread[] {
  const notes = THREAD_CONTEXT_NOTES[page.id] ?? {};

  return page.threads.slice(0, 2).map((thread) => ({
    ...thread,
    reading: notes[thread.anchor] ? `${thread.reading} ${notes[thread.anchor]}` : thread.reading,
  }));
}

function splitThreadPlacements(placement: string): string[] {
  return placement
    .split(/\s*[·↔]\s*/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitReadingSentences(reading: string): string[] {
  return reading.match(/[^.!?]+[.!?]+/g)?.map((sentence) => sentence.trim()) ?? [reading];
}

const REPORT_PAGES: RegisterPage[] = [
  {
    id: 'character',
    chapter: '01',
    cinemaTitle: 'Chapitre 1 : La rencontre',
    kicker: 'Registre du caractère',
    title: 'Léa arrive en lumière. Sacha répond en profondeur.',
    tagline: 'Qui êtes-vous l’un pour l’autre au premier regard',
    chemistry: 87,
    intensityLabel: 'Présence magnétique',
    image: firstLookImage,
    imageAlt: 'Léa et Sacha se remarquent sur un quai sous un ciel étoilé',
    body: [
      'Dans le thème fictif de Léa, le Soleil est en Lion en maison V. Elle entre dans la relation avec une chaleur visible, un besoin d’être choisie franchement, presque théâtralement — mais dans le bon sens : elle aime quand le lien a une scène, une couleur, une présence.',
      'Sacha, lui, porte un Soleil en Verseau en maison XI et un Ascendant Bélier. Il donne d’abord une impression plus indépendante, plus nerveuse, comme quelqu’un qui observe le cadre tout en ayant déjà envie de le déplacer. Il peut sembler détaché, mais son Ascendant dit autre chose : il réagit vite, parfois avant même d’avoir décidé s’il était concerné.',
      'Au premier regard, Léa sent chez Sacha une liberté qui l’attire autant qu’elle l’agace un peu. Sacha capte chez Léa une intensité solaire qui le fascine, mais qui lui donne aussi envie de garder une porte ouverte. Classique humain : on veut entrer, mais on vérifie quand même où est la sortie.',
      'Leur première dynamique n’est donc pas douce et lisse. Elle est vivante. Léa rend Sacha plus visible. Sacha oblige Léa à ne pas chercher une validation immédiate. Ensemble, ils créent cette impression de deux personnes qui ne se ressemblent pas, mais qui se remarquent avec une précision presque embarrassante.',
      'Dans une scène réelle, cela donnerait quelque chose de simple : Léa parle avec le corps entier, même quand elle fait semblant d’être calme. Sacha répond par éclairs, une phrase rapide, un sourire bref, puis ce retrait qui donne envie d’en savoir plus. Le lien commence dans cette alternance : avance, recul, regard, silence.',
      'La signature de cette première page est une reconnaissance par contraste. Ce n’est pas “nous sommes pareils”, c’est “tu touches exactement l’endroit où je ne fonctionne pas comme toi”. Et parfois, c’est là que la curiosité devient dangereusement intéressante.',
    ],
    threads: [
      {
        anchor: 'Léa',
        astro: 'Soleil en Lion · maison V · Ascendant Balance · Mercure en Vierge maison XI',
        reading: 'Elle charme par présence, mais elle analyse très vite les détails du comportement de l’autre. Elle veut sentir que le lien a une couleur claire, une intention, une vraie scène.',
      },
      {
        anchor: 'Sacha',
        astro: 'Soleil en Verseau · maison XI · Ascendant Bélier · Mercure en Verseau maison X',
        reading: 'Il arrive avec une énergie libre, directe, mentalement rapide, parfois un peu imprévisible. Il attire parce qu’il ne se laisse pas lire entièrement au premier regard.',
      },
      {
        anchor: 'Point de contact',
        astro: 'Soleil Lion maison V ↔ Soleil Verseau maison XI',
        reading: 'Elle cherche l’intensité du moment, il pense au mouvement plus large. Ils ne regardent pas le lien depuis la même fenêtre, et c’est justement ce qui crée la curiosité.',
      },
    ],
    aspectFamilies: [
      {
        family: 'Soleil de Léa opposé au Soleil de Sacha',
        scope: 'Lion maison V ↔ Verseau maison XI',
        reading: 'L’attraction naît de la différence. Léa personnalise le lien, Sacha le met à distance pour mieux le comprendre. L’un dit “regarde-moi”, l’autre répond “laisse-moi respirer”, et pourtant le regard reste accroché.',
      },
      {
        family: 'Ascendant de Léa opposé à l’Ascendant de Sacha',
        scope: 'axe relationnel immédiat',
        reading: 'Léa cherche le rythme juste, Sacha déclenche le mouvement. Elle nuance, il tranche. Ça peut créer une vraie complémentarité, à condition qu’elle ne le trouve pas trop brusque et qu’il ne la trouve pas trop diplomate.',
      },
      {
        family: 'Mercure de Léa en quinconce avec Mercure de Sacha',
        scope: 'Vierge maison XI ↔ Verseau maison X',
        reading: 'Léa précise, corrige, affine. Sacha conceptualise, accélère, saute parfois trois étapes. Ils peuvent se stimuler intellectuellement, mais aussi se perdre dans une conversation où chacun croit être parfaitement clair. Spoiler : pas toujours.',
      },
      {
        family: 'Soleil de Léa trigone à l’Ascendant de Sacha',
        scope: 'Lion ↔ Bélier',
        reading: 'Malgré leurs différences, Sacha reçoit naturellement la vitalité de Léa. Elle active chez lui une réponse spontanée. Il peut avoir envie d’aller vers elle avant même d’avoir trouvé une raison raisonnable. Ce qui est parfois la meilleure raison.',
      },
      {
        family: 'Mercure de Sacha opposé au Soleil de Léa',
        scope: 'Verseau maison X ↔ Lion maison V',
        reading: 'Sacha questionne la manière dont Léa se met en avant. Il peut la pousser à préciser ses intentions ; elle peut lui rappeler que tout ne se règle pas par distance mentale. Leur dialogue a du relief, parfois même un petit goût de duel élégant.',
      },
    ],
    signals: ['Présence forte', 'Curiosité immédiate', 'Rythmes différents'],
  },
  {
    id: 'emotion',
    chapter: '02',
    cinemaTitle: 'Chapitre 2 : La connexion',
    kicker: 'Registre émotionnel',
    title: 'Sous la surface, ils cherchent tous les deux un refuge.',
    tagline: 'Ce que vous ressentez l’un pour l’autre',
    chemistry: 91,
    intensityLabel: 'Profondeur sensible',
    image: communicationImage,
    imageAlt: 'Léa et Sacha discutent dans un café nocturne',
    body: [
      'Léa a une Lune en Cancer en maison XII. Son émotion est profonde, intuitive, parfois cachée même à elle-même. Elle peut sentir l’atmosphère avant de savoir quoi en faire. Elle devine les variations de ton, les silences, les gestes minuscules. Pratique, sauf quand elle devine aussi des choses qui n’ont pas encore eu le temps d’exister.',
      'Sacha porte une Lune en Taureau en maison II. Il a besoin de calme, de constance, de preuves simples. Chez lui, l’attachement passe par la présence, la fiabilité, le corps, les habitudes. Il n’ouvre pas tout immédiatement, mais quand il se pose, il devient solide.',
      'Leur lien émotionnel est donc plus doux qu’il n’en a l’air au premier registre. Derrière le contraste Lion-Verseau, il y a un accord Cancer-Taureau très protecteur. Léa apporte la sensibilité. Sacha apporte l’ancrage. Elle sent. Il stabilise. Quand ils ne se défendent pas, c’est très beau.',
      'La difficulté vient du fait que Léa peut attendre une lecture émotionnelle très fine, tandis que Sacha attend des faits concrets. Elle peut se demander “est-ce qu’il ressent ?”. Lui peut penser “mais je suis là, non ?”. Deux langues de tendresse différentes, aucune mauvaise intention.',
      'Littérairement, leur intimité ressemble à une pièce éclairée très bas. Léa entend les choses avant qu’elles soient dites. Sacha apporte une chaise, une couverture, un geste calme. Elle cherche le signe caché ; lui offre le signe visible. Il faut juste qu’elle accepte que le visible puisse être profond.',
      'Le rapport émotionnel est donc précieux, mais il demande une règle simple : ne pas laisser l’invisible décider seul. Léa gagne à formuler ce qu’elle ressent. Sacha gagne à nommer ce qu’il prouve déjà par sa présence. Entre eux, la tendresse devient plus forte quand elle passe du symbole au geste, puis du geste au mot.',
    ],
    threads: [
      {
        anchor: 'Léa',
        astro: 'Lune en Cancer · maison XII · Vénus en Gémeaux maison IX · Saturne en Poissons maison VI',
        reading: 'Elle aime avec intuition, mais elle a besoin que les choses soient dites pour ne pas se perdre dans ses propres scénarios. Son émotion capte vite les nuances, parfois même trop vite.',
      },
      {
        anchor: 'Sacha',
        astro: 'Lune en Taureau · maison II · Vénus en Scorpion maison VIII · Saturne en Poissons maison XII',
        reading: 'Il donne peu à moitié : s’il s’attache, le lien devient profond, mais il garde longtemps une zone secrète. Sa tendresse passe d’abord par la constance.',
      },
      {
        anchor: 'Le refuge',
        astro: 'Lune Cancer maison XII ↔ Vénus Scorpion maison VIII',
        reading: 'L’attachement est discret, presque souterrain. Beaucoup de choses se passent avant d’être formulées, comme si le lien avait besoin de silence avant de devenir clair.',
      },
    ],
    aspectFamilies: [
      {
        family: 'Lune de Léa sextile à la Lune de Sacha',
        scope: 'Cancer maison XII ↔ Taureau maison II',
        reading: 'C’est l’un des aspects les plus rassurants de leur synastrie fictive. Léa sent, Sacha apaise. Il peut devenir pour elle un point fixe ; elle peut rendre son monde intérieur plus tendre.',
      },
      {
        family: 'Vénus de Sacha trigone à la Lune de Léa',
        scope: 'Scorpion maison VIII ↔ Cancer maison XII',
        reading: 'Sacha touche une zone très intime chez Léa. Il peut la faire se sentir vue sans avoir besoin de tout exposer. C’est doux, mais profond ; pas une tendresse de surface.',
      },
      {
        family: 'Saturne de Sacha trigone à la Lune de Léa',
        scope: 'Poissons maison XII ↔ Cancer maison XII',
        reading: 'Il peut stabiliser ses vagues émotionnelles, mais aussi lui donner l’impression qu’il faut mériter l’accès à sa douceur. L’aspect est protecteur si Sacha reste chaleureux, pas seulement solide.',
      },
      {
        family: 'Vénus de Léa en quinconce avec la Lune de Sacha',
        scope: 'Gémeaux maison IX ↔ Taureau maison II',
        reading: 'Léa séduit par l’échange, l’humour, l’ouverture. Sacha se rassure par la constance. Elle peut vouloir parler du lien ; lui peut vouloir simplement le vivre. Les deux ont raison, ce qui est charmant et légèrement agaçant.',
      },
      {
        family: 'Neptune de Léa sextile à Vénus de Sacha',
        scope: 'Capricorne maison IV ↔ Scorpion maison VIII',
        reading: 'Une brume romantique entoure le lien. Sacha peut idéaliser la profondeur de Léa ; Léa peut sentir chez lui une promesse silencieuse. C’est beau si cela inspire, moins sain si chacun remplit les blancs à la place de l’autre.',
      },
    ],
    signals: ['Attachement réel', 'Besoin de réassurance', 'Silences à décoder'],
  },
  {
    id: 'desire',
    chapter: '03',
    cinemaTitle: 'Chapitre 3 : Le désir',
    kicker: 'Registre du désir',
    title: 'Le désir est intense parce qu’il n’est jamais totalement tranquille.',
    tagline: 'Comment vous vous activez, vous stimulez, vous complétez',
    chemistry: 94,
    intensityLabel: 'Élan vibrant',
    image: repairImage,
    imageAlt: 'Léa et Sacha se rapprochent après une tension au lever du jour',
    body: [
      'Dans ce thème fictif, le désir est très marqué. Mars de Léa en Scorpion en maison II rencontre Vénus de Sacha en Scorpion en maison VIII. Ce n’est pas une attraction légère. C’est une attraction qui observe, qui retient, qui veut comprendre ce qui se passe sous la peau.',
      'Sacha possède aussi Mars en Lion en maison V, posé près du Soleil de Léa. Il réveille chez elle le sentiment d’être désirée, regardée, choisie. Elle peut se sentir plus vivante dans son rayonnement. Lui, de son côté, reçoit son feu comme une invitation à sortir du contrôle mental.',
      'Mais cette dynamique a une vraie intensité. La maison VIII de Sacha et le Scorpion de Léa rendent le lien magnétique, parfois possessif, jamais tiède. Il faut de la maturité pour ne pas transformer l’attirance en test permanent. Le fameux “je vais voir s’il tient à moi” : très humain, rarement rentable.',
      'Le désir ici fonctionne par profondeur, présence physique, tension et reconnaissance narcissique saine. Léa veut sentir qu’elle compte. Sacha veut sentir que le lien ne l’enferme pas. Leur équilibre se trouve quand le désir reste un espace de rencontre, pas une scène de pouvoir.',
      'La partie littéraire du lien est plus nocturne ici. Il y a des regards qui durent une seconde de trop, des silences qui ne sont pas vides, des rapprochements qui semblent anodins mais ne le sont pas. Rien n’a besoin d’être spectaculaire : l’intensité travaille en dessous.',
      'Le danger serait de croire que cette intensité doit toujours prouver quelque chose. Elle n’a pas besoin d’être dramatisée pour exister. Au contraire, plus ils apprennent à la laisser respirer, plus elle devient élégante. Une attraction mature ne hurle pas ; elle reste présente.',
    ],
    threads: [
      {
        anchor: 'Léa',
        astro: 'Mars en Scorpion · maison II · Soleil en Lion maison V',
        reading: 'Son désir est loyal, intense, sensoriel. Elle veut une présence qui ne fuit pas dès que le lien devient réel, surtout quand l’attirance devient plus profonde.',
      },
      {
        anchor: 'Sacha',
        astro: 'Vénus en Scorpion · maison VIII · Mars en Lion maison V',
        reading: 'Il aime avec profondeur, mais son désir a aussi besoin de jeu, de fierté, de feu visible. Il veut sentir l’intensité, sans perdre totalement sa liberté intérieure.',
      },
      {
        anchor: 'Point de fusion',
        astro: 'Mars Scorpion maison II ↔ Vénus Scorpion maison VIII · Mars Lion maison V',
        reading: 'L’attirance mêle plaisir, profondeur et besoin d’être choisi. Elle peut devenir très vivante si elle reste un espace de rencontre, pas une façon de tester l’autre.',
      },
    ],
    aspectFamilies: [
      {
        family: 'Mars de Léa conjoint à Vénus de Sacha',
        scope: 'Scorpion maison II ↔ Scorpion maison VIII',
        reading: 'Aspect très magnétique. Léa active le désir profond de Sacha ; Sacha donne à Léa le sentiment que son intensité peut être reçue. C’est fort, direct, parfois silencieux.',
      },
      {
        family: 'Mars de Sacha conjoint au Soleil de Léa',
        scope: 'Lion maison V',
        reading: 'Il stimule son identité, sa confiance, son envie d’être vue. Elle peut se sentir réveillée par lui. Lui peut avoir envie d’agir, de séduire, de provoquer une réponse.',
      },
      {
        family: 'Vénus de Sacha carré au Soleil de Léa',
        scope: 'Scorpion ↔ Lion',
        reading: 'Le désir et l’ego se touchent avec friction. Sacha aime intensément, Léa veut rayonner librement. L’attraction est forte, mais chacun doit éviter de transformer la séduction en petite prise de pouvoir.',
      },
      {
        family: 'Uranus de Sacha opposé à Vénus de Léa',
        scope: 'Sagittaire / Gémeaux, maisons III–IX',
        reading: 'L’étincelle est mentale autant que physique. Messages imprévus, attirance intermittente, besoin de liberté. Le lien reste vivant quand personne ne tente de programmer l’autre comme une réunion du mardi.',
      },
      {
        family: 'Pluton de Léa carré à Mars de Sacha',
        scope: 'Scorpion / Lion, maisons II–V',
        reading: 'L’aspect intensifie la réaction physique et les rapports de volonté. Il peut donner une attirance presque compulsive, mais demande une grande honnêteté : le désir doit rapprocher, pas devenir un terrain où chacun mesure son pouvoir.',
      },
    ],
    signals: ['Attraction vivante', 'Tension utile', 'Mouvement commun'],
  },
  {
    id: 'synthesis',
    chapter: '04',
    cinemaTitle: 'Chapitre 4 : Le bilan',
    kicker: 'Synthèse du duo',
    title: 'Leur lien avance quand il accepte son contraste.',
    tagline: 'Ce que vous devenez ensemble',
    chemistry: 89,
    intensityLabel: 'Potentiel évolutif',
    image: firstLookImage,
    imageAlt: 'Léa et Sacha sous une lumière nocturne, comme une conclusion de film',
    body: [
      'La synastrie fictive de Léa et Sacha raconte un lien de contraste : feu et air en surface, eau et terre en profondeur, Scorpion en zone intime. Autrement dit : ça parle, ça attire, ça résiste, puis ça revient plus doucement que prévu.',
      'Leur force principale vient du soutien émotionnel entre les Lunes. Même quand les egos se défient, une part plus intime sait qu’il y a quelque chose de rassurant à construire. Ce n’est pas seulement une attraction ; c’est une possibilité de refuge.',
      'Leur défi vient des oppositions solaires et des tensions Vénus-Soleil. Léa peut vouloir une reconnaissance plus claire. Sacha peut défendre son indépendance même quand il est touché. S’ils jouent à qui aura l’air le moins atteint, ils perdent tous les deux. Avec beaucoup de style, certes, mais ils perdent quand même.',
      'Le potentiel est réel si chacun respecte la nature du lien : Léa ne doit pas réduire la liberté de Sacha à de la distance. Sacha ne doit pas réduire l’intensité de Léa à une demande excessive. Le rapport montre une trajectoire évolutive, pas une promesse automatique.',
      'La beauté de cette synastrie fictive, c’est qu’elle ne raconte pas un couple facile. Elle raconte deux personnes qui s’obligent à devenir plus conscientes. Léa apprend que l’amour peut rester présent sans se déclarer toutes les cinq minutes. Sacha apprend que la liberté n’a pas besoin de froideur pour être respectée.',
      'Dans le meilleur scénario, ils deviennent un duo très vivant : amis, amants, contradicteurs tendres, témoins l’un de l’autre. Dans le scénario fragile, ils se blessent par orgueil et par interprétation. Tout dépend de leur capacité à revenir au réel : ce qui a été dit, ce qui a été fait, ce qui est ressenti maintenant.',
    ],
    threads: [
      {
        anchor: 'Dominantes',
        astro: 'Soleil Lion maison V · Soleil Verseau maison XI · Lunes Cancer/Taureau',
        reading: 'Le lien commence vite, avec attraction et stimulation mentale, puis révèle un besoin plus profond de sécurité, de loyauté et de présence.',
      },
      {
        anchor: 'Maisons clés',
        astro: 'Maisons V · VIII · XI activées',
        reading: 'Le duo doit garder trois forces ensemble : le plaisir, la profondeur et l’espace. Si l’un des trois disparaît, l’équilibre devient plus fragile.',
      },
      {
        anchor: 'Durée',
        astro: 'Saturne de Sacha trigone Lune de Léa · Jupiter de Léa sextile Soleil de Sacha',
        reading: 'Il peut devenir un appui émotionnel pour elle. Elle peut ouvrir chez lui plus de chaleur et de confiance. La relation possède une base, mais elle demande de la présence.',
      },
    ],
    aspectFamilies: [
      {
        family: 'Forces du duo',
        scope: 'Lune sextile Lune, Vénus trigone Lune, Saturne trigone Lune',
        reading: 'La zone affective est plus solide que la surface ne le laisse penser. Ils peuvent se rassurer, se réparer, créer une intimité lente mais réelle.',
      },
      {
        family: 'Défis du duo',
        scope: 'Soleil opposé Soleil, Ascendant opposé Ascendant, Vénus carré Soleil',
        reading: 'Les deux personnalités se stimulent et se défient. Il faut éviter la compétition affective : personne n’a besoin de gagner une relation qui demande surtout à être comprise.',
      },
      {
        family: 'Potentiel d’évolution',
        scope: 'Jupiter de Léa sextile Soleil de Sacha',
        reading: 'Léa peut ouvrir Sacha à plus de chaleur, de spontanéité, de confiance. Sacha peut apprendre à recevoir sans tout intellectualiser — petit miracle discret, mais miracle quand même.',
      },
      {
        family: 'Conseil clé',
        scope: 'maisons V, VIII, XI',
        reading: 'Gardez du jeu, de la profondeur et de l’espace. Si l’un des trois disparaît, le lien se déséquilibre : trop de jeu devient fuite, trop de profondeur devient pression, trop d’espace devient froid.',
      },
      {
        family: 'Mantra du duo',
        scope: 'Soleil Lion / Soleil Verseau, Lunes Cancer–Taureau',
        reading: 'Aimez-vous sans transformer la différence en menace. Le lien n’a pas besoin d’être parfaitement calme pour être vrai ; il doit seulement rester honnête, tendre et habitable.',
      },
    ],
    signals: ['Force : lucidité', 'Défi : interprétation', 'Clé : présence'],
    synthesis: [
      { label: 'Caractère', value: 'Magnétique' },
      { label: 'Émotion', value: 'Profond' },
      { label: 'Dynamique', value: 'Vivant' },
      { label: 'Trajectoire', value: 'Évolutive' },
    ],
    mantra: 'Avancez l’un vers l’autre sans vous perdre.',
  },
];

export default function XPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const page = REPORT_PAGES[pageIndex];
  const pageCount = REPORT_PAGES.length;
  const isLastPage = pageIndex === pageCount - 1;
  const visibleThreads = getVisibleThreads(page);
  const registerBalance = REGISTER_THEME_BALANCES[page.id];

  const goToPage = (nextIndex: number) => {
    setPageIndex(Math.max(0, Math.min(nextIndex, pageCount - 1)));
  };

  const turnPage = () => {
    setPageIndex(isLastPage ? 0 : pageIndex + 1);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    goToPage(pageIndex + (deltaX < 0 ? 1 : -1));
  };

  return (
    <main className="x-report">
      <div className="x-report__reveal" aria-hidden="true">
        <span>Révélation astrale</span>
      </div>

      <section
        className="x-report__page"
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchStart.current = { x: touch.clientX, y: touch.clientY };
        }}
        onTouchEnd={handleTouchEnd}
        aria-live="polite"
      >
        <article className={`x-report__chapter x-report__chapter--${page.id}`} key={page.id}>
          <figure className={`x-report__visual x-report__visual--${page.id}`}>
            {page.id === 'synthesis' ? (
              <div className="x-report__visual-collage" aria-label={page.imageAlt}>
                <img src={firstLookImage} alt="La rencontre de Léa et Sacha" />
                <img src={communicationImage} alt="La connexion de Léa et Sacha" />
                <img src={repairImage} alt="Le désir et la tension de Léa et Sacha" />
              </div>
            ) : (
              <img src={page.image} alt={page.imageAlt} />
            )}
            <div className="x-report__image-badge">
              <span>Rapport premium</span>
              <strong>Léa × Sacha</strong>
            </div>
          </figure>
          <div className="x-report__cinema-band">
            <span>{page.cinemaTitle}</span>
          </div>

          <div className="x-report__copy">
            <div className="x-report__chapter-heading">
              <div>
                <p>{page.kicker}</p>
                <h1 className="x-report__register-line">{page.tagline}</h1>
              </div>
            </div>

            <section className="x-report__theme-sheet" aria-label="Forces et points sensibles du registre">
              <p className="x-report__section-title">Forces et points sensibles</p>
              <p className="x-report__theme-sheet-kicker">{registerBalance.subtitle}</p>
              <div>
                {registerBalance.people.map((theme) => (
                  <article key={theme.name}>
                    <strong>{theme.name}</strong>
                    <div className="x-report__theme-balance">
                      <div>
                        <span>Forces</span>
                        <ul>
                          {theme.strengths.map((strength) => (
                            <li key={strength}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span>Points sensibles</span>
                        <ul>
                          {theme.flaws.map((flaw) => (
                            <li key={flaw}>{flaw}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <div className="x-report__body-stack">
              {page.body.map((paragraph) => (
                <p className="x-report__body" key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <section className="x-report__threads" aria-label="Lecture astrologique du registre">
              <p className="x-report__section-title">Planètes, signes & maisons</p>
              {visibleThreads.map((thread) => (
                <article className="x-report__thread" key={thread.anchor}>
                  <header>
                    <span>{thread.anchor}</span>
                    <ul className="x-report__thread-placements" aria-label={`Placements de ${thread.anchor}`}>
                      {splitThreadPlacements(thread.astro).map((placement) => (
                        <li key={placement}>{placement}</li>
                      ))}
                    </ul>
                  </header>
                  <div className="x-report__thread-reading">
                    {splitReadingSentences(thread.reading).map((sentence) => (
                      <p key={sentence}>{sentence}</p>
                    ))}
                  </div>
                </article>
              ))}
            </section>

            <section className="x-report__aspect-map" aria-label="Aspects du couple">
              <p className="x-report__section-title">Aspects du couple</p>
              <div className="x-report__aspect-grid">
                {page.aspectFamilies.map((family) => (
                  <article className={`x-report__aspect-card x-report__aspect-card--${getAspectTone(family.family)}`} key={family.family}>
                    <em>{family.family}</em>
                    <span className="x-report__aspect-badge">
                      <strong className="x-report__aspect-glyphs" aria-hidden="true">
                        {renderAspectGlyphBadge(family.family)}
                      </strong>
                      <b>{getAspectNatureLabel(family.family)}</b>
                    </span>
                    <p>{family.reading}</p>
                  </article>
                ))}
              </div>
            </section>

            {page.synthesis && (
              <>
                <section className="x-report__synthesis-grid" aria-label="Lecture qualitative par registre">
                  {page.synthesis.map((item) => (
                    <div key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  ))}
                </section>
              </>
            )}

            {page.mantra && (
              <p className="x-report__mantra">{page.mantra}</p>
            )}
          </div>
        </article>
      </section>

      <nav className="x-report__pager" aria-label="Pages du rapport">
        <button onClick={() => goToPage(pageIndex - 1)} disabled={pageIndex === 0} aria-label="Page précédente">
          <ChevronLeft size={17} />
        </button>
        <div className="x-report__dots">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              className={index === pageIndex ? 'is-active' : ''}
              onClick={() => goToPage(index)}
              aria-label={`Aller à la page ${index + 1}`}
              aria-current={index === pageIndex ? 'page' : undefined}
            />
          ))}
        </div>
        <span>{String(pageIndex + 1).padStart(2, '0')} / {String(pageCount).padStart(2, '0')}</span>
        <button className="x-report__turn-button" onClick={turnPage} aria-label={isLastPage ? 'Relire le rapport' : 'Continuer le rapport'}>
          <small>{isLastPage ? 'Relire' : 'Continuer'}</small>
          <ChevronRight size={17} />
        </button>
      </nav>
    </main>
  );
}
