import { PrismaClient } from '@prisma/client'
import express from 'express'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', (req, res) => {
  res.send({
    message: 'bruh',
  })
})

router.post('/api/adduser', async (req, res) => {
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

export { router }
