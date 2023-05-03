import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	if (data.authorId === undefined) return new Response('Author ID is required', { status: 400 });
	if (data.description === undefined)
		return new Response('Description is required', { status: 400 });

	const currentAuthorProblems = await prisma.problem.findMany({
		where: {
			authorId: data.authorId
		}
	});

	if (currentAuthorProblems.length >= 3)
		return new Response('Author has too many problems', { status: 401 });

	const newProblem = await prisma.problem.create({
		data: {
			description: data.description,
			author: {
				connect: {
					id: data.authorId
				}
			}
		},
		include: {
			author: true,
			upVotes: true
		}
	});

	return new Response(JSON.stringify(newProblem), { status: 201 });
};