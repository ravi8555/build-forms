import { z } from "zod";

// const envSchema = z.object({
//   NODE_ENV: z.enum(["development", "production"]).default("development"),
//   LOGGER_LEVEL: z.enum(["error", "debug", "info"]).optional(),
// });

// function createEnv(env: NodeJS.ProcessEnv) {
//   const safeParseResult = envSchema.safeParse(env);
//   if (!safeParseResult.success) throw new Error(safeParseResult.error.message);
//   return safeParseResult.data;
// }

// export const env = createEnv(process.env);

const envSchema = z.object({
  PORT: z.string().optional(),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  BASE_URL: z.string().url(),

  APP_URL: z.string().url(),

  COOKIE_DOMAIN: z.string().optional(),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);

  if (!safeParseResult.success) {
    throw new Error(safeParseResult.error.message);
  }

  return safeParseResult.data;
}

export const env = createEnv(process.env);
