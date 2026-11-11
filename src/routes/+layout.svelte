<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { provideLocale } from '@facile/muse';
	import { registerSiteIcons } from '$lib/icons';

	let { children }: { children: Snippet } = $props();

	provideLocale('fr');
	registerSiteIcons();
</script>

{@render children()}
