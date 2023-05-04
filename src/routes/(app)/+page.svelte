<script lang="ts">
	import ProblemsList from './../../lib/components/ProblemsList.svelte';
	import NewProblem from './../../lib/components/NewProblem.svelte';
	import { pageTitle, userState } from '$lib/store';
	import type { PageData } from './$types';
	import type { Problem } from '../../models/problem';
	import type { UpVote } from '../../models/up-vote';
	import Modal from '$lib/components/Modal.svelte';

	let isProblemDetailsModalOpen = false;

	pageTitle.set('Problems over the world');

	export let data: PageData;

	let { problems } = data;

	let focusingProblem: Problem | null = null;

	const createNewProblem = async (problemDescription: string) => {
		try {
			const response = await fetch('/api/problems', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ description: problemDescription, authorId: $userState!.id })
			});

			if (response.ok) {
				const newProblem = (await response.json()) as Problem;

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
	on:click-problem={onProblemClicked}
/>

<Modal
	title="Problem details"
	showModal={isProblemDetailsModalOpen}
	on:close={() => {
		isProblemDetailsModalOpen = false;
		focusingProblem = null;
	}}
>
	<p>yes</p>
</Modal>
