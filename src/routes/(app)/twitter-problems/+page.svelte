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
		<!-- <ul>
			{#each tweets as tweet, index}
				<li>
					<a href="https://twitter.com/markjoonlee/status/{tweet.id}" target="_blank">
						<span>@{tweet.user.username}</span>
						<img
							referrerpolicy="no-referrer"
							src={tweet.user.profile_image_url?.replace('_normal', '_bigger') ??
								'//placekitten.com/100/100'}
							alt={tweet.user.name}
						/>
						<span>{tweet.text}</span>
						<span>{tweet.retweet_count}</span>
						<span>{tweet.like_count}</span>
					</a>
				</li>
			{/each}
		</ul> -->
	{/if}
</main>
