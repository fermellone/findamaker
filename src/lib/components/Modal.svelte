<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleClose() {
		dispatch('close');
	}

	export let onSubmitCallback: () => Promise<void>;

	export let title: string = '';
	export let subTitle: string = '';
	export let showModal: boolean;
	let isLoading: boolean = false;
	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<div class="h-full top-0 left-0 right-0 z-50 w-full p-4 md:inset-0 max-h-full">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<dialog
		bind:this={dialog}
		on:close={() => (showModal = false)}
		on:click|self={() => {
			handleClose();
			dialog.close();
		}}
		class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto p-4 md:p-8 text-left relative text-black"
	>
		{#if title}
			<h1>{title}</h1>
		{/if}
		{#if subTitle}
			<p class="line-clamp-3">{subTitle}</p>
		{/if}
		<slot />
		<button
			type="button"
			on:click={() => {
				handleClose();
				showModal = false;
				dialog.close();
			}}
		>
			<div
				class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
			>
				❌
			</div>
		</button>
		<slot />

		<button
			type="submit"
			disabled={isLoading}
			on:click={async () => {
				isLoading = true;
				await onSubmitCallback();
				dialog.close();
				isLoading = false;
			}}
			class="mx-auto mt-3 inline-flex w-full sm:w-1/4 items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0"
		>
			{#if isLoading}
				<div role="status" class="flex flex-nowrap justify-center items-center">
					<svg
						aria-hidden="true"
						class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-200"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<span>Loading...</span>
				</div>
			{:else}
				<span>Confirm</span>
			{/if}
		</button>
	</dialog>
</div>

<style>
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > * {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
