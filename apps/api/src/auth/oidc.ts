import crypto from "node:crypto";
import "dotenv/config"

import { env } from "../env";

const OIDC_AUTHORIZATION_ENDPOINT =
  `${process.env.OIDC_ISSUER}/o/authenticate`;

const OIDC_TOKEN_ENDPOINT =
  `${process.env.OIDC_ISSUER}/o/token`;

const OIDC_JWKS_URI =
  `${process.env.OIDC_ISSUER}/.well-known/jwks.json`;

export function generateRandomString(length = 32) {
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

export function createOidcAuthorizationUrl(params: {
  state: string;
  nonce: string;
  codeChallenge: string;
}) {
  const url = new URL(
    OIDC_AUTHORIZATION_ENDPOINT
  );

  url.searchParams.set(
    "response_type",
    "code"
  );

  url.searchParams.set(
    "client_id", `${process.env.OIDC_CLIENT_ID}`
  );

  url.searchParams.set(
    "redirect_uri", `${process.env.OIDC_REDIRECT_URI}`
  );

  url.searchParams.set(
    "scope",
    "openid profile email"
  );

  url.searchParams.set(
    "state",
    params.state
  );

  url.searchParams.set(
    "nonce",
    params.nonce
  );

  url.searchParams.set(
    "code_challenge",
    params.codeChallenge
  );

  url.searchParams.set(
    "code_challenge_method",
    "S256"
  );

  return url.toString();
}