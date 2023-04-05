import { PrismaClient } from '@prisma/client'
import express from 'express'
import findMatches from './utils/findMatches'

const userRoutes = express.Router()
const prisma = new PrismaClient()

userRoutes.get('/', (req, res) => {
  return res.send({
    message: 'bruh',
  })
})

userRoutes.post('/api/adduser', async (req, res) => {
  const { email, name, username, password, bio, interests } = req.body

  let user
  try {
    user = await prisma.user.create({
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
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: err })
  }
  await findMatches(user.username)
  return res.send({
    user,
  })
})

userRoutes.get('/api/getuser', async (req, res) => {
  const { username, password } = req.body

  let user
  try {
    user = await prisma.user.findFirst({
      where: {
        username: username,
        password: password,
      },
      include: {
        interests: true,
      },
    })
  } catch (err) {
    return res.status(400).send({ error: err })
  }
  return res.send({
    user,
  })
})

userRoutes.delete('/api/deleteuser', async (req, res) => {
  const { username } = req.body

  let user
  try {
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

    user = await prisma.user.delete({
      where: {
        username: username,
      },
    })
  } catch (err) {
    return res.status(400).send({ error: err })
  }

  return res.send({
    user,
  })
})

export { userRoutes }
