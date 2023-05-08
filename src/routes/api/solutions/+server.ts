import prisma from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const { authorId } = params;

	const solutions = await prisma.solution.findMany({
		where: {
			authorId
		},
		include: {
			problem: true
		}
	});

	return new Response(JSON.stringify(solutions), { status: 200 });
};
