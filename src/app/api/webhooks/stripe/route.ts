import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

// Usa os nomes exatos das suas variáveis de ambiente
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const adminEmail = process.env.ADMIN_EMAIL;
const senderEmail = process.env.RESEND_FROM_EMAIL;
const calendlyLink = process.env.SCHEDULING_URL;

export async function POST(req: Request) {
  // Verificação inicial de configuração
  if (!webhookSecret || !adminEmail || !senderEmail || !calendlyLink) {
    console.error("ERRO CRÍTICO: Uma ou mais variáveis de ambiente para o webhook não estão configuradas (STRIPE_WEBHOOK_SECRET, ADMIN_EMAIL, RESEND_FROM_EMAIL, SCHEDULING_URL).");
    return NextResponse.json({ error: 'Erro de configuração interna do servidor.' }, { status: 500 });
  }

  const buf = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.warn(`❌ Falha na verificação da assinatura do Webhook: ${errorMessage}`);
    return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
  }

  // Lidar com o evento de compra finalizada
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_email;
    const customerName = session.metadata?.customer_name || 'Cliente';

    if (!customerEmail) {
      console.error('Email do cliente não encontrado na sessão do Stripe.');
      return NextResponse.json({ error: 'Email do cliente não encontrado.' }, { status: 400 });
    }

    try {
      // 1. Enviar e-mail para o admin
      await resend.emails.send({
        from: `Venda Realizada <${senderEmail}>`,
        to: adminEmail,
        subject: `🎉 Nova Venda! Mentoria para ${customerName}`,
        html: `<h1>Nova Venda Realizada!</h1><p><strong>Cliente:</strong> ${customerName}</p><p><strong>Email:</strong> ${customerEmail}</p>`,
      });

      // 2. Enviar e-mail para o comprador
      await resend.emails.send({
        from: `Melhor Security <${senderEmail}>`,
        to: customerEmail,
        subject: '✅ Sua compra da Mentoria foi confirmada!',
        html: `<h1>Obrigado por sua compra, ${customerName}!</h1><p>Você deu um passo importante para sua segurança digital.</p><p>O próximo passo é agendar nossa primeira sessão. Por favor, use o link abaixo para escolher o melhor horário:</p><p><a href="${calendlyLink}" target="_blank" rel="noopener noreferrer"><strong>Clique aqui para Agendar sua Mentoria</strong></a></p><p>Até breve!</p>`,
      });

    } catch (error) {
      console.error('Erro ao enviar e-mails de confirmação via Resend:', error);
      return NextResponse.json({ error: 'Falha ao enviar e-mails de confirmação.' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}