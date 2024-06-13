import { MainContainer } from '@/components/common/containers'
import { H1 } from '@/components/common/headings'
import { UpdatePostForm } from '@/components/posts/forms'
import { getOnePost } from '@/controllers/posts'
import { ServerPageProps } from '@/types/props'
import { getSession } from '@/utils/auth'
import { redirect } from 'next/navigation'

export default async function EditPostPage ({ params }: ServerPageProps) {
  const session = await getSession()

  if (session === null) {
    redirect(`/login?next=/account/posts/edit/${params.id}`)
  }

  const response = await getOnePost({ id: params.id, userId: session.id })

  if (response.error !== undefined) {
    // TODO: handle error
    return null
  }

  if (response.post === null) {
    redirect('/not-found')
  }

  const { post } = response

  return (
    <MainContainer>
      <H1>Editando post</H1>

      <UpdatePostForm post={post} />
    </MainContainer>
  )
}
