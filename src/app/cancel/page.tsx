import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gray-900 text-slate-300">
      <div className="max-w-md">
        <h1 className="text-4xl md:text-5xl font-black text-red-500">❌ Pagamento Cancelado</h1>
        <p className="mt-4 text-lg">
          O processo de pagamento foi interrompido ou cancelado.
        </p>
        <p className="mt-2 text-slate-400">
          Não se preocupe, nenhuma cobrança foi feita. Você pode voltar à página principal e tentar novamente quando quiser.
        </p>
        <Link href="/" className="mt-8 inline-block bg-emerald-500 text-black font-bold py-3 px-6 rounded-lg transition hover:opacity-80">
          Voltar e Tentar Novamente
        </Link>
      </div>
    </div>
  );
}