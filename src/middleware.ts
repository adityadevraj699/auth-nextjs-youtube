import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail';
    const token = request.cookies.get('token')?.value || '';

    // Redirect logged-in users away from login/signup
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url)); // ✅ Fixed
    }

    // Restrict private routes if not logged in
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url)); // ✅ Fixed
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/profile/:path*', // ✅ Allows protection of dynamic profile routes like `/profile/aditya`
        '/login',
        '/signup',
        '/verifyemail',
    ],
};
