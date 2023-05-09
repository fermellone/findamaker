<script lang="ts">
	import { pageTitle, userState } from '$lib/store';
	import { onMount } from 'svelte';
	import type { Solution } from '../../../models/solution';
	import { goto } from '$app/navigation';

	pageTitle.set("Problems you're solving");

	let solutions: Solution[] = [];

	onMount(async () => {
		try {
			const response = await fetch(
				`/api/solutions?userId=${
					$userState?.id ?? JSON.parse(localStorage.getItem('user') ?? '{}').id ?? ''
				}`
			);

			if (!response.ok)
				throw new Error('Failed to fetch solutions. Please reload the page or try again later.');

			solutions = await response.json();
		} catch (error) {
			console.log(error);
			goto('/');
		}
	});
</script>

<main>
	{#each solutions as solution}
		<div>
			<a href={solution.link}>{solution.description}</a>
		</div>
	{:else}
		<p>You haven't added any solutions yet.</p>
	{/each}
</main>
