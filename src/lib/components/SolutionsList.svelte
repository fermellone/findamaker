<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { userState } from '$lib/store';
	import Modal from './Modal.svelte';
	import type { Solution } from '../../models/solution';

	export let solutions: Solution[] = [];
	export let onDeleteSolutionCallback: (solution: Solution) => Promise<void>;
	let isDeleteModalOpen = false;
	let deletingSolution: Solution | null = null;

	const dispatcher = createEventDispatcher();

	const toggleUpVote = async (solution: Solution) => {
		dispatcher('toggle-upvote', { solutionId: solution.id });
	};

	const openDeleteSolutionModal = (solution: Solution) => {
		deletingSolution = solution;
		isDeleteModalOpen = true;
	};
</script>

<ul class="divide-y divide-gray-100">
	{#each solutions as solution}
		<li
			class="flex flex-wrap items-center justify-between gap-x-6 sm:gap-y-4 py-5 px-4 sm:flex-nowrap"
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				on:click={() => {
					dispatcher('click-solution', { solution: solution });
				}}
				class="w-full cursor-pointer"
			>
				<p
					class="text-sm font-semibold leading-6 dark:text-white text-gray-900 overflow-hidden line-clamp-2 select-none"
				>
					{solution.description}
				</p>
				<div class="mt-3 gap-x-2 text-xs leading-5 dark:text-gray-400 text-gray-500">
					<!-- <p class="my-2">
						<span class="font-bold">Possible solutions: </span>
						<span class="text-md">{solution.possibleSolutions.length}</span>
					</p> -->
					<div class="flex items-center">
						<img
							class="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
							referrerpolicy="no-referrer"
							src={solution.author?.profilePicture}
							alt={solution.author?.name}
						/>
						<p class="mx-2">
							{solution.author?.username}
						</p>

						<svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
							<circle cx="1" cy="1" r="1" />
						</svg>
						<span class="ml-2">{new Date(solution.createdAt).toLocaleString()}</span>
					</div>
				</div>
			</div>
			<dl
				class="flex w-full flex-none justify-end sm:justify-between items-end gap-x-2 sm:gap-x-4 sm:w-auto mt-0 mb-auto"
			>
				<div
					class="flex -space-x-0.5 justify-center items-center"
					title={`These people\n liked this solution.`}
				>
					<dt class="sr-only">Followers</dt>
					{#each solution.upVotes?.slice(0, 3) ?? [] as upvote}
						<dd>
							<img
								referrerpolicy="no-referrer"
								class="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white mb-2"
								src={upvote.user?.profilePicture}
								alt={upvote.user?.name}
							/>
						</dd>
					{/each}
					{#if solution.upVotes?.length > 3}
						<dd>
							<span
								class="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white mb-2 flex items-center justify-center text-xs font-semibold text-gray-900"
							>
								+{solution.upVotes.length - 3}
							</span>
						</dd>
					{/if}
				</div>
				<div class="flex w-16 gap-x-2.5 justify-center">
					{#if solution.authorId === $userState?.id}
						<dt>
							<span class="sr-only">Delete this solution</span>
							<button
								on:click={() => {
									openDeleteSolutionModal(solution);
								}}
								class="p-2 dark:bg-transparent bg-slate-50 border rounded-md text-red-500 border-red-500"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="w-6 h-6"
								>
									<path
										fill-rule="evenodd"
										d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</dt>
					{:else}
						<div class="flex flex-col items-center">
							<span class="text-md font-bold leading-6 text-gray-900 text-center"
								>{solution.upVotes.length}</span
							>
							<dt>
								<span class="sr-only">Toggle your vote</span>
								<button
									on:click={() => {
										toggleUpVote(solution);
									}}
									class="p-2 dark:bg-transparent bg-slate-50 border rounded-md {solution.upVotes.find(
										(uv) => uv.userId === $userState?.id
									)
										? 'text-green-500 border-green-500'
										: 'text-slate-500 border-slate-500'}"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="w-6 h-6"
									>
										<path
											fill-rule="evenodd"
											d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5zm.53 7.59l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 12.31z"
											clip-rule="evenodd"
										/>
									</svg>
								</button>
							</dt>
						</div>
					{/if}
				</div>
			</dl>
		</li>
	{/each}
</ul>

<Modal
	title="Are you sure you want to delete this solution?"
	subTitle={deletingSolution?.description ?? ''}
	showModal={isDeleteModalOpen}
	onSubmitCallback={async () => {
		if (deletingSolution) {
			await onDeleteSolutionCallback(deletingSolution);
			deletingSolution = null;
			isDeleteModalOpen = false;
		}
	}}
/>
