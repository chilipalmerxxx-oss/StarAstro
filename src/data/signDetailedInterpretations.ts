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
  'Bélier': `Le Soleil en Bélier illumine ton être d'une flamme pionnière et intrépide. Tu es le guerrier du zodiaque, animé par un courage instinctif et une volonté de conquérir de nouveaux horizons. Ton énergie vitale est celle du printemps qui surgit — impossible à contenir, irrésistible dans son élan.

Ton identité profonde se construit autour de l'action et de l'initiative. Tu n'attends pas que les choses arrivent : tu les provoques. Cette impulsivité créatrice est ta plus grande force, même si elle peut parfois te pousser à agir avant de réfléchir. L'important pour toi n'est pas la perfection, mais le mouvement.

En tant que Bélier solaire, tu portes en toi l'archétype du héros mythique : celui qui part à l'aventure sans savoir ce qui l'attend, mais avec la certitude absolue qu'il saura affronter chaque défi. Ton enthousiasme est contagieux et ta franchise désarmante.`,

  'Taureau': `Le Soleil en Taureau t'ancre dans une réalité sensuelle et concrète. Tu es le bâtisseur du zodiaque, celui qui transforme les rêves en réalisations tangibles grâce à une persévérance que rien ne peut ébranler. Ton rapport au monde est fondamentalement sensoriel — tu as besoin de toucher, goûter, ressentir pour croire.

Ton identité se construit dans la durée et la stabilité. Là où d'autres zigzaguent, tu traces une ligne droite vers tes objectifs avec une détermination qui peut sembler lente mais qui est en réalité implacable. Tu comprends instinctivement que les choses de valeur demandent du temps.

Le Taureau solaire incarne la beauté de la constance. Ta loyauté est inébranlable, ta générosité profonde, et ta capacité à créer du confort et de la beauté autour de toi est un véritable don. Tu es la terre fertile qui nourrit tout ce qu'elle touche.`,

  'Gémeaux': `Le Soleil en Gémeaux fait de toi un être de communication et de connexion. Ton esprit est un kaléidoscope brillant qui capte simultanément mille facettes de la réalité. La curiosité est le moteur de ton existence — chaque conversation, chaque livre, chaque rencontre est une porte vers un monde nouveau.

Ton identité est multiple et mouvante, et c'est précisément là que réside ton génie. Tu es le traducteur universel, capable de comprendre des perspectives très différentes et de créer des ponts entre les idées. Ton agilité mentale te permet de naviguer avec aisance dans la complexité du monde moderne.

En tant que Gémeaux solaire, tu portes le don de la parole et de l'écriture. Ton intelligence est vive, adaptable, et perpétuellement en mouvement. Tu es l'éternel étudiant de la vie, et cette soif d'apprendre te garde éternellement jeune d'esprit.`,

  'Cancer': `Le Soleil en Cancer fait de te le gardien émotionnel du zodiaque. Ta sensibilité profonde n'est pas une faiblesse — c'est un superpouvoir qui te permet de capter les nuances invisibles de chaque situation. Tu ressens le monde avec une intensité que peu peuvent comprendre.

Ton identité se construit autour de l'attachement et de la protection. Famille, racines, mémoire : ces mots résonnent au plus profond de ton être. Tu es celui qui se souvient, qui préserve, qui nourrit. Ta capacité à créer un espace de sécurité émotionnelle est un don rare et précieux.

Le Cancer solaire porte en lui la sagesse de la Lune — cette compréhension intuitive des cycles de la vie, des marées émotionnelles et du besoin fondamental de chaque être d'être aimé et protégé. Sous ta carapace se cache un cœur d'une tendresse infinie.`,

  'Lion': `Le Soleil en Lion — sa position la plus puissante — fait de toi un être rayonnant et magnétique. Tu es né pour briller, non pas par vanité, mais parce que ta lumière intérieure est tout simplement trop intense pour être cachée. Ta présence illumine chaque pièce que tu traverses.

Ton identité se construit autour de la créativité et de l'expression de soi. Tu as un besoin vital de créer, d'inspirer et de laisser ton empreinte dans le monde. La générosité est au cœur de ta nature — tu donnes avec grandeur et attends en retour la reconnaissance de ton unicité.

En tant que Lion solaire, tu incarnes l'archétype du roi bienveillant : celui qui protège son royaume avec fierté et guide ses proches avec chaleur. Ton courage est noble, ta loyauté absolue, et ta capacité à aimer, véritablement royale.`,

  'Vierge': `Le Soleil en Vierge te dote d'un esprit analytique d'une finesse extraordinaire. Tu perçois les détails que les autres ignorent, et cette capacité d'observation fait de toi un maître du perfectionnement. Là où d'autres voient le tableau d'ensemble, tu distingues chaque coup de pinceau.

Ton identité se construit dans le service et l'amélioration continue. Tu es animé par un idéal de pureté et d'efficacité qui te pousse à donner le meilleur de toi-même en toute circonstance. Ton humilité n'est pas un manque de confiance — c'est la sagesse de savoir qu'on peut toujours progresser.

La Vierge solaire porte le don de la guérison, qu'elle soit physique, mentale ou organisationnelle. Tu es celui qui répare, qui organise, qui rend possible l'impossible par la simple force de ta rigueur et de ton dévouement. Ton intelligence pratique est un trésor.`,

  'Balance': `Le Soleil en Balance fait de toi un artiste de l'harmonie et de la relation. Tu possèdes un sens esthétique inné qui s'applique aussi bien aux formes qu'aux relations humaines. La beauté, sous toutes ses formes, est ta boussole existentielle.

Ton identité se construit dans le miroir de l'autre. Loin d'être une dépendance, cette orientation relationnelle est une intelligence sociale remarquable. Tu comprends instinctivement que nous existons pleinement à travers nos connexions, et tu excelles dans l'art de créer des liens harmonieux.

En tant que Balance solaire, tu es le diplomate naturel du zodiaque. Ton sens de la justice, ton élégance et ta capacité à voir tous les points de vue font de toi un médiateur hors pair. Tu apportes grâce et équilibre partout où tu vas.`,

  'Scorpion': `Le Soleil en Scorpion te dote d'une intensité et d'une profondeur que peu de signes peuvent égaler. Tu n'effleures jamais la surface des choses — tu plonges directement au cœur, là où se cachent les vérités essentielles. Ton regard pénétrant traverse les masques et les illusions.

Ton identité se forge dans la transformation perpétuelle. Comme le phénix, tu connais le pouvoir de la destruction créatrice : mourir à soi-même pour renaître plus fort. Cette capacité de métamorphose fait de toi l'un des signes les plus résilients du zodiaque.

Le Scorpion solaire porte le mystère de la vie et de la mort dans son ADN. Ton magnétisme est irrésistible, ta loyauté absolue, et ta passion, dévorante. Tu ne fais jamais les choses à moitié — en amour comme en toute chose, c'est tout ou rien.`,

  'Sagittaire': `Le Soleil en Sagittaire embrase ton être d'un feu philosophique et aventurier. Tu es l'explorateur du zodiaque, celui qui est perpétuellement en quête de sens, de vérité et de nouveaux horizons. Ton optimisme naturel est un flambeau qui éclaire le chemin des autres.

Ton identité se construit dans l'expansion et la découverte. Tu as besoin d'espace — physique, mental et spirituel — pour déployer tes ailes. Les frontières te semblent artificielles et ton esprit refuse naturellement toute limitation. Voyages, études, philosophie : tout ce qui élargit ta vision te nourrit.

En tant que Sagittaire solaire, tu incarnes la joie de vivre et la foi en l'avenir. Ton enthousiasme est contagieux, ta franchise rafraîchissante, et ta capacité à rebondir après les épreuves, tout simplement remarquable. Tu es le professeur, le guide, l'éclaireur.`,

  'Capricorne': `Le Soleil en Capricorne te confère une ambition et une discipline qui force le respect. Tu es l'architecte du zodiaque, celui qui bâtit des empires pierre après pierre, avec une patience que le temps lui-même envie. Ton sens des responsabilités est inné et ton intégrité, inébranlable.

Ton identité se construit dans l'accomplissement et la maîtrise. Tu ne cherches pas la facilité — tu cherches l'excellence. Chaque obstacle est pour toi une marche supplémentaire vers le sommet que tu vises avec une détermination silencieuse mais implacable.

Le Capricorne solaire porte la sagesse de Saturne : la compréhension profonde que la valeur se mesure à l'effort investi. Ta maturité impressionne, ta fiabilité rassure, et ta capacité à prendre des décisions difficiles avec stoïcisme fait de toi un leader naturel.`,

  'Verseau': `Le Soleil en Verseau fait de toi un visionnaire et un innovateur. Ton esprit opère sur des fréquences que la majorité ne capte pas encore — tu vois le futur avant qu'il ne se manifeste. L'originalité n'est pas pour toi un choix, c'est une nécessité existentielle.

Ton identité se construit dans la différence et l'indépendance intellectuelle. Tu refuses instinctivement de te conformer aux attentes conventionnelles, non par rébellion gratuite, mais parce que tu perçois des possibilités que les autres ne voient pas encore. Ta liberté de pensée est sacrée.

En tant que Verseau solaire, tu portes l'archétype de l'humaniste révolutionnaire. Ta préoccupation pour le collectif, ton idéalisme et ton courage intellectuel font de toi un catalyseur de changement. Tu n'améliores pas le monde — tu le réinventes.`,

  'Poissons': `Le Soleil en Poissons te connecte à l'invisible et à l'universel. Tu es le mystique du zodiaque, doté d'une sensibilité qui transcende les frontières du rationnel. Ton empathie n'a pas de limites — tu ressens la joie et la souffrance du monde comme si elles étaient les tiennes.

Ton identité se construit dans la dissolution et la transcendance. Là où d'autres cherchent à se définir par des frontières nettes, tu comprends que l'essence de l'être est fluide, changeante, infinie. Cette sagesse te donne accès à une créativité et une intuition sans pareilles.

Le Poissons solaire porte le don de la compassion universelle. Artiste, guérisseur, rêveur : tu es le pont entre le visible et l'invisible. Ton imagination est un océan sans fond, et ta capacité à ressentir la beauté dans toute chose est un véritable miracle.`,
};

export const MOON_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Ta Lune en Bélier révèle un monde émotionnel ardent et spontané. Tes réactions sont immédiates, presque instinctives — tu ressens avec la même intensité que tu agis. La colère monte vite mais s'évapore tout aussi rapidement, car tu n'es pas du genre à ruminer.

Sur le plan affectif, tu as besoin d'excitation et de nouveauté pour te sentir vivant émotionnellement. La routine t'étouffe, l'ennui te déprime. Tu cherches un partenaire qui puisse suivre ton rythme effréné et partager ta passion pour la vie.

Cette position lunaire te donne un courage émotionnel remarquable. Tu n'as pas peur d'exprimer ce que tu ressens, même si cela dérange. Ton honnêteté émotionnelle, bien que parfois brusque, est profondément authentique.`,

  'Taureau': `Ta Lune en Taureau — l'une des positions les plus confortables — t'offre une stabilité émotionnelle exceptionnelle. Tes sentiments sont profonds, constants et fiables. Tu n'es pas sujet aux montagnes russes émotionnelles : ton monde intérieur est un jardin paisible et fertile.

Tu as un besoin vital de sécurité matérielle et affective. Le confort physique — bonne nourriture, beaux vêtements, environnement agréable — nourrit directement ton bien-être émotionnel. Les plaisirs sensoriels sont pour toi une forme de méditation naturelle.

Cette Lune te donne une patience émotionnelle extraordinaire, mais aussi une obstination remarquable. Une fois que tes sentiments sont fixés, rien ne peut les déloger. Ta fidélité est à toute épreuve, et ta capacité à créer un foyer chaleureux est un don précieux.`,

  'Gémeaux': `Ta Lune en Gémeaux crée un monde émotionnel vif, curieux et perpétuellement en mouvement. Tu traites tes émotions par la pensée et la parole — parler de ce que tu ressens est ta façon naturelle de digérer les expériences. Le silence émotionnel t'est presque insupportable.

Ton besoin fondamental est celui de la stimulation intellectuelle. Une conversation passionnante te nourrit autant qu'un câlin. Tu cherches des connexions qui engagent ton esprit autant que ton cœur, et la variété dans tes relations est essentielle à ton équilibre.

