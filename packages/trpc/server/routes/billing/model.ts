import { z } from "zod";

export const subscriptionPlanModel = z.enum(["free", "pro"]);
export type SubscriptionPlanType = z.infer<typeof subscriptionPlanModel>;

export const subscriptionStatusModel = z.enum(["active", "trialing", "canceled"]);
export type SubscriptionStatusType = z.infer<typeof subscriptionStatusModel>;

export const usageOutputModel = z.object({
  used: z.number(),
  limit: z.number().nullable(),
});

export const getUserSubscriptionOutputModel = z.object({
  plan: subscriptionPlanModel,
  status: subscriptionStatusModel,
  renewsAt: z.string().nullable(),
  subscriptionId: z.string().nullable(),
  usage: usageOutputModel,
});
export type GetUserSubscriptionOutputType = z.infer<
  typeof getUserSubscriptionOutputModel
>;

export const startProSubscriptionOutputModel = z.object({
  subscriptionId: z.string(),
});
export type StartProSubscriptionOutputType = z.infer<
  typeof startProSubscriptionOutputModel
>;

export const cancelSubscriptionOutputModel = z.object({
  success: z.boolean(),
});
export type CancelSubscriptionOutputType = z.infer<
  typeof cancelSubscriptionOutputModel
>;

export const startSubscriptionInputModel = z.object({
  plan: z.enum(["pro", "enterprise"]),
});

export type StartSubscriptionInputType =
  z.infer<typeof startSubscriptionInputModel>;

  