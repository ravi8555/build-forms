// "use client";

// import { useEffect } from "react";

// import { useRouter } from "next/navigation";

// import { LoadingSpinner } from "~/components/LoadingSpinner";

// import { useAuth } from "~/app/AuthProvider";

// export default function GuestRoute({
//     children,
// }:{
//     children:React.ReactNode;
// }){

//     const router=useRouter();

//     const{
//         user,
//         isLoading,
//     }=useAuth();

//     useEffect(()=>{

//         if(!isLoading && user){

//             router.replace("/dashboard");

//         }

//     },[
//         user,
//         isLoading,
//         router
//     ]);

//     if(isLoading){

//         return <LoadingSpinner/>

//     }

//     if(user){

//         return null;

//     }

//     return <>{children}</>;
// }


"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { useUser } from "~/hooks/api/auth";

export default function GuestRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Hook inside component
  const { user, isLoading } = useUser(true);

  useEffect(() => {
    if (!isLoading && user) {
      // Users coming from the pricing page carry `?plan=pro|enterprise`;
      // route them to the payment page instead of the plain dashboard.
      const plan = searchParams.get("plan");
      if (plan === "pro" || plan === "enterprise") {
        router.replace(`/dashboard/billing?plan=${plan}`);
      } else {
        router.replace("/dashboard");
      }
    }
  }, [user, isLoading, router, searchParams]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
}