
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  Copy,
  BarChart3,
  Trash2,
  FileText,
  Pencil 
} from "lucide-react";

import {
  useDeleteForm,
  useGetFormSubmissions,
  useListForms,
  useUpdateFormVisibility,
} from "~/hooks/api/form";

import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { useSnackbar } from 'notistack';
import CreateFormDailog from "~/components/Create-Form-Dailog";
import { useAuth } from "~/app/AuthProvider"
import { LoadingSpinner } from "~/components/LoadingSpinner";

export default function FormsPage() {
  const { user, isLoading } = useAuth();
  
  // const { forms, isLoading } = useListForms();
  const { forms } =  useListForms(!!user && !isLoading);
  
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "ALL" | "PUBLIC" | "UNLISTED" | "DRAFT"
  >("ALL");

  const filteredForms = useMemo(() => {
    if (!forms) return [];

    return forms.filter((form) => {
      const matchesSearch = form.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter = 
        filter === "ALL" ? true : form.visibility === filter;

      return matchesSearch && matchesFilter;
    });
  }, [forms, search, filter]);

  if (isLoading) {
    return (
      <div className="p-6 text-muted-foreground">
        Loading forms...
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>

          <h1 className="text-3xl font-bold title-font-color">
            Forms
          </h1>

          <p className="text-muted-foreground mt-1">
            Manage all your forms
          </p>
        </div>
        <CreateFormDailog />

      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative md:w-[400px]">
          <Search className="absolute left-3 top-2 h-4 w-4 text-muted-foreground " />

          <Input
            placeholder="Search forms..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="pl-10 card-bx brdbx"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {["ALL", "PUBLIC", "UNLISTED", "DRAFT"].map(
            (status) => (
              <Button
                key={status}
                variant={
                  filter === status
                    ? "default"
                    : "outline"
                }
                onClick={() =>
                  setFilter(status as any)
                }
              >
                {status}
              </Button>
            )
          )}
        </div>
      </div>

      {/* Empty State */}
      {filteredForms.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <FileText
              size={48}
              className="mx-auto text-muted-foreground"
            />

            <h2 className="text-2xl font-semibold mt-4">
              No forms found
            </h2>

            <p className="text-muted-foreground mt-2">
              Create a new form to get started
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredForms.map((form) => (
            <FormCard key={form.id} form={form} />
          ))}
        </div>
      )}
    </div>
  );
}

function FormCard({ form }: { form: any }) {
  const { enqueueSnackbar } = useSnackbar();

  const { submissions } = useGetFormSubmissions(form.id);
  const { deleteFormAsync } = useDeleteForm();
  const { updateVisibilityAsync } =
    useUpdateFormVisibility();

  const handleCopyLink = async () => {
    try {
      const formUrl = `${window.location.origin}/form/${form.id}`;

      await navigator.clipboard.writeText(formUrl);

      if (
        form.visibility === "PUBLIC" ||
        form.visibility === "UNLISTED"
      ) {
        enqueueSnackbar("Form link copied", { variant: "success" });
        
      } else {
        
        // enqueueSnackbar("Users cannot submit draft forms.", { variant: "warning" });
        toast.warning("Draft form copied", {
          description:
            "Users cannot submit draft forms.",
        });
      }
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete this form?"
    );

    if (!confirmed) return;

    try {
      await deleteFormAsync({
        formId: form.id,
      });

      toast.success("Form deleted");
    } catch {
      toast.error("Failed to delete form");
    }
  };

  return (
    <Card className="rounded-xl card-bx brdbx border transition-all hover:-translate-y-2 transitionshadow-lg shadow-blue-500/50">
      <CardHeader>
        <CardTitle>{form.title}</CardTitle>
        <CardDescription>
          {form.description || "No description"}
        </CardDescription>
      </CardHeader>

<CardContent className="space-y-4 grid grid-cols-2 ">
        <div className="text-sm text-muted-foreground ">
          Created:{" "}
          {form.createdAt
            ? new Date(form.createdAt).toLocaleDateString()
            : "-"}
        </div>

        <div className="text-sm font-medium text-right">
          Responses: {submissions?.length ?? 0}
        </div>
</CardContent>

<CardContent className="space-y-4 forms">
   {/* Visibility */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            size="sm"
            variant={
              form.visibility === "PUBLIC"
                ? "default"
                : "outline"
            }
            onClick={() =>
              updateVisibilityAsync({
                formId: form.id,
                visibility: "PUBLIC",
              })
            }
          >
            Public
          </Button>

          <Button
            size="sm"
            variant={
              form.visibility === "UNLISTED"
                ? "default"
                : "outline"
            }
            onClick={() =>
              updateVisibilityAsync({
                formId: form.id,
                visibility: "UNLISTED",
              })
            }
          >
            Unlisted
          </Button>

          <Button
            size="sm"
            variant={
              form.visibility === "DRAFT"
                ? "default"
                : "outline"
            }
            onClick={() =>
              updateVisibilityAsync({
                formId: form.id,
                visibility: "DRAFT",
              })
            }
          >
            Draft
          </Button>
        </div>
        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 justify-around">
         
          <div className="inline-flex w-full">
 {/* Delete */}
        <Button
          // variant="destructive"
          className="w-2/3 del"
          onClick={handleDelete}
        >
          <Trash2 className="mr-1 h-4 w-4 " />
          Delete Form
        </Button>
          </div>
           <div className="inline-flex justify-end">
<Link href={`/dashboard/forms/${form.id}`}>
            <Button
              variant="outline"
              className="w-10 mr-2"
            >
              <Pencil />
              {/* Edit Builder */}
            </Button>
          </Link>

          <Link href={`/form/${form.id}`}>
            <Button
              variant="outline"
              className="w-10 mr-2"
            >
              <Eye className="" />
              {/* View */}
            </Button>
          </Link>

          <Button
            variant="outline"
            className="mr-2"
            onClick={handleCopyLink}
          >
            <Copy />
            {/* Copy Link */}
          </Button>

          <Link href={`/form/${form.id}/submission`}>
            <Button
              variant="outline"
              className="w-10"
            >
              <BarChart3 className="" />
              {/* Responses */}
            </Button>
          </Link>
          </div>
          
        </div>

       

       
      </CardContent>
    </Card>
  );
}