'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, KeyRound, Search, CreditCard, Lock, GraduationCap, Plus, Minus } from 'lucide-react';

// Componente para o item do FAQ (Dúvidas Frequentes)
const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800 py-4">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </button>
      {isOpen && (
        <div className="mt-3 text-slate-400">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default function HomePage() {
  // --- Estados e Lógica para o CHECKOUT ---
  const [checkoutFullName, setCheckoutFullName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutWhatsapp, setCheckoutWhatsapp] = useState('');
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const handleCheckoutSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsCheckoutLoading(true);
    setCheckoutError('');
    // ... (Lógica do checkout que já tínhamos)
  };

  // --- Estados e Lógica para o FORMULÁRIO DE CONTATO ---
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [contactStatus, setContactStatus] = useState(''); // 'success', 'error', ou ''

  const handleContactSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsContactLoading(true);
    setContactStatus('');
    // ... (Lógica do formulário de contato que vai chamar nossa nova API)
  };

  const faqData = [
    { question: "Preciso ter conhecimento técnico?", answer: "Não! A mentoria foi criada especialmente para pessoas que não entendem de tecnologia. Tudo é explicado de forma simples e prática." },
    { question: "Quanto tempo dura a mentoria?", answer: "A mentoria tem duração de 4 semanas, com 1 sessão por semana de 1 hora cada, totalizando 4 horas de conteúdo personalizado." },
    { question: "Como funcionam as aulas?", answer: "As aulas são individuais e online, realizadas via videochamada. Você terá atenção 100% personalizada para suas necessidades específicas." },
    { question: "E se eu não conseguir acompanhar?", answer: "Não se preocupe! O ritmo é totalmente adaptado ao seu perfil. Além disso, você terá acesso aos materiais para consultar sempre que precisar." },
    { question: "Quando terei acesso às ferramentas para melhorar minha segurança?", answer: "Desde a primeira aula! Vamos focar na sua necessidade pessoal e criar uma 'caixa de ferramentas' personalizada para você utilizar no seu dia a dia." },
  ];

  return (
    <div className="bg-[#111827] text-slate-300 font-sans antialiased">
      <header className="py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 bg-[#111827]/80 backdrop-blur-sm border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Image src="/logo.webp" alt="Logo Melhor Security" width={32} height={32} />
          <span className="font-bold text-xl text-white">Melhor Security</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#beneficios" className="hover:text-emerald-400 transition">Benefícios</a>
          <a href="#metodologia" className="hover:text-emerald-400 transition">Metodologia</a>
          <a href="#investimento" className="hover:text-emerald-400 transition">Investimento</a>
          <a href="#contato" className="hover:text-emerald-400 transition">Contato</a>
        </nav>
        <a href="#investimento" className="bg-emerald-600 text-white font-bold py-2 px-5 rounded-lg transition hover:bg-emerald-500">
          Proteger-me Agora
        </a>
      </header>

      <main>
        {/* Seção Herói */}
        <section className="text-center py-20 md:py-32 px-4">
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              INVESTIMENTO EM <span className="text-emerald-400">CIBERSEGURANÇA</span><br />E PROTEÇÃO DIGITAL
            </h1>
            <p className="text-lg md:text-xl mt-6 max-w-3xl mx-auto text-slate-400">
              Proteja-se contra golpes virtuais e fraudes com nossa mentoria. Aprenda a identificar e-mails falsos, navegar com segurança e defender suas redes sociais de invasões.
            </p>
            <a href="#investimento" className="mt-10 inline-block bg-emerald-600 text-white font-bold py-4 px-10 rounded-lg transition hover:bg-emerald-500 text-lg">
              Quero aprender proteção digital
            </a>
        </section>

        {/* Seção Benefícios */}
        <section id="beneficios" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white">Transforme sua <span className="text-emerald-400">Vulnerabilidade</span> em <span className="text-emerald-400">Fortaleza</span></h2>
              <p className="text-lg mt-4 max-w-3xl mx-auto text-slate-400">Com a mentoria, você adquire habilidades práticas para se defender das ameaças digitais mais comuns.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {/* Cards de Benefícios */}
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"> <ShieldCheck className="text-emerald-400" size={32} /> <h3 className="text-xl font-bold mt-4 text-white">Blindar Redes Sociais</h3> <p className="text-slate-400 mt-2">Aprenda a ativar as barreiras que impedem a clonagem e a invasão de contas.</p> </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"> <KeyRound className="text-emerald-400" size={32} /> <h3 className="text-xl font-bold mt-4 text-white">Senhas à Prova de Falhas</h3> <p className="text-slate-400 mt-2">Descubra o método para criar e gerenciar senhas super seguras para todos os seus apps.</p> </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"> <Search className="text-emerald-400" size={32} /> <h3 className="text-xl font-bold mt-4 text-white">Mestre em Identificar Golpes</h3> <p className="text-slate-400 mt-2">Em segundos, você saberá identificar um e-mail, SMS ou mensagem de WhatsApp falsa.</p> </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"> <CreditCard className="text-emerald-400" size={32} /> <h3 className="text-xl font-bold mt-4 text-white">Compras Online e Pix Seguros</h3> <p className="text-slate-400 mt-2">Conheça o passo a passo para fazer compras e transferências sem cair em armadilhas.</p> </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"> <Lock className="text-emerald-400" size={32} /> <h3 className="text-xl font-bold mt-4 text-white">Privacidade em Primeiro Lugar</h3> <p className="text-slate-400 mt-2">Aprenda a configurar seu celular para decidir quem pode ver suas informações e fotos.</p> </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"> <GraduationCap className="text-emerald-400" size={32} /> <h3 className="text-xl font-bold mt-4 text-white">Conhecimento Prático</h3> <p className="text-slate-400 mt-2">Aprenda técnicas e ferramentas que são realmente usadas no dia a dia por profissionais.</p> </div>
            </div>
          </div>
        </section>

        {/* Seção Metodologia */}
        <section id="metodologia" className="py-20 px-4 bg-black/30">
            <div className="max-w-4xl mx-auto">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white">Metodologia <span className="text-emerald-400">Passo a Passo</span></h2>
                    <p className="text-lg mt-4 max-w-3xl mx-auto text-slate-400">Um plano de 4 etapas desenhado para te dar confiança e controle total da sua vida digital.</p>
                </div>
                <div className="mt-12 space-y-8">
                    {/* Itens da Metodologia */}
                    <div className="flex items-start gap-6"> <div className="text-xl font-bold bg-slate-700 text-emerald-400 rounded-full h-10 w-10 flex items-center justify-center">1</div> <div><h3 className="text-xl font-bold text-white">Anamnese e Diagnóstico</h3><p className="text-slate-400 mt-1">Nosso primeiro encontro é uma imersão no seu dia a dia digital. Faremos um diagnóstico completo para mapear seus riscos e criar um plano de aprendizado 100% focado suas necessidades.</p></div> </div>
                    <div className="flex items-start gap-6"> <div className="text-xl font-bold bg-slate-700 text-emerald-400 rounded-full h-10 w-10 flex items-center justify-center">2</div> <div><h3 className="text-xl font-bold text-white">Encontros Práticos</h3><p className="text-slate-400 mt-1">Realizaremos 4 encontros de 1 hora, ao vivo e individuais. Você escolhe a plataforma mais confortável: Google Meet, Discord ou WhatsApp. O foco é total em aplicar o conhecimento na prática.</p></div> </div>
                    <div className="flex items-start gap-6"> <div className="text-xl font-bold bg-slate-700 text-emerald-400 rounded-full h-10 w-10 flex items-center justify-center">3</div> <div><h3 className="text-xl font-bold text-white">Material de Suporte</h3><p className="text-slate-400 mt-1">Você receberá acesso a um material eletrônico exclusivo, com o passo a passo e os links para todas as ferramentas discutidas. Um guia de consulta rápida para usar sempre que precisar.</p></div> </div>
                    <div className="flex items-start gap-6"> <div className="text-xl font-bold bg-slate-700 text-emerald-400 rounded-full h-10 w-10 flex items-center justify-center">4</div> <div><h3 className="text-xl font-bold text-white">Suporte Contínuo</h3><p className="text-slate-400 mt-1">Sua segurança não termina com a mentoria. Você terá uma linha direta via WhatsApp com o mentor para tirar dúvidas por até 60 dias após nosso último encontro.</p></div> </div>
                </div>
            </div>
        </section>

        {/* Seção Investimento (Checkout) */}
        <section id="investimento" className="py-20 px-4">
            <div className="max-w-md mx-auto">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white">Investimento na Sua <span className="text-emerald-400">Tranquilidade Digital</span></h2>
                    <p className="text-lg mt-4 max-w-3xl mx-auto text-slate-400">Acesso único a um especialista para guiar seus passos no mundo da segurança digital.</p>
                </div>
                <div className="mt-10 bg-slate-800/50 border border-slate-700 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-white">Mentoria Completa em Segurança</h3>
                  <p className="text-slate-400 mt-2 line-through">De R$ 850,00</p>
                  <p className="text-5xl font-black text-white mt-1">Por R$ 450,00</p>
                  <p className="text-emerald-400 font-semibold">ou 12x de R$ 45,19</p>
                  <ul className="space-y-3 mt-6 text-slate-300">
                    <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" />4 encontros de 1h ao vivo e individuais</li>
                    <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" />Análise de Risco e Conteúdo Personalizado</li>
                    <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" />Material de Apoio com Ferramentas e Guias</li>
                    <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" />Suporte via WhatsApp por 60 dias pós-mentoria</li>
                  </ul>
                  <a href="#comprar-form" className="mt-6 block w-full text-center bg-emerald-600 text-white font-bold py-3 rounded-lg transition hover:bg-emerald-500">Garantir Minha Vaga</a>
                </div>
            </div>
            {/* O formulário de checkout agora fica aqui */}
            <div id="comprar-form" className="max-w-md mx-auto mt-12">
              <form onSubmit={handleCheckoutSubmit} className="space-y-6 bg-slate-800/50 border border-slate-700 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-center text-white">Preencha para Pagar</h3>
                <div>
                  <label className="block font-bold text-slate-300 mb-2">Nome Completo</label>
                  <input type="text" value={checkoutFullName} onChange={(e) => setCheckoutFullName(e.target.value)} required className="w-full px-4 py-3 bg-[#0F172A] border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-2">Seu melhor e-mail</label>
                  <input type="email" value={checkoutEmail} onChange={(e) => setCheckoutEmail(e.target.value)} required className="w-full px-4 py-3 bg-[#0F172A] border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-2">WhatsApp</label>
                  <input type="tel" value={checkoutWhatsapp} onChange={(e) => setCheckoutWhatsapp(e.target.value)} required className="w-full px-4 py-3 bg-[#0F172A] border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" />
                </div>
                {checkoutError && <p className="text-red-400 text-center font-semibold">{checkoutError}</p>}
                <button type="submit" disabled={isCheckoutLoading} className="w-full py-4 bg-emerald-600 text-white font-bold text-lg rounded-lg transition hover:bg-emerald-500 disabled:bg-slate-600">
                  {isCheckoutLoading ? 'Processando...' : `Pagar R$ 450,00`}
                </button>
              </form>
            </div>
        </section>

        {/* Seção FAQ */}
        <section id="faq" className="py-20 px-4 bg-black/30">
            <div className="max-w-4xl mx-auto">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white">Dúvidas Frequentes</h2>
                </div>
                <div className="mt-12">
                    {faqData.map((item, index) => (
                      <FaqItem key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>
        </section>

        {/* Seção Contato */}
        <section id="contato" className="py-20 px-4">
            <div className="max-w-xl mx-auto">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white">Fale Conosco</h2>
                    <p className="text-lg mt-4 max-w-3xl mx-auto text-slate-400">Tem alguma pergunta? Mande uma mensagem e responderemos em breve.</p>
                </div>
                <form onSubmit={handleContactSubmit} className="mt-10 space-y-6">
                    <div>
                        <label className="block font-bold text-slate-300 mb-2">Seu nome completo</label>
                        <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} required className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" />
                    </div>
                    <div>
                        <label className="block font-bold text-slate-300 mb-2">Seu melhor e-mail</label>
                        <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition" />
                    </div>
                    <div>
                        <label className="block font-bold text-slate-300 mb-2">Sua mensagem...</label>
                        <textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} required rows={5} className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition"></textarea>
                    </div>
                    {contactStatus && (
                        <p className={`text-center font-semibold ${contactStatus === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {contactStatus === 'success' ? 'Mensagem enviada com sucesso!' : 'Ocorreu um erro. Tente novamente.'}
                        </p>
                    )}
                    <button type="submit" disabled={isContactLoading} className="w-full py-4 bg-emerald-600 text-white font-bold text-lg rounded-lg transition hover:bg-emerald-500 disabled:bg-slate-600">
                        {isContactLoading ? 'Enviando...' : 'Enviar Mensagem'}
                    </button>
                </form>
            </div>
        </section>
      </main>

      <footer className="text-center py-8 border-t border-slate-800">
        <p className="text-slate-500">&copy; {new Date().getFullYear()} Melhor Security. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}