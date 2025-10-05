'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ShieldCheck, KeyRound, Search, CreditCard, Lock, GraduationCap, Plus, Minus } from 'lucide-react';
import dynamic from 'next/dynamic';

const CalendlyWidget = dynamic(() => import('@/components/CalendlyWidget'), { ssr: false, loading: () => <p className="text-center">Carregando agendamento...</p> });
const ContactForm = dynamic(() => import('@/components/ContactForm'), { ssr: false, loading: () => <p className="text-center">Carregando formulário...</p> });
const PaymentForm = dynamic(() => import('@/components/PaymentForm'), { ssr: false, loading: () => <p className="text-center">Carregando pagamento...</p> });

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-800 py-4">
      <button className="w-full flex justify-between items-center text-left text-lg font-semibold text-white" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </button>
      {isOpen && <div className="mt-3 text-slate-400"><p>{answer}</p></div>}
    </div>
  );
};

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigation = [
    { name: 'Benefícios', href: '#beneficios' },
    { name: 'Metodologia', href: '#metodologia' },
    { name: 'Investimento', href: '#investimento' },
    { name: 'Agendamento', href: '#agendamento' }, // <-- Link adicionado
    { name: 'Contato', href: '#contato' },
  ];

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
          <Image src="/images/logo.webp" alt="Logo Melhor Security" width={32} height={32} />
          <span className="font-bold text-xl text-white">Melhor Security</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navigation.map((item) => <a key={item.name} href={item.href} className="hover:text-emerald-400 transition">{item.name}</a>)}
        </nav>
        <div className="flex md:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400" onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Abrir menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <a href="#investimento" className="bg-emerald-600 text-white font-bold py-2 px-5 rounded-lg transition hover:bg-emerald-500 hidden md:inline-block">
          Proteger-me Agora
        </a>
      </header>

      <Dialog as="div" className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#111827] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5"><Image className="h-8 w-auto" src="/images/logo.webp" alt="" width={32} height={32}/></a>
            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-400" onClick={() => setMobileMenuOpen(false)}><XMarkIcon className="h-6 w-6" aria-hidden="true" /></button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => <a key={item.name} href={item.href} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-slate-800" onClick={() => setMobileMenuOpen(false)}>{item.name}</a>)}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      
      <main>
        <section className="text-center py-20 md:py-32 px-4">
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">INVESTIMENTO EM <span className="text-emerald-400">CIBERSEGURANÇA</span><br />E PROTEÇÃO DIGITAL</h1>
            <p className="text-lg md:text-xl mt-6 max-w-3xl mx-auto text-slate-400">Proteja-se contra golpes virtuais e fraudes com nossa mentoria. Aprenda a identificar e-mails falsos, navegar com segurança e defender suas redes sociais de invasões.</p>
            <a href="#investimento" className="mt-10 inline-block bg-emerald-600 text-white font-bold py-4 px-10 rounded-lg transition hover:bg-emerald-500 text-lg">Quero aprender proteção digital</a>
        </section>

        <section id="beneficios" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center"><h2 className="text-4xl md:text-5xl font-black text-white">Transforme sua <span className="text-emerald-400">Vulnerabilidade</span> em <span className="text-emerald-400">Fortaleza</span></h2><p className="text-lg mt-4 max-w-3xl mx-auto text-slate-400">Com a mentoria, você adquire habilidades práticas para se defender das ameaças digitais mais comuns.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"> <ShieldCheck className="text-emerald-400" size={32} /> <h3 className="text-xl font-bold mt-4 text-white">Blindar Redes Sociais</h3> <p className="text-slate-400 mt-2">Aprenda a ativar as barreiras que impedem a clonagem e a invasão de contas.</p> </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"> <KeyRound className="text-emerald-400" size={32} /> <h3 className="text-xl font-bold mt-4 text-white">Senhas à Prova de Falhas</h3> <p className="text-slate-400 mt-2">Descubra o método para criar e gerenciar senhas super seguras para todos os seus apps.</p> </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"> <Search className="text-emerald-400" size={32} /> <h3 className="text-xl font-bold mt-4 text-white">Mestre em Identificar Golpes</h3> <p className="text-slate-400 mt-2">Em segundos, você saberá identificar um e-mail, SMS ou mensagem de WhatsApp falsa.</p> </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"> <CreditCard className="text-emerald-400" size={32} /> <h3 className="text-xl font-bold mt-4 text-white">Compras Online e Pix Seguros</h3> <p className="text-slate-400 mt-2">Conheça o passo a passo para fazer compras e transferências sem cair em armadilhas.</p> </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"> <Lock className="text-emerald-400" size={32} /> <h3 className="text-xl font-bold mt-4 text-white">Privacidade em Primeiro Lugar</h3> <p className="text-slate-400 mt-2">Aprenda a configurar seu celular para decidir quem pode ver suas informações e fotos.</p> </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700"> <GraduationCap className="text-emerald-400" size={32} /> <h3 className="text-xl font-bold mt-4 text-white">Conhecimento Prático</h3> <p className="text-slate-400 mt-2">Aprenda técnicas e ferramentas que são realmente usadas no dia a dia por profissionais.</p> </div>
            </div>
          </div>
        </section>
        
        <section id="metodologia" className="py-20 px-4 bg-black/30">
            <div className="max-w-4xl mx-auto">
                <div className="text-center"><h2 className="text-4xl md:text-5xl font-black text-white">Metodologia <span className="text-emerald-400">Passo a Passo</span></h2><p className="text-lg mt-4 max-w-3xl mx-auto text-slate-400">Um plano de 4 etapas desenhado para te dar confiança e controle total da sua vida digital.</p></div>
                <div className="mt-12 space-y-8">
                    <div className="flex items-start gap-6"> <div className="text-xl font-bold bg-slate-700 text-emerald-400 rounded-full h-10 w-10 flex items-center justify-center shrink-0">1</div> <div><h3 className="text-xl font-bold text-white">Anamnese e Diagnóstico</h3><p className="text-slate-400 mt-1">Nosso primeiro encontro é uma imersão no seu dia a dia digital. Faremos um diagnóstico completo para mapear seus riscos e criar um plano de aprendizado 100% focado suas necessidades.</p></div> </div>
                    <div className="flex items-start gap-6"> <div className="text-xl font-bold bg-slate-700 text-emerald-400 rounded-full h-10 w-10 flex items-center justify-center shrink-0">2</div> <div><h3 className="text-xl font-bold text-white">Encontros Práticos</h3><p className="text-slate-400 mt-1">Realizaremos 4 encontros de 1 hora, ao vivo e individuais. Você escolhe a plataforma mais confortável: Google Meet, Discord ou WhatsApp. O foco é total em aplicar o conhecimento na prática.</p></div> </div>
                    <div className="flex items-start gap-6"> <div className="text-xl font-bold bg-slate-700 text-emerald-400 rounded-full h-10 w-10 flex items-center justify-center shrink-0">3</div> <div><h3 className="text-xl font-bold text-white">Material de Suporte</h3><p className="text-slate-400 mt-1">Você receberá acesso a um material eletrônico exclusivo, com o passo a passo e os links para todas as ferramentas discutidas. Um guia de consulta rápida para usar sempre que precisar.</p></div> </div>
                    <div className="flex items-start gap-6"> <div className="text-xl font-bold bg-slate-700 text-emerald-400 rounded-full h-10 w-10 flex items-center justify-center shrink-0">4</div> <div><h3 className="text-xl font-bold text-white">Suporte Contínuo</h3><p className="text-slate-400 mt-1">Sua segurança não termina com a mentoria. Você terá uma linha direta via WhatsApp com o mentor para tirar dúvidas por até 60 dias após nosso último encontro.</p></div> </div>
                </div>
            </div>
        </section>

        <section id="investimento" className="py-20 px-4">
            <div className="max-w-md mx-auto">
                <div className="text-center"><h2 className="text-4xl md:text-5xl font-black text-white">Investimento na Sua <span className="text-emerald-400">Tranquilidade Digital</span></h2><p className="text-lg mt-4 max-w-3xl mx-auto text-slate-400">Acesso único a um especialista para guiar seus passos no mundo da segurança digital.</p></div>
                <div className="mt-10 bg-slate-800/50 border border-slate-700 rounded-xl p-8"><h3 className="text-xl font-bold text-white">Mentoria Completa em Segurança</h3><p className="text-slate-400 mt-2 line-through">De R$ 850,00</p><p className="text-5xl font-black text-white mt-1">Por R$ 450,00</p><p className="text-emerald-400 font-semibold">ou 12x de R$ 45,19</p><ul className="space-y-3 mt-6 text-slate-300"><li className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" />4 encontros de 1h ao vivo e individuais</li><li className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" />Análise de Risco e Conteúdo Personalizado</li><li className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" />Material de Apoio com Ferramentas e Guias</li><li className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" />Suporte via WhatsApp por 60 dias pós-mentoria</li></ul><a href="#comprar-form" className="mt-6 block w-full text-center bg-emerald-600 text-white font-bold py-3 rounded-lg transition hover:bg-emerald-500">Garantir Minha Vaga</a></div>
            </div>
            <div id="comprar-form" className="max-w-md mx-auto mt-12"><PaymentForm /></div>
        </section>
        
        {/* --- SEÇÃO DE AGENDAMENTO (CORREÇÃO) --- */}
        <section id="agendamento" className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white">Pronto para Começar?</h2>
            <p className="text-lg mt-4 max-w-3xl mx-auto text-slate-400">Se você já realizou a compra, use o calendário abaixo para agendar sua primeira sessão de mentoria.</p>
            <div className="mt-12 rounded-lg overflow-hidden border border-slate-700">
              <CalendlyWidget />
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 px-4 bg-black/30">
            <div className="max-w-4xl mx-auto">
                <div className="text-center"><h2 className="text-4xl md:text-5xl font-black text-white">Dúvidas Frequentes</h2></div>
                <div className="mt-12">{faqData.map((item, index) => <FaqItem key={index} question={item.question} answer={item.answer} />)}</div>
            </div>
        </section>

        <section id="contato" className="py-20 px-4">
            <div className="max-w-xl mx-auto">
                <div className="text-center"><h2 className="text-4xl md:text-5xl font-black text-white">Fale Conosco</h2><p className="text-lg mt-4 max-w-3xl mx-auto text-slate-400">Tem alguma pergunta? Mande uma mensagem e responderemos em breve.</p></div>
                <ContactForm />
            </div>
        </section>
      </main>

      <footer className="text-center py-8 border-t border-slate-800">
        <p className="text-slate-500">&copy; {new Date().getFullYear()} Melhor Security. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}