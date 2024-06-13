import { SearchParams } from '@/types/props'
import { Prisma } from '@prisma/client'

export function getWhereOptionsPosts (searchParams: SearchParams) {
  const whereOptions: Prisma.PostsWhereInput = {}

  if (searchParams.categoryId) {
    whereOptions.categories = {
      some: {
        id: searchParams.categoryId
      }
    }
  }

  if (searchParams.userId) {
    whereOptions.author = {
      id: searchParams.userId
    }
  }

  return whereOptions
}
