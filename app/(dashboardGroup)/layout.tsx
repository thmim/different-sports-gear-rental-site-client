import Navbar from "@/components/shared/navbar";
import { getMe } from "@/services/getMe";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = await getMe();
        console.log(user,"lay")
  return (
    
      <div className="min-h-full flex flex-col">
       <Navbar user={user}/>
        {children}
       
        </div>
    
  );
}
