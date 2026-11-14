<script lang="ts">
	import { Bar, Caret, Stage, Tile, type Act } from '@facile/mise-en-scene';
	import { Badge, Icon } from '@facile/muse';
	import { APPS } from '$lib/content';
	import { useI18n } from '$lib/i18n';

	const i18n = useI18n();
	const t = $derived(i18n.t.cards);
	const card = $derived(t.items[2]);
	const icon = (name: string) => APPS.find((app) => app.name === name)?.icon ?? '';
	const tools = $derived(t.rows.map((text, i) => ({ text, icon: icon(i === 0 ? 'Nuage' : 'Opus') })));

	let typed = $state('');
	let sent = $state(false);
	let done = $state(0);

	function reset() {
		typed = '';
		sent = false;
		done = 0;
	}

	function poster() {
		typed = t.prompt;
		sent = true;
		done = tools.length;
	}

	async function script(act: Act) {
		await act.wait(600);
		await act.type(t.prompt, (v) => (typed = v), 38);
		await act.wait(300);
		sent = true;
		await act.wait(700);
		await act.count(tools.length, (v) => (done = v), 700);
		await act.wait(2400);
		reset();
		await act.wait(400);
	}
</script>

{#snippet pro()}<Badge tone="accent" class="shrink-0">{card.badge}</Badge>{/snippet}

<Tile title={card.title} body={card.text} badge={pro}>
	<Stage width={320} height={240} {script} {reset} {poster}>
		{#snippet children()}
			<div class="bt-chat">
				<p class="bt-ask" class:bt-off={!sent}>{t.prompt}</p>
				<div class="bt-reply">
					<span class="bt-bulle" class:bt-off={!sent}><Icon icon={icon('Bulle')} size={18} /></span>
					<ul>
						{#each tools as tool, i (tool.text)}
							<li class:bt-off={done <= i}>
								<Icon icon={tool.icon} size={14} /><span>{tool.text}</span><Icon icon="solar:check-circle-bold" size={14} class="bt-ok" />
							</li>
						{/each}
					</ul>
				</div>
				<div class="bt-composer">
					{#if sent}<Bar w="40%" />{:else}<span>{typed}<Caret /></span>{/if}
				</div>
			</div>
		{/snippet}
	</Stage>
</Tile>

<style>
	.bt-chat {
		position: absolute;
		inset: 18px 18px 18px 18px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 12px;
		border-radius: 12px;
		background: var(--color-fc-page);
		box-shadow: 0 12px 30px -12px rgb(0 0 0 / 0.22);
		color: var(--color-fc-fg);
		font-family: var(--font-fc-body);
		font-size: 12px;
	}
	.bt-ask {
		align-self: flex-end;
		max-width: 85%;
		margin: 0;
		padding: 6px 10px;
		border-radius: 14px;
		background: var(--color-fc-component);
		line-height: 1.35;
	}
	.bt-reply {
		display: flex;
		align-items: flex-start;
		gap: 8px;
	}
	.bt-bulle {
		display: flex;
		flex: none;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		border-radius: 999px;
		background: var(--color-fc-component);
	}
	.bt-reply ul {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 6px;
		min-width: 0;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.bt-reply li {
		display: flex;
		align-items: center;
		gap: 6px;
		height: 28px;
		padding: 0 8px;
		border-radius: 8px;
		background: var(--color-fc-component);
		white-space: nowrap;
	}
	.bt-reply li span {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.bt-reply :global(.bt-ok) {
		color: var(--color-fc-success);
	}
	.bt-composer {
		height: 50px;
		margin-top: auto;
		padding: 8px 12px;
		border-radius: 14px;
		background: var(--color-fc-component);
		overflow: hidden;
		line-height: 1.4;
	}
	.bt-ask,
	.bt-bulle,
	.bt-reply li {
		transition:
			opacity 0.3s ease,
			translate 0.3s ease;
	}
	.bt-off {
		opacity: 0;
		translate: 0 6px;
	}
</style>
