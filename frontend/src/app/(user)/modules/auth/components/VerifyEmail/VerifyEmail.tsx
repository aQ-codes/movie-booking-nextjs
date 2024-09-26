"use client";
import { useDispatch } from 'react-redux';
import { setAccessToken, setUser } from '@/redux/slices/userSlice'; 
import React, { useState, useEffect } from 'react';
import styles from './VerifyEmail.module.css'; // Import the CSS module
import { axiosInstance } from "@/config/axiosConfig";
import axios from 'axios';
import { generateOtp } from '@/utils/otpUtils';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

interface VerifyEmailProps {
  userEmail: string;
  onClose: () => void; // Add a prop for closing the modal
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ userEmail, onClose }) => {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState(""); // New state for message
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize the router

  // Generate OTP automatically when component loads
  useEffect(() => {
    const otpCode = generateOtp();
    setGeneratedOtp(otpCode); // Store OTP for verification

    const sendOtp = async () => {
      try {
        await axios.post('/api/sentEmail', {
          email: userEmail,
          otp: otpCode
        });
        setOtpSent(true);
        setMessage('OTP Sent to Registered Email'); // Set success message
      } catch (error) {
        console.error('Failed to send OTP:', error);
        setMessage('Failed to send OTP'); // Set error message
      }
    };
    sendOtp();
  }, [userEmail]);

  const handleSignIn = async () => {
    if (otp === generatedOtp) {
      try {
        const response = await axiosInstance.post('/user/signin', {
          email: userEmail,
        });
        
        const { accessToken, refreshToken, user } = response.data;

        dispatch(setAccessToken(accessToken));

        dispatch(
          setUser({
            email: user.email,
            userId: user._id,
            accessToken,
            refreshToken,
          })
        );
        setMessage('User signed in successfully'); // Set success message
        onClose(); // Close the modal
        router.push('/'); // Redirect to home page
      } catch (error) {
        console.error('Failed to sign in:', error);
        setMessage('Failed to sign in. Please try again.'); // Set error message
      }
    } else {
      setMessage('Invalid OTP'); // Set error message
    }
  };

  return (
    <div className={styles.container}>
      {message && <h3 className={styles.message}>{message}</h3>} {/* Display message */}
      {otpSent ? <h3 className={styles.success}></h3> : <h3>Sending Otp...Please Wait...</h3>}
      <div className={styles.inputGroup}>
        <input type="email" value={userEmail} readOnly />
      </div>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
      </div>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default VerifyEmail;
