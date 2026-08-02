"use client"

import * as React from "react"

import { NavDocuments } from "~/components/nav-documents"
import { NavMain } from "~/components/nav-main"
import { NavSecondary } from "~/components/nav-secondary"
import { NavUser } from "~/components/nav-user"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { LayoutDashboardIcon, ListIcon, ChartBarIcon, FolderIcon, UsersIcon, CameraIcon, FileTextIcon, Settings2Icon, CircleHelpIcon, SearchIcon, DatabaseIcon, FileChartColumnIcon, FileIcon, CommandIcon, LogOut, Form, ChartNoAxesCombined   } from "lucide-react"

import { useLogout  } from "~/hooks/api/auth"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"




export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon
        />
      ),
      isActive: pathname === "/dashboard",
    },
    {
      title: "Forms",
      url: "/dashboard/forms",
      icon: (
        <Form
        />
      ),
      isActive:
        pathname === "/dashboard/forms" ||
        pathname.startsWith("/dashboard/forms/"),
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: (
        <ChartNoAxesCombined 
        />
      ),
      isActive: pathname === "/dashboard/analytics",
    },
   
  ],
  navClouds: [
    {
      title: "Capture",
      icon: (
        <CameraIcon
        />
      ),
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: (
        <FileTextIcon
        />
      ),
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: (
        <FileTextIcon
        />
      ),
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
    //   title: "Settings",
    //   url: "#",
    //   icon: (
    //     <Settings2Icon
    //     />
    //   ),
    // },
    // {
    //   title: "Get Help",
    //   url: "#",
    //   icon: (
    //     <CircleHelpIcon
    //     />
    //   ),
    },
    
  ],
  documents: [
   
  ],
}
  
const { logoutAsync } = useLogout()
const router = useRouter()


const handleLogout = async () => {
  try {
    await logoutAsync();
    router.replace("/auth")
  // setTimeout(async () => {
  // }, 0);
   
  } catch (error) {
    console.error(error)
  }
}




  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
       
             <Link href="/">
                <span className="text-base font-semibold flex">
                 
                  <img src={'../logo.png'} style={{width:"28px", height:"28px", marginRight:"10px"}}/>
                   BuildForms</span>
              </Link>                   
           
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} />  */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
        <SidebarMenuButton onClick={handleLogout}>
          <LogOut />
          <span >
              Logout
            </span>
        </SidebarMenuButton>
            
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
    </Sidebar>
  )
}
