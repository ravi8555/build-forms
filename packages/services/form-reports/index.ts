import {
  db,
  eq,
  desc,
  and,
} from "@repo/database";

import { formReportsTable } from "@repo/database/models/form-report";
import { formsTable } from "@repo/database/models/form";
import { usersTable } from "@repo/database/models/user";

import {
  createReportInput,
  CreateReportInputType,
  updateReportStatusInput,
  UpdateReportStatusInputType,
} from "./model";

class FormReportService {

 async createReport(payload: CreateReportInputType) {
  
  const input = await createReportInput.parseAsync(payload);

  
  const existing = await db
    .select()
    .from(formReportsTable)
    .where(
        and(
            eq(formReportsTable.formId, input.formId),
            eq(formReportsTable.reportedBy, input.reportedBy)
        )
    );

    if (existing.length > 0) {
    throw new Error(
        "You have already reported this form."
    );
}

  const result = await db
    .insert(formReportsTable)
    .values(input)
    .returning();

  return {
    id: result[0]!.id,
  };
}

  async listReports() {

    return await db
.select({

    id:formReportsTable.id,

    reason:formReportsTable.reason,

    description:formReportsTable.description,

    status:formReportsTable.status,

    createdAt:formReportsTable.createdAt,

    form:{
        id:formsTable.id,
        title:formsTable.title,
        visibility:formsTable.visibility,
    },

    reporter:{
        id:usersTable.id,
        fullName:usersTable.fullName,
        email:usersTable.email,
    }

})
.from(formReportsTable)

.innerJoin(
    formsTable,
    eq(formReportsTable.formId, formsTable.id)
)

.innerJoin(
    usersTable,
    eq(formReportsTable.reportedBy, usersTable.id)
)
      // .orderBy(
      //   desc(formReportsTable.createdAt)
      // );

  }
async updateStatus(payload: UpdateReportStatusInputType) {

  const input =
    await updateReportStatusInput.parseAsync(payload);

  const result = await db
    .update(formReportsTable)
    .set({
      status: input.status,
    })
    .where(eq(formReportsTable.id, input.reportId))
    .returning();

  return {
    id: result[0]!.id,
  };
}


public async hasReported({
  formId,
  userId,
}: {
  formId: string;
  userId: string;
}) {
  const reports = await db
    .select({
      id: formReportsTable.id,
    })
    .from(formReportsTable)
    .where(
      and(
        eq(formReportsTable.formId, formId),
        eq(formReportsTable.reportedBy, userId)
      )
    );

  return {
    reported: reports.length > 0,
  };
}

}

export default FormReportService;