Cette position lunaire te donne une adaptabilité émotionnelle remarquable. Tu peux naviguer entre différents états d'esprit avec une agilité qui surprend, et ton humour est souvent ton meilleur mécanisme de défense contre les turbulences émotionnelles.`,

  'Cancer': `Ta Lune en Cancer — dans sa position la plus puissante — fait de toi un être d'une sensibilité océanique. Tes émotions sont profondes, riches et nuancées, avec une mémoire émotionnelle qui conserve chaque impression comme un trésor. Tu ressens les atmosphères comme d'autres perçoivent les couleurs.

Ton besoin de sécurité émotionnelle est fondamental et non négociable. Famille, maison, appartenance : ces mots touchent la corde la plus intime de ton être. Tu construis autour de toi un cocon protecteur qui nourrit autant que tu as besoin d'être nourri.

Cette Lune te confère une intuition presque magique. Tu captes les non-dits, les émotions cachées, les besoins inexprimés des autres. Ton empathie naturelle fait de toi un confident et un protecteur que tous recherchent dans les moments difficiles.`,

  'Lion': `Ta Lune en Lion illumine ta vie émotionnelle d'une chaleur généreuse et dramatique. Tes sentiments sont grands, expressifs et impossibles à ignorer. Tu aimes avec grandeur, tu souffres avec noblesse, et tu célèbres avec éclat. La tiédeur émotionnelle n'existe pas dans ton vocabulaire.

Ton besoin profond est celui de la reconnaissance et de l'admiration. Être vu, apprécié et célébré nourrit ton âme comme le soleil nourrit la terre. Ce n'est pas de la vanité — c'est un besoin authentique de sentir que ta lumière intérieure est reçue et valorisée.

Cette position lunaire te donne un cœur véritablement royal. Ta générosité émotionnelle est sans limites, ta loyauté, féroce, et ta capacité à rendre les autres importants, un véritable don. Tu es celui qui fait se sentir spécial tous ceux qui croisent ton chemin.`,

  'Vierge': `Ta Lune en Vierge crée un monde émotionnel subtil, analytique et orienté vers le service. Tu traites tes émotions avec méthode, cherchant à comprendre avant de ressentir. Cette approche peut sembler détachée, mais elle cache en réalité une sensibilité profonde et délicate.

Ton besoin fondamental est celui de l'utilité et de l'ordre. Tu te sens émotionnellement en paix quand ton environnement est organisé, quand ton corps est sain et quand tu sais que tu contribues de manière significative. Le chaos te déstabilise profondément.

Cette Lune te donne une capacité remarquable à prendre soin des autres de manière concrète et pratique. Ton amour s'exprime par des actes de service — préparer un repas, organiser un espace, résoudre un problème. C'est ton langage émotionnel, et il est profondément précieux.`,

  'Balance': `Ta Lune en Balance crée un monde émotionnel tourné vers l'harmonie et la beauté relationnelle. Tu as une aversion naturelle pour les conflits et cherches instinctivement l'équilibre dans toutes tes interactions. La paix intérieure, pour toi, passe nécessairement par la paix relationnelle.

Ton besoin fondamental est celui de la connexion harmonieuse. Tu te sens émotionnellement comblé quand tes relations sont équilibrées, quand ton environnement est beau et quand la justice prévaut. La solitude prolongée te déstabilise car tu existes pleinement dans le lien.

Cette position lunaire te donne un sens esthétique émotionnel — une capacité à percevoir la beauté dans les relations et à créer des espaces d'élégance émotionnelle. Ta diplomatie est instinctive et ta grâce sociale, un véritable art.`,

  'Scorpion': `Ta Lune en Scorpion plonge ta vie émotionnelle dans des profondeurs abyssales. Rien n'est superficiel chez toi — tes sentiments sont intenses, transformateurs et absolus. Tu vis chaque émotion avec une puissance qui peut être aussi destructrice que régénératrice.

Ton besoin fondamental est celui de l'authenticité émotionnelle totale. Les faux-semblants te révulsent. Tu cherches la vérité nue dans chaque relation, chaque expérience, chaque moment. Cette quête de profondeur te rend magnétique mais aussi redoutable.

Cette Lune te confère un pouvoir de transformation émotionnelle extraordinaire. Tu connais les ténèbres intérieures et sais les traverser. Chaque crise est pour toi une renaissance, chaque perte, une leçon de détachement. Ta résilience émotionnelle est sans pareille.`,

  'Sagittaire': `Ta Lune en Sagittaire illumine ta vie émotionnelle d'un optimisme aventurier et expansif. Tes sentiments sont joyeux, enthousiastes et toujours en quête de sens. Tu as besoin de comprendre pourquoi tu ressens ce que tu ressens — la philosophie émotionnelle est ton terrain de jeu.

Ton besoin fondamental est celui de la liberté et de l'expansion. Tu te sens émotionnellement vivant quand tu explores, apprends ou enseignes. Les limites t'oppressent, et tu as besoin d'espace — physique et mental — pour que tes émotions puissent respirer.

Cette position lunaire te donne un enthousiasme émotionnel contagieux et une capacité naturelle à voir le côté positif de chaque situation. Ta foi en la vie est un phare qui guide non seulement toi-même, mais tous ceux qui ont la chance de croiser ta route.`,

  'Capricorne': `Ta Lune en Capricorne structure ta vie émotionnelle avec une rigueur et une maturité qui impressionnent. Tes sentiments sont profonds mais contenus, exprimés avec mesure et réserve. Ce n'est pas de la froideur — c'est de la dignité émotionnelle, une force tranquille qui s'approfondit avec le temps.

Ton besoin fondamental est celui de la sécurité structurelle. Tu te sens émotionnellement en paix quand ta vie est organisée, tes objectifs clairs et tes responsabilités assumées. Le désordre émotionnel te déstabilise car tu as besoin de sentir que tu maîtrises ton monde intérieur.

Cette Lune te donne une endurance émotionnelle remarquable. Là où d'autres s'effondrent, tu restes debout. Ta fiabilité émotionnelle fait de te le roc sur lequel les autres s'appuient, et ta sagesse émotionnelle s'approfondit magnifiquement avec l'âge.`,

  'Verseau': `Ta Lune en Verseau crée un monde émotionnel original, indépendant et tourné vers le collectif. Tes sentiments sont teintés d'intellectualité — tu observes tes propres émotions avec une curiosité détachée, comme un scientifique fasciné par ses propres réactions.

Ton besoin fondamental est celui de la liberté émotionnelle. Tu refuses les conventions sentimentales et cherches des formes de connexion qui respectent ton individualité. Les relations traditionnelles peuvent te sembler étouffantes si elles ne laissent pas de place à ton besoin d'espace.

Cette position lunaire te donne une vision émotionnelle unique et avant-gardiste. Tu comprends que l'amour peut prendre des formes infinies et que la connexion véritable transcende les attentes sociales. Ton humanisme émotionnel est un cadeau rare pour notre monde.`,

  'Poissons': `Ta Lune en Poissons t'ouvre à un océan émotionnel sans frontières. Ta sensibilité est cosmique — tu ne ressens pas seulement tes propres émotions, mais celles de tous ceux qui t'entourent. Cette perméabilité émotionnelle est à la fois ton plus grand don et ton plus grand défi.

Ton besoin fondamental est celui de la transcendance et de la fusion. Tu cherches à te dissoudre dans quelque chose de plus grand que toi — l'art, la spiritualité, l'amour mystique. Les frontières entre toi et l'autre sont naturellement floues, ce qui crée une intimité d'une profondeur rare.

Cette Lune te confère une imagination émotionnelle sans limites et une compassion universelle. Tu es le guérisseur émotionnel du zodiaque, capable de ressentir la souffrance des autres et de la transmuter par ta seule présence. Ta sensibilité est un portail vers l'infini.`,
};

export const ASCENDANT_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Un Ascendant Bélier te dote d'une première impression percutante et dynamique. Dès que tu entres dans une pièce, ton énergie est palpable — directe, vive, un peu combative. Les autres te perçoivent comme quelqu'un de courageux, spontané et prêt à l'action.

Ton masque social est celui du guerrier. Tu abordes les nouvelles situations tête baissée, avec un enthousiasme qui peut être aussi inspirant qu'intimidant. Ton langage corporel est énergique, ton regard franc, et ta poignée de main ferme.

Cet Ascendant influence profondément ton apparence physique : traits marqués, démarche rapide, posture athlétique. Tu vieillis bien grâce à cette énergie martienne qui te maintient en mouvement. Ton approche de la vie est celle d'un pionnier — toujours en quête du prochain défi.`,

  'Taureau': `Un Ascendant Taureau te confère une présence rassurante et sensuelle. Dès le premier contact, les autres perçoivent ton calme, ta solidité et ton goût pour les belles choses. Tu inspires confiance par ta simple présence — stable, fiable, ancrée.

Ton masque social est celui du bâtisseur serein. Tu prends ton temps pour évaluer les nouvelles situations, et cette lenteur apparente cache en réalité une observation minutieuse. Rien ne t'échappe — tu enregistres chaque détail sensoriel avant de t'engager.

Cet Ascendant influence ton apparence physique vers la robustesse et l'harmonie. Tes traits sont souvent réguliers et agréables, dégageant une beauté naturelle et terreuse. Ta voix est généralement mélodieuse, et ta présence physique, magnétiquement apaisante.`,

  'Gémeaux': `Un Ascendant Gémeaux te dote d'une première impression vive, curieuse et communicative. Dès le premier échange, les autres captent ton intelligence, ton esprit et ta polyvalence. Tu es l'interlocuteur fascinant qui sait parler de tout avec enthousiasme.

Ton masque social est celui de l'éternel jeune. Tu abordes chaque nouvelle situation avec la curiosité d'un enfant et l'esprit d'un intellectuel. Ton adaptabilité sociale est remarquable — tu peux te fondre dans n'importe quel environnement et converser avec n'importe qui.

Cet Ascendant te donne une apparence souvent juvénile et un regard pétillant d'intelligence. Tes gestes sont expressifs, tes mouvements rapides, et ton énergie nerveux mais captivante. La jeunesse d'esprit qui te caractérise se reflète dans ton apparence physique tout au long de ta vie.`,

  'Cancer': `Un Ascendant Cancer te confère une première impression douce, accueillante et protectrice. Les autres perçoivent immédiatement ta sensibilité et ta chaleur — tu es la personne vers qui on se tourne instinctivement quand on a besoin de réconfort.

Ton masque social est celui du protecteur bienveillant. Tu accueilles les nouvelles situations avec prudence et empathie, évaluant le climat émotionnel avant de t'ouvrir. Cette réserve initiale fait place à une intimité remarquable une fois la confiance établie.

Cet Ascendant influence ton apparence vers la douceur : visage rond ou expressif, regard profond et expressif, posture qui invite à la confidence. Ta présence physique dégage une aura maternelle ou paternelle qui attire naturellement les confidences et l'affection des autres.`,

  'Lion': `Un Ascendant Lion te dote d'une présence qui ne passe jamais inaperçue. Dès ton entrée, les regards se tournent vers toi — non pas parce que tu les cherches, mais parce que ton aura rayonnante les attire. Ton charisme est instinctif, magnétique et chaleureux.

Ton masque social est celui du roi ou de la reine. Tu abordes chaque situation avec dignité, confiance et une générosité naturelle qui inspire le respect. Ta posture est fière sans être arrogante, ton sourire lumineux, et ta présence, véritablement solaire.

Cet Ascendant influence ton apparence de manière spectaculaire : chevelure remarquable (souvent abondante), traits expressifs, regard magnétique et posture royale. Tu vieillis avec grâce et ta beauté a une qualité dramatique et théâtrale qui fascine.`,

  'Vierge': `Un Ascendant Vierge te confère une première impression de raffinement discret et d'intelligence pratique. Les autres perçoivent ton attention aux détails, ta tenue soignée et ton approche méthodique. Tu inspires confiance par ta compétence et ton humilité.

Ton masque social est celui de l'expert modeste. Tu abordes les nouvelles situations avec précaution et analyse, observant méticuleusement avant d'agir. Ta réserve naturelle cache une intelligence acérée et un sens de l'observation qui ne manque rien.

Cet Ascendant influence ton apparence vers l'élégance sobre et la propreté impeccable. Tes traits sont souvent fins et réguliers, ton style vestimentaire soigné sans ostentation, et ta présence physique dégage une énergie de compétence et de fiabilité discrète.`,

  'Balance': `Un Ascendant Balance te dote d'une grâce sociale et d'un charme naturel inégalés. Dès le premier contact, les autres sont captivés par ton élégance, ton sourire et ta capacité à les mettre à l'aise. Tu es le diplomate naturel, celui qui crée de l'harmonie sans effort apparent.

Ton masque social est celui de l'esthète raffiné. Tu abordes chaque situation avec grâce et équilibre, cherchant instinctivement le point de convergence entre les différentes parties. Ton sens de la justice et ton fair-play sont immédiatement perceptibles.

Cet Ascendant influence ton apparence vers la beauté harmonieuse : traits équilibrés, sourire charmant, posture élégante. Ton style vestimentaire est naturellement raffiné, et ta présence physique crée une atmosphère d'harmonie et de beauté partout où tu vas.`,

  'Scorpion': `Un Ascendant Scorpion te confère une présence intense et magnétique qui ne laisse personne indifférent. Dès le premier regard, les autres sentent ta profondeur, ton mystère et ta puissance intérieure. Ton regard est pénétrant — il semble percer les masques et lire les âmes.

Ton masque social est celui du détective psychologique. Tu abordes chaque nouvelle situation avec une vigilance aiguë, évaluant les dynamiques de pouvoir et les motivations cachées. Rien ne t'échappe, et cette perception est à la fois fascinante et légèrement inquiétante pour les autres.

Cet Ascendant influence ton apparence de manière saisissante : regard intense et perçant, traits sculpturaux, présence physique magnétique et mystérieuse. Ta beauté a quelque chose de dangereux et d'hypnotique. Tu dégages une aura de transformation qui attire ceux qui sont prêts pour le changement.`,

  'Sagittaire': `Un Ascendant Sagittaire te dote d'une présence joyeuse, expansive et aventurière. Dès que tu apparais, ton enthousiasme et ton optimisme sont contagieux. Les autres te perçoivent comme un voyageur, un philosophe, un être libre dont la joie de vivre est un véritable soleil.

Ton masque social est celui de l'explorateur. Tu abordes chaque nouvelle situation avec curiosité et ouverture, prêt à apprendre et à partager. Ton rire est sonore, tes gestes amples, et ton énergie communicative. La vie est une aventure, et tu le montres à chaque instant.

Cet Ascendant influence ton apparence vers le dynamisme et la stature : souvent grand ou donnant l'impression de grandeur, mouvements expansifs, sourire large et sincère. Ta présence physique dégage une énergie de liberté et d'aventure qui donne envie de te suivre au bout du monde.`,

  'Capricorne': `Un Ascendant Capricorne te confère une présence digne, sérieuse et impressionnante. Dès le premier contact, les autres sentent ton autorité naturelle et ta maturité. Tu inspires le respect par ta tenue, ton self-control et ton aura de compétence.

Ton masque social est celui du dirigeant. Tu abordes les nouvelles situations avec méthode et prudence, évaluant les enjeux avant de t'engager. Ta réserve initiale peut sembler froide, mais elle masque une profondeur et une sensibilité que seuls les proches découvrent.

Cet Ascendant a un effet remarquable sur ton apparence : tu rajeunis avec l'âge. Si la jeunesse peut te donner un air plus vieux que tes années, la maturité t'embellit de manière spectaculaire. Tes traits deviennent plus harmonieux, ton style plus assuré, ta présence plus magnétique au fil du temps.`,

  'Verseau': `Un Ascendant Verseau te dote d'une présence originale et intellectuellement stimulante. Dès le premier échange, les autres captent ta différence — non pas une excentricité calculée, mais une authenticité naturelle qui refuse poliment de se conformer. Tu es fascinant par ta simple singularité.

Ton masque social est celui du visionnaire. Tu abordes chaque situation avec une perspective unique, souvent décalée, qui ouvre de nouvelles possibilités. Ton indépendance d'esprit est immédiatement perceptible, et ton approche humaniste du monde attire ceux qui pensent différemment.

Cet Ascendant influence ton apparence de manière distinctive : quelque chose d'unique dans tes traits ou ton style te rend immédiatement reconnaissable. Ton regard est électrique et intelligent, et ta présence physique dégage une énergie futuriste et avant-gardiste.`,

  'Poissons': `Un Ascendant Poissons te confère une présence éthérée et mystérieusement attirante. Dès le premier regard, les autres perçoivent ta douceur, ta sensibilité et ta nature presque irréelle. Tu as quelque chose de l'ange — une beauté qui semble d'un autre monde.

Ton masque social est celui du rêveur empathique. Tu abordes chaque situation avec une ouverture émotionnelle et une adaptabilité qui frisent le caméléonisme. Ta capacité à te fondre dans l'atmosphère ambiante est remarquable, et ton empathie instinctive attire les confidences.

Cet Ascendant influence ton apparence vers l'évanescent : regard rêveur et profond, traits doux et changeants, présence physique qui semble parfois transparente. Ta beauté est celle de l'eau — fluide, changeante, et profondément captivante. Tu dégages une aura de mystère et de compassion.`,
};

