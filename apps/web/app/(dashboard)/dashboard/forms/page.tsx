// // 'use client'

// // import React, { useState } from 'react'
// // import { useCreateForm , useListForms } from '~/hooks/api/form'
// // import Link from 'next/link'

// // export default function Page() {
// //   const [isOpen, setIsOpen] = useState(false)
// //   const [title, setTitle] = useState('')
// //   const [description, setDescription] = useState('')
// //   const { createFormAsync, isSuccess, error } = useCreateForm()
// //   const { forms, isLoading, isError, refetch } = useListForms()

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //   try {
// //     await createFormAsync({ title, description } as any)  // ✅ Only send title & description
// //     setIsOpen(false)
// //     setTitle('')
// //     setDescription('')
// //   } catch (err) {
// //     console.error(err) 
// //   }
// //   }

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">Forms</h1>
// //       <button
// //         onClick={() => setIsOpen(true)}
// //         className="px-4 py-2 bg-blue-600 text-white rounded"
// //       >
// //         Create New Form
// //       </button>

// //       {/* Table of forms */}
// //       <div className="mt-6">
// //         {isLoading && <p>Loading forms...</p>}
// //         {isError && <p className="text-red-500">Error loading forms</p>}
// //         {forms && forms.length > 0 ? (
// //           <table className="min-w-full border mt-4">
// //             <thead>
// //               <tr className="bg-gray-100">
// //                 {/* <th className="px-4 py-2 border">ID</th> */}
// //                 <th className="px-4 py-2 border">Title</th>
// //                 {/* <th className="px-4 py-2 border">Description</th> */}
// //                 <th className="px-4 py-2 border">Created At</th>
// //                 <th className="px-4 py-2 border">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {forms.map((form) => (
// //                 <tr key={form.id}>
// //                   {/* <td className="px-4 py-2 border">{form.id}</td> */}
// //                   <td className="px-4 py-2 border">{form.title}</td>
// //                   {/* <td className="px-4 py-2 border">{form.description ?? '-'}</td> */}
// //                   <td className="px-4 py-2 border">
// //                     {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : '-'}
// //                   </td>
// //                   <td className="px-4 py-2 border">
// //                     <Link
// //                       href={`/dashboard/forms/${form.id}`}
// //                       className="text-blue-600 hover:underline"
// //                     >
// //                       Edit / Builder
// //                     </Link>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         ) : (
// //           !isLoading && <p>No forms found.</p>
// //         )}
// //       </div>

// //       {isOpen && (
// //         <div className="fixed inset-0 flex items-center justify-center bg-black/50">
// //           <div className="bg-white p-6 rounded shadow-lg w-96">
// //             <h2 className="text-lg font-semibold mb-4">New Form</h2>
// //             <form onSubmit={handleSubmit} className="space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium">Title</label>
// //                 <input
// //                   type="text"
// //                   value={title}
// //                   onChange={(e) => setTitle(e.target.value)}
// //                   className="mt-1 block w-full border rounded px-2 py-1"
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium">Description</label>
// //                 <textarea
// //                   value={description}
// //                   onChange={(e) => setDescription(e.target.value)}
// //                   className="mt-1 block w-full border rounded px-2 py-1"
// //                 />
// //               </div>
// //               <div className="flex justify-end gap-2">
// //                 <button
// //                   type="button"
// //                   onClick={() => setIsOpen(false)}
// //                   className="px-3 py-1 border rounded"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   className="px-3 py-1 bg-blue-600 text-white rounded"
// //                 >
// //                   Save
// //                 </button>
// //               </div>
// //             </form>
// //             {error && <p className="text-red-500 mt-2">{error.message}</p>}
// //             {isSuccess && <p className="text-green-600 mt-2">Form created!</p>}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }


// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import {
//   useCreateForm,
//   useListForms,
// } from "~/hooks/api/form";

// import { Button } from "~/components/ui/button";
// import { Input } from "~/components/ui/input";
// import { Textarea } from "~/components/ui/textarea";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "~/components/ui/dialog";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "~/components/ui/table";

// import { Card, CardContent } from "~/components/ui/card";
// import { Plus } from "lucide-react";

// export default function FormsPage() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const { createFormAsync, isSuccess, error } = useCreateForm();
//   const { forms, isLoading, isError } = useListForms();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       await createFormAsync({
//         title,
//         description,
//       } as any);

//       setTitle("");
//       setDescription("");
//       setIsOpen(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-[#55C96B]">
//             Forms
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             Manage and build your forms
//           </p>
//         </div>

//         <Button
//           onClick={() => setIsOpen(true)}
//           className="bg-[#55C96B] hover:bg-[#49b85f] text-white"
//         >
//           <Plus className="mr-2 h-4 w-4" />
//           Create Form
//         </Button>
//       </div>

//       {/* Table */}
//       <Card>
//         <CardContent className="p-0">
//           {isLoading && (
//             <div className="p-6 text-muted-foreground">
//               Loading forms...
//             </div>
//           )}

