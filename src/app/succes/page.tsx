'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SuccessPage() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          window.location.href = '/';
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gray-900 text-slate-300">
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-black text-emerald-400">✅ Compra Realizada com Sucesso!</h1>
        <p className="mt-4 text-lg">
          Parabéns! Você acaba de dar um passo crucial para sua segurança digital.
        </p>
        <p className="mt-2 text-slate-400">
          Enviamos um e-mail para você com as instruções e o link para agendar sua primeira sessão de mentoria. Por favor, verifique sua caixa de entrada (e a pasta de spam).
        </p>
        <p className="mt-8 text-sm text-slate-500">
          Você será redirecionado para a página inicial em <span id="countdown">{countdown}</span> segundos.
        </p>
        <Link href="/" className="mt-6 inline-block bg-emerald-500 text-black font-bold py-3 px-8 rounded-lg transition hover:opacity-80">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}