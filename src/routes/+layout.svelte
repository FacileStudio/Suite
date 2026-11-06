<script lang="ts">
	import '../app.css';
	import { provideLocale } from '@facile/muse';

	let { children } = $props();

	provideLocale('fr');
</script>

{@render children()}
