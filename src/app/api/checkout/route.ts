import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Define a URL de produção como uma constante. Esta é a forma mais segura.
const PRODUCTION_URL = "https://www.melhorsecurity.com";

export async function POST(request: Request) {
  try {
    const { customerEmail, customerName, customerPhone } = await request.json();
    
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
            unit_amount: 50000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Força o uso do domínio de produção para os redirecionamentos.
      success_url: `${PRODUCTION_URL}/success`, 
      cancel_url: `${PRODUCTION_URL}/cancel`,
      customer_email: customerEmail,
      metadata: {
        customer_name: customerName,
        customer_phone: customerPhone || '',
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    const message = error instanceof Error ? error.message : 'Erro desconhecido.';
    return NextResponse.json({ error: 'Erro interno do servidor ao criar checkout', message }, { status: 500 });
  }
}