import { z } from 'zod'
import { DEFAULT_STRING_MESSAGE, MESSAGES } from '@/constants/messages'

export const commentSchema = z.object({
  content: z
    .string(DEFAULT_STRING_MESSAGE)
    .trim()
    .min(10, MESSAGES.MIN_COMMENT_LENGTH)
    .max(250, MESSAGES.MAX_COMMENT_LENGTH)
})

export type CommentInput = z.infer<typeof commentSchema>
