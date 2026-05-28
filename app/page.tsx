"use client";

import React, { useState, useEffect } from "react";
import GymNavbar from "@/components/GymNavbar";
import InstagramCarousel from "@/components/InstagramCarousel";



// ✅ NUEVO: Interfaces de TypeScript para garantizar un tipado fuerte y prevenir errores de compilación
interface Servicio {
  title: string;
  desc: string;
  accentColor: string; // Color de acento para textos y bordes
  glowColor: string;   // Color de resplandor decorativo (sombra/glow)
  imagePath: string;   // Imagen descriptiva de la clase
}

interface Coach {
  name: string;
  role: string;
  special: string;
  img: string;
}

interface GoogleReview {
  name: string;
  avatarBg: string;
  stars: number;
  date: string;
  text: string;
  isLocalGuide: boolean;
}

interface ClaseCalendario {
  id: string;
  actividad: string;
  coach: string;
  dia: "Lun" | "Mar" | "Mié" | "Jue" | "Vie" | "Sáb";
  start: string;
  categoria: "crossfit" | "hyrox" | "funcional" | "especiales";
}

const clasesDeCalendario: ClaseCalendario[] = [
  // --- CrossFit ---
  // Lunes a Viernes: 06:00, 07:00, 08:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00, 19:00, 20:00, 21:00
  ...["Lun", "Mar", "Mié", "Jue", "Vie"].flatMap((dia) => [
    { id: `cf-06-${dia}`, actividad: "CrossFit", coach: "Juan", dia: dia as ClaseCalendario["dia"], start: "06:00", categoria: "crossfit" },
    { id: `cf-07-${dia}`, actividad: "CrossFit", coach: "Juan", dia: dia as ClaseCalendario["dia"], start: "07:00", categoria: "crossfit" },
    { id: `cf-08-${dia}`, actividad: "CrossFit", coach: "Juan", dia: dia as ClaseCalendario["dia"], start: "08:00", categoria: "crossfit" },
    { id: `cf-12-${dia}`, actividad: "CrossFit", coach: "Juan", dia: dia as ClaseCalendario["dia"], start: "12:00", categoria: "crossfit" },
    { id: `cf-13-${dia}`, actividad: "CrossFit", coach: "Juan", dia: dia as ClaseCalendario["dia"], start: "13:00", categoria: "crossfit" },
    { id: `cf-14-${dia}`, actividad: "CrossFit", coach: "Juan", dia: dia as ClaseCalendario["dia"], start: "14:00", categoria: "crossfit" },
    { id: `cf-15-${dia}`, actividad: "CrossFit", coach: "Juan", dia: dia as ClaseCalendario["dia"], start: "15:00", categoria: "crossfit" },
    { id: `cf-16-${dia}`, actividad: "CrossFit", coach: "Dai", dia: dia as ClaseCalendario["dia"], start: "16:00", categoria: "crossfit" },
    { id: `cf-17-${dia}`, actividad: "CrossFit", coach: "Dai", dia: dia as ClaseCalendario["dia"], start: "17:00", categoria: "crossfit" },
    { id: `cf-18-${dia}`, actividad: "CrossFit", coach: "Juan", dia: dia as ClaseCalendario["dia"], start: "18:00", categoria: "crossfit" },
    { id: `cf-19-${dia}`, actividad: "CrossFit", coach: "Juan", dia: dia as ClaseCalendario["dia"], start: "19:00", categoria: "crossfit" },
    { id: `cf-20-${dia}`, actividad: "CrossFit", coach: "Juan", dia: dia as ClaseCalendario["dia"], start: "20:00", categoria: "crossfit" },
    { id: `cf-21-${dia}`, actividad: "CrossFit", coach: "Juan", dia: dia as ClaseCalendario["dia"], start: "21:00", categoria: "crossfit" }
  ] as ClaseCalendario[]),
  // Sábados: 09:00, 10:00, 12:00 (user specified)
  { id: "cf-09-sab", actividad: "CrossFit", coach: "Juan", dia: "Sáb", start: "09:00", categoria: "crossfit" },
  { id: "cf-10-sab", actividad: "CrossFit", coach: "Dai", dia: "Sáb", start: "10:00", categoria: "crossfit" },
  { id: "cf-12-sab", actividad: "CrossFit", coach: "Juan", dia: "Sáb", start: "12:00", categoria: "crossfit" },

  // --- Funcional ---
  // Lunes: 19:00, 20:00
  { id: "fun-19-lun", actividad: "Funcional", coach: "Diego", dia: "Lun", start: "19:00", categoria: "funcional" },
  { id: "fun-20-lun", actividad: "Funcional", coach: "Diego", dia: "Lun", start: "20:00", categoria: "funcional" },
  // Martes: 08:00, 09:00, 19:00, 20:00
  { id: "fun-08-mar", actividad: "Funcional", coach: "Diego", dia: "Mar", start: "08:00", categoria: "funcional" },
  { id: "fun-09-mar", actividad: "Funcional", coach: "Diego", dia: "Mar", start: "09:00", categoria: "funcional" },
  { id: "fun-19-mar", actividad: "Funcional", coach: "Diego", dia: "Mar", start: "19:00", categoria: "funcional" },
  { id: "fun-20-mar", actividad: "Funcional", coach: "Diego", dia: "Mar", start: "20:00", categoria: "funcional" },
  // Miércoles: 09:00, 19:00, 20:00
  { id: "fun-09-mie", actividad: "Funcional", coach: "Diego", dia: "Mié", start: "09:00", categoria: "funcional" },
  { id: "fun-19-mie", actividad: "Funcional", coach: "Diego", dia: "Mié", start: "19:00", categoria: "funcional" },
  { id: "fun-20-mie", actividad: "Funcional", coach: "Diego", dia: "Mié", start: "20:00", categoria: "funcional" },
  // Jueves: 08:00, 09:00, 19:00, 20:00
  { id: "fun-08-jue", actividad: "Funcional", coach: "Diego", dia: "Jue", start: "08:00", categoria: "funcional" },
  { id: "fun-09-jue", actividad: "Funcional", coach: "Diego", dia: "Jue", start: "09:00", categoria: "funcional" },
  { id: "fun-19-jue", actividad: "Funcional", coach: "Diego", dia: "Jue", start: "19:00", categoria: "funcional" },
  { id: "fun-20-jue", actividad: "Funcional", coach: "Diego", dia: "Jue", start: "20:00", categoria: "funcional" },
  // Viernes: 09:00, 19:00, 20:00
  { id: "fun-09-vie", actividad: "Funcional", coach: "Diego", dia: "Vie", start: "09:00", categoria: "funcional" },
  { id: "fun-19-vie", actividad: "Funcional", coach: "Diego", dia: "Vie", start: "19:00", categoria: "funcional" },
  { id: "fun-20-vie", actividad: "Funcional", coach: "Diego", dia: "Vie", start: "20:00", categoria: "funcional" },
  // Sábado: 11:00 (user specified)
  { id: "fun-11-sab", actividad: "Funcional", coach: "Diego", dia: "Sáb", start: "11:00", categoria: "funcional" },

  // --- Hyrox ---
  // Monday to Friday: 06:00, 07:00, 11:00, 12:00, 13:00, 16:00, 17:00, 18:00, 21:00
  ...["Lun", "Mar", "Mié", "Jue", "Vie"].flatMap((dia) => [
    { id: `hx-06-${dia}`, actividad: "Hyrox", coach: "Staff", dia: dia as ClaseCalendario["dia"], start: "06:00", categoria: "hyrox" },
    { id: `hx-07-${dia}`, actividad: "Hyrox", coach: "Staff", dia: dia as ClaseCalendario["dia"], start: "07:00", categoria: "hyrox" },
    { id: `hx-11-${dia}`, actividad: "Hyrox", coach: "Staff", dia: dia as ClaseCalendario["dia"], start: "11:00", categoria: "hyrox" },
    { id: `hx-12-${dia}`, actividad: "Hyrox", coach: "Staff", dia: dia as ClaseCalendario["dia"], start: "12:00", categoria: "hyrox" },
    { id: `hx-13-${dia}`, actividad: "Hyrox", coach: "Staff", dia: dia as ClaseCalendario["dia"], start: "13:00", categoria: "hyrox" },
    { id: `hx-16-${dia}`, actividad: "Hyrox", coach: "Staff", dia: dia as ClaseCalendario["dia"], start: "16:00", categoria: "hyrox" },
    { id: `hx-17-${dia}`, actividad: "Hyrox", coach: "Staff", dia: dia as ClaseCalendario["dia"], start: "17:00", categoria: "hyrox" },
    { id: `hx-18-${dia}`, actividad: "Hyrox", coach: "Staff", dia: dia as ClaseCalendario["dia"], start: "18:00", categoria: "hyrox" },
    { id: `hx-21-${dia}`, actividad: "Hyrox", coach: "Staff", dia: dia as ClaseCalendario["dia"], start: "21:00", categoria: "hyrox" }
  ] as ClaseCalendario[]),
  // Saturday: 11:00 (user specified)
  { id: "hx-11-sab", actividad: "Hyrox", coach: "Dai", dia: "Sáb", start: "11:00", categoria: "hyrox" },

  // --- Especiales ---
  { id: "esp-1", actividad: "Hyrox Competición", coach: "Staff", dia: "Lun", start: "08:00", categoria: "especiales" },
  { id: "esp-2", actividad: "CF Adultos Mayores", coach: "Staff", dia: "Lun", start: "11:00", categoria: "especiales" },
  { id: "esp-3", actividad: "CrossFit Kids", coach: "Staff", dia: "Mar", start: "18:00", categoria: "especiales" },
  { id: "esp-4", actividad: "Gymnastics", coach: "Staff", dia: "Mar", start: "21:00", categoria: "especiales" },
  { id: "esp-5", actividad: "CF Adultos Mayores", coach: "Staff", dia: "Mié", start: "11:00", categoria: "especiales" },
  { id: "esp-6", actividad: "Hyrox Competición", coach: "Staff", dia: "Mié", start: "08:00", categoria: "especiales" },
  { id: "esp-7", actividad: "CrossFit Kids", coach: "Staff", dia: "Jue", start: "18:00", categoria: "especiales" },
  { id: "esp-8", actividad: "Hyrox Competición", coach: "Staff", dia: "Vie", start: "08:00", categoria: "especiales" }
];

