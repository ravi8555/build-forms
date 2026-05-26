// model.ts
import { z } from "zod"
import { formVisibilityModel } from "@repo/services/forms/model"

// Input model for creating a form
export const createFormInputModel = z.object({
  title: z.string().min(1).max(80).describe("Title of the form"),
  description: z.string().optional().describe("Description of the form"),
  createdBy: z.string().uuid().optional().describe("UUID of the owner"),
  fields: z
    .array(
      z.object({
        label: z.string().max(100),
        labelKey: z.string().max(100),
        placeholder: z.string().optional(),
        isRequired: z.boolean().default(false),
        description: z.string().optional(),
        index: z.string(), // numeric in DB often handled as string in JS
        type: z.enum(["TEXT", "NUMBER", "EMAIL", "PASSWORD", "YES_NO"]),
      })
    )
    .optional(),
})

// Output model for creating a form
export const createFormOutputModel = z.object({
  id: z.string().uuid().describe("UUID of the created form"),
})

// Type inference for TypeScript
export type CreateFormInputType = z.infer<typeof createFormInputModel>
export type CreateFormOutputType = z.infer<typeof createFormOutputModel>

export const listFormsOutputModel = z.array(
  z.object({
    id: z.string().describe("ID of the form"),
    title: z.string().nullable().describe("Title of the form"),
    description: z.string().nullable().optional().describe("Description of the form"),
    createdAt: z.date().nullable().describe("Creation timestamp"),
    updatedAt: z.date().nullable().describe("Last updated timestamp"),
    // isPublished: z.boolean(),
    visibility: formVisibilityModel
  })
);
export const dashboardAnalyticsOutputModel = z.object({
  totalForms: z.number(),
  publishedForms: z.number(),
  draftForms: z.number(),
  unlistedForms: z.number(),
  totalResponses: z.number(),

  recentForms: z.array(
    z.object({
      id: z.string().uuid(),
      title: z.string().nullable(),
      visibility: z.enum(["DRAFT", "PUBLIC", "UNLISTED"]),
      createdAt: z.date().nullable(),
    })
  ),

  responsesByDate: z.array(
    z.object({
      date: z.string(),
      count: z.number(),
    })
  ),
});

// Enum for field types
export const fieldTypeEnum = z.enum(["TEXT", "NUMBER", "EMAIL", "YES_NO", "PASSWORD"])

// Base field object
export const formFieldObject = z.object({
  id: z.string().uuid().describe("UUID of the form field"),
  label: z.string().describe("Display label"),
  labelKey: z.string().describe("Immutable slug key"),
  type: fieldTypeEnum,
  description: z.string().nullable().optional(),
  placeholder: z.string().nullable().optional(),
  isRequired: z.boolean(),
  index: z.string().describe("Fractional index for ordering"),
})

// Input model for creating a field
export const createFieldInputModel = z.object({
  formId: z.string().uuid().describe("UUID of the form"),
  label: z.string().max(100).describe("Display label for the field"),
  type: fieldTypeEnum.describe("Type of the field"),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  isRequired: z.boolean().optional().default(false),
})

export type CreateFieldInputType = z.infer<typeof createFieldInputModel>

export const createFieldOutputModel = z.object({
  id: z.string().uuid().describe("UUID of the created field"),
  labelKey: z.string().describe("Immutable slug key"),
  index: z.string().describe("Fractional index"),
})

export type CreateFieldOutputType = z.infer<typeof createFieldOutputModel>


// Input model for updating a field
export const updateFieldInputModel = z.object({
  fieldId: z.string().uuid().describe("UUID of the field to update"),
  label: z.string().max(100).optional().describe("Updated display label"),
  type: fieldTypeEnum.optional().describe("Updated field type"),
  description: z.string().optional().nullable().describe("Updated helper text"),
  placeholder: z.string().optional().nullable().describe("Updated placeholder text"),
  isRequired: z.boolean().optional().describe("Updated required flag"),
  index: z.string().optional().describe("Updated fractional index"),
})
 
export type UpdateFieldInputType = z.infer<typeof updateFieldInputModel>

// Input model for deleting a field
export const deleteFieldInputModel = z.object({
  fieldId: z.string().uuid().describe("UUID of the field to delete"),
})

export type DeleteFieldInputType = z.infer<typeof deleteFieldInputModel>

// Input model for getting a field
export const getFieldInputModel = z.object({
  fieldId: z.string().uuid().describe("UUID of the field to fetch"),
})

export type GetFieldInputType = z.infer<typeof getFieldInputModel>

export const getFieldOutputModel = z.object({
  id: z.string().uuid(),
  formId: z.string().uuid().nullable(),
  label: z.string(), 
  labelKey: z.string(),
  type: z.enum(["TEXT", "NUMBER", "EMAIL", "PASSWORD", "YES_NO"]),
  description: z.string().nullable().optional(),
  placeholder: z.string().nullable().optional(),
  isRequired: z.boolean(),
  index: z.string(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
})

export type GetFieldOutputType = z.infer<typeof getFieldOutputModel>

// ✅ Input model
export const getFormInputModel = z.object({
  formId: z.string().uuid().describe("UUID of the form"),
});

// ✅ Output model
export const getFormOutputModel = z.object({
  id: z.string(),
  title: z.string().nullable(),
  description: z.string().nullable().optional(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  fields: z.array(formFieldObject),
}).nullable();


export const submitFormInputModel = z.object({
  formId: z.string().uuid().describe("UUID of the form being submitted"),
  values: z.array(
    z.object({
      formFieldId: z.string().uuid().describe("UUID of the form field being answered"),
      value: z.string().describe("Answer value for this form field"),
    })
  ).min(1),
});

export const submitFormOutputModel = z.object({
  id: z.string().describe("ID of the created submission"),
});


export const getFormSubmissionsInputModel = z.object({
  formId: z.string().uuid().describe('UUID of the form'),
})

export const getFormSubmissionsOutputModel = z.array(
  z.object({
    id: z.string(),
    createdAt: z.date().nullable(),
    values: z.array(
      z.object({
        formFieldId: z.string(),
        value: z.string(),
      })
    ).nullable(),
  })
)

export const deleteFormInputModel = z.object({
  formId: z.string().uuid(),
});

export const deleteFormOutputModel = z.object({
  id: z.string().uuid(),
});

export const publishFormInputModel = z.object({
  formId: z.string().uuid(),
});

export const publishFormOutputModel = z.object({
  id: z.string().uuid(),
});

export const unPublishFormInputModel = z.object({
  formId: z.string().uuid(),
});

export const unPublishFormOutputModel = z.object({
  id: z.string().uuid(),
});

export const updateVisibilityInputModel = z.object({
  formId: z.string().uuid(),
  visibility: formVisibilityModel,
});

export const updateVisibilityOutputModel = z.object({
  id: z.string().uuid(),
  visibility: formVisibilityModel,
});

export const publicFormItemModel = z.object({
  id: z.string().uuid(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  createdAt: z.date().nullable(),
})

export const listPublicFormsOutputModel = z.array(
  publicFormItemModel
)





