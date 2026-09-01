import { and, db, eq, gte, inArray, count } from "@repo/database";
import { formsTable } from "@repo/database/models/form";
import { formSubmissionTable } from "@repo/database/models/form-submission";
import { usageTrackingTable } from "@repo/database/models/usage-tracking";

import BillingService from "./subscription";
import { PLAN_LIMITS } from "./plans";

/**
 * Kept for backwards-compatibility.
 * The authoritative free-tier responses limit lives in `PLAN_LIMITS`.
 */
export const FREE_MONTHLY_LIMIT = PLAN_LIMITS.free.maxResponsesPerForm ?? 0;

export type UsageSummary = {
  forms: {
    used: number;
    limit: number | null;
  };
  responses: {
    used: number;
    limit: number | null;
  };
};

export type UsageType = "FORM_CREATED" | "RESPONSE_RECEIVED";

const billingService = new BillingService();

/** Number of forms a user currently owns. */
export async function getFormCount(userId: string): Promise<number> {
  const [row] = await db
    .select({ value: count() })
    .from(formsTable)
    .where(eq(formsTable.createdBy, userId));

  return Number(row?.value ?? 0);
}

/** Number of responses a given form has received. */
export async function getResponsesForForm(formId: string): Promise<number> {
  const [row] = await db
    .select({ value: count() })
    .from(formSubmissionTable)
    .where(eq(formSubmissionTable.formId, formId));

  return Number(row?.value ?? 0);
}

/** Total responses the user's forms have received since the start of this month. */
export async function getSubmissionsThisMonth(userId: string): Promise<number> {
  const forms = await db
    .select({ id: formsTable.id })
    .from(formsTable)
    .where(eq(formsTable.createdBy, userId));

  if (forms.length === 0) return 0;

  const formIds = forms
    .map((form) => form.id)
    .filter((id): id is string => Boolean(id));

  if (formIds.length === 0) return 0;

  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const submissions = await db
    .select({ id: formSubmissionTable.id })
    .from(formSubmissionTable)
    .where(
      and(
        inArray(formSubmissionTable.formId, formIds),
        gte(formSubmissionTable.createdAt, startOfMonth)
      )
    );

  return submissions.length;
}

/**
 * Records a usage event for a logged-in user so their usage history is
 * queryable and auditable (the "record").
 */
export async function trackUsage(
  userId: string,
  usageType: UsageType,
  formId?: string
): Promise<void> {
  await db
    .insert(usageTrackingTable)
    .values({ userId, formId, usageType });
}

/** Returns the `createdBy` (owner) of a form, or null if it doesn't exist. */
export async function getFormOwner(formId: string): Promise<string | null> {
  const [form] = await db
    .select({ createdBy: formsTable.createdBy })
    .from(formsTable)
    .where(eq(formsTable.id, formId));

  return form?.createdBy ?? null;
}

/**
 * Enforces the form-count limit before a user creates a new form.
 * Throws `FORM_LIMIT_REACHED` when the user's plan limit is exceeded.
 */
export async function assertCanCreateForm(userId: string): Promise<void> {
  const subscription = await billingService.getUserSubscription(userId);
  const maxForms = PLAN_LIMITS[subscription.plan].maxForms;

  if (maxForms === null) return;

  const used = await getFormCount(userId);

  if (used >= maxForms) {
    throw new Error(
      `FORM_LIMIT_REACHED. You've reached the ${maxForms}-form limit on the free plan. Upgrade to Pro for unlimited forms.`
    );
  }
}

/**
 * Enforces the per-form responses limit before a submission is stored.
 * Throws `RESPONSE_LIMIT_REACHED` when the owning user's plan limit is
 * exceeded for the target form.
 */
export async function assertCanSubmitToForm(formId: string): Promise<void> {
  const ownerId = await getFormOwner(formId);

  if (!ownerId) {
    throw new Error("This form does not exist.");
  }

  const subscription = await billingService.getUserSubscription(ownerId);
  const maxResponses = PLAN_LIMITS[subscription.plan].maxResponsesPerForm;

  if (maxResponses === null) return;

  const used = await getResponsesForForm(formId);

  if (used >= maxResponses) {
    throw new Error(
      `RESPONSE_LIMIT_REACHED. This form has reached its ${maxResponses}-response limit. The owner must upgrade to Pro for 10,000 responses per form.`
    );
  }
}

/** Ensures the user owns the given form (access control for form data). */
export async function assertFormOwner(
  userId: string,
  formId: string
): Promise<void> {
  const ownerId = await getFormOwner(formId);

  if (!ownerId) {
    throw new Error("Form not found");
  }

  if (ownerId !== userId) {
    throw new Error("You do not have permission to access this form's data.");
  }
}

export async function canUserSubmitForm(userId: string): Promise<boolean> {
  const subscription = await billingService.getUserSubscription(userId);

  if (subscription.plan === "pro" && subscription.status === "active") {
    return true;
  }

  const used = await getSubmissionsThisMonth(userId);
  return used < (PLAN_LIMITS.free.maxResponsesPerForm ?? 0);
}

export async function getUsageSummary(userId: string): Promise<UsageSummary> {
  const subscription = await billingService.getUserSubscription(userId);
  const limits = PLAN_LIMITS[subscription.plan];

  const [formsUsed, responsesUsed] = await Promise.all([
    getFormCount(userId),
    getSubmissionsThisMonth(userId),
  ]);

  return {
    forms: {
      used: formsUsed,
      limit: limits.maxForms,
    },
    responses: {
      used: responsesUsed,
      limit: limits.maxResponsesPerForm,
    },
  };
}
