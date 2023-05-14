<script lang="ts">
	import { pageTitle, userState } from '$lib/store';
	import { onMount } from 'svelte';
	import type { Problem } from '../../../models/problem.js';
	import { goto } from '$app/navigation';

	pageTitle.set('Projects you shared');

	let problems: Problem[] = [];

	onMount(async () => {
		try {
			const userId =
				$userState?.id ?? JSON.parse(localStorage.getItem('user') ?? '{}')?.id ?? ('' as string);
			const response = await fetch(`/api/problems?authorId=${userId}`);

			if (!response.ok)
				throw new Error('Failed to fetch solutions. Please reload the page or try again later.');

			problems = await response.json();
		} catch (error) {
			console.log(error);
			goto('/');
		}
	});
</script>

<main>
	{#each problems as problem}
		<a href={`/mine/${problem.id}`}>
			<div class="problem">
				<p>{problem.description}</p>
			</div>
		</a>
	{:else}
		<p>You haven't shared any projects yet.</p>
	{/each}
</main>
