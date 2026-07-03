"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { Button } from "~/components/ui/button";

import { Flag } from "lucide-react";

import { useSnackbar } from "notistack";

import { useCreateReport } from "~/hooks/api/form";

type Props = {
  formId: string;
};

export default function ReportFormDialog({
  formId,
}: Props) {
  const { enqueueSnackbar } =
    useSnackbar();

  const {
    createReportAsync,
    isPending,
  } = useCreateReport();

  const [reason, setReason] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [open, setOpen] =
    useState(false);

    return (
<Dialog
open={open}
onOpenChange={setOpen}
>

<DialogTrigger asChild>

<Button
variant="outline"
size="sm"
>

<Flag className="w-4 h-4 mr-2"/>

Report Form

</Button>

</DialogTrigger>

<DialogContent>

<DialogHeader>

<DialogTitle>

Report Form

</DialogTitle>

</DialogHeader>

<textarea
rows={4}
value={description}
onChange={(e)=>

setDescription(e.target.value)

}
className="w-full border rounded-lg p-3 mt-4"
placeholder="Additional details..."
/>

<Button
className="w-full mt-4"
disabled={isPending}
onClick={async()=>{

if(!reason){

enqueueSnackbar(
"Please select a reason",
{
variant:"warning"
}
);

return;

}

await createReportAsync({

formId,

reason,

description,

});

enqueueSnackbar(
"Report submitted",
{
variant:"success"
}
);

setOpen(false);

}}
>

Submit Report

</Button>

</DialogContent>

</Dialog>
);
}