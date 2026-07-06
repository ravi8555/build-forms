"use client"

import { SignupForm } from "~/components/signup-form"
import Header from "~/components/Header";
import Footer from "~/components/Footer";


export default function SignupPage() {
  
  return (
    <>

      <Header />
    <div className="grid min-h-svh lg:grid-cols-2">
          <div className="flex flex-col gap-4 p-6 md:p-10">
               
            <div className="flex flex-1 items-center justify-center">
              
              <div className="w-full max-w-sm">
                
                {/* <SignupForm  /> */}
              </div>
            </div>
          </div>
    
          <div className="relative hidden lg:block">
            <img
              src="/signup.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div> 
<Footer />

    </>
  )
}
