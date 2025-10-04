import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Usa as variáveis de ambiente que você configurou
const contactEmail = process.env.CONTACT_FORM_DESTINATION_EMAIL;
const senderEmail = process.env.RESEND_FROM_EMAIL;

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!contactEmail || !senderEmail) {
      console.error("Variáveis de ambiente de e-mail não configuradas: CONTACT_FORM_DESTINATION_EMAIL ou RESEND_FROM_EMAIL");
      return NextResponse.json({ error: 'Erro de configuração do servidor.' }, { status: 500 });
    }
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    await resend.emails.send({
      from: `Contato Site <${senderEmail}>`,
      to: contactEmail,
      subject: `Nova Mensagem de ${name} - Melhor Security`,
      replyTo: email, // <-- A CORREÇÃO ESTÁ AQUI
      html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensagem:</strong></p><p>${message}</p>`,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Erro ao enviar a mensagem.' }, { status: 500 });
  }
}