import type { SubscriptionPlan } from "./subscription";

export type PlanLimits = {
  /** Max number of forms a user on this plan can own. `null` = unlimited. */
  maxForms: number | null;
  /** Max number of responses each form owned on this plan can receive. `null` = unlimited. */
  maxResponsesPerForm: number | null;
};

/**
 * Limits advertised on the pricing page:
 * - Starter (free):       5 Forms, 100 Responses per Form
 * - Professional (pro):   Unlimited Forms, 10,000 Responses per Form
 *
 * `enterprise` is mapped to the `pro` tier in `getUserSubscription`, so it
 * inherits the pro limits here.
 */
export const PLAN_LIMITS: Record<SubscriptionPlan, PlanLimits> = {
  free: {
    maxForms: 5,
    maxResponsesPerForm: 100,
  },
  pro: {
    maxForms: null,
    maxResponsesPerForm: 10000,
  },
};

/** Human-readable limit summary used by the UI. */
export const PLAN_LIMIT_LABELS: Record<
  SubscriptionPlan,
  { forms: string; responses: string }
> = {
  free: {
    forms: "5 forms",
    responses: "100 responses per form",
  },
  pro: {
    forms: "Unlimited forms",
    responses: "10,000 responses per form",
  },
};
