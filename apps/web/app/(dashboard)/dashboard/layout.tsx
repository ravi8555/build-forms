import { AppSidebar } from "~/components/app-sidebar"
import { SiteHeader } from "~/components/site-header"
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar"
import { cn } from "~/lib/utils"
interface SiteHeaderProps extends React.HTMLAttributes<HTMLElement> {
  // your other props
}
export default function DashboardLayout({
  
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
       <SiteHeader 
  className={`
    fixed 
    top-0 
    bg-background/80 
    backdrop-blur-md 
    shadow-sm 
    border-b 
    border-border 
    z-50
    w-full
  `}
/>
        <div className="flex flex-1 flex-col mt-5">
          <div className="@container/main flex flex-1 flex-col gap-2">
           
          
            {children}
            
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}