import { z } from "zod";
import { router, authenticatedProcedure, publicProcedure, superAdminProcedure } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { createFormInputModel, createFormOutputModel, listFormsOutputModel } from "./model";
import {
  createFieldInputModel,
  updateFieldInputModel,
  deleteFieldInputModel,
  getFieldInputModel,
  getFieldOutputModel,
  createFieldOutputModel,
  getFormInputModel,
  getFormOutputModel,
  submitFormInputModel,
  submitFormOutputModel,
  getFormSubmissionsInputModel,
  getFormSubmissionsOutputModel,
  deleteFormInputModel,
  deleteFormOutputModel,
  // publishFormInputModel,
  // publishFormOutputModel,
  // unPublishFormInputModel,
  // unPublishFormOutputModel,
  dashboardAnalyticsOutputModel,
  updateVisibilityInputModel,
  updateVisibilityOutputModel,
  listPublicFormsOutputModel,
  createReportInputModel,
  createReportOutputModel,
  updateReportStatusInputModel,
  updateReportStatusOutputModel,
  listReportsOutputModel,
  hasReportedInputModel,
  hasReportedOutputModel
} from "./model";
import FormService from "@repo/services/forms/index";
import FormSubmissionService from "@repo/services/forms/form-submission/index";
import FormFieldService from "@repo/services/forms/form-fields";
import { getAuthenticationCookie } from "../../utils/cookies";
import UserService from "@repo/services/user"
import {checkRateLimit} from "@repo/services/utils/check-rate-limit"
import { reportLimiter} from "@repo/services/utils/rate-limit"


import FormReportService from "@repo/services/form-reports";

const TAGS = ["Forms"];
const getPath = generatePath("/forms");

const formService = new FormService();
const formFieldService = new FormFieldService();
const formSubmissionService = new FormSubmissionService();
const userService = new UserService()
const reportService = new FormReportService();

// console.log("listReportsOutputModel ==>",listReportsOutputModel);

