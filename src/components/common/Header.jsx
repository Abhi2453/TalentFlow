import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Notification from "./Notification";

function Header({ onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <header className="hidden md:flex justify-end items-center gap-4 px-4 py-4 bg-white relative">
      {/* Notifications Button */}
      <div className="relative">
        <button
          onClick={() => {
            setNotificationOpen(!notificationOpen);
            setProfileOpen(false); // Close profile when opening notifications
          }}
          className="p-2 hover:bg-gray-200 rounded-lg transition relative"
          aria-label="Notifications"
        >
          <i className="bi bi-bell-fill text-xl text-gray-500"></i>
          {/* Notification badge */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Notification Dropdown */}
        {notificationOpen && (
          <Notification onClose={() => setNotificationOpen(false)} />
        )}
      </div>

      {/* Profile info block */}
      <div className="flex items-center gap-2">
        {/* Profile Icon */}
        <div className="w-15 h-15 rounded-full bg-orange flex items-center justify-center text-xl font-bold text-indigo-400 uppercase">
          <i className="bi bi-person-circle text-4xl"></i>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Hiring Manager</span>
          <span className="text-xs">hm@example.com</span>
        </div>
        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationOpen(false); // Close notifications when opening profile
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Profile Menu"
          >
            <i className="bi bi-three-dots-vertical text-gray-700 text-lg"></i>
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
              <button
                onClick={onLogout}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
