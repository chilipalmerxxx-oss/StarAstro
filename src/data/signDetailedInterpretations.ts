// Detailed interpretations for Sun, Moon, and Ascendant in each sign

export const SIGN_ENGLISH_NAMES: Record<string, string> = {
  'Bélier': 'Aries',
  'Taureau': 'Taurus',
  'Gémeaux': 'Gemini',
  'Cancer': 'Cancer',
  'Lion': 'Leo',
  'Vierge': 'Virgo',
  'Balance': 'Libra',
  'Scorpion': 'Scorpio',
  'Sagittaire': 'Sagittarius',
  'Capricorne': 'Capricorn',
  'Verseau': 'Aquarius',
  'Poissons': 'Pisces',
};

export const SIGN_SYMBOLS: Record<string, string> = {
  'Bélier': '♈',
  'Taureau': '♉',
  'Gémeaux': '♊',
  'Cancer': '♋',
  'Lion': '♌',
  'Vierge': '♍',
  'Balance': '♎',
  'Scorpion': '♏',
  'Sagittaire': '♐',
  'Capricorne': '♑',
  'Verseau': '♒',
  'Poissons': '♓',
};

export const SUN_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Le Soleil en Bélier illumine votre être d'une flamme pionnière et intrépide. Vous êtes le guerrier du zodiaque, animé par un courage instinctif et une volonté de conquérir de nouveaux horizons. Votre énergie vitale est celle du printemps qui surgit — impossible à contenir, irrésistible dans son élan.

Votre identité profonde se construit autour de l'action et de l'initiative. Vous n'attendez pas que les choses arrivent : vous les provoquez. Cette impulsivité créatrice est votre plus grande force, même si elle peut parfois vous pousser à agir avant de réfléchir. L'important pour vous n'est pas la perfection, mais le mouvement.

En tant que Bélier solaire, vous portez en vous l'archétype du héros mythique : celui qui part à l'aventure sans savoir ce qui l'attend, mais avec la certitude absolue qu'il saura affronter chaque défi. Votre enthousiasme est contagieux et votre franchise désarmante.`,

  'Taureau': `Le Soleil en Taureau vous ancre dans une réalité sensuelle et concrète. Vous êtes le bâtisseur du zodiaque, celui qui transforme les rêves en réalisations tangibles grâce à une persévérance que rien ne peut ébranler. Votre rapport au monde est fondamentalement sensoriel — vous avez besoin de toucher, goûter, ressentir pour croire.

Votre identité se construit dans la durée et la stabilité. Là où d'autres zigzaguent, vous tracez une ligne droite vers vos objectifs avec une détermination qui peut sembler lente mais qui est en réalité implacable. Vous comprenez instinctivement que les choses de valeur demandent du temps.

Le Taureau solaire incarne la beauté de la constance. Votre loyauté est inébranlable, votre générosité profonde, et votre capacité à créer du confort et de la beauté autour de vous est un véritable don. Vous êtes la terre fertile qui nourrit tout ce qu'elle touche.`,

  'Gémeaux': `Le Soleil en Gémeaux fait de vous un être de communication et de connexion. Votre esprit est un kaléidoscope brillant qui capte simultanément mille facettes de la réalité. La curiosité est le moteur de votre existence — chaque conversation, chaque livre, chaque rencontre est une porte vers un monde nouveau.

Votre identité est multiple et mouvante, et c'est précisément là que réside votre génie. Vous êtes le traducteur universel, capable de comprendre des perspectives très différentes et de créer des ponts entre les idées. Votre agilité mentale vous permet de naviguer avec aisance dans la complexité du monde moderne.

En tant que Gémeaux solaire, vous portez le don de la parole et de l'écriture. Votre intelligence est vive, adaptable, et perpétuellement en mouvement. Vous êtes l'éternel étudiant de la vie, et cette soif d'apprendre vous garde éternellement jeune d'esprit.`,

  'Cancer': `Le Soleil en Cancer fait de vous le gardien émotionnel du zodiaque. Votre sensibilité profonde n'est pas une faiblesse — c'est un superpouvoir qui vous permet de capter les nuances invisibles de chaque situation. Vous ressentez le monde avec une intensité que peu peuvent comprendre.

Votre identité se construit autour de l'attachement et de la protection. Famille, racines, mémoire : ces mots résonnent au plus profond de votre être. Vous êtes celui qui se souvient, qui préserve, qui nourrit. Votre capacité à créer un espace de sécurité émotionnelle est un don rare et précieux.

Le Cancer solaire porte en lui la sagesse de la Lune — cette compréhension intuitive des cycles de la vie, des marées émotionnelles et du besoin fondamental de chaque être d'être aimé et protégé. Sous votre carapace se cache un cœur d'une tendresse infinie.`,

  'Lion': `Le Soleil en Lion — sa position la plus puissante — fait de vous un être rayonnant et magnétique. Vous êtes né pour briller, non pas par vanité, mais parce que votre lumière intérieure est tout simplement trop intense pour être cachée. Votre présence illumine chaque pièce que vous traversez.

Votre identité se construit autour de la créativité et de l'expression de soi. Vous avez un besoin vital de créer, d'inspirer et de laisser votre empreinte dans le monde. La générosité est au cœur de votre nature — vous donnez avec grandeur et attendez en retour la reconnaissance de votre unicité.

En tant que Lion solaire, vous incarnez l'archétype du roi ou de la reine bienveillant(e) : celui qui protège son royaume avec fierté et guide ses proches avec chaleur. Votre courage est noble, votre loyauté absolue, et votre capacité à aimer, véritablement royale.`,

  'Vierge': `Le Soleil en Vierge vous dote d'un esprit analytique d'une finesse extraordinaire. Vous percevez les détails que les autres ignorent, et cette capacité d'observation fait de vous un maître du perfectionnement. Là où d'autres voient le tableau d'ensemble, vous distinguez chaque coup de pinceau.

Votre identité se construit dans le service et l'amélioration continue. Vous êtes animé par un idéal de pureté et d'efficacité qui vous pousse à donner le meilleur de vous-même en toute circonstance. Votre humilité n'est pas un manque de confiance — c'est la sagesse de savoir qu'on peut toujours progresser.

La Vierge solaire porte le don de la guérison, qu'elle soit physique, mentale ou organisationnelle. Vous êtes celui qui répare, qui organise, qui rend possible l'impossible par la simple force de votre rigueur et de votre dévouement. Votre intelligence pratique est un trésor.`,

  'Balance': `Le Soleil en Balance fait de vous un artiste de l'harmonie et de la relation. Vous possédez un sens esthétique inné qui s'applique aussi bien aux formes qu'aux relations humaines. La beauté, sous toutes ses formes, est votre boussole existentielle.

Votre identité se construit dans le miroir de l'autre. Loin d'être une dépendance, cette orientation relationnelle est une intelligence sociale remarquable. Vous comprenez instinctivement que nous existons pleinement à travers nos connexions, et vous excellez dans l'art de créer des liens harmonieux.

En tant que Balance solaire, vous êtes le diplomate naturel du zodiaque. Votre sens de la justice, votre élégance et votre capacité à voir tous les points de vue font de vous un médiateur hors pair. Vous apportez grâce et équilibre partout où vous allez.`,

  'Scorpion': `Le Soleil en Scorpion vous dote d'une intensité et d'une profondeur que peu de signes peuvent égaler. Vous n'effleurez jamais la surface des choses — vous plongez directement au cœur, là où se cachent les vérités essentielles. Votre regard pénétrant traverse les masques et les illusions.

Votre identité se forge dans la transformation perpétuelle. Comme le phénix, vous connaissez le pouvoir de la destruction créatrice : mourir à soi-même pour renaître plus fort. Cette capacité de métamorphose fait de vous l'un des signes les plus résilients du zodiaque.

Le Scorpion solaire porte le mystère de la vie et de la mort dans son ADN. Votre magnétisme est irrésistible, votre loyauté absolue, et votre passion, dévorante. Vous ne faites jamais les choses à moitié — en amour comme en toute chose, c'est tout ou rien.`,

  'Sagittaire': `Le Soleil en Sagittaire embrase votre être d'un feu philosophique et aventurier. Vous êtes l'explorateur du zodiaque, celui qui est perpétuellement en quête de sens, de vérité et de nouveaux horizons. Votre optimisme naturel est un flambeau qui éclaire le chemin des autres.

Votre identité se construit dans l'expansion et la découverte. Vous avez besoin d'espace — physique, mental et spirituel — pour déployer vos ailes. Les frontières vous semblent artificielles et votre esprit refuse naturellement toute limitation. Voyages, études, philosophie : tout ce qui élargit votre vision vous nourrit.

En tant que Sagittaire solaire, vous incarnez la joie de vivre et la foi en l'avenir. Votre enthousiasme est contagieux, votre franchise rafraîchissante, et votre capacité à rebondir après les épreuves, tout simplement remarquable. Vous êtes le professeur, le guide, l'éclaireur.`,

  'Capricorne': `Le Soleil en Capricorne vous confère une ambition et une discipline qui force le respect. Vous êtes l'architecte du zodiaque, celui qui bâtit des empires pierre après pierre, avec une patience que le temps lui-même envie. Votre sens des responsabilités est inné et votre intégrité, inébranlable.

Votre identité se construit dans l'accomplissement et la maîtrise. Vous ne cherchez pas la facilité — vous cherchez l'excellence. Chaque obstacle est pour vous une marche supplémentaire vers le sommet que vous visez avec une détermination silencieuse mais implacable.

Le Capricorne solaire porte la sagesse de Saturne : la compréhension profonde que la valeur se mesure à l'effort investi. Votre maturité impressionne, votre fiabilité rassure, et votre capacité à prendre des décisions difficiles avec stoïcisme fait de vous un leader naturel.`,

  'Verseau': `Le Soleil en Verseau fait de vous un visionnaire et un innovateur. Votre esprit opère sur des fréquences que la majorité ne capte pas encore — vous voyez le futur avant qu'il ne se manifeste. L'originalité n'est pas pour vous un choix, c'est une nécessité existentielle.

Votre identité se construit dans la différence et l'indépendance intellectuelle. Vous refusez instinctivement de vous conformer aux attentes conventionnelles, non par rébellion gratuite, mais parce que vous percevez des possibilités que les autres ne voient pas encore. Votre liberté de pensée est sacrée.

En tant que Verseau solaire, vous portez l'archétype de l'humaniste révolutionnaire. Votre préoccupation pour le collectif, votre idéalisme et votre courage intellectuel font de vous un catalyseur de changement. Vous n'améliorez pas le monde — vous le réinventez.`,

  'Poissons': `Le Soleil en Poissons vous connecte à l'invisible et à l'universel. Vous êtes le mystique du zodiaque, doté d'une sensibilité qui transcende les frontières du rationnel. Votre empathie n'a pas de limites — vous ressentez la joie et la souffrance du monde comme si elles étaient les vôtres.

Votre identité se construit dans la dissolution et la transcendance. Là où d'autres cherchent à se définir par des frontières nettes, vous comprenez que l'essence de l'être est fluide, changeante, infinie. Cette sagesse vous donne accès à une créativité et une intuition sans pareilles.

Le Poissons solaire porte le don de la compassion universelle. Artiste, guérisseur, rêveur : vous êtes le pont entre le visible et l'invisible. Votre imagination est un océan sans fond, et votre capacité à ressentir la beauté dans toute chose est un véritable miracle.`,
};

export const MOON_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Votre Lune en Bélier révèle un monde émotionnel ardent et spontané. Vos réactions sont immédiates, presque instinctives — vous ressentez avec la même intensité que vous agissez. La colère monte vite mais s'évapore tout aussi rapidement, car vous n'êtes pas du genre à ruminer.

Sur le plan affectif, vous avez besoin d'excitation et de nouveauté pour vous sentir vivant émotionnellement. La routine vous étouffe, l'ennui vous déprime. Vous cherchez un partenaire qui puisse suivre votre rythme effréné et partager votre passion pour la vie.

Cette position lunaire vous donne un courage émotionnel remarquable. Vous n'avez pas peur d'exprimer ce que vous ressentez, même si cela dérange. Votre honnêteté émotionnelle, bien que parfois brusque, est profondément authentique.`,

  'Taureau': `Votre Lune en Taureau — l'une des positions les plus confortables — vous offre une stabilité émotionnelle exceptionnelle. Vos sentiments sont profonds, constants et fiables. Vous n'êtes pas sujet aux montagnes russes émotionnelles : votre monde intérieur est un jardin paisible et fertile.

Vous avez un besoin vital de sécurité matérielle et affective. Le confort physique — bonne nourriture, beaux vêtements, environnement agréable — nourrit directement votre bien-être émotionnel. Les plaisirs sensoriels sont pour vous une forme de méditation naturelle.

Cette Lune vous donne une patience émotionnelle extraordinaire, mais aussi une obstination remarquable. Une fois que vos sentiments sont fixés, rien ne peut les déloger. Votre fidélité est à toute épreuve, et votre capacité à créer un foyer chaleureux est un don précieux.`,

  'Gémeaux': `Votre Lune en Gémeaux crée un monde émotionnel vif, curieux et perpétuellement en mouvement. Vous traitez vos émotions par la pensée et la parole — parler de ce que vous ressentez est votre façon naturelle de digérer les expériences. Le silence émotionnel vous est presque insupportable.

Votre besoin fondamental est celui de la stimulation intellectuelle. Une conversation passionnante vous nourrit autant qu'un câlin. Vous cherchez des connexions qui engagent votre esprit autant que votre cœur, et la variété dans vos relations est essentielle à votre équilibre.

