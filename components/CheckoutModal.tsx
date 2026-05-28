"use client";

import { useState, useEffect } from "react";

export default function CheckoutModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generatedKey, setGeneratedKey] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#checkout") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Initialize state on mount
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleClose = () => {
    // Clear hash to trigger hashchange event and close modal
    window.location.hash = "";
    // Delay resetting states so the transition runs smoothly
    setTimeout(() => {
      setSuccess(false);
      setGeneratedKey("");
      setIsSimulating(false);
    }, 300);
  };

  const handleSimulatePayment = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const rand = () => Math.random().toString(36).substring(2, 6).toUpperCase();
      const license = `SWS-${rand()}-${rand()}-${rand()}`;
      setGeneratedKey(license);
      setIsSimulating(false);
      setSuccess(true);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 max-w-md w-full shadow-2xl relative overflow-hidden flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Simulación de Pago Único
          </h3>
          <button
            onClick={handleClose}
            className="text-slate-550 hover:text-white text-xs font-mono bg-transparent border-none cursor-pointer"
          >
            Cerrar
          </button>
        </div>

        {/* Modal Info */}
        <div className="flex flex-col gap-3 text-center py-4 items-center">
          <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 mb-1">
            <svg
              className={`w-6 h-6 ${isSimulating ? "animate-spin" : "animate-bounce"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isSimulating ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              )}
            </svg>
          </div>
          <p className="text-xs text-slate-350 px-4 leading-relaxed font-sans">
            ¡Hola! Estás probando la simulación del checkout de compra de **Scrap Web System**.
          </p>
          <span className="text-xs font-bold text-cyan-400 bg-cyan-950/30 px-3 py-1.5 rounded-lg border border-cyan-500/10 font-mono">
            Simulador: Llévate una clave de regalo gratis
          </span>
        </div>

        {/* Action Button */}
        {!success && (
          <div className="flex flex-col gap-2">
            <button
              onClick={handleSimulatePayment}
              disabled={isSimulating}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold text-xs py-3.5 px-4 rounded-xl transition-all cursor-pointer border-none shadow-lg shadow-cyan-500/10"
            >
              {isSimulating ? "Procesando pago seguro..." : "💳 Simular Pago de $40.000 ARS"}
            </button>
          </div>
        )}

        {/* Success License View */}
        {success && (
          <div className="flex flex-col gap-3 border-t border-slate-800 pt-3 animate-in fade-in duration-300">
            <p className="text-[11px] text-emerald-450 font-semibold bg-emerald-950/20 border border-emerald-500/15 py-2.5 px-3 rounded-lg text-center">
              ✅ Pago simulado correctamente. ¡Aquí tienes tu licencia!
            </p>
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">
                Tu Clave de Licencia (SWS Key)
              </span>
              <div className="text-xs font-mono text-white bg-slate-950 px-3 py-2.5 rounded-xl border border-slate-900 break-all select-all flex items-center justify-between">
                <span className="font-bold text-cyan-400">{generatedKey}</span>
                <button
                  onClick={handleCopy}
                  className="text-[10px] text-cyan-400 font-sans border-none bg-transparent hover:text-cyan-300 cursor-pointer font-semibold uppercase tracking-wider"
                >
                  {copied ? "¡Copiado!" : "Copiar"}
                </button>
              </div>
            </div>
            <p className="text-[10px] text-slate-450 leading-relaxed text-center font-sans">
              Copia esta clave, pégala en la pantalla de activación de tu software y quedará asociada a tu PC de por vida.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
