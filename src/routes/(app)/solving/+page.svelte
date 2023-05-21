<script lang="ts">
	import { pageTitle, userState } from '$lib/store';
	import { onMount } from 'svelte';
	import type { Solution } from '../../../models/solution';
	import { goto } from '$app/navigation';
	import SolutionsList from '$lib/components/SolutionsList.svelte';

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

	const deleteSolution = async (solution: Solution) => {
		try {
			await fetch(`/api/solution/${solution.id}`, {
				method: 'DELETE'
			});
		} catch (error) {
			console.log(error);
		}
	};
</script>

<main>
	<SolutionsList {solutions} onDeleteSolutionCallback={deleteSolution} />
</main>
