import { SearchParams } from '@/types/props'
import { Prisma } from '@prisma/client'

export function getWhereOptionsPosts (searchParams: SearchParams) {
  const whereOptions: Prisma.PostsWhereInput = {}

  if (searchParams.categoryId) {
    whereOptions.categoriesPosts = {
      some: {
        categoryId: searchParams.categoryId
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
