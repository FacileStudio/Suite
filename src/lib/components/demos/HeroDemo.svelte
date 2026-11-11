<script lang="ts">
	import { tick } from 'svelte';
	import { Bar, Cursor, Stage, Window, cursorAt, grow, type Act } from '@facile/mise-en-scene';
	import { Icon } from '@facile/muse';
	import { ANTENNE_ICON, APPS, DEMO } from '$lib/content';

	const icon = (name: string) => APPS.find((app) => app.name === name)?.icon ?? '';

	const EVENTS = [
		{ app: 'Opus', label: DEMO.events.task, id: 'opus.task.created' },
		{ app: 'Sablier', label: DEMO.events.timer, id: 'sablier.timer.started' },
		{ app: 'Ardoise', label: DEMO.events.invoice, id: 'ardoise.invoice.issued' },
		{ app: 'Plume', label: DEMO.events.signed, id: 'plume.document.signed' }
	];

	let created = $state(false);
	let title = $state('');
	let running = $state(false);
	let minutes = $state(0);
	let invoiced = $state(false);
	let signed = $state(false);
	let events = $state(0);
	let cursor = $state(cursorAt());
	let newButton = $state<HTMLElement>();
	let startButton = $state<HTMLElement>();
	let billButton = $state<HTMLElement>();

	const time = $derived(`${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, '0')}`);

	function reset() {
		created = false;
		title = '';
		running = false;
		minutes = 0;
		invoiced = false;
		signed = false;
		events = 0;
		cursor.visible = false;
	}

	function poster() {
		created = true;
		title = DEMO.task;
		minutes = 150;
		invoiced = true;
		signed = true;
		events = EVENTS.length;
	}

	async function press(act: Act, target: HTMLElement | undefined, onPress?: () => void) {
		await act.move(cursor, act.point(target, 0.6, 0.65));
		await act.click(cursor, onPress);
	}

	async function script(act: Act) {
		await act.wait(700);
		cursor.visible = true;
		await press(act, newButton, () => (created = true));
		await act.wait(300);
		await act.type(DEMO.task, (v) => (title = v), 45);
		events = 1;
		await act.wait(700);
		await tick();
		await press(act, startButton, () => (running = true));
		events = 2;
		await act.count(30, (v) => (minutes = v * 5), 55);
		running = false;
		await act.wait(400);
		await press(act, billButton, () => (invoiced = true));
		events = 3;
		await act.wait(1500);
		cursor.visible = false;
		signed = true;
		events = 4;
		await act.wait(2400);
		reset();
		await act.wait(600);
	}
</script>

