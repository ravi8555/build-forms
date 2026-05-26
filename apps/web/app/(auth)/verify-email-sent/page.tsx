"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { MailCheck } from "lucide-react"

export default function VerifyEmailSentPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  return (
    <div className="grid min-h-svh place-items-center px-6">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#55C96B]/10">
          <MailCheck className="h-7 w-7 text-[#55C96B]" />
        </div>

        <h1 className="text-2xl font-semibold mb-3">
          Verify your email
        </h1>

        <p className="text-muted-foreground mb-6">
          We've sent a verification link to
          <br />
          <span className="font-medium text-foreground">
            {email}
          </span>
        </p>

        <p className="text-sm text-muted-foreground mb-6">
          Please check your inbox and spam folder.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="h-11 rounded-xl bg-[#55C96B] text-white flex items-center justify-center hover:bg-[#49b85f]"
          >
            Back to Login
          </Link>

          {/* <Link
            href="/resend-verification"
            className="text-sm text-[#55C96B]"
          >
            Resend verification email
          </Link> */}
        </div>
      </div>
    </div>
  )
}