import { ASPECT_DETAILED } from './aspectDetailedInterpretations';

export const PLANET_INFO: Record<string, { name: string; description: string; keywords: string }> = {
  sun: {
    name: 'Soleil',
    description: 'Ton essence profonde, ton identité et ta volonté. Le Soleil représente qui tu es vraiment, ton énergie vitale et ton chemin de vie.',
    keywords: 'Identité • Ego • Volonté • Créativité • Vitalité'
  },
  moon: {
    name: 'Lune',
    description: 'Tes émotions, ton monde intérieur et tes besoins affectifs. La Lune révèle comment tu réagis émotionnellement et ce qui te sécurise.',
    keywords: 'Émotions • Intuition • Besoins • Mémoire • Famille'
  },
  mercury: {
    name: 'Mercure',
    description: 'Ta façon de penser, communiquer et apprendre. Mercure gouverne ton intelligence, tes échanges et ta curiosité intellectuelle.',
    keywords: 'Communication • Intellect • Apprentissage • Échanges'
  },
  venus: {
    name: 'Vénus',
    description: 'Ta manière d\'aimer, tes valeurs et ton sens esthétique. Vénus dévoile ce qui t\'attire, tes plaisirs et tes relations affectives.',
    keywords: 'Amour • Beauté • Plaisirs • Relations • Valeurs'
  },
  mars: {
    name: 'Mars',
    description: 'Ton énergie d\'action, ton courage et tes désirs. Mars montre comment tu agis, tu t\'affirmes et tu poursuis tes objectifs.',
    keywords: 'Action • Courage • Désir • Énergie • Combativité'
  },
  jupiter: {
    name: 'Jupiter',
    description: 'Ton expansion, ta chance et ta sagesse. Jupiter représente tes opportunités, ton optimisme et ta quête de sens.',
    keywords: 'Expansion • Chance • Sagesse • Abondance • Philosophie'
  },
  saturn: {
    name: 'Saturne',
    description: 'Ta structure, tes responsabilités et tes leçons de vie. Saturne enseigne la discipline, la patience et la maturité.',
    keywords: 'Discipline • Responsabilité • Temps • Structure • Sagesse'
  },
  uranus: {
    name: 'Uranus',
    description: 'Ton originalité, tes innovations et ta liberté. Uranus impulse le changement, l\'indépendance et l\'avant-gardisme.',
    keywords: 'Innovation • Liberté • Originalité • Changement • Révolution'
  },
  neptune: {
    name: 'Neptune',
    description: 'Ton imagination, ta spiritualité et tes rêves. Neptune connecte à l\'invisible, l\'inspiration et la transcendance.',
    keywords: 'Intuition • Spiritualité • Rêves • Inspiration • Mystère'
  },
  pluto: {
    name: 'Pluton',
    description: 'Ta transformation, ton pouvoir et ta renaissance. Pluton révèle tes profondeurs et ta capacité de métamorphose.',
    keywords: 'Transformation • Pouvoir • Régénération • Profondeur'
  },
  ascendant: {
    name: 'Ascendant',
    description: 'Ton masque social, ton apparence et ta façon de te présenter au monde. L\'Ascendant est la porte d\'entrée de ton thème natal.',
    keywords: 'Apparence • Personnalité • Premier contact • Spontanéité'
  }
};

export const SIGN_DETAILED: Record<string, { element: string; quality: string; ruler: string; description: string }> = {
  'Bélier': {
    element: 'Feu',
    quality: 'Cardinal',
    ruler: 'Mars',
    description: 'Pionnier intrépide, le Bélier fonce tête baissée vers ses objectifs. Initiative, courage et spontanéité caractérisent ce signe qui aime être le premier.'
  },
  'Taureau': {
    element: 'Terre',
    quality: 'Fixe',
    ruler: 'Vénus',
    description: 'Stable et sensuel, le Taureau recherche la sécurité matérielle et les plaisirs concrets. Patient et déterminé, il construit sur le long terme.'
  },
  'Gémeaux': {
    element: 'Air',
    quality: 'Mutable',
    ruler: 'Mercure',
    description: 'Curieux et communicatif, les Gémeaux papillonnent d\'une idée à l\'autre. Polyvalents et sociables, ils excellent dans l\'échange et l\'adaptation.'
  },
  'Cancer': {
    element: 'Eau',
    quality: 'Cardinal',
    ruler: 'Lune',
    description: 'Sensible et protecteur, le Cancer est profondément lié à ses émotions et sa famille. Intuitif et empathique, il crée un cocon sécurisant.'
  },
  'Lion': {
    element: 'Feu',
    quality: 'Fixe',
    ruler: 'Soleil',
    description: 'Généreux et charismatique, le Lion rayonne naturellement. Créatif et fier, il aime être au centre de l\'attention et inspirer les autres.'
  },
  'Vierge': {
    element: 'Terre',
    quality: 'Mutable',
    ruler: 'Mercure',
    description: 'Analytique et perfectionniste, la Vierge excelle dans les détails et l\'organisation. Pratique et serviable, elle améliore tout ce qu\'elle touche.'
  },
  'Balance': {
    element: 'Air',
    quality: 'Cardinal',
    ruler: 'Vénus',
    description: 'Harmonieux et diplomate, la Balance recherche l\'équilibre et la beauté. Sociable et juste, elle excelle dans les relations et la médiation.'
  },
  'Scorpion': {
    element: 'Eau',
    quality: 'Fixe',
    ruler: 'Pluton',
    description: 'Intense et passionné, le Scorpion plonge dans les profondeurs de l\'existence. Magnétique et transformateur, il ne fait rien à moitié.'
  },
  'Sagittaire': {
    element: 'Feu',
    quality: 'Mutable',
    ruler: 'Jupiter',
    description: 'Optimiste et aventurier, le Sagittaire aspire à l\'expansion et à la découverte. Philosophe et libre, il recherche le sens de la vie.'
  },
  'Capricorne': {
    element: 'Terre',
    quality: 'Cardinal',
    ruler: 'Saturne',
    description: 'Ambitieux et discipliné, le Capricorne gravit patiemment la montagne du succès. Responsable et mature, il bâtit avec persévérance.'
  },
  'Verseau': {
    element: 'Air',
    quality: 'Fixe',
    ruler: 'Uranus',
    description: 'Original et visionnaire, le Verseau incarne l\'innovation et la liberté. Humaniste et indépendant, il pense différemment des autres.'
  },
  'Poissons': {
    element: 'Eau',
    quality: 'Mutable',
    ruler: 'Neptune',
    description: 'Intuitif et compassionnel, les Poissons nagent entre deux mondes. Artistique et empathique, ce signe se connecte au subtil et à l\'universel.'
  }
};

export const HOUSE_MEANINGS: Record<number, { name: string; theme: string; description: string }> = {
  1: {
    name: 'Maison de l\'Identité',
    theme: 'Personnalité et apparence',
    description: 'Ta façon d\'être et de te présenter au monde. L\'Ascendant, porte d\'entrée de ton thème, définit ton masque social et ton énergie spontanée.'
  },
  2: {
    name: 'Maison des Ressources',
    theme: 'Argent et valeurs',
    description: 'Tes possessions matérielles, tes talents et ce que tu valorises. Cette maison parle de ton rapport à l\'argent et à ta sécurité matérielle.'
  },
  3: {
    name: 'Maison de la Communication',
    theme: 'Échanges et apprentissage',
    description: 'Ta communication, tes apprentissages et ton entourage proche. Frères, sœurs, voisins et déplacements courts y sont représentés.'
  },
  4: {
    name: 'Maison des Racines',
    theme: 'Famille et foyer',
    description: 'Tes origines, ta famille et ton foyer. Le Fond du Ciel révèle tes racines profondes et ce qui t\'ancre émotionnellement.'
  },
  5: {
    name: 'Maison de la Créativité',
    theme: 'Plaisirs et créations',
    description: 'Ta créativité, tes loisirs, tes enfants et tes amours. Cette maison exprime ta joie de vivre et ce qui te fait vibrer.'
  },
  6: {
    name: 'Maison du Quotidien',
    theme: 'Travail et santé',
    description: 'Ta routine, ton travail quotidien et ta santé. Elle indique comment tu gères les obligations et prends soin de toi.'
  },
  7: {
    name: 'Maison des Associations',
    theme: 'Relations et partenariats',
    description: 'Tes relations de couple, tes associations et tes contrats. Le Descendant montre ce que tu recherches chez l\'autre.'
  },
  8: {
    name: 'Maison des Transformations',
    theme: 'Mort et renaissance',
    description: 'Les transformations profondes, la sexualité et les ressources partagées. Mystères, crises et régénérations y prennent place.'
  },
  9: {
    name: 'Maison de l\'Expansion',
    theme: 'Philosophie et voyages',
    description: 'Ta quête de sens, tes voyages lointains et tes études supérieures. C\'est la maison de la sagesse et de l\'exploration.'
  },
  10: {
    name: 'Maison de la Vocation',
    theme: 'Carrière et réputation',
    description: 'Ta carrière, ton statut social et ton accomplissement public. Le Milieu du Ciel indique ta destinée professionnelle.'
  },
  11: {
    name: 'Maison des Projets',
    theme: 'Amis et idéaux',
    description: 'Tes amitiés, tes projets collectifs et tes idéaux. Cette maison parle de tes rêves et de ta contribution au groupe.'
  },
  12: {
    name: 'Maison de l\'Invisible',
    theme: 'Spiritualité et inconscient',
    description: 'Ta spiritualité, ton inconscient et ce qui est caché. Épreuves karmiques, retraites et connexion au divin s\'y manifestent.'
  }
};

export const ASPECT_MEANINGS: Record<string, { nature: string; description: string; interpretation: string }> = {
  'Conjonction': {
    nature: 'Fusion',
    description: 'Deux planètes unies (0°) fusionnent leurs énergies.',
    interpretation: 'Les qualités des deux planètes se mélangent intensément, créant une force puissante qui peut être constructive ou difficile selon les planètes impliquées.'
  },
  'Sextile': {
    nature: 'Opportunité',
    description: 'Deux planètes en harmonie facile (60°).',
    interpretation: 'Cet aspect offre des opportunités naturelles et des facilités. Les énergies coopèrent sans effort, créant des possibilités qu\'il faut saisir.'
  },
  'Carré': {
    nature: 'Défi',
    description: 'Deux planètes en tension créative (90°).',
    interpretation: 'Cet aspect génère des tensions et des défis qui poussent à l\'action. La friction créée est inconfortable mais stimulante et mène à la croissance.'
  },
  'Trigone': {
    nature: 'Harmonie',
    description: 'Deux planètes en harmonie fluide (120°).',
    interpretation: 'Aspect le plus favorable, le trigone indique des talents naturels et une aisance instinctive. Les énergies circulent librement et harmonieusement.'
  },
  'Opposition': {
    nature: 'Polarité',
    description: 'Deux planètes face à face (180°) créant une tension.',
    interpretation: 'Cet aspect demande de trouver l\'équilibre entre deux forces opposées. La conscience de cette dualité permet l\'intégration et la complémentarité.'
  }
};

export function getPlanetInSignInterpretation(planet: string, sign: string): string {
  const interpretations: Record<string, Record<string, string>> = {
    sun: {
      'Bélier': 'Tu es un leader naturel, courageux et toujours prêt à foncer. L\'action directe te caractérise.',
      'Taureau': 'Tu recherches la stabilité et les plaisirs concrets. Ta détermination est légendaire.',
      'Gémeaux': 'Ta curiosité intellectuelle est insatiable. Tu excelles dans la communication et l\'adaptabilité.',
      'Cancer': 'Tes émotions guident tes actions. Famille et sécurité affective sont essentielles pour toi.',
      'Lion': 'Tu rayonnes naturellement et inspires ton entourage. La créativité est ta force.',
      'Vierge': 'L\'analyse et le perfectionnisme t\'animent. Tu excelles dans les détails et le service.',
      'Balance': 'L\'harmonie et les relations sont au cœur de ton être. Tu es naturellement diplomate.',
      'Scorpion': 'Ton intensité et ta passion sont remarquables. Tu explores les profondeurs de l\'existence.',
      'Sagittaire': 'L\'aventure et la quête de sens t\'animent. Ton optimisme est contagieux.',
      'Capricorne': 'L\'ambition et la discipline te caractérisent. Tu construis patiemment ton succès.',
      'Verseau': 'Ton originalité et ton indépendance te définissent. Tu es un visionnaire.',
      'Poissons': 'Ton intuition et ta compassion sont exceptionnelles. Tu es connecté au monde subtil.'
    },
    moon: {
      'Bélier': 'Tes réactions émotionnelles sont vives et spontanées. Tu as besoin d\'action pour te sentir bien.',
      'Taureau': 'Tu recherches la stabilité émotionnelle et le confort. Les plaisirs sensoriels t\'apaisent.',
      'Gémeaux': 'Ton monde intérieur est varié et mobile. La communication nourrit ton bien-être émotionnel.',
      'Cancer': 'Hypersensible, tu as un besoin profond de sécurité et d\'appartenance. L\'intuition te guide.',
      'Lion': 'Tu exprimes tes émotions avec chaleur et générosité. Être apprécié nourrit ton âme.',
      'Vierge': 'Tu analyses tes sentiments et cherches la perfection émotionnelle. Le service t\'apaise.',
      'Balance': 'L\'harmonie relationnelle est vitale pour ton équilibre. Tu évites les conflits émotionnels.',
      'Scorpion': 'Tes émotions sont d\'une intensité rare. Tu ressens tout profondément et magnétiquement.',
      'Sagittaire': 'Ton optimisme naturel colore tes émotions. La liberté émotionnelle est essentielle.',
      'Capricorne': 'Tu maîtrises tes émotions avec maturité. La réserve émotionnelle te protège.',
      'Verseau': 'Ton indépendance émotionnelle est importante. Tu rationalises tes sentiments.',
      'Poissons': 'Ultra empathique, tu absorbes les émotions ambiantes. Ta sensibilité est osmotique.'
    },
    mercury: {
      'Bélier': 'Ta pensée est rapide et directe. Tu communiques sans détour, avec franchise.',
      'Taureau': 'Tu réfléchis posément et concrètement. Tes idées sont pratiques et stables.',
      'Gémeaux': 'Ton intelligence est vive et polyvalente. La communication est ton superpouvoir.',
      'Cancer': 'Ta pensée est intuitive et émotionnelle. La mémoire est ta force.',
      'Lion': 'Tu t\'exprimes avec confiance et créativité. Ta communication est charismatique.',
      'Vierge': 'Ton esprit analytique excelle dans les détails. Organisation et précision te caractérisent.',
      'Balance': 'Tu pèses le pour et le contre, recherchant l\'équité. Ta communication est diplomate.',
      'Scorpion': 'Ta pensée est profonde et investigatrice. Tu perces les mystères facilement.',
      'Sagittaire': 'Ton esprit philosophique embrasse les grandes idées. L\'optimisme teinte tes pensées.',
      'Capricorne': 'Ta réflexion est structurée et pragmatique. Tu penses stratégiquement.',
      'Verseau': 'Ta pensée est originale et avant-gardiste. L\'innovation intellectuelle t\'anime.',
      'Poissons': 'Ton imagination est fertile. L\'intuition guide ton intelligence.'
    }
  };

  return interpretations[planet]?.[sign] || `${PLANET_INFO[planet]?.name} en ${sign} colore ta personnalité de manière unique.`;
}

