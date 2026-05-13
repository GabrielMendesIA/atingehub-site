/**
 * Camada de notificações da AtingeHUB.
 *
 * Cada função roda em tentativa independente — se uma falhar (rede,
 * credencial errada, etc) ela apenas loga e segue. Nunca derruba a
 * request principal por falha de notificação lateral.
 */

// ─── ntfy push ────────────────────────────────────────────────
export async function notifyNtfy(opts: {
  title: string;
  body: string;
  tags?: string[]; // emojis como 'tada', 'moneybag', 'rocket'
  priority?: 'min' | 'low' | 'default' | 'high' | 'urgent';
}): Promise<void> {
  const topic = import.meta.env.NTFY_TOPIC || 'atingehub-leads';
  const url = `https://ntfy.sh/${topic}`;
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Title': opts.title,
        'Tags': (opts.tags || ['inbox_tray']).join(','),
        'Priority': opts.priority || 'default',
        'Content-Type': 'text/plain; charset=utf-8',
      },
      body: opts.body,
    });
  } catch (err) {
    console.error('[ntfy] falhou:', err);
  }
}

// ─── WhatsApp via Evolution API (VPS Hostinger) ───────────────
export async function notifyEvolution(opts: {
  to: string; // pode ser número (E.164 sem +) ou JID de grupo (xxx@g.us)
  text: string;
}): Promise<void> {
  const base = import.meta.env.EVOLUTION_BASE_URL;
  const instance = import.meta.env.EVOLUTION_INSTANCE;
  const apiKey = import.meta.env.EVOLUTION_API_KEY;

  if (!base || !instance || !apiKey) {
    console.warn('[evolution] env vars não configuradas, pulando envio');
    return;
  }

  try {
    await fetch(`${base.replace(/\/$/, '')}/message/sendText/${instance}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey,
      },
      body: JSON.stringify({
        number: opts.to,
        text: opts.text,
      }),
    });
  } catch (err) {
    console.error('[evolution] falhou:', err);
  }
}

// ─── Adicionar participante a grupo do WhatsApp ───────────────
export async function addToWhatsappGroup(opts: {
  groupJid: string; // formato xxxxxx@g.us
  participantPhone: string; // E.164 sem +, ex 5515998554455
}): Promise<void> {
  const base = import.meta.env.EVOLUTION_BASE_URL;
  const instance = import.meta.env.EVOLUTION_INSTANCE;
  const apiKey = import.meta.env.EVOLUTION_API_KEY;

  if (!base || !instance || !apiKey) {
    console.warn('[evolution-group] env vars não configuradas, pulando');
    return;
  }

  try {
    await fetch(
      `${base.replace(/\/$/, '')}/group/updateParticipant/${instance}?groupJid=${opts.groupJid}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': apiKey,
        },
        body: JSON.stringify({
          action: 'add',
          participants: [opts.participantPhone],
        }),
      }
    );
  } catch (err) {
    console.error('[evolution-group] falhou:', err);
  }
}

// ─── Google Sheets ────────────────────────────────────────────
export async function appendToSheet(opts: {
  sheetId: string; // ID da planilha (na URL do Sheets)
  range: string; // ex 'Leads!A:Z' ou 'Vendas!A:Z'
  values: (string | number)[];
}): Promise<void> {
  const clientEmail = import.meta.env.GOOGLE_SA_EMAIL;
  const privateKey = (import.meta.env.GOOGLE_SA_KEY || '').replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    console.warn('[sheets] env vars não configuradas, pulando');
    return;
  }

  try {
    const { google } = await import('googleapis');
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: opts.sheetId,
      range: opts.range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [opts.values] },
    });
  } catch (err) {
    console.error('[sheets] falhou:', err);
  }
}

// ─── GitHub: adicionar colaborador ao repo Stack ──────────────
export async function inviteToGithubRepo(opts: {
  githubUser: string; // username sem @
  permission?: 'pull' | 'triage' | 'push' | 'maintain' | 'admin';
}): Promise<{ ok: boolean; status?: number; error?: string }> {
  const token = import.meta.env.GITHUB_TOKEN;
  const repo = import.meta.env.GITHUB_REPO || 'GabrielMendesIA/atingehub-stack';
  const user = opts.githubUser.replace(/^@/, '').trim();

  if (!token) {
    console.warn('[github] GITHUB_TOKEN não configurado');
    return { ok: false, error: 'no token' };
  }
  if (!user) return { ok: false, error: 'empty username' };

  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/collaborators/${user}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${token}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({ permission: opts.permission || 'pull' }),
      }
    );
    return { ok: res.ok, status: res.status };
  } catch (err) {
    console.error('[github] falhou:', err);
    return { ok: false, error: String(err) };
  }
}

// ─── Preço por plano (espelha BookingForm/Checkout) ───────────
export const WORKSHOP_PRICES: Record<string, number> = {
  gravado: 297,
  aovivo: 497,
  ambos: 597,
};

export const WORKSHOP_LABELS: Record<string, string> = {
  gravado: 'Gravado',
  aovivo: 'Ao vivo',
  ambos: 'Gravado + ao vivo',
};
