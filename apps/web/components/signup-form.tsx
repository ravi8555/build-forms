
"use client";

import { useForm } from "react-hook-form";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
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
import { useSignup } from "~/hooks/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const { createUserWithEmailAndPasswordAsync } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    try {
      
      await createUserWithEmailAndPasswordAsync({
        email: data.email,
        fullName: data.name,
        password: data.password,
      });

      
      // router.replace('/verify-email')
router.replace(
  `/verify-email-sent?email=${encodeURIComponent(data.email)}`
)
    } catch (err: any) {
  //   console.log("FULL ERROR:", err);
  // console.log("DATA:", err?.data);
  // console.log("SHAPE:", err?.shape);
  // toast.error("Signup failed");

  const errorCode =
    err?.data?.code || err?.shape?.data?.code;

  if (
    err?.data?.code === "CONFLICT" ||
    err?.shape?.data?.code === "CONFLICT"
  ) {
    toast.error("Email already registered");
    return;
  }

  toast.error("Signup failed. Please try again.");
}

  };

  return (
<>  
<div className={cn("flex flex-col gap-6", className)}>
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold">
              Sign Up
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-5 w-full", className)}
      {...props}
    >
      <FieldGroup>
       
       <Field>
  <FieldLabel htmlFor="name">Full Name</FieldLabel>
  <Input
    id="name"
    placeholder="John Doe"
    className={cn(
      "h-12 rounded-xl border transition-all",
      errors.name
        ? "border-red-400 focus-visible:ring-red-400"
        : "border-gray-300 focus-visible:ring-[#55C96B]"
    )}
    {...register("name", {
      required: "Full name is required",
    })}
  />

  {errors.name && (
    <p className=" text-sm text-red-500 font-medium text-right">
      {errors.name.message}
    </p>
  )}
</Field>

      <Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input
    id="email"
    type="email"
    placeholder="Enter email"
    className={cn(
      "h-12 rounded-xl border transition-all",
      errors.email
        ? "border-red-400 focus-visible:ring-red-400"
        : "border-gray-300 focus-visible:ring-[#55C96B]"
    )}
    {...register("email", {
      required: "Email is required",
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: "Please enter a valid email address",
      },
    })}
  />

  {errors.email && (
    <p className=" text-sm text-red-500 font-medium text-right">
      {errors.email.message}
    </p>
  )}
</Field>

      <Field>
  <FieldLabel htmlFor="password">Password</FieldLabel>
  <Input
    id="password"
    type="password"
    placeholder="Enter password"
    className={cn(
      "h-12 rounded-xl border transition-all",
      errors.password
        ? "border-red-400 focus-visible:ring-red-400"
        : "border-gray-300 focus-visible:ring-[#55C96B]"
    )}
    {...register("password", {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
    })}
  />

  {errors.password && (
    <p className=" text-sm text-red-500 font-medium text-right">
      {errors.password.message}
    </p>
  )}
</Field>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 rounded-xl bg-[#55C96B] hover:bg-[#49b85f] text-white"
        >
          {isSubmitting ? "Creating..." : "Create my free account"}
        </Button>

        <Button
                  variant="outline"
                  type="button"
                  className="h-12 w-full rounded-xl border-gray-300"
                >
                  Sign in with SSO (OIDC)
                </Button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-[#55C96B] font-medium">
            Sign in
          </Link>
        </p>
      </FieldGroup>
    </form>
          </CardContent>
          </Card>
          </div>
          
    
    















{/* 
    <form noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-5 w-full", className)}
      {...props}
    >
      <FieldGroup>
       
       <Field>
  <FieldLabel htmlFor="name">Full Name</FieldLabel>
  <Input
    id="name"
    placeholder="John Doe"
    className={cn(
      "h-12 rounded-xl border transition-all",
      errors.name
        ? "border-red-400 focus-visible:ring-red-400"
        : "border-gray-300 focus-visible:ring-[#55C96B]"
    )}
    {...register("name", {
      required: "Full name is required",
    })}
  />

  {errors.name && (
    <p className=" text-sm text-red-500 font-medium text-right">
      {errors.name.message}
    </p>
  )}
</Field>

      <Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input
    id="email"
    type="email"
    placeholder="Enter email"
    className={cn(
      "h-12 rounded-xl border transition-all",
      errors.email
        ? "border-red-400 focus-visible:ring-red-400"
        : "border-gray-300 focus-visible:ring-[#55C96B]"
    )}
    {...register("email", {
      required: "Email is required",
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: "Please enter a valid email address",
      },
    })}
  />

  {errors.email && (
    <p className=" text-sm text-red-500 font-medium text-right">
      {errors.email.message}
    </p>
  )}
</Field>

      <Field>
  <FieldLabel htmlFor="password">Password</FieldLabel>
  <Input
    id="password"
    type="password"
    placeholder="Enter password"
    className={cn(
      "h-12 rounded-xl border transition-all",
      errors.password
        ? "border-red-400 focus-visible:ring-red-400"
        : "border-gray-300 focus-visible:ring-[#55C96B]"
    )}
    {...register("password", {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
    })}
  />

  {errors.password && (
    <p className=" text-sm text-red-500 font-medium text-right">
      {errors.password.message}
    </p>
  )}
</Field>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 rounded-xl bg-[#55C96B] hover:bg-[#49b85f] text-white"
        >
          {isSubmitting ? "Creating..." : "Create my free account"}
        </Button>

        <Button
                  variant="outline"
                  type="button"
                  className="h-12 w-full rounded-xl border-gray-300"
                >
                  Sign in with SSO (OIDC)
                </Button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-[#55C96B] font-medium">
            Sign in
          </Link>
        </p>
      </FieldGroup>
    </form> */}
    </>
  );
}
