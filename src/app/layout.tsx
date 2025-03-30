import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // 👈 IMPORTANTE

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AJAMAKER",
  description: "Vive, crece y transforma tu vida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}

        {/* 👇 SDK de Onvo para 3DS */}
        <Script
          src="https://js.onvopay.com/v1/"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
