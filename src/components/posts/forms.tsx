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
import { createPost, updatePost } from '@/actions/posts'
import { MultiSelect, OptionType } from '../common/select'
import { categories } from '@/constants/categories'
import { SinglePost } from '@/types/posts'
import InputImageFile from '../common/dropzone/input'

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
  const [selectedCategories, setSelectedCategories] = useState<OptionType[]>([])

  const onSubmit = async (data: CreatePostInput) => {
    if (isMultiUploading || isUploading) return

    if (coverImage === undefined) {
      toast.error('Debe subir una imagen de portada')
      return
    }

    try {
      const formattedCategories = selectedCategories.map(c => c.value)
      await createPost({
        ...data,
        coverImage,
        images,
        categories: formattedCategories
      })
      toast.success('Post creado con éxito')
      resetForm()
    } catch (error) {
      toast.error('Ocurrió un error al crear el post')
    }
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
    setSelectedCategories([])
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

      <FormItem label='Categorías' labelClassName='text-xl'>
        <MultiSelect
          options={categories.map(c => ({ label: c.name, value: c.id }))}
          setSelected={setSelectedCategories}
          selectedOptions={selectedCategories}
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

interface UpdatePostFormProps {
  post: SinglePost
}

export function UpdatePostForm ({ post }: UpdatePostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<CreatePostInput>({
    defaultValues: {
      title: post.title,
      content: post.content
    },
    resolver: zodResolver(createPostSchema)
  })

  const [coverImage, setCoverImage] = useState<string | undefined>(
    post.coverImage ?? undefined
  )
  const [images, setImages] = useState<string[]>(post.images.map(i => i.url))

  const { uploadFile, isUploading, file, progress, setFile } = useFileUpload()
  const {
    isUploading: newIsUploading,
    progress: newProgress,
    uploadFile: newUploadFile
  } = useFileUpload()
  const [indexUploading, setIndexUploading] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState<OptionType[]>(
    post.categories.map(c => ({ label: c.name, value: c.id }))
  )

  const onSubmit = async (data: CreatePostInput) => {
    if (isUploading) return

    if (coverImage === undefined) {
      toast.error('Debe subir una imagen de portada')
      return
    }

    try {
      const formattedCategories = selectedCategories.map(c => c.value)

      await updatePost(post.id,{
        ...data,
        coverImage,
        images,
        categories: formattedCategories
      })
      toast.success('Post actualizado con éxito')
    } catch (error) {
      toast.error('Ocurrió un error al crear el post')
    }
  }

  const handleSingleFileChange = async (file?: File) => {
    try {
      const res = await uploadFile(file)

      if (res === undefined) return

      setCoverImage(res.url)
    } catch (error) {
      console.error(error)
      toast.error('Ocurrió un error al subir el archivo')
    }
  }

  const handleMultipleFileChange = async (file?: File) => {
    if (file === undefined) return

    try {
      const res = await uploadFile(file)
      if (res === undefined) return

      if (res.url === undefined) return

      setImages([...images, res.url])
      setFile(undefined)
    } catch (error) {
      toast.error('Error al subir la imagen')
    }
  }

  const handleReplaceImage =
    (prevUrl: string, index: number) => async (file?: File) => {
      if (file === undefined) return

      try {
        setIndexUploading(index)
        const res = await newUploadFile(file)
        if (res === undefined) return

        const sortedImages = images.toSpliced(index, 0, res.url)
        const filteredImages = sortedImages.filter(img => img !== prevUrl)
        setImages([...filteredImages])
      } catch (error) {
        toast.error('Error al subir la imagen')
      }
    }

  const hasMaxFiles = images.length >= 4

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
      <FormItem label='Imagen de portada' labelClassName='text-xl'>
        <div className='grid place-items-center'>
          <InputImageFile onChange={handleSingleFileChange} url={coverImage} />
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

      <FormItem label='Categorías' labelClassName='text-xl'>
        <MultiSelect
          options={categories.map(c => ({ label: c.name, value: c.id }))}
          setSelected={setSelectedCategories}
          selectedOptions={selectedCategories}
        />
      </FormItem>

      <FormItem
        label='Imágenes de contenido (opcional)'
        labelClassName='text-xl'
      >
        <div className='grid grid-cols-[repeat(auto-fit,minmax(188px,1fr))] gap-4'>
          {images.map((image, index) => (
            <div key={image} className='relative size-52'>
              <InputImageFile
                url={image}
                onChange={handleReplaceImage(image, index)}
                imageClassName={'object-cover size-52'}
                className='size-52'
              />
              {indexUploading === index && newIsUploading && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
                  {newProgress}%
                </div>
              )}
            </div>
          ))}
          {!hasMaxFiles && (
            <div className='relative size-52'>
              <SingleImageDropzoneUsage
                onChange={handleMultipleFileChange}
                value={file}
                disabled={isUploading}
                width={156}
                className={'h-full min-w-[200px]'}
              />
              {isUploading && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
                  {progress}%
                </div>
              )}
            </div>
          )}
        </div>
      </FormItem>

      <div className='mt-6 flex flex-wrap justify-end gap-2'>
        <Button
          loading={isSubmitting || isUploading}
          type='submit'
          variant='warning'
          className='w-full px-24 md:w-fit'
        >
          Actualizar
        </Button>
      </div>
    </form>
  )
}
