<script lang="ts">
	import { Button } from '@facile/muse';
	import { HERO } from '$lib/content';
	import { scrollReveal } from '$lib/motion';
	import HeroDemo from '../demos/HeroDemo.svelte';
</script>

<section use:scrollReveal={{ stagger: 80 }} class="flex flex-col gap-6 pt-4 md:pt-10">
	<div data-reveal-item class="flex flex-wrap gap-2">
		{#each HERO.eyebrow as tag (tag)}
			<span class="rounded-fc-pill bg-fc-surface px-3 py-1 text-fc-xs text-fc-fg-muted">{tag}</span>
		{/each}
	</div>
	<div data-reveal-item class="flex max-w-3xl flex-col gap-4">
		<h1 class="text-fc-2xl font-semibold tracking-tight text-fc-fg sm:text-fc-3xl">{HERO.title}</h1>
		<p class="text-fc-md text-fc-fg-muted sm:text-fc-lg">{HERO.sub}</p>
	</div>
	<div data-reveal-item class="flex flex-wrap items-center gap-3">
		<Button variant="primary" size="lg" href="#tarifs" iconRight="solar:arrow-right-linear">{HERO.primary}</Button>
		<Button variant="secondary" size="lg" href="#apps" iconRight="solar:arrow-down-linear">{HERO.secondary}</Button>
	</div>
	<div data-reveal-item class="pt-2">
		<HeroDemo />
	</div>
</section>
