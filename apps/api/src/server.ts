import express from "express";
import { logger } from "@repo/logger";
import cors from "cors";

import * as trpcExpress from "@trpc/server/adapters/express";
import { generateOpenApiDocument, createOpenApiExpressMiddleware } from "trpc-to-openapi";
import { apiReference } from "@scalar/express-api-reference";

import { serverRouter, createContext } from "@repo/trpc/server";

import cookieParser from 'cookie-parser'

import { env } from "./env";
import { tuple } from "zod";

export const app = express();
const openApiDocument = generateOpenApiDocument(serverRouter, {
  title: "BuildForms OpenAPI",
  version: "1.0.0",
  baseUrl: env.BASE_URL.concat("/api"),
});

// // if (env.NODE_ENV !== "prod") {
//   app.use(
//     cors({
//       origin: "http://localhost:3030",
//       credentials:true
//     }),
//   );
// // }

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
