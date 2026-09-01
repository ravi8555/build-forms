import { and, db, eq, gte, inArray } from "@repo/database";
import { formsTable } from "@repo/database/models/form";
import { formSubmissionTable } from "@repo/database/models/form-submission";

import BillingService from "./subscription";

export const FREE_MONTHLY_LIMIT = 5;

export type UsageSummary = {
  used: number;
  limit: number | null;
};

const billingService = new BillingService();

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

export async function canUserSubmitForm(userId: string): Promise<boolean> {
  const subscription = await billingService.getUserSubscription(userId);

  if (subscription.plan === "pro" && subscription.status === "active") {
    return true;
  }

  const used = await getSubmissionsThisMonth(userId);
  return used < FREE_MONTHLY_LIMIT;
}

export async function getUsageSummary(userId: string): Promise<UsageSummary> {
  const subscription = await billingService.getUserSubscription(userId);
  const used = await getSubmissionsThisMonth(userId);

  if (subscription.plan === "pro" && subscription.status === "active") {
    return { used, limit: null };
  }

  return { used, limit: FREE_MONTHLY_LIMIT };
}
