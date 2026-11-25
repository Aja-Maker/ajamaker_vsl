import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "El Viaje hacia la Salud | Aformativo University",
  description: "Un recorrido gratuito por seis territorios para comprender mejor tu salud y tu vida.",
};

export default function JourneyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
