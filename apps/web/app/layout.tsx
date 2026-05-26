import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { GlobalProviders } from "~/providers/global"
import { Geist } from "next/font/google"
import { cn } from "~/lib/utils"
import { TooltipProvider } from "~/components/ui/tooltip"
import { ThemeProvider } from "next-themes"
import { Toaster } from "~/components/ui/sonner";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "BuildForms",
  description: "Media Forwarding",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("dark", "font-sans", geist.variable)}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
         <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem={false}
  >
        <GlobalProviders>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </GlobalProviders>
        </ThemeProvider>
      </body>
    </html>
  )
}