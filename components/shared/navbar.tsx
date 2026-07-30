"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Camera,
  Menu,
  X,
  User,
  Package,
  PlusCircle,
  Heart,
  Settings,
  LogOut,
} from "lucide-react";
import { logout } from "@/services/logout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// user type
type IUser = {
   success: boolean,
    statusCode: number,
    message: string,
    "data": {
        "id": string,
        "name": string,
        "email": string,
        "role": string,
        "status": string,
        "created_at": string,
        "updated_at": string
    }
}
// we take user as a props so that type will be a props
type NavbarProps = {
    user : IUser
}

// interface for menu item
interface MenuItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles?: string[]; // Optional role restriction
}

// nav items array 
const NAV_ITEMS = [
  { label: "Browse Gear", href: "/gear" },
  { label: "Categories", href: "/categories" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "List Your Gear", href: "/list-gear" },
];
// menu items array
const USER_MENU_ITEMS: MenuItem[] = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "My Rentals", href: "/my-rentals", icon: Package },
  { label: "My Listings", href: "/my-listings", icon: PlusCircle, roles: ["OWNER", "ADMIN"] },
  { label: "Saved Gear", href: "/saved", icon: Heart },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Navbar({user}:NavbarProps) {
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // console.log(user.data.name)
// Dummy avatar url
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.data?.name}`;
  
  // show user names first two letter if there is no image
  const initials = user?.data?.name.slice(0, 2).toUpperCase();

  // menu action functionality
  const handleMenuAction = async(action:string)=>{
     if(action === "logout"){
       await logout();
       toast.success("user logout successfully")
     router.push("/login")
     }
  };
  
   return (
   <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Camera className="h-5 w-5" />
          </div>
          <span className="text-xl tracking-tight">
            Gear<span className="text-indigo-600 dark:text-indigo-400">Up</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Section: Actions & User Dropdown */}
        <div className="hidden items-center gap-4 md:flex">
          {user.success ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-800">
                    <AvatarImage src={avatarUrl} alt={user.data.name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold capitalize text-slate-900 dark:text-slate-100">
                        {user.data.name}
                      </p>
                      <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                        {user.data.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{user.data.email}</p>
                  </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />

                {/* Dynamically Rendered Menu Items */}
                <DropdownMenuGroup>
                  {USER_MENU_ITEMS.filter(
                    (item) => !item.roles || item.roles.includes(user.data.role)
                  ).map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="cursor-pointer flex items-center">
                          <Icon className="mr-2 h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
              

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/50"
                  onClick={async()=>{await handleMenuAction("logout")}}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pb-6 pt-2 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-700 transition-colors hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
              >
                {item.label}
              </Link>
            ))}

            <hr className="my-2 border-slate-200 dark:border-slate-800" />

            {user.success ? (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3 py-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={avatarUrl} alt={user.data.name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold capitalize">{user.data.name}</p>
                    <p className="text-xs text-slate-500">{user.data.email}</p>
                  </div>
                </div>

                {USER_MENU_ITEMS.filter(
                  (item) => !item.roles || item.roles.includes(user.data.role)
                ).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400"
                  >
                    {item.label}
                  </Link>
                ))}

               

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full text-red-600"
                  onClick={async()=>{await handleMenuAction("logout")}}
                >
                  Log out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}