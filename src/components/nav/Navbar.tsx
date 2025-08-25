import Link from "next/link";
import { MobileNavbar } from "./MobileNavbar";
import { menuItems } from "@/data/menu";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-screen-lg mx-auto p-3 flex justify-between items-center">
        {/* Left Side: Logo/Name */}
        <Link href="/" className="text-zinc-900 text-lg lg:text-2xl font-bold">
          <span className="text-blue-500">eric</span>.kulbiej
        </Link>

        {/* Right Side: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-md font-medium">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-foreground transition-colors hover:text-blue-500 hover:underline"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Component */}
        <MobileNavbar menuItems={menuItems} />
      </div>
    </header>
  );
}
