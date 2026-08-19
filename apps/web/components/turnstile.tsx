"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

import { env } from "~/env.js";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

type TurnstileProps = {
  onVerify: (token: string) => void;
  onExpire?: () => void;
};

export function Turnstile({ onVerify, onExpire }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  onVerifyRef.current = onVerify;
  onExpireRef.current = onExpire;

  const siteKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const renderWidget = useCallback(() => {
    if (!siteKey || !containerRef.current || !window.turnstile) return;
    if (widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token: string) => {
        onVerifyRef.current(token);
      },
      "expired-callback": () => {
        onExpireRef.current?.();
      },
      "error-callback": () => {
        onExpireRef.current?.();
      },
      theme: "auto",
    });
  }, [siteKey]);

  // Render immediately if the script was already loaded (e.g. re-mount).
  useEffect(() => {
    if (window.turnstile) {
      renderWidget();
    }
  }, [renderWidget]);

  // Clean up the widget on unmount.
  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore cleanup errors
        }
      }
      widgetIdRef.current = null;
    };
  }, []);

  // If Turnstile is not configured, render nothing and don't block submission.
  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => renderWidget()}
      />
      <div
        ref={containerRef}
        className="turnstile-widget w-full empty:min-h-[65px]"
      />
    </>
  );
}
