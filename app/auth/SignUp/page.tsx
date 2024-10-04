"use client";

import React, { useState, useEffect } from "react";
import MapPicker from "react-google-map-picker";


type Location = {
  lat: number;
  lng: number;
};

// const apiKey = process.env.API_KEY;
// console.log("here is key:",apiKey);

// Default location and zoom values
const DefaultLocation: Location = { lat: 47.918873, lng: 106.917017 }; // Example: Ulaanbaatar
const DefaultZoom = 10;

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [location, setLocation] = useState<Location>(() => {
    const savedLocation = localStorage.getItem("mapLocation");
    return savedLocation ? JSON.parse(savedLocation) : DefaultLocation;
  });

  const [zoom, setZoom] = useState(() => {
    const savedZoom = localStorage.getItem("mapZoom");
    return savedZoom ? JSON.parse(savedZoom) : DefaultZoom;
  });

  useEffect(() => {
    localStorage.setItem("mapLocation", JSON.stringify(location));
    localStorage.setItem("mapZoom", JSON.stringify(zoom));
  }, [location, zoom]);

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log({
      username,
      hotelName,
      email,
      address,
      latitude: location.lat,
      longitude: location.lng,
      password,
    });
  };

  // Handle location and zoom changes from the map
  function handleChangeLocation(lat: number, lng: number) {
    setLocation({ lat, lng });
  }

  function handleChangeZoom(newZoom: number) {
    setZoom(newZoom);
  }

  // Reset map to default location
  function handleResetLocation() {
    setLocation(DefaultLocation);
    setZoom(DefaultZoom);
  }

  // Get the user's current location using Geolocation API
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setZoom(15); // Zoom in to the current location
        },
        (error) => {
          alert("Error getting your location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen h-full py-[100px] bg-gray-100 rounded-[20px]">
      <form
        onSubmit={handleRegister}
        className="bg-white p-10 px-20 max-w-[600px] rounded-[20px] border-slate-400 border-solid border-[0.5px] text-gray-600"
      >
        <h2 className="text-2xl font-bold mx-auto text-center text-blue-500 mb-10">Бүртүүлэх</h2>

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
        />

        {/* Latitude input */}
        <label className="block mb-2">Latitude:</label>
        <input
          type="number"
          value={location.lat}
          onChange={(e) => setLocation({ ...location, lat: parseFloat(e.target.value) })}
          className="border p-2 w-full mb-4 h-14 rounded-lg"
          step="0.000001" // Allow decimal values
        />

        {/* Longitude input */}
        <label className="block mb-2">Longitude:</label>
        <input
          type="number"
          value={location.lng}
          onChange={(e) => setLocation({ ...location, lng: parseFloat(e.target.value) })}
          className="border p-2 w-full mb-4 h-14 rounded-lg"
          step="0.000001" // Allow decimal values
        />

        {/* Google Map Picker */}
        <MapPicker
          defaultLocation={location}
          zoom={zoom}
          style={{ height: "400px", marginBottom: "20px" }}
          onChangeLocation={handleChangeLocation}
          onChangeZoom={handleChangeZoom}
          apiKey={`${
      process.env.NEXT_PUBLIC_API_KEY
    }`}
        />

        {/* Current Location button */}
        <button
          type="button"
          onClick={handleCurrentLocation}
          className="mb-4 p-2 bg-green-500 text-white rounded-lg w-full"
        >
          Одоогийн байршлыг сонгох 
        </button>

        {/* Reset button for map */}
        <button
          type="button"
          onClick={handleResetLocation}
          className="mb-4 p-2 bg-gray-300 rounded-lg w-full"
        >
          Дахин шинээр сонгох
        </button>

        {/* Password input */}
        <input
          type="password"
          placeholder="Нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4 h-14 rounded-lg"
          required
        />

        {/* Confirm Password input */}
        <input
          type="password"
          placeholder="Нууц үг давтан оруулах"
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
