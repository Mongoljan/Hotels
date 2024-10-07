'use client'

import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

type Location = {
  lat: number;
  lng: number;
};

const DefaultLocation: Location = { lat: 47.918873, lng: 106.917017 }; // Example: Ulaanbaatar
const DefaultZoom = 10;

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [location, setLocation] = useState<Location>(DefaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  // Ensure that localStorage is accessed only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLocation = localStorage.getItem("mapLocation");
      if (savedLocation) {
        setLocation(JSON.parse(savedLocation));
      }

      const savedZoom = localStorage.getItem("mapZoom");
      if (savedZoom) {
        setZoom(JSON.parse(savedZoom));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mapLocation", JSON.stringify(location));
      localStorage.setItem("mapZoom", JSON.stringify(zoom));
    }
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

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setZoom(15);
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
          step="0.000001"
        />

        {/* Longitude input */}
        <label className="block mb-2">Longitude:</label>
        <input
          type="number"
          value={location.lng}
          onChange={(e) => setLocation({ ...location, lng: parseFloat(e.target.value) })}
          className="border p-2 w-full mb-4 h-14 rounded-lg"
          step="0.000001"
        />

        {/* Google Map */}
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_API_KEY!}>
          <GoogleMap
            mapContainerStyle={{ height: "400px", marginBottom: "20px" }}
            center={location}
            zoom={zoom}
            onClick={(e) => {
              if (e.latLng) {
                setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                setZoom(15);
              }
            }}
          >
            <Marker position={location} />
          </GoogleMap>
        </LoadScript>

        {/* Current Location button */}
        <button
          type="button"
          onClick={handleCurrentLocation}
          className="mb-4 p-2 bg-green-500 text-white rounded-lg w-full"
        >
          Одоогийн байршлыг сонгох 
        </button>

        {/* Reset button */}
        <button
          type="button"
          onClick={() => setLocation(DefaultLocation)}
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
