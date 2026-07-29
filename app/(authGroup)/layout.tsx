export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className=" w-full md:max-w-7xl mx-auto">
          {children}
        </div>
    )
}