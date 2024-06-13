import { MainContainer } from '@/components/common/containers'
import { H1 } from '@/components/common/headings'
import { ListOfUserPosts } from '@/components/posts/lists'
import { ServerPageProps } from '@/types/props'
import { getSession } from '@/utils/auth'
import { redirect } from 'next/navigation'

export default async function PostsPage ({ searchParams }: ServerPageProps) {
  const session = await getSession()

  if (session === null) {
    redirect('/login?next=/posts')
  }

  return (
    <MainContainer>
      <H1>Publicaciones de {session.username}</H1>

      <ListOfUserPosts searchParams={{ ...searchParams, userId: session.id }} />
    </MainContainer>
  )
}
