<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Bar } from '@facile/mise-en-scene';
	import { Icon } from '@facile/muse';

	let { shown, compact, icon, title, children }: { shown: boolean; compact: boolean; icon: string; title: string; children: Snippet } =
		$props();
</script>

<section class="hs-screen" class:hs-gone={!shown} class:hs-compact={compact}>
	<header class="hs-head">
		<span class="hs-app"><Icon {icon} size={18} /></span>
		<b>{title}</b>
		<span class="hs-pill"><Bar w="56px" /></span>
	</header>
	{@render children()}
</section>

<style>
	.hs-screen {
		position: absolute;
		inset: 0 0 0 60px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 22px 26px;
		transition: opacity 0.25s ease 0.15s;
	}
	.hs-compact {
		inset: 0 0 60px 0;
		gap: 14px;
		padding: 18px 16px;
	}
	.hs-gone {
		opacity: 0;
		transition: opacity 0.15s ease;
	}
	.hs-head {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.hs-head b {
		flex: 1;
		font-family: var(--font-fc-title);
		font-size: 16px;
		font-weight: 700;
	}
	.hs-app {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 10px;
		background: var(--mes-w-side);
	}
	.hs-pill {
		display: flex;
		align-items: center;
		height: 30px;
		padding: 0 14px;
		border-radius: 999px;
		background: var(--mes-w-side);
	}
	@media (prefers-reduced-motion: reduce) {
		.hs-screen {
			transition: none;
		}
	}
</style>
