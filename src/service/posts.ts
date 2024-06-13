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
      categoriesPosts: {
        include: {
          categories: true
        }
      },
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

  const mappedPosts = posts.map(post => ({
    ...post,
    categories: post.categoriesPosts.map(c => c.categories)
  }))
  return {
    posts: mappedPosts,
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
      categoriesPosts: {
        include: {
          categories: true
        }
      },
      images: true
    }
  })

  if (post === null) return null

  const mappedPosts = {
    ...post,
    categories: post.categoriesPosts.map(c => c.categories)
  }

  return mappedPosts
}

export async function deletePost (id: string) {
  const deletedPost = await prisma.posts.delete({
    where: {
      id
    }
  })

  return deletedPost
}

interface CreatePostInput {
  title: string
  content: string
  coverImage: string
  images: string[]
  slug: string
  authorId: string
  categories: string[]
}

export async function createPost (rawData: CreatePostInput) {
  const { images, categories, ...data } = rawData

  const createdPost = await prisma.posts.create({
    data: {
      ...data,
      images: {
        create: images.map(image => ({
          url: image
        }))
      }
    }
  })

  await prisma.categoriesPosts.createMany({
    data: categories.map(category => ({
      categoryId: category,
      postId: createdPost.id
    }))
  })

  return createdPost
}

export async function updatePost (id: string, rawData: CreatePostInput) {
  const { images, categories, ...data } = rawData

  const deletedCategories = prisma.categoriesPosts.deleteMany({
    where: {
      postId: id
    }
  })

  const deletedImages = prisma.images.deleteMany({
    where: {
      postId: id
    }
  })

  try {
    await prisma.$transaction([deletedCategories, deletedImages])
  } catch (error) {
    console.error(error)
    throw new Error('Error updating post')
  }

  const updatedPost = await prisma.posts.update({
    where: {
      id
    },
    data: {
      ...data,
      images: {
        create: images.map(image => ({
          url: image
        }))
      }
    }
  })

  await prisma.categoriesPosts.createMany({
    data: categories.map(category => ({
      categoryId: category,
      postId: updatedPost.id
    }))
  })

  return updatedPost
}
