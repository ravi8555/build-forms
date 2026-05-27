// "use client"

// import { useSearchParams, useRouter } from "next/navigation"
// import { useEffect, useState } from "react"
// import { trpc } from "~/trpc/client"
// import { Button } from "~/components/ui/button"

// export default function VerifyEmailPage() {
//   const searchParams = useSearchParams()
//   const router = useRouter()

//   const token = searchParams.get("token")

//   const [status, setStatus] = useState<
//     "loading" | "success" | "expired" | "invalid"
//   >("loading")

//   const verifyEmailMutation = trpc.auth.verifyEmail.useMutation()
//   const resendMutation = trpc.auth.resendVerificationEmail.useMutation()

//   useEffect(() => {
//     async function verify() {
//       if (!token) {
//         setStatus("invalid")
//         return
//       }

//       try {
//         await verifyEmailMutation.mutateAsync({
//           token,
//         })

//         setStatus("success")

//         setTimeout(() => {
//           router.replace("/login")
//         }, 2000)
//       } catch (error: any) {
//         if (
//           error.message.includes("VERIFICATION_TOKEN_EXPIRED")
//         ) {
//           setStatus("expired")
//         } else {
//           setStatus("invalid")
//         }
//       }
//     }

//     verify()
//   }, [token])

//   const handleResend = async () => {
//     const email = prompt("Enter your email")

//     if (!email) return

//     await resendMutation.mutateAsync({
//       email,
//     })

//     alert("Verification email sent")
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-md rounded-xl border p-8 text-center space-y-4">
//         {status === "loading" && (
//           <>
//             <h1 className="text-2xl font-semibold">
//               Verifying your email...
//             </h1>
//           </>
//         )}

//         {status === "success" && (
//           <>
//             <h1 className="text-2xl font-semibold text-green-600">
//               Email verified successfully
//             </h1>
//             <p>Redirecting to login...</p>
//           </>
//         )}

//         {status === "expired" && (
//           <>
//             <h1 className="text-2xl font-semibold text-red-500">
//               Verification link expired
//             </h1>

//             <Button
//               onClick={handleResend}
//               className="bg-[#55C96B]"
//             >
//               Send New Verification Link
//             </Button>
//           </>
//         )}

//         {status === "invalid" && (
//           <>
//   <h1 className="text-2xl font-semibold text-[#55C96B]">
//     Email may already be verified
//   </h1>

//   <p className="text-muted-foreground">
//     This verification link is invalid or has already been used.
//   </p>

//   <Button
//     onClick={() => router.replace("/login")}
//     className="bg-[#55C96B]"
//   >
//     Go to Login
//   </Button>
// </>
//         )}
//       </div>
//     </div>
//   )
// }


"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useResetPassword } from "~/hooks/api/auth";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { resetPasswordAsync } = useResetPassword();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!token) {
      alert("Invalid reset link");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await resetPasswordAsync({
        token,
        password,
      });

      router.replace("/login");
    } catch (error) {
      console.error(error);
      alert("Reset password failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-svh place-items-center px-6">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Reset Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#55C96B] hover:bg-[#49b85f]"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}