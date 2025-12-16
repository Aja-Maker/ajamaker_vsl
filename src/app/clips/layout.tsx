import type { Metadata } from "next";
import { Poppins } from 'next/font/google'
import "../globals.css";
import ClientMetaPixel from "@/components/ClientMetaPixel";
import { addAttendeeToEvent } from "@/lib/google/addAtendeeToEvent";
import { Toaster } from "@/components/ui/sonner";

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
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/icons/clips.svg" />
        {/* ONVO 3DS SDK */}
        <script src="https://js.onvopay.com/v1/"></script>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?                         
              n.callMethod.apply(n,arguments):n.queue.push   
              (arguments)}; if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!
              0;n.version='2.0';n.queue=[];t=b.createElement(e);
              t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,
              'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', ${process.env.FACEBOOK_PIXEL_ID!});
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=
            PageView&noscript=1"/>
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <ClientMetaPixel/>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
