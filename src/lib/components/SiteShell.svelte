<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Button, LandingFooter, LandingHeader, Page } from '@facile/muse';
	import { FOOTER, GITHUB_URL, LOGO, NAV, STUDIO_URL } from '$lib/content';
	import ThemeButton from './ThemeButton.svelte';

	let { children }: { children: Snippet } = $props();

	const columns = [
		{ title: FOOTER.suite, links: NAV },
		{
			title: FOOTER.facile,
			links: [
				{ label: FOOTER.studio, href: STUDIO_URL, external: true },
				{ label: FOOTER.github, href: GITHUB_URL, external: true },
				{ label: FOOTER.community, href: 'https://place.facile.studio', external: true }
			]
		}
	];
</script>

<div class="flex min-h-dvh w-full flex-col bg-fc-page text-fc-fg">
	<LandingHeader appName="Suite" icon={LOGO} homeHref="/" links={NAV} skipHref="#main">
		{#snippet actions()}
			<ThemeButton />
			<Button
				size="sm"
				class="h-9"
				href={STUDIO_URL}
				target="_blank"
				rel="noopener noreferrer"
				iconRight="solar:arrow-right-up-linear">{FOOTER.studio}</Button
			>
		{/snippet}
	</LandingHeader>
	<main id="main" class="flex-1"><Page width="xl">{@render children()}</Page></main>
	<LandingFooter appName="Suite" icon={LOGO} homeHref="/" tagline={FOOTER.tagline} {columns} />
</div>
