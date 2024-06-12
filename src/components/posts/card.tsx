import { LinkButton } from '@/components/common/button'
import { formatPostDate } from '@/utils/format'
import { Clock3, Tags } from 'lucide-react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
}

interface Author {
  id: string
  username: string
  email: string
  profileImage: string
}

interface Post {
  id: string
  title: string
  description: string
  image: string
  date: Date
  categories: Category[]
  author: Author
}

interface PostCardProps {
  post: Post
}

const MAX_CATEGORIES_TO_DISPLAY = 2

export default function PostCard ({ post }: PostCardProps) {
  const { id, title, description, image, date, categories, author } = post

  return (
    <div className='group overflow-hidden rounded-lg shadow-lg'>
      <Link href={`/${author.id}/${id}`}>
        <img
          className='h-48 w-full rounded-t-lg object-cover transition-transform duration-100 group-hover:scale-105'
          src={image}
          alt={title}
        />
      </Link>
      <div className='flex flex-col gap-4 px-6 py-4'>
        <div>
          <Link href={`/${author.id}/${id}`}>
            <h3 className='text-xl  font-bold uppercase text-black'>{title}</h3>
          </Link>

          <div className='mt-1 inline-flex items-center gap-1 text-gray-600'>
            <span>Por</span>
            <Link className='font-bold' href={`/authors/${author.id}`}>{author.username}</Link>
          </div>
        </div>

        <div>
          <p className='mb-3 line-clamp-3 min-h-16 text-pretty text-sm text-primary'>
            {description}
          </p>

          <LinkButton href={`/${author.id}/${id}`}>Leer más</LinkButton>
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
            <span>{formatPostDate(date)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CategoriesLinks ({ categories }: { categories: Category[] }) {
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
