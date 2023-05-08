<script lang="ts">
	import { pageTitle, userState } from '$lib/store';
	import { onMount } from 'svelte';
	import type { Solution } from '../../../models/solution';

	pageTitle.set("Problems you're solving");

	let solutions: Solution[] = [];

	onMount(async () => {
		const response = await fetch(
			`/api/solutions?userId=${
				$userState?.id ?? JSON.parse(localStorage.getItem('user') ?? '{}').id ?? ''
			}`
		);

		if (!response.ok)
			throw new Error('Failed to fetch solutions. Please reload the page or try again later.');

		solutions = await response.json();
	});
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
