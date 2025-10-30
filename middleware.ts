// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('authToken');

    // Protect feedback routes
    if (!token) {
        // eslint-disable-next-line no-undef
        return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/user/dashboard/:path*', '/auth/verify-otp'],
};
