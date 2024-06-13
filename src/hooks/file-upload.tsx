import { useEdgeStore } from '@/utils/edgestore/client'
import { useState } from 'react'

interface UploadOptions {
  temporary?: boolean
}

export default function useFileUpload (defaultValue?: File) {
  const [file, setFile] = useState<File | undefined>(defaultValue)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { edgestore } = useEdgeStore()

  const uploadFile = async (
    file?: File,
    options: UploadOptions = { temporary: undefined }
  ) => {
    setFile(file)
    if (file === undefined) return

    setIsUploading(true)
    setProgress(0)
    const { temporary } = options
    try {
      const res = await edgestore.publicFiles.upload({
        options: {
          temporary
        },
        file,
        onProgressChange: progress => {
          // you can use this to show a progress
          setProgress(progress)
        }
      })

      return res
    } catch (error) {
      console.error(error)
    } finally {
      setIsUploading(false)
      setProgress(0)
    }
  }

  return { file, setFile, isUploading, progress, uploadFile }
}
