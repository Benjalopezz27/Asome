import { useEffect, useState, useRef } from 'react'; // 1. Importamos useRef (opcional, para clicks fuera)
import { type MenuItem, type NavbarLink } from '../../types';
import { getLocalizedPath } from "@/i18n/utils";

interface NavbarProps {
  isClicked: boolean;
  toggleNavClick: () => void;
  menuItems: MenuItem[];
  ctaButton: NavbarLink | null;
  lang: string;
}

const Navbar = ({ isClicked, toggleNavClick, menuItems, ctaButton, lang }: NavbarProps) => {
  const [active, setActive] = useState('');
  // Estado para mobile ya lo tenías
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<number | null>(null);
  
  // 2. NUEVO: Estado para controlar el dropdown en escritorio
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<number | null>(null);

  useEffect(() => {
    setActive(window.location.pathname);
  }, []);

  const handleLinkClick = (href: string) => {
    setActive(href);
    if (window.innerWidth < 1024) {
      toggleNavClick();
    }
    // Cerramos el dropdown de escritorio al navegar
    setDesktopDropdownOpen(null);
  };

  // 3. NUEVO: Función para manejar la tecla Enter (y Espacio)
  const handleDesktopKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Evita scroll con la barra espaciadora
      setDesktopDropdownOpen(prev => prev === id ? null : id);
    }
    // Accesibilidad extra: Cerrar con Escape
    if (e.key === 'Escape') {
      setDesktopDropdownOpen(null);
    }
  };

  // 4. NUEVO: Función para manejar click en escritorio (para que sea híbrido click/hover)
  const handleDesktopClick = (id: number) => {
     setDesktopDropdownOpen(prev => prev === id ? null : id);
  };

  const mobileCtaUrl = ctaButton ? getLocalizedPath(ctaButton.url, lang) : '#';

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isClicked 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={toggleNavClick} 
        aria-hidden="true"
      />

      {/* ================= MOBILE NAVIGATION (Sin cambios mayores) ================= */}
      <nav role='navigation'
        className={`${
          isClicked ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 z-50 h-full bg-white/95 backdrop-blur-sm transition-all duration-500 lg:hidden shadow-xl`}
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
                      /* Los botones nativos ya activan onClick con Enter, pero agregamos type */
                      type="button" 
                      aria-expanded={mobileDropdownOpen === item.id}
                      className="flex items-center justify-between font-semibold text-lg text-black"
                      suppressHydrationWarning={true} 
                    >
                      {item.label.toUpperCase()}
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          mobileDropdownOpen === item.id ? 'rotate-180' : ''
                        }`}
                        fill="none" viewBox="0 0 24 24" stroke="darkblue"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                      </svg>
                    </button>

                    <div
                      className={`pl-4 ml-1 mt-2 space-y-3 border-l-2 border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
                        mobileDropdownOpen === item.id
                          ? 'max-h-40 opacity-100 translate-y-0'
                          : 'max-h-0 opacity-0 -translate-y-1'
                      }`}
                    >
                      {item.Links.map((subLink) => {
                        const subUrl = getLocalizedPath(subLink.url, lang);
                        return (
                          <a
                            key={subLink.id}
                            href={subUrl}
                            onClick={() => handleLinkClick(subUrl)}
                            className="block text-gray-600 text-base transition-colors duration-200 hover:font-bold hover:text-black"
                          >
                            {subLink.label}
                          </a>
                        );
                      })}
                    </div>
                  </li>
                );
              }

              const itemUrl = getLocalizedPath(item.url, lang);
              return (
                <li key={item.id}>
                  <a
                    href={itemUrl}
                    className={`font-semibold text-lg ${active === itemUrl ? 'primary-blue' : 'text-black'}`}
                    onClick={() => handleLinkClick(itemUrl)}
                  >
                    {item.label.toUpperCase()}
                  </a>
                </li>
              );
            })}
          </ul>
            {/* ... CTA Button mobile ... */}
             {ctaButton && (
            <a
              href={mobileCtaUrl}
              className="mt-10 bg-dark-blue text-white font-bold py-3 rounded-md text-center hover:bg-[#1C39BB] transition-colors text-sm lg:text-[16px]"
              onClick={() => handleLinkClick(mobileCtaUrl)}
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
            
            // CASE 1: Dropdown
            if (item.__component === 'elements.dropdown') {
              const isChildActive = item.Links.some(l => getLocalizedPath(l.url, lang) === active);
              // 5. Verificamos si este item específico está abierto por teclado o mouse click
              const isOpen = desktopDropdownOpen === item.id;

              return (
                <li 
                  key={item.id} 
                  className="relative group"
                  // 6. Accesibilidad: cerramos si el mouse sale (opcional, para mantener híbrido)
                  onMouseLeave={() => setDesktopDropdownOpen(null)}
                >
                  <button
                    // 7. Agregamos los eventos de teclado y click
                    onKeyDown={(e) => handleDesktopKeyDown(e, item.id)}
                    onClick={() => handleDesktopClick(item.id)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    type="button"
                    className={`flex items-center gap-1 text-sm lg:text-[16px] font-bold hover:text-[#1C39BB] transition-colors ${
                      isChildActive ? 'primary-blue' : 'text-black'
                    }`}
                  >
                    {item.label.toUpperCase()}
                    <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : 'group-hover:rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="darkblue">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div 
                    // 8. LÓGICA CSS COMBINADA:
                    // Se muestra si hay Hover (group-hover:...) O si isOpen es true
                    className={`absolute top-full left-0 pt-4 transition-all duration-200 transform z-50
                      ${isOpen 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'
                      }
                    `}
                  >
                    <div className="w-48 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden py-1">
                      {item.Links.map((subLink) => {
                        const subUrl = getLocalizedPath(subLink.url, lang);
                        return (
                          <a
                            key={subLink.id}
                            href={subUrl}
                            className="block px-4 py-3 text-sm text-gray-700 hover:font-bold hover:text-black transition-all duration-200 focus:bg-gray-50 focus:font-bold"
                            onClick={() => handleLinkClick(subUrl)}
                          >
                            {subLink.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            }

            // CASE 2: Single Link
            const itemUrl = getLocalizedPath(item.url, lang);
            
            return (
              <li key={item.id}>
                <a
                  aria-label={item.label}
                  href={itemUrl}
                  className={`${
                    active === itemUrl ? 'primary-blue' : 'text-black'
                  } text-sm lg:text-[16px] font-bold hover:text-[#1C39BB] transition-colors`}
                  onClick={() => setActive(itemUrl)}
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