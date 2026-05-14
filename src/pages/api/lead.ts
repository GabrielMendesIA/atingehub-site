import type { APIRoute } from 'astro';

export const prerender = false;

interface LeadPayload {
  name: string;
  email: string;
  whatsapp?: string;
  sector: string;
  timeline: string;
  challenge: string;
  budget: string;
}

const N8N_BASE = import.meta.env.N8N_BASE_URL || 'https://workflows-mvp.algomaisacai.com.br/webhook';

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export const POST: APIRoute = async ({ request }) => {
  let data: LeadPayload;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'invalid_json' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!data.name?.trim() || !isValidEmail(data.email) || !data.challenge?.trim()) {
    return new Response(JSON.stringify({ ok: false, error: 'missing_fields' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const res = await fetch(`${N8N_BASE}/atingehub-lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error('[api/lead] n8n returned', res.status, await res.text());
      return new Response(JSON.stringify({ ok: false, error: 'n8n_error' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[api/lead] exception:', err);
    return new Response(JSON.stringify({ ok: false, error: 'network' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
