<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { Action } from 'svelte/action';

  let visible = $state(false);

  $effect(() => {
    visible = true;
  });

  const reveal: Action<HTMLElement, { delay?: number; threshold?: number }> = (node, params = {}) => {
    const { delay = 0, threshold = 0.15 } = params;

    node.style.opacity = '0';
    node.style.transform = 'translateY(24px)';
    node.style.transition = `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.style.opacity = '1';
          node.style.transform = 'translateY(0)';
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
</script>

<svelte:head>
  <title>Facile Suite — Votre studio tourne tout seul</title>
  <meta name="description" content="Huit outils intégrés qui gèrent le temps, les projets, les leads, la facturation et l'intelligence de votre studio. Auto-hébergé, open source, un seul serveur." />
</svelte:head>

<div class="min-h-screen bg-white text-zinc-900">
  <header class="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/90 backdrop-blur-sm">
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

    <section class="mx-auto max-w-5xl px-6 pt-36 pb-28 md:pt-44 md:pb-36">
      <div class="transition-all duration-700 ease-out {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}">
        <p class="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3.5 py-1 text-xs text-zinc-500">
          Auto-hébergé &middot; Open source &middot; Intégré
        </p>
        <h1 class="max-w-3xl font-[Goga] text-5xl leading-[1.08] font-black tracking-tight md:text-7xl">
          On simplifie.<br />
          <span class="text-zinc-400">Vous bossez.</span>
        </h1>
        <p class="mt-8 max-w-lg text-lg leading-relaxed text-zinc-500">
          Huit outils qui se parlent, sur votre serveur.
          Temps, projets, leads, factures, monitoring — un seul login, zéro dépendance cloud.
        </p>
        <div class="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#perception"
            class="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Découvrir la suite
            <Icon icon="solar:arrow-down-linear" class="size-4" />
          </a>
          <a
            href="https://facile.studio"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-md border border-zinc-200 px-6 py-3 text-base font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900"
          >
            Qui sommes-nous
            <Icon icon="solar:arrow-right-up-linear" class="size-3.5" />
          </a>
        </div>
      </div>
    </section>

    <section id="perception" class="border-y border-zinc-200 bg-zinc-950 text-white">
      <div class="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <div use:reveal={{ delay: 0 }} class="mb-10 flex items-center gap-3">
          <svg class="size-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" opacity=".5" d="M2 12c0 1.64.425 2.191 1.275 3.296C4.972 17.5 7.818 20 12 20s7.028-2.5 8.725-4.704C21.575 14.192 22 13.639 22 12c0-1.64-.425-2.191-1.275-3.296C19.028 6.5 16.182 4 12 4S4.972 6.5 3.275 8.704C2.425 9.81 2 10.361 2 12"/>
            <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M8.25 12a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0m1.5 0a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0"/>
          </svg>
          <span class="font-[Goga] text-2xl font-semibold tracking-tight">Perception</span>
        </div>
        <h2 use:reveal={{ delay: 100 }} class="max-w-2xl font-[Goga] text-4xl leading-[1.1] font-black tracking-tight md:text-6xl">
          Posez la question.<br />
          <span class="text-zinc-500">On a tout vu.</span>
        </h2>
        <p use:reveal={{ delay: 200 }} class="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">
          Perception connecte tous vos outils en un seul cerveau. Clients, contrats, projets, heures — tout est lié. Demandez n'importe quoi en langage naturel, obtenez une réponse sourcée en temps réel.
        </p>

        <div class="mt-16 grid gap-x-16 gap-y-10 sm:grid-cols-2">
          {#each [
            { term: 'Recherche intelligente', def: 'Douze sources fouillées en parallèle. Chaque réponse cite d\'où elle vient.' },
            { term: 'Connexion automatique', def: 'Un client dans Opus, un signataire dans DocuSeal, un timer dans Sablier — Perception sait que c\'est la même personne.' },
            { term: 'Prévisions', def: 'Anticipe les tendances de votre activité avec des intervalles de confiance qui s\'affinent au fil du temps.' },
            { term: 'Alertes anomalies', def: 'Détecte les changements de rythme avant que vous ne les remarquiez. Identifie les causes, pas juste les symptômes.' },
          ] as item, i}
            <div use:reveal={{ delay: 300 + i * 100 }} class="group">
              <dt class="text-sm font-semibold text-white group-hover:text-zinc-300 transition-colors">{item.term}</dt>
              <dd class="mt-2 text-sm leading-relaxed text-zinc-500">{item.def}</dd>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-5xl px-6 py-28 md:py-36">
      <div use:reveal={{ delay: 0 }} class="mb-16 max-w-lg">
        <h2 class="font-[Goga] text-4xl font-black tracking-tight md:text-5xl">Chaque outil<br />fait une chose bien.</h2>
        <p class="mt-4 text-zinc-500">Pas de bloat. Pas de features fantômes. Juste ce qu'il faut pour que le studio tourne.</p>
      </div>

      <div class="grid gap-y-0 md:grid-cols-2">

        <div use:reveal={{ delay: 0 }} class="group border-t border-zinc-200 py-8 transition-colors hover:bg-zinc-50 md:border-r md:pr-8">
          <div class="mb-4 flex items-center gap-3">
            <svg class="size-6 text-zinc-900" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" fill-rule="evenodd" d="M12 2C7.867 2 5.8 2 5.198 3.3a2.5 2.5 0 0 0-.13.346c-.41 1.387 1.052 2.995 3.974 6.21L11 12h2l1.958-2.143c2.922-3.216 4.383-4.824 3.974-6.21a2.5 2.5 0 0 0-.13-.348C18.2 2 16.133 2 12 2" clip-rule="evenodd"/>
              <path fill="currentColor" d="M5.198 20.7C5.8 22 7.867 22 12 22s6.2 0 6.802-1.3a2.5 2.5 0 0 0 .13-.346c.41-1.387-1.052-2.995-3.974-6.21L13 12h-2l-1.958 2.143c-2.922 3.216-4.383 4.824-3.974 6.21q.052.18.13.348" opacity=".5"/>
            </svg>
            <h3 class="font-[Goga] text-lg font-bold tracking-tight">Sablier</h3>
          </div>
          <p class="text-sm leading-relaxed text-zinc-500">
            Vos heures facturables, tracées sans friction. Un clic pour lancer, un clic pour arrêter. Ventilation par projet, sessions partagées, et tout le studio connecté via SSO.
          </p>
        </div>

        <div use:reveal={{ delay: 80 }} class="group border-t border-zinc-200 py-8 transition-colors hover:bg-zinc-50 md:pl-8">
          <div class="mb-4 flex items-center gap-3">
            <svg class="size-6 text-zinc-900" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M6 8c0-2.828 0-4.243.879-5.121C7.757 2 9.172 2 12 2s4.243 0 5.121.879C18 3.757 18 5.172 18 8v8c0 2.828 0 4.243-.879 5.121C16.243 22 14.828 22 12 22s-4.243 0-5.121-.879C6 20.243 6 18.828 6 16z"/>
              <path fill="currentColor" d="M6.141 4.5C6 5.343 6 6.462 6 8v8c0 1.538 0 2.657.141 3.5H6c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092C2 17.6 2 16.9 2 15.5v-7c0-1.4 0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C3.9 4.5 4.6 4.5 6 4.5zm11.718 0C18 5.343 18 6.462 18 8v8c0 1.538 0 2.657-.141 3.5H18c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.092-1.092C22 17.6 22 16.9 22 15.5v-7c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093C20.1 4.5 19.4 4.5 18 4.5z" opacity=".5"/>
            </svg>
            <h3 class="font-[Goga] text-lg font-bold tracking-tight">Opus</h3>
          </div>
          <p class="text-sm leading-relaxed text-zinc-500">
            La gestion de projet qui ne vous ralentit pas. Kanban, relations entre tâches, recherche instantanée — le minimum qui fait le maximum.
          </p>
        </div>

        <div use:reveal={{ delay: 0 }} class="group border-t border-zinc-200 py-8 transition-colors hover:bg-zinc-50 md:border-r md:pr-8">
          <div class="mb-4 flex items-center gap-3">
            <svg class="size-6 text-zinc-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" fill-rule="evenodd" d="M18.448 3.073c-1.06-.332-2.03.514-2.03 1.547v3.626c-1.296.252-2.804.397-4.418.397s-3.122-.145-4.419-.397V4.62c0-1.033-.97-1.879-2.028-1.547c-.982.307-1.831.697-2.45 1.17C2.495 4.705 2 5.338 2 6.13v11.95q.002.323.104.614q.091.262.244.493c.324.491.841.894 1.44 1.223c.609.334 1.351.62 2.185.852C7.64 21.727 9.737 22 12 22c1.9 0 3.682-.192 5.189-.529c1.493-.333 2.773-.82 3.63-1.445c.208-.152.405-.322.576-.511c.36-.398.605-.877.605-1.436V6.13c0-.792-.494-1.425-1.103-1.889c-.619-.472-1.468-.862-2.45-1.169m2.157 5.154l-.081.052c-.823.516-1.952.93-3.254 1.227c-1.524.347-3.335.547-5.27.547s-3.745-.2-5.27-.547c-1.302-.297-2.431-.71-3.254-1.227l-.08-.052v9.162l2.83-2.675l1.276-1.08a2.39 2.39 0 0 1 3.192.105l3.09 2.985a.786.786 0 0 0 .975.078l.215-.145a2.91 2.91 0 0 1 3.532.207l1.9 1.653c.157-.188.199-.337.199-.438z" clip-rule="evenodd"/>
              <path fill="currentColor" d="M19.21 12.84c0 .778-.625 1.41-1.396 1.41s-1.395-.632-1.395-1.41s.625-1.41 1.395-1.41s1.396.632 1.396 1.41" opacity=".5"/>
            </svg>
            <h3 class="font-[Goga] text-lg font-bold tracking-tight">Vision</h3>
          </div>
          <p class="text-sm leading-relaxed text-zinc-500">
            L'analytique web qui respecte vos visiteurs. Un script, zéro cookie, données en temps réel. Vous savez d'où vient votre trafic sans vendre l'âme de vos utilisateurs.
          </p>
        </div>

        <div use:reveal={{ delay: 80 }} class="group border-t border-zinc-200 py-8 transition-colors hover:bg-zinc-50 md:pl-8">
          <div class="mb-4 flex items-center gap-3">
            <Icon icon="solar:magnet-bold-duotone" class="size-6 text-zinc-900" />
            <h3 class="font-[Goga] text-lg font-bold tracking-tight">Glouton</h3>
          </div>
          <p class="text-sm leading-relaxed text-zinc-500">
            Vos prochains clients, trouvés pendant que vous dormez. Glouton crawle le web, détecte les stacks techniques, score les prospects et vous sert les meilleurs sur un plateau.
          </p>
        </div>

        <div use:reveal={{ delay: 0 }} class="group border-t border-zinc-200 py-8 transition-colors hover:bg-zinc-50 md:border-r md:pr-8">
          <div class="mb-4 flex items-center gap-3">
            <svg class="size-6 text-zinc-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M10.31 17.344c.767-.876 1.151-1.314 1.625-1.342q.065-.004.13 0c.474.028.858.466 1.625 1.342c1.67 1.906 2.505 2.858 2.271 3.68q-.03.107-.074.206C15.543 22 14.362 22 12 22s-3.543 0-3.887-.77a2 2 0 0 1-.074-.206c-.234-.822.6-1.774 2.27-3.68M14.5 12.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0"/>
              <path fill="currentColor" fill-rule="evenodd" d="M12 8.035c-2.697 0-4.884 2.151-4.884 4.806a4.75 4.75 0 0 0 1.43 3.398a.68.68 0 0 1 0 .97a.706.706 0 0 1-.986 0a6.1 6.1 0 0 1-1.84-4.368c0-3.413 2.812-6.18 6.28-6.18s6.279 2.767 6.279 6.18a6.1 6.1 0 0 1-1.84 4.369a.706.706 0 0 1-.986 0a.68.68 0 0 1 0-.971a4.75 4.75 0 0 0 1.43-3.398c0-2.655-2.186-4.806-4.883-4.806" clip-rule="evenodd" opacity=".7"/>
              <path fill="currentColor" fill-rule="evenodd" d="M12 4.373c-4.752 0-8.605 3.791-8.605 8.468c0 2.338.963 4.454 2.52 5.987a.68.68 0 0 1 0 .97a.706.706 0 0 1-.986 0A9.73 9.73 0 0 1 2 12.842C2 7.406 6.477 3 12 3s10 4.406 10 9.84a9.73 9.73 0 0 1-2.929 6.959a.706.706 0 0 1-.987 0a.68.68 0 0 1 0-.971a8.37 8.37 0 0 0 2.52-5.987c0-4.677-3.852-8.468-8.604-8.468" clip-rule="evenodd" opacity=".4"/>
            </svg>
            <h3 class="font-[Goga] text-lg font-bold tracking-tight">Nook</h3>
          </div>
          <p class="text-sm leading-relaxed text-zinc-500">
            Quand quelque chose tombe, vous le savez en premier. Nook centralise les alertes de toute votre infra et les pousse où vous voulez — Discord, Matrix, email, push.
          </p>
        </div>

        <div use:reveal={{ delay: 80 }} class="group border-t border-zinc-200 py-8 transition-colors hover:bg-zinc-50 md:pl-8">
          <div class="mb-4 flex items-center gap-3">
            <svg class="size-6 text-zinc-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M7.245 2h9.51c1.159 0 1.738 0 2.206.163a3.05 3.05 0 0 1 1.881 1.936C21 4.581 21 5.177 21 6.37v14.004c0 .858-.985 1.314-1.608.744a.946.946 0 0 0-1.284 0l-.483.442a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0l-.483-.442a.946.946 0 0 0-1.284 0c-.623.57-1.608.114-1.608-.744V6.37c0-1.193 0-1.79.158-2.27c.3-.913.995-1.629 1.881-1.937C5.507 2 6.086 2 7.245 2" opacity=".5"/>
              <path fill="currentColor" d="M7 6.75a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3.5 0a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 0-1.5zM7 10.25a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3.5 0a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 0-1.5zM7 13.75a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3.5 0a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 0-1.5z"/>
            </svg>
            <h3 class="font-[Goga] text-lg font-bold tracking-tight">Charles</h3>
          </div>
          <p class="text-sm leading-relaxed text-zinc-500">
            Facturez, encaissez, oubliez. Stripe intégré, emails automatiques, reçus téléchargeables. Vos clients paient, vous êtes notifié, point.
          </p>
        </div>

        <div use:reveal={{ delay: 0 }} class="group border-y border-zinc-200 py-8 transition-colors hover:bg-zinc-50 md:border-r md:pr-8">
          <div class="mb-4 flex items-center gap-3">
            <Icon icon="solar:home-angle-bold-duotone" class="size-6 text-zinc-900" />
            <h3 class="font-[Goga] text-lg font-bold tracking-tight">Portail</h3>
          </div>
          <p class="text-sm leading-relaxed text-zinc-500">
            Un fichier YAML, et toute votre équipe a une page d'accueil vers chaque service du studio. Déploiements, docs, monitoring, mots de passe — tout en un clic.
          </p>
        </div>

        <div use:reveal={{ delay: 80 }} class="group border-y border-zinc-200 py-8 transition-colors hover:bg-zinc-50 md:pl-8">
          <div class="mb-4 flex items-center gap-3">
            <Icon icon="solar:widget-5-bold-duotone" class="size-6 text-zinc-900" />
            <h3 class="font-[Goga] text-lg font-bold tracking-tight">Et tout communique</h3>
          </div>
          <p class="text-sm leading-relaxed text-zinc-500">
            Un seul serveur. Un seul système d'auth. Chaque outil partage événements et utilisateurs. Pas de silos, pas de double saisie, pas de SaaS qui vous prend en otage.
          </p>
        </div>

      </div>
    </section>

    <section class="bg-zinc-950 text-white">
      <div class="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <h2 use:reveal={{ delay: 0 }} class="font-[Goga] text-4xl font-black tracking-tight md:text-5xl">Quatre humains.<br /><span class="text-zinc-500">Zero bullshit.</span></h2>
        <p use:reveal={{ delay: 100 }} class="mt-6 max-w-md text-lg leading-relaxed text-zinc-400">
          Deux devs, deux designers. On construit les outils qu'on utilise tous les jours. Pas de roadmap à rallonge, pas de features pour les investisseurs — juste ce qui marche.
        </p>
        <a
          href="https://facile.studio"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-10 inline-flex items-center gap-2 rounded-md border border-zinc-700 px-6 py-3 text-base font-medium text-white transition-colors hover:border-zinc-500 hover:bg-zinc-900"
        >
          Découvrir Facile
          <Icon icon="solar:arrow-right-up-linear" class="size-4" />
        </a>
      </div>
    </section>
  </main>

  <footer class="border-t border-zinc-200">
    <div class="mx-auto max-w-5xl px-6 py-6 text-center text-sm text-zinc-400">
      &copy; {new Date().getFullYear()} <a href="https://facile.studio" class="text-zinc-600 transition-colors hover:text-zinc-900">Facile.</a>
    </div>
  </footer>
</div>
