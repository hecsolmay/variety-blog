'use server'

import { deletePostById } from '@/controllers/posts'
import { revalidateTag } from 'next/cache'

export async function deletePost (id: string) {
  const result = await deletePostById(id)

  if (result.error) {
    throw new Error(result.error)
  }

  revalidateTag('posts')
  return result
}
