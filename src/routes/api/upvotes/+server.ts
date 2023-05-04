import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	if (!data.userId) return new Response('Author ID is required', { status: 400 });
	if (!data.problemId) return new Response('Description is required', { status: 400 });

	const newUpVote = await prisma.upVote.create({
		data: {
			problemId: data.problemId,
			userId: data.userId
		},
		include: {
			user: true
		}
	});

	return new Response(JSON.stringify(newUpVote), { status: 201 });
};

export const DELETE: RequestHandler = async ({ request }) => {
	const data = await request.json();

	if (!data.upVoteId) return new Response('Author ID is required', { status: 400 });

	await prisma.upVote.delete({
		where: {
			id: data.upVoteId
		}
	});

	return new Response('Upvote deleted successfully', { status: 200 });
};
