import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/models/user";

import { env } from "../env";
import { getRazorpay } from "./razorpay";

export type SubscriptionPlan = "free" | "pro";
export type SubscriptionStatus = "active" | "trialing" | "canceled";

export type UserSubscription = {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  renewsAt: string | null;
  subscriptionId: string | null;
};

type UserBillingRow = {
  plan: string | null;
  subscriptionStatus: string | null;
  subscriptionRenewAt: Date | null;
  razorPaySubscriptionId: string | null;
};

const RAZORPAY_PLAN_IDS = {
  pro:process.env.RAZORPAY_PRO_PLAN_ID,
  enterprise: process.env.RAZORPAY_ENTERPRISE_PLAN_ID,
} as const;


class BillingService {
  private async getBillingUser(userId: string): Promise<UserBillingRow | null> {
    const [user] = await db
      .select({
        plan: usersTable.plan,
        subscriptionStatus: usersTable.subscriptionStatus,
        subscriptionRenewAt: usersTable.subscriptionRenewAt,
        razorPaySubscriptionId: usersTable.razorPaySubscriptionId,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    return user ?? null;
  }

  public async getUserSubscription(userId: string): Promise<UserSubscription> {
    const user = await this.getBillingUser(userId);

    if (!user) {
      return { plan: "free", status: "active", renewsAt: null, subscriptionId: null };
    }

    const renewsAt = user.subscriptionRenewAt?.toISOString() ?? null;
    const subscriptionId = user.razorPaySubscriptionId ?? null;

    if (user.plan !== "pro") {
      return { plan: "free", status: "active", renewsAt, subscriptionId };
    }

    if (user.subscriptionStatus === "pending") {
      return { plan: "free", status: "trialing", renewsAt, subscriptionId };
    }

    if (user.subscriptionStatus === "canceled") {
      const stillActive =
        user.subscriptionRenewAt !== null && user.subscriptionRenewAt > new Date();

      if (stillActive) {
        return { plan: "pro", status: "active", renewsAt, subscriptionId };
      }

      return { plan: "free", status: "canceled", renewsAt, subscriptionId };
    }

    if (user.subscriptionStatus === "active") {
      return { plan: "pro", status: "active", renewsAt, subscriptionId };
    }

    return { plan: "free", status: "canceled", renewsAt, subscriptionId };
  }

//   public async createProSubscription(userId: string) {
//     const subscription = await this.getUserSubscription(userId);

//     if (subscription.plan === "pro" && subscription.status === "active") {
//       throw new Error("You already have an active Pro subscription.");
//     }

//     if (!env.RAZORPAY_PLAN_ID) {
//       throw new Error("Razorpay plan is not configured.");
//     }

//     const razorpay = getRazorpay();
//     const razorpaySubscription = await razorpay.subscriptions.create({
//       plan_id: env.RAZORPAY_PLAN_ID,
//       total_count: 12,
//       customer_notify: 1,
//       notes: { userId },
//     });

//     await db
//       .update(usersTable)
//       .set({
//         razorPaySubscriptionId: razorpaySubscription.id,
//         subscriptionStatus: "pending",
//       })
//       .where(eq(usersTable.id, userId));

//     return { subscriptionId: razorpaySubscription.id };
//   }

public async createSubscription(
  userId: string,
  plan: "pro" | "enterprise"
) {
  const planId = RAZORPAY_PLAN_IDS[plan];

  if (!planId) {
    throw new Error("Razorpay plan is not configured");
  }

  const razorpay = getRazorpay();

  const subscription =
    await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 120,
      quantity: 1,
      customer_notify: 1,
      notes: {
        userId,
        plan,
      },
    });
    await db
      .update(usersTable)
      .set({
        razorPaySubscriptionId: subscription.id,
        subscriptionStatus: "pending",
      })
      .where(eq(usersTable.id, userId));

  return {
    subscriptionId: subscription.id,
  };
}

  public async cancelProSubscription(userId: string) {
    const user = await this.getBillingUser(userId);

    if (!user?.razorPaySubscriptionId) {
      throw new Error("No active subscription found.");
    }

    const razorpay = getRazorpay();
    await razorpay.subscriptions.cancel(user.razorPaySubscriptionId, 1);

    await db
      .update(usersTable)
      .set({ subscriptionStatus: "canceled" })
      .where(eq(usersTable.id, userId));

    return { success: true };
  }

  /**
   * Called by the Razorpay webhook when a subscription becomes active
   * after the first (authorisation) payment succeeds.
   */
  public async activateSubscription(
    userId: string,
    razorpaySubscriptionId: string,
    renewsAt: Date | null = null
  ) {
    await db
      .update(usersTable)
      .set({
        plan: "pro",
        subscriptionStatus: "active",
        razorPaySubscriptionId: razorpaySubscriptionId,
        subscriptionRenewAt: renewsAt,
      })
      .where(eq(usersTable.id, userId));
  }

  /**
   * Called by the Razorpay webhook on each successful recurring charge.
   */
  public async renewSubscription(userId: string, renewsAt: Date | null) {
    await db
      .update(usersTable)
      .set({ subscriptionRenewAt: renewsAt })
      .where(eq(usersTable.id, userId));
  }

  /**
   * Called by the Razorpay webhook when a subscription is cancelled,
   * completed or halted.
   */
  public async deactivateSubscription(userId: string) {
    await db
      .update(usersTable)
      .set({
        plan: "free",
        subscriptionStatus: "canceled",
        subscriptionRenewAt: null,
      })
      .where(eq(usersTable.id, userId));
  }
}

export default BillingService;
export { BillingService };
