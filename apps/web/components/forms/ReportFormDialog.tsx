"use client";

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "~/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

import { useCreateReport } from "~/hooks/api/form";
import { toast } from "sonner";

type ReportFormDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    formId: string;
};

const reasons = [
    "Spam",
    "Offensive Content",
    "Adult Content",
    "Hate Speech",
    "Scam / Fraud",
    "Copyright",
    "Harassment",
    "Other",
];

export default function ReportFormDialog({
    open,
    onOpenChange,formId
}: ReportFormDialogProps) {

    const [reason, setReason] = useState("");

    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const {
    createReportAsync,
    isPending,
} = useCreateReport();

const handleSubmit = async () => {

    if (submitting) return;

    setSubmitting(true);

    try {

        await createReportAsync({
            formId,
            reason,
            description,
        });

        toast.success(
            "Thanks! Our moderators will review this report."
        );

        onOpenChange(false);

    } catch (err) {

        toast.error("Unable to submit report.");

    } finally {

        setSubmitting(false);

    }

};

    return (

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent>

                <DialogHeader>

                    <DialogTitle>
                        🚩 Report Form
                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    <div>

                        <label className="text-sm font-medium">
                            Reason
                        </label>

                        <Select
                            value={reason}
                            onValueChange={setReason}
                        >

                            <SelectTrigger className="mt-2">

                                <SelectValue
                                    placeholder="Choose reason"
                                />

                            </SelectTrigger>

                            <SelectContent>

                                {reasons.map((item) => (

                                    <SelectItem
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </SelectItem>

                                ))}

                            </SelectContent>

                        </Select>

                    </div>

                    <div>

                        <label className="text-sm font-medium">

                            Description

                        </label>

                        <Textarea
                            className="mt-2"
                            rows={4}
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            placeholder="Tell us more..."
                        />

                    </div>

                </div>

                <DialogFooter>

                    <Button
                        variant="outline"
                        onClick={() =>
                            onOpenChange(false)
                        }
                    >
                        Cancel
                    </Button>

                    <Button
    disabled={!reason || submitting}
    onClick={handleSubmit}
>
    {submitting
        ? "Submitting..."
        : "Submit Report"}
</Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );
}