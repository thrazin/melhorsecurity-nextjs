import type { Metadata } from "next";
import localFont from 'next/font/local'; // Importa a função para fontes locais
import "./globals.css";

// Configura a sua fonte local
const robotoFlex = localFont({
  src: '../../public/font/RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf',
  display: 'swap',
  variable: '--font-roboto-flex', // Cria uma variável CSS para a fonte
});

export const metadata: Metadata = {
  title: "Melhor Security | Mentoria em Segurança Digital",
  description: "Aprenda a proteger seu Pix, WhatsApp e senhas de golpes.",
  icons: {
    icon: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={robotoFlex.variable}> {/* Aplica a variável da fonte */}
      <body>{children}</body>
    </html>
  );
}