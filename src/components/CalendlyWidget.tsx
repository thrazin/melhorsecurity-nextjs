'use client';
import { InlineWidget } from "react-calendly";

export default function CalendlyWidget() {
  // Esta variável PRECISA estar configurada na Vercel como NEXT_PUBLIC_SCHEDULING_URL
  const calendlyUrl = process.env.NEXT_PUBLIC_SCHEDULING_URL;

  if (!calendlyUrl) {
    return <div className="text-center text-red-400">A URL de agendamento não foi configurada.</div>;
  }

  return (
    <div className="calendly-container min-h-[700px]">
      <InlineWidget url={calendlyUrl} />
    </div>
  );
}