Cette position lunaire vous donne une adaptabilité émotionnelle remarquable. Vous pouvez naviguer entre différents états d'esprit avec une agilité qui surprend, et votre humour est souvent votre meilleur mécanisme de défense contre les turbulences émotionnelles.`,

  'Cancer': `Votre Lune en Cancer — dans sa position la plus puissante — fait de vous un être d'une sensibilité océanique. Vos émotions sont profondes, riches et nuancées, avec une mémoire émotionnelle qui conserve chaque impression comme un trésor. Vous ressentez les atmosphères comme d'autres perçoivent les couleurs.

Votre besoin de sécurité émotionnelle est fondamental et non négociable. Famille, maison, appartenance : ces mots touchent la corde la plus intime de votre être. Vous construisez autour de vous un cocon protecteur qui nourrit autant que vous avez besoin d'être nourri.

Cette Lune vous confère une intuition presque magique. Vous captez les non-dits, les émotions cachées, les besoins inexprimés des autres. Votre empathie naturelle fait de vous un confident et un protecteur que tous recherchent dans les moments difficiles.`,

  'Lion': `Votre Lune en Lion illumine votre vie émotionnelle d'une chaleur généreuse et dramatique. Vos sentiments sont grands, expressifs et impossibles à ignorer. Vous aimez avec grandeur, vous souffrez avec noblesse, et vous célébrez avec éclat. La tiédeur émotionnelle n'existe pas dans votre vocabulaire.

Votre besoin profond est celui de la reconnaissance et de l'admiration. Être vu, apprécié et célébré nourrit votre âme comme le soleil nourrit la terre. Ce n'est pas de la vanité — c'est un besoin authentique de sentir que votre lumière intérieure est reçue et valorisée.

Cette position lunaire vous donne un cœur véritablement royal. Votre générosité émotionnelle est sans limites, votre loyauté, féroce, et votre capacité à rendre les autres importants, un véritable don. Vous êtes celui qui fait se sentir spécial tous ceux qui croisent votre chemin.`,

  'Vierge': `Votre Lune en Vierge crée un monde émotionnel subtil, analytique et orienté vers le service. Vous traitez vos émotions avec méthode, cherchant à comprendre avant de ressentir. Cette approche peut sembler détachée, mais elle cache en réalité une sensibilité profonde et délicate.

Votre besoin fondamental est celui de l'utilité et de l'ordre. Vous vous sentez émotionnellement en paix quand votre environnement est organisé, quand votre corps est sain et quand vous savez que vous contribuez de manière significative. Le chaos vous déstabilise profondément.

Cette Lune vous donne une capacité remarquable à prendre soin des autres de manière concrète et pratique. Votre amour s'exprime par des actes de service — préparer un repas, organiser un espace, résoudre un problème. C'est votre langage émotionnel, et il est profondément précieux.`,

  'Balance': `Votre Lune en Balance crée un monde émotionnel tourné vers l'harmonie et la beauté relationnelle. Vous avez une aversion naturelle pour les conflits et cherchez instinctivement l'équilibre dans toutes vos interactions. La paix intérieure, pour vous, passe nécessairement par la paix relationnelle.

Votre besoin fondamental est celui de la connexion harmonieuse. Vous vous sentez émotionnellement comblé quand vos relations sont équilibrées, quand votre environnement est beau et quand la justice prévaut. La solitude prolongée vous déstabilise car vous existez pleinement dans le lien.

Cette position lunaire vous donne un sens esthétique émotionnel — une capacité à percevoir la beauté dans les relations et à créer des espaces d'élégance émotionnelle. Votre diplomatie est instinctive et votre grâce sociale, un véritable art.`,

  'Scorpion': `Votre Lune en Scorpion plonge votre vie émotionnelle dans des profondeurs abyssales. Rien n'est superficiel chez vous — vos sentiments sont intenses, transformateurs et absolus. Vous vivez chaque émotion avec une puissance qui peut être aussi destructrice que régénératrice.

Votre besoin fondamental est celui de l'authenticité émotionnelle totale. Les faux-semblants vous révulsent. Vous cherchez la vérité nue dans chaque relation, chaque expérience, chaque moment. Cette quête de profondeur vous rend magnétique mais aussi redoutable.

Cette Lune vous confère un pouvoir de transformation émotionnelle extraordinaire. Vous connaissez les ténèbres intérieures et savez les traverser. Chaque crise est pour vous une renaissance, chaque perte, une leçon de détachement. Votre résilience émotionnelle est sans pareille.`,

  'Sagittaire': `Votre Lune en Sagittaire illumine votre vie émotionnelle d'un optimisme aventurier et expansif. Vos sentiments sont joyeux, enthousiastes et toujours en quête de sens. Vous avez besoin de comprendre pourquoi vous ressentez ce que vous ressentez — la philosophie émotionnelle est votre terrain de jeu.

Votre besoin fondamental est celui de la liberté et de l'expansion. Vous vous sentez émotionnellement vivant quand vous explorez, apprenez ou enseignez. Les limites vous oppressent, et vous avez besoin d'espace — physique et mental — pour que vos émotions puissent respirer.

Cette position lunaire vous donne un enthousiasme émotionnel contagieux et une capacité naturelle à voir le côté positif de chaque situation. Votre foi en la vie est un phare qui guide non seulement vous-même, mais tous ceux qui ont la chance de croiser votre route.`,

  'Capricorne': `Votre Lune en Capricorne structure votre vie émotionnelle avec une rigueur et une maturité qui impressionnent. Vos sentiments sont profonds mais contenus, exprimés avec mesure et réserve. Ce n'est pas de la froideur — c'est de la dignité émotionnelle, une force tranquille qui s'approfondit avec le temps.

Votre besoin fondamental est celui de la sécurité structurelle. Vous vous sentez émotionnellement en paix quand votre vie est organisée, vos objectifs clairs et vos responsabilités assumées. Le désordre émotionnel vous déstabilise car vous avez besoin de sentir que vous maîtrisez votre monde intérieur.

Cette Lune vous donne une endurance émotionnelle remarquable. Là où d'autres s'effondrent, vous restez debout. Votre fiabilité émotionnelle fait de vous le roc sur lequel les autres s'appuient, et votre sagesse émotionnelle s'approfondit magnifiquement avec l'âge.`,

  'Verseau': `Votre Lune en Verseau crée un monde émotionnel original, indépendant et tourné vers le collectif. Vos sentiments sont teintés d'intellectualité — vous observez vos propres émotions avec une curiosité détachée, comme un scientifique fasciné par ses propres réactions.

Votre besoin fondamental est celui de la liberté émotionnelle. Vous refusez les conventions sentimentales et cherchez des formes de connexion qui respectent votre individualité. Les relations traditionnelles peuvent vous sembler étouffantes si elles ne laissent pas de place à votre besoin d'espace.

Cette position lunaire vous donne une vision émotionnelle unique et avant-gardiste. Vous comprenez que l'amour peut prendre des formes infinies et que la connexion véritable transcende les attentes sociales. Votre humanisme émotionnel est un cadeau rare pour notre monde.`,

  'Poissons': `Votre Lune en Poissons vous ouvre à un océan émotionnel sans frontières. Votre sensibilité est cosmique — vous ne ressentez pas seulement vos propres émotions, mais celles de tous ceux qui vous entourent. Cette perméabilité émotionnelle est à la fois votre plus grand don et votre plus grand défi.

Votre besoin fondamental est celui de la transcendance et de la fusion. Vous cherchez à vous dissoudre dans quelque chose de plus grand que vous — l'art, la spiritualité, l'amour mystique. Les frontières entre vous et l'autre sont naturellement floues, ce qui crée une intimité d'une profondeur rare.

Cette Lune vous confère une imagination émotionnelle sans limites et une compassion universelle. Vous êtes le guérisseur émotionnel du zodiaque, capable de ressentir la souffrance des autres et de la transmuter par votre seule présence. Votre sensibilité est un portail vers l'infini.`,
};

export const ASCENDANT_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Un Ascendant Bélier vous dote d'une première impression percutante et dynamique. Dès que vous entrez dans une pièce, votre énergie est palpable — directe, vive, un peu combative. Les autres vous perçoivent comme quelqu'un de courageux, spontané et prêt à l'action.

Votre masque social est celui du guerrier. Vous abordez les nouvelles situations tête baissée, avec un enthousiasme qui peut être aussi inspirant qu'intimidant. Votre langage corporel est énergique, votre regard franc, et votre poignée de main ferme.

Cet Ascendant influence profondément votre apparence physique : traits marqués, démarche rapide, posture athlétique. Vous vieillissez bien grâce à cette énergie martienne qui vous maintient en mouvement. Votre approche de la vie est celle d'un pionnier — toujours en quête du prochain défi.`,

  'Taureau': `Un Ascendant Taureau vous confère une présence rassurante et sensuelle. Dès le premier contact, les autres perçoivent votre calme, votre solidité et votre goût pour les belles choses. Vous inspirez confiance par votre simple présence — stable, fiable, ancrée.

Votre masque social est celui du bâtisseur serein. Vous prenez votre temps pour évaluer les nouvelles situations, et cette lenteur apparente cache en réalité une observation minutieuse. Rien ne vous échappe — vous enregistrez chaque détail sensoriel avant de vous engager.

Cet Ascendant influence votre apparence physique vers la robustesse et l'harmonie. Vos traits sont souvent réguliers et agréables, dégageant une beauté naturelle et terreuse. Votre voix est généralement mélodieuse, et votre présence physique, magnétiquement apaisante.`,

  'Gémeaux': `Un Ascendant Gémeaux vous dote d'une première impression vive, curieuse et communicative. Dès le premier échange, les autres captent votre intelligence, votre esprit et votre polyvalence. Vous êtes l'interlocuteur fascinant qui sait parler de tout avec enthousiasme.

Votre masque social est celui de l'éternel jeune. Vous abordez chaque nouvelle situation avec la curiosité d'un enfant et l'esprit d'un intellectuel. Votre adaptabilité sociale est remarquable — vous pouvez vous fondre dans n'importe quel environnement et converser avec n'importe qui.

Cet Ascendant vous donne une apparence souvent juvénile et un regard pétillant d'intelligence. Vos gestes sont expressifs, vos mouvements rapides, et votre énergie nerveux mais captivante. La jeunesse d'esprit qui vous caractérise se reflète dans votre apparence physique tout au long de votre vie.`,

  'Cancer': `Un Ascendant Cancer vous confère une première impression douce, accueillante et protectrice. Les autres perçoivent immédiatement votre sensibilité et votre chaleur — vous êtes la personne vers qui on se tourne instinctivement quand on a besoin de réconfort.

Votre masque social est celui du protecteur bienveillant. Vous accueillez les nouvelles situations avec prudence et empathie, évaluant le climat émotionnel avant de vous ouvrir. Cette réserve initiale fait place à une intimité remarquable une fois la confiance établie.

Cet Ascendant influence votre apparence vers la douceur : visage rond ou expressif, regard profond et expressif, posture qui invite à la confidence. Votre présence physique dégage une aura maternelle ou paternelle qui attire naturellement les confidences et l'affection des autres.`,

  'Lion': `Un Ascendant Lion vous dote d'une présence qui ne passe jamais inaperçue. Dès votre entrée, les regards se tournent vers vous — non pas parce que vous les cherchez, mais parce que votre aura rayonnante les attire. Votre charisme est instinctif, magnétique et chaleureux.

Votre masque social est celui du roi ou de la reine. Vous abordez chaque situation avec dignité, confiance et une générosité naturelle qui inspire le respect. Votre posture est fière sans être arrogante, votre sourire lumineux, et votre présence, véritablement solaire.

Cet Ascendant influence votre apparence de manière spectaculaire : chevelure remarquable (souvent abondante), traits expressifs, regard magnétique et posture royale. Vous vieillissez avec grâce et votre beauté a une qualité dramatique et théâtrale qui fascine.`,

  'Vierge': `Un Ascendant Vierge vous confère une première impression de raffinement discret et d'intelligence pratique. Les autres perçoivent votre attention aux détails, votre tenue soignée et votre approche méthodique. Vous inspirez confiance par votre compétence et votre humilité.

Votre masque social est celui de l'expert modeste. Vous abordez les nouvelles situations avec précaution et analyse, observant méticuleusement avant d'agir. Votre réserve naturelle cache une intelligence acérée et un sens de l'observation qui ne manque rien.

Cet Ascendant influence votre apparence vers l'élégance sobre et la propreté impeccable. Vos traits sont souvent fins et réguliers, votre style vestimentaire soigné sans ostentation, et votre présence physique dégage une énergie de compétence et de fiabilité discrète.`,

  'Balance': `Un Ascendant Balance vous dote d'une grâce sociale et d'un charme naturel inégalés. Dès le premier contact, les autres sont captivés par votre élégance, votre sourire et votre capacité à les mettre à l'aise. Vous êtes le diplomate naturel, celui qui crée de l'harmonie sans effort apparent.

Votre masque social est celui de l'esthète raffiné. Vous abordez chaque situation avec grâce et équilibre, cherchant instinctivement le point de convergence entre les différentes parties. Votre sens de la justice et votre fair-play sont immédiatement perceptibles.

Cet Ascendant influence votre apparence vers la beauté harmonieuse : traits équilibrés, sourire charmant, posture élégante. Votre style vestimentaire est naturellement raffiné, et votre présence physique crée une atmosphère d'harmonie et de beauté partout où vous allez.`,

  'Scorpion': `Un Ascendant Scorpion vous confère une présence intense et magnétique qui ne laisse personne indifférent. Dès le premier regard, les autres sentent votre profondeur, votre mystère et votre puissance intérieure. Votre regard est pénétrant — il semble percer les masques et lire les âmes.

Votre masque social est celui du détective psychologique. Vous abordez chaque nouvelle situation avec une vigilance aiguë, évaluant les dynamiques de pouvoir et les motivations cachées. Rien ne vous échappe, et cette perception est à la fois fascinante et légèrement inquiétante pour les autres.

Cet Ascendant influence votre apparence de manière saisissante : regard intense et perçant, traits sculpturaux, présence physique magnétique et mystérieuse. Votre beauté a quelque chose de dangereux et d'hypnotique. Vous dégagez une aura de transformation qui attire ceux qui sont prêts pour le changement.`,

  'Sagittaire': `Un Ascendant Sagittaire vous dote d'une présence joyeuse, expansive et aventurière. Dès que vous apparaissez, votre enthousiasme et votre optimisme sont contagieux. Les autres vous perçoivent comme un voyageur, un philosophe, un être libre dont la joie de vivre est un véritable soleil.

Votre masque social est celui de l'explorateur. Vous abordez chaque nouvelle situation avec curiosité et ouverture, prêt à apprendre et à partager. Votre rire est sonore, vos gestes amples, et votre énergie communicative. La vie est une aventure, et vous le montrez à chaque instant.

Cet Ascendant influence votre apparence vers le dynamisme et la stature : souvent grand ou donnant l'impression de grandeur, mouvements expansifs, sourire large et sincère. Votre présence physique dégage une énergie de liberté et d'aventure qui donne envie de vous suivre au bout du monde.`,

  'Capricorne': `Un Ascendant Capricorne vous confère une présence digne, sérieuse et impressionnante. Dès le premier contact, les autres sentent votre autorité naturelle et votre maturité. Vous inspirez le respect par votre tenue, votre self-control et votre aura de compétence.

Votre masque social est celui du dirigeant. Vous abordez les nouvelles situations avec méthode et prudence, évaluant les enjeux avant de vous engager. Votre réserve initiale peut sembler froide, mais elle masque une profondeur et une sensibilité que seuls les proches découvrent.

Cet Ascendant a un effet remarquable sur votre apparence : vous rajeunissez avec l'âge. Si la jeunesse peut vous donner un air plus vieux que vos années, la maturité vous embellit de manière spectaculaire. Vos traits deviennent plus harmonieux, votre style plus assuré, votre présence plus magnétique au fil du temps.`,

  'Verseau': `Un Ascendant Verseau vous dote d'une présence originale et intellectuellement stimulante. Dès le premier échange, les autres captent votre différence — non pas une excentricité calculée, mais une authenticité naturelle qui refuse poliment de se conformer. Vous êtes fascinant par votre simple singularité.

Votre masque social est celui du visionnaire. Vous abordez chaque situation avec une perspective unique, souvent décalée, qui ouvre de nouvelles possibilités. Votre indépendance d'esprit est immédiatement perceptible, et votre approche humaniste du monde attire ceux qui pensent différemment.

Cet Ascendant influence votre apparence de manière distinctive : quelque chose d'unique dans vos traits ou votre style vous rend immédiatement reconnaissable. Votre regard est électrique et intelligent, et votre présence physique dégage une énergie futuriste et avant-gardiste.`,

  'Poissons': `Un Ascendant Poissons vous confère une présence éthérée et mystérieusement attirante. Dès le premier regard, les autres perçoivent votre douceur, votre sensibilité et votre nature presque irréelle. Vous avez quelque chose de l'ange — une beauté qui semble d'un autre monde.

Votre masque social est celui du rêveur empathique. Vous abordez chaque situation avec une ouverture émotionnelle et une adaptabilité qui frisent le caméléonisme. Votre capacité à vous fondre dans l'atmosphère ambiante est remarquable, et votre empathie instinctive attire les confidences.

Cet Ascendant influence votre apparence vers l'évanescent : regard rêveur et profond, traits doux et changeants, présence physique qui semble parfois transparente. Votre beauté est celle de l'eau — fluide, changeante, et profondément captivante. Vous dégagez une aura de mystère et de compassion.`,
};

