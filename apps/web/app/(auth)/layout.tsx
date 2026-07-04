"use client";

import GuestRoute from "./GuestRoute";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestRoute>
      {children}
    </GuestRoute>
  );
}