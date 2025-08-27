"use client";
import { useState } from "react";
import Link from "next/link";


interface MobileNavbarProps {
  menuItems: MenuItem[];
}

export function MobileNavbar({ menuItems }: MobileNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      {/* Hamburger Button - Fixed positioning to stay on top */}
      <button
        onClick={toggleMenu}
        className="relative flex flex-col justify-center items-center w-8 h-8 z-[110] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-sm"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {/* Top line */}
        <span
          className={`block absolute h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ease-in-out ${
            isOpen 
              ? "rotate-45 translate-y-0" 
              : "-translate-y-2"
          }`}
        />
        
        {/* Middle line */}
        <span
          className={`block absolute h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
        />
        
        {/* Bottom line */}
        <span
          className={`block absolute h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ease-in-out ${
            isOpen 
              ? "-rotate-45 translate-y-0" 
              : "translate-y-2"
          }`}
        />
      </button>

      {/* Full-site Backdrop Blur */}
      <div
        className={`fixed h-screen inset-0 bg-black/40 backdrop-blur-md z-[90] transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />

      {/* Sliding Menu Panel */}
      <nav
        className={`fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-white shadow-2xl z-[100] transform transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="navigation"
        aria-label="Mobile navigation menu"
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col py-8">
          {menuItems.map((item, index) => (
            <Link
              key={item.path}
              href={item.path}
              className={`group relative px-6 py-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 transform ${
                isOpen 
                  ? "translate-x-0 opacity-100" 
                  : "translate-x-8 opacity-0"
              }`}
              style={{ 
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms' 
              }}
              onClick={closeMenu}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-medium tracking-wide">
                  {item.title}
                </span>
                <svg 
                  className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              {/* Hover indicator */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center" />
            </Link>
          ))}
        </div>

        {/* Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} eric.kulbiej
          </p>
        </div>
      </nav>
    </div>
  );
}