export const VENUS_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Vénus en Bélier illumine votre capacité amoureuse d'une passion ardente et impatiente. Vous aimez avec fougue, de manière instinctive et directe. Ce n'est pas l'amour qui s'éternise en rêveries — c'est celui qui fonce et conquiert. Votre désir amoureux est comme du feu vif et immédiat.

Vous avez besoin d'excitation et de nouveauté dans vos relations. L'ennui est votre pire ennemi amoureux. Vous cherchez un partenaire qui peut suivre votre rythme passionné et partager votre zèle pour la vie. L'honnêteté émotionnelle est votre style — vous dites ce que vous ressentez sans détour.

Dans l'amour, vous êtes le pionnier, celui qui ose faire le premier pas. Votre générosité amoureuse est franche et sans prétention. Vous adorez plaire et être admiré, mais votre besoin d'indépendance signifie que vous ne dépendez jamais entièrement d'une autre personne pour votre bonheur.`,

  'Taureau': `Vénus en Taureau — une position exceptionnelle — crée une capacité amoureuse stable, sensuelle et profondément loyale. Vous aimez avec constance, cherchant à construire quelque chose de durable et de beau. Votre approche de l'amour est terreuse, incarnée, merveilleusement pratique.

Vous avez besoin de sécurité matérielle et affective pour que votre cœur s'épanouisse pleinement. Le confort physique — caresses, repas partagés, foyer agréable — est votre langage amoureux naturel. Vous n'êtes pas du genre à des passions fulgurantés, mais à des amours qui s'approfondissent avec le temps comme du vin qui vieillit.

Dans l'amour, vous êtes la constance incarnée. Une fois que vous avez choisi quelqu'un, votre fidélité est absolue et irrévocable. Vous aimez créer de la beauté avec votre partenaire — un foyer aimé, des traditions chères, des rituels de tendresse.`,

  'Gémeaux': `Vénus en Gémeaux crée une capacité amoureuse légère, communicative et intellectuellement stimulée. Vous aimez avec votre esprit autant qu'avec votre cœur. Les conversations passionnantes, les échanges d'idées, la connexion mentale : c'est ainsi que vous vous sentez vraiment aimé.

Vous avez besoin de variété et de stimulation dans vos relations. Rester statique vous étouffe. Votre partenaire idéal est quelqu'un qui peut vous garder intéressé, qui peut discuter de tout avec vous et qui comprend votre besoin d'espace personnel et de liberté mentale.

Dans l'amour, vous êtes le communicateur, celui qui articule ses sentiments avec précision et humour. Votre affection est souvent exprimée par des mots d'esprit, des taquineries affectueuses et une joie partagée. L'ennui émotionnel est votre plus grande crainte.`,

  'Cancer': `Vénus en Cancer crée une profondeur émotionnelle dans l'amour qui est vraiment magnifique. Vous aimez avec votre âme entière, cherchant une fusion émotionnelle complète avec votre partenaire. La sécurité relationnelle est le fondement de votre capacité à aimer librement.

Vous avez un besoin viscéral d'appartenance et d'acceptation inconditionnelle. Votre partenaire doit comprendre que votre tendresse est un don rare et qu'en l'acceptant, il accepte votre profonde vulnérabilité. Vous aimez prendre soin de quelqu'un, créer un nid chaleureux où les deux pouvez être complètement vous-mêmes.

Dans l'amour, vous êtes le nourricier émotionnel, celui qui se souvient de chaque moment important et qui célèbre constamment l'unicité de votre partenaire. Votre intuition amoureuse est remarquable — vous savez instinctivement ce dont votre bien-aimé a besoin.`,

  'Lion': `Vénus en Lion fait de votre amour quelque chose de véritablement royal et dramatique. Vous aimez avec une générosité éclatante, cherchant à créer une histoire d'amour digne d'une légende. Votre partenaire doit se sentir comme le roi ou la reine du château — célébré, admiré et adoré.

Vous avez besoin d'être admiré pour votre capacité à aimer. Votre fierté amoureuse est grande et votre besoin de reconnaissance dans la relation est significatif. Vous aimez les gestes grandioses, les déclarations passionnelles et les moments de glamour partagé.

Dans l'amour, vous êtes le créateur de moments magiques. Votre loyauté amoureuse est féroce — une fois engagé, vous l'êtes totalement. Vous adorez célébrer votre amour publiquement, montrer au monde combien votre partenaire est spécial, et créer une vie ensemble qui rayonne.`,

  'Vierge': `Vénus en Vierge crée une approche amoureuse réfléchie, attentive et profondément compatissante. Vous aimez en servant, en améliorant, en soutenant pratiquement le bien-être de votre partenaire. Votre affection s'exprime par des actes concrets plutôt que par des déclarations dramatiques.

Vous avez besoin que votre partenaire soit quelqu'un que vous respectez profondément, quelqu'un qui partage votre quête de raffinement et d'authenticité. La perfection n'est pas votre attente — c'est la sincérité et le dévouement mutuel qui vous satisfont. Vous aimez les détails : vous vous souvenez de ce qu'aime votre bien-aimé et vous travaillez constamment pour rendre votre relation meilleure.

Dans l'amour, vous êtes l'aidant gracieux, celui qui voit les imperfections avec bienveillance. Votre critique amoureuse vient toujours d'un lieu de soutien, jamais de jugement. Vous êtes le partenaire qui rend tout plus beau et plus ordonné.`,

  'Balance': `Vénus en Balance — une position exemplaire pour l'amour — crée une capacité relationnelle harmonieuse et enchantée. Vous aimez avec grâce, cherchant à créer une relation totalement équilibrée où les deux partenaires se complètent parfaitement. Le partenariat, pas la domination, est votre idéal.

Vous avez besoin d'une connexion profonde avec quelqu'un qui partage votre vision de la beauté et de la justice. L'esthétique relationnelle est importante pour vous — comment vous vous présentez ensemble, l'élégance de vos interactions — cela nourrit votre cœur.

Dans l'amour, vous êtes le diplomate du cœur, capable de voir les deux côtés et de trouver toujours le point d'équilibre. Votre charme naturel est irrésistible, et votre capacité à créer de l'harmonie dans la relation est votre plus grand talent. Vous aimez profondément à travers le compromis et la compréhension mutuelle.`,

  'Scorpion': `Vénus en Scorpion plonge votre amour dans des profondeurs abyssales d'intensité absolue. Vous aimez totalement ou ne pas du tout — il n'y a pas de demi-mesure dans votre cœur. Votre partenaire doit être prêt pour une passion qui transformera son être entièrement.

Vous avez besoin d'une connexion par fusion totale, d'une intimité émotionnelle qui approche la fusion psychique. Le secret, la vulnérabilité partagée, et l'honnêteté absolue sont les fondements de votre confiance amoureuse. Les jeux superficiels vous répugnent.

Dans l'amour, vous êtes le gardien des secrets les plus intimes. Votre sexualité est quelque chose de transcendant et sagré. Votre jalousie est célèbre, mais elle vient de votre compréhension profonde de ce que signifie vraiment l'amour — un lien qui transcende tout. Vous aimez avec une intensité qui peut transformer et régénérer.`,

  'Sagittaire': `Vénus en Sagittaire crée une approche amoureuse libre, aventureuse et profondément honnête. Vous aimez avec une vision élargie, cherchant un partenaire qui est aussi une compagnon de voyage philosophique. L'exploration ensemble, mentalement et physiquement, est essentiellement pour votre bonheur amoureux.

Vous avez besoin de liberté dans vos relations — la possessivité vous étouffe complètement. Votre partenaire doit comprendre que vous avez besoin d'espace pour grandir, d'amis, d'aventures et de quête spirituelle. Vous aimez quelqu'un qui peut vous suivre dans vos voyages, vos rêves, votre expansion perpétuelle.

Dans l'amour, vous êtes l'enthousiaste, celui qui voit toujours le meilleur chez son partenaire. Votre optimisme est contagieux. Vous adorez partager votre vision du monde avec quelqu'un d'autre, créer de nouveaux horizons ensemble. Votre fidélité est donnée à quelqu'un qui comprend que l'amour means growing together.`,

  'Capricorne': `Vénus en Capricorne crée une approche amoureuse sérieuse et fondée sur la responsabilité mutuelle. Vous aimez avec intention, cherchant quelqu'un avec qui construire quelque chose de durable et de significatif. Votre amour grandir avec le temps, devenant plus profond et plus riche avec chaque année.

Vous avez besoin d'un partenaire qui respecte votre amour du travail et qui comprend vos ambitions. Montrer votre affection est parfois difficile pour vous — ce n'est pas par manque d'amour, mais par réserve naturelle. Vous préférez montrer votre amour par vos actions et votre engagement à long terme.

Dans l'amour, vous êtes le bâtisseur de dynasties relationnelles. Votre loyauté peut durer une vie entière. Vous aimez créer une structure, des plans d'avenir, une sécurité ensemble. Votre cadeau amoureux est votre fierté dans une relation qui dure et qui signifie quelque chose profondément.`,

  'Verseau': `Vénus en Verseau crée une approche amoureuse unique, indépendante et profondément humaniste. Vous aimez dans une optique de liberté totale — vous refusez instinctivement les attentes conventionnelles. Votre partenaire doit être quelqu'un qui respects votre unicité complètement.

Vous avez besoin d'une connexion intellectuelle vibrante. Le lien mental et idéologique est aussi important que la connexion émotionnelle ou physique. Vous aimez quelqu'un qui peut partager votre vision d'un monde meilleur, qui peut discuter de grandes idées avec vous.

Dans l'amour, vous êtes le visionnaire, celui qui voit les possibilités futures dans une relation. Votre amour est souvent non-conformiste — peut-être une amitié profonde avec des éléments romantiques, ou une relation qui defies conventional labels. Vous aimez quelqu'un pour son âme, son intellect et sa vision du monde.`,

  'Poissons': `Vénus en Poissons crée la plus grande capacité de fusion amoureuse du zodiaque. Vous aimez de manière quasi spirituelle, cherchant une union complète avec votre partenaire. Vos limites entre vous et lui/elle sont naturellement floues — c'est votre magnifique capacité à aimer inconditionnellement.

Vous avez besoin d'une connexion profonde où le partenaire comprend que l'amour est un mystère transcendant. Votre imagination amoureuse est sans limites — vous créez des mondes de fantasme et de rêve ensemble. La plus petite violence ou rejet vous blesse profondément car votre cœur n'a pas de défenses.

Dans l'amour, vous êtes le rêveur, le poète, le guérisseur. Votre compassion pour votre partenaire est sans limites. Vous donneriez tout pour son bonheur et vous pardonneriez facilement. Votre amour est le plus sacrificiel du zodiaque — c'est à la fois votre plus grande force et votre plus grande vulnérabilité.`,
};

