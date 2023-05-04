<script lang="ts">
	import Loading from './Loading.svelte';

	let isSubmitting = false;

	export let onSubmitCallback: (problemDescription: string) => Promise<void>;

	const handleShareNewProblem = async (event: Event) => {
		isSubmitting = true;
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const description = formData.get('description') as string;

		await onSubmitCallback(description);

		form.reset();
		isSubmitting = false;
	};
</script>

<div class="bg-white shadow sm:rounded-lg">
	<div class="px-4 py-5 sm:p-6">
		<h3 class="text-base font-semibold leading-6 text-gray-900">Tell us your problem</h3>
		<div class="mt-2 max-w-xl text-sm text-gray-500">
			<p>You can explain us a little or with details. As you wish!</p>
			<p>It could be whatever you think can be solved with software</p>
			<p>
				If you get many votes, maybe someone who wants to solve it will create a solution for you.
				👀
			</p>
		</div>
		<form
			class="mt-5 sm:flex sm:items-center"
			on:submit|preventDefault={async (event) => {
				await handleShareNewProblem(event);
			}}
		>
			<div class="w-full">
				<label for="description" class="sr-only">Your f*king problem</label>
				<textarea
					required
					name="description"
					id="description"
					class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					placeholder="eg.: I can't find a good pizza."
				/>
			</div>
			<button
				type="submit"
				class="mt-3 inline-flex flex-nowrap w-full items-center justify-center sm:w-1/4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0"
			>
				{#if isSubmitting}
					<Loading />
					<span class="block">Sharing...</span>
				{:else}
					<span>Share it!</span>
				{/if}
			</button>
		</form>
	</div>
</div>
