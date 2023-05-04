<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Loading from '$lib/components/Loading.svelte';

	const dispatch = createEventDispatcher();

	function handleClose() {
		dialog.close();
		showModal = false;
		dispatch('close');
	}

	export let onSubmitCallback: null | (() => Promise<void>) = null;

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
		on:close={() => {
			handleClose();
		}}
		on:click|self={() => {
			handleClose();
		}}
		class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto p-4 md:p-8 text-left relative text-black"
	>
		{#if title}
			<h1 class="text-lg font-bold">{title}</h1>
		{/if}
		{#if subTitle}
			<p class="line-clamp-3">{subTitle}</p>
		{/if}
		<button
			class="absolute top-3 right-2.5"
			type="button"
			on:click={() => {
				handleClose();
			}}
		>
			<div
				class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
			>
				❌
			</div>
		</button>
		<slot />
		{#if onSubmitCallback}
			<button
				type="submit"
				disabled={isLoading}
				on:click={async () => {
					isLoading = true;
					if (onSubmitCallback) await onSubmitCallback();
					handleClose();
					isLoading = false;
				}}
				class="mx-auto mt-3 inline-flex w-full sm:w-1/4 items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0"
			>
				{#if isLoading}
					<div role="status" class="flex flex-nowrap justify-center items-center">
						<svelte:component this={Loading} />
						<span>Loading...</span>
					</div>
				{:else}
					<span>Confirm</span>
				{/if}
			</button>
		{/if}
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
