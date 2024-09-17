import React, { ReactNode } from 'react';
import AdminLayout from './layouts/AdminLayout'; // Import the AdminLayout component


interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
      <AdminLayout>
        {children} 
      </AdminLayout>
  );
};

export default AppLayout;
