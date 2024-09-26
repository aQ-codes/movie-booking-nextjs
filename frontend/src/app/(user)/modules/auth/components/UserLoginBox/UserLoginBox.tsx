"use client"

import React from "react";
import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import AuthLayout from "@/layouts/Auth/AuthLayout";
import VerifyEmail from "../VerifyEmail/VerifyEmail";


interface UserLoginBoxProps {
  onClose: () => void;
}

const UserLoginBox: React.FC<UserLoginBoxProps> = ({ onClose }) => {
  const { data: session, status } = useSession();

  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: "http://localhost:3000?login=true" });
  };
  

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <AuthLayout onClose={onClose}>
      <Head>
        <title>Viewbliss | Login</title>
      </Head>

      {session ? (
        // If user is authenticated, show AuthenticatedView
        <VerifyEmail userEmail={session.user?.email || "" }  onClose={onClose}/>
   
      ) : (
        // If not authenticated, show Google Sign-In button
        <button
          type="button"
          className="login-with-google-btn"
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </button>
      )}

    </AuthLayout>
  );
};

export default UserLoginBox;
