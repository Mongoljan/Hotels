'use client'
import LoginPage from './auth/login/page'; // Adjust path as necessary
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // To check if the user is already logged in

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already logged in by checking the presence of the token in cookies
    const token = Cookies.get('jwtToken');
    
    // If the token exists, redirect the user to the dashboard (based on userType)
    if (token) {
      const userType = Cookies.get('userType');
      if (userType === 'Owner') {
        router.push('/admin/dashboard'); // Redirect to admin dashboard
      } else {
        router.push('/user/dashboard');  // Redirect to user dashboard
      }
    }
  }, [router]);

  // If no token, show the login page
  return <LoginPage />;
}
