import { SearchParams } from '@/types/props'
import { getWhereOptionsComments } from '@/utils/filters/comments'
import { formatPagination } from '@/utils/format'
import prisma from '@/utils/prisma'

export async function getComments (searchParams: SearchParams) {
  const rawPagination = {
    page: searchParams.page ?? 1,
    limit: searchParams.limit ?? 12
  }
  const pagination = formatPagination(rawPagination)
  const where = getWhereOptionsComments(searchParams)

  const commentsPromise = prisma.comments.findMany({
    skip: pagination.skip,
    where,
    take: pagination.limit,
    include: {
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const countPromise = prisma.comments.count({
    where
  })

  const [comments, count] = await prisma.$transaction([commentsPromise, countPromise])

  return {
    comments,
    totalItem: count,
    pagination
  }
}

interface CreateCommentInput {
  content: string
  postId: string
  userId: string
}

export async function createComment (data: CreateCommentInput) {
  const createdComment = await prisma.comments.create({
    data
  })

  return createdComment
}
