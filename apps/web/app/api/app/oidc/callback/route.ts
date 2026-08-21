import crypto from "node:crypto";

import { NextRequest, NextResponse } from "next/server";
import {
  createRemoteJWKSet,
  jwtVerify,
} from "jose";

import { env } from "~/env.js";

function safeCompare(
  a: string,
  b: string
) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (
    aBuffer.length !== bBuffer.length
  ) {
    return false;
  }

  return crypto.timingSafeEqual(
    aBuffer,
    bBuffer
  );
}

export async function GET(
  request: NextRequest
) {
  const url = new URL(request.url);

  const code =
    url.searchParams.get("code");

  const state =
    url.searchParams.get("state");

  const error =
    url.searchParams.get("error");

  /*
   * OIDC provider returned an error
   */
  if (error) {
    return NextResponse.json(
      {
        error,
        description:
          url.searchParams.get(
            "error_description"
          ),
      },
      { status: 400 }
    );
  }

  /*
   * Authorization code + state are required
   */
  if (!code || !state) {
    return NextResponse.json(
      {
        error:
          "Missing authorization code or state",
      },
      { status: 400 }
    );
  }

  /*
   * Retrieve state created during
   * the authorization request.
   */
  const storedState =
    request.cookies.get(
      "oidc_state"
    )?.value;

  if (
    !storedState ||
    !safeCompare(
      state,
      storedState
    )
  ) {
    return NextResponse.json(
      {
        error: "Invalid state",
      },
      { status: 400 }
    );
  }

  /*
   * Retrieve PKCE verifier
   */
  const codeVerifier =
    request.cookies.get(
      "oidc_code_verifier"
    )?.value;

  if (!codeVerifier) {
    return NextResponse.json(
      {
        error:
          "Missing PKCE verifier",
      },
      { status: 400 }
    );
  }

  /*
   * Exchange authorization code
   * for tokens.
   */
  const tokenResponse =
    await fetch(
      `${env.OIDC_ISSUER}/o/token`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },

        body: new URLSearchParams({
          grant_type:
            "authorization_code",

          code,

          redirect_uri:
            env.OIDC_REDIRECT_URI,

          client_id:
            env.OIDC_CLIENT_ID,

          client_secret:
            env.OIDC_CLIENT_SECRET,

          code_verifier:
            codeVerifier,
        }),
      }
    );

  if (!tokenResponse.ok) {
    const text =
      await tokenResponse.text();

    console.error(
      "OIDC token exchange failed:",
      text
    );

    return NextResponse.json(
      {
        error:
          "Unable to exchange authorization code",
      },
      { status: 400 }
    );
  }

  const tokens =
    await tokenResponse.json();

  /*
   * Make sure an ID token exists.
   */
  if (!tokens.id_token) {
    return NextResponse.json(
      {
        error:
          "OIDC provider did not return an ID token",
      },
      { status: 400 }
    );
  }

  /*
   * JWKS endpoint
   */
  const jwks =
    createRemoteJWKSet(
      new URL(
        `${env.OIDC_ISSUER}/.well-known/jwks.json`
      )
    );

  /*
   * Verify ID token
   */
  const { payload } =
    await jwtVerify(
      tokens.id_token,
      jwks,
      {
        issuer:
          env.OIDC_ISSUER,

        audience:
          env.OIDC_CLIENT_ID,
      }
    );

  /*
   * Verify nonce
   */
  const storedNonce =
    request.cookies.get(
      "oidc_nonce"
    )?.value;

  if (
    !storedNonce ||
    payload.nonce !== storedNonce
  ) {
    return NextResponse.json(
      {
        error:
          "Invalid OIDC nonce",
      },
      { status: 400 }
    );
  }

  /*
   * PHASE 2 COMPLETE
   *
   * For now we only inspect
   * the validated identity.
   */
  console.log(
    "OIDC authentication successful:",
    payload
  );

  return NextResponse.json({
    message:
      "OIDC authentication successful",
    user: {
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
    },
  });
}