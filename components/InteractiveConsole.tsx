"use client";

import { useState, useEffect, useRef } from "react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  address: string;
  source: "IG" | "MAPS" | "FB";
}

interface LogLine {
  text: string;
  type: "system" | "info" | "success" | "skip" | "default";
}

const ALL_LOGS: LogLine[] = [
  { text: "[SISTEMA] Iniciando lote de búsqueda para: Gimnasios en Villa Luro...", type: "system" },
  { text: "Levantando Chromium (Instalación automática activa)...", type: "default" },
  { text: "⏳ Esperando 4 segundos para inicialización de sesión de Maps...", type: "info" },
  { text: "Cargando locales mediante scroll automático en el mapa...", type: "default" },
  { text: "👉 [1/15] Escaneando: \"Iron Gym Villa Luro\"", type: "default" },
  { text: "🔍 Buscando web oficial... No detectada.", type: "info" },
  { text: "🎯 [OBJETIVO SIN WEB] Iron Gym | Tel: +54 11 3728-1920 | IG: @irongym_luro", type: "success" },
  { text: "👉 [2/15] Escaneando: \"Megatlon Villa Luro\"", type: "default" },
  { text: "🔍 Buscando web oficial... Detectada (megatlon.com)", type: "info" },
  { text: "   [Saltado: Megatlon tiene web oficial]", type: "skip" },
  { text: "👉 [3/15] Escaneando: \"Ferretería Liniers Center\"", type: "default" },
  { text: "🔍 Buscando web oficial... No detectada.", type: "info" },
  { text: "🎯 [OBJETIVO SIN WEB] Ferretería Liniers | Tel: +54 11 4641-0982", type: "success" },
  { text: "👉 [4/15] Escaneando: \"Estudio Pilates Harmony\"", type: "default" },
  { text: "🔍 Buscando web oficial... No detectada.", type: "info" },
  { text: "🎯 [OBJETIVO SIN WEB] Pilates Harmony | Tel: +54 11 2894-3310 | FB: Pilates Harmony", type: "success" },
  { text: "⏳ Guardando prospectos de forma segura en excel local...", type: "info" },
  { text: "💾 Abriendo archivo leads_sin_web.xlsx automáticamente...", type: "system" },
  { text: "✅ Escaneo finalizado. Prospección exitosa.", type: "success" },
];

const LEADS_DATA: Record<number, Lead> = {
  6: {
    id: "lead-1",
    name: "Iron Gym Villa Luro",
    phone: "+54 11 3728-1920",
    address: "Av. Rivadavia 9820",
    source: "IG",
  },
  12: {
    id: "lead-2",
    name: "Ferretería Liniers Center",
    phone: "+54 11 4641-0982",
    address: "Ramon Falcon 6710",
    source: "MAPS",
  },
  15: {
    id: "lead-3",
    name: "Estudio Pilates Harmony",
    phone: "+54 11 2894-3310",
    address: "Yerbal 5820",
    source: "FB",
  },
};

