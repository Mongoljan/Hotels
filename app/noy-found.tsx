"use client";
import { useRouter } from "next/navigation";
import React from "react";
 
const NotFound = () => {
  const router = useRouter();
//   const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="m-4 p-5 border border-red-400 rounded-2xl shadow-2xl bg-red-100 text-red-700 font-bold text-center">
        <p className="mb-4"> ("not_found")</p>
        <button onClick={() => router.push("/")} className="btn btn-error w-48">
        "not_found_page"
          <br />
          "ResetPassword_back"
        </button>
      </div>
    </div>
  );
};

export default NotFound;
