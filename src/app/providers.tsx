import { Toaster } from 'sonner'

export default function Providers ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position='bottom-right' expand visibleToasts={2} closeButton />
      {children}
    </>
  )
}
