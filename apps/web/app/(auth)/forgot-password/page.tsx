"use client"

import { ForgotPasswordForm } from "~/components/forgot-password-form"
import { GalleryVerticalEndIcon } from "lucide-react"
import Footer from "~/components/Footer"
import Header from "~/components/Header"

export default function ForgotPasswordPage() {
  return (
    <>
    <Header />
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
         <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <img
          src="/forgot-password.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div> 
    <Footer />
    </>
  )
}