import AuthorCard from '@/components/authors/cards'
import { MainContainer } from '@/components/common/containers'
import { H1 } from '@/components/common/headings'
import Pagination from '@/components/common/pagination'
import { getAuthors } from '@/controllers/authors'
import { ServerPageProps } from '@/types/props'
import Link from 'next/link'

export default async function AuthorsPage ({ searchParams }: ServerPageProps) {
  const response = await getAuthors(searchParams)

  if (response.error !== undefined) {
    // TODO: SHOW ERROR
    return null
  }

  const { authors, pagination } = response
  return (
    <MainContainer>
      <H1>Explora nuestros autores de posts</H1>

      <ul className='mt-6 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4'>
        {authors.map(author => (
          <Link key={author.id} href={`/authors/${author.id}`}>
            <AuthorCard author={author} />
          </Link>
        ))}
      </ul>

      <Pagination info={pagination} />
    </MainContainer>
  )
}
