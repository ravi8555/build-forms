import { z } from 'zod';

export const createFormInput = z.object({
  title: z.string().min(1).max(80).describe('Title of the form'),
  description: z.string().optional().describe('Description of the form'),
  createdBy: z.string().uuid().describe('UUID of the owner'),
  // theme: z.enum(["DEFAULT","WANO","STARK","BATMAN",]),
  theme: z.string().nullable(),
  fields: z.array(z.object({
    label: z.string().max(100),
    labelKey: z.string().max(100),
    placeholder: z.string().optional(),
    isRequired: z.boolean().default(false),
    description: z.string().optional(),
    index: z.string(), // numeric in DB is often handled as string in JS to preserve precision
    type: z.enum(['TEXT', 'NUMBER', 'EMAIL', 'PASSWORD', 'YES_NO'])
  })).optional()
}); 

export type CreateFormInputType = z.infer<typeof createFormInput>;
export type CreateFormServiceType = CreateFormInputType & { createdBy: string }

export const listFormsByUserIdInput = z.object({
  userId: z.string().uuid().describe("UUID of the user"),
});
export type ListFormsByUserIdInputType = z.infer<typeof listFormsByUserIdInput>;


// ✅ Output model for a single form
export const getFormOutputModel = z.object({
  id: z.string().uuid(),
  title: z.string().nullable(),
  description: z.string().nullable().optional(),
  theme: z.string().nullable(),
  createdBy: z.string().uuid().nullable(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type GetFormOutputType = z.infer<typeof getFormOutputModel>;

export const getFormByIdInput = z.object({
  formId: z.string().uuid().describe("UUID of the form to fetch"),
});

export type GetFormByIdInputType = z.infer<typeof getFormByIdInput>;

// export const createFormSubmissionInput = z.object({
//   formId: z.string().uuid(),
//   values: z.array(
//     z.object({
//       formFieldId: z.string().uuid(),
//       value: z.string(),
//     })
//   ),
// });

// export type CreateFormSubmissionInputType = z.infer<typeof createFormSubmissionInput>;

// ✅ Output: submission result
export const createFormSubmissionOutput = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
});

export type CreateFormSubmissionOutputType = z.infer<typeof createFormSubmissionOutput>;
export const formVisibilityModel = z.enum([
  "DRAFT",
  "PUBLIC",
  "UNLISTED",
]);

export type FormVisibilityType =  z.infer<typeof formVisibilityModel>;









