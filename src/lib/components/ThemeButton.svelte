<script lang="ts">
	import { onMount } from 'svelte';
	import { Icon, IconButton, applyTheme, icons, readTheme } from '@facile/muse';
	import { useI18n } from '$lib/i18n';

	const i18n = useI18n();
	let dark = $state(false);

	onMount(() => {
		const theme = readTheme();
		dark = theme === 'system' ? matchMedia('(prefers-color-scheme: dark)').matches : theme === 'dark';
	});

	function toggle() {
		dark = !dark;
		const theme = dark ? 'dark' : 'light';
		applyTheme(theme);
		try {
			localStorage.setItem('suite-theme', theme);
		} catch {}
	}
</script>

<IconButton
	variant="ghost"
	class="size-9 pointer-coarse:size-11 bg-fc-surface/70 text-fc-fg hover:bg-fc-surface"
	aria-label={dark ? i18n.t.theme.toLight : i18n.t.theme.toDark}
	onclick={toggle}
>
	<Icon icon={dark ? icons.sun : icons.moon} size={16} />
</IconButton>
