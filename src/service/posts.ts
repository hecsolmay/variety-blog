import { SearchParams } from '@/types/props'
import { getWhereOptionsPosts } from '@/utils/filters/posts'
import { formatPagination } from '@/utils/format'
import prisma from '@/utils/prisma'

export async function getPosts (searchParams: SearchParams) {
  const rawPagination = {
    page: searchParams.page ?? 1,
    limit: searchParams.limit ?? 12
  }
  const pagination = formatPagination(rawPagination)
  const where = getWhereOptionsPosts(searchParams)
  const postPromise = prisma.post.findMany({
    skip: pagination.skip,
    where,
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

  const countPromise = prisma.post.count({
    where
  })

  const [posts, count] = await prisma.$transaction([postPromise, countPromise])

  return {
    posts,
    totalItems: count,
    pagination
  }
}
