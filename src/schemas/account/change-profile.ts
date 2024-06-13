import { DEFAULT_STRING_MESSAGE, MESSAGES } from '@/constants/messages'
import { z } from 'zod'

export const ChangeProfileSchema = z.object({
  username: z
    .string(DEFAULT_STRING_MESSAGE)
    .trim()
    .min(3, { message: MESSAGES.MIN_USERNAME_LENGTH })
    .max(20, { message: MESSAGES.MAX_USERNAME_LENGTH })
    .toLowerCase(),
  email: z
    .string(DEFAULT_STRING_MESSAGE)
    .trim()
    .email(MESSAGES.EMAIL_FORMAT)
    .max(254, { message: MESSAGES.MAX_EMAIL_LENGTH })
})

export type ChangeProfileInput = z.infer<typeof ChangeProfileSchema>
