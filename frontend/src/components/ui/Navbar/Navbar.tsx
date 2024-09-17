"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// custom imports
import Button from '../Button';
import UserLoginBox from '@/app/(user)/(modules)/(auth)/assets/loginAsset/components/ui/UserLoginBox/UserLoginBox';
import styles from './Navbar.module.css'; 

const Navbar = () => {
    const [user, setUser] = useState<{ _id?: string } | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // State to control the Auth modal display
    const router = useRouter();

    const handleAuthButtonClick = () => {
        setIsAuthModalOpen(true); // Open the Auth modal when button is clicked
    };

    const handleCloseModal = () => {
        setIsAuthModalOpen(false); // Close the modal
    };

    return (
        <>
            <div className={styles.mainContainer}>
                {/* Branding */}
                <div className={styles.branding}>
                    {/* Company logo */}
                    <Link href="/" className={styles.mainLogo}>
                        <Image
                            src="/assets/logo/viewbliss.png"
                            alt="company_logo"
                            width={96}
                            height={40}
                        />
                    </Link>
                </div>
                {/* Navigation menu */}
                <nav>
                    <ul>
                        <Button
                            type='button'
                            title='Auth'
                            label='Sign In'
                            icon='/assets/icons/user.png'
                            variant={['btn']}
                            onClick={handleAuthButtonClick}  // Attach click handler
                        />
                    </ul>
                </nav>
            </div>

            {/* Render the UserLoginBox component when the auth button is clicked */}
            {isAuthModalOpen && <UserLoginBox onClose={handleCloseModal} />} {/* Pass the close handler */}
        </>
    );
};

export default Navbar;
