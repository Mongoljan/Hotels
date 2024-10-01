'use client';
import Link from "next/link";
import { useState } from "react";
import Menu from "@/components/menu";

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div className="text-[40px]">Нүүр хуудас</div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href={"/auth/SignIn"}
          >
            Нэвтрэх
          </Link>

          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href={"/auth/SignUp"}
          >
            Бүртгүүлэх
          </Link>
        </div>

        {/* Checkbox controls for the menu */}
        <div className="flex flex-col gap-4 mt-4">
          <label>
            <input
              type="checkbox"
              name="showAdminDashboard"
              checked={menuConfig.showAdminDashboard}
              onChange={handleCheckboxChange}
            />
            Админы хуудас харуулах
          </label>
          <label>
            <input
              type="checkbox"
              name="showAdminSettings"
              checked={menuConfig.showAdminSettings}
              onChange={handleCheckboxChange}
            />
            Админы тохиргоо харуулах
          </label>
          <label>
            <input
              type="checkbox"
              name="showSettings"
              checked={menuConfig.showSettings}
              onChange={handleCheckboxChange}
            />
            Тохиргоо харуулах
          </label>
          <label>
            <input
              type="checkbox"
              name="showContact"
              checked={menuConfig.showContact}
              onChange={handleCheckboxChange}
            />
            Холбоо барих харуулах
          </label>
          <label>
            <input
              type="checkbox"
              name="showProfile"
              checked={menuConfig.showProfile}
              onChange={handleCheckboxChange}
            />
            Хувийн мэдээлэл харуулах
          </label>
          <label>
            <input
              type="checkbox"
              name="showUserMenu"
              checked={menuConfig.showUserMenu}
              onChange={handleCheckboxChange}
            />
            Хэрэглэгчийн цэс харуулах
          </label>
        </div>
      </main>

      {/* Pass the state to Menu */}
      <Menu
        showAdminDashboard={menuConfig.showAdminDashboard}
        showAdminSettings={menuConfig.showAdminSettings}
        showSettings={menuConfig.showSettings}
        showContact={menuConfig.showContact}
        showProfile={menuConfig.showProfile}
        showUserMenu={menuConfig.showUserMenu}
      />
    </div>
  );
}
