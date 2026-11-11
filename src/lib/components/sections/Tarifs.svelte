<script lang="ts">
	import { Button, PricingPlans } from '@facile/muse';
	import { SPACES_URL, TARIFS } from '$lib/content';
	import { scrollReveal } from '$lib/motion';
</script>

<section id="tarifs" aria-labelledby="tarifs-title" use:scrollReveal class="flex scroll-mt-24 flex-col gap-8">
	<div data-reveal-item class="flex max-w-2xl flex-col items-start gap-4">
		<div class="flex flex-col gap-2">
			<h2 id="tarifs-title" class="text-fc-xl font-semibold tracking-tight text-fc-fg sm:text-fc-2xl">{TARIFS.title}</h2>
			<p class="text-fc-md text-fc-fg-muted">{TARIFS.text}</p>
		</div>
		<Button variant="primary" size="lg" href={SPACES_URL} iconRight="solar:arrow-right-linear">{TARIFS.cta}</Button>
	</div>
	<PricingPlans headingLevel={3} />
</section>
