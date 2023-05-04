<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { userState } from '$lib/store';
	import type { Problem } from '../../models/problem';

	export let problems: Problem[] = [];

	const dispatcher = createEventDispatcher();

	const toggleUpVote = async (problem: Problem) => {
		dispatcher('toggle-upvote', { problemId: problem.id });
	};
</script>

<ul class="divide-y divide-gray-100">
	{#each problems as problem}
		<li class="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap">
			<div>
				<p class="text-sm font-semibold leading-6 text-gray-900">
					<button class="hover:underline">{problem.description}</button>
				</p>
				<div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
					{#if $userState}
						<img
							class="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
							src={$userState.profilePicture}
							alt={$userState.name}
						/>
					{/if}
					<p>
						<span>{problem.author.username}</span>
					</p>
					<svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
						<circle cx="1" cy="1" r="1" />
					</svg>
					<!-- <p><time datetime="2023-01-23T22:34Z">2d ago</time></p> -->
				</div>
			</div>
			<dl class="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
				<div class="flex -space-x-0.5">
					<dt class="sr-only">Followers</dt>
					{#each problem.upVotes as upvote}
						{#if upvote.userId !== $userState?.id}
							<dd>
								<img
									class="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
									src={upvote.user?.profilePicture}
									alt={upvote.user?.name}
								/>
							</dd>
						{/if}
					{/each}
				</div>
				<div class="flex w-16 gap-x-2.5">
					<dt>
						<span class="sr-only">Total votes</span>
						<button
							on:click={() => {
								toggleUpVote(problem);
							}}
							class="p-2 bg-slate-50 border rounded-md {problem.upVotes.find(
								(uv) => uv.userId === $userState?.id
							)
								? 'text-green-500 border-green-500'
								: 'text-slate-500 border-slate-500'}"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M4.5 15.75l7.5-7.5 7.5 7.5"
								/>
							</svg>
						</button>
					</dt>
					<dd class="text-sm leading-6 text-gray-900">{problem.upVotes.length}</dd>
				</div>
			</dl>
		</li>
	{/each}
</ul>
