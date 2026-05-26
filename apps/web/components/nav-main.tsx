"use client";

import React, { useMemo, useState } from "react";
import { useCreateForm,useListForms,} from "~/hooks/api/form";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Input } from "~/components/ui/input";

import {
  Plus,
  FileText,
  ClipboardCopy,
  Eye,
  BarChart3,
  Trash2,
  Loader2,
  Copy
} from "lucide-react";
import { useUser } from "~/hooks/api/auth";
import { toast } from "sonner";


import { Button } from "~/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { CirclePlusIcon, FilePlusCorner, MailIcon  } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import Link from "next/link";


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

  const { createFormAsync } = useCreateForm();
  const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  
    const { forms } = useListForms();
  
    const totalForms = forms?.length ?? 0;
  
    const handleCreateForm = async () => {
      if (!title.trim()) return;
  
      try {
        await createFormAsync({
          title,
          description,
        } as any);
  
        setTitle("");
        setDescription("");
        setOpen(false);
      } catch (err) {
        console.error(err);
      }
    };
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create Form"
              className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
            >
              <CirclePlusIcon
              />
              <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <span>Create Form</span>
                        </DialogTrigger>
              
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create New Form</DialogTitle>
                          </DialogHeader>
              
                          <div className="space-y-4">
                            <Input
                              placeholder="Form title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
              
                            <Input
                              placeholder="Description (optional)"
                              value={description}
                              onChange={(e) =>
                                setDescription(e.target.value)
                              }
                            />
              
                            <Button
                              onClick={handleCreateForm}
                              className="w-full bg-[#55C96B] hover:bg-[#49b85f]"
                            >
                              Create Form
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
              
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <FilePlusCorner 
              />
              <span className="sr-only">Inbox</span>
            </Button>
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
