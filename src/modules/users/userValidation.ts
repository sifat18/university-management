import { z } from 'zod'

// zod validation setup
export const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({ required_error: 'role is required' }),
  }),
  password: z.string().optional(),
})
