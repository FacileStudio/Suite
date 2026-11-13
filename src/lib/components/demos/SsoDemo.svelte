<script lang="ts">
	import { Bar, Cursor, Roll, Stage, Window, cursorAt, type Act } from '@facile/mise-en-scene';
	import { Icon } from '@facile/muse';
	import { APPS, SSO } from '$lib/content';

	const apps = APPS.filter((app) => SSO.apps.includes(app.name));
	const registre = APPS.find((app) => app.name === 'Registre');

	let signed = $state(false);
	let opened = $state(0);
	let cursor = $state(cursorAt(440, 300));
	let button = $state<HTMLElement>();

	function reset() {
		signed = false;
		opened = 0;
		cursor = cursorAt(440, 300);
	}

	function poster() {
		signed = true;
		opened = apps.length;
	}

	async function script(act: Act) {
		await act.wait(700);
		cursor.visible = true;
		await act.move(cursor, act.point(button, 0.7, 0.7));
		await act.click(cursor, () => (signed = true));
		await act.wait(300);
		cursor.visible = false;
		await act.count(apps.length, (v) => (opened = v), 260);
		await act.wait(2200);
		reset();
		await act.wait(500);
	}
</script>

{#snippet mark()}
	<svg width="16" height="16" viewBox="0 0 217 225" fill="currentColor" aria-hidden="true">
		<path
			d="M21.6 2.10177L23.4 2.70176C19.5 17.4018 27.9 37.8018 42 37.8018C71.4 37.8018 95.1 -0.298234 137.1 0.00176235C170.1 0.00176235 177.3 29.4018 177.3 43.5018V64.8018H131.7L131.4 46.5018C131.4 25.5018 120.3 20.7018 107.7 20.7018C65.7 20.7018 49.8 80.1018 27.3 80.1018C14.7 80.1018 11.4 62.7018 11.4 49.2018C11.4 29.1018 16.5 10.5018 21.6 2.10177ZM53.4 109.202L81.9 46.2018H121.2C109.8 68.1018 100.2 89.4018 91.5 109.202H94.8C129.9 109.202 157.8 117.902 157.8 163.802L112.8 163.202C113.1 121.202 111.9 114.002 95.1 114.002H89.1C60.6 177.902 40.2 225.002 0 225.002L0.3 175.802V109.202H53.4ZM2.7 138.302V175.802C18.3 174.902 32.1 156.902 40.8 137.102L51 114.302C12.3 115.802 2.7 120.602 2.7 138.302Z"
		/>
		<path d="M179.198 223.502V186.902H216.098V223.502H179.198Z" />
	</svg>
{/snippet}

{#snippet scene()}
	<div class="sd-body">
		<div class="sd-login" class:sd-gone={signed}>
			{#if registre}<span class="sd-logo"><Icon icon={registre.icon} size={26} /></span>{/if}
			<div class="sd-bars"><Bar w="60%" /><Bar w="40%" /></div>
			<span bind:this={button} class="sd-signin">{@render mark()}{SSO.signIn}</span>
		</div>
		<div class="sd-account" class:sd-gone={!signed}>
			<div class="sd-user">
				<span class="sd-avatar"><Icon icon="solar:user-circle-bold-duotone" size={22} /></span>
				<span class="sd-who"><b>{SSO.account}</b><span>{SSO.space}</span></span>
				{#if registre}<span class="sd-idp"><Icon icon={registre.icon} size={16} />{registre.name}</span>{/if}
			</div>
			<ul class="sd-apps">
				{#each apps as app, i (app.name)}
					<li class="sd-app" class:sd-on={opened > i}>
						<Icon icon={app.icon} size={18} />
						<span class="sd-name">{app.name}</span>
						<span class="sd-check"><Icon icon="solar:check-circle-bold" size={16} /></span>
					</li>
				{/each}
			</ul>
			<p class="sd-count">{SSO.connected} · <Roll value={String(opened)} class="sd-num" /> / {APPS.length}</p>
		</div>
	</div>
{/snippet}

<Stage width={560} height={340} compact={{ below: 480, width: 358, height: 372 }} {script} {reset} {poster} label={SSO.label}>
	{#snippet children({ compact })}
		<Window style={compact ? 'top:12px;left:12px;width:334px;height:348px' : 'top:20px;left:20px;width:520px;height:300px'}>
			<div class="sd-wrap" class:sd-compact={compact}>{@render scene()}</div>
		</Window>
		<Cursor {cursor} />
	{/snippet}
</Stage>

<style>
	.sd-wrap {
		position: relative;
		flex: 1;
		min-height: 0;
		color: var(--color-fc-fg);
		font-family: var(--font-sans);
	}
	.sd-body {
		position: absolute;
		inset: 0;
	}
	.sd-login,
	.sd-account {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		transition:
			opacity 0.35s ease,
			translate 0.35s ease;
	}
	.sd-gone {
		opacity: 0;
		translate: 0 8px;
	}
	.sd-login {
		align-items: center;
		justify-content: center;
		gap: 18px;
	}
	.sd-logo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 52px;
		border-radius: 16px;
		background: var(--color-fc-surface);
	}
	.sd-bars {
		display: grid;
		justify-items: center;
		gap: 8px;
		width: 200px;
	}
	.sd-signin {
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
	}
	.sd-account {
		gap: 12px;
		padding: 20px;
	}
	.sd-user {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 12px;
		border-radius: 14px;
		background: var(--color-fc-surface);
	}
	.sd-avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border-radius: 999px;
		background: var(--color-fc-accent);
		color: var(--color-fc-accent-fg);
	}
	.sd-who {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-width: 0;
		font-size: 13px;
	}
	.sd-who b {
		font-weight: 700;
	}
	.sd-who span,
	.sd-idp,
	.sd-count {
		color: var(--color-fc-fg-muted);
		font-size: 12px;
	}
	.sd-idp {
		display: inline-flex;
		align-items: center;
		gap: 6px;
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
		height: 48px;
		padding: 0 12px;
		border-radius: 12px;
		background: var(--color-fc-surface);
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
	.sd-count {
		margin: auto 0 0;
	}
	.sd-count :global(.sd-num) {
		min-width: 1ch;
		vertical-align: bottom;
		font-variant-numeric: tabular-nums;
	}
	@media (prefers-reduced-motion: reduce) {
		.sd-login,
		.sd-account,
		.sd-app,
		.sd-check {
			transition: none;
		}
	}
</style>
