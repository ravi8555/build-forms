"use client";
// app/admin/reports/page.tsx


import Header from "~/components/Header";
import Footer from "~/components/Footer";
import ReportCard from "~/components/admin/ReportCard"

import { toast } from "sonner";
import { useListReports,useUpdateReportStatus, useHideReportedForm } from "~/hooks/api/form";
import { useAuth } from "~/app/AuthProvider"
export default function ReportsPage() {
          
const {hideReportedFormAsync,} = useHideReportedForm();  

const { user, isLoading } = useAuth();
// const { reports, isLoading: reportsLoading, } = useListReports();

const { reports } =  useListReports(!!user && !isLoading);
const { updateStatusAsync } =   useUpdateReportStatus();

if (!isLoading && user?.role !== "SUPER_ADMIN") {
    return (
        <div className="flex items-center justify-center h-screen">
            Access Denied
        </div>
    );
}
const updateReport = async (
  reportId: string,
  status: "REVIEWED" | "REJECTED"
) => {
  try {
    await updateStatusAsync({
      reportId,
      status,
    });

    toast.success(
      `Report ${status.toLowerCase()}.`
    );
  } catch {
    toast.error("Something went wrong.");
  }
};
return (

<div className="min-h-screen flex flex-col">
    
    

<Header/>

<main className="flex-1 max-w-7xl mx-auto w-full px-8 py-10">

<h1 className="text-4xl font-bold mb-6">

Reported Forms

</h1>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
{reports?.map((report) => (
    <ReportCard
        key={report.id}
        report={report}
        onReview={(id) => updateReport(id, "REVIEWED")}


onReject={(id) => updateReport(id, "REJECTED")}
        onHide={async (formId) => {

    try {

        await hideReportedFormAsync({
            formId,
        });

        await updateStatusAsync({

            reportId: report.id,

            status: "REVIEWED",

        });

        toast.success(
            "Form hidden."
        );

    } catch {

        toast.error(
            "Something went wrong."
        );

    }

}}

    />
))}

</div>



</main>

<Footer/>

</div>

);

}

