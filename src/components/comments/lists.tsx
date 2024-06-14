import { getComments } from '@/controllers/comments'
import { formatCommentDate } from '@/utils/format'
import { getTimeAgo } from '@/utils/time'
import { CommentCard } from './card'

interface CommentsListProps {
  postId: string
}

const EXAMPLE_COMMENTS = [
  {
    id: '1',
    author: {
      id: '1',
      username: 'User 1',
      email: 'user1@example.com',
      profileImage: '/assets/images/user-avatar.webp'
    },
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    createdAt: new Date('2022-01-01T00:00:00.000Z')
  },
  {
    id: '2',
    author: {
      id: '2',
      username: 'User 2',
      email: 'user2@example.com',
      profileImage: '/assets/images/user-avatar.webp'
    },
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    createdAt: new Date('2022-01-01T00:00:00.000Z')
  },
  {
    id: '3',
    author: {
      id: '3',
      username: 'User 3',
      email: 'user3@example.com',
      profileImage: '/assets/images/user-avatar.webp'
    },
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    createdAt: new Date('2022-01-01T00:00:00.000Z')
  }
]

export async function CommentsList ({ postId }: CommentsListProps) {
  const result = await getComments({ postId, page: '1', limit: '10' })

  if (result.error !== undefined) {
    return null
  }

  const { comments, pagination } = result

  return (
    <ul className='mt-6 flex flex-wrap gap-4 pb-8'>
      {comments.map(comment => (
        <li key={comment.id}>
          <CommentCard comment={comment} />
        </li>
      ))}
    </ul>
  )
}
