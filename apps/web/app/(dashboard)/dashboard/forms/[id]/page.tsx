// 'use client'

// import React, { useState } from 'react'
// import { useParams } from 'next/navigation'
// import { useGetField, useCreateField, useUpdateField, useDeleteField, useListFields  } from '~/hooks/api/form/index'
// const FormBuilderPage = () => {
//   const { id: formId } = useParams<{ id: string }>()
//   const { fields, isLoading, refetch } = useListFields(formId)
//   const { createFieldAsync } = useCreateField()
//   const { deleteFieldAsync } = useDeleteField()
//   const { updateFieldAsync } = useUpdateField()

//   const [isOpen, setIsOpen] = useState(false)
//   const [label, setLabel] = useState('')
//   const [type, setType] = useState<'TEXT' | 'NUMBER' | 'EMAIL' | 'PASSWORD' | 'YES_NO'>('TEXT')
//   const [description, setDescription] = useState('')
//   const [placeholder, setPlaceholder] = useState('')
//   const [isRequired, setIsRequired] = useState(false)

//   const [editingField, setEditingField] = useState<any>(null)


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     // await createFieldAsync({ formId, label, type, description, placeholder, isRequired })
//     // setIsOpen(false)
//     // setLabel('')
//     // setDescription('')
//     // setPlaceholder('')
//     // setIsRequired(false)
//     // refetch() // refresh list

//     if (editingField) {
//     await updateFieldAsync({
//       fieldId: editingField.id,
//       label,
//       type,
//       description,
//       placeholder,
//       isRequired,
//     })
//   } else {
//     await createFieldAsync({
//       formId,
//       label,
//       type,
//       description,
//       placeholder,
//       isRequired,
//     })
//   }

//   setIsOpen(false)
//   setEditingField(null)
//   setLabel("")
//   setDescription("")
//   setPlaceholder("")
//   setIsRequired(false)

//   refetch()
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Form Builder</h1>
//       <p className="mb-4">Form ID: {formId}</p>

//       <button
//         // onClick={() => setIsOpen(true)}
//     onClick={() => {
//   setEditingField(null)
//   setLabel("")
//   setType("TEXT")
//   setDescription("")
//   setPlaceholder("")
//   setIsRequired(false)
//   setIsOpen(true)
// }}

//         className="px-4 py-2 bg-blue-600 text-white rounded"
//       >
//        <h2>{editingField ? "Edit Field" : "+ Add Field"}</h2>
//       </button>

//       {/* Dialog */}
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-lg font-semibold mb-4"><h2>{editingField ? "Edit Field" : "Add Field"}</h2></h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 value={label}
//                 onChange={(e) => setLabel(e.target.value)}
//                 placeholder="Label"
//                 className="w-full border rounded px-2 py-1"
//               />
//               <select
//                 value={type}
//                 onChange={(e) => setType(e.target.value as any)}
//                 className="w-full border rounded px-2 py-1"
//               >
//                 <option value="TEXT">Text</option>
//                 <option value="NUMBER">Number</option>
//                 <option value="EMAIL">Email</option>
//                 <option value="PASSWORD">Password</option>
//                 <option value="YES_NO">Yes/No</option>
//               </select>
//               <input
//                 type="text"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Helper text"
//                 className="w-full border rounded px-2 py-1"
//               />
//               <input
//                 type="text"
//                 value={placeholder}
//                 onChange={(e) => setPlaceholder(e.target.value)}
//                 placeholder="Placeholder"
//                 className="w-full border rounded px-2 py-1"
//               />
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={isRequired}
//                   onChange={(e) => setIsRequired(e.target.checked)}
//                   className="mr-2"
//                 />
//                 Required field
//               </label>
//               <div className="flex justify-end gap-2">
//                 <button type="button" onClick={() => {
//     setIsOpen(false)
//     setEditingField(null)
//     setLabel("")
//     setType("TEXT")
//     setDescription("")
//     setPlaceholder("")
//     setIsRequired(false)
//   }}className="px-3 py-1 border rounded">
//                   Cancel
//                 </button>
//                 <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
//                    {editingField ? "Update Field" : "Add Field"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Field cards */}
//       <div className="mt-6">
//         <h2 className="text-lg font-semibold mb-2">Fields</h2>
//         {isLoading && <p>Loading...</p>}
//         {fields?.map((f) => (
//           <div key={f.id} className="flex items-center justify-between border p-3 rounded mb-2">
//             <div>
//               <p className="font-medium">{f.label}</p>
//               <div className="flex gap-2 text-sm text-gray-600">
//                 <span>{f.type}</span>
//                 {f.isRequired && <span>Required</span>}
//               </div>
//               <p className="text-xs text-gray-500">{f.labelKey}</p>
//             </div>
//             <div className="flex gap-2">
//               <button
//               onClick={() => {
//   setEditingField(f)
//   setLabel(f.label)
//   setType(f.type)
//   setDescription(f.description ?? "")
//   setPlaceholder(f.placeholder ?? "")
//   setIsRequired(f.isRequired)
//   setIsOpen(true)
// }}
//                 // onClick={
//                 //   () => updateFieldAsync({
//                 //      fieldId: f.id, label: 'Updated Label' })}
//                 className="text-blue-600 hover:underline"
//               >
//                 ✏️
//               </button>
//               <button
//                 onClick={() => deleteFieldAsync({ fieldId: f.id })}
//                 className="text-red-600 hover:underline"
//               >
//                 🗑️
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default FormBuilderPage

