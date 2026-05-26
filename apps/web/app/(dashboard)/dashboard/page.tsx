
// "use client";

// import React, { useMemo, useState } from "react";
// import Link from "next/link";
// import { useCreateForm, useGetFormSubmissions, useListForms, useDeleteForm,
//   //  useUnpublishForm,
//   // usePublishForm
//   useUpdateFormVisibility
// } from "~/hooks/api/form";


// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "~/components/ui/card";

// import { Button } from "~/components/ui/button";
// import { Input } from "~/components/ui/input";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "~/components/ui/dialog";

// import {
//   Plus,
//   FileText,
//   ClipboardCopy,
//   Eye,
//   BarChart3,
//   Trash2,
//   Loader2,
//   Copy
// } from "lucide-react";
// import { useUser } from "~/hooks/api/auth";
// import { toast } from "sonner";


// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// import { useDashboardAnalytics } from "~/hooks/api/form";



// export default function DashboardPage() {
//   const { updateVisibilityAsync } =  useUpdateFormVisibility();
//   const user = useUser(true)
//   const [open, setOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const { createFormAsync } = useCreateForm();
//   const { forms } = useListForms();

//   const totalForms = forms?.length ?? 0;

//   const handleCreateForm = async () => {
//     if (!title.trim()) return;

//     try {
//       await createFormAsync({
//         title,
//         description,
//       } as any);

//       setTitle("");
//       setDescription("");
//       setOpen(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const copyLink = async (formId: string) => {
//     const url = `${window.location.origin}/form/${formId}`;
//     await navigator.clipboard.writeText(url);
//     alert("Form link copied");
//   };

//   const { analytics, isLoading } = useDashboardAnalytics();

//   if (isLoading) {
//     return <div className="p-6">Loading analytics...</div>;
//   }

//   if (!analytics) {
//     return <div className="p-6">No analytics found.</div>;
//   }
//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-[#55C96B]">
//             Dashboard
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             Manage your forms and submissions
//           </p>
//         </div>

//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>
//             <Button className="bg-[#55C96B] hover:bg-[#49b85f] text-white">
//               <Plus className="mr-2 h-4 w-4" />
//               Create Form
//             </Button>
//           </DialogTrigger>

//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Create New Form</DialogTitle>
//             </DialogHeader>

//             <div className="space-y-4">
//               <Input
//                 placeholder="Form title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />

//               <Input
//                 placeholder="Description (optional)"
//                 value={description}
//                 onChange={(e) =>
//                   setDescription(e.target.value)
//                 }
//               />

//               <Button
//                 onClick={handleCreateForm}
//                 className="w-full bg-[#55C96B] hover:bg-[#49b85f]"
//               >
//                 Create Form
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="space-y-6">
      
//       {/* cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Total Forms</CardTitle>
//           </CardHeader>
//           <CardContent className="text-3xl font-bold">
//             {analytics.totalForms}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//     <CardTitle>Unlisted</CardTitle>
//   </CardHeader>
//   <CardContent className="text-3xl font-bold text-blue-500">
//     {analytics.unlistedForms}
//   </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Drafts</CardTitle>
//           </CardHeader>
//           <CardContent className="text-3xl font-bold text-yellow-500">
//             {analytics.draftForms}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Total Responses</CardTitle>
//           </CardHeader>
//           <CardContent className="text-3xl font-bold">
//             {analytics.totalResponses}
//           </CardContent>
//         </Card>
//       </div>

