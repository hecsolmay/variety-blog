import LoadingSpinner from './loading'

export function ListOfPostsFallback () {
  return (
    <div className='flex h-64 flex-col items-center justify-center'>
      <LoadingSpinner className='size-12' />
    </div>

  )
}
