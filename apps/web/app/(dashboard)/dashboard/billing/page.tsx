"use client";

import { useAuth } from "~/app/AuthProvider";
import { CancelSubscriptionButton } from "~/components/billing/cancel-subscription-button";
import { UpgradeButton } from "~/components/billing/upgrade-button";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useSubscription } from "~/hooks/api/billing";

export default function BillingPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { subscription, isLoading } = useSubscription(!!user && !authLoading);

  if (authLoading || isLoading) {
    return (
      <div className="p-6 text-muted-foreground">Loading billing info...</div>
    );
  }

  if (!subscription) return null;

  const isProActive =
    subscription.plan === "pro" && subscription.status === "active";

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-4xl font-bold title-font-color">Billing</h1>
        <p className="text-muted-foreground mt-2">
          Manage your subscription and usage.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="rounded-xl card-bx brdbx">
          <CardHeader>
            <CardTitle>Current plan</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">
                {isProActive ? "Professional" : "Starter (Free)"}
              </span>
              <Badge variant={isProActive ? "default" : "secondary"}>
                {subscription.status}
              </Badge>
            </div>

            {subscription.renewsAt && (
              <p className="text-sm text-muted-foreground">
                Renews on{" "}
                {new Date(subscription.renewsAt).toLocaleDateString()}
              </p>
            )}

            {isProActive ? (
              <CancelSubscriptionButton />
            ) : (
              <UpgradeButton plan="pro" />
            )}
          </CardContent>
        </Card>

        <Card className="rounded-xl card-bx brdbx">
          <CardHeader>
            <CardTitle>Monthly usage</CardTitle>
          </CardHeader>
          <CardContent>
            {subscription.usage.limit === null ? (
              <div>
                <p className="text-3xl font-bold">
                  {subscription.usage.used}
                </p>
                <p className="text-sm text-muted-foreground">
                  responses this month (unlimited on Pro)
                </p>
              </div>
            ) : (
              <div>
                <p className="text-3xl font-bold">
                  {subscription.usage.used}{" "}
                  <span className="text-lg font-normal text-muted-foreground">
                    / {subscription.usage.limit}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  responses this month (free plan limit)
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
