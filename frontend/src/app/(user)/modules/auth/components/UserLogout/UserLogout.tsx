
"use client"; // This is a client component in Next.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation'; // For redirecting
import styles from './UserLogout.module.css'
import Image from 'next/image';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    router.push('/'); // Redirect to the home page
  };

  return (
    <div className={styles.logoutcontainer}>
         <button className={styles.logoutButton} onClick={handleLogout}>
            <Image
                                src="/assets/icons/logout.png"
                                alt="company_logo"
                                width={32}
                                height={32}
                            />
      Logout
    </button>

    </div>
   
  );
};

export default LogoutButton;
