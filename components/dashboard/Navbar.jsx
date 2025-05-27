'use client'
import { useState, useEffect } from "react"
import { Bell, Scale } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300  ${
        scrolled 
          ? "bg-background/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-12 px-4 md:px-6 ">
        <Link href="/" className="flex items-center gap-2 text-blue-400 font-semibold text-lg">
          <Scale className="h-6 w-6" />
          <span className="text-blue-400">Weight Scale Monitor</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <ModeToggle/>
          <Bell className="h-4 w-4 text-gray-800 dark:text-gray-300 hover:text-gray-800 transition-colors" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
