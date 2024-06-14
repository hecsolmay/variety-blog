import * as services from '@/service/comments'
import { SearchParams, ServerPageProps } from '@/types/props'
import { getPaginationInfo } from '@/utils/pagination'

export async function getComments (searchParams: SearchParams) {
  try {
    const result = await services.getComments(searchParams)

    const dataPagination = {
      page: result.pagination.page,
      limit: result.pagination.limit,
      total: result.totalItem
    }

    const info = getPaginationInfo(dataPagination)

    return {
      comments: result.comments,
      pagination: info
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Error getting comments'
    }
  }
}

interface CreateCommentInput {
  content: string
  postId: string
  userId: string
}

export async function createComment (data: CreateCommentInput) {
  try {
    const result = await services.createComment(data)

    return {
      comment: result
    }
  } catch (error) {
    console.error(error)
    return {
      error: 'Error creating comment'
    }
  }
}
