
import React from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import AuthLayout from "@/layouts/Auth/AuthLayout";
import { signIn, signOut } from "next-auth/react";


interface UserLoginBoxProps {
  onClose: () => void;
}

const UserLoginBox: React.FC<UserLoginBoxProps> = ({ onClose }) => {
  const router = useRouter();

  const handleGoogleLogin = () => {
    signIn('google',{callbackUrl:"http://localhost:3000"})
  };

  return (
    <AuthLayout onClose={onClose}>
      <Head>
        <title>Viewbliss | Login</title>
      </Head>
      <button
        type="button"
        className="login-with-google-btn"
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </button>
    </AuthLayout>
  );
};

export default UserLoginBox;
