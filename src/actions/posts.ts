'use server'

import { deletePostById , createPost as createPostController, updatePost as updatePostController } from '@/controllers/posts'
import { getSession } from '@/utils/auth'
import { revalidateTag } from 'next/cache'

export async function deletePost (id: string) {
  const result = await deletePostById(id)

  if (result.error) {
    throw new Error(result.error)
  }

  revalidateTag('posts')
  return result
}

interface CreatePostInput {
  title: string
  content: string
  coverImage: string
  images: string[],
  categories: string[]
}

export async function createPost (data: CreatePostInput) {
  const session = await getSession()

  if (session === null) {
    throw new Error('No session found')
  }

  const result = await createPostController({ ...data, authorId: session.id })

  if (result.error) {
    throw new Error(result.error)
  }

  revalidateTag('posts')
  return result
}

export async function updatePost (id: string, data: CreatePostInput) {
  const session = await getSession()

  if (session === null) {
    throw new Error('No session found')
  }

  const result = await updatePostController(id, { ...data, authorId: session.id })

  if (result.error) {
    console.error(result.error)
    throw new Error(result.error)
  }

  revalidateTag('posts')
  return result
}
