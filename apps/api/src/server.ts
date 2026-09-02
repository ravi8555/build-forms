
import express from "express";
import { logger } from "@repo/logger";
import cors from "cors";

import * as trpcExpress from "@trpc/server/adapters/express";
import { generateOpenApiDocument, createOpenApiExpressMiddleware } from "trpc-to-openapi";
import { apiReference } from "@scalar/express-api-reference";

import { serverRouter, createContext } from "@repo/trpc/server";
import { userService } from "@repo/trpc/server/services";
import {
  handleSubscriptionWebhook,
  verifyRazorpayWebhookSignature,
} from "@repo/services/billing/webhook";

import cookieParser from 'cookie-parser'

import { env } from "./env";
import { tuple } from "zod";
import { googleOAuth2Client } from "../../../packages/services/clients/google-oauth";
import { oidcCallback } from "./routes/auth/oidc";
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
// Server
  const allowedOrigins =
    env.NODE_ENV === "production"
      ? [
          "https://buildforms.in",
          "https://www.buildforms.in",
          // "https://api.buildforms.in",
          "https://api.buildforms.in",
        ]
      : [
          "http://localhost:3030",
          "http://localhost:8000",
        ];

console.log("NODE_ENV =", env.NODE_ENV);
console.log("Allowed Origins =", allowedOrigins);




app.use(
  cors({
    origin(origin, callback) {
      logger.info(`Incoming Origin: ${origin}`);

      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      logger.error(`Blocked by CORS: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);


// // // Local


app.use(cookieParser())

// Security headers for all API responses.
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), browsing-topics=()");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  next();
});

// Razorpay subscription webhook. Uses `express.raw` so the raw body is
// available for signature verification (must run before `express.json`).
app.post(
  "/api/webhooks/razorpay",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const signature = req.headers["x-razorpay-signature"];
      const body = req.body;

      if (
        !signature ||
        typeof signature !== "string" ||
        !Buffer.isBuffer(body)
      ) {
        return res
          .status(400)
          .json({ ok: false, message: "Missing signature or body" });
      }

      const rawBody = body.toString("utf8");

      if (!verifyRazorpayWebhookSignature(rawBody, signature)) {
        return res
          .status(400)
          .json({ ok: false, message: "Invalid signature" });
      }

      const payload = JSON.parse(rawBody);
      await handleSubscriptionWebhook(payload);

      return res.json({ ok: true });
    } catch (error) {
      logger.error("Razorpay webhook failed", { error });
      return res
        .status(500)
        .json({ ok: false, message: "Webhook processing failed" });
    }
  }
);

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

    const fullName =  payload.name ?? "";

    const profileImage =  payload.picture ?? "";

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
        role: user.role!,
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

app.get(
  "/auth/oidc/callback",
  oidcCallback
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


