import { z } from 'zod'

export const loginFormDataSchema = z.object({
  username: z.string(),
  password: z.string(),
})
