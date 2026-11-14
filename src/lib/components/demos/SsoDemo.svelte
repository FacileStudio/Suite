<script lang="ts">
	import { Cursor, Roll, Stage, Window, cursorAt, grow, type Act } from '@facile/mise-en-scene';
	import { Avatar, Icon } from '@facile/muse';
	import { APPS, SSO } from '$lib/content';
	import { useI18n } from '$lib/i18n';

	const i18n = useI18n();
	const t = $derived(i18n.t.sso);
	const ownerRow = $derived({ ...SSO.owner, role: t.owner });
	const memberRow = $derived({ ...SSO.member, role: t.member });
	const apps = APPS.filter((app) => SSO.apps.includes(app.name));
	const registre = APPS.find((app) => app.name === 'Registre');

	let added = $state(false);
	let opened = $state(0);
	let cursor = $state(cursorAt(300, 320));
	let button = $state<HTMLElement>();

	function reset() {
		added = false;
		opened = 0;
		cursor = cursorAt(300, 320);
	}

	function poster() {
		added = true;
		opened = apps.length;
	}

	async function script(act: Act) {
		await act.wait(700);
		cursor.visible = true;
		await act.move(cursor, act.point(button, 0.6, 0.65));
		await act.click(cursor, () => (added = true));
		await act.wait(500);
		cursor.visible = false;
		await act.count(apps.length, (v) => (opened = v), 240);
		await act.wait(2200);
		reset();
		await act.wait(500);
	}
</script>

{#snippet member(person: { name: string; email: string; role: string })}
	<div class="sd-member">
		<Avatar name={person.name} size="sm" />
		<span class="sd-who"><b>{person.name}</b><code>{person.email}</code></span>
		<span class="sd-role">{person.role}</span>
	</div>
{/snippet}

{#snippet scene()}
	<div class="sd-head">
		{#if registre}<span class="sd-logo"><Icon icon={registre.icon} size={18} /></span>{/if}
		<b>{SSO.space}</b>
		<span bind:this={button} class="sd-invite"><Icon icon="solar:user-plus-linear" size={16} />{t.invite}</span>
	</div>
	<div class="sd-list">
		{@render member(ownerRow)}
		{#if added}
			<div class="sd-grow" transition:grow={{ duration: 320 }}>{@render member(memberRow)}</div>
		{/if}
	</div>
	<div class="sd-access" class:sd-dim={!added}>
		<p class="sd-count">{t.access} · <Roll value={String(opened)} class="sd-num" /> / {APPS.length}</p>
		<ul class="sd-apps">
			{#each apps as app, i (app.name)}
				<li class="sd-app" class:sd-on={opened > i}>
					<Icon icon={app.icon} size={18} />
					<span class="sd-name">{app.name}</span>
					<span class="sd-check"><Icon icon="solar:check-circle-bold" size={16} /></span>
				</li>
			{/each}
		</ul>
	</div>
{/snippet}

<Stage width={560} height={440} compact={{ below: 480, width: 358, height: 520 }} {script} {reset} {poster} label={t.label}>
	{#snippet children({ compact })}
		<Window title={registre?.name} style={compact ? 'top:12px;left:12px;width:334px;height:440px' : 'top:20px;left:20px;width:520px;height:352px'}>
			<div class="sd-wrap" class:sd-compact={compact}>{@render scene()}</div>
		</Window>
		<Cursor {cursor} />
	{/snippet}
</Stage>

<style>
	.sd-wrap {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 14px;
		min-height: 0;
		padding: 18px 20px;
		color: var(--color-fc-fg);
		font-family: var(--font-fc-body);
	}
	.sd-compact {
		padding: 16px;
	}
	.sd-head {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.sd-head b {
		flex: 1;
		font-family: var(--font-fc-title);
		font-size: 15px;
		font-weight: 700;
	}
	.sd-logo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 10px;
		background: var(--mes-w-side);
	}
	.sd-invite {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 32px;
		padding: 0 14px;
		border-radius: 999px;
		background: var(--color-fc-accent);
		color: var(--color-fc-accent-fg);
		font-size: 12px;
		font-weight: 600;
	}
	.sd-list {
		display: flex;
		flex-direction: column;
	}
	.sd-grow {
		padding-top: 6px;
	}
	.sd-member {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 8px 12px;
		border-radius: 12px;
		background: var(--mes-w-side);
	}
	.sd-who {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-width: 0;
		font-size: 13px;
	}
	.sd-who b {
		font-weight: 600;
	}
	.sd-who code {
		overflow: hidden;
		color: var(--color-fc-fg-muted);
		font-family: var(--font-fc-mono);
		font-size: 11px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.sd-role {
		padding: 2px 10px;
		border-radius: 999px;
		background: var(--mes-w-body);
		color: var(--color-fc-fg-muted);
		font-size: 11px;
		white-space: nowrap;
	}
	.sd-access {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: auto;
		transition: opacity 0.3s ease;
	}
	.sd-dim {
		opacity: 0.5;
	}
	.sd-count {
		margin: 0;
		color: var(--color-fc-fg-muted);
		font-size: 12px;
	}
	.sd-count :global(.sd-num) {
		min-width: 1ch;
		vertical-align: bottom;
		font-variant-numeric: tabular-nums;
	}
	.sd-apps {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 8px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.sd-compact .sd-apps {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
	.sd-app {
		display: flex;
		align-items: center;
		gap: 8px;
		height: 44px;
		padding: 0 12px;
		border-radius: 12px;
		background: var(--mes-w-side);
		font-size: 13px;
		opacity: 0.55;
		transition: opacity 0.3s ease;
	}
	.sd-on {
		opacity: 1;
	}
	.sd-name {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.sd-check {
		display: flex;
		color: var(--color-fc-success);
		opacity: 0;
		scale: 0.6;
		transition:
			opacity 0.25s ease,
			scale 0.25s ease;
	}
	.sd-on .sd-check {
		opacity: 1;
		scale: 1;
	}
	@media (prefers-reduced-motion: reduce) {
		.sd-access,
		.sd-app,
		.sd-check {
			transition: none;
		}
	}
</style>
