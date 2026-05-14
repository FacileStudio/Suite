<script lang="ts">
  import Icon from '@iconify/svelte';
</script>

<svelte:head>
  <title>Facile Suite — Tools for small studios</title>
  <meta name="description" content="An integrated suite of self-hosted tools for small design and development studios. Time tracking, project management, lead generation, operational intelligence, and more." />
</svelte:head>

<div class="min-h-screen bg-white text-zinc-900">
  <header class="border-b border-zinc-200">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
      <a href="/" class="flex items-center gap-2.5">
        <Icon icon="solar:widget-5-bold-duotone" class="size-7 text-zinc-900" />
        <span class="font-[Goga] text-xl font-bold tracking-tight">Facile Suite</span>
      </a>
      <a
        href="https://facile.studio"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
      >
        facile.studio
        <Icon icon="solar:arrow-right-up-linear" class="size-3.5" />
      </a>
    </div>
  </header>

  <main>

    <section class="mx-auto max-w-5xl px-6 py-28 md:py-36">
      <p class="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3.5 py-1 text-xs text-zinc-600">
        <Icon icon="solar:server-square-linear" class="size-3" />
        Self-hosted &middot; Open source &middot; Integrated
      </p>
      <h1 class="max-w-3xl font-[Goga] text-5xl leading-[1.08] tracking-tight md:text-6xl">
        Everything a small studio<br class="hidden sm:block" />
        needs to run.
      </h1>
      <p class="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
        Seven tools that share events, users, and infrastructure.
        One server, one login, full control.
      </p>
      <a
        href="#perception"
        class="mt-10 inline-flex items-center gap-2 rounded-md bg-zinc-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800"
      >
        Explore the suite
        <Icon icon="solar:arrow-down-linear" class="size-4" />
      </a>
    </section>

    <!-- Perception — flagship, full-width -->
    <section id="perception" class="border-y border-zinc-200 bg-zinc-950 text-white">
      <div class="mx-auto max-w-5xl px-6 py-24">
        <div class="mb-8 flex items-center gap-3">
          <svg class="size-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" opacity=".5" d="M2 12c0 1.64.425 2.191 1.275 3.296C4.972 17.5 7.818 20 12 20s7.028-2.5 8.725-4.704C21.575 14.192 22 13.639 22 12c0-1.64-.425-2.191-1.275-3.296C19.028 6.5 16.182 4 12 4S4.972 6.5 3.275 8.704C2.425 9.81 2 10.361 2 12"/>
            <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M8.25 12a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0m1.5 0a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0"/>
          </svg>
          <span class="font-[Goga] text-2xl font-semibold tracking-tight">Perception</span>
        </div>
        <h2 class="max-w-2xl font-[Goga] text-4xl leading-[1.1] tracking-tight md:text-5xl">
          Operational intelligence<br class="hidden sm:block" />
          that thinks ahead.
        </h2>
        <p class="mt-6 max-w-xl leading-relaxed text-zinc-400">
          Ingests events from the entire stack. Builds a knowledge graph linking clients, contracts, projects, and services across providers. Answers grounded questions via streaming chat.
        </p>

        <dl class="mt-14 grid gap-x-16 gap-y-8 sm:grid-cols-2">
          {#each [
            { term: 'Hybrid retrieval', def: 'Twelve parallel lanes — vector, full-text, SQL, entity graph, community summaries. Every answer cites its evidence.' },
            { term: 'Entity resolution', def: 'A client in Opus, a signer in DocuSeal, and a timer in Sablier automatically merge into one entity.' },
            { term: 'Bayesian forecasting', def: 'Calibrated confidence intervals and ensemble strategies that track their own accuracy over time.' },
            { term: 'Anomaly detection', def: 'BOCPD surfaces regime shifts in real time. Granger causality reveals which signals drive downstream effects.' },
          ] as item}
            <div>
              <dt class="text-sm font-semibold text-white">{item.term}</dt>
              <dd class="mt-1 text-sm leading-relaxed text-zinc-400">{item.def}</dd>
            </div>
          {/each}
        </dl>
      </div>
    </section>

    <!-- Toolkit — 2-col, each tool has its real logo + tight description -->
    <section class="mx-auto max-w-5xl px-6 py-24">
      <h2 class="mb-14 font-[Goga] text-3xl tracking-tight">The toolkit.</h2>

      <div class="grid gap-x-16 gap-y-12 md:grid-cols-2">

        <!-- Sablier -->
        <div>
          <div class="mb-3 flex items-center gap-3">
            <svg class="size-6 text-zinc-900" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" fill-rule="evenodd" d="M12 2C7.867 2 5.8 2 5.198 3.3a2.5 2.5 0 0 0-.13.346c-.41 1.387 1.052 2.995 3.974 6.21L11 12h2l1.958-2.143c2.922-3.216 4.383-4.824 3.974-6.21a2.5 2.5 0 0 0-.13-.348C18.2 2 16.133 2 12 2" clip-rule="evenodd"/>
              <path fill="currentColor" d="M5.198 20.7C5.8 22 7.867 22 12 22s6.2 0 6.802-1.3a2.5 2.5 0 0 0 .13-.346c.41-1.387-1.052-2.995-3.974-6.21L13 12h-2l-1.958 2.143c-2.922 3.216-4.383 4.824-3.974 6.21q.052.18.13.348" opacity=".5"/>
            </svg>
            <h3 class="font-[Goga] text-lg font-semibold tracking-tight">Sablier</h3>
          </div>
          <p class="text-sm leading-relaxed text-zinc-600">
            Time tracking for billable teams. One-click timers, manual entries, per-project breakdowns, and shared sessions. OIDC SSO across the studio.
          </p>
        </div>

        <!-- Opus -->
        <div>
          <div class="mb-3 flex items-center gap-3">
            <svg class="size-6 text-zinc-900" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M13 15.4c0-2.074 0-3.111.659-3.756S15.379 11 17.5 11s3.182 0 3.841.644C22 12.29 22 13.326 22 15.4v2.2c0 2.074 0 3.111-.659 3.756S19.621 22 17.5 22s-3.182 0-3.841-.644C13 20.71 13 19.674 13 17.6z" opacity=".5"/>
              <path fill="currentColor" d="M2 8.6c0 2.074 0 3.111.659 3.756S4.379 13 6.5 13s3.182 0 3.841-.644C11 11.71 11 10.674 11 8.6V6.4c0-2.074 0-3.111-.659-3.756S8.621 2 6.5 2s-3.182 0-3.841.644C2 3.29 2 4.326 2 6.4zm11-3.1c0-1.087 0-1.63.171-2.06a2.3 2.3 0 0 1 1.218-1.262C14.802 2 15.327 2 16.375 2h2.25c1.048 0 1.573 0 1.986.178c.551.236.99.69 1.218 1.262c.171.43.171.973.171 2.06s0 1.63-.171 2.06a2.3 2.3 0 0 1-1.218 1.262C20.198 9 19.673 9 18.625 9h-2.25c-1.048 0-1.573 0-1.986-.178a2.3 2.3 0 0 1-1.218-1.262C13 7.13 13 6.587 13 5.5"/>
              <path fill="currentColor" d="M2 18.5c0 1.087 0 1.63.171 2.06a2.3 2.3 0 0 0 1.218 1.262c.413.178.938.178 1.986.178h2.25c1.048 0 1.573 0 1.986-.178c.551-.236.99-.69 1.218-1.262c.171-.43.171-.973.171-2.06s0-1.63-.171-2.06a2.3 2.3 0 0 0-1.218-1.262C9.198 15 8.673 15 7.625 15h-2.25c-1.048 0-1.573 0-1.986.178c-.551.236-.99.69-1.218 1.262C2 16.87 2 17.413 2 18.5" opacity=".5"/>
            </svg>
            <h3 class="font-[Goga] text-lg font-semibold tracking-tight">Opus</h3>
          </div>
          <p class="text-sm leading-relaxed text-zinc-600">
            Project management that stays out of the way. Kanban boards, task relations, labels, activity feeds. Clean interface, fast search, no feature bloat.
          </p>
        </div>

        <!-- Vision -->
        <div>
          <div class="mb-3 flex items-center gap-3">
            <svg class="size-6 text-zinc-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" fill-rule="evenodd" d="M18.448 3.073c-1.06-.332-2.03.514-2.03 1.547v3.626c-1.296.252-2.804.397-4.418.397s-3.122-.145-4.419-.397V4.62c0-1.033-.97-1.879-2.028-1.547c-.982.307-1.831.697-2.45 1.17C2.495 4.705 2 5.338 2 6.13v11.95q.002.323.104.614q.091.262.244.493c.324.491.841.894 1.44 1.223c.609.334 1.351.62 2.185.852C7.64 21.727 9.737 22 12 22c1.9 0 3.682-.192 5.189-.529c1.493-.333 2.773-.82 3.63-1.445c.208-.152.405-.322.576-.511c.36-.398.605-.877.605-1.436V6.13c0-.792-.494-1.425-1.103-1.889c-.619-.472-1.468-.862-2.45-1.169m2.157 5.154l-.081.052c-.823.516-1.952.93-3.254 1.227c-1.524.347-3.335.547-5.27.547s-3.745-.2-5.27-.547c-1.302-.297-2.431-.71-3.254-1.227l-.08-.052v9.162l2.83-2.675l1.276-1.08a2.39 2.39 0 0 1 3.192.105l3.09 2.985a.786.786 0 0 0 .975.078l.215-.145a2.91 2.91 0 0 1 3.532.207l1.9 1.653c.157-.188.199-.337.199-.438z" clip-rule="evenodd"/>
              <path fill="currentColor" d="M19.21 12.84c0 .778-.625 1.41-1.396 1.41s-1.395-.632-1.395-1.41s.625-1.41 1.395-1.41s1.396.632 1.396 1.41" opacity=".5"/>
            </svg>
            <h3 class="font-[Goga] text-lg font-semibold tracking-tight">Vision</h3>
          </div>
          <p class="text-sm leading-relaxed text-zinc-600">
            Lightweight web analytics. Single script tag, real-time pageviews, referrers, countries. Domain-locked events prevent spoofing. Privacy-first.
          </p>
        </div>

        <!-- Glouton -->
        <div>
          <div class="mb-3 flex items-center gap-3">
            <Icon icon="solar:magnet-bold-duotone" class="size-6 text-zinc-900" />
            <h3 class="font-[Goga] text-lg font-semibold tracking-tight">Glouton</h3>
          </div>
          <p class="text-sm leading-relaxed text-zinc-600">
            Automated lead generation. Crawls websites, scrapes freelance platforms, detects tech stacks, and scores prospects HOT/WARM/COLD with real-time WebSocket updates.
          </p>
        </div>

        <!-- Nook -->
        <div>
          <div class="mb-3 flex items-center gap-3">
            <svg class="size-6 text-zinc-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M10.31 17.344c.767-.876 1.151-1.314 1.625-1.342q.065-.004.13 0c.474.028.858.466 1.625 1.342c1.67 1.906 2.505 2.858 2.271 3.68q-.03.107-.074.206C15.543 22 14.362 22 12 22s-3.543 0-3.887-.77a2 2 0 0 1-.074-.206c-.234-.822.6-1.774 2.27-3.68M14.5 12.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0"/>
              <path fill="currentColor" fill-rule="evenodd" d="M12 8.035c-2.697 0-4.884 2.151-4.884 4.806a4.75 4.75 0 0 0 1.43 3.398a.68.68 0 0 1 0 .97a.706.706 0 0 1-.986 0a6.1 6.1 0 0 1-1.84-4.368c0-3.413 2.812-6.18 6.28-6.18s6.279 2.767 6.279 6.18a6.1 6.1 0 0 1-1.84 4.369a.706.706 0 0 1-.986 0a.68.68 0 0 1 0-.971a4.75 4.75 0 0 0 1.43-3.398c0-2.655-2.186-4.806-4.883-4.806" clip-rule="evenodd" opacity=".7"/>
              <path fill="currentColor" fill-rule="evenodd" d="M12 4.373c-4.752 0-8.605 3.791-8.605 8.468c0 2.338.963 4.454 2.52 5.987a.68.68 0 0 1 0 .97a.706.706 0 0 1-.986 0A9.73 9.73 0 0 1 2 12.842C2 7.406 6.477 3 12 3s10 4.406 10 9.84a9.73 9.73 0 0 1-2.929 6.959a.706.706 0 0 1-.987 0a.68.68 0 0 1 0-.971a8.37 8.37 0 0 0 2.52-5.987c0-4.677-3.852-8.468-8.604-8.468" clip-rule="evenodd" opacity=".4"/>
            </svg>
            <h3 class="font-[Goga] text-lg font-semibold tracking-tight">Nook</h3>
          </div>
          <p class="text-sm leading-relaxed text-zinc-600">
            Centralized alert relay. Monitors uptime, ingests webhooks from Dokploy, DocuSeal, and Uptime Kuma, then broadcasts to Matrix, Discord, SMTP, ntfy, or Perception.
          </p>
        </div>

        <!-- Portail -->
        <div>
          <div class="mb-3 flex items-center gap-3">
            <Icon icon="solar:home-angle-bold-duotone" class="size-6 text-zinc-900" />
            <h3 class="font-[Goga] text-lg font-semibold tracking-tight">Portail</h3>
          </div>
          <p class="text-sm leading-relaxed text-zinc-600">
            The team's front door. A static portal linking every service — deployments, monitoring, storage, docs, passwords — generated from a single YAML file.
          </p>
        </div>

      </div>
    </section>

    <!-- Infrastructure — compact, different visual rhythm -->
    <section class="border-y border-zinc-200 bg-zinc-50/60">
      <div class="mx-auto max-w-5xl px-6 py-20">
        <h2 class="font-[Goga] text-3xl tracking-tight">One server, everything connected.</h2>
        <p class="mt-4 max-w-lg text-sm leading-relaxed text-zinc-600">
          The suite runs on a single VPS behind Traefik. Dokploy handles deployments, Netdata watches resources, and every tool authenticates through one SSO provider.
        </p>
        <div class="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {#each ['Traefik', 'Dokploy', 'Netdata', 'n8n', 'DocuSeal', 'Nextcloud', 'Vaultwarden'] as name}
            <span class="text-sm text-zinc-500">{name}</span>
          {/each}
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-5xl px-6 py-24 text-center">
      <h2 class="font-[Goga] text-3xl tracking-tight">Built by a team of four.</h2>
      <p class="mt-3 text-zinc-600">
        Two developers. Two designers. One shared infrastructure.
      </p>
      <a
        href="https://facile.studio"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-8 inline-flex items-center gap-2 rounded-md bg-zinc-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800"
      >
        Visit facile.studio
        <Icon icon="solar:arrow-right-up-linear" class="size-4" />
      </a>
    </section>
  </main>

  <footer class="border-t border-zinc-200">
    <div class="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-zinc-600">
      &copy; {new Date().getFullYear()} <a href="https://facile.studio" class="font-semibold underline hover:cursor-pointer">Facile.</a>
    </div>
  </footer>
</div>
