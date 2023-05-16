<script lang="ts">
	import TweetsList from './../../../lib/components/TweetsList.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { pageTitle } from '$lib/store';

	pageTitle.set('Twitter problems');

	export let data: PageData;

	$: ({ meta, tweets } = data);

	const gotoSolveTweet = (event: CustomEvent) => {
		const { tweetId } = event.detail;
		// here we use the tweetId instead of the problemId because we don't have a problemId
		goto(`/problems/${tweetId}/solve?type=tweet`);
	};
</script>

<main>
	{#if !tweets.length}
		<p>No problems found.</p>
	{:else}
		<span class="dark:text-gray-200">Here you have <b>{tweets.length}</b> problems to solve.</span>
		<TweetsList {tweets} on:click-solve-tweet={gotoSolveTweet} />
		{#if meta.next_token}
			<form action="?load-more">
				<input
					class="hidden"
					type="text"
					id="next-token"
					name="next-token"
					value={meta.next_token}
				/>
				<button type="submit">Load more</button>
			</form>
		{/if}
	{/if}
</main>
