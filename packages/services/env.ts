import { z } from "zod";

const envSchema = z.object({

  JWT_SECRET : z.string().describe('secert key for JWT token'),
  EMAIL_API_KEY :z.string().describe('Email api key'),
  BREVO_API_KEY:z.string().describe('Brave api key'),
  BREVO_SMTP_HOST:z.string(),
  BREVO_SMTP_PORT: z.coerce.number(),
  BREVO_SMTP_USER:z.string(),
  BREVO_SMTP_PASSWORD:z.string(),
  BREVO_FROM_EMAIL:z.string(),
  BREVO_FROM_NAME:z.string(),
  APP_URL:z.string(),

  // GOOGLE_OAUTH_CLIENT_ID: z.string(),
  // GOOGLE_OAUTH_CLIENT_SECRET: z.string(),
  // GOOGLE_OAUTH_REDIRECT_URI: z.string(),



});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);
  if (!safeParseResult.success) throw new Error(safeParseResult.error.message);
  return safeParseResult.data;
}

export const env = createEnv(process.env);
