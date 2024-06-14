import { SearchParams } from '@/types/props'
import { Prisma } from '@prisma/client'

export function getWhereOptionsComments (searchParams: SearchParams) {
  const whereOptions: Prisma.CommentsWhereInput = {}

  if (searchParams.postId) {
    whereOptions.postId = searchParams.postId
  }

  if (searchParams.userId) {
    whereOptions.userId = searchParams.userId
  }
  return whereOptions
}
