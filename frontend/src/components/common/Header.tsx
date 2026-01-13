import { useState } from "react";
import Navbar from "./Navbar"; 
import { Logo } from "../ui/logoHeader"; 
import { AlignLeft, X } from 'lucide-react';
// Importamos tus interfaces exactas
import { type NavbarLink, type MenuItem } from "../../types";
import { getLocalizedPath } from "@/i18n/utils";

interface HeaderProps {
  menuItems: MenuItem[];
  ctaButton: NavbarLink | null;
  lang: string;
}

const Header = ({ menuItems, ctaButton, lang }: HeaderProps) => {
  const [isClicked, setIsClicked] = useState(false);
  
  const toggleNavClick = () => {
    setIsClicked(!isClicked);
  }

  const logoUrl = getLocalizedPath('/', lang);
  const ctaUrl = ctaButton ? getLocalizedPath(ctaButton.url, lang) : '#';

  return (
    <header role="banner" className="fixed top-0 left-0 w-full flex items-center justify-between lg:justify-around px-5 lg:px-20 py-6 shadow-md bg-white z-50">
      <a href={logoUrl} aria-label="home" className="flex items-center z-50">
        <Logo />
      </a>

      <Navbar 
        isClicked={isClicked} 
        toggleNavClick={toggleNavClick} 
        menuItems={menuItems}
        ctaButton={ctaButton}
        lang={lang}
      />

      {ctaButton && (
        <a
          aria-label={ctaButton.label}
          href={ctaUrl}
          className="hidden lg:block bg-dark-blue text-white font-bold px-6 py-2 rounded-md text-sm transition-colors duration-300"
        >
          {ctaButton.label.toUpperCase()}
        </a>
      )}

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