//           {isError && (
//             <div className="p-6 text-red-500">
//               Error loading forms
//             </div>
//           )}

//           {!isLoading && forms?.length === 0 && (
//             <div className="p-10 text-center text-muted-foreground">
//               No forms created yet
//             </div>
//           )}

//           {forms && forms.length > 0 && (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Title</TableHead>
//                   <TableHead>Created At</TableHead>
//                   <TableHead className="text-right">
//                     Actions
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>

//               <TableBody>
//                 {forms.map((form) => (
//                   <TableRow key={form.id}>
//                     <TableCell className="font-medium">
//                       {form.title}
//                     </TableCell>

//                     <TableCell>
//                       {form.createdAt
//                         ? new Date(
//                             form.createdAt
//                           ).toLocaleDateString()
//                         : "-"}
//                     </TableCell>

//                     <TableCell className="text-right">
//                       <Link
//                         href={`/dashboard/forms/${form.id}`}
//                         className="text-[#55C96B] font-medium hover:underline"
//                       >
//                         Edit Builder
//                       </Link>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </CardContent>
//       </Card>

//       {/* Create Form Dialog */}
//       <Dialog open={isOpen} onOpenChange={setIsOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Create New Form</DialogTitle>
//           </DialogHeader>

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-4"
//           >
//             <div>
//               <label className="text-sm font-medium">
//                 Title
//               </label>
//               <Input
//                 value={title}
//                 onChange={(e) =>
//                   setTitle(e.target.value)
//                 }
//                 placeholder="Customer Feedback"
//                 required
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium">
//                 Description
//               </label>
//               <Textarea
//                 value={description}
//                 onChange={(e) =>
//                   setDescription(e.target.value)
//                 }
//                 placeholder="Optional form description"
//               />
//             </div>

//             {error && (
//               <p className="text-red-500 text-sm">
//                 {error.message}
//               </p>
//             )}

//             {isSuccess && (
//               <p className="text-green-500 text-sm">
//                 Form created successfully
//               </p>
//             )}

//             <DialogFooter>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Cancel
//               </Button>

//               <Button
//                 type="submit"
//                 className="bg-[#55C96B] hover:bg-[#49b85f]"
//               >
//                 Create Form
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }







"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Eye,
  Copy,
  BarChart3,
  Trash2,
  FileText,
} from "lucide-react";

import {
  useCreateForm,
  useDeleteForm,
  useGetFormSubmissions,
  useListForms,
  useUpdateFormVisibility,
} from "~/hooks/api/form";

import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function FormsPage() {
  const { forms, isLoading } = useListForms();
  const { createFormAsync } = useCreateForm();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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

  const handleCreateForm = async () => {
    if (!title.trim()) {
      toast.error("Form title is required");
      return;
    }

    try {
      await createFormAsync({
        title,
        description,
      } as any);

      toast.success("Form created successfully");

      setTitle("");
      setDescription("");
      setOpen(false);
    } catch {
      toast.error("Failed to create form");
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 text-muted-foreground">
        Loading forms...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#55C96B]">
            Forms
          </h1>

          <p className="text-muted-foreground mt-1">
            Manage all your forms
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#55C96B] hover:bg-[#49b85f] text-white">
              <Plus className="mr-2 h-4 w-4" />
              Create Form
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Form</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="Form title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />

              <Button
                onClick={handleCreateForm}
                className="w-full bg-[#55C96B] hover:bg-[#49b85f]"
              >
                Create Form
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative md:w-[400px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search forms..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="pl-10"
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
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredForms.map((form) => (
            <FormCard key={form.id} form={form} />
          ))}
        </div>
      )}
    </div>
  );
}

function FormCard({ form }: { form: any }) {
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
        toast.success("Form link copied");
      } else {
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
    <Card className="hover:shadow-lg transition">
      <CardHeader>
        <CardTitle>{form.title}</CardTitle>

        <CardDescription>
          {form.description || "No description"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Created:{" "}
          {form.createdAt
            ? new Date(form.createdAt).toLocaleDateString()
            : "-"}
        </div>

        <div className="text-sm font-medium">
          Responses: {submissions?.length ?? 0}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Link href={`/dashboard/forms/${form.id}`}>
            <Button
              variant="outline"
              className="w-full"
            >
              Edit Builder
            </Button>
          </Link>

          <Link href={`/form/${form.id}`}>
            <Button
              variant="outline"
              className="w-full"
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          </Link>

          <Button
            variant="outline"
            onClick={handleCopyLink}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </Button>

          <Link href={`/form/${form.id}/submission`}>
            <Button
              variant="outline"
              className="w-full"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Responses
            </Button>
          </Link>
        </div>

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

        {/* Delete */}
        <Button
          variant="destructive"
          className="w-full"
          onClick={handleDelete}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Form
        </Button>
      </CardContent>
    </Card>
  );
}