import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Check if the 'jwtToken' cookie exists
  const token = req.cookies.get('jwtToken')?.value;

  // If the token is not found, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signIn', req.url));
  }

  // If the token exists, allow the request to proceed
  return NextResponse.next();
}

// Configure the middleware to protect specific routes
export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'], // Protect routes like /admin or /dashboard
};
