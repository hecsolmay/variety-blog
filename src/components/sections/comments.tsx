import CommentForm from '@/components/comments/form'
import { CommentsList } from '@/components/comments/lists'
import { RedirectToLogin } from '@/components/common/redirect'
import { FallbackLoadingComments } from '@/components/fallbacks/comments'
import { Suspense } from 'react'

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
      <Suspense fallback={<FallbackLoadingComments />}>
        <CommentsList postId={postId} />
      </Suspense>
    </section>
  )
}
