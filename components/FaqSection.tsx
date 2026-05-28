export default function FaqSection() {
  const faqs = [
    {
      q: "¿Tengo que pagar costos mensuales o por cada búsqueda realizada?",
      a: "No. Scrap Web System funciona bajo un modelo de licencia perpetua (pago único de por vida). El motor de prospección se ejecuta directamente sobre el hardware de tu propia PC, utilizando tu conexión a internet para simular la navegación. No dependes de suscripciones recurrentes ni tienes que pagar por claves de APIs externas. El costo operativo continuo es de $0.",
    },
    {
      q: "¿Es legal hacer este tipo de scraping en Google Maps?",
      a: "Sí, es completamente legal. La información recopilada (nombre comercial, teléfono expuesto públicamente, dirección y enlaces a redes sociales) es de carácter público y los propios locales comerciales la publican voluntariamente en Google Maps para recibir llamadas y clientes. Scrap Web System simplemente automatiza la recolección de lo que ya está visible, ahorrándote cientos de horas manuales.",
    },
    {
      q: "¿Cómo recibo el software y la clave de activación tras el pago?",
      a: "La entrega es instantánea y automática. Nuestro sistema procesa tu pago en segundos e inmediatamente te redirige a la sección de descarga segura, proporcionándote el enlace directo al binario portable (.exe) junto a tu clave de activación de licencia cifrada. También recibirás un correo de respaldo con las instrucciones paso a paso.",
    },
    {
      q: "¿Cómo funciona la garantía de satisfacción de 14 días?",
      a: "Confiamos plenamente en el valor comercial y el ROI de SWS. Si el software no se ejecuta en tu PC o nuestro soporte técnico no logra resolver cualquier inconveniente técnico dentro de los primeros 14 días tras la compra, te reembolsamos el 100% de tu dinero de forma íntegra y se desactivará la clave de licencia remota.",
    },
    {
      q: "¿El software requiere conocimientos previos de programación?",
      a: "Absolutamente ninguno. Scrap Web System ha sido empaquetado para que cualquier persona pueda utilizarlo. Solo descargas el ejecutable portable, ingresas los criterios de búsqueda que desees (ej: 'Ferreterías en Belgrano'), defines el límite de locales y haces clic en Iniciar. El sistema instalará Chromium automáticamente en su primer inicio en segundo plano y te entregará el reporte final en Excel.",
    },
  ];

  return (
    <section id="faq" className="max-w-4xl mx-auto px-6 py-20 border-t border-slate-900/60 relative z-10 w-full">
      <div className="text-center flex flex-col items-center gap-3 mb-16">
        <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-widest bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-500/10">
          Preguntas Frecuentes
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Resolvemos tus <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">dudas comerciales</span>
        </h2>
        <p className="text-slate-450 max-w-lg text-sm leading-relaxed font-sans">
          Toda la información técnica y comercial para que compres con total tranquilidad y comiences a prospectar hoy mismo.
        </p>
      </div>

      {/* ✅ FIJADO: El contenedor ahora es una lista en bloque vertical estricta. 
          Al no usar grids ni flexboxes globales con estiramiento elástico en los hijos, 
          cada elemento se despliega de forma nativa e independiente, eliminando el bug de deformación. */}
      <div className="block w-full space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group border border-slate-900 bg-slate-900/10 hover:border-slate-850/60 rounded-2xl p-5 md:p-6 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden overflow-hidden block w-full"
          >
            <summary className="flex items-center justify-between cursor-pointer focus:outline-none list-none select-none w-full">
              <h3 className="text-xs md:text-sm font-bold text-white flex items-center gap-3 pr-4">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 group-open:bg-cyan-400 transition-colors"></span>
                {faq.q}
              </h3>
              <span className="shrink-0 text-slate-500 group-open:text-cyan-400 transition-colors">
                <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            
            {/* Contenido de respuesta aislado para que no tire tirones visuales al renderizar */}
            <div className="mt-4 text-[11px] md:text-xs text-slate-400 leading-relaxed pl-4.5 font-sans border-t border-slate-900/40 pt-4 block w-full">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
