// Copy for the CoStar daily sky: one line per (transit planet × natal planet),
// in a fluid and a tense version. Moon cards change daily, so they get two
// variants each, one of them in the Moon's own voice.
// Tone: dry, concrete wit — never slang (see the Nightstar identity rules).

export type CopyTransitKey = 'moon' | 'sun' | 'mercury' | 'venus' | 'mars';
export type CopyNatalKey =
  | 'sun' | 'moon' | 'mercury' | 'venus' | 'mars'
  | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto';
export type CopyNature = 'fluide' | 'tendu';

type PairLines = Record<CopyNature, string[]>;

export const PAIR_LINES: Record<CopyTransitKey, Record<CopyNatalKey, PairLines>> = {
  moon: {
    sun: {
      fluide: [
        'Ce que tu ressens et ce que tu veux vont dans le même sens. C’est rare : profites-en pour trancher une hésitation.',
        'Ici la Lune. Je te mets d’accord avec toi-même pour quelques heures. Range enfin ce tiroir mental.',
      ],
      tendu: [
        'Ton humeur et tes ambitions tirent chacune de leur côté. Une baisse d’énergie n’est pas un verdict sur ta vie.',
        'Ici la Lune. Je te rends un peu susceptible aujourd’hui. Une remarque anodine reste anodine, même si elle pique.',
      ],
    },
    moon: {
      fluide: [
        'Tes émotions retrouvent leur rythme naturel. Une soirée tranquille et un plat que tu aimes suffiront.',
        'Ici la Lune. Je suis chez moi dans ton thème aujourd’hui. Écoute ton ventre plus que ton agenda.',
      ],
      tendu: [
        'Tes besoins d’aujourd’hui contredisent ceux d’hier. Rien d’anormal : évite seulement de te justifier auprès de tout le monde.',
        'Ici la Lune. Je remue tes habitudes. Si l’envie de tout ranger te prend à minuit, commence par un seul placard.',
      ],
    },
    mercury: {
      fluide: [
        'Tu trouves les mots justes pour dire ce que tu ressens. Bon jour pour l’appel que tu repousses.',
        'Ici la Lune. J’adoucis ta façon de parler. Un message simple fera plus d’effet qu’un long paragraphe.',
      ],
      tendu: [
        'L’émotion colore tout ce que tu lis. Un « ok » sec dans un message n’est peut-être qu’un « ok ».',
        'Ici la Lune. Je brouille un peu ta logique. Relis-toi avant d’envoyer, surtout après 21 h.',
      ],
    },
    venus: {
      fluide: [
        'Tu as envie de douceur, et tu as raison. Un bouquet, une playlist, un message tendre : rien n’est de trop.',
        'Ici la Lune. Je rends ton charme plus visible que d’habitude. Quelqu’un pourrait bien le remarquer.',
      ],
      tendu: [
        'Tu peux attendre plus d’affection qu’on ne sait t’en donner aujourd’hui. Demande-la clairement plutôt que de bouder.',
        'Ici la Lune. J’ouvre l’appétit pour les petits plaisirs. Le panier en ligne peut attendre demain.',
      ],
    },
    mars: {
      fluide: [
        'Ton énergie suit ton humeur, et les deux sont bonnes. Bouge : marche, danse, déplace un meuble.',
        'Ici la Lune. Je te donne du courage. Dis ce qui te dérange, calmement, tant que c’est encore frais.',
      ],
      tendu: [
        'La patience est en rupture de stock. Compte jusqu’à dix avant de répondre, puis encore un peu.',
        'Ici la Lune. J’agace ton Mars. Une file d’attente peut sembler personnelle aujourd’hui. Elle ne l’est pas.',
      ],
    },
    jupiter: {
      fluide: [
        'Un optimisme léger t’accompagne. Dis oui à l’invitation imprévue.',
        'Ici la Lune. J’élargis ta générosité. Offre un café : il te reviendra sous une autre forme.',
      ],
      tendu: [
        'Tout te paraît possible, y compris ce qui ne l’est pas. Garde l’enthousiasme, raccourcis la liste.',
        'Ici la Lune. J’agrandis tout aujourd’hui, l’appétit compris. Une part suffit.',
      ],
    },
    saturn: {
      fluide: [
        'Ton sérieux te rend fiable sans te rendre rigide. Parfait pour régler une affaire administrative.',
        'Ici la Lune. Je t’aide à ranger tes émotions dans des cases solides. Fais le point sur ce qui compte vraiment.',
      ],
      tendu: [
        'Une petite mélancolie peut passer. Elle parle de ta fatigue, pas de ton avenir.',
        'Ici la Lune. Je durcis ton regard sur toi-même. Baisse la barre d’un cran : personne ne te note.',
      ],
    },
    uranus: {
      fluide: [
        'Envie de changer de décor ? Change au moins d’itinéraire, de café ou de coiffure.',
        'Ici la Lune. Je t’envoie une idée inattendue. Note-la avant qu’elle ne s’envole.',
      ],
      tendu: [
        'Ton humeur change plus vite que la météo. Évite les décisions définitives avant ce soir.',
        'Ici la Lune. Je te rends allergique à la routine. Une petite rébellion suffit, pas une démission.',
      ],
    },
    neptune: {
      fluide: [
        'Ton intuition est fine aujourd’hui. La première impression tend à être la bonne.',
        'Ici la Lune. Je t’ouvre aux rêves. Garde un carnet près du lit cette nuit.',
      ],
      tendu: [
        'Ce soir, tout ressemble à un signe : une chanson, un nuage, une publicité. Respire, ce n’en est pas forcément un.',
        'Ici la Lune. Je brouille les contours. Ne prête pas d’argent et ne promets rien de flou.',
      ],
    },
    pluto: {
      fluide: [
        'Tu lis facilement les intentions des autres. Utilise ce radar avec tact.',
        'Ici la Lune. Je t’aide à lâcher une vieille rancune. Pas besoin de l’annoncer : laisse-la partir.',
      ],
      tendu: [
        'Une émotion intense peut remonter sans prévenir. Elle mérite d’être écoutée, pas d’être jouée en public.',
        'Ici la Lune. Je réveille un vieux soupçon. Vérifie les faits avant de mener l’enquête.',
      ],
    },
  },
  sun: {
    sun: {
      fluide: ['Ta vitalité est au rendez-vous. Montre ce que tu fais, même ce qui n’est pas terminé.'],
      tendu: ['Tu peux douter de ta direction en ce moment. C’est le moment de réajuster, pas de tout jeter.'],
    },
    moon: {
      fluide: ['Ce que tu veux et ce dont tu as besoin s’accordent. Offre-toi un moment chez toi qui te ressemble.'],
      tendu: ['Le travail réclame ta présence, la maison aussi. Choisis un camp par demi-journée, pas les deux à la fois.'],
    },
    mercury: {
      fluide: ['Tes idées gagnent en clarté. Présente ton projet, écris ce texte, défends ce plan.'],
      tendu: ['Tu as tendance à vouloir le dernier mot. Gagne plutôt la conversation suivante.'],
    },
    venus: {
      fluide: ['Tu plais, et ça se voit. Bonne période pour une photo, un rendez-vous, un vêtement neuf.'],
      tendu: ['L’envie de plaire peut coûter cher. Vérifie le prix avant de dire oui, au propre comme au figuré.'],
    },
    mars: {
      fluide: ['Ton énergie est disponible et bien dirigée. Lance ce projet sportif ou ce chantier repoussé.'],
      tendu: ['Ta mèche est courte en ce moment. Mets l’énergie dans l’effort physique plutôt que dans la dispute.'],
    },
    jupiter: {
      fluide: ['Chance et confiance se donnent rendez-vous. Postule, demande, propose.'],
      tendu: ['Tu peux surestimer ce qui tient dans une journée. Promets moitié moins, livre le double.'],
    },
    saturn: {
      fluide: ['L’effort paie concrètement. Bonne période pour poser une base solide : contrat, budget, routine.'],
      tendu: ['Les obstacles semblent plus hauts que d’habitude. C’est surtout la fatigue qui les grandit.'],
    },
    uranus: {
      fluide: ['Un vent de liberté souffle sur tes habitudes. Teste une nouveauté, même minuscule.'],
      tendu: ['Tu supportes mal les cadres en ce moment. Change la règle qui te gêne, pas toutes les autres avec.'],
    },
    neptune: {
      fluide: ['Ton imagination est éclairée. Dessine, écris, rêve à voix haute.'],
      tendu: ['Ton énergie avance dans le brouillard. Dors davantage, décide moins.'],
    },
    pluto: {
      fluide: ['Tu as la force de transformer une habitude en profondeur. Choisis-en une seule.'],
      tendu: ['Une lutte de pouvoir peut s’inviter au travail ou à la maison. Tu n’as pas à gagner chaque bras de fer.'],
    },
  },
  mercury: {
    sun: {
      fluide: ['Tu dis ce que tu penses et on t’écoute. Bon moment pour te présenter ou défendre une idée.'],
      tendu: ['Tu risques de parler de toi plus que prévu. Pose deux questions pour chaque anecdote racontée.'],
    },
    moon: {
      fluide: ['Les conversations du cœur coulent facilement. Appelle quelqu’un de ta famille.'],
      tendu: ['Un message peut te paraître plus froid qu’il ne l’est. Demande avant de conclure.'],
    },
    mercury: {
      fluide: ['Ton esprit est vif et organisé. Attaque la paperasse : elle n’a aucune chance.'],
      tendu: ['Trop d’onglets ouverts, dans ton navigateur comme dans ta tête. Ferme-en la moitié.'],
    },
    venus: {
      fluide: ['Tu sais dire les choses avec grâce. Glisse un compliment sincère, il fera son chemin.'],
      tendu: ['Tu peux dire oui par simple amabilité. « Je te redis » reste une réponse polie.'],
    },
    mars: {
      fluide: ['Tu as l’argument juste et le ton qui va avec. Négocie.'],
      tendu: ['Les échanges peuvent s’échauffer vite. Évite les débats en commentaire : personne n’y change d’avis.'],
    },
    jupiter: {
      fluide: ['Grandes idées, bonne mémoire, bonne humeur. Ouvre la discussion sur le projet ambitieux.'],
      tendu: ['Tu as raison sur beaucoup de choses en ce moment. Pas sur toutes. Choisis tes batailles.'],
    },
    saturn: {
      fluide: ['Ta pensée est précise et patiente. Relis ce contrat : tu verras ce que les autres ratent.'],
      tendu: ['Les mots viennent lentement, les critiques vite. Ne juge pas ton travail avant demain.'],
    },
    uranus: {
      fluide: ['Une idée brillante peut surgir sous la douche. Garde de quoi noter à portée de main.'],
      tendu: ['Ton esprit zappe sans arrêt. Une tâche à la fois, minuteur à l’appui.'],
    },
    neptune: {
      fluide: ['Ta pensée devient poétique. Bon moment pour écrire, composer, raconter.'],
      tendu: ['Les détails t’échappent. Vérifie l’heure et l’adresse du rendez-vous avant de partir.'],
    },
    pluto: {
      fluide: ['Tu vas au fond des choses. Pose la question que personne n’ose poser.'],
      tendu: ['La conversation peut glisser vers les secrets. Ce qu’on te confie reste entre vous.'],
    },
  },
  venus: {
    sun: {
      fluide: ['Ton charme brille sans effort. Accepte les compliments sans les minimiser.'],
      tendu: ['Tu peux chercher l’approbation plus que d’habitude. Fais-toi plaisir pour toi, pas pour la galerie.'],
    },
    moon: {
      fluide: ['Envie de cocon. Une soirée simple avec les bonnes personnes vaut toutes les sorties.'],
      tendu: ['Tu peux confondre réconfort et sucre. Un appel à un proche nourrit mieux.'],
    },
    mercury: {
      fluide: ['Tes mots ont du charme. Écris enfin le message que tu réécris dans ta tête depuis des jours.'],
      tendu: ['Tu peux enrober la vérité de trop de sucre. Dis-la gentiment, mais dis-la.'],
    },
    venus: {
      fluide: ['Ton goût est sûr et ton cœur ouvert. Bonne période pour un rendez-vous ou un bel achat durable.'],
      tendu: ['Tes désirs et ton budget ne sont pas d’accord. Mets l’article dans le panier, décide dans trois jours.'],
    },
    mars: {
      fluide: ['Désir et action s’accordent. Fais le premier pas, avec élégance.'],
      tendu: ['Attirance et agacement se ressemblent beaucoup en ce moment. Prends le temps de savoir lequel tu ressens.'],
    },
    jupiter: {
      fluide: ['Générosité dans l’air : on t’offre, tu offres. Accepte l’invitation.'],
      tendu: ['Le « juste un dernier » guette, au dessert comme en boutique. Fixe la limite avant de sortir.'],
    },
    saturn: {
      fluide: ['Les liens durables se consolident. Bon moment pour un engagement sérieux, même petit.'],
      tendu: ['L’affection te semble rationnée. Elle n’a pas disparu, elle se fait discrète.'],
    },
    uranus: {
      fluide: ['Une rencontre ou une envie inattendue pimente la semaine. Laisse-lui une chance.'],
      tendu: ['Tu as besoin d’air dans tes relations. Dis-le avant de disparaître sans prévenir.'],
    },
    neptune: {
      fluide: ['Romantisme en hausse. Un film, une lettre, un coucher de soleil : assume le cliché.'],
      tendu: ['Tu peux idéaliser quelqu’un. Regarde ses actes autant que ses mots.'],
    },
    pluto: {
      fluide: ['Une attirance profonde peut se révéler. Laisse-la venir sans tout contrôler.'],
      tendu: ['La jalousie peut pointer le bout de son nez. Elle en dit plus sur ton besoin que sur l’autre.'],
    },
  },
  mars: {
    sun: {
      fluide: ['Tu as de l’énergie à revendre. Attaque la tâche la plus difficile en premier.'],
      tendu: ['Une remarque peut sonner comme une provocation. Dans neuf cas sur dix, ce n’en est pas une.'],
    },
    moon: {
      fluide: ['Tu défends bien ceux que tu aimes. Règle ce problème domestique qui traîne.'],
      tendu: ['L’irritation peut monter à la maison. Sors marcher avant de parler de la vaisselle.'],
    },
    mercury: {
      fluide: ['Ta pensée est rapide et tranchante. Bon moment pour prendre une décision bloquée.'],
      tendu: ['Tu peux répondre trop vite et trop fort. Brouillon d’abord, envoi ensuite.'],
    },
    venus: {
      fluide: ['Le désir est franc et réciproque. Propose, invite, ose.'],
      tendu: ['Tu peux tout vouloir tout de suite, en amour comme en shopping. Attends vingt-quatre heures.'],
    },
    mars: {
      fluide: ['Ton moteur tourne rond. Reprends le sport ou lance-toi un défi physique.'],
      tendu: ['Énergie abondante, patience minime. Mets-la dans un effort qui fait transpirer.'],
    },
    jupiter: {
      fluide: ['Ton audace est bien placée. Vise un cran plus haut que d’habitude.'],
      tendu: ['Tu veux tout faire, tout de suite, en grand. Commence par une seule chose, en petit.'],
    },
    saturn: {
      fluide: ['Effort régulier, résultats solides. Le travail ingrat avance enfin.'],
      tendu: ['Tu as l’impression de pousser un mur. Change d’angle plutôt que de pousser plus fort.'],
    },
    uranus: {
      fluide: ['Un coup d’audace peut débloquer une situation figée. Ose le geste inhabituel.'],
      tendu: ['Gare aux gestes brusques, au volant comme en cuisine. Ralentis d’un temps.'],
    },
    neptune: {
      fluide: ['Ton énergie sert une cause qui te touche. Engage-toi pour quelque chose de plus grand que toi.'],
      tendu: ['L’énergie fuit sans que tu saches où. Dors, bois de l’eau, garde l’effort intense pour demain.'],
    },
    pluto: {
      fluide: ['Ta volonté est peu commune en ce moment. Attaque ce que tu repousses depuis des mois.'],
      tendu: ['Les rapports de force s’intensifient. Choisis tes combats, laisse tomber les autres.'],
    },
  },
};

