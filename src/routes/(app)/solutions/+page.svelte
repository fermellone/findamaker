<script lang="ts">
	import SolutionsList from './../../../lib/components/SolutionsList.svelte';
	import { pageTitle, userState } from '$lib/store';
	import { onMount } from 'svelte';
	import type { Solution } from '../../../models/solution';
	import { goto } from '$app/navigation';

	pageTitle.set('Solutions');

	let solutions: Solution[] = [];

	const deleteSolution = async (solution: Solution) => {
		try {
			await fetch(`/api/solution/${solution.id}`, {
				method: 'DELETE'
			});
		} catch (error) {
			console.log(error);
		}
	};

	onMount(async () => {
		try {
			const response = await fetch('/api/solutions');

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
	<SolutionsList {solutions} onDeleteSolutionCallback={deleteSolution} />
</main>
