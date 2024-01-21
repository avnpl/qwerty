import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const interestData: Prisma.InterestsCreateInput[] = [
  { interestName: 'AIML' },
  { interestName: 'BACKEND' },
  { interestName: 'MOBILE' },
  { interestName: 'DEVOPS' },
  { interestName: 'TESTING' },
  { interestName: 'UIUX' },
  { interestName: 'ANALYTICS' },
  { interestName: 'FRONTEND' },
  { interestName: 'WEBDEV' },
]

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'aarav.sharma@example.com',
    name: 'Aarav Sharma',
    username: 'aaravsharma',
    password: 'aaravsharmapass',
    bio: 'Hello from Aarav Sharma',
    interests: {
      connect: [{ interestName: 'AIML' }, { interestName: 'WEBDEV' }],
    },
  },
  {
    email: 'aisha.patel@example.com',
    name: 'Aisha Patel',
    username: 'aishapatel',
    password: 'aishapatelpass',
    bio: 'Hello from Aisha Patel',
    interests: {
      connect: [{ interestName: 'FRONTEND' }, { interestName: 'DEVOPS' }],
    },
  },
  {
    email: 'rahul.gupta@example.com',
    name: 'Rahul Gupta',
    username: 'rahulgupta',
    password: 'rahulguptapass',
    bio: 'Hello from Rahul Gupta',
    interests: {
      connect: [{ interestName: 'ANALYTICS' }, { interestName: 'BACKEND' }],
    },
  },
  {
    email: 'priya.sharma@example.com',
    name: 'Priya Sharma',
    username: 'priyasharma',
    password: 'priyasharmapass',
    bio: 'Hello from Priya Sharma',
    interests: {
      connect: [
        { interestName: 'AIML' },
        { interestName: 'ANALYTICS' },
        { interestName: 'UIUX' },
      ],
    },
  },
  {
    email: 'akash.verma@example.com',
    name: 'Akash Verma',
    username: 'akashverma',
    password: 'akashvermapass',
    bio: 'Hello from Akash Verma',
    interests: {
      connect: [{ interestName: 'AIML' }, { interestName: 'UIUX' }],
    },
  },
  {
    email: 'ananya.das@example.com',
    name: 'Ananya Das',
    username: 'ananyadas',
    password: 'ananyadaspass',
    bio: 'Hello from Ananya Das',
    interests: {
      connect: [
        { interestName: 'BACKEND' },
        { interestName: 'TESTING' },
        { interestName: 'MOBILE' },
      ],
    },
  },
  {
    email: 'kunal.singh@example.com',
    name: 'Kunal Singh',
    username: 'kunalsingh',
    password: 'kunalsinghpass',
    bio: 'Hello from Kunal Singh',
    interests: {
      connect: [
        { interestName: 'AIML' },
        { interestName: 'ANALYTICS' },
        { interestName: 'BACKEND' },
        { interestName: 'DEVOPS' },
      ],
    },
  },
  {
    email: 'swati.agarwal@example.com',
    name: 'Swati Agarwal',
    username: 'swatiagarwal',
    password: 'swatiagarwalpass',
    bio: 'Hello from Swati Agarwal',
    interests: {
      connect: [
        { interestName: 'FRONTEND' },
        { interestName: 'WEBDEV' },
        { interestName: 'UIUX' },
        { interestName: 'MOBILE' },
        { interestName: 'TESTING' },
      ],
    },
  },
  {
    email: 'vikas.yadav@example.com',
    name: 'Vikas Yadav',
    username: 'vikasyadav',
    password: 'vikasyadavpass',
    bio: 'Hello from Vikas Yadav',
    interests: {
      connect: [
        { interestName: 'DEVOPS' },
        { interestName: 'WEBDEV' },
        { interestName: 'MOBILE' },
      ],
    },
  },
  {
    email: 'radha.mishra@example.com',
    name: 'Radha Mishra',
    username: 'radhamishra',
    password: 'radhamishrapass',
    bio: 'Hello from Radha Mishra',
    interests: {
      connect: [
        { interestName: 'AIML' },
        { interestName: 'ANALYTICS' },
        { interestName: 'FRONTEND' },
        { interestName: 'BACKEND' },
        { interestName: 'DEVOPS' },
      ],
    },
  },
]

async function main() {
  console.log('Seeding test interests...')
  for (const i of interestData) {
    const interest = await prisma.interests.create({
      data: i,
    })
    console.log(
      `Created ${interest.interestName} with id: ${interest.interestId}`
    )
  }

  console.log('Seeding test users...')
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created ${user.username} with id: ${user.userId}`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
