import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}