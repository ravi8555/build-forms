import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js 16 "proxy" (the file convention formerly known as middleware).
 *
 * IMPORTANT: this file must live at the project root (next to `app/`),
 * never inside `app/` — a middleware/proxy file inside `app/` is ignored
 * by Next.js.
 *
 * Responsibilities:
 * 1. Auth guard: protected routes require the `authentication` cookie,
 *    guest routes redirect logged-in users to the dashboard.
 * 2. Strict nonce-based Content-Security-Policy (production only).
 */

/** HSTS header value recommended by security scanners. */
const HSTS = "max-age=31536000; includeSubDomains";

/**
 * The session cookie set by the API (Express) and tRPC procedures.
 * MUST match AUTHENTICATION_COOKIE_NAME in
 * packages/trpc/server/utils/cookies.ts ("authenticate-cookie").
 */
const AUTH_COOKIE_NAME = "authenticate-cookie";

/**
 * Generates a per-request nonce used by the Content-Security-Policy.
 * Next.js reads the CSP request header set below and applies the nonce
 * to the inline `<script>` tags it renders, so script-src does not need
 * 'unsafe-inline'.
 */
function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

/**
 * Strict Content-Security-Policy (production only).
 *
 * - `'nonce-...'` + `'strict-dynamic'` lets Next.js bootstrap scripts run
 *   without 'unsafe-inline' in script-src.
 * - Razorpay checkout and Cloudflare Turnstile are loaded via next/script
 *   (nonce is applied automatically); their origins are allow-listed for
 *   older browsers that do not support 'strict-dynamic'.
 * - 'unsafe-inline' is intentionally kept for style-src only — Radix UI
 *   and charts position elements with inline `style` attributes, and it
 *   is not dangerous there.
 *
 * In development the CSP header is omitted because `next dev` relies on
 * 'unsafe-eval' for hot module replacement.
 */
function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://checkout.razorpay.com https://challenges.cloudflare.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https: http:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.buildforms.in https://checkout.razorpay.com https://api.razorpay.com https://www.razorpay.com https://lumberjack.razorpay.com wss://*.razorpay.com https://challenges.cloudflare.com",
    "frame-src 'self' https://checkout.razorpay.com https://challenges.cloudflare.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
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
    const authUrl = new URL("/auth", request.url);
    // Preserve the query string (e.g. ?plan=pro) so that after login the
    // user can be routed to the payment page they were heading to.
    authUrl.search = request.nextUrl.search;
    const redirect = NextResponse.redirect(authUrl);
    if (process.env.NODE_ENV === "production") {
      redirect.headers.set("Strict-Transport-Security", HSTS);
    }
    return redirect;
  }

  // Already logged in -> auth page
  if (isGuest && token) {
    // Users coming from the pricing page carry `?plan=pro|enterprise`;
    // send them straight to the payment page instead of the dashboard.
    const plan = request.nextUrl.searchParams.get("plan");
    const destination =
      plan === "pro" || plan === "enterprise"
        ? `/dashboard/billing?plan=${plan}`
        : "/dashboard";
    const redirect = NextResponse.redirect(
      new URL(destination, request.url)
    );
    if (process.env.NODE_ENV === "production") {
      redirect.headers.set("Strict-Transport-Security", HSTS);
    }
    return redirect;
  }

  const nonce = generateNonce();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const isProduction = process.env.NODE_ENV === "production";

  // Strict CSP is only safe for production builds (`next dev` relies on
  // 'unsafe-eval' for hot module replacement). The CSP *request* header
  // must be set BEFORE NextResponse.next() so Next.js can read the nonce
  // and apply it to its inline bootstrap scripts and next/script tags.
  if (isProduction) {
    requestHeaders.set("Content-Security-Policy", buildCsp(nonce));
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // The response header is what the browser enforces on the document.
  if (isProduction) {
    response.headers.set(
      "Content-Security-Policy",
      requestHeaders.get("Content-Security-Policy") as string
    );
  }

  return response;
}

export const config = {
  matcher: [
    // Apply to all page/HTML routes but skip static assets, images and API routes.
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$).*)",
  ],
};
