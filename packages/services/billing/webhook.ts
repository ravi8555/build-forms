import Razorpay from "razorpay";

import { env } from "../env";
import BillingService from "./subscription";

const billingService = new BillingService();

interface RazorpaySubscriptionEntity {
  id: string;
  plan_id?: string;
  status?: string;
  current_end?: number | null;
  ended_at?: number | null;
  notes?: Record<string, string | number> | null;
}

interface RazorpaySubscriptionWebhookPayload {
  event: string;
  payload?: {
    subscription?: {
      entity?: RazorpaySubscriptionEntity;
    };
  };
}

export function verifyRazorpayWebhookSignature(
  body: string,
  signature: string
): boolean {
  const webhookSecret = env.RAZORPAY_WEBHOOK_SECRET ?? env.RAZORPAY_KEY_SECRET;
  return Razorpay.validateWebhookSignature(body, signature, webhookSecret);
}

export async function handleSubscriptionWebhook(
  payload: RazorpaySubscriptionWebhookPayload
) {
  const event = payload.event;
  const subscription = payload.payload?.subscription?.entity;

  if (!subscription?.id) return;

  const userId = subscription.notes?.userId;
  if (!userId) return;

  const renewsAt = subscription.current_end
    ? new Date(subscription.current_end * 1000)
    : subscription.ended_at
      ? new Date(subscription.ended_at * 1000)
      : null;

  switch (event) {
    case "subscription.activated":
      await billingService.activateSubscription(
        String(userId),
        subscription.id,
        renewsAt
      );
      break;

    case "subscription.charged":
      await billingService.renewSubscription(String(userId), renewsAt);
      break;

    case "subscription.cancelled":
    case "subscription.completed":
    case "subscription.halted":
      await billingService.deactivateSubscription(String(userId));
      break;

    default:
      break;
  }
}
