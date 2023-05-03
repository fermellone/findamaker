import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const response = await prisma.problem.findMany({
		orderBy: { createdAt: 'desc' },
		include: { author: true }
	});

	return { feed: response };
}) satisfies PageServerLoad;
