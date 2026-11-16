<script lang="ts">
	import { Icon, prefersReducedMotion } from '@facile/muse';
	import { APPS, COUNT, slug } from '$lib/content';
	import { format, useI18n } from '$lib/i18n';

	const STEP = 9;
	const EVERY = 2400;

	const i18n = useI18n();
	const label = $derived(format(i18n.t.hero.wall, { count: COUNT }));
	const lines = $derived(i18n.t.apps.lines as Record<string, string>);

	let active = $state(0);
	let held = $state(false);

	const app = $derived(APPS[active]);

	function hold(index: number) {
		active = index;
		held = true;
	}

	$effect(() => {
		if (held || prefersReducedMotion()) return;
		const timer = setInterval(() => (active = (active + STEP) % COUNT), EVERY);
		return () => clearInterval(timer);
	});
</script>

<div class="flex flex-col gap-4">
	<ul aria-label={label} class="wall grid grid-cols-6 gap-1.5 min-[390px]:grid-cols-7 sm:max-w-2xl sm:gap-2 lg:max-w-none lg:grid-cols-14">
		{#each APPS as item, i (item.name)}
			<li style="--i:{i}">
				<a
					href="#app-{slug(item.name)}"
					onpointerenter={() => hold(i)}
					onpointerleave={() => (held = false)}
					onfocus={() => hold(i)}
					onblur={() => (held = false)}
					class="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-fc-lg transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fc-ring {i === active
						? 'bg-fc-accent text-fc-accent-fg'
						: 'bg-fc-component text-fc-fg'}"
				>
					<Icon icon={item.icon} size={24} />
					<span class="max-w-full truncate px-1 text-fc-xs max-sm:sr-only {i === active ? '' : 'text-fc-fg-muted'}">{item.name}</span>
				</a>
			</li>
		{/each}
	</ul>
	<p aria-hidden="true" class="flex min-h-12 items-start text-fc-md text-fc-fg-muted sm:min-h-6">
		{#key app.name}
			<span class="caption"><b class="font-bold text-fc-fg">{app.name}</b> · {lines[app.name]}</span>
		{/key}
	</p>
</div>

<style>
	.wall li {
		animation: wall-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: calc(200ms + var(--i) * 25ms);
	}
	.caption {
		animation: caption-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
	}
	@keyframes wall-in {
		from {
			opacity: 0;
			scale: 0.85;
		}
	}
	@keyframes caption-in {
		from {
			opacity: 0;
			translate: 0 6px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.wall li,
		.caption {
			animation: none;
		}
	}
</style>
