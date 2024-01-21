import { MatchStatus } from '@prisma/client'

export const mergeOneTwo = (matchesOne: any, matchesTwo: any) => {
  const matches: {
    matchId: string
    mfactor: number
    mstatus: MatchStatus
    username: string
  }[] = []

  const _matches = [...matchesOne, ...matchesTwo]
    .sort((a, b) => {
      return b.mfactor - a.mfactor
    })
    .map((matchObj) => {
      const { matchId, mfactor, mstatus } = matchObj
      const basic = {
        matchId,
        mfactor,
        mstatus,
      }
      if ('usertwo' in matchObj) {
        const { usertwo } = matchObj
        const obj = {
          ...basic,
          username: usertwo.username,
          currUser: 1,
        }
        matches.push(obj)
      } else {
        const { userone } = matchObj
        const obj = {
          ...basic,
          username: userone.username,
          currUser: 2,
        }
        matches.push(obj)
      }
    })

  return matches
}