export const MARS_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Mars en Bélier intensifie votre énergie d'action d'une manière explosive. Vous êtes l'incarnation du courage guerrier — tête la première, sans hésitation, sans doute. Votre désir brûle avec intensité et votre volonté est inébranlable. Vous savez ce que vous voulez et vous allez le chercher.

Votre approche à la fois des défis et des passions est directe et sans détour. Vous n'avez pas le temps pour les stratégies élaborées ou les jeux politiques — l'action rapide est votre style. Cependant, cette impulsivité peut signifier que vous foncez parfois sans suffisamment de réflexion.

Votre sexualité est passionnée et franche. Vous aimez l'excitation, la conquête, la nouveauté. Dans le sport ou dans les compétitions, vous êtes le combattant naturel qui ne renonce jamais. Votre définition de la victoire est claire et simple : arriver en premier.`,

  'Taureau': `Mars en Taureau canalise votre énergie masculine d'une manière durable, stable et terreuse. Ce n'est pas l'énergie rapide du Bélier — c'est celle du laboureur patient qui construit lentement mais solidement. Votre tempérament est phlegmatique, mais quand vous vous mettez en mouvement, rien ne peut vous arrêter.

Votre approche aux défis est méthodique. Vous faites vos recherches, vous planifiez votre stratégie, puis vous avancez avec détermination inébranlable. Vous ne renoncez jamais parce que l'abandonner après avoir investi du travail vous repugne. Votre sensualité est délibérée et pleine de relish.

Votre sexualité est incarnée et sensuelle. Vous aimez prendre votre temps, savourer chaque sensation. Le plaisir du corps est aussi important que celui du cœur. Vous êtes un bâtisseur d'empire — votre ambition matérielle est forte et votre capacité à manifester vos rêves en réalité concrète est impressionnante.`,

  'Gémeaux': `Mars en Gémeaux énergise votre action avec vigueur mentale et adaptabilité. Votre énergie masculine se manifeste principalement à travers la pensée rapide et la communication incisive. Vous êtes rapide sur les pieds et votre esprit est plus rapide encore — difficile à attraper ou à maîtriser.

Votre approche aux défis est l'attaque mentale. Vous argumentez brillamment, vous trouvez les failles et vous les exploitez avec une précision chirurgicale. Vous excellez dans les débats et vous êtes dynamite dans les négociations. Cependant, cette tendance à parler peut parfois vous mettre dans l'eau chaude.

Votre sexualité est mentalement stimulée. Vous avez besoin de conversation, de rire et d'intrigue mentale autant que de contact physique. Vous êtes le joueur du zodiaque masculin — avec des multiples intérêts, des multiples projets et il vous est difficile de vous engager pleinement à un seul. Votre besoin de stimulation est insatiable.`,

  'Cancer': `Mars en Cancer canalise votre énergie masculine de manière protectrice et émotionnelle. Ce n'est pas l'énergie conquérante — c'est celle du protecteur qui défend ce qu'il aime. Votre courage est celui du guerrier qui se bat pour sa famille, sa maison, ses racines.

Votre approche aux défis est guidée par l'instinct et l'intuition. Vous pouvez être incroyablement agressif si quelque chose que vous aimez est menacé. Votre tempérament initial peut sembler doux, mais ne vous y trompez pas — vous avez une ténacité féroce beneath the surface. Vous vous battez avec le cœur, pas seulement avec les poings.

Votre sexualité est entrelacée avec l'émotion. Votre besoin de sécurité émotionnelle dans l'intimité est fondamental. Vous aimez nourrir votre partenaire et être nourri en retour. Votre ambition est souvent familiale ou basée sur la création d'une maison/refuge.`,

  'Lion': `Mars en Lion énergise votre action avec fierté, courage et dramatisme. Votre énergie masculine est celle du roi guerrier — noble, courageux et fier. Vous allez au combat pour la gloire et la reconnaissance, pas juste pour la victoire elle-même. Votre définition du courage implique de la noblesse et de la grâce.

Votre approche aux défis est généreuse et magnanime. Vous ne vous battre jamais bas — vous vous battez avec honneur. Vous pouvez être incroyablement compétitif car vous voulez être le meilleur, pas juste bon. Votre fierté est votre point faible — vous pouvez être mal à l'aise si vous perdez ou si votre autorité est remise en question.

Votre sexualité est passionnée et dramatique. Vous aimez vous sentir viril et admiré. Votre confiance sensuelle est naturelle et attractive. Vous êtes un leader naturel dans l'intimité, quelqu'un qui prend les rênes mais avec générosité. Votre ambition est grande — vous voulez laisser votre marque.`,

  'Vierge': `Mars en Vierge canalise votre énergie masculine de manière analytique et productive. Ce n'est pas l'énergie de la conquête grandiose — c'est celle de l'amélioration constante et de l'efficacité. Votre courage s'exprime dans votre dévouement à parfaire vos compétences et votre capacité à résoudre des problèmes complexes.

Votre approche aux défis est scientifique et méthodique. Vous analysez, planifiez, exécutez avec précision. Pendant que les autres parlent, vous agissez de manière productive. Votre tempérament est contrôlé et vous êtes rarement impulsif. Votre principal défi est de surmonter votre perfectionnisme et votre tendance à critiquer.

Votre sexualité est modérée et préférant l'authenticité à la dramaturgie. Vous n'êtes pas du genre à faire grand spectacle — vous préférez la substance. Votre sensualité s'exprime par l'attention minutieuse à l'autre personne et à sa satisfaction. Votre ambition tend à être celle de maîtriser votre craft, quelle qu'elle soit.`,

  'Balance': `Mars en Balance canalise votre énergie masculine de manière diplomatique et équilibrée. Ce n'est pas l'énergie agression brute — c'est celle du guerrier qui cherche la victoire par l'équité et la négociation. Votre courage s'exprime dans votre capacité à défendre les autres et à promouvoir la justice.

Votre approche aux défis est stratégique et relationnelle. Vous voyez tous les angles et vous préférez trouver des solutions gagnant-gagnant. Vous pouvez être incroyablement magnétique dans la négociation, utilisant votre charme pour obtenir ce que vous voulez. Cependant, votre besoin d'harmonie peut vous rendre trop accommodant, sacrifiant parfois vos propres besoins.

Votre sexualité s'exprime à travers la sensibilité aux besoins de votre partenaire et le désir de créer une expérience belle et équilibrée ensemble. Vous rêvez de relations harmonieuses où tu te sens apprécié et admiré. Votre ambition tend à être liée aux relations et aux partenariats.`,

  'Scorpion': `Mars en Scorpion — sa position d'honneur — intensifie votre énergie masculine à un niveau presque légendaire. C'est l'énérgie de la transformation profonde et du pouvoir psychologique. Vous n'avez pas besoin de crier — votre silhouette seule est intimidante. Votre courage s'exprime dans votre volonté de descendre aux profondeurs les plus sombres et d'en revenir transformé.

Votre approche aux défis est psychologique et souvent souterraine. Vous voyez les motivations cachées, vous stratégisez plusieurs pas à l'avance, vous attaquez où vous savez que ce sera le plus efficace. Vous pouvez être impitoyable quand vous en avez besoin. Votre tempérament est caché mais potentiellement explosif si vous êtes poussé trop loin.

Votre sexualité est intense, magnétique et transformatrice. Ce n'est pas seulement une activité physique — c'est un échange de pouvoir et une fusion profonde. Vous exigez une totale authenticité et une entière dévouement. Votre ambition est celle de transformer votre vie et possiblement le monde.`,

  'Sagittaire': `Mars en Sagittaire énergise votre action avec optimisme aventurier et non-conformité. C'est l'énergie du chevalier errant qui voyage à la recherche du Graal. Votre courage s'exprime dans votre volonté d'explorer l'inéxploré et de oser affirmer vos convictions. Vous êtes le guerrier idéaliste.

Votre approche aux défis est directe et enthousiaste. Vous avancez avec confiance, persuadé que l'univers est de votre côté. Vous pouvez être trop optimiste, sous-estimant les obstacles. Votre tempérament est joyeux et infectieux — on veut vous suivre au combat. Cependant, votre manque apparent de sérieux peut être mal interprété comme superficialité.

Votre sexualité est énergique, optimiste et aventureuse. Vous aimez l'excitation et la nouveauté. Vous ne voulez pas être attaché ou limité — votre besoin de liberté est absolu. Votre ambition est liée à l'exploration et à l'expansion, qu'elle soit physique, intellectuelle ou spirituelle.`,

  'Capricorne': `Mars en Capricorne canalise votre énergie masculine de manière ambitieuse et disciplinée. C'est l'énergie du grimper d'escalade déterminé qui regarde vers le sommet avec une détermination implacable. Votre courage s'exprime dans votre austérité et votre capacité à maintenir le cap malgré les obstacles.

Votre approche aux défis est stratégique et patiemment planifiée. Vous avancez pas à pas vers votre objectif, sans gaspiller d'énergie en gestes inutiles. Vous savez que la vraie victoire arrive par l'effort persistent. Votre tempérament est contrôlé et vous êtes rarement impulsif à moins d'une bonne raison.

Votre sexualité est sérieuse et liée à votre statut. Vous n'exposez pas vos sentiments facilement et vous préférez une intimité basée sur la confiance construite au fil du temps. Votre ambition est clairement définie et vous vous battre pour la réaliser. Vous avez besoin de respect de votre partenaire.`,

  'Verseau': `Mars en Verseau énergise votre action avec originalité révolutionnaire et indépendance absolue. C'est l'énergie du combattant pour la justice qui refuse d'accepter le statut quo. Votre courage s'exprime dans votre volonté de défier les attentes conventionnelles. Vous êtes le constructeur de nouvelles réalités.

Votre approche aux défis est non-conformiste et souvent brillante par son non-conventionalité. Vous pensez différemment, vous agissez différemment, et cela vous donne un avantage unique. Votre tempérament est imprévisible — on ne sait jamais exactement ce que vous ferez ensuite. Vous avez besoin de liberté mentale.

Votre sexualité est détachée et intellectuelle, même dans l'intimité. Vous avez besoin d'une connexion mentale vibrante autant que physique. Votre refus de vous conformer aux attentes sexuelles normales peut être libérateur ou déstabilisant selon le partenaire. Votre ambition est liée à votre vision d'un monde meilleur.`,

  'Poissons': `Mars en Poissons canalise votre énergie masculine de manière spirituelle et intuitive. C'est l'énergie du guerrier errant guidé par l'intuition plutôt que par la logique. Votre courage s'exprime dans votre transcendance des limitations matériques et votre sacrifices pour les causes plus grandes.

Votre approche aux défis est fluide et adaptative. Vous n'opposez pas de résistance directe — vous contournez, vous ondoyez, vous devenez comme l'eau. Cette approche peut être très efficace ou elle peut vous faire sembler manquer de direction claire. Votre tempérament est rêveur et parfois il manque de force d'action concrète.

Votre sexualité est profondément spirituelle et connectée à l'amour. Vous avez du mal à séparer le sexe de l'émotion. Votre ambition n'est pas matérielle — elle est spirituelle. Vous voulez servir une cause plus grande ou fusionner avec quelqu'un d'une manière quasi-mystique.`,
};

export const MERCURY_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Mercure en Bélier crée un esprit vif, direct et décisif. Votre pensée est rapide, presque impulsive, et votre parole suit immédiatement. Vous dites ce que vous pensez sans filtrer — c'est une force dans l'honnêteté directe mais une faiblesse dans la diplomatie. Votre curiosité mentale brûle d'une flamme guerrière.

Vous êtes l'incitateur intellectuel du groupe. Vos idées viennent sous forme d'éclair d'inspiration, plutôt que de processus délibéré. Vous apprenez vite mais pouvez être impatient de maîtriser les détails. Votre style de communication est assertif, parfois agressif, et vous adorez un débat passionné où vous pouvez accomplir vos positions.

