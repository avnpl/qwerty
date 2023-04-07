import { PrismaClient } from '@prisma/client'
import express from 'express'
import { mergeOneTwo } from './utils/mergeOneTwo'
import { acceptReqBodySchema, sendReqBodySchema } from './utils/zod'

const matchRoutes = express.Router()
const prisma = new PrismaClient()

const selectObj = {
  mfactor: true,
  matchId: true,
}
const selectObjOne = {
  usertwo: {
    select: {
      username: true,
    },
  },
}
const selectObjTwo = {
  userone: {
    select: {
      username: true,
    },
  },
}

matchRoutes.get('/api/getallmatches', async (req, res) => {
  const username: string = req.body.username

  const matchesOne = await prisma.matches.findMany({
    where: {
      userone: {
        username: username,
      },
    },
    select: {
      ...selectObjOne,
      mstatus: true,
      ...selectObj,
    },
  })
  const matchesTwo = await prisma.matches.findMany({
    where: {
      usertwo: {
        username: username,
      },
    },
    select: {
      ...selectObjTwo,
      mstatus: true,
      ...selectObj,
    },
  })

  return res.send({ matches: mergeOneTwo(matchesOne, matchesTwo) })
})

matchRoutes.get('/api/getnewmatches', async (req, res) => {
  const username: string = req.body.username

  const matchesOne = await prisma.matches.findMany({
    where: {
      userone: {
        username: username,
      },
      mstatus: 'MATCHED',
    },
    select: {
      ...selectObjOne,
      ...selectObj,
    },
  })
  const matchesTwo = await prisma.matches.findMany({
    where: {
      usertwo: {
        username: username,
      },
      mstatus: 'MATCHED',
    },
    select: {
      ...selectObjTwo,
      ...selectObj,
    },
  })

  return res.send({ matches: mergeOneTwo(matchesOne, matchesTwo) })
})

matchRoutes.get('/api/fetchrequests', async (req, res) => {
  const username: string = req.body.username

  const matchesOne = await prisma.matches.findMany({
    where: {
      userone: {
        username: username,
      },
      mstatus: 'REQUESTED',
      statone: false,
    },
    select: {
      ...selectObjOne,
      ...selectObj,
    },
  })
  const matchesTwo = await prisma.matches.findMany({
    where: {
      usertwo: {
        username: username,
      },
      mstatus: 'REQUESTED',
      stattwo: false,
    },
    select: {
      ...selectObjTwo,
      ...selectObj,
    },
  })

  return res.send({ matches: mergeOneTwo(matchesOne, matchesTwo) })
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

  return res.send({ result: await prisma.$transaction(reqBatch) })
})

matchRoutes.post('/api/acceptrequests', async (req, res) => {
  const parseRes = acceptReqBodySchema.safeParse(req.body)
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

    if (match.accepted) {
      reqBatch.push(
        prisma.matches.update({
          where: whereObj,
          data: {
            mstatus: 'SUCCESS',
          },
        })
      )
    } else {
      reqBatch.push(
        prisma.matches.update({
          where: whereObj,
          data: {
            mstatus: 'REJECTED',
          },
        })
      )
    }
  })

  return res.send({ result: await prisma.$transaction(reqBatch) })
})

export { matchRoutes }
