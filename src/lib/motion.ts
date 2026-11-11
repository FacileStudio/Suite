import { prefersReducedMotion } from '@facile/muse';

/**
 * Svelte action that fades an element and its `[data-reveal-item]` children up when scrolled into view.
 */
export function scrollReveal(node: HTMLElement, opts: { stagger?: number } = {}) {
	if (typeof window === 'undefined' || prefersReducedMotion()) return {};
	const items = Array.from(node.querySelectorAll<HTMLElement>('[data-reveal-item]'));
	const targets = items.length > 0 ? items : [node];
	targets.forEach((el, i) => {
		el.classList.add('reveal');
		el.style.transitionDelay = `${i * (opts.stagger ?? 70)}ms`;
	});
	const observer = new IntersectionObserver(
		(entries) => {
			if (!entries.some((entry) => entry.isIntersecting)) return;
			observer.disconnect();
			targets.forEach((el) => el.classList.add('revealed'));
		},
		{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
	);
	observer.observe(node);
	return {
		destroy() {
			observer.disconnect();
		}
	};
}
