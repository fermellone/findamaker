<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { userState } from '$lib/store';
	import type { Problem } from '../../models/problem';
	import Modal from './Modal.svelte';

	export let problems: Problem[] = [];
	export let onDeleteProblemCallback: (problem: Problem) => Promise<void>;
	let isDeleteModalOpen = false;
	let deletingProblem: Problem | null = null;

	const dispatcher = createEventDispatcher();

	const toggleUpVote = async (problem: Problem) => {
		dispatcher('toggle-upvote', { problemId: problem.id });
	};

	const openDeleteProblemModal = (problem: Problem) => {
		deletingProblem = problem;
		isDeleteModalOpen = true;
	};
</script>

<ul class="divide-y divide-gray-100">
	{#each problems as problem}
		<li
			class="flex flex-wrap items-center justify-between gap-x-6 sm:gap-y-4 py-5 px-4 sm:flex-nowrap"
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				on:click={() => {
					dispatcher('click-problem', { problem });
				}}
				class="w-full cursor-pointer"
			>
				<p
					class="text-sm font-semibold leading-6 text-gray-900 overflow-hidden line-clamp-2 select-none"
				>
					{problem.description}
				</p>
				<div class="mt-3gap-x-2 text-xs leading-5 text-gray-500">
					<p>
						<span class="font-bold">Possible solutions: </span>
						<span class="text-md">{problem.possibleSolutions.length}</span>
					</p>
					<div class="flex items-center">
						<img
							class="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
							referrerpolicy="no-referrer"
							src={problem.author.profilePicture}
							alt={problem.author.name}
						/>
						<p class="mx-2">
							{problem.author.username}
						</p>

						<svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
							<circle cx="1" cy="1" r="1" />
						</svg>
					</div>
					<!-- <p><time datetime="2023-01-23T22:34Z">2d ago</time></p> -->
				</div>
			</div>
			<dl
				class="flex w-full flex-none justify-end sm:justify-between items-end gap-x-2 sm:gap-x-4 sm:w-auto mt-0 mb-auto"
			>
				<div
					class="flex -space-x-0.5 justify-center items-center"
					title={`These people\nhave the same problem.`}
				>
					<dt class="sr-only">Followers</dt>
					{#each problem.upVotes.slice(0, 3) as upvote}
						<dd>
							<img
								referrerpolicy="no-referrer"
								class="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white mb-2"
								src={upvote.user?.profilePicture}
								alt={upvote.user?.name}
							/>
						</dd>
					{/each}
					{#if problem.upVotes.length > 3}
						<dd>
							<span
								class="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white mb-2 flex items-center justify-center text-xs font-semibold text-gray-900"
							>
								+{problem.upVotes.length - 3}
							</span>
						</dd>
					{/if}
				</div>
				<div class="flex w-16 gap-x-2.5 justify-center">
					{#if problem.authorId === $userState?.id}
						<dt>
							<span class="sr-only">Delete this problem</span>
							<button
								on:click={() => {
									openDeleteProblemModal(problem);
								}}
								class="p-2 bg-slate-50 border rounded-md text-red-500 border-red-500"
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
										d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
									/>
								</svg>
							</button>
						</dt>
					{:else}
						<div class="flex flex-col items-center">
							<span class="text-md font-bold leading-6 text-gray-900 text-center"
								>{problem.upVotes.length}</span
							>
							<dt>
								<span class="sr-only">Toggle your vote</span>
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
						</div>
					{/if}
				</div>
			</dl>
		</li>
	{/each}
</ul>

<Modal
	title="Are you sure you want to delete this problem?"
	subTitle={deletingProblem?.description ?? ''}
	showModal={isDeleteModalOpen}
	onSubmitCallback={async () => {
		if (deletingProblem) {
			await onDeleteProblemCallback(deletingProblem);
			deletingProblem = null;
			isDeleteModalOpen = false;
		}
	}}
/>
