'use client'
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();



  return (
    <div className=" text-black">
      <h1>Admin Dashboard</h1>
      <p>Welcome, </p> {/* Display user info */}
      <div>
        added some changes
        
      </div>
    </div>
  );
}
