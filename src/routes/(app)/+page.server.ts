import prisma from '$lib/prisma';
import type { Problem } from '../../models/problem';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const response = (await prisma.problem.findMany({
		orderBy: { createdAt: 'desc' },
		include: { author: true, upVotes: true }
	})) as Problem[];

	return { problems: response };
}) satisfies PageServerLoad;
