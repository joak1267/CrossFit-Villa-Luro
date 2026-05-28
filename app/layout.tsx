import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "CrossFit Villa Luro",
  description: "Box afiliado oficial de CrossFit y Partner oficial de Hyrox en Villa Luro, CABA. Entrená con coaches certificados y alcanza tu máximo potencial.",
  keywords: ["CrossFit", "Hyrox", "Villa Luro", "Gimnasio", "Entrenamiento Funcional", "CABA", "Box CrossFit"],
  authors: [{ name: "CrossFit Villa Luro" }],
  icons: {
    icon: "/cvl-assets/logo.png",
    shortcut: "/cvl-assets/logo.png",
    apple: "/cvl-assets/logo.png",
  },
  openGraph: {
    title: "CrossFit Villa Luro",
    description: "Box afiliado oficial de CrossFit y Partner oficial de Hyrox en Villa Luro, CABA. Entrená con coaches certificados y alcanza tu máximo potencial.",
    type: "website",
    images: [
      {
        url: "/cvl-assets/logo.png",
        width: 800,
        height: 800,
        alt: "Logo CrossFit Villa Luro",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500 selection:text-white flex flex-col">
        {children}
      </body>
    </html>
  );
}
