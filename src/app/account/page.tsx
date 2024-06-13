import ChangeProfileImage from '@/components/account/change-profile'
import { ChangeProfileForm } from '@/components/account/forms'
import { MainContainer } from '@/components/common/containers'
import { getSession } from '@/utils/auth'
import { redirect } from 'next/navigation'

export default async function AccountPage () {
  const session = await getSession()

  if (session === null) {
    redirect('/login?next=/account')
  }

  return (
    <MainContainer>
      <section className='flex min-h-[50dvh] flex-col items-center justify-start md:flex-row md:items-start md:justify-between'>
        <ChangeProfileImage
          id={session.id}
          username={session.username}
          profileImage={
            session.profileImage ?? '/assets/images/user-avatar.webp'
          }
        />

        <div className='mt-8 flex w-full flex-col items-center justify-center md:mt-0 md:w-2/3'>
          <div className='w-full rounded-lg bg-white p-4 shadow-md'>
            <h2 className='self-start text-xl text-gray-500'>Editar Datos</h2>

            <ChangeProfileForm
              email={session.email}
              username={session.username}
              id={session.id}
            />
          </div>
        </div>
      </section>
    </MainContainer>
  )
}
