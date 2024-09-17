import React, { ReactNode } from "react";
import Sidebar from '../components/ui/Sidebar/Sidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar/> 
      <main className="admin-main">{children}</main>
    </div>
  );
};

export default AdminLayout;

<div ></div>