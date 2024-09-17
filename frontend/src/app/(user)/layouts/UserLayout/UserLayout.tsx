'use client';

import Navbar from "@/components/ui/Navbar/Navbar";
import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
// custom import 
import styles from './UserLayout.module.css'

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {

  const {data:session} = useSession()
  // console.log(session)
  return (
    <div className={styles.userLayout}>
      <header className={styles.header}>
        <Navbar/>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        copyright
      </footer>
    </div>
  );
}

export default UserLayout