export function getAspectInterpretation(planet1: string, planet2: string, aspectType: string): string {
  const p1Name = PLANET_INFO[planet1]?.name || planet1;
  const p2Name = PLANET_INFO[planet2]?.name || planet2;

  const key = [planet1, planet2].sort().join('-');

  // Check detailed interpretations first
  const detailedInterp = ASPECT_DETAILED[key]?.[aspectType];
  if (detailedInterp) return detailedInterp;

  const aspectInterpretations: Record<string, Record<string, string>> = {
    'moon-sun': {
      'Conjonction': 'Ta conscience et tes émotions sont parfaitement alignées. Tu es authentique, exprimant naturellement ce que tu ressens. Cette unité intérieure crée une personnalité cohérente et intègre.',
      'Trigone': 'Harmonie naturelle entre ton être profond et ta vie émotionnelle. Tu te sens bien dans ta peau et rayonnes une énergie positive qui attire les autres.',
      'Carré': 'Tension entre ce que tu veux être et ce que tu ressens. Cette friction te pousse à évoluer mais demande un effort conscient pour réconcilier ta tête et ton cœur.',
      'Opposition': 'Ta conscience et tes émotions semblent tirer dans des directions opposées. L\'objectif est de les honorer toutes les deux et de trouver un équilibre dynamique.',
      'Sextile': 'Facilité à exprimer tes émotions de manière constructive. Tu sais instinctivement comment nourrir ton bien-être émotionnel.'
    },
    'mercury-sun': {
      'Conjonction': 'Ton identité et ton intellect fusionnent. Tu es brillant et communiques avec assurance. Attention toutefois à garder une certaine objectivité sur toi-même.',
      'Trigone': 'Ta pensée reflète naturellement qui tu es. Communication fluide, créativité intellectuelle et capacité à t\'exprimer avec clarté.',
      'Carré': 'Tension entre ton ego et ta raison. Tu peux avoir du mal à rester objectif ou tendre vers l\'hyper-rationalisation. Cette friction stimule ton intelligence.',
      'Opposition': 'Ta pensée peut critiquer ton être ou inversement. L\'équilibre se trouve en intégrant raison et intuition, mental et cœur.',
      'Sextile': 'Facilité à communiquer qui tu es. Ton expression correspond à ton essence, créant une communication authentique et efficace.'
    },
    'mercury-moon': {
      'Conjonction': 'Tes pensées et émotions sont intimement liées. Tu exprimes facilement tes sentiments mais peux aussi être submergé émotionnellement dans tes réflexions.',
      'Trigone': 'Intelligence émotionnelle naturelle. Tu comprends intuitivement les autres et sais communiquer avec sensibilité et empathie.',
      'Carré': 'Conflit entre raison et émotion. Tes sentiments brouillent parfois ton jugement, mais cette tension développe une compréhension profonde de la psychologie.',
      'Opposition': 'Ta tête et ton cœur dialoguent constamment. L\'enjeu est d\'écouter les deux sans les laisser se dominer mutuellement.',
      'Sextile': 'Tu communiques tes besoins émotionnels avec aisance. Bonne mémoire émotionnelle et capacité à comprendre les subtilités relationnelles.'
    },
    'mars-sun': {
      'Conjonction': 'Énergie vitale débordante et volonté d\'action puissante. Tu es un guerrier naturel, courageux et déterminé. Apprends à canaliser cette force.',
      'Trigone': 'Action et identité s\'harmonisent parfaitement. Tu sais qui tu es et agis en conséquence. Leadership naturel et confiance en soi.',
      'Carré': 'Conflit intérieur entre désir d\'action et sens de soi. Cette tension crée une dynamique puissante mais peut générer frustration et impatience.',
      'Opposition': 'Tiraillement entre affirmation de soi et action impulsive. Apprendre à agir selon tes valeurs profondes plutôt que par réaction.',
      'Sextile': 'Capacité naturelle à passer à l\'action de manière constructive. Ton énergie soutient tes objectifs personnels efficacement.'
    },
    'mars-moon': {
      'Conjonction': 'Tes émotions sont intenses et tu réagis rapidement. Passion, courage émotionnel, mais aussi impulsivité dans tes réactions affectives.',
      'Trigone': 'Force émotionnelle et capacité d\'action harmonieuses. Tu défends naturellement ce qui compte pour toi sur le plan émotionnel.',
      'Carré': 'Tensions émotionnelles qui te poussent à l\'action. Colère et frustration peuvent surgir rapidement, mais cette énergie peut être transformée.',
      'Opposition': 'Combat entre besoins émotionnels et désirs d\'action. L\'équilibre demande de respecter tes émotions tout en agissant de manière constructive.',
      'Sextile': 'Énergie émotionnelle bien canalisée. Tu sais agir pour protéger et nourrir ce qui te tient à cœur.'
    },
    'mercury-venus': {
      'Conjonction': 'Charme naturel dans la communication. Tu sais choisir les mots justes et apprécier la beauté des idées. Diplomatie et goût artistique.',
      'Trigone': 'Communication harmonieuse et agréable. Tu crées facilement des connexions et exprimes l\'affection avec élégance et naturel.',
      'Carré': 'Tension entre pensée et plaisir. Difficulté à choisir entre raison et sentiment, mais cette friction affine ton discernement.',
      'Opposition': 'Ta tête dit une chose, ton cœur une autre. L\'art consiste à honorer à la fois la logique et l\'amour.',
      'Sextile': 'Facilité à exprimer l\'affection verbalement. Communication chaleureuse et capacité à créer de l\'harmonie par les mots.'
    },
    'mars-venus': {
      'Conjonction': 'Passion intense dans l\'amour et l\'art. Désir et affection fusionnent, créant une nature magnétique et créative. Séduction naturelle.',
      'Trigone': 'Harmonie entre désir et affection. Tu attires naturellement ce que tu aimes et aimes ce que tu poursuis. Charisme et créativité.',
      'Carré': 'Conflit entre désir et amour, passion et tendresse. Cette tension crée une intensité dans tes relations et stimule ta créativité.',
      'Opposition': 'Attraction et répulsion alternent. L\'enjeu est d\'intégrer passion et affection dans une expression équilibrée de l\'amour.',
      'Sextile': 'Capacité naturelle à attirer et créer. Ton action soutient tes valeurs et tu poursuis tes désirs de manière harmonieuse.'
    },
    'jupiter-sun': {
      'Conjonction': 'Optimisme naturel et foi en toi-même. Tu vois grand et inspires confiance. Générosité et quête de sens caractérisent ton être.',
      'Trigone': 'Chance et expansion naturelles. Les opportunités viennent facilement car tu rayonnes positivement. Sagesse et croissance harmonieuse.',
      'Carré': 'Tension entre expansion et identité. Tendance à l\'excès ou au manque de mesure, mais cette énergie pousse à grandir constamment.',
      'Opposition': 'Tiraillement entre modestie et grandeur. L\'équilibre se trouve en restant authentique tout en embrassant tes possibilités.',
      'Sextile': 'Opportunités de croissance personnelle se présentent facilement. Ton optimisme soutient naturellement ton développement.'
    },
    'jupiter-moon': {
      'Conjonction': 'Générosité émotionnelle et foi profonde. Ton cœur est grand et tu as besoin d\'expansion émotionnelle. Optimisme et empathie.',
      'Trigone': 'Bien-être émotionnel naturel. Tu sais instinctivement comment nourrir ton âme et celle des autres. Protection et chance émotionnelles.',
      'Carré': 'Excès émotionnels possibles. Tendance à trop donner ou trop attendre émotionnellement, mais cette générosité te fait grandir.',
      'Opposition': 'Balance entre besoins émotionnels et expansion. L\'enjeu est de croître sans se perdre, de donner sans s\'oublier.',
      'Sextile': 'Facilité à trouver joie et sens dans tes émotions. Ton optimisme nourrit naturellement ton bien-être intérieur.'
    },
    'jupiter-saturn': {
      'Conjonction': 'Équilibre unique entre expansion et contraction. Tu sais croître avec sagesse, combinant optimisme et réalisme de manière constructive.',
      'Trigone': 'Chance structurée et discipline optimiste. Tu manifestes tes rêves avec patience et méthode. Succès durable et mérité.',
      'Carré': 'Conflit entre croissance et limitation. Cette tension t\'enseigne la persévérance et la sagesse à travers les hauts et les bas.',
      'Opposition': 'Oscillation entre foi et peur, expansion et retrait. L\'intégration de ces deux forces crée une sagesse profonde.',
      'Sextile': 'Opportunités de construire solidement. Ton optimisme trouve une structure et tes efforts sont récompensés justement.'
    },
    'mercury-saturn': {
      'Conjonction': 'Pensée sérieuse et structurée. Concentration, profondeur intellectuelle mais parfois tendance au pessimisme. Grande capacité d\'apprentissage méthodique.',
      'Trigone': 'Pensée claire et organisée. Tu structures naturellement tes idées et communiques avec autorité et sagesse.',
      'Carré': 'Blocages mentaux ou pensées négatives possibles. Cette tension développe rigueur et profondeur intellectuelle à travers l\'effort.',
      'Opposition': 'Tension entre spontanéité mentale et structure. L\'équilibre crée une pensée à la fois libre et disciplinée.',
      'Sextile': 'Facilité à organiser tes pensées. Communication claire, apprentissage méthodique et capacité à enseigner.'
    },
    'moon-venus': {
      'Conjonction': 'Douceur émotionnelle naturelle. Tu recherches harmonie et beauté dans tes relations. Affection et sensibilité artistique.',
      'Trigone': 'Grâce émotionnelle et capacité d\'aimer facilement. Tu attires l\'affection et crées naturellement de la beauté autour de toi.',
      'Carré': 'Tension entre besoins émotionnels et désirs relationnels. Cette friction affine ta compréhension de l\'amour et de l\'harmonie.',
      'Opposition': 'Balance entre donner et recevoir l\'amour. L\'enjeu est d\'honorer tes besoins tout en restant ouvert aux autres.',
      'Sextile': 'Facilité à exprimer affection et créer harmonie. Tu sais naturellement embellir ta vie émotionnelle.'
    },
    'saturn-sun': {
      'Conjonction': 'Sens aigu des responsabilités. Tu te prends au sérieux et construis ton identité avec patience. Maturité précoce.',
      'Trigone': 'Structure et identité s\'harmonisent. Tu incarnes naturellement sagesse et autorité. Succès mérité par le travail.',
      'Carré': 'Épreuves de confiance en soi. Cette tension construit une force intérieure authentique à travers la persévérance.',
      'Opposition': 'Conflit entre spontanéité et responsabilité. L\'équilibre crée une identité à la fois libre et mature.',
      'Sextile': 'Capacité naturelle à te structurer. Tes efforts construisent solidement ton identité et ta confiance.'
    },
    'ascendant-sun': {
      'Conjonction': 'Ton essence profonde et ton apparence fusionnent. Tu es authentique et ce que tu parais correspond à ce que tu es. Rayonnement naturel.',
      'Trigone': 'Harmonie entre ton être intérieur et ton masque social. Tu te présentes naturellement de façon authentique et attrayante.',
      'Carré': 'Tension entre qui tu es et comment tu apparais. Cette friction te pousse à développer une image plus alignée avec ton essence.',
      'Opposition': 'Contraste marqué entre ton identité profonde et ta personnalité sociale. L\'intégration crée une personnalité riche et nuancée.',
      'Sextile': 'Facilité à exprimer ton essence à travers ton apparence. Tu sais naturellement te présenter de manière favorable.'
    },
    'ascendant-moon': {
      'Conjonction': 'Tes émotions sont visibles sur ton visage. Tu es spontanément émotif et les autres perçoivent facilement tes sentiments. Authenticité émotionnelle.',
      'Trigone': 'Ta sensibilité transparaît harmonieusement dans ton comportement. Tu crées une première impression chaleureuse et accueillante.',
      'Carré': 'Conflit entre tes besoins émotionnels et ton image sociale. Cette tension t\'apprend à équilibrer expression et protection émotionnelles.',
      'Opposition': 'Tes émotions privées contrastent avec ta façade publique. L\'enjeu est d\'intégrer vie intérieure et expression extérieure.',
      'Sextile': 'Facilité à exprimer tes émotions de manière appropriée socialement. Tu crées naturellement un climat émotionnel positif.'
    },
    'ascendant-mercury': {
      'Conjonction': 'Ton intelligence et ta communication sont immédiatement perceptibles. Tu es identifié comme quelqu\'un de curieux et communicatif.',
      'Trigone': 'Ta façon de penser s\'exprime naturellement dans ton comportement. Communication fluide et apparence intelligente.',
      'Carré': 'Tension entre ton mental et ton image. Difficulté parfois à communiquer comme tu le souhaites, ce qui affine ton expression.',
      'Opposition': 'Ta façon de penser peut contredire ton apparence. L\'équilibre crée une communication authentique et nuancée.',
      'Sextile': 'Facilité à communiquer ta personnalité. Tu sais instinctivement adapter ton message à ton audience.'
    },
    'ascendant-venus': {
      'Conjonction': 'Charme naturel et beauté évidente. Tu es immédiatement perçu comme attirant, agréable et harmonieux. Magnétisme social.',
      'Trigone': 'Grâce et élégance naturelles dans ta présentation. Tu attires facilement la sympathie et crées de belles premières impressions.',
      'Carré': 'Conflit entre tes valeurs et ton image. Cette tension te pousse à affiner ton style et ta façon de plaire.',
      'Opposition': 'Contraste entre ce que tu aimes et ce que tu montres. L\'intégration crée une authenticité charmante.',
      'Sextile': 'Facilité à te présenter de manière attrayante. Tu sais naturellement mettre en valeur tes qualités esthétiques.'
    },
    'ascendant-mars': {
      'Conjonction': 'Énergie visible et dynamisme évident. Tu es perçu comme courageux, direct et combatif. Forte présence physique.',
      'Trigone': 'Ton énergie s\'exprime harmonieusement dans tes actions. Leadership naturel et capacité à inspirer l\'action chez les autres.',
      'Carré': 'Tension entre ton agressivité et ton image. Cette friction développe une assertivité plus raffinée et contrôlée.',
      'Opposition': 'Contraste entre ton désir d\'action et ton comportement social. L\'équilibre crée une affirmation de soi équilibrée.',
      'Sextile': 'Facilité à agir de manière appropriée socialement. Ton énergie soutient naturellement ta présentation.'
    },
    'ascendant-jupiter': {
      'Conjonction': 'Optimisme et générosité évidents. Tu es perçu comme chanceux, sage et inspirant. Présence expansive et positive.',
      'Trigone': 'Ta foi et ton optimisme transparaissent naturellement. Tu crées des opportunités par ta seule présence positive.',
      'Carré': 'Excès possibles dans ta présentation. Tendance à l\'exagération ou au manque de mesure, mais cette énergie attire la chance.',
      'Opposition': 'Tension entre croissance personnelle et image sociale. L\'équilibre crée une expansion authentique et mesurée.',
      'Sextile': 'Facilité à attirer les opportunités par ton attitude positive. Ton optimisme enrichit ta présence sociale.'
    },
    'ascendant-saturn': {
      'Conjonction': 'Sérieux et maturité évidents. Tu es perçu comme responsable, discipliné et digne de confiance. Autorité naturelle.',
      'Trigone': 'Structure et image s\'harmonisent. Tu incarnes naturellement sagesse et crédibilité. Respect et confiance te suivent.',
      'Carré': 'Blocages dans ton expression sociale. Cette tension construit une présence authentique à travers la persévérance.',
      'Opposition': 'Conflit entre spontanéité et contrôle de ton image. L\'intégration crée une présence à la fois libre et mature.',
      'Sextile': 'Facilité à te présenter de manière professionnelle. Ton sérieux soutient naturellement ta crédibilité sociale.'
    },
    'ascendant-uranus': {
      'Conjonction': 'Originalité évidente et indépendance marquée. Tu es perçu comme unique, innovant et parfois excentrique. Magnétisme électrique.',
      'Trigone': 'Ton individualité s\'exprime harmonieusement. Tu es authentiquement toi-même et cela attire les autres naturellement.',
      'Carré': 'Comportement imprévisible ou difficultés d\'adaptation sociale. Cette tension développe une authenticité courageuse.',
      'Opposition': 'Tiraillement entre conformité et rébellion. L\'équilibre crée une individualité respectueuse mais affirmée.',
      'Sextile': 'Facilité à exprimer ton originalité de manière acceptable. Ta différence devient un atout social.'
    },
    'ascendant-neptune': {
      'Conjonction': 'Aura mystérieuse et sensibilité évidente. Tu es perçu comme inspirant, artistique ou insaisissable. Présence éthérée.',
      'Trigone': 'Imagination et spiritualité transparaissent harmonieusement. Tu inspires naturellement et attires par ta douceur.',
      'Carré': 'Confusion possible sur ton identité ou image floue. Cette tension développe une authenticité spirituelle profonde.',
      'Opposition': 'Contraste entre idéal et réalité de ton image. L\'intégration crée une présence à la fois inspirante et authentique.',
      'Sextile': 'Facilité à exprimer ta sensibilité artistique. Ta créativité enrichit naturellement ta présentation sociale.'
    },
    'ascendant-pluto': {
      'Conjonction': 'Intensité et magnétisme puissants. Tu es perçu comme transformateur, intense et mystérieux. Présence magnétique irrésistible.',
      'Trigone': 'Ton pouvoir personnel s\'exprime harmonieusement. Tu transformes naturellement ton environnement par ta seule présence.',
      'Carré': 'Luttes de pouvoir liées à ton image. Cette tension développe une présence authentiquement puissante à travers la transformation.',
      'Opposition': 'Conflit entre ta profondeur et ta surface. L\'intégration crée une authenticité magnétique et transformatrice.',
      'Sextile': 'Facilité à exprimer ton intensité de manière appropriée. Ta profondeur enrichit naturellement tes interactions.'
    },
    'neptune-pluto': {
      'Conjonction': 'Neptune et Pluton fusionnent leurs énergies transcendantes et transformatrices créant une force spirituelle régénératrice extraordinaire. Tu es doué pour transformer les mondes intangibles spirituels et psychologiques d\'autres gens. Ton intuition est profondément mystique liée aux dimensions cachées de l\'existence. Le défi: tu peux devenir excessivement perdu dans les illusions ou plongé dans les profondeurs psychologiques sombres. Apprendre à honorer transformation spirituelle tout en restant ancré dans la réalité matérielle.',
      'Trigone': 'Un flux merveilleux spirituellement enrichissant relie ton Neptune à ton Pluton créant une harmonie mystique transformatrice profonde. Ton imagination spirituelle alliée à ton pouvoir régénérateur crée capacité remarquable à canaliser énergies invisibles en créations concrètes palpables. Tu es un alchimiste naturel transformant matière brute en substance spirituelle raffinée. Ton intuition te guide vers transformations profondes qui guérissent ton âme et celle des autres. C\'est l\'aspect magique de visionnaires qui ont accès à mondes subtils ET pouvoir de les manifester tangiblement.',
      'Carré': 'Neptune carré Pluton crée tension intense perpétuelle entre aspirations spirituelles illusoires et nécessité inévitable destruction régénération radicale. Tu oscilles entre visions idéalistes transcendantes et compulsion transformation destructrice souterraine. Tes illusions peuvent être dissolvues subitement par puissances régénératrices souterraines qui refusent toute complaisance spirituelle vaporeuse. Cette tension difficile forge capacité remarquable à discerner illusion de réalité spirituelle profonde: tu deviens mystique authentique non débutant naïf. Ta transformation spirituelle exige sacrifices et morts symboliques répétées.',
      'Opposition': 'Neptune et Pluton dansent en opposition perpétuelle créant tension épuisante entre vision spirituelle expansive transcendante et force transformation radicale absolue non-négociable. Ton esprit aspire connexion divine ineffable universelle tandis que Pluton t\'oblige creuser profondément dans ombre psychologique interne régénération forcée. Tu oscilles vertigineusement entre extase visionnaire abandonnée et descente oblitératrice aux enfers internes. L\'une t\'élève au ciel perpétuellement; l\'autre te plonge forcément aux profondeurs abyssales. Cette dualité crée pendule spirituel/psychologique épuisant: tantôt levitation transcendante, tantôt noyade régénératrice souterraine. L\'intégration laborieuse crée sagesse spirituelle authentiquement transformée profondément: tu deviens quelqu\'un dont visions spirituelles sont forgées dans creuset souffrance psychologique profonde - faux prophète devient vrai sage amplifié par expérience abyssale.',
      'Sextile': 'Un sextile entre Neptune et Pluton crée un flux naturel magnifique puissant où imagination spirituelle s\'allie harmonieusement à pouvoir transformateur régénérateur. Capacité naturelle remarquable à accéder mondes subtils spirituels ET transformer profondément réalité physique à partir de ces visions. Tu es chamane naturel ou magicien blanc dont pensée spirituelle manifeste pouvoir réel tangible. Tes intuitions spirituelles ouvertes accès à sagesse transformatrice ancestrale oubliée que tu canalises pour guérisons profondes. Tu es alchimiste dont imagination crée résultats magiques apparents dans transformations âmes et mondes. C\'est l\'aspect des visionnaires transformateurs authentiques dont rêves changent réalité.'
    },
    'sun-mercury': {
      'Conjonction': 'Ton essence et ton intellect fusionnent: brillant et communicatif naturellement. Charisme intellectuel.',
      'Trigone': 'Harmonie entre essence et expression. Tu communiques avec autorité naturelle et sagesse.',
      'Carré': 'Tension entre ego et critique objective. Difficulté accepter remise en question. Cette friction crée humilité progressive.',
      'Opposition': 'Oscillation perpétuelle entre affirmation et analyse rationnelle. Intégration crée équilibre conviction-discernement.',
      'Sextile': 'Facilité exprimer ton authenticité avec clarté. Parole porte poids naturellement.'
    },
    'sun-venus': {
      'Conjonction': 'Ton essence et grâce vénusienne fusionnent créant charme naturel irrésistible incarné. Tu es aimable attirant magnétique car essence brille à travers harmonie grâce beauté. Ta présence crée instantanément convivialité sympathie inconsciente. Tu n\'as besoin effort séduction: c\'est naturel fluidité authentique. Le défi: tu peux perdre authenticité sous charme séducteur en devenant agréable coûte que coûte. Apprendre que vraie beauté durable vient essence sincère, pas manipulation charme superficiel.',
      'Trigone': 'Un flux harmonieux magnifique relie essence authentique à grâce vénusienne créant beauté incarnée naturelle. Tu es aimé réellement car ce qui te rend attrayant émane authenticité profonde non apprêt superficiel. Créativité artistique soutient essence: tu crées art reflétant qui tu es vraiment. Popularité genuine vient amour sincère gens ont pour ta substance alliée grâce. C\'est l\'aspect du charme authentique dont beauté durable vient rayonnement intérieur personnel.',
      'Carré': 'Ton affirmation solaire et besoin plaire vénusien entrent en conflit créant tension identité-approbation stimulante. Tu oscilles entre affirmation égoïste de qui tu es et obsession constante comment parais aux autres. Tensions relationnelles surgissent car difficulté équilibrer assertivité personnelle avec diplomatie relationnelle. Tu peux te sentir impulsif égocentrique dans relations, créant friction. Cette tension inconfortable forge cependant caractère solide au-delà charme superficiel: apprends que vraie relation vient stabilité interne, pas manipulation grâce.',
      'Opposition': 'Ton essence solaire assertive et désir relationnel vénusien dansent en opposition perpétuelle créant dualité relationnelle épuisante. Tu oscilles vertigineusement entre affirmation personnelle farouche égoïste et compromise total relationnel auto-négatrice. Tu attires mais repousses aussi par cette ambivalence: gens sentent conflit interne perpétuel entre qui tu es versus ce qu\'il faut être pour relation. Cette dualité crée confusions amoureux chroniques: tantôt tu brilles assertif repoussant partenaires; tantôt tu t\'effaces complètement perdant essence. L\'intégration laborieuse crée équilibre sain où affirmation authentique s\'allie harmonie relationnelle respectueuse.',
      'Sextile': 'Un sextile entre essence et grâce crée flux naturel merveilleux où authenticité plaît charmeusement. Grâce naturelle dans relations émane de qui tu es vraiment, non artifice. Ta chaleur authentique séduit facilement naturellement sans effort apparent. Les gens aiment ta substance alliée grâce: meilleur des deux mondes. C\'est l\'aspect du charme authentique irrésistible car beauté durable vient essence sincère rayonnant.'
    },
    'sun-uranus': {
      'Conjonction': 'Ton essence solaire et originalité uranienne fusionnent créant individualité électrique radicale impossible ignorer. Tu es rebelle visionnaire dont unique personnel s\'exprime sans compromis audacieux. Ta presence communique immédiatement: je suis différent fondamentalement et je m\'en fiche. Cette radicalité authentique inspire libération chez autres. Le défi: cette fusion crée instabilité inherente dans identité: tu changes radicalement périodiquement car essence incorpore besoin liberté absolue transformation. Apprendre que authenticité radicale peut aussi construire au lieu seulement détruire convention.',
      'Trigone': 'Un flux harmonieux magnifique relie essence authentique à originalité uranienne créant visionnaire authentiquement respecté. Ton unicité émane essence sincère, non affectation rebelle artificielle. Tu es naturellement avant-gardiste car essence demande innovation constante authentique. Ta liberté inspirante vient intégrité personnelle, pas rébellion contre éternelle. Visionnaire personnel incarne futur possible crédible car enraciné essence vivante. C\'est l\'aspect du rebelle authentique dont radicalité crée inspiration durable construction nouvelle.',
      'Carré': 'Ton ego solaire et besoin liberté uranien entrent en conflit créant tensions identité-changement stimulantes perpétuelles. Tu oscilles entre stabilité identitaire construite et besoin destruction radicale absolue perpétuelle. Affirmation égoïste de qui tu es s\'oppose constamment à pulsion uranienne balayer tout changement radical. Ces oscillations créent instabilité identitaire: qui es-tu réellement si changes constamment? Cette friction inconfortable force cependant authenticité radicale progressive: apprendre que vraie liberté vient acceptation essence mutante, pas combat constant contre soi.',
      'Opposition': 'Ton essence solaire stable assertive et besoin liberté uranien radical dansent en opposition perpétuelle créant dualité instabilité existentielle épuisante. Tu oscilles vertigineusement entre affirmation personnelle construite stable et besoin rébellion absolue contre toute stabilité. Identité oscillante incessante: une jour tu es qui prétends être; lendemain tu as tout détruit changé radicalement. Cette dualité crée confusion profonde: suis-je ma stabilité personnel ou ma liberté radicale? L\'intégration laborieuse crée liberté responsable où changement radical s\'enracine dans essence authentique plutôt que rébellion contre rien.',
      'Sextile': 'Un sextile entre essence et liberté crée harmonie naturelle magnifique où unicité authentique s\'exprime courageusement. Ton originalité émane essence sincère, pas pose artifice rebelle. Les gens respectent ta liberté car voient authenticité fondamentale se refusant compromis. Ta différence devient atout car enracinée conviction personnelle profonde. C\'est l\'aspect du visionnaire authentique dont liberté inspire car vient intégrité essence incarnée radicalement.'
    },
    'sun-neptune': {
      'Conjonction': 'Ton essence solaire et imagination neptunienne fusionnent créant aura mystérieuse charismatique magnétique irrésistible. Tu es visionnaire artiste dont essence brille spiritualité incarnée en chair. Ta présence inspire car émane quelquechose ineffable transcendant au-delà rationnel. Les gens sentent ta connexion mondes invisibles. Le défi: cette fusion brouille ligne entre authentique essence et fantasme personnel: qui es-tu vraiment versus qui imagines-tu? Apprendre discerner soi véritable des projections illusoires fantasmées.',
      'Trigone': 'Un flux harmonieux magnifique relie essence authentique à imagination spirituelle créant visionnaire incarné enraciné. Tes rêves prennent forme concrète car émane essence sincère, non delusion éthérée vague. Créativité spirituelle soutient identité: tu crées art transformateur reflétant vérité profonde mystique. Inspiration mystique vient essence vivante, pas escapisme. Ton aura mystique inspire respectueusement. C\'est l\'aspect du visionnaire enraciné dont spiritualité authentique transforme réalité.',
      'Carré': 'Ton ego solaire assertif et besoin spirituel neptunien entrent en conflit créant tension identité-mystique confusion. Tu oscilles entre affirmation claire de qui es et doute mystique dissolvant identité. Confusion identitaire menace: difficulté discerner soi véritable des fantasmes imaginaires spirituels. Tu peux te perdre mystique ou au contraire devenir excessivement rationnel rejetant vision. Cette friction inconfortable cultive cependant discernement spirituel authentique progressive: apprendre que vraie spiritualité enracine identité au lieu la dissoudre.',
      'Opposition': 'Ton essence solaire claire assertive et besoin spirituel neptunien dansent en opposition perpétuelle créant dualité brume-clarté épuisante confus. Tu oscilles vertigineusement entre affirmation personnelle lucide rationnelle et brume spirituelle douteuse dissolvante. Identité oscillante: période clarté absolue; période dissolution mystique complète. Cette dualité crée confusion profonde: qui suis-je vraiment en essence rationnel ou spirituelle mystique? L\'intégration laborieuse crée sagesse spirituelle authentiquement enracinée où mystique se manifeste clairement.',
      'Sextile': 'Un sextile entre essence et imagination crée harmonie naturelle magnifique où mystique authentique s\'exprime clairement. Ta spiritualité émane essence sincère vivante, non escapisme. Tes rêves artistiques s\'enracinent réalité: imagination fertile crée manifestations concrètes inspirantes. L\'imagination enrichit authenticité plutôt que la contrédire. C\'est l\'aspect du visionnaire authentique dont mystique enracinée transforme le monde.'
    },
    'sun-pluto': {
      'Conjonction': 'Ton essence solaire et pouvoir plutonien fusionnent créant intensité magnétique irrésistible transformatrice impressionnante. Tu es phénix incarné dont simple présence transforme mondes emotionnels gens autour. Ton essence porte pouvoir inévitable: gens sentent ta capacité régénérer destruction profonde. Tu manies pouvoir de transformation naturellement magnétiquement involontairement. Le défi: ce pouvoir inconscient peut devenir dominant abusif si insouciant. Apprendre canaliser transformation responsablement car ton essence change réalité inévitablement.',
      'Trigone': 'Un flux harmonieux magnifique relie essence authentique à pouvoir transformateur créant phénix respecté responsable. Ton charisme transformateur émane essence sincère, non manipulation froide. Tu guides transformation car essence porte autorité naturelle. Leadership charismatique change mondes: gens te suivent car reconnaissent pouvoir authentique transformateur. Ta transformation enrichit uniquement car enracinée intégrité. C\'est l\'aspect du leader transformateur authentique dont pouvoir crée régénération nouvelle.',
      'Carré': 'Ton ego solaire et pouvoir plutonien entrent en conflit créant tension pouvoir stimulante. Tu oscilles entre affirmation personnelle constructrice et besoin destruction régénératrice radicale. Luttes pouvoir répétées testent autorité personnelle: comment gouverner ce pouvoir intense? Affirmation égoïste s\'oppose constamment à pulsion transformation absolue. Cette tension inconfortable forge cependant pouvoir responsable authentique: apprendre que vraie puissance démarre intégrité personnelle, pas domination égoïste.',
      'Opposition': 'Ton essence solaire assertive créatrice et pouvoir plutonien destructeur dansent en opposition perpétuelle créant dualité intensité épuisante contradictoire. Tu oscilles vertigineusement entre affirmation personnelle constructrice stable et besoin destruction régénération radicale inévitable. Une jour es leader constructeur; lendemain destructeur régénérateur conscient inconscient. Cette dualité crée ambivalence pouvoir: conscient-je pouvoir créer détruire? L\'intégration laborieuse crée transformation responsable où destruction régénère plutôt que dévaste.',
      'Sextile': 'Un sextile entre essence et pouvoir crée harmonie naturelle magnifique où transformation authentique s\'exprime clairement. Ton pouvoir émane essence sincère vivante constructrice. Les gens acceptent ta transformation car voient intégrité fondamentale. Ton pouvoir enrichit monde au lieu le détruire. C\'est l\'aspect du transformateur authentique dont régénération vient essence incarnée responsablement puissante.'
    },
    'moon-mercury': {
      'Conjonction': 'Tes émotions et intellect fusionnent créant intelligence émotionnelle naturelle verbale. Tu communiques sentiments avec clartè intuitive impeccable touchant cœur gens directement. Tes mots portent charge émotionnelle authentique car émane vraiment sens profonds. Tu es psychologue naturel comprenant dynamiques affectives sans effort intellectuel. Le défi: tu peux parler émotions excessivement devenant bavard dramatique. Apprendre filtrer émotions et pensées avec discernement.',
      'Trigone': 'Un flux harmonieux magnifique relie émotions authentiques à pensée claire créant intelligence émotionnelle remarquable incarnée. Ta compréhension psychologie humaine émane essence sincère, non analyse froide théorique. Tu guéris verbalement car mots portent substance émotionnelle véritable. Ta communication nourrit gens car comprennent subjectivement ton empathie intellectuelle. C\'est l\'aspect du thérapeute naturel dont compréhension combine cœur et esprit.',
      'Carré': 'Ton intellect analytique critique et besoins émotionnels expéditifs entrent conflit perpétuel créant tension esprit-cœur frustrant. Tu oscilles entre besoin exprimer émotions violemment et critique impitoyable auto-destructrice tes sentiments. Penses trop tes émotions les paralyze; ou hyperactivité émotionnelle nuit pensée rationnelle équilibrée. Cette tension inconfortable forge cependant intelligence émotionnelle progressive: apprendre que vraie sagesse intègre cœur et esprit sans hiérarchie.',
      'Opposition': 'Ton monde émotionnel authentique et intellect critique dansent opposition perpétuelle créant dualité interne exhausting. Tu oscilles vertigineusement entre volcan émotionnel débordant incontrôlable et analyste glacé rejetant tous sentiments. Gens sentent cette contradiction: moment tu écoutes émotionnellement; moment tu analyses intellectuellement froidement. L\'intégration laborieuse crée dialogue interne sain où émotions informent perspective et pensée honore sentiment.',
      'Sextile': 'Un sextile entre émotions et pensée crée harmonie naturelle magnifique où intelligence émotionnelle émane spontanément. Ta communication nourrit gens car émane vrai sentiment articulé clairement intelligemment. Tu enseignes psychologie car comprends cœur humain intellectuellement. C\'est l\'aspect du thérapeute communicateur authentique dont paroles guérissent.'
    },
    'moon-saturn': {
      'Conjonction': 'Tes émotions profondes et discipline saturnienne fusionnent créant maturité précoce ancrage émotionnel. Tu ressens gravement profondément sans dramatisation légère surface. Responsabilité structure tes sentiments naturellement: émotions portent poids importants. Tu protèges sentimental intensément car comprends risques rejet abandonment. Le défi: cette maturité peut figér émotions dans restriction excessive retrait. Apprendre que vulnérabilité authentique renforce ne diminue stabilité.',
      'Trigone': 'Un flux harmonieux magnifique relie émotions authentiques à discipline saturnienne créant stabilité émotionnelle mature incarnée. Ta maturité émane essence sincère, non froide retransmission figée. Tu offres support émotionnel fiable car fondé compassion enracinée responsabilité. Tes sentiments sont des fondations solides authentiques dont gens comptent. C\'est l\'aspect du nourricier mature dont responsabilité affective crée sécurité durable.',
      'Carré': 'Tes émotions sincères et besoin contrôle saturnien entrent conflit perpétuel créant tension vulnérabilité-protection frustrante. Tu oscilles entre besoin exprimer sentiments authentiquement et peur rejet frigide retrait protecteur. Répression émotionnelle menace isolement affectif complet; ou débordement émotionnel révolté contre discipline. Cette friction inconfortable forge cependant tendresse responsable progressive: apprendre que vraie force émotionnelle vient vulnérabilité courageuse protégée maturité.',
      'Opposition': 'Ton besoin émotionnel profond et besoin distance saturnienne dansent opposition perpétuelle créant dualité attachment-isolation épuisante. Tu oscilles vertigineusement entre desir fusion émotionnelle complète sécurité tendre et besoin isolement distance froid protection. Gens sentent contradiction: moments tendres; moments froids distants. L\'intégration laborieuse crée attachement mature où proximité affective coexiste indépendance nécessaire.',
      'Sextile': 'Un sextile entre émotions et discipline crée harmonie naturelle où maturité affective émane authenticité. Ta stabilité émotionnelle inspire confiance profonde. Les gens sentent support fiable responsable dans tes sentiments. C\'est l\'aspect du nourricier responsable dont amour durable construit fondations.'
    },
    'moon-uranus': {
      'Conjonction': 'Tes émotions profondes et liberté uranienne fusionnent créant instabilité affective magnétique imprévisible. Tes sentiments changent radicalement sans prévenir car besoin liberté émotionnelle absolue. Tu refuses contrainte sentimentale émotionnelle: attachement menace essence liberté radicale. Ton aura émotionnelle attire car authentiquement changante non figée. Le défi: cette instabilité crée abandon potentiel cyclique chez aimés souffrant cycle attachment-detachment. Apprendre que liberté affective peut inclure engagement responsable loyal différent.',
      'Trigone': 'Un flux harmonieux magnifique relie émotions authentiques à liberté uranienne créant authenticité affective libre incarnée. Tes émotions émane essence sincère radicalement changeante; gens respectent cela car authentique. Tu aimes originalement: attachement non conventionnel non restrictif. Ta liberté affective inspire autonomie chez aimés au lieu dépendance. C\'est l\'aspect du partenaire libre dont amour libère plutôt que confine.',
      'Carré': 'Tes émotions profonds et besoin liberté absolu entrent conflit perpétuel créant instabilité affective frustrant. Tu oscilles entre besoin attachement intense sécurité émotionnelle et pulsion rupture radicale liberté totale. Cycles emotionnels imprévisibles: periode d\'attachement suivi instantanément rejet complet. Cette tension inconfortable force cependant attachement sain autonome progressif: apprendre que vraie liberté inclut responsabilité affective.',
      'Opposition': 'Ton besoin securité émotionnelle profonde et besoin liberté absolue dansent opposition perpétuelle créant dualité attachment-isolation épuisante. Tu oscilles vertigineusement entre fusion emotionnelle complète sécurité et isolement total liberté radicale. Gens sentent cette contradiction impossibilité: amour n\'est jamais certain avec toi. L\'intégration laborieuse crée autonomie relationnelle où liberté coexiste attachement responsable.',
      'Sextile': 'Un sextile entre émotions et liberté crée harmonie naturelle où authenticité affective émane courage. Ta liberté émotionnelle inspire autonomie saine chez aimés. Les gens respectent ton indépendance affective car voient intégrité fondamentale changeante. C\'est l\'aspect du partenaire autonome dont amour libre libère.'
    },
    'moon-neptune': {
      'Conjonction': 'Tes émotions profondes et imagination spirituelle neptunienne fusionnent créant empathie supra-normale osmotique extraordinaire. Tu absorbes sentiments gens comme buvard émotionnel absorbant complètement confusion mentale affective. Ta sensibilité est presque télépathique: tu ressens sans effort intention profonde autrui. Ta grande âme nourrit mondes invisibles émotionnel psychique. Le défi: cette fusion brouille limite claire soi-autrui risquant perte identité aux caprices émotionnels gens. Apprendre discerner propres sentiments de ressentis absorbés extérieurs.',
      'Trigone': 'Un flux harmonieux magnifique relie émotions authentiques à imagination transformatrice créant empathie incarnée guérisseuse. Ta compréhension émotionnelle émane essence sincère, non escapisme dénégateur. Tu guéris profondément car combines compréhension empathe à sagesse océanique. Tes sentiments ouverts accès mondes âmes que tu canalises guérison. C\'est l\'aspect du guérisseur émotionnel authentique dont amour transforme.',
      'Carré': 'Tes émotions authentiques et besoin fusion spirituelle neptunienne entrent conflit créant confusion affective brume. Tu oscilles entre besoin connexion émotionnelle clara consciente et dissolution complètement aux sentiments-rêves flous spirituels. Limites affectives disparaissent: difficultés séparer empathe propre de gens aimés. Cette friction inconfortable cultive cependant discernement émotionnel progressif: apprendre que vraie empathie requiert clarté frontière.',
      'Opposition': 'Ton authenticité émotionnelle et besoin fusion spirituelle dansent opposition perpétuelle créant dualité clarté-brume épuisante. Tu oscilles entre clarté émotionnelle directe consciente et dissolutions complètement spirituelle-imaginaire fusion mystique. Gens sentent instabilité: moment tu es présent; moment tu es spirituellement ailleurs. L\'intégration laborieuse crée empathie enracinée où spiritualité honore clarté affective.',
      'Sextile': 'Un sextile entre émotions et imagination crée harmonie naturelle où empathie authentique émane spiritualité. Ta sensibilité inspire guérison sans confusion limites. Les gens sentent soutien émotionnel profondément spirituel. C\'est l\'aspect du guérisseur spirituel authentique dont amour guérit.'
    },
    'moon-pluto': {
      'Conjonction': 'Tes émotions profondes et pouvoir régénérateur plutonien fusionnent créant intensité affective abyssale irrésistible magnétique. Tes sentiments portent pouvoir transformateur: gens changent profondément auprès toi. Ta présence émotionnelle crée alchimies régénération forcée chez gens autour. Attachement menace avec obsessions possessives car émotions intense dominent. Le défi: cette fusion crée mers affectives dangereuses pouvant submerger soi autrui. Apprendre canaliser intensité avec sagesse responsable non destructrice.',
      'Trigone': 'Un flux harmonieux magnifique relie émotions authentiques à pouvoir transformateur créant guérisseur émotionnel incarné puissant. Ta compréhension émotionnelle émane essence sincère transformatrice, non manipulation. Tu régénères gens émotionnellement: traversent transformations profondes ta présence. Ton intensité inspire confiance car enracinée intégrité. C\'est l\'aspect du guérisseur affectif puissant dont amour régénère.',
      'Carré': 'Tes émotions authentiques et besoin destruction-régénération plutonien entrent conflit créant tempêtes affectives destructrices. Tu oscilles entre tendresse vulnérable authentique et obsessions possessives controlantes destructrices. Intensité émotionnelle peut devenir destructrice: gens sentent menace subconsciente annihilation. Cette friction inconfortable forge cependant pouvoir affectif responsable progressif: apprendre que vraie puissance régénère au lieu détruire.',
      'Opposition': 'Ta légèreté émotionnelle surface et profondeur destructrice dansent opposition perpétuelle créant dualité lightness-abyss épuisante. Tu oscilles entre émotions faciles brèves surface et plongées abyssales intensité possession. Gens sentent instabilité: émotions semblent profondes; puis rejet complet soudain. L\'intégration laborieuse crée transformation affective enracinée où intensité crée régénération constructive.',
      'Sextile': 'Un sextile entre émotions et pouvoir crée harmonie naturelle où transformation authentique émane intensité. Ta puissance affective inspire confiance profonde respect. Les gens acceptent ton intensité car voient intégrité fondamentale. C\'est l\'aspect du guérisseur transformateur dont amour puissant régénère constructivement.'
    },
    'mercury-mars': {
      'Conjonction': 'Ton intellect rapide et action impulsive fusionnent créant communicateur percutant guerrier verbal. Tu parles vite, penses encore plus vite, agis instinctivement sans délai. Ta rhétorique porte pouvoir persuasif immédiat car émerge urgence authentique passion. Débats sont ton terrain: argumentation vive brûlante incendiaire. Le défi: cette fusion crée impulsivité verbale irréfléchie blessante. Paroles sortent avant clartè mentale. Apprendre filtrer passion intellectuelle avec sagesse discernement.',
      'Trigone': 'Un flux harmonieux magnifique relie pensée claire à action decisively créant communicateur persuasif efficace incarné. Ta rhétorique émane conviction authentique, non manipulation froide. Tu agis correctement car pensée guide action harmonieusement. Leaders naturels dont parole inspire mouvement. Ton efficacité vient intégration seamless pensée-action. C\'est l\'aspect du communicateur guerrier respecté.',
      'Carré': 'Ton intellect analytique critique et action impulsive entrent conflit perpétuel créant tensions pensée-action frustantes. Tu oscilles entre besoin analyser minutieusement paralysant action et pulsion agir avant penser complètement. Paroles impulsives blessent: agis sans réflexion suffisante. Cette friction inconfortable forge cependant actions considérées progressivement: apprendre que vraie puissance combine pensée profonde action courageuse.',
      'Opposition': 'Ta pensée rationelle lente et action impulsive dansent opposition perpétuelle créant dualité paralysie-impatience épuisante. Tu oscilles entre analyse éternelle indécision et agir irrefléchi impulsif sans réflexion. Gens sentent incohérence: moment philosophe réfléchi; moment guerrier impulsif. L\'intégration laborieuse crée action décidée basée réflexion sage.',
      'Sextile': 'Un sextile entre pensée et action crée harmonie naturelle où rhétorique soutient momentum. Ta parole inspire action effectivement. Tes idées rapidement se manifestent. C\'est l\'aspect du guerrier communicateur dont puissance combine réflexion action courageuse.'
    },
    'mercury-jupiter': {
      'Conjonction': 'Ton intellect rapide et sagesse jupitérienne fusionnent créant penseur bavard visionnaire expansif. Tu communiques généreusement partagant savoir abondamment sans réserve. Ta parole porte autorité car allie brillance mentale sagesse teintée. Tu es pédagogue naturel: enseignement captive fascine. Le défi: bavardage excessif possibilité, promesses surcommitées intenables. Parle trop, promets trop. Apprendre filtrer expansion verbale avec discernement responsable.',
      'Trigone': 'Un flux harmonieux magnifique relie pensée claire à sagesse généreuse créant mentor inspirant incarné. Ton enseignement émane conviction authentique profonde. Tu partages savoir car comprends vraiment significativement. Tes idées portent poids profondeur authentique. C\'est l\'aspect du professeur authentique dont sagesse inspire.',
      'Carré': 'Ton intellect analytique et pulsion expansion jupitérienne entrent conflit perpétuel créant tensions focus-expansion. Tu oscilles entre besoin analyser minutieusement détails et désir généraliser vaguement grand cadre. Bavardage excessif possibilité; promesses intenables. Cette friction cultive cependant discernement progressif: apprendre que vraie sagesse combine particulier universel.',
      'Opposition': 'Ta pensée minutieuse détaillée et vision expansive dansent opposition perpétuelle créant dualité détail-généralité épuisante. Tu oscilles entre pointillisme infini et généralisation vague absurde. Cette contradiction crée frustration: suis-je penseur de détail ou visionnaire expansif? L\'intégration laborieuse crée synthèse où vision honore détail.',
      'Sextile': 'Un sextile entre pensée et sagesse crée harmonie naturelle où idées inspirent généreusement. Ton enseignement combine clarté et profondeur. C\'est l\'aspect du sage communicateur dont parole inspire transformation.'
    },
    'mercury-uranus': {
      'Conjonction': 'Ton intellect rapide et innovation uranienne fusionnent créant génie mental radical révolutionnaire visionnaire. Tu penses avant époque: idées sortent structures mentales non conventionnelles étonnantes. Ta communication porte pouvoir de révolution intellectuelle. Gens trouvent tes pensées brillantes avant-gardistes radicales. Le défi: cette fusion crée imprévisibilité mentale chaotique parfois incompréhensible. Pensée saute étapes logiques directement illumination radicale. Apprendre expliquer genius avec clarté communicable.',
      'Trigone': 'Un flux harmonieux magnifique relie pensée claire à innovation uranienne créant visionnaire respecté incarné. Ton genius émane convention, non pose artificielle. Tes idées futures sont grounded en réalité actuelle. Tu es penseur révolutionnaire crédible. C\'est l\'aspect du visionnaire intellectuel authentique dont idées avancent époque.',
      'Carré': 'Ton intellect ordonné logique et pulsion innovation radicale entrent conflit perpétuel créant tensions stabilité-changement. Tu oscilles entre besoin clarté intellectuelle rationnelle et besoin destruction radicale anciennes structures mentales. Pensée imprévisible chaotique: saute logiquement sans explications. Cette friction crée cependant originalité progressive: apprendre canaliser innovation avec clarté logique.',
      'Opposition': 'Ta pensée logique ratonnelle et innovation radicale dansent opposition perpétuelle créant dualité ordre-chaos épuisante. Tu oscilles entre intellect rigide ordonné et génialité chaotique radicale. Gens sentent imprévisibilité: ta pensée saute logiquement. L\'intégration laborieuse crée génie grounded où innovation honore logique.',
      'Sextile': 'Un sextile entre pensée et innovation crée harmonie naturelle où idées révolutionnaires émergent clairement. Ton genius combine originalité clarté. C\'est l\'aspect du génie communicateur dont idées révolutionnaires inspirent.'
    },
    'mercury-neptune': {
      'Conjonction': 'Ton intellect rapide et imagination neptunienne fusionnent créant penseur poétique mystique visionnaire. Tu communiques symboliquement: mots portent meanings multiples subtiles ineffables. Ta pensée flotte entre mondes rationnels imaginaires. Communication émane essence mystique. Le défi: cette fusion crée confusion mentale brume intellectuelle. Difficultés discerner pensée claire de fantasme imaginaire. Apprendre discerner réalité de rêve intellectuellement.',
      'Trigone': 'Un flux harmonieux magnifique relie pensée claire à imagination créant penseur poétique authentiquement incarné. Ton langage émane conviction profonde mystique. Tu es écrivain artiste communicateur spirituel. Tes mots touchent âmes invisibles. C\'est l\'aspect du poète communicateur dont pensée inspire spirituellement.',
      'Carré': 'Ton intellect clair logique et imagination brouillée neptunienne entrent conflit perpétuel créant tension clarté-flou. Tu oscilles entre pensée cristalline logique rationnelle et dissolution mentale complète dans fantasme revêtement. Confusion mentale menace: difficultés discerner soi réalité. Cette friction cultive cependant discernement progressif: apprendre imaginer intelligemment.',
      'Opposition': 'Ta pensée logique rationnelle et imagination mystique dansent opposition perpétuelle créant dualité logique-rêve épuisante. Tu oscilles entre intellectuel rigoureux scientifique et rêveur complet nébuleux. Gens sentent instabilité mentale: moment pragmatique; moment idéaliste nébuleux. L\'intégration laborieuse crée pensée imaginative enracinée.',
      'Sextile': 'Un sextile entre pensée et imagination crée harmonie naturelle où créativité intellectuelle émane spiritualité. Ton langage poétique inspire profondément. C\'est l\'aspect du mystique penseur dont parole porte magie subtile.'
    },
    'mercury-pluto': {
      'Conjonction': 'Ton intellect rapide et investigation plutonienne fusionnent créant penseur insatiable perceur secrets abyssaux. Tu creuses mentalement jusqu\'à vérités cachées profonds: mots deviennent armes d\'investigation. Ta curiosité dévore mysère: tu fouilles obsessivement comprenante. Communication porte pouvoir régénération: paroles transforment consciences. Le défi: cette fusion crée obsession mentale paralysante manipulation verbale possible. Pensée devient possessive contrôlante dominatrice. Apprendre canaliser pouvoir investigateur avec sagesse responsable éthique.',
      'Trigone': 'Un flux harmonieux magnifique relie pensée claire à investigation plutonienne créant penseur puissant incarné. Ton analyse émane conviction profonde authentique. Tu découvres secrets car comprends profondément humaine psychique. Ta parole porte autorité transformatrice. C\'est l\'aspect du psychologue investigateur authentique dont sagesse guérit.',
      'Carré': 'Ton intellect curieux et pulsion investigation obsessive entrent conflit perpétuel créant tensions découverte-secret. Tu oscilles entre besoin connaître tout complètement et secret jaloux protégeant mystères. Obsession mentale menace: tu creuses compulsivement. Manipulation verbale possible: paroles blessent. Cette friction forge discernement progressif: apprendre que vraie puissance protège secrets appropriés.',
      'Opposition': 'Ta pensée superficielle légère et investigation profonde obsessive dansent opposition perpétuelle créant dualité surface-abysse épuisante. Tu oscilles entre acceptation surface apparences et obsession fouille abyssale. Cette instabilité crée confusion: combien creuser profondeur? L\'intégration laborieuse crée sagesse discernement où investigation honore secrets.',
      'Sextile': 'Un sextile entre pensée et investigation crée harmonie naturelle où curiosité pénètre effectivement secrets. Ta parole découvre profondeurs authentiquement. C\'est l\'aspect du sage investigateur dont puissance comunnique sagesse.'
    },
    'venus-mars': {
      'Conjonction': 'Ta beauté douce et passion brûlante fusionnent créant magnétisme irrésistible sexy charismatique. Tu séduis par contraste: tendresse alliée désir intense. Ton attraction est dangereusement magnétique d\'énergie sensuelle débordante. Relations deviennent passionnées mêllement rapide. Le défi: cette fusion crée intensité potentiellement destructrice. Passion devient jalousie obsessive; tendresse se transforme possessivité. Apprendre balancer passion avec tendresse authentique respectueuse.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à passion créant amant authentiquement incarné magnétique. Ton désir émane conviction sincère; tendresse porte profondeur authentique. Tu aimes passionnément sans destructivité. Attraction naturelle harmonieuse respectée. C\'est l\'aspect du séducteur authentique dont passion nourrit plutôt que dévaste.',
      'Carré': 'Ton affection tendre délicate et passion brûlante intense entrent conflit perpétuel créant tensions affection-désir. Tu oscilles entre tendre affectuosité protégeante et passion agressive dominatrice destructrice. Relations turbulentes: moment tendresse; moment passion destructrice jalousie. Cette friction forge équilibre progressif: apprendre que passion honnête peut coexister tendresse respectueuse.',
      'Opposition': 'Ta tendresse délicate et passion violente dansent opposition perpétuelle créant dualité tendresse-fureur épuisante. Tu oscilles entre amour doux cherchant sécurité et désir violent destructeur possessif. Partenaires sentent instabilité affective: moments tendres; moments froids rejet. L\'intégration laborieuse crée passion affectueuse authentique.',
      'Sextile': 'Un sextile entre beauté et passion crée harmonie naturelle où attractions s\'expriment pleinement authentiquement. Ton magnétisme émane sincérité passion contrôlée. Tu aimes profondément avec jouissance saine. C\'est l\'aspect de l\'amant passionné authentique dont désir crée connexion durable.'
    },
    'venus-jupiter': {
      'Conjonction': 'Ta beauté gracieuse et générosité expansive fusionnent créant charme débordant magnétique généreux. Tu aimes généreusement sans réserve: amour donne gracieusement abondant. Ton charme attire chanceux: bonté génère bonté retour. Tu es artiste créatif naturellement populaire. Le défi: excès affectif possibles, générosité naïve pouvant causer ennui. Trop de grâce peut créer dépendances chez aimés. Apprendre filtrer générosité avec discernement.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à générosité créant artiste créatif incarné populaire. Ta grâce émane conviction sincère expansive. Tu aimes généreusement car crois fondamentalement bonté. Populaire naturelle: gens sentent ta magnanimité. C\'est l\'aspect du charitable charmant dont générosité crée bonheur.',
      'Carré': 'Ton affection mesurée et pulsion générosité excessive entrent conflit perpétuel créant tensions modération-excès. Tu oscilles entre tendresse retenue prudente et générosité naïve irréfléchie intenable. Indulgences affectives créent problèmes: déceptions romantiques répétées. Cette friction cultive discernement progressif: apprendre que vraie générosité honore limites saines.',
      'Opposition': 'Ta retenue affective prudente et générosité débordante dansent opposition perpétuelle créant dualité restriction-expansion épuisante. Tu oscilles entre amour parsimieux jaloux et générosité excessive inconscience. Partenaires sentent instabilité: moments riches affectifs; moments vides détachés. L\'intégration laborieuse crée générosité équilibrée sage.',
      'Sextile': 'Un sextile entre beauté et générosité crée harmonie naturelle où grâce donne authentiquement généreusement. Ton charme émana bonté sincère naturelle. Tu aimes abondamment sans naïveté. C\'est l\'aspect de l\'amant généreux dont magnanimité crée bonheur durable.'
    },
    'venus-saturn': {
      'Conjonction': 'Ta beauté gracieuse et discipline saturnienne fusionnent créant élégance austère loyauté incarnée. Tu aimes sérieusement profondément: affection porte poids matériel responsabilité. Ta beauté est intemporelle car fondée substance, pas superficialité. Tu es partenaire loyal dévoué ancré. Le défi: rigidité affective possible, difficultés exprimer tendresse librement. Amour devient trop sérieux perdant joie spontanéité. Apprendre tempérer discipline affective avec tendresse authentique.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à discipline créant partenaire loyal incarné durable. Ton affection émane conviction profonde sincère. Tu aimes loyalement car comprends importance engagement responsable. Élégance intemporelle inspire respect confiance durable. C\'est l\'aspect du partenaire loyal dont amour constructif dure.',
      'Carré': 'Ton affection chaleureuse tendre et besoin discipline froide entrent conflit perpétuel créant tensions tendresse-retrait. Tu oscilles entre besoin exprimer tendresse chaleureuse et peur vulnérabilité causant retrait émotionnel figé. Difficultés exprimer amour librement: rigidité affective menace. Cette friction forge tendresse mature progressive: apprendre que vraie stabilité vient vulnérabilité courageuse.',
      'Opposition': 'Ton affection chaleureuse tendre et froideur saturnienne retraite dansent opposition perpétuelle créant dualité chaleur-glace épuisante. Tu oscilles entre moments tendres chaleureux et retraits émotionnels froids isolements. Partenaires sentent imprévisibilité affective: amour vient-il ou rejet? L\'intégration laborieuse crée affection mature stable.',
      'Sextile': 'Un sextile entre beauté et discipline crée harmonie naturelle où élégance émane stabilité affective. Ta loyauté inspire confiance profonde. Les gens reconnaissent solidité authentique ton amour. C\'est l\'aspect du partenaire loyal respecté dont beauté durable vient substance.'
    },
    'venus-uranus': {
      'Conjonction': 'Ta beauté gracieuse et liberté uranienne fusionnent créant séducteur indépendant imprévisible magnétique. Tu aimes différemment: affection non conventionnelle électrique changeante radicale. Ton attraction repose originalité authentique: tu refuses rôles traditionnels amoureux. Partenaires sentent électricité magnétique imprévisible attisante. Le défi: instabilité affective menace: attachement suivi rejet radical. Amour devient peur pour aimés causant trauma. Apprendre que liberté peut inclure engagement responsable différent.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à liberté créant amant authentiquement indépendant respecté. Ton affection émane conviction sincère radicalement changeante. Tu aimes librement: partenaires sentent autonomie requise. Magnétisme électrique inspire liberté chez aimés plutôt que dépendance. C\'est l\'aspect de l\'amant libre authentique dont amour libère.',
      'Carré': 'Ton affection tendre protégeante et pulsion liberté absolue entrent conflit perpétuel créant tensions engagement-liberté. Tu oscilles entre besoin attachement sécurité affective et peur engament causant rejet abrupt rupture. Instabilité affective répétée: relations changent radicalement sans avertissement. Cette friction forge attachement autonome progressif: apprendre que vraie liberté inclut responsabilité affective.',
      'Opposition': 'Ton besoin fusion attachement profond et besoin liberté absolue isolée dansent opposition perpétuelle créant dualité attachment-isolation épuisante. Tu oscilles entre désir fusionnel complet sécurité affective et fuite liberté radicale totale. Partenaires sentent contradiction: amour vient-il ou liberté totale partir? L\'intégration laborieuse crée autonomie relationnelle.',
      'Sextile': 'Un sextile entre beauté et liberté crée harmonie naturelle où amour authentique libère. Ton indépendance inspire autonomie saine chez aimés. Partenaires respectent ta liberté car voient intégrité fondamentale. C\'est l\'aspect du partenaire autonome dont amour libre libère.'
    },
    'venus-neptune': {
      'Conjonction': 'Ta beauté gracieuse et imagination spirituelle neptunienne fusionnent créant romantique idéaliste rêveur spiritualisé. Tu aimes idéalement: affection porte qualité ineffable magique transcendante. Ta beauté semble éthérée mystique: gens sentent dimension spirituelle ta présence. Amour devient quête âme sœur mythologique. Le défi: illusions romantiques menacent confusions affectives répétées. Tu tombes amour fantasmes au lieu réalité humaine. Apprendre discerner rêve de réalité relationnelle authentique.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à imagination créant amant idéaliste authentiquement incarné. Ton affection émane conviction sincère spirituelle. Tu aimes profondément avec sens âme sœur fondé in réalité non fantasme. Ta créativité artistique spirituelle enrichit relations. C\'est l\'aspect du romantique authentique dont amour inspire art.',
      'Carré': 'Ton affection réaliste pragmatique et besoin fusion spirituelle idéale entrent conflit créant illusions affectives. Tu oscilles entre besoin connexion spirituelle transcendante et réalité humaine décevante banale. Déceptions romantiques répétées: rêves idéalisés ne correspondent réalité partenaires bouche réelle. Cette friction cultive discernement amoureux progressif: apprendre aimer réalité non fantasme.',
      'Opposition': 'Ton affection pragmatique réelle et idéalisme spirituel dansent opposition perpétuelle créant dualité réalité-rêve épuisante. Tu oscilles entre amour réaliste bassement humain et romance spirituelle transcendante. Cette dualité crée confusion: aimes-tu réellement personne ou fantasme spirituel intérieur? L\'intégration laborieuse crée amour réaliste spirituel enraciné.',
      'Sextile': 'Un sextile entre beauté et imagination crée harmonie naturelle où romance authentique s\'enracine spiritualité. Ton affection émane sincérité spirituelle incarnée réalité. Tu aimes profondément avec vision spirituelle des relations. C\'est l\'aspect du romantique authentique dont amour spirituel ne fuit réalité.'
    },
    'venus-pluto': {
      'Conjonction': 'Ta beauté gracieuse et intensité plutonienne fusionnent créant séducteur magnétique puissant irrésistible. Tu aimes intensément: affection porte pouvoir transformateur obsessif possessif magnétique. Ton magnétisme est dangereux: gens tombent sous ton charme complètement submergés. Attachement devient obsession plutonienne: tu domines affectivement consciemment inconsciemment. Le défi: jalousie possessivité menace relations. Amour transforme contrôle destructeur inévitable. Apprendre canaliser intensité avec sagesse responsable non destructrice.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à intensité créant amant magnétique transformateur incarné. Ton affection émane conviction sincère profondement transformatrice. Tu aimes magnétiquement: partenaires transforment profondément ta présence. Ton pouvoir inspire confiance car enraciné intégrité. C\'est l\'aspect de l\'amant puissant dont intensité régénère.',
      'Carré': 'Ton affection tendre douce et pulsion domination possessive entrent conflit perpétuel créant relations turbulentes. Tu oscilles entre tendresse authentic sincère et obsession jalouse controlante destructrice. Intensité affective peut blesser: partenaires sentent menace subconsciente. Jalousie répétée: relations explosives conflictuelles. Cette friction forge amour puissant responsable progressif: apprendre que vraie puissance transforme au lieu contrôler.',
      'Opposition': 'Ton affection légère superficielle et intensité abyssale possessive dansent opposition perpétuelle créant dualité tendresse-possession épuisante. Tu oscilles entre moments tendres apparents et obsessions jalouses destructrices complètes. Partenaires sentent instabilité: amour vient-il ou possessive jalousie destructrice? L\'intégration laborieuse crée intensité affective responsable.',
      'Sextile': 'Un sextile entre beauté et intensité crée harmonie naturelle où magnétisme authentique transforme constructivement. Ton pouvoir affectif inspire confiance profonde. Gens acceptent ton intensité car voient intégrité fondamentale. C\'est l\'aspect du séducteur puissant dont amour régénère.'
    },
    'mars-jupiter': {
      'Conjonction': 'Ton action impulsive et sagesse jupitérienne fusionnent créant aventurier impétueux visionnaire courageux. Tu agis généreusement expansivament: grands projets, grands rêves réalisés avec audace. Ton action porte vision noble: tu combats causes justes généreusement. Courage naturel inspire followeurs. Le défi: action imprudente impatienxe menace: tu agis avant réflechir. Audace devient recklessness: projets échouent par manque sagesse. Apprendre filtrer audace action avec discernement responsable.',
      'Trigone': 'Un flux harmonieux magnifique relie action à sagesse créant entrepreneur inspirant incarné efficace. Ton audace émane conviction sincère généreuse. Tu agis courageusement car comprends vision noble réalité. Grands projets réussissent car fondés sagesse actionnable. C\'est l\'aspect du guerrier visionnaire dont action crée grand bien.',
      'Carré': 'Ton action prudente et pulsion audace imprudente entrent conflit perpétuel créant tensions caution-impulsivité. Tu oscilles entre zèle excessif imprudent recklessness et prudence paralysante doute constant. Action imprudente possibilité: projets échouent par impatience. Cette friction forge courage sagesse progressif: apprendre que vraie audace combine vision sagesse.',
      'Opposition': 'Ton action agressive imprudente et sagesse prudente retraite dansent opposition perpétuelle créant dualité audace-prudence épuisante. Tu oscilles entre recklessness audacieuse folle et prudence paralysante indécision. Partenaires sentent instabilité: agis-tu courageusement ou retraite prudent? L\'intégration laborieuse crée action courageuse responsable.',
      'Sextile': 'Un sextile entre action et sagesse crée harmonie naturelle où audace soutient vision noble. Ton action inspire courageusement. Projets reussissent car fondés sagesse authentique. C\'est l\'aspect du guerrier visionnaire dont action crée bien élevé.'
    },
    'mars-saturn': {
      'Conjonction': 'Ton action impulsive et discipline saturnienne fusionnent créant guerrier stratègue discipliné calculé. Tu agis lentement sûrement: impatience tempérée par prudence stratégique. Ton courage se manifeste à travers persistance inébranlable déterminacion. Tu construis solidement: projets durables enracinés réalité. Le défi: frustration interne menace: action entravée barrières obstacles constants. Impatience/discipline crée tension interne perpétuelle. Apprendre que vraie force vient discipline alliée action courageuse.',
      'Trigone': 'Un flux harmonieux magnifique relie action à discipline créant guerrier stratègue incarné efficace. Ton action émane conviction sincère déterminée. Tu accomplis lentement solidement car comprends importance construction durable. Persévérance inspire respect confiance. C\'est l\'aspect du guerrier stratègue dont action durable construit.',
      'Carré': 'Ton action impulsive rapide et besoin discipline froide entrent conflit perpétuel créant tensions impatience-retenue. Tu oscilles entre besoin agir rapidement déterminition et peur risque causant inaction figée paralysante. Frustration répétée: action entravée barrières. Cette friction forge volonté de acier progressif: apprendre que vraie force combine discipline action.',
      'Opposition': 'Ton action folle impulsive et discipline rigide retraite dansent opposition perpétuelle créant dualité action-inhibition épuisante. Tu oscilles entre recklessness audacieuse folle et inhibition totale paralysante complète. Cette dualité crée frustration: suis-je guerrier courageux ou prisonnier discipline? L\'intégration laborieuse crée action puissante responsable.',
      'Sextile': 'Un sextile entre action et discipline crée harmonie naturelle où effort structure momentum. Ta persévérance inspire respect. Constructions durable incarnent puissance. C\'est l\'aspect du guerrier stratègue dont action durable crée solidité.'
    },
    'mars-uranus': {
      'Conjonction': 'Ton action impulsive et liberté uranienne fusionnent créant rebelle radical imprévisible révolutionnaire destructeur. Tu agis sans avertissement: action porte électricité radicale disruptive. Ton énergie libère et détruit conventions créant chaos régénérateur. Révolution est ton terrain naturel: tu es agitateur provocateur audacieux. Le défi: cette fusion crée impulsivité destructrice dangereuse. Action devient violence chaotique anarchique. Apprendre canaliser énergie révolutionnaire avec responsabilité constructive.',
      'Trigone': 'Un flux harmonieux magnifique relie action à liberté créant rebelle créateur incarné inspirant. Ton action révolutionnaire émane conviction sincère constructive. Tu libères par action car comprends vision future possible. Changement constructif émane ta présence magnétique. C\'est l\'aspect du guerrier révolutionnaire authentique dont action libère.',
      'Carré': 'Ton action mesurée ordonnée et pulsion liberté chaotique entrent conflit perpétuel créant tensions ordre-chaos. Tu oscilles entre besoin structure ordonnée logique et besoin détruire tout radicalement. Impulsivité destructrice menace: action chaotique crée destruction involontaire. Cette friction crée liberté responsable progressive: apprendre que révolution construit au lieu seulement détruire.',
      'Opposition': 'Ton action ordonnée rigoureuse et liberté chaotique dansent opposition perpétuelle créant dualité stabilité-chaos épuisante. Tu oscilles entre rigidité action contrôlée soigneuse et chaos radical impulsif imprévisible. Partenaires sentent instabilité: action stable ou destruction chaotique? L\'intégration laborieuse crée liberté canalisée constructive.',
      'Sextile': 'Un sextile entre action et liberté crée harmonie naturelle où révolution actionne constructivement. Ton action libère inspirante. Changement constructif émane naturellement momentum. C\'est l\'aspect du guerrier libérateur dont action constructive révolutionne.'
    },
    'mars-neptune': {
      'Conjonction': 'Ton action impulsive et imagination neptunienne fusionnent créant croisade visionnaire passionnée spirituelle. Tu combats causes idéalistes: action porte passion spirituelle transcendante. Ton ardeur inspire mouvements spirituels idéalistes. Tu es guerrier visionnaire rêveur inspirant. Le défi: cette fusion crée action floue dispersée. Vision idéaliste supplante pragmatisme: projets échouent par manque concretitude. Apprendre canaliser passion avec réalité tangible practicité.',
      'Trigone': 'Un flux harmonieux magnifique relie action à imagination créant guerrier visionnaire incarné effectif. Ton action émane conviction sincère spirituelle. Tu manifestes rêves par action coordonnée. Passion spirituelle actionne constructivement réalité. C\'est l\'aspect du guerrier visionnaire authentique dont action incarne vision.',
      'Carré': 'Ton action concrète pratique et vision idéale floue entrent conflit perpétuel créant tensions pragmatisme-idéalisme. Tu oscilles entre besoin action décisive concrète et rêve idéaliste vague incohérent. Action floue dispersée menace: projets manquent focus et direction claire. Cette friction cultive action spirituelle enracinée progressive: apprendre que vision nécessite pragmatisme exécution.',
      'Opposition': 'Ton action concrète décisive et imagination floue irréaliste dansent opposition perpétuelle créant dualité pragmatisme-rêve épuisante. Tu oscilles entre guerrier pratique brutal et rêveur idéaliste nébuleux. Partenaires sentent incohérence: action porte vision spirituelle claire ou pure impulsion pratique? L\'intégration laborieuse crée action spirituelle ancrée.',
      'Sextile': 'Un sextile entre action et imagination crée harmonie naturelle où vision actionne manière inspirante. Ton action manifeste rêves. Vision spirituelle guide momentum constructif. C\'est l\'aspect du guerrier visionnaire dont action incarne spiritualité.'
    },
    'mars-pluto': {
      'Conjonction': 'Ton action impulsive et pouvoir plutonien fusionnent créant guerrier transformateur puissant régénérateur destructeur. Ton action porte pouvoir de régénération intense: gens transforment profondément auprès toi. Tu es présentateur de mort naissances: action détruit pour reconstruire. Ta présence incite transformation forcée. Le défi: agressivité destructrice menace domination violente. Pouvoir devient malveisance: action détruit sans reconstruire. Apprendre canaliser intensité transformation avec sagesse responsable.',
      'Trigone': 'Un flux harmonieux magnifique relie action à pouvoir créant guerrier transformateur incarné respecté. Ton action émane conviction sincère transformatrice. Tu manifestes régénération car comprends sagesse destruction créatrice. Ta puissance inspire confiance car enracinée intégrité. C\'est l\'aspect du guerrier transformateur authentique dont action régénère.',
      'Carré': 'Ton action constructrice créative et pulsion destruction radicale entrent conflit perpétuel créant tensions construction-destruction. Tu oscilles entre besoin créer solidement construire et besoin détruire radicalement régénérer. Agressivité destructrice menace: action devient violence domination. Cette friction forge action transformatrice responsable progressive: apprendre que régénération construit uniquement.',
      'Opposition': 'Ton action créatrice constructrice et destruction radicale dansent opposition perpétuelle créant dualité création-destruction épuisante. Tu oscilles entre guerrier constructeur solidaire et destructeur régénérateur radical. Partenaires sentent instabilité: action crée-t-elle ou détruit-elle réalité? L\'intégration laborieuse crée transformation responsable constructive.',
      'Sextile': 'Un sextile entre action et pouvoir crée harmonie naturelle où transformation active constructivement. Ton action transforme profondément. Régénération crée fondations nouvelles. C\'est l\'aspect du guerrier transformateur dont action crée renaissance.'
    },
    'jupiter-mercury': {
      'Conjonction': 'Ta sagesse expansive et intellect rapide fusionnent créant philosophe communicateur expansif savant. Tu penses généreusement: idées portent amplitude vision nobles. Ta parole enseigne sagesse combien intelligence vivace. Tu es pédagogue naturel inspirant audiences vaste. Le défi: bavardage excessif menace: parle trop promets trop. Pensée devient superficiellement générale dispersée. Apprendre filtrer expansion verbale avec nuance intellectuelle.',
      'Trigone': 'Un flux harmonieux magnifique relie sagesse à pensée créant mentor inspirant incarn possédé. Ton enseignement émane conviction profonde authentique. Tu partages sagesse intelligemment car comprends nuances subtiles. Tes idées portent poids substance inspirante. C\'est l\'aspect du professeur authentique dont sagesse inspire.',
      'Carré': 'Ton intellect minutieux détaillé et sagesse généreuse expansive entrent conflit perpétuel créant tensions focus-amplitude. Tu oscilles entre besoin analyser details infiniment et désir dégénéraliser. Bavardage superficiel menace: pensée devient trop vague diluée. Cette friction crée discernement progressif: apprendre que sagesse honore details.',
      'Opposition': 'Ta pensée minutieuse détaillée et vision générale expansive dansent opposition perpétuelle créant dualité microsc-macro épuisante. Tu oscilles entre expert details pointilleux et visionnaire généraliste. Cette instabilité crée confusion: suis-je historien détail ou visionnaire expansion? L\'intégration laborieuse crée synthèse où vision honore detail.',
      'Sextile': 'Un sextile entre sagesse et pensée crée harmonie naturelle où idées inspirent clairement. Ton enseignement combine profondeur amplitude. C\'est l\'aspect du sage communicateur dont parole inspire transformation sage.'
    },
    'jupiter-venus': {
      'Conjonction': 'Ta sagesse généreuse et beauté gracieuse fusionnent créant artiste créateur sage bienveillant. Tu aimes magnanimement: affection donne généreusement abondante. Ta créativité émane sagesse: art porte profondeur philosophique. Tu es artiste compassionnel inspirant audiences. Le défi: excès affectifs indulgences créent problèmes. Générosité naïve cause dépendances. Apprendre que vraie générosité honore limites responsables.',
      'Trigone': 'Un flux harmonieux magnifique relie sagesse à beauté créant artiste sage incarné populaire. Ta créativité émana conviction sincère généreuse. Tu aimes profondément car comprends sagesse affective durable. Popularité genuine: gens sentent bienveillance authentique. C\'est l\'aspect du sage créatif authentique dont art inspire transformation.',
      'Carré': 'Ton affection retenue prudente et pulsion générosité excessive entrent conflit perpétuel créant tensions discrétion-indulgence. Tu oscilles entre besoin modération affective prudente et excès indulgence naïve. Indulgences répétées: fondation affective menace. Cette friction cultive discernement affectif progressif: apprendre que générosité authentique honore limites.',
      'Opposition': 'Ton affection parsimieuse restrictive et générosité débordante dansent opposition perpétuelle créant dualité restriction-indulgence épuisante. Tu oscilles entre retenue jalouse avare et indulgence inconscience excessif. Partenaires sentent instabilité: amour affichant restriction ou générosité sans mesure? L\'intégration laborieuse crée générosité équilibrée sage.',
      'Sextile': 'Un sextile entre sagesse et beauté crée harmonie naturelle où générosité authentique émane gracieusement. Ta bienveillance inspire naturellement. Art créatif émana sagesse. C\'est l\'aspect de l\'artiste sage dont création inspire profondément.'
    },
    'jupiter-uranus': {
      'Conjonction': 'Ta sagesse généreuse et liberté uranienne fusionnent créant visionnaire radical révolutionnaire audacieux. Tu penses grandes visions futures radicales: croyance en possibilités infinies futures. Ton optimisme inspire révolution construction: gens croient avenir meilleur. Tu es réformateur charismatique changeant époque. Le défi: utopisme naïf possible: tu rêves impossiblités impratiques. Révolution demeure théorique sans manifestation concrète. Apprendre réaliser visions radicales avec pragmatisme responsable.',
      'Trigone': 'Un flux harmonieux magnifique relie sagesse à liberté créant visionnaire pragmatique incarné inspirant. Ta vision émana conviction sincère révolutionnaire constructive. Tu manifestes changement car comprends réalisme nécessaire vision. Réforme constructive inspire confiance respect. C\'est l\'aspect du réformateur authentique dont vision crée changement durable.',
      'Carré': 'Ta sagesse prudente conservatrice et pulsion innovation radicale entrent conflit perpétuel créant tensions tradition-révolution. Tu oscilles entre besoin préserver sagesse établie et besoin détruire radicalement tout. Utopisme naïf menace: révolution demeure irréaliste théorique. Cette friction crée vision réaliste progressive: apprendre que changement authentique honore sagesse antérieure.',
      'Opposition': 'Ta sagesse traditionaliste conservative et innovation radicale dansent opposition perpétuelle créant dualité conservation-révolution épuisante. Tu oscilles entre sage conservateur et visionnaire révolutionnaire radical incompatible. Cette dualité crée confusion: que croiras-tu vraiment intérieurement? L\'intégration laborieuse crée réforme sage progressive.',
      'Sextile': 'Un sextile entre sagesse et liberté crée harmonie naturelle où vision inspire liberté constructivement. Ton optimisme incite changement. Révolution constructive émana sagesse. C\'est l\'aspect du visionnaire réformateur dont changement crée bien durable.'
    },
    'jupiter-neptune': {
      'Conjonction': 'Ta sagesse généreuse et imagination spirituelle neptunienne fusionnent créant mysticisme visionnaire inspiré profond. Tu croiras spirituellement généreusement: foi donne abondamment universelment transcendante. Ta vision émane sagesse spirituelle: spiritualité porte profondeur philosophique. Tu es mentor spirituel inspirant quête transcendance. Le défi: illusions spirituelles escapisme naïf menacent délusions spirituelles. Foi devient refus réalité. Apprendre discerner spiritualité authentique des illusions éthérées.',
      'Trigone': 'Un flux harmonieux magnifique relie sagesse à spiritualité créant sage spirituel incarné respectable. Ta foi émana conviction sincère spirituelle. Tu guides quête transcendance car comprends profondeur mystique authentique. Spiritualité incarnée inspire confiance. C\'est l\'aspect du sage spirituel authentique dont vision transforme spirituellement.',
      'Carré': 'Ta sagesse pragmatique et pulsion spiritualité idéalisée entrent conflit perpétuel créant tensions pragmatisme-mystique. Tu oscilles entre besoin réalité concrète terre-à-terre et rêve spirituel transcendant. Illusions spirituelles menacent: foi devient irréaliste. Cette friction cultive discernement spirituel progressif: apprendre que spiritualité authentique honore réalité.',
      'Opposition': 'Ta sagesse pragmatique terre-à-terre et vision spirituelle idéalisée dansent opposition perpétuelle créant dualité matérialisme-mysticisme épuisante. Tu oscilles entre réaliste pragmatique et mystique idéaliste nébuleux. Cette dualité crée confusion: que croiras-tu vraiment matériellement ou spirituellement? L\'intégration laborieuse crée sagesse spirituelle ancrée.',
      'Sextile': 'Un sextile entre sagesse et imagination crée harmonie naturelle où vision spirituelle inspire sagacement. Ta foi guide réalité. Spiritualité émana sagesse. C\'est l\'aspect du mystique sage dont vision spirituelle transforme.'
    },
    'jupiter-pluto': {
      'Conjonction': 'Ta sagesse généreuse et pouvoir plutonien fusionnent créant guide transformateur puissant sage extraordinaire. Tu crois généreusement transformation: foi porte pouvoir régénération profondes mondes entiers. Ta sagesse transforme charismatiquement: gens suivent car voient vérité profonde mystique. Tu suscites renaissances spirituelles epochales. Le défi: mégalomanie menace: tu te crois messie sauveur absolu. Domination spirituelle: tu contrôles esprits disciples. Apprendre que sagesse véritable libère plutôt que controllerait.',
      'Trigone': 'Un flux harmonieux magnifique relie sagesse à pouvoir créant guide transformateur incarné profondément respecté. Ta sagesse émana conviction sincère transformatrice authentique. Tu guides transformations profondes effectivement car comprends sagesse régénération. Ton leadership inspire dignité profonde. C\'est l\'aspect du sage guide transformateur dont sagesse régénère authentiquement.',
      'Carré': 'Ta sagesse généreuse et pulsion domination plutonienne entrent conflit perpétuel créant tensions générosité-contrôle. Tu oscilles entre besoin partager sagesse généreusement et besoin controllerait disciples possessivement. Mégalomanie possible: tu poses messie spirituel. Cette friction crée sagesse responsable progressive: apprendre que vraie sagesse libère disciples.',
      'Opposition': 'Ta sagesse généreuse expansive et pouvoir destructeur dominateur dansent opposition perpétuelle créant dualité générosité-domination épuisante. Tu oscilles entre sage généreux bienveillant et maître controllerait manipulateur destructeur. Cette dualité crée confusion: es-tu vraiment guide ou prédateur spirituel? L\'intégration laborieuse crée sagesse puissante responsable.',
      'Sextile': 'Un sextile entre sagesse et pouvoir crée harmonie naturelle où guidance transforme profondément respectueusement. Ta sagesse inspire transformation authentique. Leadership émana intégrité. C\'est l\'aspect du guide sage puissant dont leadership régénère.'
    },
    'saturn-mercury': {
      'Conjonction': 'Ta discipline saturnienne et intellect rapide fusionnent créant penseur rigoureux analytique structuré. Tu penses lentement cautieusement: chaque idée pesée scrupuleusement critique. Ton intellect est fondation solide: concepts enracinés réalité. Tu es philosophe pragmatique respecté profondement. Le défi: blocages mentaux pessimisme analyt menacent: pensée devient trop critique paralysante. Idées figées manquent imagination créative. Apprendre que discipline honore aussi innovation creative.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à pensée créant penseur sage incarné  respecté mentor. Ton intellect émana conviction sincère profonde. Tu enseignes sagesse pratique car comprends profondeur authentique. Ta clarté mentale inspire confiance. C\'est l\'aspect du mentor sage dont enseignement enracine sagesse.',
      'Carré': 'Ta pensée rapide curieuse et besoin discipline mentale rigide entrent conflit perpétuel créant tensions volubilité-silence. Tu oscilles entre besoin explorer intellectuellement librement et besoin inhibition cautieuse silence. Blocages mentaux menacent: pensée ralentit figée. Cette friction crée clarté mentale progressive: apprendre que discipline cogn suit innovation.',
      'Opposition': 'Ta pensée rapide impulsive et discipline mentale retraite dansent opposition perpétuelle créant dualité chatter-silence épuisante. Tu oscilles entre bavardage impulsif rapide et taciturnité figée silence complet. Cette dualité crée confusion: suis-je penseur communicatif ou philosophe retiré silencieux? L\'intégration laborieuse crée pensée disciplinée vivante.',
      'Sextile': 'Un sextile entre discipline et pensée crée harmonie naturelle où sagesse émerge réflexion. Ton intellect inspire respect. Pensée structure solidité. C\'est l\'aspect du sage dont pensée enracine profondeur.'
    },
    'saturn-venus': {
      'Conjonction': 'Ta discipline saturnienne et beauté gracieuse fusionnent créant séducteur loyal sérieux magnétique durable. Tu aimes avec responsabilité sérieuse: affection porte poids engagement inévitable. Ta beauté est intemporelle profonde: élégance vient maturité sagesse. Tu es partenaire loyalty incarnée ancré solidement. Le défi: rigidité affective froideur menacent: difficultés exprimer tendresse spontanéement. Amour devient trop sérieux manquant joie. Apprendre que discipline honore aussi tendresse spontanée joyeuse.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à beauté créant amant loyal incarné respecté durable. Ton affection émana conviction sincère profonde sérieuse. Tu aimes solidement car comprends importance engagement durable. Élégance intemporelle inspire respect confiance. C\'est l\'aspect du partenaire loyal authentique dont amour construit fondations.',
      'Carré': 'Ton affection chaleureuse et besoin distance saturnienne froide entrent conflit perpétuel créant tensions chaleur-froideur. Tu oscilles entre besoin exprimer tendresse chaleureuse spontanée et peur vulnérabilité causant retrait froid. Difficultés affections menacent: amour devient trop stern austère. Cette friction crée tendresse mature progressive: apprendre que discipline protège, non tue, affection.',
      'Opposition': 'Ton affection chaleureuse expressive et froideur saturnienne retraitée dansent opposition perpétuelle créant dualité chaleur-glace épuisante. Tu oscilles entre moments d\'affection chaleureuse tendres et retraits glacés emotionnel total. Partenaires sentent instabilité: amour vient-il ou rejet froid glacé? L\'intégration laborieuse crée affection stable constante.',
      'Sextile': 'Un sextile entre discipline et beauté crée harmonie naturelle où élégance respire solidité. Ta loyauté inspire confiance. Beauté émana maturité sagesse. C\'est l\'aspect du partenaire loyal dont amour durable construit.'
    },
    'saturn-mars': {
      'Conjonction': 'Ta discipline saturnienne et action impulsive fusionnent créant guerrier stratègue discipliné calculé constructeur. Tu agis lentement sûrement: impulsion tempérée par sagesse stratégique prudence. Ton courage se manifeste persévérance inébranlable: projets de durabilité construits. Tu es stratège martial respecté. Le défi: frustration menace: action devient entravée barrières obstacles constants. Impatience/discipline crée tension interne. Apprendre que vraie force combine discipline action courageuse.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à action créant guerrier stratègue incarné effectif. Ton action émana conviction sincère déterminée constructive. Tu accomplis lentement solidement. Persévérance inspire respect. C\'est l\'aspect du guerrier stratègue dont action durable construit fondations solides.',
      'Carré': 'Ton action rapide impulsive et besoin discipline froide entrent conflit perpétuel créant tensions impatience-retenue. Tu oscilles entre besoin agir rapidement et peur risque causant inaction figée paralysante. Frustration répétée: action entravée barrières. Cette friction forge volonté progressive: apprendre que force combine discipline action.',
      'Opposition': 'Ton action impulsive déterminée et discipline retraite rigide dansent opposition perpétuelle créant dualité action-inhibition épuisante. Tu oscilles entre guerrier fougueux courageux et prisonnier discipline paralysé. Cette dualité crée frustration: suis-je guerrier courageux ou esclave discipline? L\'intégration laborieuse crée action responsable.',
      'Sextile': 'Un sextile entre discipline et action crée harmonie naturelle où effort structure momentum. Ta persévérance inspire. Construction durable incarnée puissance. C\'est l\'aspect du guerrier stratègue dont action crée solidité durable.'
    },
    'saturn-jupiter': {
        'Conjonction': 'Ta discipline saturnienne et sagesse jupitérienne fusionnent créant philosophe pragmatique prudent structuré. Tu penses profondément sagesse tempérée prudence: idées grandees fondées réalité. Ta foi s\'enracine pratique solidement. Tu es philosophe pragmatique dont sagesse bâtit fondations. Le défi: limitation menace: expansion jupitérienne devient entravée par restriction saturnienne. Pessimisme versus optimisme crée tension constant. Apprendre que vraie sagesse honore limitation dans générosité.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à sagesse créant philosophe pragmatique incarné respecté. Ta sagesse émana conviction sincère profonde pratique. Tu manifestes idées graandes car comprends structure nécessaire réalité. Expansionis fondées solidité inspire confiance. C\'est l\'aspect du sage pragmatique dont vision construit durable.',
      'Carré': 'Ta sagesse généreuse expans et besoin discipline restrictive entrent conflit perpétuel créant tensions expansion-limite. Tu oscilles entre croyance illimitée généreuse et peur risque causant retraite pessimiste. Limitation menace: vision devient trop restreinte conventional. Cette friction crée équilibre progressif: apprendre vraie sagesse honore structure.',
      'Opposition': 'Ta sagesse généreuse expansive et prudence saturnienne restrictive dansent opposition perpétuelle créant dualité expansion-contraction épuisante. Tu oscilles entre optimisme exubérant généreux et pessimisme froid restreint. Cette dualité crée confusion: que crois-tu vraiment expansion illimitée ou caution pessimiste? L\'intégration laborieuse crée sagesse équilibrée.',
      'Sextile': 'Un sextile entre discipline et sagesse crée harmonie naturelle où vision émane pratique. Ton optimisme inspire action fondée réalité. Sagesse constructe mentor incarné. C\'est l\'aspect du sage pragmatique dont vision crée bien durable.'
    },
    'saturn-uranus': {
      'Conjonction': 'Ta discipline saturnienne et liberté uranienne fusionnent créant rebelle structuré pragmatique révolution pratique. Tu réformes lentement solidement: changement s\'enracine nouveau structure solide. Ta liberté enracinée pratique: révolution constructive édifiable. Tu es réformateur pragmatique dont changement dure. Le défi: rigidité menace: liberté devient entravée discipline excessive. Rébellion bloquée par caution menace. Apprendre que révolution authentique honore structure solidité nouvelle.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à liberté créant réformateur pragmatique incarné respecté. Ton changement émana conviction sincère constructive réformiste. Tu manifestes liberté car comprends structure nécessaire fondation nouvelle. Révolution durable inspire confiance. C\'est l\'aspect du réformateur pragmatique dont changement construit durable.',
      'Carré': 'Ta liberté radicale impulsive et besoin discipline rigide entrent conflit perpétuel créant tensions rébellion-rigidité. Tu oscilles entre besoin détruire radicalement tout et peur changement causant inaction. Rigidité menace: liberté devient entravée. Cette friction crée liberté responsable progressive: apprendre que révolution honore fondations solides.',
      'Opposition': 'Ta liberté radicale révolution et discipline traditionaliste dansent opposition perpétuelle créant dualité chaos-ordre épuisante. Tu oscilles entre révolutionnaire radical imprévisible et conservateur rigide traditionnel. Cette dualité crée confusion: es-tu rebelle ou conformiste tradition? L\'intégration laborieuse crée réforme progressive sage.',
      'Sextile': 'Un sextile entre discipline et liberté crée harmonie naturelle où changement actionne solidement. Ta liberté inspire construction. Révolution émana sagesse structure. C\'est l\'aspect du réformateur dont changement crée fondation nouvelle.'
    },
    'saturn-neptune': {
      'Conjonction': 'Ta discipline saturnienne et imagination spirituelle neptunienne fusionnent créant mystique ancré pragmatique enraciné. Tu crois spirituellement disciplinément: foi s\'enracine réalité pratique concrète. Ta spiritualité constructe solidement: rêves deviennent réalité tangible manifeste. Tu es sage spirituel pragmatique dont rêves se manifestent. Le défi: limitation menace: vision spirituelle devient trop restreinte practice-bound. Spiritualité figée dans formalisme mort. Apprendre que vraie spiritualité honore aussi transcendance imagination.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à imagination créant spiritual pragmatique incarné respecté. Ta spiritualité émana conviction sincère ancrée pratique. Tu manifestes rêves car comprends structure réalité nécessaire. Rêves concretisés inspirent confiance. C\'est l\'aspect du sage spirituel pragmatique dont vision manifeste solidité.',
      'Carré': 'Ta vision spirituelle transcendante et besoin réalité pratique rigide entrent conflit perpétuel créant tensions infini-fini. Tu oscilles entre besoin transcendance spirituelle et peur imprévisible causant retraite conformiste. Limitation menace: spiritualité devient figée conforative. Cette friction cultive discernement spirituel progressif: apprendre que vraie spiritualité honore réalité.',
      'Opposition': 'Ta vision spirituelle idéale transcendante et rationalité pratique frigide dansent opposition perpétuelle créant dualité illusion-réalité épuisante. Tu oscilles entre mystique idéaliste transcendant et matérialiste pragmatique terre-à-terre. Cette dualité crée confusion: que croiras-tu vraiment spiritualité ou matérialité pratique? L\'intégration laborieuse crée spiritualité enracinée.',
      'Sextile': 'Un sextile entre discipline et imagination crée harmonie naturelle où spiritualité s\'enracine pratique. Ta foi inspire manifestation réelle. Rêmes deviennent réalité solidement. C\'est l\'aspect du sage spirituel dont vision manifeste rêves.'
    },
    'saturn-pluto': {
      'Conjonction': 'Ta discipline saturnienne et pouvoir plutonien fusionnent créant alchimiste puissant structuré architecturé régénérateur. Tu transformes lentement solidement: régénération s\'enracine nouvelle foundation durable. Ton pouvoir est architecte ruines vers renaissance sagesse. Tu es guide transformateur pragmatique dont pouvoir dure. Le défi: obsession menace: pouvoir devient contrôle possessif destructeur. Transformation figée domination mortifère. Apprendre que vraie transformation libère plutôt qu\'asservit.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à pouvoir créant alchimiste stratègue incarné repsecté. Ta transformation émana conviction sincère constructive régénératrice. Tu guides changement car comprends sagesse structure nouvelle necessaire. Transformation durable inspire confiance. C\'est l\'aspect de l\'alchimiste stratègue dont pouvoir transforme constructivement.',
      'Carré': 'Ton pouvoir destructeur intense et besoin structure rigide entrent conflit perpétuel créant tensions chaos-contrôle. Tu oscilles entre besoin détruire radicalement et peur destruction causant rigidité figée. Obsession menace: pouvoir devient domination frigide. Cette friction forge transformation responsable progressive: apprendre que régénération honore structure édification.',
      'Opposition': 'Ton pouvoir destructeur radical et discipline rigide constructive dansent opposition perpétuelle créant dualité annihilation-preservation épuisante. Tu oscilles entre destructeur régénérateur radical et conservateur rigide gelé préservateur. Cette dualité crée confusion: construis-tu ou détruis-tu réalité? L\'intégration laborieuse crée transformation constructive wise.',
      'Sextile': 'Un sextile entre discipline et pouvoir crée harmonie naturelle où transformation actionne solidement. Ta puissance inspire confiance. Régénération construit fondations nove. C\'est l\'aspect de l\'alchimiste dont transformation crée renaissance.'
    },
    'uranus-sun': {
      'Conjonction': 'Ton essence solaire et liberté uranienne fusionnent créant rebelle visionnaire radical unique absolument incarné. Ton identité demande liberté expression radicale authentique courageux. Tu refuses conventions sociales: essence demande originalité absolue. Ta présence communique immédiatement: je suis profondément différent et assumé. Cette radicalité authentique inspire libération chez autres. Le défi: instabilité identitaire menace car essence incorpore besoin mutation permanente. Apprendre que vraie liberté enracine essence plutôt la dissout.',
      'Trigone': 'Un flux harmonieux magnifique relie essence authentique à liberté uranienne créant visionnaire authentiquement respecté incarné. Ta radicalité émane conviction sincère enracinée. Tu es naturellement avant-gardiste car essence demande innovation authentique. Ta liberté inspire respect car enracinée intégrité personnelle profonde. Visionnaire incarné crédible. C\'est l\'aspect du rebelle authentique dont originalité crée inspiration durable.',
      'Carré': 'Ton ego solaire assertif et besoin liberté absolue entrent conflit perpétuel créant tensions identité-changement stimulantes. Tu oscilles entre stabilité identitaire construite et besoin destruction radicale absolue. Affirmation personnelle oppose constamment pulsion uranienne balayer tout radicalement. Cette instabilité menace: qui es-tu réellement si changes constamment? Cette friction force authenticité radicale progressive: apprendre que vraie liberté vient acceptation essence mutante.',
      'Opposition': 'Ton essence solaire stable assertive et liberté uranienne radical dansent opposition perpétuelle créant dualité instabilité existentielle épuisante. Tu oscilles entre affirmation personnelle construite stable et besoin rébellion absolue destruction radicale. Une jour es qui prétends; lendemain tout détruit changé. Cette dualité crée confusion: suis-je essence stable ou essence radicalement libre? L\'intégration laborieuse crée liberté responsable enracinée essence.',
      'Sextile': 'Un sextile entre essence et liberté crée harmonie naturelle magnifique où unicité authentique s\'exprime courageusement. Ton originalité émana essence sincère, pas pose rebelle artificielle. Gens respectent ta liberté car voient authenticité fondamentale. Ta différence devient atout car enracinée conviction personnelle. C\'est l\'aspect du visionnaire authentique dont liberté inspire durablement.'
    },
    'uranus-moon': {
      'Conjonction': 'Tes émotions profondes et liberté uranienne fusionnent créant instabilité affective magnétique radicale imprévisible. Tes sentiments changent radicalement sans prévenir: besoin liberté émotionnelle absolue dominante. Tu refuses contrainte sentimentale: attachement menace essence liberté. Ton aura émotionnelle attire car authentiquement changante non figée. Le défi: instabilité causant abandon potentiel cyclique chez aimés. Attachement-rejet cycles traumatisants. Apprendre que liberté authentique peut inclure engagement responsable différent.',
      'Trigone': 'Un flux harmonieux magnifique relie émotions authentiques à liberté uranienne créant authenticité affective libre incarnée. Tes émotions émana essence sincère radicalement changeante; gens respectent cela. Tu aimes originalement: attachement non conventionnel libérateur autonomisant. Ta liberté affective inspire autonomie chez aimés. C\'est l\'aspect du partenaire libre authentique dont amour autonomise.',
      'Carré': 'Tes émotions authentiques et besoin liberté absolu entrent conflit perpétuel créant instabilité affective frustrant. Tu oscilles entre besoin attachement intense sécurité et pulsion rupture radicale. Cycles imprévisibles: attachement suivi rejet complet instantané. Cette friction forge attachement sain autonome progressif: apprendre que vraie liberté inclut responsabilité affective.',
      'Opposition': 'Ton besoin sécurité émotionnelle profonde et liberté absolue isolée dansent opposition perpétuelle créant dualité attachment-isolation épuisante. Tu oscilles entre fusion emotionnelle complète sécurité et isolement total liberté radicale. Gens sentent contradiction: amour certain ou liberté totale partir? L\'intégration laborieuse crée autonomie relationnelle où liberté coexiste engagement.',
      'Sextile': 'Un sextile entre émotions et liberté crée harmonie naturelle où authenticité affective émana courage. Ta liberté émotionnelle inspire autonomie saine chez aimés. Gens respectent ton indépendance car voient intégrité fondamentale. C\'est l\'aspect du partenaire autonome dont amour libre libère.'
    },
    'uranus-mercury': {
      'Conjonction': 'Ton intellect rapide et innovation uranienne fusionnent créant génie mental radical révolutionnaire visionnaire. Tu penses avant époque: idées sortent structures mentales non conventionnelles étonnantes illuminatrices. Ta communication porte pouvoir révolution intellectuelle inspirante. Pensée saute étapes logiques directement illumination radicale. Le défi: imprévisibilité mentale chaotique menace car pensée devient incompréhensible. Apprendre expliquer genius avec clarté communicable.',
      'Trigone': 'Un flux harmonieux magnifique relie pensée claire à innovation uranienne créant visionnaire respecté incarné. Ton genius émana convention, non pose artificielle. Tes idées futures grounded réalité actuelle. Tu es penseur révolutionnaire crédible avant-gardiste. C\'est l\'aspect du visionnaire intellectuel dont idées avancent époque respectueusement.',
      'Carré': 'Ton intellect ordonné logique et pulsion innovation radicale entrent conflit perpétuel créant tensions stabilité-changement. Tu oscilles entre besoin clarté logique rationnelle et destruction radicale structures mentales anciennes. Pensée imprévisible chaotique saute logiquement. Cette friction crée originalité progressive: apprendre canaliser innovation avec clarté logique.',
      'Opposition': 'Ta pensée logique rationnelle et innovation radicale dansent opposition perpétuelle créant dualité ordre-chaos épuisante. Tu oscilles entre intellect rigide ordonné et génialité chaotique radicale. Partenaires sentent imprévisibilité: pensée saute logiquement incompréhensiblement. L\'intégration laborieuse crée génie grounded où innovation honore logique.',
      'Sextile': 'Un sextile entre pensée et innovation crée harmonie naturelle où idées révolutionnaires émergent clairement. Ton genius combine originalité clarté communicable. C\'est l\'aspect du génie communicateur dont idées révolutionnaires inspirent.'
    },
    'uranus-venus': {
      'Conjonction': 'Ta beauté gracieuse et liberté uranienne fusionnent créant séducteur indépendant imprévisible magnétique. Tu aimes différemment: affection non conventionnelle électrique changeante radicale. Ton attraction repose originalité authentique où refuses traditions amoureuses. Partenaires sentent électricité magnétique imprévisible attisante. Le défi: instabilité affective menace car attachement suivi rejet radical abrupt créant trauma prolongés. Apprendre que liberté peut inclure engagement responsable différent.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à liberté créant amant authentiquement indépendant respecté. Ton affection émana conviction sincère radicalement changeante; gens respectent cela. Tu aimes librement: partenaires sentent autonomie requise. Magnétisme électrique inspire liberté chez aimés. C\'est l\'aspect de l\'amant libre authentique dont amour libère.',
      'Carré': 'Ton affection tendre et pulsion liberté absolu entrent conflit perpétuel créant tensions engagement-liberté. Tu oscilles entre besoin attachement intense sécurité et peur engagement causant rejet abrupt. Instabilité affective répétée: relations changent radicalement sans avertissement. Cette friction forge attachement autonome progressif: apprendre que vraie liberté inclut responsabilité affective.',
      'Opposition': 'Ton besoin fusion attachement profond et liberté absolue isolée dansent opposition perpétuelle créant dualité attachment-isolation épuisante. Tu oscilles entre fusion complète sécurité et fuite liberté totale radicale. Partenaires sentent contradiction: amour vient-il ou liberté totale partir? L\'intégration laborieuse crée autonomie relationnelle.',
      'Sextile': 'Un sextile entre beauté et liberté crée harmonie naturelle où amour authentique libère. Ton indépendance inspire autonomie saine chez aimés. Partenaires respectent ta liberté car voient intégrité fondamentale. C\'est l\'aspect du partenaire autonome dont amour libre libère authentiquement.'
    },
    'uranus-mars': {
      'Conjonction': 'Ton action impulsive et liberté uranienne fusionnent créant rebelle radical imprévisible révolutionnaire. Tu agis sans avertissement où action porte électricité radicale disruptive. Ton énergie libère détruit conventions créant chaos régénérateur. Révolution est terrain naturel: tu es agitateur provocateur audacieux. Le défi: impulstvité destructrice dangereuse menace car action devient violence chaotique anarchique. Apprendre canaliser énergie révolutionnaire avec responsabilité constructive.',
      'Trigone': 'Un flux harmonieux magnifique relie action à liberté créant rebelle créateur incarné inspirant. Ton action révolutionnaire émana conviction sincère constructive. Tu libères par action car comprends vision future possible. Changement constructif émana ta présence magnétique. C\'est l\'aspect du guerrier révolutionnaire authentique dont action libère constructivement.',
      'Carré': 'Ton action ordonnée et pulsion liberté chaotique entrent conflit perpétuel créant tensions ordre-chaos. Tu oscilles entre besoin structure logique et destruction radicale sans limites. Impulsivité destructrice menace car action chaotique crée destruction involontaire. Cette friction crée liberté responsable progressive: apprendre que révolution construit lieu seulement détruire.',
      'Opposition': 'Ton action ordonnée rigoureuse et liberté chaotique dansent opposition perpétuelle créant dualité stabilité-chaos épuisante. Tu oscilles entre rigidité action contrôlée et chaos radical impulsif. Partenaires sentent instabilité: action stable ou destruction chaotique? L\'intégration laborieuse crée liberté canalisée constructive.',
      'Sextile': 'Un sextile entre action et liberté crée harmonie naturelle où révolution actionne constructivement. Ton action libère inspirante. Changement constructif émana naturellement momentum. C\'est l\'aspect du guerrier libérateur dont action crée révolution constructive.'
    },
    'uranus-jupiter': {
      'Conjonction': 'Ta sagesse généreuse et liberté uranienne fusionnent créant visionnaire radical révolutionnaire audacieux. Tu penses grandes visions futures radicales: croyance possibilités infinies futures révolutionnaires. Ton optimisme inspire révolution construction: gens croient avenir radicalement meilleur. Tu es réformateur charismatique changeant époque. Le défi: utopisme naïf possible car rêves impossiblités impratiques irréalistes. Révolution demeure théorique sans manifestation concrète. Apprendre réaliser visions radicales avec pragmatisme responsable.',
      'Trigone': 'Un flux harmonieux magnifique relie sagesse à liberté créant visionnaire pragmatique incarné inspirant. Ta vision émana conviction sincère révolutionnaire constructive. Tu manifestes changement car comprends réalisme nécessaire vision. Réforme constructive inspire confiance. C\'est l\'aspect du réformateur authentique dont vision crée changement durable.',
      'Carré': 'Ta sagesse prudente et pulsion innovation radicale entrent conflit perpétuel créant tensions tradition-révolution. Tu oscilles entre besoin préserver sagesse établie et destruction radicale tout. Utopisme naïf menace car révolution demeure irréaliste théorique. Cette friction crée vision réaliste progressive: apprendre que changement authentique honore sagesse antérieure.',
      'Opposition': 'Ta sagesse traditionaliste et innovation radicale dansent opposition perpétuelle créant dualité conservation-révolution épuisante. Tu oscilles entre sage conservateur et visionnaire révolutionnaire incompatible. Cette dualité crée confusion: que croiras-tu vraiment? L\'intégration laborieuse crée réforme sage progressive.',
      'Sextile': 'Un sextile entre sagesse et liberté crée harmonie naturelle où vision inspire liberté constructivement. Ton optimisme incite changement. Révolution constructive émana sagesse. C\'est l\'aspect du visionnaire réformateur dont changement crée bien durable.'
    },
    'uranus-saturn': {
      'Conjonction': 'Ta discipline saturnienne et liberté uranienne fusionnent créant rebelle structuré pragmatique révolution pratique. Tu réformes lentement solidement où changement s\'enracine nouvelle structure. Ta liberté enracinée pratique: révolution constructive édifiable durable. Tu es réformateur pragmatique. Le défi: rigidité menace car liberté devient entravée discipline excessive confinante. Rébellion bloquée caution menace. Apprendre que révolution authentique honore structure solidité nouvelle.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à liberté créant réformateur pragmatique incarné respecté. Ton changement émana conviction sincère constructive. Tu manifestes liberté car comprends structure nécessaire fondation. Révolution durable inspire confiance. C\'est l\'aspect du réformateur pragmatique dont changement construit durable.',
      'Carré': 'Ta liberté radicale et besoin discipline rigide entrent conflit perpétuel créant tensions rébellion-rigidité. Tu oscilles entre destruction radicale tout et peur changement causant inaction. Rigidité menace car liberté devient entravée. Cette friction crée liberté responsable progressive: apprendre que révolution honore fondations solides.',
      'Opposition': 'Ta liberté radicale révolution et discipline traditionaliste dansent opposition perpétuelle créant dualité chaos-ordre épuisante. Tu oscilles entre révolutionnaire radical et conservateur rigide traditionnel. Cette dualité crée confusion: es-tu rebelle ou conformiste? L\'intégration laborieuse crée réforme progressive sage.',
      'Sextile': 'Un sextile entre discipline et liberté crée harmonie naturelle où changement actionne solidement. Ta liberté inspire construction. Révolution émana sagesse structure. C\'est l\'aspect du réformateur dont changement crée fondation nouvelle.'
    },
    'uranus-neptune': {
      'Conjonction': 'Ta liberté uranienne et imagination Neptune spirituelle fusionnent créant visionnaire mystique radical. Tu rêves libertés spirituelles radicales transcendantes: vision spirituelle révolutionnaire transformatrice globale. Ta spiritualité libère inspire mouvements révolutionnaires spirituels. Tu es visionnaire mystique radical. Le défi: chaos spirituel possible car révolution spirituelle devient désorganisée nave irréaliste. Apprendre ancrer vision spirituelle radicale réalité manifestation.',
      'Trigone': 'Un flux harmonieux magnifique relie liberté à imagination créant visionnaire spirituel incarné inspirant où conviction sincère libre spirituellement. Tu libères spirituellement car comprends transcendance authentique. Révolution spirituelle constructive inspire confiance respect. C\'est l\'aspect du visionnaire spirituel authentique dont vision libère.',
      'Carré': 'Ta liberté radicale et vision spirituelle idéalisée entrent conflit perpétuel créant tensions rébellion-transcendance. Tu oscilles entre rejet total spiritualité conformiste et rêve spirituel utopiste naïf. Chaos spirituel menace. Cette friction cultive discernement spirituel progressif: apprendre que libération spirituelle authentique honore sagesse établie.',
      'Opposition': 'Ta liberté radicale disruptive et spiritualité transcendante idéalisée dansent opposition perpétuelle créant dualité révolution-transcendance. Tu oscilles entre rebelle nihiliste et mystique idéaliste transcendant contradictoires. Cette dualité crée confusion: que croiras-tu vraiment? L\'intégration laborieuse crée spiritualité libérante enracinée.',
      'Sextile': 'Un sextile entre liberté et imagination crée harmonie naturelle où vision spirituelle libère authentiquement. Ta liberté inspire transcendance constructive. Révolution spirituelle émana authenticité. C\'est l\'aspect du visionnaire spirituel dont liberté transforme spirituellement.'
    },
    'uranus-pluto': {
      'Conjonction': 'Ta liberté uranienne et pouvoir plutonien fusionnent créant révolutionnaire destructeur radical régénération extraordinaire. Tu détruis librement pour régénérer radicalement: liberté significa annihilation anciennes structures. Ta présence initie transformations révolutionnaires chaotiques forcées. Tu es agent destruction créatrice régénération radicale. Le défi: destruction peut devenir nihiliste anarchique sans fondation nouvelle créant chaos. Apprendre que révolution construit fondations nouvelles non seulement détruit anciennes.',
      'Trigone': 'Un flux harmonieux magnifique relie liberté à pouvoir créant révolutionnaire constructif incarné respecté. Ta transformation émana conviction sincère constructive révolutionnaire. Tu libères par régénération car comprends sagesse destruction créatrice. Révolution manifeste émana vision réelle. C\'est l\'aspect du révolutionnaire authentique dont transformation libère.',
      'Carré': 'Ta liberté radicale et pulsion pouvoir destructeur entrent conflit perpétuel créant tensions liberté-destruction. Tu oscilles entre besoin détruire radicalement tout et peur destruction causant inhibition. Destruction radicale chaotique menace. Cette friction forge transformation responsable progressive: apprendre que révolution édifie au lieu seulement anéantir.',
      'Opposition': 'Ta liberté destructrice radicale et pouvoir régénérateur constructeur dansent opposition perpétuelle créant dualité nihilisme-édification épuisante. Tu oscilles entre destructeur nihiliste et régénérateur constructeur contradictoires. Cette dualité crée confusion: détruis-tu ou reconstruis-tu? L\'intégration laborieuse crée transformation libératrice responsable.',
      'Sextile': 'Un sextile entre liberté et pouvoir crée harmonie naturelle où transformation libère constructivement. Ta liberté inspire régénération. Révolution édifie fondations nouvelles. C\'est l\'aspect du révolutionnaire dont transformation crée monde nouveau.'
    },
    'neptune-sun': {
      'Conjonction': 'Ton essence solaire et imagination neptunienne fusionnent créant aura mystérieuse charismatique magique irrésistible. Tu es visionnaire artiste dont essence brille spiritualité incarnée. Ta présence inspire: émana quelquechose ineffable transcendant au-delà rationnel. Gens sentent connexion mondes invisibles. Le défi: fusion brouille ligne essence authentique versus fantasme personnel causant confusion identité. Identité devient confuse: qui es-tu vraiment versus qui imagines? Apprendre discerner soi véritable de projections illusoires fantasmées.',
      'Trigone': 'Un flux harmonieux magnifique relie essence à imagination créant visionnaire incarné enraciné authentique. Ta spiritualité émana conviction sincère, non escapisme. Tu crées art imprégné vérité mystique profonde. Ton aura mystique inspire respect. C\'est l\'aspect du visionnaire authentique dont spiritualité incarnée transforme.',
      'Carré': 'Ton ego solaire assertif et besoin fusion spirituelle neptunienne entrent conflit perpétuel créant confusion identité-mystique. Tu oscilles entre affirmation claire essence et doute spirituel dissolvant identité. Confusion identitaire menace: difficultés discerner soi de fantasmes spirituels. Cette friction cultive discernement spirituel progressif: apprendre que vraie spiritualité enracine identité.',
      'Opposition': 'Ton essence solaire claire assertive et besoin fusion spirituelle neptunienne dansent opposition perpétuelle créant dualité clarté-brume épuisante. Tu oscilles entre affirmation personnelle lucide rationnelle et brume spirituelle douteuse dissolvante. Cette dualité crée confusion: qui suis-je vraiment essence rationnelle ou spirituelle mystique? L\'intégration laborieuse crée sagesse spirituelle authentiquement enracinée.',
      'Sextile': 'Un sextile entre essence et imagination crée harmonie naturelle où mystique authentique s\'exprime clairement. Ta spiritualité émana essence sincère non escapisme. Ton aura spirituelle inspire naturellement. C\'est l\'aspect du visionnaire authentique dont mystique inspire profondément.'
    },
    'neptune-moon': {
      'Conjonction': 'Tes émotions profondes et imagination spirituelle neptunienne fusionnent créant empathie supra-normale osmotique extraordinaire. Tu absorbes sentiments gens comme buvard émotionnel: sensibilité presque télépathique. Tu ressens sans effort intention profonde autrui. Grande âme nourrit mondes invisibles émotionnel. Le défi: fusion brouille limites soi-autrui risquant perte identité. Apprendre discerner sentiments propres versus absorbés extérieurs.',
      'Trigone': 'Un flux harmonieux magnifique relie émotions à imagination créant empathie incarnée guérisseuse. Ta compréhension émotionnelle émana conviction sincère, non escapisme. Tu guéris car combines empathie compréhension sagesse océanique. Ta sensibilité ouvre mondes âmes. C\'est l\'aspect du guérisseur émotionnel authentique dont amour transforme.',
      'Carré': 'Tes émotions authentiques et besoin fusion spirituelle neptunienne entrent conflit créant confusion affective brume. Tu oscilles entre connexion emotionnelle clara consciente et dissolution complètement sentiments-rêves flous. Limites affectives disparaissent: difficultés séparer empath propre de gens. Cette friction cultive discernement émotionnel progressif: apprendre que vraie empathie requiert clarté frontière.',
      'Opposition': 'Ton authenticité émotionnelle et fusion spirituelle mystique dansent opposition perpétuelle créant dualité clarté-brume épuisante. Tu oscilles entre présence affective consciente et dissolution spirituelle-imaginaire. Gens sentent instabilité: moment présent; moment ailleurs. L\'intégration laborieuse crée empathie enracinée.',
      'Sextile': 'Un sextile entre émotions et imagination crée harmonie naturelle où empathie authentique émana spiritualité. Ta sensibilité inspire guérison sans confusion limites. Gens sentent soutien émotionnel profond. C\'est l\'aspect du guérisseur spirituel authentique dont amour guérit.'
    },
    'neptune-mercury': {
      'Conjonction': 'Ton intellect rapide et imagination neptunienne fusionnent créant penseur poétique mystique visionnaire. Tu communiques symboliquement où mots portent meanings multiples subtiles ineffables transcendants. Pensée flotte entre mondes rationnels imaginaires spirituels. Communication émana essence mystique. Le défi: confusion mentale menace car difficultés discerner pensée clara de fantasme imaginaire spirituel. Apprendre discerner réalité de rêve intellectuellement.',
      'Trigone': 'Un flux harmonieux magnifique relie pensée à imagination créant penseur poétique authentiquement incarné. Ton langage émana conviction profonde mystique. Tu es ecrivain artiste communicateur spirituel. Mots touchent âmes. C\'est l\'aspect du poète communicateur dont pensée inspire spirituellement.',
      'Carré': 'Ton intellect clair logique et imagination brouillée neptunienne entrent conflit perpétuel créant tension clarté-flou. Tu oscilles entre pensée cristalline rationnelle et dissolution mentale fantasme. Confusion menace. Cette friction cultive discernement progressif: apprendre imaginer intelligemment.',
      'Opposition': 'Ta pensée logique rationnelle et imagination mystique dansent opposition perpétuelle créant dualité logique-rêve épuisante. Tu oscilles entre intellectuel rigoureux et rêveur idéaliste nébuleux. Partenaires sentent instabilité: moment pragmatique; moment idéaliste. L\'intégration laborieuse crée pensée imaginative enracinée.',
      'Sextile': 'Un sextile entre pensée et imagination crée harmonie naturelle où créativité intellectuelle émana spiritualité. Ton langage poétique inspire profondément. C\'est l\'aspect du mystique penseur dont parole porte magie subtile incarnée.'
    },
    'neptune-venus': {
      'Conjonction': 'Ta beauté gracieuse et imagination spirituelle neptunienne fusionnent créant romantique idéaliste rêveur spiritualisé. Tu aimes idéalement où affection porte qualité ineffable magique transcendante spirituelle. Beauté semble éthérée mystique: gens sentent dimension spirituelle ta présence. Amour devient quête âme sœur mythologique éternelle. Le défi: illusions romantiques menacent car confusions répétées. Tu tombes amour fantasmes non réalité. Apprendre discerner rêve de réalité relationnelle authentique.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à imagination créant amant idéaliste authentiquement incarné. Ton affection émana conviction sincère spirituelle. Tu aimes profondément avec sens âme sœur enraciné réalité. Créativité artistique enrichit relations. C\'est l\'aspect du romantique authentique dont amour inspire art.',
      'Carré': 'Ton affection réaliste pragmatique et besoin fusion spirituelle idéal entrent conflit créant illusions affectives. Tu oscilles entre connexion spirituelle et réalité humaine banale. Déceptions répétées: rêves idéalisés ne correspondent réalité partenaires. Cette friction cultive discernement amoureux progressif: apprendre aimer réalité non fantasme.',
      'Opposition': 'Ton affection pragmatique réelle et idéalisme spirituel dansent opposition perpétuelle créant dualité réalité-rêve épuisante. Tu oscilles entre amour réaliste humain et romance spirituelle transcendante. Cette dualité crée confusion: aimes-tu réelle personne ou fantasme spirituel intérieur? L\'intégration laborieuse crée amour réaliste spirituel enraciné.',
      'Sextile': 'Un sextile entre beauté et imagination crée harmonie naturelle où romance authentique s\'enracine spiritualité. Ton affection émana sincérité spirituelle incarnée réalité. Tu aimes profondément avec vision spirituelle relations. C\'est l\'aspect du romantique authentique dont amour spirituel enraciné réaliste.'
    },
    'neptune-mars': {
      'Conjonction': 'Ton action impulsive et imagination neptunienne fusionnent créant croisade visionnaire passionnée spirituelle. Tu combats causes idéalistes où action porte passion spirituelle transcendante inspirante. Ton ardeur inspire mouvements spirituels idéalistes collectifs. Tu es guerrier visionnaire rêveur inspirant. Le défi: action floue dispersée menace car vision idéaliste supplante pragmatisme. Projets échouent par manque concrétude. Apprendre canaliser passion avec réalité tangible practicité.',
      'Trigone': 'Un flux harmonieux magnifique relie action à imagination créant guerrier visionnaire incarné effectif. Ton action émana conviction sincère spirituelle constructive. Tu manifestes rêves par action coordonnée inspirée. Passion spirituelle actionne constructivement réalité. C\'est l\'aspect du guerrier visionnaire authentique dont action incarne vision.',
      'Carré': 'Ton action concrète pratique et vision idéale floue entrent conflit perpétuel créant tension pragmatisme-idéalisme. Tu oscilles entre action décisive concrète et rêve idéaliste vague incohérent. Action floue dispersée menace. Cette friction cultive action spirituelle enracinée: apprendre que vision nécessite pragmatisme exécution.',
      'Opposition': 'Ton action concrète décisive et imagination floue irréaliste dansent opposition perpétuelle créant dualité pragmatisme-rêve épuisante. Tu oscilles entre guerrier pratique brutal et rêveur idéaliste nébuleux. Partenaires sentent incohérence: action porte vision ou pure impulsion? L\'intégration laborieuse crée action spirituelle ancrée.',
      'Sextile': 'Un sextile entre action et imagination crée harmonie naturelle où vision actionne manière inspirante. Ton action manifeste rêves. Vision spirituelle guide momentum. C\'est l\'aspect du guerrier visionnaire dont action incarne vision spirituelle.'
    },
    'neptune-jupiter': {
      'Conjonction': 'Ta sagesse généreuse et imagination spirituelle neptunienne fusionnent créant mysticisme visionnaire inspiré profond extraordinaire. Tu crois spirituellement généreusement où foi donne abondamment transcendante universelle. Ta vision émana sagesse spirituelle: spiritualité porte profondeur philosophique. Tu es mentor spirituel inspirant quête transcendance. Le défi: illusions spirituelles escapisme naïf menacent. Foi devient refus réalité. Apprendre discerner spiritualité authentique de illusions éthérées.',
      'Trigone': 'Un flux harmonieux magnifique relie sagesse à imagination créant sage spirituel incarné respecté. Ta foi émana conviction sincère spirituelle. Tu guides quête transcendance car comprends profondeur mystique. Spiritualité incarnée inspire confiance. C\'est l\'aspect du sage spirituel authentique dont vision transforme spirituellement.',
      'Carré': 'Ta sagesse pragmatique et pulsion spiritualité idéalisée entrent conflit perpétuel créant tensions pragmatisme-mystique. Tu oscilles entre réalité terre-à-terre et rêve transcendant. Illusions menacent: foi devient irréaliste. Cette friction cultive discernement spirituel progressif: apprendre que spiritualité authentique honore réalité.',
      'Opposition': 'Ta sagesse pragmatique terre-à-terre et vision spirituelle idéalisée dansent opposition perpétuelle créant dualité matérialisme-mysticisme épuisante. Tu oscilles entre réaliste pragmatique et mystique idéaliste. Cette dualité crée confusion: que croiras-tu vraiment matérialité ou spiritualité? L\'intégration laborieuse crée sagesse spirituelle ancrée.',
      'Sextile': 'Un sextile entre sagesse et imagination crée harmonie naturelle où vision spirituelle inspire sagacement. Ta foi guide réalité. Spiritualité émana sagesse. C\'est l\'aspect du mystique sage dont vision spirituelle transforme.'
    },
    'neptune-saturn': {
      'Conjonction': 'Ta discipline saturnienne et imagination neptunienne fusionnent créant mystique ancré pragmatique enraciné profondément. Tu crois spirituellement disciplinément: foi s\'enracine réalité pratique concrète solide. Ta spiritualité constructe solidement: rêves deviennent réalité tangible manifeste. Tu es sage spirituel pragmatique. Le défi: limitation menace car vision devient trop restreinte practice-bound. Spiritualité figée formalisme mort. Apprendre que vraie spiritualité honore aussi transcendance imagination.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à imagination créant sage spirituel pragmatique incarné. Ta spiritualité émana conviction sincère ancrée pratique. Tu manifestes rêves car comprends structure réalité. Rêmes concrétisés inspirent confiance. C\'est l\'aspect du sage spirituel pragmatique dont vision manifeste solidité.',
      'Carré': 'Ta vision spirituelle transcendante et besoin réalité pratique rigide entrent conflit perpétuel créant tensions infini-fini. Tu oscilles entre transcendance spirituelle et peur imprévisible retraite conformiste. Limitation menace car spiritualité figurée conformiste morte. Cette friction cultive discernement spirituel: apprendre que spiritualité honore réalité.',
      'Opposition': 'Ta vision spirituelle idéale et rationalité pratique rigide dansent opposition perpétuelle créant dualité illusion-réalité épuisante. Tu oscilles entre mystique idéaliste et matérialiste pragmatique. Cette dualité crée confusion: croiras-tu spiritualité ou matérialité? L\'intégration laborieuse crée spiritualité enracinée.',
      'Sextile': 'Un sextile entre discipline et imagination crée harmonie naturelle où spiritualité s\'enracine pratique. Ta foi inspire manifestation réelle. Rêves deviennent réalité solidement. C\'est l\'aspect du sage spirituel dont vision manifeste rêves tangiblement.'
    },
    'neptune-uranus': {
      'Conjonction': 'Ta liberté uranienne et imagination neptunienne fusionnent créant visionnaire mystique radical révolution spirituelle extraordinaire. Tu rêves libertés spirituelles radicales transcendantes: vision révolutionnaire transformatrice globale spirituelle. Ta spiritualité libère inspire mouvements révolutionnaires spirituels collectifs. Tu es visionnaire mystique rebelle radical. Le défi: chaos spirituel possible car révolution devient désorganisée utopiste nave irréaliste. Apprendre ancrer vision radicale réalité manifestation.',
      'Trigone': 'Un flux harmonieux magnifique relie liberté à imagination créant visionnaire spirituel incarné inspirant. Ta vision émana conviction sincère libre spirituellement libérante. Tu libères spirituellement car comprends transcendance authentique. Révolution constructive inspire respect. C\'est l\'aspect du visionnaire spirituel authentique dont vision libère.',
      'Carré': 'Ta liberté radicale et vision spirituelle idéalisée entrent conflit perpétuel créant tensions rébellion-transcendance. Tu oscilles entre rejet total spiritualité conformiste et rêve utopiste naïf. Chaos spirituel menace. Cette friction cultive discernement spirituel: apprendre que libération authentique honore sagesse établie.',
      'Opposition': 'Ta liberté disruptive radicale et spiritualité transcendante idéalisée dansent opposition perpétuelle créant dualité révolution-transcendance épuisante. Tu oscilles entre rebelle nihiliste sans foi et mystique idéaliste. Cette dualité crée confusion: que croiras-tu vraiment intérieurement? L\'intégration laborieuse crée spiritualité libérante enracinée.',
      'Sextile': 'Un sextile entre liberté et imagination crée harmonie naturelle où vision spirituelle libère authentiquement. Ta liberté inspire transcendance constructive. Révolution spirituelle émana authenticité. C\'est l\'aspect du visionnaire spirituel dont liberté transforme.'
    },
    'pluto-sun': {
      'Conjonction': 'Ton essence solaire et pouvoir plutonien fusionnent créant phénix immortel puissant essence transformatrice extraordinaire. Ton identité porte pouvoir régénération: essence transforme réalités autour magnétiquement forcément. Tu es agente mort naissance: identité incite transformations profondes involontaires chez autres. Ta présence irrésistible magnétique transformatrice. Le défi: ce pouvoir inconscient peut devenir dominant abusif si insouciant. Essence menace domination. Apprendre canaliser transformation responsablement authentiquement.',
      'Trigone': 'Un flux harmonieux magnifique relie essence à pouvoir créant phénix respecté incarné responsable. Ta transformation émana conviction sincère, non manipulation. Tu guides transformation car essence porte autorité naturelle. Leadership transforme gens. C\'est l\'aspect du leader transformateur authentique dont pouvoir régénère.',
      'Carré': 'Ton ego solaire et pouvoir plutonien entrent conflit perpétuel créant tensions pouvoir identité. Tu oscilles entre affirmation constructrice et destruction régénératrice radicale. Luttes pouvoir répétées testent autorité: comment gouvernes ce pouvoir intense? Cette friction forge pouvoir responsable authentique: apprendre que vraie puissance démarre intégrité personnelle.',
      'Opposition': 'Ton essence solaire assertive créatrice et pouvoir plutonien destructeur dansent opposition perpétuelle créant dualité intensité épuisante. Tu oscilles entre affirmation stable constructrice et besoin destruction régénération radicale. Une jour constructeur; lendemain destructeur régénérateur. Cette dualité crée ambivalence: est-ce pouvoir créer détruire? L\'intégration laborieuse crée transformation responsable.',
      'Sextile': 'Un sextile entre essence et pouvoir crée harmonie naturelle où transformation authentique s\'exprime clairement. Ton pouvoir émana essence sincère constructrice. Gens acceptent ta transformation car voient intégrité. Ton pouvoir enrichit monde. C\'est l\'aspect du transformateur authentique dont régénération crée.'
    },
    'pluto-moon': {
      'Conjonction': 'Tes émotions profondes et pouvoir plutonien fusionnent créant intensité affective abyssale irrésistible magnétique. Tes sentiments portent pouvoir transformateur obsessif magnétique. Magnétisme dangereux: gens submergés ton charme complètement où attachement devient obsession plutonienne. Tu domines affectivement conscient inconscient involontairement. Le défi: jalousie possessivité menace car relations deviennent toxiques. Amour transformation contrôle destructeur inévitable. Apprendre canaliser intensité avec sagesse responsable non destructrice.',
      'Trigone': 'Un flux harmonieux magnifique relie émotions à pouvoir créant guérisseur incarné puissant. Ta compréhension émotionnelle émana sincérité transformatrice, non manipulation. Tu régénères émotionnellement où gens transforment profondément. Intensité inspire confiance car enracinée intégrité. C\'est l\'aspect du guérisseur affectif authentique dont amour transforme.',
      'Carré': 'Tes émotions authentiques et destruction-régénération plutonienne entrent conflit perpétuel créant tempêtes affectives. Tu oscilles entre tendresse et obsessions destructrices controlantes. Intensité peut blesser car gens sentent menace. Cette friction forge pouvoir responsable: apprendre que vraie puissance régénère au lieu détruire.',
      'Opposition': 'Ta légèreté surface et profondeur destructrice dansent opposition perpétuelle créant dualité lightness-abyss épuisante. Tu oscilles entre émotions brèves et plongées abyssales possession. Gens sentent instabilité: semblent profonds puis rejet. L\'intégration laborieuse crée transformation affective enracinée.',
      'Sextile': 'Un sextile entre émotions et pouvoir crée harmonie naturelle où transformation authentique émana intensité. Ta puissance inspire confiance profonde respect. Gens acceptent intensité car voient intégrité. C\'est l\'aspect du guérisseur transformateur dont amour régénère constructivement.'
    },
    'pluto-mercury': {
      'Conjonction': 'Ton intellect rapide et investigation plutonienne fusionnent créant penseur insatiable perceur secrets abyssaux extraordinaire. Tu creuses mentalement jusqu\'à vérités cachées profondes: mots deviennent armes investigation. Curiosité dévore mystère: tu fouilles obsessivement pénètrement. Communication porte pouvoir régénération: paroles transforment consciences. Le défi: obsession mentale paralysante manipulation verbale menace. Pensée devient possessive controlante. Apprendre canaliser pouvoir avec sagesse responsable éthique.',
      'Trigone': 'Un flux harmonieux magnifique relie pensée à investigation créant penseur puissant incarné. Ton analyse émana conviction profonde authentique. Tu découvres secrets car comprends profondément psychique humaine. Parole porte autorité transformatrice. C\'est l\'aspect du psychologue investigateur authentique dont sagesse guérit.',
      'Carré': 'Ton intellect curieux et pulsion investigation obsessive entrent conflit perpétuel créant tensions découverte-secret. Tu oscilles entre besoin connaître tout complètement et secret jaloux protégeant. Obsession menace car creuses compulsivement. Manipulation possible où paroles blessent. Cette friction forge discernement progressif: apprendre que vraie puissance protège secrets.',
      'Opposition': 'Ta pensée superficielle et investigation obsessive dansent opposition perpétuelle créant dualité surface-abysse épuisante. Tu oscilles entre surface apparences et obsession fouille abyssale profonde. Cette instabilité crée confusion: combien creuser profondeur? L\'intégration laborieuse crée sagesse où investigation honore secrets.',
      'Sextile': 'Un sextile entre pensée et investigation crée harmonie naturelle où curiosité pénètre secrets effectivement. Ta parole découvre profondeurs authentiquement. C\'est l\'aspect du sage investigateur dont puissance communique sagesse.'
    },
    'pluto-venus': {
      'Conjonction': 'Ta beauté gracieuse et intensité plutonienne fusionnent créant séducteur magnétique puissant irrésistible extraordinaire. Tu aimes intensément: affection porte pouvoir transformateur obsessif magnétique. Magnétisme dangereux: gens submergés ton charme complètement où attachement devient obsession. Tu domines affectivement conscient inconscient. Le défi: jalousie possessivité menace car relations toxiques. Amour transformation contrôle destructeur inévitable. Apprendre canaliser intensité avec sagesse responsable non destructrice.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à intensité créant amant magnétique incarné. Ton affection émana conviction sincère profondement transformatrice. Tu régénères gens émotionnellement où transforment profondément. Intensité inspire confiance car enracinée intégrité. C\'est l\'aspect du séducteur puissant dont amour régénère.',
      'Carré': 'Ton affection tendre et pulsion domination possessive entrent conflit perpétuel créant relations turbulentes. Tu oscilles entre tendresse authentique et obsessions jalouses controlantes. Intensité peut blesser car gens sentent menace. Cette friction forge amour puissant responsable: apprendre que vraie puissance régénère au lieu contrôler.',
      'Opposition': 'Ton affection légère surface et profondeur destructrice dansent opposition perpétuelle créant dualité tendresse-possession épuisante. Tu oscilles entre tendresse brève et obsessions jalouses destructrices. Partenaires sentent instabilité: amour vient-il ou possession destructrice? L\'intégration laborieuse crée intensité responsable.',
      'Sextile': 'Un sextile entre beauté et intensité crée harmonie naturelle où magnétisme authentique transforme. Ta puissance inspire confiance profonde respect. Gens acceptent intensité car voient intégrité. C\'est l\'aspect du séducteur dont amour régénère transforme.'
    },
    'pluto-mars': {
      'Conjonction': 'Ton action impulsive et pouvoir plutonien fusionnent créant guerrier transformateur puissant régénérateur destructeur extraordinaire. Action porte pouvoir régénération intense: gens transforment profondément où tu es agent mort naissances. Action détruit pour reconstruire. Présence incite transformation forcée. Le défi: agressivité destructrice domination violente menace. Pouvoir devient malveisance: action détruit sans reconstruire. Apprendre canaliser transformation avec sagesse responsable.',
      'Trigone': 'Un flux harmonieux magnifique relie action à pouvoir créant guerrier incarné respecté. Ton action émana conviction sincère transformatrice, non manipulation. Te manifeste régénération car comprends sagesse destruction créatrice. Ta puissance inspire confiance enracinée intégrité. C\'est l\'aspect du guerrier transformateur authentique dont action régénère.',
      'Carré': 'Ton action constructrice et pulsion destruction radicale entrent conflit perpétuel créant tensions création-destruction. Tu oscilles entre besoin construire solidement et destruction radicale régénérer. Agressivité menace car action devient violence. Cette friction forge action responsable: apprendre que régénération construit.',
      'Opposition': 'Ton action créatrice constructrice et destruction radicale dansent opposition perpétuelle créant dualité création-destruction épuisante. Tu oscilles entre constructeur solidaire et destructeur radical. Partenaires sentent instabilité: action crée-t-elle ou détruit-elle? L\'intégration laborieuse crée transformation responsable constructive.',
      'Sextile': 'Un sextile entre action et pouvoir crée harmonie naturelle où transformation actionne constructivement. Ton action transforme profondément. Régénération crée fondations nouvelles. C\'est l\'aspect du guerrier dont action crée renaissance.'
    },
    'pluto-jupiter': {
      'Conjonction': 'Ta sagesse généreuse et pouvoir plutonien fusionnent créant guide transformateur puissant sage extraordinaire. Tu crois généreusement transformation: foi porte pouvoir régénération profonde mondes entiers. Sagesse transforme charismatiquement: gens suivent car voient vérité profonde. Tu suscites renaissances spirituelles epochales. Le défi: mégalomanie menace car tu crois messie sauveur absolu. Domination spirituelle où contrôles disciples esprits. Apprendre que sagesse authentique libère plutôt qu\'asservit.',
      'Trigone': 'Un flux harmonieux magnifique relie sagesse à pouvoir créant guide transformateur incarné respecté profondément. Ta sagesse émana conviction sincère transformatrice authentique. Tu guides transformations profondes effectivement. Ton leadership inspire dignité. C\'est l\'aspect du sage guide authentique dont sagesse régénère.',
      'Carré': 'Ta sagesse généreuse et pulsion domination plutonienne entrent conflit perpétuel créant tensions générosité-contrôle. Tu oscilles entre partager sagesse généreusement et controllerait disciples possessivement. Mégalomanie possible: pose messie. Cette friction crée sagesse responsable: apprendre que vraie sagesse libère.',
      'Opposition': 'Ta sagesse généreuse expansive et pouvoir destructeur domina dansent opposition perpétuelle créant dualité générosité-domination épuisante. Tu oscilles entre sage généreux bienveillant et maître controllerait manipulateur. Cette dualité crée confusion: es-tu guide ou prédateur spirituel? L\'intégration laborieuse crée sagesse puissante responsable.',
      'Sextile': 'Un sextile entre sagesse et pouvoir crée harmonie naturelle où guidance transforme respectueusement. Ta sagesse inspire transformation authentique. Leadership émana intégrité. C\'est l\'aspect du guide sage puissant dont leadership régénère.'
    },
    'pluto-saturn': {
      'Conjonction': 'Ta discipline saturnienne et pouvoir plutonien fusionnent créant alchimiste puissant structuré architecturé extraordinaire. Tu transformes lentement solidement: régénération s\'enracine nouvelle foundation durable. Ton pouvoir architecte: ruines vers renaissance sagesse. Tu es guide transformateur pragmatique. Le défi: obsession menace car pouvoir devient domination possessive destructrice. Transformation figée domination mortifère. Apprendre que vraie transformation libère plutôt qu\'asservit.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à pouvoir créant alchimiste incarné respecté profondement. Ta transformation émana conviction sincère constructive régénératrice. Tu guides changement car comprends sagesse structure nouvelle. Transformation durable inspire confiance. C\'est l\'aspect de l\'alchimiste authentique dont pouvoir transforme constructivement.',
      'Carré': 'Ton pouvoir destructeur et besoin structure rigide entrent conflit perpétuel créant tensions chaos-contrôle. Tu oscilles entre destruction radicale et rigidité figée. Obsession menace car pouvoir devient domination. Cette friction forge transformation responsable: apprendre que régénération honore édification.',
      'Opposition': 'Ton pouvoir destructeur et discipline rigide constructive dansent opposition perpétuelle créant dualité annihilation-preservation épuisante. Tu oscilles entre destructeur radical et conservateur préservateur rigide. Cette dualité crée confusion: construis-tu ou détruis-tu? L\'intégration laborieuse crée transformation wise.',
      'Sextile': 'Un sextile entre discipline et pouvoir crée harmonie naturelle où transformation actionne solidement. Ta puissance inspire confiance. Régénération construit fondations. C\'est l\'aspect de l\'alchimiste dont transformation crée renaissance.'
    },
    'pluto-uranus': {
      'Conjonction': 'Transformation et liberté fusionnent: révolutionnaire destructeur radical régénération.',
      'Trigone': 'Transformation libre constructive incarnée. Révolutionnaire respecté transformateur.',
      'Carré': 'Destruction chaos possibles. Cette friction crée transformation responsable progressive.',
      'Opposition': 'Oscillation destruction liberté régénération. Intégration crée transformation wise.',
      'Sextile': 'Ta transformation inspire liberté. Régénération constructive incarnée révolutionnaire.'
    }
  };

  const interpretation = aspectInterpretations[key]?.[aspectType];

  if (interpretation) {
    return interpretation;
  }

  const genericInterpretations: Record<string, string> = {
    'Conjonction': `L'énergie de ${p1Name} et celle de ${p2Name} fusionnent complètement, créant une force unique qui amplifie les qualités des deux planètes.`,
    'Trigone': `${p1Name} et ${p2Name} travaillent ensemble harmonieusement, t'offrant un talent naturel dans les domaines qu'elles représentent.`,
    'Carré': `La tension entre ${p1Name} et ${p2Name} crée des défis stimulants qui, bien qu'inconfortables, te poussent à grandir et à évoluer.`,
    'Opposition': `${p1Name} et ${p2Name} te tirent dans des directions opposées. L'équilibre entre ces deux forces est ton chemin de croissance.`,
    'Sextile': `${p1Name} et ${p2Name} créent des opportunités faciles. Leurs énergies se soutiennent mutuellement de manière constructive.`
  };

  return genericInterpretations[aspectType] || 'Cet aspect crée une dynamique unique dans ton thème.';
}
