<script lang="ts">
	import { Icon } from '@facile/muse';
	import { APPS, SSO } from '$lib/content';
	import { scrollReveal } from '$lib/motion';

	const apps = APPS.filter((app) => SSO.apps.includes(app.name));
	const registre = APPS.find((app) => app.name === 'Registre');
</script>

<section
	id="compte"
	aria-labelledby="compte-title"
	use:scrollReveal
	class="grid scroll-mt-24 items-center gap-8 rounded-fc-lg bg-fc-component p-5 sm:p-10 lg:grid-cols-2 lg:gap-12"
>
	<div data-reveal-item class="flex flex-col gap-6">
		<div class="flex flex-col gap-2">
			<h2 id="compte-title" class="text-fc-xl font-semibold tracking-tight text-fc-fg sm:text-fc-2xl">{SSO.title}</h2>
			<p class="text-fc-md text-fc-fg-muted">{SSO.text}</p>
		</div>
		<ul class="flex flex-col gap-4">
			{#each SSO.points as point (point.title)}
				<li class="flex items-start gap-3">
					<span class="flex size-9 shrink-0 items-center justify-center rounded-fc-lg bg-fc-surface text-fc-fg">
						<Icon icon={point.icon} size={18} />
					</span>
					<span class="flex flex-col gap-0.5">
						<span class="text-fc-sm font-semibold text-fc-fg">{point.title}</span>
						<span class="text-fc-sm text-fc-fg-muted">{point.text}</span>
					</span>
				</li>
			{/each}
		</ul>
	</div>

	<div data-reveal-item aria-hidden="true" class="flex flex-col gap-3 rounded-fc-lg bg-fc-page p-4 sm:p-6">
		<div class="flex items-center gap-3 rounded-fc-lg bg-fc-surface p-3">
			<span class="flex size-10 items-center justify-center rounded-fc-pill bg-fc-accent text-fc-accent-fg">
				<Icon icon="solar:user-circle-bold-duotone" size={22} />
			</span>
			<span class="flex min-w-0 flex-1 flex-col">
				<span class="text-fc-sm font-semibold text-fc-fg">{SSO.account}</span>
				<span class="truncate text-fc-xs text-fc-fg-muted">{SSO.space}</span>
			</span>
			{#if registre}
				<span class="flex items-center gap-1.5 text-fc-xs text-fc-fg-muted">
					<Icon icon={registre.icon} size={16} />{registre.name}
				</span>
			{/if}
		</div>
		<ul class="grid grid-cols-2 gap-2 sm:grid-cols-3">
			{#each apps as app (app.name)}
				<li class="flex items-center gap-2 rounded-fc-lg bg-fc-component p-3">
					<Icon icon={app.icon} size={18} class="text-fc-fg" />
					<span class="min-w-0 flex-1 truncate text-fc-sm text-fc-fg">{app.name}</span>
					<Icon icon="solar:check-circle-bold" size={16} class="text-fc-success" />
				</li>
			{/each}
		</ul>
		<p class="text-fc-xs text-fc-fg-muted">{SSO.connected} · {apps.length} / {APPS.length}</p>
	</div>
</section>
