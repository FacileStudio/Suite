<script lang="ts">
	import { Icon } from '@facile/muse';
	import { APPS, DEMO } from '$lib/content';
	import { useI18n } from '$lib/i18n';
	import HeroScreen from './HeroScreen.svelte';

	let { shown, compact }: { shown: boolean; compact: boolean } = $props();

	const i18n = useI18n();
	const t = $derived(i18n.t.demo);
	const icon = APPS.find((app) => app.name === 'Nuage')?.icon ?? '';
</script>

<HeroScreen {shown} {compact} {icon} title={t.folder}>
	<div class="hn-table" class:hn-compact={compact}>
		<div class="hn-row hn-th">
			{#each t.columns as column (column)}<span>{column}</span>{/each}
		</div>
		{#each t.files as file, i (file.name)}
			<div class="hn-row hn-file" class:hn-gone={!shown} style:transition-delay="{shown ? 220 + i * 60 : 0}ms">
				<span class="hn-name"><Icon icon={DEMO.fileIcons[i]} size={18} />{file.name}</span>
				<span class="hn-muted">{file.size}</span>
				<span class="hn-muted">{file.date}</span>
			</div>
		{/each}
	</div>
</HeroScreen>

<style>
	.hn-table {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.hn-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 90px 110px;
		align-items: center;
		gap: 12px;
		padding: 0 14px;
		font-size: 13px;
	}
	.hn-compact .hn-row {
		grid-template-columns: minmax(0, 1fr) 84px;
	}
	.hn-compact .hn-row > :nth-child(2) {
		display: none;
	}
	.hn-th {
		height: 24px;
		color: var(--color-fc-fg-muted);
		font-size: 12px;
	}
	.hn-file {
		height: 46px;
		border-radius: 12px;
		background: var(--mes-w-side);
		transition:
			opacity 0.25s ease,
			translate 0.25s ease;
	}
	.hn-gone {
		opacity: 0;
		translate: 0 6px;
	}
	.hn-name {
		display: flex;
		align-items: center;
		gap: 12px;
		min-width: 0;
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.hn-name :global(*) {
		flex: none;
		color: var(--color-fc-fg-muted);
	}
	.hn-muted {
		color: var(--color-fc-fg-muted);
		font-size: 12px;
		white-space: nowrap;
	}
	@media (prefers-reduced-motion: reduce) {
		.hn-file {
			transition: none;
		}
	}
</style>
