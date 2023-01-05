import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
	const users = await prisma.user.findMany({
		where: {},
		select: {
			userId: true,
			name: true,
			username: true,
			email: true,
			bio: true,
		},
	});

	const interests = await prisma.interests.findMany({
		where: {},
	});

	console.table(users);
	console.log("");
	console.table(interests);
};

main();
