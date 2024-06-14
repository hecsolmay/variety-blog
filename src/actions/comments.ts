'use server'

import { createComment as createCommentController } from '@/controllers/comments'
import { getSession } from '@/utils/auth'
import { revalidateTag } from 'next/cache'

interface CreateCommentInput {
  content: string
  postId: string
}

export async function createComment (data: CreateCommentInput) {
  const session = await getSession()

  if (session === null) {
    throw new Error('Not logged in')
  }

  const createdComment = await createCommentController({ ...data, userId: session.id })

  if (createdComment.error !== undefined) {
    throw new Error(createdComment.error)
  }

  revalidateTag('comments')
  return createdComment.comment
}
