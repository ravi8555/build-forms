import ProtectedRoute from "~/app/ProtectedRoute"
import { UpgradeBanner } from "~/components/billing/upgrade-banner"
import { AppSidebar } from "~/components/app-sidebar"
import { SiteHeader } from "~/components/site-header"
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cn } from "~/lib/utils"
import { AuthProvider } from "~/app/AuthProvider";
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
           {/* Usage-limit notification (hidden on the billing page itself) */}
           <UpgradeBanner />
           {/* <AuthProvider> */}
           <ProtectedRoute>          
            {children}
            </ProtectedRoute>
            {/* </AuthProvider> */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}