export const VENUS_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Vénus en Bélier illumine ta capacité amoureuse d'une passion ardente et impatiente. Tu aimes avec fougue, de manière instinctive et directe. Ce n'est pas l'amour qui s'éternise en rêveries — c'est celui qui fonce et conquiert. Ton désir amoureux est comme du feu vif et immédiat.

Tu as besoin d'excitation et de nouveauté dans tes relations. L'ennui est ton pire ennemi amoureux. Tu cherches un partenaire qui peut suivre ton rythme passionné et partager ton zèle pour la vie. L'honnêteté émotionnelle est ton style — tu dis ce que tu ressens sans détour.

Dans l'amour, tu es le pionnier, celui qui ose faire le premier pas. Ta générosité amoureuse est franche et sans prétention. Tu adores plaire et être admiré, mais ton besoin d'indépendance signifie que tu ne dépends jamais entièrement d'une autre personne pour ton bonheur.`,

  'Taureau': `Vénus en Taureau — une position exceptionnelle — crée une capacité amoureuse stable, sensuelle et profondément loyale. Tu aimes avec constance, cherchant à construire quelque chose de durable et de beau. Ton approche de l'amour est terreuse, incarnée, merveilleusement pratique.

Tu as besoin de sécurité matérielle et affective pour que ton cœur s'épanouisse pleinement. Le confort physique — caresses, repas partagés, foyer agréable — est ton langage amoureux naturel. Tu n'es pas du genre à des passions fulgurantés, mais à des amours qui s'approfondissent avec le temps comme du vin qui vieillit.

Dans l'amour, tu es la constance incarnée. Une fois que tu as choisi quelqu'un, ta fidélité est absolue et irrévocable. Tu aimes créer de la beauté avec ton partenaire — un foyer aimé, des traditions chères, des rituels de tendresse.`,

  'Gémeaux': `Vénus en Gémeaux crée une capacité amoureuse légère, communicative et intellectuellement stimulée. Tu aimes avec ton esprit autant qu'avec ton cœur. Les conversations passionnantes, les échanges d'idées, la connexion mentale : c'est ainsi que tu te sens vraiment aimé.

Tu as besoin de variété et de stimulation dans tes relations. Rester statique t'étouffe. Ton partenaire idéal est quelqu'un qui peut te garder intéressé, qui peut discuter de tout avec toi et qui comprend ton besoin d'espace personnel et de liberté mentale.

Dans l'amour, tu es le communicateur, celui qui articule ses sentiments avec précision et humour. Ton affection est souvent exprimée par des mots d'esprit, des taquineries affectueuses et une joie partagée. L'ennui émotionnel est ta plus grande crainte.`,

  'Cancer': `Vénus en Cancer crée une profondeur émotionnelle dans l'amour qui est vraiment magnifique. Tu aimes avec ton âme entière, cherchant une fusion émotionnelle complète avec ton partenaire. La sécurité relationnelle est le fondement de ta capacité à aimer librement.

Tu as un besoin viscéral d'appartenance et d'acceptation inconditionnelle. Ton partenaire doit comprendre que ta tendresse est un don rare et qu'en l'acceptant, il accepte ta profonde vulnérabilité. Tu aimes prendre soin de quelqu'un, créer un nid chaleureux où vous pouvez tous les deux être pleinement vous-mêmes.

Dans l'amour, tu es le nourricier émotionnel, celui qui se souvient de chaque moment important et qui célèbre constamment l'unicité de ton partenaire. Ton intuition amoureuse est remarquable — tu sais instinctivement ce dont ton bien-aimé a besoin.`,

  'Lion': `Vénus en Lion fait de ton amour quelque chose de véritablement royal et dramatique. Tu aimes avec une générosité éclatante, cherchant à créer une histoire d'amour digne d'une légende. Ton partenaire doit se sentir comme le roi ou la reine du château — célébré, admiré et adoré.

Tu as besoin d'être admiré pour ta capacité à aimer. Ta fierté amoureuse est grande et ton besoin de reconnaissance dans la relation est significatif. Tu aimes les gestes grandioses, les déclarations passionnelles et les moments de glamour partagé.

Dans l'amour, tu es le créateur de moments magiques. Ta loyauté amoureuse est féroce — une fois engagé, tu l'es totalement. Tu adores célébrer ton amour publiquement, montrer au monde combien ton partenaire est spécial, et créer une vie ensemble qui rayonne.`,

  'Vierge': `Vénus en Vierge crée une approche amoureuse réfléchie, attentive et profondément compatissante. Tu aimes en servant, en améliorant, en soutenant pratiquement le bien-être de ton partenaire. Ton affection s'exprime par des actes concrets plutôt que par des déclarations dramatiques.

Tu as besoin que ton partenaire soit quelqu'un que tu respectes profondément, quelqu'un qui partage ta quête de raffinement et d'authenticité. La perfection n'est pas ton attente — c'est la sincérité et le dévouement mutuel qui te satisfont. Tu aimes les détails : tu te souviens de ce qu'aime ton bien-aimé et tu travailles constamment pour rendre ta relation meilleure.

Dans l'amour, tu es l'aidant gracieux, celui qui voit les imperfections avec bienveillance. Ta critique amoureuse vient toujours d'un lieu de soutien, jamais de jugement. Tu es le partenaire qui rend tout plus beau et plus ordonné.`,

  'Balance': `Vénus en Balance — une position exemplaire pour l'amour — crée une capacité relationnelle harmonieuse et enchantée. Tu aimes avec grâce, cherchant à créer une relation totalement équilibrée où les deux partenaires se complètent parfaitement. Le partenariat, pas la domination, est ton idéal.

Tu as besoin d'une connexion profonde avec quelqu'un qui partage ta vision de la beauté et de la justice. L'esthétique relationnelle est importante pour toi — comment tu te présentes ensemble, l'élégance de tes interactions — cela nourrit ton cœur.

Dans l'amour, tu es le diplomate du cœur, capable de voir les deux côtés et de trouver toujours le point d'équilibre. Ton charme naturel est irrésistible, et ta capacité à créer de l'harmonie dans la relation est ton plus grand talent. Tu aimes profondément à travers le compromis et la compréhension mutuelle.`,

  'Scorpion': `Vénus en Scorpion plonge ton amour dans des profondeurs abyssales d'intensité absolue. Tu aimes totalement ou ne pas du tout — il n'y a pas de demi-mesure dans ton cœur. Ton partenaire doit être prêt pour une passion qui transformera son être entièrement.

Tu as besoin d'une connexion par fusion totale, d'une intimité émotionnelle qui approche la fusion psychique. Le secret, la vulnérabilité partagée, et l'honnêteté absolue sont les fondements de ta confiance amoureuse. Les jeux superficiels te répugnent.

Dans l'amour, tu es le gardien des secrets les plus intimes. Ta sexualité est quelque chose de transcendant et sagré. Ta jalousie est célèbre, mais elle vient de ta compréhension profonde de ce que signifie vraiment l'amour — un lien qui transcende tout. Tu aimes avec une intensité qui peut transformer et régénérer.`,

  'Sagittaire': `Vénus en Sagittaire crée une approche amoureuse libre, aventureuse et profondément honnête. Tu aimes avec une vision élargie, cherchant un partenaire qui est aussi une compagnon de voyage philosophique. L'exploration ensemble, mentalement et physiquement, est essentiellement pour ton bonheur amoureux.

Tu as besoin de liberté dans tes relations — la possessivité t'étouffe complètement. Ton partenaire doit comprendre que tu as besoin d'espace pour grandir, d'amis, d'aventures et de quête spirituelle. Tu aimes quelqu'un qui peut te suivre dans tes voyages, tes rêves, ton expansion perpétuelle.

Dans l'amour, tu es l'enthousiaste, celui qui voit toujours le meilleur chez son partenaire. Ton optimisme est contagieux. Tu adores partager ta vision du monde avec quelqu'un d'autre, créer de nouveaux horizons ensemble. Ta fidélité est donnée à quelqu'un qui comprend que l'amour means growing together.`,

  'Capricorne': `Vénus en Capricorne crée une approche amoureuse sérieuse et fondée sur la responsabilité mutuelle. Tu aimes avec intention, cherchant quelqu'un avec qui construire quelque chose de durable et de significatif. Ton amour grandir avec le temps, devenant plus profond et plus riche avec chaque année.

Tu as besoin d'un partenaire qui respecte ton amour du travail et qui comprend tes ambitions. Montrer ton affection est parfois difficile pour toi — ce n'est pas par manque d'amour, mais par réserve naturelle. Tu préfères montrer ton amour par tes actions et ton engagement à long terme.

Dans l'amour, tu es le bâtisseur de dynasties relationnelles. Ta loyauté peut durer une vie entière. Tu aimes créer une structure, des plans d'avenir, une sécurité ensemble. Ton cadeau amoureux est ta fierté dans une relation qui dure et qui signifie quelque chose profondément.`,

  'Verseau': `Vénus en Verseau crée une approche amoureuse unique, indépendante et profondément humaniste. Tu aimes dans une optique de liberté totale — tu refuses instinctivement les attentes conventionnelles. Ton partenaire doit être quelqu'un qui respects ton unicité complètement.

Tu as besoin d'une connexion intellectuelle vibrante. Le lien mental et idéologique est aussi important que la connexion émotionnelle ou physique. Tu aimes quelqu'un qui peut partager ta vision d'un monde meilleur, qui peut discuter de grandes idées avec toi.

Dans l'amour, tu es le visionnaire, celui qui voit les possibilités futures dans une relation. Ton amour est souvent non-conformiste — peut-être une amitié profonde avec des éléments romantiques, ou une relation qui defies conventional labels. Tu aimes quelqu'un pour son âme, son intellect et sa vision du monde.`,

  'Poissons': `Vénus en Poissons crée la plus grande capacité de fusion amoureuse du zodiaque. Tu aimes de manière quasi spirituelle, cherchant une union complète avec ton partenaire. Tes limites entre toi et l'autre sont naturellement floues — c'est ta magnifique capacité à aimer inconditionnellement.

Tu as besoin d'une connexion profonde où le partenaire comprend que l'amour est un mystère transcendant. Ton imagination amoureuse est sans limites — tu crées des mondes de fantasme et de rêve ensemble. La plus petite violence ou rejet te blesse profondément car ton cœur n'a pas de défenses.

Dans l'amour, tu es le rêveur, le poète, le guérisseur. Ta compassion pour ton partenaire est sans limites. Tu donnerais tout pour son bonheur et tu pardonnerais facilement. Ton amour est le plus sacrificiel du zodiaque — c'est à la fois ta plus grande force et ta plus grande vulnérabilité.`,
};

