import { LinkButton } from '@/components/common/button'
import { SinglePost } from '@/types/posts'
import { formatPostDate } from '@/utils/format'
import { Categories } from '@prisma/client'
import { Clock3, Tags } from 'lucide-react'
import Link from 'next/link'

interface PostCardProps {
  post: SinglePost
}

const MAX_CATEGORIES_TO_DISPLAY = 2

export default function PostCard ({ post }: PostCardProps) {
  const { title, content, createdAt, author, categories, coverImage, slug } = post

  return (
    <div className='group overflow-hidden rounded-lg shadow-lg'>
      <Link href={`/authors/${author.id}/${slug}`}>
        <img
          className='h-32 w-full rounded-t-lg object-cover transition-transform duration-100 group-hover:scale-105'
          src={coverImage ?? 'https://syria.adra.cloud/wp-content/uploads/2021/10/empty.jpg'}
          alt={title}
        />
      </Link>
      <div className='flex flex-col gap-4 px-6 py-4'>
        <div>
          <Link href={`/authors/${author.id}/${slug}`}>
            <h3 className='text-xl  font-bold uppercase text-black'>{title}</h3>
          </Link>

          <div className='mt-1 inline-flex items-center gap-1 text-gray-600'>
            <span>Por</span>
            <Link className='font-bold' href={`/authors/${author.id}`}>
              {author.username}
            </Link>
          </div>
        </div>

        <div>
          <p className='mb-3 line-clamp-2 h-10 text-pretty text-sm text-primary'>
            {content}
          </p>

          <LinkButton href={`/authors/${author.id}/${slug}`}>Leer más</LinkButton>
        </div>

        <div className='space-y-2 text-sm text-gray-600'>
          <div className='flex items-center gap-2'>
            <Tags className='size-4 text-highlight' />
            <div>
              <div className='inline-flex flex-wrap items-center gap-1'>
                <CategoriesLinks categories={categories} />
              </div>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <Clock3 className='size-4 text-highlight' />
            <span>{formatPostDate(createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CategoriesLinks ({ categories }: { categories: Categories[] }) {
  if (categories.length === 0) {
    return <span>Sin categorías</span>
  }

  const categoriesToDisplay = categories.slice(0, MAX_CATEGORIES_TO_DISPLAY)

  return (
    <>
      {categoriesToDisplay.map((category, index) => (
        <Link key={category.id} href={`/categories/${category.id}`}>
          {`${category.name}` +
            (index < categoriesToDisplay.length - 1 ? ', ' : '')}
        </Link>
      ))}

      {categories.length > MAX_CATEGORIES_TO_DISPLAY && (
        <span>{`y +${categories.length - MAX_CATEGORIES_TO_DISPLAY} más`}</span>
      )}
    </>
  )
}
