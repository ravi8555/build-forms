"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown, X } from "lucide-react";

import { useAuth } from "~/app/AuthProvider";
import { useSubscription } from "~/hooks/api/billing";

const DISMISSED_KEY = "buildforms.upgrade-banner.dismissed";

/**
 * Dashboard notification shown when a free-plan user reaches a usage
 * limit (forms owned or responses this month). The CTA leads to the
 * payment page (/dashboard/billing) where the existing Razorpay checkout
 * button lives. The banner is hidden on the billing page itself (which
 * stays untouched) and can be dismissed for the current session.
 */
export function UpgradeBanner() {
  const pathname = usePathname();
  const { user, isLoading: authLoading } = useAuth();
  const { subscription, isLoading } = useSubscription(!!user && !authLoading);

  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISSED_KEY) === "1") {
        setDismissed(true);
      }
    } catch {
      // Storage unavailable (private mode etc.) — just show the banner.
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Ignore persistence failures.
    }
  };

  if (dismissed || isLoading || !subscription) return null;

  // Keep the existing billing page as-is — no duplicate banner there.
  if (pathname.startsWith("/dashboard/billing")) return null;

  // Already on a paid plan — nothing to upsell.
  if (subscription.plan === "pro" && subscription.status === "active") {
    return null;
  }

  const { forms, responses } = subscription.usage;
  const formsExceeded = forms.limit !== null && forms.used >= forms.limit;
  const responsesExceeded =
    responses.limit !== null && responses.used >= responses.limit;

  if (!formsExceeded && !responsesExceeded) return null;

  const reasons: string[] = [];
  if (formsExceeded) {
    reasons.push(`all ${forms.limit} free forms are in use`);
  }
  if (responsesExceeded) {
    reasons.push(
      `your forms have received ${responses.used} responses this month (free limit: ${responses.limit} per form)`
    );
  }

  return (
    <div className="mx-6 mt-2 mb-2 flex items-start gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3">
      <Crown className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />

      <div className="flex-1 text-left">
        <p className="text-sm font-semibold">Free plan limit reached</p>
        <p className="text-sm text-muted-foreground">
          {reasons.join(" and ")}. Upgrade to Pro for unlimited forms and
          10,000 responses per form.
        </p>
      </div>

      <Link
        href="/dashboard/billing?plan=pro"
        className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#55C96B] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#49b85f]"
      >
        <Crown className="h-4 w-4" />
        Upgrade to Pro
      </Link>

      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss upgrade notification"
        className="shrink-0 cursor-pointer rounded-md p-1 text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