export const formRouter = router({
  createForm: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createForm"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(createFormInputModel)
    .output(createFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      //  console.log('Received input:', input);
      // ctx.user.id is available because authenticatedProcedure injects it
      const { title, description, theme } = input;
      const { id } = await formService.createForm({
        title,
        description,
        theme,
        createdBy: ctx.user.id,
      });

      return { id };
    }),
  listForms: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/listforms"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(z.undefined())
    .output(listFormsOutputModel)
    .query(async ({ ctx }) => {
      const forms = await formService.listFormsByUserId({
        userId: ctx.user.id,      
      });
      return forms;
    }),

  listFields: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/listFields"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(z.object({ formId: z.string().uuid() }))
    .output(z.array(getFieldOutputModel)) // array of fields
    .query(async ({ input }) => {
      return formFieldService.listFieldsByFormId(input.formId);
    }),

  // ✅ Create Field
  createField: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createField"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(createFieldInputModel)
    .output(createFieldOutputModel)
    .mutation(async ({ input }) => {
      return formFieldService.createField(input);
    }),

  // ✅ Update Field
  updateField: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/updateField"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(updateFieldInputModel)
    .output(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      return formFieldService.updateField(input);
    }),

  // ✅ Delete Field
  deleteField: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/deleteField"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(deleteFieldInputModel)
    .output(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      return formFieldService.deleteField(input);
    }),

  // ✅ Get Field
  getField: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/getField"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getFieldInputModel)
    .output(getFieldOutputModel)
    .query(async ({ input }) => {
      const field = await formFieldService.getField(input);
      if (!field) throw new Error(`Field not found`);
      return field;
    }),

  getForm: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/getForm"),
        tags: TAGS,
      },
    })
    .input(getFormInputModel)
    .output(getFormOutputModel)
    .query(async ({ input, ctx }) => {
      let userId : string | undefined;
      const token = getAuthenticationCookie(ctx)
      if (token) {
    try {
      const user =
        await userService.verifyAndDecodedUserToken(token);

      userId = user.id;
    } catch {
      userId = undefined;
    }
  }

      return formService.getFormById({ formId: input.formId }, userId);
    }),

  submitForm: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/submitForm"),
        tags: TAGS,
        protect: false, // public
      },
    })
    .input(submitFormInputModel)
    .output(submitFormOutputModel)
    .mutation(async ({ input }) => {
      return formSubmissionService.submitForm(input);
    }),

  getFormSubmissions: authenticatedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/getFormSubmissions"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getFormSubmissionsInputModel)
    .output(getFormSubmissionsOutputModel)
    .query(async ({ input }) => {
      return formSubmissionService.getFormSubmissions({ formId: input.formId });
    }),

  deleteForm: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/deleteForm"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(deleteFormInputModel)
    .output(deleteFormOutputModel)
    .mutation(async ({ input, ctx }) => {
      return formService.deleteForm({
        formId: input.formId,
        userId: ctx.user.id,
      });
    }),

   updateVisibility: authenticatedProcedure
  .input(updateVisibilityInputModel)
  .output(updateVisibilityOutputModel)
  .mutation(async ({ input, ctx }) => {
    return formService.updateVisibility({
      formId: input.formId,
      userId: ctx.user.id,
      visibility: input.visibility,
    });
  }),

  getDashboardAnalytics: authenticatedProcedure
  .output(dashboardAnalyticsOutputModel)
  .query(async ({ ctx }) => {
    return formService.getDashboardAnalytics(ctx.user.id);
  }),

  listPublicForms: publicProcedure
  .meta({
    openapi: {
      method: "GET",
      path: getPath("/listPublicForms"),
      tags: TAGS,
    },
  })
  .output(listPublicFormsOutputModel)
  .query(async () => {
    return formService.listPublicForms();
  }),

  createReport: authenticatedProcedure
  .meta({
    openapi: {
      method: "POST",
      path: getPath("/createReport"),
      tags: TAGS,
      protect: true,
    },
  })
  .input(createReportInputModel)
  .output(createReportOutputModel)
  .mutation(async ({ input, ctx }) => {
    await checkRateLimit(
    reportLimiter,
    ctx.user.id
  );
      return reportService.createReport({
      formId: input.formId,
      reportedBy: ctx.user.id,
      reason: input.reason,
      description: input.description,
    });
    

  }),

  updateReportStatus: superAdminProcedure
  .meta({
    openapi: {
      method: "POST",
      path: getPath("/updateReportStatus"),
      tags: TAGS,
      protect: true,
    },
  })
  .input(updateReportStatusInputModel)
  .output(updateReportStatusOutputModel)
  .mutation(async ({ input }) => {
    return reportService.updateStatus(input);
  }),


listReports: superAdminProcedure
  .meta({
    openapi: {
      method: "GET",
      path: getPath("/listReports"),
      tags: TAGS,
      protect: true,
    },
  })
  .output(listReportsOutputModel)
  .query(async () => {
  const reports =
    await reportService.listReports();

  return reports;
}),

hasReported: authenticatedProcedure
  .meta({
    openapi: {
      method: "GET",
      path: getPath("/hasReported"),
      tags: TAGS,
      protect: true,
    },
  })
  .input(hasReportedInputModel)
  .output(hasReportedOutputModel)
  .query(async ({ input, ctx }) => {
    return reportService.hasReported({
      formId: input.formId,
      userId: ctx.user.id,
    });
  }),

  hideReportedForm: superAdminProcedure
  .meta({
    openapi: {
      method: "POST",
      path: getPath("/hideReportedForm"),
      tags: TAGS,
      protect: true,
    },
  })
  .input(
    z.object({
      formId: z.string().uuid(),
    })
  )
  .output(
    z.object({
      id: z.string().uuid(),
    })
  )
  .mutation(async ({ input }) => {
    return formService.hideReportedForm(input.formId);
  }),




});
