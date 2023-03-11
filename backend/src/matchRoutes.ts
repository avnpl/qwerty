import { PrismaClient } from '@prisma/client'
import express from 'express'

const matchRoutes = express.Router()
const prisma = new PrismaClient()

matchRoutes.get('/api/user/findmatches', async (req, res) => {
  const { username } = req.body

  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    include: {
      interests: true,
    },
  })

  if (user == null) {
    return res.send({
      error: 'Username not found',
    })
  }

  const { interests } = user

  const matches = await prisma.user.findMany({
    where: {
      username: {
        not: username,
      },
      interests: {
        some: {
          OR: interests,
        },
      },
    },
    include: {
      interests: true,
    },
  })

  const matchesFound: { username: string; interIds: number[] }[] = []
  matches.map((param) => {
    const { username, interests } = param
    const interIds: number[] = []
    interests.map((interObj) => {
      const { interestId } = interObj
      interIds.push(interestId)
    })
    const userIntersObj = { username, interIds }
    matchesFound.push(userIntersObj)
  })

  const currUserInters: number[] = []
  interests.map((param) => {
    const { interestId } = param
    currUserInters.push(interestId)
  })

  const mfactors: { username: string; mfactor: number }[] = []
  const currInterSet = new Set(currUserInters)
  matchesFound.map((match) => {
    const union = new Set([...currUserInters, ...match.interIds])
    const intersect = new Set(
      [...match.interIds].filter((x) => currInterSet.has(x))
    )
    const mfactor = Math.floor((intersect.size / union.size) * 100) / 100
    mfactors.push({
      username: match.username,
      mfactor,
    })
  })

  const queryBatch: any[] = []
  mfactors.map((item) => {
    queryBatch.push(
      prisma.matches.create({
        data: {
          mfactor: item.mfactor,
          mstatus: 'MATCHED',
          statone: false,
          stattwo: false,
          userone: {
            connect: {
              username: username,
            },
          },
          usertwo: {
            connect: {
              username: item.username,
            },
          },
        },
      })
    )
  })
  let result
  try {
    result = await prisma.$transaction(queryBatch)
  } catch (err) {
    return res.send(err)
  }

  return res.send({
    result,
  })
})

export { matchRoutes }
