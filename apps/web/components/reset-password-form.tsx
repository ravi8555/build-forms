"use client"
import { Suspense } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field"
import { Input } from "~/components/ui/input"

import { useResetPassword } from "~/hooks/api/auth"

type ResetPasswordFormData = {
  password: string
  confirmPassword: string
}

export function ResetPasswordFormContent({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get("token")

  const { resetPasswordAsync } = useResetPassword()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>()

  const password = watch("password")

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      alert("Invalid reset link")
      return
    }

    try {
      await resetPasswordAsync({
        token,
        password: data.password,
      })

      router.replace("/login")
    } catch (err) {
      console.error(err)
      alert("Reset link expired or invalid")
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-5 w-full", className)}
      {...props}
    >
      <FieldGroup>
        <div className="text-center mb-4">
          <h1 className="text-3xl font-semibold">
            Reset Password
          </h1>

          <p className="text-muted-foreground mt-2">
            Enter your new password
          </p>
        </div>

        <Field>
          <FieldLabel>Password</FieldLabel>

          <Input
            type="password"
            placeholder="Enter new password"
            className="h-12 rounded-xl"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters required",
              },
            })}
          />

          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </Field>

        <Field>
          <FieldLabel>Confirm Password</FieldLabel>

          <Input
            type="password"
            placeholder="Confirm password"
            className="h-12 rounded-xl"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </Field>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 rounded-xl bg-[#55C96B] hover:bg-[#49b85f] text-white"
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </Button>

        <p className="text-center text-sm">
          <Link
            href="/login"
            className="text-[#55C96B] font-medium"
          >
            Back to Login
          </Link>
        </p>
      </FieldGroup>
    </form>
  )
}

export function ResetPasswordForm(){
  return(

    <Suspense fallback={<div>Loading...</div>}>
    <ResetPasswordFormContent />
  </Suspense>
  )
}