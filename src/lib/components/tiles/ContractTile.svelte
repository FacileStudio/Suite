<script lang="ts">
	import { Cursor, Roll, Stage, Tile, cursorAt, type Act } from '@facile/mise-en-scene';
	import { Badge, Icon } from '@facile/muse';
	import { APPS } from '$lib/content';
	import { useI18n } from '$lib/i18n';

	type Step = 'none' | 'sent' | 'signed';

	const i18n = useI18n();
	const t = $derived(i18n.t.cards);
	const card = $derived(t.items[0]);
	const icon = (name: string) => APPS.find((app) => app.name === name)?.icon ?? '';
	const TONE = { none: 'neutral', sent: 'warning', signed: 'success' } as const;

	let step = $state<Step>('none');
	let pressed = $state(false);
	let cursor = $state(cursorAt(250, 220));
	let send = $state<HTMLElement>();
	let sign = $state<HTMLElement>();

	function reset() {
		step = 'none';
		pressed = false;
		cursor = cursorAt(250, 220);
	}

	function poster() {
		step = 'signed';
	}

	async function tap(act: Act, target: HTMLElement | undefined, next: Step) {
		await act.move(cursor, act.point(target, 0.5, 0.6));
		await act.click(cursor, () => (pressed = true));
		pressed = false;
		step = next;
	}

	async function script(act: Act) {
		await act.wait(600);
		cursor.visible = true;
		await tap(act, send, 'sent');
		await act.wait(700);
		await tap(act, sign, 'signed');
		await act.wait(400);
		cursor.visible = false;
		await act.wait(2200);
		reset();
		await act.wait(400);
	}
</script>

<Tile title={card.title} body={card.text}>
	<Stage width={320} height={240} {script} {reset} {poster}>
		{#snippet children()}
			<div class="qt-card">
				<div class="qt-head">
					<span class="qt-app"><Icon icon={icon('Ardoise')} size={16} /></span>
					<span class="qt-who"><b>{t.doc}</b><small>{t.client}</small></span>
					<b class="qt-amount">{t.amount}</b>
				</div>
				<div class="qt-foot">
					<span bind:this={send} class="qt-send" class:qt-press={pressed && step === 'none'}>{t.send}</span>
					<Badge tone={TONE[step]} class="shrink-0"><Roll value={t[step]} /></Badge>
				</div>
			</div>
			<div class="qt-plume" class:qt-hidden={step === 'none'}>
					<div class="qt-plume-in">
						<span class="qt-app"><Icon icon={icon('Plume')} size={16} /></span>
						<span class="qt-doc"><b>{t.doc}</b></span>
						<span bind:this={sign} class="qt-sign" class:qt-done={step === 'signed'} class:qt-press={pressed && step === 'sent'}>
							{#if step === 'signed'}<Icon icon="solar:check-circle-bold" size={14} />{/if}{step === 'signed' ? t.signed : t.sign}
						</span>
					</div>
				</div>
			<Cursor {cursor} />
		{/snippet}
	</Stage>
</Tile>

<style>
	.qt-card,
	.qt-plume-in {
		border-radius: 12px;
		background: var(--color-fc-page);
		box-shadow: 0 12px 30px -12px rgb(0 0 0 / 0.22);
		font-family: var(--font-fc-body);
		color: var(--color-fc-fg);
	}
	.qt-card {
		position: absolute;
		top: 22px;
		left: 20px;
		right: 20px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 14px;
	}
	.qt-head,
	.qt-foot,
	.qt-plume-in {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.qt-foot {
		justify-content: space-between;
	}
	.qt-app {
		display: flex;
		flex: none;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
		border-radius: 9px;
		background: var(--color-fc-component);
	}
	.qt-who {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-width: 0;
		font-size: 13px;
	}
	.qt-who small {
		color: var(--color-fc-fg-muted);
		font-size: 12px;
	}
	.qt-amount {
		font-size: 13px;
	}
	.qt-send,
	.qt-sign {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		height: 30px;
		padding: 0 12px;
		border-radius: 999px;
		background: var(--color-fc-accent);
		color: var(--color-fc-accent-fg);
		font-size: 12px;
		font-weight: 600;
		white-space: nowrap;
		transition:
			scale 0.12s ease,
			background 0.25s ease,
			color 0.25s ease;
	}
	.qt-done {
		background: var(--color-fc-component);
		color: var(--color-fc-success);
	}
	.qt-press {
		scale: 0.94;
	}
	.qt-plume {
		position: absolute;
		top: 140px;
		left: 56px;
		right: 20px;
		transition:
			opacity 0.3s ease,
			translate 0.3s ease;
	}
	.qt-hidden {
		opacity: 0;
		translate: 0 10px;
	}
	.qt-plume-in {
		padding: 10px 12px;
	}
	.qt-doc {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		font-size: 12px;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
