import { LinkButton } from '@/components/common/button'
import Pagination from '@/components/common/pagination'
import { ListOfPostsAccount, ListOfPostsEmpty } from '@/components/empty/posts'
import { getPosts } from '@/controllers/posts'
import { SearchParams } from '@/types/props'
import PostCard, { AccountPostCard } from './card'
import { PlusIcon } from 'lucide-react'

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

  if (posts.length === 0) {
    return <ListOfPostsEmpty />
  }

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

      {!isHome && <Pagination info={pagination} />}
    </>
  )
}

export async function ListOfUserPosts ({
  searchParams
}: Pick<ListOfPostsProps, 'searchParams'>) {
  const response = await getPosts(searchParams)

  if (response?.error !== undefined) {
    // TODO: show error
    return null
  }

  const { pagination, posts } = response

  if (posts.length === 0) {
    return <ListOfPostsAccount />
  }

  return (
    <>
      <div className='flex justify-end'>
        <LinkButton href='/account/posts/create'>
        Crea un post
          <PlusIcon className='ml-1 size-4' />
        </LinkButton>
      </div>
      <div className='mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 2xl:grid-cols-4'>
        {posts.map(post => (
          <AccountPostCard key={post.id} post={post} />
        ))}
      </div>

      <Pagination info={pagination} />
    </>
  )
}
