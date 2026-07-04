"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "~/hooks/api/auth";
import { LoadingSpinner } from "~/components/LoadingSpinner";
console.log("Guest Routes")

export default function GuestRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { user, isLoading } = useUser();
  console.log({
  user,
  isLoading,
});

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
}