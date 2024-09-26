'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/slices/adminSlice'; // Assuming you have an adminSlice for Redux
import { adminLogout } from '@/admin/modules/auth/services/adminService'; 
import styles from './Sidebar.module.css';
import { MENU_ITEMS, PROFILE_INFO } from './sidebar-constants';
import { RootState } from '@/redux/store/store'; // Import the RootState type

const Sidebar = () => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const router = useRouter();
    const accessToken = useSelector((state: RootState) => state.admin.accessToken); // Get admin token from Redux

    const handleLogout = async () => {
        try {
            await adminLogout(accessToken); // Pass the access token to the service
            dispatch(logout()); // Dispatch Redux logout action
            router.push('/admin/login'); // Redirect to the login page
        } catch (error) {
            console.error('Logout failed:', error);
            router.push('/admin/login'); // Redirect to the login page

        }
    };

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
                    const isActive = pathname?.startsWith(item.href) ?? false;

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
                        <Image src={PROFILE_INFO.profileIcon} alt="" width={24} height={24} />
                    </div>
                    <div className={styles.info}>
                        <span className={styles.name}>{PROFILE_INFO.name}</span>
                    </div>
                    <button onClick={handleLogout} className={styles.vert}>
                        <Image src={PROFILE_INFO.extraIcon} alt="" width={24} height={24} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
