"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import { RootState } from '@/redux/store/store';
import { useSession } from 'next-auth/react';

// Custom components
import Button from '@/components/ui/Button';
import UserLoginBox from '../../modules/auth/components/UserLoginBox/UserLoginBox'; 
import styles from './Navbar.module.css'; 

const Navbar = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); // State to control the Auth modal display
    const [isClient, setIsClient] = useState(false); // State to detect client-side rendering
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user); // Get user from Redux
    const { data: session } = useSession();
    const profilePic = session?.user?.image || "";

    // Set isClient to true when the component mounts (runs only on the client-side)
    useEffect(() => {
        setIsClient(true);

        // Check the query params on component mount
        const urlParams = new URLSearchParams(window.location.search);
        const loginParam = urlParams.get('login');

        if (loginParam === 'true') {
            setIsAuthModalOpen(true);  // Keep the modal open after successful Google sign-in
        }
    }, []);

    const handleAuthButtonClick = () => {
        setIsAuthModalOpen(true); // Open the Auth modal when the button is clicked
    };

    const handleCloseModal = () => {
        setIsAuthModalOpen(false); // Close the modal
    };

    const handleProfileClick = () => {
        router.push('/profile'); // Redirect to the profile page on click
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
                            width={80}
                            height={32}
                        />
                    </Link>
                </div>
                {/* Navigation menu */}
                <nav>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            {isClient && user.userId ? (
                                // Show profile pic if user exists in Redux (after client-side rendering)
                                <div className={styles.profilePicWrapper} onClick={handleProfileClick}>
                                    <Link href="/profile">
                                        {profilePic ? (
                                            <Image
                                                src={profilePic}
                                                alt="profile_pic"
                                                width={96}
                                                height={40}
                                                className={styles.profilePic}
                                            />
                                        ) : (
                                            <div className={styles.placeholder}>Loading...</div> // Fallback content
                                        )}
                                    </Link>
                                </div>
                            ) : (
                                // Show Sign In button if no user (only after client-side rendering)
                                <Button
                                    type="button"
                                    title="Auth"
                                    label="Sign In"
                                    icon="/assets/icons/user.png"
                                    variant={['btn', 'signin']}
                                    onClick={handleAuthButtonClick} // Attach click handler
                                />
                            )}
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Render the UserLoginBox component when the auth button is clicked */}
            {isAuthModalOpen && <UserLoginBox onClose={handleCloseModal} />} {/* Pass the close handler */}
        </>
    );
};

export default Navbar;
