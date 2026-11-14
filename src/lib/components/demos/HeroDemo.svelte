<script lang="ts">
	import { Cursor, Stage, Window, cursorAt, type Act } from '@facile/mise-en-scene';
	import { Avatar, Icon } from '@facile/muse';
	import { DEMO } from '$lib/content';
	import { useI18n } from '$lib/i18n';
	import HeroAgenda from './HeroAgenda.svelte';
	import HeroHome, { type View } from './HeroHome.svelte';
	import HeroNuage from './HeroNuage.svelte';

	const TITLES = ['Facile', 'Nuage', 'Agenda'];
	const START = { x: 440, y: 460 };

	const i18n = useI18n();
	const t = $derived(i18n.t.demo);

	let view = $state<View>('login');
	let pressed = $state<string | null>(null);
	let fading = $state(false);
	let cursor = $state(cursorAt(START.x, START.y));
	let signIn = $state<HTMLElement>();
	let nuageTile = $state<HTMLElement>();
	let agendaRail = $state<HTMLElement>();

	const title = $derived(view === 'nuage' ? 'Nuage' : view === 'agenda' ? 'Agenda' : 'Facile');

	function reset() {
		view = 'login';
		pressed = null;
		fading = false;
		cursor = cursorAt(START.x, START.y);
	}

	function poster() {
		view = 'agenda';
	}

	async function press(act: Act, target: HTMLElement | undefined, key: string, next: View) {
		await act.move(cursor, act.point(target, 0.55, 0.6));
		await act.click(cursor, () => (pressed = key));
		view = next;
		pressed = null;
	}

	async function script(act: Act) {
		await act.wait(800);
		cursor.visible = true;
		await press(act, signIn, 'signin', 'home');
		await act.wait(1100);
		await press(act, nuageTile, 'nuage', 'nuage');
		await act.wait(2200);
		await press(act, agendaRail, 'agenda', 'agenda');
		await act.wait(600);
		cursor.visible = false;
		await act.wait(2400);
		fading = true;
		await act.wait(550);
		view = 'login';
		cursor = cursorAt(START.x, START.y);
		await act.wait(150);
		fading = false;
		await act.wait(800);
	}
</script>

{#snippet bar()}
	<span class="hd-title" aria-hidden="true">
		{#each TITLES as name (name)}<span class="hd-step" class:hd-gone={title !== name}>{name}</span>{/each}
	</span>
	<span class="hd-account hd-step" class:hd-gone={view === 'login'}>
		<Avatar name={DEMO.user} size="sm" class="hd-avatar" />
		<span class="hd-ok"><Icon icon="solar:check-circle-bold" size={14} />{t.connected}</span>
	</span>
{/snippet}

<Stage width={880} height={540} compact={{ below: 640, width: 390, height: 616 }} {script} {reset} {poster} label={t.label}>
	{#snippet children({ compact })}
		<Window trailing={bar} style={compact ? 'top:16px;left:16px;width:358px;height:536px' : 'top:20px;left:40px;width:800px;height:440px'}>
			<div class="hd-body" class:hd-fade={fading}>
				<HeroHome {view} {compact} {pressed} bind:signIn bind:nuageTile bind:agendaRail />
				<HeroNuage shown={view === 'nuage'} {compact} />
				<HeroAgenda shown={view === 'agenda'} {compact} />
			</div>
		</Window>
		<Cursor {cursor} />
	{/snippet}
</Stage>

<style>
	.hd-body {
		position: relative;
		flex: 1;
		min-height: 0;
		color: var(--color-fc-fg);
		font-family: var(--font-fc-body);
		transition: opacity 0.5s ease;
	}
	.hd-fade {
		opacity: 0;
	}
	.hd-title {
		position: absolute;
		left: 50%;
		display: grid;
		translate: -50% 0;
		font-family: var(--font-fc-title);
		font-size: 12px;
		color: var(--color-fc-fg-muted);
	}
	.hd-title > span {
		grid-area: 1 / 1;
		text-align: center;
	}
	.hd-step {
		transition: opacity 0.25s ease 0.15s;
	}
	.hd-step.hd-gone {
		opacity: 0;
		transition: opacity 0.15s ease;
	}
	.hd-account {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
	}
	.hd-account :global(.hd-avatar) {
		width: 22px;
		height: 22px;
		font-size: 11px;
	}
	.hd-ok {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		color: var(--color-fc-success);
	}
	@media (prefers-reduced-motion: reduce) {
		.hd-body,
		.hd-step {
			transition: none;
		}
	}
</style>
