import prisma from '$lib/prisma';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const solutions = await prisma.solution.findMany({
		include: {
			problem: true
		}
	});

	return {
		solutions
	};
};