type YesNo = { oui: string[]; non: string[] };

// Everything below is keyed by the NATAL planet a transit touches — the area
// of the user's own chart that is activated today.

// "Oui / Non du jour": concrete, slightly playful items.
export const YES_NO: Record<CopyNatalKey, Record<CopyNature, YesNo>> = {
  sun: {
    fluide: { oui: ['te montrer', 'la lumière du matin', 'signer de ton nom', 'les photos de toi'], non: ['la fausse modestie', 'attendre la permission', 'rester en coulisses', 'les excuses inutiles'] },
    tendu: { oui: ['une sieste', 'déléguer', 'un déjeuner en solitaire', 'revoir le plan'], non: ['vouloir avoir raison', 'les comparaisons', 'les grands discours', 'scruter ton reflet'] },
  },
  moon: {
    fluide: { oui: ['un bain chaud', 'les vieilles photos', 'cuisiner maison', 'dormir tôt'], non: ['le café après 16 h', 'les plans trop serrés', 'ignorer ta fatigue', 'les dîners debout'] },
    tendu: { oui: ['une tisane', 'un plaid', 'marcher sans écouteurs', 'annuler sans culpabiliser'], non: ['relire de vieux messages', 'les débats en famille', 'répondre à chaud', 'les réseaux après minuit'] },
  },
  mercury: {
    fluide: { oui: ['les listes', 'le thé noir', 'les messages vocaux', 'un mot nouveau'], non: ['les phrases à rallonge', 'les notifications', 'oublier de noter', 'le mail repoussé'] },
    tendu: { oui: ['relire deux fois', 'l’agenda papier', 'les questions simples', 'un brouillon'], non: ['les débats en commentaire', 'signer sans lire', 'l’ironie par écrit', 'les rumeurs'] },
  },
  venus: {
    fluide: { oui: ['les fleurs', 'un parfum', 'un compliment précis', 'le chocolat noir'], non: ['les tenues tristes', 'bouder', 'les dîners pressés', 'les achats sans coup de cœur'] },
    tendu: { oui: ['dire non poliment', 'une soirée à la maison', 'comparer les prix', 'un vieux pull'], non: ['les achats après 23 h', 'le profil d’un ex', 'la jalousie', 'les promesses du soir'] },
  },
  mars: {
    fluide: { oui: ['le sport', 'les escaliers', 'le plus dur d’abord', 'les épices'], non: ['les demi-mesures', 'reporter l’effort', 'les excuses molles', 'le canapé toute la soirée'] },
    tendu: { oui: ['une course', 'l’eau froide', 'ranger un placard', 'respirer avant de répondre'], non: ['klaxonner', 'les messages en majuscules', 'l’ironie en réunion', 'les coups de tête'] },
  },
  jupiter: {
    fluide: { oui: ['les invitations', 'voir grand', 'un pourboire généreux', 'les librairies'], non: ['la frilosité', 'dire « on verra »', 'les calculs mesquins', 'rester chez toi par habitude'] },
    tendu: { oui: ['une seule priorité', 'les petites portions', 'un budget écrit', 'finir avant de commencer'], non: ['le buffet à volonté', 'promettre trop', 'les paris', 'le « juste un dernier »'] },
  },
  saturn: {
    fluide: { oui: ['les routines', 'un tableur bien rangé', 'le travail de fond', 'les engagements clairs'], non: ['l’improvisation', 'remettre à demain', 'les raccourcis', 'le bureau en désordre'] },
    tendu: { oui: ['une pause de dix minutes', 'les petites victoires', 'dormir huit heures', 'demander de l’aide'], non: ['l’autocritique', 'les heures supplémentaires', 'les bilans à minuit', 'tout porter en solitaire'] },
  },
  uranus: {
    fluide: { oui: ['un nouveau trajet', 'une musique inconnue', 'les idées folles', 'changer la déco'], non: ['la routine par réflexe', 'le menu habituel', '« on a toujours fait comme ça »', 'les cases trop étroites'] },
    tendu: { oui: ['une heure de calme', 'une seule nouveauté', 'respirer avant de décider', 'un horaire fixe'], non: ['démissionner sur un coup de tête', 'les changements radicaux', 'couper les ponts', 'les achats compulsifs'] },
  },
  neptune: {
    fluide: { oui: ['un carnet de rêves', 'la musique en boucle', 'une balade au bord de l’eau', 'ta première intuition'], non: ['la logique froide', 'le bruit de fond', 'les journées minutées', 'les écrans en continu'] },
    tendu: { oui: ['un grand verre d’eau', 'vérifier les faits', 'tout écrire noir sur blanc', 'une sieste'], non: ['prêter de l’argent', 'les promesses floues', 'l’alcool en semaine', 'croire tout ce qu’on te dit'] },
  },
  pluto: {
    fluide: { oui: ['le grand tri', 'les conversations profondes', 'une vérité dite avec tact', 'lâcher prise'], non: ['garder par culpabilité', 'les sujets en surface', 'les vieilles rancunes', 'faire semblant'] },
    tendu: { oui: ['laisser couler', 'un journal intime', 'un effort physique intense', 'la transparence'], non: ['fouiller un téléphone', 'les luttes de pouvoir', 'le dernier mot à tout prix', 'ruminer le passé'] },
  },
};

