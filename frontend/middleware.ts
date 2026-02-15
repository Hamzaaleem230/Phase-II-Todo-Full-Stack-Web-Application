import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs'; // Ye line add karein
export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');
  const { pathname } = request.nextUrl;

  if (pathname === '/login' || pathname === '/signup') {
    if (token) {
      return NextResponse.redirect(new URL('/tasks', request.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    // Is line ko check karein, URL generation sahi honi chahiye
    const loginUrl = new URL('/login', request.nextUrl.origin); 
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Isse favicon, images aur static assets middleware ko skip karenge
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|favicon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ],
};