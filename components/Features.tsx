import React from "react";

export default function Features() {
  const steps = [
    {
      num: "01",
      phase: "BÚSQUEDA AUTOMATIZADA",
      title: "Extracción Profunda en Google Maps",
      desc: "El motor inyecta comandos de navegación simulada sobre los servidores de Maps. Se mueve por el feed lateral imitando el comportamiento de un operador humano para extraer comercios reales con teléfonos y geolocalización activa.",
      badge: "Playwright Core / Sandbox",
      color: "group-hover:border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      )
    },
    {
      num: "02",
      phase: "DIAGNÓSTICO DIGITAL",
      title: "Filtro Autónomo 'Anti-Basura'",
      desc: "El sistema inspecciona las firmas de código de cada comercio. Ejecuta un descarte masivo de directorios genéricos (Facebook, Yelp, MercadoLibre) y aísla con precisión milimétrica los locales comerciales que no tienen página web oficial.",
      badge: "RegExp Authority Filter",
      color: "group-hover:border-indigo-500/40 text-indigo-400 bg-indigo-500/10",
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
        </svg>
      )
    },
    {
      num: "03",
      phase: "CONSOLIDACIÓN DE DATOS",
      title: "Inyección e Informe CRM Instantáneo",
      desc: "Toda la información depurada se escribe directamente en un documento Excel estructurado desde tu entorno de forma nativa. Genera bases limpias listas para importar en tu CRM, organizadas por nombre, teléfono directo y ubicación.",
      badge: "XLSX Native Compilar",
      color: "group-hover:border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      )
    },
    {
      num: "04",
      phase: "DESPLIEGUE LOCAL",
      title: "Licencia Vitalicia sin Suscripciones",
      desc: "El software se ejecuta en tu hardware de manera local vinculándose al identificador de tu placa madre. Esto destruye la necesidad de pagar mensualidades, costos por llamadas de API de Google o depender de servidores externos en la nube.",
      badge: "Motherboard Lock UUID",
      color: "group-hover:border-purple-500/40 text-purple-400 bg-purple-500/10",
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m1.5 7.5H3m15-7.5h1.5m-1.5 7.5h1.5m-7.5 5.25V19.5m-3.75 0v1.5m7.5-1.5v1.5M7.5 18h9a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 16.5 6h-9A1.5 1.5 0 0 0 6 7.5v9A1.5 1.5 0 0 0 7.5 18ZM9 9h6v6H9V9Z" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="max-w-6xl mx-auto px-6 py-24 border-t border-slate-900/60 relative z-10">
      <div className="text-center flex flex-col items-center gap-4 mb-20">
        <span className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-widest bg-indigo-950/40 px-3 py-1.5 rounded-full border border-indigo-500/20 shadow-sm">
          MÉTODO E INFRAESTRUCTURA
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Cómo Scrap Web System automatiza <br />
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            tu flujo de prospección en frío
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl text-xs sm:text-sm leading-relaxed">
          Diseñamos una tubería de software secuencial para que consigas bases de datos de clientes con una necesidad comercial crítica e inmediata: la falta de presencia web.
        </p>
      </div>

      {/* Refactorización de diseño: Tarjetas de flujo tecnológico entrelazadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className="group relative bg-slate-900/20 border border-slate-900 hover:border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col gap-5 transition-all duration-300 backdrop-blur-sm"
          >
            {/* Indicador de fase flotante */}
            <div className="absolute top-6 right-6 font-mono text-3xl font-black text-slate-800/40 group-hover:text-cyan-500/10 transition-colors select-none">
              {step.num}
            </div>

            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-slate-800 transition-all ${step.color}`}>
                {step.icon}
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                  {step.phase}
                </span>
                <h3 className="text-base md:text-lg font-bold text-white tracking-tight mt-0.5 group-hover:text-white transition-colors">
                  {step.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans flex-grow">
              {step.desc}
            </p>

            <div className="border-t border-slate-900/60 pt-4 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500 bg-slate-950/60 px-2.5 py-1 rounded border border-slate-900 uppercase tracking-wider font-semibold">
                {step.badge}
              </span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 group-hover:bg-cyan-400 transition-colors"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/40 group-hover:bg-indigo-400 transition-colors"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
