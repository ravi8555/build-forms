// "use client"
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "~/hooks/api/auth";

//  export default function Home() {
//   const user = useUser()
//   const router = useRouter()

//   useEffect(()=>{
//     if(user && user?.id){
//       router.replace('/dashboard')
//     }else{
//       router.replace('/login')
//     }
//   },[])
//   return (
//     <main className="min-h-screen min-w-screen flex justify-center items-center">
//       <div> 
//         {JSON.stringify( user, null, 2)}
//       </div>
//     </main>
//   );
// }


// // 'use client'


// // export default function Home() {
// //   const { data } = trpc.chaiCode.useQuery({ email: "r@gm.com" })

// //   return (
// //     <main className="min-h-screen min-w-screen flex justify-center items-center">
// //       <div>
// //         <h2>Server Status: {data?.message}</h2>
// //       </div>
// //     </main>
// //   )
// // }


"use client";

import React from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useUser } from "~/hooks/api/auth";

export default function LandingPage() {
  // const { user, id, isLoading } = useUser();
const user = useUser(false)  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        {/* <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
          NEW — Expressions 
        </span> */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#55C96B]">
          Open-Source Form Builder for Any Project
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Create, manage, and deploy dynamic forms for your applications with a flexible API-driven form engine.
        </p>
        <div className="flex space-x-4">
          <a href="/signup" className="bg-[#55C96B] text-white px-6 py-3 rounded hover:opacity-90">
            Start Building
          </a>
          <a href="/pricing" className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300">
            Integrate →
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-2">Create, share, and analyze forms effortlessly.</p>
      </main>
      <Footer />
    </div>
  );
}


