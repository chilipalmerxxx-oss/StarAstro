import { useMemo, useState, useEffect } from 'react';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { generateCoStarAnalysis } from '../services/astrology';

interface AspectData {
  planet1: string;
  planet2: string;
  type: string;
  symbol: string;
  color: string;
  text: string;
  transitSign?: string;
  natalSign?: string;
}

interface CoStarPageProps {
  onBack: () => void;
  chartData?: any;
  userName?: string;
}

export default function CoStarPage({ onBack, chartData, userName = 'Ami(e) des étoiles' }: CoStarPageProps) {
  // Clé de date pour forcer le recalcul à minuit
  const [dateKey, setDateKey] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });

  useEffect(() => {
    const checkMidnight = () => {
      const d = new Date();
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      setDateKey(prev => prev !== key ? key : prev);
    };
    const interval = setInterval(checkMidnight, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const analysis = useMemo(() => {
    if (chartData) {
      return generateCoStarAnalysis(chartData, userName);
    }
    return null;
  }, [chartData, userName, dateKey]);

  const selectedAdvice = analysis?.advice || 'Écoute ton intuition aujourd\'hui';

  const todayMood = analysis?.mood || (() => {
    const today = new Date();
    const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    let hash = 0;
    for (let i = 0; i < dateKey.length; i++) {
      const c = dateKey.charCodeAt(i);
      hash = ((hash << 5) - hash) + c;
      hash = hash & hash;
    }
    const fallbackMoods = ['Curieux', 'Énergique', 'Mystérieux', 'Serein', 'Passionné'];
    return fallbackMoods[Math.abs(hash % fallbackMoods.length)];
  })();

  // Superpouvoir & Défi adaptés à l'énergie du jour
  const MOOD_EXTRAS: Record<string, { superpouvoir: string; defi: string }> = {
    // ── Bélier ──
    'Impulsif et vif':         { superpouvoir: 'Instinct foudroyant',  defi: 'Ne brûle pas les étapes.' },
    'Direct et sans filtre':   { superpouvoir: 'Vérité brute',         defi: 'Ne blesse pas en voulant être honnête.' },
    'Énergique et spontané':   { superpouvoir: 'Élan vital',           defi: 'Ne réponds pas trop vite.' },
    'Ardent et décidé':        { superpouvoir: 'Détermination',        defi: 'Ne force pas une porte fermée.' },
    'Courageux et frontal':    { superpouvoir: 'Audace',               defi: 'Ne confonds pas courage et témérité.' },
    // ── Taureau ──
    'Ancré et sensuel':        { superpouvoir: 'Présence',             defi: 'Ne t\'accroche pas à ce qui change.' },
    'Patient et réceptif':     { superpouvoir: 'Endurance',            defi: 'Ne confonds pas patience et passivité.' },
    'Calme et déterminé':      { superpouvoir: 'Solidité',             defi: 'Ne te ferme pas aux imprévus.' },
    'Stable et indulgent':     { superpouvoir: 'Ancrage',              defi: 'Ne t\'oublie pas à force d\'indulgence.' },
    'Solide et persistant':    { superpouvoir: 'Persévérance',         defi: 'Ne résiste pas quand il faut lâcher.' },
    // ── Gémeaux ──
    'Léger et curieux':        { superpouvoir: 'Curiosité',            defi: 'Ne survole pas tout sans aller au fond.' },
    'Communicatif et agile':   { superpouvoir: 'Connexion',            defi: 'Ne parle pas plus que tu n\'écoutes.' },
    'Vif et insaisissable':    { superpouvoir: 'Adaptabilité',         defi: 'Ne te disperse pas.' },
    'Espiègle et alerte':      { superpouvoir: 'Vivacité',             defi: 'Ne joue pas avec les mots de façon blessante.' },
    'Changeant et bavard':     { superpouvoir: 'Fluidité',             defi: 'Ne ghoste pas tes engagements.' },
    // ── Cancer ──
    'Émotionnel et intuitif':  { superpouvoir: 'Intuition',            defi: 'Ne noie pas la raison dans l\'émotion.' },
    'Nostalgique et bienveillant': { superpouvoir: 'Empathie',         defi: 'Ne reste pas bloqué(e) dans le passé.' },
    'Protecteur et poreux':    { superpouvoir: 'Bienveillance',        defi: 'Ne te perds pas dans les émotions des autres.' },
    'Doux et mémoriel':        { superpouvoir: 'Tendresse',            defi: 'Ne laisse pas la nostalgie freiner l\'élan.' },
    'Attaché et sensible':     { superpouvoir: 'Loyauté',              defi: 'Ne ghoste pas tes émotions.' },
    // ── Lion ──
    'Expressif et lumineux':   { superpouvoir: 'Magnétisme',           defi: 'Ne cherche pas l\'approbation à tout prix.' },
    'Généreux et chaleureux':  { superpouvoir: 'Générosité',           defi: 'Ne t\'épuise pas à tout donner.' },
    'Créatif et rayonnant':    { superpouvoir: 'Créativité',           defi: 'Ne dramatise pas un détail.' },
    'Fier et magnanime':       { superpouvoir: 'Charisme',             defi: 'Ne prends pas les critiques pour des attaques.' },
    'Flamboyant et loyal':     { superpouvoir: 'Leadership',           defi: 'Ne brûle pas trop fort trop longtemps.' },
    // ── Vierge ──
    'Analytique et attentif':  { superpouvoir: 'Clarté',               defi: 'Ne cherche pas la perfection dans chaque détail.' },
    'Discret et précis':       { superpouvoir: 'Précision',            defi: 'Ne te caches pas derrière la discrétion.' },
    'Ordonné et sobre':        { superpouvoir: 'Méthode',              defi: 'Ne rigidifie pas ce qui doit rester souple.' },
    'Rigoureux et serviable':  { superpouvoir: 'Fiabilité',            defi: 'Ne t\'oublie pas à force de servir.' },
    'Méticuleux et modeste':   { superpouvoir: 'Exactitude',           defi: 'Ne minimise pas ce que tu réussis.' },
    // ── Balance ──
    'Harmonieux et doux':      { superpouvoir: 'Diplomatie',           defi: 'Ne fuis pas la décision difficile.' },
    'Élégant et indécis':      { superpouvoir: 'Élégance',             defi: 'Ne laisse pas l\'indécision choisir à ta place.' },
    'Diplomate et raffiné':    { superpouvoir: 'Tact',                 defi: 'Ne lisse pas tout au point de te perdre.' },
    'Gracieux et juste':       { superpouvoir: 'Justice',              defi: 'Ne sacrifie pas ta vérité pour garder la paix.' },
    'Esthète et pacifique':    { superpouvoir: 'Harmonie',             defi: 'Ne réponds pas trop vite.' },
    // ── Scorpion ──
    'Intense et perceptif':    { superpouvoir: 'Perception',           defi: 'Ne retiens pas ce qui doit partir.' },
    'Profond et magnétique':   { superpouvoir: 'Profondeur',           defi: 'Ne te perds pas dans tes propres abysses.' },
    'Silencieux et transformateur': { superpouvoir: 'Transformation',  defi: 'Ne garde pas tout pour toi.' },
    'Acéré et clairvoyant':    { superpouvoir: 'Lucidité',             defi: 'Ne te sers pas de la vérité comme d\'une arme.' },
    'Tenace et secret':        { superpouvoir: 'Résilience',           defi: 'Ne transforme pas la discrétion en isolement.' },
    // ── Sagittaire ──
    'Optimiste et libre':      { superpouvoir: 'Vision',               defi: 'Ne fonce pas tête baissée.' },
    'Expansif et direct':      { superpouvoir: 'Enthousiasme',         defi: 'Ne promets pas plus que tu ne peux tenir.' },
    'Philosophe et enthousiaste': { superpouvoir: 'Sens',              defi: 'Ne reste pas dans les idées sans agir.' },
    'Idéaliste et nomade':     { superpouvoir: 'Liberté',              defi: 'Ne fuis pas sous prétexte d\'explorer.' },
    'Audacieux et décomplexé': { superpouvoir: 'Bravoure',             defi: 'Ne dramatise pas un obstacle mineur.' },
    // ── Capricorne ──
    'Structuré et patient':    { superpouvoir: 'Maîtrise',             defi: 'Ne t\'oublie pas dans le travail.' },
    'Sobre et ambitieux':      { superpouvoir: 'Ambition',             defi: 'Ne sacrifie pas le présent pour un futur lointain.' },
    'Discipliné et prévoyant': { superpouvoir: 'Discipline',           defi: 'Ne rigidifie pas un plan qui doit évoluer.' },
    'Méthodique et austère':   { superpouvoir: 'Structure',            defi: 'Ne t\'isole pas derrière ton sérieux.' },
    'Solide et accompli':      { superpouvoir: 'Accomplissement',      defi: 'Ne minimise pas le chemin parcouru.' },
    // ── Verseau ──
    'Décalé et électrique':    { superpouvoir: 'Innovation',           defi: 'Ne te coupe pas des gens qui t\'aiment.' },
    'Original et libre':       { superpouvoir: 'Originalité',          defi: 'Ne confonds pas différence et distance.' },
    'Visionnaire et détaché':  { superpouvoir: 'Vision',               defi: 'Ne reste pas dans ta tête.' },
    'Rebelle et idéaliste':    { superpouvoir: 'Avant-garde',          defi: 'Ne rejette pas tout ce qui est établi.' },
    'Frondeur et brillant':    { superpouvoir: 'Intelligence',         defi: 'Ne te bats pas contre des moulins.' },
    // ── Poissons ──
    'Rêveur et poreux':        { superpouvoir: 'Imagination',          defi: 'Ne te perds pas dans l\'imaginaire.' },
    'Intuitif et sensible':    { superpouvoir: 'Sensibilité',          defi: 'Ne prends pas tout à cœur.' },
    'Mystique et compassionnel': { superpouvoir: 'Compassion',         defi: 'Ne t\'effaces pas pour les autres.' },
    'Mélancolique et inspiré': { superpouvoir: 'Inspiration',          defi: 'Ne laisse pas la mélancolie dicter ta journée.' },
    'Doux et insaisissable':   { superpouvoir: 'Fluidité',             defi: 'Ne te noies pas dans le flou.' },
  };

  const moodBase = todayMood.split(' — ')[0].trim();
  const moodExtras = MOOD_EXTRAS[moodBase] ?? { superpouvoir: 'Intuition', defi: 'Écoute ce que tu ressens vraiment.' };

  const [openAspects, setOpenAspects] = useState<Set<number>>(new Set());

  const toggleAspect = (index: number) => {
    const next = new Set(openAspects);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setOpenAspects(next);
  };

  const getAspectDescription = (aspect: any) => {
    const tp = aspect.planet1;
    const np = aspect.planet2;
    const type = aspect.type;
    const key = `${tp}→${np}`;

    const descriptions: Record<string, Record<string, string>> = {
      // ─── JUPITER ────────────────────────────────────────────────────────────
      'Jupiter→Soleil': {
        'Trigone':     `Ta confiance est au beau fixe et tes efforts semblent enfin trouver leur résonance — le vent souffle dans ton sens, agis grand sans précipitation.`,
        'Sextile':     `Une fenêtre de rayonnement s'ouvre : ose montrer qui tu es vraiment, sans calcul ni retenue.`,
        'Conjonction': `Un pic d'expansion traverse toute ton identité — c'est l'un des moments les plus fertilisants de ton cycle pour initier ce qui t'importe vraiment.`,
        'Carré':       `L'envie d'en faire trop se heurte à la réalité — grandir sans se disperser, croire en soi sans se surestimer : voilà l'enjeu.`,
        'Opposition':  `Tu te sens tiraillé entre expansion et recentrage — la modération sera plus productive que l'excès, même si ça demande de te contraindre.`,
      },
      'Jupiter→Lune': {
        'Trigone':     `Un courant d'optimisme emporte tes émotions — tu te sens généreux, ouvert, et cette chaleur intérieure est contagieuse.`,
        'Sextile':     `Ton monde intérieur s'élargit doucement — une nouvelle perspective émotionnelle s'offre à toi si tu acceptes d'être un peu surpris.`,
        'Conjonction': `Tes émotions prennent une ampleur inhabituelle — la joie comme la peine se vivent plus intensément qu'à l'ordinaire.`,
        'Carré':       `L'excès émotionnel te guette — tout ce qui monte si vite ne mérite pas forcément de s'exprimer; tempère la vague.`,
        'Opposition':  `Tes besoins profonds et ton désir d'ailleurs tirent en sens contraire — il n'est pas utile de choisir, juste d'observer.`,
      },
      'Jupiter→Mercure': {
        'Trigone':     `Ton esprit s'ouvre à de grandes idées avec une aisance remarquable — c'est un jour pour apprendre, enseigner ou partager une vision large.`,
        'Sextile':     `Une information ou une rencontre peut élargir ta compréhension du monde — sois attentif à ce que tu lis, entends ou croises aujourd'hui.`,
        'Conjonction': `Les idées fusent et les plans s'élargissent à vue d'œil — prends note de tout, mais veille à ne pas te noyer dans trop de directions à la fois.`,
        'Carré':       `Trop d'informations brouillent le signal — filtre l'essentiel avant de parler ou de conclure quoi que ce soit d'important.`,
        'Opposition':  `Ton envie de vision globale bute sur le besoin de précision — alterne entre le recul et le détail plutôt que forcer l'un des deux.`,
      },
      'Jupiter→Vénus': {
        'Trigone':     `Amour et chance se rejoignent dans une rare harmonie — généreux et rayonnant, tu reçois naturellement ce que tu as semé.`,
        'Sextile':     `La beauté et la grâce colorent ta journée d'une teinte légère — un moment de connexion authentique est à portée si tu y prêtes attention.`,
        'Conjonction': `Tes désirs prennent des proportions grandioses — savoure cet élan mais veille à ne pas promettre plus que tu ne peux tenir.`,
        'Carré':       `Tes envies de plaisir et ta quête de sens peuvent se contredire — l'excès affectif masque parfois un besoin plus profond qu'il ne comble.`,
        'Opposition':  `Ce que tu aimes et ce qui te fait grandir demandent à être réconciliés — la question n'est pas laquelle choisir, mais comment les tenir ensemble.`,
      },
      'Jupiter→Mars': {
        'Trigone':     `Ton énergie est décuplée par l'optimisme — vise haut, agis avec confiance, les résultats peuvent dépasser tes attentes.`,
        'Sextile':     `Ton courage rencontre la chance dans un alignement rare — saisis ce que le moment offre sans trop attendre.`,
        'Conjonction': `Ambition et combativité atteignent leur maximum — canalise cette immense énergie vers un objectif précis, sinon elle risque de t'emporter.`,
        'Carré':       `L'excès d'enthousiasme risque de te faire sous-estimer les obstacles — la ténacité tranquille vaut mieux que la précipitation conquérante.`,
        'Opposition':  `Agir ou élargir l'horizon ? Tu n'as pas à choisir, mais à trouver le bon dosage entre élan et discernement.`,
      },
      // ─── SATURNE ────────────────────────────────────────────────────────────
      'Saturne→Soleil': {
        'Trigone':     `Ta discipline porte ses fruits en silence — ce que tu as bâti avec patience montre enfin sa solidité.`,
        'Sextile':     `Un effort structuré pose des fondations durables — planifie, organise; les travaux de fond sont favorisés.`,
        'Conjonction': `La responsabilité se fait vive et le poids est réel — mais c'est aussi ce qui te forge en quelque chose de plus solide que tu ne l'étais.`,
        'Carré':       `Tes ambitions rencontrent un mur de réalité — frustrant, certes, mais ce qui résiste te rend plus fort, même si on ne le voit pas tout de suite.`,
        'Opposition':  `Tes élans sont confrontés à leurs limites — ce n'est pas une punition, c'est une invitation à mûrir et à choisir ce qui mérite vraiment ton énergie.`,
      },
      'Saturne→Lune': {
        'Trigone':     `Tu gères tes émotions avec une maturité rare — une journée de profondeur intérieure, de fiabilité et de présence à toi-même.`,
        'Sextile':     `Tu sais transformer ce que tu ressens en quelque chose de constructif — c'est un atout discret mais précieux.`,
        'Conjonction': `Ce n'est pas un manque de sensibilité — c'est une protection qui te permet de voir clair là où l'émotion brute obscurcit.`,
        'Carré':       `Tes émotions se heurtent à tes obligations — reconnais ce sentiment de restriction pour mieux le traverser sans te fermer.`,
        'Opposition':  `Le cœur veut une chose, le devoir en impose une autre — l'enjeu est de les tenir ensemble sans abandonner l'un au profit de l'autre.`,
      },
      'Saturne→Mercure': {
        'Trigone':     `Ta pensée est structurée, profonde et articulée — les travaux intellectuels exigeants et la planification minutieuse sont particulièrement favorisés.`,
        'Sextile':     `Tes mots vont à l'essentiel avec une efficacité remarquable — les problèmes complexes trouvent des solutions pragmatiques et durables.`,
        'Conjonction': `Ta parole se fait rare, précise, soigneusement choisie — chaque mot porte un poids particulier aujourd'hui.`,
        'Carré':       `Des pensées limitantes peuvent s'installer — vérifie ce que tu te racontes, le scénario mental n'est peut-être pas la réalité.`,
        'Opposition':  `Ton besoin de rigueur et ta curiosité naturelle s'affrontent — ni trop de sérieux, ni trop de légèreté : le vrai travail est dans l'équilibre.`,
      },
      'Saturne→Vénus': {
        'Trigone':     `Tes relations prennent de la profondeur et de la consistance — tu es capable d'un engagement sincère et durable, loin des arrangements superficiels.`,
        'Sextile':     `C'est un bon moment pour consolider les liens qui comptent vraiment, pas ceux que tu entretiens par simple habitude.`,
        'Conjonction': `L'amour se fait sérieux et réel — les engagements prennent tout leur poids, les intentions légères trouvent du mal à subsister.`,
        'Carré':       `Le devoir freine tes élans affectifs — tu sens un décalage entre ce que tu veux ressentir et ce que tu t'autorises à exprimer.`,
        'Opposition':  `Tes obligations et tes désirs tirent en sens inverse — l'amour réclame de l'espace là où la rigueur l'occupe, et cette tension demande à être nommée.`,
      },
      'Saturne→Mars': {
        'Trigone':     `Ta force d'action est structurée et patiente — tu avances efficacement sur le long terme sans gaspiller ton énergie en coups d'éclat.`,
        'Sextile':     `Discipline et initiative s'allient dans un équilibre rare — c'est le moment idéal pour entamer un projet exigeant.`,
        'Conjonction': `L'action dans un cadre strict peut produire beaucoup — accepte les limites comme des alliés plutôt que des obstacles.`,
        'Carré':       `La frustration monte face aux obstacles — la patience stratégique est plus utile que la force brute ici.`,
        'Opposition':  `Ton élan et ta prudence se confrontent — trouver le tempo entre audace et retenue est l'enjeu du moment.`,
      },
      // ─── NEPTUNE ────────────────────────────────────────────────────────────
      'Neptune→Soleil': {
        'Trigone':     `Ton imagination et ta sensibilité enrichissent profondément qui tu es — une journée propice à la création et à l'intuition, pas à la décision.`,
        'Sextile':     `Une sensibilité accrue colore ta façon d'être — fais confiance aux messages non rationnels que tu reçois, ils ont quelque chose à te dire.`,
        'Conjonction': `Ton identité est plus poreuse qu'à l'ordinaire — protège ton énergie et choisis avec soin ce que tu absorbes autour de toi.`,
        'Carré':       `La confusion peut s'installer — reste ancré dans des faits concrets plutôt que dans des suppositions ou des projections.`,
        'Opposition':  `Ce qui était clair devient flou — accepte l'incertitude sans t'y perdre; ce brouillard porte parfois une révélation inattendue.`,
      },
      'Neptune→Lune': {
        'Trigone':     `Ta sensibilité est exquise et tes intuitions particulièrement justes — un moment de connexion profonde, idéal pour l'intime ou le créatif.`,
        'Sextile':     `Ton empathie est particulièrement vive — un échange sincère ou une pratique artistique peut résonner jusqu'au fond de toi.`,
        'Conjonction': `Émotions et rêves se mélangent avec intensité — prends soin de distinguer ce qui t'appartient de ce que tu absorbes autour de toi.`,
        'Carré':       `Tes émotions peuvent être confuses ou hypersensibles — établis des limites claires pour ne pas accueillir ce qui n'est pas à toi.`,
        'Opposition':  `La frontière entre tes émotions et celles des autres est mince aujourd'hui — reconnecte-toi à ce que tu ressens vraiment, avant de te noyer dans le ressenti des autres.`,
      },
      'Neptune→Mercure': {
        'Trigone':     `Ta pensée devient poétique et intuitive — un moment idéal pour l'écriture, la création et les idées qui dépassent la pure logique.`,
        'Sextile':     `Des insights créatifs ou des intuitions viennent enrichir ta réflexion — certaines idées floues méritent d'être captées avant de s'évaporer.`,
        'Conjonction': `Ta pensée est très imaginative mais peu linéaire — excellent pour créer, difficile pour décider; adapte-toi à cette réalité.`,
        'Carré':       `La clarté mentale est réduite — évite les décisions importantes, préfère l'observation et la patience à l'action immédiate.`,
        'Opposition':  `Pensée et ressenti s'entremêlent — vérifie les informations avant de te forger une opinion, ta perception peut être colorée par un angle émotionnel.`,
      },
      'Neptune→Vénus': {
        'Trigone':     `L'amour, la beauté et la créativité atteignent des sommets — un moment de grâce émotionnelle et artistique difficile à forcer.`,
        'Sextile':     `Ta façon d'aimer s'affine, devient plus inconditionnelle — un beau moment pour la tendresse, la créativité et la générosité affective.`,
        'Conjonction': `L'amour prend une forme magique mais insaisissable — distingue l'idéal de la réalité avant de t'engager.`,
        'Carré':       `L'idéalisation dans les relations peut t'induire en erreur — regarde en face ce que tu vis vraiment avant de prendre une décision affective.`,
        'Opposition':  `Ce que tu désires et ce qui est peuvent diverger en ce moment — garde un pied sur terre dans tes affaires de cœur.`,
      },
      'Neptune→Mars': {
        'Trigone':     `Tu agis avec une sensibilité et une compassion accrues — tes gestes portent une dimension plus profonde qu'à l'ordinaire.`,
        'Sextile':     `Ton élan gagne en finesse et en nuance — un bon moment pour agir avec subtilité et précision plutôt qu'avec force brute.`,
        'Conjonction': `Ton énergie peut sembler fuyante — canalise-la vers un idéal ou une pratique créative plutôt que vers un combat direct.`,
        'Carré':       `L'envie d'agir se dissout dans le flou — évite les engagements irréversibles et attends que ta direction soit plus nette.`,
        'Opposition':  `Ton élan et ton sens du but peuvent être brouillés — reconnecte-toi à ce qui t'anime vraiment avant d'avancer.`,
      },
      // ─── PLUTON ─────────────────────────────────────────────────────────────
      'Pluton→Soleil': {
        'Trigone':     `Une transformation personnelle s'opère en profondeur et en douceur — tu deviens une version plus authentique et puissante de toi-même.`,
        'Sextile':     `Un changement de perspective profond est à ta portée — saisis-le pour te réinventer sur un point important de ton existence.`,
        'Conjonction': `Une transformation profonde de ton identité est en cours — ce n'est pas confortable, mais c'est le chemin vers ta puissance réelle.`,
        'Carré':       `Ce qui ne te sert plus doit tomber — résiste à l'envie de tout contrôler et laisse cette transformation opérer.`,
        'Opposition':  `Des forces poussent ta transformation — le vrai pouvoir vient de lâcher ce qui ne t'appartient plus vraiment.`,
      },
      'Pluton→Lune': {
        'Trigone':     `Tes émotions montent de grande profondeur — une période de renouveau émotionnel puissant, potentiellement libérateur.`,
        'Sextile':     `Un vieux schéma émotionnel peut être lâché aujourd'hui — une opportunité de libération si tu laisses flotter ce qui était ancré depuis trop longtemps.`,
        'Conjonction': `Tes blessures intérieures remontent pour être guéries — une période intense mais transformatrice, à traverser et non à fuir.`,
        'Carré':       `Des émotions enfouies cherchent à remonter — accueille-les plutôt que de les réprimer, elles ont quelque chose d'important à dire.`,
        'Opposition':  `Une transformation émotionnelle profonde est en jeu — ce qui doit s'effacer doit s'effacer pour que quelque chose de nouveau puisse naître.`,
      },
      'Pluton→Mercure': {
        'Trigone':     `Ta pensée touche à des vérités rares — un moment de compréhension profonde, propice à la recherche, à l'analyse ou à la parole transformatrice.`,
        'Sextile':     `Une idée ou une conversation peut avoir un impact bien plus profond que tu ne le prévois — choisis tes mots avec soin.`,
        'Conjonction': `Tes pensées vont en profondeur — oriente cette puissance mentale vers la vérité, pas vers le contrôle ou la manipulation.`,
        'Carré':       `Des convictions sont remises en cause — laisser certaines certitudes s'effondrer est précisément ce qui permet de penser plus librement.`,
        'Opposition':  `Des vérités dérangeantes cherchent à s'exprimer — le courage de les nommer peut être libérateur pour toi et pour ceux qui t'écoutent.`,
      },
      'Pluton→Vénus': {
        'Trigone':     `L'amour et le désir se vivent avec une profondeur rare — tu accèdes à une forme d'intimité transformatrice, loin des surfaces.`,
        'Sextile':     `Une transformation dans ta façon d'aimer est possible — une bonne opportunité pour lâcher une forme d'attachement qui t'a trop longtemps limité.`,
        'Conjonction': `Le désir et les relations prennent une intensité absolue — ce qui ne sert plus dans ta vie affective doit être lâché.`,
        'Carré':       `Des attachements difficiles peuvent émerger — c'est l'occasion de travailler sur ce qui te retient malgré toi.`,
        'Opposition':  `Une relation ou une valeur fondamentale est au bord de la transformation — le lâcher-prise est ta meilleure ressource, même s'il est douloureux.`,
      },
      'Pluton→Mars': {
        'Trigone':     `Ta volonté et ta puissance sont dans un état rare — une énergie de transformation profonde guide chacune de tes actions.`,
        'Sextile':     `Tu peux accomplir quelque chose de significatif en allant chercher ta puissance la plus profonde — c'est le moment de ne pas te sous-estimer.`,
        'Conjonction': `Une volonté d'acier, un désir de transformation absolue — oriente cette force vers la construction, pas vers la destruction.`,
        'Carré':       `Des luttes de pouvoir ou une colère profonde peuvent émerger — cherche à transformer plutôt qu'à dominer.`,
        'Opposition':  `La résistance ou la confrontation peuvent apparaître — la vraie puissance vient de la maîtrise, pas de l'explosion.`,
      },
      // ─── URANUS ─────────────────────────────────────────────────────────────
      'Uranus→Soleil': {
        'Trigone':     `Une rupture soudaine avec l'ordinaire te libère pour exprimer qui tu es vraiment — l'originalité est ta meilleure ressource.`,
        'Sextile':     `Une idée ou une rencontre inattendue peut ouvrir une perspective entièrement neuve — reste ouvert à ce qui arrive de façon imprévisible.`,
        'Conjonction': `La liberté et l'authenticité sont convoquées avec urgence — un tournant est possible si tu acceptes de lâcher ce qui est trop rigide.`,
        'Carré':       `Des bouleversements remettent en question qui tu crois être — embrasse le changement plutôt que de le fuir, même s'il est inconfortable.`,
        'Opposition':  `Ce qui ne t'appartient plus cherche à être extrait — difficile, mais nécessaire pour que ta liberté ne soit pas qu'un mot.`,
      },
      'Uranus→Lune': {
        'Trigone':     `Tes émotions se détachent des vieux schémas — tu peux te sentir plus libre de ressentir sans les habituelles contraintes.`,
        'Sextile':     `Une surprise émotionnelle peut déverrouiller quelque chose de longtemps figé — reste ouvert à cette ouverture inattendue.`,
        'Conjonction': `Des changements émotionnels soudains peuvent surgir — accueille l'inattendu avec curiosité plutôt qu'avec résistance.`,
        'Carré':       `Ton monde émotionnel est agité — des besoins de liberté entrent en conflit avec tes habitudes de sécurité.`,
        'Opposition':  `Liberté contre sécurité — tu es appelé à lâcher une façon de te protéger qui ne te protège plus réellement.`,
      },
      'Uranus→Mercure': {
        'Trigone':     `Flashes d'intuition, idées révolutionnaires, connexions inattendues — ton esprit fonctionne à une fréquence rare, capte tout sans censurer.`,
        'Sextile':     `Une idée inattendue peut renverser une perspective établie depuis longtemps — ce n'est peut-être pas confortable, mais c'est précieux.`,
        'Conjonction': `Ta pensée est brillante et rapide, presque incontrôlable — note ces révélations avant qu'elles ne s'évaporent dans la journée.`,
        'Carré':       `Tes pensées se dispersent et les décisions peuvent être erratiques — prends du recul avant de t'engager sur quoi que ce soit d'irréversible.`,
        'Opposition':  `Des idées perturbantes cherchent à s'exprimer — laisse-les émerger avec discernement, sans les agir immédiatement.`,
      },
      'Uranus→Vénus': {
        'Trigone':     `Une façon nouvelle et authentique d'aimer s'ouvre à toi — l'originalité dans tes relations est une force, pas une étrangeté.`,
        'Sextile':     `Une rencontre inattendue ou un élan esthétique imprévu peut ajouter une note d'exaltation à ta journée.`,
        'Conjonction': `L'amour et les désirs peuvent prendre une tournure soudaine — reste lucide sur ce que tu veux vraiment, au-delà du vertige initial.`,
        'Carré':       `Une relation ou une valeur est bousculée — ce qui était confortable est remis en question d'une façon qui demande du courage.`,
        'Opposition':  `Un besoin de liberté radicale entre en conflit avec ton besoin d'attachement — les deux ont leurs droits.`,
      },
      'Uranus→Mars': {
        'Trigone':     `Tu agis de manière originale et décisive avec une énergie révolutionnaire — tes initiatives peuvent créer un vrai changement.`,
        'Sextile':     `Un élan inattendu te permet d'agir de façon audacieuse et efficace — saisis cette ouverture sans trop l'analyser.`,
        'Conjonction': `L'envie d'agir est soudaine et intense — canalise cette énergie explosive vers un but constructif plutôt que vers l'impulsion brute.`,
        'Carré':       `Des réactions impulsives peuvent mener à des conflits — marque une pause avant d'agir sous le coup de la colère ou de la frustration.`,
        'Opposition':  `Ta liberté d'action est challengée — être authentique sans brûler les ponts est l'enjeu du moment.`,
      },
      // ─── MARS ───────────────────────────────────────────────────────────────
      'Mars→Soleil': {
        'Trigone':     `Ton énergie physique et ta volonté sont synchronisées — tu peux transformer tes intentions en réalité avec une efficacité remarquable.`,
        'Sextile':     `Un élan d'initiative colore ta journée — une action prise maintenant a de bonnes chances de porter ses fruits.`,
        'Conjonction': `Combativité et volonté ne font qu'un — une puissance brute et directe, à canaliser vers un objectif clair pour ne pas la gaspiller.`,
        'Carré':       `La frustration ou l'impatience peuvent surgir — c'est le signal que quelque chose réclame un changement d'approche, pas davantage de force.`,
        'Opposition':  `Ton élan et ton identité se polarisent — l'envie de foncer peut rentrer en conflit avec qui tu es vraiment.`,
      },
      'Mars→Lune': {
        'Trigone':     `Ce que tu ressens te propulse vers l'avant avec une authenticité rare — agis selon tes instincts, ils sont fiables aujourd'hui.`,
        'Sextile':     `Tes réactions instinctives sont particulièrement justes en ce moment — fais-leur confiance sans trop les questionner.`,
        'Conjonction': `L'intensité émotionnelle est forte — veille à ne pas réagir trop vite, mais ton instinct profond mérite d'être entendu.`,
        'Carré':       `L'impatience et l'irritabilité peuvent surgir — respire avant d'agir sous l'influence d'une émotion passagère.`,
        'Opposition':  `Ton élan et ta sensibilité s'opposent — prendre un peu de recul avant de décider te protègera de réactions que tu regretterais.`,
      },
      'Mars→Mercure': {
        'Trigone':     `Ton esprit est tranchant et tes mots percutants — c'est un jour pour défendre tes idées ou trancher avec clarté.`,
        'Sextile':     `Ton énergie et ta pensée s'accordent pour pousser une idée vers l'action — quelque chose qui germait depuis un moment est prêt à éclore.`,
        'Conjonction': `Ce que tu penses, tu le fais vraiment — ta communication est directe, sans ambiguïté ni détour.`,
        'Carré':       `Tes mots risquent d'être plus tranchants que tu ne le voudrais — pèse-les pour éviter des malentendus inutiles.`,
        'Opposition':  `Vouloir agir et devoir réfléchir entrent en tension — ne brûle pas les étapes, la précision vaut davantage que la rapidité ici.`,
      },
      'Mars→Vénus': {
        'Trigone':     `Le désir et l'action s'accordent dans une harmonie magnétique — un jour de charme naturel et de réussite dans ce qui touche au cœur.`,
        'Sextile':     `Un élan passionné rencontre une ouverture favorable — c'est le bon moment pour agir dans tes relations ou dans tes créations.`,
        'Conjonction': `Passion et désir atteignent un pic d'intensité — exprime ce qui brûle en toi avec intention plutôt qu'impulsion.`,
        'Carré':       `Ce que tu veux et comment tu le cherches se contredisent — la frustration vient souvent d'un décalage entre désir et approche.`,
        'Opposition':  `Tes pulsions et tes désirs se polarisent — la tension peut aussi être source de magnétisme si elle est canalisée avec conscience.`,
      },
      'Mars→Mars': {
        'Trigone':     `Ton énergie natale est dans un axe harmonieux — tu agis avec la force qui te ressemble profondément, sans sur-effort inutile.`,
        'Sextile':     `Un retour d'énergie fluide et aligné — ce que tu mets en mouvement maintenant est en accord avec ta nature profonde.`,
        'Conjonction': `Mars revient sur lui-même : un nouveau cycle d'énergie s'ouvre. Ce que tu initierais maintenant peut rompre avec les schémas anciens.`,
        'Carré':       `Ton énergie actuelle confronte ton énergie natale — une tension productive qui révèle où tu as grandi et où il te reste à évoluer.`,
        'Opposition':  `Ton élan actuel s'oppose à ton élan natal — un moment naturel de prise de recul sur ta façon d'agir, d'initier et de vouloir.`,
      },
      // ─── VÉNUS ──────────────────────────────────────────────────────────────
      'Vénus→Soleil': {
        'Trigone':     `Tu rayonnes naturellement — les autres perçoivent ta chaleur et ton authenticité sans que tu aies à les mettre en scène.`,
        'Sextile':     `Un voile de douceur et de légèreté enveloppe ta journée — c'est un bon moment pour nourrir ce qui t'apporte de la joie.`,
        'Conjonction': `Ton charme et ton identité ne font qu'un — tu attires ce qui te correspond avec une aisance que tu ne ressens pas toujours.`,
        'Carré':       `Ce que tu désires et ce que tu projettes se heurtent — un ajustement entre paraître et être est peut-être nécessaire.`,
        'Opposition':  `Tes besoins affectifs et ta direction de vie s'opposent en ce moment — l'amour et le devoir réclament chacun leur part.`,
      },
      'Vénus→Lune': {
        'Trigone':     `Tes émotions et ton sens du beau s'accordent dans une douceur rare — tu te sens aimé et capable d'aimer sans effort apparent.`,
        'Sextile':     `Des gestes simples et attentionnés peuvent infiniment compter pour quelqu'un aujourd'hui — la tendresse ne coûte rien et vaut tout.`,
        'Conjonction': `Désirs et émotions fusionnent dans une intensité douce — un moment propice à la connexion intime et à l'échange sincère.`,
        'Carré':       `Tes émotions et tes désirs sont légèrement dissonants — retrouve ton centre avant d'agir affectivement pour ne pas agir à côté de toi-même.`,
        'Opposition':  `Ce que tu ressens et ce que tu veux dans tes relations cherchent un équilibre délicat — écoute les deux sans en privilégier un.`,
      },
      'Vénus→Mercure': {
        'Trigone':     `Tes mots portent grâce et justesse — un moment idéal pour toute communication délicate, tout échange où les mots font réellement la différence.`,
        'Sextile':     `Une conversation charmante ou une idée créative peut émerger naturellement — laisse la légèreté entrer dans tes échanges.`,
        'Conjonction': `Ce que tu dis et ce que tu ressens s'alignent dans une sincérité désarmante — ta communication est douce et vraie.`,
        'Carré':       `Tes mots et tes sentiments se contredisent — choisis la sincérité plutôt que les formules qui font plaisir sans dire grand-chose.`,
        'Opposition':  `Ta logique et ton cœur négocient en sourdine — laisse-les dialoguer de façon pacifique au lieu de les forcer dans un sens.`,
      },
      'Vénus→Mars': {
        'Trigone':     `Séduction et détermination s'accordent dans une harmonie rare — tu agis avec charme et efficacité à la fois.`,
        'Sextile':     `Un geste passionné posé avec douceur porte bien plus loin qu'un geste brusque — la nuance est ta force aujourd'hui.`,
        'Conjonction': `Passion et tendresse fusionnent dans une énergie à la fois brûlante et douce — tes relations et ta créativité en bénéficient pleinement.`,
        'Carré':       `Ce que tu veux et comment tu l'obtiens entrent en friction — attention aux déceptions nées d'une trop grande impatience.`,
        'Opposition':  `Tes élans et tes désirs se polarisent — cette tension peut être magnétique si tu la canalises avec conscience.`,
      },
      'Vénus→Vénus': {
        'Trigone':     `Ce que tu aimes, comment tu aimes et ce qui te touche sont dans un axe harmonieux — une concordance naturelle qui éclaire tes choix affectifs.`,
        'Sextile':     `Tes désirs et tes valeurs profondes s'alignent avec une rare clarté — une petite décision affective prise aujourd'hui peut s'avérer particulièrement juste.`,
        'Conjonction': `Un retour à l'essence de tes valeurs affectives — ce qui te touche vraiment se révèle avec une clarté inhabituelle.`,
        'Carré':       `Tes désirs actuels et tes valeurs profondes ne s'accordent pas tout à fait — ce décalage mérite d'être examiné, pas ignoré.`,
        'Opposition':  `Ce que tu veux maintenant et ce qui te ressemble profondément tirent en sens contraire — c'est une invitation à clarifier ce que tu veux vraiment.`,
      },
      // ─── MERCURE ────────────────────────────────────────────────────────────
      'Mercure→Soleil': {
        'Trigone':     `La pensée et l'identité s'accordent parfaitement — tes mots reflètent qui tu es avec une précision rare, c'est le moment idéal pour t'exprimer.`,
        'Sextile':     `Ton esprit est vif et en phase avec ta volonté — une conversation ou une idée peut débloquer quelque chose d'important.`,
        'Conjonction': `Esprit et identité ne font qu'un — tes paroles portent un poids et une authenticité particuliers aujourd'hui.`,
        'Carré':       `Ta pensée s'agite et remet en question tes certitudes — inconfortable, mais potentiellement très productif.`,
        'Opposition':  `Tu pourrais dire une chose et ressentir l'inverse — prends le temps de démêler les fils avant de t'exprimer définitivement.`,
      },
      'Mercure→Lune': {
        'Trigone':     `Tes émotions alimentent ta parole avec une justesse rare — tu exprimes ce que tu ressens avec une précision qui touche.`,
        'Sextile':     `Ton intelligence émotionnelle est en pointe — tu perçois ce qui se dit entre les lignes, ce qui n'est pas dit mais qui compte.`,
        'Conjonction': `La pensée et l'émotion ne font qu'un — ta communication touche en plein cœur parce qu'elle vient de là.`,
        'Carré':       `Ton mental et tes émotions se brouillent mutuellement — démêle ce que tu penses de ce que tu ressens avant de parler ou d'agir.`,
        'Opposition':  `Ta logique et ta sensibilité se font face — laisse à chacune son espace au lieu de les forcer à cohabiter.`,
      },
      'Mercure→Vénus': {
        'Trigone':     `Intelligence et grâce s'allient dans tes échanges — une communication élégante ou créative s'exprime naturellement aujourd'hui.`,
        'Sextile':     `Tes mots portent de la tendresse et de la finesse — un échange inattendu peut renforcer un lien affectif.`,
        'Conjonction': `Pensée et désir fusionnent dans une sincérité désarmante — ce que tu dis reflète profondément ce que tu ressens.`,
        'Carré':       `Tes mots et tes sentiments se contredisent légèrement — méfie-toi des promesses faites à la légère dans un moment d'élan.`,
        'Opposition':  `La raison et le cœur négocient en sourdine — laisse-les dialoguer au lieu de les forcer, la synthèse viendra d'elle-même.`,
      },
      'Mercure→Mars': {
        'Trigone':     `Parole et action s'accordent parfaitement — c'est un jour idéal pour défendre tes idées ou prendre une décision importante.`,
        'Sextile':     `Une idée peut rapidement se transformer en décision concrète — le lien entre penser et agir est particulièrement direct aujourd'hui.`,
        'Conjonction': `Ce que tu penses, tu le fais — ta communication est directe, tranchante et sans détour.`,
        'Carré':       `Tes mots peuvent être plus tranchants que tu ne le veux — pèse-les pour éviter de couper là où tu ne voulais pas le faire.`,
        'Opposition':  `La réflexion et l'action entrent en conflit — trouve le rythme juste entre penser longuement et décider rapidement.`,
      },
      'Mercure→Mercure': {
        'Trigone':     `Ta pensée est parfaitement dans l'axe de ton style mental natal — idées et communication coulent avec une fluidité particulière.`,
        'Sextile':     `Une clarté d'esprit naturelle se manifeste — c'est un bon moment pour écrire, traiter des informations ou approfondir une réflexion.`,
        'Conjonction': `Mercure revient sur lui-même : ta façon de penser rencontre son propre écho. Une lucidité particulière s'offre à toi sur tes propres schémas mentaux.`,
        'Carré':       `Ta façon de penser est mise en friction avec elle-même — une idée reçue ou un schéma mental ancien mérite d'être questionné.`,
        'Opposition':  `Ta pensée touche à une polarité interne — une tension créative entre deux modes de raisonnement peut faire émerger quelque chose de nouveau.`,
      },
      // ─── SOLEIL ─────────────────────────────────────────────────────────────
      'Soleil→Lune': {
        'Trigone':     `Ta volonté et ton monde émotionnel s'accordent dans une harmonie fluide — une journée de cohérence intérieure et de légèreté naturelle.`,
        'Sextile':     `L'occasion de poser un acte qui vient vraiment de toi, sans forcer ni calculer, se présente doucement aujourd'hui.`,
        'Conjonction': `Raison et cœur ne font qu'un — tu te sens entier, en phase avec toi-même, et ça se voit.`,
        'Carré':       `Ce que tu veux faire et ce que tu ressens ne s'accordent pas tout à fait — écoute les deux voix avant d'agir sans les court-circuiter.`,
        'Opposition':  `Ta volonté pousse d'un côté, tes émotions de l'autre — l'enjeu n'est pas de choisir mais d'honorer les deux sans les opposer.`,
      },
      'Soleil→Mercure': {
        'Trigone':     `Clarté d'esprit et direction de vie s'accordent — un bon moment pour prendre une décision ou communiquer quelque chose d'important.`,
        'Sextile':     `Ta vision et ta pensée sont alignées — une opportunité de communiquer avec intention se présente, prends-la sans trop attendre.`,
        'Conjonction': `Identité et mental ne font qu'un — tes idées reflètent qui tu es avec une précision et une authenticité rares.`,
        'Carré':       `Tes certitudes et ta façon de penser sont mises en question — une bonne occasion de mettre à jour tes perspectives, même si c'est inconfortable.`,
        'Opposition':  `Ego et logique s'affrontent légèrement — calme l'un pour que l'autre puisse s'exprimer librement.`,
      },
      'Soleil→Vénus': {
        'Trigone':     `Ta luminosité et ta douceur se fondent dans une harmonie naturelle — tu attires ce qui te mérite et ce qui te ressemble.`,
        'Sextile':     `Un élan de joie ou de connexion peut enrichir ta journée d'une façon simple et sincère — laisse ça arriver.`,
        'Conjonction': `Ton charme et ton cœur rayonnent ensemble — les autres ressentent ta chaleur sans que tu aies à te mettre en scène.`,
        'Carré':       `Ton besoin de te montrer entre en friction avec ce que tu veux vraiment — choisis l'authenticité plutôt que la performance.`,
        'Opposition':  `Ta direction de vie et tes désirs affectifs tirent en sens contraire — prends conscience de cette polarité au lieu de l'ignorer.`,
      },
      'Soleil→Mars': {
        'Trigone':     `Énergie et volonté s'accordent avec fluidité — un jour pour agir vite et bien, sans résistance intérieure.`,
        'Sextile':     `Un élan d'action bien orienté peut produire des résultats concrets dès aujourd'hui — c'est le moment d'avancer.`,
        'Conjonction': `Une puissance brute, directe et affirmée — canalise-la vers un objectif précis pour ne pas gaspiller ce potentiel.`,
        'Carré':       `L'impulsion et le bon sens se heurtent — mets une pause entre l'envie et l'acte pour t'assurer que tu vas dans la bonne direction.`,
        'Opposition':  `Foncer ou réfléchir ? La sagesse est dans le dosage, ni paralysie ni précipitation.`,
      },
      'Soleil→Soleil': {
        'Trigone':     `Ton énergie vitale est dans un axe harmonieux avec elle-même — tu te sens centré, lumineux et en accord avec ton essence profonde.`,
        'Sextile':     `Un moment de clarté sur qui tu es et vers quoi tu vas — profite de cette fenêtre pour avancer avec intention.`,
        'Conjonction': `Le Soleil revient sur lui-même : un nouveau cycle commence. C'est le moment idéal pour poser des intentions et réorienter ta direction.`,
        'Carré':       `Ton énergie actuelle frictionne ton essence natale — une tension créative qui peut te pousser à évoluer si tu l'accueilles.`,
        'Opposition':  `Ton énergie vitale actuelle est à l'opposé de son point natal — une prise de conscience naturelle sur ce qui a changé en toi.`,
      },
      // ─── LUNE ───────────────────────────────────────────────────────────────
      'Lune→Soleil': {
        'Trigone':     `Tes émotions du moment sont en harmonie avec qui tu es — une légèreté naturelle accompagne tes actions sans que tu aies à le forcer.`,
        'Sextile':     `Une intuition peut te guider avec justesse vers quelque chose d'authentique — écoute ce premier ressenti sans le censurer.`,
        'Conjonction': `La sensibilité et la volonté ne font qu'un — écoute ce premier mouvement intérieur, il est souvent juste.`,
        'Carré':       `Une tension passagère entre ce que tu veux et ce que tu ressens — laisse-la se décanter sans prendre de décision irréversible.`,
        'Opposition':  `Ton monde intérieur et ta direction s'équilibrent en miroir — une journée de prise de conscience et d'intégration.`,
      },
      'Lune→Mercure': {
        'Trigone':     `Tes intuitions et ta pensée s'accordent avec une belle fluidité — un bon moment pour écrire, parler ou confier quelque chose d'important.`,
        'Sextile':     `Ton intelligence émotionnelle est aiguisée — tu entends ce qui n'est pas dit, ce qui se cache derrière les mots.`,
        'Conjonction': `Pensée et sentiment se brouillent légèrement — distingue ce que tu penses de ce que tu ressens avant de parler ou d'agir.`,
        'Carré':       `Ton mental est brouillé par les émotions du moment — mets de la distance avant de prendre une décision importante.`,
        'Opposition':  `La logique et le cœur se font face — laisse les deux s'exprimer avant de conclure quoi que ce soit.`,
      },
      'Lune→Vénus': {
        'Trigone':     `Tendresse et sérénité colorent ta façon d'être — les relations coulent naturellement, sans friction ni effort.`,
        'Sextile':     `Un petit geste affectueux peut beaucoup compter pour quelqu'un aujourd'hui — et il n'en faut parfois pas plus.`,
        'Conjonction': `Tes émotions et tes désirs fusionnent dans une douceur intense — un moment propice à la connexion intime et à l'échange sincère.`,
        'Carré':       `Tes émotions et tes désirs sont légèrement dissonants — retrouve ton centre avant d'agir affectivement.`,
        'Opposition':  `Ce que tu ressens et ce que tu veux dans tes relations cherchent un équilibre délicat — écoute les deux avec bienveillance.`,
      },
      'Lune→Mars': {
        'Trigone':     `Tes instincts et ton énergie s'accordent naturellement — agis selon ce que tu ressens, tu es dans l'axe.`,
        'Sextile':     `Un élan émotionnel peut se transformer en initiative concrète avec justesse — laisse l'instinct guider l'action.`,
        'Conjonction': `L'instinct et la combativité fusionnent — veille à ne pas réagir trop impulsivement, même si le ressenti est fort.`,
        'Carré':       `L'irritabilité peut surgir sans crier gare — respire avant d'agir sous l'influence d'une émotion passagère.`,
        'Opposition':  `Ressentir et agir s'opposent — prends un moment pour laisser l'émotion se décanter avant de trancher.`,
      },
      'Lune→Lune': {
        'Trigone':     `La Lune revient dans un angle harmonieux avec son point natal — une douceur intérieure discrète, une cohérence émotionnelle que tu peux sentir sans forcément l'expliquer.`,
        'Sextile':     `Un bref espace de clarté émotionnelle s'ouvre — ce que tu ressens est cohérent avec qui tu es profondément.`,
        'Conjonction': `Retour lunaire : un cycle émotionnel se boucle. Tu te reconnectes à tes besoins les plus intimes, à ce qui te nourrit vraiment.`,
        'Carré':       `Une légère dissonance émotionnelle — ce que tu ressens maintenant frotte contre tes habitudes de cœur d'une façon utile.`,
        'Opposition':  `Tes émotions actuelles contrastent avec ton registre émotionnel natal — une prise de conscience naturelle sur l'évolution de tes besoins.`,
      },
    };

    const specific = descriptions[key]?.[type];
    if (specific) return specific;

    // Fallback générique
    const planetDomain: Record<string, string> = {
      'Soleil': 'ton identité et ta volonté', 'Lune': 'tes émotions et tes besoins',
      'Mercure': 'ta pensée et ta communication', 'Vénus': 'tes désirs et tes relations',
      'Mars': "ton énergie d'action", 'Jupiter': 'ton expansion et ta chance',
      'Saturne': 'ta discipline et tes limites', 'Uranus': 'ta liberté et tes ruptures',
      'Neptune': 'ton imaginaire et ta spiritualité', 'Pluton': 'ta transformation profonde',
    };
    const nDomain = planetDomain[np] || 'une énergie natale';
    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    const fallbacks: Record<string, string> = {
      'Trigone':     `Une synergie fluide colore ${nDomain} — profite de cette énergie sans la forcer.`,
      'Sextile':     `Une ouverture légère mais réelle se présente dans ${nDomain}.`,
      'Conjonction': `Une intensité particulière traverse ${nDomain} aujourd'hui.`,
      'Carré':       `${cap(nDomain)} fait face à une friction productive — c'est là que tu grandis.`,
      'Opposition':  `${cap(nDomain)} cherche un équilibre — accueille les deux polarités.`,
    };
    return fallbacks[type] || `Aspect ${type} actif sur ${nDomain} aujourd'hui.`;
  };

  return (
    <div className="min-h-screen bg-[#131314] text-white relative pb-24">
      {/* Header — Eclipse Logo */}
      <div className="costar-header">
        <svg className="logo-soleil" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="haloG" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#FF9800" stopOpacity="0"/>
              <stop offset="42%"  stopColor="#FF9800" stopOpacity="0"/>
              <stop offset="54%"  stopColor="#E07000" stopOpacity="0.22"/>
              <stop offset="62%"  stopColor="#FF9800" stopOpacity="0.75"/>
              <stop offset="68%"  stopColor="#FFB030" stopOpacity="0.95"/>
              <stop offset="74%"  stopColor="#E07800" stopOpacity="0.65"/>
              <stop offset="83%"  stopColor="#C06000" stopOpacity="0.35"/>
              <stop offset="92%"  stopColor="#904000" stopOpacity="0.14"/>
              <stop offset="100%" stopColor="#904000" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="coronaG" cx="50%" cy="12%" r="50%">
              <stop offset="0%"   stopColor="#FFE080" stopOpacity="0.30"/>
              <stop offset="50%"  stopColor="#FFAA30" stopOpacity="0.08"/>
              <stop offset="100%" stopColor="#FF7000" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="innerG" cx="50%" cy="44%" r="54%">
              <stop offset="0%"   stopColor="#060606"/>
              <stop offset="60%"  stopColor="#050505"/>
              <stop offset="82%"  stopColor="#0B0500"/>
              <stop offset="100%" stopColor="#180900"/>
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#haloG)"/>
          <circle cx="50" cy="50" r="50" fill="url(#coronaG)"/>
          <circle cx="50" cy="50" r="33" fill="url(#innerG)"/>
          <circle cx="50" cy="50" r="33.5" fill="none" stroke="#1A0800" strokeWidth="1.2"/>
          <circle cx="50" cy="50" r="33.5" fill="none" stroke="#FFD050" strokeWidth="0.4"/>
          <path d="M 41,16.5 A 33.5,33.5 0 0,1 59,16.5" fill="none" stroke="#FFF5C0" strokeWidth="0.6" strokeLinecap="round" opacity="0.75"/>
        </svg>
      </div>

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto px-4 pt-4 pb-10 md:pt-6 md:pb-12 space-y-12">
        {/* Your Vibe + Défi — occupe toute la première page */}
        <section
          className="costar-daily-hero max-w-2xl mx-auto"
        >
          {/* Énergie du jour */}
          <div className="space-y-3 text-center">
            <p className="text-sm uppercase tracking-widest" style={{ color: '#FFD699', filter: 'drop-shadow(0 0 6px rgba(255, 184, 107, 0.55)) drop-shadow(0 0 14px rgba(255, 184, 107, 0.25))' }}>Ton énergie du jour</p>
            <h2 className="text-3xl md:text-4xl font-light leading-tight bg-gradient-to-r from-sky-300 via-rose-300 to-violet-400 bg-clip-text text-transparent">
              {todayMood.replace(/\s+—\s+/g, ', ')}
            </h2>
          </div>

          {/* Défi du jour */}
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#FFD699]/45 to-transparent"></div>

          <div className="w-full space-y-2 text-center">
            <p className="text-sm uppercase tracking-widest" style={{ color: '#FFD699', filter: 'drop-shadow(0 0 6px rgba(255, 184, 107, 0.55)) drop-shadow(0 0 14px rgba(255, 184, 107, 0.25))' }}>Ton défi du jour</p>
            <div className="relative overflow-hidden rounded-2xl border border-[#D7B46A]/30 bg-[#090A10]/70 px-4 py-4 text-left md:px-5 md:py-5 shadow-[0_0_28px_rgba(215,180,106,0.12)] backdrop-blur-sm">
              <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD699]/65 to-transparent"></div>
              <div className="relative flex items-start gap-3">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#FFD699] shadow-[0_0_14px_rgba(255,214,153,0.7)]"></span>
                <p className="text-base md:text-lg font-light italic leading-relaxed text-[#F3E8D0]">
                  "{moodExtras.defi}"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Your Day at a Glance */}
        <section className="space-y-6 border-t border-[#1E2035]/60 pt-12">
          <p className="text-sm uppercase tracking-widest" style={{ color: '#FFD699', filter: 'drop-shadow(0 0 6px rgba(255, 184, 107, 0.55)) drop-shadow(0 0 14px rgba(255, 184, 107, 0.25))' }}>Ta journée en un coup d'œil</p>
          <ul className="space-y-6">
            {analysis?.dayAtGlance.split('||').filter(s => s.trim().length > 0).map((advice, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400/60 flex-shrink-0"></span>
                <p className="text-base leading-relaxed text-zinc-300">{advice.trim()}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Daily Quote */}
        <section className="space-y-6 border-t border-[#1E2035]/60 pt-12">
          <p className="text-sm uppercase tracking-widest" style={{ color: '#FFD699', filter: 'drop-shadow(0 0 6px rgba(255, 184, 107, 0.55)) drop-shadow(0 0 14px rgba(255, 184, 107, 0.25))' }}>Conseil du jour</p>
          <div className="relative rounded-2xl overflow-hidden group transition-all duration-500 hover:shadow-[0_0_40px_rgba(200,160,80,0.20)]" style={{ border: '1px solid rgba(200,170,110,0.5)', background: 'linear-gradient(135deg, #FAF6EE 0%, #F3EDD8 100%)', padding: '2rem 3rem' }}>
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)' }}></div>
            <div className="relative">
              <p className="text-xl md:text-2xl font-light leading-relaxed mb-6" style={{ color: '#3b2f1e' }}>
                {selectedAdvice}
              </p>
              <div className="flex items-center gap-2 text-sm" style={{ color: '#a07840' }}>
                <Sparkles className="w-4 h-4" style={{ color: '#c8860a' }} />
                <span>Message personnel de l'univers</span>
              </div>
            </div>
          </div>
        </section>

        {/* Planetary Aspects */}
        <section className="space-y-6 border-t border-[#1E2035]/60 pt-12">
          <div>
            <p className="text-sm uppercase tracking-widest" style={{ color: '#FFD699', filter: 'drop-shadow(0 0 6px rgba(255, 184, 107, 0.55)) drop-shadow(0 0 14px rgba(255, 184, 107, 0.25))' }}>Transits du jour</p>
            <p className="text-xs text-zinc-600 mt-1">Positions actuelles des planètes en aspect avec ton thème natal</p>
          </div>
          <div className="space-y-3">
            {(analysis?.favorableAspects || []).map((aspect, index) => {
              const isOpen = openAspects.has(index);
              return (
                <div key={index} className="rounded-lg border-4 border-[#A6B0C3] bg-[#3B2F1E]/90 transition-all duration-300 hover:bg-[#FFD699]/40 hover:border-[#D1D5DB]">
                  <button
                    type="button"
                    onClick={() => toggleAspect(index)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${aspect.color} shadow-lg`}></div>
                      <div>
                        <p className="font-medium text-zinc-200 text-sm">{aspect.text}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        aspect.type === 'Trigone' || aspect.type === 'Sextile' ? 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/25' :
                        aspect.type === 'Carré' || aspect.type === 'Opposition' ? 'text-rose-400 bg-rose-500/15 border border-rose-500/25' :
                        'text-violet-300 bg-violet-500/15 border border-violet-500/25'
                      }`}>
                        {aspect.type}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-zinc-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-500" />
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-3 border-t border-[#1E2035]/40">
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {getAspectDescription(aspect)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Disclaimer */}
        <footer className="border-t border-[#1E2035]/60 pt-8 text-center text-xs text-zinc-600">
          {/* Star field animation */}
          <div className="relative h-16 mb-4 overflow-hidden">
            <style>{`
              @keyframes twinkle {
                0%, 100% { opacity: 0.1; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1.2); }
              }
              @keyframes drift {
                0% { transform: translateX(0px) translateY(0px); }
                33% { transform: translateX(4px) translateY(-3px); }
                66% { transform: translateX(-3px) translateY(2px); }
                100% { transform: translateX(0px) translateY(0px); }
              }
              .star { position: absolute; border-radius: 50%; background: white; animation: twinkle var(--dur, 3s) var(--delay, 0s) ease-in-out infinite, drift calc(var(--dur, 3s) * 2.5) var(--delay, 0s) ease-in-out infinite; }
            `}</style>
            {[
              { left:'5%',  top:'30%', size:1,   dur:'2.1s', delay:'0s'    },
              { left:'12%', top:'70%', size:1.5, dur:'3.4s', delay:'0.5s'  },
              { left:'20%', top:'20%', size:1,   dur:'2.8s', delay:'1.2s'  },
              { left:'28%', top:'60%', size:2,   dur:'4.0s', delay:'0.3s'  },
              { left:'35%', top:'40%', size:1,   dur:'2.5s', delay:'1.8s'  },
              { left:'42%', top:'80%', size:1.5, dur:'3.1s', delay:'0.7s'  },
              { left:'50%', top:'25%', size:2.5, dur:'2.3s', delay:'0.0s'  },
              { left:'57%', top:'65%', size:1,   dur:'3.7s', delay:'1.4s'  },
              { left:'64%', top:'35%', size:1.5, dur:'2.9s', delay:'0.9s'  },
              { left:'72%', top:'75%', size:1,   dur:'4.2s', delay:'0.2s'  },
              { left:'80%', top:'45%', size:2,   dur:'2.6s', delay:'1.0s'  },
              { left:'88%', top:'20%', size:1,   dur:'3.3s', delay:'1.6s'  },
              { left:'94%', top:'60%', size:1.5, dur:'2.7s', delay:'0.4s'  },
            ].map((s, i) => (
              <span
                key={i}
                className="star"
                style={{
                  left: s.left,
                  top: s.top,
                  width: `${s.size * 2}px`,
                  height: `${s.size * 2}px`,
                  '--dur': s.dur,
                  '--delay': s.delay,
                  opacity: 0.15,
                } as React.CSSProperties}
              />
            ))}
            {/* Central larger star */}
            <span style={{
              position:'absolute', left:'50%', top:'50%',
              transform:'translate(-50%,-50%)',
              color:'rgba(251,191,36,0.5)',
              fontSize:'1.1rem',
              animation:'twinkle 2.8s ease-in-out infinite',
            } as React.CSSProperties}>✦</span>
          </div>
          <div style={{ perspective: '200px', perspectiveOrigin: '50% 0%', marginTop: '36px' }}>
            <p style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#FFE81F',
              textShadow: '0 0 12px rgba(255,232,31,0.5), 0 0 30px rgba(255,232,31,0.2)',
              transform: 'rotateX(18deg)',
              transformOrigin: '50% 100%',
              display: 'inline-block',
            }}>La Force du cosmos traverse ton thème natal</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
