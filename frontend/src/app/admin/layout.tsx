"use client"
import React, { ReactNode } from 'react';
import AdminLayout from './layouts/AdminLayout'; 
import { store } from "@/redux/store/store"; 
import { Provider } from "react-redux";


interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <AdminLayout>
        {children} 
      </AdminLayout>
      </Provider>

  );
};

export default AppLayout;
