import CommentForm from '@/components/comments/form'
import { CommentsList } from '@/components/comments/lists'
import { RedirectToLogin } from '@/components/common/redirect'

interface CommentsSectionProps {
  postId: string
  commentsCount?: number
  isUserLoggedIn?: boolean
}

export default function CommentsSection ({ postId, commentsCount, isUserLoggedIn }: CommentsSectionProps) {
  return (
    <section className='py-6'>
      <h1 className='text-xl font-bold text-primary'>Comentarios {`(${commentsCount})`}</h1>
      {isUserLoggedIn && <CommentForm postId={postId} />}
      {!isUserLoggedIn && <RedirectToLogin className='my-4'>Inicia sesión para comentar</RedirectToLogin>}
      <CommentsList postId={postId} />
    </section>
  )
}
