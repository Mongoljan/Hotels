'use client'
import { useSession, signIn } from "next-auth/react";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  // const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/auth/signIn");
  //   }
  // }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className=" text-black">
      <h1>Admin Dashboard</h1>
      <p>Welcome, </p> {/* Display user info */}
    </div>
  );
}
