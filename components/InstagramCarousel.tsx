"use client";

import React from "react";

interface ReelItem {
  id: number;
  videoUrl: string;
  instagramUrl: string;
  likes: string;
  comments: string;
}

export default function InstagramCarousel() {
  const instagramUrl = "https://www.instagram.com/crossfit.villa.luro/";

  const reels: ReelItem[] = [
    {
      id: 1,
      videoUrl: "/cvl-assets/reels/reel1.mp4",
      instagramUrl: "https://www.instagram.com/reel/DXpG8J7DZSZ/",
      likes: "142",
      comments: "18"
    },
    {
      id: 2,
      videoUrl: "/cvl-assets/reels/reel2.mp4",
      instagramUrl: "https://www.instagram.com/reel/DUEdHUoEYQn/",
      likes: "258",
      comments: "29"
    },
    {
      id: 3,
      videoUrl: "/cvl-assets/reels/reel3.mp4",
      instagramUrl: "https://www.instagram.com/reel/DWOvR6ujR8C/",
      likes: "193",
      comments: "14"
    },
    {
      id: 4,
      videoUrl: "/cvl-assets/reels/reel4.mp4",
      instagramUrl: "https://www.instagram.com/reel/DXHH57mDX3b/",
      likes: "305",
      comments: "42"
    },
    {
      id: 5,
      videoUrl: "/cvl-assets/reels/reel5.mp4",
      instagramUrl: "https://www.instagram.com/reel/DX9ulTjtbhB/",
      likes: "167",
      comments: "11"
    },
    {
      id: 6,
      videoUrl: "/cvl-assets/reels/reel6.mp4",
      instagramUrl: "https://www.instagram.com/reel/DWjGKPyDT2x/",
      likes: "224",
      comments: "19"
    },
    {
      id: 7,
      videoUrl: "/cvl-assets/reels/reel7.mp4",
      instagramUrl: "https://www.instagram.com/reel/DU_ie1bEXJX/",
      likes: "281",
      comments: "25"
    }
  ];

  // Duplicamos el array para que el scroll horizontal infinito no tenga cortes visuales
  const doubleReels = [...reels, ...reels, ...reels];

  return (
    <section className="py-20 bg-zinc-950 relative z-10 w-full overflow-hidden">
      {/* Contenedor del título */}
      <div className="max-w-6xl mx-auto px-6 text-center flex flex-col items-center gap-3 mb-12">
        <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter">
          EL DÍA A DÍA EN EL BOX
        </h2>
        <p className="text-zinc-400 max-w-lg text-xs sm:text-sm leading-relaxed font-medium">
          Seguinos en <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 hover:underline">@crossfit.villa.luro</a> para ver técnicas, WODs y la energía de las clases en vivo.
        </p>
      </div>

      {/* Contenedor del Carrousel Infinito */}
      <div className="relative w-full flex items-center justify-center">
        {/* Máscaras de desvanecimiento en los bordes para estilo premium */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none" />

        {/* Carril Marquee */}
        <div className="w-full flex overflow-hidden">
          <div className="flex animate-marquee has-[a:hover]:[animation-play-state:paused] gap-16 py-4 px-2">
            {doubleReels.map((reel, index) => (
              <a
                key={`${reel.id}-${index}`}
                href={reel.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-[260px] sm:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-900/60 shadow-lg shadow-black/40 shrink-0 group/reel transition-all duration-300 hover:border-purple-500/50 hover:scale-[1.02]"
              >
                {/* Video en reproducción automática */}
                <video
                  src={reel.videoUrl}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />

                {/* Overlay de degradado oscuro permanente */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 z-10 pointer-events-none" />

                {/* Flotante Lateral de Interacción (Corazón, Comentario) */}
                <div className="absolute right-3.5 bottom-12 z-20 flex flex-col items-center gap-3.5 text-white pointer-events-none">
                  {/* Corazón (En rojo) */}
                  <div className="flex flex-col items-center gap-0.5">
                    <svg className="w-5 h-5 text-red-500 fill-current drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span className="text-[9px] font-mono font-bold text-red-400">{reel.likes}</span>
                  </div>
                  {/* Comentario */}
                  <div className="flex flex-col items-center gap-0.5">
                    <svg className="w-5 h-5 text-white fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48L4.5 20.25l3.023-.906c1.332.58 2.83.906 4.477.906z" />
                    </svg>
                    <span className="text-[9px] font-mono font-bold">{reel.comments}</span>
                  </div>
                </div>

                {/* Datos del pie de página (Solo el usuario) */}
                <div className="absolute left-3.5 bottom-3.5 z-20 text-white max-w-[80%] pointer-events-none">
                  <p className="text-[10px] font-bold tracking-tight">@crossfit.villa.luro</p>
                </div>

                {/* Overlay de Hover (Ver en Instagram) */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover/reel:opacity-100 transition-opacity duration-300 z-30 flex flex-col items-center justify-center gap-2.5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg" style={{background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)'}}>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">Ver en Instagram</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
