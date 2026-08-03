import { z } from "zod"

// Enum for field types
export const fieldTypeEnum = z.enum(["TEXT", "NUMBER", "EMAIL", "YES_NO", "PASSWORD","RATING","OPTION"])

// ✅ Create Field Input
export const createFieldInput = z.object({
  label: z.string().max(100).describe("Display label for the field"),
  type: fieldTypeEnum.describe("Type of the field"),
  formId: z.string().uuid().describe("UUID of the form this field belongs to"),
  description: z.string().optional().describe("Helper text shown below the field"),
  placeholder: z.string().optional().describe("Placeholder text for the field"),
  options: z.array(z.string()).optional().describe("Choose multiple options"),
  isRequired: z.boolean().optional().default(false).describe("Whether the field is required"),
  // index: z.string().describe("Fractional index for sorting fields"),
  // labelKey: z.string().max(100).describe("Immutable slug version of label"),
})

export type CreateFieldInputType = z.infer<typeof createFieldInput>

// ✅ Update Field Input
export const updateFieldInput = z.object({
  fieldId: z.string().uuid().describe("UUID of the field to update"),
  label: z.string().max(100).optional().describe("Updated display label"),
  type: fieldTypeEnum.optional().describe("Updated field type"),
  description: z.string().optional().nullable().describe("Updated helper text"),
  placeholder: z.string().optional().nullable().describe("Updated placeholder text"),
  options: z.array(z.string()).optional().describe("Choose multiple options"),
  isRequired: z.boolean().optional().describe("Updated required flag"),
    index: z.string().optional().describe("Updated fractional index"),
})

export type UpdateFieldInputType = z.infer<typeof updateFieldInput>

// ✅ Delete Field Input
export const deleteFieldInput = z.object({
  fieldId: z.string().uuid().describe("UUID of the field to delete"),
})

export type DeleteFieldInputType = z.infer<typeof deleteFieldInput>

// ✅ Get Field Input
export const getFieldInput = z.object({
  fieldId: z.string().uuid().describe("UUID of the field to fetch"),
})

export type GetFieldInputType = z.infer<typeof getFieldInput>
// ✅ Output model for a single field
export const getFieldOutputModel = z.object({
  id: z.string().uuid(),
  formId: z.string().uuid(),
  label: z.string(),
  labelKey: z.string(),
  type: fieldTypeEnum,
  description: z.string().nullable().optional(),
  placeholder: z.string().nullable().optional(),
  options: z.array(z.string()).nullable().optional(),
  isRequired: z.boolean(),
  index: z.string(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
})

export type GetFieldOutputType = z.infer<typeof getFieldOutputModel>
