import type { Metadata } from "next";
import { Instrument_Sans } from 'next/font/google'
import "../globals.css";
import ClientMetaPixel from "@/components/ClientMetaPixel";
import Header from "@/components/Header";

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-sans',
})

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
      <head>
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
      <body className={`${instrumentSans.variable} font-sans antialiased`}>
        <ClientMetaPixel/>
        <Header/>
        {children}
      </body>
    </html>
  );
}
