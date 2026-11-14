<script lang="ts">
	import { Bar, Cursor, Roll, Stage, Tile, cursorAt, type Act } from '@facile/mise-en-scene';
	import { Icon } from '@facile/muse';
	import { APPS, CALENDAR } from '$lib/content';
	import { useI18n } from '$lib/i18n';
	import { inkOn } from '$lib/ink';

	const i18n = useI18n();
	const t = $derived(i18n.t.cards);
	const card = $derived(t.items[1]);
	const icon = (name: string) => APPS.find((app) => app.name === name)?.icon ?? '';
	const ink = inkOn(CALENDAR.space);

	let dated = $state(false);
	let synced = $state(false);
	let pressed = $state(false);
	let cursor = $state(cursorAt(240, 200));
	let chip = $state<HTMLElement>();

	function reset() {
		dated = false;
		synced = false;
		pressed = false;
		cursor = cursorAt(240, 200);
	}

	function poster() {
		dated = true;
		synced = true;
	}

	async function script(act: Act) {
		await act.wait(600);
		cursor.visible = true;
		await act.move(cursor, act.point(chip, 0.5, 0.6));
		await act.click(cursor, () => (pressed = true));
		pressed = false;
		dated = true;
		await act.wait(300);
		cursor.visible = false;
		await act.wait(500);
		synced = true;
		await act.wait(2600);
		reset();
		await act.wait(400);
	}
</script>

<Tile title={card.title} body={card.text}>
	<Stage width={320} height={240} {script} {reset} {poster}>
		{#snippet children()}
			<div class="dt-task">
				<span class="dt-app"><Icon icon={icon('Opus')} size={16} /></span>
				<span class="dt-body">
					<b>{t.task}</b>
					<span bind:this={chip} class="dt-chip" class:dt-set={dated} class:dt-press={pressed}>
						<Icon icon="solar:calendar-linear" size={13} /><Roll value={dated ? t.date : t.noDate} />
					</span>
				</span>
			</div>
			<div class="dt-week">
				<div class="dt-bar"><span class="dt-app dt-small"><Icon icon={icon('Agenda')} size={14} /></span><Bar w="60px" /></div>
				<div class="dt-days">
					{#each t.days as day, i (day)}
						<div class="dt-col">
							<span class="dt-day" class:dt-today={i === 2}>{day}</span>
							<div class="dt-cell">
								{#if i === 2}
									<span class="dt-event" class:dt-off={!synced} style:background-color={CALENDAR.space} style:color={ink}>{t.task}</span>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
			<span class="dt-sablier" class:dt-off={!synced}><Icon icon={icon('Sablier')} size={14} />{t.inSablier}</span>
			<Cursor {cursor} />
		{/snippet}
	</Stage>
</Tile>

<style>
	.dt-task,
	.dt-week,
	.dt-sablier {
		position: absolute;
		border-radius: 12px;
		background: var(--color-fc-page);
		box-shadow: 0 12px 30px -12px rgb(0 0 0 / 0.22);
		color: var(--color-fc-fg);
		font-family: var(--font-fc-body);
	}
	.dt-task {
		top: 18px;
		left: 18px;
		width: 214px;
		display: flex;
		gap: 10px;
		padding: 12px;
	}
	.dt-app {
		display: flex;
		flex: none;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: 9px;
		background: var(--color-fc-component);
	}
	.dt-small {
		width: 24px;
		height: 24px;
		border-radius: 7px;
	}
	.dt-body {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 6px;
		min-width: 0;
		font-size: 13px;
	}
	.dt-chip {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		height: 24px;
		padding: 0 8px;
		border-radius: 999px;
		background: var(--color-fc-component);
		color: var(--color-fc-fg-muted);
		font-size: 11px;
		white-space: nowrap;
		transition:
			scale 0.12s ease,
			color 0.25s ease;
	}
	.dt-set {
		color: var(--color-fc-fg);
	}
	.dt-press {
		scale: 0.94;
	}
	.dt-week {
		top: 98px;
		left: 70px;
		right: 18px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 10px;
	}
	.dt-bar {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.dt-days {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 4px;
	}
	.dt-col {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
	}
	.dt-day {
		color: var(--color-fc-fg-muted);
		font-size: 11px;
		text-align: center;
	}
	.dt-today {
		color: var(--color-fc-fg);
		font-weight: 600;
	}
	.dt-cell {
		position: relative;
		height: 46px;
		padding: 3px;
		border-radius: 8px;
		background: var(--color-fc-component);
	}
	.dt-event {
		display: block;
		overflow: hidden;
		height: 100%;
		padding: 3px 5px;
		border-radius: 6px;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
		font-size: 10px;
		font-weight: 600;
		line-height: 1.2;
		overflow-wrap: anywhere;
	}
	.dt-sablier {
		top: 64px;
		right: 18px;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 30px;
		padding: 0 10px;
		border-radius: 999px;
		font-size: 12px;
		font-weight: 500;
	}
	.dt-event,
	.dt-sablier {
		transition:
			opacity 0.3s ease,
			translate 0.3s ease;
	}
	.dt-off {
		opacity: 0;
		translate: 0 6px;
	}
</style>
