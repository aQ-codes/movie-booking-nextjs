"use client";

import React, { useState, useEffect } from "react";
import styles from "./VerifyEmail.module.css"; // Import the CSS module
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setUser } from "@/redux/slices/authSlice"; 
import { generateOtp } from "@/utils/otpUtils";

interface VerifyEmailProps {
  userEmail: string;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ userEmail }) => {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  // const dispatch = useDispatch();

  // Generate OTP automatically when component loads
  useEffect(() => {
    const otpCode = generateOtp();
    setGeneratedOtp(otpCode); // Store OTP for verification

    const sendOtp = async () => {
      try {
        await axios.post('/assets/loginAsset/api/sentEmail', { email: userEmail, otp: otpCode });
        setOtpSent(true);
        console.log("OTP sent successfully");
      } catch (error) {
        console.error("Failed to send OTP:", error);
      }
    };
    sendOtp();
  }, [userEmail]);

  const handleSignIn = async () => {
    if (otp === generatedOtp) {
      try {
        const response = await axios.post("/api/users/signup", {
          email: userEmail,
          isEmailVerified: true,
        });

        const { token, user } = response.data;
        // // Dispatch user and token to Redux store
        // dispatch(setUser({ email: user.email, token }));

        console.log("User created and signed in");
      } catch (error) {
        console.error("Failed to sign in:", error);
      }
    } else {
      console.error("Invalid OTP");
    }
  };

  return (
    <div className={styles.container}>
      <h3>Enter OTP Sent to Registered Email</h3>
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




