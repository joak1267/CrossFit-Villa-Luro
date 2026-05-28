export default function Pricing() {
  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 py-24 border-t border-slate-900 relative z-10 w-full">
      <div className="text-center flex flex-col items-center gap-4 mb-20">
        <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-widest bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-500/20 shadow-sm">
          RETORNO DE INVERSIÓN INMEDIATO
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Adquiere tu infraestructura comercial
        </h2>
        <p className="text-slate-400 max-w-xl text-xs sm:text-sm leading-relaxed">
          Paga una sola vez, quédate con el software para siempre y extrae prospectos infinitos. Recuperas la inversión cerrando una sola landing page básica.
        </p>
      </div>

      <div className="flex justify-center w-full relative">
        {/* Glow de fondo dorado/cyan para llamar la atención del ojo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Tarjeta de Precios de Alto Impacto CRO */}
        <div className="bg-slate-900/40 border-2 border-cyan-500/40 hover:border-cyan-500/70 rounded-3xl p-8 max-w-lg w-full shadow-[0_0_50px_rgba(6,182,212,0.02)] backdrop-blur-md relative overflow-hidden flex flex-col gap-6 transition-all duration-300 relative z-10">
          
          {/* Badge de Oferta Especial */}
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <span className="bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-inner">
                PLAN FUNDADOR
              </span>
              <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider">
                50% OFF HOY
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 line-through block font-bold tracking-wider uppercase">PRECIO NORMAL $80.000</span>
              <span className="text-3xl md:text-4xl font-black text-emerald-400 tracking-tight block mt-0.5 animate-pulse">
                $40.000 ARS
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-white">Scrap Web System Suite</h3>
            <p className="text-xs text-slate-400 leading-relaxed mt-1">
              Acceso ilimitado al extractor autónomo. Extrae bases de datos enteras en tu zona sin pagar suscripciones recurrentes ni costos extras de servidores.
            </p>
          </div>

          <hr className="border-slate-800/80" />

          {/* Lista de características ultra convincente */}
          <ul className="flex flex-col gap-3.5 text-xs text-slate-300 font-medium">
            {[
              "Descarga directa del instalador portable (.exe para Windows)",
              "Clave de activación perpetua (uso ilimitado de por vida)",
              "Cero costos de API de Google (Simulación de hardware local)",
              "Filtro autónomo avanzado que elimina redes sociales y basura",
              "Estructuración e Inyección nativa en Excel (.xlsx) limpia",
              "Soporte técnico directo y actualizaciones gratis para siempre"
            ].map((text, keyIndex) => (
              <li key={keyIndex} className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <svg className="w-2.5 h-2.5 stroke-current" fill="none" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="leading-tight">{text}</span>
              </li>
            ))}
          </ul>

          {/* Botón de Compra Destacado Masivo */}
          <div className="flex flex-col gap-2 mt-2">
            <a
              href="#checkout"
              className="w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:via-teal-400 hover:to-emerald-400 text-slate-950 font-black text-xs md:text-sm py-4 px-4 rounded-xl transition-all shadow-[0_0_25px_rgba(6,182,212,0.2)] active:scale-[0.98] border border-cyan-400/20 text-center uppercase tracking-wider block"
            >
              🔒 Adquirir Licencia y Descargar Ahora
            </a>
            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 font-mono mt-1">
              <span>✓ Entrega Instantánea</span>
              <span>✓ Garantía de 14 Días</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
