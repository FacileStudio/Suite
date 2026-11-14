<script lang="ts">
	import { LandingCta } from '@facile/muse';
	import { COUNT, SPACES_URL } from '$lib/content';
	import { format, useI18n } from '$lib/i18n';
	import { scrollReveal } from '$lib/motion';
	import HeroDemo from '../demos/HeroDemo.svelte';

	const i18n = useI18n();
	const hero = $derived(i18n.t.hero);
</script>

<section use:scrollReveal={{ stagger: 80 }} class="flex flex-col gap-6 pt-4 md:pt-10">
	<div data-reveal-item class="flex flex-wrap gap-2">
		{#each hero.chips as chip (chip)}
			<span class="rounded-fc-pill bg-fc-surface px-3 py-1 text-fc-xs text-fc-fg-muted">{chip}</span>
		{/each}
	</div>
	<div data-reveal-item class="flex max-w-3xl flex-col gap-4">
		<h1 class="text-fc-2xl font-bold tracking-tight text-fc-fg sm:text-fc-3xl">{hero.title}</h1>
		<p class="text-fc-md text-fc-fg-muted sm:text-fc-lg">{format(hero.sub, { count: COUNT })}</p>
	</div>
	<div data-reveal-item>
		<LandingCta signInHref={SPACES_URL} />
	</div>
	<div data-reveal-item class="-mx-4 max-w-[880px] pt-2 md:-mx-10">
		<HeroDemo />
	</div>
</section>
