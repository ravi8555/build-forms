"use client";

import Link from "next/link";
import { Compass, FileQuestion, House } from "lucide-react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default function NotFound() {
  return (
    <div className="body-bg min-h-screen flex flex-col">
      <Header />

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 -z-10">
          <div className="animate-pulse absolute top-16 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#55C96B]/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute top-1/3 left-0 h-[200px] w-[200px] rounded-full bg-[#ca9f00]/10 blur-3xl" />
        </div>

        {/* BADGE */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#55C96B]/30 bg-[#55C96B]/10 px-4 py-2 text-sm text-[#55C96B] mb-8">
          <FileQuestion className="h-4 w-4" />
          Error 404 • Page Not Found
        </div>

        {/* BIG 404 */}
        <h1 className="text-7xl md:text-9xl font-black leading-none tracking-tight">
          <span className="title-font-color drop-shadow-[0_0_25px_rgba(85,201,107,0.35)]">
            404
          </span>
        </h1>

        {/* MESSAGE */}
        <h2 className="mt-6 text-2xl md:text-3xl font-bold">
          This page seems to have wandered off
        </h2>

        <p className="mt-4 max-w-xl text-lg text-muted-foreground leading-8">
          The page you&apos;re looking for was moved, renamed, deleted — or maybe never
          existed. Don&apos;t worry, your forms are safe and waiting for you.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="
              h-14
              px-8
              rounded-md
              greenBg
              text-white
              font-semibold
              inline-flex
              items-center
              justify-center
              gap-2
              hover:scale-105
              transition-all
            "
          >
            <House className="h-5 w-5" />
            Back to Home
          </Link>

          <Link
            href="/explore"
            className="
              h-14
              px-8
              rounded-md
              border
              border-border
              card-bx
              font-semibold
              inline-flex
              items-center
              justify-center
              gap-2
              hover:scale-105
              transition-all
            "
          >
            <Compass className="h-5 w-5" />
            Explore Public Forms →
          </Link>
        </div>

        {/* QUICK LINKS */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span>Helpful links:</span>
          <Link href="/" className="hover:text-[#55C96B] transition-colors">
            Home
          </Link>
          <span aria-hidden="true">•</span>
          <Link href="/explore" className="hover:text-[#55C96B] transition-colors">
            Explore
          </Link>
          <span aria-hidden="true">•</span>
          <Link href="/pricing" className="hover:text-[#55C96B] transition-colors">
            Pricing
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
