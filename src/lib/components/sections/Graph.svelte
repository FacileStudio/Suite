<script lang="ts">
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from '@facile/muse';
	import { ANTENNE_ICON, APPS, GRAPH } from '$lib/content';
	import { ICON_DATA } from '$lib/icons';
	import { scrollReveal } from '$lib/motion';

	const S = 720;
	const C = S / 2;
	const R = 300;
	const NODE = 32;
	const ICON = 1.6;
	const HUB = 62;

	const nodes = APPS.map((app, i) => {
		const a = -Math.PI / 2 + ((Math.PI * 2) / APPS.length) * i;
		return {
			...app,
			i,
			x: Math.round((C + R * Math.cos(a)) * 100) / 100,
			y: Math.round((C + R * Math.sin(a)) * 100) / 100,
			body: ICON_DATA[app.icon]?.body ?? ''
		};
	});

	let root = $state<HTMLElement>();
	let active = $state(false);
	let motion = $state(false);

	onMount(() => {
		motion = !prefersReducedMotion();
		if (!motion || !root) {
			active = true;
			return;
		}
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				active = true;
				observer.disconnect();
			},
			{ threshold: 0.2 }
		);
		observer.observe(root);
		return () => observer.disconnect();
	});
</script>

<section
	id="connexions"
	aria-labelledby="connexions-title"
	use:scrollReveal
	class="grid scroll-mt-24 items-center gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12"
>
	<div data-reveal-item class="flex flex-col gap-6">
		<div class="flex flex-col gap-2">
			<h2 id="connexions-title" class="text-fc-xl font-bold tracking-tight text-fc-fg sm:text-fc-2xl">
				{GRAPH.title}
			</h2>
			<p class="text-fc-md text-fc-fg-muted">{GRAPH.text}</p>
		</div>
		<dl class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
			{#each GRAPH.points as point (point.title)}
				<div class="flex flex-col gap-1 rounded-fc-lg bg-fc-component p-4">
					<dt class="text-fc-sm font-bold text-fc-fg">{point.title}</dt>
					<dd class="text-fc-sm text-fc-fg-muted">{point.text}</dd>
				</div>
			{/each}
		</dl>
	</div>

	<div data-reveal-item bind:this={root} class="graph rounded-fc-lg bg-fc-component p-2 sm:p-6" class:active>
		<svg viewBox="0 0 {S} {S}" xmlns="http://www.w3.org/2000/svg" class="mx-auto block aspect-square h-auto w-full max-w-xl" role="img" aria-label={GRAPH.label}>
			{#each nodes as n (n.name)}
				<line x1={C} y1={C} x2={n.x} y2={n.y} class="spoke" style="--delay:{n.i * 30}ms" />
			{/each}

			{#if motion && active}
				{#each nodes as n (n.name)}
					<circle r="3" class="particle">
						<animateMotion
							dur="{2.6 + (n.i % 5) * 0.4}s"
							begin="{(n.i % 7) * 0.3}s"
							repeatCount="indefinite"
							path={n.i % 2 ? `M${n.x},${n.y} L${C},${C}` : `M${C},${C} L${n.x},${n.y}`}
						/>
					</circle>
				{/each}
			{/if}

			{#each nodes as n (n.name)}
				<g class="node" style="--delay:{150 + n.i * 30}ms">
					<title>{n.name}</title>
					<circle cx={n.x} cy={n.y} r={NODE} class="disc" />
					<g transform="translate({n.x - 12 * ICON} {n.y - 12 * ICON}) scale({ICON})" class="glyph">
						{@html n.body}
					</g>
				</g>
			{/each}

			<circle cx={C} cy={C} r={HUB} class="hub" />
			<g transform="translate({C - 12 * 2.4} {C - 12 * 2.4}) scale(2.4)" class="hub-glyph">
				{@html ICON_DATA[ANTENNE_ICON]?.body ?? ''}
			</g>
		</svg>
	</div>
</section>

<style>
	.spoke {
		stroke: var(--color-fc-fg);
		stroke-opacity: 0.12;
		stroke-width: 1.5;
		stroke-dasharray: 320;
		stroke-dashoffset: 320;
		transition: stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1) var(--delay);
	}
	.active .spoke {
		stroke-dashoffset: 0;
	}
	.particle {
		fill: var(--color-fc-fg);
		opacity: 0.55;
	}
	.node {
		opacity: 0;
		transition: opacity 0.5s ease var(--delay);
	}
	.active .node {
		opacity: 1;
	}
	.disc {
		fill: var(--color-fc-surface);
		transition: fill 0.2s ease;
	}
	.glyph {
		color: var(--color-fc-fg);
	}
	.node:hover .disc {
		fill: var(--color-fc-field);
	}
	.hub {
		fill: var(--color-fc-accent);
	}
	.hub-glyph {
		color: var(--color-fc-accent-fg);
	}
	@media (prefers-reduced-motion: reduce) {
		.spoke,
		.node {
			transition: none;
		}
	}
</style>
