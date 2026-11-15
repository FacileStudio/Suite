<script lang="ts">
	import { Button, Icon } from '@facile/muse';
	import { tick } from 'svelte';
	import { APPS, CATEGORIES, COUNT, slug, type Category } from '$lib/content';
	import { format, useI18n } from '$lib/i18n';
	import { scrollReveal } from '$lib/motion';

	const i18n = useI18n();
	const t = $derived(i18n.t.apps);
	const lines = $derived(t.lines as Record<string, string>);

	let filter = $state<Category | 'all'>('all');

	let picked = $state('');
	let expanded = $state(false);

	const shown = $derived(filter === 'all' ? APPS : APPS.filter((app) => app.category === filter));
	const folded = $derived(filter === 'all' && !expanded);

	async function pick() {
		const id = location.hash.slice(1);
		if (!id.startsWith('app-')) return;
		picked = id;
		filter = 'all';
		expanded = true;
		await tick();
		document.getElementById(id)?.scrollIntoView();
	}

	$effect(() => void pick());
</script>

<svelte:window onhashchange={pick} />

<section id="apps" aria-labelledby="apps-title" use:scrollReveal class="flex scroll-mt-24 flex-col gap-6">
	<div data-reveal-item class="flex max-w-2xl flex-col gap-2">
		<h2 id="apps-title" class="text-fc-xl font-bold tracking-tight text-fc-fg sm:text-fc-2xl">{t.title}</h2>
		<p class="text-fc-md text-fc-fg-muted">{t.text}</p>
	</div>

	<div data-reveal-item role="group" aria-label={t.filter} class="flex flex-wrap gap-2">
		{#each CATEGORIES as category (category)}
			<button
				type="button"
				aria-pressed={filter === category}
				onclick={() => (filter = category)}
				class="h-9 rounded-fc-pill px-4 text-fc-sm transition-colors pointer-coarse:h-11 {filter === category
					? 'bg-fc-accent text-fc-accent-fg'
					: 'bg-fc-surface text-fc-fg-muted hover:text-fc-fg'}"
			>
				{t.categories[category]}
			</button>
		{/each}
	</div>

	<ul data-reveal-item class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
		{#each shown as app, i (app.name)}
			<li class={folded && i >= 8 ? (i === 8 ? 'hidden lg:block xl:hidden' : 'hidden') : ''}>
				<a
					id="app-{slug(app.name)}"
					href={app.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="{t.open} {app.name}"
					class="group flex h-full scroll-mt-24 items-start gap-3 rounded-fc-lg p-3 transition-colors hover:bg-fc-surface sm:gap-4 sm:p-4 {picked === `app-${slug(app.name)}`
						? 'bg-fc-surface'
						: 'bg-fc-component'} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fc-ring"
				>
					<span
						class="flex size-11 shrink-0 items-center justify-center rounded-fc-lg text-fc-fg transition-colors group-hover:bg-fc-page {picked === `app-${slug(app.name)}`
							? 'bg-fc-page'
							: 'bg-fc-surface'}"
					>
						<Icon icon={app.icon} size={22} />
					</span>
					<span class="flex min-w-0 flex-col gap-1">
						<span class="flex items-center gap-2">
							<span class="text-fc-md font-bold text-fc-fg">{app.name}</span>
							<span class="truncate text-fc-xs text-fc-fg-muted">{t.categories[app.category]}</span>
						</span>
						<span class="text-fc-sm text-fc-fg-muted">{lines[app.name]}</span>
					</span>
				</a>
			</li>
		{/each}
	</ul>
	{#if folded}
		<div data-reveal-item>
			<Button variant="secondary" size="lg" iconRight="solar:alt-arrow-down-linear" onclick={() => (expanded = true)}>{format(t.more, { count: COUNT })}</Button>
		</div>
	{/if}
</section>
