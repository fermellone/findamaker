import { TWITTER_TOKEN } from '$env/static/private';
import { TwitterApi } from 'twitter-api-v2';

export const twitterClient = new TwitterApi(TWITTER_TOKEN);

export const searchTweets = async (query: string, nextToken?: string) => {
	const res = await twitterClient.v2.search(query, {
		expansions: ['author_id', 'referenced_tweets.id'],
		'user.fields': ['description', 'created_at', 'profile_image_url'],
		max_results: 100,
		sort_order: 'relevancy',
		next_token: nextToken
	});

	console.log(res.meta);

	return res;
};

export const getTweet = async (id: string) => {
	const res = await twitterClient.v2.singleTweet(id, {
		expansions: ['author_id', 'referenced_tweets.id'],
		'user.fields': ['description', 'created_at', 'profile_image_url']
	});

	return res;
};
