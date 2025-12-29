import { useEffect, useState } from 'react';
import {type MenuItem, type NavbarLink} from '../../types'
// === CORRECCIÓN 1: Interfaces ===


interface NavbarProps {
  isClicked: boolean;
  toggleNavClick: () => void;
  menuItems: MenuItem[];
  ctaButton: NavbarLink | null;
}

const Navbar = ({ isClicked, toggleNavClick, menuItems, ctaButton }: NavbarProps) => {
  const [active, setActive] = useState('');
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<number | null>(null);

  useEffect(() => {
    setActive(window.location.pathname);
  }, []);

  const handleLinkClick = (href: string) => {
    setActive(href);
    if (window.innerWidth < 1024) {
      toggleNavClick();
    }
  };

  return (
    <>
      {/* ================= MOBILE NAVIGATION ================= */}
      <nav
        className={`${
          isClicked ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 z-50 h-screen bg-white/95 backdrop-blur-sm transition-all duration-500 lg:hidden shadow-xl`}
      >
        <div className="h-full w-80 bg-background pt-32 px-6 flex flex-col overflow-y-auto">
          <ul className="space-y-6">
            {menuItems.map((item) => {
              
              if (item.__component === 'elements.dropdown') {
                return (
                  <li key={item.id} className="flex flex-col">
    <button
      onClick={() =>
        setMobileDropdownOpen(
          mobileDropdownOpen === item.id ? null : item.id
        )
      }
      className="flex items-center justify-between font-semibold text-lg text-black"
    >
      {item.label.toUpperCase()}

      <svg
        className={`w-4 h-4 transition-transform duration-300 ${
          mobileDropdownOpen === item.id ? 'rotate-180' : ''
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <div
      className={`pl-4 ml-1 mt-2 space-y-3 border-l-2 border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
        mobileDropdownOpen === item.id
          ? 'max-h-40 opacity-100 translate-y-0'
          : 'max-h-0 opacity-0 -translate-y-1'
      }`}
    >
      {item.Links?.map((subLink) => (
        <a
          key={subLink.id}
          href={subLink.url}
          onClick={() => handleLinkClick(subLink.url)}
          className="block text-gray-600 text-base transition-colors hover:text-primary-blue"
        >
          {subLink.label}
        </a>
      ))}
    </div>
  </li>
                );
              }

              // CASO 2: LINK NORMAL
              return (
                <li key={item.id}>
                  <a
                    href={item.url}
                    className={`font-semibold text-lg ${active === item.url ? 'text-[#1C39BB]' : 'text-black'}`}
                    onClick={() => handleLinkClick(item.url)}
                  >
                    {item.label.toUpperCase()}
                  </a>
                </li>
              );
            })}
          </ul>

          {ctaButton && (
            <a
              href={ctaButton.url}
              className="mt-10 bg-dark-blue text-white font-bold py-3 rounded-md text-center hover:bg-[#1C39BB] transition-colors"
              onClick={() => handleLinkClick(ctaButton.url)}
            >
              {ctaButton.label.toUpperCase()}
            </a>
          )}
        </div>
      </nav>

      {/* ================= DESKTOP NAVIGATION ================= */}
      <nav className="hidden lg:flex items-center">
        <ul className="flex gap-10 items-center">
          {menuItems.map((item) => {
            
            // CASO 1: DROPDOWN DESKTOP
            if (item.__component === 'elements.dropdown') {
              return (
                <li key={item.id} className="relative group">
                  <button
                    className={`flex items-center gap-1 text-sm font-bold tracking-wide hover:text-[#1C39BB]  transition-colors ${
                      item.Links?.some(l => l.url === active) ? 'text-[#1C39BB]' : 'text-black'
                    }`}
                  >
                    {item.label.toUpperCase()}
                    <svg className="w-3 h-3 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="w-48 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden py-1">
                      {item.Links?.map((subLink) => (
                        <a
                          key={subLink.id}
                          href={subLink.url}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1C39BB] transition-colors"
                          onClick={() => setActive(subLink.url)}
                        >
                          {subLink.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
              );
            }

            // CASO 2: LINK NORMAL DESKTOP
            return (
              <li key={item.id}>
                <a
                  href={item.url}
                  className={`${
                    active === item.url ? 'text-[#1C39BB]' : 'text-black'
                  } text-sm font-bold tracking-wide hover:text-[#1C39BB] transition-colors`}
                  onClick={() => setActive(item.url)}
                >
                  {item.label.toUpperCase()}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;