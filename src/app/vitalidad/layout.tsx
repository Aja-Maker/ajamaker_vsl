import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "../globals.css";
import ClientMetaPixel from "@/components/ClientMetaPixel";
import Header from "@/components/Header";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  title: "Seminario Vitalidad | Aformativo University",
  description: "Mira el Seminario Vitalidad y descubre una nueva manera de comprender tu salud, tu energía y tu vida.",
};

export default function VitalidadLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${instrumentSans.variable} font-sans antialiased`}>
        <ClientMetaPixel />
        <Header />
        {children}
      </body>
    </html>
  );
}
