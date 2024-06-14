import { getComments } from '@/service/comments'

export type CommentsResponse = Awaited<ReturnType<typeof getComments>>

export type SingleComment = CommentsResponse['comments'][0]
