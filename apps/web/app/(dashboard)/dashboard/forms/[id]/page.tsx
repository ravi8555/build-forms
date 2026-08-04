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
import { Label } from "~/components/ui/label";
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
  CirclePlusIcon

} from "lucide-react";

type FieldType =
  | "TEXT"
  | "NUMBER"
  | "EMAIL"
  | "PASSWORD"
  | "YES_NO"
  | "RATING"
  | "OPTION";

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
  const [options, setOptions] = useState<string[]>(["Option 1",]);

  const [ratings, setRatings] = useState<Record<string, number>>({});

  const resetForm = () => {
    setEditingField(null);
    setLabel("");
    setType("TEXT");
    setDescription("");
    setPlaceholder("");
    setIsRequired(false);
    setIsOpen(false);
    setOptions([""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedOptions = options
  .map(o => o.trim())
  .filter(o => o !== "");

  

    try {
      if (editingField) {
        await updateFieldAsync({
          fieldId: editingField.id,
          label,
          type,
          description,
          placeholder,
          isRequired,
          options: type === "OPTION" ? cleanedOptions : undefined,
        });
      } else {
        await createFieldAsync({
          formId,
          label,
          type,
          description,
          placeholder,
          isRequired,
          options: type === "OPTION" ? options : undefined,
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
    setOptions(field.options ?? [""]);
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
          className="
              h-8
              px-3
              rounded-md
              border
              border-border
              bg-card
              inline-flex
              items-center
              justify-center
              sec-background
              transition-all
              cursor-pointer
              text-white
            "
        >
            <CirclePlusIcon style={{ width:"16px", height:"16px", color:"#ffffff" }} />
           Add New Field
          
        </Button>
      </div>

      {/* Fields */} 
      <Card className="brdbx transition-all body-bg">
 
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2">
            <FileText size={18} />
            Fields
          </CardTitle>
        </CardHeader>

        <CardContent className="">
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
              className="border border-border p-6 rounded-xl card-bx brdbx border transition-all  hover:-translate-y-1 text-left mb-10"
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



{field.type === "OPTION" && options.length > 0 && (
  <div className="mt-2 space-y-1">
    {options.map(option => (
      <div key={option}>
        • {option}
      </div>
    ))}
  </div>
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
        <DialogContent className="forms p-6
             rounded-xl card-bg border transition-all  shadow-blue-500/50
             duration-300
             hover:border-[#55C96B]">
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
                <SelectItem value="OPTION">Multiple Choice</SelectItem>
                <SelectItem value="RATING">Rating</SelectItem>
              </SelectContent>
            </Select>

            {type === "OPTION" && (
  <div className="space-y-3">

    <Label>Options</Label>

    {options.map((option, index) => (

      <div
        key={index}
        className="flex gap-2"
      >

        <Input
          value={option}
          placeholder={`Option ${index + 1}`}
          onChange={(e) => {

            const updated = [...options];
            updated[index] = e.target.value;
            setOptions(updated);

          }}
        />

        <Button
          type="button"
          variant="destructive"
          onClick={() =>

            setOptions(
              options.filter((_, i) => i !== index)
            )

          }
        >
          ✕
        </Button>

      </div>

    ))}

    <Button
      type="button"
      variant="outline"
      onClick={() =>

        setOptions([
          ...options,
          "",
        ])

      }
    >
      + Add Option
    </Button>

  </div>
)}

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

            <DialogFooter className="card-bg ">
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