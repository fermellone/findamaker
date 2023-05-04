import prisma from '$lib/prisma';
import type {Problem} from '../../../../../models/problem';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { problemId } = params;

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
};
