const LIGHT_INK = 'oklch(0.985 0 0)';
const DARK_INK = 'oklch(0.145 0 0)';
const LIGHT_INK_LUMA = 0.955;
const DARK_INK_LUMA = 0.0145;

function toLinear(channel: number): number {
	return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
	const raw = hex.trim().replace(/^#/, '');
	const full = raw.length === 3 ? raw.replace(/./g, (c) => c + c) : raw;
	if (!/^[0-9a-fA-F]{6}$/.test(full)) return 0;
	const [r, g, b] = [0, 2, 4].map((i) => toLinear(parseInt(full.slice(i, i + 2), 16) / 255));
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Agenda's `inkOn`: the literal ink that contrasts best with a calendar colour, set inline. */
export function inkOn(fill: string): string {
	const luma = luminance(fill);
	const withLight = (LIGHT_INK_LUMA + 0.05) / (luma + 0.05);
	const withDark = (luma + 0.05) / (DARK_INK_LUMA + 0.05);
	return withLight >= withDark ? LIGHT_INK : DARK_INK;
}