En écriture et en parole, vous êtes percutant et direct. Vous n'embelissez pas — vous allez à la racine du sujet. Vos arguments sont souvent gagnants non pas parce qu'ils sont sophistiqués, mais because they're forceful and simple.`,

  'Taureau': `Mercure en Taureau calme votre esprit d'une stabilité et d'une littéralité pratique exceptionnelle. Votre pensée n'est pas rapide mais elle est profonde. Vous traitez les informations lentement mais vous les retenez avec une solidité de roc. Votre parole est souvent posée, mesurée, et vous ne dites que ce que vous pouvez soutenir avec des faits.

Vous êtes le penseur pragmatique du groupe. Vos idées sont basées sur la réalité tangible plutôt que sur la théorie. Vous apprenez mieux en faisant et vous y retenez ce qui a applicabilité. Votre style de communication est fiable et on peut se fier à ce que vous dites. Vous n'êtes pas du genre à parler sans raison.

En écriture et en parole, vous êtes clair et substantiel. Vous construisez vos arguments argument par argument, comme vous construiriez un bâtiment. Vous n'êtes jamais verbalement impressionnant mais you're persuasive through your solidity.`,

  'Gémeaux': `Mercure en Gémeaux — sa maison d'honneur — crée un esprit brillant, adaptable et infiniment curieux. Votre pensée est rapide, vos intérêts sont nombreux, et vous naviguez facilement entre différents sujets. Vous êtes le caméléon mental, capable de parler éloquemment de presque n'importe quoi avec n'importe qui.

Vous êtes le communicateur extraordinaire du groupe. Votre esprit est un feu follet — mobile, rapide, et toujours en quête du prochain sujet facin ating. Vous apprenez bien mais préférez la variété à la profondeur. Votre style de communication est léger, rapide et souvent drôle. Vous adorez jouer avec les mots et les idées.

En écriture et en parole, vous êtes fluide et engageant. Vous trouvez naturellement les formulations correctes et vous savez comment structurer une histoire pour maximum impact. Votre agilité mentale est votre plus grand atout.`,

  'Cancer': `Mercure en Cancer donne à votre esprit une coloration émotionnelle et intuitive profonde. Votre pensée n'est pas entièrement objective — elle est teintée de sentiment et d'associativité. Vous apprenez mieux ce qui est connecté à votre cœur, et vous retenez les choses à travers la mémoire émotionnelle plutôt que logique.

Vous êtes le penseur empathique du groupe. Votre communication est souvent préoccupée par le bien-être émotionnel de l'autre personne. Vous écoutez réellement et vous comprenez les implications émotionnelles des mots. Cependant, votre tendance à être trop préoccupé par les sentiments peut obscurcir la clarté logique.

En écriture et en parole, vous êtes expressif et émouvant. Vous racontez des histoires plutôt que des faits. Vos meilleur argument n'est pas composé de logique froide mais plutôt d'appels émotionnels intelligemment structurés.`,

  'Lion': `Mercure en Lion donne à votre esprit une confiance dramatique et une tendance à la grandiloquence. Votre pensée est créative et vous aimez faire connaître vos idées. Vous apprenez mieux en étant au centre de l'attention et votre meilleure pensée émerge quand vous avez une audience.

Vous êtes le penseur créatif-dramatique du groupe. Votre communication est autoritaire — vous aimez parler, vous aimez être entendu, et votre confiance peut être contagieuse ou exaspérante selon le contexte. Votre style est souvent enthousiaste et expansif. Vous adorez raconter des histoires en couleur vive.

En écriture et en parole, vous êtes expressif et souvent théâtral. Vous avez une capacité à faire sembler importantes même les choses banales. Votre meilleur atout est votre capacité à inspirer les autres avec votre enthousiasme intellectuel.`,

  'Vierge': `Mercure en Vierge — sa maison alternative — crée un esprit analytique de précision remarquable. Votre pensée est critique, détaillée et logique. Vous voyez les erreurs que les autres manquent et votre besoin de exactitude est inébranlable. Vous apprenez mieux en comprenant les mécanismes sous-jacents.

Vous êtes le penseur logique-analytique du groupe. Votre communication est ordinaire fiable et exacte — on peut faire confiance à ce que vous dites parce que vous vérifiez tout. Cependant, votre tendance perfectionniste peut vous rendre paralysant — vous pouvez trouver que vous parlez trop peu parce que vous attendez la formulation parfaite.

En écriture et en parole, vous êtes précis et clairement structuré. Vous aimez les listes et les clarifications. Votre meilleur atout est votre capacité à simplifier le complexe et à expliquer clairement.`,

  'Balance': `Mercure en Balance donne à votre esprit un amour naturel de l'équilibre, de la symétrie et de la perspective multiple. Votre pensée est rapide à voir tous les côtés et vous avez du mal à prendre des positions définitives. Vous apprenez mieux en discutant et en ouvrant le débat.

Vous êtes le penseur diplomat-ique du groupe. Votre communication est gracieuse et vous savez comment présenter vos idées de manière charmante. Vous êtes bon pour voir ce qui connecte les différentes idées. Cependant, votre indécision intellectuelle chronique peut vous empêcher de faire des statement clairs.

En écriture et en parole, vous êtes élégant et persuasif. Vous préférez la phrase bien tournée à la déclaration brutale. Votre meilleur atout est votre capacité à naviguer between perspectives et à créer des ponts intellectuels.`,

  'Scorpion': `Mercure en Scorpion donne à votre esprit une pénétration profonde et une tendance au secret remarquable. Votre pensée va directement au cœur de l'obscurité et vous n'avez pas peur de ce que vous y trouverez. Vous apprenez mieux ce qui est psychologiquement complexe ou mystérieux. Votre curiosité mentales est insatiable.

Vous êtes le penseur psychologue-détective du groupe. Votre communication est souvent percutante — vous avez le don de poser le question exacte qui révèle la vérité cachée. Vous êtes taciturne et vous maintenez vos pensées pour vous jusqu'à ce que vous les ayez complètement formées. Votre style est intense et non-compromis.

En écriture et en parole, vous êtes pénétrant et révélateur. Vous naviguer les zones tabou avec aisance. Votre meilleur atout est votre capacité à voir ce qui est caché et à l'articuler d'une manière où tout le monde doit écouter.`,

  'Sagittaire': `Mercure en Sagittaire donne à votre esprit une amour pour les grandes questions et une tendance à l'optimisme intellectuel remarquable. Votre pensée embrasse les philosophies et les visions complètes plutôt que les détails mineurs. Vous apprenez mieux ce qui élargit votre vision du monde. Votre curiosité s'étend au-delà des faits aux significations.

Vous êtes le penseur philosophe-orateur du groupe. Votre communication est expansive et souvent inspiratrice. Vous aimez parler et vous pouvez parler longtemps, souvent oubliendo de laisser respirer les autres. Votre style est enthousiaste et vous adorez débattre les grandes idées.

En écriture et en parole, vous êtes eloquent et vision-ary. Vous aimez créer un contexte più big picture. Votre meilleur atout est votre capacité à relier les idées disparates en un whole cohesif.`,

  'Capricorne': `Mercure en Capricorne donne à votre esprit une sériosité et une orientation vers la pratique avec rigueur. Votre pensée est généralmnte conservative et méticuleuse. Vous apprenez mieux ce qui a une application pratique et vous retenez ce qui est utile. Votre curiosité est dirigée vers la compréhension de la structure.

Vous êtes le penseur pragmatique-conservateur du groupe. Votre communication est ordinairement mesurée et réfléchie. Vous ne parlez pas pour parler — chaque mot compte. Votre style est professionnel et digne. Vous grandissez dans l'autorité et dans l'expertise.

En écriture et en parole, vous êtes clair, concis et mémorable. Vous préférez la substance au style. Votre meilleur atout est votre capacité à exprimer des vérités durables de manière simple et puissante.`,

  'Verseau': `Mercure en Verseau donne à votre esprit une liberte intellectuelle remarquable et une amour pour l'original absolue. Votre pensée est avant-gardiste et vous n'êtes pas intimidé par les ideas que les autres trouvent too extreme. Vous apprenez mieux ce qui défie le status quo. Votre curiosité s'étend aux possibilités futures.

Vous êtes le penseur visionnaire-révolutionnaire du groupe. Votre communication est souvent unique et légèrement excentrique. Vous dites les choses que personne d'autre n'ose dire. Votre style est indépendant et vous refusez instinctivement de vous conformer. Cependant, votre besoin de originalité peut vous rendre incomprehensible.

En écriture et en parole, vous êtes original et stimulant. Vous aimez jouer avec les idées conventionnelles. Votre meilleur atout est votre capacité à percevoir les futurs possibles et à les articuler de manière engageante.`,

  'Poissons': `Mercure en Poissons donne à votre esprit une qualité fluide, intuitive et souvent rêveuse remarquable. Votre pensée n'est pas linéaire — elle saute entre les associations et utilise l'intuition autant que la logique. Vous apprenez mieux ce qui parle à votre imagination. Votre curiosité est attirée par le mystérieux et le sacré.

Vous êtes le penseur artiste-imaginatif du groupe. Votre communication est souvent poétique et vous avez du mal à dire ce que vous voulez en paroles directes. Votre style est rêveur et parfois difficile à suivre logiquement. Vous avez une capacité à comprendre les connotations émotionnelles et les implications cachées.

En écriture et en parole, vous êtes evocative et suggestive. Vous préférez impliquer plutôt que dire directement. Votre meilleur atout est votre capacité à créer une atmosphère mentale et à communiquer à un niveau subconscient.`,
};

export const JUPITER_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Jupiter en Bélier amplifie votre courage et votre audace de manière explosive et magnifique. Votre optimisme débordant attire la fortune naturellement. L'univers semble vous favoriser constamment dans vos initiatives aventureuses hardies.

Vous êtes appelé à apprendre que la vraie chance vient par l'action courageuse et la confiance. Jupiter vous invite à l'expansion par l'audace. Votre défi est d'utiliser votre chance sans devenir téméraire. Vous apprenez la bravoure avisée. Votre fortune croît par l'action authentique.