export default function InteractiveConsole() {
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [discoveredLeads, setDiscoveredLeads] = useState<Lead[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isRunning) return;

    if (currentStep < ALL_LOGS.length) {
      const timer = setTimeout(() => {
        const nextLog = ALL_LOGS[currentStep];
        setLogs((prev) => [...prev, nextLog]);

        // Check if this step uncovers a lead
        if (LEADS_DATA[currentStep]) {
          setDiscoveredLeads((prev) => [...prev, LEADS_DATA[currentStep]]);
        }

        setCurrentStep((prev) => prev + 1);
      }, currentStep === 0 ? 500 : currentStep === 2 || currentStep === 16 ? 2000 : 1000);

      return () => clearTimeout(timer);
    } else {
      // Loop simulator: Wait 5 seconds and restart
      const restartTimer = setTimeout(() => {
        setLogs([]);
        setDiscoveredLeads([]);
        setCurrentStep(0);
      }, 5000);

      return () => clearTimeout(restartTimer);
    }
  }, [currentStep, isRunning]);

  // Scroll to bottom of terminal automatically
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Calculates percentage based on logs length
  const progressPercent = Math.min(
    Math.round((currentStep / ALL_LOGS.length) * 100),
    100
  );

  return (
    <section id="demo" className="max-w-5xl mx-auto px-6 pb-24 relative z-10">
      <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-4 md:p-6 backdrop-blur-md shadow-2xl shadow-cyan-500/5 relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Window Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/40"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/40"></span>
              <span className="w-3 h-3 rounded-full bg-cyan-500/40 animate-pulse"></span>
            </span>
            <span className="text-xs font-mono text-slate-400 ml-2 font-semibold uppercase tracking-wider">
              Scrap Web System - Consola Interactiva en Vivo
            </span>
          </div>
          <div className="text-xs font-mono text-slate-500 bg-slate-950 px-2.5 py-1 rounded border border-slate-900 flex items-center gap-2">
            PROCESO:{" "}
            <span className="text-cyan-400 font-bold">
              {discoveredLeads.length} / 3 LEADS SIN WEB
            </span>
          </div>
        </div>

        {/* Mockup Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / Upper: Control Box Mock & Table */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Scraper Config Panel Mock */}
            <div className="bg-slate-950/80 border border-slate-800/40 rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                  Búsquedas en Google Maps
                </span>
                <div className="bg-slate-900 border border-slate-800 px-3 py-2.5 rounded-xl text-xs font-mono text-cyan-400">
                  Gimnasios en Villa Luro
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                    Límite por búsqueda
                  </span>
                  <span className="bg-slate-900 border border-slate-800/60 px-3 py-2 rounded-xl text-xs text-white">
                    15 locales
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                    Planilla de Destino
                  </span>
                  <span className="bg-slate-900 border border-slate-800/60 px-3 py-2 rounded-xl text-xs text-cyan-400 font-mono">
                    leads_sin_web.xlsx
                  </span>
                </div>
              </div>

              {/* Progress Bar Mock */}
              <div className="flex flex-col gap-1.5 mt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Progreso de Escaneo</span>
                  <span className="text-cyan-400 font-mono font-semibold">
                    {progressPercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800/50">
                  <div
                    className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Discovered Leads Live Grid Mock */}
            <div className="bg-slate-950/40 border border-slate-800/40 rounded-2xl p-5 flex flex-col gap-3 min-h-[220px]">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                Últimos Prospectos Sin Web Detectados
              </span>

              <div className="overflow-hidden rounded-xl border border-slate-900 text-xs font-mono">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-900 text-slate-500 text-[10px]">
                      <th className="p-3">Nombre</th>
                      <th className="p-3">Teléfono</th>
                      <th className="p-3">Dirección</th>
                      <th className="p-3 text-right">Redes</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-350 divide-y divide-slate-900/40">
                    {discoveredLeads.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="p-8 text-center text-slate-650 italic text-[11px]"
                        >
                          Esperando a encontrar objetivos calificados sin sitio web...
                        </td>
                      </tr>
                    ) : (
                      discoveredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="bg-slate-900/10 hover:bg-slate-900/30 transition-colors animate-fade-in"
                        >
                          <td className="p-3 font-semibold text-white">
                            {lead.name}
                          </td>
                          <td className="p-3 text-cyan-400 font-bold">
                            {lead.phone}
                          </td>
                          <td className="p-3 text-slate-400 text-[11px]">
                            {lead.address}
                          </td>
                          <td className="p-3 text-right">
                            {lead.source === "IG" && (
                              <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-1.5 py-0.5 rounded text-[9px] font-bold">
                                IG
                              </span>
                            )}
                            {lead.source === "MAPS" && (
                              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-1.5 py-0.5 rounded text-[9px] font-bold">
                                MAPS
                              </span>
                            )}
                            {lead.source === "FB" && (
                              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded text-[9px] font-bold">
                                FB
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right: Terminal Logs Box Mock */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-2xl flex flex-col h-full overflow-hidden min-h-[380px] lg:min-h-0">
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                  Logs en Tiempo Real
                </span>
              </div>
              <button
                onClick={() => {
                  setLogs([]);
                  setDiscoveredLeads([]);
                  setCurrentStep(0);
                  setIsRunning(true);
                }}
                className="text-[10px] text-slate-550 hover:text-cyan-400 hover:border-cyan-500/20 border border-slate-900 bg-slate-950 px-2 py-0.5 rounded font-mono transition-all"
              >
                REINICIAR
              </button>
            </div>
            <div
              ref={logContainerRef}
              className="p-4 flex-1 font-mono text-[11px] text-slate-400 flex flex-col gap-2 overflow-y-auto bg-slate-950/60 leading-relaxed max-h-[380px]"
            >
              {logs.map((log, idx) => {
                let colorClass = "text-slate-400";
                if (log.type === "system") colorClass = "text-indigo-450 font-semibold";
                if (log.type === "info") colorClass = "text-slate-500";
                if (log.type === "success")
                  colorClass =
                    "text-cyan-400 font-medium bg-cyan-950/20 py-1 px-2 border-l-2 border-cyan-500 rounded-r text-[10px] my-0.5";
                if (log.type === "skip") colorClass = "text-slate-600 italic pl-3";

                return (
                  <p key={idx} className={colorClass}>
                    {log.text}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
