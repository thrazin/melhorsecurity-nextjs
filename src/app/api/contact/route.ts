// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.ADMIN_EMAIL;

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    if (!adminEmail) {
        console.error('ADMIN_EMAIL não está configurado.');
        return NextResponse.json({ error: 'Erro de configuração do servidor.' }, { status: 500 });
    }

    await resend.emails.send({
      from: 'Contato Site <onboarding@resend.dev>',
      to: adminEmail,
      subject: `Nova Mensagem de ${name} - Melhor Security`,
      replyTo: email, // <-- A CORREÇÃO ESTÁ AQUI
      html: `<p>Você recebeu uma nova mensagem de contato:</p>
             <p><strong>Nome:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Mensagem:</strong></p>
             <p>${message}</p>`,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Resend error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
    return NextResponse.json({ error: 'Erro ao enviar a mensagem.', message: errorMessage }, { status: 500 });
  }
}