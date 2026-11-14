<script lang="ts">
	import { Bar } from '@facile/mise-en-scene';
	import { Icon } from '@facile/muse';
	import { APPS, DEMO } from '$lib/content';
	import type { View } from './HeroHome.svelte';

	let { view, compact }: { view: View; compact: boolean } = $props();

	const icon = (name: string) => APPS.find((app) => app.name === name)?.icon ?? '';
	const days = $derived(compact ? DEMO.days.slice(0, 3) : DEMO.days);
	const events = $derived(DEMO.events.filter((event) => event.day < days.length));
	const hours = [9, 10, 11, 12, 13, 14, 15];
</script>

<section class="ha-screen" class:ha-gone={view !== 'nuage'} class:ha-compact={compact}>
	<header class="ha-head">
		<span class="ha-app"><Icon icon={icon('Nuage')} size={18} /></span>
		<b>{DEMO.folder}</b>
		<span class="ha-pill"><Bar w="56px" /></span>
	</header>
	<div class="ha-table">
		<div class="ha-row ha-th">
			{#each DEMO.columns as column (column)}<span>{column}</span>{/each}
		</div>
		{#each DEMO.files as file, i (file.name)}
			<div class="ha-row ha-file" style:transition-delay="{view === 'nuage' ? 120 + i * 70 : 0}ms">
				<span class="ha-name"><Icon icon={file.icon} size={18} />{file.name}</span>
				<span class="ha-muted">{file.size}</span>
				<span class="ha-muted">{file.date}</span>
			</div>
		{/each}
	</div>
</section>

<section class="ha-screen" class:ha-gone={view !== 'agenda'} class:ha-compact={compact}>
	<header class="ha-head">
		<span class="ha-app"><Icon icon={icon('Agenda')} size={18} /></span>
		<b>{DEMO.week}</b>
		<span class="ha-pill"><Bar w="56px" /></span>
	</header>
	<div class="ha-week" style:--days={days.length}>
		<span></span>
		{#each days as day (day)}<span class="ha-day">{day}</span>{/each}
		<div class="ha-hours">
			{#each hours as hour (hour)}<span>{hour} h</span>{/each}
		</div>
		{#each days as day, d (day)}
			<div class="ha-col">
				{#each events.filter((event) => event.day === d) as event (event.title)}
					<span
						class="ha-event"
						style:top="calc({event.top} * var(--slot) + 2px)"
						style:height="calc({event.length} * var(--slot) - 4px)"
						style:transition-delay="{view === 'agenda' ? 160 + d * 80 : 0}ms"
					>
						<b>{event.title}</b>
						<small>{9 + event.top} h</small>
					</span>
				{/each}
			</div>
		{/each}
	</div>
</section>

<style>
	.ha-screen {
		position: absolute;
		inset: 0 0 0 60px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 24px 28px;
		transition:
			opacity 0.35s ease,
			translate 0.35s ease;
	}
	.ha-compact {
		inset: 0 0 60px 0;
		gap: 14px;
		padding: 18px 16px;
	}
	.ha-gone {
		opacity: 0;
		translate: 0 8px;
	}
	.ha-head {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.ha-head b {
		flex: 1;
		font-family: var(--font-fc-title);
		font-size: 16px;
		font-weight: 700;
	}
	.ha-app {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 10px;
		background: var(--mes-w-side);
	}
	.ha-pill {
		display: flex;
		align-items: center;
		height: 30px;
		padding: 0 14px;
		border-radius: 999px;
		background: var(--mes-w-side);
	}
	.ha-table {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.ha-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 90px 110px;
		align-items: center;
		gap: 12px;
		padding: 0 14px;
		font-size: 13px;
	}
	.ha-compact .ha-row {
		grid-template-columns: minmax(0, 1fr) 84px;
	}
	.ha-compact .ha-row > :nth-child(2) {
		display: none;
	}
	.ha-th {
		height: 24px;
		color: var(--color-fc-fg-muted);
		font-size: 12px;
	}
	.ha-file {
		height: 46px;
		border-radius: 12px;
		background: var(--mes-w-side);
		transition: opacity 0.3s ease;
	}
	.ha-gone .ha-file,
	.ha-gone .ha-event {
		opacity: 0;
	}
	.ha-name {
		display: flex;
		align-items: center;
		gap: 12px;
		min-width: 0;
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.ha-name :global(*) {
		flex: none;
		color: var(--color-fc-fg-muted);
	}
	.ha-muted {
		color: var(--color-fc-fg-muted);
		font-size: 12px;
		white-space: nowrap;
	}
	.ha-week {
		--slot: 38px;
		display: grid;
		grid-template-columns: 36px repeat(var(--days), minmax(0, 1fr));
		grid-template-rows: 20px auto;
		gap: 6px 4px;
	}
	.ha-compact .ha-week {
		--slot: 46px;
	}
	.ha-day {
		color: var(--color-fc-fg-muted);
		font-size: 12px;
		text-align: center;
	}
	.ha-hours {
		display: grid;
		grid-auto-rows: var(--slot);
		color: var(--color-fc-fg-muted);
		font-size: 11px;
		text-align: right;
		padding-right: 4px;
	}
	.ha-col {
		position: relative;
		height: calc(7 * var(--slot));
		border-radius: 10px;
		background: var(--mes-w-side);
	}
	.ha-event {
		position: absolute;
		right: 3px;
		left: 3px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 5px 7px;
		border-radius: 6px;
		background: var(--color-fc-accent);
		color: var(--color-fc-accent-fg);
		font-size: 11px;
		line-height: 1.2;
		transition: opacity 0.3s ease;
	}
	.ha-event b {
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.ha-event small {
		font-size: 10px;
		opacity: 0.8;
	}
	@media (prefers-reduced-motion: reduce) {
		.ha-screen,
		.ha-file,
		.ha-event {
			transition: none;
		}
	}
</style>
