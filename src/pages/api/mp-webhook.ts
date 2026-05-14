import type { APIRoute } from 'astro';

export const prerender = false;

const N8N_BASE = import.meta.env.N8N_BASE_URL || 'https://workflows-mvp.algomaisacai.com.br/webhook';

/**
 * Proxy fino do webhook do Mercado Pago pro n8n.
 *
 * O Mercado Pago chama essa URL (atingehub.com/api/mp-webhook) com
 * notificações de pagamento. A gente reencaminha o body inteiro pro
 * workflow n8n que faz a orquestração das entregas (GitHub, Evolution,
 * Sheets, ntfy).
 *
 * MP espera ACK rápido (HTTP 200) — o n8n responde "ok" antes de
 * processar o resto, então não bloqueia.
 */
export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    // MP às vezes manda sem body em probes — só ACK
    return new Response('ok', { status: 200 });
  }

  try {
    await fetch(`${N8N_BASE}/atingehub-mp-webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error('[mp-webhook] forward exception:', err);
    // Mesmo se o forward falhar, retorna 200 — senão MP vai reenviar várias vezes
  }

  return new Response('ok', { status: 200 });
};

// MP às vezes faz GET pra validar webhook
export const GET: APIRoute = async () => new Response('ok', { status: 200 });
