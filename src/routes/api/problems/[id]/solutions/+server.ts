import prisma from '$lib/prisma';
import { getTweet } from '$lib/twitter';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, params }) => {
	const { link, description, authorId, type } = await request.json();
	if (!link) return new Response('Link is required', { status: 400 });
	if (!description) return new Response('Description is required', { status: 400 });

	let problemId: number | undefined;

	if (type == 'tweet') {
		const tweet = await getTweet(params.id);

		const newProblem = await prisma.problem.create({
			data: {
				type: 'tweet',
				tweetId: params.id,
				description: tweet.data.text,
				author: {
					connect: {
						id: authorId
					}
				}
			}
		});

		problemId = newProblem.id;
	}

	const newSolution = await prisma.solution.create({
		data: {
			link,
			description,
			author: {
				connect: {
					id: authorId
				}
			},
			problem: {
				connect: {
					id: problemId ?? Number(params.id)
				}
			}
		}
	});

	return new Response(JSON.stringify(newSolution), { status: 201 });
};
