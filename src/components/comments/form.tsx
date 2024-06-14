'use client'

import Button from '@/components/common/button'
import TextArea from '@/components/common/textarea'
import { CommentInput, commentSchema } from '@/schemas/comments'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function CommentForm () {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<CommentInput>({
    defaultValues: {
      content: ''
    },
    resolver: zodResolver(commentSchema)
  })

  const onSubmit = async (data: CommentInput) => {
    // TODO: send comment
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mt-6 flex flex-col gap-4 md:flex-row'
      >
        <div className='flex-1'>
          <TextArea
            disabled={isSubmitting}
            register={register('content')}
            placeholder='Escribe tu comentario aquí...'
            hasError={errors.content?.message !== undefined}
          />
        </div>
        <Button disabled={isSubmitting} type='submit' className='mt-4 self-end'>
          Enviar
        </Button>
      </form>
      {errors.content?.message && (
        <p className='text-sm text-red-500'>{errors.content.message}</p>
      )}
    </>
  )
}