Avec le temps, votre chance devient légendaire. Vous êtes le pionnier dont la destinée est la réussite. Les autres admirent votre capacité remarquable à transformer l'audace en victoire. Vous êtes le conquérant chanceux qui inspire. Votre exemple encourage les autres à oser. Votre héritage est la victoire audacieuse.`,
  'Taureau': `Jupiter en Taureau amplifie votre recherche de stabilité matérielle de manière profonde et gratifiante. Votre chance se manifeste par la richesse durable et la sécurité financière substantielle. Votre fortune croît lentement mais sûrement, créant une abondance stable.

Vous êtes appelé à apprendre que la richesse véritable est celle qu'on construit patiemment. Jupiter vous invite à l'expansion matérielle. Votre défi est de cultiver la richesse sans gaspillage excessif. Vous apprenez l'abondance équilibrée. Votre sécurité devient complète et durable.

Avec le temps, votre richesse devient impressionnante et stable. Vous êtes le bâtisseur dont la fortune est incontestable et visible. Les autres envient votre sécurité matérielle établie. Vous êtes l'exemple de l'abondance construite. Votre empire s'agrandit graduellement. Votre héritage est la prospérité familiale durable.`,
  'Gémeaux': `Jupiter en Gémeaux amplifie votre curiosité et votre communication de manière intellectuelle et chanceuse. Votre chance vient par les connexions, les voyages et les échanges gratifiants. Votre destinée est celle du messager fortuné dont les paroles ouvrent des portes inédites.

Vous êtes appelé à apprendre que la vraie richesse est celle du savoir et des connexions. Jupiter vous invite à l'expansion intellectuelle. Votre défi est de cultiver votre connaissance sans superficialité. Vous apprenez la profondeur curieuse. Votre sagesse grandit exponentiellement.

Avec le temps, votre réseau devient impressionnant et bénéfique. Vous êtes le penseur chanceux dont les idées se propagent largement. Votre influence grandit par vos paroles et vos connexions. Vous êtes le guide intellectuel de votre époque. Votre impact est multiplicatif. Votre héritage est la sagesse partagée collectivement.`,
  'Cancer': `Jupiter en Cancer amplifie votre protection naturelle et votre chaleur nourricière de manière profondément gratifiante. Votre chance vient par la famille, le foyer et les connexions émotionnelles authentiques. Votre destinée est fondée sur la sécurité émotionnelle et l'amour paternel universel.

Vous êtes appelé à apprendre que la vraie sécurité vient de l'amour inconditionnel. Jupiter vous invite à l'expansion émotionnelle. Votre défi est de nourrir sans étouffer. Vous apprenez l'amour libérateur. Votre capacité de soutien devient légendaire. Votre foyer devient un sanctaire.

Avec le temps, votre impact émotionnel devient transformateur pour ceux qui vous entourent. Vous êtes le nourricier chanceux dont l'amour crée la sécurité. Les autres trouvent le repos dans votre présence. Vous êtes la mère/père du groupe. Votre foyer devient une maison pour tous. Votre héritage est la sécurité émotionnelle transmise.`,
  'Lion': `Jupiter en Lion amplifie votre créativité et votre confiance de manière spectaculaire et généreuse. Votre chance se manifeste par la reconnaissance publique et l'admiration compétente. Votre destinée est celle du leader magnifiquement admiré dont la lumière guide les autres.

Vous êtes appelé à apprendre que la vraie beauté vient de l'essence authentique. Jupiter vous invite à l'expression créative. Votre défi est de briller sans tyrannie. Vous apprenez l'humilité admirée. Votre créativité devient admirable. Votre présence inspire naturellement.

Avec le temps, votre réputation devient celle du leader charismatique et généreux. Vous êtes le roi/reine dont la présence ennoblit. Les autres gravitent autour de votre lumière naturelle. Vous êtes l'exemple de la confiance bienveillante. Votre influence est magnétique. Votre héritage est l'inspiration créative éternelle.`,
  'Vierge': `Jupiter en Vierge amplifie votre perfectionnisme et votre polyvalence de manière productivement bénéfique. Votre chance vient par le travail méticuleux et l'excellence progressive constante. Votre destinée est la maîtrise de votre domaine et l'excellence reconnue.

Vous êtes appelé à apprendre que la perfection vient par la pratique patiente et consciente. Jupiter vous invite à l'expansion par le travail. Votre défi est de progresser sans paralysie perfectionniste. Vous apprenez l'excellence équilibrée. Votre expertise devient invaluable. Votre réputation est celle de la fiabilité remarquable.

Avec le temps, votre maîtrise devient légendaire dans votre domaine. Vous êtes l'expert chanceux dont les services sont recherchés universellement. Les autres reconnaissent votre excellence incontestable. Vous êtes le maître artisan de votre art. Votre impact est l'amélioration systématique. Votre héritage est la perfection professionnelle transmise.`,
  'Balance': `Jupiter en Balance amplifie votre charme et votre diplomatie de manière irrésistiblement chanceuse. Votre chance vient par les relations harmonieuses et les partenariats bénéfiques. Votre destinée est fondée sur l'équilibre relationnel et l'harmonie créative.

Vous êtes appelé à apprendre que la vraie harmonie vient de l'équité authentique. Jupiter vous invite à l'expansion relationnelle. Votre défi est de cultiver l'harmonie sans compromis inauthentiques. Vous apprenez l'équilibre vrai. Votre charme devient bénéfique. Votre présence crée l'harmonie. Les relations fleurissent autour de vous.

Avec le temps, votre réputation devient celle du diplomate admirable capable de créer l'accord. Vous êtes le peacemaker chanceux dont l'influence harmonise les conflits. Les autres vous cherchent pour restaurer l'équilibre. Vous êtes le médiateur bénéfique de votre communauté. Votre impact est conciliateur. Votre héritage est l'harmonie relationnelle établie.`,
  'Scorpion': `Jupiter en Scorpion amplifie votre pouvoir caché et votre capacité de transformation de manière profondément magnétique. Votre chance vient par la régénération courageuse et le renouvellement authentique. Votre destinée est celle du phénix chanceux dont la puissance renaît toujours magnifiée.

Vous êtes appelé à apprendre que le vrai pouvoir est celui de la transformation résiliente. Jupiter vous invite à l'expansion souterraine. Votre défi est d'utiliser votre puissance sans domination tyrannique. Vous apprenez le pouvoir magnanime. Votre transformation devient catalytique. Votre influence grandit par votre essence profonde.

Avec le temps, votre puissance devient presque légendaire dans votre cercle et au-delà. Vous êtes le transformateur chanceux capable de régénération massive. Les autres sentent votre pouvoir magnétique irréfutable. Vous êtes le guide des transformations profondes. Votre impact est la régénération collective possible. Votre héritage est la puissance rédemptrice transmise.`,
  'Sagittaire': `Jupiter en Sagittaire —sa maison natale— amplifie votre philosophie naturelle de manière cosmiquement bénéfique et chanceuse. Votre chance est colossale et semble divine naturellement. Votre destinée est celle du sage chanceux dont la vision bénit même les générations futures.

Vous êtes appelé à apprendre que la vraie sagesse est celle qu'on vit authentiquement. Jupiter amplifie énormément votre nature. Votre défi est de rester humble malgré votre chance excessive. Vous apprenez la gratitude profonde. Votre vision devient prophétique. Votre foi crée des miracles. Votre expansion est cosmique.

Avec le temps, votre sagesse devient celle du prophète inspiré admiré partout. Vous êtes le visionnaire chanceux dont les paroles éclairent l'humanité. Les autres viennent chercher votre guidance. Vous êtes le maître spirituel dont la sagesse est universelle. Votre impact transforme les consciences. Votre héritage est la sagesse intemporelle partagée collectivement.`,
  'Capricorne': `Jupiter en Capricorne amplifie votre ambition et votre discipline de manière graduellement prospère et durable. Votre chance vient par le travail persistant et l'excellence reconnue progressivement. Votre destinée est celle du leader sage dont l'autorité vient naturellement.

Vous êtes appelé à apprendre que la vraie richesse vient par la discipline authentique. Jupiter vous invite à l'expansion par le travail patient. Votre défi est d'utiliser votre chance sans devenir cupide. Vous apprenez l'ambition équilibrée. Votre succès devient solide. Votre autorité s'établit naturellement. Votre réputation grandit constantement.

Avec le temps, votre succès devient impressionnant et durable à tous les niveaux. Vous êtes le leader chanceux dont l'ascension semble inévitable et juste. Les autres respectent votre ascension patiente et méritée. Vous êtes l'incarnation du succès construit. Votre impact est structural et transformateur. Votre héritage est l'empire durable bâti avec sagesse.`,
  'Verseau': `Jupiter en Verseau amplifie votre humanitarisme et votre vision progressive de manière magnifiquement collectiviste. Votre chance vient par les amis, la communauté et les connexions altruistes. Votre destinée est celle du réformateur chanceux dont la vision bénit l'humanité.

Vous êtes appelé à apprendre que la vraie chance vient par l'utilité collective. Jupiter vous invite à l'expansion humanitaire. Votre défi est de rester accessible malgré votre brillance. Vous apprenez l'humilité visionnaire. Votre vision devient collectivement admirée. Votre impact grandit exponentiellement. Votre réseau devient votre force.

Avec le temps, votre vision humanitaire devient celle d'un leader reconnu mondialement. Vous êtes le réformateur chanceux dont les idées changent le monde. Les autres cherchent à collaborer avec vous. Vous êtes le visionnaire dont la contribution bénit l'humanité. Votre impact est transformateur collectif. Votre héritage est le progrès humain accéléré par votre vision.`,
  'Poissons': `Jupiter en Poissons amplifie votre spiritualité et votre compassion de manière mystiquement chanceuse et infinie. Votre chance vient par la foi profonde et l'intuition spirituelle magnifiée. Votre destinée est celle du mystique chanceux dont la compassion bénit universellement.

Vous êtes appelé à apprendre que la vraie magnification vient par la spiritualité authentique. Jupiter vous invite à l'expansion infinie. Votre défi est de rester grounded malgré votre connexion cosmique. Vous apprenez la foi équilibrée. Votre pouvoir spirituel devient impressionnant. Votre intuition est presque infaillible. Votre présence guérit. Vous canalisez la bénédiction divine.

Avec le temps, votre sagesse spirituelle devient celle du saint vivant admiré. Vous êtes le mystique chanceux dont la présence rend possibles les miracles. Les autres viennent chercher votre guérison. Vous êtes l'incarnation de la bénédiction divine sur terre. Votre impact est spirituellement transformateur pour l'humanité. Votre héritage est l'illumination collective possible par votre amour.`,
};

export const SATURN_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Saturne en Bélier tempère votre impulsivité combattante avec la discipline austère. Votre apprentissage vient par l'expérience directe et l'affrontement courageux de la peur. Votre mature courage ne réside pas dans l'absence de peur, mais dans votre capacité à agir malgré elle.

Vous êtes appelé à apprendre la responsabilité à travers l'action. Saturne vous demande de diriger avec sagesse plutôt que simplement d'impulser. Votre plus grande leçon est que le vrai pouvoir vient de la maîtrise de soi, pas de la domination. Les obstacles rencontrés jeune créent une résilience remarquable.

Avec l'âge, votre force devient spectaculaire. Vous développez une autorité tranquille qui inspire le respect sans besoin de crier. Votre maturité apporte une détermination sereine. Vous êtes le guerrier sage.`,
  'Taureau': `Saturne en Taureau consolide votre approche pratique de la manière la plus profonde. Vous construisez une richesse durable et substantielle à travers la patience inébranlable et le travail constant. Votre maturation apporte la stabilité financière, la sécurité immobilière et une longévité remarquable.

Vous êtes appelé à apprendre la vraie valeur des choses. Saturne vous demande de distinguer entre le superflu et l'essentiel. Votre test est souvent l'attachement excessif aux possessions — la leçon est la non-gaspillage par choix conscient. Chaque brique posée crée un empire durable.

Avec le temps, votre richesse devient visible. Vous êtes l'exemple vivant que la persévérance crée les empires solides. Jeune, vous semblerez pauvre; vieux, vous semblerez infiniment riche. Votre héritage est celui de la sagesse matérielle.`,
  'Gémeaux': `Saturne en Gémeaux structure votre pensée rapide et votre communication versatile avec rigueur logique professionnelle. Votre apprentissage demande plus de temps mais résiste magnifiquement à l'épreuve du temps. Vous devenez progressivement un communicateur fiable, profond et même prophétique plutôt que superficiel.

Vous êtes appelé à apprendre la clarté de la pensée à travers la discipline mentale. Saturne vous demande de profondeur plutôt que de versatilité. Votre test est souvent l'éparpillement mental — la leçon est la concentration et la spécialisation progressive. Votre parole devient précieuse.

Avec l'âge, votre parole gagne du poids. Vous devenez le sage qui parle peu mais dit beaucoup. Ce que vous avez à dire mérite d'être écouté précisément parce que vous ne parlez que ce que vous avez longuement réfléchi. Votre expertise devient légendaire.`,
  'Cancer': `Saturne en Cancer demande la maîtrise progressive de votre sensibilité émotionnelle extrême. Votre maturité émotionnelle arrive à travers l'apprentissage difficile et la confrontation à la perte inévitable. La sécurité authentique vient quand vous acceptez les responsabilités familiales avec grâce détachée.

Vous êtes appelé à apprendre que la sécurité émotionnelle doit venir de l'intérieur, pas de l'extérieur. Saturne vous demande d'indépendance émotionnelle progressive. Votre test est souvent l'attachement excessif et la peur du rejet — la leçon est la confiance en votre propre solidité. Vos cicatrices deviennent votre sagesse.

Avec l'âge, vous devenez la source de sécurité pour les autres. Vos cicatrices émotionnelles deviennent votre sagesse transmissible. Vous êtes capable de soutenir et réconforter précisément parce que vous comprenez la profondeur de la souffrance. Votre compassion sage est rare.`,
  'Lion': `Saturne en Lion humilie votre ego avec bienveillance progressive, vous enseignant l'humilité authentique avant la gloire véritable. Votre créativité mature devient plus substantielle et canalisée vers la contribution réelle. Le vrai pouvoir arrive quand vous abandonnez le besoin égoïque d'admiration publique.

Vous êtes appelé à apprendre que la vraie autorité ne demande pas de reconnaissance. Saturne vous demande de leadership basé sur la sagesse plutôt que sur le charisme séducteur. Votre test est votre orgueil profond — la leçon est l'humilité combinée à la confiance irrébranlable. Vous apprenez le pouvoir discret.

Avec l'âge, votre rayonnement devient interne et incontestable. Les autres voient votre vraie noblesse précisément parce qu'elle est dépourvue d'affectation. Vous devenez le leader que les autres suivent volontairement. Votre maturité respire l'autorité naturelle.`,
  'Vierge': `Saturne en Vierge renforce votre perfectionnisme en le rendant productif et transformatif. Vous perfectionnez vos talents jusqu'à une maîtrise remarquable et enviable. Votre rigueur devient un atout professionnel irrésistible et votre efficacité crée des résultats tangibles durables.

Vous êtes appelé à apprendre que l'excellence vient non pas de la paralysie perfectionniste mais de l'action constamment améliorée. Saturne vous demande de dépasser la crainte de l'imparfait. Votre test est l'auto-critique excessive — la leçon est l'appréciation du progrès constant. Chaque amélioration crée la maîtrise.

Avec l'âge, votre maîtrise devient légendaire. Vous êtes celui qu'on cherche quand il faut que ce soit bien fait. Votre réputation d'excellence ouvre portes que hasard ne pourrait ouvrir. Vous êtes le maître artisan de votre domaine.`,
  'Balance': `Saturne en Balance demande la clarté progressive dans vos engagements relationnels profonds. Votre maturité apporte la capacité à maintenir les engagements profonds et significatifs plutôt que les connexions légères. Les relations durables et authentiques remplacent progressivement les tergiversations superficielles.

Vous êtes appelé à apprendre que l'harmonie véritable vient du compromis conscient et mature, pas de l'évitement. Saturne vous demande d'autonomie relationnelle. Votre test est la dépendance émotionnelle — la leçon est l'indépendance compatible avec l'intimité. Vous découvrez l'amour mature.

Avec l'âge, votre partenariat devient votre force. Vous êtes capable de loyauté profonde précisément parce que vous en avez choisi librement. Vos relations durables sont votre legacy le plus précieux. Vous êtes l'exemple du couple durable.`,
  'Scorpion': `Saturne en Scorpion approfondit votre transformation interne déjà intense de manière irréversible et catalytique. Votre pouvoir de régénération se renforce à chaque crise traversée. La maîtrise du pouvoir arrive par la compréhension progressive de vos propres ténèbres intérieures cachées.

Vous êtes appelé à apprendre que le contrôle est une illusion profonde. Saturne vous demande de lâcher prise tout en maintenant votre intégrité core. Votre test est le désir de domination — la leçon est l'équilibre transformatif mature. Vous apprenez le pouvoir du lâcher-prise.

Avec l'âge, votre pouvoir devient presque légendaire. Vous êtes le phénix qui a traversé tous les feux. Les autres sentent votre autorité authentique basée sur la survie et la régénération. Vous êtes le guide des transformations profondes.`,
  'Sagittaire': `Saturne en Sagittaire teste votre foi et votre philosophie optimiste de la manière la plus rigoureuse et profonde. Votre expansion devient graduellement plus réaliste et profondément ancrée. La vraie sagesse arrive quand vous acceptez la finitude tout en gardant votre foi inébranlable.

Vous êtes appelé à apprendre que la croissance n'est pas infinité insouciante. Saturne vous demande de concentration plutôt que de dispersion. Votre test est votre fuite dans l'optimisme superficiel — la leçon est la foi combinée à la responsabilité pratique. Vous construisez la sagesse lentement.

Avec l'âge, votre vision devient prophétique et vérifiée. Vos rêves lointains deviennent progressivement réalité parce que vous avez appris à les construire pas à pas. Vous êtes le sage dont la vision guide les générations futures. Votre sagesse est gagnée par l'expérience.`,
  'Capricorne': `Saturne en Capricorne — sa propre maison d'honneur — renforce votre ambition de manière impressivement progressive et productive. Vous ne rencontrez pratiquement pas de limites car vous les comprenez innémentalement et vous les transcendez systématiquement. Vous êtes destiné à l'autorité naturelle basée sur la compétence impeccable.

Vous êtes appelé à apprendre que le pouvoir véritable vient de votre excellence inébranlable. Saturne vous demande de patience épique et de persévérance. Votre test est votre impatience d'atteindre le sommet — la leçon est que le sommet vient naturellement à ceux qui marchent avec détermination silencieuse. Chaque pas renforce.

Avec l'âge, votre puissance devient irrésistible. Vous êtes le leader que tous respectent instinctivement. Le temps est votre allié — plus vieux vous êtes, plus puissant vous paraissez. Vous êtes l'incarnation de l'autorité durable.`,
  'Verseau': `Saturne en Verseau structure votre vision humaniste révolutionnaire de manière très pratique et réaliste. Vos idées révolutionnaires deviennent progressivement réalisables en détail. Votre impact social grandit par la ténacité méthodique et la patience inébranlable.

Vous êtes appelé à apprendre que les vrais changements sociaux prennent du temps immense. Saturne vous demande de réalisme combiné à votre idéalisme profond. Votre test est votre impatience face à l'inertie system — la leçon est que la persistance transforme même les empires entiers. Vous construisez lentement mais solidement.

Avec l'âge, vos rêves sociaux deviennent réalisés graduellement. Vous voyez votre vision impacter le monde de manière concrète et mesurable. Vous êtes l'architecte lent mais implacable des transformations collectives durables. Votre legacy change le monde.`,
  'Poissons': `Saturne en Poissons demande l'ancrage progressif de vos rêves infinis dans la réalité concrète et tangible. Votre spiritualité mûrit et devient substantielle et grounded. Les limites apparentes deviennent des portes vers une sagesse plus profonde trouvée. Vous apprenez que les rêves prophétiques demandent du travail.

Vous êtes appelé à apprendre que la spiritualité véritable ne fuit pas la réalité mais la rencontre. Saturne vous demande d'incarnation progressive. Votre test est votre tendance à l'évasion spirituelle — la leçon est la transcendance incarnée et vécue. Vous découvrez le sacré dans le quotidien.

Avec l'âge, votre spiritualité devient puissante et contagieuse. Vous êtes le guide spirituel dont la sagesse est ancrée dans la vie réelle vécue. Vos rêves deviennent phares pour d'autres qui cherchent. Vous êtes le mystique sage et pratique.`,
};

