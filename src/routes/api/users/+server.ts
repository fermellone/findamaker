import prisma from '$lib/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	const userWithThisId = await prisma.user.findUnique({
		where: { id: data.id }
	});

	const userWithThisUsername = await prisma.user.findUnique({
		where: { username: data.username }
	});

	if (userWithThisId) {
		return new Response('User already registered', { status: 403 });
	} else if (userWithThisUsername) {
		return new Response('Username already taken', { status: 403 });
	} else {
		const newUser = await prisma.user.create({
			data: {
				id: data.id,
				email: data.email,
				name: data.name,
				username: data.username,
				profilePicture: data.profilePicture
			}
		});

		return new Response(JSON.stringify(newUser), { status: 201 });
	}
};
