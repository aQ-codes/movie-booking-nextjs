"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { adminLogin } from '../../services/adminService'; 
import { setAdmin } from '@/redux/slices/adminSlice'; 
import { RootState } from '@/redux/store/store'; 
import styles from './LoginForm.module.css';

const AdminLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();  // Get the dispatch function

  // Access the admin state
  const admin = useSelector((state: RootState) => state.admin);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Use the service to handle login logic
      const { accessToken, refreshToken, username: loggedInUsername } = await adminLogin(username, password);

      // Dispatch the setAdmin action to update Redux state
      dispatch(setAdmin({
        username: loggedInUsername,
        accessToken,
        refreshToken,
      }));

      // Redirect on successful login
      router.push('/admin/movies');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className={styles.Logincontainer}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <Image 
              src="/assets/logo/viewbliss.png"
              alt="company_logo"
              width={96}
              height={40}
          />
          <h3>Welcome |  Admin</h3>
        </div>

        <div className={styles.formContainer}>
          <h3>Use the provided username & password</h3>
   
          {error && <div className={styles.errorMessage}>{error}</div>}
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
            <button type="submit" className={styles.button}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;
