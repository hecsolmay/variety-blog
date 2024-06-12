import { LinkButton } from '@/components/common/button'
import Pagination from '@/components/common/pagination'
import { getPosts } from '@/controllers/posts'
import { SearchParams } from '@/types/props'
import PostCard from './card'

interface ListOfPostsProps {
  searchParams: SearchParams
  isHome?: boolean
}

export async function ListOfPosts ({
  searchParams,
  isHome = false
}: ListOfPostsProps) {
  const response = await getPosts(searchParams)

  if (response?.error !== undefined) {
    // TODO: show error
    return null
  }

  const { pagination, posts } = response

  const { hasNext } = pagination

  return (
    <>
      <div className='mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 2xl:grid-cols-4'>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {hasNext && isHome && (
        <div className='mt-4 flex w-full justify-center'>
          <LinkButton href='/posts' className='mt-4'>
            Ver más
          </LinkButton>
        </div>
      )}

      {!isHome && (
        <Pagination
          info={{
            currentPage: 3,
            total: 100,
            pages: 10,
            hasNext: true,
            hasPrev: true
          }}
        />
      )}
    </>
  )
}
