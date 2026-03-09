import type { Metadata } from "next";
import { Poppins } from 'next/font/google'
import Script from "next/script";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import TrackClipsPixelPageView from "@/components/clips/TrackClipsPixelPageView";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: "CLIPS",
  description: "100,000+ VIRAL LUXURY VIDEOS",
  icons: {
    icon: "/icons/clips.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pixelId = (process.env.FACEBOOK_PIXEL_ID_LUXURY || '').replace(/\D/g, '');

  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/icons/clips.svg" />
        {/* ONVO 3DS SDK */}
        <script src="https://js.onvopay.com/v1/"></script>
        {pixelId && (
          <Script
            id="fb-pixel-clips-config"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.__META_PIXEL_ID_CLIPS = "${pixelId}";`,
            }}
          />
        )}
        {pixelId && (
          <Script
            id="fb-pixel-clips"
            src="/scripts/pixel-clips.js"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <TrackClipsPixelPageView />
        {children}
        {pixelId && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
        <Toaster position="bottom-center" richColors/>
      </body>
    </html>
  );
}
