<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Tweet } from '../../models/tweet';

	export let tweets: Tweet[] = [];

	const dispatcher = createEventDispatcher();

	const solveTweetProblem = (tweetId: string) => {
		dispatcher('click-solve-tweet', { tweetId });
	};
</script>

<ul class="divide-y divide-gray-100">
	{#each tweets as tweet}
		<li
			class="flex flex-wrap items-center justify-between gap-x-6 sm:gap-y-4 py-5 px-4 sm:flex-nowrap"
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<a
				href="https://twitter.com/markjoonlee/status/{tweet.id}"
				target="_blank"
				class="w-full cursor-pointer"
			>
				<p
					class="text-sm font-semibold leading-6 dark:text-white text-gray-900 overflow-hidden line-clamp-2 select-none"
				>
					{tweet.text}
				</p>
				<div class="mt-3 gap-x-2 text-xs leading-5 dark:text-gray-400 text-gray-500">
					<!-- TODO implement this -->
					<!-- <p class="my-2">
						<span class="font-bold">Possible solutions: </span>
						<span class="text-md">{tweet.possibleSolutions.length}</span>
					</p> -->
					<div class="flex items-center">
						<img
							class="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
							referrerpolicy="no-referrer"
							src={tweet.user.profile_image_url?.replace('_normal', '_bigger') ??
								'//placekitten.com/100/100'}
							alt={tweet.user.name}
						/>
						<p class="mx-2">
							{tweet.user.username}
						</p>
					</div>
				</div>
			</a>
			<dl
				class="flex w-full flex-none justify-end sm:justify-between items-end gap-x-2 sm:gap-x-4 sm:w-auto mt-0 mb-auto"
			>
				<div class="flex w-16 gap-x-2.5 justify-center">
					<div class="flex flex-col items-center">
						<button
							on:click={() => {
								solveTweetProblem(tweet.id);
							}}
							class="p-2 dark:bg-transparent bg-slate-50 border rounded-md dark:text-gray-200 text-slate-500 dark:border-gray-200 border-slate-500 dark:hover:border-green-600 dark:hover:text-green-600 transition-all"
						>
							Solve this problem
						</button>
					</div>
				</div>
			</dl>
		</li>
	{/each}
</ul>
