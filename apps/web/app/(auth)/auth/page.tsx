"use client"

import React,{useState} from 'react'
import { ShieldCheck } from 'lucide-react';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs";

import Footer from "~/components/Footer"
import Header from "~/components/Header"
import { LoginForm } from "~/components/login-form"
import { SignupForm } from "~/components/signup-form"

import { Button } from "~/components/ui/button";

// Google Icon Component
const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

// Reusable OR Divider Component
const ORDivider = () => (
  <div className="relative my-4">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-300"></div>
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="bg-white px-3 text-gray-500">OR continue with email</span>
    </div>
  </div>
);

const page = () => {
  
  const [activeTab, setActiveTab] = useState("signin");

  return (

    <>


<Header />
    <div className="grid min-h-svh lg:grid-cols-2">
          <div className="flex flex-col gap-4 p-6 md:p-10">               
            <div className="flex flex-1 items-center justify-center">              
              <div className="w-full max-w-md"> 

      <div className="w-full max-w-md">
  <div 
  className="relative rounded-2xl p-4 border bx"
  >
 {/* relative rounded-2xl p-8 border
    bg-white
    shadow
    dark:bg-white/10
    dark:backdrop-blur
    dark:shadow-lg
    dark:shadow-green-500/50
  */}
    {/* <div className="flex flex-col gap-6 p-0"> */}
            
    


  
    <Tabs defaultValue="signin" className="w-full" value={activeTab} onValueChange={setActiveTab}>
  {/* <TabsList 
  className="w-full justify-start mb-2 p-0 bg-transparent border-1 rounded-l-lg rounded-r-lg
   min-h-[46px]"
>
  <TabsTrigger 
    value="signin"  
    className="
      data-[state=active]:shadow-none 
      relative 
      bg-transparent 
      px-8 
      font-semibold 
      text-muted-foreground 
      shadow-none 
      transition-none 
      rounded-l-lg
      rounded-r-none
      data-[state=active]:!bg-[#55C96B]
      data-[state=active]:!text-white
      min-h-[30px]
      flex-1
      cursor-pointer
    "
  >
    Sign In
  </TabsTrigger>

  <TabsTrigger
    value="signup"      
    className="
      data-[state=active]:shadow-none 
      relative 
      px-8 
      font-semibold 
      shadow-none 
      transition-none 
      rounded-r-lg
      rounded-l-none
      !text-muted-foreground
      data-[state=active]:!bg-[#55C96B]
      data-[state=active]:!text-white
      min-h-[30px]
      flex-1
      cursor-pointer
    "
  >
    Sign Up
  </TabsTrigger>
</TabsList> */}

 {/* <div className="border rounded-md p-4 mb-4">      */}
  <div className='flex-2'>
<div className='flex w-full gap-2 justify-center' >

                  {/* Google Button */}
                  <Button
                    type="button"
                    variant="outline"
                    className="flex  cursor-pointer h-12 w-full items-center justify-center gap-3 rounded-md border-gray-300 bg-white hover:bg-gray-50 mt-0" 
                    onClick={() => {
                      window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google`;
                    }}
                  >
                    <GoogleIcon />
                    <span>Continue with Google</span>
                  </Button>

               {/*  <Button
  variant="outline"
  type="button"
  className="h-12 w-1/2 rounded-md cursor-pointer"
  onClick={() => {
    window.location.href = "/api/auth/oidc";
  }}
><ShieldCheck className="h-10 w-10 text-[#08906c]" />
  Sign in with SSO
</Button>*/}
  </div>

  </div>
                  {/* Divider */}
                 

{/* </div> */}

 <ORDivider />

  <TabsContent value="signin">
    <LoginForm onSwitchToSignup={() => setActiveTab("signup")} />
  </TabsContent>

  <TabsContent value="signup">
    <SignupForm onSwitchToSignin={() => setActiveTab("signin")}/>
  </TabsContent>
 

</Tabs>   
        </div></div>    
               
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

export default page


