import { NextResponse } from "next/server";

import {
  createCodeChallenge,
  createCodeVerifier,
  createOidcAuthorizationUrl,
  generateRandomString,
} from "~/lib/oidc";

export async function GET() {
  const state =
    generateRandomString(32);

  const nonce =
    generateRandomString(32);

  const codeVerifier =
    createCodeVerifier();

  const codeChallenge =
    createCodeChallenge(codeVerifier);

  const authorizationUrl =
    createOidcAuthorizationUrl({
      state,
      nonce,
      codeChallenge,
    });

  const response =
    NextResponse.redirect(
      authorizationUrl
    );

  const cookieOptions = {
    httpOnly: true,
    secure:
      process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 600,
  };

  response.cookies.set(
    "oidc_state",
    state,
    cookieOptions
  );

  response.cookies.set(
    "oidc_nonce",
    nonce,
    cookieOptions
  );

  response.cookies.set(
    "oidc_code_verifier",
    codeVerifier,
    cookieOptions
  );

  return response;
}


// import { NextResponse } from "next/server";
// import crypto from "node:crypto";

// import {
//   createCodeChallenge,
//   createCodeVerifier,
//   createOidcAuthorizationUrl,
//   generateRandomString,
// } from "../../../../../api/src/auth/oidc"

// export async function GET() {
//   const state = generateRandomString(32);
//   const nonce = generateRandomString(32);
//   const codeVerifier = createCodeVerifier();

//   const codeChallenge =
//     createCodeChallenge(codeVerifier);

//   const authorizationUrl =
//     createOidcAuthorizationUrl({
//       state,
//       nonce,
//       codeChallenge,
//     });

//   const response =
//     NextResponse.redirect(authorizationUrl);

//   response.cookies.set(
//     "oidc_state",
//     state,
//     {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       maxAge: 600,
//     }
//   );

//   response.cookies.set(
//     "oidc_nonce",
//     nonce,
//     {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       maxAge: 600,
//     }
//   );

//   response.cookies.set(
//     "oidc_code_verifier",
//     codeVerifier,
//     {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       maxAge: 600,
//     }
//   );

//   return response;
// }