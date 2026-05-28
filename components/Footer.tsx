import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 py-8 px-6 text-center text-xs text-slate-550 font-mono bg-slate-950/40 relative z-10 flex flex-col gap-3">
      <div>
        <p>Scrap Web System &copy; 2026 // Diseñado para Prospección Web Local</p>
        <p className="text-[10px] text-slate-700 mt-1">
          Este software no está afiliado ni patrocinado por Google Inc.
        </p>
      </div>
      <div className="flex justify-center gap-4 text-[10px] text-slate-600">
        <Link href="/terms" className="hover:text-cyan-400 hover:underline transition-all">
          Términos y Condiciones
        </Link>
        <span>•</span>
        <Link href="/cookies" className="hover:text-cyan-400 hover:underline transition-all">
          Política de Cookies
        </Link>
      </div>
    </footer>
  );
}
