<script lang="ts">
	let container: HTMLElement;
	let active = $state(false);

	const CX = 400;
	const CY = 260;
	const R = 185;

	type Conn = 'sync' | 'emit' | 'tap' | 'future';

	const defs: [string, Conn][] = [
		['Perception', 'tap'],
		['Sablier', 'sync'],
		['Opus', 'sync'],
		['Vision', 'emit'],
		['Glouton', 'sync'],
		['Ardoise', 'sync'],
		['Plume', 'sync'],
		['Portail', 'future'],
		['Nuage', 'future'],
		['Echo', 'future'],
		['Capsule', 'future']
	];

	const nodes = defs.map(([name, conn], i) => {
		const a = -Math.PI / 2 + ((2 * Math.PI) / defs.length) * i;
		const x = Math.round(CX + R * Math.cos(a));
		const y = Math.round(CY + R * Math.sin(a));
		const lx = Math.round(CX + (R + 22) * Math.cos(a));
		const ly = Math.round(CY + (R + 22) * Math.sin(a));
		const c = Math.cos(a);
		const anchor = Math.abs(c) < 0.25 ? ('middle' as const) : c > 0 ? ('start' as const) : ('end' as const);
		return { name, conn, x, y, lx, ly, anchor, i };
	});

	$effect(() => {
		if (!container) return;
		if (
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			active = true;
			return;
		}
		const obs = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) {
					active = true;
					obs.disconnect();
				}
			},
			{ threshold: 0.15 }
		);
		obs.observe(container);
		return () => obs.disconnect();
	});
</script>

<div bind:this={container} class="graph" class:active>
	<svg
		viewBox="0 0 800 520"
		xmlns="http://www.w3.org/2000/svg"
		class="mx-auto h-auto w-full"
		aria-label="Schéma des connexions entre les outils Facile via Nook"
		role="img"
	>
		<defs>
			<radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
				<stop offset="0%" stop-color="white" stop-opacity="0.1" />
				<stop offset="70%" stop-color="white" stop-opacity="0.03" />
				<stop offset="100%" stop-color="white" stop-opacity="0" />
			</radialGradient>
		</defs>

		{#each [70, 115, 155] as ring, ri}
			<circle
				cx={CX}
				cy={CY}
				r={ring}
				fill="none"
				stroke="white"
				stroke-opacity={0.04 - ri * 0.01}
				stroke-width="0.5"
				stroke-dasharray="3 8"
			/>
		{/each}

		{#each nodes as n}
			<line
				x1={CX}
				y1={CY}
				x2={n.x}
				y2={n.y}
				stroke="white"
				stroke-opacity={n.conn === 'sync' ? 0.25 : n.conn === 'future' ? 0.06 : 0.18}
				stroke-width={n.conn === 'future' ? 0.5 : 1}
				class="conn"
				style="--delay:{n.i * 80}ms"
			/>
		{/each}

		{#each nodes as n}
			{#if n.conn === 'sync'}
				<circle r="2.5" fill="white" class="particle">
					<animateMotion
						dur="{2.2 + n.i * 0.25}s"
						repeatCount="indefinite"
						path="M{n.x},{n.y} L{CX},{CY}"
					/>
				</circle>
				<circle r="2" fill="white" class="particle dim">
					<animateMotion
						dur="{2.8 + n.i * 0.2}s"
						repeatCount="indefinite"
						path="M{CX},{CY} L{n.x},{n.y}"
					/>
				</circle>
			{:else if n.conn === 'emit'}
				<circle r="2.5" fill="white" class="particle">
					<animateMotion
						dur="{2.5 + n.i * 0.25}s"
						repeatCount="indefinite"
						path="M{n.x},{n.y} L{CX},{CY}"
					/>
				</circle>
			{:else if n.conn === 'tap'}
				<circle r="2" fill="white" class="particle dim">
					<animateMotion
						dur="3.5s"
						repeatCount="indefinite"
						path="M{CX},{CY} L{n.x},{n.y}"
					/>
				</circle>
			{/if}
		{/each}

		{#each nodes as n}
			<g class="app-node" style="--delay:{300 + n.i * 60}ms">
				<circle
					cx={n.x}
					cy={n.y}
					r="5"
					fill="white"
					fill-opacity={n.conn === 'future' ? 0.2 : 0.9}
				/>
				<text
					x={n.lx}
					y={n.ly}
					text-anchor={n.anchor}
					dominant-baseline="central"
					fill={n.conn === 'future'
						? 'rgba(255,255,255,0.25)'
						: 'rgba(255,255,255,0.85)'}
					font-family="Goga, sans-serif"
					font-size="11"
					font-weight="600"
					letter-spacing="0.02em">{n.name}</text
				>
			</g>
		{/each}

		<circle cx={CX} cy={CY} r="55" fill="url(#center-glow)" />
		<circle
			cx={CX}
			cy={CY}
			r="38"
			fill="none"
			stroke="rgba(255,255,255,0.1)"
			stroke-width="1"
			class="center-pulse"
		/>
		<circle
			cx={CX}
			cy={CY}
			r="30"
			fill="rgba(255,255,255,0.06)"
			stroke="rgba(255,255,255,0.3)"
			stroke-width="1.5"
		/>
		<text
			x={CX}
			y={CY}
			text-anchor="middle"
			dominant-baseline="central"
			fill="white"
			font-family="Goga, sans-serif"
			font-size="14"
			font-weight="700"
			letter-spacing="0.05em">Nook</text
		>
	</svg>
</div>

<style>
	.graph {
		opacity: 0;
		transform: scale(0.96);
		transition:
			opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
			transform 1s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.graph.active {
		opacity: 1;
		transform: scale(1);
	}

	.conn {
		stroke-dasharray: 190;
		stroke-dashoffset: 190;
		transition: stroke-dashoffset 0.9s cubic-bezier(0.16, 1, 0.3, 1);
		transition-delay: var(--delay);
	}
	.active .conn {
		stroke-dashoffset: 0;
	}

	.particle {
		opacity: 0;
		transition: opacity 0.6s ease 1.2s;
	}
	.dim {
		transition-delay: 1.6s;
	}
	.active .particle {
		opacity: 0.6;
	}
	.active .dim {
		opacity: 0.35;
	}

	.app-node {
		opacity: 0;
		transition: opacity 0.6s ease;
		transition-delay: var(--delay);
	}
	.active .app-node {
		opacity: 1;
	}

	.center-pulse {
		transform-origin: center;
		transform-box: fill-box;
		animation: pulse 3.5s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.2);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.graph {
			opacity: 1;
			transform: none;
			transition: none;
		}
		.conn {
			stroke-dashoffset: 0;
			transition: none;
		}
		.particle {
			display: none;
		}
		.app-node {
			opacity: 1;
			transition: none;
		}
		.center-pulse {
			animation: none;
		}
	}
</style>