// "Ton défi du jour": one concrete micro-action for the life area touched.
export const MISSIONS: Record<CopyNatalKey, Record<CopyNature, string[]>> = {
  sun: {
    fluide: ['Raconte à quelqu’un une réussite récente, sans la minimiser.', 'Prends une décision qui ne dépend que de toi, et tiens-la.', 'Mets-toi au premier rang : réunion, cours ou photo de groupe.', 'Écris en une phrase ce que tu veux pour les six prochains mois.'],
    tendu: ['Laisse quelqu’un d’autre avoir raison une fois aujourd’hui.', 'Annule une obligation qui ne sert que ton image.', 'Demande de l’aide pour une chose que tu fais toujours en solitaire.', 'Accepte une critique sans te justifier, puis garde ce qui est utile.'],
  },
  moon: {
    fluide: ['Cuisine quelque chose qui te rappelle ton enfance.', 'Écris trois choses qui t’ont fait du bien aujourd’hui.', 'Appelle quelqu’un juste pour prendre des nouvelles.', 'Range un coin de ton chez-toi qui te pèse depuis longtemps.'],
    tendu: ['Nomme ton émotion du moment en un seul mot, avant de réagir.', 'Offre-toi une heure sans écran avant de dormir.', 'Dis non à une sollicitation qui t’épuise, sans te justifier.', 'Écris ce qui te pèse sur un papier, puis jette-le.'],
  },
  mercury: {
    fluide: ['Envoie le message que tu repousses depuis une semaine.', 'Apprends un mot nouveau et place-le dans une conversation.', 'Lis dix pages d’un livre au lieu de faire défiler ton téléphone.', 'Explique en deux minutes une idée qui te tient à cœur.'],
    tendu: ['Relis deux fois un message important avant de l’envoyer.', 'Pose une question au lieu de supposer la réponse.', 'Passe une heure entière sans notifications.', 'Vide ta tête sur papier, puis entoure une seule priorité.'],
  },
  venus: {
    fluide: ['Fais un compliment précis, pas juste « c’est joli ».', 'Offre-toi une petite chose belle, à moins de dix euros.', 'Porte la tenue que tu gardes pour une grande occasion.', 'Envoie un message tendre à quelqu’un, sans raison particulière.'],
    tendu: ['Laisse un achat dans le panier vingt-quatre heures.', 'Exprime un besoin affectif en une seule phrase claire.', 'Passe la soirée sans vérifier qui a vu ta story.', 'Décline une invitation qui ne te fait pas envie.'],
  },
  mars: {
    fluide: ['Fais la tâche la plus pénible de ta liste avant midi.', 'Bouge vingt minutes, peu importe comment.', 'Demande clairement à quelqu’un ce que tu veux.', 'Commence ce projet repoussé, ne serait-ce que cinq minutes.'],
    tendu: ['Attends dix minutes avant de répondre à ce qui t’agace.', 'Transforme ton agacement en effort : marche, course ou ménage.', 'Abandonne un débat que tu n’as pas besoin de gagner.', 'Prends l’escalier chaque fois que c’est possible aujourd’hui.'],
  },
  jupiter: {
    fluide: ['Dis oui à une proposition inattendue.', 'Demande quelque chose de plus grand que d’habitude.', 'Offre un café à quelqu’un, sans raison.', 'Apprends une chose sur une culture que tu connais mal.'],
    tendu: ['Raye la moitié de ta liste du jour.', 'Ne fais qu’une seule promesse aujourd’hui, et tiens-la.', 'Avant chaque achat, attends une heure.', 'Termine une chose commencée avant d’en lancer une nouvelle.'],
  },
  saturn: {
    fluide: ['Avance trente minutes sur une tâche de fond, sans interruption.', 'Range le dossier administratif que tu évites.', 'Fixe-toi une règle simple pour la semaine et note-la.', 'Fais une chose dont tu te remercieras dans un an.'],
    tendu: ['Termine ta journée à heure fixe, sans négocier.', 'Note ce soir une chose réussie, même petite.', 'Découpe la tâche qui t’écrase en trois étapes minuscules.', 'Refuse une responsabilité qui n’est pas la tienne.'],
  },
  uranus: {
    fluide: ['Prends un chemin que tu n’as jamais emprunté.', 'Essaie un plat, une musique ou un lieu inconnu.', 'Change une habitude, pour une seule journée.', 'Note l’idée la plus folle qui te traverse l’esprit.'],
    tendu: ['Garde une chose stable aujourd’hui : ton heure de coucher.', 'Avant de tout changer, change un seul détail.', 'Respire trois fois avant chaque décision impulsive.', 'Prends dix minutes rien que pour toi, sans téléphone.'],
  },
  neptune: {
    fluide: ['Écris ton rêve de la nuit dès le réveil.', 'Écoute un album en entier, les yeux fermés.', 'Suis ta première intuition sur un petit choix.', 'Dessine quelque chose, même maladroitement.'],
    tendu: ['Vérifie une information avant de la partager.', 'Bois deux grands verres d’eau de plus que d’habitude.', 'Dis clairement une chose que tu laisses d’habitude dans le flou.', 'Couche-toi trente minutes plus tôt.'],
  },
  pluto: {
    fluide: ['Débarrasse-toi d’un objet que tu gardes par culpabilité.', 'Pose la question que tu n’oses pas poser.', 'Lâche une vieille rancune, sans l’annoncer.', 'Supprime une application qui te vole du temps.'],
    tendu: ['Laisse quelqu’un décider à ta place, sur un sujet sans importance.', 'Note ce qui te met en colère, puis ce que cette colère protège.', 'Ne fouille rien aujourd’hui : ni téléphone, ni passé.', 'Remplace un « toujours » ou un « jamais » par « parfois ».'],
  },
};
