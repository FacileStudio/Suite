export type Category = 'agent' | 'productivity' | 'business' | 'infra' | 'hardware';

export interface App {
	name: string;
	category: Category;
	icon: string;
	url: string;
}

export const LOGO = 'solar:widget-5-bold-duotone';
export const ANTENNE_ICON = 'solar:station-bold-duotone';
export const STUDIO_URL = 'https://facile.studio';
export const GITHUB_URL = 'https://github.com/FacileStudio';
export const REGISTRE_REPO = 'https://github.com/FacileStudio/Registre';
export const SPACES_URL = 'https://sso.facile.studio/spaces';
export const PLACE_URL = 'https://place.facile.studio';
export const SELF_HOST_PATH = '/auto-hebergement';

export const CATEGORIES: (Category | 'all')[] = ['all', 'productivity', 'business', 'agent', 'infra', 'hardware'];

export const APPS: App[] = [
	{ name: 'Bulle', category: 'agent', icon: 'solar:smile-circle-bold-duotone', url: 'https://bulle.facile.studio' },
	{ name: 'Prisme', category: 'productivity', icon: 'solar:chat-round-bold-duotone', url: 'https://prisme.facile.studio' },
	{ name: 'Courrier', category: 'productivity', icon: 'solar:letter-opened-bold-duotone', url: 'https://courrier.facile.studio' },
	{ name: 'Agenda', category: 'productivity', icon: 'solar:calendar-add-bold-duotone', url: 'https://agenda.facile.studio' },
	{ name: 'Echo', category: 'productivity', icon: 'solar:videocamera-record-bold-duotone', url: 'https://echo.facile.studio' },
	{ name: 'Feuilles', category: 'productivity', icon: 'solar:table-minimalistic-bold-duotone', url: 'https://feuilles.facile.studio' },
	{ name: 'Docs', category: 'productivity', icon: 'solar:documents-bold-duotone', url: 'https://docs.facile.studio' },
	{ name: 'Toile', category: 'productivity', icon: 'solar:tablet-bold-duotone', url: 'https://toile.facile.studio' },
	{ name: 'Nuage', category: 'productivity', icon: 'solar:cloud-bold-duotone', url: 'https://nuage.facile.studio' },
	{ name: 'Opus', category: 'productivity', icon: 'solar:slider-vertical-minimalistic-bold-duotone', url: 'https://opus.facile.studio' },
	{ name: 'Sablier', category: 'productivity', icon: 'solar:hourglass-bold-duotone', url: 'https://sablier.facile.studio' },
	{ name: 'Pastille', category: 'hardware', icon: 'solar:circle-dot-bold-duotone', url: 'https://pastille.facile.studio' },
	{ name: 'Fusible', category: 'hardware', icon: 'solar:cpu-bolt-bold-duotone', url: 'https://fusible.facile.studio' },
	{ name: 'Vision', category: 'business', icon: 'solar:panorama-bold-duotone', url: 'https://vision.facile.studio' },
	{ name: 'Glouton', category: 'business', icon: 'solar:magnet-wave-bold-duotone', url: 'https://glouton.facile.studio' },
	{ name: 'Ardoise', category: 'business', icon: 'solar:bill-list-bold-duotone', url: 'https://ardoise.facile.studio' },
	{ name: 'Plume', category: 'business', icon: 'solar:pen-new-square-bold-duotone', url: 'https://plume.facile.studio' },
	{ name: 'Casier', category: 'infra', icon: 'solar:key-minimalistic-square-bold-duotone', url: 'https://casier.facile.studio' },
	{ name: 'Capsule', category: 'infra', icon: 'solar:pill-bold-duotone', url: 'https://capsule.facile.studio' },
	{ name: 'Scribe', category: 'agent', icon: 'solar:microphone-2-bold-duotone', url: 'https://scribe.facile.studio' },
	{ name: 'Journal', category: 'infra', icon: 'solar:notebook-bold-duotone', url: 'https://journal.facile.studio' },
	{ name: 'Sonde', category: 'infra', icon: 'solar:radar-bold-duotone', url: 'https://sonde.facile.studio' },
	{ name: 'Registre', category: 'infra', icon: 'solar:key-square-bold-duotone', url: 'https://sso.facile.studio' },
	{ name: 'Boîte', category: 'infra', icon: 'solar:box-minimalistic-bold-duotone', url: 'https://boite.facile.studio' },
	{ name: 'Place', category: 'productivity', icon: 'solar:cup-hot-bold-duotone', url: 'https://place.facile.studio' },
	{ name: 'Gare', category: 'infra', icon: 'solar:tram-bold-duotone', url: 'https://garev2.facile.studio' }
];

export const COUNT = APPS.length;

export const UI_ICONS = [
	LOGO,
	ANTENNE_ICON,
	'solar:arrow-right-up-linear',
	'solar:arrow-right-linear',
	'solar:check-circle-bold',
	'solar:user-circle-bold-duotone',
	'solar:server-square-bold-duotone',
	'solar:code-square-linear',
	'solar:shield-user-bold-duotone',
	'solar:folder-linear',
	'solar:file-text-linear',
	'solar:gallery-linear',
	'solar:archive-linear',
	'solar:user-plus-linear',
	'solar:calendar-linear',
	'solar:database-bold-duotone',
	'solar:refresh-circle-bold-duotone',
	'solar:global-bold-duotone'
];

export const NAV = [
	{ key: 'apps', href: '/#apps' },
	{ key: 'together', href: '/#connexions' },
	{ key: 'pricing', href: '/#tarifs' }
] as const;

export const COMMITMENT_ICONS = [
	'solar:server-square-bold-duotone',
	'solar:key-square-bold-duotone',
	'solar:database-bold-duotone',
	'solar:refresh-circle-bold-duotone',
	'solar:global-bold-duotone'
];

export const CALENDAR = { personal: '#3b82f6', space: '#8b5cf6' };

export const DEMO = {
	user: 'Léa',
	apps: ['Nuage', 'Agenda', 'Courrier', 'Opus', 'Sablier', 'Ardoise', 'Plume', 'Docs', 'Feuilles', 'Prisme', 'Echo', 'Bulle'],
	rail: ['Nuage', 'Agenda', 'Courrier', 'Opus', 'Docs'],
	fileIcons: ['solar:folder-linear', 'solar:file-text-linear', 'solar:gallery-linear', 'solar:archive-linear'],
	today: 2,
	firstDay: 9,
	hours: [9, 10, 11, 12, 13, 14, 15],
	events: [
		{ day: 0, top: 1, length: 2, color: CALENDAR.personal },
		{ day: 1, top: 4, length: 2, color: CALENDAR.space },
		{ day: 2, top: 0, length: 3, color: CALENDAR.space },
		{ day: 3, top: 3, length: 2, color: CALENDAR.personal },
		{ day: 4, top: 1, length: 2, color: CALENDAR.personal }
	]
};

export const SSO = {
	space: 'Studio Martin',
	owner: { name: 'Léa', email: 'lea@studio-martin.fr' },
	member: { name: 'Hugo', email: 'hugo@studio-martin.fr' },
	apps: ['Opus', 'Sablier', 'Ardoise', 'Plume', 'Nuage', 'Courrier']
};
