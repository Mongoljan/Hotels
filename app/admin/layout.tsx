import type { Metadata } from "next";




export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 


{
  return (
    <html lang="en">
      <body
       
      >
        
        {/* <Topbar/> */}
      
        
        {/* <UserProvider> */}

        {children}
        {/* </UserProvider> */}
      </body>
    </html>
  );
}
