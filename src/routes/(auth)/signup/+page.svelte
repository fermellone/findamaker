<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { signInWithGoogle } from '$lib/firebase';
	import { redirect } from '@sveltejs/kit';
	import { analyticsEvents } from '$lib/analytics-events';
	import { logAnalyticsEvent } from '$lib/analytics';

	let username = '';

	const handleSignin = async () => {
		try {
			const { user: firebaseUser } = await signInWithGoogle();
			if (
				localStorage.getItem('user') &&
				JSON.parse(localStorage.getItem('user')!).id === firebaseUser.uid
			) {
				redirect(302, '/');
			} else {
				const resp = await fetch('/api/users', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						id: firebaseUser.uid,
						name: firebaseUser.displayName,
						username: username,
						email: firebaseUser.email,
						profilePicture: firebaseUser.photoURL
					})
				});
				if (resp.ok) {
					logAnalyticsEvent(analyticsEvents.SIGNUP_SUCCESSFULLY, {
						email: firebaseUser.email
					});
					const user = await resp.json();
					localStorage.setItem('user', JSON.stringify(user));
					goto('/');
				} else if (resp.status === 403) {
					alert('You are already registered!');
					logAnalyticsEvent(analyticsEvents.SIGNIN_FAILED, {
						email: firebaseUser.email,
						errorMessage: 'User already registered'
					});
					goto('/signin');
				} else {
					logAnalyticsEvent(analyticsEvents.SIGNIN_FAILED, {
						email: firebaseUser.email,
						errorMessage: resp.statusText
					});
					throw new Error(resp.statusText);
				}
			}
		} catch (error: any | (Error & { message: string })) {
			console.log(error);
			alert(error.message);
		}
	};
</script>

<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<div class="bg-white dark:bg-transparent px-6 py-12 shadow sm:rounded-lg sm:px-12">
			<div>
				<div class="grid grid-cols-1 gap-4">
					<h2
						class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white"
					>
						Sign up
					</h2>
					<div>
						<label
							for="username"
							class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200"
							>Select a username</label
						>
						<div class="mt-2 flex rounded-sm shadow-sm">
							<span
								class="inline-flex items-center rounded-l-md border dark:border-indigo-700 border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm"
								>@</span
							>
							<input
								type="text"
								name="username"
								id="username"
								bind:value={username}
								autocomplete="off"
								class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								placeholder="cosmefulanito"
							/>
						</div>
					</div>
					<button
						disabled={!username}
						on:click={handleSignin}
						class="flex w-full items-center justify-center gap-3 rounded-sm bg-orange-600 px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
					>
						<svg
							class="h-5 2-5"
							id="Слой_1"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							viewBox="-380.2 274.7 65.7 65.8"
							><style>
								.st0 {
									fill: #e0e0e0;
								}
								.st1 {
									fill: #fff;
								}
								.st2 {
									clip-path: url(#SVGID_2_);
									fill: #fbbc05;
								}
								.st3 {
									clip-path: url(#SVGID_4_);
									fill: #ea4335;
								}
								.st4 {
									clip-path: url(#SVGID_6_);
									fill: #34a853;
								}
								.st5 {
									clip-path: url(#SVGID_8_);
									fill: #4285f4;
								}
							</style><circle class="st0" cx="-347.3" cy="307.6" r="32.9" /><circle
								class="st1"
								cx="-347.3"
								cy="307.1"
								r="32.4"
							/><g
								><defs
									><path
										id="SVGID_1_"
										d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
									/></defs
								><clipPath id="SVGID_2_"><use xlink:href="#SVGID_1_" overflow="visible" /></clipPath
								><path class="st2" d="M-370.8 320.3v-26l17 13z" /><defs
									><path
										id="SVGID_3_"
										d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
									/></defs
								><clipPath id="SVGID_4_"><use xlink:href="#SVGID_3_" overflow="visible" /></clipPath
								><path class="st3" d="M-370.8 294.3l17 13 7-6.1 24-3.9v-14h-48z" /><g
									><defs
										><path
											id="SVGID_5_"
											d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
										/></defs
									><clipPath id="SVGID_6_"
										><use xlink:href="#SVGID_5_" overflow="visible" /></clipPath
									><path class="st4" d="M-370.8 320.3l30-23 7.9 1 10.1-15v48h-48z" /></g
								><g
									><defs
										><path
											id="SVGID_7_"
											d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
										/></defs
									><clipPath id="SVGID_8_"
										><use xlink:href="#SVGID_7_" overflow="visible" /></clipPath
									><path class="st5" d="M-322.8 331.3l-31-24-4-3 35-10z" /></g
								></g
							></svg
						>
						<span class="text-sm font-semibold leading-6">Google</span>
					</button>

					<a
						href="/signin{$page.url.searchParams.get('next') ?? ''}"
						class="text-blue-400 text-center"
						>Or <span class="font-bold">Sign in</span> if you already have an account.</a
					>
				</div>
			</div>
		</div>
	</div>
</div>
