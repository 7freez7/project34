"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../data/logo.png";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle dropdown menu
  const handleDropdownClick = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".dropdown")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-16 w-auto" src={Logo} alt="School Logo" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="relative dropdown">
              <button
                onClick={() => handleDropdownClick("uvod")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                Úvod
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === "uvod" && (
                <ul className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <DropdownItem title="Hlavní stránka" href="/" />
                  <DropdownItem title="Učitelé" href="/uvod/teachers" />
                </ul>
              )}
            </div>

            <NavItem title="Aktuality" href="/aktuality" />
            <NavItem title="Dokumenty" href="/documents" />
            <NavItem title="Elektronická Žk." href="https://klasifikace.jphsw.cz/?hash=c24cd76e1ce41366a4bbe8a49b02a028" />
            <NavItem title="Kontakt" href="/kontakt" />
            <NavItem title="Chci na ZUŠ" href="/chcinazus/prijmacirizeni" customClasses="bg-red-500 text-white border-2 border-red-500 hover:bg-red-600 hover:border-red-600" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg">
            <div className="flex flex-col space-y-2 p-4">
              <MobileNavItem title="Úvod" href="#" />
              <MobileNavItem title="Aktuality" href="/aktuality" />
              <MobileNavItem title="Dokumenty" href="/documents" />
              <MobileNavItem title="Elektronická Žk." href="https://klasifikace.jphsw.cz/?hash=c24cd76e1ce41366a4bbe8a49b02a028" />
              <MobileNavItem title="Kontakt" href="/kontakt" />
              <MobileNavItem title="Chci na ZUŠ" href="/chcinazus/prijmacirizeni" customClasses="bg-red-500 text-white" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Desktop NavItem Component
const NavItem: React.FC<{ title: string; href: string; customClasses?: string }> = ({ title, href, customClasses = "" }) => {
  return (
    <Link to={href} className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium ${customClasses}`}>
      {title}
    </Link>
  );
};

// Dropdown Item Component
const DropdownItem: React.FC<{ title: string; href: string }> = ({ title, href }) => {
  return (
    <li>
      <Link to={href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600">
        {title}
      </Link>
    </li>
  );
};

// Mobile NavItem Component
const MobileNavItem: React.FC<{ title: string; href: string; customClasses?: string }> = ({ title, href, customClasses = "" }) => {
  return (
    <Link to={href} className={`block px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 text-sm font-medium ${customClasses}`}>
      {title}
    </Link>
  );
};

export default Navbar;
