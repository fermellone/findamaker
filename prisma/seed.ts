// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import userData from '../src/lib/data.json' assert { type: 'json' };

const prisma = new PrismaClient();

async function main() {
	console.log(`Start seeding ...`);

	const allUsers = await prisma.user.findMany();

	if (allUsers.length) {
		console.log(`Users already exist, seeding skipped.`);
		return;
	}

	for (const p of userData) {
		const user = await prisma.user.create({
			data: {
				id: p.id,
				name: p.author.name,
				username: p.author.username,
				email: p.author.email,
				profilePicture: p.author.profilePicture,
				problems: {
					create: {
						description: p.description
					}
				}
			}
		});
		console.log(`Created user with id: ${user.id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
