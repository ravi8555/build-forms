"use client";

import React, { useMemo, useState } from "react";

import { Button } from "~/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { CirclePlusIcon, FilePlusCorner, MailIcon  } from "lucide-react"

import Link from "next/link";
import CreateFormDailog from "./Create-Form-Dailog";


export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
    isActive?: boolean
  }[]
}) {

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            {/* <SidebarMenuButton
              tooltip="Quick Create Form"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              
              <CreateFormDailog
              />
             
              
            </SidebarMenuButton> */}
            {/* <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <FilePlusCorner 
              />
              <span className="sr-only">Inbox</span>
            </Button> */}
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        tooltip={item.title}
        asChild
        isActive={item.isActive}
      >
        <Link href={item.url}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
