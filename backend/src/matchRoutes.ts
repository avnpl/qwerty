import { MatchStatus, PrismaClient } from '@prisma/client'
import express from 'express'

const matchRoutes = express.Router()
const prisma = new PrismaClient()

matchRoutes.get('/api/user/getmatches', async (req, res) => {
  const username: string = req.body.username

  const matchesOne = await prisma.matches.findMany({
    where: {
      userone: {
        username: username,
      },
    },
    select: {
      matchId: true,
      usertwo: {
        select: {
          username: true,
        },
      },
      // statone: true,
      stattwo: true,
      mfactor: true,
      mstatus: true,
    },
  })
  const matchesTwo = await prisma.matches.findMany({
    where: {
      usertwo: {
        username: username,
      },
    },
    select: {
      matchId: true,
      userone: {
        select: {
          username: true,
        },
      },
      statone: true,
      // stattwo: true,
      mfactor: true,
      mstatus: true,
    },
  })

  const matches: {
    matchId: string
    mfactor: number
    mstatus: MatchStatus
    status: boolean
    username: string
  }[] = []

  const _matches = [...matchesOne, ...matchesTwo]
    .sort((a, b) => {
      return b.mfactor - a.mfactor
    })
    .map((item) => {
      const { matchId, mfactor, mstatus } = item
      const basic = {
        matchId,
        mfactor,
        mstatus,
      }
      if ('usertwo' in item) {
        const { stattwo, usertwo } = item
        const obj = {
          ...basic,
          status: stattwo,
          username: usertwo.username,
          currUser: 1,
        }
        matches.push(obj)
      } else {
        const { statone, userone } = item
        const obj = {
          ...basic,
          status: statone,
          username: userone.username,
          currUser: 2,
        }
        matches.push(obj)
      }
    })

  return res.send({ matches })
})

export { matchRoutes }
