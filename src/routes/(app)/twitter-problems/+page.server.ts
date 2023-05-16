import { searchTweets } from '$lib/twitter';
import type { TweetSearchRecentV2Paginator } from 'twitter-api-v2';
import type { PageServerLoad } from './$types';
import type { Tweet } from '../../../models/tweet';
import type { TweetAuthor } from '../../../models/tweet-author';

const TWITTER_QUERY = `"I want an app that" OR "I need an app that" OR "I wish to have an app that" OR "Is there an app that"`;

export const load: PageServerLoad = async () => {
	const twitterData = (await searchTweets(TWITTER_QUERY)) as TweetSearchRecentV2Paginator;

	const meta = { ...twitterData.meta };

	const authors = twitterData.includes.users.flatMap((user) => {
		return {
			id: user.id,
			name: user.name,
			username: user.username,
			description: user.description,
			profile_image_url: user.profile_image_url
		} as TweetAuthor;
	});

	const tweets = twitterData.data.data.flatMap((tweet, index) => {
		const author =
			twitterData.includes.userById(tweet.author_id ?? authors[index].id) ?? authors[index];

		return {
			id: tweet.id,
			text: tweet.text,
			retweet_count: tweet.organic_metrics?.retweet_count ?? 0,
			like_count: tweet.organic_metrics?.like_count ?? 0,
			user: {
				id: author.id,
				name: author.name,
				username: author.username,
				description: author.description,
				profile_image_url: author.profile_image_url
			}
		} as Tweet;
	});

	return {
		meta,
		tweets: tweets.filter((tweet) => !tweet.text.startsWith('RT '))
	};
};

export const actions = {
	'load-more': async (event) => {
		const nextToken = event.url.searchParams.get('next-token');

		const twitterData = (await searchTweets(
			TWITTER_QUERY,
			nextToken ?? undefined
		)) as TweetSearchRecentV2Paginator;

		const meta = { ...twitterData.meta };

		const authors = twitterData.includes.users.flatMap((user) => {
			return {
				id: user.id,
				name: user.name,
				username: user.username,
				description: user.description,
				profile_image_url: user.profile_image_url
			} as TweetAuthor;
		});

		const tweets = twitterData.data.data.flatMap((tweet, index) => {
			const author =
				twitterData.includes.userById(tweet.author_id ?? authors[index].id) ?? authors[index];

			return {
				id: tweet.id,
				text: tweet.text,
				retweet_count: tweet.organic_metrics?.retweet_count ?? 0,
				like_count: tweet.organic_metrics?.like_count ?? 0,
				user: {
					id: author.id,
					name: author.name,
					username: author.username,
					description: author.description,
					profile_image_url: author.profile_image_url
				}
			} as Tweet;
		});

		return {
			meta,
			tweets: tweets.filter((tweet) => !tweet.text.startsWith('RT '))
		};
	}
};
