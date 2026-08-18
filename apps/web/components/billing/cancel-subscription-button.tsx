"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { useCancelSubscription } from "~/hooks/api/billing";

type CancelSubscriptionButtonProps = {
  disabled?: boolean;
};

export function CancelSubscriptionButton({
  disabled = false,
}: CancelSubscriptionButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { cancelSubscriptionAsync } = useCancelSubscription();

  async function handleCancel() {
    setLoading(true);

    try {
      await cancelSubscriptionAsync();
      toast.success(
        "Subscription canceled. Pro access continues until renewal date."
      );
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Could not cancel subscription.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleCancel}
      disabled={disabled || loading}
    >
      {loading ? "Canceling…" : "Cancel subscription"}
    </Button>
  );
}
