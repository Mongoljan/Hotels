'use client';
import Link from "next/link";
import { useState } from "react";
import Menu from "@/components/menu";
import Topbar from "@/components/topbar";

export default function Home() {
  // State to manage checkboxes
  const [menuConfig, setMenuConfig] = useState({
    showAdminDashboard: false,
    showAdminSettings: false,
    showSettings: false,
    showContact: false,
    showProfile: false,
    showUserMenu: false,
  });

  // Handler to update menu visibility
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setMenuConfig((prevConfig) => ({
      ...prevConfig,
      [name]: checked,
    }));
  };

  return (
    <>
    <Topbar/>
    <div className=" grid grid-rows-[20px_1fr_20px] bg-[#E5F0FD] text-black items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div className="text-[40px]">Нүүр хуудас</div>

       
        {/* Checkbox controls for the menu */}
       
      </main>

      {/* Pass the state to Menu */}
    
    </div>
    </>
  );
}