export const MARS_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Mars en Bélier intensifie ton énergie d'action d'une manière explosive. Tu es l'incarnation du courage guerrier — tête la première, sans hésitation, sans doute. Ton désir brûle avec intensité et ta volonté est inébranlable. Tu sais ce que tu veux et tu vas le chercher.

Ton approche à la fois des défis et des passions est directe et sans détour. Tu n'as pas le temps pour les stratégies élaborées ou les jeux politiques — l'action rapide est ton style. Cependant, cette impulsivité peut signifier que tu fonces parfois sans suffisamment de réflexion.

Ta sexualité est passionnée et franche. Tu aimes l'excitation, la conquête, la nouveauté. Dans le sport ou dans les compétitions, tu es le combattant naturel qui ne renonce jamais. Ta définition de la victoire est claire et simple : arriver en premier.`,

  'Taureau': `Mars en Taureau canalise ton énergie masculine d'une manière durable, stable et terreuse. Ce n'est pas l'énergie rapide du Bélier — c'est celle du laboureur patient qui construit lentement mais solidement. Ton tempérament est phlegmatique, mais quand tu te mets en mouvement, rien ne peut t'arrêter.

Ton approche aux défis est méthodique. Tu fais tes recherches, tu planifies ta stratégie, puis tu avances avec détermination inébranlable. Tu ne renonces jamais parce que l'abandonner après avoir investi du travail te repugne. Ta sensualité est délibérée et pleine de relish.

Ta sexualité est incarnée et sensuelle. Tu aimes prendre ton temps, savourer chaque sensation. Le plaisir du corps est aussi important que celui du cœur. Tu es un bâtisseur d'empire — ton ambition matérielle est forte et ta capacité à manifester tes rêves en réalité concrète est impressionnante.`,

  'Gémeaux': `Mars en Gémeaux énergise ton action avec vigueur mentale et adaptabilité. Ton énergie masculine se manifeste principalement à travers la pensée rapide et la communication incisive. Tu es rapide sur les pieds et ton esprit est plus rapide encore — difficile à attraper ou à maîtriser.

Ton approche aux défis est l'attaque mentale. Tu argumentes brillamment, tu trouves les failles et tu les exploites avec une précision chirurgicale. Tu excelles dans les débats et tu es dynamite dans les négociations. Cependant, cette tendance à parler peut parfois te mettre dans l'eau chaude.

Ta sexualité est mentalement stimulée. Tu as besoin de conversation, de rire et d'intrigue mentale autant que de contact physique. Tu es le joueur du zodiaque masculin — avec des multiples intérêts, des multiples projets et il t'est difficile de t'engager pleinement à un seul. Ton besoin de stimulation est insatiable.`,

  'Cancer': `Mars en Cancer canalise ton énergie masculine de manière protectrice et émotionnelle. Ce n'est pas l'énergie conquérante — c'est celle du protecteur qui défend ce qu'il aime. Ton courage est celui du guerrier qui se bat pour sa famille, sa maison, ses racines.

Ton approche aux défis est guidée par l'instinct et l'intuition. Tu peux être incroyablement agressif si quelque chose que tu aimes est menacé. Ton tempérament initial peut sembler doux, mais ne tu y trompes pas — tu as une ténacité féroce beneath the surface. Tu te bats avec le cœur, pas seulement avec les poings.

Ta sexualité est entrelacée avec l'émotion. Ton besoin de sécurité émotionnelle dans l'intimité est fondamental. Tu aimes nourrir ton partenaire et être nourri en retour. Ton ambition est souvent familiale ou basée sur la création d'une maison/refuge.`,

  'Lion': `Mars en Lion énergise ton action avec fierté, courage et dramatisme. Ton énergie masculine est celle du roi guerrier — noble, courageux et fier. Tu vas au combat pour la gloire et la reconnaissance, pas juste pour la victoire elle-même. Ta définition du courage implique de la noblesse et de la grâce.

Ton approche aux défis est généreuse et magnanime. Tu ne te bats jamais bassement — tu te bats avec honneur. Tu peux être incroyablement compétitif car tu veux être le meilleur, pas juste bon. Ta fierté est ton point faible — tu peux être mal à l'aise si tu perds ou si ton autorité est remise en question.

Ta sexualité est passionnée et dramatique. Tu aimes te sentir viril et admiré. Ta confiance sensuelle est naturelle et attractive. Tu es un leader naturel dans l'intimité, quelqu'un qui prend les rênes mais avec générosité. Ton ambition est grande — tu veux laisser ta marque.`,

  'Vierge': `Mars en Vierge canalise ton énergie masculine de manière analytique et productive. Ce n'est pas l'énergie de la conquête grandiose — c'est celle de l'amélioration constante et de l'efficacité. Ton courage s'exprime dans ton dévouement à parfaire tes compétences et ta capacité à résoudre des problèmes complexes.

Ton approche aux défis est scientifique et méthodique. Tu analyses, planifies, exécutes avec précision. Pendant que les autres parlent, tu agis de manière productive. Ton tempérament est contrôlé et tu es rarement impulsif. Ton principal défi est de surmonter ton perfectionnisme et ta tendance à critiquer.

Ta sexualité est modérée et préférant l'authenticité à la dramaturgie. Tu n'es pas du genre à faire grand spectacle — tu préfères la substance. Ta sensualité s'exprime par l'attention minutieuse à l'autre personne et à sa satisfaction. Ton ambition tend à être celle de maîtriser ton craft, quelle qu'elle soit.`,

  'Balance': `Mars en Balance canalise ton énergie masculine de manière diplomatique et équilibrée. Ce n'est pas l'énergie agression brute — c'est celle du guerrier qui cherche la victoire par l'équité et la négociation. Ton courage s'exprime dans ta capacité à défendre les autres et à promouvoir la justice.

Ton approche aux défis est stratégique et relationnelle. Tu vois tous les angles et tu préfères trouver des solutions gagnant-gagnant. Tu peux être incroyablement magnétique dans la négociation, utilisant ton charme pour obtenir ce que tu veux. Cependant, ton besoin d'harmonie peut te rendre trop accommodant, sacrifiant parfois tes propres besoins.

Ta sexualité s'exprime à travers la sensibilité aux besoins de ton partenaire et le désir de créer une expérience belle et équilibrée ensemble. Tu rêves de relations harmonieuses où tu te sens apprécié et admiré. Ton ambition tend à être liée aux relations et aux partenariats.`,

  'Scorpion': `Mars en Scorpion — sa position d'honneur — intensifie ton énergie masculine à un niveau presque légendaire. C'est l'énérgie de la transformation profonde et du pouvoir psychologique. Tu n'as pas besoin de crier — ta silhouette seule est intimidante. Ton courage s'exprime dans ta volonté de descendre aux profondeurs les plus sombres et d'en revenir transformé.

Ton approche aux défis est psychologique et souvent souterraine. Tu vois les motivations cachées, tu stratégises plusieurs pas à l'avance, tu attaques où tu sais que ce sera le plus efficace. Tu peux être impitoyable quand tu en as besoin. Ton tempérament est caché mais potentiellement explosif si tu es poussé trop loin.

Ta sexualité est intense, magnétique et transformatrice. Ce n'est pas seulement une activité physique — c'est un échange de pouvoir et une fusion profonde. Tu exiges une totale authenticité et une entière dévouement. Ton ambition est celle de transformer ta vie et possiblement le monde.`,

  'Sagittaire': `Mars en Sagittaire énergise ton action avec optimisme aventurier et non-conformité. C'est l'énergie du chevalier errant qui voyage à la recherche du Graal. Ton courage s'exprime dans ta volonté d'explorer l'inéxploré et de oser affirmer tes convictions. Tu es le guerrier idéaliste.

Ton approche aux défis est directe et enthousiaste. Tu avances avec confiance, persuadé que l'univers est de ton côté. Tu peux être trop optimiste, sous-estimant les obstacles. Ton tempérament est joyeux et infectieux — on veut te suivre au combat. Cependant, ton manque apparent de sérieux peut être mal interprété comme superficialité.

Ta sexualité est énergique, optimiste et aventureuse. Tu aimes l'excitation et la nouveauté. Tu ne veux pas être attaché ou limité — ton besoin de liberté est absolu. Ton ambition est liée à l'exploration et à l'expansion, qu'elle soit physique, intellectuelle ou spirituelle.`,

  'Capricorne': `Mars en Capricorne canalise ton énergie masculine de manière ambitieuse et disciplinée. C'est l'énergie du grimper d'escalade déterminé qui regarde vers le sommet avec une détermination implacable. Ton courage s'exprime dans ton austérité et ta capacité à maintenir le cap malgré les obstacles.

Ton approche aux défis est stratégique et patiemment planifiée. Tu avances pas à pas vers ton objectif, sans gaspiller d'énergie en gestes inutiles. Tu sais que la vraie victoire arrive par l'effort persistent. Ton tempérament est contrôlé et tu es rarement impulsif à moins d'une bonne raison.

Ta sexualité est sérieuse et liée à ton statut. Tu n'exposes pas tes sentiments facilement et tu préfères une intimité basée sur la confiance construite au fil du temps. Ton ambition est clairement définie et tu te bats pour la réaliser. Tu as besoin de respect de ton partenaire.`,

  'Verseau': `Mars en Verseau énergise ton action avec originalité révolutionnaire et indépendance absolue. C'est l'énergie du combattant pour la justice qui refuse d'accepter le statut quo. Ton courage s'exprime dans ta volonté de défier les attentes conventionnelles. Tu es le constructeur de nouvelles réalités.

Ton approche aux défis est non-conformiste et souvent brillante par son non-conventionalité. Tu penses différemment, tu agis différemment, et cela te donne un avantage unique. Ton tempérament est imprévisible — on ne sait jamais exactement ce que tu feras ensuite. Tu as besoin de liberté mentale.

Ta sexualité est détachée et intellectuelle, même dans l'intimité. Tu as besoin d'une connexion mentale vibrante autant que physique. Ton refus de te conformer aux attentes sexuelles normales peut être libérateur ou déstabilisant selon le partenaire. Ton ambition est liée à ta vision d'un monde meilleur.`,

  'Poissons': `Mars en Poissons canalise ton énergie masculine de manière spirituelle et intuitive. C'est l'énergie du guerrier errant guidé par l'intuition plutôt que par la logique. Ton courage s'exprime dans ta transcendance des limitations matériques et tes sacrifices pour les causes plus grandes.

Ton approche aux défis est fluide et adaptative. Tu n'opposes pas de résistance directe — tu contournes, tu ondoies, tu deviens comme l'eau. Cette approche peut être très efficace ou elle peut te faire sembler manquer de direction claire. Ton tempérament est rêveur et parfois il manque de force d'action concrète.

Ta sexualité est profondément spirituelle et connectée à l'amour. Tu as du mal à séparer le sexe de l'émotion. Ton ambition n'est pas matérielle — elle est spirituelle. Tu veux servir une cause plus grande ou fusionner avec quelqu'un d'une manière quasi-mystique.`,
};

export const MERCURY_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Mercure en Bélier crée un esprit vif, direct et décisif. Ta pensée est rapide, presque impulsive, et ta parole suit immédiatement. Tu dis ce que tu penses sans filtrer — c'est une force dans l'honnêteté directe mais une faiblesse dans la diplomatie. Ta curiosité mentale brûle d'une flamme guerrière.

Tu es l'incitateur intellectuel du groupe. Tes idées viennent sous forme d'éclair d'inspiration, plutôt que de processus délibéré. Tu apprends vite mais peux être impatient de maîtriser les détails. Ton style de communication est assertif, parfois agressif, et tu adores un débat passionné où tu peux accomplir tes positions.