//       {/* chart */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Responses Over Time</CardTitle>
//         </CardHeader>
//         <CardContent className="h-[350px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={analytics.responsesByDate}>
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="count" fill="#55C96B" />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* recent forms */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Forms</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {
//             analytics.recentForms.map((form) => (
//   <div
//     key={form.id}
//     className="flex justify-between border-b pb-3"
//   >
//     <span>{form.title}</span>
//     <span className="text-sm text-muted-foreground">
//       {form.visibility}
//     </span>
//   </div>
// ))
//             }
//           </div>
//         </CardContent>
//       </Card>
//     </div>

//       {/* Forms */}
//       {isLoading ? (
//         <div className="flex items-center gap-3 text-muted-foreground">
//           <Loader2 className="animate-spin" />
//           Loading forms...
//         </div>
//       ) : !forms || forms.length === 0 ? (
//         <Card>
//           <CardContent className="py-16 text-center">
//             <FileText
//               size={48}
//               className="mx-auto text-muted-foreground"
//             />

//             <h2 className="text-2xl font-semibold mt-4">
//               No forms yet
//             </h2>

//             <p className="text-muted-foreground mt-2">
//               Create your first form to get started.
//             </p>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//           {forms.map((form) => (
//             <FormCard
//               key={form.id}
//               form={form}
//               copyLink={copyLink}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function FormCard({
//   form,
//   copyLink,
// }: {
//   form: any;
//   copyLink: (id: string) => void;
// }) {
//   const { submissions } = useGetFormSubmissions(form.id);
//   const { deleteFormAsync } = useDeleteForm();
//   const { updateVisibilityAsync } =  useUpdateFormVisibility();

// const handleCopyLink = async () => {
//   try {
//     const formUrl = `${window.location.origin}/form/${form.id}`;

//     await navigator.clipboard.writeText(formUrl);

//     if (form.visibility === "PUBLIC" || form.visibility === "UNLISTED") {
//       toast.success("Public form link copied!");
//     } else {
//       toast.warning("Draft form link copied", {
//         description:
//           "Users cannot submit until the form is published.",
//       });
//     }
//   } catch {
//     toast.error("Failed to copy link");
//   }
// };
//   return (
//     <Card className="hover:shadow-lg transition">
//       <CardHeader>
//         <CardTitle>{form.title}</CardTitle>

//         <CardDescription>
//           {form.description || "No description"}
//         </CardDescription>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         <div className="text-sm text-muted-foreground">
//           Created:{" "}
//           {form.createdAt
//             ? new Date(form.createdAt).toLocaleDateString()
//             : "-"}
//         </div>

//         <div className="text-sm font-medium">
//           Responses: {submissions?.length ?? 0}
//         </div>

//         <div className="grid grid-cols-2 gap-2">
//           <Link href={`/dashboard/forms/${form.id}`}>
//             <Button
//               variant="outline"
//               className="w-full"
//             >
//               Edit Builder
//             </Button>
//           </Link>

//           <Link href={`/form/${form.id}`}>
//             <Button
//               variant="outline"
//               className="w-full"
//             >
//               <Eye className="mr-2 h-4 w-4" />
//               View
//             </Button>
//           </Link>

//           <Button
//   variant="outline"
//   onClick={handleCopyLink}
// >
//   <Copy className="mr-2 h-4 w-4" />
//   Copy Link
// </Button>

//           <Link href={`/form/${form.id}/submission`}>
//             <Button
//               variant="outline"
//               className="w-full"
//             >
//               <BarChart3 className="mr-2 h-4 w-4" />
//               Responses
//             </Button>
//           </Link>

//           <Button
//   variant="destructive"
//   className="col-span-2"
//   onClick={async () => {
//     const confirmed = confirm(
//       "Are you sure you want to delete this form?"
//     );

//     if (!confirmed) return;

//     try {
//       await deleteFormAsync({
//         formId: form.id,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }}
// >
//   <Trash2 className="mr-2 h-4 w-4" />
//   Delete Form
// </Button>

// {/* {form.isPublished ? (
//   <Button
//     variant="outline"
//     onClick={() =>
//       unpublishFormAsync({ formId: form.id })
//     }
//   >
//     Unpublish
//   </Button>
// ) : (
//   <Button
//     className="bg-[#55C96B] hover:bg-[#49b85f]"
//     onClick={() =>
//       publishFormAsync({ formId: form.id })
//     }
//   >
//     Publish
//   </Button>
// )} */}
// <div className="grid grid-cols-3 gap-2 col-span-2">
//   <Button
//     size="sm"
//     onClick={() =>
//       updateVisibilityAsync({
//         formId: form.id,
//         visibility: "PUBLIC",
//       })
//     }
//   >
//     Public
//   </Button>

//   <Button
//     size="sm"
//     variant="outline"
//     onClick={() =>
//       updateVisibilityAsync({
//         formId: form.id,
//         visibility: "UNLISTED",
//       })
//     }
//   >
//     Unlisted
//   </Button>

//   <Button
//     size="sm"
//     variant="secondary"
//     onClick={() =>
//       updateVisibilityAsync({
//         formId: form.id,
//         visibility: "DRAFT",
//       })
//     }
//   >
//     Draft
//   </Button>
// </div>

//         </div>
//       </CardContent>
//     </Card>
//   );
// }

"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts"
import { useDashboardAnalytics } from "~/hooks/api/form"

export default function DashboardPage() {
  const { analytics, isLoading } = useDashboardAnalytics()

  if (isLoading) {
    return (
      <div className="p-6 text-muted-foreground">
        Loading dashboard...
      </div>
    )
  }

  if (!analytics) return null

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#55C96B]">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Overview of your BuildForms workspace
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Forms</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {analytics.totalForms}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Published</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold text-green-500">
            {analytics.publishedForms}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Drafts</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold text-yellow-500">
            {analytics.draftForms}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Responses</CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {analytics.totalResponses}
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Responses Over Time</CardTitle>
        </CardHeader>

        <CardContent className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.responsesByDate}>
              <XAxis dataKey="date" />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#55C96B"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}