'use client';

import Navbar from "../../components/Navbar/Navbar";
import React, { ReactNode } from "react";
import styles from './UserLayout.module.css'

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {

  return (
    <div className={styles.userLayout}>
      <header className={styles.header}>
        <Navbar/>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default UserLayout
