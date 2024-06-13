import { MainContainer } from '@/components/common/containers'
import { H1 } from '@/components/common/headings'
import { CreatePostForm } from '@/components/posts/forms'
import { getSession } from '@/utils/auth'
import { redirect } from 'next/navigation'

export default function CreatePostPage () {
  const session = getSession()

  if (session === null) {
    redirect('/login?redirect=/account/posts/create')
  }

  return (
    <MainContainer>
      <H1>Creando un posts</H1>

      <CreatePostForm />
    </MainContainer>
  )
}
