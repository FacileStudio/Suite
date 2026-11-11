<script lang="ts">
	import { META } from '$lib/content';
	import SiteShell from '$lib/components/SiteShell.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Apps from '$lib/components/sections/Apps.svelte';
	import Graph from '$lib/components/sections/Graph.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import Sso from '$lib/components/sections/Sso.svelte';
	import Tarifs from '$lib/components/sections/Tarifs.svelte';
</script>

<svelte:head>
	<title>{META.title}</title>
	<meta name="description" content={META.description} />
	<meta property="og:title" content={META.title} />
	<meta property="og:description" content={META.description} />
	<meta name="twitter:title" content={META.title} />
	<meta name="twitter:description" content={META.description} />
</svelte:head>

<SiteShell>
	<Hero />
	<Apps />
	<Graph />
	<Sso />
	<Tarifs />
	<About />
</SiteShell>
