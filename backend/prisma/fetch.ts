import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const users = await prisma.user.findMany({
    where: {},
    select: {
      userId: true,
      username: true,
      name: true,
      bio: true,
      email: true,
      createdAt: false,
    },
  });

  const interests = await prisma.interests.findMany({
    where: {},
  });

  console.table(users);
  console.log("");
  console.table(interests);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
