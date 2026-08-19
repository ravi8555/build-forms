"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "~/app/AuthProvider";
import { openCookiePreferences } from "~/components/CookieConsent";
import { useDeleteMyAccount, useExportMyData } from "~/hooks/api/gdpr";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

export default function PrivacyPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { exportMyDataAsync, isPending: exporting } = useExportMyData();
  const { deleteMyAccountAsync, isPending: deleting } = useDeleteMyAccount();
  const [confirmOpen, setConfirmOpen] = useState(false);

  async function handleExport() {
    try {
      const data = await exportMyDataAsync();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `buildforms-my-data-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Your data export has been downloaded.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not export data.");
    }
  }

  async function handleDelete() {
    try {
      await deleteMyAccountAsync();
      setConfirmOpen(false);
      toast.success("Your account and data have been deleted.");
      router.replace("/auth");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete account.");
    }
  }

  if (authLoading) {
    return <div className="p-6 text-muted-foreground">Loading...</div>;
  }
  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-4xl font-bold title-font-color">Privacy &amp; Data</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal data and privacy preferences (GDPR).
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-xl card-bx brdbx">
          <CardHeader>
            <CardTitle>Download your data</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Export a copy of your profile, forms, submissions and reports as JSON.
            </p>
            <Button onClick={handleExport} disabled={exporting} variant="outline">
              {exporting ? "Preparing export…" : "Download my data"}
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl card-bx brdbx">
          <CardHeader>
            <CardTitle>Cookie preferences</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Manage the optional cookies we use for analytics and marketing.
            </p>
            <Button variant="outline" onClick={openCookiePreferences}>
              Open cookie settings
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl card-bx brdbx border-destructive/40">
        <CardHeader>
          <CardTitle className="text-destructive">Delete account</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all associated data (forms,
            submissions, reports). This action cannot be undone.
          </p>
          <Button
            variant="destructive"
            onClick={() => setConfirmOpen(true)}
            className="w-fit"
          >
            Delete my account
          </Button>
        </CardContent>
      </Card>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete account?</DialogTitle>
            <DialogDescription>
              This will permanently delete your account and all of your data.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting…" : "Yes, delete everything"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
