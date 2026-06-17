"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
  useGetForm,
  useGetFormSubmissions,
} from "~/hooks/api/form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import {
  FileSpreadsheet,
  Loader2,
  Inbox,
} from "lucide-react";
import { exportFormSubmissionsToCSV } from "~/lib/export-csv";
import { Download } from "lucide-react";
import Header from "~/components/Header";

const SubmissionsPage = () => {
  const { form_id } = useParams<{ form_id: string }>();

  const {
    form,
    isLoading: formLoading,
    error: formError,
  } = useGetForm(form_id);

  const {
    submissions,
    isLoading: subsLoading,
    error: subsError,
  } = useGetFormSubmissions(form_id);

  if (formLoading || subsLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="animate-spin" size={20} />
          Loading submissions...
        </div>
      </div>
    );
  }

  if (formError || subsError || !form) {
    return (
      <div className="p-6">
        <Card className="rounded-xl card-bg border transition-all ">
          <CardContent className="py-12 text-center">
            <h2 className="text-2xl font-semibold text-red-500">
              Error loading submissions
            </h2>
            <p className="text-muted-foreground mt-2">
              Something went wrong while fetching data.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const fields = form.fields;

  return (
    <>
    <Header />
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
       <div className="flex items-center justify-between mb-6">
  <h1 className="text-3xl font-bold text-center mb-6 title-font-color">
    Submissions for {form.title}
  </h1>

  <button
    onClick={() =>
      exportFormSubmissionsToCSV(form, submissions || [])
    }
    className="inline-flex items-center gap-2 px-4 py-2 cursor-pointer
              px-8
              rounded-md
              border
              border-border
              bg-card
              font-semibold
              inline-flex
              items-center
              justify-center
              sec-background
              transition-all"
  >
    <Download size={16} />
    Export CSV
  </button>
</div>

        <p className="text-muted-foreground mt-1">
          View all responses submitted for this form
        </p>
      </div>

      {/* Empty state */}
      {!submissions || submissions.length === 0 ? (
        <Card className="rounded-xl card-bx brdbx transition-all ">
          <CardContent className="py-16 text-center">
            <Inbox
              className="mx-auto text-muted-foreground"
              size={52}
            />

            <h2 className="text-2xl font-semibold mt-4">
              No submissions yet
            </h2>

            <p className="text-muted-foreground mt-2">
              Once users submit this form, responses will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="rounded-xl card-bx brdbx transition-all ">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet size={18} />
              Form Responses ({submissions.length})
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Submitted At</TableHead>

                    {fields.map((field) => (
                      <TableHead key={field.id}>
                        {field.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {submissions.map((submission, index) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">
                        {index + 1}
                      </TableCell>

                      <TableCell>
                        {submission.createdAt
                          ? new Date(
                              String(submission.createdAt)
                            ).toLocaleString()
                          : "-"}
                      </TableCell>

                      {fields.map((field) => {
                        const value =
                          submission.values?.find(
                            (v) =>
                              v.formFieldId === field.id
                          );

                        return (
                          <TableCell key={field.id}>
                            {value?.value || "-"}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
    </>

  );
};

export default SubmissionsPage;