{#snippet header()}
	<div class="hd-head">
		<span class="hd-app"><Icon icon={icon('Opus')} size={16} /></span>
		<span class="hd-project">{DEMO.project}</span>
		<button bind:this={newButton} type="button" tabindex="-1" class="hd-btn hd-primary">{DEMO.newTask}</button>
	</div>
{/snippet}

{#snippet tasks()}
	<div class="hd-list">
		<div class="hd-row"><Bar w="46%" /><Bar w="14%" /></div>
		<div class="hd-row"><Bar w="34%" /><Bar w="18%" /></div>
		{#if created}
			<div class="hd-pad" transition:grow={{ duration: 320 }}>
				<div class="hd-task">
					<span class="hd-title">{title}<span class="hd-caret" class:hd-hide={title === DEMO.task}></span></span>
					<div class="hd-task-actions">
						<span class="hd-timer" class:hd-live={running}>
							<Icon icon={icon('Sablier')} size={14} />
							<span class="tabular-nums">{time}</span>
						</span>
						<button bind:this={startButton} type="button" tabindex="-1" class="hd-btn">{DEMO.start}</button>
						<button bind:this={billButton} type="button" tabindex="-1" class="hd-btn">{DEMO.bill}</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
{/snippet}

{#snippet cards()}
	<div class="hd-list">
		{#if invoiced}
			<div class="hd-pad" transition:grow={{ duration: 320 }}>
				<div class="hd-card">
					<span class="hd-app"><Icon icon={icon('Ardoise')} size={16} /></span>
					<div class="hd-card-text">
						<b>{DEMO.invoice}</b>
						<span>{DEMO.invoiceLine}</span>
					</div>
				</div>
			</div>
		{/if}
		{#if signed}
			<div class="hd-pad" transition:grow={{ duration: 320 }}>
				<div class="hd-card">
					<span class="hd-app"><Icon icon={icon('Plume')} size={16} /></span>
					<div class="hd-card-text"><b>{DEMO.signature}</b></div>
					<span class="hd-ok"><Icon icon="solar:check-circle-bold" size={18} /></span>
				</div>
			</div>
		{/if}
	</div>
{/snippet}

{#snippet feed()}
	<div class="hd-feed-title"><Icon icon={ANTENNE_ICON} size={16} />{DEMO.feed}</div>
	<div class="hd-list">
		{#each EVENTS.slice(0, events) as event (event.id)}
			<div class="hd-pad" transition:grow={{ duration: 260 }}>
				<div class="hd-event">
					<span class="hd-app hd-small"><Icon icon={icon(event.app)} size={14} /></span>
					<div class="hd-card-text">
						<b>{event.label}</b>
						<code>{event.id}</code>
					</div>
				</div>
			</div>
		{/each}
		{#if events === 0}
			<div class="hd-idle"><Bar w="70%" /><Bar w="48%" /></div>
		{/if}
	</div>
{/snippet}

<Stage width={960} height={500} compact={{ below: 640, width: 358, height: 620 }} {script} {reset} {poster} label={DEMO.label}>
	{#snippet children({ compact })}
		{#if compact}
			<Window style="top:12px;left:12px;width:334px;height:596px">
				<div class="hd-compact">
					{@render header()}
					{@render tasks()}
					{@render cards()}
					<div class="hd-feed">{@render feed()}</div>
				</div>
			</Window>
		{:else}
			<Window style="top:16px;left:40px;width:880px;height:460px">
				<div class="hd-body">
					<div class="hd-main">
						{@render header()}
						{@render tasks()}
						{@render cards()}
					</div>
					<aside class="hd-feed">{@render feed()}</aside>
				</div>
			</Window>
		{/if}
		<Cursor {cursor} />
	{/snippet}
</Stage>

<style>
	.hd-body {
		display: grid;
		flex: 1;
		grid-template-columns: minmax(0, 1fr) 280px;
		gap: 8px;
		min-height: 0;
		padding: 8px;
		color: var(--color-fc-fg);
	}
	.hd-main {
		display: flex;
		flex-direction: column;
		gap: 12px;
		min-height: 0;
		padding: 16px;
	}
	.hd-compact {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 10px;
		min-height: 0;
		padding: 12px;
		color: var(--color-fc-fg);
	}
	.hd-head {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.hd-project {
		flex: 1;
		min-width: 0;
		font-size: 15px;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.hd-app {
		display: inline-flex;
		flex: none;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 10px;
		background: var(--color-fc-surface);
		color: var(--color-fc-fg);
	}
	.hd-small {
		width: 28px;
		height: 28px;
		border-radius: 8px;
	}
	.hd-btn {
		height: 30px;
		padding: 0 14px;
		border-radius: 999px;
		background: var(--color-fc-surface);
		color: var(--color-fc-fg);
		font-size: 12px;
		font-weight: 500;
		white-space: nowrap;
	}
	.hd-primary {
		background: var(--color-fc-accent);
		color: var(--color-fc-accent-fg);
	}
	.hd-list {
		display: flex;
		flex-direction: column;
		min-height: 0;
	}
	.hd-pad {
		padding-bottom: 8px;
	}
	.hd-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		height: 40px;
		margin-bottom: 8px;
		padding: 0 14px;
		border-radius: 12px;
		background: var(--color-fc-component);
	}
	.hd-task {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		padding: 12px 14px;
		border-radius: 12px;
		background: var(--color-fc-component);
		font-size: 13px;
	}
	.hd-title {
		font-weight: 500;
		white-space: nowrap;
	}
	.hd-caret {
		display: inline-block;
		width: 1.5px;
		height: 14px;
		margin-left: 1px;
		vertical-align: -2px;
		background: var(--color-fc-fg);
	}
	.hd-hide {
		visibility: hidden;
	}
	.hd-task-actions {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.hd-timer {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 30px;
		padding: 0 12px;
		border-radius: 999px;
		background: var(--color-fc-surface);
		font-size: 12px;
		transition: background 0.25s ease, color 0.25s ease;
	}
	.hd-live {
		background: var(--color-fc-accent);
		color: var(--color-fc-accent-fg);
	}
	.hd-card,
	.hd-event {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 12px;
		border-radius: 12px;
		background: var(--color-fc-component);
		font-size: 13px;
	}
	.hd-event {
		gap: 10px;
		padding: 8px 10px;
		background: var(--color-fc-page);
		font-size: 12px;
	}
	.hd-card-text {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}
	.hd-card-text b {
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.hd-card-text span,
	.hd-card-text code {
		color: var(--color-fc-fg-muted);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.hd-card-text code {
		font-family: var(--font-fc-mono);
		font-size: 11px;
	}
	.hd-ok {
		color: var(--color-fc-success);
	}
	.hd-feed {
		display: flex;
		flex-direction: column;
		gap: 10px;
		min-height: 0;
		padding: 14px;
		border-radius: 12px;
		background: var(--color-fc-component);
	}
	.hd-compact .hd-feed {
		flex: 1;
		gap: 8px;
		padding: 10px;
	}
	.hd-compact .hd-row,
	.hd-compact .hd-event code {
		display: none;
	}
	.hd-compact .hd-event {
		padding: 6px 8px;
	}
	.hd-feed-title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 13px;
		font-weight: 500;
	}
	.hd-idle {
		display: grid;
		gap: 8px;
		padding: 8px 4px;
	}
</style>
