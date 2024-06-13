import { MainContainer } from '@/components/common/containers'
import { H1 } from '@/components/common/headings'
import { ListOfPostsFallback } from '@/components/fallbacks/post'
import { ListOfPosts } from '@/components/posts/lists'
import { getAuthor } from '@/service/users'
import { ServerPageProps } from '@/types/props'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function AuthorPage ({
  params,
  searchParams
}: ServerPageProps) {
  const author = await getAuthor(params.userId)

  if (author === null) {
    redirect('/not-found')
  }

  return (
    <MainContainer>
      <H1>Posts de {author.username}</H1>

      <Suspense fallback={<ListOfPostsFallback />}>
        <ListOfPosts
          searchParams={{ ...searchParams, userId: params.userId }}
        />
      </Suspense>
    </MainContainer>
  )
}
