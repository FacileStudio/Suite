<script lang="ts">
	import { Icon } from '@facile/muse';
	import { APPS, APPS_SECTION, CATEGORIES, type Category } from '$lib/content';
	import { scrollReveal } from '$lib/motion';

	let filter = $state<Category | 'all'>('all');

	const label = (id: Category) => CATEGORIES.find((c) => c.id === id)?.label ?? '';
	const shown = $derived(filter === 'all' ? APPS : APPS.filter((app) => app.category === filter));
</script>

<section id="apps" aria-labelledby="apps-title" use:scrollReveal class="flex scroll-mt-24 flex-col gap-6">
	<div data-reveal-item class="flex max-w-2xl flex-col gap-2">
		<h2 id="apps-title" class="text-fc-xl font-semibold tracking-tight text-fc-fg sm:text-fc-2xl">
			{APPS_SECTION.title}
		</h2>
		<p class="text-fc-md text-fc-fg-muted">{APPS_SECTION.text}</p>
	</div>

	<div data-reveal-item role="group" aria-label={APPS_SECTION.filter} class="flex flex-wrap gap-2">
		{#each CATEGORIES as category (category.id)}
			<button
				type="button"
				aria-pressed={filter === category.id}
				onclick={() => (filter = category.id)}
				class="h-9 rounded-fc-pill px-4 text-fc-sm transition-colors pointer-coarse:h-11 {filter === category.id
					? 'bg-fc-accent text-fc-accent-fg'
					: 'bg-fc-surface text-fc-fg-muted hover:text-fc-fg'}"
			>
				{category.label}
			</button>
		{/each}
	</div>

	<ul data-reveal-item class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
		{#each shown as app (app.name)}
			<li>
				<a
					href={app.url}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="{APPS_SECTION.open} {app.name}"
					class="group flex h-full items-start gap-3 rounded-fc-lg bg-fc-component p-3 sm:gap-4 sm:p-4 transition-colors hover:bg-fc-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fc-ring"
				>
					<span class="flex size-11 shrink-0 items-center justify-center rounded-fc-lg bg-fc-surface text-fc-fg transition-colors group-hover:bg-fc-page">
						<Icon icon={app.icon} size={22} />
					</span>
					<span class="flex min-w-0 flex-col gap-1">
						<span class="flex items-center gap-2">
							<span class="text-fc-md font-semibold text-fc-fg">{app.name}</span>
							<span class="truncate text-fc-xs text-fc-fg-muted">{label(app.category)}</span>
						</span>
						<span class="text-fc-sm text-fc-fg-muted">{app.line}</span>
					</span>
				</a>
			</li>
		{/each}
	</ul>
</section>
