import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('jwtToken')?.value;
  const userType = req.cookies.get('userType')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signIn', req.url));
  }

  // Restrict access based on user type
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (userType !== 'admin') {
      return NextResponse.redirect(new URL('/user/dashboard', req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith('/user')) {
    if (userType !== 'user') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }
  }

  return NextResponse.next();
}

// Protect admin and user routes
export const config = {
  matcher: ['/admin/:path*', '/user/:path*'],
};
