import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { customerEmail, customerName, customerPhone } = await request.json();
    
    // Constrói a URL base de forma robusta para o ambiente da Vercel
    const host = request.headers.get('host');
    const appUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://${host}`;

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
    console.error('Stripe Checkout Error:', error);
    const message = error instanceof Error ? error.message : 'Erro desconhecido.';
    return NextResponse.json({ error: 'Erro interno do servidor ao criar checkout', message }, { status: 500 });
  }
}