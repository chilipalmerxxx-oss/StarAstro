import { ASPECT_DETAILED } from './aspectDetailedInterpretations';

export const PLANET_INFO: Record<string, { name: string; description: string; keywords: string }> = {
  sun: {
    name: 'Soleil',
    description: 'Votre essence profonde, votre identité et votre volonté. Le Soleil représente qui vous êtes vraiment, votre énergie vitale et votre chemin de vie.',
    keywords: 'Identité • Ego • Volonté • Créativité • Vitalité'
  },
  moon: {
    name: 'Lune',
    description: 'Vos émotions, votre monde intérieur et vos besoins affectifs. La Lune révèle comment vous réagissez émotionnellement et ce qui vous sécurise.',
    keywords: 'Émotions • Intuition • Besoins • Mémoire • Famille'
  },
  mercury: {
    name: 'Mercure',
    description: 'Votre façon de penser, communiquer et apprendre. Mercure gouverne votre intelligence, vos échanges et votre curiosité intellectuelle.',
    keywords: 'Communication • Intellect • Apprentissage • Échanges'
  },
  venus: {
    name: 'Vénus',
    description: 'Votre manière d\'aimer, vos valeurs et votre sens esthétique. Vénus dévoile ce qui vous attire, vos plaisirs et vos relations affectives.',
    keywords: 'Amour • Beauté • Plaisirs • Relations • Valeurs'
  },
  mars: {
    name: 'Mars',
    description: 'Votre énergie d\'action, votre courage et vos désirs. Mars montre comment vous agissez, vous affirmez et poursuivez vos objectifs.',
    keywords: 'Action • Courage • Désir • Énergie • Combativité'
  },
  jupiter: {
    name: 'Jupiter',
    description: 'Votre expansion, votre chance et votre sagesse. Jupiter représente vos opportunités, votre optimisme et votre quête de sens.',
    keywords: 'Expansion • Chance • Sagesse • Abondance • Philosophie'
  },
  saturn: {
    name: 'Saturne',
    description: 'Votre structure, vos responsabilités et vos leçons de vie. Saturne enseigne la discipline, la patience et la maturité.',
    keywords: 'Discipline • Responsabilité • Temps • Structure • Sagesse'
  },
  uranus: {
    name: 'Uranus',
    description: 'Votre originalité, vos innovations et votre liberté. Uranus impulse le changement, l\'indépendance et l\'avant-gardisme.',
    keywords: 'Innovation • Liberté • Originalité • Changement • Révolution'
  },
  neptune: {
    name: 'Neptune',
    description: 'Votre imagination, votre spiritualité et vos rêves. Neptune connecte à l\'invisible, l\'inspiration et la transcendance.',
    keywords: 'Intuition • Spiritualité • Rêves • Inspiration • Mystère'
  },
  pluto: {
    name: 'Pluton',
    description: 'Votre transformation, votre pouvoir et votre renaissance. Pluton révèle vos profondeurs et votre capacité de métamorphose.',
    keywords: 'Transformation • Pouvoir • Régénération • Profondeur'
  },
  ascendant: {
    name: 'Ascendant',
    description: 'Votre masque social, votre apparence et votre façon de vous présenter au monde. L\'Ascendant est la porte d\'entrée de votre thème natal.',
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
    description: 'Votre façon d\'être et de vous présenter au monde. L\'Ascendant, porte d\'entrée de votre thème, définit votre masque social et votre énergie spontanée.'
  },
  2: {
    name: 'Maison des Ressources',
    theme: 'Argent et valeurs',
    description: 'Vos possessions matérielles, vos talents et ce que vous valorisez. Cette maison parle de votre rapport à l\'argent et à votre sécurité matérielle.'
  },
  3: {
    name: 'Maison de la Communication',
    theme: 'Échanges et apprentissage',
    description: 'Votre communication, vos apprentissages et votre entourage proche. Frères, sœurs, voisins et déplacements courts y sont représentés.'
  },
  4: {
    name: 'Maison des Racines',
    theme: 'Famille et foyer',
    description: 'Vos origines, votre famille et votre foyer. Le Fond du Ciel révèle vos racines profondes et ce qui vous ancre émotionnellement.'
  },
  5: {
    name: 'Maison de la Créativité',
    theme: 'Plaisirs et créations',
    description: 'Votre créativité, vos loisirs, vos enfants et vos amours. Cette maison exprime votre joie de vivre et ce qui vous fait vibrer.'
  },
  6: {
    name: 'Maison du Quotidien',
    theme: 'Travail et santé',
    description: 'Votre routine, votre travail quotidien et votre santé. Elle indique comment vous gérez les obligations et prenez soin de vous.'
  },
  7: {
    name: 'Maison des Associations',
    theme: 'Relations et partenariats',
    description: 'Vos relations de couple, vos associations et vos contrats. Le Descendant montre ce que vous recherchez chez l\'autre.'
  },
  8: {
    name: 'Maison des Transformations',
    theme: 'Mort et renaissance',
    description: 'Les transformations profondes, la sexualité et les ressources partagées. Mystères, crises et régénérations y prennent place.'
  },
  9: {
    name: 'Maison de l\'Expansion',
    theme: 'Philosophie et voyages',
    description: 'Votre quête de sens, vos voyages lointains et vos études supérieures. C\'est la maison de la sagesse et de l\'exploration.'
  },
  10: {
    name: 'Maison de la Vocation',
    theme: 'Carrière et réputation',
    description: 'Votre carrière, votre statut social et votre accomplissement public. Le Milieu du Ciel indique votre destinée professionnelle.'
  },
  11: {
    name: 'Maison des Projets',
    theme: 'Amis et idéaux',
    description: 'Vos amitiés, vos projets collectifs et vos idéaux. Cette maison parle de vos rêves et de votre contribution au groupe.'
  },
  12: {
    name: 'Maison de l\'Invisible',
    theme: 'Spiritualité et inconscient',
    description: 'Votre spiritualité, votre inconscient et ce qui est caché. Épreuves karmiques, retraites et connexion au divin s\'y manifestent.'
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
      'Bélier': 'Vous êtes un leader naturel, courageux et toujours prêt à foncer. L\'action directe vous caractérise.',
      'Taureau': 'Vous recherchez la stabilité et les plaisirs concrets. Votre détermination est légendaire.',
      'Gémeaux': 'Votre curiosité intellectuelle est insatiable. Vous excellez dans la communication et l\'adaptabilité.',
      'Cancer': 'Vos émotions guident vos actions. Famille et sécurité affective sont essentielles pour vous.',
      'Lion': 'Vous rayonnez naturellement et inspirez votre entourage. La créativité est votre force.',
      'Vierge': 'L\'analyse et le perfectionnisme vous animent. Vous excellez dans les détails et le service.',
      'Balance': 'L\'harmonie et les relations sont au cœur de votre être. Vous êtes naturellement diplomate.',
      'Scorpion': 'Votre intensité et votre passion sont remarquables. Vous explorez les profondeurs de l\'existence.',
      'Sagittaire': 'L\'aventure et la quête de sens vous animent. Votre optimisme est contagieux.',
      'Capricorne': 'L\'ambition et la discipline vous caractérisent. Vous construisez patiemment votre succès.',
      'Verseau': 'Votre originalité et votre indépendance vous définissent. Vous êtes un visionnaire.',
      'Poissons': 'Votre intuition et votre compassion sont exceptionnelles. Vous êtes connecté au monde subtil.'
    },
    moon: {
      'Bélier': 'Vos réactions émotionnelles sont vives et spontanées. Vous avez besoin d\'action pour vous sentir bien.',
      'Taureau': 'Vous recherchez la stabilité émotionnelle et le confort. Les plaisirs sensoriels vous apaisent.',
      'Gémeaux': 'Votre monde intérieur est varié et mobile. La communication nourrit votre bien-être émotionnel.',
      'Cancer': 'Hypersensible, vous avez un besoin profond de sécurité et d\'appartenance. L\'intuition vous guide.',
      'Lion': 'Vous exprimez vos émotions avec chaleur et générosité. Être apprécié nourrit votre âme.',
      'Vierge': 'Vous analysez vos sentiments et cherchez la perfection émotionnelle. Le service vous apaise.',
      'Balance': 'L\'harmonie relationnelle est vitale pour votre équilibre. Vous évitez les conflits émotionnels.',
      'Scorpion': 'Vos émotions sont d\'une intensité rare. Vous ressentez tout profondément et magnétiquement.',
      'Sagittaire': 'Votre optimisme naturel colore vos émotions. La liberté émotionnelle est essentielle.',
      'Capricorne': 'Vous maîtrisez vos émotions avec maturité. La réserve émotionnelle vous protège.',
      'Verseau': 'Votre indépendance émotionnelle est importante. Vous rationalisez vos sentiments.',
      'Poissons': 'Ultra empathique, vous absorbez les émotions ambiantes. Votre sensibilité est osmotique.'
    },
    mercury: {
      'Bélier': 'Votre pensée est rapide et directe. Vous communiquez sans détour, avec franchise.',
      'Taureau': 'Vous réfléchissez posément et concrètement. Vos idées sont pratiques et stables.',
      'Gémeaux': 'Votre intelligence est vive et polyvalente. La communication est votre superpouvoir.',
      'Cancer': 'Votre pensée est intuitive et émotionnelle. La mémoire est votre force.',
      'Lion': 'Vous vous exprimez avec confiance et créativité. Votre communication est charismatique.',
      'Vierge': 'Votre esprit analytique excelle dans les détails. Organisation et précision vous caractérisent.',
      'Balance': 'Vous pesez le pour et le contre, recherchant l\'équité. Votre communication est diplomate.',
      'Scorpion': 'Votre pensée est profonde et investigatrice. Vous percez les mystères facilement.',
      'Sagittaire': 'Votre esprit philosophique embrasse les grandes idées. L\'optimisme teinte vos pensées.',
      'Capricorne': 'Votre réflexion est structurée et pragmatique. Vous pensez stratégiquement.',
      'Verseau': 'Votre pensée est originale et avant-gardiste. L\'innovation intellectuelle vous anime.',
      'Poissons': 'Votre imagination est fertile. L\'intuition guide votre intelligence.'
    }
  };

  return interpretations[planet]?.[sign] || `${PLANET_INFO[planet]?.name} en ${sign} colore votre personnalité de manière unique.`;
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
      'Conjonction': 'Votre conscience et vos émotions sont parfaitement alignées. Vous êtes authentique, exprimant naturellement ce que vous ressentez. Cette unité intérieure crée une personnalité cohérente et intègre.',
      'Trigone': 'Harmonie naturelle entre votre être profond et votre vie émotionnelle. Vous vous sentez bien dans votre peau et rayonnez une énergie positive qui attire les autres.',
      'Carré': 'Tension entre ce que vous voulez être et ce que vous ressentez. Cette friction vous pousse à évoluer mais demande un effort conscient pour réconcilier votre tête et votre cœur.',
      'Opposition': 'Votre conscience et vos émotions semblent tirer dans des directions opposées. L\'objectif est de les honorer toutes les deux et de trouver un équilibre dynamique.',
      'Sextile': 'Facilité à exprimer vos émotions de manière constructive. Vous savez instinctivement comment nourrir votre bien-être émotionnel.'
    },
    'mercury-sun': {
      'Conjonction': 'Votre identité et votre intellect fusionnent. Vous êtes brillant et communiquez avec assurance. Attention toutefois à garder une certaine objectivité sur vous-même.',
      'Trigone': 'Votre pensée reflète naturellement qui vous êtes. Communication fluide, créativité intellectuelle et capacité à vous exprimer avec clarté.',
      'Carré': 'Tension entre votre ego et votre raison. Vous pouvez avoir du mal à rester objectif ou tendre vers l\'hyper-rationalisation. Cette friction stimule votre intelligence.',
      'Opposition': 'Votre pensée peut critiquer votre être ou inversement. L\'équilibre se trouve en intégrant raison et intuition, mental et cœur.',
      'Sextile': 'Facilité à communiquer qui vous êtes. Votre expression correspond à votre essence, créant une communication authentique et efficace.'
    },
    'mercury-moon': {
      'Conjonction': 'Vos pensées et émotions sont intimement liées. Vous exprimez facilement vos sentiments mais pouvez aussi être submergé émotionnellement dans vos réflexions.',
      'Trigone': 'Intelligence émotionnelle naturelle. Vous comprenez intuitivement les autres et savez communiquer avec sensibilité et empathie.',
      'Carré': 'Conflit entre raison et émotion. Vos sentiments brouillent parfois votre jugement, mais cette tension développe une compréhension profonde de la psychologie.',
      'Opposition': 'Votre tête et votre cœur dialoguent constamment. L\'enjeu est d\'écouter les deux sans les laisser se dominer mutuellement.',
      'Sextile': 'Vous communiquez vos besoins émotionnels avec aisance. Bonne mémoire émotionnelle et capacité à comprendre les subtilités relationnelles.'
    },
    'mars-sun': {
      'Conjonction': 'Énergie vitale débordante et volonté d\'action puissante. Vous êtes un guerrier naturel, courageux et déterminé. Apprenez à canaliser cette force.',
      'Trigone': 'Action et identité s\'harmonisent parfaitement. Vous savez qui vous êtes et agissez en conséquence. Leadership naturel et confiance en soi.',
      'Carré': 'Conflit intérieur entre désir d\'action et sens de soi. Cette tension crée une dynamique puissante mais peut générer frustration et impatience.',
      'Opposition': 'Tiraillement entre affirmation de soi et action impulsive. Apprendre à agir selon vos valeurs profondes plutôt que par réaction.',
      'Sextile': 'Capacité naturelle à passer à l\'action de manière constructive. Votre énergie soutient vos objectifs personnels efficacement.'
    },
    'mars-moon': {
      'Conjonction': 'Vos émotions sont intenses et vous réagissez rapidement. Passion, courage émotionnel, mais aussi impulsivité dans vos réactions affectives.',
      'Trigone': 'Force émotionnelle et capacité d\'action harmonieuses. Vous défendez naturellement ce qui compte pour vous sur le plan émotionnel.',
      'Carré': 'Tensions émotionnelles qui vous poussent à l\'action. Colère et frustration peuvent surgir rapidement, mais cette énergie peut être transformée.',
      'Opposition': 'Combat entre besoins émotionnels et désirs d\'action. L\'équilibre demande de respecter vos émotions tout en agissant de manière constructive.',
      'Sextile': 'Énergie émotionnelle bien canalisée. Vous savez agir pour protéger et nourrir ce qui vous tient à cœur.'
    },
    'mercury-venus': {
      'Conjonction': 'Charme naturel dans la communication. Vous savez choisir les mots justes et apprécier la beauté des idées. Diplomatie et goût artistique.',
      'Trigone': 'Communication harmonieuse et agréable. Vous créez facilement des connexions et exprimez l\'affection avec élégance et naturel.',
      'Carré': 'Tension entre pensée et plaisir. Difficulté à choisir entre raison et sentiment, mais cette friction affine votre discernement.',
      'Opposition': 'Votre tête dit une chose, votre cœur une autre. L\'art consiste à honorer à la fois la logique et l\'amour.',
      'Sextile': 'Facilité à exprimer l\'affection verbalement. Communication chaleureuse et capacité à créer de l\'harmonie par les mots.'
    },
    'mars-venus': {
      'Conjonction': 'Passion intense dans l\'amour et l\'art. Désir et affection fusionnent, créant une nature magnétique et créative. Séduction naturelle.',
      'Trigone': 'Harmonie entre désir et affection. Vous attirez naturellement ce que vous aimez et aimez ce que vous poursuivez. Charisme et créativité.',
      'Carré': 'Conflit entre désir et amour, passion et tendresse. Cette tension crée une intensité dans vos relations et stimule votre créativité.',
      'Opposition': 'Attraction et répulsion alternent. L\'enjeu est d\'intégrer passion et affection dans une expression équilibrée de l\'amour.',
      'Sextile': 'Capacité naturelle à attirer et créer. Votre action soutient vos valeurs et vous poursuivez vos désirs de manière harmonieuse.'
    },
    'jupiter-sun': {
      'Conjonction': 'Optimisme naturel et foi en vous-même. Vous voyez grand et inspirez confiance. Générosité et quête de sens caractérisent votre être.',
      'Trigone': 'Chance et expansion naturelles. Les opportunités viennent facilement car vous rayonnez positivement. Sagesse et croissance harmonieuse.',
      'Carré': 'Tension entre expansion et identité. Tendance à l\'excès ou au manque de mesure, mais cette énergie pousse à grandir constamment.',
      'Opposition': 'Tiraillement entre modestie et grandeur. L\'équilibre se trouve en restant authentique tout en embrassant vos possibilités.',
      'Sextile': 'Opportunités de croissance personnelle se présentent facilement. Votre optimisme soutient naturellement votre développement.'
    },
    'jupiter-moon': {
      'Conjonction': 'Générosité émotionnelle et foi profonde. Votre cœur est grand et vous avez besoin d\'expansion émotionnelle. Optimisme et empathie.',
      'Trigone': 'Bien-être émotionnel naturel. Vous savez instinctivement comment nourrir votre âme et celle des autres. Protection et chance émotionnelles.',
      'Carré': 'Excès émotionnels possibles. Tendance à trop donner ou trop attendre émotionnellement, mais cette générosité vous fait grandir.',
      'Opposition': 'Balance entre besoins émotionnels et expansion. L\'enjeu est de croître sans se perdre, de donner sans s\'oublier.',
      'Sextile': 'Facilité à trouver joie et sens dans vos émotions. Votre optimisme nourrit naturellement votre bien-être intérieur.'
    },
    'jupiter-saturn': {
      'Conjonction': 'Équilibre unique entre expansion et contraction. Vous savez croître avec sagesse, combinant optimisme et réalisme de manière constructive.',
      'Trigone': 'Chance structurée et discipline optimiste. Vous manifestez vos rêves avec patience et méthode. Succès durable et mérité.',
      'Carré': 'Conflit entre croissance et limitation. Cette tension vous enseigne la persévérance et la sagesse à travers les hauts et les bas.',
      'Opposition': 'Oscillation entre foi et peur, expansion et retrait. L\'intégration de ces deux forces crée une sagesse profonde.',
      'Sextile': 'Opportunités de construire solidement. Votre optimisme trouve une structure et vos efforts sont récompensés justement.'
    },
    'mercury-saturn': {
      'Conjonction': 'Pensée sérieuse et structurée. Concentration, profondeur intellectuelle mais parfois tendance au pessimisme. Grande capacité d\'apprentissage méthodique.',
      'Trigone': 'Pensée claire et organisée. Vous structurez naturellement vos idées et communiquez avec autorité et sagesse.',
      'Carré': 'Blocages mentaux ou pensées négatives possibles. Cette tension développe rigueur et profondeur intellectuelle à travers l\'effort.',
      'Opposition': 'Tension entre spontanéité mentale et structure. L\'équilibre crée une pensée à la fois libre et disciplinée.',
      'Sextile': 'Facilité à organiser vos pensées. Communication claire, apprentissage méthodique et capacité à enseigner.'
    },
    'moon-venus': {
      'Conjonction': 'Douceur émotionnelle naturelle. Vous recherchez harmonie et beauté dans vos relations. Affection et sensibilité artistique.',
      'Trigone': 'Grâce émotionnelle et capacité d\'aimer facilement. Vous attirez l\'affection et créez naturellement de la beauté autour de vous.',
      'Carré': 'Tension entre besoins émotionnels et désirs relationnels. Cette friction affine votre compréhension de l\'amour et de l\'harmonie.',
      'Opposition': 'Balance entre donner et recevoir l\'amour. L\'enjeu est d\'honorer vos besoins tout en restant ouvert aux autres.',
      'Sextile': 'Facilité à exprimer affection et créer harmonie. Vous savez naturellement embellir votre vie émotionnelle.'
    },
    'saturn-sun': {
      'Conjonction': 'Sens aigu des responsabilités. Vous vous prenez au sérieux et construisez votre identité avec patience. Maturité précoce.',
      'Trigone': 'Structure et identité s\'harmonisent. Vous incarnez naturellement sagesse et autorité. Succès mérité par le travail.',
      'Carré': 'Épreuves de confiance en soi. Cette tension construit une force intérieure authentique à travers la persévérance.',
      'Opposition': 'Conflit entre spontanéité et responsabilité. L\'équilibre crée une identité à la fois libre et mature.',
      'Sextile': 'Capacité naturelle à vous structurer. Vos efforts construisent solidement votre identité et votre confiance.'
    },
    'ascendant-sun': {
      'Conjonction': 'Votre essence profonde et votre apparence fusionnent. Vous êtes authentique et ce que vous paraissez correspond à ce que vous êtes. Rayonnement naturel.',
      'Trigone': 'Harmonie entre votre être intérieur et votre masque social. Vous vous présentez naturellement de façon authentique et attrayante.',
      'Carré': 'Tension entre qui vous êtes et comment vous apparaissez. Cette friction vous pousse à développer une image plus alignée avec votre essence.',
      'Opposition': 'Contraste marqué entre votre identité profonde et votre personnalité sociale. L\'intégration crée une personnalité riche et nuancée.',
      'Sextile': 'Facilité à exprimer votre essence à travers votre apparence. Vous savez naturellement vous présenter de manière favorable.'
    },
    'ascendant-moon': {
      'Conjonction': 'Vos émotions sont visibles sur votre visage. Vous êtes spontanément émotif et les autres perçoivent facilement vos sentiments. Authenticité émotionnelle.',
      'Trigone': 'Votre sensibilité transparaît harmonieusement dans votre comportement. Vous créez une première impression chaleureuse et accueillante.',
      'Carré': 'Conflit entre vos besoins émotionnels et votre image sociale. Cette tension vous apprend à équilibrer expression et protection émotionnelles.',
      'Opposition': 'Vos émotions privées contrastent avec votre façade publique. L\'enjeu est d\'intégrer vie intérieure et expression extérieure.',
      'Sextile': 'Facilité à exprimer vos émotions de manière appropriée socialement. Vous créez naturellement un climat émotionnel positif.'
    },
    'ascendant-mercury': {
      'Conjonction': 'Votre intelligence et votre communication sont immédiatement perceptibles. Vous êtes identifié comme quelqu\'un de curieux et communicatif.',
      'Trigone': 'Votre façon de penser s\'exprime naturellement dans votre comportement. Communication fluide et apparence intelligente.',
      'Carré': 'Tension entre votre mental et votre image. Difficulté parfois à communiquer comme vous le souhaitez, ce qui affine votre expression.',
      'Opposition': 'Votre façon de penser peut contredire votre apparence. L\'équilibre crée une communication authentique et nuancée.',
      'Sextile': 'Facilité à communiquer votre personnalité. Vous savez instinctivement adapter votre message à votre audience.'
    },
    'ascendant-venus': {
      'Conjonction': 'Charme naturel et beauté évidente. Vous êtes immédiatement perçu comme attirant, agréable et harmonieux. Magnétisme social.',
      'Trigone': 'Grâce et élégance naturelles dans votre présentation. Vous attirez facilement la sympathie et créez de belles premières impressions.',
      'Carré': 'Conflit entre vos valeurs et votre image. Cette tension vous pousse à affiner votre style et votre façon de plaire.',
      'Opposition': 'Contraste entre ce que vous aimez et ce que vous montrez. L\'intégration crée une authenticité charmante.',
      'Sextile': 'Facilité à vous présenter de manière attrayante. Vous savez naturellement mettre en valeur vos qualités esthétiques.'
    },
    'ascendant-mars': {
      'Conjonction': 'Énergie visible et dynamisme évident. Vous êtes perçu comme courageux, direct et combatif. Forte présence physique.',
      'Trigone': 'Votre énergie s\'exprime harmonieusement dans vos actions. Leadership naturel et capacité à inspirer l\'action chez les autres.',
      'Carré': 'Tension entre votre agressivité et votre image. Cette friction développe une assertivité plus raffinée et contrôlée.',
      'Opposition': 'Contraste entre votre désir d\'action et votre comportement social. L\'équilibre crée une affirmation de soi équilibrée.',
      'Sextile': 'Facilité à agir de manière appropriée socialement. Votre énergie soutient naturellement votre présentation.'
    },
    'ascendant-jupiter': {
      'Conjonction': 'Optimisme et générosité évidents. Vous êtes perçu comme chanceux, sage et inspirant. Présence expansive et positive.',
      'Trigone': 'Votre foi et votre optimisme transparaissent naturellement. Vous créez des opportunités par votre seule présence positive.',
      'Carré': 'Excès possibles dans votre présentation. Tendance à l\'exagération ou au manque de mesure, mais cette énergie attire la chance.',
      'Opposition': 'Tension entre croissance personnelle et image sociale. L\'équilibre crée une expansion authentique et mesurée.',
      'Sextile': 'Facilité à attirer les opportunités par votre attitude positive. Votre optimisme enrichit votre présence sociale.'
    },
    'ascendant-saturn': {
      'Conjonction': 'Sérieux et maturité évidents. Vous êtes perçu comme responsable, discipliné et digne de confiance. Autorité naturelle.',
      'Trigone': 'Structure et image s\'harmonisent. Vous incarnez naturellement sagesse et crédibilité. Respect et confiance vous suivent.',
      'Carré': 'Blocages dans votre expression sociale. Cette tension construit une présence authentique à travers la persévérance.',
      'Opposition': 'Conflit entre spontanéité et contrôle de votre image. L\'intégration crée une présence à la fois libre et mature.',
      'Sextile': 'Facilité à vous présenter de manière professionnelle. Votre sérieux soutient naturellement votre crédibilité sociale.'
    },
    'ascendant-uranus': {
      'Conjonction': 'Originalité évidente et indépendance marquée. Vous êtes perçu comme unique, innovant et parfois excentrique. Magnétisme électrique.',
      'Trigone': 'Votre individualité s\'exprime harmonieusement. Vous êtes authentiquement vous-même et cela attire les autres naturellement.',
      'Carré': 'Comportement imprévisible ou difficultés d\'adaptation sociale. Cette tension développe une authenticité courageuse.',
      'Opposition': 'Tiraillement entre conformité et rébellion. L\'équilibre crée une individualité respectueuse mais affirmée.',
      'Sextile': 'Facilité à exprimer votre originalité de manière acceptable. Votre différence devient un atout social.'
    },
    'ascendant-neptune': {
      'Conjonction': 'Aura mystérieuse et sensibilité évidente. Vous êtes perçu comme inspirant, artistique ou insaisissable. Présence éthérée.',
      'Trigone': 'Imagination et spiritualité transparaissent harmonieusement. Vous inspirez naturellement et attirez par votre douceur.',
      'Carré': 'Confusion possible sur votre identité ou image floue. Cette tension développe une authenticité spirituelle profonde.',
      'Opposition': 'Contraste entre idéal et réalité de votre image. L\'intégration crée une présence à la fois inspirante et authentique.',
      'Sextile': 'Facilité à exprimer votre sensibilité artistique. Votre créativité enrichit naturellement votre présentation sociale.'
    },
    'ascendant-pluto': {
      'Conjonction': 'Intensité et magnétisme puissants. Vous êtes perçu comme transformateur, intense et mystérieux. Présence magnétique irrésistible.',
      'Trigone': 'Votre pouvoir personnel s\'exprime harmonieusement. Vous transformez naturellement votre environnement par votre seule présence.',
      'Carré': 'Luttes de pouvoir liées à votre image. Cette tension développe une présence authentiquement puissante à travers la transformation.',
      'Opposition': 'Conflit entre votre profondeur et votre surface. L\'intégration crée une authenticité magnétique et transformatrice.',
      'Sextile': 'Facilité à exprimer votre intensité de manière appropriée. Votre profondeur enrichit naturellement vos interactions.'
    },
    'neptune-pluto': {
      'Conjonction': 'Neptune et Pluton fusionnent leurs énergies transcendantes et transformatrices créant une force spirituelle régénératrice extraordinaire. Vous êtes doué pour transformer les mondes intangibles spirituels et psychologiques d\'autres gens. Votre intuition est profondément mystique liée aux dimensions cachées de l\'existence. Le défi: vous pouvez devenir excessivement perdu dans les illusions ou plongé dans les profondeurs psychologiques sombres. Apprendre à honorer transformation spirituelle tout en restant ancré dans la réalité matérielle.',
      'Trigone': 'Un flux merveilleux spirituellement enrichissant relie votre Neptune à votre Pluton créant une harmonie mystique transformatrice profonde. Votre imagination spirituelle alliée à votre pouvoir régénérateur crée capacité remarquable à canaliser énergies invisibles en créations concrètes palpables. Vous êtes un alchimiste naturel transformant matière brute en substance spirituelle raffinée. Votre intuition vous guide vers transformations profondes qui guérissent votre âme et celle des autres. C\'est l\'aspect magique de visionnaires qui ont accès à mondes subtils ET pouvoir de les manifester tangiblement.',
      'Carré': 'Neptune carré Pluton crée tension intense perpétuelle entre aspirations spirituelles illusoires et nécessité inévitable destruction régénération radicale. Vous oscillez entre visions idéalistes transcendantes et compulsion transformation destructrice souterraine. Vos illusions peuvent être dissolvues subitement par puissances régénératrices souterraines qui refusent toute complaisance spirituelle vaporeuse. Cette tension difficile forge capacité remarquable à discerner illusion de réalité spirituelle profonde: vous devenez mystique authentique non débutant naïf. Votre transformation spirituelle exige sacrifices et morts symboliques répétées.',
      'Opposition': 'Neptune et Pluton dansent en opposition perpétuelle créant tension épuisante entre vision spirituelle expansive transcendante et force transformation radicale absolue non-négociable. Votre esprit aspire connexion divine ineffable universelle tandis que Pluton vous oblige creuser profondément dans ombre psychologique interne régénération forcée. Vous oscillez vertigineusement entre extase visionnaire abandonnée et descente oblitératrice aux enfers internes. L\'une vous élève au ciel perpétuellement; l\'autre vous plonge forcément aux profondeurs abyssales. Cette dualité crée pendule spirituel/psychologique épuisant: tantôt levitation transcendante, tantôt noyade régénératrice souterraine. L\'intégration laborieuse crée sagesse spirituelle authentiquement transformée profondément: vous devenez quelqu\'un dont visions spirituelles sont forgées dans creuset souffrance psychologique profonde - faux prophète devient vrai sage amplifié par expérience abyssale.',
      'Sextile': 'Un sextile entre Neptune et Pluton crée un flux naturel magnifique puissant où imagination spirituelle s\'allie harmonieusement à pouvoir transformateur régénérateur. Capacité naturelle remarquable à accéder mondes subtils spirituels ET transformer profondément réalité physique à partir de ces visions. Vous êtes chamane naturel ou magicien blanc dont pensée spirituelle manifeste pouvoir réel tangible. Vos intuitions spirituelles ouvertes accès à sagesse transformatrice ancestrale oubliée que vous canalisez pour guérisons profondes. Vous êtes alchimiste dont imagination crée résultats magiques apparents dans transformations âmes et mondes. C\'est l\'aspect des visionnaires transformateurs authentiques dont rêves changent réalité.'
    },
    'sun-mercury': {
      'Conjonction': 'Votre essence et votre intellect fusionnent: brillant et communicatif naturellement. Charisme intellectuel.',
      'Trigone': 'Harmonie entre essence et expression. Vous communiquez avec autorité naturelle et sagesse.',
      'Carré': 'Tension entre ego et critique objective. Difficulté accepter remise en question. Cette friction crée humilité progressive.',
      'Opposition': 'Oscillation perpétuelle entre affirmation et analyse rationnelle. Intégration crée équilibre conviction-discernement.',
      'Sextile': 'Facilité exprimer votre authenticité avec clarté. Parole porte poids naturellement.'
    },
    'sun-venus': {
      'Conjonction': 'Votre essence et grâce vénusienne fusionnent créant charme naturel irrésistible incarné. Vous êtes aimable attirant magnétique car essence brille à travers harmonie grâce beauté. Votre présence crée instantanément convivialité sympathie inconsciente. Vous n\'avez besoin effort séduction: c\'est naturel fluidité authentique. Le défi: vous pouvez perdre authenticité sous charme séducteur en devenant agréable coûte que coûte. Apprendre que vraie beauté durable vient essence sincère, pas manipulation charme superficiel.',
      'Trigone': 'Un flux harmonieux magnifique relie essence authentique à grâce vénusienne créant beauté incarnée naturelle. Vous êtes aimé réellement car ce qui vous rend attrayant émane authenticité profonde non apprêt superficiel. Créativité artistique soutient essence: vous créez art reflétant qui vous êtes vraiment. Popularité genuine vient amour sincère gens ont pour votre substance alliée grâce. C\'est l\'aspect du charme authentique dont beauté durable vient rayonnement intérieur personnel.',
      'Carré': 'Votre affirmation solaire et besoin plaire vénusien entrent en conflit créant tension identité-approbation stimulante. Vous oscillez entre affirmation égoïste de qui vous êtes et obsession constante comment paraissez aux autres. Tensions relationnelles surgissent car difficulté équilibrer assertivité personnelle avec diplomatie relationnelle. Vous pouvez vous sentir impulsif égocentrique dans relations, créant friction. Cette tension inconfortable forge cependant caractère solide au-delà charme superficiel: apprenez que vraie relation vient stabilité interne, pas manipulation grâce.',
      'Opposition': 'Votre essence solaire assertive et désir relationnel vénusien dansent en opposition perpétuelle créant dualité relationnelle épuisante. Vous oscillez vertigineusement entre affirmation personnelle farouche égoïste et compromise total relationnel auto-négatrice. Vous attirez mais repoussez aussi par cette ambivalence: gens sentent conflit interne perpétuel entre qui vous êtes versus ce qu\'il faut être pour relation. Cette dualité crée confusions amoureux chroniques: tantôt vous brillez assertif repoussant partenaires; tantôt vous vous effacez complètement perdant essence. L\'intégration laborieuse crée équilibre sain où affirmation authentique s\'allie harmonie relationnelle respectueuse.',
      'Sextile': 'Un sextile entre essence et grâce crée flux naturel merveilleux où authenticité plaît charmeusement. Grâce naturelle dans relations émane de qui vous êtes vraiment, non artifice. Votre chaleur authentique séduit facilement naturellement sans effort apparent. Les gens aiment votre substance alliée grâce: meilleur des deux mondes. C\'est l\'aspect du charme authentique irrésistible car beauté durable vient essence sincère rayonnant.'
    },
    'sun-uranus': {
      'Conjonction': 'Votre essence solaire et originalité uranienne fusionnent créant individualité électrique radicale impossible ignorer. Vous êtes rebelle visionnaire dont unique personnel s\'exprime sans compromis audacieux. Votre presence communique immédiatement: je suis différent fondamentalement et je m\'en fiche. Cette radicalité authentique inspire libération chez autres. Le défi: cette fusion crée instabilité inherente dans identité: vous changez radicalement périodiquement car essence incorpore besoin liberté absolue transformation. Apprendre que authenticité radicale peut aussi construire au lieu seulement détruire convention.',
      'Trigone': 'Un flux harmonieux magnifique relie essence authentique à originalité uranienne créant visionnaire authentiquement respecté. Votre unicité émane essence sincère, non affectation rebelle artificielle. Vous êtes naturellement avant-gardiste car essence demande innovation constante authentique. Votre liberté inspirante vient intégrité personnelle, pas rébellion contre éternelle. Visionnaire personnel incarne futur possible crédible car enraciné essence vivante. C\'est l\'aspect du rebelle authentique dont radicalité crée inspiration durable construction nouvelle.',
      'Carré': 'Votre ego solaire et besoin liberté uranien entrent en conflit créant tensions identité-changement stimulantes perpétuelles. Vous oscillez entre stabilité identitaire construite et besoin destruction radicale absolue perpétuelle. Affirmation égoïste de qui vous êtes s\'oppose constamment à pulsion uranienne balayer tout changement radical. Ces oscillations créent instabilité identitaire: qui êtes-vous réellement si changez constamment? Cette friction inconfortable force cependant authenticité radicale progressive: apprendre que vraie liberté vient acceptation essence mutante, pas combat constant contre soi.',
      'Opposition': 'Votre essence solaire stable assertive et besoin liberté uranien radical dansent en opposition perpétuelle créant dualité instabilité existentielle épuisante. Vous oscillez vertigineusement entre affirmation personnelle construite stable et besoin rébellion absolue contre toute stabilité. Identité oscillante incessante: une jour vous êtes qui prétendez être; lendemain vous avez tout détruit changé radicalement. Cette dualité crée confusion profonde: suis-je ma stabilité personnel ou ma liberté radicale? L\'intégration laborieuse crée liberté responsable où changement radical s\'enracine dans essence authentique plutôt que rébellion contre rien.',
      'Sextile': 'Un sextile entre essence et liberté crée harmonie naturelle magnifique où unicité authentique s\'exprime courageusement. Votre originalité émane essence sincère, pas pose artifice rebelle. Les gens respectent votre liberté car voient authenticité fondamentale se refusant compromis. Votre différence devient atout car enracinée conviction personnelle profonde. C\'est l\'aspect du visionnaire authentique dont liberté inspire car vient intégrité essence incarnée radicalement.'
    },
    'sun-neptune': {
      'Conjonction': 'Votre essence solaire et imagination neptunienne fusionnent créant aura mystérieuse charismatique magnétique irrésistible. Vous êtes visionnaire artiste dont essence brille spiritualité incarnée en chair. Votre présence inspire car émane quelquechose ineffable transcendant au-delà rationnel. Les gens sentent votre connexion mondes invisibles. Le défi: cette fusion brouille ligne entre authentique essence et fantasme personnel: qui êtes-vous vraiment versus qui imaginez-vous? Apprendre discerner soi véritable des projections illusoires fantasmées.',
      'Trigone': 'Un flux harmonieux magnifique relie essence authentique à imagination spirituelle créant visionnaire incarné enraciné. Votre rêves prennent forme concrète car émane essence sincère, non delusion éthérée vague. Créativité spirituelle soutient identité: vous créez art transformateur reflétant vérité profonde mystique. Inspiration mystique vient essence vivante, pas escapisme. Votre aura mystique inspire respectueusement. C\'est l\'aspect du visionnaire enraciné dont spiritualité authentique transforme réalité.',
      'Carré': 'Votre ego solaire assertif et besoin spirituel neptunien entrent en conflit créant tension identité-mystique confusion. Vous oscillez entre affirmation claire de qui êtes et doute mystique dissolvant identité. Confusion identitaire menace: difficulté discerner soi véritable des fantasmes imaginaires spirituels. Vous pouvez vous perdre mystique ou au contraire devenir excessivement rationnel rejetant vision. Cette friction inconfortable cultive cependant discernement spirituel authentique progressive: apprendre que vraie spiritualité enracine identité au lieu la dissoudre.',
      'Opposition': 'Votre essence solaire claire assertive et besoin spirituel neptunien dansent en opposition perpétuelle créant dualité brume-clarté épuisante confus. Vous oscillez vertigineusement entre affirmation personnelle lucide rationnelle et brume spirituelle douteuse dissolvante. Identité oscillante: période clarté absolue; période dissolution mystique complète. Cette dualité crée confusion profonde: qui suis-je vraiment en essence rationnel ou spirituelle mystique? L\'intégration laborieuse crée sagesse spirituelle authentiquement enracinée où mystique se manifeste clairement.',
      'Sextile': 'Un sextile entre essence et imagination crée harmonie naturelle magnifique où mystique authentique s\'exprime clairement. Votre spiritualité émane essence sincère vivante, non escapisme. Vos rêves artistiques s\'enracinent réalité: imagination fertile crée manifestations concrètes inspirantes. L\'imagination enrichit authenticité plutôt que la contrédire. C\'est l\'aspect du visionnaire authentique dont mystique enracinée transforme le monde.'
    },
    'sun-pluto': {
      'Conjonction': 'Votre essence solaire et pouvoir plutonien fusionnent créant intensité magnétique irrésistible transformatrice impressionnante. Vous êtes phénix incarné dont simple présence transforme mondes emotionnels gens autour. Votre essence porte pouvoir inévitable: gens sentent votre capacité régénérer destruction profonde. Vous maniez pouvoir de transformation naturellement magnétiquement involontairement. Le défi: ce pouvoir inconscient peut devenir dominant abusif si insouciant. Apprendre canaliser transformation responsablement car votre essence change réalité inévitablement.',
      'Trigone': 'Un flux harmonieux magnifique relie essence authentique à pouvoir transformateur créant phénix respecté responsable. Votre charisme transformateur émane essence sincère, non manipulation froide. Vous guidez transformation car essence porte autorité naturelle. Leadership charismatique change mondes: gens vous suivent car reconnaissent pouvoir authentique transformateur. Votre transformation enrichit uniquement car enracinée intégrité. C\'est l\'aspect du leader transformateur authentique dont pouvoir crée régénération nouvelle.',
      'Carré': 'Votre ego solaire et pouvoir plutonien entrent en conflit créant tension pouvoir stimulante. Vous oscillez entre affirmation personnelle constructrice et besoin destruction régénératrice radicale. Luttes pouvoir répétées testent autorité personnelle: comment gouverner ce pouvoir intense? Affirmation égoïste s\'oppose constamment à pulsion transformation absolue. Cette tension inconfortable forge cependant pouvoir responsable authentique: apprendre que vraie puissance démarre intégrité personnelle, pas domination égoïste.',
      'Opposition': 'Votre essence solaire assertive créatrice et pouvoir plutonien destructeur dansent en opposition perpétuelle créant dualité intensité épuisante contradictoire. Vous oscillez vertigineusement entre affirmation personnelle constructrice stable et besoin destruction régénération radicale inévitable. Une jour êtes leader constructeur; lendemain destructeur régénérateur conscient inconscient. Cette dualité crée ambivalence pouvoir: conscient-je pouvoir créer détruire? L\'intégration laborieuse crée transformation responsable où destruction régénère plutôt que dévaste.',
      'Sextile': 'Un sextile entre essence et pouvoir crée harmonie naturelle magnifique où transformation authentique s\'exprime clairement. Votre pouvoir émane essence sincère vivante constructrice. Les gens acceptent votre transformation car voient intégrité fondamentale. Votre pouvoir enrichit monde au lieu le détruire. C\'est l\'aspect du transformateur authentique dont régénération vient essence incarnée responsablement puissante.'
    },
    'moon-mercury': {
      'Conjonction': 'Vos émotions et intellect fusionnent créant intelligence émotionnelle naturelle verbale. Vous communiquez sentiments avec clartè intuitive impeccable touchant cœur gens directement. Vos mots portent charge émotionnelle authentique car émane vraiment sens profonds. Vous êtes psychologue naturel comprenant dynamiques affectives sans effort intellectuel. Le défi: vous pouvez parler émotions excessivement devenant bavard dramatique. Apprendre filtrer émotions et pensées avec discernement.',
      'Trigone': 'Un flux harmonieux magnifique relie émotions authentiques à pensée claire créant intelligence émotionnelle remarquable incarnée. Votre compréhension psychologie humaine émane essence sincère, non analyse froide théorique. Vous guérissez verbalement car mots portent substance émotionnelle véritable. Votre communication nourrit gens car comprennent subjectivement votre empathie intellectuelle. C\'est l\'aspect du thérapeute naturel dont compréhension combine cœur et esprit.',
      'Carré': 'Votre intellect analytique critique et besoins émotionnels expéditifs entrent conflit perpétuel créant tension esprit-cœur frustrant. Vous oscillez entre besoin exprimer émotions violemment et critique impitoyable auto-destructrice vos sentiments. Penses trop vos émotions les paralyze; ou hyperactivité émotionnelle nuit pensée rationnelle équilibrée. Cette tension inconfortable forge cependant intelligence émotionnelle progressive: apprendre que vraie sagesse intègre cœur et esprit sans hiérarchie.',
      'Opposition': 'Votre monde émotionnel authentique et intellect critique dansent opposition perpétuelle créant dualité interne exhausting. Vous oscillez vertigineusement entre volcan émotionnel débordant incontrôlable et analyste glacé rejetant tous sentiments. Gens sentent cette contradiction: moment vous écoutez émotionnellement; moment vous analysez intellectuellement froidement. L\'intégration laborieuse crée dialogue interne sain où émotions informent perspective et pensée honore sentiment.',
      'Sextile': 'Un sextile entre émotions et pensée crée harmonie naturelle magnifique où intelligence émotionnelle émane spontanément. Votre communication nourrit gens car émane vrai sentiment articulé clairement intelligemment. Vous enseignez psychologie car comprenez cœur humain intellectuellement. C\'est l\'aspect du thérapeute communicateur authentique dont paroles guérissent.'
    },
    'moon-saturn': {
      'Conjonction': 'Vos émotions profondes et discipline saturnienne fusionnent créant maturité précoce ancrage émotionnel. Vous ressentez gravement profondément sans dramatisation légère surface. Responsabilité structure vos sentiments naturellement: émotions portent poids importants. Vous protégez sentimental intensément car comprenez risques rejet abandonment. Le défi: cette maturité peut figér émotions dans restriction excessive retrait. Apprendre que vulnérabilité authentique renforce ne diminue stabilité.',
      'Trigone': 'Un flux harmonieux magnifique relie émotions authentiques à discipline saturnienne créant stabilité émotionnelle mature incarnée. Votre maturité émane essence sincère, non froide retransmission figée. Vous offrez support émotionnel fiable car fondé compassion enracinée responsabilité. Vos sentiments sont des fondations solides authentiques dont gens comptent. C\'est l\'aspect du nourricier mature dont responsabilité affective crée sécurité durable.',
      'Carré': 'Vos émotions sincères et besoin contrôle saturnien entrent conflit perpétuel créant tension vulnérabilité-protection frustrante. Vous oscillez entre besoin exprimer sentiments authentiquement et peur rejet frigide retrait protecteur. Répression émotionnelle menace isolement affectif complet; ou débordement émotionnel révolté contre discipline. Cette friction inconfortable forge cependant tendresse responsable progressive: apprendre que vraie force émotionnelle vient vulnérabilité courageuse protégée maturité.',
      'Opposition': 'Votre besoin émotionnel profond et besoin distance saturnienne dansent opposition perpétuelle créant dualité attachment-isolation épuisante. Vous oscillez vertigineusement entre desir fusion émotionnelle complète sécurité tendre et besoin isolement distance froid protection. Gens sentent contradiction: moments tendres; moments froids distants. L\'intégration laborieuse crée attachement mature où proximité affective coexiste indépendance nécessaire.',
      'Sextile': 'Un sextile entre émotions et discipline crée harmonie naturelle où maturité affective émane authenticité. Votre stabilité émotionnelle inspire confiance profonde. Les gens sentent support fiable responsable dans vos sentiments. C\'est l\'aspect du nourricier responsable dont amour durable construit fondations.'
    },
    'moon-uranus': {
      'Conjonction': 'Vos émotions profondes et liberté uranienne fusionnent créant instabilité affective magnétique imprévisible. Vos sentiments changent radicalement sans prévenir car besoin liberté émotionnelle absolue. Vous refusez contrainte sentimentale émotionnelle: attachement menace essence liberté radicale. Votre aura émotionnelle attire car authentiquement changante non figée. Le défi: cette instabilité crée abandon potentiel cyclique chez aimés souffrant cycle attachment-detachment. Apprendre que liberté affective peut inclure engagement responsable loyal différent.',
      'Trigone': 'Un flux harmonieux magnifique relie émotions authentiques à liberté uranienne créant authenticité affective libre incarnée. Vos émotions émane essence sincère radicalement changeante; gens respectent cela car authentique. Vous aimez originalement: attachement non conventionnel non restrictif. Votre liberté affective inspire autonomie chez aimés au lieu dépendance. C\'est l\'aspect du partenaire libre dont amour libère plutôt que confine.',
      'Carré': 'Vos émotions profonds et besoin liberté absolu entrent conflit perpétuel créant instabilité affective frustrant. Vous oscillez entre besoin attachement intense sécurité émotionnelle et pulsion rupture radicale liberté totale. Cycles emotionnels imprévisibles: periode d\'attachement suivi instantanément rejet complet. Cette tension inconfortable force cependant attachement sain autonome progressif: apprendre que vraie liberté inclut responsabilité affective.',
      'Opposition': 'Votre besoin securité émotionnelle profonde et besoin liberté absolue dansent opposition perpétuelle créant dualité attachment-isolation épuisante. Vous oscillez vertigineusement entre fusion emotionnelle complète sécurité et isolement total liberté radicale. Gens sentent cette contradiction impossibilité: amour n\'est jamais certain avec vous. L\'intégration laborieuse crée autonomie relationnelle où liberté coexiste attachement responsable.',
      'Sextile': 'Un sextile entre émotions et liberté crée harmonie naturelle où authenticité affective émane courage. Votre liberté émotionnelle inspire autonomie saine chez aimés. Les gens respectent votre indépendance affective car voient intégrité fondamentale changeante. C\'est l\'aspect du partenaire autonome dont amour libre libère.'
    },
    'moon-neptune': {
      'Conjonction': 'Vos émotions profondes et imagination spirituelle neptunienne fusionnent créant empathie supra-normale osmotique extraordinaire. Vous absorbez sentiments gens comme buvard émotionnel absorbant complètement confusion mentale affective. Votre sensibilité est presque télépathique: vous ressentez sans effort intention profonde autrui. Votre grande âme nourrit mondes invisibles émotionnel psychique. Le défi: cette fusion brouille limite claire soi-autrui risquant perte identité aux caprices émotionnels gens. Apprendre discerner propres sentiments de ressentis absorbés extérieurs.',
      'Trigone': 'Un flux harmonieux magnifique relie émotions authentiques à imagination transformatrice créant empathie incarnée guérisseuse. Votre compréhension émotionnelle émane essence sincère, non escapisme dénégateur. Vous guérissez profondément car combinez compréhension empathe à sagesse océanique. Vos sentiments ouverts accès mondes âmes que vous canalisez guérison. C\'est l\'aspect du guérisseur émotionnel authentique dont amour transforme.',
      'Carré': 'Vos émotions authentiques et besoin fusion spirituelle neptunienne entrent conflit créant confusion affective brume. Vous oscillez entre besoin connexion émotionnelle clara consciente et dissolution complètement aux sentiments-rêves flous spirituels. Limites affectives disparaissent: difficultés séparer empathe propre de gens aimés. Cette friction inconfortable cultive cependant discernement émotionnel progressif: apprendre que vraie empathie requiert clarté frontière.',
      'Opposition': 'Votre authenticité émotionnelle et besoin fusion spirituelle dansent opposition perpétuelle créant dualité clarté-brume épuisante. Vous oscillez entre clarté émotionnelle directe consciente et dissolutions complètement spirituelle-imaginaire fusion mystique. Gens sentent instabilité: moment vous êtes présent; moment vous êtes spirituellement ailleurs. L\'intégration laborieuse crée empathie enracinée où spiritualité honore clarté affective.',
      'Sextile': 'Un sextile entre émotions et imagination crée harmonie naturelle où empathie authentique émane spiritualité. Votre sensibilité inspire guérison sans confusion limites. Les gens sentent soutien émotionnel profondément spirituel. C\'est l\'aspect du guérisseur spirituel authentique dont amour guérit.'
    },
    'moon-pluto': {
      'Conjonction': 'Vos émotions profondes et pouvoir régénérateur plutonien fusionnent créant intensité affective abyssale irrésistible magnétique. Vos sentiments portent pouvoir transformateur: gens changent profondément auprès vous. Votre présence émotionnelle crée alchimies régénération forcée chez gens autour. Attachement menace avec obsessions possessives car émotions intense dominent. Le défi: cette fusion crée mers affectives dangereuses pouvant submerger soi autrui. Apprendre canaliser intensité avec sagesse responsable non destructrice.',
      'Trigone': 'Un flux harmonieux magnifique relie émotions authentiques à pouvoir transformateur créant guérisseur émotionnel incarné puissant. Votre compréhension émotionnelle émane essence sincère transformatrice, non manipulation. Vous régénérez gens émotionnellement: traversent transformations profondes votre présence. Votre intensité inspire confiance car enracinée intégrité. C\'est l\'aspect du guérisseur affectif puissant dont amour régénère.',
      'Carré': 'Vos émotions authentiques et besoin destruction-régénération plutonien entrent conflit créant tempêtes affectives destructrices. Vous oscillez entre tendresse vulnérable authentique et obsessions possessives controlantes destructrices. Intensité émotionnelle peut devenir destructrice: gens sentent menace subconsciente annihilation. Cette friction inconfortable forge cependant pouvoir affectif responsable progressif: apprendre que vraie puissance régénère au lieu détruire.',
      'Opposition': 'Votre légèreté émotionnelle surface et profondeur destructrice dansent opposition perpétuelle créant dualité lightness-abyss épuisante. Vous oscillez entre émotions faciles brèves surface et plongées abyssales intensité possession. Gens sentent instabilité: émotions semblent profondes; puis rejet complet soudain. L\'intégration laborieuse crée transformation affective enracinée où intensité crée régénération constructive.',
      'Sextile': 'Un sextile entre émotions et pouvoir crée harmonie naturelle où transformation authentique émane intensité. Votre puissance affective inspire confiance profonde respect. Les gens acceptent votre intensité car voient intégrité fondamentale. C\'est l\'aspect du guérisseur transformateur dont amour puissant régénère constructivement.'
    },
    'mercury-mars': {
      'Conjonction': 'Votre intellect rapide et action impulsive fusionnent créant communicateur percutant guerrier verbal. Vous parlez vite, pensez encore plus vite, agissez instinctivement sans délai. Votre rhétorique porte pouvoir persuasif immédiat car émerge urgence authentique passion. Débats sont votre terrain: argumentation vive brûlante incendiaire. Le défi: cette fusion crée impulsivité verbale irréfléchie blessante. Paroles sortent avant clartè mentale. Apprendre filtrer passion intellectuelle avec sagesse discernement.',
      'Trigone': 'Un flux harmonieux magnifique relie pensée claire à action decisively créant communicateur persuasif efficace incarné. Votre rhétorique émane conviction authentique, non manipulation froide. Vous agissez correctement car pensée guide action harmonieusement. Leaders naturels dont parole inspire mouvement. Votre efficacité vient intégration seamless pensée-action. C\'est l\'aspect du communicateur guerrier respecté.',
      'Carré': 'Votre intellect analytique critique et action impulsive entrent conflit perpétuel créant tensions pensée-action frustantes. Vous oscillez entre besoin analyser minutieusement paralysant action et pulsion agir avant penser complètement. Paroles impulsives blessent: agissez sans réflexion suffisante. Cette friction inconfortable forge cependant actions considérées progressivement: apprendre que vraie puissance combine pensée profonde action courageuse.',
      'Opposition': 'Votre pensée rationelle lente et action impulsive dansent opposition perpétuelle créant dualité paralysie-impatience épuisante. Vous oscillez entre analyse éternelle indécision et agir irrefléchi impulsif sans réflexion. Gens sentent incohérence: moment philosophe réfléchi; moment guerrier impulsif. L\'intégration laborieuse crée action décidée basée réflexion sage.',
      'Sextile': 'Un sextile entre pensée et action crée harmonie naturelle où rhétorique soutient momentum. Votre parole inspire action effectivement. Vos idées rapidement se manifestent. C\'est l\'aspect du guerrier communicateur dont puissance combine réflexion action courageuse.'
    },
    'mercury-jupiter': {
      'Conjonction': 'Votre intellect rapide et sagesse jupitérienne fusionnent créant penseur bavard visionnaire expansif. Vous communiquez généreusement partagant savoir abondamment sans réserve. Votre parole porte autorité car allie brillance mentale sagesse teintée. Vous êtes pédagogue naturel: enseignement captive fascine. Le défi: bavardage excessif possibilité, promesses surcommitées intenables. Parlez trop, promettez trop. Apprendre filtrer expansion verbale avec discernement responsable.',
      'Trigone': 'Un flux harmonieux magnifique relie pensée claire à sagesse généreuse créant mentor inspirant incarné. Votre enseignement émane conviction authentique profonde. Vous partagez savoir car comprenez vraiment significativement. Vos idées portent poids profondeur authentique. C\'est l\'aspect du professeur authentique dont sagesse inspire.',
      'Carré': 'Votre intellect analytique et pulsion expansion jupitérienne entrent conflit perpétuel créant tensions focus-expansion. Vous oscillez entre besoin analyser minutieusement détails et désir généraliser vaguement grand cadre. Bavardage excessif possibilité; promesses intenables. Cette friction cultive cependant discernement progressif: apprendre que vraie sagesse combine particulier universel.',
      'Opposition': 'Votre pensée minutieuse détaillée et vision expansive dansent opposition perpétuelle créant dualité détail-généralité épuisante. Vous oscillez entre pointillisme infini et généralisation vague absurde. Cette contradiction crée frustration: suis-je penseur de détail ou visionnaire expansif? L\'intégration laborieuse crée synthèse où vision honore détail.',
      'Sextile': 'Un sextile entre pensée et sagesse crée harmonie naturelle où idées inspirent généreusement. Votre enseignement combine clarté et profondeur. C\'est l\'aspect du sage communicateur dont parole inspire transformation.'
    },
    'mercury-uranus': {
      'Conjonction': 'Votre intellect rapide et innovation uranienne fusionnent créant génie mental radical révolutionnaire visionnaire. Vous pensez avant époque: idées sortent structures mentales non conventionnelles étonnantes. Votre communication porte pouvoir de révolution intellectuelle. Gens trouvent vos pensées brillantes avant-gardistes radicales. Le défi: cette fusion crée imprévisibilité mentale chaotique parfois incompréhensible. Pensée saute étapes logiques directement illumination radicale. Apprendre expliquer genius avec clarté communicable.',
      'Trigone': 'Un flux harmonieux magnifique relie pensée claire à innovation uranienne créant visionnaire respecté incarné. Votre genius émane convention, non pose artificielle. Vos idées futures sont grounded en réalité actuelle. Vous êtes penseur révolutionnaire crédible. C\'est l\'aspect du visionnaire intellectuel authentique dont idées avancent époque.',
      'Carré': 'Votre intellect ordonné logique et pulsion innovation radicale entrent conflit perpétuel créant tensions stabilité-changement. Vous oscillez entre besoin clarté intellectuelle rationnelle et besoin destruction radicale anciennes structures mentales. Pensée imprévisible chaotique: sautez logiquement sans explications. Cette friction crée cependant originalité progressive: apprendre canaliser innovation avec clarté logique.',
      'Opposition': 'Votre pensée logique ratonnelle et innovation radicale dansent opposition perpétuelle créant dualité ordre-chaos épuisante. Vous oscillez entre intellect rigide ordonné et génialité chaotique radicale. Gens sentent imprévisibilité: votre pensée saute logiquement. L\'intégration laborieuse crée génie grounded où innovation honore logique.',
      'Sextile': 'Un sextile entre pensée et innovation crée harmonie naturelle où idées révolutionnaires émergent clairement. Votre genius combine originalité clarté. C\'est l\'aspect du génie communicateur dont idées révolutionnaires inspirent.'
    },
    'mercury-neptune': {
      'Conjonction': 'Votre intellect rapide et imagination neptunienne fusionnent créant penseur poétique mystique visionnaire. Vous communiquez symboliquement: mots portent meanings multiples subtiles ineffables. Votre pensée flotte entre mondes rationnels imaginaires. Communication émane essence mystique. Le défi: cette fusion crée confusion mentale brume intellectuelle. Difficultés discerner pensée claire de fantasme imaginaire. Apprendre discerner réalité de rêve intellectuellement.',
      'Trigone': 'Un flux harmonieux magnifique relie pensée claire à imagination créant penseur poétique authentiquement incarné. Votre langage émane conviction profonde mystique. Vous êtes écrivain artiste communicateur spirituel. Vos mots touchent âmes invisibles. C\'est l\'aspect du poète communicateur dont pensée inspire spirituellement.',
      'Carré': 'Votre intellect clair logique et imagination brouillée neptunienne entrent conflit perpétuel créant tension clarté-flou. Vous oscillez entre pensée cristalline logique rationnelle et dissolution mentale complète dans fantasme revêtement. Confusion mentale menace: difficultés discerner soi réalité. Cette friction cultive cependant discernement progressif: apprendre imaginer intelligemment.',
      'Opposition': 'Votre pensée logique rationnelle et imagination mystique dansent opposition perpétuelle créant dualité logique-rêve épuisante. Vous oscillez entre intellectuel rigoureux scientifique et rêveur complet nébuleux. Gens sentent instabilité mentale: moment pragmatique; moment idéaliste nébuleux. L\'intégration laborieuse crée pensée imaginative enracinée.',
      'Sextile': 'Un sextile entre pensée et imagination crée harmonie naturelle où créativité intellectuelle émane spiritualité. Votre langage poétique inspire profondément. C\'est l\'aspect du mystique penseur dont parole porte magie subtile.'
    },
    'mercury-pluto': {
      'Conjonction': 'Votre intellect rapide et investigation plutonienne fusionnent créant penseur insatiable perceur secrets abyssaux. Vous creusez mentalement jusqu\'à vérités cachées profonds: mots deviennent armes d\'investigation. Votre curiosité dévore mysère: vous fouillez obsessivement comprenante. Communication porte pouvoir régénération: paroles transforment consciences. Le défi: cette fusion crée obsession mentale paralysante manipulation verbale possible. Pensée devient possessive contrôlante dominatrice. Apprendre canaliser pouvoir investigateur avec sagesse responsable éthique.',
      'Trigone': 'Un flux harmonieux magnifique relie pensée claire à investigation plutonienne créant penseur puissant incarné. Votre analyse émane conviction profonde authentique. Vous découvrez secrets car comprenez profondément humaine psychique. Votre parole porte autorité transformatrice. C\'est l\'aspect du psychologue investigateur authentique dont sagesse guérit.',
      'Carré': 'Votre intellect curieux et pulsion investigation obsessive entrent conflit perpétuel créant tensions découverte-secret. Vous oscillez entre besoin connaître tout complètement et secret jaloux protégeant mystères. Obsession mentale menace: vous creusez compulsivement. Manipulation verbale possible: paroles blessent. Cette friction forge discernement progressif: apprendre que vraie puissance protège secrets appropriés.',
      'Opposition': 'Votre pensée superficielle légère et investigation profonde obsessive dansent opposition perpétuelle créant dualité surface-abysse épuisante. Vous oscillez entre acceptation surface apparences et obsession fouille abyssale. Cette instabilité crée confusion: combien creuser profondeur? L\'intégration laborieuse crée sagesse discernement où investigation honore secrets.',
      'Sextile': 'Un sextile entre pensée et investigation crée harmonie naturelle où curiosité pénètre effectivement secrets. Votre parole découvre profondeurs authentiquement. C\'est l\'aspect du sage investigateur dont puissance comunnique sagesse.'
    },
    'venus-mars': {
      'Conjonction': 'Votre beauté douce et passion brûlante fusionnent créant magnétisme irrésistible sexy charismatique. Vous séduisez par contraste: tendresse alliée désir intense. Votre attraction est dangereusement magnétique d\'énergie sensuelle débordante. Relations deviennent passionnées mêllement rapide. Le défi: cette fusion crée intensité potentiellement destructrice. Passion devient jalousie obsessive; tendresse se transforme possessivité. Apprendre balancer passion avec tendresse authentique respectueuse.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à passion créant amant authentiquement incarné magnétique. Votre désir émane conviction sincère; tendresse porte profondeur authentique. Vous aimez passionnément sans destructivité. Attraction naturelle harmonieuse respectée. C\'est l\'aspect du séducteur authentique dont passion nourrit plutôt que dévaste.',
      'Carré': 'Votre affection tendre délicate et passion brûlante intense entrent conflit perpétuel créant tensions affection-désir. Vous oscillez entre tendre affectuosité protégeante et passion agressive dominatrice destructrice. Relations turbulentes: moment tendresse; moment passion destructrice jalousie. Cette friction forge équilibre progressif: apprendre que passion honnête peut coexister tendresse respectueuse.',
      'Opposition': 'Votre tendresse délicate et passion violente dansent opposition perpétuelle créant dualité tendresse-fureur épuisante. Vous oscillez entre amour doux cherchant sécurité et désir violent destructeur possessif. Partenaires sentent instabilité affective: moments tendres; moments froids rejet. L\'intégration laborieuse crée passion affectueuse authentique.',
      'Sextile': 'Un sextile entre beauté et passion crée harmonie naturelle où attractions s\'expriment pleinement authentiquement. Votre magnétisme émane sincérité passion contrôlée. Vous aimez profondément avec jouissance saine. C\'est l\'aspect de l\'amant passionné authentique dont désir crée connexion durable.'
    },
    'venus-jupiter': {
      'Conjonction': 'Votre beauté gracieuse et générosité expansive fusionnent créant charme débordant magnétique généreux. Vous aimez généreusement sans réserve: amour donne gracieusement abondant. Votre charme attire chanceux: bonté génère bonté retour. Vous êtes artiste créatif naturellement populaire. Le défi: excès affectif possibles, générosité naïve pouvant causer ennui. Trop de grâce peut créer dépendances chez aimés. Apprendre filtrer générosité avec discernement.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à générosité créant artiste créatif incarné populaire. Votre grâce émane conviction sincère expansive. Vous aimez généreusement car croyez fondamentalement bonté. Populaire naturelle: gens sentent votre magnanimité. C\'est l\'aspect du charitable charmant dont générosité crée bonheur.',
      'Carré': 'Votre affection mesurée et pulsion générosité excessive entrent conflit perpétuel créant tensions modération-excès. Vous oscillez entre tendresse retenue prudente et générosité naïve irréfléchie intenable. Indulgences affectives créent problèmes: déceptions romantiques répétées. Cette friction cultive discernement progressif: apprendre que vraie générosité honore limites saines.',
      'Opposition': 'Votre retenue affective prudente et générosité débordante dansent opposition perpétuelle créant dualité restriction-expansion épuisante. Vous oscillez entre amour parsimieux jaloux et générosité excessive inconscience. Partenaires sentent instabilité: moments riches affectifs; moments vides détachés. L\'intégration laborieuse crée générosité équilibrée sage.',
      'Sextile': 'Un sextile entre beauté et générosité crée harmonie naturelle où grâce donne authentiquement généreusement. Votre charme émana bonté sincère naturelle. Vous aimez abondamment sans naïveté. C\'est l\'aspect de l\'amant généreux dont magnanimité crée bonheur durable.'
    },
    'venus-saturn': {
      'Conjonction': 'Votre beauté gracieuse et discipline saturnienne fusionnent créant élégance austère loyauté incarnée. Vous aimez sérieusement profondément: affection porte poids matériel responsabilité. Votre beauté est intemporelle car fondée substance, pas superficialité. Vous êtes partenaire loyal dévoué ancré. Le défi: rigidité affective possible, difficultés exprimer tendresse librement. Amour devient trop sérieux perdant joie spontanéité. Apprendre tempérer discipline affective avec tendresse authentique.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à discipline créant partenaire loyal incarné durable. Votre affection émane conviction profonde sincère. Vous aimez loyalement car comprenez importance engagement responsable. Élégance intemporelle inspire respect confiance durable. C\'est l\'aspect du partenaire loyal dont amour constructif dure.',
      'Carré': 'Votre affection chaleureuse tendre et besoin discipline froide entrent conflit perpétuel créant tensions tendresse-retrait. Vous oscillez entre besoin exprimer tendresse chaleureuse et peur vulnérabilité causant retrait émotionnel figé. Difficultés exprimer amour librement: rigidité affective menace. Cette friction forge tendresse mature progressive: apprendre que vraie stabilité vient vulnérabilité courageuse.',
      'Opposition': 'Votre affection chaleureuse tendre et froideur saturnienne retraite dansent opposition perpétuelle créant dualité chaleur-glace épuisante. Vous oscillez entre moments tendres chaleureux et retraits émotionnels froids isolements. Partenaires sentent imprévisibilité affective: amour vient-il ou rejet? L\'intégration laborieuse crée affection mature stable.',
      'Sextile': 'Un sextile entre beauté et discipline crée harmonie naturelle où élégance émane stabilité affective. Votre loyauté inspire confiance profonde. Les gens reconnaissent solidité authentique votre amour. C\'est l\'aspect du partenaire loyal respecté dont beauté durable vient substance.'
    },
    'venus-uranus': {
      'Conjonction': 'Votre beauté gracieuse et liberté uranienne fusionnent créant séducteur indépendant imprévisible magnétique. Vous aimez différemment: affection non conventionnelle électrique changeante radicale. Votre attraction repose originalité authentique: vous refusez rôles traditionnels amoureux. Partenaires sentent électricité magnétique imprévisible attisante. Le défi: instabilité affective menace: attachement suivi rejet radical. Amour devient peur pour aimés causant trauma. Apprendre que liberté peut inclure engagement responsable différent.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à liberté créant amant authentiquement indépendant respecté. Votre affection émane conviction sincère radicalement changeante. Vous aimez librement: partenaires sentent autonomie requise. Magnétisme électrique inspire liberté chez aimés plutôt que dépendance. C\'est l\'aspect de l\'amant libre authentique dont amour libère.',
      'Carré': 'Votre affection tendre protégeante et pulsion liberté absolue entrent conflit perpétuel créant tensions engagement-liberté. Vous oscillez entre besoin attachement sécurité affective et peur engament causant rejet abrupt rupture. Instabilité affective répétée: relations changent radicalement sans avertissement. Cette friction forge attachement autonome progressif: apprendre que vraie liberté inclut responsabilité affective.',
      'Opposition': 'Votre besoin fusion attachement profond et besoin liberté absolue isolée dansent opposition perpétuelle créant dualité attachment-isolation épuisante. Vous oscillez entre désir fusionnel complet sécurité affective et fuite liberté radicale totale. Partenaires sentent contradiction: amour vient-il ou liberté totale partir? L\'intégration laborieuse crée autonomie relationnelle.',
      'Sextile': 'Un sextile entre beauté et liberté crée harmonie naturelle où amour authentique libère. Votre indépendance inspire autonomie saine chez aimés. Partenaires respectent votre liberté car voient intégrité fondamentale. C\'est l\'aspect du partenaire autonome dont amour libre libère.'
    },
    'venus-neptune': {
      'Conjonction': 'Votre beauté gracieuse et imagination spirituelle neptunienne fusionnent créant romantique idéaliste rêveur spiritualisé. Vous aimez idéalement: affection porte qualité ineffable magique transcendante. Votre beauté semble éthérée mystique: gens sentent dimension spirituelle votre présence. Amour devient quête âme sœur mythologique. Le défi: illusions romantiques menacent confusions affectives répétées. Vous tombez amour fantasmes au lieu réalité humaine. Apprendre discerner rêve de réalité relationnelle authentique.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à imagination créant amant idéaliste authentiquement incarné. Votre affection émane conviction sincère spirituelle. Vous aimez profondément avec sens âme sœur fondé in réalité non fantasme. Votre créativité artistique spirituelle enrichit relations. C\'est l\'aspect du romantique authentique dont amour inspire art.',
      'Carré': 'Votre affection réaliste pragmatique et besoin fusion spirituelle idéale entrent conflit créant illusions affectives. Vous oscillez entre besoin connexion spirituelle transcendante et réalité humaine décevante banale. Déceptions romantiques répétées: rêves idéalisés ne correspondent réalité partenaires bouche réelle. Cette friction cultive discernement amoureux progressif: apprendre aimer réalité non fantasme.',
      'Opposition': 'Votre affection pragmatique réelle et idéalisme spirituel dansent opposition perpétuelle créant dualité réalité-rêve épuisante. Vous oscillez entre amour réaliste bassement humain et romance spirituelle transcendante. Cette dualité crée confusion: aimez-vous réellement personne ou fantasme spirituel intérieur? L\'intégration laborieuse crée amour réaliste spirituel enraciné.',
      'Sextile': 'Un sextile entre beauté et imagination crée harmonie naturelle où romance authentique s\'enracine spiritualité. Votre affection émane sincérité spirituelle incarnée réalité. Vous aimez profondément avec vision spirituelle des relations. C\'est l\'aspect du romantique authentique dont amour spirituel ne fuit réalité.'
    },
    'venus-pluto': {
      'Conjonction': 'Votre beauté gracieuse et intensité plutonienne fusionnent créant séducteur magnétique puissant irrésistible. Vous aimez intensément: affection porte pouvoir transformateur obsessif possessif magnétique. Votre magnétisme est dangereux: gens tombent sous votre charme complètement submergés. Attachement devient obsession plutonienne: vous dominez affectivement consciemment inconsciemment. Le défi: jalousie possessivité menace relations. Amour transforme contrôle destructeur inévitable. Apprendre canaliser intensité avec sagesse responsable non destructrice.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à intensité créant amant magnétique transformateur incarné. Votre affection émane conviction sincère profondement transformatrice. Vous aimez magnétiquement: partenaires transforment profondément votre présence. Votre pouvoir inspire confiance car enraciné intégrité. C\'est l\'aspect de l\'amant puissant dont intensité régénère.',
      'Carré': 'Votre affection tendre douce et pulsion domination possessive entrent conflit perpétuel créant relations turbulentes. Vous oscillez entre tendresse authentic sincère et obsession jalouse controlante destructrice. Intensité affective peut blesser: partenaires sentent menace subconsciente. Jalousie répétée: relations explosives conflictuelles. Cette friction forge amour puissant responsable progressif: apprendre que vraie puissance transforme au lieu contrôler.',
      'Opposition': 'Votre affection légère superficielle et intensité abyssale possessive dansent opposition perpétuelle créant dualité tendresse-possession épuisante. Vous oscillez entre moments tendres apparents et obsessions jalouses destructrices complètes. Partenaires sentent instabilité: amour vient-il ou possessive jalousie destructrice? L\'intégration laborieuse crée intensité affective responsable.',
      'Sextile': 'Un sextile entre beauté et intensité crée harmonie naturelle où magnétisme authentique transforme constructivement. Votre pouvoir affectif inspire confiance profonde. Gens acceptent votre intensité car voient intégrité fondamentale. C\'est l\'aspect du séducteur puissant dont amour régénère.'
    },
    'mars-jupiter': {
      'Conjonction': 'Votre action impulsive et sagesse jupitérienne fusionnent créant aventurier impétueux visionnaire courageux. Vous agissez généreusement expansivament: grands projets, grands rêves réalisés avec audace. Votre action porte vision noble: vous combattez causes justes généreusement. Courage naturel inspire followeurs. Le défi: action imprudente impatienxe menace: vous agissez avant réflechir. Audace devient recklessness: projets échouent par manque sagesse. Apprendre filtrer audace action avec discernement responsable.',
      'Trigone': 'Un flux harmonieux magnifique relie action à sagesse créant entrepreneur inspirant incarné efficace. Votre audace émane conviction sincère généreuse. Vous agissez courageusement car comprenez vision noble réalité. Grands projets réussissent car fondés sagesse actionnable. C\'est l\'aspect du guerrier visionnaire dont action crée grand bien.',
      'Carré': 'Votre action prudente et pulsion audace imprudente entrent conflit perpétuel créant tensions caution-impulsivité. Vous oscillez entre zèle excessif imprudent recklessness et prudence paralysante doute constant. Action imprudente possibilité: projets échouent par impatience. Cette friction forge courage sagesse progressif: apprendre que vraie audace combine vision sagesse.',
      'Opposition': 'Votre action agressive imprudente et sagesse prudente retraite dansent opposition perpétuelle créant dualité audace-prudence épuisante. Vous oscillez entre recklessness audacieuse folle et prudence paralysante indécision. Partenaires sentent instabilité: agissez-vous courageusement ou retraite prudent? L\'intégration laborieuse crée action courageuse responsable.',
      'Sextile': 'Un sextile entre action et sagesse crée harmonie naturelle où audace soutient vision noble. Votre action inspire courageusement. Projets reussissent car fondés sagesse authentique. C\'est l\'aspect du guerrier visionnaire dont action crée bien élevé.'
    },
    'mars-saturn': {
      'Conjonction': 'Votre action impulsive et discipline saturnienne fusionnent créant guerrier stratègue discipliné calculé. Vous agissez lentement sûrement: impatience tempérée par prudence stratégique. Votre courage se manifeste à travers persistance inébranlable déterminacion. Vous construisez solidement: projets durables enracinés réalité. Le défi: frustration interne menace: action entravée barrières obstacles constants. Impatience/discipline crée tension interne perpétuelle. Apprendre que vraie force vient discipline alliée action courageuse.',
      'Trigone': 'Un flux harmonieux magnifique relie action à discipline créant guerrier stratègue incarné efficace. Votre action émane conviction sincère déterminée. Vous accomplissez lentement solidement car comprenez importance construction durable. Persévérance inspire respect confiance. C\'est l\'aspect du guerrier stratègue dont action durable construit.',
      'Carré': 'Votre action impulsive rapide et besoin discipline froide entrent conflit perpétuel créant tensions impatience-retenue. Vous oscillez entre besoin agir rapidement déterminition et peur risque causant inaction figée paralysante. Frustration répétée: action entravée barrières. Cette friction forge volonté de acier progressif: apprendre que vraie force combine discipline action.',
      'Opposition': 'Votre action folle impulsive et discipline rigide retraite dansent opposition perpétuelle créant dualité action-inhibition épuisante. Vous oscillez entre recklessness audacieuse folle et inhibition totale paralysante complète. Cette dualité crée frustration: suis-je guerrier courageux ou prisonnier discipline? L\'intégration laborieuse crée action puissante responsable.',
      'Sextile': 'Un sextile entre action et discipline crée harmonie naturelle où effort structure momentum. Votre persévérance inspire respect. Constructions durable incarnent puissance. C\'est l\'aspect du guerrier stratègue dont action durable crée solidité.'
    },
    'mars-uranus': {
      'Conjonction': 'Votre action impulsive et liberté uranienne fusionnent créant rebelle radical imprévisible révolutionnaire destructeur. Vous agissez sans avertissement: action porte électricité radicale disruptive. Votre énergie libère et détruit conventions créant chaos régénérateur. Révolution est votre terrain naturel: vous êtes agitateur provocateur audacieux. Le défi: cette fusion crée impulsivité destructrice dangereuse. Action devient violence chaotique anarchique. Apprendre canaliser énergie révolutionnaire avec responsabilité constructive.',
      'Trigone': 'Un flux harmonieux magnifique relie action à liberté créant rebelle créateur incarné inspirant. Votre action révolutionnaire émane conviction sincère constructive. Vous libérez par action car comprenez vision future possible. Changement constructif émane votre présence magnétique. C\'est l\'aspect du guerrier révolutionnaire authentique dont action libère.',
      'Carré': 'Votre action mesurée ordonnée et pulsion liberté chaotique entrent conflit perpétuel créant tensions ordre-chaos. Vous oscillez entre besoin structure ordonnée logique et besoin détruire tout radicalement. Impulsivité destructrice menace: action chaotique crée destruction involontaire. Cette friction crée liberté responsable progressive: apprendre que révolution construit au lieu seulement détruire.',
      'Opposition': 'Votre action ordonnée rigoureuse et liberté chaotique dansent opposition perpétuelle créant dualité stabilité-chaos épuisante. Vous oscillez entre rigidité action contrôlée soigneuse et chaos radical impulsif imprévisible. Partenaires sentent instabilité: action stable ou destruction chaotique? L\'intégration laborieuse crée liberté canalisée constructive.',
      'Sextile': 'Un sextile entre action et liberté crée harmonie naturelle où révolution actionne constructivement. Votre action libère inspirante. Changement constructif émane naturellement momentum. C\'est l\'aspect du guerrier libérateur dont action constructive révolutionne.'
    },
    'mars-neptune': {
      'Conjonction': 'Votre action impulsive et imagination neptunienne fusionnent créant croisade visionnaire passionnée spirituelle. Vous combattez causes idéalistes: action porte passion spirituelle transcendante. Votre ardeur inspire mouvements spirituels idéalistes. Vous êtes guerrier visionnaire rêveur inspirant. Le défi: cette fusion crée action floue dispersée. Vision idéaliste supplante pragmatisme: projets échouent par manque concretitude. Apprendre canaliser passion avec réalité tangible practicité.',
      'Trigone': 'Un flux harmonieux magnifique relie action à imagination créant guerrier visionnaire incarné effectif. Votre action émane conviction sincère spirituelle. Vous manifestez rêves par action coordonnée. Passion spirituelle actionne constructivement réalité. C\'est l\'aspect du guerrier visionnaire authentique dont action incarne vision.',
      'Carré': 'Votre action concrète pratique et vision idéale floue entrent conflit perpétuel créant tensions pragmatisme-idéalisme. Vous oscillez entre besoin action décisive concrète et rêve idéaliste vague incohérent. Action floue dispersée menace: projets manquent focus et direction claire. Cette friction cultive action spirituelle enracinée progressive: apprendre que vision nécessite pragmatisme exécution.',
      'Opposition': 'Votre action concrète décisive et imagination floue irréaliste dansent opposition perpétuelle créant dualité pragmatisme-rêve épuisante. Vous oscillez entre guerrier pratique brutal et rêveur idéaliste nébuleux. Partenaires sentent incohérence: action porte vision spirituelle claire ou pure impulsion pratique? L\'intégration laborieuse crée action spirituelle ancrée.',
      'Sextile': 'Un sextile entre action et imagination crée harmonie naturelle où vision actionne manière inspirante. Votre action manifeste rêves. Vision spirituelle guide momentum constructif. C\'est l\'aspect du guerrier visionnaire dont action incarne spiritualité.'
    },
    'mars-pluto': {
      'Conjonction': 'Votre action impulsive et pouvoir plutonien fusionnent créant guerrier transformateur puissant régénérateur destructeur. Votre action porte pouvoir de régénération intense: gens transforment profondément auprès vous. Vous êtes présentateur de mort naissances: action détruit pour reconstruire. Votre présence incite transformation forcée. Le défi: agressivité destructrice menace domination violente. Pouvoir devient malveisance: action détruit sans reconstruire. Apprendre canaliser intensité transformation avec sagesse responsable.',
      'Trigone': 'Un flux harmonieux magnifique relie action à pouvoir créant guerrier transformateur incarné respecté. Votre action émane conviction sincère transformatrice. Vous manifestez régénération car comprenez sagesse destruction créatrice. Votre puissance inspire confiance car enracinée intégrité. C\'est l\'aspect du guerrier transformateur authentique dont action régénère.',
      'Carré': 'Votre action constructrice créative et pulsion destruction radicale entrent conflit perpétuel créant tensions construction-destruction. Vous oscillez entre besoin créer solidement construire et besoin détruire radicalement régénérer. Agressivité destructrice menace: action devient violence domination. Cette friction forge action transformatrice responsable progressive: apprendre que régénération construit uniquement.',
      'Opposition': 'Votre action créatrice constructrice et destruction radicale dansent opposition perpétuelle créant dualité création-destruction épuisante. Vous oscillez entre guerrier constructeur solidaire et destructeur régénérateur radical. Partenaires sentent instabilité: action crée-t-elle ou détruit-elle réalité? L\'intégration laborieuse crée transformation responsable constructive.',
      'Sextile': 'Un sextile entre action et pouvoir crée harmonie naturelle où transformation active constructivement. Votre action transforme profondément. Régénération crée fondations nouvelles. C\'est l\'aspect du guerrier transformateur dont action crée renaissance.'
    },
    'jupiter-mercury': {
      'Conjonction': 'Votre sagesse expansive et intellect rapide fusionnent créant philosophe communicateur expansif savant. Vous pensez généreusement: idées portent amplitude vision nobles. Votre parole enseigne sagesse combien intelligence vivace. Vous êtes pédagogue naturel inspirant audiences vaste. Le défi: bavardage excessif menace: parlez trop promettez trop. Pensée devient superficiellement générale dispersée. Apprendre filtrer expansion verbale avec nuance intellectuelle.',
      'Trigone': 'Un flux harmonieux magnifique relie sagesse à pensée créant mentor inspirant incarn possédé. Votre enseignement émane conviction profonde authentique. Vous partagez sagesse intelligemment car comprenez nuances subtiles. Vos idées portent poids substance inspirante. C\'est l\'aspect du professeur authentique dont sagesse inspire.',
      'Carré': 'Votre intellect minutieux détaillé et sagesse généreuse expansive entrent conflit perpétuel créant tensions focus-amplitude. Vous oscillez entre besoin analyser details infiniment et désir dégénéraliser. Bavardage superficiel menace: pensée devient trop vague diluée. Cette friction crée discernement progressif: apprendre que sagesse honore details.',
      'Opposition': 'Votre pensée minutieuse détaillée et vision générale expansive dansent opposition perpétuelle créant dualité microsc-macro épuisante. Vous oscillez entre expert details pointilleux et visionnaire généraliste. Cette instabilité crée confusion: suis-je historien détail ou visionnaire expansion? L\'intégration laborieuse crée synthèse où vision honore detail.',
      'Sextile': 'Un sextile entre sagesse et pensée crée harmonie naturelle où idées inspirent clairement. Votre enseignement combine profondeur amplitude. C\'est l\'aspect du sage communicateur dont parole inspire transformation sage.'
    },
    'jupiter-venus': {
      'Conjonction': 'Votre sagesse généreuse et beauté gracieuse fusionnent créant artiste créateur sage bienveillant. Vous aimez magnanimement: affection donne généreusement abondante. Votre créativité émane sagesse: art porte profondeur philosophique. Vous êtes artiste compassionnel inspirant audiences. Le défi: excès affectifs indulgences créent problèmes. Générosité naïve cause dépendances. Apprendre que vraie générosité honore limites responsables.',
      'Trigone': 'Un flux harmonieux magnifique relie sagesse à beauté créant artiste sage incarné populaire. Votre créativité émana conviction sincère généreuse. Vous aimez profondément car comprenez sagesse affective durable. Popularité genuine: gens sentent bienveillance authentique. C\'est l\'aspect du sage créatif authentique dont art inspire transformation.',
      'Carré': 'Votre affection retenue prudente et pulsion générosité excessive entrent conflit perpétuel créant tensions discrétion-indulgence. Vous oscillez entre besoin modération affective prudente et excès indulgence naïve. Indulgences répétées: fondation affective menace. Cette friction cultive discernement affectif progressif: apprendre que générosité authentique honore limites.',
      'Opposition': 'Votre affection parsimieuse restrictive et générosité débordante dansent opposition perpétuelle créant dualité restriction-indulgence épuisante. Vous oscillez entre retenue jalouse avare et indulgence inconscience excessif. Partenaires sentent instabilité: amour affichant restriction ou générosité sans mesure? L\'intégration laborieuse crée générosité équilibrée sage.',
      'Sextile': 'Un sextile entre sagesse et beauté crée harmonie naturelle où générosité authentique émane gracieusement. Votre bienveillance inspire naturellement. Art créatif émana sagesse. C\'est l\'aspect de l\'artiste sage dont création inspire profondément.'
    },
    'jupiter-uranus': {
      'Conjonction': 'Votre sagesse généreuse et liberté uranienne fusionnent créant visionnaire radical révolutionnaire audacieux. Vous pensez grandes visions futures radicales: croyance en possibilités infinies futures. Votre optimisme inspire révolution construction: gens croient avenir meilleur. Vous êtes réformateur charismatique changeant époque. Le défi: utopisme naïf possible: vous rêvez impossiblités impratiques. Révolution demeure théorique sans manifestation concrète. Apprendre réaliser visions radicales avec pragmatisme responsable.',
      'Trigone': 'Un flux harmonieux magnifique relie sagesse à liberté créant visionnaire pragmatique incarné inspirant. Votre vision émana conviction sincère révolutionnaire constructive. Vous manifestez changement car comprenez réalisme nécessaire vision. Réforme constructive inspire confiance respect. C\'est l\'aspect du réformateur authentique dont vision crée changement durable.',
      'Carré': 'Votre sagesse prudente conservatrice et pulsion innovation radicale entrent conflit perpétuel créant tensions tradition-révolution. Vous oscillez entre besoin préserver sagesse établie et besoin détruire radicalement tout. Utopisme naïf menace: révolution demeure irréaliste théorique. Cette friction crée vision réaliste progressive: apprendre que changement authentique honore sagesse antérieure.',
      'Opposition': 'Votre sagesse traditionaliste conservative et innovation radicale dansent opposition perpétuelle créant dualité conservation-révolution épuisante. Vous oscillez entre sage conservateur et visionnaire révolutionnaire radical incompatible. Cette dualité crée confusion: que croirez-vous vraiment intérieurement? L\'intégration laborieuse crée réforme sage progressive.',
      'Sextile': 'Un sextile entre sagesse et liberté crée harmonie naturelle où vision inspire liberté constructivement. Votre optimisme incite changement. Révolution constructive émana sagesse. C\'est l\'aspect du visionnaire réformateur dont changement crée bien durable.'
    },
    'jupiter-neptune': {
      'Conjonction': 'Votre sagesse généreuse et imagination spirituelle neptunienne fusionnent créant mysticisme visionnaire inspiré profond. Vous croirez spirituellement généreusement: foi donne abondamment universelment transcendante. Votre vision émane sagesse spirituelle: spiritualité porte profondeur philosophique. Vous êtes mentor spirituel inspirant quête transcendance. Le défi: illusions spirituelles escapisme naïf menacent délusions spirituelles. Foi devient refus réalité. Apprendre discerner spiritualité authentique des illusions éthérées.',
      'Trigone': 'Un flux harmonieux magnifique relie sagesse à spiritualité créant sage spirituel incarné respectable. Votre foi émana conviction sincère spirituelle. Vous guidez quête transcendance car comprenez profondeur mystique authentique. Spiritualité incarnée inspire confiance. C\'est l\'aspect du sage spirituel authentique dont vision transforme spirituellement.',
      'Carré': 'Votre sagesse pragmatique et pulsion spiritualité idéalisée entrent conflit perpétuel créant tensions pragmatisme-mystique. Vous oscillez entre besoin réalité concrète terre-à-terre et rêve spirituel transcendant. Illusions spirituelles menacent: foi devient irréaliste. Cette friction cultive discernement spirituel progressif: apprendre que spiritualité authentique honore réalité.',
      'Opposition': 'Votre sagesse pragmatique terre-à-terre et vision spirituelle idéalisée dansent opposition perpétuelle créant dualité matérialisme-mysticisme épuisante. Vous oscillez entre réaliste pragmatique et mystique idéaliste nébuleux. Cette dualité crée confusion: que croirez-vous vraiment matériellement ou spirituellement? L\'intégration laborieuse crée sagesse spirituelle ancrée.',
      'Sextile': 'Un sextile entre sagesse et imagination crée harmonie naturelle où vision spirituelle inspire sagacement. Votre foi guide réalité. Spiritualité émana sagesse. C\'est l\'aspect du mystique sage dont vision spirituelle transforme.'
    },
    'jupiter-pluto': {
      'Conjonction': 'Votre sagesse généreuse et pouvoir plutonien fusionnent créant guide transformateur puissant sage extraordinaire. Vous croyez généreusement transformation: foi porte pouvoir régénération profondes mondes entiers. Votre sagesse transforme charismatiquement: gens suivent car voient vérité profonde mystique. Vous suscitez renaissances spirituelles epochales. Le défi: mégalomanie menace: vous vous croyez messie sauveur absolu. Domination spirituelle: vous controllez esprits disciples. Apprendre que sagesse véritable libère plutôt que controllerait.',
      'Trigone': 'Un flux harmonieux magnifique relie sagesse à pouvoir créant guide transformateur incarné profondément respecté. Votre sagesse émana conviction sincère transformatrice authentique. Vous guidez transformations profondes effectivement car comprenez sagesse régénération. Votre leadership inspire dignité profonde. C\'est l\'aspect du sage guide transformateur dont sagesse régénère authentiquement.',
      'Carré': 'Votre sagesse généreuse et pulsion domination plutonienne entrent conflit perpétuel créant tensions générosité-contrôle. Vous oscillez entre besoin partager sagesse généreusement et besoin controllerait disciples possessivement. Mégalomanie possible: vous posez messie spirituel. Cette friction crée sagesse responsable progressive: apprendre que vraie sagesse libère disciples.',
      'Opposition': 'Votre sagesse généreuse expansive et pouvoir destructeur dominateur dansent opposition perpétuelle créant dualité générosité-domination épuisante. Vous oscillez entre sage généreux bienveillant et maître controllerait manipulateur destructeur. Cette dualité crée confusion: êtes-vous vraiment guide ou prédateur spirituel? L\'intégration laborieuse crée sagesse puissante responsable.',
      'Sextile': 'Un sextile entre sagesse et pouvoir crée harmonie naturelle où guidance transforme profondément respectueusement. Votre sagesse inspire transformation authentique. Leadership émana intégrité. C\'est l\'aspect du guide sage puissant dont leadership régénère.'
    },
    'saturn-mercury': {
      'Conjonction': 'Votre discipline saturnienne et intellect rapide fusionnent créant penseur rigoureux analytique structuré. Vous pensez lentement cautieusement: chaque idée pesée scrupuleusement critique. Votre intellect est fondation solide: concepts enracinés réalité. Vous êtes philosophe pragmatique respecté profondement. Le défi: blocages mentaux pessimisme analyt menacent: pensée devient trop critique paralysante. Idées figées manquent imagination créative. Apprendre que discipline honore aussi innovation creative.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à pensée créant penseur sage incarné  respecté mentor. Votre intellect émana conviction sincère profonde. Vous enseignez sagesse pratique car comprenez profondeur authentique. Votre clarté mentale inspire confiance. C\'est l\'aspect du mentor sage dont enseignement enracine sagesse.',
      'Carré': 'Votre pensée rapide curieuse et besoin discipline mentale rigide entrent conflit perpétuel créant tensions volubilité-silence. Vous oscillez entre besoin explorer intellectuellement librement et besoin inhibition cautieuse silence. Blocages mentaux menacent: pensée ralentit figée. Cette friction crée clarté mentale progressive: apprendre que discipline cogn suit innovation.',
      'Opposition': 'Votre pensée rapide impulsive et discipline mentale retraite dansent opposition perpétuelle créant dualité chatter-silence épuisante. Vous oscillez entre bavardage impulsif rapide et taciturnité figée silence complet. Cette dualité crée confusion: suis-je penseur communicatif ou philosophe retiré silencieux? L\'intégration laborieuse crée pensée disciplinée vivante.',
      'Sextile': 'Un sextile entre discipline et pensée crée harmonie naturelle où sagesse émerge réflexion. Votre intellect inspire respect. Pensée structure solidité. C\'est l\'aspect du sage dont pensée enracine profondeur.'
    },
    'saturn-venus': {
      'Conjonction': 'Votre discipline saturnienne et beauté gracieuse fusionnent créant séducteur loyal sérieux magnétique durable. Vous aimez avec responsabilité sérieuse: affection porte poids engagement inévitable. Votre beauté est intemporelle profonde: élégance vient maturité sagesse. Vous êtes partenaire loyalty incarnée ancré solidement. Le défi: rigidité affective froideur menacent: difficultés exprimer tendresse spontanéement. Amour devient trop sérieux manquant joie. Apprendre que discipline honore aussi tendresse spontanée joyeuse.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à beauté créant amant loyal incarné respecté durable. Votre affection émana conviction sincère profonde sérieuse. Vous aimez solidement car comprenez importance engagement durable. Élégance intemporelle inspire respect confiance. C\'est l\'aspect du partenaire loyal authentique dont amour construit fondations.',
      'Carré': 'Votre affection chaleureuse et besoin distance saturnienne froide entrent conflit perpétuel créant tensions chaleur-froideur. Vous oscillez entre besoin exprimer tendresse chaleureuse spontanée et peur vulnérabilité causant retrait froid. Difficultés affections menacent: amour devient trop stern austère. Cette friction crée tendresse mature progressive: apprendre que discipline protège, non tue, affection.',
      'Opposition': 'Votre affection chaleureuse expressive et froideur saturnienne retraitée dansent opposition perpétuelle créant dualité chaleur-glace épuisante. Vous oscillez entre moments d\'affection chaleureuse tendres et retraits glacés emotionnel total. Partenaires sentent instabilité: amour vient-il ou rejet froid glacé? L\'intégration laborieuse crée affection stable constante.',
      'Sextile': 'Un sextile entre discipline et beauté crée harmonie naturelle où élégance respire solidité. Votre loyauté inspire confiance. Beauté émana maturité sagesse. C\'est l\'aspect du partenaire loyal dont amour durable construit.'
    },
    'saturn-mars': {
      'Conjonction': 'Votre discipline saturnienne et action impulsive fusionnent créant guerrier stratègue discipliné calculé constructeur. Vous agissez lentement sûrement: impulsion tempérée par sagesse stratégique prudence. Votre courage se manifeste persévérance inébranlable: projets de durabilité construits. Vous êtes stratège martial respecté. Le défi: frustration menace: action devient entravée barrières obstacles constants. Impatience/discipline crée tension interne. Apprendre que vraie force combine discipline action courageuse.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à action créant guerrier stratègue incarné effectif. Votre action émana conviction sincère déterminée constructive. Vous accomplissez lentement solidement. Persévérance inspire respect. C\'est l\'aspect du guerrier stratègue dont action durable construit fondations solides.',
      'Carré': 'Votre action rapide impulsive et besoin discipline froide entrent conflit perpétuel créant tensions impatience-retenue. Vous oscillez entre besoin agir rapidement et peur risque causant inaction figée paralysante. Frustration répétée: action entravée barrières. Cette friction forge volonté progressive: apprendre que force combine discipline action.',
      'Opposition': 'Votre action impulsive déterminée et discipline retraite rigide dansent opposition perpétuelle créant dualité action-inhibition épuisante. Vous oscillez entre guerrier fougueux courageux et prisonnier discipline paralysé. Cette dualité crée frustration: suis-je guerrier courageux ou esclave discipline? L\'intégration laborieuse crée action responsable.',
      'Sextile': 'Un sextile entre discipline et action crée harmonie naturelle où effort structure momentum. Votre persévérance inspire. Construction durable incarnée puissance. C\'est l\'aspect du guerrier stratègue dont action crée solidité durable.'
    },
    'saturn-jupiter': {
        'Conjonction': 'Votre discipline saturnienne et sagesse jupitérienne fusionnent créant philosophe pragmatique prudent structuré. Vous pensez profondément sagesse tempérée prudence: idées grandees fondées réalité. Votre foi s\'enracine pratique solidement. Vous êtes philosophe pragmatique dont sagesse bâtit fondations. Le défi: limitation menace: expansion jupitérienne devient entravée par restriction saturnienne. Pessimisme versus optimisme crée tension constant. Apprendre que vraie sagesse honore limitation dans générosité.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à sagesse créant philosophe pragmatique incarné respecté. Votre sagesse émana conviction sincère profonde pratique. Vous manifestez idées graandes car comprenez structure nécessaire réalité. Expansionis fondées solidité inspire confiance. C\'est l\'aspect du sage pragmatique dont vision construit durable.',
      'Carré': 'Votre sagesse généreuse expans et besoin discipline restrictive entrent conflit perpétuel créant tensions expansion-limite. Vous oscillez entre croyance illimitée généreuse et peur risque causant retraite pessimiste. Limitation menace: vision devient trop restreinte conventional. Cette friction crée équilibre progressif: apprendre vraie sagesse honore structure.',
      'Opposition': 'Votre sagesse généreuse expansive et prudence saturnienne restrictive dansent opposition perpétuelle créant dualité expansion-contraction épuisante. Vous oscillez entre optimisme exubérant généreux et pessimisme froid restreint. Cette dualité crée confusion: que croyez-vous vraiment expansion illimitée ou caution pessimiste? L\'intégration laborieuse crée sagesse équilibrée.',
      'Sextile': 'Un sextile entre discipline et sagesse crée harmonie naturelle où vision émane pratique. Votre optimisme inspire action fondée réalité. Sagesse constructe mentor incarné. C\'est l\'aspect du sage pragmatique dont vision crée bien durable.'
    },
    'saturn-uranus': {
      'Conjonction': 'Votre discipline saturnienne et liberté uranienne fusionnent créant rebelle structuré pragmatique révolution pratique. Vous réformez lentement solidement: changement s\'enracine nouveau structure solide. Votre liberté enracinée pratique: révolution constructive édifiable. Vous êtes réformateur pragmatique dont changement dure. Le défi: rigidité menace: liberté devient entravée discipline excessive. Rébellion bloquée par caution menace. Apprendre que révolution authentique honore structure solidité nouvelle.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à liberté créant réformateur pragmatique incarné respecté. Votre changement émana conviction sincère constructive réformiste. Vous manifestez liberté car comprenez structure nécessaire fondation nouvelle. Révolution durable inspire confiance. C\'est l\'aspect du réformateur pragmatique dont changement construit durable.',
      'Carré': 'Votre liberté radicale impulsive et besoin discipline rigide entrent conflit perpétuel créant tensions rébellion-rigidité. Vous oscillez entre besoin détruire radicalement tout et peur changement causant inaction. Rigidité menace: liberté devient entravée. Cette friction crée liberté responsable progressive: apprendre que révolution honore fondations solides.',
      'Opposition': 'Votre liberté radicale révolution et discipline traditionaliste dansent opposition perpétuelle créant dualité chaos-ordre épuisante. Vous oscillez entre révolutionnaire radical imprévisible et conservateur rigide traditionnel. Cette dualité crée confusion: êtes-vous rebelle ou conformiste tradition? L\'intégration laborieuse crée réforme progressive sage.',
      'Sextile': 'Un sextile entre discipline et liberté crée harmonie naturelle où changement actionne solidement. Votre liberté inspire construction. Révolution émana sagesse structure. C\'est l\'aspect du réformateur dont changement crée fondation nouvelle.'
    },
    'saturn-neptune': {
      'Conjonction': 'Votre discipline saturnienne et imagination spirituelle neptunienne fusionnent créant mystique ancré pragmatique enraciné. Vous croyez spirituellement disciplinément: foi s\'enracine réalité pratique concrète. Votre spiritualité constructe solidement: rêves deviennent réalité tangible manifeste. Vous êtes sage spirituel pragmatique dont rêves se manifestent. Le défi: limitation menace: vision spirituelle devient trop restreinte practice-bound. Spiritualité figée dans formalisme mort. Apprendre que vraie spiritualité honore aussi transcendance imagination.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à imagination créant spiritual pragmatique incarné respecté. Votre spiritualité émana conviction sincère ancrée pratique. Vous manifestez rêves car comprenez structure réalité nécessaire. Rêves concretisés inspirent confiance. C\'est l\'aspect du sage spirituel pragmatique dont vision manifeste solidité.',
      'Carré': 'Votre vision spirituelle transcendante et besoin réalité pratique rigide entrent conflit perpétuel créant tensions infini-fini. Vous oscillez entre besoin transcendance spirituelle et peur imprévisible causant retraite conformiste. Limitation menace: spiritualité devient figée conforative. Cette friction cultive discernement spirituel progressif: apprendre que vraie spiritualité honore réalité.',
      'Opposition': 'Votre vision spirituelle idéale transcendante et rationalité pratique frigide dansent opposition perpétuelle créant dualité illusion-réalité épuisante. Vous oscillez entre mystique idéaliste transcendant et matérialiste pragmatique terre-à-terre. Cette dualité crée confusion: que croirez-vous vraiment spiritualité ou matérialité pratique? L\'intégration laborieuse crée spiritualité enracinée.',
      'Sextile': 'Un sextile entre discipline et imagination crée harmonie naturelle où spiritualité s\'enracine pratique. Votre foi inspire manifestation réelle. Rêmes deviennent réalité solidement. C\'est l\'aspect du sage spirituel dont vision manifeste rêves.'
    },
    'saturn-pluto': {
      'Conjonction': 'Votre discipline saturnienne et pouvoir plutonien fusionnent créant alchimiste puissant structuré architecturé régénérateur. Vous transformez lentement solidement: régénération s\'enracine nouvelle foundation durable. Votre pouvoir est architecte ruines vers renaissance sagesse. Vous êtes guide transformateur pragmatique dont pouvoir dure. Le défi: obsession menace: pouvoir devient contrôle possessif destructeur. Transformation figée domination mortifère. Apprendre que vraie transformation libère plutôt qu\'asservit.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à pouvoir créant alchimiste stratègue incarné repsecté. Votre transformation émana conviction sincère constructive régénératrice. Vous guidez changement car comprenez sagesse structure nouvelle necessaire. Transformation durable inspire confiance. C\'est l\'aspect de l\'alchimiste stratègue dont pouvoir transforme constructivement.',
      'Carré': 'Votre pouvoir destructeur intense et besoin structure rigide entrent conflit perpétuel créant tensions chaos-contrôle. Vous oscillez entre besoin détruire radicalement et peur destruction causant rigidité figée. Obsession menace: pouvoir devient domination frigide. Cette friction forge transformation responsable progressive: apprendre que régénération honore structure édification.',
      'Opposition': 'Votre pouvoir destructeur radical et discipline rigide constructive dansent opposition perpétuelle créant dualité annihilation-preservation épuisante. Vous oscillez entre destructeur régénérateur radical et conservateur rigide gelé préservateur. Cette dualité crée confusion: construisez-vous ou détruisez-vous réalité? L\'intégration laborieuse crée transformation constructive wise.',
      'Sextile': 'Un sextile entre discipline et pouvoir crée harmonie naturelle où transformation actionne solidement. Votre puissance inspire confiance. Régénération construit fondations nove. C\'est l\'aspect de l\'alchimiste dont transformation crée renaissance.'
    },
    'uranus-sun': {
      'Conjonction': 'Votre essence solaire et liberté uranienne fusionnent créant rebelle visionnaire radical unique absolument incarné. Votre identité demande liberté expression radicale authentique courageux. Vous refusez conventions sociales: essence demande originalité absolue. Votre présence communique immédiatement: je suis profondément différent et assumé. Cette radicalité authentique inspire libération chez autres. Le défi: instabilité identitaire menace car essence incorpore besoin mutation permanente. Apprendre que vraie liberté enracine essence plutôt la dissout.',
      'Trigone': 'Un flux harmonieux magnifique relie essence authentique à liberté uranienne créant visionnaire authentiquement respecté incarné. Votre radicalité émane conviction sincère enracinée. Vous êtes naturellement avant-gardiste car essence demande innovation authentique. Votre liberté inspire respect car enracinée intégrité personnelle profonde. Visionnaire incarné crédible. C\'est l\'aspect du rebelle authentique dont originalité crée inspiration durable.',
      'Carré': 'Votre ego solaire assertif et besoin liberté absolue entrent conflit perpétuel créant tensions identité-changement stimulantes. Vous oscillez entre stabilité identitaire construite et besoin destruction radicale absolue. Affirmation personnelle oppose constamment pulsion uranienne balayer tout radicalement. Cette instabilité menace: qui êtes-vous réellement si changez constamment? Cette friction force authenticité radicale progressive: apprendre que vraie liberté vient acceptation essence mutante.',
      'Opposition': 'Votre essence solaire stable assertive et liberté uranienne radical dansent opposition perpétuelle créant dualité instabilité existentielle épuisante. Vous oscillez entre affirmation personnelle construite stable et besoin rébellion absolue destruction radicale. Une jour êtes qui prétendez; lendemain tout détruit changé. Cette dualité crée confusion: suis-je essence stable ou essence radicalement libre? L\'intégration laborieuse crée liberté responsable enracinée essence.',
      'Sextile': 'Un sextile entre essence et liberté crée harmonie naturelle magnifique où unicité authentique s\'exprime courageusement. Votre originalité émana essence sincère, pas pose rebelle artificielle. Gens respectent votre liberté car voient authenticité fondamentale. Votre différence devient atout car enracinée conviction personnelle. C\'est l\'aspect du visionnaire authentique dont liberté inspire durablement.'
    },
    'uranus-moon': {
      'Conjonction': 'Votre émotions profondes et liberté uranienne fusionnent créant instabilité affective magnétique radicale imprévisible. Vos sentiments changent radicalement sans prévenir: besoin liberté émotionnelle absolue dominante. Vous refusez contrainte sentimentale: attachement menace essence liberté. Votre aura émotionnelle attire car authentiquement changante non figée. Le défi: instabilité causant abandon potentiel cyclique chez aimés. Attachement-rejet cycles traumatisants. Apprendre que liberté authentique peut inclure engagement responsable différent.',
      'Trigone': 'Un flux harmonieux magnifique relie émotions authentiques à liberté uranienne créant authenticité affective libre incarnée. Vos émotions émana essence sincère radicalement changeante; gens respectent cela. Vous aimez originalement: attachement non conventionnel libérateur autonomisant. Votre liberté affective inspire autonomie chez aimés. C\'est l\'aspect du partenaire libre authentique dont amour autonomise.',
      'Carré': 'Vos émotions authentiques et besoin liberté absolu entrent conflit perpétuel créant instabilité affective frustrant. Vous oscillez entre besoin attachement intense sécurité et pulsion rupture radicale. Cycles imprévisibles: attachement suivi rejet complet instantané. Cette friction forge attachement sain autonome progressif: apprendre que vraie liberté inclut responsabilité affective.',
      'Opposition': 'Votre besoin sécurité émotionnelle profonde et liberté absolue isolée dansent opposition perpétuelle créant dualité attachment-isolation épuisante. Vous oscillez entre fusion emotionnelle complète sécurité et isolement total liberté radicale. Gens sentent contradiction: amour certain ou liberté totale partir? L\'intégration laborieuse crée autonomie relationnelle où liberté coexiste engagement.',
      'Sextile': 'Un sextile entre émotions et liberté crée harmonie naturelle où authenticité affective émana courage. Votre liberté émotionnelle inspire autonomie saine chez aimés. Gens respectent votre indépendance car voient intégrité fondamentale. C\'est l\'aspect du partenaire autonome dont amour libre libère.'
    },
    'uranus-mercury': {
      'Conjonction': 'Votre intellect rapide et innovation uranienne fusionnent créant génie mental radical révolutionnaire visionnaire. Vous pensez avant époque: idées sortent structures mentales non conventionnelles étonnantes illuminatrices. Votre communication porte pouvoir révolution intellectuelle inspirante. Pensée saute étapes logiques directement illumination radicale. Le défi: imprévisibilité mentale chaotique menace car pensée devient incompréhensible. Apprendre expliquer genius avec clarté communicable.',
      'Trigone': 'Un flux harmonieux magnifique relie pensée claire à innovation uranienne créant visionnaire respecté incarné. Votre genius émana convention, non pose artificielle. Vos idées futures grounded réalité actuelle. Vous êtes penseur révolutionnaire crédible avant-gardiste. C\'est l\'aspect du visionnaire intellectuel dont idées avancent époque respectueusement.',
      'Carré': 'Votre intellect ordonné logique et pulsion innovation radicale entrent conflit perpétuel créant tensions stabilité-changement. Vous oscillez entre besoin clarté logique rationnelle et destruction radicale structures mentales anciennes. Pensée imprévisible chaotique saute logiquement. Cette friction crée originalité progressive: apprendre canaliser innovation avec clarté logique.',
      'Opposition': 'Votre pensée logique rationnelle et innovation radicale dansent opposition perpétuelle créant dualité ordre-chaos épuisante. Vous oscillez entre intellect rigide ordonné et génialité chaotique radicale. Partenaires sentent imprévisibilité: pensée saute logiquement incompréhensiblement. L\'intégration laborieuse crée génie grounded où innovation honore logique.',
      'Sextile': 'Un sextile entre pensée et innovation crée harmonie naturelle où idées révolutionnaires émergent clairement. Votre genius combine originalité clarté communicable. C\'est l\'aspect du génie communicateur dont idées révolutionnaires inspirent.'
    },
    'uranus-venus': {
      'Conjonction': 'Votre beauté gracieuse et liberté uranienne fusionnent créant séducteur indépendant imprévisible magnétique. Vous aimez différemment: affection non conventionnelle électrique changeante radicale. Votre attraction repose originalité authentique où refusez traditions amoureuses. Partenaires sentent électricité magnétique imprévisible attisante. Le défi: instabilité affective menace car attachement suivi rejet radical abrupt créant trauma prolongés. Apprendre que liberté peut inclure engagement responsable différent.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à liberté créant amant authentiquement indépendant respecté. Votre affection émana conviction sincère radicalement changeante; gens respectent cela. Vous aimez librement: partenaires sentent autonomie requise. Magnétisme électrique inspire liberté chez aimés. C\'est l\'aspect de l\'amant libre authentique dont amour libère.',
      'Carré': 'Votre affection tendre et pulsion liberté absolu entrent conflit perpétuel créant tensions engagement-liberté. Vous oscillez entre besoin attachement intense sécurité et peur engagement causant rejet abrupt. Instabilité affective répétée: relations changent radicalement sans avertissement. Cette friction forge attachement autonome progressif: apprendre que vraie liberté inclut responsabilité affective.',
      'Opposition': 'Votre besoin fusion attachement profond et liberté absolue isolée dansent opposition perpétuelle créant dualité attachment-isolation épuisante. Vous oscillez entre fusion complète sécurité et fuite liberté totale radicale. Partenaires sentent contradiction: amour vient-il ou liberté totale partir? L\'intégration laborieuse crée autonomie relationnelle.',
      'Sextile': 'Un sextile entre beauté et liberté crée harmonie naturelle où amour authentique libère. Votre indépendance inspire autonomie saine chez aimés. Partenaires respectent votre liberté car voient intégrité fondamentale. C\'est l\'aspect du partenaire autonome dont amour libre libère authentiquement.'
    },
    'uranus-mars': {
      'Conjonction': 'Votre action impulsive et liberté uranienne fusionnent créant rebelle radical imprévisible révolutionnaire. Vous agissez sans avertissement où action porte électricité radicale disruptive. Votre énergie libère détruit conventions créant chaos régénérateur. Révolution est terrain naturel: vous êtes agitateur provocateur audacieux. Le défi: impulstvité destructrice dangereuse menace car action devient violence chaotique anarchique. Apprendre canaliser énergie révolutionnaire avec responsabilité constructive.',
      'Trigone': 'Un flux harmonieux magnifique relie action à liberté créant rebelle créateur incarné inspirant. Votre action révolutionnaire émana conviction sincère constructive. Vous libérez par action car comprenez vision future possible. Changement constructif émana votre présence magnétique. C\'est l\'aspect du guerrier révolutionnaire authentique dont action libère constructivement.',
      'Carré': 'Votre action ordonnée et pulsion liberté chaotique entrent conflit perpétuel créant tensions ordre-chaos. Vous oscillez entre besoin structure logique et destruction radicale sans limites. Impulsivité destructrice menace car action chaotique crée destruction involontaire. Cette friction crée liberté responsable progressive: apprendre que révolution construit lieu seulement détruire.',
      'Opposition': 'Votre action ordonnée rigoureuse et liberté chaotique dansent opposition perpétuelle créant dualité stabilité-chaos épuisante. Vous oscillez entre rigidité action contrôlée et chaos radical impulsif. Partenaires sentent instabilité: action stable ou destruction chaotique? L\'intégration laborieuse crée liberté canalisée constructive.',
      'Sextile': 'Un sextile entre action et liberté crée harmonie naturelle où révolution actionne constructivement. Votre action libère inspirante. Changement constructif émana naturellement momentum. C\'est l\'aspect du guerrier libérateur dont action crée révolution constructive.'
    },
    'uranus-jupiter': {
      'Conjonction': 'Votre sagesse généreuse et liberté uranienne fusionnent créant visionnaire radical révolutionnaire audacieux. Vous pensez grandes visions futures radicales: croyance possibilités infinies futures révolutionnaires. Votre optimisme inspire révolution construction: gens croient avenir radicalement meilleur. Vous êtes réformateur charismatique changeant époque. Le défi: utopisme naïf possible car rêvez impossiblités impratiques irréalistes. Révolution demeure théorique sans manifestation concrète. Apprendre réaliser visions radicales avec pragmatisme responsable.',
      'Trigone': 'Un flux harmonieux magnifique relie sagesse à liberté créant visionnaire pragmatique incarné inspirant. Votre vision émana conviction sincère révolutionnaire constructive. Vous manifestez changement car comprenez réalisme nécessaire vision. Réforme constructive inspire confiance. C\'est l\'aspect du réformateur authentique dont vision crée changement durable.',
      'Carré': 'Votre sagesse prudente et pulsion innovation radicale entrent conflit perpétuel créant tensions tradition-révolution. Vous oscillez entre besoin préserver sagesse établie et destruction radicale tout. Utopisme naïf menace car révolution demeure irréaliste théorique. Cette friction crée vision réaliste progressive: apprendre que changement authentique honore sagesse antérieure.',
      'Opposition': 'Votre sagesse traditionaliste et innovation radicale dansent opposition perpétuelle créant dualité conservation-révolution épuisante. Vous oscillez entre sage conservateur et visionnaire révolutionnaire incompatible. Cette dualité crée confusion: que croirez-vous vraiment? L\'intégration laborieuse crée réforme sage progressive.',
      'Sextile': 'Un sextile entre sagesse et liberté crée harmonie naturelle où vision inspire liberté constructivement. Votre optimisme incite changement. Révolution constructive émana sagesse. C\'est l\'aspect du visionnaire réformateur dont changement crée bien durable.'
    },
    'uranus-saturn': {
      'Conjonction': 'Votre discipline saturnienne et liberté uranienne fusionnent créant rebelle structuré pragmatique révolution pratique. Vous réformez lentement solidement où changement s\'enracine nouvelle structure. Votre liberté enracinée pratique: révolution constructive édifiable durable. Vous êtes réformateur pragmatique. Le défi: rigidité menace car liberté devient entravée discipline excessive confinante. Rébellion bloquée caution menace. Apprendre que révolution authentique honore structure solidité nouvelle.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à liberté créant réformateur pragmatique incarné respecté. Votre changement émana conviction sincère constructive. Vous manifestez liberté car comprenez structure nécessaire fondation. Révolution durable inspire confiance. C\'est l\'aspect du réformateur pragmatique dont changement construit durable.',
      'Carré': 'Votre liberté radicale et besoin discipline rigide entrent conflit perpétuel créant tensions rébellion-rigidité. Vous oscillez entre destruction radicale tout et peur changement causant inaction. Rigidité menace car liberté devient entravée. Cette friction crée liberté responsable progressive: apprendre que révolution honore fondations solides.',
      'Opposition': 'Votre liberté radicale révolution et discipline traditionaliste dansent opposition perpétuelle créant dualité chaos-ordre épuisante. Vous oscillez entre révolutionnaire radical et conservateur rigide traditionnel. Cette dualité crée confusion: êtes-vous rebelle ou conformiste? L\'intégration laborieuse crée réforme progressive sage.',
      'Sextile': 'Un sextile entre discipline et liberté crée harmonie naturelle où changement actionne solidement. Votre liberté inspire construction. Révolution émana sagesse structure. C\'est l\'aspect du réformateur dont changement crée fondation nouvelle.'
    },
    'uranus-neptune': {
      'Conjonction': 'Votre liberté uranienne et imagination Neptune spirituelle fusionnent créant visionnaire mystique radical. Vous rêvez libertés spirituelles radicales transcendantes: vision spirituelle révolutionnaire transformatrice globale. Votre spiritualité libère inspire mouvements révolutionnaires spirituels. Vous êtes visionnaire mystique radical. Le défi: chaos spirituel possible car révolution spirituelle devient désorganisée nave irréaliste. Apprendre ancrer vision spirituelle radicale réalité manifestation.',
      'Trigone': 'Un flux harmonieux magnifique relie liberté à imagination créant visionnaire spirituel incarné inspirant où conviction sincère libre spirituellement. Vous libérez spirituellement car comprenez transcendance authentique. Révolution spirituelle constructive inspire confiance respect. C\'est l\'aspect du visionnaire spirituel authentique dont vision libère.',
      'Carré': 'Votre liberté radicale et vision spirituelle idéalisée entrent conflit perpétuel créant tensions rébellion-transcendance. Vous oscillez entre rejet total spiritualité conformiste et rêve spirituel utopiste naïf. Chaos spirituel menace. Cette friction cultive discernement spirituel progressif: apprendre que libération spirituelle authentique honore sagesse établie.',
      'Opposition': 'Votre liberté radicale disruptive et spiritualité transcendante idéalisée dansent opposition perpétuelle créant dualité révolution-transcendance. Vous oscillez entre rebelle nihiliste et mystique idéaliste transcendant contradictoires. Cette dualité crée confusion: que croirez-vous vraiment? L\'intégration laborieuse crée spiritualité libérante enracinée.',
      'Sextile': 'Un sextile entre liberté et imagination crée harmonie naturelle où vision spirituelle libère authentiquement. Votre liberté inspire transcendance constructive. Révolution spirituelle émana authenticité. C\'est l\'aspect du visionnaire spirituel dont liberté transforme spirituellement.'
    },
    'uranus-pluto': {
      'Conjonction': 'Votre liberté uranienne et pouvoir plutonien fusionnent créant révolutionnaire destructeur radical régénération extraordinaire. Vous détruisez librement pour régénérer radicalement: liberté significa annihilation anciennes structures. Votre présence initie transformations révolutionnaires chaotiques forcées. Vous êtes agent destruction créatrice régénération radicale. Le défi: destruction peut devenir nihiliste anarchique sans fondation nouvelle créant chaos. Apprendre que révolution construit fondations nouvelles non seulement détruit anciennes.',
      'Trigone': 'Un flux harmonieux magnifique relie liberté à pouvoir créant révolutionnaire constructif incarné respecté. Votre transformation émana conviction sincère constructive révolutionnaire. Vous libérez par régénération car comprenez sagesse destruction créatrice. Révolution manifeste émana vision réelle. C\'est l\'aspect du révolutionnaire authentique dont transformation libère.',
      'Carré': 'Votre liberté radicale et pulsion pouvoir destructeur entrent conflit perpétuel créant tensions liberté-destruction. Vous oscillez entre besoin détruire radicalement tout et peur destruction causant inhibition. Destruction radicale chaotique menace. Cette friction forge transformation responsable progressive: apprendre que révolution édifie au lieu seulement anéantir.',
      'Opposition': 'Votre liberté destructrice radicale et pouvoir régénérateur constructeur dansent opposition perpétuelle créant dualité nihilisme-édification épuisante. Vous oscillez entre destructeur nihiliste et régénérateur constructeur contradictoires. Cette dualité crée confusion: détruisez-vous ou reconstruisez-vous? L\'intégration laborieuse crée transformation libératrice responsable.',
      'Sextile': 'Un sextile entre liberté et pouvoir crée harmonie naturelle où transformation libère constructivement. Votre liberté inspire régénération. Révolution édifie fondations nouvelles. C\'est l\'aspect du révolutionnaire dont transformation crée monde nouveau.'
    },
    'neptune-sun': {
      'Conjonction': 'Votre essence solaire et imagination neptunienne fusionnent créant aura mystérieuse charismatique magique irrésistible. Vous êtes visionnaire artiste dont essence brille spiritualité incarnée. Votre présence inspire: émana quelquechose ineffable transcendant au-delà rationnel. Gens sentent connexion mondes invisibles. Le défi: fusion brouille ligne essence authentique versus fantasme personnel causant confusion identité. Identité devient confuse: qui êtes-vous vraiment versus qui imaginez? Apprendre discerner soi véritable de projections illusoires fantasmées.',
      'Trigone': 'Un flux harmonieux magnifique relie essence à imagination créant visionnaire incarné enraciné authentique. Votre spiritualité émana conviction sincère, non escapisme. Vous créez art imprégné vérité mystique profonde. Votre aura mystique inspire respect. C\'est l\'aspect du visionnaire authentique dont spiritualité incarnée transforme.',
      'Carré': 'Votre ego solaire assertif et besoin fusion spirituelle neptunienne entrent conflit perpétuel créant confusion identité-mystique. Vous oscillez entre affirmation claire essence et doute spirituel dissolvant identité. Confusion identitaire menace: difficultés discerner soi de fantasmes spirituels. Cette friction cultive discernement spirituel progressif: apprendre que vraie spiritualité enracine identité.',
      'Opposition': 'Votre essence solaire claire assertive et besoin fusion spirituelle neptunienne dansent opposition perpétuelle créant dualité clarté-brume épuisante. Vous oscillez entre affirmation personnelle lucide rationnelle et brume spirituelle douteuse dissolvante. Cette dualité crée confusion: qui suis-je vraiment essence rationnelle ou spirituelle mystique? L\'intégration laborieuse crée sagesse spirituelle authentiquement enracinée.',
      'Sextile': 'Un sextile entre essence et imagination crée harmonie naturelle où mystique authentique s\'exprime clairement. Votre spiritualité émana essence sincère non escapisme. Votre aura spirituelle inspire naturellement. C\'est l\'aspect du visionnaire authentique dont mystique inspire profondément.'
    },
    'neptune-moon': {
      'Conjonction': 'Votre émotions profondes et imagination spirituelle neptunienne fusionnent créant empathie supra-normale osmotique extraordinaire. Vous absorbez sentiments gens comme buvard émotionnel: sensibilité presque télépathique. Vous ressentez sans effort intention profonde autrui. Grande âme nourrit mondes invisibles émotionnel. Le défi: fusion brouille limites soi-autrui risquant perte identité. Apprendre discerner sentiments propres versus absorbés extérieurs.',
      'Trigone': 'Un flux harmonieux magnifique relie émotions à imagination créant empathie incarnée guérisseuse. Votre compréhension émotionnelle émana conviction sincère, non escapisme. Vous guérissez car combinez empathie compréhension sagesse océanique. Votre sensibilité ouvre mondes âmes. C\'est l\'aspect du guérisseur émotionnel authentique dont amour transforme.',
      'Carré': 'Vos émotions authentiques et besoin fusion spirituelle neptunienne entrent conflit créant confusion affective brume. Vous oscillez entre connexion emotionnelle clara consciente et dissolution complètement sentiments-rêves flous. Limites affectives disparaissent: difficultés séparer empath propre de gens. Cette friction cultive discernement émotionnel progressif: apprendre que vraie empathie requiert clarté frontière.',
      'Opposition': 'Votre authenticité émotionnelle et fusion spirituelle mystique dansent opposition perpétuelle créant dualité clarté-brume épuisante. Vous oscillez entre présence affective consciente et dissolution spirituelle-imaginaire. Gens sentent instabilité: moment présent; moment ailleurs. L\'intégration laborieuse crée empathie enracinée.',
      'Sextile': 'Un sextile entre émotions et imagination crée harmonie naturelle où empathie authentique émana spiritualité. Votre sensibilité inspire guérison sans confusion limites. Gens sentent soutien émotionnel profond. C\'est l\'aspect du guérisseur spirituel authentique dont amour guérit.'
    },
    'neptune-mercury': {
      'Conjonction': 'Votre intellect rapide et imagination neptunienne fusionnent créant penseur poétique mystique visionnaire. Vous communiquez symboliquement où mots portent meanings multiples subtiles ineffables transcendants. Pensée flotte entre mondes rationnels imaginaires spirituels. Communication émana essence mystique. Le défi: confusion mentale menace car difficultés discerner pensée clara de fantasme imaginaire spirituel. Apprendre discerner réalité de rêve intellectuellement.',
      'Trigone': 'Un flux harmonieux magnifique relie pensée à imagination créant penseur poétique authentiquement incarné. Votre langage émana conviction profonde mystique. Vous êtes ecrivain artiste communicateur spirituel. Mots touchent âmes. C\'est l\'aspect du poète communicateur dont pensée inspire spirituellement.',
      'Carré': 'Votre intellect clair logique et imagination brouillée neptunienne entrent conflit perpétuel créant tension clarté-flou. Vous oscillez entre pensée cristalline rationnelle et dissolution mentale fantasme. Confusion menace. Cette friction cultive discernement progressif: apprendre imaginer intelligemment.',
      'Opposition': 'Votre pensée logique rationnelle et imagination mystique dansent opposition perpétuelle créant dualité logique-rêve épuisante. Vous oscillez entre intellectuel rigoureux et rêveur idéaliste nébuleux. Partenaires sentent instabilité: moment pragmatique; moment idéaliste. L\'intégration laborieuse crée pensée imaginative enracinée.',
      'Sextile': 'Un sextile entre pensée et imagination crée harmonie naturelle où créativité intellectuelle émana spiritualité. Votre langage poétique inspire profondément. C\'est l\'aspect du mystique penseur dont parole porte magie subtile incarnée.'
    },
    'neptune-venus': {
      'Conjonction': 'Votre beauté gracieuse et imagination spirituelle neptunienne fusionnent créant romantique idéaliste rêveur spiritualisé. Vous aimez idéalement où affection porte qualité ineffable magique transcendante spirituelle. Beauté semble éthérée mystique: gens sentent dimension spirituelle votre présence. Amour devient quête âme sœur mythologique éternelle. Le défi: illusions romantiques menacent car confusions répétées. Vous tombez amour fantasmes non réalité. Apprendre discerner rêve de réalité relationnelle authentique.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à imagination créant amant idéaliste authentiquement incarné. Votre affection émana conviction sincère spirituelle. Vous aimez profondément avec sens âme sœur enraciné réalité. Créativité artistique enrichit relations. C\'est l\'aspect du romantique authentique dont amour inspire art.',
      'Carré': 'Votre affection réaliste pragmatique et besoin fusion spirituelle idéal entrent conflit créant illusions affectives. Vous oscillez entre connexion spirituelle et réalité humaine banale. Déceptions répétées: rêves idéalisés ne correspondent réalité partenaires. Cette friction cultive discernement amoureux progressif: apprendre aimer réalité non fantasme.',
      'Opposition': 'Votre affection pragmatique réelle et idéalisme spirituel dansent opposition perpétuelle créant dualité réalité-rêve épuisante. Vous oscillez entre amour réaliste humain et romance spirituelle transcendante. Cette dualité crée confusion: aimez-vous réelle personne ou fantasme spirituel intérieur? L\'intégration laborieuse crée amour réaliste spirituel enraciné.',
      'Sextile': 'Un sextile entre beauté et imagination crée harmonie naturelle où romance authentique s\'enracine spiritualité. Votre affection émana sincérité spirituelle incarnée réalité. Vous aimez profondément avec vision spirituelle relations. C\'est l\'aspect du romantique authentique dont amour spirituel enraciné réaliste.'
    },
    'neptune-mars': {
      'Conjonction': 'Votre action impulsive et imagination neptunienne fusionnent créant croisade visionnaire passionnée spirituelle. Vous combattez causes idéalistes où action porte passion spirituelle transcendante inspirante. Votre ardeur inspire mouvements spirituels idéalistes collectifs. Vous êtes guerrier visionnaire rêveur inspirant. Le défi: action floue dispersée menace car vision idéaliste supplante pragmatisme. Projets échouent par manque concrétude. Apprendre canaliser passion avec réalité tangible practicité.',
      'Trigone': 'Un flux harmonieux magnifique relie action à imagination créant guerrier visionnaire incarné effectif. Votre action émana conviction sincère spirituelle constructive. Vous manifestez rêves par action coordonnée inspirée. Passion spirituelle actionne constructivement réalité. C\'est l\'aspect du guerrier visionnaire authentique dont action incarne vision.',
      'Carré': 'Votre action concrète pratique et vision idéale floue entrent conflit perpétuel créant tension pragmatisme-idéalisme. Vous oscillez entre action décisive concrète et rêve idéaliste vague incohérent. Action floue dispersée menace. Cette friction cultive action spirituelle enracinée: apprendre que vision nécessite pragmatisme exécution.',
      'Opposition': 'Votre action concrète décisive et imagination floue irréaliste dansent opposition perpétuelle créant dualité pragmatisme-rêve épuisante. Vous oscillez entre guerrier pratique brutal et rêveur idéaliste nébuleux. Partenaires sentent incohérence: action porte vision ou pure impulsion? L\'intégration laborieuse crée action spirituelle ancrée.',
      'Sextile': 'Un sextile entre action et imagination crée harmonie naturelle où vision actionne manière inspirante. Votre action manifeste rêves. Vision spirituelle guide momentum. C\'est l\'aspect du guerrier visionnaire dont action incarne vision spirituelle.'
    },
    'neptune-jupiter': {
      'Conjonction': 'Votre sagesse généreuse et imagination spirituelle neptunienne fusionnent créant mysticisme visionnaire inspiré profond extraordinaire. Vous croyez spirituellement généreusement où foi donne abondamment transcendante universelle. Votre vision émana sagesse spirituelle: spiritualité porte profondeur philosophique. Vous êtes mentor spirituel inspirant quête transcendance. Le défi: illusions spirituelles escapisme naïf menacent. Foi devient refus réalité. Apprendre discerner spiritualité authentique de illusions éthérées.',
      'Trigone': 'Un flux harmonieux magnifique relie sagesse à imagination créant sage spirituel incarné respecté. Votre foi émana conviction sincère spirituelle. Vous guidez quête transcendance car comprenez profondeur mystique. Spiritualité incarnée inspire confiance. C\'est l\'aspect du sage spirituel authentique dont vision transforme spirituellement.',
      'Carré': 'Votre sagesse pragmatique et pulsion spiritualité idéalisée entrent conflit perpétuel créant tensions pragmatisme-mystique. Vous oscillez entre réalité terre-à-terre et rêve transcendant. Illusions menacent: foi devient irréaliste. Cette friction cultive discernement spirituel progressif: apprendre que spiritualité authentique honore réalité.',
      'Opposition': 'Votre sagesse pragmatique terre-à-terre et vision spirituelle idéalisée dansent opposition perpétuelle créant dualité matérialisme-mysticisme épuisante. Vous oscillez entre réaliste pragmatique et mystique idéaliste. Cette dualité crée confusion: que croirez-vous vraiment matérialité ou spiritualité? L\'intégration laborieuse crée sagesse spirituelle ancrée.',
      'Sextile': 'Un sextile entre sagesse et imagination crée harmonie naturelle où vision spirituelle inspire sagacement. Votre foi guide réalité. Spiritualité émana sagesse. C\'est l\'aspect du mystique sage dont vision spirituelle transforme.'
    },
    'neptune-saturn': {
      'Conjonction': 'Votre discipline saturnienne et imagination neptunienne fusionnent créant mystique ancré pragmatique enraciné profondément. Vous croyez spirituellement disciplinément: foi s\'enracine réalité pratique concrète solide. Votre spiritualité constructe solidement: rêves deviennent réalité tangible manifeste. Vous êtes sage spirituel pragmatique. Le défi: limitation menace car vision devient trop restreinte practice-bound. Spiritualité figée formalisme mort. Apprendre que vraie spiritualité honore aussi transcendance imagination.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à imagination créant sage spirituel pragmatique incarné. Votre spiritualité émana conviction sincère ancrée pratique. Vous manifestez rêves car comprenez structure réalité. Rêmes concrétisés inspirent confiance. C\'est l\'aspect du sage spirituel pragmatique dont vision manifeste solidité.',
      'Carré': 'Votre vision spirituelle transcendante et besoin réalité pratique rigide entrent conflit perpétuel créant tensions infini-fini. Vous oscillez entre transcendance spirituelle et peur imprévisible retraite conformiste. Limitation menace car spiritualité figurée conformiste morte. Cette friction cultive discernement spirituel: apprendre que spiritualité honore réalité.',
      'Opposition': 'Votre vision spirituelle idéale et rationalité pratique rigide dansent opposition perpétuelle créant dualité illusion-réalité épuisante. Vous oscillez entre mystique idéaliste et matérialiste pragmatique. Cette dualité crée confusion: croirez-vous spiritualité ou matérialité? L\'intégration laborieuse crée spiritualité enracinée.',
      'Sextile': 'Un sextile entre discipline et imagination crée harmonie naturelle où spiritualité s\'enracine pratique. Votre foi inspire manifestation réelle. Rêves deviennent réalité solidement. C\'est l\'aspect du sage spirituel dont vision manifeste rêves tangiblement.'
    },
    'neptune-uranus': {
      'Conjonction': 'Votre liberté uranienne et imagination neptunienne fusionnent créant visionnaire mystique radical révolution spirituelle extraordinaire. Vous rêvez libertés spirituelles radicales transcendantes: vision révolutionnaire transformatrice globale spirituelle. Votre spiritualité libère inspire mouvements révolutionnaires spirituels collectifs. Vous êtes visionnaire mystique rebelle radical. Le défi: chaos spirituel possible car révolution devient désorganisée utopiste nave irréaliste. Apprendre ancrer vision radicale réalité manifestation.',
      'Trigone': 'Un flux harmonieux magnifique relie liberté à imagination créant visionnaire spirituel incarné inspirant. Votre vision émana conviction sincère libre spirituellement libérante. Vous libérez spirituellement car comprenez transcendance authentique. Révolution constructive inspire respect. C\'est l\'aspect du visionnaire spirituel authentique dont vision libère.',
      'Carré': 'Votre liberté radicale et vision spirituelle idéalisée entrent conflit perpétuel créant tensions rébellion-transcendance. Vous oscillez entre rejet total spiritualité conformiste et rêve utopiste naïf. Chaos spirituel menace. Cette friction cultive discernement spirituel: apprendre que libération authentique honore sagesse établie.',
      'Opposition': 'Votre liberté disruptive radicale et spiritualité transcendante idéalisée dansent opposition perpétuelle créant dualité révolution-transcendance épuisante. Vous oscillez entre rebelle nihiliste sans foi et mystique idéaliste. Cette dualité crée confusion: que croirez-vous vraiment intérieurement? L\'intégration laborieuse crée spiritualité libérante enracinée.',
      'Sextile': 'Un sextile entre liberté et imagination crée harmonie naturelle où vision spirituelle libère authentiquement. Votre liberté inspire transcendance constructive. Révolution spirituelle émana authenticité. C\'est l\'aspect du visionnaire spirituel dont liberté transforme.'
    },
    'pluto-sun': {
      'Conjonction': 'Votre essence solaire et pouvoir plutonien fusionnent créant phénix immortel puissant essence transformatrice extraordinaire. Votre identité porte pouvoir régénération: essence transforme réalités autour magnétiquement forcément. Vous êtes agente mort naissance: identité incite transformations profondes involontaires chez autres. Votre présence irrésistible magnétique transformatrice. Le défi: ce pouvoir inconscient peut devenir dominant abusif si insouciant. Essence menace domination. Apprendre canaliser transformation responsablement authentiquement.',
      'Trigone': 'Un flux harmonieux magnifique relie essence à pouvoir créant phénix respecté incarné responsable. Votre transformation émana conviction sincère, non manipulation. Vous guidez transformation car essence porte autorité naturelle. Leadership transforme gens. C\'est l\'aspect du leader transformateur authentique dont pouvoir régénère.',
      'Carré': 'Votre ego solaire et pouvoir plutonien entrent conflit perpétuel créant tensions pouvoir identité. Vous oscillez entre affirmation constructrice et destruction régénératrice radicale. Luttes pouvoir répétées testent autorité: comment gouvernez ce pouvoir intense? Cette friction forge pouvoir responsable authentique: apprendre que vraie puissance démarre intégrité personnelle.',
      'Opposition': 'Votre essence solaire assertive créatrice et pouvoir plutonien destructeur dansent opposition perpétuelle créant dualité intensité épuisante. Vous oscillez entre affirmation stable constructrice et besoin destruction régénération radicale. Une jour constructeur; lendemain destructeur régénérateur. Cette dualité crée ambivalence: est-ce pouvoir créer détruire? L\'intégration laborieuse crée transformation responsable.',
      'Sextile': 'Un sextile entre essence et pouvoir crée harmonie naturelle où transformation authentique s\'exprime clairement. Votre pouvoir émana essence sincère constructrice. Gens acceptent votre transformation car voient intégrité. Votre pouvoir enrichit monde. C\'est l\'aspect du transformateur authentique dont régénération crée.'
    },
    'pluto-moon': {
      'Conjonction': 'Votre émotions profondes et pouvoir plutonien fusionnent créant intensité affective abyssale irrésistible magnétique. Vos sentiments portent pouvoir transformateur obsessif magnétique. Magnétisme dangereux: gens submergés votre charme complètement où attachement devient obsession plutonienne. Vous dominez affectivement conscient inconscient involontairement. Le défi: jalousie possessivité menace car relations deviennent toxiques. Amour transformation contrôle destructeur inévitable. Apprendre canaliser intensité avec sagesse responsable non destructrice.',
      'Trigone': 'Un flux harmonieux magnifique relie émotions à pouvoir créant guérisseur incarné puissant. Votre compréhension émotionnelle émana sincérité transformatrice, non manipulation. Vous régénérez émotionnellement où gens transforment profondément. Intensité inspire confiance car enracinée intégrité. C\'est l\'aspect du guérisseur affectif authentique dont amour transforme.',
      'Carré': 'Vos émotions authentiques et destruction-régénération plutonienne entrent conflit perpétuel créant tempêtes affectives. Vous oscillez entre tendresse et obsessions destructrices controlantes. Intensité peut blesser car gens sentent menace. Cette friction forge pouvoir responsable: apprendre que vraie puissance régénère au lieu détruire.',
      'Opposition': 'Votre légèreté surface et profondeur destructrice dansent opposition perpétuelle créant dualité lightness-abyss épuisante. Vous oscillez entre émotions brèves et plongées abyssales possession. Gens sentent instabilité: semblent profonds puis rejet. L\'intégration laborieuse crée transformation affective enracinée.',
      'Sextile': 'Un sextile entre émotions et pouvoir crée harmonie naturelle où transformation authentique émana intensité. Votre puissance inspire confiance profonde respect. Gens acceptent intensité car voient intégrité. C\'est l\'aspect du guérisseur transformateur dont amour régénère constructivement.'
    },
    'pluto-mercury': {
      'Conjonction': 'Votre intellect rapide et investigation plutonienne fusionnent créant penseur insatiable perceur secrets abyssaux extraordinaire. Vous creusez mentalement jusqu\'à vérités cachées profondes: mots deviennent armes investigation. Curiosité dévore mystère: vous fouillez obsessivement pénètrement. Communication porte pouvoir régénération: paroles transforment consciences. Le défi: obsession mentale paralysante manipulation verbale menace. Pensée devient possessive controlante. Apprendre canaliser pouvoir avec sagesse responsable éthique.',
      'Trigone': 'Un flux harmonieux magnifique relie pensée à investigation créant penseur puissant incarné. Votre analyse émana conviction profonde authentique. Vous découvrez secrets car comprenez profondément psychique humaine. Parole porte autorité transformatrice. C\'est l\'aspect du psychologue investigateur authentique dont sagesse guérit.',
      'Carré': 'Votre intellect curieux et pulsion investigation obsessive entrent conflit perpétuel créant tensions découverte-secret. Vous oscillez entre besoin connaître tout complètement et secret jaloux protégeant. Obsession menace car creusez compulsivement. Manipulation possible où paroles blessent. Cette friction forge discernement progressif: apprendre que vraie puissance protège secrets.',
      'Opposition': 'Votre pensée superficielle et investigation obsessive dansent opposition perpétuelle créant dualité surface-abysse épuisante. Vous oscillez entre surface apparences et obsession fouille abyssale profonde. Cette instabilité crée confusion: combien creuser profondeur? L\'intégration laborieuse crée sagesse où investigation honore secrets.',
      'Sextile': 'Un sextile entre pensée et investigation crée harmonie naturelle où curiosité pénètre secrets effectivement. Votre parole découvre profondeurs authentiquement. C\'est l\'aspect du sage investigateur dont puissance communique sagesse.'
    },
    'pluto-venus': {
      'Conjonction': 'Votre beauté gracieuse et intensité plutonienne fusionnent créant séducteur magnétique puissant irrésistible extraordinaire. Vous aimez intensément: affection porte pouvoir transformateur obsessif magnétique. Magnétisme dangereux: gens submergés votre charme complètement où attachement devient obsession. Vous dominez affectivement conscient inconscient. Le défi: jalousie possessivité menace car relations toxiques. Amour transformation contrôle destructeur inévitable. Apprendre canaliser intensité avec sagesse responsable non destructrice.',
      'Trigone': 'Un flux harmonieux magnifique relie beauté à intensité créant amant magnétique incarné. Votre affection émana conviction sincère profondement transformatrice. Vous régénérez gens émotionnellement où transforment profondément. Intensité inspire confiance car enracinée intégrité. C\'est l\'aspect du séducteur puissant dont amour régénère.',
      'Carré': 'Votre affection tendre et pulsion domination possessive entrent conflit perpétuel créant relations turbulentes. Vous oscillez entre tendresse authentique et obsessions jalouses controlantes. Intensité peut blesser car gens sentent menace. Cette friction forge amour puissant responsable: apprendre que vraie puissance régénère au lieu contrôler.',
      'Opposition': 'Votre affection légère surface et profondeur destructrice dansent opposition perpétuelle créant dualité tendresse-possession épuisante. Vous oscillez entre tendresse brève et obsessions jalouses destructrices. Partenaires sentent instabilité: amour vient-il ou possession destructrice? L\'intégration laborieuse crée intensité responsable.',
      'Sextile': 'Un sextile entre beauté et intensité crée harmonie naturelle où magnétisme authentique transforme. Votre puissance inspire confiance profonde respect. Gens acceptent intensité car voient intégrité. C\'est l\'aspect du séducteur dont amour régénère transforme.'
    },
    'pluto-mars': {
      'Conjonction': 'Votre action impulsive et pouvoir plutonien fusionnent créant guerrier transformateur puissant régénérateur destructeur extraordinaire. Action porte pouvoir régénération intense: gens transforment profondément où vous êtes agent mort naissances. Action détruit pour reconstruire. Présence incite transformation forcée. Le défi: agressivité destructrice domination violente menace. Pouvoir devient malveisance: action détruit sans reconstruire. Apprendre canaliser transformation avec sagesse responsable.',
      'Trigone': 'Un flux harmonieux magnifique relie action à pouvoir créant guerrier incarné respecté. Votre action émana conviction sincère transformatrice, non manipulation. Vous manifeste régénération car comprenez sagesse destruction créatrice. Votre puissance inspire confiance enracinée intégrité. C\'est l\'aspect du guerrier transformateur authentique dont action régénère.',
      'Carré': 'Votre action constructrice et pulsion destruction radicale entrent conflit perpétuel créant tensions création-destruction. Vous oscillez entre besoin construire solidement et destruction radicale régénérer. Agressivité menace car action devient violence. Cette friction forge action responsable: apprendre que régénération construit.',
      'Opposition': 'Votre action créatrice constructrice et destruction radicale dansent opposition perpétuelle créant dualité création-destruction épuisante. Vous oscillez entre constructeur solidaire et destructeur radical. Partenaires sentent instabilité: action crée-t-elle ou détruit-elle? L\'intégration laborieuse crée transformation responsable constructive.',
      'Sextile': 'Un sextile entre action et pouvoir crée harmonie naturelle où transformation actionne constructivement. Votre action transforme profondément. Régénération crée fondations nouvelles. C\'est l\'aspect du guerrier dont action crée renaissance.'
    },
    'pluto-jupiter': {
      'Conjonction': 'Votre sagesse généreuse et pouvoir plutonien fusionnent créant guide transformateur puissant sage extraordinaire. Vous croyez généreusement transformation: foi porte pouvoir régénération profonde mondes entiers. Sagesse transforme charismatiquement: gens suivent car voient vérité profonde. Vous suscitez renaissances spirituelles epochales. Le défi: mégalomanie menace car vous croyez messie sauveur absolu. Domination spirituelle où controllez disciples esprits. Apprendre que sagesse authentique libère plutôt qu\'asservit.',
      'Trigone': 'Un flux harmonieux magnifique relie sagesse à pouvoir créant guide transformateur incarné respecté profondément. Votre sagesse émana conviction sincère transformatrice authentique. Vous guidez transformations profondes effectivement. Votre leadership inspire dignité. C\'est l\'aspect du sage guide authentique dont sagesse régénère.',
      'Carré': 'Votre sagesse généreuse et pulsion domination plutonienne entrent conflit perpétuel créant tensions générosité-contrôle. Vous oscillez entre partager sagesse généreusement et controllerait disciples possessivement. Mégalomanie possible: posez messie. Cette friction crée sagesse responsable: apprendre que vraie sagesse libère.',
      'Opposition': 'Votre sagesse généreuse expansive et pouvoir destructeur domina dansent opposition perpétuelle créant dualité générosité-domination épuisante. Vous oscillez entre sage généreux bienveillant et maître controllerait manipulateur. Cette dualité crée confusion: êtes-vous guide ou prédateur spirituel? L\'intégration laborieuse crée sagesse puissante responsable.',
      'Sextile': 'Un sextile entre sagesse et pouvoir crée harmonie naturelle où guidance transforme respectueusement. Votre sagesse inspire transformation authentique. Leadership émana intégrité. C\'est l\'aspect du guide sage puissant dont leadership régénère.'
    },
    'pluto-saturn': {
      'Conjonction': 'Votre discipline saturnienne et pouvoir plutonien fusionnent créant alchimiste puissant structuré architecturé extraordinaire. Vous transformez lentement solidement: régénération s\'enracine nouvelle foundation durable. Votre pouvoir architecte: ruines vers renaissance sagesse. Vous êtes guide transformateur pragmatique. Le défi: obsession menace car pouvoir devient domination possessive destructrice. Transformation figée domination mortifère. Apprendre que vraie transformation libère plutôt qu\'asservit.',
      'Trigone': 'Un flux harmonieux magnifique relie discipline à pouvoir créant alchimiste incarné respecté profondement. Votre transformation émana conviction sincère constructive régénératrice. Vous guidez changement car comprenez sagesse structure nouvelle. Transformation durable inspire confiance. C\'est l\'aspect de l\'alchimiste authentique dont pouvoir transforme constructivement.',
      'Carré': 'Votre pouvoir destructeur et besoin structure rigide entrent conflit perpétuel créant tensions chaos-contrôle. Vous oscillez entre destruction radicale et rigidité figée. Obsession menace car pouvoir devient domination. Cette friction forge transformation responsable: apprendre que régénération honore édification.',
      'Opposition': 'Votre pouvoir destructeur et discipline rigide constructive dansent opposition perpétuelle créant dualité annihilation-preservation épuisante. Vous oscillez entre destructeur radical et conservateur préservateur rigide. Cette dualité crée confusion: construisez-vous ou détruisez-vous? L\'intégration laborieuse crée transformation wise.',
      'Sextile': 'Un sextile entre discipline et pouvoir crée harmonie naturelle où transformation actionne solidement. Votre puissance inspire confiance. Régénération construit fondations. C\'est l\'aspect de l\'alchimiste dont transformation crée renaissance.'
    },
    'pluto-uranus': {
      'Conjonction': 'Transformation et liberté fusionnent: révolutionnaire destructeur radical régénération.',
      'Trigone': 'Transformation libre constructive incarnée. Révolutionnaire respecté transformateur.',
      'Carré': 'Destruction chaos possibles. Cette friction crée transformation responsable progressive.',
      'Opposition': 'Oscillation destruction liberté régénération. Intégration crée transformation wise.',
      'Sextile': 'Votre transformation inspire liberté. Régénération constructive incarnée révolutionnaire.'
    }
  };

  const interpretation = aspectInterpretations[key]?.[aspectType];

  if (interpretation) {
    return interpretation;
  }

  const genericInterpretations: Record<string, string> = {
    'Conjonction': `L'énergie de ${p1Name} et celle de ${p2Name} fusionnent complètement, créant une force unique qui amplifie les qualités des deux planètes.`,
    'Trigone': `${p1Name} et ${p2Name} travaillent ensemble harmonieusement, vous offrant un talent naturel dans les domaines qu'elles représentent.`,
    'Carré': `La tension entre ${p1Name} et ${p2Name} crée des défis stimulants qui, bien qu'inconfortables, vous poussent à grandir et à évoluer.`,
    'Opposition': `${p1Name} et ${p2Name} vous tirent dans des directions opposées. L'équilibre entre ces deux forces est votre chemin de croissance.`,
    'Sextile': `${p1Name} et ${p2Name} créent des opportunités faciles. Leurs énergies se soutiennent mutuellement de manière constructive.`
  };

  return genericInterpretations[aspectType] || 'Cet aspect crée une dynamique unique dans votre thème.';
}
