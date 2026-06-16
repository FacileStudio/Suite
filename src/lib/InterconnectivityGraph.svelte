<script lang="ts">
	let container: HTMLElement;
	let active = $state(false);

	const CX = 400;
	const CY = 260;
	const R = 185;

	type Conn = 'active' | 'future';

	const defs: [string, Conn][] = [
		['Perception', 'active'],
		['Sablier', 'active'],
		['Opus', 'active'],
		['Vision', 'active'],
		['Glouton', 'active'],
		['Ardoise', 'active'],
		['Plume', 'active'],
		['Portail', 'active'],
		['Nuage', 'active'],
		['Echo', 'active'],
		['Capsule', 'active'],
		['Courrier', 'active'],
		['Agenda', 'active'],
		['Scribe', 'active']
	];

	const nodes = defs.map(([name, conn], i) => {
		const a = -Math.PI / 2 + ((2 * Math.PI) / defs.length) * i;
		const x = Math.round(CX + R * Math.cos(a));
		const y = Math.round(CY + R * Math.sin(a));
		const lx = Math.round(CX + (R + 24) * Math.cos(a));
		const ly = Math.round(CY + (R + 24) * Math.sin(a));
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
		viewBox="-40 0 880 520"
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
				stroke-opacity={n.conn === 'active' ? 0.25 : 0.06}
				stroke-width={n.conn === 'future' ? 0.5 : 1}
				class="conn"
				style="--delay:{n.i * 80}ms"
			/>
		{/each}

		{#each nodes as n}
			{#if n.conn === 'active'}
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
					font-size="13"
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
		<g transform="translate({CX}, {CY}) scale(1.25) translate(-12, -12)">
			<path fill="white" d="M14.5 12.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0"/>
			<path fill="white" d="M10.31 17.344c.767-.876 1.151-1.314 1.625-1.342q.065-.004.13 0c.474.028.858.466 1.625 1.342c1.67 1.906 2.505 2.858 2.271 3.68q-.03.107-.074.206C15.543 22 14.362 22 12 22s-3.543 0-3.887-.77a2 2 0 0 1-.074-.206c-.234-.822.6-1.774 2.27-3.68M14.5 12.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0"/>
			<path fill="white" fill-rule="evenodd" d="M12 8.035c-2.697 0-4.884 2.151-4.884 4.806a4.75 4.75 0 0 0 1.43 3.398a.68.68 0 0 1 0 .97a.706.706 0 0 1-.986 0a6.1 6.1 0 0 1-1.84-4.368c0-3.413 2.812-6.18 6.28-6.18s6.279 2.767 6.279 6.18a6.1 6.1 0 0 1-1.84 4.369a.706.706 0 0 1-.986 0a.68.68 0 0 1 0-.971a4.75 4.75 0 0 0 1.43-3.398c0-2.655-2.186-4.806-4.883-4.806" clip-rule="evenodd" opacity=".7"/>
			<path fill="white" fill-rule="evenodd" d="M12 4.373c-4.752 0-8.605 3.791-8.605 8.468c0 2.338.963 4.454 2.52 5.987a.68.68 0 0 1 0 .97a.706.706 0 0 1-.986 0A9.73 9.73 0 0 1 2 12.842C2 7.406 6.477 3 12 3s10 4.406 10 9.84a9.73 9.73 0 0 1-2.929 6.959a.706.706 0 0 1-.987 0a.68.68 0 0 1 0-.971a8.37 8.37 0 0 0 2.52-5.987c0-4.677-3.852-8.468-8.604-8.468" clip-rule="evenodd" opacity=".4"/>
		</g>
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
