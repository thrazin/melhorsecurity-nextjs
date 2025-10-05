/** @type {import('next').NextConfig} */
const nextConfig = {
  // Adiciona headers de segurança para todas as rotas
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Impede que seu site seja incorporado em iframes maliciosos (clickjacking).
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Impede o navegador de "adivinhar" o tipo de um arquivo, o que pode levar a vulnerabilidades.
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin', // Controla quanta informação de referência é enviada para outros sites.
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload', // Força o uso de HTTPS.
          },
        ],
      },
    ];
  },
};

export default nextConfig;