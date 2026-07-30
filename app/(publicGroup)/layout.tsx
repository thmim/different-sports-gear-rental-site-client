import Navbar from "@/components/shared/navbar";
import { getMe } from "@/services/getMe";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = await getMe();
    
  return (
    
      <div className="min-h-full flex flex-col">
        
       <Navbar user={user}/>
        {children}
       
        </div>
    
  );
}
