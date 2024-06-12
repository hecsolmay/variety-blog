import { SearchParams } from '@/types/props'
import { Prisma } from '@prisma/client'

export function getWhereOptionsPosts (searchParams: SearchParams) {
  const whereOptions: Prisma.PostWhereInput = {}

  if (searchParams.categoryId) {
    whereOptions.categories = {
      some: {
        id: searchParams.categoryId
      }
    }
  }

  return whereOptions
}
