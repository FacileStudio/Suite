<script lang="ts">
	import { useI18n } from '$lib/i18n';
	import { scrollReveal } from '$lib/motion';
	import BulleTile from '../tiles/BulleTile.svelte';
	import DeadlineTile from '../tiles/DeadlineTile.svelte';
	import ContractTile from '../tiles/ContractTile.svelte';

	const i18n = useI18n();
	const cards = $derived(i18n.t.cards);
</script>

<section aria-labelledby="cards-title" use:scrollReveal class="flex flex-col gap-8 rounded-fc-lg bg-fc-surface px-4 py-10 sm:px-8 sm:py-14">
	<h2 id="cards-title" data-reveal-item class="text-center text-fc-xl font-bold tracking-tight text-fc-fg sm:text-fc-2xl">{cards.title}</h2>
	<div data-reveal-item class="grid gap-4 md:grid-cols-3 md:gap-6">
		<ContractTile />
		<DeadlineTile />
		<BulleTile />
	</div>
</section>
