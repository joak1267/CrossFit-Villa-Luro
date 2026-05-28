"use client";

export default function Hero() {
  return (
    <div className="relative w-full overflow-hidden border-b border-slate-900/40 bg-slate-950">
      {/* Background map image with maximum clarity (opacity-[0.55]) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.55] pointer-events-none z-0"
        style={{ backgroundImage: 'url("/mapa-fondo.png")' }}
      ></div>
      {/* Soft gradient overlays to blend map edges into slate-950 smoothly */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_#020617_95%)] pointer-events-none z-0"></div>

      {/* Main Content - Centered Layout */}
      <section className="max-w-4xl mx-auto px-6 py-24 md:py-40 flex flex-col items-center text-center gap-8 relative z-10">
        
        {/* Semantic H1 designed for B2B Outbound Conversion */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
          Automatiza tu prospección en Maps y extrae{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            clientes listos para comprar
          </span>
        </h1>

        {/* CRO Copywriting explaining value proposition */}
        <p className="text-slate-200 text-sm md:text-base leading-relaxed font-sans max-w-2xl font-medium">
          No pierdas tiempo enviando correos a empresas gigantes con agencias contratadas.{" "}
          <strong>Scrap Web System</strong> barre zonas geográficas completas en Google Maps,
          filtra en segundos los locales comerciales que <span className="text-cyan-400 font-bold">no tienen sitio web</span>
           y exporta sus números de WhatsApp directos e Instagram en un Excel listo para que les
          vendas servicios de desarrollo y diseño web.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-2">
          <a
            href="#checkout"
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold text-xs px-8 py-4.5 rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98] border border-cyan-400/20 text-center uppercase tracking-wider"
          >
            Adquirir Licencia SWS — 50% OFF
          </a>
          <a
            href="#demo"
            className="w-full sm:w-auto border border-slate-800 hover:bg-slate-900/30 hover:border-slate-700 text-slate-300 hover:text-white font-semibold text-xs px-8 py-4.5 rounded-xl transition-all text-center uppercase tracking-wider"
          >
            Ver Consola en Vivo
          </a>
        </div>

      </section>
    </div>
  );
}
