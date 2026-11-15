<script lang="ts">
	import { Icon } from '@facile/muse';
	import { APPS, COUNT, slug } from '$lib/content';
	import { format, useI18n } from '$lib/i18n';

	const i18n = useI18n();
	const label = $derived(format(i18n.t.hero.wall, { count: COUNT }));
</script>

<ul aria-label={label} class="wall grid grid-cols-6 gap-1.5 min-[390px]:grid-cols-7 sm:grid-cols-9 sm:gap-2 lg:grid-cols-13">
	{#each APPS as app, i (app.name)}
		<li style="--i:{i}">
			<a
				href="#app-{slug(app.name)}"
				class="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-fc-lg bg-fc-component text-fc-fg transition-colors hover:bg-fc-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fc-ring"
			>
				<Icon icon={app.icon} size={24} />
				<span class="max-w-full truncate px-1 text-fc-xs text-fc-fg-muted max-sm:sr-only">{app.name}</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	.wall li {
		animation: wall-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: calc(200ms + var(--i) * 25ms);
	}
	@keyframes wall-in {
		from {
			opacity: 0;
			scale: 0.85;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.wall li {
			animation: none;
		}
	}
</style>
