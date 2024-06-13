import { LinkButton } from '@/components/common/button'
import { PlusIcon } from 'lucide-react'

export function ListOfPostsEmpty () {
  return (
    <div className='grid min-h-[50dvh] place-content-center gap-2'>
      <img
        className='h-40 w-full object-contain'
        src='/assets/images/empty-posts.webp'
        alt='No hay posts para mostrar'
      />
      <h1 className='text-pretty text-center text-3xl font-bold text-gray-700'>
        No hay posts para mostrar
      </h1>
    </div>
  )
}

export function ListOfPostsAccount () {
  return (
    <div className='mt-4 grid min-h-[50dvh] place-content-center gap-2'>
      <img
        className='h-40 w-full object-contain'
        src='/assets/images/empty-posts.webp'
        alt='No hay posts para mostrar'
      />
      <h1 className='text-pretty text-center text-3xl font-bold text-gray-700'>
        Aun no has creado ningún post
      </h1>

      <div className='mt-4 flex justify-center'>
        <LinkButton href='/account/posts/create'>
        Crea un post
          <PlusIcon className='ml-1 size-4' />
        </LinkButton>
      </div>
    </div>
  )
}
