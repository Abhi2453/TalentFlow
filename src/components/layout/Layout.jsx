import React, { useState } from "react";
import { Sidebar, SidebarItem } from "./Sidebar";
import {
  Briefcase,
  Users,
  Trello,
  ClipboardList,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import logo from '../../assets/tf_2-removebg-preview.png';

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://ui-avatars.com/api/?name=John+Doe"
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const outerBgClass = darkMode
    ? "bg-gray-800 transition-colors duration-300"
    : "bg-[#def4f3] transition-colors duration-300";

  const mainBgClass = darkMode
    ? "bg-gray-200 text-white border-white transition-colors duration-300"
    : "bg-[#def4f3] text-gray-900 border-gray-200 transition-colors duration-300";

  const sidebarContent = (
    <>
      <SidebarItem 
        to="/" 
        icon={<LayoutDashboard size={24}/>} 
        text="Dashboard" 
        onClick={() => setMobileOpen(false)}
      />
      <SidebarItem 
        to="/jobs" 
        icon={<Briefcase size={24} />} 
        text="Jobs"
        onClick={() => setMobileOpen(false)}
      />
      <SidebarItem 
        to="/candidates" 
        icon={<Users size={24} />} 
        text="Candidates" 
        onClick={() => setMobileOpen(false)}
      />
      <SidebarItem 
        to="/kanban" 
        icon={<Trello size={24} />} 
        text="Kanban Board" 
        onClick={() => setMobileOpen(false)}
      />
      <SidebarItem 
        to="/assessments" 
        icon={<ClipboardList size={24} />} 
        text="Assignments" 
        onClick={() => setMobileOpen(false)}
      />
      <hr className="border-gray-600" />
    </>
  );

  return (
    <div className={`min-h-screen w-full ${outerBgClass}`}>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Mobile Header - Only visible on mobile */}
        <div className="md:hidden sticky top-0 left-0 right-0 z-30 bg-white shadow-md">
          <div className="flex items-center justify-start gap-4 px-4 py-3">
            {/* Menu/Close Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>

            {/* TalentFlow Branding */}
            <div className="flex items-center gap-1">
              <img src={logo} alt="Logo" className="w-10 h-10" />
              <h1 className="text-xl font-bold text-[#172e58]">Talent</h1>
              <h2 className="text-xl font-bold text-[#1ac2b6]">Flow</h2>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            user={user}
          >
            {sidebarContent}
          </Sidebar>
        </div>

        {/* Mobile Sidebar & Overlay */}
        {mobileOpen && (
          <>
            {/* Overlay with semi-transparent black */}
            <div
              className="fixed inset-0  z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Sliding sidebar */}
            <div
              className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
                mobileOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <Sidebar
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                user={user}
                mobile
              >
                {sidebarContent}
              </Sidebar>
            </div>
          </>
        )}

        {/* Main Content */}
        <main className={`flex-1 min-h-screen ${mainBgClass} p-3 md:p-3`}>
          {children || <Outlet />}
        </main>
      </div>
      <Footer />
    </div>
  );
}
