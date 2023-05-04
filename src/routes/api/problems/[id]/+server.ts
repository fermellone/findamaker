import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ params }) => {
	const { id } = params;

	await prisma.problem.delete({
		where: {
			id: Number(id)
		}
	});

	return new Response('Problem deleted successfully', { status: 200 });
};
