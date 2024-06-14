import { getComments } from '@/controllers/comments'
import { CommentCard } from './card'
import LoadMore from './load-more'

interface CommentsListProps {
  postId: string
}

export async function CommentsList ({ postId }: CommentsListProps) {
  const result = await getComments({ postId, page: '1', limit: '10' })

  if (result.error !== undefined) {
    return null
  }

  const { comments, pagination } = result

  return (
    <ul className='mt-6 space-y-6 pb-8'>
      {comments.map(comment => (
        <li key={comment.id} className='flex flex-wrap gap-4'>
          <CommentCard comment={comment} />
        </li>
      ))}

      {pagination.hasNext && (
        <LoadMore postId={postId} pagination={pagination} />
      )}
    </ul>
  )
}
