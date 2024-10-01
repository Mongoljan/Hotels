"use client";
import { useState, useEffect } from "react";
import Menu from "@/components/menu";
import Link from "next/link";

export default function Home() {
  const [menuConfig, setMenuConfig] = useState(() => {
    if (typeof window !== "undefined") {
      const savedConfig = localStorage.getItem("menuConfig");
      return savedConfig
        ? JSON.parse(savedConfig)
        : {
            showAdminDashboard: false,
            showAdminSettings: false,
            showSettings: false,
            showContact: false,
            showProfile: false,
            showUserMenu: false,
          };
    }
    return {
      showAdminDashboard: false,
      showAdminSettings: false,
      showSettings: false,
      showContact: false,
      showProfile: false,
      showUserMenu: false,
    };
  });

  // Track whether configuration has been saved
  const [savedMessage, setSavedMessage] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setMenuConfig((prevConfig: any) => ({
      ...prevConfig,
      [name]: checked,
    }));
  };

  useEffect(() => {
    localStorage.setItem("menuConfig", JSON.stringify(menuConfig));
  }, [menuConfig]);

  // Handle save button click
  const handleSave = () => {
    localStorage.setItem("menuConfig", JSON.stringify(menuConfig));
    setSavedMessage(true);

    // Hide the success message after 3 seconds
    setTimeout(() => {
      setSavedMessage(false);
    }, 3000);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="text-[40px]">Нүүр хуудас</div>

        <div>Хэрэглэгч,</div>

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

        {/* Save Button */}
        <button
          className="bg-blue-500 text-white p-2 rounded w-full mt-4"
          onClick={handleSave}
        >
          Save Configuration
        </button>

        {/* Show success message if saved */}
        {savedMessage && (
          <div className="text-green-500 mt-4">
            Амжилттай хадгаллаа. 
          </div>
        )}
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
      <Link href={"/#"}>
      гарах
      
      </Link>
    </div>
  );
}