export default function CrossFitVillaLuroDemo() {
  // Ref y estados para drag-to-scroll con el mouse (PC) en el calendario
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // ✅ NUEVO: Estado y efecto para controlar la visibilidad del botón "Volver Arriba"
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setIsMouseDown(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiplicador de velocidad
    container.scrollLeft = scrollLeft - walk;
  };

  // ✅ NUEVO: URLs de redirección oficial y ticketera de turnos
  const whatsappUrl = "https://wa.me/5491167071845?text=Hola,%20vi%20la%20pagina%20web%20y%20quiero%20reservar%20para%20hacer%20....";
  const turnosWebUrl = "https://crossfitvillaluro.turnosweb.com/";

  // ✅ NUEVO: Lista de imágenes del carrusel de fondo para el Hero
  const imagenesHero = [
    "/cvl-assets/gym_bg_one.png",
    "/cvl-assets/gym_bg_two.png",
    "/cvl-assets/gym_bg_three.png"
  ];

  // ✅ NUEVO: Estado para rastrear el índice de la imagen de fondo actual
  const [imagenActualIdx, setImagenActualIdx] = useState<number>(0);

  // ✅ NUEVO: Temporizador para cambiar la imagen de fondo cada 10 segundos (10000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setImagenActualIdx((prev) => (prev + 1) % imagenesHero.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);


  // ✅ NUEVO: Estado de filtro activo para la grilla del calendario (clasificaciones de historias destacadas)
  const [activeFilter, setActiveFilter] = useState<string>("todos");

  const filtros = [
    { id: "todos", label: "Todos" },
    { id: "crossfit", label: "CrossFit" },
    { id: "hyrox", label: "Hyrox" },
    { id: "funcional", label: "Funcional" },
    { id: "especiales", label: "Especiales" },
  ];

  const horasDisponibles = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00"
  ];

  // Filtramos las horas a mostrar dependiendo del filtro activo para que la tabla sea súper compacta
  const horasFiltradas = horasDisponibles.filter((hora) => {
    if (activeFilter === "todos") return true;
    return clasesDeCalendario.some((c) => c.start === hora && c.categoria === activeFilter);
  });

  const getHoraFin = (horaInicio: string) => {
    const mapping: Record<string, string> = {
      "06:00": "07:00",
      "07:00": "08:00",
      "08:00": "09:00",
      "09:00": "10:00",
      "10:00": "11:00",
      "11:00": "12:00",
      "12:00": "13:00",
      "13:00": "14:00",
      "14:00": "15:00",
      "15:00": "16:00",
      "16:00": "17:00",
      "17:00": "18:00",
      "18:00": "19:00",
      "19:00": "20:00",
      "20:00": "21:00",
      "21:00": "22:00"
    };
    return mapping[horaInicio] || "";
  };


  // ✅ NUEVO: Colección de Servicios con imágenes del tema para evitar SVGs
  const servicios: Servicio[] = [
    { 
      title: "CrossFit", 
      desc: "El WOD (Workout of the Day) clásico. Fusionamos levantamiento olímpico de pesas (halterofilia), gimnasia deportiva avanzada y resistencia metabólica extrema bajo un sistema escalable a cualquier nivel físico.", 
      accentColor: "text-orange-500 border-orange-500/20 bg-orange-500/5",
      glowColor: "group-hover:border-orange-500/30 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]",
      imagePath: "/cvl-assets/crossfit_class.png"
    },
    { 
      title: "Hyrox", 
      desc: "Entrenamiento oficial de la competencia de fitness número uno del mundo. Combinamos running con estaciones de ejercicios funcionales estructurados para mejorar la potencia aeróbica y la resistencia de carrera.", 
      accentColor: "text-amber-500 border-amber-500/20 bg-amber-500/5",
      glowColor: "group-hover:border-amber-500/30 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
      imagePath: "/cvl-assets/hyrox_class.png"
    },
    { 
      title: "Funcional", 
      desc: "Movimientos multiarticulares adaptados que imitan acciones cotidianas. Enfocado en fortalecer el core, mejorar la estabilidad postural, aumentar la agilidad general y corregir patrones biomecánicos.", 
      accentColor: "text-cyan-400 border-cyan-400/20 bg-cyan-400/5",
      glowColor: "group-hover:border-cyan-400/30 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]",
      imagePath: "/cvl-assets/functional_class.png"
    },
    { 
      title: "CrossFit Kids", 
      desc: "Clases dinámicas y divertidas diseñadas para niños. Desarrollamos la coordinación, fuerza, agilidad y habilidades motoras fundamentales a través de juegos interactivos y ejercicios adaptados.", 
      accentColor: "text-orange-500 border-orange-500/20 bg-orange-500/5",
      glowColor: "group-hover:border-orange-500/30 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]",
      imagePath: "/cvl-assets/cf_kids_class.png"
    },
    { 
      title: "CF Adultos Mayores", 
      desc: "Programa de entrenamiento de fuerza adaptado para personas mayores. Nos enfocamos en mejorar la movilidad, estabilidad articular, balance corporal y fuerza muscular funcional para el día a día.", 
      accentColor: "text-orange-400 border-orange-400/20 bg-orange-400/5",
      glowColor: "group-hover:border-orange-400/30 group-hover:shadow-[0_0_30px_rgba(251,146,60,0.15)]",
      imagePath: "/cvl-assets/cf_seniors_class.png"
    },
    { 
      title: "Gymnastics", 
      desc: "Entrenamiento focalizado en dominar el peso corporal y la técnica gimnástica. Progresiones para anillas, barra olímpica, pino (handstand) y fortalecimiento integral de la zona media.", 
      accentColor: "text-purple-400 border-purple-400/20 bg-purple-400/5",
      glowColor: "group-hover:border-purple-400/30 group-hover:shadow-[0_0_30px_rgba(192,132,252,0.15)]",
      imagePath: "/cvl-assets/gymnastics_class.png"
    }
  ];

  // ✅ NUEVO: Datos de los coaches con imágenes genéricas profesionales
  const coaches: Coach[] = [
    { 
      name: "Pablo Cervigni", 
      role: "Head Coach & Fundador", 
      special: "Certificado CrossFit Level 4 (CF-L4) y miembro del Seminar Staff oficial de CrossFit. Encargado de capacitar entrenadores internacionalmente.", 
      img: "/cvl-assets/pablo.png"
    },
    { 
      name: "Juan Carlos Monzón", 
      role: "Coach CrossFit", 
      special: "Coach de CrossFit y líder de las clases matutinas. Especialista en la técnica del WOD y en motivarte a dar tu 100% desde temprano.", 
      img: "/cvl-assets/juan.png"
    },
    { 
      name: "Aldana Ciavarella", 
      role: "Coach CrossFit", 
      special: "Atleta de competencia oficial de CrossFit Villa Luro. Especialista en levantamiento olímpico de pesas (halterofilia) y gimnasia deportiva.", 
      img: "/cvl-assets/dai2.png"
    },
    { 
      name: "Federico", 
      role: "Coach CrossFit", 
      special: "Especialista en acondicionamiento metabólico de alta intensidad, corrección postural y entrenamientos grupales altamente dinámicos.", 
      img: "/cvl-assets/federico.png"
    },
    { 
      name: "Diego", 
      role: "Coach de Funcional", 
      special: "Entrenador a cargo del programa funcional del box. Especialista en el desarrollo de la fuerza general, movilidad articular y estabilidad del core.", 
      img: "/cvl-assets/diego.png"
    },
    { 
      name: "Martín Biudes", 
      role: "Coach & Capitán de Equipo", 
      special: "Atleta de semifinales y capitán competitivo de CrossFit Villa Luro. Experto en programación deportiva avanzada y resistencia cardiovascular.", 
      img: "/cvl-assets/jorge.png"
    },
    { 
      name: "Alfredo Estigarribia", 
      role: "Coach CrossFit", 
      special: "Atleta de Copa Sur. Especialista en desarrollo de fuerza máxima, levantamiento olímpico y programación de WODs metabólicos.", 
      img: "/cvl-assets/alfredo.png"
    },
    { 
      name: "Jimena Muñoz", 
      role: "Coach CrossFit", 
      special: "Atleta competitiva en Copa Sur. Especialista en dominio del peso corporal, movimientos gimnásticos avanzados y resistencia aeróbica.", 
      img: "/cvl-assets/jimena.png"
    }
  ];

  // ✅ NUEVO: Comentarios reales de Google Maps de CrossFit Villa Luro
  const reviewsRow1: GoogleReview[] = [
    { 
      name: "Lucas García", 
      avatarBg: "bg-red-500 text-white border-transparent",
      stars: 5,
      date: "Hace 3 meses", 
      text: "El lugar muy bueno y también quiero destacar la excelente atención de las chicas de recepción Naila y Anastasia y del profe Federico que desde que comencé demostró buena actitud y dedicación conmigo.", 
      isLocalGuide: false
    },
    { 
      name: "Jenn Maurin", 
      avatarBg: "bg-amber-500 text-white border-transparent",
      stars: 5,
      date: "Hace 11 meses", 
      text: "CVL es mi segunda casa ♡ más que solo un lugar de entrenamiento. Los profes son los mejores, siempre atentos, disponibles para ayudarte en lo que necesites, y buena onda. Es el mejor lugar para entrenar en el barrio 💪🏻 💜", 
      isLocalGuide: true
    },
    { 
      name: "Martín Gago", 
      avatarBg: "bg-blue-500 text-white border-transparent",
      stars: 5,
      date: "Hace 11 meses", 
      text: "Voy desde hace 5 años. Tienen un montón de horarios y eso es buenísimo!!! El box está impecable y todos los coaches, además de saber mucho, son muy copados. De los pocos que tienen certificación de CrossFit.", 
      isLocalGuide: false
    },
    { 
      name: "Guido Bargardi", 
      avatarBg: "bg-purple-500 text-white border-transparent",
      stars: 5,
      date: "Hace 8 meses", 
      text: "El mejor lugar del mundo para entrenar. Corta 🙈", 
      isLocalGuide: true
    },
    { 
      name: "Valeria Peiteado", 
      avatarBg: "bg-emerald-600 text-white border-transparent",
      stars: 5,
      date: "Hace 11 meses", 
      text: "Un gran box! Excelente atención de todo el personal. Los coaches son sumamente atentos, siempre acompañándonos y corrigiéndonos para entrenar con consciencia y poder crecer cada día más.", 
      isLocalGuide: false
    },
    { 
      name: "luciano estevez", 
      avatarBg: "bg-pink-500 text-white border-transparent",
      stars: 5,
      date: "Hace 5 meses", 
      text: "De los mejores lugares para entrenar sin dudas!!", 
      isLocalGuide: true
    }
  ];

  const reviewsRow2: GoogleReview[] = [
    { 
      name: "Oralip Sepulveda", 
      avatarBg: "bg-blue-600 text-white border-transparent",
      stars: 5,
      date: "Hace 11 meses", 
      text: "Un lujo!!! Los profesores de 10. Siempre te acompañan y están pendiente de las técnicas durante las clases. Hay diferentes opciones de ejercicios, además de CrossFit tienen funcional y ahora Hyrox. No es necesario ir ya con conocimiento, con el tiempo y ayuda de los profes vas aprendiendo. Recomiendo sumarse!", 
      isLocalGuide: true
    },
    { 
      name: "Sofia van der Ploeg", 
      avatarBg: "bg-teal-600 text-white border-transparent",
      stars: 5,
      date: "Hace 11 meses", 
      text: "Casi tres años entrenando acá, los mejores profes, contención en todo momento. Calidad de personas. Más que recomendable ❤️❤️❤️❤️", 
      isLocalGuide: true
    },
    { 
      name: "Stefania Ferreira Blanco", 
      avatarBg: "bg-red-500 text-white border-transparent",
      stars: 5,
      date: "Hace 11 meses", 
      text: "No es solo un box, es un hogar 🏠 🥳. La hermosa energía que hay, es gracias a los coaches, por su paciencia y su pasión por lo que hacen 🙈", 
      isLocalGuide: true
    },
    { 
      name: "Sabrinafainaa Sabrina", 
      avatarBg: "bg-amber-500 text-white border-transparent",
      stars: 5,
      date: "Hace 11 meses", 
      text: "Excelente lugar para entrenar CrossFit y Hyrox!!! Los coaches son increíbles profesionales que nos potencian a superarnos día a día! 💪🏻💪🏻💪🏻", 
      isLocalGuide: false
    },
    { 
      name: "Maxi Formaioni", 
      avatarBg: "bg-blue-500 text-white border-transparent",
      stars: 5,
      date: "Hace 11 meses", 
      text: "Pago para que me hagan sufrir y lo cumplen con creces, excelente servicio.", 
      isLocalGuide: true
    },
    { 
      name: "Nadia Divito", 
      avatarBg: "bg-purple-500 text-white border-transparent",
      stars: 5,
      date: "Hace 11 meses", 
      text: "Excelente box! Entreno allí hace años, se nota la experiencia y el profesionalismo de los profes!", 
      isLocalGuide: false
    },
    { 
      name: "Rocío Brignole", 
      avatarBg: "bg-emerald-600 text-white border-transparent",
      stars: 5,
      date: "Hace 11 meses", 
      text: "El mejor box de Villa Luro con los mejores profesores. Mi segunda casa. 🙏💕🫶", 
      isLocalGuide: false
    }
  ];

  // ✅ NUEVO: Función auxiliar para renderizar celdas del calendario semanal de forma estética y súper legible
  const renderCell = (actividad: string, coach: string, key: string) => {
    let colorClasses = "";
    if (actividad.startsWith("CrossFit") || actividad.startsWith("CF") || actividad.includes("WOD Avanzado") || actividad === "WOD (Avanzado)") {
      colorClasses = "bg-orange-500/10 text-orange-400 border-orange-500/25 hover:bg-orange-500/20";
    } else if (actividad.startsWith("Hyrox")) {
      colorClasses = "bg-amber-500/10 text-amber-400 border-amber-500/25 hover:bg-amber-500/20";
    } else if (actividad.startsWith("Funcional") || actividad === "WOD (Comu)") {
      colorClasses = "bg-cyan-500/10 text-cyan-400 border-cyan-500/25 hover:bg-cyan-500/20";
    } else if (actividad.startsWith("Stretching")) {
      colorClasses = "bg-emerald-500/10 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/20";
    } else if (actividad === "Open Box" || actividad.includes("Gymnastic")) {
      colorClasses = "bg-purple-500/10 text-purple-400 border-purple-500/25 hover:bg-purple-500/20";
    } else {
      colorClasses = "bg-zinc-900/20 text-zinc-400 border-zinc-800/40 hover:bg-zinc-900/30";
    }

    return (
      <div key={key} className={`px-1 py-1 rounded border flex flex-col items-center justify-center gap-0.5 select-none hover:scale-[1.02] transition-all duration-200 ${colorClasses}`}>
        <span className="font-extrabold text-[9px] sm:text-[10.5px] leading-tight tracking-normal uppercase text-center block w-full">{actividad}</span>
      </div>
    );
  };

  const renderEmptyCell = () => {
    return (
      <div className="px-1 py-1 rounded border border-dashed border-zinc-800/30 bg-transparent flex items-center justify-center select-none opacity-20">
        <span className="text-zinc-700 text-[10px]">·</span>
      </div>
    );
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-sans overflow-x-hidden antialiased selection:bg-orange-500 selection:text-white">
      


      {/* 🔄 REFACTOR: Uso del componente modularizado GymNavbar para separar la responsabilidad de navegación */}
      <GymNavbar whatsappUrl={whatsappUrl} />

      {/* ─── 2. HERO SECTION (Diseño Industrial de Alto Impacto con Carrusel) ─── */}
      <section className="relative pt-32 pb-24 md:py-40 px-6 border-b border-zinc-900 flex flex-col items-center text-center gap-8 z-10 overflow-hidden">
        
        {/* Carrusel de imágenes de fondo */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {imagenesHero.map((imgUrl, idx) => (
            <div
              key={imgUrl}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                idx === imagenActualIdx ? "opacity-45" : "opacity-0"
              }`}
              style={{ backgroundImage: `url('${imgUrl}')` }}
            />
          ))}
          {/* Overlay oscuro degradado para garantizar la legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/60 to-zinc-950"></div>
        </div>

        {/* Glow de acento radial de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.05)_0%,transparent_70%)] rounded-full pointer-events-none z-0"></div>

        {/* Encabezado Principal H1 Semántico con estética agresiva */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] text-white uppercase max-w-5xl relative z-10">
          SOMOS MÁS QUE UN BOX, <br />
          <span className="glitter-orange-text pr-2 inline-block">
            SOMOS FAMILIA
          </span>
        </h1>

        <style>{`
          @keyframes shimmer-glitter {
            0% {
              background-position: 0% center;
            }
            100% {
              background-position: -200% center;
            }
          }
          .glitter-orange-text {
            background: linear-gradient(
              to right,
              #ffffff 35%,
              #ff2000 42%,
              #ff7000 46%,
              #fffae0 50%,
              #ff7000 54%,
              #ff2000 58%,
              #ffffff 65%
            );
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer-glitter 4s linear infinite;
            will-change: background-position;
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
        `}</style>

        {/* Párrafo con foco comercial y propuesta de valor */}
        <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-2xl font-medium relative z-10 px-2 text-zinc-400">
          Entrená bajo los más altos estándares deportivos. En <span className="text-white font-bold">CrossFit Villa Luro (CVL)</span> fusionamos la fuerza explosiva del CrossFit con la potencia aeróbica certificada de <span className="text-cyan-400 font-bold">Hyrox</span>. Todo en un box enfocado 100% en tu progreso técnico.
        </p>

        {/* Botones de acción del Hero */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-4 relative z-10">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black text-xs md:text-sm px-8 py-4.5 rounded-md border border-orange-700 transition-all shadow-lg shadow-orange-950/30 tracking-wider text-center uppercase flex items-center justify-center"
          >
            {/* SVG de muñeco entrenando (atleta levantando barra) */}
            <svg className="w-5 h-5 mr-2 shrink-0 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="1.5" />
              <path d="M6 10h12" />
              <circle cx="5" cy="10" r="1" fill="currentColor" />
              <circle cx="19" cy="10" r="1" fill="currentColor" />
              <path d="M9 10v3h6v-3M12 6.5v6M9 19l3-6.5 3 6.5" />
            </svg>
            <span>Reserva tu primer clase hoy</span>
          </a>
          <a
            href="#contacto"
            className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-sans font-black text-xs md:text-sm px-8 py-4.5 rounded-md border border-zinc-800 transition-all text-center tracking-wider uppercase flex items-center justify-center"
          >
            {/* SVG de Calendario/Reloj */}
            <svg className="w-5 h-5 mr-2 shrink-0 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Consultar Horarios</span>
          </a>
        </div>
      </section>

      <section id="certificaciones" className="pt-16 pb-0 bg-zinc-950 relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-6 mb-10 text-center flex flex-col items-center gap-2">
          <h2 className="text-2xl md:text-4xl font-black uppercase text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">
            AFILIACIONES Y PARTNERS OFICIALES
          </h2>
        </div>
        
        {/* Grilla que ocupa el 100% del ancho del sector (mitad y mitad) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2">
          
          {/* Mitad Izquierda: CrossFit Oficial */}
          <div className="group relative bg-transparent p-12 md:p-16 flex flex-col items-center justify-center transition-all duration-500 overflow-hidden min-h-[200px]">
            
            <img 
              src="/cvl-assets/bannercrossfit2.gif" 
              alt="Afiliado Oficial de CrossFit" 
              className="h-20 md:h-24 object-contain transition-all duration-500 group-hover:scale-105 group-hover:blur-sm relative z-10 mix-blend-screen shadow-[0_0_35px_rgba(234,88,12,0.12)] group-hover:shadow-[0_0_50px_rgba(234,88,12,0.25)] rounded-lg"
            />

            {/* Botón flotante naranja 'Leer Más' */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
              <a
                href="https://www.crossfit.com/what-is-crossfit"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-500 text-white font-sans font-bold text-xs px-6 py-3 rounded border border-orange-700 hover:border-orange-500 uppercase tracking-wider transition-transform duration-300 scale-90 group-hover:scale-100 shadow-lg shadow-orange-950/40 active:scale-95"
              >
                Leer Más
              </a>
            </div>
          </div>

          {/* Mitad Derecha: Hyrox Partner */}
          <div className="group relative bg-transparent p-12 md:p-16 flex flex-col items-center justify-center transition-all duration-500 overflow-hidden min-h-[200px]">
            
            <img 
              src="/cvl-assets/banner-hyrox.gif" 
              alt="Partner Oficial de Hyrox" 
              className="h-20 md:h-24 object-contain transition-all duration-500 group-hover:scale-105 group-hover:blur-sm relative z-10 mix-blend-screen shadow-[0_0_35px_rgba(6,182,212,0.12)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.25)] rounded-lg"
            />

            {/* Botón flotante naranja 'Leer Más' */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
              <a
                href="https://hyrox.com/the-fitness-race-for-every-body/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-500 text-white font-sans font-bold text-xs px-6 py-3 rounded border border-orange-700 hover:border-orange-500 uppercase tracking-wider transition-transform duration-300 scale-90 group-hover:scale-100 shadow-lg shadow-orange-950/40 active:scale-95"
              >
                Leer Más
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 4. SERVICIOS Y CLASES (Cards Interactivos) ─── */}
      <section id="clases" className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="text-center flex flex-col items-center gap-3 mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter">
            NUESTROS PROGRAMAS DE ENTRENAMIENTO
          </h2>
          <p className="text-zinc-400 max-w-lg text-xs sm:text-sm leading-relaxed font-medium">
            Clases totalmente guiadas por instructores certificados, programadas bajo un enfoque metodológico estricto.
          </p>
        </div>

        {/* Grilla responsiva de tarjetas con transiciones premium */}
        <div className="flex flex-wrap justify-center gap-8">
          {servicios.map((serv, idx) => (
            <div 
              key={idx} 
              className={`group w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[360px] bg-zinc-900/10 border border-zinc-900 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-900/25 ${serv.glowColor}`}
            >
              {/* Imagen de la disciplina (Cabecera) */}
              <div className="aspect-[16/9] w-full bg-zinc-950 relative overflow-hidden border-b border-zinc-900">
                <img 
                  src={serv.imagePath} 
                  alt={serv.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Degradado para fundir la imagen con la card */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
              </div>

              {/* Contenido de la card */}
              <div className="p-5 md:p-6 flex flex-col flex-grow gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-black text-white uppercase tracking-wide">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                    {serv.desc}
                  </p>
                </div>

                {/* Botón reservar turno que late como corazón */}
                <div className="mt-auto pt-4">
                  <a
                    href={turnosWebUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black text-xs py-3.5 rounded-md border border-orange-700 hover:border-orange-500 transition-all shadow-md shadow-orange-950/20 tracking-wider text-center uppercase flex items-center justify-center gap-2 animate-heartbeat"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                    Reservar Turno
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 5. STAFF DE COACHES (Con diseño de Hover-Reveal) ─── */}
      <section id="coaches" className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10">
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter">
            NUESTRO EQUIPO DE COACHES
          </h2>
          <p className="text-zinc-400 max-w-lg text-xs sm:text-sm leading-relaxed font-medium">
            Profesionales enfocados en tu seguridad, optimización técnica y superación constante de tus marcas personales.
          </p>
        </div>

        {/* Grilla responsiva de Coaches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {coaches.map((coach, idx) => (
            <div 
              key={idx} 
              className="group bg-zinc-900/20 backdrop-blur-sm border border-zinc-900 rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1.5 hover:border-zinc-700/80 hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]"
            >
              {/* Imagen del Coach en escala de grises con transición */}
              <div className="aspect-[4/5] w-full bg-zinc-950 relative overflow-hidden border-b border-zinc-900">
                <img 
                  src={coach.img} 
                  alt={`Coach ${coach.name}`} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                {/* Degradado para fundir la imagen con la card */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-zinc-950/90 to-transparent pointer-events-none" />
              </div>

              {/* Información descriptiva del Coach */}
              <div className="p-6 flex flex-col gap-2 bg-zinc-950/40 flex-grow">
                <h3 className="text-lg font-black text-white uppercase tracking-wide">
                  {coach.name}
                </h3>
                <span className="text-xs font-bold text-orange-500 font-mono tracking-wider">
                  {coach.role.toUpperCase()}
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed mt-2 font-medium">
                  {coach.special}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── NUEVO: CARRUSEL REELS INSTAGRAM ─── */}
      <InstagramCarousel />

      {/* ─── 6. COMUNIDAD DE ACERO (Google Reviews Double Marquee) ─── */}
      <section id="comunidad" className="py-20 relative z-10 w-full overflow-hidden bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6 text-center flex flex-col items-center gap-3 mb-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter">
            LO QUE OPINA NUESTRA COMUNIDAD
          </h2>
        </div>
                  {/* ✅ NUEVO: Tarjeta de Resumen de Opiniones oficial estilo Google Maps (Compacta) */}
        <div className="max-w-md w-full bg-white border border-zinc-100 rounded-3xl p-5 sm:p-6 shadow-lg flex flex-col gap-4 text-zinc-800 mx-auto mb-16 font-sans relative z-30">
          
          {/* Cabecera */}
          <div className="flex justify-between items-center border-b border-zinc-100 pb-2.5">
            <h3 className="font-bold text-zinc-900 text-sm sm:text-base">Resumen de opiniones</h3>
            <svg className="w-4.5 h-4.5 text-zinc-400 cursor-help" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </div>

          {/* Bloque central: Barras y Puntuación Numérica */}
          <div className="grid grid-cols-5 gap-4 items-center">
            
            {/* Distribución de estrellas (lado izquierdo - 3/5 del ancho) */}
            <div className="col-span-3 flex flex-col gap-1.5">
              {[
                { star: 5, width: "w-[90%]" },
                { star: 4, width: "w-[12%]" },
                { star: 3, width: "w-[4%]" },
                { star: 2, width: "w-[2%]" },
                { star: 1, width: "w-[1%]" }
              ].map((item) => (
                <div key={item.star} className="flex items-center gap-2.5 text-[10px] font-bold text-zinc-600">
                  <span className="w-1.5">{item.star}</span>
                  <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-amber-500 rounded-full ${item.width}`}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Puntaje y estrellas (lado derecho - 2/5 del ancho con borde izquierdo) */}
            <div className="col-span-2 flex flex-col items-center justify-center border-l border-zinc-100 pl-3 text-center gap-1">
              <span className="text-5xl font-black tracking-tighter text-zinc-900 leading-none">4.7</span>
              
              {/* Rating de estrellas amarillas */}
              <div className="flex items-center gap-0.25">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                {/* Media estrella */}
                <div className="relative w-3.5 h-3.5 text-zinc-200 fill-current">
                  <svg className="absolute inset-0 text-zinc-200 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div className="absolute inset-0 overflow-hidden w-1/2">
                    <svg className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8 2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <a
                href="https://www.google.com/maps/place/CrossFit+Villa+Luro/@-34.6387439,-58.5079941,16z/data=!4m17!1m8!3m7!1s0x95bcc9b4af239803:0x57088e616d2c2382!2sAv.+Rivadavia+10241,+C1408+Cdad.+Aut%C3%B3noma+de+Buenos+Aires!3b1!8m2!3d-34.6385224!4d-58.5080382!16s%2Fg%2F11crsb8m2j!3m7!1s0x95bcc9b4a7f816a7:0x86d40c2c1d5f0c7b!8m2!3d-34.6386094!4d-58.5080289!9m1!1b1!16s%2Fg%2F11b6dlkvd2?hl=es-419&entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-cyan-700 hover:underline cursor-pointer"
              >
                189 opiniones
              </a>
            </div>

          </div>

        </div>

        {/* Contenedor del Carrusel Doble */}
        <div className="flex flex-col gap-8 w-full relative">
          {/* Máscaras de desvanecimiento lateral */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none" />

          {/* Carrusel 1: Desplazamiento a la Izquierda (anim-marquee) */}
          <div className="w-full flex overflow-hidden">
            <div className="flex animate-marquee gap-6 py-2 px-2">
              {[...reviewsRow1, ...reviewsRow1, ...reviewsRow1].map((review, index) => (
                <div 
                  key={`row1-${index}`}
                  className="w-[280px] sm:w-[340px] bg-white border border-zinc-100 rounded-2xl p-5 sm:p-6 shrink-0 flex flex-col gap-3.5 relative group/card transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${review.avatarBg}`}>
                      {review.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-bold text-zinc-900 text-xs sm:text-sm leading-none">{review.name}</h4>
                      <div className="flex items-center gap-1.5 mt-1 leading-none">
                        <span className="text-[9px] text-zinc-500 font-mono">{review.date}</span>
                        {review.isLocalGuide && (
                          <span className="text-[7px] font-bold text-amber-700 bg-amber-500/10 border border-amber-500/25 px-1 py-0.2 rounded-sm font-mono tracking-wider uppercase">LOCAL GUIDE</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Google G Icon with Original Colors */}
                  <div className="absolute top-5 right-5 opacity-90 transition-opacity">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>

                  {/* Estrellas */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.stars)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Texto */}
                  <p className="text-xs text-zinc-950 leading-relaxed font-sans font-bold mt-0.5">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Carrusel 2: Desplazamiento a la Derecha (anim-marquee-reverse) */}
          <div className="w-full flex overflow-hidden">
            <div className="flex animate-marquee-reverse gap-6 py-2 px-2">
              {[...reviewsRow2, ...reviewsRow2, ...reviewsRow2].map((review, index) => (
                <div 
                  key={`row2-${index}`}
                  className="w-[280px] sm:w-[340px] bg-white border border-zinc-100 rounded-2xl p-5 sm:p-6 shrink-0 flex flex-col gap-3.5 relative group/card transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${review.avatarBg}`}>
                      {review.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-bold text-zinc-900 text-xs sm:text-sm leading-none">{review.name}</h4>
                      <div className="flex items-center gap-1.5 mt-1 leading-none">
                        <span className="text-[9px] text-zinc-500 font-mono">{review.date}</span>
                        {review.isLocalGuide && (
                          <span className="text-[7px] font-bold text-amber-700 bg-amber-500/10 border border-amber-500/25 px-1 py-0.2 rounded-sm font-mono tracking-wider uppercase">LOCAL GUIDE</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Google G Icon with Original Colors */}
                  <div className="absolute top-5 right-5 opacity-90 transition-opacity">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>

                  {/* Estrellas */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.stars)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-amber-500 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Texto */}
                  <p className="text-xs text-zinc-950 leading-relaxed font-sans font-bold mt-0.5">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Botón para dejar reseña en Google */}
          <div className="flex justify-center mt-6">
            <a
              href="https://www.google.com/maps/place/CrossFit+Villa+Luro/@-34.6387439,-58.5079941,16z/data=!4m17!1m8!3m7!1s0x95bcc9b4af239803:0x57088e616d2c2382!2sAv.+Rivadavia+10241,+C1408+Cdad.+Aut%C3%B3noma+de+Buenos+Aires!3b1!8m2!3d-34.6385224!4d-58.5080382!16s%2Fg%2F11crsb8m2j!3m7!1s0x95bcc9b4a7f816a7:0x86d40c2c1d5f0c7b!8m2!3d-34.6386094!4d-58.5080289!9m1!1b1!16s%2Fg%2F11b6dlkvd2?hl=es-419&entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white hover:bg-zinc-100 text-zinc-900 hover:text-black font-black text-xs md:text-sm px-8 py-4.5 rounded-full border border-zinc-200 transition-all shadow-md hover:shadow-xl tracking-wider uppercase font-sans cursor-pointer active:scale-95 hover:scale-105"
            >
              {/* Google G logo inside button */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Dejanos tu opinión</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── 7. CONTACTO, HORARIOS Y UBICACIÓN ─── */}
      <section id="contacto" className="max-w-7xl mx-auto px-6 py-20 md:py-28 relative z-10 w-full">
        <div className="text-center flex flex-col items-center gap-3 mb-12">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter">
            HORARIOS, UBICACIÓN Y CONTACTO
          </h2>
          <p className="text-zinc-400 max-w-lg text-xs sm:text-sm leading-relaxed font-medium">
            Ubicados estratégicamente sobre Av. Rivadavia. Contamos con una grilla horaria semanal completa de lunes a sábados adaptada a tu ritmo.
          </p>
        </div>

        {/* Layout en columnas: calendario a la izquierda y contacto a la derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch w-full mb-8">
          
          {/* Grilla Horaria Estilo Calendario Semanal (4/5 de ancho en desktop) */}
          <div className="lg:col-span-4 flex flex-col gap-4 bg-zinc-900/10 border border-zinc-900 rounded-xl p-5 md:p-6 justify-between">
            <div className="flex flex-col gap-1 mb-3">
              <h3 className="text-sm md:text-base font-black text-white uppercase tracking-wide flex items-center gap-2">
                <svg className="w-4.5 h-4.5 text-orange-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                CALENDARIO SEMANAL DE CLASES
              </h3>
            </div>

            {/* Filtros de Actividades estilo Instagram Highlights */}
            <div className="flex flex-wrap items-center justify-start gap-1.5 mb-4 border-b border-zinc-900/50 pb-4">
              {filtros.map((filtro) => (
                <button
                  key={filtro.id}
                  onClick={() => setActiveFilter(filtro.id)}
                  className={`px-3.5 py-1.5 rounded-full font-sans text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-200 border ${
                    activeFilter === filtro.id
                      ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white border-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.3)] scale-[1.03]"
                      : "bg-zinc-900/40 text-zinc-400 border-zinc-800/80 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  {filtro.label}
                </button>
              ))}
            </div>

            {/* Indicador de scroll táctil en móvil */}
            <div className="mb-2.5 lg:hidden">
              <span className="text-[10px] sm:text-xs text-orange-400 font-black uppercase tracking-wider block">
                Deslizá hacia los lados para ver toda la semana
                <svg className="w-3.5 h-3.5 text-orange-500 inline-block align-middle ml-1.5 animate-swipe-arrow" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>

            {/* Tabla con scroll horizontal en móvil para evitar compresión y filas gigantes */}
            <div 
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className="border border-zinc-900 rounded-lg bg-zinc-950/50 p-2 md:p-3 overflow-x-auto w-full cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-zinc-850 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-zinc-950/50"
            >
              <table className="w-full border-collapse table-fixed min-w-[700px] lg:min-w-0">
                <thead>
                  <tr className="border-b-2 border-zinc-800">
                    <th className="pb-2 text-left font-sans text-zinc-400 text-[10px] sm:text-xs uppercase tracking-wider w-[12%] border-r border-zinc-800/80">
                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span>Hora</span>
                      </div>
                    </th>
                    {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((dia, idx) => (
                      <th key={dia} className={`pb-2 px-1 text-center w-[14.6%] ${idx < 5 ? "border-r border-zinc-800/80" : ""}`}>
                        <div className="bg-zinc-900/40 border border-zinc-800/30 rounded py-1 text-zinc-300 font-extrabold text-[10px] sm:text-xs uppercase tracking-wider">
                          {dia}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="">
                  {horasFiltradas.map((hora, hIdx) => {
                    const horaFin = getHoraFin(hora);
                    const isLastRow = hIdx === horasFiltradas.length - 1;
                    return (
                      <tr key={hora} className={isLastRow ? "" : "border-b border-zinc-800/60"}>
                        <td className="py-1.5 px-1 font-sans align-middle border-r border-zinc-800/80">
                          <span className="text-white font-black text-[10.5px] sm:text-[12px] block">{hora}</span>
                          <span className="text-zinc-400 font-bold text-[8.5px] sm:text-[10px] block mt-0.5">a {horaFin}</span>
                        </td>
                        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((dia, dIdx) => {
                          const clasesSlot = clasesDeCalendario.filter(
                            (c) =>
                              c.start === hora &&
                              c.dia === dia &&
                              (activeFilter === "todos" || c.categoria === activeFilter)
                          );
                          return (
                            <td key={dia} className={`p-0.5 align-middle ${dIdx < 5 ? "border-r border-zinc-800/40" : ""}`}>
                              {clasesSlot.length > 0 ? (
                                <div className="flex flex-col gap-0.5 w-full h-full">
                                  {clasesSlot.map((clase) =>
                                    renderCell(clase.actividad, clase.coach, clase.id)
                                  )}
                                </div>
                              ) : (
                                renderEmptyCell()
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Columna de Contacto & Dirección (1/5 de ancho en desktop) */}
          <div className="lg:col-span-1 flex flex-col gap-6 w-full">
            <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-5 flex flex-col gap-5">
              
              <div className="flex flex-col gap-5">
                <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-zinc-800/50 pb-3 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-orange-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  <span>CONTACTO</span>
                </h4>
                
                {/* Dirección — link a Google Maps */}
                <div className="flex flex-col gap-1.5">
                  <span className="font-extrabold text-[8.5px] text-zinc-600 font-mono uppercase tracking-widest">Dirección</span>
                  <a
                    href="https://www.google.com/maps/place/CrossFit+Villa+Luro/@-34.6387439,-58.5079941,16z/data=!4m17!1m8!3m7!1s0x95bcc9b4af239803:0x57088e616d2c2382!2sAv.+Rivadavia+10241,+C1408+Cdad.+Aut%C3%B3noma+de+Buenos+Aires!3b1!8m2!3d-34.6385224!4d-58.5080382!16s%2Fg%2F11crsb8m2j!3m7!1s0x95bcc9b4a7f816a7:0x86d40c2c1d5f0c7b!8m2!3d-34.6386094!4d-58.5080289!9m1!1b1!16s%2Fg%2F11b6dlkvd2?hl=es-419&entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2 text-zinc-300 hover:text-orange-400 transition-colors duration-200"
                  >
                    <svg className="w-3.5 h-3.5 mt-0.5 shrink-0 text-orange-500 group-hover:text-orange-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <span className="text-xs font-semibold leading-snug underline-offset-2 group-hover:underline">
                      Av. Rivadavia 10241,<br />Villa Luro, CABA
                    </span>
                  </a>
                </div>

                {/* Teléfonos con íconos en verde */}
                <div className="flex flex-col gap-3">
                  <span className="font-extrabold text-[8.5px] text-zinc-600 font-mono uppercase tracking-widest">Teléfonos</span>

                  {/* WhatsApp */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-xs font-semibold text-zinc-300 hover:text-green-400 transition-colors duration-200 group"
                  >
                    {/* WhatsApp Icon */}
                    <svg className="w-4.5 h-4.5 shrink-0 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>11-6707-1845</span>
                  </a>

                  {/* Teléfono Fijo */}
                  <a
                    href="tel:+541146353926"
                    className="flex items-center gap-2.5 text-xs font-semibold text-zinc-300 hover:text-green-400 transition-colors duration-200 group"
                  >
                    {/* Phone Icon */}
                    <svg className="w-4 h-4 shrink-0 text-green-400" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.338c0-1.152.89-2.088 2.042-2.088h1.274c.444 0 .84.279.984.7l1.286 3.734a1.052 1.052 0 01-.303 1.157l-.96.803a11.03 11.03 0 005.516 5.516l.803-.96a1.052 1.052 0 011.157-.303l3.734 1.286c.42.145.7.54.7.984v1.274c0 1.152-.936 2.042-2.088 2.042H18C9.372 21 3 14.628 3 6.338z" />
                    </svg>
                    <span>4635-3926</span>
                  </a>
                </div>
              </div>

              {/* Botón TurnosWeb */}
              <a 
                href={turnosWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black text-xs py-3.5 px-4 rounded-md text-center uppercase tracking-wider block transition-all border border-orange-700 shadow-md shadow-orange-950/20 active:scale-95 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                Reservar Turno
              </a>

            </div>
          </div>

        </div>

        {/* Mapa de Google Maps abajo, en formato alargado (widescreen) con efecto hover de desenfoque y mensaje */}
        <a
          href="https://www.google.com/maps/place/CrossFit+Villa+Luro/@-34.6386094,-58.5080289,17z/data=!4m6!3m5!1s0x95bcc9b4a7f816a7:0x86d40c2c1d5f0c7b!8m2!3d-34.6386094!4d-58.5080289!16s%2Fg%2F11b6dlkvd2?hl=es-419"
          target="_blank"
          rel="noopener noreferrer"
          className="relative block group bg-zinc-900/10 border border-zinc-900 p-2 rounded-xl w-full h-[260px] md:h-[320px] shadow-[0_0_30px_rgba(249,115,22,0.02)] bg-zinc-950/40 overflow-hidden cursor-pointer"
        >
          {/* Overlay de hover desenfoque y mensaje */}
          <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20 rounded-lg">
            <div className="flex items-center gap-2.5 bg-zinc-950/95 border border-orange-500/30 px-6 py-3 rounded-full shadow-[0_0_30px_rgba(234,88,12,0.15)] transform translate-y-2 group-hover:translate-y-0 scale-95 group-hover:scale-100 transition-all duration-300">
              <svg className="w-5 h-5 text-orange-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span className="text-white font-black text-xs sm:text-sm tracking-widest uppercase">Vení a visitarnos</span>
            </div>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.640565935606!2d-58.508038199999994!3d-34.6385224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc9b4af239803%3A0x57088e616d2c2382!2sAv.%20Rivadavia%2010241%2C%20C1408%20Cdad.%20Aut%C3%BOmoma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1745260630774!5m2!1ses-419!2sar"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg transition-all duration-500 group-hover:blur-[3px] pointer-events-none"
          ></iframe>
        </a>
      </section>

      {/* ─── 8. FOOTER CORPORATIVO PREMIUM ─── */}
      <footer className="border-t border-zinc-900 bg-zinc-950/90 relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          
          {/* Columna 1: Logo Animado y Datos */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="relative group perspective">
              {/* Contenedor circular con efecto 3D moneda */}
              <div className="w-20 h-20 rounded-full border-2 border-orange-500/20 bg-zinc-900/60 p-1 shadow-[0_0_25px_rgba(234,88,12,0.1)] flex items-center justify-center overflow-hidden animate-coin-flip">
                <img 
                  src="/cvl-assets/logo.png" 
                  alt="Logo CrossFit Villa Luro" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              {/* Resplandor decorativo de fondo */}
              <div className="absolute inset-0 -z-10 bg-orange-500/5 blur-xl rounded-full"></div>
            </div>
            
            <div className="flex flex-col text-center md:text-left gap-1.5">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">
                CROSSFIT VILLA LURO
              </h4>
              <p className="text-zinc-300 text-xs leading-relaxed max-w-xs font-medium">
                Box afiliado oficial. Superamos los límites físicos con entrenamientos guiados por profesionales certificados en CrossFit y Hyrox.
              </p>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h5 className="text-xs font-sans font-bold text-zinc-200 uppercase tracking-widest border-b border-zinc-900/60 pb-2 w-full text-center md:text-left">
              NAVEGACIÓN
            </h5>
            <ul className="flex flex-col items-center md:items-start gap-2.5 text-xs font-semibold text-zinc-350">
              <li>
                <a href="#certificaciones" className="hover:text-orange-400 transition-colors duration-200">
                  Respaldos
                </a>
              </li>
              <li>
                <a href="#clases" className="hover:text-orange-400 transition-colors duration-200">
                  Clases
                </a>
              </li>
              <li>
                <a href="#coaches" className="hover:text-orange-400 transition-colors duration-200">
                  Equipo
                </a>
              </li>
              <li>
                <a href="#comunidad" className="hover:text-orange-400 transition-colors duration-200">
                  Comentarios
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-orange-400 transition-colors duration-200">
                  Horarios & Ubicación
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Horarios de Atención */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h5 className="text-xs font-sans font-bold text-zinc-200 uppercase tracking-widest border-b border-zinc-900/60 pb-2 w-full text-center md:text-left">
              HORARIOS DEL BOX
            </h5>
            <div className="flex flex-col items-center md:items-start gap-2.5 text-xs text-zinc-300 font-semibold leading-relaxed text-center md:text-left">
              <p>
                <strong className="text-white">Lunes a Viernes:</strong><br />
                06:00 a 22:00 hs
              </p>
              <p>
                <strong className="text-white">Sábados:</strong><br />
                09:00 a 13:00 hs
              </p>
              <p className="text-zinc-500 font-medium text-[10px]">
                Domingos y Feriados cerrado.
              </p>
            </div>
          </div>

          {/* Columna 4: Redes y Contacto con íconos SVG */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h5 className="text-xs font-sans font-bold text-zinc-200 uppercase tracking-widest border-b border-zinc-900/60 pb-2 w-full text-center md:text-left">
              REDES Y CONTACTO
            </h5>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5">
              {/* WhatsApp */}
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                title="WhatsApp"
                className="w-10 h-10 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 hover:bg-green-500 hover:text-white hover:border-green-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/crossfit.villa.luro/" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Instagram"
                className="w-10 h-10 rounded-full border border-pink-500/20 bg-pink-500/5 text-pink-400 hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-500 hover:to-yellow-500 hover:text-white hover:border-transparent flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/crossfitvillaluro?locale=es_LA" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Facebook"
                className="w-10 h-10 rounded-full border border-blue-600/20 bg-blue-600/5 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              
              {/* Gmail */}
              <a 
                href="mailto:crossfitvillaluro@gmail.com" 
                title="Gmail"
                className="w-10 h-10 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Barra de Derechos Reservados */}
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-sans text-zinc-300">
          <div className="flex flex-col gap-0.5">
            <p>© {new Date().getFullYear()} CrossFit Villa Luro. Todos los derechos reservados.</p>
            <p className="text-zinc-400">Av. Rivadavia 10241, Villa Luro, CABA, Argentina.</p>
          </div>
          <div className="sm:text-right text-zinc-300">
            <p>
              Desarrollado y maquetado con excelencia por{" "}
              <a 
                href="https://portafolio-joa-tech.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cyan-400 hover:text-cyan-300 font-extrabold transition-colors hover:underline"
              >
                Joa Tech
              </a>
              .
            </p>
          </div>
        </div>
      </footer>

      {/* Botón Volver Arriba (Lado Izquierdo, Flotante) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 p-3 rounded-full bg-zinc-900/90 border border-zinc-800 text-white hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] backdrop-blur-sm group cursor-pointer ${
          showBackToTop ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-4 invisible pointer-events-none"
        }`}
        title="Volver arriba"
        aria-label="Volver al inicio"
      >
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>

      {/* Botón de WhatsApp Flotante (Lado Derecho, Poco Invasivo en Móviles) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center justify-center rounded-full bg-[#25D366] text-white transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 group cursor-pointer w-12 h-12 md:w-16 md:h-16"
        title="Escribinos por WhatsApp"
        aria-label="Escribinos por WhatsApp"
      >
        {/* Anillo de pulso sutil (solo en desktop para no molestar en móviles) */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping -z-10 hidden md:block"></span>
        <svg className="w-6 h-6 md:w-9 md:h-9 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
