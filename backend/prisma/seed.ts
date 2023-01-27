import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const interestData: Prisma.InterestsCreateInput[] = [
  { interestName: 'AIML' },
  { interestName: 'WEBDEV' },
  { interestName: 'FRONTEND' },
  { interestName: 'BACKEND' },
  { interestName: 'FULLSTACK' },
]

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'alvin.pauly@vit.edu.in',
    name: 'Alvin Pauly',
    username: 'avnpl',
    bio: 'Hello from avnpl',
    interests: {
      connect: [
        { interestName: 'BACKEND' },
        { interestName: 'WEBDEV' },
        { interestName: 'FULLSTACK' },
      ],
    },
  },
  {
    email: 'kaartik.nayak@vit.edu.in',
    name: 'Kartik Nayak',
    username: 'kanay',
    bio: 'Hello from kanay',
    interests: {
      connect: [
        { interestName: 'WEBDEV' },
        { interestName: 'FRONTEND' },
        { interestName: 'FULLSTACK' },
      ],
    },
  },
  {
    email: 'viren.rajhauns@vit.edu.in',
    name: 'Viren Rajhauns',
    username: 'viraj',
    bio: 'Hello from viraj',
    interests: {
      connectOrCreate: [
        {
          where: { interestName: 'AIML' },
          create: { interestName: 'AIML' },
        },
        {
          where: { interestName: 'BRUH' },
          create: { interestName: 'BRUH' },
        },
      ],
    },
  },
  {
    email: 'rohini.malladi@vit.edu.in',
    name: 'Rohini Malladi',
    username: 'romal',
    bio: 'Hello from romal',
    interests: {
      connect: [{ interestName: 'AIML' }, { interestName: 'FULLSTACK' }],
    },
  },
  {
    email: 'monke@vit.edu.in',
    name: 'Monke',
    username: 'monke',
    bio: 'Hello from monke',
    interests: {
      connect: [{ interestName: 'WEBDEV' }, { interestName: 'FULLSTACK' }],
    },
  },
]

const userInterestData: Prisma.InterestsCreateInput[] = []

async function main() {
  console.log('Seeding test interests...')
  for (const i of interestData) {
    const interest = await prisma.interests.create({
      data: i,
    })
    console.log(
      `Created ${interest.interestName} with id: ${interest.interestId}"`
    )
  }

  console.log('Seeding test users...')
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created ${user.username} with id: ${user.userId}"`)
  }

  console.log('Disconnecting viraj test interest')

  const viraj = await prisma.user.update({
    where: { username: 'viraj' },
    data: {
      interests: {
        disconnect: { interestName: 'BRUH' },
      },
    },
    include: {
      interests: true,
    },
  })

  console.log(viraj)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
