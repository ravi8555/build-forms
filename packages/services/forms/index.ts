import { db, eq, asc, and, inArray,desc,count   } from "@repo/database";
import { formsTable } from "@repo/database/models/form";
import { formFieldsTable } from "@repo/database/models/form-fields";
import { formSubmissionTable } from "@repo/database/models/form-submission";
import {
  type CreateFormInputType,
  createFormInput,
  CreateFormServiceType,
  listFormsByUserIdInput,
  ListFormsByUserIdInputType,
  getFormByIdInput,
  GetFormByIdInputType,
  FormVisibilityType
} from "./model";

class FormService {
  public async createForm(payload: CreateFormInputType) {
    const { title, description,theme, createdBy } = await createFormInput.parseAsync(payload);
    // public async createForm(payload: CreateFormServiceType) {
    // const { title, description, createdBy } = payload

    const result = await db.insert(formsTable).values({ title, description,theme, createdBy }).returning({
      id: formsTable.id,
    });

    if (!result || result.length === 0 || !result[0]?.id) {
      throw new Error(`Something went wrong while creating the form`);
    }

    return { id: result[0].id };
  }

  public async listFormsByUserId(payload: ListFormsByUserIdInputType) {
    const { userId } = await listFormsByUserIdInput.parseAsync(payload);

    const forms = await db
      .select({
        id: formsTable.id,
        title: formsTable.title,
        description: formsTable.description,
        createdAt: formsTable.createdAt,
        updatedAt: formsTable.updatedAt,
        visibility: formsTable.visibility
        // isPublished: formsTable.isPublished,
      })
      .from(formsTable)
      .where(eq(formsTable.createdBy, userId));

    return forms;
  }

  public async getFormById(payload: GetFormByIdInputType,
  userId?: string) {
    const { formId } = await getFormByIdInput.parseAsync(payload);

    const rows = await db
      .select({
        id: formsTable.id,
        title: formsTable.title,
        description: formsTable.description,
        theme: formsTable.theme,
        createdAt: formsTable.createdAt,
        updatedAt: formsTable.updatedAt,

        visibility: formsTable.visibility,
        createdBy: formsTable.createdBy,

        field: {
          id: formFieldsTable.id,
          label: formFieldsTable.label,
          labelKey: formFieldsTable.labelKey,
          type: formFieldsTable.type,
          description: formFieldsTable.description,
          placeholder: formFieldsTable.placeholder,
          isRequired: formFieldsTable.isRequired,
          index: formFieldsTable.index,
        },
      })
      .from(formsTable)
      .leftJoin(formFieldsTable, eq(formFieldsTable.formId, formsTable.id))
      .where(eq(formsTable.id, formId))
      .orderBy(asc(formFieldsTable.index));

    if (rows.length === 0) return null;
    const formMeta = rows[0]!

    if (
  formMeta.visibility === "DRAFT" &&
  formMeta.createdBy !== userId
) {
  throw new Error("Form is not published")
}

    // const { id, title, description, createdAt, updatedAt } = rows[0]!;
    const { id, title, description, theme, createdAt, updatedAt } = formMeta;
    const fields = rows
      .filter((r) => r.field?.id !== null)
      .map((r) => r.field as NonNullable<typeof r.field>);

    return { id, title, description, theme, createdAt, updatedAt, fields };
  }


  public async deleteForm(payload: { formId: string; userId: string }) {
    const { formId, userId } = payload;

     const existingForm = await db
      .select({
        id: formsTable.id,
      })
      .from(formsTable)
      .where(and(eq(formsTable.id, formId), eq(formsTable.createdBy, userId)));

    if (!existingForm.length) {
      throw new Error("Form not found");
    }

    // delete submissions first
    await db.delete(formSubmissionTable).where(eq(formSubmissionTable.formId, formId));

    // delete fields
    await db.delete(formFieldsTable).where(eq(formFieldsTable.formId, formId));

    // delete form
    const result = await db.delete(formsTable).where(eq(formsTable.id, formId)).returning({
      id: formsTable.id,
    });

    if (!result.length) {
      throw new Error("Unable to delete form");
    }

    return {
      id: result[0]!.id,
    };
  }

