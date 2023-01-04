import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedUserData: Prisma.userCreateInput[] = [
	{
		email: "alvin.pauly@vit.edu.in",
		username: "avnpl",
		bio: "Hello from avnpl",
		name: "Alvin Pauly",
		inters: "AIML",
		socials: {
			create: {
				github: "https://github.com/avnpl",
				twitter: "https://twitter.com/avnpl",
			},
		},
	},
];