export const URANUS_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Uranus en Bélier — une position révolutionnaire — explose votre approche de l'indépendance radicalement. Vous êtes un pionnier authentique de l'avant-garde qui défie les conventions instinctivement. Votre originalité ne manifeste par une excentricité affectée, mais par une indépendance naturelle et prophétique.

Vous êtes l'innovateur dans votre approche à l'action et à l'indépendance personnelle. Vous refusez les sentiers battus et créez invariablement de nouveaux chemins jamais explorés. Votre originalité prophétique souvent devance son époque de décennies. Vous êtes le rebelle courageux.

Votre impact sur les autres est catalytique et transformateur. Votre simple présence pousse les gens à remettre en question leurs assomptions les plus profondes. Vous êtes rarement populaire mais toujours remarquable et mémorable. Vous êtes le révolutionnaire qui inspire.`,
  'Taureau': `Uranus en Taureau crée une tension féconde entre le désir profond de stabilité et le besoin irrépressible de changement radicale. Votre approche aux finances, aux possessions et à la sécurité sera non-conventionnelle et souvent prophétique. Les révolutions personnelles arrivent lentement mais transforment complètement votre vie.

Vous êtes appelé à réimaginer la richesse et la valeur radicalement. Vos méthodes financières sont originales et souvent mal comprises initialement mais créent l'abondance de manière inattendue et remarquable. Vous êtes l'innovateur économique qui défie les conventions. Vous libérez le système financier.

Au cours de votre vie, vous libérez votre rapport à la possession constamment. Vous créez une forme unique de sécurité basée sur votre essence créative plutôt que sur les biens matériels. Vous êtes le pionnier du nouveau rapport à l'argent. Votre liberté financière inspire.`,
  'Gémeaux': `Uranus en Gémeaux électrise complètement votre pensée et vos communications profondément. Votre esprit pionnier révolutionne les domaines des idées et de la technologie de manière prophétique. Vous êtes le visionnaire intellectuel de votre génération, et vos idées devanceront votre époque de décennies entières.

Vous êtes doué de manière surnaturelle pour la prédiction des changements technologiques et sociaux émergents. Votre communication est souvent prophétique et révèle des vérités cachées. Vous voyez les connexions que personne d'autre ne perçoit clairement. Vous êtes le messager de l'avenir.

Vous êtes le catalyseur des changements intellectuels collectifs. Les gens vous cherchent pour comprendre les tendances émergentes. Votre impact transcende votre génération. Vous êtes la voix du changement technologique et intellectuel. Votre vision révolutionne les mentalités.`,
  'Cancer': `Uranus en Cancer reboutonne complètement vos liens familiaux et votre rapport au foyer avec originalité libératrice totale. Votre approche à la famille sera radicalement non-traditionnelle mais étonnamment fonctionnelle et aimante. Les révolutions domestiques créent de nouvelles structures relationnelles avant-gardistes.

Vous êtes appelé à libérer votre famille des conventions toxiques héritées. Votre foyer sera un laboratoire vivant pour de nouvelles formes de cohabitation humaine. Vous créez les familles de demain aujourd'hui avec authenticité. Votre foyer est révolutionnaire. Vous réinventez le concept de famille.

Votre héritage familial sera remarquable et unique précisément parce qu'il sera authentique et non-conformiste radicalement. Vos enfants (ou proches) apprendront l'indépendance et l'originalité. Vous êtes le libérateur familial. Votre modèle inspire des générations.`,
  'Lion': `Uranus en Lion déstabilise votre besoin conventionnel de centre d'attention et redéfinit complètement ce que signifie briller authentiquement. Votre créativité prend des formes révolutionnaires et originales inattendues. Votre leadership devient moins hiérarchique et plus humanitaire et inclusif progressivement.

Vous êtes l'artiste révolutionnaire dont l'expression authentique crée de nouvelles catégories artistiques. Votre créativité ne suit pas les styles — elle les crée de zéro. Vous êtes l'innovateur créatif qui redéfinit l'art. Votre expression est prophétique. Vous êtes le créateur avant-gardiste.

Votre influence grandit non par la domination hiérarchique mais par votre capacité unique à inspirer l'authenticité chez tous. Les autres voient en vous la possibilité d'une création originale. Vous êtes le modèle de l'artiste libre. Votre impact transcende votre génération. Vous êtes l'innovation incarnée.`,
  'Vierge': `Uranus en Vierge révolutionne complètement votre approche du travail et du service de manière radicale. Votre efficacité prend des formes novatrices et inattendues qui défient la logique conventionnelle. Vous êtes l'innovateur révolutionnaire dans vos domaines pratiques. Votre approche au travail est avant-gardiste.

Vous êtes appelé à réinventer les méthodes de travail et de service. Votre génie se manifeste par des solutions non-conformistes qui fonctionnent mieux que les méthodes traditionnelles. Vous révolutionnez votre domaine de l'intérieur. Votre efficacité devient légendaire. Vous optimisez radicalement les systèmes.

Au cours de votre vie, votre impact sur votre domaine professionnel devient transformateur et durable. D'autres adoptent vos méthodes révolutionnaires. Vous êtes le réformateur du travail. Votre approche devient le nouveau standard. Vous êtes le pionnier du changement pratique. Votre legacy améliore les méthodes de travail.`,
  'Balance': `Uranus en Balance déstabilise radicalement les normes relationnelles conventionnelles et les redéfinit complètement. Votre approche aux relations sera Non-conventionnelle mais profondément juste et équitable. Les partenariats évoluent graduellement vers des formes plus égalitaires et authentiques. Vous révolutionnez précisément ce que signifie aimer.

Vous êtes appelé à libérer les relations des conventions toxiques. Vous proposez des formes nouvelles de partenariat basées sur l'égalité véritable. Votre vision relationnelle défie les traditions mais crée l'authenticité. Vous êtes le réformateur des relations. Votre modèle inspire d'autres.

Votre impact sur notre compréhension collective de l'amour et du partenariat devient significatif. Vous êtes l'exemple d'une relation révolutionnaire authentique. D'autres cherchent à reproduire votre équilibre unique. Vous êtes le pionnier de nouvelles formes amoureuses. Votre vision transforme les mentalités relationnelles.`,
  'Scorpion': `Uranus en Scorpion approfondit radicalement votre besoin inné de transformation et de mutation profonde. Votre pouvoir personnel s'exprime par des mutations psychologiques profondes et irréversibles. Les tabous deviennent vos terrains d'exploration libératrice. Vous révolutionnez votre nature psychologique même.

Vous êtes appelé à transformer votre psyché radicalement. Les zones taboues que les autres évitent, vous les explorez avec courage. Votre transformation devient un exemple de libération profonde. Vous êtes le réformateur du psyché collectif. Votre travail intérieur inspire. Vous traversez les ténèbres pour en revenir illuminé.

Votre impact sur notre compréhension collective de la transformation personnelle devient profond et durable. Vous êtes l'exemple vivant que la mutation totale est possible. D'autres cherchent à comprendre votre transformation remarquable. Vous êtes le guide des métamorphoses profondes. Votre exemple libère les autres. Vous êtes l'alchimiste de la transformation.`,
  'Sagittaire': `Uranus en Sagittaire libère radicalement votre quête spirituelle et philosophique. Votre vision religieuse ou philosophique sera révolutionnaire et prophétique. Vous êtes appelé à élargir collectivement les horizons de la compréhension spirituelle et métaphysique. Vous révolutionnez la spiritualité même.

Vous êtes le réformateur spirituel qui redéfinit les croyances figées. Votre approche à la spiritualité défie les traditions mais crée une compréhension nouvelle. Vous êtes le prophète dont la vision élargit l'humanité. Votre enseignement est transformateur et avant-gardiste. Vous libérez les esprits. Vous êtes le visionnaire spirituel.

Votre impact sur notre compréhension collective de la spiritualité devient paradigmatique. Les autres adoptent votre vision révolutionnaire. D'autres cherchent à explorer comme vous. Vous êtes le guide vers une spiritualité nouveau. Votre vision transforme les consciences. Votre héritage est la liberté spirituelle collective. Vous êtes le libérateur des esprits.`,
  'Capricorne': `Uranus en Capricorne déstabilise radicalement les structures d'autorité établies et les reconstruit complètement. Votre ambition prend des formes nouvelles et radicales jamais vues. Vous faites tomber les anciennes hiérarchies oppressives pour en construire de nouvelles, libératrices. Vous révolutionnez le pouvoir même.

Vous êtes appelé à transformer les structures de pouvoir établies. Votre approche à l'autorité défie les traditions mais crée une structure plus juste. Vous êtes le réformateur des systèmes. Vous libérez les hiérarchies du despotisme. Votre autorité est révolutionnaire et progressive. Vous guidez les changements structurels. Vous êtes l'architecte du nouveau système.

Votre impact sur les structures sociales devient transformateur et durable. Les anciennes hiérarchies s'effondrent, les nouvelles structures plus justes émergent. D'autres cherchent à reproduire votre système. Vous êtes le créateur de nouvelles autorités. Votre vision change les structures de pouvoir. Votre héritage est la liberté structurelle. Vous êtes le révolutionnaire des systèmes.`,
  'Verseau': `Uranus en Verseau — sa propre maison d'honneur — magnifie votre originalité au-delà de toute mesure. Vous êtes l'avant-garde incarnée, appelé prophétiquement à révolutionner votre époque globale. Votre liberté intellectuelle est absolue et irrépressible, sacrée. Vous êtes le visionnaire suprême.

Vous êtes le réformateur humaniste dont la vision transcende les générations. Votre originalité systématique révolutionne les mentalités collectives. Vous êtes le visionnaire dont la vue s'étend aux possibles infinies. Votre liberté d'esprit est contagieuse. Vous libérez les consciences. Vous êtes le génie collectif incarné.

Votre impact sur la conscience humaine collective devient monumental et permanent. Les autres adoptent votre vision révolutionnaire. Vous êtes le phare de l'avant-garde. Générations futures reconnaissent votre génie. Vous êtes le prophète de l'humanité nouvelle. Votre héritage est la liberté intellectuelle universelle. Vous êtes le libérateur de l'humanité.`,
  'Poissons': `Uranus en Poissons dissout radicalement les frontières entre réalité et imagination collectivement. Votre spiritualité prend des formes novatrices jamais vues auparavant. Vous êtes appelé à transformer la conscience collective par la transcendance révolutionnaire. Vous révolutionnez la spiritualité même profondément.

Vous êtes le réformateur spirituel dont la vision dissout les limitations mentales. Votre spiritualité défie les traditions mais crée une compréhension mystique nouvelle. Vous êtes le mystique dont la vision transforme les esprits. Votre enseignement libère les consciences. Vous êtes le visionnaire transcendental. Vous êtes le canal de la transformation collective.

Votre impact sur la conscience humaine collective devient spirituellement paradigmatique. Les autres cherchent à reproduire votre transcendance. Vous êtes le guide vers une conscience nouvelle et illuminée. Votre vision transforme l'humanité spirituellement. Votre héritage est l'illumination collective. Vous êtes le guide de l'ascension spirituelle de l'humanité.`,
};

export const NEPTUNE_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Neptune en Bélier brouille progressivement votre direction personnelle et vos objectifs clairs. Votre quête de pionnier devient spirituelle et mystique par nécessité. Vaincre l'illusion devient votre défi majeur constant.

