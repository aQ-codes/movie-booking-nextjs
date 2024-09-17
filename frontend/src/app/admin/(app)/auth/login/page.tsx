import React from "react";
import Head from "next/head";
import AuthLayout from "../../../../layout/Auth/AuthLayout"; // Adjust the path as necessary

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <Head>
        <title>Viewbliss | Login</title>
      </Head>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
