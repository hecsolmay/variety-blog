import { MainContainer } from '@/components/common/containers'
import { H1 } from '@/components/common/headings'
import { ListOfPostsFallback } from '@/components/fallbacks/post'
import { ListOfPosts } from '@/components/posts/lists'
import { categories } from '@/constants/categories'
import { ServerPageProps } from '@/types/props'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function CategoryPage ({
  params,
  searchParams
}: ServerPageProps) {
  const { id } = params

  const categoryFound = categories.find(category => category.id === id)

  if (!categoryFound) {
    redirect('/404')
  }

  return (
    <MainContainer>
      <H1>{categoryFound.name}</H1>

      <Suspense fallback={<ListOfPostsFallback />}>
        <ListOfPosts searchParams={{ ...searchParams, categoryId: id }} />
      </Suspense>
    </MainContainer>
  )
}

export const generateStaticParams = async () => {
  return categories.map(category => ({ id: category.id }))
}

export async function generateMetadata ({ params }: ServerPageProps) {
  const category = categories.find(category => category.id === params.id)

  if (!category) {
    redirect('/404')
  }

  return {
    title: category.name,
    description: `Encuentra los post relacionados a la categoría ${category.name}`
  }
}
