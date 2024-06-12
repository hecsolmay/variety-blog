import { SearchParams } from '@/types/props'
import { formatPagination } from '@/utils/format'
import prisma from '@/utils/prisma'

export async function getPosts (searchParams: SearchParams) {
  const rawPagination = {
    page: searchParams.page ?? 1,
    limit: searchParams.limit ?? 12
  }
  const pagination = formatPagination(rawPagination)
  const postPromise = prisma.post.findMany({
    skip: pagination.skip,
    include: {
      author: true,
      categories: true,
      images: true
    },
    take: pagination.limit,
    orderBy: {
      createdAt: 'desc'
    }
  })

  const countPromise = prisma.post.count()

  const [posts, count] = await prisma.$transaction([postPromise, countPromise])

  return {
    posts,
    totalItems: count,
    pagination
  }
}
