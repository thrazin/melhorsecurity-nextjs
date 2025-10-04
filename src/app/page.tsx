'use client';
import { useState } from 'react';
import Image from 'next/image'; // Componente otimizado para imagens do Next.js

export default function HomePage() {
  // --- INÍCIO DA LÓGICA DO FORMULÁRIO (NÃO MUDA NADA AQUI) ---
  const [fullName, setFullName] = useState(''); // Deixei em branco por padrão
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    if (!fullName || !email || !whatsapp) {
      setError('Todos os campos são obrigatórios.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: fullName,
          customerEmail: email,
          customerPhone: whatsapp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocorreu um erro ao iniciar o pagamento.');
      }

      window.location.href = data.url;

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ocorreu um erro desconhecido.');
      }
      setIsLoading(false);
    }
  };
  // --- FIM DA LÓGICA DO FORMULÁRIO ---

  // --- INÍCIO DA ESTRUTURA VISUAL DA PÁGINA ---
  return (
    <div className="bg-[#0A0A0A] text-slate-300 font-sans antialiased">
      {/* Cabeçalho */}
      <header className="py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="/logo.webp" alt="Logo Melhor Security" width={40} height={40} />
          <span className="font-bold text-xl text-white">Melhor Security</span>
        </div>
        <a href="#comprar" className="bg-emerald-500 text-black font-bold py-2 px-5 rounded-lg transition hover:opacity-80 hidden sm:inline-block">
          Garantir Vaga
        </a>
      </header>

      <main>
        {/* Seção Principal (Hero) */}
        <section className="relative text-center py-20 md:py-32 px-4 overflow-hidden">
          <Image
            src="/matrix.webp"
            alt="Fundo Matrix"
            layout="fill"
            objectFit="cover"
            quality={50}
            className="opacity-10"
          />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-black text-emerald-400 leading-tight">
              INVESTIMENTO EM CIBERSEGURANÇA<br />E PROTEÇÃO DIGITAL
            </h1>
            <p className="text-lg md:text-xl mt-6 max-w-3xl mx-auto text-slate-300">
              Proteja seu PIX, evite golpes com cartões e senhas, e navegue com segurança. Aprenda a identificar e mitigar os riscos básicos, mantendo todos os seus dados e acessos invioláveis.
            </p>
            <a href="#comprar" className="mt-10 inline-block bg-emerald-500 text-black font-bold py-4 px-10 rounded-lg transition hover:opacity-80 text-lg">
              Quero aprender a me proteger agora
            </a>
          </div>
        </section>

        {/* Seção do Formulário de Checkout */}
        <section id="comprar" className="py-20 bg-black/30">
          <div className="max-w-md mx-auto bg-[#1E293B] p-8 md:p-10 rounded-xl shadow-2xl shadow-emerald-500/10">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Quase lá!</h2>
              <p className="text-slate-400 mt-2">Preencha seus dados para ir para o pagamento seguro.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label className="block font-bold text-slate-300 mb-2">Nome Completo</label>
                <input 
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#0F172A] border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
              
              <div>
                <label className="block font-bold text-slate-300 mb-2">E-mail</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-[#0F172A] border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
              
              <div>
                <label className="block font-bold text-slate-300 mb-2">WhatsApp (com DDD)</label>
                <input 
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                  pattern="[0-9]{10,11}"
                  placeholder="41999999999"
                  className="w-full px-4 py-3 bg-[#0F172A] border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                />
              </div>
              
              {error && <p className="text-red-400 text-center font-semibold">{error}</p>}

              <button type="submit" disabled={isLoading} className="w-full py-4 bg-emerald-500 text-black font-bold text-lg rounded-lg transition hover:opacity-80 disabled:bg-slate-600 disabled:cursor-not-allowed">
                {isLoading ? 'Processando...' : 'Ir para Pagamento Seguro'}
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="text-center py-8 border-t border-slate-800">
        <p className="text-slate-500">&copy; {new Date().getFullYear()} Melhor Security. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
  // --- FIM DA ESTRUTURA VISUAL ---
}