"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  useCreateField,
  useUpdateField,
  useDeleteField,
  useListFields,
} from "~/hooks/api/form";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Checkbox } from "~/components/ui/checkbox";
import { useGetForm } from "~/hooks/api/form";

import {
  Plus,
  Pencil,
  Trash2,
  FileText,
} from "lucide-react";

type FieldType =
  | "TEXT"
  | "NUMBER"
  | "EMAIL"
  | "PASSWORD"
  | "YES_NO";

export default function FormBuilderPage() {
  const { id: formId } = useParams<{ id: string }>();
  const { form } = useGetForm(formId);

  const { fields, isLoading, refetch } = useListFields(formId);
  const { createFieldAsync } = useCreateField();
  const { updateFieldAsync } = useUpdateField();
  const { deleteFieldAsync } = useDeleteField();

  const [isOpen, setIsOpen] = useState(false);
  const [editingField, setEditingField] = useState<any>(null);

  const [label, setLabel] = useState("");
  const [type, setType] = useState<FieldType>("TEXT");
  const [description, setDescription] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  const resetForm = () => {
    setEditingField(null);
    setLabel("");
    setType("TEXT");
    setDescription("");
    setPlaceholder("");
    setIsRequired(false);
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingField) {
        await updateFieldAsync({
          fieldId: editingField.id,
          label,
          type,
          description,
          placeholder,
          isRequired,
        });
      } else {
        await createFieldAsync({
          formId,
          label,
          type,
          description,
          placeholder,
          isRequired,
        });
      }

      resetForm();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (field: any) => {
    setEditingField(field);
    setLabel(field.label);
    setType(field.type);
    setDescription(field.description ?? "");
    setPlaceholder(field.placeholder ?? "");
    setIsRequired(field.isRequired);
    setIsOpen(true);
  };

  const handleDelete = async (fieldId: string) => {
    await deleteFieldAsync({ fieldId });
    refetch();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          {/* <h1 className="text-3xl font-bold text-[#55C96B]">
            Form Builder
          </h1> */}
<h1 className="text-3xl font-bold text-[#55C96B]">
  {form?.title || "Untitled Form"}
</h1>
          <p className="text-muted-foreground mt-1">
            Build and manage form fields
          </p>
        </div>

        <Button
          onClick={() => {
            resetForm();
            setIsOpen(true);
          }}
          className="bg-[#55C96B] hover:bg-[#49b85f] text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Field
        </Button>
      </div>

      {/* Fields */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={18} />
            Fields
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {isLoading && (
            <p className="text-muted-foreground">
              Loading fields...
            </p>
          )}

          {!isLoading && (!fields || fields.length === 0) && (
            <div className="text-center py-10 text-muted-foreground">
              No fields added yet
            </div>
          )}

          {fields?.map((field) => (
            <Card
              key={field.id}
              className="border border-border"
            >
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    {field.label}
                  </h3>

                  <div className="flex gap-3 mt-1 text-sm text-muted-foreground">
                    <span>{field.type}</span>
                    {field.isRequired && (
                      <span className="text-red-500">
                        Required
                      </span>
                    )}
                  </div>

                  {field.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {field.description}
                    </p>
                  )}

                  {field.placeholder && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Placeholder: {field.placeholder}
                    </p>
                  )}

                  <p className="text-xs text-muted-foreground mt-1">
                    Key: {field.labelKey}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(field)}
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(field.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingField ? "Edit Field" : "Add New Field"}
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Field Label"
              required
            />

            <Select
              value={type}
              onValueChange={(value) =>
                setType(value as FieldType)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select field type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="TEXT">Text</SelectItem>
                <SelectItem value="NUMBER">Number</SelectItem>
                <SelectItem value="EMAIL">Email</SelectItem>
                <SelectItem value="PASSWORD">Password</SelectItem>
                <SelectItem value="YES_NO">Yes / No</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Field description"
            />

            <Input
              value={placeholder}
              onChange={(e) =>
                setPlaceholder(e.target.value)
              }
              placeholder="Placeholder text"
            />

            <div className="flex items-center gap-3">
              <Checkbox
                checked={isRequired}
                onCheckedChange={(checked) =>
                  setIsRequired(!!checked)
                }
              />

              <label className="text-sm font-medium">
                Required field
              </label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-[#55C96B] hover:bg-[#49b85f]"
              >
                {editingField
                  ? "Update Field"
                  : "Add Field"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}