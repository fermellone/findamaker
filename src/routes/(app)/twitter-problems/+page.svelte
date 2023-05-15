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
		<TweetsList {tweets} on:click-solve-tweet={gotoSolveTweet} />
	{/if}
</main>
