import { MatchStatus, PrismaClient } from '@prisma/client'
import express from 'express'
import { sendReqBodySchema } from './utils/zod'

const matchRoutes = express.Router()
const prisma = new PrismaClient()

matchRoutes.get('/api/getmatches', async (req, res) => {
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

matchRoutes.post('/api/sendrequest', async (req, res) => {
  const parseRes = sendReqBodySchema.safeParse(req.body)
  if (!parseRes.success) {
    return res.send({ err: parseRes.error })
  }
  const {
    data: { matches },
  } = parseRes

  let reqBatch: any[] = []
  matches.map((match) => {
    const whereObj = {
      matchId: match.matchId,
    }
    if (!match.sent) {
      reqBatch.push(
        prisma.matches.update({
          where: whereObj,
          data: {
            mstatus: 'REJECTED',
          },
        })
      )
    } else {
      if (match.currUser == 1) {
        reqBatch.push(
          prisma.matches.update({
            where: whereObj,
            data: {
              mstatus: 'REQUESTED',
              statone: true,
            },
          })
        )
      } else {
        reqBatch.push(
          prisma.matches.update({
            where: whereObj,
            data: {
              mstatus: 'REQUESTED',
              stattwo: true,
            },
          })
        )
      }
    }
  })

  const result = await prisma.$transaction(reqBatch)

  return res.send({ result })
})

export { matchRoutes }
