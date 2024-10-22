import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale } from "./constants/locales";
import { i18n } from "./i18n-config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle locale redirection
  if (
    pathname.startsWith(`/${defaultLocale}/`) ||
    pathname === `/${defaultLocale}`
  ) {
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${defaultLocale}`,
          pathname === `/${defaultLocale}` ? "/" : ""
        ),
        request.url
      )
    );
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(
        `/${defaultLocale}${pathname}${request.nextUrl.search}`,
        request.nextUrl.href
      )
    );
  }

  // Authentication and authorization logic
  const token = request.cookies.get('jwtToken')?.value;
  const userType = request.cookies.get('userType')?.value;

  // Redirect to sign-in if no token is found
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Handle user type redirects
  if (pathname.startsWith('/admin') && userType !== 'Owner') {
    return NextResponse.redirect(new URL('/user/dashboard', request.url));
  }

  if (pathname.startsWith('/superadmin') && userType !== 'SuperAdmin') {
    return NextResponse.redirect(new URL('/user/dashboard', request.url));
  }

  // Add additional checks here if you have more user types or roles

  return NextResponse.next();
}

// Protect admin and user routes
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Apply to specific paths for user and admin
    '/admin/:path*',
    '/user/:path*',
    '/superadmin/:path*',
  ],
};
