"use client";

import React, { useState } from "react";

// ✅ NUEVO: Interfaces para definir el tipado de los elementos de navegación
interface NavLinkItem {
  label: string;
  href: string;
}

interface GymNavbarProps {
  // ✅ NUEVO: URL dinámica de WhatsApp para el botón de llamada a la acción
  whatsappUrl: string;
}

const links: NavLinkItem[] = [
  { label: "Respaldos", href: "#certificaciones" },
  { label: "Clases", href: "#clases" },
  { label: "Equipo", href: "#coaches" },
  { label: "Comentarios", href: "#comunidad" },
  { label: "Horarios & Ubicación", href: "#contacto" },
];

// 🔄 REFACTOR: Subcomponente para el Logotipo (sin contenedor para hacerlo más grande y transparente) y título con brillo sutil
const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Logotipo del box renderizado directamente en su formato transparente y a mayor tamaño */}
      <img 
        src="/cvl-assets/logo.png" 
        alt="Logo CrossFit Villa Luro" 
        className="w-11 h-11 sm:w-12 sm:h-12 object-contain"
      />
      <div>
        {/* Título de marca con un gradiente metálico muy suave y un sutil resplandor de fondo que no satura */}
        <span className="text-sm sm:text-base font-black tracking-tight bg-gradient-to-r from-zinc-100 via-white to-zinc-300 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,255,255,0.12)] block uppercase leading-none font-sans">
          CrossFit Villa Luro
        </span>
      </div>
    </div>
  );
};

// 🔄 REFACTOR: Subcomponente para los enlaces de navegación (cambiada tipografía a font-sans, removidos los corchetes [])
const NavLinks: React.FC = () => {
  return (
    /* Centrado absoluto en pantallas grandes (PC) con lg:absolute lg:left-1/2 lg:-translate-x-1/2 */
    <nav className="hidden lg:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2 items-center gap-8 text-xs font-sans font-semibold tracking-wide text-zinc-400">
      {links.map((link) => (
        <a 
          key={link.href} 
          href={link.href} 
          className="hover:text-orange-500 transition-colors uppercase whitespace-nowrap"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
};

// 🔄 REFACTOR: Subcomponente para el botón de conversión principal (añadido efecto animate-heartbeat)
const CtaButton: React.FC<{ href: string }> = ({ href }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      /* Añadida la clase animate-heartbeat para lograr el efecto de movimiento de corazón y tipografía font-sans */
      className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold font-sans px-4 py-2.5 rounded-md border border-orange-700 hover:border-orange-500 uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-[0_0_15px_rgba(234,88,12,0.15)] animate-heartbeat block text-center"
    >
      Reservar Clase
    </a>
  );
};

// 🔄 REFACTOR: Componente principal GymNavbar que orquesta los subcomponentes actualizados con menú móvil
export default function GymNavbar({ whatsappUrl }: GymNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-zinc-900 bg-zinc-950/90 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 py-4 flex items-center justify-between transition-all relative">
      {/* Logotipo y marca oficial */}
      <Logo />

      {/* Lista de enlaces minimalistas para pantallas grandes */}
      <NavLinks />

      {/* Contenedor de acciones del lado derecho */}
      <div className="flex items-center gap-4">
        {/* Botón CTA de reserva (oculto en móviles pequeños) */}
        <div className="hidden sm:block">
          <CtaButton href={whatsappUrl} />
        </div>

        {/* Botón menú móvil (hamburguesa) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden flex items-center justify-center p-2 rounded border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white transition-colors cursor-pointer w-10 h-10"
          aria-label="Abrir menú"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menú móvil desplegable */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-zinc-950/95 border-b border-zinc-900 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-[300px] opacity-100 py-6" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-5 font-sans font-semibold text-sm text-zinc-300">
          {links.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-orange-500 transition-colors uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
          {/* CTA para móviles cuando no está el botón superior */}
          <div className="w-full px-6 pt-3 border-t border-zinc-900/60 flex justify-center sm:hidden">
            <div className="w-full max-w-xs">
              <CtaButton href={whatsappUrl} />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
