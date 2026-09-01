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
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "~/components/LoadingSpinner";
import { useUser } from "~/hooks/api/auth";

export default function GuestRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  // ✅ Hook inside component
  const { user, isLoading } = useUser(true);

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