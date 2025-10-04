import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { customerEmail, customerName, customerPhone } = await request.json();

    if (!customerEmail || !customerName) {
      return NextResponse.json({ error: 'Nome e e-mail são obrigatórios' }, { status: 400 });
    }
    
    const host = request.headers.get('host');
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Mentoria Completa em Segurança Digital',
              description: 'Proteção contra golpes virtuais e fraudes online'
            },
            unit_amount: 45000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${protocol}://${host}/success`,
      cancel_url: `${protocol}://${host}/cancel`,
      customer_email: customerEmail,
      metadata: {
        customer_name: customerName,
        customer_phone: customerPhone || '',
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    // ESTA É A PARTE CORRIGIDA
    console.error('Stripe error:', error);
    const message = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
    return NextResponse.json({ error: 'Erro interno do servidor', message }, { status: 500 });
  }
}