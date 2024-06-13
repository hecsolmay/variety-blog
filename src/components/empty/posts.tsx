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
