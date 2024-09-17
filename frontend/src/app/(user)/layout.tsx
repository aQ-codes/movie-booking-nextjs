'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import UserLayout from './layouts/UserLayout/UserLayout';

interface UserLayoutWrapperProps {
  session: any;  // The session prop to manage user session data
  children: React.ReactNode;  // The children components to render within the layout
}

export default function UserLayoutWrapper({ session, children }: UserLayoutWrapperProps) {
  return (
    <SessionProvider session={session}>
      <UserLayout>
        {children}
      </UserLayout>
    </SessionProvider>
  );
}
