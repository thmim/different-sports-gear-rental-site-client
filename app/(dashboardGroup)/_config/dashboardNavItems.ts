import { CalendarCheck, Heart, LayoutDashboard, ListOrdered, Package, PlusCircle, Settings, User } from "lucide-react";

const CUSTOMER_SIDEBAR_ITEMS = [
  {
    title: "Overview",
    href: "/customer-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Rentals",
    href: "/dashboard/rentals",
    icon: CalendarCheck,
  },
  {
    title: "Saved Gear",
    href: "/dashboard/saved",
    icon: Heart,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

const PROVIDER_SIDEBAR_ITEMS = [
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },

  {
    title: "My Gears",
    href: "/dashboard/listings",
    icon: Package,

  },
  {
    title: "My Rental Orders",
    href: "/dashboard/listings/new",
    icon: ListOrdered,

  },
];

const ADMIN_SIDEBAR_ITEMS = [
  {
    title: "Overview",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Rentals",
    href: "/dashboard/rentals",
    icon: CalendarCheck,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Package,

  },
  {
    title: "Categories",
    href: "/dashboard/categories",
    icon: PlusCircle,

  },

];

export const sidebarMenuItems = {
  CUSTOMER: CUSTOMER_SIDEBAR_ITEMS,
  PROVIDER: PROVIDER_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
}

