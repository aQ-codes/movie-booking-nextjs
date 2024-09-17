'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
// custom imports 
import styles from './Sidebar.module.css';
import { MENU_ITEMS, PROFILE_INFO } from './sidebar-constants';

const Sidebar = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <nav className={styles.sidebar}>
      <header>
        <div className={styles.part1}>
          <Image
            src="/assets/logo/viewbliss.png"
            alt="Logo"
            className={styles.logo}
            width={80}
            height={40}
          />
        </div>

        <div id="toggle" className={styles.open}>
          <Image src="/assets/icons/menu_open.png" alt="menu icon" width={24} height={24} />
        </div>
      </header>

      <ul className={styles.menu}>
        {MENU_ITEMS.map((item) => {
          const isActive = pathname?.startsWith(item.href) ?? false; // Check if current path matches item's href

          return (
            <a
              key={item.id}
              className={isActive ? styles.active : ''}
              href={item.href}
            >
              <Image src={item.icon} alt={item.label} width={24} height={24} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </ul>

      <div className={styles.bottomMenu}>
        <div className={styles.profile}>
          <div className={styles.profileIcon}>
            <Image src={PROFILE_INFO.profileIcon} alt="" className={styles.vert} width={24} height={24} />
          </div>
          <div className={styles.info}>
            <span className={styles.name}>{PROFILE_INFO.name}</span>
          </div>
          <Image src={PROFILE_INFO.extraIcon} alt="" className={styles.vert} width={24} height={24} />
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
