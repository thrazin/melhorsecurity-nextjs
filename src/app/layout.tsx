import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

// Configura a sua fonte local (preservado)
const robotoFlex = localFont({
  src: '../../public/font/RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf',
  display: 'swap',
  variable: '--font-roboto-flex',
});

// --- INÍCIO DA CORREÇÃO DE SEO ---
export const metadata: Metadata = {
  // Metadados básicos
  title: "Melhor Security | Mentoria em Segurança Digital",
  description: "Aprenda a proteger seu Pix, WhatsApp e senhas de golpes com uma mentoria individual e prática.",
  icons: {
    icon: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },

  // Metadados avançados para SEO e redes sociais (com URLs absolutas)
  openGraph: {
    title: "Melhor Security | Mentoria em Segurança Digital",
    description: "Proteja-se contra golpes virtuais e fraudes online.",
    url: 'https://melhorsecurity.com',
    siteName: 'Melhor Security',
    images: [
      {
        url: 'https://melhorsecurity.com/og-image.png', // URL completa da imagem
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
    images: ['https://melhorsecurity.com/og-image.png'], // URL completa da imagem
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
// --- FIM DA CORREÇÃO DE SEO ---

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={robotoFlex.variable}>
      <head>
        {/* Adiciona os Dados Estruturados (Schema.org) */}
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
      <body>{children}</body>
    </html>
  );
}