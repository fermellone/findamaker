import prisma from "$lib/prisma";
import type {RequestHandler} from "./$types";



export const DELETE: RequestHandler = async ({ url }) => {
	const problemId = url.pathname.split('/').pop();

	await prisma.problem.delete({
		where: {
			id: Number(problemId)
		}
	});

	return new Response('Problem deleted successfully', { status: 200 });
};
