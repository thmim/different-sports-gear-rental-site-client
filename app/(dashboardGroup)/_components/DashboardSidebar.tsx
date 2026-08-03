"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Camera,
  LayoutDashboard,
  Package,
  PlusCircle,
  CalendarCheck,
  Heart,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  ShieldAlert,
} from "lucide-react";
import { sidebarMenuItems } from "../_config/dashboardNavItems";
import { NavbarProps } from "@/types/userType";


// Nav Item Structure
type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  
}

// interface SidebarProps {
//   user?: {
//     id: string;
//     name: string;
//     email: string;
//     role: string;
//   };
// }

export default function DashboardSidebar({
  // user = {
  //   id: "6b1cdf48-1491-45a5-af5e-7f79eae68fa5",
  //   name: "emi",
  //   email: "emi@gmail.com",
  //   role: "CUSTOMER",
  // },
  user
}: NavbarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  let navItems : NavItem[]  = [];
  // console.log(user,"sidebar")

  if(user.data.role === "CUSTOMER"){
    navItems=sidebarMenuItems.CUSTOMER
  }else if (user.data.role === "PROVIDER") {
     navItems = sidebarMenuItems.PROVIDER;
  }else if (user.data.role === "ADMIN") {
     navItems = sidebarMenuItems.ADMIN;
  }

  // Filter items according to the user's role
  // const filteredNavItems = navItems.filter(
  //   (item) => !item. || item.roles.includes(user.role)
  // );

  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
    user.data.name
  )}`;
  const initials = user.data.name.slice(0, 2).toUpperCase();

  return (
    <TooltipProvider delayDuration={0}>
      {/* desktop sidebar */}
      <aside
        className={`hidden border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 md:flex md:flex-col ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Brand Logo & Collapse Toggle */}
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            href="/"
            className={`flex items-center gap-3 overflow-hidden font-bold transition-all ${
              collapsed ? "justify-center w-full" : ""
            }`}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Camera className="h-5 w-5" />
            </div>
            {!collapsed && (
              <span className="text-lg tracking-tight text-slate-900 dark:text-slate-100">
                Gear<span className="text-indigo-600 dark:text-indigo-400">Up</span>
              </span>
            )}
          </Link>

          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500"
              onClick={() => setCollapsed(true)}
              aria-label="Collapse Sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        {collapsed && (
          <div className="flex justify-center pb-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500"
              onClick={() => setCollapsed(false)}
              aria-label="Expand Sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        <Separator className="bg-slate-100 dark:bg-slate-800" />

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              if (collapsed) {
                return (
                  
                    <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={`flex h-10 w-full items-center justify-center rounded-lg transition-colors ${
                          isActive
                            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  </Tooltip>
                  
                );
              }
              
              

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="truncate">{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <Separator className="bg-slate-100 dark:bg-slate-800" />

        {/* User Footer Profile Card */}
        <div className="p-3">
          <div
            className={`flex items-center gap-3 rounded-xl bg-slate-50 p-2.5 dark:bg-slate-900 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <Avatar className="h-9 w-9 shrink-0 border border-slate-200 dark:border-slate-800">
              <AvatarImage src={avatarUrl} alt={user.data.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            {!collapsed && (
              <div className="flex flex-1 items-center justify-between overflow-hidden">
                <div className="overflow-hidden pr-2">
                  <p className="truncate text-xs font-semibold capitalize text-slate-900 dark:text-slate-100">
                    {user.data.name}
                  </p>
                  <p className="truncate text-[11px] text-slate-500">
                    {user.data.email}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                  title="Log out"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/*mobile sidebar */}
      <div className="flex items-center border-b border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="flex h-full flex-col">
              {/* Brand Header */}
              <div className="flex h-16 items-center gap-3 border-b px-6 dark:border-slate-800">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <Camera className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold tracking-tight">
                  Gear<span className="text-indigo-600 dark:text-indigo-400">Up</span>
                </span>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile User Profile Footer */}
              <div className="border-t p-4 dark:border-slate-800">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={avatarUrl} alt={user.data.name} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-semibold capitalize">{user.data.name}</p>
                      <p className="text-[11px] text-slate-500">{user.data.email}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <span className="ml-4 font-bold text-slate-900 dark:text-slate-100">
          GearUp Dashboard
        </span>
      </div>
    </TooltipProvider>
  );
}