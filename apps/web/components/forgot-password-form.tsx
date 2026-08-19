"use client"

import { useForm } from "react-hook-form"
import { cn } from "~/lib/utils"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field"
import { Input } from "~/components/ui/input"
import { useForgotPassword } from "~/hooks/api/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { env } from "~/env.js"
import { Turnstile } from "~/components/turnstile"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

type ForgotPasswordFormData = {
  email: string
}

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { forgotPasswordAsync } = useForgotPassword()
  const router = useRouter()

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>()

  const onSubmit = async (data: ForgotPasswordFormData) => {
    if (env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      return
    }

    await forgotPasswordAsync({
  email: data.email,
  turnstileToken: turnstileToken ?? undefined,
})

router.replace(
  `/reset-link-sent?email=${encodeURIComponent(data.email)}`
)
    
  }

  return (
    <>
    <div className={cn("flex flex-col gap-6", className)}>
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold">
              Forgot Password
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-5 w-full", className)}
      {...props}
    >
      <FieldGroup>
        <div className="text-center mb-4">
          {/* <h1 className="text-3xl font-semibold">Forgot Password</h1> */}
          <p className="text-muted-foreground mt-2">
            Enter your email to receive reset link
          </p>
        </div>

        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            placeholder="Enter email"
            className="h-12 rounded-xl"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message}
            </p>
          )}
        </Field>

        <Turnstile onVerify={setTurnstileToken} onExpire={() => setTurnstileToken(null)} />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 rounded-xl bg-[#55C96B] text-white"
        >
          Send Reset Link
        </Button>

        <p className="text-center text-sm">
          <Link href="/auth" className="text-[#55C96B]">
            Back to Login
          </Link>
        </p>
      </FieldGroup>
    </form>
    </CardContent>
    </Card>
    </div>
    </>
  )
}