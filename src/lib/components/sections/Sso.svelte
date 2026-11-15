<script lang="ts">
	import { Icon } from '@facile/muse';
	import { useI18n } from '$lib/i18n';
	import { scrollReveal } from '$lib/motion';

	const i18n = useI18n();
	const sso = $derived(i18n.t.sso);
	const points = $derived([
		{ icon: 'solar:shield-user-bold-duotone', ...sso.team },
		{ icon: 'solar:server-square-bold-duotone', ...sso.hosted }
	]);
</script>

<section
	id="compte"
	aria-labelledby="compte-title"
	use:scrollReveal
	class="grid scroll-mt-24 items-center gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12"
>
	<div data-reveal-item class="flex flex-col gap-2">
		<h2 id="compte-title" class="text-fc-xl font-bold tracking-tight text-fc-fg sm:text-fc-2xl">{sso.title}</h2>
		<p class="text-fc-md text-fc-fg-muted">{sso.text}</p>
	</div>
	<ul data-reveal-item class="grid gap-3 sm:grid-cols-2">
		{#each points as point (point.title)}
			<li class="flex flex-col gap-3 rounded-fc-lg bg-fc-component p-4 sm:p-5">
				<span class="flex size-10 items-center justify-center rounded-fc-lg bg-fc-surface text-fc-fg">
					<Icon icon={point.icon} size={20} />
				</span>
				<span class="flex flex-col gap-1">
					<span class="text-fc-sm font-bold text-fc-fg">{point.title}</span>
					<span class="text-fc-sm text-fc-fg-muted">{point.text}</span>
				</span>
			</li>
		{/each}
	</ul>
</section>