En écriture et en parole, tu es percutant et direct. Tu n'embellis pas — tu vas à la racine du sujet. Tes arguments sont souvent gagnants non pas parce qu'ils sont sophistiqués, mais because they're forceful and simple.`,

  'Taureau': `Mercure en Taureau calme ton esprit d'une stabilité et d'une littéralité pratique exceptionnelle. Ta pensée n'est pas rapide mais elle est profonde. Tu traites les informations lentement mais tu les retiens avec une solidité de roc. Ta parole est souvent posée, mesurée, et tu ne dis que ce que tu peux soutenir avec des faits.

Tu es le penseur pragmatique du groupe. Tes idées sont basées sur la réalité tangible plutôt que sur la théorie. Tu apprends mieux en faisant et tu y retiens ce qui a applicabilité. Ton style de communication est fiable et on peut se fier à ce que tu dis. Tu n'es pas du genre à parler sans raison.

En écriture et en parole, tu es clair et substantiel. Tu construis tes arguments argument par argument, comme tu construirais un bâtiment. Tu n'es jamais verbalement impressionnant mais you're persuasive through your solidity.`,

  'Gémeaux': `Mercure en Gémeaux — sa maison d'honneur — crée un esprit brillant, adaptable et infiniment curieux. Ta pensée est rapide, tes intérêts sont nombreux, et tu navigues facilement entre différents sujets. Tu es le caméléon mental, capable de parler éloquemment de presque n'importe quoi avec n'importe qui.

Tu es le communicateur extraordinaire du groupe. Ton esprit est un feu follet — mobile, rapide, et toujours en quête du prochain sujet facin ating. Tu apprends bien mais préfères la variété à la profondeur. Ton style de communication est léger, rapide et souvent drôle. Tu adores jouer avec les mots et les idées.

En écriture et en parole, tu es fluide et engageant. Tu trouves naturellement les formulations correctes et tu sais comment structurer une histoire pour maximum impact. Ton agilité mentale est ton plus grand atout.`,

  'Cancer': `Mercure en Cancer donne à ton esprit une coloration émotionnelle et intuitive profonde. Ta pensée n'est pas entièrement objective — elle est teintée de sentiment et d'associativité. Tu apprends mieux ce qui est connecté à ton cœur, et tu retiens les choses à travers la mémoire émotionnelle plutôt que logique.

Tu es le penseur empathique du groupe. Ta communication est souvent préoccupée par le bien-être émotionnel de l'autre personne. Tu écoutes réellement et tu comprends les implications émotionnelles des mots. Cependant, ta tendance à être trop préoccupé par les sentiments peut obscurcir la clarté logique.

En écriture et en parole, tu es expressif et émouvant. Tu racontes des histoires plutôt que des faits. Tes meilleur argument n'est pas composé de logique froide mais plutôt d'appels émotionnels intelligemment structurés.`,

  'Lion': `Mercure en Lion donne à ton esprit une confiance dramatique et une tendance à la grandiloquence. Ta pensée est créative et tu aimes faire connaître tes idées. Tu apprends mieux en étant au centre de l'attention et ta meilleure pensée émerge quand tu as une audience.

Tu es le penseur créatif-dramatique du groupe. Ta communication est autoritaire — tu aimes parler, tu aimes être entendu, et ta confiance peut être contagieuse ou exaspérante selon le contexte. Ton style est souvent enthousiaste et expansif. Tu adores raconter des histoires en couleur vive.

En écriture et en parole, tu es expressif et souvent théâtral. Tu as une capacité à faire sembler importantes même les choses banales. Ton meilleur atout est ta capacité à inspirer les autres avec ton enthousiasme intellectuel.`,

  'Vierge': `Mercure en Vierge — sa maison alternative — crée un esprit analytique de précision remarquable. Ta pensée est critique, détaillée et logique. Tu vois les erreurs que les autres manquent et ton besoin de exactitude est inébranlable. Tu apprends mieux en comprenant les mécanismes sous-jacents.

Tu es le penseur logique-analytique du groupe. Ta communication est ordinaire fiable et exacte — on peut faire confiance à ce que tu dis parce que tu vérifies tout. Cependant, ta tendance perfectionniste peut te rendre paralysant — tu peux trouver que tu parles trop peu parce que tu attends la formulation parfaite.

En écriture et en parole, tu es précis et clairement structuré. Tu aimes les listes et les clarifications. Ton meilleur atout est ta capacité à simplifier le complexe et à expliquer clairement.`,

  'Balance': `Mercure en Balance donne à ton esprit un amour naturel de l'équilibre, de la symétrie et de la perspective multiple. Ta pensée est rapide à voir tous les côtés et tu as du mal à prendre des positions définitives. Tu apprends mieux en discutant et en ouvrant le débat.

Tu es le penseur diplomat-ique du groupe. Ta communication est gracieuse et tu sais comment présenter tes idées de manière charmante. Tu es bon pour voir ce qui connecte les différentes idées. Cependant, ton indécision intellectuelle chronique peut t'empêcher de faire des statement clairs.

En écriture et en parole, tu es élégant et persuasif. Tu préfères la phrase bien tournée à la déclaration brutale. Ton meilleur atout est ta capacité à naviguer between perspectives et à créer des ponts intellectuels.`,

  'Scorpion': `Mercure en Scorpion donne à ton esprit une pénétration profonde et une tendance au secret remarquable. Ta pensée va directement au cœur de l'obscurité et tu n'as pas peur de ce que tu y trouveras. Tu apprends mieux ce qui est psychologiquement complexe ou mystérieux. Ta curiosité mentales est insatiable.

Tu es le penseur psychologue-détective du groupe. Ta communication est souvent percutante — tu as le don de poser le question exacte qui révèle la vérité cachée. Tu es taciturne et tu maintiens tes pensées pour toi jusqu'à ce que tu les aies complètement formées. Ton style est intense et non-compromis.

En écriture et en parole, tu es pénétrant et révélateur. Te naviguer les zones tabou avec aisance. Ton meilleur atout est ta capacité à voir ce qui est caché et à l'articuler d'une manière où tout le monde doit écouter.`,

  'Sagittaire': `Mercure en Sagittaire donne à ton esprit une amour pour les grandes questions et une tendance à l'optimisme intellectuel remarquable. Ta pensée embrasse les philosophies et les visions complètes plutôt que les détails mineurs. Tu apprends mieux ce qui élargit ta vision du monde. Ta curiosité s'étend au-delà des faits aux significations.

Tu es le penseur philosophe-orateur du groupe. Ta communication est expansive et souvent inspiratrice. Tu aimes parler et tu peux parler longtemps, souvent oubliendo de laisser respirer les autres. Ton style est enthousiaste et tu adores débattre les grandes idées.

En écriture et en parole, tu es eloquent et vision-ary. Tu aimes créer un contexte più big picture. Ton meilleur atout est ta capacité à relier les idées disparates en un whole cohesif.`,

  'Capricorne': `Mercure en Capricorne donne à ton esprit une sériosité et une orientation vers la pratique avec rigueur. Ta pensée est généralmnte conservative et méticuleuse. Tu apprends mieux ce qui a une application pratique et tu retiens ce qui est utile. Ta curiosité est dirigée vers la compréhension de la structure.

Tu es le penseur pragmatique-conservateur du groupe. Ta communication est ordinairement mesurée et réfléchie. Tu ne parles pas pour parler — chaque mot compte. Ton style est professionnel et digne. Tu grandis dans l'autorité et dans l'expertise.

En écriture et en parole, tu es clair, concis et mémorable. Tu préfères la substance au style. Ton meilleur atout est ta capacité à exprimer des vérités durables de manière simple et puissante.`,

  'Verseau': `Mercure en Verseau donne à ton esprit une liberte intellectuelle remarquable et une amour pour l'original absolue. Ta pensée est avant-gardiste et tu n'es pas intimidé par les ideas que les autres trouvent too extreme. Tu apprends mieux ce qui défie le status quo. Ta curiosité s'étend aux possibilités futures.

Tu es le penseur visionnaire-révolutionnaire du groupe. Ta communication est souvent unique et légèrement excentrique. Tu dis les choses que personne d'autre n'ose dire. Ton style est indépendant et tu refuses instinctivement de te conformer. Cependant, ton besoin de originalité peut te rendre incomprehensible.

En écriture et en parole, tu es original et stimulant. Tu aimes jouer avec les idées conventionnelles. Ton meilleur atout est ta capacité à percevoir les futurs possibles et à les articuler de manière engageante.`,

  'Poissons': `Mercure en Poissons donne à ton esprit une qualité fluide, intuitive et souvent rêveuse remarquable. Ta pensée n'est pas linéaire — elle saute entre les associations et utilise l'intuition autant que la logique. Tu apprends mieux ce qui parle à ton imagination. Ta curiosité est attirée par le mystérieux et le sacré.

Tu es le penseur artiste-imaginatif du groupe. Ta communication est souvent poétique et tu as du mal à dire ce que tu veux en paroles directes. Ton style est rêveur et parfois difficile à suivre logiquement. Tu as une capacité à comprendre les connotations émotionnelles et les implications cachées.

En écriture et en parole, tu es evocative et suggestive. Tu préfères impliquer plutôt que dire directement. Ton meilleur atout est ta capacité à créer une atmosphère mentale et à communiquer à un niveau subconscient.`,
};

export const JUPITER_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Jupiter en Bélier amplifie ton courage et ton audace de manière explosive et magnifique. Ton optimisme débordant attire la fortune naturellement. L'univers semble te favoriser constamment dans tes initiatives aventureuses hardies.

Tu es appelé à apprendre que la vraie chance vient par l'action courageuse et la confiance. Jupiter t'invite à l'expansion par l'audace. Ton défi est d'utiliser ta chance sans devenir téméraire. Tu apprends la bravoure avisée. Ta fortune croît par l'action authentique.

