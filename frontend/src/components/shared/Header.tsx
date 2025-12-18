import { useState } from "react";
import Navbar from "../common/Navbar"; 
import { Logo } from "../ui/logoHeader"; 
import { AlignLeft, X } from 'lucide-react';
import { type NavbarLink, type MenuItem } from "../../types";

interface HeaderProps {
  menuItems: MenuItem[];
  ctaButton: NavbarLink | null;
}

const Header = ({ menuItems, ctaButton }: HeaderProps) => {
  const [isClicked, setIsClicked] = useState(false);
  
  const toggleNavClick = () => {
    setIsClicked(!isClicked);
  }

  return (
    <header className="flex items-center justify-between lg:justify-around px-5 lg:px-20 py-6 shadow-md bg-white relative z-50">
      {/* Logo */}
      <a href="/" className="flex items-center z-50">
        <Logo />
      </a>

      {/* Desktop Nav + Mobile Menu Logic */}
      <Navbar 
        isClicked={isClicked} 
        toggleNavClick={toggleNavClick} 
        menuItems={menuItems}
        ctaButton={ctaButton}
      />

      {/* Botón Desktop Contacto */}
      {ctaButton && (
        <a
          href={ctaButton.url}
          className="hidden lg:block bg-[#011F5B] hover:bg-[#1C39BB] text-white font-bold px-6 py-2 rounded-md text-sm transition-colors duration-300"
        >
          {ctaButton.label.toUpperCase()}
        </a>
      )}

      {/* Mobile Toggle */}
      <div className="lg:hidden cursor-pointer z-50 text-black" onClick={toggleNavClick}>
        {isClicked ? (
          <X size={26} />
        ) : (
          <AlignLeft size={26} />
        )}
      </div>
    </header>
  )
}

export default Header;