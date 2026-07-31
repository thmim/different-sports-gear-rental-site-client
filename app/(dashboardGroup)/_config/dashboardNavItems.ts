import { CalendarCheck, FolderPlus, Heart, LayoutDashboard, ListOrdered, Package, PlusCircle, Settings, User } from "lucide-react";

const CUSTOMER_SIDEBAR_ITEMS = [
  {
    title: "Overview",
    href: "/customer-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Rentals",
    href: "/customer-dashboard/rentals",
    icon: CalendarCheck,
  },
  {
    title: "Saved Gear",
    href: "/customer-dashboard/saved",
    icon: Heart,
  },
  {
    title: "Profile",
    href: "/customer-dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/customer-dashboard/settings",
    icon: Settings,
  },
];

const PROVIDER_SIDEBAR_ITEMS = [
  {
    title: "Profile",
    href: "/provider-dashboard/profile",
    icon: User,
  },

  {
    title: "My Gears",
    href: "/provider-dashboard/listings",
    icon: Package,

  },
  {
    title: "My Rental Orders",
    href: "/provider-dashboard/listings/new",
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
    href: "/admin-dashboard/rentals",
    icon: CalendarCheck,
  },
  {
    title: "Users",
    href: "/admin-dashboard/users",
    icon: Package,

  },
  {
    title: "Create-Categories",
    href: "/admin-dashboard/categories",
    icon: FolderPlus,

  },

];

export const sidebarMenuItems = {
  CUSTOMER: CUSTOMER_SIDEBAR_ITEMS,
  PROVIDER: PROVIDER_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
}

