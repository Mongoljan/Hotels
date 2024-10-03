"use client";

import React, { useState } from "react";

export default function RegisterPage() {
  // Separate state for each input field
  const [username, setUsername] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Password match validation
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    // Log the collected input values to the console
    console.log({
      username,
      hotelName,
      email,
      address,
      password,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 rounded-[20px]">
      <form
        onSubmit={handleRegister}
        className="bg-white p-10  px-20 max-w-[600px]  rounded-[20px]  border-slate-400 border-solid border-[0.5px] text-gray-600 "
      >
        <h2 className="text-2xl font-bold  mx-auto text-center text-blue-500 mb-10 ">Бүртүүлэх</h2>
        
        {/* Username input */}
        <input
          type="text"
          placeholder="Холбоо барих хүний нэр"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 w-full mb-4 h-14 rounded-lg"
          required
        />
        
        {/* Hotel Name input */}
        <input
          type="text"
          placeholder="Зочид буудлын нэр"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
          className="border p-2 w-full mb-4 h-14 rounded-lg"
          required
        />
        
        {/* Email input */}
        <input
          type="email"
          placeholder="И-мэйл хаяг"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 h-14 rounded-lg"
          required
        />
        
        {/* Address input */}
        <input
          type="text"
          placeholder="Google map хаяг"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 w-full mb-4 h-14 rounded-lg"
          required
        />
        
        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 h-14 rounded-lg"
          required
        />
        
        {/* Confirm Password input */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 w-full mb-4 h-14 rounded-lg"
          required
        />
        
        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full rounded-lg"
        >
          Бүртгүүлэх
        </button>
      </form>
    </div>
  );
}
