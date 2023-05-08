<script lang="ts">
	import { pageTitle } from '$lib/store';
	import type { PageData } from './$types';

	export let data: PageData;

	pageTitle.set("Problems you're solving");

	$: solutions = data.solutions;
</script>

<main>
	{#if solutions.length === 0}
		<p>You haven't added any solutions yet.</p>
	{:else}
		<ul>
			{#each solutions as solution}
				<li>
					<a href={solution.link}>{solution.description}</a>
				</li>
			{/each}
		</ul>
	{/if}
</main>
