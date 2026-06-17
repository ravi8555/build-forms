import { db, eq, max } from "@repo/database"
import { formFieldsTable } from "@repo/database/models/form-fields"
import {
  type CreateFieldInputType, 
  createFieldInput,
  type UpdateFieldInputType, 
  updateFieldInput,
  type DeleteFieldInputType, 
  deleteFieldInput,
  type GetFieldInputType, 
  getFieldInput,
  type GetFieldOutputType
} from "./model" 

// ✅ Utility to generate immutable slug from label
function toLabelKey(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
}

class FormFieldService {
  // ✅ Fractional indexing helper
  private async getNextIndex(formId: string): Promise<string> {
    const result = await db
      .select({ maxIndex: max(formFieldsTable.index) })
      .from(formFieldsTable)
      .where(eq(formFieldsTable.formId, formId))

    const current = result[0]?.maxIndex
    const next = current ? parseFloat(current) + 1 : 1
    return next.toFixed(2)
  }

  // ✅ Create a new field
  public async createField(payload: CreateFieldInputType) {
    const { label, type, formId, description, placeholder, isRequired } =
      await createFieldInput.parseAsync(payload)

    // Validate required fields
    if (!formId) {
      throw new Error("formId is required")
    }

    const labelKey = toLabelKey(label)
    const index = await this.getNextIndex(formId)

    const result = await db
      .insert(formFieldsTable)
      .values({ 
        label, 
        labelKey, 
        type, 
        formId, 
        description: description || null, 
        placeholder: placeholder || null, 
        isRequired: isRequired ?? false,
        index
      })
      .returning({ id: formFieldsTable.id, labelKey: formFieldsTable.labelKey, index: formFieldsTable.index })

    if (!result || result.length === 0 || !result[0]?.id) {
      throw new Error("Something went wrong while creating the field")
    }

    return { 
      id: result[0].id, 
      labelKey: result[0].labelKey, 
      index: result[0].index 
    }
  }

  // ✅ Update an existing field
  public async updateField(payload: UpdateFieldInputType) {
    console.log("update payload:", payload)
    const { fieldId, ...updates } = await updateFieldInput.parseAsync(payload)

    const patch: Partial<typeof formFieldsTable.$inferInsert> = {}
    if (updates.label) patch.label = updates.label
    if (updates.type) patch.type = updates.type
    if (updates.description !== undefined) patch.description = updates.description
    if (updates.placeholder !== undefined) patch.placeholder = updates.placeholder
    if (updates.isRequired !== undefined) patch.isRequired = updates.isRequired
    if (updates.index !== undefined) patch.index = updates.index

    if (Object.keys(patch).length === 0) {
      throw new Error("No fields provided to update")
    }

    const result = await db
      .update(formFieldsTable)
      .set(patch)
      .where(eq(formFieldsTable.id, fieldId))
      .returning({ id: formFieldsTable.id })

    if (!result || result.length === 0) {
      throw new Error(`Field with ID ${fieldId} does not exist`)
    }

    return { id: result[0]!.id }
  }

  // ✅ Delete a field
  public async deleteField(payload: DeleteFieldInputType) {
    const { fieldId } = await deleteFieldInput.parseAsync(payload)

    const result = await db
      .delete(formFieldsTable)
      .where(eq(formFieldsTable.id, fieldId))
      .returning({ id: formFieldsTable.id })

    if (!result || result.length === 0) {
      throw new Error(`Field with ID ${fieldId} does not exist`)
    }

    return { id: result[0]!.id }
  }

  // ✅ Get a field by ID
  public async getField(payload: GetFieldInputType) {
    const { fieldId } = await getFieldInput.parseAsync(payload)

    const result = await db
      .select()
      .from(formFieldsTable)
      .where(eq(formFieldsTable.id, fieldId))

    if (!result || result.length === 0) {
      return null  // Return null instead of throwing
    }

    return result[0]
  }


  public async listFieldsByFormId(formId: string): Promise<GetFieldOutputType[]> {
    const result = await db
      .select()
      .from(formFieldsTable)
      .where(eq(formFieldsTable.formId, formId));

     return result.map((f) => ({
    ...f,
    formId: f.formId ?? formId, // fallback to input
  }));
  }



}

export default FormFieldService
