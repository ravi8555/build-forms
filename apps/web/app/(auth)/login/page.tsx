"use client"

import Footer from "~/components/Footer"
import Header from "~/components/Header"
import { LoginForm } from "~/components/login-form"
import { useUser } from "~/hooks/api/auth";

export default function Page() {
  const user = useUser(false)
  return (
    <>


<Header />
    <div className="grid min-h-svh lg:grid-cols-2">
          <div className="flex flex-col gap-4 p-6 md:p-10">               
            <div className="flex flex-1 items-center justify-center">              
              <div className="w-full max-w-sm">                
                <LoginForm />
              </div>
            </div>
          </div>
    
          <div className="relative hidden lg:block">
            <img
              src="/sign-in.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div> 
<Footer />
</>
  )
}
