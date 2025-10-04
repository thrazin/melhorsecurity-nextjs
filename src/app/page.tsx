'use client'; 

import { useState } from 'react';

export default function HomePage() {
  const [fullName, setFullName] = useState('kar koim k');
  const [email, setEmail] = useState('kargren@proton.me');
  const [whatsapp, setWhatsapp] = useState('4199999999');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    setIsLoading(true);
    setError('');

    if (!fullName || !email) {
      setError('Nome completo e e-mail são obrigatórios.');
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
      // ESTA É A PARTE QUE MUDOU
      // Verificamos se o que capturamos é realmente um objeto de Erro
      if (error instanceof Error) {
        setError(error.message);
      } else {
        // Se não for, mostramos uma mensagem genérica
        setError('Ocorreu um erro desconhecido.');
      }
      setIsLoading(false);
    }
  };

  return (
    <main style={{ fontFamily: 'sans-serif', backgroundColor: '#0A0A0A', color: '#E2E8F0', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '500px', width: '100%', backgroundColor: '#1E293B', padding: '40px', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#34d399', textAlign: 'center', marginBottom: '10px' }}>
          Quase lá!
        </h1>
        <p style={{ textAlign: 'center', color: '#94A3B8', marginBottom: '30px' }}>
          Preencha seus dados para ir para o pagamento seguro.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Nome Completo</label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #334155', backgroundColor: '#0F172A', color: '#E2E8F0' }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #334155', backgroundColor: '#0F172A', color: '#E2E8F0' }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>WhatsApp (com DDD)</label>
            <input 
              type="tel" 
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
              pattern="[0-9]{10,11}"
              style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #334155', backgroundColor: '#0F172A', color: '#E2E8F0' }}
            />
          </div>
          
          {error && <p style={{ color: '#F87171', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

          <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '15px', background: isLoading ? '#4B5563' : '#10B981', color: isLoading? '#9CA3AF' : '#064E3B', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', transition: 'background-color 0.2s' }}>
            {isLoading ? 'Aguarde...' : 'Ir para Pagamento Seguro'}
          </button>
        </form>
      </div>
    </main>
  );
}