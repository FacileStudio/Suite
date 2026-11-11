export type Category = 'agent' | 'productivity' | 'business' | 'infra' | 'hardware';

export interface App {
	name: string;
	category: Category;
	icon: string;
	url: string;
	line: string;
}

export const LOGO = 'solar:widget-5-bold-duotone';
export const ANTENNE_ICON = 'solar:station-bold-duotone';
export const STUDIO_URL = 'https://facile.studio';
export const GITHUB_URL = 'https://github.com/FacileStudio';
export const SPACES_URL = 'https://sso.facile.studio/spaces';

export const CATEGORIES: { id: Category | 'all'; label: string }[] = [
	{ id: 'all', label: 'Tout' },
	{ id: 'productivity', label: 'Productivité' },
	{ id: 'business', label: 'Business' },
	{ id: 'agent', label: 'IA & agents' },
	{ id: 'infra', label: 'Infrastructure' },
	{ id: 'hardware', label: 'Hardware' }
];

export const APPS: App[] = [
	{ name: 'Bulle', category: 'agent', icon: 'solar:smile-circle-bold-duotone', url: 'https://bulle.facile.studio', line: 'Compagnon IA autonome dans sa microVM dédiée.' },
	{ name: 'Prisme', category: 'productivity', icon: 'solar:chat-round-dots-bold-duotone', url: 'https://prisme.facile.studio', line: "Messagerie d'équipe et salons connectés sur Matrix." },
	{ name: 'Courrier', category: 'productivity', icon: 'solar:letter-opened-bold-duotone', url: 'https://courrier.facile.studio', line: 'Votre email chez vous, IMAP et SMTP natifs.' },
	{ name: 'Agenda', category: 'productivity', icon: 'solar:calendar-add-bold-duotone', url: 'https://agenda.facile.studio', line: 'Le calendrier partagé du studio, en CalDAV.' },
	{ name: 'Echo', category: 'productivity', icon: 'solar:videocamera-record-bold-duotone', url: 'https://echo.facile.studio', line: 'Visioconférence chiffrée sans installation.' },
	{ name: 'Feuilles', category: 'productivity', icon: 'solar:clipboard-list-bold-duotone', url: 'https://feuilles.facile.studio', line: 'Tableur collaboratif IronCalc, xlsx et MCP.' },
	{ name: 'Docs', category: 'productivity', icon: 'solar:document-text-bold-duotone', url: 'https://docs.facile.studio', line: 'Documents écrits à plusieurs en temps réel, export PDF.' },
	{ name: 'Toile', category: 'productivity', icon: 'solar:pallete-2-bold-duotone', url: 'https://toile.facile.studio', line: 'Un tableau blanc infini à partager.' },
	{ name: 'Nuage', category: 'infra', icon: 'solar:cloud-bold-duotone', url: 'https://nuage.facile.studio', line: 'Le stockage fichiers du studio, compatible S3.' },
	{ name: 'Opus', category: 'productivity', icon: 'solar:slider-vertical-minimalistic-bold-duotone', url: 'https://opus.facile.studio', line: 'La gestion de projet qui ne vous ralentit pas.' },
	{ name: 'Sablier', category: 'productivity', icon: 'solar:hourglass-bold-duotone', url: 'https://sablier.facile.studio', line: 'Vos heures facturables, suivies en un clic.' },
	{ name: 'Pastille', category: 'hardware', icon: 'solar:circle-dot-bold-duotone', url: 'https://pastille.facile.studio', line: 'Balise vocale et capteur connecté libre de 38 mm.' },
	{ name: 'Fusible', category: 'hardware', icon: 'solar:cpu-bolt-bold-duotone', url: 'https://fusible.facile.studio', line: 'Cartes, firmware et boîtiers dans un seul projet vérifié.' },
	{ name: 'Vision', category: 'business', icon: 'solar:panorama-bold-duotone', url: 'https://vision.facile.studio', line: "L'analytique web sans cookie, conforme RGPD." },
	{ name: 'Glouton', category: 'business', icon: 'solar:magnet-wave-bold-duotone', url: 'https://glouton.facile.studio', line: 'Vos prochains clients trouvés pendant que vous dormez.' },
	{ name: 'Ardoise', category: 'business', icon: 'solar:bill-list-bold-duotone', url: 'https://ardoise.facile.studio', line: 'Facturez, encaissez, oubliez.' },
	{ name: 'Plume', category: 'business', icon: 'solar:pen-new-square-bold-duotone', url: 'https://plume.facile.studio', line: 'La signature électronique, sans usine à gaz.' },
	{ name: 'Casier', category: 'infra', icon: 'solar:key-minimalistic-square-bold-duotone', url: 'https://casier.facile.studio', line: "Coffre-fort à secrets pour toute l'équipe." },
	{ name: 'Capsule', category: 'infra', icon: 'solar:pill-bold-duotone', url: 'https://capsule.facile.studio', line: "Partagez un secret qui s'autodétruit." },
	{ name: 'Scribe', category: 'agent', icon: 'solar:microphone-2-bold-duotone', url: 'https://scribe.facile.studio', line: 'Transcription audio et comptes-rendus de réunion.' },
	{ name: 'Journal', category: 'infra', icon: 'solar:notebook-bold-duotone', url: 'https://journal.facile.studio', line: "Logs centralisés pour toute l'infrastructure." },
	{ name: 'Sonde', category: 'infra', icon: 'solar:radar-bold-duotone', url: 'https://sonde.facile.studio', line: 'Surveillance de disponibilité et page de statut.' },
	{ name: 'Registre', category: 'infra', icon: 'solar:key-square-bold-duotone', url: 'https://sso.facile.studio', line: "Un seul compte pour tout l'écosystème." },
	{ name: 'Boîte', category: 'infra', icon: 'solar:box-minimalistic-bold-duotone', url: 'https://boite.facile.studio', line: 'Paquets, images Docker et artéfacts privés.' },
	{ name: 'Place', category: 'productivity', icon: 'solar:users-group-rounded-bold-duotone', url: 'https://place.facile.studio', line: 'Le forum de la communauté Facile, relié à Discord.' }
];

