    // "use client";

    // import { cn } from "~/lib/utils";
    // import { Button } from "~/components/ui/button";
    // import {
    //   Card,
    //   CardContent,
    //   CardDescription,
    //   CardHeader,
    //   CardTitle,
    // } from "~/components/ui/card";
    // import {
    //   Field,
    //   FieldDescription,
    //   FieldGroup,
    //   FieldLabel,
    // } from "~/components/ui/field";
    // import { Input } from "~/components/ui/input";
    // import { useForm } from "react-hook-form";
    // import { useRouter } from "next/navigation";
    // import { useSignIn } from "~/hooks/api/auth";
    // import Link from "next/link";

    // type LoginFormData = {
    //   email: string;
    //   password: string;
    // };

    // export function LoginForm({
    //   className,
    //   ...props
    // }: React.ComponentProps<"div">) {
    //   const router = useRouter();
    //   const { signInwithEmailAndPasswordAsync } = useSignIn();

    //   const {
    //     register,
    //     handleSubmit,
    //     formState: { errors, isSubmitting },
    //   } = useForm<LoginFormData>();

    //   const onSubmit = async (data: LoginFormData) => {
    //     try {
    //       await signInwithEmailAndPasswordAsync({
    //         email: data.email,
    //         password: data.password,
    //       });

    //       router.replace("/dashboard");
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };

    //   return (
    //     <div className={cn("flex flex-col", className)} {...props}>
    //       <Card className="border-0 shadow-none bg-transparent">
    //         <CardHeader className="text-center">
    //           <CardTitle className="text-3xl font-semibold">
    //             Sign in
    //           </CardTitle>
    //           <CardDescription className="text-muted-foreground">
    //             Welcome back. Enter your credentials to continue.
    //           </CardDescription>
    //         </CardHeader>

    //         <CardContent>
    //           <form
    //             noValidate
    //             onSubmit={handleSubmit(onSubmit)}
    //           >
    //             <FieldGroup className="space-y-5">
    //               <Field>
    //                 <FieldLabel htmlFor="email">Email</FieldLabel>

    //                 <Input
    //                   id="email"
    //                   type="email"
    //                   placeholder="Enter email"
    //                   className={cn(
    //                     "h-12 rounded-md border transition-all",
    //                     errors.email
    //                       ? "border-red-400 focus-visible:ring-red-400"
    //                       : "border-gray-300 focus-visible:ring-[#55C96B]"
    //                   )}
    //                   {...register("email", {
    //                     required: "Email is required",
    //                     pattern: {
    //                       value: /^\S+@\S+\.\S+$/,
    //                       message: "Please enter a valid email address",
    //                     },
    //                   })}
    //                 />

    //                 {errors.email && (
    //                   <p className="text-sm text-red-500 font-medium text-right">
    //                     {errors.email.message}
    //                   </p>
    //                 )}
    //               </Field>

    //               <Field>
    //                 <div className="flex items-center">
    //                   <FieldLabel htmlFor="password">Password</FieldLabel>

    //                   <a
    //                     href="/forgot-password"
    //                     className="ml-auto text-sm text-[#55C96B] hover:underline"
    //                   >
    //                     Forgot password?
    //                   </a>
    //                 </div>

    //                 <Input
    //                   id="password"
    //                   type="password"
    //                   placeholder="Enter password"
    //                   className={cn(
    //                     "h-12 rounded-md border transition-all",
    //                     errors.password
    //                       ? "border-red-400 focus-visible:ring-red-400"
    //                       : "border-gray-300 focus-visible:ring-[#55C96B]"
    //                   )}
    //                   {...register("password", {
    //                     required: "Password is required",
    //                     minLength: {
    //                       value: 8,
    //                       message: "Password must be at least 8 characters",
    //                     },
    //                   })}
    //                 />

    //                 {errors.password && (
    //                   <p className="text-sm text-red-500 font-medium text-right">
    //                     {errors.password.message}
    //                   </p>
    //                 )}
    //               </Field>

    //               <Field className="space-y-4">
    //                 <Button
    //                   type="submit"
    //                   disabled={isSubmitting}
    //                   className="h-12 w-full rounded-md bg-[#55C96B] hover:bg-[#49b85f] text-white"
    //                 >
    //                   {isSubmitting ? "Signing in..." : "Sign in"}
    //                 </Button>

    //                 <Button
    //                   variant="outline"
    //                   type="button"
    //                   className="h-12 w-full rounded-md border-gray-300"
    //                 >
    //                   Sign in with SSO (OIDC)
    //                 </Button>

    //                 <FieldDescription className="text-center text-sm text-gray-500">
    //                   Don&apos;t have an account?{" "}
    //                   <Link
    //                     href="/signup"
    //                     className="text-[#55C96B] font-medium"
    //                   >
    //                     Sign up
    //                   </Link>
    //                 </FieldDescription>
    //               </Field>
    //             </FieldGroup>
    //           </form>
    //         </CardContent>
    //       </Card>
    //     </div>
    //   );
    // }


    "use client";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSignIn } from "~/hooks/api/auth";
