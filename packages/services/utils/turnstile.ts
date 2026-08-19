import { env } from "../env";

type SiteVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
};

/**
 * Verifies a Cloudflare Turnstile token with Cloudflare's siteverify API.
 *
 * When `TURNSTILE_SECRET_KEY` is not configured (e.g. local development), the
 * check is skipped and `true` is returned so the flow is not blocked.
 */
export async function verifyTurnstileToken(
  token: string | undefined,
  remoteIp?: string
): Promise<boolean> {
  const secret = env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  if (!token) return false;

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  if (remoteIp) {
    formData.append("remoteip", remoteIp);
  }

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) return false;

  const data = (await res.json()) as SiteVerifyResponse;
  return data.success === true;
}
