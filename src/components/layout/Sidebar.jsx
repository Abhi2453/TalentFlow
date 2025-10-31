import React, { useContext, createContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronLast,
  ChevronFirst,
  MessageCircleQuestionMark,
  LogOut,
  User,
} from "lucide-react";
import logo from '../../assets/tf_2-removebg-preview.png';
export const SidebarContext = createContext();

export function Sidebar({
  mobileOpen,
  setMobileOpen,
  darkMode,
  toggleDarkMode,
  children,
  mobile,
}) {
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && !mobileOpen && (
        <button
          className="fixed top-4 left-4 z-50 bg-[#b6ffc2] rounded-full p-2 hover:bg-gray-300 transition-all"
          onClick={() => setMobileOpen(true)}
        >
          <ChevronLast className="text-gray-700" />
        </button>
      )}
      {(mobileOpen || !isMobile || mobile) && (
        <aside
          className={
            isMobile || mobile
              ? "fixed top-0 left-0 z-50 h-screen w-64 bg-[#def4f3] text-gray-800 transition-transform duration-500 flex flex-col"
              : `transition-all duration-500 flex flex-col sticky top-0 left-5 rounded-xl h-[calc(100vh-2rem)] mt-4 ml-4 z-40 ${
                  expanded ? "w-64" : "w-16"
                } bg-[#def4f3] text-gray-800`
          }
        >
          {/* Top logo row */}
          <div className={`flex items-center ${expanded ? "justify-between px-4" : "justify-center"} py-1`}>
            {expanded && (
              <div className="flex items-center ">
  <h1 className="text-2xl font-bold text-[#172e58]">Talent</h1>
  <h2 className="text-2xl font-bold text-[#1ac2b6]">Flow</h2>
</div>

            )}
            <button
              onClick={() =>
                isMobile || mobile
                  ? setMobileOpen(false)
                  : setExpanded((curr) => !curr)
              }
              className="rounded-lg  hover:bg-[#1ac2b6] transition-colors"
            >
              {expanded ? (
                <div className="p-2"><ChevronFirst className="text-gray-700 " size={25} /></div>
                
              ) : (
                <img src={logo} alt="Logo" className="w-10 h-10 p-0" />
              )}
            </button>
          </div>
          <hr className="border-gray-400 shadow-sm mx-3" />
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex flex-col flex-1 space-y-2 mt-4 px-2">
              {children}
            </ul>
          </SidebarContext.Provider>
          <div className="flex flex-col items-start px-2 pb-1 space-y-3">
            {[
              { icon: <User size={24} />, text: "Profile" },
              { icon: <MessageCircleQuestionMark size={24} />, text: "Help" },
              { icon: <LogOut size={24} />, text: "Logout" },
            ].map((item, index) => (
              <button
                key={index}
                className={`flex items-center w-full font-medium rounded-lg transition-all duration-300 hover:bg-[#1ac2b6] text-gray-800 px-3 py-2 ${
                  expanded ? "justify-start" : "justify-center"
                }`}
                title={item.text}
                style={{ border: "none", boxShadow: "none" }}
              >
                {item.icon}
                {expanded && <span className="ml-3">{item.text}</span>}
              </button>
            ))}
          </div>
        </aside>
      )}
    </>
  );
}

// ---- SIDEBAR ITEM COMPONENT ----
export function SidebarItem({
  to,
  icon,
  text,
  alert,
  asButton,
  onClick,
  className,
}) {
  const { expanded } = useContext(SidebarContext);

 const baseClass = `
    relative group flex items-center my-2
    bg-[#def4f3] w-full
    font-medium rounded-lg text-gray-800
    transition-colors duration-200
  `;

  const buttonContent = (
    <>
      <span className="text-gray-700">{icon}</span>
      {expanded && (
        <span
          className={`ml-3 overflow-hidden transition-all duration-300 ${className || ""}`}
        >
          {text}
        </span>
      )}
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-[#1ac2b6] ${expanded ? "" : "top-2"}`}
        />
      )}
      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-2 bg-[#1ac2b6] text-white text-sm
            opacity-0 group-hover:opacity-100 transition-all
          `}
          style={{ border: "none", boxShadow: "none" }}
        >
          {text}
        </div>
      )}
    </>
  );

  if (asButton) {
    return (
      <li className={baseClass}>
        <button
          onClick={onClick}
          className="flex items-center w-full px-3 py-3 rounded-lg outline-none focus:outline-none
          hover:bg-[#1ac2b6] active:bg-[#1ac2b6] transition-colors duration-200"
          style={{ border: "none", boxShadow: "none" }}
        >
          {buttonContent}
        </button>
      </li>
    );
  }

  return (
    <li className={baseClass}>
      <NavLink
        to={to}
        end
        onClick={onClick}
        tabIndex={0}
        className={({ isActive }) =>
          `sidebar-nav-link flex items-center w-full px-3 py-3 rounded-lg
     outline-none focus:outline-none
     ${isActive
       ? "bg-[#1ac2b6] hover:bg-[#1ac2b6] active:bg-[#1ac2b6]"
       : "bg-[#def4f3] hover:bg-[#1ac2b6] active:bg-[#1ac2b6]"
     }
     transition-colors duration-200`
        }
        style={{ border: "none", boxShadow: "none" }}
      >
        {buttonContent}
      </NavLink>
    </li>
  );
}