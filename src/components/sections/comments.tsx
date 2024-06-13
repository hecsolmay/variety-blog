import { CommentsList } from '@/components/comments/lists'

interface CommentsSectionProps {
  postId: string
  commentsCount?: number
}

export default function CommentsSection ({ postId, commentsCount }: CommentsSectionProps) {
  return (
    <section className='py-6'>
      <h1 className='text-xl font-bold text-primary'>Comentarios {`(${commentsCount})`}</h1>

      <CommentsList postId={postId} />
    </section>
  )
}
