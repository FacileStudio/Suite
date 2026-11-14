<script lang="ts">
	import { Button, FeatureSplit, SignUpWithFacile } from '@facile/muse';
	import { COMMITMENT_ICONS, GITHUB_URL, REGISTRE_REPO } from '$lib/content';
	import { useI18n } from '$lib/i18n';
	import SelfTable from '$lib/components/sections/SelfTable.svelte';

	const i18n = useI18n();
	const t = $derived(i18n.t.self);
	const meta = $derived(i18n.t.meta);
	const features = $derived(t.commitment.map((title, i) => ({ icon: COMMITMENT_ICONS[i], title })));
	const heading = 'text-fc-xl font-bold tracking-tight text-fc-fg sm:text-fc-2xl';
</script>

<svelte:head>
	<title>{meta.selfTitle}</title>
	<meta name="description" content={meta.selfDescription} />
	<meta property="og:title" content={meta.selfTitle} />
	<meta property="og:description" content={meta.selfDescription} />
	<meta name="twitter:title" content={meta.selfTitle} />
	<meta name="twitter:description" content={meta.selfDescription} />
</svelte:head>

<section class="flex flex-col gap-4 pt-4 md:pt-10">
	<span class="w-fit rounded-fc-pill bg-fc-surface px-3 py-1 text-fc-xs text-fc-fg-muted">{t.eyebrow}</span>
	<h1 class="max-w-3xl text-fc-2xl font-bold tracking-tight text-fc-fg sm:text-fc-3xl">{t.headline}</h1>
	<p class="max-w-2xl text-fc-md text-fc-fg-muted sm:text-fc-lg">{t.intro}</p>
</section>

<section class="flex flex-col items-start gap-5 rounded-fc-lg bg-fc-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
	<p class="max-w-xl text-fc-md font-medium text-fc-fg">{t.managedFirst}</p>
	<SignUpWithFacile size="lg" class="max-sm:w-full" />
</section>

<SelfTable />

<FeatureSplit title={t.commitmentTitle} features={features} headingClass={heading} />

<section aria-labelledby="start-title" class="flex flex-col items-start gap-5 rounded-fc-lg bg-fc-accent p-6 text-fc-accent-fg sm:p-10">
	<div class="flex max-w-2xl flex-col gap-2">
		<h2 id="start-title" class="text-fc-xl font-bold tracking-tight sm:text-fc-2xl">{t.repos}</h2>
		<p class="text-fc-md opacity-70">{t.funding}</p>
	</div>
	<div class="flex flex-wrap gap-2">
		<Button variant="secondary" size="lg" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" icon="solar:code-square-linear">{t.secondary}</Button>
		<Button
			variant="ghost"
			size="lg"
			href={REGISTRE_REPO}
			target="_blank"
			rel="noopener noreferrer"
			iconRight="solar:arrow-right-up-linear"
			class="text-fc-accent-fg hover:bg-fc-accent-fg/10 hover:text-fc-accent-fg">{t.registre}</Button
		>
	</div>
</section>
