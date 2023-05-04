import prisma from '$lib/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const {id} = params;

	if (!id) {
		return new Response('Missing id', { status: 400 });
	}

	const user = await prisma.user.findUnique({
		where: { id }
	});

	if (user) {
		return new Response(JSON.stringify(user), { status: 200 });
	} else {
		return new Response('User not found', { status: 404 });
	}
};
