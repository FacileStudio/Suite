<script module lang="ts">
	export type View = 'login' | 'home' | 'nuage' | 'agenda';
</script>

<script lang="ts">
	import { Bar } from '@facile/mise-en-scene';
	import { Icon } from '@facile/muse';
	import { APPS, DEMO, LOGO } from '$lib/content';
	import { useI18n } from '$lib/i18n';

	let {
		view,
		compact,
		pressed,
		signIn = $bindable(),
		nuageTile = $bindable(),
		agendaRail = $bindable()
	}: {
		view: View;
		compact: boolean;
		pressed: string | null;
		signIn?: HTMLElement;
		nuageTile?: HTMLElement;
		agendaRail?: HTMLElement;
	} = $props();

	const i18n = useI18n();
	const t = $derived(i18n.t.demo);
	const pick = (names: string[]) => names.map((name) => APPS.find((app) => app.name === name)).filter((app) => !!app);
	const apps = pick(DEMO.apps);
	const rail = pick(DEMO.rail);
	const inApp = $derived(view === 'nuage' || view === 'agenda');
</script>

{#snippet mark()}
	<svg width="16" height="16" viewBox="0 0 217 225" fill="currentColor" aria-hidden="true">
		<path
			d="M21.6 2.10177L23.4 2.70176C19.5 17.4018 27.9 37.8018 42 37.8018C71.4 37.8018 95.1 -0.298234 137.1 0.00176235C170.1 0.00176235 177.3 29.4018 177.3 43.5018V64.8018H131.7L131.4 46.5018C131.4 25.5018 120.3 20.7018 107.7 20.7018C65.7 20.7018 49.8 80.1018 27.3 80.1018C14.7 80.1018 11.4 62.7018 11.4 49.2018C11.4 29.1018 16.5 10.5018 21.6 2.10177ZM53.4 109.202L81.9 46.2018H121.2C109.8 68.1018 100.2 89.4018 91.5 109.202H94.8C129.9 109.202 157.8 117.902 157.8 163.802L112.8 163.202C113.1 121.202 111.9 114.002 95.1 114.002H89.1C60.6 177.902 40.2 225.002 0 225.002L0.3 175.802V109.202H53.4ZM2.7 138.302V175.802C18.3 174.902 32.1 156.902 40.8 137.102L51 114.302C12.3 115.802 2.7 120.602 2.7 138.302Z"
		/>
		<path d="M179.198 223.502V186.902H216.098V223.502H179.198Z" />
	</svg>
{/snippet}

<div class="hh-login" class:hh-gone={view !== 'login'}>
	<span class="hh-logo"><Icon icon={LOGO} size={28} /></span>
	<div class="hh-bars"><Bar w="70%" /><Bar w="45%" /></div>
	<span bind:this={signIn} class="hh-signin" class:hh-press={pressed === 'signin'}>{@render mark()}{t.signIn}</span>
</div>

<div class="hh-home" class:hh-gone={view !== 'home'} class:hh-compact={compact}>
	<div class="hh-hello">
		<b>{t.hello}</b>
		<Bar w={compact ? '60%' : '28%'} />
	</div>
	<ul class="hh-grid">
		{#each apps as app (app.name)}
			{#if app.name === 'Nuage'}
				<li bind:this={nuageTile} class="hh-tile" class:hh-press={pressed === 'nuage'}>
					<span class="hh-icon"><Icon icon={app.icon} size={22} /></span>{app.name}
				</li>
			{:else}
				<li class="hh-tile">
					<span class="hh-icon"><Icon icon={app.icon} size={22} /></span>{app.name}
				</li>
			{/if}
		{/each}
	</ul>
</div>

<nav class="hh-rail" class:hh-gone={!inApp} class:hh-dock={compact}>
	<span class="hh-slot"><Icon icon={LOGO} size={20} /></span>
	{#each rail as app (app.name)}
		{#if app.name === 'Agenda'}
			<span bind:this={agendaRail} class="hh-slot" class:hh-active={view === 'agenda'} class:hh-press={pressed === 'agenda'}><Icon icon={app.icon} size={20} /></span>
		{:else}
			<span class="hh-slot" class:hh-active={view === app.name.toLowerCase()}><Icon icon={app.icon} size={20} /></span>
		{/if}
	{/each}
</nav>

<style>
	.hh-login,
	.hh-home,
	.hh-rail {
		position: absolute;
		transition:
			opacity 0.25s ease 0.15s,
			translate 0.3s ease 0.15s;
	}
	.hh-gone {
		opacity: 0;
		transition:
			opacity 0.15s ease,
			translate 0.15s ease;
	}
	.hh-rail.hh-gone {
		translate: -12px 0;
	}
	.hh-dock.hh-gone {
		translate: 0 12px;
	}
	.hh-press {
		scale: 0.95;
	}
	.hh-login {
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 18px;
	}
	.hh-logo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		border-radius: 16px;
		background: var(--mes-w-side);
	}
	.hh-bars {
		display: grid;
		justify-items: center;
		gap: 8px;
		width: 200px;
	}
	.hh-signin {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		height: 44px;
		padding: 0 20px;
		border-radius: 999px;
		background: var(--color-fc-accent);
		color: var(--color-fc-accent-fg);
		font-size: 14px;
		font-weight: 600;
		white-space: nowrap;
		transition: scale 0.12s ease;
	}
	.hh-home {
		inset: 0;
		display: flex;
		flex-direction: column;
		gap: 22px;
		padding: 28px 32px;
	}
	.hh-hello {
		display: grid;
		gap: 10px;
	}
	.hh-hello b {
		font-family: var(--font-fc-title);
		font-size: 20px;
		font-weight: 700;
	}
	.hh-grid {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 10px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.hh-compact {
		gap: 18px;
		padding: 20px 16px;
	}
	.hh-compact .hh-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
	.hh-tile {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 14px 4px 12px;
		border-radius: 14px;
		background: var(--mes-w-side);
		font-size: 12px;
		font-weight: 500;
		transition:
			scale 0.12s ease,
			background 0.12s ease;
	}
	.hh-tile.hh-press {
		background: var(--mes-w-body);
	}
	.hh-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 12px;
		background: var(--mes-w-body);
	}
	.hh-rail {
		top: 0;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		width: 60px;
		padding: 12px 0;
		background: var(--mes-w-side);
	}
	.hh-dock {
		top: auto;
		right: 0;
		width: auto;
		height: 60px;
		flex-direction: row;
		justify-content: space-around;
		padding: 0 12px;
	}
	.hh-slot {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 12px;
		color: var(--color-fc-fg-muted);
		transition:
			background 0.25s ease,
			color 0.25s ease,
			scale 0.12s ease;
	}
	.hh-active {
		background: var(--mes-w-body);
		color: var(--color-fc-fg);
	}
	@media (prefers-reduced-motion: reduce) {
		.hh-login,
		.hh-home,
		.hh-rail,
		.hh-slot {
			transition: none;
		}
	}
</style>
