"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const accepted = localStorage.getItem("sws-cookie-consent");
    if (!accepted) {
      // Delay visibility for premium entrance effect
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("sws-cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-slate-900/90 border border-slate-800/80 backdrop-blur-lg p-5 rounded-2xl shadow-2xl z-50 flex flex-col gap-4 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 shrink-0">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Política de Cookies
          </h4>
          <p className="text-[11px] text-slate-350 leading-relaxed">
            Utilizamos cookies propias y de terceros para optimizar la prospección interactiva, garantizar la seguridad del checkout y analizar el tráfico de **Joa Tech**.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 border-t border-slate-800/60 pt-3">
        <button
          onClick={() => setIsVisible(false)}
          className="text-[10px] text-slate-400 hover:text-white font-semibold transition-colors"
        >
          Rechazar
        </button>
        <button
          onClick={handleAccept}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[10px] font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-md shadow-cyan-500/10"
        >
          Aceptar Cookies
        </button>
      </div>
    </div>
  );
}
