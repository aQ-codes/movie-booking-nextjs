"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
//custom import
import styles from "./AuthLayout.module.css"; 
import Modal from "@/layouts/Modal/Modal";

interface AuthLayoutProps {
  children: ReactNode;
  onClose: () => void; // Prop to handle closing the modal
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose}> {/* Use the passed onClose prop */}
      <div className={styles.authLayout}>
        <header className={styles.header}>
        <Image 
              src="/assets/logo/viewbliss.png"
              alt="company_logo"
              width={96}
              height={40}
        />
        </header>
        <h2 className={styles.tagline}>Your Ticket to Cinematic Bliss!</h2>
        <main className={styles.mainContent}>{children}</main>
      </div>
    </Modal>
  );
};

export default AuthLayout;
