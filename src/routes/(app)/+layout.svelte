<script lang="ts">
	import '../../app.postcss';
	import { pageTitle, userState } from '$lib/store';
	import { authDataSource } from '$lib/firebase';
	import { page } from '$app/stores';

	import { slide } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';
	import { onAuthStateChanged, type Unsubscribe } from 'firebase/auth';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	let isMenuOpen = false;

	const handleLogout = async () => {
		await authDataSource.signOut();
	};

	let unsubscribe: Unsubscribe;

	onMount(() => {
		if (browser) {
			unsubscribe = onAuthStateChanged(authDataSource, async (firebaseUser) => {
				try {
					if (firebaseUser) {
						const storedUser = localStorage.getItem('user');

						if (storedUser && JSON.parse(storedUser).id === firebaseUser.uid) {
							userState.set(JSON.parse(storedUser));
						} else {
							await authDataSource.signOut();
							userState.set(null);
							localStorage.removeItem('user');
							goto('/signin');
						}
					} else {
						userState.set(null);
						localStorage.removeItem('user');
						goto('/signin');
					}
				} catch (error) {
					console.log(error);
				}
			});
		}
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>
{#if !$userState}
	Loading...
{:else}
	<div class="min-h-full">
		<nav class="border-b border-gray-200 bg-white">
			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex h-16 justify-between">
					<div class="flex">
						<div class="flex flex-shrink-0 items-center">
							<img
								class="block h-8 w-auto lg:hidden"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
								alt="Your Company"
							/>
							<img
								class="hidden h-8 w-auto lg:block"
								src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
								alt="Your Company"
							/>
						</div>
						<div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
							<a
								href="/"
								class="{$page.url.pathname === '/'
									? 'current'
									: 'default'} desktop inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
								aria-current="page">Problems over the world</a
							>
							<a
								href="/mine"
								class="{$page.url.pathname === '/mine'
									? 'current'
									: 'default'} desktop inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
								>Problems that you're following</a
							>
							<a
								href="/being-solved"
								class="{$page.url.pathname === '/being-solved'
									? 'current'
									: 'default'} desktop inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
								>Problems that are being solved</a
							>
						</div>
					</div>
					<div class="hidden sm:ml-6 sm:flex sm:items-center">
						<button
							type="button"
							class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							on:click={handleLogout}
						>
							Sign out
						</button>

						<!-- Profile dropdown -->
						<div class="relative ml-3">
							<div>
								<button
									type="button"
									class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									id="user-menu-button"
									aria-expanded="false"
									aria-haspopup="true"
								>
									<img class="h-8 w-8 rounded-full" src={$userState.profilePicture} alt="" />
								</button>
							</div>
						</div>
					</div>
					<div class="-mr-2 flex items-center sm:hidden">
						<!-- Mobile menu button -->
						<button
							on:click={() => {
								isMenuOpen = !isMenuOpen;
							}}
							type="button"
							class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							aria-controls="mobile-menu"
							aria-expanded="false"
						>
							<span class="sr-only">Open main menu</span>
							<!-- Menu open: "hidden", Menu closed: "block" -->
							<svg
								class="block h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
							<!-- Menu open: "block", Menu closed: "hidden" -->
							<svg
								class="hidden h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>
			</div>

			<!-- Mobile menu, show/hide based on menu state. -->
			{#if isMenuOpen}
				<div class="sm:hidden" id="mobile-menu" transition:slide>
					<div class="space-y-1 pb-3 pt-2">
						<a
							href="/"
							class="{$page.url.pathname === '/'
								? 'current'
								: 'default'} mobile block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
							aria-current="page">Problems over the world</a
						>
						<a
							href="/mine"
							class="{$page.url.pathname === '/mine'
								? 'current'
								: 'default'} mobile block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
							>Your problems</a
						>
						<a
							href="/being-solved"
							class="{$page.url.pathname === '/being-solved'
								? 'current'
								: 'default'} mobile block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
							>Problems that are being solved</a
						>
					</div>
					<div class="border-t border-gray-200 pb-3 pt-4">
						<div class="flex items-center px-4">
							<div class="flex-shrink-0">
								<img class="h-10 w-10 rounded-full" src={$userState.profilePicture} alt="" />
							</div>
							<div class="ml-3">
								<div class="text-base font-medium text-gray-800">{$userState.name}</div>
								<div class="text-sm font-medium text-gray-500">{$userState.email}</div>
							</div>
							<button
								on:click={handleLogout}
								type="button"
								class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								Sign out
							</button>
						</div>
					</div>
				</div>
			{/if}
		</nav>

		<div class="py-10">
			<header>
				<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">
						{$pageTitle}
					</h1>
				</div>
			</header>
			<main>
				<div class="mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-2">
					<slot />
				</div>
			</main>
		</div>
	</div>
{/if}

<style lang="postcss">
	.desktop.current {
		@apply border-indigo-500 text-indigo-700;
	}

	.desktop.default {
		@apply border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700;
	}

	.mobile.current {
		@apply border-indigo-500 bg-indigo-50 text-indigo-700;
	}

	.mobile.default {
		@apply border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800;
	}
</style>
