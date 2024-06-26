import { GoToLogin, SingOutButton } from '@/components/auth/actions'
import DropDown, { DropDownItem } from '@/components/common/dropdown'
import { userLinks } from '@/constants/links'
import { getSession } from '@/utils/auth'
import Link from 'next/link'

export async function NavigationAuthItem () {
  const session = await getSession()

  if (session) {
    return (
      <UserDropdown
        profileImage={session.profileImage}
        userName={session.username}
      />
    )
  }

  return <GoToLogin />
}

interface UserDropdownProps {
  profileImage: string | null
  userName: string
}

export function UserDropdown ({ profileImage, userName }: UserDropdownProps) {
  return (
    <DropDown
      dropdownTrigger={
        <div className='inline-flex items-center gap-2'>
          <img
            src={profileImage ?? '/assets/images/user-avatar.webp'}
            className='size-8 rounded-full'
            alt={`Foto de perfil de ${userName}`}
          />
          <span className='hidden text-lg font-medium text-primary opacity-85 md:block'>
            {userName}
          </span>
        </div>
      }
    >
      {userLinks.map(({ name, href }) => (
        <Link href={href} key={name}>
          <DropDownItem>{name}</DropDownItem>
        </Link>
      ))}
      <SingOutButton />
    </DropDown>
  )
}
