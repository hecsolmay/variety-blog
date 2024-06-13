import * as services from '@/service/posts'
import { GetPostParams } from '@/types/posts'
import { SearchParams } from '@/types/props'
import { formatTitleSlug } from '@/utils/format'
import { getPaginationInfo } from '@/utils/pagination'

export async function getPosts (searchParams: SearchParams) {
  try {
    const result = await services.getPosts(searchParams)

    const dataPagination = {
      page: result.pagination.page,
      limit: result.pagination.limit,
      total: result.totalItems
    }

    const info = getPaginationInfo(dataPagination)

    return {
      posts: result.posts,
      pagination: info
    }
  } catch (error) {
    return {
      error: 'Error getting posts'
    }
  }
}

export async function getOnePost (params: GetPostParams) {
  try {
    const result = await services.getPost(params)

    return {
      post: result
    }
  } catch (error) {
    return {
      error: 'Error getting post'
    }
  }
}

export async function deletePostById (id: string) {
  try {
    const existedPost = await services.getPost({ id })

    if (existedPost === null)  {
      return {
        error: 'Post not found'
      }
    }

    const result = await services.deletePost(id)

    return {
      post: result
    }
  } catch (error) {
    console.log(error)
    return {
      error: 'Error deleting post'
    }
  }
}

interface CreatePostInput {
  title: string
  content: string
  coverImage: string
  images: string[],
  authorId: string
  categories: string[]
}

export async function createPost (data: CreatePostInput) {
  const slug = formatTitleSlug(data.title)

  try {
    const result = await services.createPost({
      ...data,
      slug
    })

    return {
      post: result
    }
  } catch (error) {
    return {
      error: 'Error creating post'
    }
  }
}

export async function updatePost (id: string, data: CreatePostInput) {
  const slug = formatTitleSlug(data.title)

  try {
    const result = await services.updatePost(id, {
      ...data,
      slug
    })

    return {
      post: result
    }
  } catch (error) {
    return {
      error: 'Error updating post'
    }
  }
}
