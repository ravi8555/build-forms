"use client";

import { createContext, useContext,useMemo } from "react";
import { useUser } from "~/hooks/api/auth";

import { usePathname } from "next/navigation";

const AuthContext = createContext<any>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  
const pathname = usePathname();

const shouldFetchUser =
  pathname.startsWith("/dashboard") ||
  pathname.startsWith("/admin") ;
  // pathname.startsWith("/auth");
  // const auth = useUser();
  
  const query = useUser(shouldFetchUser);

const value = useMemo(
  () => ({
    user: query.user,
    isLoading: query.isLoading,
    refetch: query.refetch,
  }),
  [query.user, query.isLoading]
);


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}