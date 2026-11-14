<script lang="ts">
	import { Button } from '@facile/muse';
	import { GITHUB_URL, SELF_HOST_PATH, STUDIO_URL } from '$lib/content';
	import { useI18n } from '$lib/i18n';
	import { scrollReveal } from '$lib/motion';

	const i18n = useI18n();
	const about = $derived(i18n.t.about);
	const ghost = 'text-fc-accent-fg hover:bg-fc-accent-fg/10 hover:text-fc-accent-fg';
</script>

<section
	aria-labelledby="about-title"
	use:scrollReveal
	class="flex flex-col items-start gap-5 rounded-fc-lg bg-fc-accent p-6 text-fc-accent-fg sm:p-10"
>
	<div data-reveal-item class="flex max-w-2xl flex-col gap-2">
		<h2 id="about-title" class="text-fc-xl font-bold tracking-tight sm:text-fc-2xl">{about.title}</h2>
		<p class="text-fc-md opacity-70">{about.text} {about.dev}</p>
	</div>
	<div data-reveal-item class="flex flex-wrap gap-2">
		<Button variant="secondary" size="lg" href={STUDIO_URL} target="_blank" rel="noopener noreferrer" iconRight="solar:arrow-right-up-linear"
			>{about.studio}</Button
		>
		<Button variant="ghost" size="lg" href={i18n.href(SELF_HOST_PATH)} icon="solar:server-square-bold-duotone" class={ghost}>{about.selfHost}</Button>
		<Button variant="ghost" size="lg" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" icon="solar:code-square-linear" class={ghost}
			>{about.code}</Button
		>
	</div>
</section>
