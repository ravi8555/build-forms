// // apps/api/src/routes/auth/oidc.ts
// import "dotenv/config"
// import express from "express";
// import { userService } from "@repo/trpc/server/services";
// import { setAuthenticationCookieForExpress } from "@repo/trpc/server/utils/cookies";
// import {
//   createRemoteJWKSet,
//   jwtVerify,
// } from "jose";
// const app = express()
// app.get("/auth/oidc/callback", async (req, res) => {
//   try {
//     const {
//       code,
//       state,
//       error,
//     } = req.query;

//     if (error) {
//       return res.redirect(
//         `https://buildforms.in/auth?error=${encodeURIComponent(
//           String(error)
//         )}`
//       );
//     }

//     if (
//       typeof code !== "string" ||
//       typeof state !== "string"
//     ) {
//       return res.status(400).json({
//         error: "Missing authorization code or state",
//       });
//     }

//     const storedState =
//       req.cookies["oidc_state"];

//     if (!storedState || storedState !== state) {
//       return res.status(400).json({
//         error: "Invalid state",
//       });
//     }

//     const codeVerifier =
//       req.cookies["oidc_code_verifier"];

//     if (!codeVerifier) {
//       return res.status(400).json({
//         error: "Missing PKCE verifier",
//       });
//     }

//     // Exchange authorization code
//     const tokenResponse = await fetch(
//       `${process.env.OIDC_ISSUER}/o/token`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type":
//             "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//           grant_type: "authorization_code",
//           code,
//           redirect_uri:
//             process.env.OIDC_REDIRECT_URI,
//           client_id:
//             process.env.OIDC_CLIENT_ID,
//           client_secret:
//             process.env.OIDC_CLIENT_SECRET,
//           code_verifier: codeVerifier,
//         }),
//       }
//     );

//     if (!tokenResponse.ok) {
//       return res.status(400).json({
//         error: "Unable to exchange authorization code",
//       });
//     }

//     const tokens =
//       await tokenResponse.json();

//     // Validate ID token
//     const jwks = createRemoteJWKSet(
//       new URL(
//         `${process.env.OIDC_ISSUER}/.well-known/jwks.json`
//       )
//     );

//     const { payload } = await jwtVerify(
//       tokens.id_token,
//       jwks,
//       {
//         issuer: process.env.OIDC_ISSUER,
//         audience: process.env.OIDC_CLIENT_ID,
//       }
//     );

//     // Validate nonce
//     const storedNonce =
//       req.cookies["oidc_nonce"];

//     if (
//       !storedNonce ||
//       payload.nonce !== storedNonce
//     ) {
//       return res.status(400).json({
//         error: "Invalid nonce",
//       });
//     }

//     if (
//       typeof payload.sub !== "string" ||
//       typeof payload.email !== "string"
//     ) {
//       return res.status(400).json({
//         error: "Invalid OIDC identity",
//       });
//     }

//     // Find/create BuildForms user
//     const { token } =
//       await userService.signInWithOidc({
//         sub: payload.sub,
//         email: payload.email,
//         fullName:
//           typeof payload.name === "string"
//             ? payload.name
//             : payload.email,
//       });

//     // Create normal BuildForms session
//     setAuthenticationCookieForExpress(
//       res,
//       token
//     );

//     // Remove temporary OIDC cookies
//     res.clearCookie("oidc_state");
//     res.clearCookie("oidc_nonce");
//     res.clearCookie("oidc_code_verifier");

//     // Finally enter BuildForms
//     return res.redirect(
//       "https://buildforms.in/dashboard"
//     );
//   } catch (error) {
//     console.error(
//       "OIDC callback failed:",
//       error
//     );

//     return res.redirect(
//       "https://buildforms.in/auth?error=oidc_failed"
//     );
//   }
// });


import { Request, Response } from "express";
import { userService } from "@repo/trpc/server/services";
 import "dotenv/config"
import {
  setAuthenticationCookieForExpress,
  clearCookieForExpress,
} from "@repo/trpc/server/utils/cookies";
import {
  createRemoteJWKSet,
  jwtVerify,
} from "jose";
import { env } from "../../env.js";

export async function oidcCallback(
  req: Request,
  res: Response
) {

  try {
    
    const { code, state, error } = req.query;

    // OIDC provider returned an error
    if (error) {
      return res.redirect(
        `${env.APP_URL}/auth?error=${encodeURIComponent(
          String(error)
        )}`
      );
    }

    // Validate code + state
    if (
      typeof code !== "string" ||
      typeof state !== "string"
    ) {
      return res.status(400).json({
        error: "Missing authorization code or state",
      });
    }

    // Get state from cookie
    const storedState =
      req.cookies?.["oidc_state"];

    if (!storedState || storedState !== state) {
      return res.status(400).json({
        error: "Invalid state",
      });
    }

    // Get PKCE verifier
    const codeVerifier =
      req.cookies?.["oidc_code_verifier"];

    if (!codeVerifier) {
      return res.status(400).json({
        error: "Missing PKCE verifier",
      });
    }

    // Exchange authorization code
    const tokenResponse = await fetch(
      `${process.env.OIDC_ISSUER}/o/token`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },

        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: env.OIDC_REDIRECT_URI,
          client_id: env.OIDC_CLIENT_ID,
          client_secret: env.OIDC_CLIENT_SECRET,
          code_verifier: codeVerifier,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const text = await tokenResponse.text();

      console.error(
        "OIDC token exchange failed:",
        text
      );

      return res.status(400).json({
        error: "Unable to exchange authorization code",
      });
    }

    const tokens = await tokenResponse.json();

    if (!tokens.id_token) {
      return res.status(400).json({
        error:
          "OIDC provider did not return an ID token",
      });
    }

    // JWKS
    const jwks = createRemoteJWKSet(
      new URL(
        `${env.OIDC_ISSUER}/.well-known/jwks.json`
      )
    );

    // Verify ID token
    const { payload } = await jwtVerify(
      tokens.id_token,
      jwks,
      {
        issuer: env.OIDC_ISSUER,
        audience: env.OIDC_CLIENT_ID,
      }
    );

    // Verify nonce
    const storedNonce =
      req.cookies?.["oidc_nonce"];

    if (
      !storedNonce ||
      payload.nonce !== storedNonce
    ) {
      return res.status(400).json({
        error: "Invalid OIDC nonce",
      });
    }

    // Validate identity
    if (
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string"
    ) {
      return res.status(400).json({
        error: "Invalid OIDC identity",
      });
    }

    console.log(
      "OIDC identity:",
      {
        sub: payload.sub,
        email: payload.email,
        name: payload.name,
      }
    );

    // Find/create BuildForms user
    const { token } =
      await userService.signInWithOidc({
        sub: payload.sub,
        email: payload.email,
        fullName:
          typeof payload.name === "string"
            ? payload.name
            : payload.email,
      });

    // Create BuildForms authentication session
    setAuthenticationCookieForExpress(
      res,
      token
    );

    // Remove temporary OIDC cookies
    clearCookieForExpress(
      res,
      "oidc_state"
    );

    clearCookieForExpress(
      res,
      "oidc_nonce"
    );

    clearCookieForExpress(
      res,
      "oidc_code_verifier"
    );

    // Redirect to dashboard
    return res.redirect(
      `${env.APP_URL}/dashboard`
    );
  } catch (error) {
    console.error(
      "OIDC callback failed:",
      error
    );

    return res.redirect(
      `${env.APP_URL}/auth?error=oidc_failed`
    );
  }
}
