export default function VideoShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t border-slate-950 relative z-10 w-full">
      {/* Glow ambiente detrás del reproductor gigante */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none z-0"></div>

      <div className="text-center flex flex-col items-center gap-4 mb-16 relative z-10">
        <span className="text-[10px] sm:text-xs text-cyan-400 font-mono font-bold uppercase tracking-widest bg-cyan-950/40 px-3 py-1.5 rounded-full border border-cyan-500/20 shadow-sm shadow-cyan-500/5">
          DEMOSTRACIÓN DE ARQUITECTURA
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Mira el sistema en acción <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
            extrayendo datos en tiempo real
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl text-xs sm:text-sm leading-relaxed">
          Descubre en una demostración sin cortes de 3 minutos cómo el motor automatizado barre Google Maps, descarta competidores y estructura tu próxima base de datos de ventas.
        </p>
      </div>

      {/* Contenedor Gigante Formato Pantalla de Cine */}
      <div className="relative group rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/60 shadow-[0_0_50px_rgba(6,182,212,0.05)] aspect-video max-w-6xl mx-auto flex items-center justify-center transition-all duration-500 hover:border-cyan-500/30 hover:shadow-[0_0_60px_rgba(6,182,212,0.1)] relative z-10">
        
        {/* Capas de gradientes interactivos de alta gama */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-indigo-500/5 opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/60 via-slate-950/90 to-slate-950">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.3)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(18,24,38,0.3)_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          {/* Botón de reproducción premium gigante */}
          <div className="w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-400/50 flex items-center justify-center text-cyan-400 group-hover:text-white transition-all duration-300 shadow-xl group-hover:shadow-cyan-500/20 shadow-cyan-500/5 cursor-pointer relative z-20 group-hover:scale-105 active:scale-95">
            <svg className="w-10 h-10 fill-current translate-x-0.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-6 font-bold group-hover:text-cyan-400 transition-colors">
            INICIAR REPRODUCTOR ULTRA HD // 03:15 MIN
          </span>
          <p className="text-[11px] text-slate-500 mt-2 max-w-xs leading-relaxed">
            Haz clic para validar el flujo completo del bot operando en segundo plano de forma autónoma.
          </p>
        </div>

        {/* HUD Técnico Periférico */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-900 text-[10px] font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>SWS_LIVE_SCANNER_PREVIEW.MP4</span>
        </div>
        
        <div className="absolute top-6 right-6 z-20 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-900 text-[10px] font-mono text-cyan-400 font-bold tracking-wider">
          SYSTEM_PREVIEW // 4K
        </div>
      </div>
    </section>
  );
}
