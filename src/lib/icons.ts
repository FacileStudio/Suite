import { registerIcons, type IconData } from '@facile/muse';
import data from './icons-data.json';

export const ICON_DATA = data as Record<string, IconData>;

/** Registers the Solar glyphs the site draws that muse does not ship. */
export function registerSiteIcons(): void {
	registerIcons(ICON_DATA);
}
