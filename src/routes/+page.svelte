<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { Action } from 'svelte/action';
  import InterconnectivityGraph from '$lib/InterconnectivityGraph.svelte';
  import WorkflowDiagram from '$lib/WorkflowDiagram.svelte';

  let visible = $state(false);

  $effect(() => {
    visible = true;
  });

  const reveal: Action<HTMLElement, { delay?: number; threshold?: number }> = (node, params = {}) => {
    const { delay = 0, threshold = 0.15 } = params;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.style.opacity = '1';
      return { destroy() {} };
    }

    node.style.opacity = '0';
    node.style.transform = 'translateY(32px) scale(0.97)';
    node.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.style.opacity = '1';
          node.style.transform = 'translateY(0) scale(1)';
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      }
    };
  };

  const card = 'group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none bg-fc-component';
  const glow = 'pointer-events-none absolute -right-20 -top-20 size-40 rounded-full bg-fc-fg/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-70';
  const ico = 'transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110';
</script>

<svelte:head>
  <title>Facile Suite — Votre studio tourne tout seul</title>
  <meta name="description" content="Seize outils qui se parlent, sur votre serveur. Temps, projets, leads, signatures, factures, secrets, logs — un seul login, zéro dépendance cloud." />
</svelte:head>

<div class="min-h-screen bg-fc-page text-fc-fg">
  <header class="fixed top-0 z-50 w-full border-b border-fc-border bg-fc-page/90 backdrop-blur-sm">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
      <a href="/" class="flex items-center gap-2.5">
        <Icon icon="solar:widget-5-bold-duotone" class="size-7 text-fc-fg" />
        <span class="text-xl font-black tracking-tight">Facile Suite</span>
      </a>
      <a
        href="https://facile.studio"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 rounded-md bg-fc-accent px-4 py-2 text-sm font-medium text-fc-accent-fg transition-colors hover:bg-fc-fg/80"
      >
        facile.studio
        <Icon icon="solar:arrow-right-up-linear" class="size-3.5" />
      </a>
    </div>
  </header>

  <main>

    <!-- Hero -->
    <section class="mx-auto max-w-5xl px-6 pt-36 pb-28 md:pt-44 md:pb-36">
      <div class="transition-all duration-700 ease-out {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}">
        <p class="mb-6 inline-flex items-center gap-2 rounded-full border border-fc-border px-3.5 py-1 text-xs text-fc-fg-muted">
          Auto-hébergé &middot; Open source &middot; Intégré
        </p>
        <h1 class="max-w-3xl text-5xl leading-[1.08] font-black tracking-tight md:text-7xl">
          On simplifie.<br />
          <span class="text-fc-fg-muted">Vous bossez.</span>
        </h1>
        <p class="mt-8 max-w-lg text-lg leading-relaxed text-fc-fg-muted">
          Seize outils qui se parlent, sur votre serveur.
          Temps, projets, leads, signatures, factures, secrets, logs — un seul login, zéro dépendance cloud.
        </p>
        <div class="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#interconnectivity"
            class="inline-flex items-center gap-2 rounded-md bg-fc-accent px-6 py-3 text-base font-medium text-fc-accent-fg transition-colors hover:bg-fc-fg/80"
          >
            Découvrir la suite
            <Icon icon="solar:arrow-down-linear" class="size-4" />
          </a>
          <a
            href="https://facile.studio"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-md border border-fc-border px-6 py-3 text-base font-medium text-fc-fg-muted transition-colors hover:border-fc-ring hover:text-fc-fg"
          >
            Qui sommes-nous
            <Icon icon="solar:arrow-right-up-linear" class="size-3.5" />
          </a>
        </div>
      </div>
    </section>

    <!-- Antenne -->
    <section id="interconnectivity" class="border-y border-fc-border bg-fc-accent text-fc-accent-fg">
      <div class="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <div use:reveal={{ delay: 0 }} class="mb-10 flex items-center gap-3">
          <svg class="size-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M10.31 17.344c.767-.876 1.151-1.314 1.625-1.342q.065-.004.13 0c.474.028.858.466 1.625 1.342c1.67 1.906 2.505 2.858 2.271 3.68q-.03.107-.074.206C15.543 22 14.362 22 12 22s-3.543 0-3.887-.77a2 2 0 0 1-.074-.206c-.234-.822.6-1.774 2.27-3.68M14.5 12.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0"/>
            <path fill="currentColor" fill-rule="evenodd" d="M12 8.035c-2.697 0-4.884 2.151-4.884 4.806a4.75 4.75 0 0 0 1.43 3.398a.68.68 0 0 1 0 .97a.706.706 0 0 1-.986 0a6.1 6.1 0 0 1-1.84-4.368c0-3.413 2.812-6.18 6.28-6.18s6.279 2.767 6.279 6.18a6.1 6.1 0 0 1-1.84 4.369a.706.706 0 0 1-.986 0a.68.68 0 0 1 0-.971a4.75 4.75 0 0 0 1.43-3.398c0-2.655-2.186-4.806-4.883-4.806" clip-rule="evenodd" opacity=".7"/>
            <path fill="currentColor" fill-rule="evenodd" d="M12 4.373c-4.752 0-8.605 3.791-8.605 8.468c0 2.338.963 4.454 2.52 5.987a.68.68 0 0 1 0 .97a.706.706 0 0 1-.986 0A9.73 9.73 0 0 1 2 12.842C2 7.406 6.477 3 12 3s10 4.406 10 9.84a9.73 9.73 0 0 1-2.929 6.959a.706.706 0 0 1-.987 0a.68.68 0 0 1 0-.971a8.37 8.37 0 0 0 2.52-5.987c0-4.677-3.852-8.468-8.604-8.468" clip-rule="evenodd" opacity=".4"/>
          </svg>
          <span class="text-2xl font-semibold tracking-tight">Antenne</span>
        </div>
        <h2 use:reveal={{ delay: 100 }} class="max-w-2xl text-4xl leading-[1.1] font-black tracking-tight md:text-6xl">
          Tout passe par Antenne.<br />
          <span class="text-fc-accent-fg/50">Zéro configuration.</span>
        </h2>
        <p use:reveal={{ delay: 200 }} class="mt-8 max-w-xl text-lg leading-relaxed text-fc-accent-fg/65">
          Chaque outil émet et reçoit des événements via le bus central en production. Opus crée un projet, Sablier le reçoit. Plume signe un document, Ardoise le facture. Les apps s'enregistrent — ajoutez-en une, elle rejoint le réseau toute seule.
        </p>
        <div class="mt-16">
          <InterconnectivityGraph />
        </div>
      </div>
    </section>

    <!-- Tools Grid -->
    <section class="mx-auto max-w-5xl px-6 py-28 md:py-36">
      <div use:reveal={{ delay: 0 }} class="mb-16 max-w-lg">
        <h2 class="text-4xl font-black tracking-tight md:text-5xl">Chaque outil<br />fait une chose bien.</h2>
        <p class="mt-4 text-fc-fg-muted">Pas de bloat. Pas de features fantômes. Juste ce qu'il faut pour que le studio tourne.</p>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <!-- Sablier -->
        <a href="https://sablier.facile.studio" target="_blank" rel="noopener noreferrer" use:reveal={{ delay: 0 }} class="{card} block no-underline">
          <div class={glow}></div>
          <div class="mb-4 flex items-center gap-3">
            <div class={ico}>
              <svg class="size-6 text-fc-fg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" fill-rule="evenodd" d="M12 2C7.867 2 5.8 2 5.198 3.3a2.5 2.5 0 0 0-.13.346c-.41 1.387 1.052 2.995 3.974 6.21L11 12h2l1.958-2.143c2.922-3.216 4.383-4.824 3.974-6.21a2.5 2.5 0 0 0-.13-.348C18.2 2 16.133 2 12 2" clip-rule="evenodd"/>
                <path fill="currentColor" d="M5.198 20.7C5.8 22 7.867 22 12 22s6.2 0 6.802-1.3a2.5 2.5 0 0 0 .13-.346c.41-1.387-1.052-2.995-3.974-6.21L13 12h-2l-1.958 2.143c-2.922 3.216-4.383 4.824-3.974 6.21q.052.18.13.348" opacity=".5"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold tracking-tight">Sablier</h3>
          </div>
          <p class="text-sm leading-relaxed text-fc-fg-muted">
            Vos heures facturables, tracées sans friction. Un clic pour lancer, un clic pour arrêter. Ventilation par projet et sessions partagées.
          </p>
        </a>

        <!-- Opus -->
        <a href="https://opus.facile.studio" target="_blank" rel="noopener noreferrer" use:reveal={{ delay: 70 }} class="{card} block no-underline">
          <div class={glow}></div>
          <div class="mb-4 flex items-center gap-3">
            <div class={ico}>
              <svg class="size-6 text-fc-fg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M6 8c0-2.828 0-4.243.879-5.121C7.757 2 9.172 2 12 2s4.243 0 5.121.879C18 3.757 18 5.172 18 8v8c0 2.828 0 4.243-.879 5.121C16.243 22 14.828 22 12 22s-4.243 0-5.121-.879C6 20.243 6 18.828 6 16z"/>
                <path fill="currentColor" d="M6.141 4.5C6 5.343 6 6.462 6 8v8c0 1.538 0 2.657.141 3.5H6c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092C2 17.6 2 16.9 2 15.5v-7c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C3.9 4.5 4.6 4.5 6 4.5zm11.718 0C18 5.343 18 6.462 18 8v8c0 1.538 0 2.657-.141 3.5H18c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.092-1.092C22 17.6 22 16.9 22 15.5v-7c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093C20.1 4.5 19.4 4.5 18 4.5z" opacity=".5"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold tracking-tight">Opus</h3>
          </div>
          <p class="text-sm leading-relaxed text-fc-fg-muted">
            La gestion de projet qui ne vous ralentit pas. Kanban, relations entre tâches, recherche instantanée — le minimum qui fait le maximum.
          </p>
        </a>

        <!-- Vision -->
        <a href="https://vision.facile.studio" target="_blank" rel="noopener noreferrer" use:reveal={{ delay: 140 }} class="{card} block no-underline">
          <div class={glow}></div>
          <div class="mb-4 flex items-center gap-3">
            <div class={ico}>
              <svg class="size-6 text-fc-fg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" fill-rule="evenodd" d="M18.448 3.073c-1.06-.332-2.03.514-2.03 1.547v3.626c-1.296.252-2.804.397-4.418.397s-3.122-.145-4.419-.397V4.62c0-1.033-.97-1.879-2.028-1.547c-.982.307-1.831.697-2.45 1.17C2.495 4.705 2 5.338 2 6.13v11.95q.002.323.104.614q.091.262.244.493c.324.491.841.894 1.44 1.223c.609.334 1.351.62 2.185.852C7.64 21.727 9.737 22 12 22c1.9 0 3.682-.192 5.189-.529c1.493-.333 2.773-.82 3.63-1.445c.208-.152.405-.322.576-.511c.36-.398.605-.877.605-1.436V6.13c0-.792-.494-1.425-1.103-1.889c-.619-.472-1.468-.862-2.45-1.169m2.157 5.154l-.081.052c-.823.516-1.952.93-3.254 1.227c-1.524.347-3.335.547-5.27.547s-3.745-.2-5.27-.547c-1.302-.297-2.431-.71-3.254-1.227l-.08-.052v9.162l2.83-2.675l1.276-1.08a2.39 2.39 0 0 1 3.192.105l3.09 2.985a.786.786 0 0 0 .975.078l.215-.145a2.91 2.91 0 0 1 3.532.207l1.9 1.653c.157-.188.199-.337.199-.438z" clip-rule="evenodd"/>
                <path fill="currentColor" d="M19.21 12.84c0 .778-.625 1.41-1.396 1.41s-1.395-.632-1.395-1.41s.625-1.41 1.395-1.41s1.396.632 1.396 1.41" opacity=".5"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold tracking-tight">Vision</h3>
          </div>
          <p class="text-sm leading-relaxed text-fc-fg-muted">
            L'analytique web qui respecte vos visiteurs. Un script, zéro cookie, données en temps réel.
          </p>
        </a>

        <!-- Glouton -->
        <a href="https://glouton.facile.studio" target="_blank" rel="noopener noreferrer" use:reveal={{ delay: 210 }} class="{card} block no-underline">
          <div class={glow}></div>
          <div class="mb-4 flex items-center gap-3">
            <div class={ico}>
              <svg class="size-6 text-fc-fg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M14.5 3H11a9 9 0 1 0 0 18h3.5v-4.5h-3.556a4.5 4.5 0 0 1 0-9H14.5z"/>
                <path fill="currentColor" d="M23.503 14.846a11.3 11.3 0 0 1-.553 1.998a7.7 7.7 0 0 1-.572 1.195a5 5 0 0 1-.289.425l-.007.01l-.003.003l-.002.002v.001a.75.75 0 0 1-1.157-.956l.003-.004l.031-.041q.047-.062.137-.212c.12-.199.288-.516.459-.961c.162-.42.327-.956.456-1.617c.127-.65.22-1.42.24-2.32a17 17 0 0 0-.057-1.764c-.117-1.285-.383-2.244-.639-2.91a6 6 0 0 0-.459-.962a3 3 0 0 0-.168-.253l-.003-.004a.75.75 0 0 1 1.156-.956l.001.001l.002.002l.003.003l.007.01a2 2 0 0 1 .086.114q.08.109.203.311c.161.27.368.665.572 1.195c.301.783.594 1.855.726 3.243q.072.74.074 1.601m0 0a15.6 15.6 0 0 1-.247 2.846z" opacity=".4"/>
                <path fill="currentColor" d="M20.156 8.636a.75.75 0 0 0-1.316.72l.005.01q.01.02.037.086c.035.087.087.235.142.447c.108.424.226 1.111.226 2.101s-.118 1.677-.226 2.101a4 4 0 0 1-.18.534l-.005.01a.75.75 0 0 0 1.317.72L19.5 15l.656.364l.001-.002l.002-.003l.004-.008l.01-.018l.026-.053q.03-.064.076-.175a5 5 0 0 0 .202-.631c.14-.551.273-1.364.273-2.474s-.132-1.923-.273-2.474a5 5 0 0 0-.202-.631a3 3 0 0 0-.103-.228l-.01-.018l-.003-.007l-.002-.003v-.002s-.001-.001-.657.363z" opacity=".7"/>
                <path fill="currentColor" d="M14.5 7.5h2A1.5 1.5 0 0 0 18 6V4.5A1.5 1.5 0 0 0 16.5 3h-2zm0 9V21h2a1.5 1.5 0 0 0 1.5-1.5V18a1.5 1.5 0 0 0-1.5-1.5z" opacity=".5"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold tracking-tight">Glouton</h3>
          </div>
          <p class="text-sm leading-relaxed text-fc-fg-muted">
            Vos prochains clients, trouvés pendant que vous dormez. Glouton crawle le web, détecte les stacks techniques, score les prospects.
          </p>
        </a>

        <!-- Ardoise -->
        <a href="https://ardoise.facile.studio" target="_blank" rel="noopener noreferrer" use:reveal={{ delay: 280 }} class="{card} block no-underline">
          <div class={glow}></div>
          <div class="mb-4 flex items-center gap-3">
            <div class={ico}>
              <svg class="size-6 text-fc-fg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M7.245 2h9.51c1.159 0 1.738 0 2.206.163a3.05 3.05 0 0 1 1.881 1.936C21 4.581 21 5.177 21 6.37v14.004c0 .858-.985 1.314-1.608.744a.946.946 0 0 0-1.284 0l-.483.442a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0l-.483-.442a.946.946 0 0 0-1.284 0c-.623.57-1.608.114-1.608-.744V6.37c0-1.193 0-1.79.158-2.27c.3-.913.995-1.629 1.881-1.937C5.507 2 6.086 2 7.245 2" opacity=".5"/>
                <path fill="currentColor" d="M7 6.75a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3.5 0a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 0-1.5zM7 10.25a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3.5 0a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 0-1.5zM7 13.75a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3.5 0a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 0-1.5z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold tracking-tight">Ardoise</h3>
          </div>
          <p class="text-sm leading-relaxed text-fc-fg-muted">
            Facturez, encaissez, oubliez. Stripe intégré, emails automatiques, reçus téléchargeables.
          </p>
        </a>

        <!-- Plume -->
        <a href="https://plume.facile.studio" target="_blank" rel="noopener noreferrer" use:reveal={{ delay: 350 }} class="{card} block no-underline">
          <div class={glow}></div>
          <div class="mb-4 flex items-center gap-3">
            <div class={ico}>
              <svg class="size-6 text-fc-fg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M1 12c0-5.185 0-7.778 1.61-9.39C4.223 1 6.816 1 12 1s7.778 0 9.39 1.61C23 4.223 23 6.816 23 12s0 7.778-1.61 9.39C19.777 23 17.184 23 12 23s-7.778 0-9.39-1.61C1 19.777 1 17.184 1 12" opacity=".5"/>
                <path fill="currentColor" d="M13.926 14.302c.245-.191.467-.413.912-.858l5.54-5.54c.134-.134.073-.365-.106-.427a6.1 6.1 0 0 1-2.3-1.449a6.1 6.1 0 0 1-1.45-2.3c-.061-.18-.292-.24-.426-.106l-5.54 5.54c-.445.444-.667.667-.858.912a5 5 0 0 0-.577.932c-.133.28-.233.579-.431 1.175l-.257.77l-.409 1.226l-.382 1.148a.817.817 0 0 0 1.032 1.033l1.15-.383l1.224-.408l.77-.257c.597-.199.895-.298 1.175-.432q.498-.237.933-.576m8.187-8.132a3.028 3.028 0 0 0-4.282-4.283l-.179.178a.73.73 0 0 0-.206.651c.027.15.077.37.168.633a4.9 4.9 0 0 0 1.174 1.863a4.9 4.9 0 0 0 1.862 1.174c.263.09.483.141.633.168c.24.043.48-.035.652-.207z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold tracking-tight">Plume</h3>
          </div>
          <p class="text-sm leading-relaxed text-fc-fg-muted">
            La signature électronique sans usine à gaz. Déposez un PDF, placez les champs, envoyez le lien.
          </p>
        </a>

        <!-- Casier -->
        <a href="https://casier.facile.studio" target="_blank" rel="noopener noreferrer" use:reveal={{ delay: 420 }} class="{card} block no-underline">
          <div class={glow}></div>
          <div class="mb-4 flex items-center gap-3">
            <div class={ico}>
              <svg class="size-6 text-fc-fg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M3.464 3.464C2 4.93 2 7.286 2 12s0 7.071 1.464 8.535C4.93 22 7.286 22 12 22s7.071 0 8.535-1.465C22 19.072 22 16.714 22 12s0-7.071-1.465-8.536C19.072 2 16.714 2 12 2S4.929 2 3.464 3.464" opacity=".5"/>
                <path fill="currentColor" d="M6.75 7a.75.75 0 0 0-1.5 0v10a.75.75 0 0 0 1.5 0z"/>
                <path fill="currentColor" fill-rule="evenodd" d="M9.47 7.47a.75.75 0 0 1 1.06 0l1.402 1.401A3.73 3.73 0 0 1 14 8.25c.764 0 1.475.229 2.068.621L17.47 7.47a.75.75 0 1 1 1.06 1.06l-1.4 1.402c.392.593.621 1.304.621 2.068s-.229 1.475-.621 2.068l1.401 1.402a.75.75 0 1 1-1.06 1.06l-1.402-1.401A3.73 3.73 0 0 1 14 15.75a3.73 3.73 0 0 1-2.068-.621L10.53 16.53a.75.75 0 1 1-1.06-1.06l1.401-1.402A3.73 3.73 0 0 1 10.25 12c0-.764.229-1.475.621-2.068L9.47 8.53a.75.75 0 0 1 0-1.06M11.75 12a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold tracking-tight">Casier</h3>
          </div>
          <p class="text-sm leading-relaxed text-fc-fg-muted">
            Coffre-fort à secrets pour votre équipe. Chiffré AES-256-GCM, versionné, audit log complet.
          </p>
        </a>

        <!-- Antenne -->
        <a href="https://nook.facile.studio" target="_blank" rel="noopener noreferrer" use:reveal={{ delay: 490 }} class="{card} block no-underline">
          <div class={glow}></div>
          <div class="mb-4 flex items-center gap-3">
            <div class={ico}>
              <svg class="size-6 text-fc-fg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M10.31 17.344c.767-.876 1.151-1.314 1.625-1.342q.065-.004.13 0c.474.028.858.466 1.625 1.342c1.67 1.906 2.505 2.858 2.271 3.68q-.03.107-.074.206C15.543 22 14.362 22 12 22s-3.543 0-3.887-.77a2 2 0 0 1-.074-.206c-.234-.822.6-1.774 2.27-3.68M14.5 12.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0"/>
                <path fill="currentColor" fill-rule="evenodd" d="M12 8.035c-2.697 0-4.884 2.151-4.884 4.806a4.75 4.75 0 0 0 1.43 3.398a.68.68 0 0 1 0 .97a.706.706 0 0 1-.986 0a6.1 6.1 0 0 1-1.84-4.368c0-3.413 2.812-6.18 6.28-6.18s6.279 2.767 6.279 6.18a6.1 6.1 0 0 1-1.84 4.369a.706.706 0 0 1-.986 0a.68.68 0 0 1 0-.971a4.75 4.75 0 0 0 1.43-3.398c0-2.655-2.186-4.806-4.883-4.806" clip-rule="evenodd" opacity=".7"/>
                <path fill="currentColor" fill-rule="evenodd" d="M12 4.373c-4.752 0-8.605 3.791-8.605 8.468c0 2.338.963 4.454 2.52 5.987a.68.68 0 0 1 0 .97a.706.706 0 0 1-.986 0A9.73 9.73 0 0 1 2 12.842C2 7.406 6.477 3 12 3s10 4.406 10 9.84a9.73 9.73 0 0 1-2.929 6.959a.706.706 0 0 1-.987 0a.68.68 0 0 1 0-.971a8.37 8.37 0 0 0 2.52-5.987c0-4.677-3.852-8.468-8.604-8.468" clip-rule="evenodd" opacity=".4"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold tracking-tight">Antenne</h3>
          </div>
          <p class="text-sm leading-relaxed text-fc-fg-muted">
            Le bus d'événements de la suite. Centralisez les alertes de toute votre infra, poussez-les sur Discord, Matrix, email.
          </p>
        </a>

        <!-- Nuage -->
        <a href="https://nuage.facile.studio" target="_blank" rel="noopener noreferrer" use:reveal={{ delay: 560 }} class="{card} block no-underline">
          <div class={glow}></div>
          <div class="mb-4 flex items-center gap-3">
            <div class={ico}>
              <svg class="size-6 text-fc-fg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" fill-rule="evenodd" d="M22 14.353C22 17.472 19.442 20 16.286 20h-5.787a7.5 7.5 0 0 1 7.487-11.853q.119.422.17.868C20.392 9.78 22 11.881 22 14.353" clip-rule="evenodd" opacity=".5"/>
                <path fill="currentColor" d="M12.476 4C9.32 4 6.762 6.528 6.762 9.647c0 .69.125 1.35.354 1.962a4.4 4.4 0 0 0-.83-.08C3.919 11.53 2 13.426 2 15.765S3.919 20 6.286 20H10.5a7.5 7.5 0 0 1 7.487-11.853l-.047-.158C17.224 5.68 15.048 4 12.476 4"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold tracking-tight">Nuage</h3>
          </div>
          <p class="text-sm leading-relaxed text-fc-fg-muted">
            Le stockage fichiers du studio. Upload, dossiers, recherche — un drive interne connecté à tous vos outils via API.
          </p>
        </a>

        <!-- Courrier -->
        <a href="https://courrier.facile.studio" target="_blank" rel="noopener noreferrer" use:reveal={{ delay: 630 }} class="{card} block no-underline">
          <div class={glow}></div>
          <div class="mb-4 flex items-center gap-3">
            <div class={ico}>
              <svg class="size-6 text-fc-fg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M14.2 3H9.8C5.652 3 3.577 3 2.289 4.318S1 7.758 1 12s0 6.364 1.289 7.682S5.652 21 9.8 21h4.4c4.148 0 6.223 0 7.511-1.318S23 16.242 23 12s0-6.364-1.289-7.682S18.348 3 14.2 3" opacity=".5"/>
                <path fill="currentColor" d="M19.128 8.033a.825.825 0 0 0-1.056-1.268l-2.375 1.98c-1.026.855-1.738 1.447-2.34 1.833c-.582.375-.977.5-1.357.5s-.774-.125-1.357-.5c-.601-.386-1.314-.978-2.34-1.834L5.928 6.765a.825.825 0 0 0-1.056 1.268l2.416 2.014c.975.812 1.765 1.47 2.463 1.92c.726.466 1.434.762 2.25.762c.814 0 1.522-.296 2.249-.763c.697-.448 1.487-1.107 2.462-1.92z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold tracking-tight">Courrier</h3>
          </div>
          <p class="text-sm leading-relaxed text-fc-fg-muted">
            Votre email, chez vous. IMAP et SMTP natifs, multi-comptes, interface épurée.
          </p>
        </a>

        <!-- Agenda -->
        <a href="https://agenda.facile.studio" target="_blank" rel="noopener noreferrer" use:reveal={{ delay: 700 }} class="{card} block no-underline">
          <div class={glow}></div>
          <div class="mb-4 flex items-center gap-3">
            <div class={ico}>
              <svg class="size-6 text-fc-fg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M6.94 2c.416 0 .753.324.753.724v1.46c.668-.012 1.417-.012 2.26-.012h4.015c.842 0 1.591 0 2.259.013v-1.46c0-.4.337-.725.753-.725s.753.324.753.724V4.25c1.445.111 2.394.384 3.09 1.055c.698.67.982 1.582 1.097 2.972L22 9H2v-.724c.116-1.39.4-2.302 1.097-2.972s1.645-.944 3.09-1.055V2.724c0-.4.337-.724.753-.724"/>
                <path fill="currentColor" d="M22 14v-2c0-.839-.004-2.335-.017-3H2.01c-.013.665-.01 2.161-.01 3v2c0 3.771 0 5.657 1.172 6.828S6.228 22 10 22h4c3.77 0 5.656 0 6.828-1.172S22 17.772 22 14" opacity=".5"/>
                <path fill="currentColor" d="M18 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold tracking-tight">Agenda</h3>
          </div>
          <p class="text-sm leading-relaxed text-fc-fg-muted">
            Le calendrier partagé du studio. Rendez-vous, deadlines, dispos — sans Google Calendar. CalDAV natif.
          </p>
        </a>

        <!-- Echo -->
        <a href="https://echo.facile.studio" target="_blank" rel="noopener noreferrer" use:reveal={{ delay: 770 }} class="{card} block no-underline">
          <div class={glow}></div>
          <div class="mb-4 flex items-center gap-3">
            <div class={ico}>
              <Icon icon="solar:videocamera-record-bold-duotone" class="size-6 text-fc-fg" />
            </div>
            <h3 class="text-lg font-bold tracking-tight">Echo</h3>
          </div>
          <p class="text-sm leading-relaxed text-fc-fg-muted">
            Visioconférence simple et sécurisée. Créez une salle, partagez le lien, c'est tout. Basé sur Jitsi.
          </p>
        </a>

        <!-- Capsule -->
        <a href="https://capsule.facile.studio" target="_blank" rel="noopener noreferrer" use:reveal={{ delay: 840 }} class="{card} block no-underline">
          <div class={glow}></div>
          <div class="mb-4 flex items-center gap-3">
            <div class={ico}>
              <svg class="size-6 text-fc-fg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M3.99 13.602a6.796 6.796 0 0 1 9.612-9.611l6.407 6.407a6.796 6.796 0 1 1-9.61 9.611z" opacity=".5"/>
                <path fill="currentColor" d="m7.807 17.419l-1.253-1.254l.495-.095h.001l.014-.004q.022-.004.073-.017q.105-.024.316-.091c.281-.09.697-.243 1.21-.49c1.024-.493 2.437-1.364 3.939-2.866c1.5-1.501 2.372-2.915 2.866-3.94c.247-.512.4-.927.49-1.209a5 5 0 0 0 .108-.389l.003-.014l.096-.496l1.253 1.253l-.032.103a11 11 0 0 1-.567 1.404c-.56 1.162-1.525 2.717-3.157 4.349c-1.631 1.631-3.187 2.597-4.348 3.156a11 11 0 0 1-1.507.6"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold tracking-tight">Capsule</h3>
          </div>
          <p class="text-sm leading-relaxed text-fc-fg-muted">
            Partagez un secret qui s'autodétruit. Chiffrement de bout en bout dans le navigateur, zero-knowledge côté serveur.
          </p>
        </a>

        <!-- Scribe -->
        <a href="https://scribe.facile.studio" target="_blank" rel="noopener noreferrer" use:reveal={{ delay: 910 }} class="{card} block no-underline">
          <div class={glow}></div>
          <div class="mb-4 flex items-center gap-3">
            <div class={ico}>
              <svg class="size-6 text-fc-fg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" fill-rule="evenodd" d="M4 9a.75.75 0 0 1 .75.75v1a7.25 7.25 0 1 0 14.5 0v-1a.75.75 0 0 1 1.5 0v1a8.75 8.75 0 0 1-8 8.718v2.282a.75.75 0 0 1-1.5 0v-2.282a8.75 8.75 0 0 1-8-8.718v-1A.75.75 0 0 1 4 9" clip-rule="evenodd"/>
                <path fill="currentColor" d="M9.75 7.75A.75.75 0 0 0 9 7H6.298a5.751 5.751 0 0 1 11.404 0H13.5a.75.75 0 0 0 0 1.5h4.25V10H13.5a.75.75 0 0 0 0 1.5h4.201a5.751 5.751 0 0 1-11.403 0H9A.75.75 0 0 0 9 10H6.25V8.5H9a.75.75 0 0 0 .75-.75" opacity=".5"/>
                <path fill="currentColor" d="M12.75 10.75c0 .414.336.75.75.75h4.201l.049-1.5H13.5a.75.75 0 0 0-.75.75m0-3c0 .414.336.75.75.75h4.25L17.701 7H13.5a.75.75 0 0 0-.75.75m-3 0A.75.75 0 0 0 9 7H6.298L6.25 8.5H9a.75.75 0 0 0 .75-.75m0 3A.75.75 0 0 0 9 10H6.25l.048 1.5H9a.75.75 0 0 0 .75-.75"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold tracking-tight">Scribe</h3>
          </div>
          <p class="text-sm leading-relaxed text-fc-fg-muted">
            Transcription de réunions par IA. Capturez l'audio, obtenez le transcript en temps réel et des notes structurées.
          </p>
        </a>

        <!-- Journal -->
        <a href="https://journal.facile.studio" target="_blank" rel="noopener noreferrer" use:reveal={{ delay: 980 }} class="{card} block no-underline">
          <div class={glow}></div>
          <div class="mb-4 flex items-center gap-3">
            <div class={ico}>
              <svg class="size-6 text-fc-fg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M3 8c0-2.828 0-4.243.879-5.121C4.757 2 6.172 2 9 2h6c2.828 0 4.243 0 5.121.879C21 3.757 21 5.172 21 8v8c0 2.828 0 4.243-.879 5.121C19.243 22 17.828 22 15 22H9c-2.828 0-4.243 0-5.121-.879C3 20.243 3 18.828 3 16z" opacity=".5"/>
                <path fill="currentColor" fill-rule="evenodd" d="M8.75 2.012v20h-1.5v-20zM1.25 8A.75.75 0 0 1 2 7.25h2a.75.75 0 0 1 0 1.5H2A.75.75 0 0 1 1.25 8m0 4a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m0 4a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75" clip-rule="evenodd"/>
                <path fill="currentColor" d="M10.75 6.5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75m0 3.5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold tracking-tight">Journal</h3>
          </div>
          <p class="text-sm leading-relaxed text-fc-fg-muted">
            Logs centralisés pour toute la suite. Cherchez, filtrez, créez des alertes. Un SDK par langage, un collector Docker.
          </p>
        </a>

        <div
          use:reveal={{ delay: 1050 }}
          class="group relative overflow-hidden rounded-2xl bg-fc-accent p-6 text-fc-accent-fg transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-2xl sm:col-span-2 lg:col-span-3 md:p-8 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.03)_50%,transparent_70%)] [background-size:250%_100%] animate-[shimmer_6s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:transition-none"
        >
          <div class="pointer-events-none absolute -right-24 -top-24 size-48 rounded-full bg-fc-accent-fg opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10"></div>
          <div class="mb-4 flex items-center gap-3">
            <div class={ico}>
              <Icon icon="solar:widget-5-bold-duotone" class="size-6" />
            </div>
            <h3 class="text-lg font-bold tracking-tight">Et tout communique</h3>
          </div>
          <p class="max-w-2xl text-sm leading-relaxed text-fc-accent-fg/65">
            Un seul serveur. Un seul système d'auth. Chaque outil partage événements et utilisateurs via Antenne. Pas de silos, pas de double saisie, pas de SaaS qui vous prend en otage.
          </p>
        </div>

      </div>
    </section>

    <!-- Sablier — dedicated section -->
    <section class="border-y border-fc-border bg-fc-accent text-fc-accent-fg">
      <div class="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <div use:reveal={{ delay: 0 }} class="mb-10 flex items-center gap-3">
          <Icon icon="solar:hourglass-bold-duotone" class="size-8" />
          <span class="text-2xl font-semibold tracking-tight">Sablier</span>
        </div>
        <h2 use:reveal={{ delay: 100 }} class="max-w-2xl text-4xl leading-[1.1] font-black tracking-tight md:text-6xl">
          Le temps, c'est de l'argent.<br />
          <span class="text-fc-accent-fg/50">Traquez-le.</span>
        </h2>
        <p use:reveal={{ delay: 200 }} class="mt-8 max-w-xl text-lg leading-relaxed text-fc-accent-fg/65">
          Le time tracking qui ne vous fait pas perdre de temps. Un clic pour démarrer, un clic pour arrêter. Les heures s'agrègent par projet, par tâche, par client — et parlent à Opus, Ardoise, et Perception sans que vous leviez le petit doigt.
        </p>

        <div class="mt-16 grid gap-x-16 gap-y-10 sm:grid-cols-2">
          {#each [
            { term: 'Chronométrage instantané', def: 'Lancez un timer depuis le dashboard, la CLI, ou automatiquement quand vous ouvrez un projet. Zéro friction.' },
            { term: 'Sessions partagées', def: 'Votre équipe voit les timers en cours en temps réel. Transparence totale, zéro friction de synchronisation.' },
            { term: 'Ventilation intelligente', def: 'Ventilez par projet, par tâche, par client. Les rapports s\'exportent pour la facturation dans Ardoise.' },
            { term: 'Intégration native', def: 'Les timers Sablier deviennent des lignes de facture dans Ardoise et des métriques dans Perception, via Antenne.' },
          ] as item, i}
            <div use:reveal={{ delay: 300 + i * 100 }} class="group">
              <dt class="text-sm font-semibold text-fc-accent-fg group-hover:text-fc-accent-fg/80 transition-colors">{item.term}</dt>
              <dd class="mt-2 text-sm leading-relaxed text-fc-accent-fg/65">{item.def}</dd>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Opus — dedicated section -->
    <section class="border-b border-fc-border bg-fc-surface">
      <div class="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <div use:reveal={{ delay: 0 }} class="mb-10 flex items-center gap-3">
          <svg class="size-8 text-fc-fg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M6 8c0-2.828 0-4.243.879-5.121C7.757 2 9.172 2 12 2s4.243 0 5.121.879C18 3.757 18 5.172 18 8v8c0 2.828 0 4.243-.879 5.121C16.243 22 14.828 22 12 22s-4.243 0-5.121-.879C6 20.243 6 18.828 6 16z"/><path fill="currentColor" d="M6.141 4.5C6 5.343 6 6.462 6 8v8c0 1.538 0 2.657.141 3.5H6c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092C2 17.6 2 16.9 2 15.5v-7c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C3.9 4.5 4.6 4.5 6 4.5zm11.718 0C18 5.343 18 6.462 18 8v8c0 1.538 0 2.657-.141 3.5H18c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.092-1.092C22 17.6 22 16.9 22 15.5v-7c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093C20.1 4.5 19.4 4.5 18 4.5z" opacity=".5"/></svg>
          <span class="text-2xl font-semibold tracking-tight">Opus</span>
        </div>
        <h2 use:reveal={{ delay: 100 }} class="max-w-2xl text-4xl leading-[1.1] font-black tracking-tight md:text-6xl">
          Pilotez vos projets.<br />
          <span class="text-fc-fg-muted">Sans vous noyer.</span>
        </h2>
        <p use:reveal={{ delay: 200 }} class="mt-8 max-w-xl text-lg leading-relaxed text-fc-fg-muted">
          La gestion de projet qui respecte votre cerveau. Kanban, relations entre tâches, recherche instantanée — le minimum vital, impeccablement exécuté. Chaque projet créé dans Opus devient automatiquement disponible dans Sablier.
        </p>

        <div class="mt-16 grid gap-x-16 gap-y-10 sm:grid-cols-2">
          {#each [
            { term: 'Kanban sans limite', def: 'Colonnes personnalisables, swimlanes, filtres. Organisez vos projets comme vous pensez, pas comme l\'outil vous force.' },
            { term: 'Relations entre tâches', def: 'Bloque, dépend de, duplique. Modélisez les dépendances réelles de votre projet sans feuille Excel.' },
            { term: 'Recherche fulgurante', def: 'Tapez, trouvez. La recherche full-text indexe tout — titres, descriptions, commentaires. Instantané, à chaque frappe.' },
            { term: 'Sync en temps réel', def: 'Les modifications apparaissent chez toute l\'équipe sans rechargement. WebSocket natif, pas de polling.' },
          ] as item, i}
            <div use:reveal={{ delay: 300 + i * 100 }} class="group">
              <dt class="text-sm font-semibold text-fc-fg group-hover:text-fc-fg/80 transition-colors">{item.term}</dt>
              <dd class="mt-2 text-sm leading-relaxed text-fc-fg-muted">{item.def}</dd>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Workflow -->
    <section class="border-b border-fc-border bg-fc-surface">
      <div class="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <div use:reveal={{ delay: 0 }} class="mb-10 flex items-center gap-3">
          <Icon icon="solar:route-bold-duotone" class="size-8 text-fc-fg" />
          <span class="text-2xl font-semibold tracking-tight">Le parcours</span>
        </div>
        <h2 use:reveal={{ delay: 100 }} class="text-4xl font-black tracking-tight md:text-5xl">
          Du lead au paiement.<br />
          <span class="text-fc-fg-muted">Chaque étape, un outil.</span>
        </h2>
        <p use:reveal={{ delay: 200 }} class="mt-8 max-w-xl text-lg leading-relaxed text-fc-fg-muted">
          On a cartographié le parcours complet d'un studio créatif — du premier contact au suivi post-projet. Chaque étape a son outil, chaque outil fait le lien avec les autres.
        </p>
        <div class="mt-16">
          <WorkflowDiagram />
        </div>
      </div>
    </section>

    <!-- Perception -->
    <section class="border-t border-fc-border bg-fc-accent text-fc-accent-fg">
      <div class="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <div use:reveal={{ delay: 0 }} class="mb-10 flex items-center gap-3">
          <svg class="size-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M14 2.75c1.907 0 3.262.002 4.29.14c1.005.135 1.585.389 2.008.812c.487.487.7.865.817 1.538c.132.759.135 1.84.135 3.76a.75.75 0 0 0 1.5 0v-.096c0-1.8 0-3.018-.158-3.922c-.175-1.005-.549-1.656-1.233-2.34c-.749-.75-1.698-1.081-2.87-1.239c-1.14-.153-2.595-.153-4.433-.153H14a.75.75 0 0 0 0 1.5M2 14.25a.75.75 0 0 1 .75.75c0 1.92.003 3.001.135 3.76c.118.673.33 1.051.817 1.538c.423.423 1.003.677 2.009.812c1.028.138 2.382.14 4.289.14a.75.75 0 0 1 0 1.5h-.056c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.684-.685-1.058-1.336-1.233-2.341c-.158-.904-.158-2.123-.158-3.922V15a.75.75 0 0 1 .75-.75m20 0a.75.75 0 0 1 .75.75v.096c0 1.8 0 3.018-.158 3.922c-.175 1.005-.549 1.656-1.233 2.34c-.749.75-1.698 1.081-2.87 1.239c-1.14.153-2.595.153-4.433.153H14a.75.75 0 0 1 0-1.5c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.487-.487.7-.865.817-1.538c.132-.759.135-1.84.135-3.76a.75.75 0 0 1 .75-.75m-12.056-13H10a.75.75 0 0 1 0 1.5c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812c-.487.487-.7.865-.817 1.538c-.132.759-.135 1.84-.135 3.76a.75.75 0 1 1-1.5 0v-.096c0-1.8 0-3.018.158-3.922c.175-1.005.549-1.656 1.233-2.34c.749-.75 1.698-1.081 2.87-1.239c1.14-.153 2.595-.153 4.433-.153" opacity=".5"/>
            <path fill="currentColor" d="M12 10.75a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5"/>
            <path fill="currentColor" fill-rule="evenodd" d="M5.892 14.06C5.297 13.37 5 13.025 5 12s.297-1.37.892-2.06C7.08 8.562 9.072 7 12 7s4.92 1.562 6.108 2.94c.595.69.892 1.035.892 2.06s-.297 1.37-.892 2.06C16.92 15.438 14.928 17 12 17s-4.92-1.562-6.108-2.94M9.25 12a2.75 2.75 0 1 1 5.5 0a2.75 2.75 0 0 1-5.5 0" clip-rule="evenodd"/>
          </svg>
          <span class="text-2xl font-semibold tracking-tight">Perception</span>
        </div>
        <h2 use:reveal={{ delay: 100 }} class="max-w-2xl text-4xl leading-[1.1] font-black tracking-tight md:text-6xl">
          Posez la question.<br />
          <span class="text-fc-accent-fg/50">On a tout vu.</span>
        </h2>
        <p use:reveal={{ delay: 200 }} class="mt-8 max-w-xl text-lg leading-relaxed text-fc-accent-fg/65">
          Perception connecte tous vos outils en un seul cerveau. Clients, contrats, projets, heures, logs — tout est lié. Demandez n'importe quoi en langage naturel, obtenez une réponse sourcée en temps réel.
        </p>

        <div class="mt-16 grid gap-x-16 gap-y-10 sm:grid-cols-2">
          {#each [
            { term: 'Recherche intelligente', def: 'Seize sources fouillées en parallèle. Chaque réponse cite d\'où elle vient.' },
            { term: 'Connexion automatique', def: 'Un client dans Opus, un signataire dans Plume, un timer dans Sablier — Perception sait que c\'est la même personne.' },
            { term: 'Prévisions', def: 'Anticipe les tendances de votre activité avec des intervalles de confiance qui s\'affinent au fil du temps.' },
            { term: 'Alertes anomalies', def: 'Détecte les changements de rythme avant que vous ne les remarquiez. Identifie les causes, pas juste les symptômes.' },
          ] as item, i}
            <div use:reveal={{ delay: 300 + i * 100 }} class="group">
              <dt class="text-sm font-semibold text-fc-accent-fg group-hover:text-fc-accent-fg/80 transition-colors">{item.term}</dt>
              <dd class="mt-2 text-sm leading-relaxed text-fc-accent-fg/65">{item.def}</dd>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Auth -->
    <section class="border-b border-fc-border bg-fc-surface">
      <div class="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <div class="grid items-center gap-16 md:grid-cols-2">
          <div>
            <div use:reveal={{ delay: 0 }} class="mb-10 flex items-center gap-3">
              <Icon icon="solar:lock-keyhole-bold-duotone" class="size-8 text-fc-fg" />
              <span class="text-2xl font-semibold tracking-tight">Un seul login</span>
            </div>
            <h2 use:reveal={{ delay: 100 }} class="text-4xl font-black tracking-tight md:text-5xl">
              Connectez-vous une fois.<br />
              <span class="text-fc-fg-muted">Accédez à tout.</span>
            </h2>
            <p use:reveal={{ delay: 200 }} class="mt-8 max-w-lg text-lg leading-relaxed text-fc-fg-muted">
              Chaque outil de la suite partage le même système d'authentification. Un compte, un mot de passe, et vous passez de Sablier à Opus à Ardoise sans jamais vous reconnecter.
            </p>
          </div>
          <div use:reveal={{ delay: 300 }} class="grid gap-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {#each [
              { title: 'SSO intégré', desc: 'OpenID Connect natif. Un seul jeton, toute la suite.' },
              { title: 'Gestion centralisée', desc: 'Ajoutez un membre une fois, il a accès partout. Retirez-le, c\'est fini partout.' },
              { title: 'Zéro friction', desc: 'Pas de page de login entre les outils. Vous naviguez, ça marche.' },
              { title: 'Votre serveur, vos règles', desc: 'Aucun tiers dans la boucle. Vos identifiants ne quittent jamais votre infra.' },
            ] as item, i}
              <div class="rounded-xl border border-fc-border bg-fc-page p-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-lg">
                <h3 class="text-sm font-bold tracking-tight">{item.title}</h3>
                <p class="mt-1.5 text-sm leading-relaxed text-fc-fg-muted">{item.desc}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <!-- About -->
    <section class="bg-fc-accent text-fc-accent-fg">
      <div class="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <h2 use:reveal={{ delay: 0 }} class="text-4xl font-black tracking-tight md:text-5xl">Quatre humains.<br /><span class="text-fc-accent-fg/50">Zéro bullshit.</span></h2>
        <p use:reveal={{ delay: 100 }} class="mt-6 max-w-md text-lg leading-relaxed text-fc-accent-fg/65">
          Deux devs, deux designers. On construit les outils qu'on utilise tous les jours. Pas de roadmap à rallonge, pas de features pour les investisseurs — juste ce qui marche.
        </p>
        <a
          href="https://facile.studio"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-10 inline-flex items-center gap-2 rounded-md border border-fc-accent-fg/20 px-6 py-3 text-base font-medium text-fc-accent-fg transition-colors hover:border-fc-accent-fg/40 hover:bg-fc-accent-fg/10"
        >
          Découvrir Facile
          <Icon icon="solar:arrow-right-up-linear" class="size-4" />
        </a>
      </div>
    </section>
  </main>

  <footer class="border-t border-fc-border">
    <div class="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-fc-fg-muted">
      &copy; {new Date().getFullYear()} <a href="https://facile.studio" class="text-fc-fg/60 transition-colors hover:text-fc-fg">Facile.</a>
    </div>
  </footer>
</div>

<style>
  @keyframes shimmer {
    0%, 100% { background-position: 200% 0; }
    50% { background-position: -200% 0; }
  }
</style>
