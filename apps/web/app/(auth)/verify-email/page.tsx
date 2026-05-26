"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { trpc } from "~/trpc/client"
import { Button } from "~/components/ui/button"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get("token")

  const [status, setStatus] = useState<
    "loading" | "success" | "expired" | "invalid"
  >("loading")

  const verifyEmailMutation = trpc.auth.verifyEmail.useMutation()
  const resendMutation = trpc.auth.resendVerificationEmail.useMutation()

  useEffect(() => {
    async function verify() {
      if (!token) {
        setStatus("invalid")
        return
      }

      try {
        await verifyEmailMutation.mutateAsync({
          token,
        })

        setStatus("success")

        setTimeout(() => {
          router.replace("/login")
        }, 2000)
      } catch (error: any) {
        if (
          error.message.includes("VERIFICATION_TOKEN_EXPIRED")
        ) {
          setStatus("expired")
        } else {
          setStatus("invalid")
        }
      }
    }

    verify()
  }, [token])

  const handleResend = async () => {
    const email = prompt("Enter your email")

    if (!email) return

    await resendMutation.mutateAsync({
      email,
    })

    alert("Verification email sent")
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-xl border p-8 text-center space-y-4">
        {status === "loading" && (
          <>
            <h1 className="text-2xl font-semibold">
              Verifying your email...
            </h1>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-semibold text-green-600">
              Email verified successfully
            </h1>
            <p>Redirecting to login...</p>
          </>
        )}

        {status === "expired" && (
          <>
            <h1 className="text-2xl font-semibold text-red-500">
              Verification link expired
            </h1>

            <Button
              onClick={handleResend}
              className="bg-[#55C96B]"
            >
              Send New Verification Link
            </Button>
          </>
        )}

        {status === "invalid" && (
          <>
  <h1 className="text-2xl font-semibold text-[#55C96B]">
    Email may already be verified
  </h1>

  <p className="text-muted-foreground">
    This verification link is invalid or has already been used.
  </p>

  <Button
    onClick={() => router.replace("/login")}
    className="bg-[#55C96B]"
  >
    Go to Login
  </Button>
</>
        )}
      </div>
    </div>
  )
}