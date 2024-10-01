"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use useRouter from Next.js
import { useUser } from '@/context/UserContext'; // Import the context

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser(); // Get the login function from context
  const router = useRouter(); // Initialize router

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    // Simulate a login and determine the user role (mock logic)
    const role = email === "admin@example.com" ? "admin" : "user";
    
    // Update the context with the user role
    login(role);

    // Redirect the user based on role
    if (role === "admin") {
      router.push("/admin/dashboard"); // Redirect admin to the admin dashboard
    } else {
      router.push("/user/profile"); // Redirect regular users to their profile page
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 text-black"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 text-black"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
}
