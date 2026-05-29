<script lang="ts">
	let container: HTMLElement;
	let active = $state(false);

	const steps = [
		{ phase: 'Trouver', tools: ['Glouton'] },
		{ phase: 'Signer', tools: ['Plume'] },
		{ phase: 'Planifier', tools: ['Opus'] },
		{ phase: 'Produire', tools: ['Sablier', 'Echo'] },
		{ phase: 'Livrer', tools: ['Nuage', 'Capsule', 'Portail'] },
		{ phase: 'Facturer', tools: ['Ardoise'] },
		{ phase: 'Mesurer', tools: ['Vision', 'Nook', 'Perception'] }
	];

	$effect(() => {
		if (!container) return;
		if (
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			active = true;
			return;
		}
		const obs = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					active = true;
					obs.disconnect();
				}
			},
			{ threshold: 0.3 }
		);
		obs.observe(container);
		return () => obs.disconnect();
	});
</script>

<div bind:this={container} class="workflow">
	<div class="relative">
		<div
			class="absolute left-3 top-0 bottom-0 w-px bg-zinc-300 sm:bottom-auto sm:left-[7%] sm:right-[7%] sm:top-3 sm:h-px sm:w-auto"
			aria-hidden="true"
		></div>

		<ol class="grid grid-cols-1 gap-8 sm:grid-cols-7 sm:gap-3">
			{#each steps as step, i}
				<li
					class="step flex items-start gap-4 sm:flex-col sm:items-center sm:gap-0"
					style="transition: opacity 0.5s ease {i * 100}ms, transform 0.5s ease {i * 100}ms; opacity: {active ? 1 : 0}; transform: translateY({active ? 0 : 12}px);"
				>
					<div
						class="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-zinc-50"
					>
						<div class="size-2 rounded-full bg-zinc-900"></div>
					</div>
					<div class="sm:mt-3 sm:text-center">
						<p class="font-[Goga] text-sm font-bold tracking-tight text-zinc-900">
							{step.phase}
						</p>
						{#each step.tools as tool}
							<p class="text-xs leading-relaxed text-zinc-500">{tool}</p>
						{/each}
					</div>
				</li>
			{/each}
		</ol>
	</div>
</div>

<style>
	@media (prefers-reduced-motion: reduce) {
		.workflow .step {
			transition: none !important;
			opacity: 1 !important;
			transform: none !important;
		}
	}
</style>
