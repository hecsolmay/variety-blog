import Badge from '@/components/common/badges'
import { MainContainer } from '@/components/common/containers'
import { H1 } from '@/components/common/headings'
import CommentsSection from '@/components/sections/comments'
import { getOnePost } from '@/controllers/posts'
import { ServerPageProps } from '@/types/props'
import { formatPostDate } from '@/utils/format'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function PostPage ({ params }: ServerPageProps) {
  const { userId, slug } = params

  const response = await getOnePost({ userId, slug })

  if (response?.error !== undefined) {
    // TODO: show error
    return null
  }

  const { post } = response

  if (post === null) {
    redirect('/not-found')
  }

  const { title, coverImage, author, categories, images } = post

  return (
    <MainContainer>
      <div className='flex h-full flex-1 flex-col justify-between gap-6'>
        <div className='flex-1'>
          <H1 className='text-pretty text-3xl sm:text-3xl'>{title}</H1>
        </div>

        <div className='flex items-center gap-4'>
          <Link href={`/authors/${author.id}`}>
            <img
              src={author.profileImage ?? '/assets/images/user-avatar.webp'}
              className='size-10 rounded-full'
              alt={`Imagen de perfil del usuario ${author.email}`}
            />
          </Link>

          <div className='text-sm'>
            <Link href={`/authors/${author.id}`}>
              <p className='text-base font-medium text-primary'>
                {author.username}
              </p>
            </Link>
            <p className='mt-1 font-normal text-gray-700'>
              {formatPostDate(post.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {coverImage !== null && (
        <div className='mt-6'>
          <img
            className='aspect-video h-auto w-full max-w-xl rounded-lg'
            src={coverImage}
            alt='Imagen de portada del post'
          />
        </div>
      )}

      <p className='mt-4 w-full whitespace-pre-line text-balance text-primary opacity-90'>
        {post.content}
      </p>

      {images.length > 0 && (
        <div className='mt-6 grid grid-cols-1 gap-4 pb-8 md:grid-cols-2'>
          {images.map((image, index) => (
            <img
              key={image.id}
              src={image.url}
              className='aspect-video h-auto w-full rounded-lg'
              alt={`Imagen ${index + 1} del post ${title}`}
            />
          ))}
        </div>
      )}

      {categories.length > 0 && (
        <ul className='mt-6 flex flex-wrap gap-4 pb-8'>
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <Badge variant='default'>{category.name}</Badge>
            </Link>
          ))}
        </ul>
      )}

      <CommentsSection postId={post.id} commentsCount={post.commentsCount} />
    </MainContainer>
  )
}
