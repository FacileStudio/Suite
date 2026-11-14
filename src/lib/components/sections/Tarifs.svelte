<script lang="ts">
	import { PricingPlans } from '@facile/muse';
	import { useI18n } from '$lib/i18n';
	import { scrollReveal } from '$lib/motion';

	const i18n = useI18n();
	const tarifs = $derived(i18n.t.tarifs);
</script>

<div id="tarifs" use:scrollReveal class="flex scroll-mt-24 flex-col gap-4">
	<PricingPlans
		data-reveal-item
		title={tarifs.title}
		headingClass="text-fc-xl font-bold tracking-tight sm:text-fc-2xl"
		recommended="pro"
	/>
	<p data-reveal-item class="max-w-2xl text-fc-sm text-fc-fg-muted">{tarifs.line} {tarifs.noCard}</p>
</div>
