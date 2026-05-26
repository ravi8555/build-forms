import { z } from "zod";
import { router, authenticatedProcedure, publicProcedure } from "../../trpc";
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
  listPublicFormsOutputModel
} from "./model";
import FormService from "../../../../services/forms/index";
import FormSubmissionService from "../../../../services/forms/form-submission/index";
import FormFieldService from "../../../../services/forms/form-fields";
import { getAuthenticationCookie } from "../../utils/cookies";
import UserService from "@repo/services/user"

const TAGS = ["Forms"];
const getPath = generatePath("/forms");

const formService = new FormService();
const formFieldService = new FormFieldService();
const formSubmissionService = new FormSubmissionService();
const userService = new UserService()


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
      const { title, description } = input;
      const { id } = await formService.createForm({
        title,
        description,
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

  // publishForm: authenticatedProcedure
  // .meta({
  //   openapi: {
  //     method: "POST",
  //     path: getPath("/publishForm"),
  //     tags: TAGS,
  //     protect: true,
  //   },
  // })
  // .input(publishFormInputModel)
  // .output(publishFormOutputModel)
  // .mutation(async ({ input, ctx }) => {
  //   return formService.publishForm({
  //     formId: input.formId,
  //     userId: ctx.user.id,
  //   });
  // }),

  // unpublishForm: authenticatedProcedure
  // .meta({
  //   openapi: {
  //     method: "POST",
  //     path: getPath("/unpublishForm"),
  //     tags: TAGS,
  //     protect: true,
  //   },
  // })
  // .input(publishFormInputModel)
  // .output(publishFormOutputModel)
  // .mutation(async ({ input, ctx }) => {
  //   return formService.unpublishForm({
  //     formId: input.formId,
  //     userId: ctx.user.id,
  //   });
  // }),

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


});
