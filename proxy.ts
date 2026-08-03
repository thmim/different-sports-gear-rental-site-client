import { JwtPayload } from 'jsonwebtoken';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtUtils } from './utils/jwt';
import { getNewAccessToken } from './services/refreshToken';
import { cookies } from 'next/headers';
const AUTH_ROUTES = ["/login", "/register"]
const PUBLIC_ROUTES = ["/", "/gears"]
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

    const pathname = request.nextUrl.pathname;
    const cookieStore = await cookies();
    let accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;

    const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;
    console.log(decodedRefreshToken);
    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        //access token has expired but refresh token is valid, get new access token from backend
        console.log("Refreshing access token...");
        const result = await getNewAccessToken();
        console.log(result, "get-new");
        // console.log(result.data,"new");


        if (result.success) {
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
            });

            accessToken = newAccessToken;
            decodedAccessToken = jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET as string);


        }
    }

    let userRole = null;

    if (!decodedAccessToken?.success) {
        //token has expired or is invalid, clear the cookies
        cookieStore.delete("accessToken");
        // return NextResponse.redirect(new URL('/login', request.url));
    }

    if (decodedAccessToken?.success && decodedAccessToken.data) {
        userRole = (decodedAccessToken.data as JwtPayload).role;
    }

    //user is logged in and trying to access login or register page, redirect to dashboard or root home page
    if (accessToken && AUTH_ROUTES.includes(pathname)) {
        if (userRole === "CUSTOMER") {
            return NextResponse.redirect(new URL('/customer-dashboard', request.url));
        } else if (userRole === "ADMIN") {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url));
        } else if (userRole === "PROVIDER") {
            return NextResponse.redirect(new URL('/provider-dashboard', request.url));
        } else {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

    const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"));

    // Authenticated Pages Protection : Authorization is not handled yet
    if (!accessToken && !isPublicRoute && !isAuthRoute) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set("redirect",pathname)
        return NextResponse.redirect(loginUrl);
    }

    // Authorization : Role based access control
    if (pathname.startsWith("/customer-dashboard") && userRole !== "CUSTOMER") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    } else if (pathname.startsWith("/provider-dashboard") && userRole !== "PROVIDER") {
        return NextResponse.redirect(new URL('/not-found', request.url));
    }

    //   return NextResponse.redirect(new URL('/', request.url))
    return NextResponse.next()

}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: [

        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)',
    ],
}