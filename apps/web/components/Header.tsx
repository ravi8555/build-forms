"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLogout } from "~/hooks/api/auth";
import { useAuth } from "~/app/AuthProvider";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, LogOut } from "lucide-react";
import { cn } from "~/lib/utils";
import Image from "next/image";
import { Navbar } from "./Navbar";

const Header = () => {
  const { user, isLoading } = useAuth();
  const { logoutAsync } = useLogout();
  

  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  //  if (!user) router.push("/login");

  useEffect(() => {  

    setMounted(true);
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     await logoutAsync();
  //     router.replace("/auth");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

  if (!mounted) return null;

  const isDark = theme === "dark";
  

  return (

    
    <header className="flex justify-between items-center px-8 py-4 bg-background shadow-sm border-b border-border">
      {/* Logo */}

        

      <Link href="/" className="text-2xl font-bold text-[#55C96B]">
      <img src="/logo.png" style={{width:"40px", height:"40px", display:"inline-flex"}} />
        BuildForms
      </Link>

    

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        <Navbar 
        user={user} 
        isLoading={isLoading}
        onLogout={handleLogout}
        />
        
{/* <Link
  href="/explore"
  className="text-foreground hover:text-[#55C96B] transition"
>
  Explore
</Link>

       {user?.role === "SUPER_ADMIN" && (
    <Link href="/admin/reports" className="text-foreground hover:text-[#55C96B] transition">
        Reports
    </Link>
)} */}

        
        

        {/* Logged in */}
        
        {/* {!isLoading && id ? (
          <>
           <Link
          href="/dashboard"
          className="text-foreground hover:text-[#55C96B] transition"
        >
          Dashboard
        </Link>
            <span className="text-foreground font-medium">
              Welcome, {user?.fullName}
            </span>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-foreground hover:text-red-500 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <>
          <Link
          href="/pricing"
          className="text-foreground hover:text-[#55C96B] transition"
        >
          Pricing
        </Link>
         
          <Link
            href="/auth"
            className="text-foreground hover:text-[#55C96B] transition"
          >
            Start Free
          </Link>
           </>
          
        )} */}

       
        <button
  onClick={() => setTheme(isDark ? "light" : "dark")}
  className={cn(
    "relative flex h-10 w-20 items-center rounded-full p-1 transition-all duration-300 border",
    isDark
      ? "bg-[#111827] border-[#374151]"
      : "bg-[#f3f4f6] border-[#d1d5db]"
  )}
>
  {/* Sliding knob */}
  <div
    className={cn(
      "absolute h-8 w-8 rounded-full shadow-md transition-transform duration-300 flex items-center justify-center",
      isDark
        ? "translate-x-10 bg-white"
        : "translate-x-0 bg-white"
    )}
  />

  {/* Icons */}
  <div className="relative z-10 flex w-full items-center justify-between px-2">
    <Moon
      size={18}
      className={cn(
        "transition-colors duration-300",
        isDark
          ? "text-yellow-400"
          : "text-gray-400"
      )}
    />

    <Sun
      size={18}
      className={cn(
        "transition-colors duration-300",
        isDark
          ? "text-gray-500"
          : "text-orange-500"
      )}
    />
  </div>
</button>
      </nav>
    </header>
  );
};

export default Header;