'use client'

import Button from '@/components/common/button'
import {
  MultiImageDropzoneUsage,
  SingleImageDropzoneUsage
} from '@/components/common/dropzone'
import { FormItem } from '@/components/common/form'
import Input from '@/components/common/input'
import TextArea from '@/components/common/textarea'
import useFileUpload from '@/hooks/file-upload'
import { CreatePostInput, createPostSchema } from '@/schemas/posts/create'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { FileState } from '../common/dropzone/multi'
import { createPost } from '@/actions/posts'

export function CreatePostForm () {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = useForm<CreatePostInput>({
    defaultValues: {
      title: '',
      content: ''
    },
    resolver: zodResolver(createPostSchema)
  })

  const [coverImage, setCoverImage] = useState<string | undefined>(undefined)
  const [images, setImages] = useState<string[]>([])

  const { uploadFile, isUploading, file, progress, setFile } = useFileUpload()
  const [isMultiUploading, setIsMultiUploading] = useState(false)
  const [fileStates, setFileStates] = useState<FileState[]>([])

  const onSubmit = async (data: CreatePostInput) => {
    if (isMultiUploading || isUploading) return

    if (coverImage === undefined) {
      toast.error('Debe subir una imagen de portada')
      return
    }

    try {
      await createPost({ ...data, coverImage, images, categories: [] })
      toast.success('Post creado con éxito')
      resetForm()
    } catch (error) {
      toast.error('Ocurrió un error al crear el post')
    }

    console.log({ coverImage, images, ...data })
  }

  const handleSingleFileChange = async (file?: File) => {
    try {
      const res = await uploadFile(file, { temporary: true })

      if (res === undefined) return

      setCoverImage(res.url)
    } catch (error) {
      console.error(error)
      toast.error('Ocurrió un error al subir el archivo')
    }
  }

  const handleSaveMultipleImages = (urls?: string[]) => {
    if (urls === undefined) return

    const total = images.length + urls.length
    if (total > 4) return

    setImages([...images, ...urls])
  }

  const resetForm = () => {
    setCoverImage(undefined)
    setImages([])
    setFileStates([])
    setIsMultiUploading(false)
    setFile(undefined)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
      <FormItem label='Imagen de portada' labelClassName='text-xl'>
        <div className='grid place-items-center'>
          <SingleImageDropzoneUsage
            disabled={isUploading}
            value={file}
            onChange={handleSingleFileChange}
            width={'100%'}
          />
          {isUploading && (
            <div className='mt-2 h-2 w-full overflow-hidden rounded-md border border-gray-400 md:w-1/2'>
              <div
                className='h-full bg-primary transition-all duration-150'
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </FormItem>

      <FormItem label='Titulo' labelClassName='text-xl'>
        <Input
          disabled={isSubmitting}
          type='text'
          register={register('title')}
          error={errors.title?.message}
        />
      </FormItem>

      <FormItem className='mt-2' label='Contenido' labelClassName='text-xl'>
        <TextArea
          disabled={isSubmitting}
          className='min-h-56'
          register={register('content')}
          error={errors.content?.message}
        />
      </FormItem>

      <FormItem
        label='Imágenes de contenido (opcional)'
        labelClassName='text-xl'
      >
        <div className='grid min-h-52 place-items-center'>
          <MultiImageDropzoneUsage
            fileStates={fileStates}
            setFileStates={setFileStates}
            setIsLoading={value => {
              setIsMultiUploading(value)
            }}
            saveImages={handleSaveMultipleImages}
            className={'size-full'}
          />
        </div>
      </FormItem>

      <div className='mt-6 flex flex-wrap justify-end gap-2'>
        <Button
          variant='secondary'
          type='button'
          onClick={resetForm}
          className='w-full px-24 md:w-fit'
        >
          Reiniciar
        </Button>
        <Button
          loading={isSubmitting || isMultiUploading || isUploading}
          type='submit'
          className='w-full px-24 md:w-fit'
        >
          Crear
        </Button>
      </div>
    </form>
  )
}
