import { LoginForm } from '@/components/auth/forms'
import { ServerPageProps } from '@/types/props'
import { getSession } from '@/utils/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Login ({ searchParams }: ServerPageProps) {
  const { error } = searchParams
  const session = await getSession()

  if (session !== null) {
    redirect('/')
  }

  return (
    <div className="relative min-h-dvh bg-gradient-to-tl from-[#1b2834] via-[#4a90e2] to-[#619bc4] p-7">
      <div className="mx-auto mt-10 flex max-w-sm overflow-auto rounded-lg bg-white shadow-lg lg:max-w-4xl">

        <div className="w-full px-4 pb-8 lg:w-1/2">
          <div className='flex flex-col items-center gap-4 p-6 '>
            <Link href="/">
              <img className="h-24 object-cover" src="/assets/images/logo.png" alt="" />
            </Link>
            <h2 className="ml-4 flex-1 text-balance text-3xl font-semibold capitalize text-gray-700">Bienvenido</h2>
          </div>
          <p className="mb-4 text-pretty text-center text-base font-medium text-gray-700">Inicia sesión con tu cuenta</p>
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="border-strong w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-sm text-gray-600">Escribe tus datos</span>
            </div>
          </div>

          <LoginForm error={error} />

        </div>

        <div className="hidden bg-cover bg-no-repeat lg:block lg:w-1/2"
          style={{ backgroundImage: 'url(/assets/images/login-bg.webp)' }}>
        </div>
      </div>
    </div>
  )
}
