import crypto from "node:crypto";

import { env } from "~/env.js";

export function generateRandomString(
  length = 32
) {
  return crypto
    .randomBytes(length)
    .toString("base64url");
}

export function createCodeVerifier() {
  return generateRandomString(64);
}

export function createCodeChallenge(
  codeVerifier: string
) {
  return crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");
}

export function createOidcAuthorizationUrl({
  state,
  nonce,
  codeChallenge,
}: {
  state: string;
  nonce: string;
  codeChallenge: string;
}) {
  const url = new URL(
    `${env.OIDC_ISSUER}/o/authenticate`
  );

  url.searchParams.set(
    "response_type",
    "code"
  );

  url.searchParams.set(
    "client_id",
    env.OIDC_CLIENT_ID
  );

  url.searchParams.set(
    "redirect_uri",
    env.OIDC_REDIRECT_URI
  );

  url.searchParams.set(
    "scope",
    "openid profile email"
  );

  url.searchParams.set(
    "state",
    state
  );

  url.searchParams.set(
    "nonce",
    nonce
  );

  url.searchParams.set(
    "code_challenge",
    codeChallenge
  );

  url.searchParams.set(
    "code_challenge_method",
    "S256"
  );

  return url.toString();
}