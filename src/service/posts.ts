import { GetPostParams } from '@/types/posts'
import { SearchParams } from '@/types/props'
import { getWhereOptionsPosts } from '@/utils/filters/posts'
import { formatPagination } from '@/utils/format'
import prisma from '@/utils/prisma'
import { Prisma } from '@prisma/client'

export async function getPosts (searchParams: SearchParams) {
  const rawPagination = {
    page: searchParams.page ?? 1,
    limit: searchParams.limit ?? 12
  }
  const pagination = formatPagination(rawPagination)
  const where = getWhereOptionsPosts(searchParams)
  const postPromise = prisma.posts.findMany({
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

  const countPromise = prisma.posts.count({
    where
  })

  const [posts, count] = await prisma.$transaction([postPromise, countPromise])

  return {
    posts,
    totalItems: count,
    pagination
  }
}

export async function getPost (params: GetPostParams) {
  const where: Prisma.PostsWhereInput = {
    id: params.id,
    author: {
      id: params.userId
    },
    slug: params.slug
  }

  const post = await prisma.posts.findFirst({
    where,
    include: {
      author: true,
      categories: true,
      images: true
    }
  })

  return post
}

export async function deletePost (id: string) {
  const deletedPost =await prisma.posts.delete({
    where: {
      id
    }
  })

  return deletedPost
}
