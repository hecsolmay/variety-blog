import * as services from '@/service/posts'
import { GetPostParams } from '@/types/posts'
import { SearchParams } from '@/types/props'
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
