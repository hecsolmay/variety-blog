import { DEFAULT_STRING_MESSAGE, MESSAGES } from '@/constants/messages'
import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string(DEFAULT_STRING_MESSAGE).trim().toUpperCase().min(1, MESSAGES.NO_EMPTY_FIELDS),
  content: z.string(DEFAULT_STRING_MESSAGE).trim().min(1, MESSAGES.NO_EMPTY_FIELDS)
})

export type CreatePostInput = z.infer<typeof createPostSchema>