Avec le temps, ta chance devient légendaire. Tu es le pionnier dont la destinée est la réussite. Les autres admirent ta capacité remarquable à transformer l'audace en victoire. Tu es le conquérant chanceux qui inspire. Ton exemple encourage les autres à oser. Ton héritage est la victoire audacieuse.`,
  'Taureau': `Jupiter en Taureau amplifie ta recherche de stabilité matérielle de manière profonde et gratifiante. Ta chance se manifeste par la richesse durable et la sécurité financière substantielle. Ta fortune croît lentement mais sûrement, créant une abondance stable.

Tu es appelé à apprendre que la richesse véritable est celle qu'on construit patiemment. Jupiter t'invite à l'expansion matérielle. Ton défi est de cultiver la richesse sans gaspillage excessif. Tu apprends l'abondance équilibrée. Ta sécurité devient complète et durable.

Avec le temps, ta richesse devient impressionnante et stable. Tu es le bâtisseur dont la fortune est incontestable et visible. Les autres envient ta sécurité matérielle établie. Tu es l'exemple de l'abondance construite. Ton empire s'agrandit graduellement. Ton héritage est la prospérité familiale durable.`,
  'Gémeaux': `Jupiter en Gémeaux amplifie ta curiosité et ta communication de manière intellectuelle et chanceuse. Ta chance vient par les connexions, les voyages et les échanges gratifiants. Ta destinée est celle du messager fortuné dont les paroles ouvrent des portes inédites.

Tu es appelé à apprendre que la vraie richesse est celle du savoir et des connexions. Jupiter t'invite à l'expansion intellectuelle. Ton défi est de cultiver ta connaissance sans superficialité. Tu apprends la profondeur curieuse. Ta sagesse grandit exponentiellement.

Avec le temps, ton réseau devient impressionnant et bénéfique. Tu es le penseur chanceux dont les idées se propagent largement. Ton influence grandit par tes paroles et tes connexions. Tu es le guide intellectuel de ton époque. Ton impact est multiplicatif. Ton héritage est la sagesse partagée collectivement.`,
  'Cancer': `Jupiter en Cancer amplifie ta protection naturelle et ta chaleur nourricière de manière profondément gratifiante. Ta chance vient par la famille, le foyer et les connexions émotionnelles authentiques. Ta destinée est fondée sur la sécurité émotionnelle et l'amour paternel universel.

Tu es appelé à apprendre que la vraie sécurité vient de l'amour inconditionnel. Jupiter t'invite à l'expansion émotionnelle. Ton défi est de nourrir sans étouffer. Tu apprends l'amour libérateur. Ta capacité de soutien devient légendaire. Ton foyer devient un sanctaire.

Avec le temps, ton impact émotionnel devient transformateur pour ceux qui t'entourent. Tu es le nourricier chanceux dont l'amour crée la sécurité. Les autres trouvent le repos dans ta présence. Tu es la mère/père du groupe. Ton foyer devient une maison pour tous. Ton héritage est la sécurité émotionnelle transmise.`,
  'Lion': `Jupiter en Lion amplifie ta créativité et ta confiance de manière spectaculaire et généreuse. Ta chance se manifeste par la reconnaissance publique et l'admiration compétente. Ta destinée est celle du leader magnifiquement admiré dont la lumière guide les autres.

Tu es appelé à apprendre que la vraie beauté vient de l'essence authentique. Jupiter t'invite à l'expression créative. Ton défi est de briller sans tyrannie. Tu apprends l'humilité admirée. Ta créativité devient admirable. Ta présence inspire naturellement.

Avec le temps, ta réputation devient celle du leader charismatique et généreux. Tu es le roi/reine dont la présence ennoblit. Les autres gravitent autour de ta lumière naturelle. Tu es l'exemple de la confiance bienveillante. Ton influence est magnétique. Ton héritage est l'inspiration créative éternelle.`,
  'Vierge': `Jupiter en Vierge amplifie ton perfectionnisme et ta polyvalence de manière productivement bénéfique. Ta chance vient par le travail méticuleux et l'excellence progressive constante. Ta destinée est la maîtrise de ton domaine et l'excellence reconnue.

Tu es appelé à apprendre que la perfection vient par la pratique patiente et consciente. Jupiter t'invite à l'expansion par le travail. Ton défi est de progresser sans paralysie perfectionniste. Tu apprends l'excellence équilibrée. Ton expertise devient invaluable. Ta réputation est celle de la fiabilité remarquable.

Avec le temps, ta maîtrise devient légendaire dans ton domaine. Tu es l'expert chanceux dont les services sont recherchés universellement. Les autres reconnaissent ton excellence incontestable. Tu es le maître artisan de ton art. Ton impact est l'amélioration systématique. Ton héritage est la perfection professionnelle transmise.`,
  'Balance': `Jupiter en Balance amplifie ton charme et ta diplomatie de manière irrésistiblement chanceuse. Ta chance vient par les relations harmonieuses et les partenariats bénéfiques. Ta destinée est fondée sur l'équilibre relationnel et l'harmonie créative.

Tu es appelé à apprendre que la vraie harmonie vient de l'équité authentique. Jupiter t'invite à l'expansion relationnelle. Ton défi est de cultiver l'harmonie sans compromis inauthentiques. Tu apprends l'équilibre vrai. Ton charme devient bénéfique. Ta présence crée l'harmonie. Les relations fleurissent autour de toi.

Avec le temps, ta réputation devient celle du diplomate admirable capable de créer l'accord. Tu es le peacemaker chanceux dont l'influence harmonise les conflits. Les autres te cherchent pour restaurer l'équilibre. Tu es le médiateur bénéfique de ta communauté. Ton impact est conciliateur. Ton héritage est l'harmonie relationnelle établie.`,
  'Scorpion': `Jupiter en Scorpion amplifie ton pouvoir caché et ta capacité de transformation de manière profondément magnétique. Ta chance vient par la régénération courageuse et le renouvellement authentique. Ta destinée est celle du phénix chanceux dont la puissance renaît toujours magnifiée.

Tu es appelé à apprendre que le vrai pouvoir est celui de la transformation résiliente. Jupiter t'invite à l'expansion souterraine. Ton défi est d'utiliser ta puissance sans domination tyrannique. Tu apprends le pouvoir magnanime. Ta transformation devient catalytique. Ton influence grandit par ton essence profonde.

Avec le temps, ta puissance devient presque légendaire dans ton cercle et au-delà. Tu es le transformateur chanceux capable de régénération massive. Les autres sentent ton pouvoir magnétique irréfutable. Tu es le guide des transformations profondes. Ton impact est la régénération collective possible. Ton héritage est la puissance rédemptrice transmise.`,
  'Sagittaire': `Jupiter en Sagittaire —sa maison natale— amplifie ta philosophie naturelle de manière cosmiquement bénéfique et chanceuse. Ta chance est colossale et semble divine naturellement. Ta destinée est celle du sage chanceux dont la vision bénit même les générations futures.

Tu es appelé à apprendre que la vraie sagesse est celle qu'on vit authentiquement. Jupiter amplifie énormément ta nature. Ton défi est de rester humble malgré ta chance excessive. Tu apprends la gratitude profonde. Ta vision devient prophétique. Ta foi crée des miracles. Ton expansion est cosmique.

Avec le temps, ta sagesse devient celle du prophète inspiré admiré partout. Tu es le visionnaire chanceux dont les paroles éclairent l'humanité. Les autres viennent chercher ta guidance. Tu es le maître spirituel dont la sagesse est universelle. Ton impact transforme les consciences. Ton héritage est la sagesse intemporelle partagée collectivement.`,
  'Capricorne': `Jupiter en Capricorne amplifie ton ambition et ta discipline de manière graduellement prospère et durable. Ta chance vient par le travail persistant et l'excellence reconnue progressivement. Ta destinée est celle du leader sage dont l'autorité vient naturellement.

Tu es appelé à apprendre que la vraie richesse vient par la discipline authentique. Jupiter t'invite à l'expansion par le travail patient. Ton défi est d'utiliser ta chance sans devenir cupide. Tu apprends l'ambition équilibrée. Ton succès devient solide. Ton autorité s'établit naturellement. Ta réputation grandit constantement.

Avec le temps, ton succès devient impressionnant et durable à tous les niveaux. Tu es le leader chanceux dont l'ascension semble inévitable et juste. Les autres respectent ton ascension patiente et méritée. Tu es l'incarnation du succès construit. Ton impact est structural et transformateur. Ton héritage est l'empire durable bâti avec sagesse.`,
  'Verseau': `Jupiter en Verseau amplifie ton humanitarisme et ta vision progressive de manière magnifiquement collectiviste. Ta chance vient par les amis, la communauté et les connexions altruistes. Ta destinée est celle du réformateur chanceux dont la vision bénit l'humanité.

Tu es appelé à apprendre que la vraie chance vient par l'utilité collective. Jupiter t'invite à l'expansion humanitaire. Ton défi est de rester accessible malgré ta brillance. Tu apprends l'humilité visionnaire. Ta vision devient collectivement admirée. Ton impact grandit exponentiellement. Ton réseau devient ta force.

Avec le temps, ta vision humanitaire devient celle d'un leader reconnu mondialement. Tu es le réformateur chanceux dont les idées changent le monde. Les autres cherchent à collaborer avec toi. Tu es le visionnaire dont la contribution bénit l'humanité. Ton impact est transformateur collectif. Ton héritage est le progrès humain accéléré par ta vision.`,
  'Poissons': `Jupiter en Poissons amplifie ta spiritualité et ta compassion de manière mystiquement chanceuse et infinie. Ta chance vient par la foi profonde et l'intuition spirituelle magnifiée. Ta destinée est celle du mystique chanceux dont la compassion bénit universellement.

Tu es appelé à apprendre que la vraie magnification vient par la spiritualité authentique. Jupiter t'invite à l'expansion infinie. Ton défi est de rester grounded malgré ta connexion cosmique. Tu apprends la foi équilibrée. Ton pouvoir spirituel devient impressionnant. Ton intuition est presque infaillible. Ta présence guérit. Tu canalises la bénédiction divine.

Avec le temps, ta sagesse spirituelle devient celle du saint vivant admiré. Tu es le mystique chanceux dont la présence rend possibles les miracles. Les autres viennent chercher ta guérison. Tu es l'incarnation de la bénédiction divine sur terre. Ton impact est spirituellement transformateur pour l'humanité. Ton héritage est l'illumination collective possible par ton amour.`,
};

export const SATURN_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Saturne en Bélier tempère ton impulsivité combattante avec la discipline austère. Ton apprentissage vient par l'expérience directe et l'affrontement courageux de la peur. Ton mature courage ne réside pas dans l'absence de peur, mais dans ta capacité à agir malgré elle.

Tu es appelé à apprendre la responsabilité à travers l'action. Saturne te demande de diriger avec sagesse plutôt que simplement d'impulser. Ta plus grande leçon est que le vrai pouvoir vient de la maîtrise de soi, pas de la domination. Les obstacles rencontrés jeune créent une résilience remarquable.

Avec l'âge, ta force devient spectaculaire. Tu développes une autorité tranquille qui inspire le respect sans besoin de crier. Ta maturité apporte une détermination sereine. Tu es le guerrier sage.`,
  'Taureau': `Saturne en Taureau consolide ton approche pratique de la manière la plus profonde. Tu construis une richesse durable et substantielle à travers la patience inébranlable et le travail constant. Ta maturation apporte la stabilité financière, la sécurité immobilière et une longévité remarquable.

Tu es appelé à apprendre la vraie valeur des choses. Saturne te demande de distinguer entre le superflu et l'essentiel. Ton test est souvent l'attachement excessif aux possessions — la leçon est la non-gaspillage par choix conscient. Chaque brique posée crée un empire durable.

Avec le temps, ta richesse devient visible. Tu es l'exemple vivant que la persévérance crée les empires solides. Jeune, tu sembleras pauvre; vieux, tu sembleras infiniment riche. Ton héritage est celui de la sagesse matérielle.`,
  'Gémeaux': `Saturne en Gémeaux structure ta pensée rapide et ta communication versatile avec rigueur logique professionnelle. Ton apprentissage demande plus de temps mais résiste magnifiquement à l'épreuve du temps. Tu deviens progressivement un communicateur fiable, profond et même prophétique plutôt que superficiel.

Tu es appelé à apprendre la clarté de la pensée à travers la discipline mentale. Saturne te demande de profondeur plutôt que de versatilité. Ton test est souvent l'éparpillement mental — la leçon est la concentration et la spécialisation progressive. Ta parole devient précieuse.

Avec l'âge, ta parole gagne du poids. Tu deviens le sage qui parle peu mais dit beaucoup. Ce que tu as à dire mérite d'être écouté précisément parce que tu ne parles que ce que tu as longuement réfléchi. Ton expertise devient légendaire.`,
  'Cancer': `Saturne en Cancer demande la maîtrise progressive de ta sensibilité émotionnelle extrême. Ta maturité émotionnelle arrive à travers l'apprentissage difficile et la confrontation à la perte inévitable. La sécurité authentique vient quand tu acceptes les responsabilités familiales avec grâce détachée.

Tu es appelé à apprendre que la sécurité émotionnelle doit venir de l'intérieur, pas de l'extérieur. Saturne te demande d'indépendance émotionnelle progressive. Ton test est souvent l'attachement excessif et la peur du rejet — la leçon est la confiance en ta propre solidité. Tes cicatrices deviennent ta sagesse.

Avec l'âge, tu deviens la source de sécurité pour les autres. Tes cicatrices émotionnelles deviennent ta sagesse transmissible. Tu es capable de soutenir et réconforter précisément parce que tu comprends la profondeur de la souffrance. Ta compassion sage est rare.`,
  'Lion': `Saturne en Lion humilie ton ego avec bienveillance progressive, t'enseignant l'humilité authentique avant la gloire véritable. Ta créativité mature devient plus substantielle et canalisée vers la contribution réelle. Le vrai pouvoir arrive quand tu abandonnes le besoin égoïque d'admiration publique.

Tu es appelé à apprendre que la vraie autorité ne demande pas de reconnaissance. Saturne te demande de leadership basé sur la sagesse plutôt que sur le charisme séducteur. Ton test est ton orgueil profond — la leçon est l'humilité combinée à la confiance irrébranlable. Tu apprends le pouvoir discret.

Avec l'âge, ton rayonnement devient interne et incontestable. Les autres voient ta vraie noblesse précisément parce qu'elle est dépourvue d'affectation. Tu deviens le leader que les autres suivent volontairement. Ta maturité respire l'autorité naturelle.`,
  'Vierge': `Saturne en Vierge renforce ton perfectionnisme en le rendant productif et transformatif. Tu perfectionnes tes talents jusqu'à une maîtrise remarquable et enviable. Ta rigueur devient un atout professionnel irrésistible et ton efficacité crée des résultats tangibles durables.

Tu es appelé à apprendre que l'excellence vient non pas de la paralysie perfectionniste mais de l'action constamment améliorée. Saturne te demande de dépasser la crainte de l'imparfait. Ton test est l'auto-critique excessive — la leçon est l'appréciation du progrès constant. Chaque amélioration crée la maîtrise.

Avec l'âge, ta maîtrise devient légendaire. Tu es celui qu'on cherche quand il faut que ce soit bien fait. Ta réputation d'excellence ouvre portes que hasard ne pourrait ouvrir. Tu es le maître artisan de ton domaine.`,
  'Balance': `Saturne en Balance demande la clarté progressive dans tes engagements relationnels profonds. Ta maturité apporte la capacité à maintenir les engagements profonds et significatifs plutôt que les connexions légères. Les relations durables et authentiques remplacent progressivement les tergiversations superficielles.

Tu es appelé à apprendre que l'harmonie véritable vient du compromis conscient et mature, pas de l'évitement. Saturne te demande d'autonomie relationnelle. Ton test est la dépendance émotionnelle — la leçon est l'indépendance compatible avec l'intimité. Tu découvres l'amour mature.

Avec l'âge, ton partenariat devient ta force. Tu es capable de loyauté profonde précisément parce que tu en as choisi librement. Tes relations durables sont ton legacy le plus précieux. Tu es l'exemple du couple durable.`,
  'Scorpion': `Saturne en Scorpion approfondit ta transformation interne déjà intense de manière irréversible et catalytique. Ton pouvoir de régénération se renforce à chaque crise traversée. La maîtrise du pouvoir arrive par la compréhension progressive de tes propres ténèbres intérieures cachées.

Tu es appelé à apprendre que le contrôle est une illusion profonde. Saturne te demande de lâcher prise tout en maintenant ton intégrité core. Ton test est le désir de domination — la leçon est l'équilibre transformatif mature. Tu apprends le pouvoir du lâcher-prise.

Avec l'âge, ton pouvoir devient presque légendaire. Tu es le phénix qui a traversé tous les feux. Les autres sentent ton autorité authentique basée sur la survie et la régénération. Tu es le guide des transformations profondes.`,
  'Sagittaire': `Saturne en Sagittaire teste ta foi et ta philosophie optimiste de la manière la plus rigoureuse et profonde. Ton expansion devient graduellement plus réaliste et profondément ancrée. La vraie sagesse arrive quand tu acceptes la finitude tout en gardant ta foi inébranlable.

Tu es appelé à apprendre que la croissance n'est pas infinité insouciante. Saturne te demande de concentration plutôt que de dispersion. Ton test est ta fuite dans l'optimisme superficiel — la leçon est la foi combinée à la responsabilité pratique. Tu construis la sagesse lentement.

Avec l'âge, ta vision devient prophétique et vérifiée. Tes rêves lointains deviennent progressivement réalité parce que tu as appris à les construire pas à pas. Tu es le sage dont la vision guide les générations futures. Ta sagesse est gagnée par l'expérience.`,
  'Capricorne': `Saturne en Capricorne — sa propre maison d'honneur — renforce ton ambition de manière impressivement progressive et productive. Tu ne rencontres pratiquement pas de limites car tu les comprends innémentalement et tu les transcendes systématiquement. Tu es destiné à l'autorité naturelle basée sur la compétence impeccable.

Tu es appelé à apprendre que le pouvoir véritable vient de ton excellence inébranlable. Saturne te demande de patience épique et de persévérance. Ton test est ton impatience d'atteindre le sommet — la leçon est que le sommet vient naturellement à ceux qui marchent avec détermination silencieuse. Chaque pas renforce.

Avec l'âge, ta puissance devient irrésistible. Tu es le leader que tous respectent instinctivement. Le temps est ton allié — plus vieux tu es, plus puissant tu parais. Tu es l'incarnation de l'autorité durable.`,
  'Verseau': `Saturne en Verseau structure ta vision humaniste révolutionnaire de manière très pratique et réaliste. Tes idées révolutionnaires deviennent progressivement réalisables en détail. Ton impact social grandit par la ténacité méthodique et la patience inébranlable.

Tu es appelé à apprendre que les vrais changements sociaux prennent du temps immense. Saturne te demande de réalisme combiné à ton idéalisme profond. Ton test est ton impatience face à l'inertie system — la leçon est que la persistance transforme même les empires entiers. Tu construis lentement mais solidement.

Avec l'âge, tes rêves sociaux deviennent réalisés graduellement. Tu vois ta vision impacter le monde de manière concrète et mesurable. Tu es l'architecte lent mais implacable des transformations collectives durables. Ton legacy change le monde.`,
  'Poissons': `Saturne en Poissons demande l'ancrage progressif de tes rêves infinis dans la réalité concrète et tangible. Ta spiritualité mûrit et devient substantielle et grounded. Les limites apparentes deviennent des portes vers une sagesse plus profonde trouvée. Tu apprends que les rêves prophétiques demandent du travail.

Tu es appelé à apprendre que la spiritualité véritable ne fuit pas la réalité mais la rencontre. Saturne te demande d'incarnation progressive. Ton test est ta tendance à l'évasion spirituelle — la leçon est la transcendance incarnée et vécue. Tu découvres le sacré dans le quotidien.

Avec l'âge, ta spiritualité devient puissante et contagieuse. Tu es le guide spirituel dont la sagesse est ancrée dans la vie réelle vécue. Tes rêves deviennent phares pour d'autres qui cherchent. Tu es le mystique sage et pratique.`,
};

