import prisma from '$lib/prisma';
import { getTweet } from '$lib/twitter';
import type { Problem } from '../../../../../models/problem';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	const { problemId } = params;

	const type = url.searchParams.get('type');

	if (type == 'tweet') {
		const tweet = await getTweet(problemId);

		// Here we need to create a temporary problem because the tweet doesn't have one yet
		const problem: Problem = {
			id: 0,
			description: tweet.data.text,
			authorId: '',
			tweetId: tweet.data.id,
			type: 'tweet',
			createdAt: new Date(),
			upVotes: [],
			possibleSolutions: []
		};

		return { problem };
	} else if (!type) {
		const problem = (await prisma.problem.findUnique({
			where: { id: Number(problemId) }
		})) as Problem;

		if (!problem) {
			return {
				status: 404,
				error: `Problem with id ${problemId} not found`
			};
		}

		return {
			problem
		};
	} else {
		return {
			status: 400,
			error: `Invalid type ${type}`
		};
	}
};
