import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const interestData: Prisma.interestsCreateInput[] = [
	{ interestName: "AIML" },
	{ interestName: "WEBDEV" },
	{ interestName: "FRONTEND" },
	{ interestName: "BACKEND" },
	{ interestName: "FULLSTACK" },
];

const userData: Prisma.userCreateInput[] = [
	{
		email: "alvin.pauly@vit.edu.in",
		name: "Alvin Pauly",
		username: "avnpl",
		bio: "Hello from avnpl",
	},
	{
		email: "kaartik.nayak@vit.edu.in",
		name: "KArtik Nayak",
		username: "kanay",
		bio: "Hello from kanay",
	},
	{
		email: "viren.rajhauns@vit.edu.in",
		name: "Viren Rajhauns",
		username: "viraj",
		bio: "Hello from viraj",
	},
	{
		email: "rohini.malladi@vit.edu.in",
		name: "Rohini Malladi",
		username: "romal",
		bio: "Hello from romal",
	},
	{
		email: "monke@vit.edu.in",
		name: "Monke",
		username: "monke",
		bio: "Hello from monke",
	},
];

const userInterestData: Prisma.userInterestCreateInput[] = [];

async function main() {
	console.log("Seeding test users...");
	for (const u of userData) {
		const user = await prisma.user.create({
			data: u,
		});
		console.log(`Created ${user.username} with id: ${user.userId}"`);
	}

	console.log("Seeding test interests...");
	for (const i of interestData) {
		const interest = await prisma.interests.create({
			data: i,
		});
		console.log(
			`Created ${interest.interestName} with id: ${interest.interestId}"`,
		);
	}

	console.log("Seeding finished.");
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
	});
