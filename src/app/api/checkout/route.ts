import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { customerEmail, customerName, customerPhone } = await request.json();
    
    // Detecta a URL do site dinamicamente a partir da requisição
    const host = request.headers.get('host');
    const protocol = process.env.VERCEL_ENV === 'production' ? 'https' : 'http';
    const appUrl = `${protocol}://${host}`;

    if (!customerEmail || !customerName) {
      return NextResponse.json({ error: 'Nome e e-mail são obrigatórios' }, { status: 400 });
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Mentoria Completa em Segurança Digital'
            },
            unit_amount: 45000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${appUrl}/success`, // URL de sucesso corrigida
      cancel_url: `${appUrl}/cancel`,   // URL de cancelamento corrigida
      customer_email: customerEmail,
      metadata: {
        customer_name: customerName,
        customer_phone: customerPhone || '',
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error('Stripe error:', error);
    const message = error instanceof Error ? error.message : 'Erro desconhecido.';
    return NextResponse.json({ error: 'Erro interno do servidor', message }, { status: 500 });
  }
}