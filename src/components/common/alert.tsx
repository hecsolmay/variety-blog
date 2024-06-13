import Button from '@/components/common/button'
import LoadingSpinner from '@/components/fallbacks/loading'
import { cn } from '@/utils/cn'

interface Props {
  className?: string
  title?: string
  description?: string
  onOk?: () => Promise<void> | void
  onCancel?: () => Promise<void> | void
  showCancel?: boolean
  cancelText?: string
  confirmText?: string
  isLoading?: boolean
  loadingText?: string
}

export default function AlertDialog ({
  cancelText = 'Cancelar',
  confirmText = 'Ok',
  className,
  description = 'descripción de la alerta',
  onOk,
  onCancel,
  showCancel = false,
  title = 'Titulo',
  isLoading = false,
  loadingText = 'Cargando...'
}: Props) {
  return (
    <div
      role='alertdialog'
      className={cn(
        'rounded-lg fixed left-[50%] top-[50%] z-50 grid w-[95%] sm:w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white px-6 py-4 shadow-lg duration-200 ',
        className
      )}
    >
      <div className='flex flex-col gap-y-5 text-center sm:gap-y-3 sm:text-left'>
        <h3 className='text-lg font-semibold'> {title} </h3>
        {description !== undefined && (
          <p className='text-sm text-gray-500'>
            {' '}
            {description}{' '}
          </p>
        )}
      </div>

      <div className='mt-4 flex justify-end space-x-2'>
        {showCancel && (
          <Button disabled={isLoading} onClick={onCancel} variant='secondary'>
            {cancelText}{' '}
          </Button>
        )}
        <Button
          className={cn('gap-2', isLoading && 'gap-0')}
          disabled={isLoading}
          onClick={onOk}
        >
          {isLoading && (<><LoadingSpinner /> {loadingText}</>)}
          {!isLoading && confirmText}
        </Button>
      </div>
    </div>
  )
}
