'use client';

import React, { useState, useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { schemaRegistration } from '../../schema';
import { z } from 'zod';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { ToastContainer, toast } from 'react-toastify';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';
import PhoneInput from "react-phone-input-2";
import { ApiError } from 'next/dist/server/api-utils';



type Location = {
  lat: number;
  lng: number;
};

const DefaultLocation: Location = { lat: 47.918873, lng: 106.917017 }; // Example: Ulaanbaatar
const DefaultZoom = 10;

type FormFields = z.infer<typeof schemaRegistration>;

export default function RegisterPage() {
  const [location, setLocation] = useState<Location>(DefaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const modalRef = useRef<HTMLDialogElement>(null);

  // Handle form validation and submission using react-hook-form
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schemaRegistration),
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocation = localStorage.getItem('mapLocation');
      if (savedLocation) {
        setLocation(JSON.parse(savedLocation));
      }

      const savedZoom = localStorage.getItem('mapZoom');
      if (savedZoom) {
        setZoom(JSON.parse(savedZoom));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mapLocation', JSON.stringify(location));
      localStorage.setItem('mapZoom', JSON.stringify(zoom));
    }
  }, [location, zoom]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const requestBody = {
        contact_person_name: data.contact_person_name,
        hotel_name: data.hotel_name,
        email: data.email,
        password: data.password,
        contact_number: data.contact_number,
        address_location: data.address_location,
        google_map_address: data.google_map_address,
      };
  
      console.log("Request body:", requestBody);
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-hotel-owner/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );
  
      if (response.ok) {
        toast.success('Registration successful! Please verify your email.');
      } else {
        const errorData = await response.json();
        
        // Display dynamic error messages from the API
        if (errorData.email && errorData.email.length > 0) {
          // Show error from the email field
          toast.error(errorData.email[0]); // Display the first email error message
        } else if (errorData.password && errorData.password.length > 0) {
          // Show error from the password field
          toast.error(errorData.password[0]); // Display the first password error message
        } else {
          toast.error('Registration failed. Please check your input.'); // Fallback error message
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred during registration');
      console.error('Error during registration:', error); // Optional: Log the error for debugging
    }
  };
  
  

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setZoom(15);
        },
        () => {
          alert('Error getting your location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen h-full py-[100px] bg-gray-100 rounded-[20px]">
              <button className="h-[400px] w-[300px] bg-blue-400" onClick={() => toast.success('Test Toast!')}>Test Toast</button>
              <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 px-20 max-w-[600px] rounded-[20px] border-slate-400 border-solid border-[0.5px] text-gray-600"
      >
        <h2 className="text-2xl font-bold mx-auto text-center text-blue-500 mb-10">Бүртүүлэх</h2>

        {/* Username input */}
        <input
          type="text"
          placeholder="Холбоо барих хүний нэр"
          {...register('contact_person_name')}
          className="border p-2 w-full mb-4 h-14 rounded-lg"
          required
        />
        {errors.contact_person_name && <div className="text-red-500">{errors.contact_person_name.message}</div>}

        {/* Hotel Name input */}
        <input
          type="text"
          placeholder="Зочид буудлын нэр"
          {...register('hotel_name')}
          className="border p-2 w-full mb-4 h-14 rounded-lg"
          required
        />

        {/* Email input */}
        <input
          type="email"
          placeholder="И-мэйл хаяг"
          {...register('email')}
          className="border p-2 w-full mb-4 h-14 rounded-lg"
          required
        />
        {errors.email && <div className="text-red-500">{errors.email.message}</div>}

        {/* Address input */}
        <input
  type="text"
  placeholder="Буудлын google map location"
  {...register('google_map_address')}
  className="border p-2 w-full mb-4 h-14 rounded-lg"
/>
{errors.google_map_address && (
  <div className="text-red-500">{errors.google_map_address.message}</div>
)}
           <input
          type="text"
          placeholder="Буудлын хаяг"
          {...register('address_location')}
          className="border p-2 w-full mb-4 h-14 rounded-lg"
        />
      <PhoneInput
            country={"mn"}
            enableSearch
            disableSearchIcon
            value={getValues("contact_number")}
            onChange={(phone) => setValue("contact_number", phone)}
            containerStyle={{ borderRadius: "12px", background: "white" }}
            inputStyle={{
              width: "100%",
              fontSize: "0.875rem",
              border: "none",
              background: "inherit",
            }}
          />
          {errors.contact_number && (
            <div className="text-red-500 text-sm">
              {errors.contact_number.message}
            </div>
          )}

        {/* Password input */}
        <div className="relative mb-4">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Нууц үг"
            {...register('password')}
            className="border p-2 w-full h-14 rounded-lg"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-2"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? <HiEye size={20} /> : <HiEyeSlash size={20} />}
          </button>
        </div>
        {errors.password && <div className="text-red-500">{errors.password.message}</div>}

        {/* Confirm Password input */}
        <div className="relative mb-4">
          <input
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            placeholder="Нууц үг давтах"
            {...register('confirmPassword')}
            className="border p-2 w-full h-14 rounded-lg"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-2"
            onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
          >
            {isConfirmPasswordVisible ? <HiEye size={20} /> : <HiEyeSlash size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <div className="text-red-500">{errors.confirmPassword.message}</div>
        )}

        {/* Register button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 font-semibold rounded-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Түр хүлээнэ үү...' : 'Бүртгүүлэх'}
        </button>

        {errors.root && <div className="text-red-500 mt-2">{errors.root.message}</div>}
      </form>

    </div>
  );
}
