import { z } from "zod";


const envSchema = z.object({
  PORT: z.string().optional(),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  BASE_URL: z.string().url(),

  APP_URL: z.string().url(),

  COOKIE_DOMAIN: z.string().optional(),
  
GOOGLE_OAUTH_CLIENT_ID:z.string(),
GOOGLE_OAUTH_CLIENT_SECRET:z.string(),
GOOGLE_OAUTH_REDIRECT_URI:z.string()
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);

  if (!safeParseResult.success) {
    throw new Error(safeParseResult.error.message);
  }

  return safeParseResult.data;
}

export const env = createEnv(process.env);
