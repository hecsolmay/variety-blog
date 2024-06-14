import { SingleComment } from '@/types/comments'
import { formatCommentDate } from '@/utils/format'
import { getTimeAgo } from '@/utils/time'

interface CommentCardProps {
  comment: SingleComment
}

export function CommentCard ({ comment }: CommentCardProps) {
  return (
    <>
      <div className='flex items-center gap-4'>
        <img
          src={comment.user.profileImage ?? '/assets/images/user-avatar.webp'}
          className='size-10 rounded-full'
          alt={`Imagen de perfil del usuario ${comment.user.email}`}
        />

        <div className='text-sm'>
          <p className='text-base font-medium text-primary'>
            {comment.user.username}
          </p>
          <p
            className='mt-1 font-normal text-gray-700'
            title={formatCommentDate(comment.createdAt)}
          >
            {getTimeAgo(comment.createdAt)}
          </p>
        </div>
      </div>

      <p className='mt-4 w-full whitespace-pre-line text-balance text-primary opacity-90'>
        {comment.content}
      </p>
    </>
  )
}
