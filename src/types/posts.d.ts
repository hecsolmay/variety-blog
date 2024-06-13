import { getPosts } from '@/service/posts'

export type PostsResponse = Awaited<ReturnType<typeof getPosts>>
export type SinglePost = PostsResponse['posts'][0]

export interface GetPostParams {
  id?: string
  userId?: string
  slug?: string
}
