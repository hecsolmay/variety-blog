import { EdgeStoreProvider } from '@/utils/edgestore/client'
import { Toaster } from 'sonner'

export default function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EdgeStoreProvider>
        <Toaster position='bottom-right' expand visibleToasts={2} closeButton />
        {children}
      </EdgeStoreProvider>
    </>
  )
}
