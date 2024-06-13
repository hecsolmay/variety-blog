'use client'

import { deletePost } from '@/actions/posts'
import AlertDialog from '@/components/common/alert'
import Button from '@/components/common/button'
import { ModalBackground } from '@/components/common/modal'
import { useState } from 'react'
import { toast } from 'sonner'

interface DeletePostButtonProps {
  postId: string
}

export function DeletePostButton ({ postId }: DeletePostButtonProps) {
  const [showAlert, setShowAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const closeAlert = () => {
    setShowAlert(false)
  }

  const handleClick = async () => {
    setShowAlert(true)
  }

  const deletePostHandler = async () => {
    setIsLoading(true)
    try {
      await deletePost(postId)
      setShowAlert(false)
      toast.success('Post eliminado')
    } catch (error) {
      toast.error('Error al eliminar el post')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button onClick={handleClick} variant='secondary'>
        Eliminar
      </Button>
      {showAlert && (
        <>
          <ModalBackground
            disabled={isLoading}
            isOpen={showAlert}
            close={closeAlert}
          />
          <AlertDialog
            showCancel
            cancelText='Cancelar'
            onCancel={closeAlert}
            loadingText='Eliminando...'
            confirmText='Eliminar'
            title='¿Eliminar Post?'
            isLoading={isLoading}
            description='Estas seguro que desea eliminar este post?, esta acción no se puede deshacer.'
            onOk={deletePostHandler}
          />
        </>
      )}
    </>
  )
}
