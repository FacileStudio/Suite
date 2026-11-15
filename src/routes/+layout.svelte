<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { provideLocale } from '@facile/muse';
	import { registerSiteIcons } from '$lib/icons';
	import { LOCALES, OG_LOCALES, localizeHref, provideI18n, stripLocale, toLocale, type Locale } from '$lib/i18n';
	import SiteShell from '$lib/components/SiteShell.svelte';

	let { children }: { children: Snippet } = $props();

	const locale = $derived(toLocale(page.params.lang));
	provideI18n(() => locale);
	const muse = provideLocale(() => locale);
	registerSiteIcons();

	$effect(() => muse.set(locale));

	const path = $derived(stripLocale(page.url.pathname));
	const pageUrl = (target: Locale) => `https://suite.facile.studio${localizeHref(path, target)}`;
</script>

<svelte:head>
	<link rel="canonical" href={pageUrl(locale)} />
	{#each LOCALES as target (target)}
		<link rel="alternate" hreflang={target} href={pageUrl(target)} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={pageUrl('en')} />
	<meta property="og:url" content={pageUrl(locale)} />
	<meta property="og:locale" content={OG_LOCALES[locale]} />
</svelte:head>

<SiteShell>{@render children()}</SiteShell>
