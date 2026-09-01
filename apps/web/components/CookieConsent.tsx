"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Switch } from "~/components/ui/switch";

export const COOKIE_CONSENT_KEY = "cookie-consent";

type ConsentState = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

const DEFAULT_STATE: ConsentState = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
  decidedAt: "",
};

export function openCookiePreferences() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("open-cookie-preferences"));
  }
}

function ConsentRow({
  label,
  description,
  checked,
  disabled,
  onCheckedChange,
}: {
  label: string;
  description: string;
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
      <div>
        <p className="font-medium">
          {label}
          {disabled && (
            <span className="ml-2 text-xs text-muted-foreground">(always on)</span>
          )}
        </p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [state, setState] = useState<ConsentState>(DEFAULT_STATE);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored) {
        setState(JSON.parse(stored));
      } else {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }

    const handler = () => setVisible(true);
    window.addEventListener("open-cookie-preferences", handler);
    return () => window.removeEventListener("open-cookie-preferences", handler);
  }, []);

  const saveConsent = useCallback((next: ConsentState) => {
    const value: ConsentState = { ...next, decidedAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(value));
    } catch {
      // ignore storage errors
    }
    setState(value);
    setVisible(false);
    setPrefsOpen(false);
  }, []);

  const acceptAll = () =>
    saveConsent({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      decidedAt: "",
    });

  const rejectAll = () => saveConsent({ ...DEFAULT_STATE });

  const saveCustom = () => saveConsent({ ...state });

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-50 p-4">
        <div className="mx-auto w-full max-w-3xl rounded-xl border p-5 shadow-lg" style={{background:"#132039"}}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="text-base font-semibold">We value your privacy</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We use cookies to enhance your browsing experience, serve
                personalized content, and analyze our traffic. By clicking
                &quot;Accept All&quot;, you consent to our use of cookies.{" "}
                <Link href="/privacy-policy" className="underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button variant="outline" onClick={() => setPrefsOpen(true)}>
                Customize
              </Button>
              <Button variant="outline" onClick={rejectAll}>
                Reject All
              </Button>
              <Button onClick={acceptAll}>Accept All</Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={prefsOpen} onOpenChange={setPrefsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Choose which cookies you allow. Necessary cookies are required
              for the website to function and cannot be disabled.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 py-2">
            <ConsentRow
              label="Necessary"
              description="Required for the website to function (authentication, security)."
              checked
              disabled
            />
            <ConsentRow
              label="Functional"
              description="Enable personalized features such as language and region settings."
              checked={state.functional}
              onCheckedChange={(v) => setState({ ...state, functional: v })}
            />
            <ConsentRow
              label="Analytics"
              description="Help us understand how visitors use the website."
              checked={state.analytics}
              onCheckedChange={(v) => setState({ ...state, analytics: v })}
            />
            <ConsentRow
              label="Marketing"
              description="Used to deliver relevant ads and track campaign effectiveness."
              checked={state.marketing}
              onCheckedChange={(v) => setState({ ...state, marketing: v })}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={rejectAll}>
              Reject All
            </Button>
            <Button onClick={saveCustom}>Save Preferences</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
