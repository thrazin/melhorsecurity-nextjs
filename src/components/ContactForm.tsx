'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  // A CORREÇÃO ESTÁ AQUI: O tipo correto é React.FormEvent
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!response.ok) {
        throw new Error('A resposta do servidor não foi OK.');
      }
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error("Contact form submission error:", error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      <div>
        <label className="block font-bold text-slate-300 mb-2">Seu nome completo</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" />
      </div>
      <div>
        <label className="block font-bold text-slate-300 mb-2">Seu melhor e-mail</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" />
      </div>
      <div>
        <label className="block font-bold text-slate-300 mb-2">Sua mensagem...</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition"></textarea>
      </div>
      {status && (
        <p className={`text-center font-semibold ${status === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
          {status === 'success' ? 'Mensagem enviada com sucesso!' : 'Ocorreu um erro. Tente novamente.'}
        </p>
      )}
      <button type="submit" disabled={isLoading} className="w-full py-4 bg-emerald-600 text-white font-bold text-lg rounded-lg transition hover:bg-emerald-500 disabled:bg-slate-600">
        {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
      </button>
    </form>
  );
}