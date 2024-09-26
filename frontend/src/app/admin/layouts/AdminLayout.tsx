"use client"
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation"; 
import Sidebar from "@/admin/components/Sidebar/Sidebar";


interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname(); // Get the current pathname

  // Check if the current route is /admin/login
  const isLoginPage = pathname === "/admin/login";

  return (
    <div style={{ display: 'flex' }} className="adminLayout">
      {/* Conditionally render Sidebar only if it's not the login page */}

      {!isLoginPage && <Sidebar />} 
      <main className="container">
        <div className="admin-main">
          {children}
        </div>

      </main>
    </div>
  );
};

export default AdminLayout;
