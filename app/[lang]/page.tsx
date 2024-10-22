'use client'; // Ensure this is a client component
import LoginPage from './auth/login/page'; // Adjust path as necessary
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // To check if the user is already logged in

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // State to handle loading status

  useEffect(() => {
    const token = Cookies.get('jwtToken'); // Check if JWT token exists

    if (token) {
      const userType = Cookies.get('userType'); // Get userType from cookies

      // Redirect based on userType
      if (userType === 'Owner') {
        router.push('/admin/dashboard'); // Redirect to admin dashboard
      } else if (userType === 'SuperAdmin') {
        router.push('/superadmin/dashboard'); // Redirect to super admin dashboard
      } else {
        console.error('Invalid userType:', userType); // Log unexpected userType
        setLoading(false); // Stop loading if userType is invalid
      }
    } else {
      setLoading(false); // Stop loading if no token
    }
  }, [router]);

  // If loading, show a loading indicator
  if (loading) {
    return <div>Loading...</div>; // Replace with a proper loading spinner if needed
  }

  // If no token, show the login page
  return <LoginPage />;
}
