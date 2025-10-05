'use client';
import { useState } from 'react';

export default function PaymentForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: fullName,
          customerEmail: email,
          customerPhone: whatsapp,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Ocorreu um erro.');
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Um erro desconhecido ocorreu.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-2xl font-bold text-center text-white">Preencha para Pagar</h3>
      <div>
        <label className="block font-bold text-slate-300 mb-2">Nome Completo</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full px-4 py-3 bg-[#0F172A] border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" />
      </div>
      <div>
        <label className="block font-bold text-slate-300 mb-2">Seu melhor e-mail</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-[#0F172A] border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" />
      </div>
      <div>
        <label className="block font-bold text-slate-300 mb-2">WhatsApp</label>
        <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required className="w-full px-4 py-3 bg-[#0F172A] border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" />
      </div>
      {error && <p className="text-red-400 text-center font-semibold">{error}</p>}
      <button type="submit" disabled={isLoading} className="w-full py-4 bg-emerald-600 text-white font-bold text-lg rounded-lg transition hover:bg-emerald-500 disabled:bg-slate-600">
        {isLoading ? 'Processando...' : `Pagar R$ 450,00`}
      </button>
    </form>
  );
}