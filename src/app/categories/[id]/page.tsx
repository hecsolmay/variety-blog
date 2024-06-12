import { ListOfPostsFallback } from '@/components/fallbacks/post'
import { ListOfPosts } from '@/components/posts/lists'
import {  categories  } from '@/constants/categories'
import { getPosts } from '@/controllers/posts'
import { ServerPageProps } from '@/types/props'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export const getStaticPaths = async () => {
  const paths = categories.map(category => ({
    params: {
      id: category.id
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const generateMetadata = async ({ params }: ServerPageProps) => {
  const category = categories.find(category => category.id === params.id)

  if (!category) {
    redirect('/404')
  }

  return {
    title: category.name,
    description: `Encuentra los post relacionados a la categoría ${category.name}`
  }
}

export default async function CategoryPage ({ params, searchParams }: ServerPageProps) {
  const { id } = params

  const categoryFound = categories.find(category => category.id === id)

  if (!categoryFound) {
    redirect('/404')
  }

  const response = await getPosts({ ...searchParams, categoryId: id })
  console.log(response)

  return (
    <main className='mx-auto min-h-[80dvh] max-w-7xl px-4 py-6 md:px-8'>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>{categoryFound.name}</h1>

      <Suspense fallback={<ListOfPostsFallback />}>
        <ListOfPosts searchParams={{ ...searchParams, categoryId: id }} />
      </Suspense>
    </main>
  )
}
