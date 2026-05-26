"use client"

import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { SidebarTrigger } from "~/components/ui/sidebar"
import { useUser } from "~/hooks/api/auth"
import React, { useEffect, useState } from "react";

export function SiteHeader() {
  const [mounted, setMounted] = useState(false);
  const { user, id, isLoading } = useUser();
  
    useEffect(() => {
      setMounted(true);
    }, []);
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 text-right">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        
        {!isLoading && id ? (
          <>
           <div className="text-foreground font-medium text-right">
              Welcome, {user?.fullName}
            </div>

          </>
        ):(<h1 className="text-base font-medium">Loading...</h1>)}
      </div>
    </header>
  )
}
