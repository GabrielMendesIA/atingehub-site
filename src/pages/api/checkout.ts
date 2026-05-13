import type { APIRoute } from 'astro';
import { WORKSHOP_PRICES, WORKSHOP_LABELS } from '../../lib/notifications';

export const prerender = false;

interface CheckoutPayload {
  name: string;
  email: string;
  github: string;
  whatsapp?: string;
  mode: 'gravado' | 'aovivo' | 'ambos';
  liveDate?: string;
}

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export const POST: APIRoute = async ({ request, url }) => {
  let data: CheckoutPayload;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'invalid_json' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (
    !data.name?.trim() ||
    !isValidEmail(data.email) ||
    !data.github?.trim() ||
    !WORKSHOP_PRICES[data.mode]
  ) {
    return new Response(JSON.stringify({ ok: false, error: 'missing_fields' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const accessToken = import.meta.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    return new Response(
      JSON.stringify({ ok: false, error: 'mp_not_configured' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const price = WORKSHOP_PRICES[data.mode];
  const label = WORKSHOP_LABELS[data.mode];
  const origin = `${url.protocol}//${url.host}`;

  // Cria preferência no Mercado Pago via REST (mais leve que SDK)
  try {
    const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        items: [
          {
            title: `Workshop AtingeHUB · ${label}`,
            description: `Acesso vitalício ao GitHub AtingeHUB Stack + workshop (${label.toLowerCase()})`,
            quantity: 1,
            currency_id: 'BRL',
            unit_price: price,
          },
        ],
        payer: {
          name: data.name,
          email: data.email,
        },
        external_reference: JSON.stringify({
          name: data.name,
          email: data.email,
          github: data.github.replace(/^@/, '').trim(),
          whatsapp: data.whatsapp || '',
          mode: data.mode,
          liveDate: data.liveDate || '',
        }),
        back_urls: {
          success: `${origin}/obrigado?status=approved`,
          pending: `${origin}/obrigado?status=pending`,
          failure: `${origin}/obrigado?status=failure`,
        },
        auto_return: 'approved',
        notification_url: `${origin}/api/mp-webhook`,
        statement_descriptor: 'ATINGEHUB',
        metadata: {
          product: 'workshop',
          mode: data.mode,
        },
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error('[mp checkout] falha:', res.status, errBody);
      return new Response(JSON.stringify({ ok: false, error: 'mp_error' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const pref = (await res.json()) as { init_point: string; id: string };
    return new Response(
      JSON.stringify({ ok: true, checkoutUrl: pref.init_point, preferenceId: pref.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[mp checkout] exception:', err);
    return new Response(JSON.stringify({ ok: false, error: 'exception' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
