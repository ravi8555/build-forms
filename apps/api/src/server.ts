import express from "express";
import { logger } from "@repo/logger";
import cors from "cors";

import * as trpcExpress from "@trpc/server/adapters/express";
import { generateOpenApiDocument, createOpenApiExpressMiddleware } from "trpc-to-openapi";
import { apiReference } from "@scalar/express-api-reference";

import { serverRouter, createContext } from "@repo/trpc/server";
import { userService } from "@repo/trpc/server/services";

import cookieParser from 'cookie-parser'

import { env } from "./env";
import { tuple } from "zod";
import { googleOAuth2Client } from "../../../packages/services/clients/google-oauth";
import {
  setAuthenticationCookieForExpress,
} from "@repo/trpc/server/utils/cookies";
export const app = express();
const openApiDocument = generateOpenApiDocument(serverRouter, {
  title: "BuildForms OpenAPI",
  version: "1.0.0",
  baseUrl: env.BASE_URL.concat("/api"),
});

// Server
const allowedOrigins =
  env.NODE_ENV === "production"
    ? [
        "https://buildforms.in",
        "https://www.buildforms.in",
        "https://build-forms.onrender.com",
      ]
    : [
        "http://localhost:3030",
        "http://localhost:8000",
      ];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// // // Local

// const allowedOrigins = [
//   "http://localhost:3030",
//   "https://buildforms.in",
//   "https://www.buildforms.in",
//   "https://build-forms.onrender.com",
// ];

// app.use(
//   cors({
//     origin(origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         console.error("Blocked origin:", origin);
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.use(cookieParser())

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "BuildForms is up and running..." });
});

app.get("/health", (req, res) => {
  return res.json({ message: "BuildForms server is healthy", healthy: true });
});

logger.debug(`openapi.json: ${env.BASE_URL}/openapi.json`);
app.get("/openapi.json", (req, res) => {
  return res.json(openApiDocument);
});

logger.debug(`docs: ${env.BASE_URL}/docs`);
app.use("/docs", apiReference({ url: "/openapi.json" }));

app.get("/api/auth/google", async (req, res) => {
  const url = googleOAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["openid", "email", "profile"],
    prompt: "consent",
  });

  console.log(
  "REDIRECT URI:",
  env.GOOGLE_OAUTH_REDIRECT_URI
);

  res.redirect(url);
});

// app.get(
//   "/api/auth/google/callback",
//   async (req, res) => {
//     const code = req.query.code as string;

//     const { tokens } =
//       await googleOAuth2Client.getToken(code);

//     googleOAuth2Client.setCredentials(tokens);

//     const ticket =
//       await googleOAuth2Client.verifyIdToken({
//         idToken: tokens.id_token!,
//         audience: env.GOOGLE_OAUTH_CLIENT_ID,
//       });

//     const payload = ticket.getPayload();

//     if (!payload?.email) {
//       return res
//         .status(400)
//         .json({ message: "Email not found" });
//     }

//     const email = payload.email;
//     const fullName = payload.name ?? "";
//     const profileImage =
//       payload.picture ?? "";

//     // create/login user here

//     res.redirect(
//       `${env.APP_URL}/dashboard`
//     );
//   }
// );

app.get(
  "/api/auth/google/callback",
  async (req, res) => {
    const code = req.query.code as string;

    const { tokens } =
      await googleOAuth2Client.getToken(code);

    googleOAuth2Client.setCredentials(tokens);

    const ticket =
      await googleOAuth2Client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: env.GOOGLE_OAUTH_CLIENT_ID,
      });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      return res
        .status(400)
        .json({ message: "Email not found" });
    }

    const email = payload.email;

    const fullName =
      payload.name ?? "";

    const profileImage =
      payload.picture ?? "";

    // LOGIN / CREATE USER
    const user =
  await userService.loginWithGoogle({
    email,
    fullName,
    googleId: payload.sub!,
    profileImage,
  });

    // GENERATE INTERNAL JWT
    const { token } =
      await userService.generateUserToken({
        id: user.id,
      });

    // SET COOKIE
    setAuthenticationCookieForExpress(
      res,
      token
    );

    // REDIRECT FRONTEND
    res.redirect(
      `${env.APP_URL}/dashboard`
    );
  }
);

app.use(
  "/api",
  createOpenApiExpressMiddleware({
    router: serverRouter,
    createContext,
  }),
);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: serverRouter,
    createContext,
  }),
);




export default app;
