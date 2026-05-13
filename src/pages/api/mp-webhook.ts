import type { APIRoute } from 'astro';
import {
  notifyNtfy,
  notifyEvolution,
  addToWhatsappGroup,
  appendToSheet,
  inviteToGithubRepo,
  WORKSHOP_PRICES,
  WORKSHOP_LABELS,
} from '../../lib/notifications';

export const prerender = false;

/**
 * Recebe webhook do Mercado Pago.
 * MP manda vários tipos de evento (payment, merchant_order, etc).
 * A gente só age em 'payment' com status 'approved'.
 */
export const POST: APIRoute = async ({ request }) => {
  const accessToken = import.meta.env.MP_ACCESS_TOKEN;
  if (!accessToken) return new Response('not configured', { status: 503 });

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response('invalid json', { status: 400 });
  }

  const type = body?.type || body?.topic;
  const paymentId = body?.data?.id || body?.id;

  if (type !== 'payment' || !paymentId) {
    // Não é evento de pagamento — só ACK
    return new Response('ok (ignored)', { status: 200 });
  }

  // Busca detalhes do pagamento na API MP
  let payment: any;
  try {
    const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) {
      console.error('[mp-webhook] falha ao buscar payment:', res.status);
      return new Response('mp fetch error', { status: 502 });
    }
    payment = await res.json();
  } catch (err) {
    console.error('[mp-webhook] exception:', err);
    return new Response('exception', { status: 500 });
  }

  if (payment.status !== 'approved') {
    return new Response('ok (not approved)', { status: 200 });
  }

  // Recupera dados do cliente do external_reference
  let ref: {
    name: string;
    email: string;
    github: string;
    whatsapp?: string;
    mode: 'gravado' | 'aovivo' | 'ambos';
    liveDate?: string;
  };
  try {
    ref = JSON.parse(payment.external_reference || '{}');
  } catch {
    console.error('[mp-webhook] external_reference inválido');
    return new Response('ref invalid', { status: 200 });
  }

  if (!ref.email || !ref.github || !ref.mode) {
    console.error('[mp-webhook] ref incompleto:', ref);
    return new Response('ref incomplete', { status: 200 });
  }

  const ts = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const price = WORKSHOP_PRICES[ref.mode] || payment.transaction_amount;
  const label = WORKSHOP_LABELS[ref.mode] || ref.mode;
  const ownerPhone = import.meta.env.OWNER_WHATSAPP || '5515998554455';
  const groupJid = import.meta.env.WORKSHOP_GROUP_JID; // formato xxxxx@g.us

  // 1. GitHub: adiciona colaborador no repo Stack
  const ghResult = await inviteToGithubRepo({
    githubUser: ref.github,
    permission: 'pull',
  });

  // 2. WhatsApp: adiciona cliente no grupo (se configurado e telefone existe)
  if (groupJid && ref.whatsapp) {
    // Normaliza telefone pra E.164 sem +
    const phone = ref.whatsapp.replace(/\D/g, '');
    const e164 = phone.startsWith('55') ? phone : `55${phone}`;
    await addToWhatsappGroup({ groupJid, participantPhone: e164 });
  }

  // 3. Disparos em paralelo
  const tasks: Promise<unknown>[] = [];

  // Planilha de vendas
  const sheetId = import.meta.env.SHEETS_SALES_ID;
  if (sheetId) {
    tasks.push(
      appendToSheet({
        sheetId,
        range: 'Vendas!A:J',
        values: [
          ts,
          ref.name,
          ref.email,
          ref.whatsapp || '',
          `@${ref.github}`,
          label,
          ref.liveDate || '',
          price,
          payment.id,
          ghResult.ok ? 'GitHub OK' : `GitHub ${ghResult.status || 'erro'}`,
        ],
      })
    );
  }

  // Push ntfy
  tasks.push(
    notifyNtfy({
      title: `💰 Venda confirmada · ${ref.name}`,
      body:
        `Plano: ${label}\n` +
        `Valor: R$ ${price}\n` +
        `GitHub: @${ref.github} ${ghResult.ok ? '✓' : '✗'}\n` +
        `Email: ${ref.email}\n` +
        `Phone: ${ref.whatsapp || '—'}\n` +
        `${ref.liveDate ? `Turma ao vivo: ${ref.liveDate}\n` : ''}` +
        `ID MP: ${payment.id}`,
      tags: ['moneybag', 'tada'],
      priority: 'urgent',
    })
  );

  // Notifica Gabriel no Zap
  tasks.push(
    notifyEvolution({
      to: ownerPhone,
      text:
        `💰 *Nova venda Workshop*\n\n` +
        `*${ref.name}*\n` +
        `Plano: ${label} — R$ ${price}\n` +
        `📧 ${ref.email}\n` +
        `📱 ${ref.whatsapp || '—'}\n` +
        `🐙 @${ref.github} ${ghResult.ok ? '✓ adicionado ao repo' : '✗ falhou (status ' + (ghResult.status || '?') + ')'}\n` +
        `${ref.liveDate ? `📅 Turma: ${ref.liveDate}\n` : ''}` +
        `\n_MP ${payment.id} · ${ts}_`,
    })
  );

  // Boas-vindas pro cliente no Zap
  if (ref.whatsapp) {
    const phone = ref.whatsapp.replace(/\D/g, '');
    const e164 = phone.startsWith('55') ? phone : `55${phone}`;
    tasks.push(
      notifyEvolution({
        to: e164,
        text:
          `Oi ${ref.name.split(' ')[0]}! 👋\n\n` +
          `Aqui é o Gabriel da AtingeHUB. Recebi sua compra do Workshop *${label}*.\n\n` +
          `✓ Acesso ao repositório AtingeHUB Stack: convite enviado pro GitHub @${ref.github} (chega por email do GitHub)\n` +
          (groupJid ? `✓ Você foi adicionado no grupo do WhatsApp dos alunos\n` : '') +
          (ref.mode === 'gravado' || ref.mode === 'ambos'
            ? `✓ Link da gravação chega no seu email (${ref.email}) em alguns minutos\n`
            : '') +
          (ref.mode === 'aovivo' || ref.mode === 'ambos'
            ? `✓ Data da próxima turma ao vivo confirmo aqui em breve\n`
            : '') +
          `\nQualquer dúvida, fala comigo direto por aqui!`,
      })
    );
  }

  await Promise.allSettled(tasks);

  return new Response('ok', { status: 200 });
};

// Mercado Pago manda GET pra validar webhook
export const GET: APIRoute = async () => new Response('ok', { status: 200 });
