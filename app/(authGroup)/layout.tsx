import Navbar from "@/components/shared/navbar";
import { getMe } from "@/services/getMe";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();
      console.log(user,"lay")
    return (
        <div className=" w-full md:max-w-7xl mx-auto">
          <Navbar user={user}/>
          {children}
        </div>
    )
}