<script lang="ts">
	import type { Snippet } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { LandingFooter, LandingHeader, Page, SignInWithFacile } from '@facile/muse';
	import { GITHUB_URL, LOGO, NAV, PLACE_URL, SELF_HOST_PATH, SPACES_URL, STUDIO_URL } from '$lib/content';
	import { localizeHref, rememberLocale, stripLocale, toLocale, useI18n } from '$lib/i18n';
	import ThemeButton from './ThemeButton.svelte';

	let { children }: { children: Snippet } = $props();

	const i18n = useI18n();
	const t = $derived(i18n.t);
	const links = $derived(NAV.map((item) => ({ label: t.nav[item.key], href: i18n.href(item.href) })));

	const columns = $derived([
		{ title: t.footer.suite, links: [...links, { label: t.nav.selfHost, href: i18n.href(SELF_HOST_PATH) }] },
		{
			title: t.footer.facile,
			links: [
				{ label: 'facile.studio', href: STUDIO_URL, external: true },
				{ label: 'GitHub', href: GITHUB_URL, external: true },
				{ label: t.footer.community, href: PLACE_URL, external: true }
			]
		}
	]);

	const switchLocale = (next: string) => {
		rememberLocale(toLocale(next));
		return goto(`${localizeHref(stripLocale(page.url.pathname), toLocale(next))}${page.url.hash}`, { noScroll: true });
	};
</script>

<div class="flex min-h-dvh w-full flex-col bg-fc-page text-fc-fg">
	<LandingHeader appName="Suite" icon={LOGO} homeHref={i18n.href('/')} {links} skipHref="#main">
		{#snippet actions()}
			<ThemeButton />
			<SignInWithFacile size="sm" href={SPACES_URL} />
		{/snippet}
	</LandingHeader>
	<main id="main" class="flex-1"><Page width="xl">{@render children()}</Page></main>
	<LandingFooter
		appName="Suite"
		icon={LOGO}
		homeHref={i18n.href('/')}
		tagline={t.footer.tagline}
		{columns}
		legal={{ onLocaleChange: switchLocale }}
	/>
</div>
