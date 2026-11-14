<script lang="ts">
	import About from '$lib/components/sections/About.svelte';
	import Apps from '$lib/components/sections/Apps.svelte';
	import Cards from '$lib/components/sections/Cards.svelte';
	import Graph from '$lib/components/sections/Graph.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import Sso from '$lib/components/sections/Sso.svelte';
	import Tarifs from '$lib/components/sections/Tarifs.svelte';
	import { COUNT } from '$lib/content';
	import { format, useI18n } from '$lib/i18n';

	const i18n = useI18n();
	const meta = $derived(i18n.t.meta);
	const description = $derived(format(meta.description, { count: COUNT }));
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={description} />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<Hero />
<Apps />
<Cards />
<Graph />
<Sso />
<Tarifs />
<About />
