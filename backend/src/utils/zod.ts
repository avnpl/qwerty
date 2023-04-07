import { z } from 'zod'

export const sendReqBodySchema = z.object({
  matches: z.array(
    z.object({
      matchId: z.string(),
      username: z.string(),
      currUser: z.number().gt(0).lt(3),
      sent: z.boolean(),
    })
  ),
})
