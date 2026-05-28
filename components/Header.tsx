import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      {/* Brand logo & title */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-inner overflow-hidden transition-all duration-300 group-hover:border-cyan-500/40">
          <Image
            src="/logo.png"
            alt="Scrap Web System Logo"
            width={36}
            height={36}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>
        <div>
          <span className="text-sm md:text-base font-extrabold tracking-tight bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent block">
            Scrap Web System
          </span>
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block -mt-1 font-semibold">
            Joa Tech // Outbound Suite
          </span>
        </div>
      </Link>
      
      {/* Middle Navigation - CRO Optimized smooth scroll links */}
      <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-slate-400 font-semibold tracking-wider">
        <a href="#demo" className="hover:text-white transition-colors uppercase">
          Cómo funciona
        </a>
        <a href="#features" className="hover:text-white transition-colors uppercase">
          Características
        </a>
        <a href="#pricing" className="hover:text-white transition-colors uppercase">
          Precios
        </a>
        <a href="#faq" className="hover:text-white transition-colors uppercase">
          FAQ
        </a>
      </nav>

      {/* Right side conversion action button */}
      <div className="flex items-center gap-4">
        <a
          href="#checkout"
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-heartbeat"
        >
          Comprar Ahora ($40.000 ARS)
        </a>
      </div>
    </header>
  );
}
