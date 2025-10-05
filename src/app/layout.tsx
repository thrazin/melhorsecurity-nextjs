import type { Metadata } from "next";
import localFont from 'next/font/local';
import { SpeedInsights } from "@vercel/speed-insights/next"; // Adicionado
import "./globals.css";

const robotoFlex = localFont({
  src: '../../public/font/RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf',
  display: 'swap',
  variable: '--font-roboto-flex',
});

export const metadata: Metadata = {
  title: "Melhor Security | Mentoria em Segurança Digital",
  description: "Aprenda a proteger seu Pix, WhatsApp e senhas de golpes com uma mentoria individual e prática.",
  icons: {
    icon: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  metadataBase: new URL('https://melhorsecurity.com'),
  openGraph: {
    title: "Melhor Security | Mentoria em Segurança Digital",
    description: "Proteja-se contra golpes virtuais e fraudes online.",
    url: 'https://melhorsecurity.com',
    siteName: 'Melhor Security',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mentoria em Segurança Digital com Melhor Security',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Melhor Security | Mentoria em Segurança Digital",
    description: "Aprenda a proteger seu Pix, WhatsApp e senhas de golpes.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={robotoFlex.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Mentoria Completa em Segurança Digital",
            "description": "Mentoria individual de 4 semanas para aprender a proteger suas contas, senhas e dados financeiros de golpes e fraudes online.",
            "provider": {
              "@type": "Organization",
              "name": "Melhor Security",
              "url": "https://melhorsecurity.com"
            },
            "serviceType": "Consultoria em Segurança Digital",
            "offers": {
              "@type": "Offer",
              "price": "450.00",
              "priceCurrency": "BRL"
            }
          })}}
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}