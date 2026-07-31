import Navbar from "@/components/shared/navbar";
import { getMe } from "@/services/getMe";
import DashboardSidebar from "./_components/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();

  return (

    <div className="min-h-full flex flex-col">
      <Navbar user={user} />
      <div className="md:flex md:flex-1">
        <DashboardSidebar user={user} />
        {children}
      </div>

    </div>

  );
}
