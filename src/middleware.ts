import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from '@/utils/supabase/server'
import { PROTECTED_ROUTES } from '@/constants/routes'

export async function middleware (request: NextRequest) {
  const { nextUrl } = request
  const response = await updateSession(request)

  if (isProtectedRoute(nextUrl.pathname)) {
    const supabase = await createClient()

    const {
      data: { user }
    } = await supabase.auth.getUser()

    if (user === null) {
      return NextResponse.redirect(
        new URL(
          `/login?next=${encodeURIComponent(nextUrl.pathname)}`,
          request.url
        )
      )
    }

    return response
  }

  return response
}

function isProtectedRoute (url: string) {
  return PROTECTED_ROUTES.some(route => url.startsWith(route))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}
