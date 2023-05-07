import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const solutions = await prisma.solution.findMany({
		include: {
			problem: true
		}
	});

	return {
		solutions
	};
};
