import { SearchParams } from '@/types/props'
import { formatPagination } from '@/utils/format'
import prisma from '@/utils/prisma'
import { Users } from '@prisma/client'

export async function getUser (id: string) {
  const user = await prisma.users.findFirst({
    where: {
      id
    }
  })

  return user
}

export async function getAuthors (searchParams: SearchParams) {
  const rawPagination = {
    page: searchParams.page ?? 1,
    limit: searchParams.limit ?? 12
  }
  const pagination = formatPagination(rawPagination)

  const authorsPromise = prisma.users.findMany({
    where: { posts: { some: {} } },
    skip: pagination.skip,
    take: pagination.limit,
    orderBy: {
      createdAt: 'desc'
    }
  })

  const countPromise = prisma.users.count({
    where: { posts: {} }
  })

  const [authors, count] = await prisma.$transaction([
    authorsPromise,
    countPromise
  ])

  return {
    authors,
    totalItems: count,
    pagination
  }
}

export async function getAuthor (id: string) {
  const author = await prisma.users.findFirst({
    where: {
      id
    }
  })

  return author
}

export async function updateUser (data: Partial<Users>) {
  const user = await prisma.users.update({
    where: {
      id: data.id
    },
    data
  })

  return user
}
