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

  const hamburgerLineBase =
    "h-[2px] w-[20px] bg-black transition-all duration-300 ease-in-out";
  const hamburgerLineTop = `${hamburgerLineBase} ${
    isOpen
      ? "rotate-45 translate-y-[5px]"
      : ""
  }`;
  const hamburgerLineBottom = `${hamburgerLineBase} ${
    isOpen
      ? "-rotate-45 -translate-y-[5px]"
      : ""
  }`;

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center gap-1.5 h-full"
        aria-label="Open menu"
      >
        <div className={hamburgerLineTop} />
        <div className={hamburgerLineBottom} />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[75vw] max-w-xs bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 p-8 mt-12">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-lg font-semibold text-zinc-900 transition-colors hover:text-red-600"
              onClick={closeMenu}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}