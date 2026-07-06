import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { GlobalProviders } from "~/providers/global"
import { Geist } from "next/font/google"
import { cn } from "~/lib/utils"
import { TooltipProvider } from "~/components/ui/tooltip"
import { ThemeProvider } from "next-themes"
import { AuthProvider } from "./AuthProvider"


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

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
// const { enqueueSnackbar } = useSnackbar();
  return (
    <html lang="en" suppressHydrationWarning className={cn("dark", "font-sans", geist.variable)}>
      <body className={`${geistSans.variable} ${geistMono.variable}, body-bg`}>
         <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem={false}
  >
        <GlobalProviders>
          
          <TooltipProvider>
          <AuthProvider>
            {children}
            </AuthProvider> 
          </TooltipProvider>
          
        </GlobalProviders>
        </ThemeProvider>
      </body>
    </html>
  )
}