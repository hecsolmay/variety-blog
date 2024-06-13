import { Users } from '@prisma/client'
import PostsBadge from './posts-badge'

interface AuthorCardProps {
  author: Users
}

export default function AuthorCard ({ author }: AuthorCardProps) {
  return (
    <div className='group flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-xl'>
      <div className='grid place-content-center gap-2'>
        <img
          src={author.profileImage ?? '/assets/images/user-avatar.webp'}
          alt={`${author.username} profile image`}
          className='size-20 rounded-full transition-transform duration-300 group-hover:scale-105'
        />
      </div>
      <div className='text-xl font-bold'>
        {author.username}
        <PostsBadge postsCount={author.postsCount} />
      </div>
    </div>
  )
}