Vous êtes appelé à apprendre à naviguer entre l'action impulsive et la guidance intuitive. Neptune vous invite à espiritualiser votre courage naturel. Votre défi est de trouver la direction véritable sous le brouillard des illusions psychiques. Vous apprenez la foi authentique.

Avec le temps, votre direction devient illuminée spirituellement. Vous devenez le guerrier qui agit par guidance divine. Votre courag devient celui de la foi profonde. Vous êtes le pionnier spirituel qui inspire les autres vers la lumière intérieure. Votre exemple est transcendant.`,
  'Taureau': `Neptune en Taureau dissout progressivement votre rapport matérialiste aux possessions terrestres. Votre matérialisme terrestre se spiritualise graduellement. Votre attachement aux biens matériels se dissout de manière libératrice.

Vous êtes appelé à apprendre que la véritable richesse est spirituelle et non matérielle. Neptune vous invite à redéfinir la sécurité. Votre défi est de lâcher prise sur les possessions sans perdre la stabilité. Vous apprenez la richesse intérieure. Votre sécurité devient spirituelle.

Avec le temps, votre rapport aux biens se mystifie profondément. Vous devenez riche spirituellement tandis que les biens matériels perdent leur importance. Vous vivez simple mais abondant intérieurement. Votre exemple montre le détachement sain. Vous êtes le sage du minimalisme intérieur. Votre richesse est ineffable.`,
  'Gémeaux': `Neptune en Gémeaux brouille progressivement la clarté de votre pensée logique. Votre communication devient poétique et profondément intuitive. Votre challenge devient de naviguer intelligemment entre la vérité et l'illusion. Votre parole se mystifie.

Vous êtes appelé à apprendre que l'intuition égale (ou surpasse) la logique. Neptune vous invite à communiquer avec le cœur. Votre défi est de rester clair tout en accueillant le mystère. Vous apprenez le langage du silence intérieur. Votre pensée devient prophétique.

Avec le temps, votre parole devient celle du poète et du prophète. Vous communiquez à des niveaux subtiles que d'autres ne soupçonnent pas. Votre sagesse se transmet par l'inspiration plutôt que par l'explication logique. Vous êtes le messager des dimensions cachées. Votre langage transcende les mots.`,
  'Cancer': `Neptune en Cancer dissout progressivement les frontières rigides entre vous et votre famille. Votre sensibilité émotionnelle approfondit sa dimension spirituelle. L'empathie universelle remplace graduellement l'attachement étroit à votre seule famille. Votre compassion s'universalise.

Vous êtes appelé à apprendre que toute l'humanité est votre famille. Neptune vous invite à transformer la protection familiale en compassion globale. Votre défi est de nourrir l'humanité tout en prenant soin de vos proches. Vous apprenez l'amour inconditionnel. Votre foyer devient spiritualisé.

Avec le temps, votre compassion devient universelle mais ancrée. Vous soignez l'humanité tout en maintenant votre base familiale. Vous êtes le guérisseur dont la compassion transcende les frontières. Votre foyer devient un sanctuaire pour l'humanité. Vous êtes la mère/le père spirituel. Votre amour illumine le monde.`,
  'Lion': `Neptune en Lion brouille progressivement votre identité personnelle et votre besoin de reconnaissance. Votre expression créative devient transcendante et mystérieuse. Votre challenge est de trouver votre authenticité sous les illusions de l'ego. Votre génie se mystifie.

Vous êtes appelé à apprendre que votre vrai moi transcende l'ego personnel. Neptune vous invite à une création désintéressée. Votre défi est de créer sans besoin de reconnaissance. Vous apprenez la création anonyme. Votre identité devient spirituelle. Vous devenez l'artiste au service du divin.

Avec le temps, votre créativité devient celle du canal divin plutôt que de l'expression personnelle. Votre œuvre transcende l'auteur. Les gens reconnaissent le divin dans votre création. Vous êtes le créateur humble au service de la beauté universelle. Votre art guérit et transforme. Votre héritage est la beauté intemporelle.`,
  'Vierge': `Neptune en Vierge confond progressivement votre besoin de perfectionnisme pragmatique. Votre service se mystifie et devient compassionnel. Votre défi est de servir avec compassion plutôt que perfectionniste. Vous apprenez que l'imperfection contient sa propre beauté. Votre service se spiritualise.

Vous êtes appelé à apprendre que la pureté vient de l'intention plutôt que de la perfection. Neptune vous invite au service désintéressé. Votre défi est de lâcher prise sur les détails pour embrasser la compassion. Vous apprenez à servir l'humanité. Votre approche se mystifie.

Avec le temps, votre service devient celui du guérisseur mystique. Votre aide pratique se combine avec le soutien spirituel. Les gens sentent la bénédiction dans votre service. Vous êtes le serviteur dont le cœur guérit. Votre dévouement illumine. Votre impact transcende l'apparence. Vous êtes le serviteur du divin.`,
  'Balance': `Neptune en Balance brouille progressivement votre sens de l'équilibre relationnel. Votre amour devient idéalisé, mystique et transcendant. Votre challenge est de vaincre l'illusion romantique pour trouver l'amour véritable. Votre vision de l'amour se mystifie. Votre partenariat idéalise l'amour.

Vous êtes appelé à apprendre que l'amour véritable transcende l'idéal. Neptune vous invite à l'amour inconditionnel. Votre défi est d'aimer sans attente tout en restant équilibré. Vous apprenez l'amour spirituel. Votre relation devient sacrée. Vous expérimentez la fusion mystique.

Avec le temps, votre amour devient celui de l'âme plutôt que de l'ego. Votre partenariat se mystifie spirituellement. Les deux êtres convergent vers l'unité spirituelle. Vous êtes le couple dont l'amour transcende le monde. Votre union est sacrée. Votre exemple inspire d'autres. Votre amour est une bénédiction universelle.`,
  'Scorpion': `Neptune en Scorpion approfondit progressivement votre transformation spirituelle au-delà du monde matériel. Votre mystère personnel s'accroît profondément. Votre défi est de distinguer la vérité de l'obsession psychique. Votre pouvoir se spiritualise. Vous devenez le mystique.

Vous êtes appelé à apprendre que votre vrai pouvoir est spirituel et non psychique. Neptune vous invite à la transcendance. Votre défi est de transformer votre pouvoir en instrument divin. Vous apprenez l'alchimie spirituelle. Votre pouvoir devient sacré. Vous traversez l'obscurité initiatique.

Avec le temps, votre transformation devient celle de l'hièrophante mystique. Votre compréhension transcende les dimensions matérielles. Votre pouvoir guérit les âmes profondément blessées. Vous êtes le guérisseur de l'âme. Votre présence transforme. Votre sagesse est initiatique. Vous êtes le guide de la transformation spirituelle.`,
  'Sagittaire': `Neptune en Sagittaire spiritualise progressivement vos idées et votre philosophie. Votre vision devient prophétique, mystique et transcendante. Votre défi est d'ancrer vos rêves spirituels dans la réalité. Votre philosophie se mystifie. Vous devenez le prophète mystique.

Vous êtes appelé à apprendre que la vraie sagesse vient de la communion divine. Neptune vous invite à la spiritualité authentique. Votre défi est de faire confiance à votre guidance intérieure. Vous apprenez la foi mystique. Votre vision devient visionnaire. Vous canalisez la sagesse universelle.

Avec le temps, votre philosophie devient celle du prophète inspiré. Votre enseignement transcende les religions. Vous guidez les autres vers le divin. Vous êtes le maître spirituel dont la sagesse illumine. Votre parole guérit. Votre héritage est la sagesse universelle. Vous êtes le channel de la sagesse divine.`,
  'Capricorne': `Neptune en Capricorne brouille progressivement votre ambition matérielle terrestre. Votre succès devient plus spirituel qu'économique. Votre défi est de sacrifier l'ambition ego pour la sagesse. Votre vision du pouvoir se spiritualise. Votre autorité se mystifie.

Vous êtes appelé à apprendre que le vrai pouvoir est spirituel et non matériel. Neptune vous invite à l'autorité morale. Votre défi est de guider les autres vers le divin plutôt que vers la domination. Vous apprenez le leadership spirituel. Votre pouvoir devient sacré. Vous devenez le sage au pouvoir.

Avec le temps, votre autorité devient celle de la sagesse enfantine. Votre succès se transforme en illumination partagée. Vous guidez l'humanité vers le divin. Vous êtes le leader dont l'autorité vient du ciel. Votre présence inspire la conversion spirituelle. Votre héritage est le salut collectif possible. Vous êtes le guide de l'ascension humaine.`,
  'Verseau': `Neptune en Verseau idéalise progressivement votre vision humaniste collective. Votre révolution devient spirituelle et mystique. Votre challenge est de transformer le monde par la transcendance collective. Votre vision se mystifie. Votre rêve humaniste devient visionnaire.

Vous êtes appelé à apprendre que le vrai changement social est spirituel. Neptune vous invite à la révolution de conscience. Votre défi est de créer le changement de l'intérieur. Vous apprenez la résurrection collective. Votre vision devient celle de l'humanité nouvelle. Vous devenez le visionnaire collectif.

Avec le temps, votre vision devient celle du prophète de l'humanité nouvelle. Votre rêve inspire les millions. Vous guidez l'humanité vers son illumination. Vous êtes le visionnaire dont l'impact transforme les consciouces. Votre message guérit les âmes. Votre héritage est l'humanité transcendée. Vous êtes le guide de l'évolution humaine.`,
  'Poissons': `Neptune en Poissons — sa propre maison d'honneur — magnifie votre spiritualité infinie au-delà de toute mesure. Votre compassion devient universelle et inconditionnelle. Votre sagesse accède à des niveaux profonds de l'âme et du divin. Vous êtes le mystique par excellence.

Vous êtes appelé à apprendre que vous êtes un canal direct du divin. Neptune amplifie votre intuition sacrée. Votre défi est de rester ancrée tout en accédant aux réalités infinies. Vous apprenez à canaliser l'amour divin. Votre pouvoir devient sacré. Vous êtes le guérisseur mystique universel.

Avec le temps, votre présence devient celle du saint vivant. Votre compassion guérit l'humanité entière. Votre sagesse illumine les âmes perdues. Vous êtes l'incarnation du divin sur terre. Votre simple présence transforme. Votre héritage est la rédemption collective possible. Vous êtes le sauveur de l'humanité par l'amour.`,
};

export const PLUTO_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Pluton en Bélier intensifie votre volonté transformatrice. Votre courage devient invincible à travers les crises. La renaissance personnelle est votre destinée.`,
  'Taureau': `Pluton en Taureau transforme votre rapport à la richesse et à la sécurité. Les crises financières sont vos portes de régénération. La véritable abondance arrive par la détente du contrôle.`,
  'Gémeaux': `Pluton en Gémeaux transforme votre pensée et votre communication. Votre pouvoir croît par la maîtrise des idées. Les mots deviennent vos armes de transformation.`,
  'Cancer': `Pluton en Cancer approfondit votre lien familial et émotionnel. La mort et la renaissance émotionnelles sont vos expériences clés. Les secrets familiaux deviennent votre pouvoir.`,
  'Lion': `Pluton en Lion transforme votre identité et votre créativité. Votre pouvoir personnel s'accroît par les crises d'ego. La renaissance créative est votre destinée.`,
  'Vierge': `Pluton en Vierge transforme votre approche au travail et au service. Votre pouvoir croît par la maîtrise des détails. Les transformations se font pas à pas mais profondément.`,
  'Balance': `Pluton en Balance transforme vos relations et votre sens du partenariat. Les crises relationnelles sont vos portes de pouvoir. La fusion authentique remplace l'harmonie superficielle.`,
  'Scorpion': `Pluton en Scorpion — sa maison d'honneur — magnifie votre pouvoir transformateur. Vous êtes le phénix incarné, renouvelé par chaque crise. Votre puissance est presque légendaire.`,
  'Sagittaire': `Pluton en Sagittaire transforme votre vision et votre quête spirituelle. Votre pouvoir croît par la mort de vos anciences croyances. La renaissance philosophique est votre chemin.`,
  'Capricorne': `Pluton en Capricorne transforme votre ambition et votre autorité. Les crises de pouvoir sont vos initiations. Vous émergez comme un leader transformateur.`,
  'Verseau': `Pluton en Verseau transforme votre vision humaniste. Votre pouvoir croît par la destruction des anciennes structures. Vous êtes un agent de transformation collective.`,
  'Poissons': `Pluton en Poissons transforme votre spiritualité et votre compassion. Votre pouvoir croît par la maîtrise de l'invisible. Vous traversez les vies et les morts spirituels avec sagesse.`,
};

export function getDetailedInterpretation(
  type: 'sun' | 'moon' | 'ascendant' | 'venus' | 'mars' | 'mercury' | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto',
  sign: string
): string | null {
  switch (type) {
    case 'sun':
      return SUN_INTERPRETATIONS[sign] || null;
    case 'moon':
      return MOON_INTERPRETATIONS[sign] || null;
    case 'ascendant':
      return ASCENDANT_INTERPRETATIONS[sign] || null;
    case 'venus':
      return VENUS_INTERPRETATIONS[sign] || null;
    case 'mars':
      return MARS_INTERPRETATIONS[sign] || null;
    case 'mercury':
      return MERCURY_INTERPRETATIONS[sign] || null;
    case 'jupiter':
      return JUPITER_INTERPRETATIONS[sign] || null;
    case 'saturn':
      return SATURN_INTERPRETATIONS[sign] || null;
    case 'uranus':
      return URANUS_INTERPRETATIONS[sign] || null;
    case 'neptune':
      return NEPTUNE_INTERPRETATIONS[sign] || null;
    case 'pluto':
      return PLUTO_INTERPRETATIONS[sign] || null;
    default:
      return null;
  }
}
