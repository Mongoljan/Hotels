'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { schemaLogin } from '../../schema';
import { z } from 'zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';  // Import js-cookie
import Link from 'next/link';

type FormFields = z.infer<typeof schemaLogin>;

export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // Toggle between user and admin
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schemaLogin),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const requestBody = {
        email: data.email,
        password: data.password,
      };

      // Define API endpoint based on toggle (admin or user)
      const apiEndpoint = isAdmin
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hotel-owner/login/`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user-info-login/`;

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseData = await response.json();

        // Common token storage for both admin and user
        Cookies.set('jwtToken', responseData.token, {
          expires: 0.02083,  // 1 day expiration
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
        });

        // Store specific user/admin info and type in a cookie
        if (isAdmin && responseData.hotel_owner) {
          Cookies.set('userType', 'admin');
          Cookies.set('adminInfo', JSON.stringify(responseData.hotel_owner));
          toast.success('Admin login successful!');
          router.push('/admin/dashboard'); // Redirect to admin dashboard
        } else if (responseData.user) {
          Cookies.set('userType', 'user');
          Cookies.set('userInfo', JSON.stringify(responseData.user));
          toast.success('User login successful!');
          router.push('/user/dashboard'); // Redirect to user dashboard
        } else {
          toast.error('Invalid response data.');
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Login failed. Please check your input.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred during login');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex bg-[#E5FDoD] justify-center items-center min-h-screen h-full py-[100px] rounded-[20px]">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 px-20 max-w-[600px] md:min-w-[550px] min-w-[250px] rounded-md text-gray-600"
      >
        <h2 className="text-2xl font-bold mx-auto text-center text-blue-500 mb-10">Нэвтрэх</h2>

        <div className="flex items-center mb-5 space-x-4">
  <label className={`cursor-pointer px-4 py-2 rounded-lg ${
    isAdmin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
  }`}>
    <input
      type="radio"
      name="role"
      value="admin"
      checked={isAdmin}
      onChange={() => setIsAdmin(true)}
      className="hidden" // Hide the actual radio button
    />
    Буудлын эзэн
  </label>
  
  <label className={`cursor-pointer px-4 py-2 rounded-lg ${
    !isAdmin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
  }`}>
    <input
      type="radio"
      name="role"
      value="user"
      checked={!isAdmin}
      onChange={() => setIsAdmin(false)}
      className="hidden" // Hide the actual radio button
    />
    Ажилтан
  </label>
</div>




        <input
          type="email"
          placeholder="И-мэйл хаяг"
          {...register('email')}
          className="border p-4 w-full mb-6 h-[70px] rounded-md"
          required
        />
        {errors.email && <div className="text-red-500">{errors.email.message}</div>}

        <div className="relative mb-4">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Нууц үг"
            {...register('password')}
            className="border p-4 w-full mb-6 h-[70px] rounded-md"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-2"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? <HiEye className="center mt-2" size={20} /> : <HiEyeSlash className="place-content-center mt-2" size={20} />}
          </button>
        </div>
        {errors.password && <div className="text-red-500">{errors.password.message}</div>}

        <button
          type="submit"
          className="w-full bg-blue-500 mt-[100px] hover:bg text-white py-2 px-4 font-semibold rounded-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Түр хүлээнэ үү...' : 'Нэвтрэх'}
        </button>

        <Link className="text-blue-500 ml-[4px] hover:text-blue-300" href="/auth/resetpassword">
          Нууц үг сэргээх
        </Link>
      </form>
    </div>
  );
}
