import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
//custom imports
import { UserProvider } from '@auth0/nextjs-auth0/client';



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ViewBliss", 
  description: "Movie Show Booking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
 
        <body className={inter.className}>
            {children}    
        </body>
 
    </html>
  );
}
