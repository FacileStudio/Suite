<script lang="ts">
	import { APPS, DEMO } from '$lib/content';
	import { useI18n } from '$lib/i18n';
	import { inkOn } from '$lib/ink';
	import HeroScreen from './HeroScreen.svelte';

	let { shown, compact }: { shown: boolean; compact: boolean } = $props();

	const i18n = useI18n();
	const t = $derived(i18n.t.demo);
	const icon = APPS.find((app) => app.name === 'Agenda')?.icon ?? '';
	const first = $derived(compact ? 1 : 0);
	const days = $derived(t.days.map((name, i) => ({ name, i, date: DEMO.firstDay + i })).slice(first, compact ? 4 : 7));
	const hour = (h: number) => `${String(h).padStart(2, '0')}:00`;
	const events = $derived(
		DEMO.events.map((event, i) => ({ ...event, title: t.events[i], ink: inkOn(event.color), start: hour(DEMO.hours[event.top]) }))
	);
</script>

<HeroScreen {shown} {compact} {icon} title={t.week}>
	<div class="hg-week" class:hg-compact={compact} style:--days={days.length}>
		<span></span>
		{#each days as day (day.i)}
			<span class="hg-day" class:hg-today={day.i === DEMO.today}>{day.name}<span class="hg-num">{day.date}</span></span>
		{/each}
		<div class="hg-hours">
			{#each DEMO.hours as h, i (h)}<span style:top="calc({i} * var(--slot))" class:hg-first={i === 0}>{hour(h)}</span>{/each}
		</div>
		{#each days as day, d (day.i)}
			<div class="hg-col">
				{#each DEMO.hours as h (h)}<span class="hg-slot" class:hg-odd={h % 2 === 1}></span>{/each}
				{#each events.filter((event) => event.day === day.i) as event (event.title)}
					<span
						class="hg-event"
						class:hg-gone={!shown}
						style:top="calc({event.top} * var(--slot) + 1px)"
						style:height="calc({event.length} * var(--slot) - 2px)"
						style:background-color={event.color}
						style:color={event.ink}
						style:transition-delay="{shown ? 220 + d * 40 : 0}ms"
					>
						<b>{event.title}</b>
						<small>{event.start}</small>
					</span>
				{/each}
			</div>
		{/each}
	</div>
</HeroScreen>

<style>
	.hg-week {
		--slot: 38px;
		display: grid;
		grid-template-columns: 44px repeat(var(--days), minmax(0, 1fr));
		grid-template-rows: 22px auto;
		gap: 4px 0;
	}
	.hg-compact {
		--slot: 44px;
	}
	.hg-day {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		color: var(--color-fc-fg-muted);
		font-size: 12px;
	}
	.hg-num {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 999px;
	}
	.hg-today {
		color: var(--color-fc-fg);
		font-weight: 600;
	}
	.hg-today .hg-num {
		background: var(--color-fc-accent);
		color: var(--color-fc-accent-fg);
	}
	.hg-hours {
		position: relative;
		height: calc(7 * var(--slot));
		color: var(--color-fc-fg-muted);
		font-size: 12px;
	}
	.hg-hours span {
		position: absolute;
		right: 6px;
		translate: 0 -50%;
	}
	.hg-hours .hg-first {
		translate: 0 0;
	}
	.hg-col {
		position: relative;
		display: grid;
		grid-auto-rows: var(--slot);
		margin: 0 2px;
		overflow: hidden;
		border-radius: 10px;
		background: var(--mes-w-side);
	}
	.hg-odd {
		background: color-mix(in oklch, var(--color-fc-field) 50%, transparent);
	}
	.hg-event {
		position: absolute;
		right: 2px;
		left: 2px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 4px 6px;
		border-radius: 6px;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
		font-size: 12px;
		font-weight: 500;
		line-height: 1.25;
		transition: opacity 0.25s ease;
	}
	.hg-gone {
		opacity: 0;
	}
	.hg-event b {
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.hg-event small {
		font-size: 12px;
		opacity: 0.9;
	}
	@media (prefers-reduced-motion: reduce) {
		.hg-event {
			transition: none;
		}
	}
</style>
