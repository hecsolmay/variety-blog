import { ListOfPostsFallback } from '@/components/fallbacks/post'
import { ListOfPosts } from '@/components/posts/lists'
import { SearchParams } from '@/types/props'
import { Suspense } from 'react'

interface HomePostSectionProps {
  searchParams: SearchParams
}

export default function HomePostSection ({ searchParams }: HomePostSectionProps) {
  return (
    <section className='mt-12 max-w-7xl px-4 md:px-8'>
      <h2 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>
        Publicaciones recientes
      </h2>

      <Suspense fallback={<ListOfPostsFallback />}>
        <ListOfPosts isHome searchParams={searchParams} />
      </Suspense>
    </section>
  )
}
