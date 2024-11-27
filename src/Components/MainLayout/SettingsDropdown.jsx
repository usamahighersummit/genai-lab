// SettingsDropdown.js
import React, { useState } from "react";
import { Settings, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeContext";

export function SettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors duration-200 ${
          isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"
        }`}
      >
        <Settings className="w-5 h-5" />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg py-1 border transition-all duration-200 ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="px-4 py-2 text-sm font-semibold border-b border-gray-700">Theme Settings</div>
          <button
            onClick={() => {
              toggleTheme();
              //   setIsDarkMode(true);
            }}
            className={`w-full px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
              isDarkMode ? "text-white hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Moon className="w-4 h-4" />
            Dark Mode
          </button>
          <button
            onClick={() => {
              toggleTheme();
              //   setIsDarkMode(false);
            }}
            className={`w-full px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
              isDarkMode ? "text-white hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Sun className="w-4 h-4" />
            Light Mode
          </button>
        </div>
      )}
    </div>
  );
}
