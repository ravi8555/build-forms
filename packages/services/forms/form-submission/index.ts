import { db, eq, desc,sql } from "@repo/database";
import { formSubmissionTable} from "@repo/database/models/form-submission";
import { formsTable} from "@repo/database/models/form";
import {
  assertCanSubmitToForm,
  trackUsage,
} from "../../billing/usage";
import { type SubmitFormInputType, submitFormInput } from "./model";
import { getFormSubmissionsInput, GetFormSubmissionsInputType } from "./model";
class FormSubmissionService {
  public async submitForm(payload: SubmitFormInputType) {
    const { formId, values } = await submitFormInput.parseAsync(payload);

    // Reject submissions to forms that aren't publicly submittable.
    const [form] = await db
      .select({
        id: formsTable.id,
        visibility: formsTable.visibility,
        createdBy: formsTable.createdBy,
      })
      .from(formsTable)
      .where(eq(formsTable.id, formId));

    if (!form) {
      throw new Error("This form does not exist.");
    }

    if (form.visibility === "DRAFT") {
      throw new Error("This form is not open for submissions yet.");
    }

    // Enforce the owner's plan per-form response limit.
    await assertCanSubmitToForm(formId);

    const result = await db
      .insert(formSubmissionTable)
      .values({ formId, values })
      .returning({ id: formSubmissionTable.id });

    if (!result || result.length === 0 || !result[0]?.id) {
      throw new Error("Something went wrong while saving your submission");
    }

    // Record the usage event for the form owner.
    if (form.createdBy) {
      await trackUsage(form.createdBy, "RESPONSE_RECEIVED", formId);
    }

    return { id: result[0].id };
  }

  // ✅ New method: get submissions by form ID
  public async getFormSubmissions(payload: GetFormSubmissionsInputType) {
    const { formId } = await getFormSubmissionsInput.parseAsync(payload);

    return await db
      .select({
        id: formSubmissionTable.id,
        values: formSubmissionTable.values,
        createdAt: formSubmissionTable.createdAt,
      })
      .from(formSubmissionTable)
      .where(eq(formSubmissionTable.formId, formId))
      .orderBy(desc(formSubmissionTable.createdAt));
  }



}

export default FormSubmissionService;
