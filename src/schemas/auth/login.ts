import { MESSAGES, DEFAULT_STRING_MESSAGE } from '@/constants/messages'
import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string(DEFAULT_STRING_MESSAGE)
    .email(MESSAGES.EMAIL_FORMAT)
    .trim()
    .max(20, { message: MESSAGES.MAX_EMAIL_LENGTH }),
  password: z
    .string(DEFAULT_STRING_MESSAGE)
    .trim()
    .min(3, { message: MESSAGES.NO_EMPTY_FIELDS })
})

export type LoginInput = z.infer<typeof loginSchema>
