import type { APIRoute } from 'astro';
import {
  notifyNtfy,
  notifyEvolution,
  appendToSheet,
} from '../../lib/notifications';

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

  const ts = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const summary = `Setor: ${data.sector} · Prazo: ${data.timeline} · Faturamento: ${data.budget}`;

  // Notificações em paralelo, sem await pra não bloquear resposta do form
  // (mas dentro de Promise.allSettled pra tudo ser disparado)
  const tasks: Promise<unknown>[] = [];

  // ntfy push
  tasks.push(
    notifyNtfy({
      title: `Novo lead · ${data.name}`,
      body: `${summary}\n\n"${data.challenge}"\n\n✉️ ${data.email}\n📱 ${data.whatsapp || '—'}`,
      tags: ['inbox_tray', 'fire'],
      priority: 'high',
    })
  );

  // Google Sheets
  const sheetId = import.meta.env.SHEETS_LEADS_ID;
  if (sheetId) {
    tasks.push(
      appendToSheet({
        sheetId,
        range: 'Leads!A:H',
        values: [
          ts,
          data.name,
          data.email,
          data.whatsapp || '',
          data.sector,
          data.timeline,
          data.budget,
          data.challenge,
        ],
      })
    );
  }

  // Notificação no Zap do Gabriel
  const ownerPhone = import.meta.env.OWNER_WHATSAPP || '5515998554455';
  tasks.push(
    notifyEvolution({
      to: ownerPhone,
      text:
        `🔥 *Novo lead no site*\n\n` +
        `*${data.name}*\n` +
        `📧 ${data.email}\n` +
        `📱 ${data.whatsapp || '—'}\n\n` +
        `*Setor:* ${data.sector}\n` +
        `*Prazo:* ${data.timeline}\n` +
        `*Faturamento:* ${data.budget}\n\n` +
        `*Dor:*\n${data.challenge}\n\n` +
        `_Enviado em ${ts}_`,
    })
  );

  await Promise.allSettled(tasks);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
