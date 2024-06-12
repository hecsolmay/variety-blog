import { MESSAGES, DEFAULT_STRING_MESSAGE } from '@/constants/messages'
import { z } from 'zod'

export const registerSchema = z
  .object({
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
      .max(254, { message: MESSAGES.MAX_EMAIL_LENGTH }),
    password: z
      .string(DEFAULT_STRING_MESSAGE)
      .trim()
      .min(8, { message: MESSAGES.PASSWORD_LENGTH }),
    confirmPassword: z
      .string(DEFAULT_STRING_MESSAGE)
      .trim()
      .min(8, { message: MESSAGES.PASSWORD_LENGTH })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: MESSAGES.PASSWORD_CONFIRMATION,
    path: ['confirmPassword']
  })

export type RegisterInput = z.infer<typeof registerSchema>
