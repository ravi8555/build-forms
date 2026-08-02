"use client"

import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { SidebarTrigger } from "~/components/ui/sidebar"

import React, { useEffect, useState } from "react";
import { cn } from "~/lib/utils"
import {
  SidebarMenuButton,
} from "~/components/ui/sidebar"
import {useLogout  } from "~/hooks/api/auth"

import {  LogOut} from "lucide-react"

import { useRouter } from "next/navigation";
import {useAuth} from "~/app/AuthProvider";


interface SiteHeaderProps extends React.HTMLAttributes<HTMLElement> {
  // your other props
}

export function SiteHeader({ className, ...props }: SiteHeaderProps) {
  const { logoutAsync } = useLogout()
  const router = useRouter()
  const [mounted, setMounted] = useState(false);
  
  const { user, isLoading, refetch } = useAuth();
  
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     await logoutAsync()
  //     router.replace("/auth")
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const handleLogout = async () => {
  try {
    await logoutAsync();
    router.replace("/auth");
    
  // setTimeout(async () => {
  // }, 0);
   
  } catch (error) {
    console.error(error)
  }
}


  return (
    <header 
      className={cn(
        "w-full flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)",
        className
      )} 
      {...props}
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        
        {!isLoading && user ? (
          <div className="flex-1 flex items-center justify-between gap-4">
            <div className="text-foreground font-medium">
              Welcome, {user?.fullName}
            </div>

            <Button onClick={handleLogout} variant="ghost" size="sm">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        ) : (
          <h1 className="text-base font-medium">Loading...</h1>
        )}
      </div>
    </header>
  )
}
