// app/layout.tsx (Server Component)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Metadata export for Server Components
export const metadata: Metadata = {
  title: "ViewBliss",
  description: "Movie Show Booking",
};

// Server Component for layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Provider store={store}> */}
          {children}
        {/* </Provider> */}
      </body>
    </html>
  );
}