import { trpc } from "~/trpc/client";
import Link from "next/link";
import { useState } from "react";

type LoginFormData = {
  email: string;
  password: string;
};
type LoginFormProps = React.ComponentProps<"div"> & {
  onSwitchToSignup: () => void;
};

export function LoginForm({
  className,
  onSwitchToSignup,
  ...props
}: LoginFormProps) {
  const router = useRouter();

  const { signInwithEmailAndPasswordAsync } = useSignIn();

  const resendVerificationMutation =
    trpc.auth.resendVerificationEmail.useMutation();

  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError("");

      await signInwithEmailAndPasswordAsync({
        email: data.email,
        password: data.password,
      });

      router.replace("/dashboard");
    } catch (error: any) {
      if (error.message.includes("EMAIL_NOT_VERIFIED")) {
        setLoginEmail(data.email);
        setShowVerifyPopup(true);
        return;
      }

      setServerError("Invalid email or password");
    }
  };

  const handleResendVerification = async () => {
    try {
      await resendVerificationMutation.mutateAsync({
        email: loginEmail,
      });
      setTimeout(()=>{
router.replace(
  `/verify-email-sent?email=${encodeURIComponent(loginEmail)}`
)
      },10000)
 
     
      // alert("Verification email sent successfully");
      setShowVerifyPopup(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={cn("flex flex-col gap-6 p-0", className)} {...props}>
        <Card className="border-0 shadow-none bg-transparent">
                     
            {/* <CardDescription>
              Welcome back. Enter your credentials.
            </CardDescription> */}
         
          <CardContent>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup className="">
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    className={cn(
                      "h-12 rounded-lg border transition-all",
                      errors.email
                        ? "border-red-400 focus-visible:ring-red-400"
                        : "focus-visible:ring-[#55C96B]"
                    )}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter valid email",
                      },
                    })}
                  />

                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500 font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Password</FieldLabel>

                  <Input
                    type="password"
                    placeholder="Enter password"
                    className={cn(
                      "h-12 rounded-lg border transition-all",
                      errors.password
                        ? "border-red-400 focus-visible:ring-red-400"
                        : "focus-visible:ring-[#55C96B]"
                    )}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
  <a href="/forgot-password" className="ml-auto text-sm text-[#55C96B] hover:underline"
                       >
                         Forgot password?
                       </a>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-500 font-medium">
                      {errors.password.message}
                    </p>
                  )}
                </Field>

                {serverError && (
                  <p className="text-sm text-red-500 font-medium">
                    {serverError}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 rounded-md cursor-pointer bg-[#55C96B] hover:bg-[#49b85f] text-white"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>

                {/* <Button
                  variant="outline"
                  type="button"
                  className="h-12 rounded-md  border-gray-300  bg-white hover:bg-gray-50"
                >
                  Sign in with SSO (OIDC)
                </Button> */}

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  

                  <button className="cursor-pointer text-green-500"
  type="button"
  onClick={onSwitchToSignup}
>
  Sign Up
</button>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Verification Popup */}
      {showVerifyPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background text-foreground rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold text-[#55C96B]">
              Email Verification Required
            </h2>

            <p className="mt-3 text-muted-foreground">
              Your email is not verified yet.
              Please verify your email before signing in.
            </p>

            <div className="mt-6 flex gap-3">
              <Button
                onClick={() => setShowVerifyPopup(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>

              <Button
                onClick={handleResendVerification}
                className="flex-1 bg-[#55C96B]"
              >
                Send New Link
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}