export const URANUS_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Uranus en Bélier — une position révolutionnaire — explose ton approche de l'indépendance radicalement. Tu es un pionnier authentique de l'avant-garde qui défie les conventions instinctivement. Ton originalité ne manifeste par une excentricité affectée, mais par une indépendance naturelle et prophétique.

Tu es l'innovateur dans ton approche à l'action et à l'indépendance personnelle. Tu refuses les sentiers battus et crées invariablement de nouveaux chemins jamais explorés. Ton originalité prophétique souvent devance son époque de décennies. Tu es le rebelle courageux.

Ton impact sur les autres est catalytique et transformateur. Ta simple présence pousse les gens à remettre en question leurs assomptions les plus profondes. Tu es rarement populaire mais toujours remarquable et mémorable. Tu es le révolutionnaire qui inspire.`,
  'Taureau': `Uranus en Taureau crée une tension féconde entre le désir profond de stabilité et le besoin irrépressible de changement radicale. Ton approche aux finances, aux possessions et à la sécurité sera non-conventionnelle et souvent prophétique. Les révolutions personnelles arrivent lentement mais transforment complètement ta vie.

Tu es appelé à réimaginer la richesse et la valeur radicalement. Tes méthodes financières sont originales et souvent mal comprises initialement mais créent l'abondance de manière inattendue et remarquable. Tu es l'innovateur économique qui défie les conventions. Tu libères le système financier.

Au cours de ta vie, tu libères ton rapport à la possession constamment. Tu crées une forme unique de sécurité basée sur ton essence créative plutôt que sur les biens matériels. Tu es le pionnier du nouveau rapport à l'argent. Ta liberté financière inspire.`,
  'Gémeaux': `Uranus en Gémeaux électrise complètement ta pensée et tes communications profondément. Ton esprit pionnier révolutionne les domaines des idées et de la technologie de manière prophétique. Tu es le visionnaire intellectuel de ta génération, et tes idées devanceront ton époque de décennies entières.

Tu es doué de manière surnaturelle pour la prédiction des changements technologiques et sociaux émergents. Ta communication est souvent prophétique et révèle des vérités cachées. Tu vois les connexions que personne d'autre ne perçoit clairement. Tu es le messager de l'avenir.

Tu es le catalyseur des changements intellectuels collectifs. Les gens te cherchent pour comprendre les tendances émergentes. Ton impact transcende ta génération. Tu es la voix du changement technologique et intellectuel. Ta vision révolutionne les mentalités.`,
  'Cancer': `Uranus en Cancer reboutonne complètement tes liens familiaux et ton rapport au foyer avec originalité libératrice totale. Ton approche à la famille sera radicalement non-traditionnelle mais étonnamment fonctionnelle et aimante. Les révolutions domestiques créent de nouvelles structures relationnelles avant-gardistes.

Tu es appelé à libérer ta famille des conventions toxiques héritées. Ton foyer sera un laboratoire vivant pour de nouvelles formes de cohabitation humaine. Tu crées les familles de demain aujourd'hui avec authenticité. Ton foyer est révolutionnaire. Tu réinventes le concept de famille.

Ton héritage familial sera remarquable et unique précisément parce qu'il sera authentique et non-conformiste radicalement. Tes enfants (ou proches) apprendront l'indépendance et l'originalité. Tu es le libérateur familial. Ton modèle inspire des générations.`,
  'Lion': `Uranus en Lion déstabilise ton besoin conventionnel de centre d'attention et redéfinit complètement ce que signifie briller authentiquement. Ta créativité prend des formes révolutionnaires et originales inattendues. Ton leadership devient moins hiérarchique et plus humanitaire et inclusif progressivement.

Tu es l'artiste révolutionnaire dont l'expression authentique crée de nouvelles catégories artistiques. Ta créativité ne suit pas les styles — elle les crée de zéro. Tu es l'innovateur créatif qui redéfinit l'art. Ton expression est prophétique. Tu es le créateur avant-gardiste.

Ton influence grandit non par la domination hiérarchique mais par ta capacité unique à inspirer l'authenticité chez tous. Les autres voient en te la possibilité d'une création originale. Tu es le modèle de l'artiste libre. Ton impact transcende ta génération. Tu es l'innovation incarnée.`,
  'Vierge': `Uranus en Vierge révolutionne complètement ton approche du travail et du service de manière radicale. Ton efficacité prend des formes novatrices et inattendues qui défient la logique conventionnelle. Tu es l'innovateur révolutionnaire dans tes domaines pratiques. Ton approche au travail est avant-gardiste.

Tu es appelé à réinventer les méthodes de travail et de service. Ton génie se manifeste par des solutions non-conformistes qui fonctionnent mieux que les méthodes traditionnelles. Tu révolutionnes ton domaine de l'intérieur. Ton efficacité devient légendaire. Tu optimises radicalement les systèmes.

Au cours de ta vie, ton impact sur ton domaine professionnel devient transformateur et durable. D'autres adoptent tes méthodes révolutionnaires. Tu es le réformateur du travail. Ton approche devient le nouveau standard. Tu es le pionnier du changement pratique. Ton legacy améliore les méthodes de travail.`,
  'Balance': `Uranus en Balance déstabilise radicalement les normes relationnelles conventionnelles et les redéfinit complètement. Ton approche aux relations sera Non-conventionnelle mais profondément juste et équitable. Les partenariats évoluent graduellement vers des formes plus égalitaires et authentiques. Tu révolutionnes précisément ce que signifie aimer.

Tu es appelé à libérer les relations des conventions toxiques. Tu proposes des formes nouvelles de partenariat basées sur l'égalité véritable. Ta vision relationnelle défie les traditions mais crée l'authenticité. Tu es le réformateur des relations. Ton modèle inspire d'autres.

Ton impact sur notre compréhension collective de l'amour et du partenariat devient significatif. Tu es l'exemple d'une relation révolutionnaire authentique. D'autres cherchent à reproduire ton équilibre unique. Tu es le pionnier de nouvelles formes amoureuses. Ta vision transforme les mentalités relationnelles.`,
  'Scorpion': `Uranus en Scorpion approfondit radicalement ton besoin inné de transformation et de mutation profonde. Ton pouvoir personnel s'exprime par des mutations psychologiques profondes et irréversibles. Les tabous deviennent tes terrains d'exploration libératrice. Tu révolutionnes ta nature psychologique même.

Tu es appelé à transformer ta psyché radicalement. Les zones taboues que les autres évitent, tu les explores avec courage. Ta transformation devient un exemple de libération profonde. Tu es le réformateur du psyché collectif. Ton travail intérieur inspire. Tu traverses les ténèbres pour en revenir illuminé.

Ton impact sur notre compréhension collective de la transformation personnelle devient profond et durable. Tu es l'exemple vivant que la mutation totale est possible. D'autres cherchent à comprendre ta transformation remarquable. Tu es le guide des métamorphoses profondes. Ton exemple libère les autres. Tu es l'alchimiste de la transformation.`,
  'Sagittaire': `Uranus en Sagittaire libère radicalement ta quête spirituelle et philosophique. Ta vision religieuse ou philosophique sera révolutionnaire et prophétique. Tu es appelé à élargir collectivement les horizons de la compréhension spirituelle et métaphysique. Tu révolutionnes la spiritualité même.

Tu es le réformateur spirituel qui redéfinit les croyances figées. Ton approche à la spiritualité défie les traditions mais crée une compréhension nouvelle. Tu es le prophète dont la vision élargit l'humanité. Ton enseignement est transformateur et avant-gardiste. Tu libères les esprits. Tu es le visionnaire spirituel.

Ton impact sur notre compréhension collective de la spiritualité devient paradigmatique. Les autres adoptent ta vision révolutionnaire. D'autres cherchent à explorer comme toi. Tu es le guide vers une spiritualité nouveau. Ta vision transforme les consciences. Ton héritage est la liberté spirituelle collective. Tu es le libérateur des esprits.`,
  'Capricorne': `Uranus en Capricorne déstabilise radicalement les structures d'autorité établies et les reconstruit complètement. Ton ambition prend des formes nouvelles et radicales jamais vues. Tu fais tomber les anciennes hiérarchies oppressives pour en construire de nouvelles, libératrices. Tu révolutionnes le pouvoir même.

Tu es appelé à transformer les structures de pouvoir établies. Ton approche à l'autorité défie les traditions mais crée une structure plus juste. Tu es le réformateur des systèmes. Tu libères les hiérarchies du despotisme. Ton autorité est révolutionnaire et progressive. Tu guides les changements structurels. Tu es l'architecte du nouveau système.

Ton impact sur les structures sociales devient transformateur et durable. Les anciennes hiérarchies s'effondrent, les nouvelles structures plus justes émergent. D'autres cherchent à reproduire ton système. Tu es le créateur de nouvelles autorités. Ta vision change les structures de pouvoir. Ton héritage est la liberté structurelle. Tu es le révolutionnaire des systèmes.`,
  'Verseau': `Uranus en Verseau — sa propre maison d'honneur — magnifie ton originalité au-delà de toute mesure. Tu es l'avant-garde incarnée, appelé prophétiquement à révolutionner ton époque globale. Ta liberté intellectuelle est absolue et irrépressible, sacrée. Tu es le visionnaire suprême.

Tu es le réformateur humaniste dont la vision transcende les générations. Ton originalité systématique révolutionne les mentalités collectives. Tu es le visionnaire dont la vue s'étend aux possibles infinies. Ta liberté d'esprit est contagieuse. Tu libères les consciences. Tu es le génie collectif incarné.

Ton impact sur la conscience humaine collective devient monumental et permanent. Les autres adoptent ta vision révolutionnaire. Tu es le phare de l'avant-garde. Générations futures reconnaissent ton génie. Tu es le prophète de l'humanité nouvelle. Ton héritage est la liberté intellectuelle universelle. Tu es le libérateur de l'humanité.`,
  'Poissons': `Uranus en Poissons dissout radicalement les frontières entre réalité et imagination collectivement. Ta spiritualité prend des formes novatrices jamais vues auparavant. Tu es appelé à transformer la conscience collective par la transcendance révolutionnaire. Tu révolutionnes la spiritualité même profondément.

Tu es le réformateur spirituel dont la vision dissout les limitations mentales. Ta spiritualité défie les traditions mais crée une compréhension mystique nouvelle. Tu es le mystique dont la vision transforme les esprits. Ton enseignement libère les consciences. Tu es le visionnaire transcendental. Tu es le canal de la transformation collective.

Ton impact sur la conscience humaine collective devient spirituellement paradigmatique. Les autres cherchent à reproduire ta transcendance. Tu es le guide vers une conscience nouvelle et illuminée. Ta vision transforme l'humanité spirituellement. Ton héritage est l'illumination collective. Tu es le guide de l'ascension spirituelle de l'humanité.`,
};

