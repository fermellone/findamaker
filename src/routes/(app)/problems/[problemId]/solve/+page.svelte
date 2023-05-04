<script lang="ts">
	import { pageTitle, userState } from '$lib/store';
	import type { PageData } from './$types';

	pageTitle.set('Solve the problem');

	export let data: PageData;
	let linkInput = '';

	$: problem = data.problem;

	const handleSubmit = async (event: Event) => {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());
		await fetch(`/api/problems/${problem!.id}/solutions`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ ...data, authorId: $userState!.id })
		});
	};

	$: isLinkInvalid =
		!linkInput.match(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/) &&
		linkInput !== '';
</script>

<div class="px-4 sm:px-0">
	<h2 class="leading-2 mb-8">
		We hardly encourage you to try to solve the problem yourself, maybe you only have a figma design
		or a prototype, but you can still add it here. Github repos, websites, apps, etc. are all
		welcome.
	</h2>
	<form on:submit|preventDefault={handleSubmit}>
		<div class="space-y-12">
			<div class="border-b border-gray-900/10 pb-12">
				<h2 class="text-base font-semibold leading-7 text-gray-900">Problem description</h2>
				<p class="mt-1 text-sm leading-6 text-gray-600">{problem?.description}</p>

				<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div class="sm:col-span-6">
						<label for="link" class="block text-sm leading-6 text-gray-900 font-bold">Link</label>
						<span class="text-sm text-gray-400"
							>Add the here the URL of the possible solution.
						</span>
						<div class="mt-2">
							<div class="w-full sm:w-1/2">
								<div class="relative mt-2 rounded-md shadow-sm">
									<input
										type="link"
										name="link"
										id="link"
										class="block w-full rounded-md border-0 py-1.5 pr-10 pl-2 {isLinkInvalid
											? 'text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500'
											: 'text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600'} sm:text-sm sm:leading-6"
										bind:value={linkInput}
										aria-invalid="true"
										aria-describedby="link-error"
									/>
									{#if isLinkInvalid}
										<div
											class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
										>
											<svg
												class="h-5 w-5 text-red-500"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
													clip-rule="evenodd"
												/>
											</svg>
										</div>
									{/if}
								</div>
								{#if isLinkInvalid}
									<p class="mt-2 text-sm text-red-600" id="link-error">Not a valid URL.</p>
								{/if}
							</div>
						</div>

						<div class="col-span-full">
							<label for="description" class="block text-sm font-medium leading-6 text-gray-900"
								>Description</label
							>
							<span class="text-sm text-gray-400"
								>Explain a little about how you think this can solve the problem.</span
							>
							<div class="mt-2">
								<textarea
									id="description"
									name="description"
									rows="3"
									required
									class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-6 flex items-center justify-end gap-x-6">
				<button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
				<button
					type="submit"
					class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>Save</button
				>
			</div>
		</div>
	</form>
</div>
