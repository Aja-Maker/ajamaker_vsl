import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')?.split(':')[0]?.toLowerCase()
  if (
    (hostname === 'aformativouniversity.com' || hostname === 'www.aformativouniversity.com') &&
    request.nextUrl.pathname === '/'
  ) {
    const destination = request.nextUrl.clone()
    destination.pathname = '/viaje-salud'
    const response = NextResponse.rewrite(destination)
    const sessionResponse = await updateSession(request)
    sessionResponse.cookies.getAll().forEach(cookie => response.cookies.set(cookie))
    return response
  }
  return await updateSession(request)
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
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
