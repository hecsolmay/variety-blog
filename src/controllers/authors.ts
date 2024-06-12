import * as services from '@/service/users'
import { SearchParams } from '@/types/props'
import { getPaginationInfo } from '@/utils/pagination'

export async function getAuthors (searchParams: SearchParams) {
  try {
    const result = await services.getAuthors(searchParams)

    const formattedPagination = {
      limit: result.pagination.limit,
      page: result.pagination.page,
      total: result.totalItems
    }
    const info = getPaginationInfo(formattedPagination)

    return {
      authors: result.authors,
      pagination: info
    }

  } catch (error) {
    return {
      error: 'Something went wrong'
    }
  }
}
