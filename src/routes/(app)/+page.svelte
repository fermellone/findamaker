<script lang="ts">
	import ProblemsList from './../../lib/components/ProblemsList.svelte';
	import NewProblem from './../../lib/components/NewProblem.svelte';
	import { pageTitle, userState } from '$lib/store';
	import type { PageData } from './$types';
	import type { Problem } from '../../models/problem';
	import type { UpVote } from '../../models/up-vote';
	import Modal from '$lib/components/Modal.svelte';
	import { goto } from '$app/navigation';
	import { analyticsEvents } from '$lib/analytics-events';
	import { logAnalyticsEvent } from '$lib/analytics';

	let isProblemDetailsModalOpen = false;

	pageTitle.set('Problems over the world');

	export let data: PageData;

	let { problems } = data;

	let focusingProblem: Problem | null = null;

	const createNewProblem = async (problemDescription: string) => {
		try {
			if (!$userState) {
				logAnalyticsEvent(analyticsEvents.CREATE_PROBLEM_WITHOUT_SIGNIN, {
					problemDescription
				});
				goto('/signin');
			}

			const response = await fetch('/api/problems', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ description: problemDescription, authorId: $userState!.id })
			});

			if (response.ok) {
				const newProblem = (await response.json()) as Problem;
				logAnalyticsEvent(analyticsEvents.CREATE_NEW_PROBLEM, {
					problemId: newProblem.id,
					problemDescription: newProblem.description,
					problemAuthorId: newProblem.authorId,
					problemAuthorEmail: newProblem.author?.email
				});

				problems = [newProblem, ...problems];
			} else if (response.status === 401) {
				throw new Error(
					'You have three problems already. If you want to create a new one, you have to delete one.'
				);
			} else {
				throw new Error('Something went wrong');
			}
		} catch (error: any | (Error & { message: string })) {
			alert(error.message);
		}
	};

	const deleteUpVote = async (upVoteId: number): Promise<void> => {
		const response = await fetch('/api/upvotes', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ upVoteId })
		});

		if (!response.ok) {
			throw new Error('Error deleting upvote: ' + response.statusText);
		}
	};

	const createUpVote = async (userId: string, problemId: number): Promise<UpVote> => {
		const response = await fetch('/api/upvotes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ userId, problemId })
		});

		if (!response.ok) {
			throw new Error('Error creating an upvote: ' + response.statusText);
		} else {
			return (await response.json()) as UpVote;
		}
	};

	const toggleUpVote = async (event: CustomEvent): Promise<void> => {
		if (!$userState) {
			logAnalyticsEvent(analyticsEvents.UPVOTE_WITHOUT_SIGNIN, {
				problemId: event.detail.problemId
			});
			goto('/signin');
		}

		const { problemId } = event.detail;

		const problemIndex = problems.findIndex((problem) => problem.id === problemId);
		const userUpVoteIndex = problems[problemIndex].upVotes.findIndex((upvote) => {
			return upvote.userId === $userState?.id;
		});

		try {
			if (userUpVoteIndex !== -1) {
				await deleteUpVote(problems[problemIndex].upVotes[userUpVoteIndex].id);
				const updatedUpVotes = problems[problemIndex].upVotes.filter(
					({ id }) => id !== problems[problemIndex].upVotes[userUpVoteIndex].id
				);

				problems[problemIndex].upVotes = updatedUpVotes;
				const problemsCopy = problems;

				problems = [...problemsCopy];
			} else {
				const newUpVote = await createUpVote($userState!.id, problemId);
				problems[problemIndex].upVotes = [newUpVote, ...problems[problemIndex].upVotes];
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteProblem = async (problem: Problem) => {
		try {
			const response = await fetch(`/api/problems/${problem.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				problems = problems.filter((p) => p.id !== problem.id);
			} else {
				throw new Error('Something went wrong');
			}
		} catch (error: any | (Error & { message: string })) {
			alert(error.message);
		}
	};

	const onProblemClicked = (event: CustomEvent) => {
		logAnalyticsEvent(analyticsEvents.CLICK_ON_PROBLEM_DETAILS, {
			problemId: event.detail.problem.id
		});
		const problem = event.detail.problem as Problem;
		focusingProblem = problem;
		isProblemDetailsModalOpen = true;
	};
</script>

<NewProblem onSubmitCallback={createNewProblem} />

<ProblemsList
	{problems}
	on:toggle-upvote={toggleUpVote}
	onDeleteProblemCallback={deleteProblem}
	on:click-solution={onProblemClicked}
/>

<Modal
	title="Problem details"
	showModal={isProblemDetailsModalOpen}
	on:close={() => {
		isProblemDetailsModalOpen = false;
		focusingProblem = null;
	}}
>
	<p>{focusingProblem?.description}</p>
	<p class="mt-8">
		<span class="font-bold">Upvotes:</span>
		<span class="text-md">{focusingProblem?.upVotes.length}</span>
	</p>

	<div class="flex sm:justify-center items-center mt-12">
		<button
			class="mt-3 text-center w-full sm:w-1/3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0"
			on:click={() => {
				logAnalyticsEvent(analyticsEvents.GOTO_SOLVE_PROBLEM, {
					problemId: focusingProblem?.id,
					problemDescription: focusingProblem?.description,
					userId: $userState?.id ?? 'unregistered user'
				});
				goto(`/problems/${focusingProblem?.id}/solve`);
			}}>Solve this problem</button
		>
		<!-- TODO implement this -->
		<!-- <a
			class="mt-3 text-center w-full sm:w-1/3 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0"
			href={`/problems/${focusingProblem?.id}/possible-solutions`}>See the possible solutions</a
		> -->
	</div>
</Modal>
