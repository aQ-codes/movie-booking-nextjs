'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import UserLayout from './layouts/UserLayout/UserLayout';
import { Provider } from "react-redux";
import { store } from "@/redux/store/store"; 

interface UserLayoutWrapperProps {
  session: any;  // The session prop to manage user session data
  children: React.ReactNode;  // The children components to render within the layout
}

export default function UserLayoutWrapper({ session, children }: UserLayoutWrapperProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <UserLayout>
           {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
          {children}
        </UserLayout>
      </Provider>
    </SessionProvider>
  );
}
