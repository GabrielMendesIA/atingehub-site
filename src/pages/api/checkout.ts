import type { APIRoute } from 'astro';

export const prerender = false;

const N8N_BASE = import.meta.env.N8N_BASE_URL || 'https://workflows-mvp.algomaisacai.com.br/webhook';

const VALID_MODES = new Set(['gravado', 'aovivo', 'ambos']);

interface CheckoutPayload {
  name: string;
  email: string;
  github: string;
  whatsapp?: string;
  mode: string;
  liveDate?: string;
}

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export const POST: APIRoute = async ({ request }) => {
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
    !VALID_MODES.has(data.mode)
  ) {
    return new Response(JSON.stringify({ ok: false, error: 'missing_fields' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const res = await fetch(`${N8N_BASE}/atingehub-checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error('[api/checkout] n8n returned', res.status, text);
      return new Response(JSON.stringify({ ok: false, error: 'n8n_error' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let body: { ok?: boolean; checkoutUrl?: string; preferenceId?: string };
    try {
      body = JSON.parse(text);
    } catch {
      console.error('[api/checkout] n8n non-json response:', text);
      return new Response(JSON.stringify({ ok: false, error: 'bad_n8n_response' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!body.checkoutUrl) {
      return new Response(JSON.stringify({ ok: false, error: 'no_checkout_url' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ ok: true, checkoutUrl: body.checkoutUrl, preferenceId: body.preferenceId }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[api/checkout] exception:', err);
    return new Response(JSON.stringify({ ok: false, error: 'network' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
