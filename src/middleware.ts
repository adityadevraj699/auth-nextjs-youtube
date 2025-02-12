import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    
    // ✅ Public pages jaha login required nahi hai
    const isPublicPath = 
        path === '/login' || 
        path === '/signup';

    const token = request.cookies.get('token')?.value || '';

    // ✅ Agar user logged in hai, to login/signup access nahi honi chahiye
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url)); 
    }

    // ✅ Private routes sirf logged-in users ke liye
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url)); 
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/profile/:path*', 
        '/login',
        '/signup',
    ],
};
