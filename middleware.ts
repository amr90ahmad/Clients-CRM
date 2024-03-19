import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.SECRET });

    if (!token)
        return NextResponse.redirect(new URL("/api/auth/signin", request.url));

    // Check the role and redirect based on the role
    switch (token.role) {
        case "admin":
            if (!request.nextUrl.pathname.startsWith("/users")) {
                return NextResponse.redirect(new URL("/users", request.url));
            }
            break;
        case "user":
            if (!request.nextUrl.pathname.startsWith("/dashboard")) {
                return NextResponse.redirect(
                    new URL("/dashboard", request.url)
                );
            }
            break;
        default:
            return NextResponse.redirect(
                new URL("/api/auth/signin", request.url)
            );
    }
}

export const config = {
    matcher: [
        // Match all routes except the ones that start with /login and api and the static folder
        "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
    ],
};
