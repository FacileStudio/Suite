<script lang="ts">
  let container: HTMLElement;
  let started = $state(false);
  let activeStep = $state(-1);
  let showPayoff = $state(false);

  const steps = [
    { phase: 'Trouver', tools: ['Glouton'] },
    { phase: 'Signer', tools: ['Plume'] },
    { phase: 'Planifier', tools: ['Opus', 'Agenda'] },
    { phase: 'Produire', tools: ['Sablier', 'Echo', 'Courrier', 'Scribe', 'Toile'] },
    { phase: 'Sécuriser', tools: ['Casier', 'Capsule', 'Nuage'] },
    { phase: 'Facturer', tools: ['Ardoise'] },
    { phase: 'Mesurer', tools: ['Vision', 'Nook', 'Perception'] }
  ];

  const STEP_MS = 900;
  const HOLD_MS = 2500;
  const RESET_MS = 1200;
  const INITIAL_DELAY = 300;
  const PAYOFF_DELAY = 500;

  let timers: ReturnType<typeof setTimeout>[] = [];

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function runFlow() {
    clearTimers();
    activeStep = -1;

    for (let i = 0; i < steps.length; i++) {
      timers.push(
        setTimeout(() => {
          activeStep = i;
        }, INITIAL_DELAY + i * STEP_MS)
      );
    }

    const lastStepTime = INITIAL_DELAY + (steps.length - 1) * STEP_MS;

    if (!showPayoff) {
      timers.push(
        setTimeout(() => {
          showPayoff = true;
        }, lastStepTime + PAYOFF_DELAY)
      );
    }

    timers.push(
      setTimeout(() => {
        activeStep = -1;
        timers.push(setTimeout(() => runFlow(), RESET_MS));
      }, lastStepTime + HOLD_MS)
    );
  }

  $effect(() => {
    if (!container) return;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      started = true;
      activeStep = steps.length - 1;
      showPayoff = true;
      return;
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          started = true;
          obs.disconnect();
          runFlow();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(container);

    return () => {
      obs.disconnect();
      clearTimers();
    };
  });
</script>

<div bind:this={container} class="workflow">
  <div class="relative">
    <div
      class="absolute left-3 top-0 bottom-0 w-px bg-fc-border sm:bottom-auto sm:left-[7%] sm:right-[7%] sm:top-3 sm:h-px sm:w-auto"
      aria-hidden="true"
    ></div>

    <div
      class="progress-line absolute left-3 top-0 w-px origin-top sm:hidden"
      style="height: 100%; background: var(--color-fc-success); transform: scaleY({activeStep > 0 ? activeStep / (steps.length - 1) : 0}); {activeStep < 0 ? 'transition: none;' : 'transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);'}"
      aria-hidden="true"
    ></div>

    <div
      class="progress-line absolute hidden sm:block sm:left-[7%] sm:right-[7%] sm:top-3 sm:h-px origin-left"
      style="background: var(--color-fc-success); transform: scaleX({activeStep > 0 ? activeStep / (steps.length - 1) : 0}); {activeStep < 0 ? 'transition: none;' : 'transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);'}"
      aria-hidden="true"
    ></div>

    <ol class="grid grid-cols-1 gap-8 sm:grid-cols-7 sm:gap-3">
      {#each steps as step, i}
        <li
          class="step flex items-start gap-4 sm:flex-col sm:items-center sm:gap-0"
          style="transition: opacity 0.5s ease {i * 100}ms, transform 0.5s ease {i * 100}ms; opacity: {started ? 1 : 0}; transform: translateY({started ? 0 : 12}px);"
        >
          <div
            class="dot relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border transition-all duration-500"
            class:dot-active={activeStep >= i}
            class:dot-inactive={activeStep < i}
            class:pulse={activeStep === i}
          >
            <div
              class="size-2 rounded-full transition-colors duration-500"
              class:inner-active={activeStep >= i}
              class:inner-inactive={activeStep < i}
            ></div>
          </div>
          <div class="sm:mt-3 sm:text-center">
            <p
              class="text-sm font-bold tracking-tight transition-colors duration-500"
              class:label-active={activeStep >= i}
              class:label-inactive={activeStep < i}
            >
              {step.phase}
            </p>
            {#each step.tools as tool}
              <p class="text-xs leading-relaxed text-fc-fg-muted">{tool}</p>
            {/each}
          </div>
        </li>
      {/each}
    </ol>
  </div>

  <div class="payoff" class:payoff-visible={showPayoff}>
    <div class="payoff-card">
      <svg class="size-5 shrink-0 text-fc-success" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.12" />
        <path d="M7.5 12.5l3 3 6-6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span class="text-sm font-semibold tracking-tight text-fc-fg">
        Du premier contact au paiement — sans friction.
      </span>
    </div>
  </div>
</div>

<style>
  @keyframes glow-idle {
    0%, 100% {
      box-shadow: 0 0 8px oklch(0.52 0.12 150 / 0.2);
    }
    50% {
      box-shadow: 0 0 14px oklch(0.52 0.12 150 / 0.45);
    }
  }

  @keyframes pulse-green {
    0%, 100% {
      box-shadow: 0 0 0 0 oklch(0.52 0.12 150 / 0.7);
    }
    50% {
      box-shadow: 0 0 0 12px oklch(0.52 0.12 150 / 0);
    }
  }

  .dot-active {
    border-color: var(--color-fc-success);
    background-color: oklch(0.52 0.12 150 / 0.1);
    animation: glow-idle 2s ease-in-out infinite;
  }

  .dot-inactive {
    border-color: var(--color-fc-border);
    background-color: var(--color-fc-surface);
    box-shadow: none;
    animation: none;
  }

  .pulse {
    animation: pulse-green 1.4s ease-in-out infinite;
  }

  .inner-active {
    background-color: var(--color-fc-success);
  }

  .inner-inactive {
    background-color: var(--color-fc-fg);
  }

  .label-active {
    color: var(--color-fc-success);
  }

  .label-inactive {
    color: var(--color-fc-fg);
  }

  .payoff {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    opacity: 0;
    transform: translateY(10px) scale(0.97);
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
  }

  .payoff-visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .payoff-card {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.625rem 1.25rem;
    border-radius: 9999px;
    border: 1px solid oklch(0.52 0.12 150 / 0.2);
    background-color: oklch(0.52 0.12 150 / 0.08);
    box-shadow: 0 0 20px oklch(0.52 0.12 150 / 0.15),
      0 1px 3px rgba(0, 0, 0, 0.06);
  }

  @media (prefers-reduced-motion: reduce) {
    .workflow .step {
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
    .pulse {
      animation: none !important;
    }
    .dot-active {
      animation: none !important;
    }
    .progress-line {
      display: none !important;
    }
    .payoff {
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
</style>
