"use client";

import React from "react";
import Link from "next/link";
import { openCookiePreferences } from "~/components/CookieConsent";

const Footer = () => {
  return (
    <footer className="text-center pb-2 bg-background mt-0 text-10">
      <div className="flex flex-wrap items-center justify-center gap-4 pb-2 text-xs text-muted-foreground">
        <Link href="/privacy-policy" className="underline-offset-2 hover:underline">
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" className="underline-offset-2 hover:underline">
          Terms of Service
        </Link>
        <button
          type="button"
          onClick={openCookiePreferences}
          className="underline-offset-2 hover:underline"
        >
          Cookie Settings
        </button>
      </div>
      <p className="text-foreground">
        © Copyright BuildForms 2026
      </p>
    </footer>
  );
};

export default Footer;
