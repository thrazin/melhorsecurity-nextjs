import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const adminEmail = process.env.ADMIN_EMAIL;
const senderEmail = process.env.RESEND_FROM_EMAIL;
const calendlyLink = process.env.SCHEDULING_URL;

export async function POST(req: Request) {
  console.log("INFO: Webhook do Stripe recebido.");

  if (!webhookSecret || !adminEmail || !senderEmail || !calendlyLink) {
    const missingVars = [
      !webhookSecret && "STRIPE_WEBHOOK_SECRET",
      !adminEmail && "ADMIN_EMAIL",
      !senderEmail && "RESEND_FROM_EMAIL",
      !calendlyLink && "SCHEDULING_URL"
    ].filter(Boolean).join(", ");
    console.error(`ERRO CRÍTICO: As seguintes variáveis de ambiente estão faltando: ${missingVars}`);
    return NextResponse.json({ error: 'Erro de configuração interna do servidor.' }, { status: 500 });
  }

  const buf = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    console.log("LOG: Assinatura do Webhook verificada com sucesso.");
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.warn(`❌ FALHA: A verificação da assinatura do Webhook falhou: ${errorMessage}`);
    return NextResponse.json({ error: `Webhook Error: ${errorMessage}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    console.log("LOG: Evento 'checkout.session.completed' recebido.");
    const session = event.data.object as Stripe.Checkout.Session;
    
    // --- INÍCIO DA CORREÇÃO ---
    // Extração robusta dos dados do cliente
    const customerEmail = session.customer_email;
    const customerName = session.metadata?.customer_name || session.customer_details?.name || 'Nome não fornecido';
    const customerPhone = session.metadata?.customer_phone || 'WhatsApp não fornecido';

    if (!customerEmail) {
      console.error("ERRO: Email do cliente não encontrado na sessão do Stripe.");
      return NextResponse.json({ error: 'Email do cliente não encontrado.' }, { status: 400 });
    }

    console.log(`LOG: Preparando para enviar e-mails para o cliente (${customerEmail}) e admin (${adminEmail}).`);
    console.log(`LOG: Dados do cliente extraídos: Nome=${customerName}, Email=${customerEmail}, WhatsApp=${customerPhone}`);

    try {
      // 1. Enviar e-mail para o admin (com todas as informações)
      console.log("LOG: Tentando enviar e-mail para o admin...");
      await resend.emails.send({
        from: `Venda Realizada <${senderEmail}>`,
        to: adminEmail,
        subject: `🎉 Nova Venda! Mentoria para ${customerName}`,
        html: `
          <h1>Nova Venda Realizada!</h1>
          <p><strong>Cliente:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>WhatsApp:</strong> ${customerPhone}</p>
        `,
      });
      console.log("LOG: E-mail para o admin enviado com sucesso.");

      // 2. Enviar e-mail para o comprador (sem alterações, já estava correto)
      console.log("LOG: Tentando enviar e-mail para o comprador...");
      await resend.emails.send({
        from: `Melhor Security <${senderEmail}>`,
        to: customerEmail,
        subject: '✅ Sua compra da Mentoria foi confirmada!',
        html: `<h1>Obrigado por sua compra, ${customerName}!</h1><p>Você deu um passo importante para sua segurança digital.</p><p>O próximo passo é agendar nossa primeira sessão. Por favor, use o link abaixo para escolher o melhor horário:</p><p><a href="${calendlyLink}" target="_blank" rel="noopener noreferrer"><strong>Clique aqui para Agendar sua Mentoria</strong></a></p><p>Até breve!</p>`,
      });
      console.log("LOG: E-mail para o comprador enviado com sucesso.");
      // --- FIM DA CORREÇÃO ---

    } catch (error) {
      console.error('ERRO AO ENVIAR E-MAILS VIA RESEND:', error);
      return NextResponse.json({ error: 'Falha ao enviar e-mails, mas o webhook foi processado.' }, { status: 500 });
    }
  } else {
    console.log(`LOG: Evento recebido do tipo '${event.type}', que não é 'checkout.session.completed'. Ignorando.`);
  }

  return NextResponse.json({ received: true });
}