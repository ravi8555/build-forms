// import { Button } from "~/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from "~/components/ui/sheet";
// import { Menu, LogOut } from "lucide-react";
// import Link from "next/link";

// interface NavbarProps {
//   user: {
//     id: string;
//     fullName: string;
//     role: string;
//     email?: string;
//     profileImgUrl?: string | null;
//   } | null | undefined; // Allow undefined
//   isLoading: boolean;
//   onLogout: () => void;
// }

// export function Navbar({ user, isLoading, onLogout }: NavbarProps) {
//   return (
//     <nav className="flex items-center justify-between p-4 border-b">
//       {/* Logo/Brand */}
//       {/* <Link href="/" className="font-bold text-xl">
//         Logo
//       </Link> */}

//       <Link href="/" className="text-2xl font-bold text-[#55C96B]">
//             <img src="/logo.png" style={{width:"40px", height:"40px", display:"inline-flex"}} />
//               BuildForms
//             </Link>

//       {/* Desktop Navigation - hidden on mobile */}
//       <div className="hidden md:flex items-center gap-6">
//         <Link
//           href="/explore"
//           className="text-foreground hover:text-[#55C96B] transition"
//         >
//           Explore
//         </Link>

//         {user?.role === "SUPER_ADMIN" && (
//           <Link
//             href="/admin/reports"
//             className="text-foreground hover:text-[#55C96B] transition"
//           >
//             Reports
//           </Link>
//         )}

//         {!isLoading && user?.id ? (
//           <>
//             <Link
//               href="/dashboard"
//               className="text-foreground hover:text-[#55C96B] transition"
//             >
//               Dashboard
//             </Link>
//             <span className="text-foreground font-medium">
//               Welcome, {user.fullName}
//             </span>
//             <button
//               onClick={onLogout}
//               className="flex items-center gap-2 text-foreground hover:text-red-500 transition"
//             >
//               <LogOut size={18} />
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link
//               href="/pricing"
//               className="text-foreground hover:text-[#55C96B] transition"
//             >
//               Pricing
//             </Link>
//             <Link
//               href="/auth"
//               className="text-foreground hover:text-[#55C96B] transition"
//             >
//               Start Free
//             </Link>
//           </>
//         )}
//       </div>

//       {/* Mobile Hamburger Menu - visible only on mobile */}
//       <Sheet>
//         <SheetTrigger asChild>
//           <Button variant="ghost" size="icon" className="md:hidden">
//             <Menu className="h-6 w-6" />
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="right" className="w-[300px] sm:w-[350px]">
//           <nav className="flex flex-col gap-4 mt-8">
//             <Link
//               href="/explore"
//               className="text-foreground hover:text-[#55C96B] transition text-lg"
//             >
//               Explore
//             </Link>

//             {user?.role === "SUPER_ADMIN" && (
//               <Link
//                 href="/admin/reports"
//                 className="text-foreground hover:text-[#55C96B] transition text-lg"
//               >
//                 Reports
//               </Link>
//             )}

//             {!isLoading && user?.id ? (
//               <>
//                 <Link
//                   href="/dashboard"
//                   className="text-foreground hover:text-[#55C96B] transition text-lg"
//                 >
//                   Dashboard
//                 </Link>
//                 <div className="text-foreground font-medium pt-2 border-t">
//                   Welcome, {user.fullName}
//                 </div>
//                 <button
//                   onClick={onLogout}
//                   className="flex items-center gap-2 text-foreground hover:text-red-500 transition text-lg mt-2"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/pricing"
//                   className="text-foreground hover:text-[#55C96B] transition text-lg"
//                 >
//                   Pricing
//                 </Link>
//                 <Link
//                   href="/auth"
//                   className="text-foreground hover:text-[#55C96B] transition text-lg"
//                 >
//                   Start Free
//                 </Link>
//               </>
//             )}
//           </nav>
//         </SheetContent>
//       </Sheet>
//     </nav>
//   );
// }


import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "~/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  user: {
    id: string;
    fullName: string;
    role: string;
    email?: string;
    profileImgUrl?: string | null;
  } | null | undefined;
  isLoading: boolean;
  onLogout: () => void;
}

export function Navbar({ user, isLoading, onLogout }: NavbarProps) {
  return (
    
    <div className="flex items-center gap-6">
      
      {/* Desktop Navigation - hidden on mobile */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          href="/explore"
          className="text-foreground hover:text-[#55C96B] transition"
          >
          Explore
        </Link>
       
        {user?.role === "SUPER_ADMIN" && (
          <Link
            href="/admin/reports"
            className="text-foreground hover:text-[#55C96B] transition"
          >
            Reports
          </Link>
        )}

        {!isLoading && user?.id ? (
          <>
            <Link
              href="/dashboard"
              className="text-foreground hover:text-[#55C96B] transition"
            >
              Dashboard
            </Link>
            <span className="text-foreground font-medium">
              Welcome, {user.fullName}
            </span>
            <button
              onClick={onLogout}
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
        )}
      </div>

      {/* Mobile Hamburger Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[350px]">
          {/* Add SheetTitle for accessibility */}
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          
          <nav className="flex flex-col gap-4 mt-8">
            <Link
              href="/explore"
              className="text-foreground hover:text-[#55C96B] transition text-lg"
            >
              Explore
            </Link>

            {user?.role === "SUPER_ADMIN" && (
              <Link
                href="/admin/reports"
                className="text-foreground hover:text-[#55C96B] transition text-lg"
              >
                Reports
              </Link>
            )}

            {!isLoading && user?.id ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-foreground hover:text-[#55C96B] transition text-lg"
                >
                  Dashboard
                </Link>
                <div className="text-foreground font-medium pt-2 border-t">
                  Welcome, {user.fullName}
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 text-foreground hover:text-red-500 transition text-lg mt-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className="text-foreground hover:text-[#55C96B] transition text-lg"
                >
                  Pricing
                </Link>
                <Link
                  href="/auth"
                  className="text-foreground hover:text-[#55C96B] transition text-lg"
                >
                  Start Free
                </Link>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>


  );
}