  // public async publishForm(payload: { formId: string; userId: string }) {
  //   const { formId, userId } = payload;

  //   const result = await db
  //     .update(formsTable)
  //     .set({
  //       isPublished: true,
  //     })
  //     .where(and(eq(formsTable.id, formId), eq(formsTable.createdBy, userId)))
  //     .returning({
  //       id: formsTable.id,
  //     });

  //   if (!result.length) {
  //     throw new Error("Form not found");
  //   }

  //   return {
  //     id: result[0]!.id,
  //   };
  // }
  // public async unpublishForm(payload: { formId: string; userId: string }) {
  //   const { formId, userId } = payload;

  //   const result = await db
  //     .update(formsTable)
  //     .set({
  //       isPublished: false,
  //     })
  //     .where(and(eq(formsTable.id, formId), eq(formsTable.createdBy, userId)))
  //     .returning({
  //       id: formsTable.id,
  //     });

  //   if (!result.length) {
  //     throw new Error("Form not found");
  //   }

  //   return {
  //     id: result[0]!.id,
  //   };
  // }

  public async updateVisibility(payload: {
  formId: string;
  userId: string;
  visibility: FormVisibilityType;
}) {
  const { formId, userId, visibility } = payload;

  const result = await db
    .update(formsTable)
    .set({
      visibility,
    })
    .where(
      and(
        eq(formsTable.id, formId),
        eq(formsTable.createdBy, userId)
      )
    )
    .returning({
      id: formsTable.id,
      visibility: formsTable.visibility,
    });

  if (!result.length) {
    throw new Error("Form not found");
  }

  return result[0]!;
}
  
 public async getDashboardAnalytics(userId: string) {
  const forms = await db
    .select({
      id: formsTable.id,
      title: formsTable.title,
      visibility: formsTable.visibility,
      createdAt: formsTable.createdAt,
    })
    .from(formsTable)
    .where(eq(formsTable.createdBy, userId));

  const formIds = forms.map((f) => f.id);

  const submissions =
    formIds.length > 0
      ? await db
          .select({
            id: formSubmissionTable.id,
            formId: formSubmissionTable.formId,
            createdAt: formSubmissionTable.createdAt,
          })
          .from(formSubmissionTable)
          .where(inArray(formSubmissionTable.formId, formIds))
      : [];

  const totalForms = forms.length;

  const publishedForms = forms.filter(
    (f) => f.visibility === "PUBLIC"
  ).length;

  const draftForms = forms.filter(
    (f) => f.visibility === "DRAFT"
  ).length;

  const unlistedForms = forms.filter(
    (f) => f.visibility === "UNLISTED"
  ).length;

  const totalResponses = submissions.length;

  const responsesByDateMap = new Map<string, number>();

  submissions.forEach((submission) => {
    const day = submission.createdAt
      ? new Date(submission.createdAt).toLocaleDateString()
      : "Unknown";

    responsesByDateMap.set(
      day,
      (responsesByDateMap.get(day) || 0) + 1
    );
  });

  const responsesByDate = Array.from(
    responsesByDateMap.entries()
  ).map(([date, count]) => ({
    date,
    count,
  }));

  return {
    totalForms,
    publishedForms,
    draftForms,
    unlistedForms,
    totalResponses,
    recentForms: forms.slice(0, 5),
    responsesByDate,
  };
}



public async listPublicForms() {
  return await db
    .select({
      id: formsTable.id,
      title: formsTable.title,
      description: formsTable.description,
      theme: formsTable.theme,
      responseCount: count(formSubmissionTable.id),
      createdAt: formsTable.createdAt,
    })    
    .from(formsTable)
    .leftJoin(
      formSubmissionTable,
      eq(formSubmissionTable.formId, formsTable.id)
    )
    .where(eq(formsTable.visibility, "PUBLIC"))
    .groupBy(
      formsTable.id,
      formsTable.title,
      formsTable.description,
      formsTable.createdAt
    )
    .orderBy(desc(formsTable.createdAt));
}


}

export default FormService;
