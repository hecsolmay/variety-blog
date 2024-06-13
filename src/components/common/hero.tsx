import { LinkButton } from '@/components/common/button'

export default function HomeHero () {
  return (
    <section className='flex max-h-96 min-h-[60dvh] flex-col items-center justify-center py-12 text-center sm:block sm:py-8 md:min-h-[80dvh]'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img
          className='mx-auto h-28 w-auto'
          src='/assets/images/logo.png'
          alt='Logo de variety blog'
        />
        <h1 className='mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Explora nuestras publicaciones
        </h1>
        <p className='mt-2 text-xl text-gray-500 sm:mt-4 sm:max-w-lg sm:text-2xl'>
          Crea tu propio contenido{' '}
        </p>
        <div className='mt-6 flex max-w-lg flex-wrap-reverse items-center justify-center gap-3 sm:w-full sm:flex-nowrap'>
          <LinkButton href='/authors' variant='secondary'>Descubre a los autores</LinkButton>
          <LinkButton href='/account/post/create'>Crear Publicación</LinkButton>
        </div>
      </div>
    </section>
  )
}
