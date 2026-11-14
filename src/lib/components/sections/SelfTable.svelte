<script lang="ts">
	import { useI18n } from '$lib/i18n';

	const i18n = useI18n();
	const t = $derived(i18n.t.self);
</script>

<section aria-labelledby="compare-title" class="flex flex-col gap-6">
	<h2 id="compare-title" class="text-fc-xl font-bold tracking-tight text-fc-fg sm:text-fc-2xl">{t.compare}</h2>
	<table class="w-full table-fixed text-left text-fc-sm" style="border-collapse: separate; border-spacing: 0 4px">
		<colgroup>
			<col class="w-[32%]" />
			<col />
			<col />
		</colgroup>
		<thead>
			<tr class="text-fc-xs text-fc-fg-muted">
				<th scope="col" class="px-2 pb-2 font-medium sm:px-4"><span class="sr-only">{t.topic}</span></th>
				<th scope="col" class="px-2 pb-2 text-fc-sm font-bold text-fc-fg sm:px-4">{t.columns[0]}</th>
				<th scope="col" class="px-2 pb-2 text-fc-sm font-bold text-fc-fg-muted sm:px-4">{t.columns[1]}</th>
			</tr>
		</thead>
		<tbody>
			{#each t.rows as row (row.label)}
				<tr>
					<th scope="row" class="rounded-l-fc-lg bg-fc-component px-2 py-3 align-top font-medium text-fc-fg sm:px-4">{row.label}</th>
					<td class="bg-fc-component px-2 py-3 align-top text-fc-fg sm:px-4">{row.hosted}</td>
					<td class="rounded-r-fc-lg bg-fc-component px-2 py-3 align-top text-fc-fg-muted sm:px-4">{row.self}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>
