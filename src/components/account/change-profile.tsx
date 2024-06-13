'use client'

import { updateImageProfile } from '@/actions/account'
import Button from '@/components/common/button'
import LoadingSpinner from '@/components/fallbacks/loading'
import { IMAGE_MAX_SIZE } from '@/constants'
import { cn } from '@/utils/cn'
import { useEdgeStore } from '@/utils/edgestore/client'
import { useRef, useState } from 'react'

interface ChangeProfileImageProps {
  id: string
  username: string
  profileImage: string
}

const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export default function ChangeProfileImage ({
  id,
  username,
  profileImage
}: ChangeProfileImageProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState(profileImage)
  const { edgestore } = useEdgeStore()

  const handleClick = () => {
    if (inputRef.current === null) {
      return
    }

    if (isLoading) {
      return
    }

    inputRef.current.click()
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file === undefined || isLoading) {
      return
    }

    if (!VALID_IMAGE_TYPES.includes(file.type)) {
      setError('Foto de perfil no válida')
      return
    }

    if (file.size > IMAGE_MAX_SIZE) {
      setError('Foto de perfil demasiado grande (máximo 3MB)')
    }

    uploadImage(file)
  }

  const uploadImage = async (file: File) => {
    setIsLoading(true)
    try {
      // TODO: upload image
      const res = await edgestore.publicFiles.upload({ file })
      updateImageProfile(id, res.url)
      setProfileImageUrl(res.url)
    } catch (error) {
      setError('Error al subir la imagen')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex w-full flex-col items-center justify-center gap-4 md:w-1/3'>
      <input
        type='file'
        hidden
        ref={inputRef}
        accept='image/*'
        onChange={handleChange}
        max={1}
      />
      <h2 className='self-start text-xl text-gray-500'>Foto de perfil</h2>

      <div
        className={cn(
          'relative size-32 overflow-hidden rounded-full',
          isLoading && 'bg-black/40'
        )}
      >
        <img
          className='size-32 rounded-full '
          src={profileImageUrl}
          alt={`Foto de perfil de ${username}`}
        />

        {isLoading && (
          <LoadingSpinner className='absolute left-14 top-12 size-6' />
        )}
      </div>

      {error && <p className='text-red-500'>{error}</p>}
      <Button loading={isLoading} onClick={handleClick}>
        Cambiar Foto de perfil
      </Button>
    </div>
  )
}
