import { z } from 'zod';

export const submitFormInput = z.object({
  formId: z.string().uuid().describe("UUID of the form being submitted"),
  values: z.array(
    z.object({
      formFieldId: z.string().uuid().describe("UUID of the form field"),
      value: z.string().describe("Answer value for this field"),
    })
  ).min(1, "At least one field value is required"),
});

export type SubmitFormInputType = z.infer<typeof submitFormInput>;
 
export const getFormSubmissionsInput = z.object({
  formId: z.string().uuid().describe("UUID of the form whose submissions you want to fetch"),
});

export type GetFormSubmissionsInputType = z.infer<typeof getFormSubmissionsInput>;
