# AtingeHUB · site oficial

Site institucional da AtingeHUB. Front em Astro (SSR no Vercel), backend dos formulários em **workflows n8n** que rodam na VPS Hostinger.

## Arquitetura

```
┌──────────────────────────┐
│ Cliente (browser)        │
│ atingehub.com            │
└──────────┬───────────────┘
           │ POST /api/lead
           │ POST /api/checkout
           ▼
┌──────────────────────────┐
│ Astro SSR (Vercel)       │
│ Proxy fino dos formulários│
└──────────┬───────────────┘
           │ POST /webhook/atingehub-{lead,checkout,mp-webhook}
           ▼
┌──────────────────────────┐
│ n8n (VPS Hostinger)      │
│ workflows-mvp.algomaisacai│
│                           │
│ atingehub-lead            │ → ntfy + Sheets Leads + Evolution Gabriel
│ atingehub-checkout        │ → Mercado Pago createPreference
│ atingehub-mp-webhook      │ → GitHub + Evolution group + Evolution welcome
│                           │   + Evolution Gabriel + Sheets Vendas + ntfy
└──────────────────────────┘
```

Por que essa arquitetura:
- **n8n é editável visualmente** — adicionar passo (ex. mandar pro Brevo, CRM novo) não exige deploy
- **Site fica simples** — só 3 endpoints proxy de ~30 linhas cada
- **Falhas isoladas** — se n8n cair, o front mostra fallback pra WhatsApp; se MP cair, o checkout retorna erro mas n8n nem é chamado
- **Segredos no n8n** — credenciais MP, Evolution, GitHub, Sheets ficam todos no painel do n8n, não no Vercel

## Fluxos

### Lead (form da home)

1. Cliente preenche os 6 campos em `/#contato`
2. POST `/api/lead` → proxy reencaminha pro n8n
3. Workflow **atingehub-lead** dispara em paralelo:
   - ntfy push (topic `atingehub-leads`)
   - Google Sheets append (planilha Leads)
   - Evolution sendText pra seu WhatsApp
4. Cliente vê confirmação verde inline no próprio form
5. Se a API falhar, fallback abre WhatsApp com mensagem pré-preenchida

### Compra do Workshop

1. Cliente preenche dados em `/workshop#aplicar` (nome, email, **usuário GitHub**, WhatsApp, modalidade)
2. POST `/api/checkout` → proxy → workflow **atingehub-checkout**
3. n8n calcula preço pela modalidade, cria preferência no Mercado Pago, devolve `init_point`
4. Cliente é redirecionado pro checkout do MP (Pix/cartão)
5. MP processa → cliente volta pra `/obrigado?status=approved`
6. **MP chama webhook** `https://atingehub.com/api/mp-webhook` → proxy → workflow **atingehub-mp-webhook**
7. Workflow valida (type=payment, status=approved), busca payment no MP API, parseia external_reference, dispara em paralelo:
   - **GitHub** · PUT collaborator no repo `GabrielMendesIA/atingehub-stack`
   - **Evolution group** · adiciona cliente no grupo de alunos
   - **Evolution welcome** · boas-vindas pro cliente no WhatsApp
   - **Evolution Gabriel** · notifica você
   - **Sheets Vendas** · append da linha
   - **ntfy** · push "💰 Venda"

## Configuração

### No Vercel (Project Settings → Environment Variables)

Só **1 variável** precisa ficar aqui:

| Variável | Valor |
|---|---|
| `N8N_BASE_URL` | `https://workflows-mvp.algomaisacai.com.br/webhook` |

### No n8n (Settings → Variables)

As credenciais ficam todas no n8n:

| Variável | Onde pegar |
|---|---|
| `MP_ACCESS_TOKEN` | https://www.mercadopago.com.br/developers/panel/credentials |
| `EVOLUTION_BASE_URL` | URL da Evolution API na sua VPS |
| `EVOLUTION_INSTANCE` | Nome da instância conectada ao Zap |
| `EVOLUTION_API_KEY` | API key da instância |
| `OWNER_WHATSAPP` | `5515998554455` |
| `WORKSHOP_GROUP_JID` | JID do grupo de alunos (`xxx@g.us`) |
| `GITHUB_TOKEN` | https://github.com/settings/tokens · classic, escopo `repo` |
| `GITHUB_REPO` | `GabrielMendesIA/atingehub-stack` |
| `SHEETS_LEADS_ID` | ID da planilha de leads |
| `SHEETS_SALES_ID` | ID da planilha de vendas |

E **credencial OAuth do Google Sheets** atribuída aos 2 nodes Google Sheets (`Sheets Leads` no workflow `atingehub-lead`, `Sheets Vendas` no `atingehub-mp-webhook`).

## Webhook do Mercado Pago

Depois de configurar `MP_ACCESS_TOKEN` no n8n, abrir https://www.mercadopago.com.br/developers/panel/webhooks e cadastrar:

- URL: `https://atingehub.com/api/mp-webhook`
- Evento: **Payments**

(Por que aponta pra `atingehub.com` e não direto pro n8n: domínio estável, e o proxy garante 200 mesmo se n8n falhar — MP não fica reenviando.)

## Planilhas Google (formato)

### Planilha Leads (`SHEETS_LEADS_ID`) — aba `Leads`
Cabeçalho A:H — `Timestamp · Nome · Email · WhatsApp · Setor · Prazo · Faturamento · Dor`

### Planilha Vendas (`SHEETS_SALES_ID`) — aba `Vendas`
Cabeçalho A:I — `Timestamp · Nome · Email · WhatsApp · GitHub · Plano · DataTurma · Valor · PaymentID`

## Workflows n8n

| Nome | ID | Trigger |
|---|---|---|
| `atingehub-lead` | `3eZV1fMJ5VAWMwXA` | POST `/webhook/atingehub-lead` |
| `atingehub-checkout` | `xx2I4B662RSEzAEp` | POST `/webhook/atingehub-checkout` |
| `atingehub-mp-webhook` | `i6tVhfm6XAAGKnEO` | POST `/webhook/atingehub-mp-webhook` |

Criados via MCP n8n, todos inativos por padrão — ativa quando estiver com credenciais e variáveis configuradas.

## Dev local

```bash
npm install
cp .env.example .env.local
# Preencha N8N_BASE_URL no .env.local
npm run dev
```

## Histórico

- 2026-05-13 · substituição completa do site pela versão sóbria (`a5ba634`). Conteúdo anterior em `../atingehub-site-archived-2026-05-13/`.
- 2026-05-13 · backend inicial: APIs locais com integrações diretas (`7c2f14a`).
- 2026-05-13 · migração do backend pra n8n via MCP. APIs viram proxy fino.