export const NEPTUNE_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Neptune en Bélier brouille progressivement ta direction personnelle et tes objectifs clairs. Ta quête de pionnier devient spirituelle et mystique par nécessité. Vaincre l'illusion devient ton défi majeur constant.

Tu es appelé à apprendre à naviguer entre l'action impulsive et la guidance intuitive. Neptune t'invite à espiritualiser ton courage naturel. Ton défi est de trouver la direction véritable sous le brouillard des illusions psychiques. Tu apprends la foi authentique.

Avec le temps, ta direction devient illuminée spirituellement. Tu deviens le guerrier qui agit par guidance divine. Ton courage devient celui de la foi profonde. Tu es le pionnier spirituel qui inspire les autres vers la lumière intérieure. Ton exemple est transcendant.`,
  'Taureau': `Neptune en Taureau dissout progressivement ton rapport matérialiste aux possessions terrestres. Ton matérialisme terrestre se spiritualise graduellement. Ton attachement aux biens matériels se dissout de manière libératrice.

Tu es appelé à apprendre que la véritable richesse est spirituelle et non matérielle. Neptune t'invite à redéfinir la sécurité. Ton défi est de lâcher prise sur les possessions sans perdre la stabilité. Tu apprends la richesse intérieure. Ta sécurité devient spirituelle.

Avec le temps, ton rapport aux biens se mystifie profondément. Tu deviens riche spirituellement tandis que les biens matériels perdent leur importance. Tu vis simple mais abondant intérieurement. Ton exemple montre le détachement sain. Tu es le sage du minimalisme intérieur. Ta richesse est ineffable.`,
  'Gémeaux': `Neptune en Gémeaux brouille progressivement la clarté de ta pensée logique. Ta communication devient poétique et profondément intuitive. Ton challenge devient de naviguer intelligemment entre la vérité et l'illusion. Ta parole se mystifie.

Tu es appelé à apprendre que l'intuition égale (ou surpasse) la logique. Neptune t'invite à communiquer avec le cœur. Ton défi est de rester clair tout en accueillant le mystère. Tu apprends le langage du silence intérieur. Ta pensée devient prophétique.

Avec le temps, ta parole devient celle du poète et du prophète. Tu communiques à des niveaux subtiles que d'autres ne soupçonnent pas. Ta sagesse se transmet par l'inspiration plutôt que par l'explication logique. Tu es le messager des dimensions cachées. Ton langage transcende les mots.`,
  'Cancer': `Neptune en Cancer dissout progressivement les frontières rigides entre toi et ta famille. Ta sensibilité émotionnelle approfondit sa dimension spirituelle. L'empathie universelle remplace graduellement l'attachement étroit à ta seule famille. Ta compassion s'universalise.

Tu es appelé à apprendre que toute l'humanité est ta famille. Neptune t'invite à transformer la protection familiale en compassion globale. Ton défi est de nourrir l'humanité tout en prenant soin de tes proches. Tu apprends l'amour inconditionnel. Ton foyer devient spiritualisé.

Avec le temps, ta compassion devient universelle mais ancrée. Tu soignes l'humanité tout en maintenant ton base familiale. Tu es le guérisseur dont la compassion transcende les frontières. Ton foyer devient un sanctuaire pour l'humanité. Tu es la mère/le père spirituel. Ton amour illumine le monde.`,
  'Lion': `Neptune en Lion brouille progressivement ton identité personnelle et ton besoin de reconnaissance. Ton expression créative devient transcendante et mystérieuse. Ton challenge est de trouver ton authenticité sous les illusions de l'ego. Ton génie se mystifie.

Tu es appelé à apprendre que ton vrai moi transcende l'ego personnel. Neptune t'invite à une création désintéressée. Ton défi est de créer sans besoin de reconnaissance. Tu apprends la création anonyme. Ton identité devient spirituelle. Tu deviens l'artiste au service du divin.

Avec le temps, ta créativité devient celle du canal divin plutôt que de l'expression personnelle. Ton œuvre transcende l'auteur. Les gens reconnaissent le divin dans ta création. Tu es le créateur humble au service de la beauté universelle. Ton art guérit et transforme. Ton héritage est la beauté intemporelle.`,
  'Vierge': `Neptune en Vierge confond progressivement ton besoin de perfectionnisme pragmatique. Ton service se mystifie et devient compassionnel. Ton défi est de servir avec compassion plutôt que perfectionniste. Tu apprends que l'imperfection contient sa propre beauté. Ton service se spiritualise.

Tu es appelé à apprendre que la pureté vient de l'intention plutôt que de la perfection. Neptune t'invite au service désintéressé. Ton défi est de lâcher prise sur les détails pour embrasser la compassion. Tu apprends à servir l'humanité. Ton approche se mystifie.

Avec le temps, ton service devient celui du guérisseur mystique. Ton aide pratique se combine avec le soutien spirituel. Les gens sentent la bénédiction dans ton service. Tu es le serviteur dont le cœur guérit. Ton dévouement illumine. Ton impact transcende l'apparence. Tu es le serviteur du divin.`,
  'Balance': `Neptune en Balance brouille progressivement ton sens de l'équilibre relationnel. Ton amour devient idéalisé, mystique et transcendant. Ton challenge est de vaincre l'illusion romantique pour trouver l'amour véritable. Ta vision de l'amour se mystifie. Ton partenariat idéalise l'amour.

Tu es appelé à apprendre que l'amour véritable transcende l'idéal. Neptune t'invite à l'amour inconditionnel. Ton défi est d'aimer sans attente tout en restant équilibré. Tu apprends l'amour spirituel. Ta relation devient sacrée. Tu expérimentes la fusion mystique.

Avec le temps, ton amour devient celui de l'âme plutôt que de l'ego. Ton partenariat se mystifie spirituellement. Les deux êtres convergent vers l'unité spirituelle. Tu es le couple dont l'amour transcende le monde. Ton union est sacrée. Ton exemple inspire d'autres. Ton amour est une bénédiction universelle.`,
  'Scorpion': `Neptune en Scorpion approfondit progressivement ta transformation spirituelle au-delà du monde matériel. Ton mystère personnel s'accroît profondément. Ton défi est de distinguer la vérité de l'obsession psychique. Ton pouvoir se spiritualise. Tu deviens le mystique.

Tu es appelé à apprendre que ton vrai pouvoir est spirituel et non psychique. Neptune t'invite à la transcendance. Ton défi est de transformer ton pouvoir en instrument divin. Tu apprends l'alchimie spirituelle. Ton pouvoir devient sacré. Tu traverses l'obscurité initiatique.

Avec le temps, ta transformation devient celle de l'hièrophante mystique. Ta compréhension transcende les dimensions matérielles. Ton pouvoir guérit les âmes profondément blessées. Tu es le guérisseur de l'âme. Ta présence transforme. Ta sagesse est initiatique. Tu es le guide de la transformation spirituelle.`,
  'Sagittaire': `Neptune en Sagittaire spiritualise progressivement tes idées et ta philosophie. Ta vision devient prophétique, mystique et transcendante. Ton défi est d'ancrer tes rêves spirituels dans la réalité. Ta philosophie se mystifie. Tu deviens le prophète mystique.

Tu es appelé à apprendre que la vraie sagesse vient de la communion divine. Neptune t'invite à la spiritualité authentique. Ton défi est de faire confiance à ta guidance intérieure. Tu apprends la foi mystique. Ta vision devient visionnaire. Tu canalises la sagesse universelle.

Avec le temps, ta philosophie devient celle du prophète inspiré. Ton enseignement transcende les religions. Tu guides les autres vers le divin. Tu es le maître spirituel dont la sagesse illumine. Ta parole guérit. Ton héritage est la sagesse universelle. Tu es le channel de la sagesse divine.`,
  'Capricorne': `Neptune en Capricorne brouille progressivement ton ambition matérielle terrestre. Ton succès devient plus spirituel qu'économique. Ton défi est de sacrifier l'ambition ego pour la sagesse. Ta vision du pouvoir se spiritualise. Ton autorité se mystifie.

Tu es appelé à apprendre que le vrai pouvoir est spirituel et non matériel. Neptune t'invite à l'autorité morale. Ton défi est de guider les autres vers le divin plutôt que vers la domination. Tu apprends le leadership spirituel. Ton pouvoir devient sacré. Tu deviens le sage au pouvoir.

Avec le temps, ton autorité devient celle de la sagesse enfantine. Ton succès se transforme en illumination partagée. Tu guides l'humanité vers le divin. Tu es le leader dont l'autorité vient du ciel. Ta présence inspire la conversion spirituelle. Ton héritage est le salut collectif possible. Tu es le guide de l'ascension humaine.`,
  'Verseau': `Neptune en Verseau idéalise progressivement ta vision humaniste collective. Ta révolution devient spirituelle et mystique. Ton challenge est de transformer le monde par la transcendance collective. Ta vision se mystifie. Ton rêve humaniste devient visionnaire.

Tu es appelé à apprendre que le vrai changement social est spirituel. Neptune t'invite à la révolution de conscience. Ton défi est de créer le changement de l'intérieur. Tu apprends la résurrection collective. Ta vision devient celle de l'humanité nouvelle. Tu deviens le visionnaire collectif.

Avec le temps, ta vision devient celle du prophète de l'humanité nouvelle. Ton rêve inspire les millions. Tu guides l'humanité vers son illumination. Tu es le visionnaire dont l'impact transforme les consciouces. Ton message guérit les âmes. Ton héritage est l'humanité transcendée. Tu es le guide de l'évolution humaine.`,
  'Poissons': `Neptune en Poissons — sa propre maison d'honneur — magnifie ta spiritualité infinie au-delà de toute mesure. Ta compassion devient universelle et inconditionnelle. Ta sagesse accède à des niveaux profonds de l'âme et du divin. Tu es le mystique par excellence.

Tu es appelé à apprendre que tu es un canal direct du divin. Neptune amplifie ton intuition sacrée. Ton défi est de rester ancrée tout en accédant aux réalités infinies. Tu apprends à canaliser l'amour divin. Ton pouvoir devient sacré. Tu es le guérisseur mystique universel.

Avec le temps, ta présence devient celle du saint vivant. Ta compassion guérit l'humanité entière. Ta sagesse illumine les âmes perdues. Tu es l'incarnation du divin sur terre. Ta simple présence transforme. Ton héritage est la rédemption collective possible. Tu es le sauveur de l'humanité par l'amour.`,
};

export const PLUTO_INTERPRETATIONS: Record<string, string> = {
  'Bélier': `Pluton en Bélier intensifie ta volonté transformatrice. Ton courage devient invincible à travers les crises. La renaissance personnelle est ta destinée.`,
  'Taureau': `Pluton en Taureau transforme ton rapport à la richesse et à la sécurité. Les crises financières sont tes portes de régénération. La véritable abondance arrive par la détente du contrôle.`,
  'Gémeaux': `Pluton en Gémeaux transforme ta pensée et ta communication. Ton pouvoir croît par la maîtrise des idées. Les mots deviennent tes armes de transformation.`,
  'Cancer': `Pluton en Cancer approfondit ton lien familial et émotionnel. La mort et la renaissance émotionnelles sont tes expériences clés. Les secrets familiaux deviennent ton pouvoir.`,
  'Lion': `Pluton en Lion transforme ton identité et ta créativité. Ton pouvoir personnel s'accroît par les crises d'ego. La renaissance créative est ta destinée.`,
  'Vierge': `Pluton en Vierge transforme ton approche au travail et au service. Ton pouvoir croît par la maîtrise des détails. Les transformations se font pas à pas mais profondément.`,
  'Balance': `Pluton en Balance transforme tes relations et ton sens du partenariat. Les crises relationnelles sont tes portes de pouvoir. La fusion authentique remplace l'harmonie superficielle.`,
  'Scorpion': `Pluton en Scorpion — sa maison d'honneur — magnifie ton pouvoir transformateur. Tu es le phénix incarné, renouvelé par chaque crise. Ta puissance est presque légendaire.`,
  'Sagittaire': `Pluton en Sagittaire transforme ta vision et ta quête spirituelle. Ton pouvoir croît par la mort de tes anciences croyances. La renaissance philosophique est ton chemin.`,
  'Capricorne': `Pluton en Capricorne transforme ton ambition et ton autorité. Les crises de pouvoir sont tes initiations. Tu émerges comme un leader transformateur.`,
  'Verseau': `Pluton en Verseau transforme ta vision humaniste. Ton pouvoir croît par la destruction des anciennes structures. Tu es un agent de transformation collective.`,
  'Poissons': `Pluton en Poissons transforme ta spiritualité et ta compassion. Ton pouvoir croît par la maîtrise de l'invisible. Tu traverses les vies et les morts spirituels avec sagesse.`,
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
