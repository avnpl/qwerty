import { PrismaClient } from '@prisma/client'
import express from 'express'

const userRoutes = express.Router()
const prisma = new PrismaClient()

userRoutes.get('/', (req, res) => {
  res.send({
    message: 'bruh',
  })
})

userRoutes.post('/api/adduser', async (req, res) => {
  const { email, name, username, password, bio, interests } = req.body

  const user = await prisma.user.create({
    data: {
      email: email,
      password: password,
      name: name,
      username: username,
      bio: bio,
      interests: {
        connect: interests,
      },
    },
  })

  res.send({
    user,
  })
})

userRoutes.get('/api/getuser', async (req, res) => {
  const { username, password } = req.body

  const user = await prisma.user.findFirst({
    where: {
      username: username,
      password: password,
    },
    include: {
      interests: true,
    },
  })

  res.send({
    user,
  })
})

userRoutes.delete('/api/deleteuser', async (req, res) => {
  const { username } = req.body

  await prisma.matches.deleteMany({
    where: {
      OR: [
        {
          userone: {
            username: username,
          },
        },
        {
          usertwo: {
            username: username,
          },
        },
      ],
    },
  })

  const user = await prisma.user.delete({
    where: {
      username: username,
    },
  })

  res.send({
    user,
  })
})

export { userRoutes }