export const COUNT = APPS.length;

export const UI_ICONS = [
	LOGO,
	ANTENNE_ICON,
	'solar:arrow-right-up-linear',
	'solar:arrow-right-linear',
	'solar:arrow-down-linear',
	'solar:play-bold',
	'solar:check-circle-bold',
	'solar:user-circle-bold-duotone',
	'solar:server-square-bold-duotone',
	'solar:code-square-linear',
	'solar:link-round-angle-bold-duotone',
	'solar:shield-user-bold-duotone'
];

export const NAV = [
	{ label: 'Apps', href: '#apps' },
	{ label: 'Connexions', href: '#connexions' },
	{ label: 'Tarifs', href: '#tarifs' }
];

export const HERO = {
	eyebrow: ['Auto-hébergé', 'Open source', 'Un seul compte'],
	title: 'On simplifie, vous créez.',
	sub: `${COUNT} outils qui se parlent, sur votre serveur. Projets, temps, factures, signatures, fichiers et logs avec un seul compte.`,
	primary: 'Voir les tarifs',
	secondary: 'Parcourir les apps'
};

export const DEMO = {
	label: 'Une tâche Opus lance un chrono Sablier, le temps part en facture Ardoise, puis Plume reçoit la signature du client.',
	project: 'Atelier Martin',
	task: 'Refonte de la page d’accueil',
	newTask: 'Nouvelle tâche',
	start: 'Lancer',
	bill: 'Facturer',
	invoice: 'Facture F-041',
	invoiceLine: '2 h 30 · Refonte de la page d’accueil',
	signature: 'Devis signé par Atelier Martin',
	feed: 'Antenne',
	events: {
		task: 'Tâche créée',
		timer: 'Chrono lancé',
		invoice: 'Facture émise',
		signed: 'Document signé'
	}
};

export const APPS_SECTION = {
	title: 'Une app par métier',
	text: 'Chaque outil fait une chose bien. Prenez ceux dont vous avez besoin, ils partagent le même compte.',
	filter: 'Filtrer par catégorie',
	open: 'Ouvrir'
};

export const GRAPH = {
	title: 'Tout est relié',
	text: 'Antenne est le bus d’événements de la suite. Une app publie ce qui se passe, les autres réagissent : une tâche lance un chrono, un chrono devient une facture, une facture attend sa signature.',
	label: `Graphe des ${COUNT} apps de la suite reliées à Antenne, au centre`,
	points: [
		{ title: 'Des événements, pas des exports', text: 'Les données passent d’une app à l’autre au moment où elles changent.' },
		{ title: 'Des API ouvertes', text: 'Chaque app expose une API et un serveur MCP, pour vos scripts comme pour vos agents.' }
	]
};

export const SSO = {
	title: 'Une connexion. Toutes les apps.',
	text: 'Registre gère l’identité de toute la suite en OpenID Connect. Vous vous connectez une fois et passez d’Opus à Ardoise sans revoir un écran de login.',
	account: 'Vous',
	space: 'Studio Martin',
	connected: 'Connecté',
	points: [
		{ icon: 'solar:link-round-angle-bold-duotone', title: 'SSO intégré', text: 'Un seul jeton OpenID Connect pour toute la suite.' },
		{ icon: 'solar:shield-user-bold-duotone', title: 'Équipe centralisée', text: 'Ajoutez un membre une fois, il a accès partout. Retirez-le, c’est fini partout.' },
		{ icon: 'solar:server-square-bold-duotone', title: 'Votre serveur, vos règles', text: 'Aucun tiers dans la boucle. Vos identifiants restent chez vous.' }
	],
	apps: ['Opus', 'Sablier', 'Ardoise', 'Plume', 'Nuage', 'Courrier']
};

export const TARIFS = {
	title: 'Un compte. Toute la suite.',
	text: 'Votre compte Facile ouvre chaque outil de la suite. Créer votre espace est gratuit et prend une minute.',
	cta: 'Créer mon espace'
};

export const ABOUT = {
	title: 'Quatre humains. Zéro bullshit.',
	text: 'Deux devs, deux designers. On construit les outils qu’on utilise tous les jours. Pas de roadmap à rallonge, pas de features pour les investisseurs. Juste ce qui marche, en open source.',
	studio: 'Découvrir Facile',
	code: 'Voir le code'
};

export const FOOTER = {
	tagline: 'Les outils du studio, sur votre serveur.',
	suite: 'La suite',
	facile: 'Facile',
	studio: 'facile.studio',
	github: 'GitHub',
	community: 'Communauté'
};

export const THEME = { toLight: 'Passer en thème clair', toDark: 'Passer en thème sombre' };
