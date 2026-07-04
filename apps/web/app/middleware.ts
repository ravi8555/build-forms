// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {

//   const token =
//     request.cookies.get("authentication")?.value;

//   const protectedRoutes = [
//     "/dashboard",
//     "/forms",
//     "/admin",
//   ];

//   const isProtected =
//     protectedRoutes.some((route) =>
//       request.nextUrl.pathname.startsWith(route)
//     );

//   if (isProtected && !token) {

//     return NextResponse.redirect(
//       new URL("/auth", request.url)
//     );

//   }

//   return NextResponse.next();

// }

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/forms/:path*",
//     "/admin/:path*",
//   ],
// };

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("authentication")?.value;

//   console.log(
//     "PATH:",
//     request.nextUrl.pathname,
//     "TOKEN:",
//     token
//   );

//   if (
//     ["/dashboard", "/forms", "/admin"].some(route =>
//       request.nextUrl.pathname.startsWith(route)
//     ) &&
//     !token
//   ) {
//     console.log("Redirecting to auth");

//     return NextResponse.redirect(
//       new URL("/auth", request.url)
//     );
//   }

//   return NextResponse.next();
// }

console.log("Run Middleware ====>")
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("authentication")?.value;

  const pathname = request.nextUrl.pathname;

  const protectedRoutes = [
    "/dashboard",
    "/forms",
    "/admin",
  ];

  const guestRoutes = [
    "/auth",
    "/login",
    "/register",
    "/forgot-password",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isGuest = guestRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Not logged in -> protected page
  if (isProtected && !token) {
    return NextResponse.redirect(
      new URL("/auth", request.url)
    );
  }

  // Already logged in -> auth page
  if (isGuest && token) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/forms/:path*",
    "/admin/:path*",
    "/auth",
    "/login",
    "/register",
    "/forgot-password",
  ],
};