"use client";

import { useState } from "react"; // Import useState for managing hover state
import { FaGlobeAsia } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname

const LanguageToggle = () => {
  const router = useRouter();
  const currentPath = usePathname(); // Get current pathname using usePathname
  const [hoveredLang, setHoveredLang] = useState<string | null>(null); // State to manage hovered language

  // Get the current language from the path
  const currentLang = currentPath.split('/')[1] || 'en'; // Default to 'en' if no language is in the path
  const newLang = currentLang === 'en' ? 'mn' : 'en'; // Determine the new language

  // Function to change language
  const changeLanguage = () => {
    const segments = currentPath.split('/').filter(Boolean);
    
    // Update the first segment for language
    if (['en', 'mn'].includes(segments[0])) {
      segments[0] = newLang;  
    } else {
      segments.unshift(newLang);  
    }

    // Navigate to the new path
    router.push(`/${segments.join('/')}`);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={changeLanguage}
        onMouseEnter={() => setHoveredLang(newLang.toUpperCase())} // Set hover language
        onMouseLeave={() => setHoveredLang(null)} // Clear hover language
        className="flex items-center justify-center  p-2 hover:bg-gray-200 transition-colors"
      >
        {hoveredLang === newLang.toUpperCase() ? newLang.toUpperCase() : <FaGlobeAsia className="text-[24px]" />}
      </button>
    </div>
  );
};

export default LanguageToggle;
