"use client";
// components/admin/ReportCard.tsx
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
// import type { RouterOutputs } from "~/utils/trpc";

// type Report =  RouterOutputs["forms"]["listReports"][number];


type ReportCardProps = {
  report: {
    id: string;

    reason: string;
    description: string | null;

    status:
      | "PENDING"
      | "REVIEWED"
      | "REJECTED";

    createdAt: string | Date | null;

    form: {
      id: string | null;
      title: string | null;
      visibility:
        | "DRAFT"
        | "PUBLIC"
        | "UNLISTED"
        | null;
    };

    reporter: {
      id: string | null;
      fullName: string | null;
      email: string | null;
    };
  };

  onReview?: (id: string) => void;

  onReject?: (id: string) => void;

  onHide?: (formId: string) => void;
};

export default function ReportCard({
  report,
  onReview,
  onReject,
  onHide,
}: ReportCardProps) {
  return (
    
    <div className="p-6
             rounded-xl card-bx border transition-all  shadow-blue-500/50
             duration-300
            brdbx
             hover:-translate-y-1">
              
      {report.form.visibility === "DRAFT" && (

<Badge variant="secondary">

Hidden

</Badge>

)}

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          <h3 className="text-xl font-semibold">
            {report.form.title}
          </h3>

          <p className="text-sm text-muted-foreground">
            Reported by {report.reporter.fullName}
          </p>

        </div>

        <Badge
          variant={
            report.status === "PENDING"
              ? "secondary"
              : report.status === "REVIEWED"
              ? "default"
              : "destructive"
          }
        >
          {report.status}
        </Badge>

       

      </div>

      {/* Reason */}

      <div className="mt-5">

        <p className="font-medium">
          Reason
        </p>

        <p className="text-muted-foreground">
          {report.reason}
        </p>

      </div>

      {/* Description */}

      {report.description && (

        <div className="mt-4">

          <p className="font-medium">
            Description
          </p>

          <p className="text-muted-foreground">
            {report.description}
          </p>

        </div>

      )}

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between">

        <Link
          href={`/form/${report.form.id}`}
          target="_blank"
        >
          <Button variant="outline">
            View Form
          </Button>
        </Link>

        <div className="flex gap-2">

          {report.status === "PENDING" && (

<>
    <Button
        variant="secondary"
        onClick={() => onReview?.(report.id)}
    >
        Review
    </Button>

    <Button
        variant="destructive"
        onClick={() => onReject?.(report.id)}
    >
        Reject
    </Button>
</>

)}

{/* {report.status === "REVIEWED" && (

<Badge className="bg-green-600">
    Reviewed
</Badge>

)}

{report.status === "REJECTED" && (

<Badge variant="destructive">
    Rejected
</Badge>

)} */}

       
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() =>
              report.form.id &&
              onHide?.(report.form.id)
            }
          >
            Hide Form
          </Button>

        </div>

      </div>

    </div>
  );
}