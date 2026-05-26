// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useUser } from "~/hooks/api/auth"
// import Link from "next/link";
// import { useTheme } from "next-themes";
// import { Sun, Moon } from "lucide-react";

// const Header = () => {
//   const user = useUser();
//   const router = useRouter();
//   const pathname = usePathname();
//   const { theme, setTheme } = useTheme();

//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (pathname !== "/") return;

//     if (user?.id) {
//       router.replace("/dashboard");
//     }
//   }, [user?.id, pathname, router]);

//   if (!mounted) return null;

//   const isDark = theme === "dark";

//   return (
//     <header className="flex justify-between items-center px-8 py-4 bg-background shadow-sm">
//       {/* Logo */}
//       <Link href="/" className="text-2xl font-bold text-[#55C96B]">
//         BuildForms
//       </Link>

//       {/* Navigation */}
//       <nav className="flex items-center gap-6">
//         <Link
//           href="/demo"
//           className="text-foreground hover:text-[#55C96B] transition"
//         >
//           Demo
//         </Link>

//         <Link
//           href="/pricing"
//           className="text-foreground hover:text-[#55C96B] transition"
//         >
//           Pricing
//         </Link>

//         <Link
//           href="/login"
//           className="text-foreground hover:text-[#55C96B] transition"
//         >
//           Sign In
//         </Link>

//         {/* Theme Toggle */}
//         <button
//           onClick={() => setTheme(isDark ? "light" : "dark")}
//           className="relative flex h-10 w-20 items-center rounded-full bg-muted border border-border px-1 transition"
//         >
//           <div
//             className={`absolute h-8 w-8 rounded-full bg-[#55C96B] transition-transform duration-300 ${
//               isDark ? "translate-x-10" : "translate-x-0"
//             }`}
//           />

//           <div className="relative z-10 flex w-full justify-between px-1">
//             <Moon
//               size={16}
//               className={isDark ? "text-white" : "text-muted-foreground"}
//             />
//             <Sun
//               size={16}
//               className={!isDark ? "text-white" : "text-muted-foreground"}
//             />
//           </div>
//         </button>
//       </nav>
//     </header>
//   );
// };

// export default Header;


"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser, useLogout } from "~/hooks/api/auth";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, LogOut } from "lucide-react";
import { cn } from "~/lib/utils";

const Header = () => {
  const { user, id, isLoading } = useUser();
  const { logoutAsync } = useLogout();

  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   if (pathname !== "/") return;

  //   if (id) {
  //     router.replace("/dashboard");
  //   }
  // }, [id, pathname, router]);

  const handleLogout = async () => {
    try {
      await logoutAsync();
      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  };

  if (!mounted) return null;

  const isDark = theme === "dark";
  

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-background shadow-sm border-b border-border">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-[#55C96B]">
        BuildForms
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        
<Link
  href="/explore"
  className="text-foreground hover:text-[#55C96B] transition"
>
  Explore
</Link>
       

        <Link
          href="/pricing"
          className="text-foreground hover:text-[#55C96B] transition"
        >
          Pricing
        </Link>
        

        {/* Logged in */}
        
        {!isLoading && id ? (
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
          /* Logged out */
          <Link
            href="/login"
            className="text-foreground hover:text-[#55C96B] transition"
          >
            Sign In
          </Link>
        )}

        {/* Theme Toggle */}
        {/* <button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="relative flex h-10 w-20 items-center rounded-full bg-muted border border-border px-1 transition"
        >
          <div
            className={`absolute h-8 w-8 rounded-full bg-[#55C96B] transition-transform duration-300 ${
              isDark ? "translate-x-10" : "translate-x-0"
            }`}
          />

          <div className="relative z-10 flex w-full justify-between px-1">
            <Moon
              size={16}
              className={isDark ? "text-white" : "text-muted-foreground"}
            />
            <Sun
              size={16}
              className={!isDark ? "text-white" : "text-muted-foreground"}
            />
          </div>
        </button> */}
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