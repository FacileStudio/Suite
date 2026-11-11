<script lang="ts">
	import SiteShell from '$lib/components/SiteShell.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Apps from '$lib/components/sections/Apps.svelte';
	import Graph from '$lib/components/sections/Graph.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import Sso from '$lib/components/sections/Sso.svelte';
	import Tarifs from '$lib/components/sections/Tarifs.svelte';
</script>


<SiteShell>
	<Hero />
	<Apps />
	<Graph />
	<Sso />
	<Tarifs />
	<About />
</SiteShell>
