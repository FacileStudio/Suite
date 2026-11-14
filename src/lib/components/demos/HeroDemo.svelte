<script lang="ts">
	import { Cursor, Stage, Window, cursorAt, type Act } from '@facile/mise-en-scene';
	import { Avatar, Icon } from '@facile/muse';
	import { DEMO } from '$lib/content';
	import HeroApps from './HeroApps.svelte';
	import HeroHome, { type View } from './HeroHome.svelte';

	const TITLES: Record<View, string> = { login: DEMO.home, home: DEMO.home, nuage: 'Nuage', agenda: 'Agenda' };

	let view = $state<View>('login');
	let cursor = $state(cursorAt(440, 460));
	let signIn = $state<HTMLElement>();
	let nuageTile = $state<HTMLElement>();
	let agendaRail = $state<HTMLElement>();

	function reset() {
		view = 'login';
		cursor = cursorAt(440, 460);
	}

	function poster() {
		view = 'agenda';
	}

	async function press(act: Act, target: HTMLElement | undefined, next: View) {
		await act.move(cursor, act.point(target, 0.55, 0.6));
		await act.click(cursor, () => (view = next));
	}

	async function script(act: Act) {
		await act.wait(800);
		cursor.visible = true;
		await press(act, signIn, 'home');
		await act.wait(1100);
		await press(act, nuageTile, 'nuage');
		await act.wait(2000);
		await press(act, agendaRail, 'agenda');
		await act.wait(600);
		cursor.visible = false;
		await act.wait(2200);
		reset();
		await act.wait(500);
	}
</script>

{#snippet account()}
	<span class="hd-account" class:hd-gone={view === 'login'}>
		<Avatar name={DEMO.user} size="sm" class="hd-avatar" />
		<span class="hd-ok"><Icon icon="solar:check-circle-bold" size={14} />{DEMO.connected}</span>
	</span>
{/snippet}

<Stage width={880} height={540} compact={{ below: 640, width: 390, height: 616 }} {script} {reset} {poster} label={DEMO.label}>
	{#snippet children({ compact })}
		<Window
			title={TITLES[view]}
			trailing={account}
			style={compact ? 'top:16px;left:16px;width:358px;height:536px' : 'top:20px;left:40px;width:800px;height:440px'}
		>
			<div class="hd-body" class:hd-compact={compact}>
				<HeroHome {view} {compact} bind:signIn bind:nuageTile bind:agendaRail />
				<HeroApps {view} {compact} />
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
	}
	.hd-account {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		transition: opacity 0.35s ease;
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
	.hd-gone {
		opacity: 0;
	}
	@media (prefers-reduced-motion: reduce) {
		.hd-account {
			transition: none;
		}
	}
</style>
