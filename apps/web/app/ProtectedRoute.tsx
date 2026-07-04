"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "~/hooks/api/auth";
import { LoadingSpinner } from "~/components/LoadingSpinner";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading:userIsloading } = useUser();

  useEffect(() => {
    if (!userIsloading && !user) {
      router.replace("/auth");
    }
  }, [user, userIsloading, router]);

  if (userIsloading) {
    return <div> <LoadingSpinner /></div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}