import prisma from '$lib/prisma';
import type { Problem } from '../../../../../models/problem';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	const { problemId } = params;

	const type = url.searchParams.get('type');

	if (!type) {
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
