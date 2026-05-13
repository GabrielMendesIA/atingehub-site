# AtingeHUB · site oficial

Site institucional da AtingeHUB — sistemas de IA pro varejo brasileiro. Stack: Astro 6 (SSR), Vercel, Tailwind v4, Mercado Pago, Google Sheets, Evolution API, ntfy, GitHub API.

## Stack

- **Front**: Astro 6 com `output: 'server'`, adapter Vercel, Tailwind 4
- **APIs internas** (Vercel Functions):
  - `POST /api/lead` — recebe form de booking da home
  - `POST /api/checkout` — cria preferência de pagamento no Mercado Pago
  - `POST /api/mp-webhook` — recebe confirmação de pagamento e dispara entregas
- **Integrações**:
  - **Mercado Pago** · checkout do Workshop (Pix, cartão, boleto)
  - **GitHub API** · adiciona cliente como colaborador do repo `GabrielMendesIA/atingehub-stack`
  - **Evolution API** · WhatsApp transacional (notifica dono, adiciona cliente ao grupo de alunos, manda boas-vindas)
  - **Google Sheets** · planilha de leads + planilha de vendas
  - **ntfy.sh** · push notifications no celular do dono

## Fluxos

### Lead (form da home)

1. Cliente preenche os 6 campos do formulário em `/#contato`
2. POST `/api/lead` dispara em paralelo:
   - Push ntfy com título "Novo lead · <nome>"
   - Append na planilha Sheets (LEADS)
   - Mensagem no Zap do dono via Evolution API
3. Cliente vê confirmação verde inline no próprio form
4. Se a API falhar, fallback abre WhatsApp com mensagem pré-preenchida

### Compra do Workshop

1. Cliente preenche dados em `/workshop#aplicar` (nome, email, **usuário GitHub**, WhatsApp, modalidade)
2. POST `/api/checkout` cria preferência no Mercado Pago e retorna `init_point`
3. Cliente é redirecionado pro checkout do Mercado Pago (Pix/cartão)
4. MP processa, redireciona pra `/obrigado?status=approved` (ou pending/failure)
5. MP chama webhook `/api/mp-webhook` no servidor
6. Webhook valida pagamento e dispara em paralelo:
   - **GitHub** · adiciona @user como colaborador do repo Stack (permission: pull)
   - **Evolution group** · adiciona telefone do cliente ao grupo de alunos
   - **Evolution DM** · manda mensagem de boas-vindas pro cliente
   - **Evolution DM** · notifica o dono da venda
   - **Sheets VENDAS** · append da linha
   - **ntfy** · push "💰 Venda confirmada"

## Configuração (env vars)

Copie `.env.example` pra `.env.local` (dev) ou configure no Vercel (prod). Cada bloco está documentado no arquivo.

Resumo do que precisa preencher:

| Variável | Onde pegar |
|---|---|
| `MP_ACCESS_TOKEN` | https://www.mercadopago.com.br/developers/panel/credentials |
| `NTFY_TOPIC` | Inventa um nome (ex `atingehub-leads-Sr0c4ba`) e abre `https://ntfy.sh/<topico>` no celular |
| `EVOLUTION_BASE_URL` | URL da Evolution API na sua VPS Hostinger |
| `EVOLUTION_INSTANCE` | Nome da instância conectada ao Zap |
| `EVOLUTION_API_KEY` | API key da instância |
| `OWNER_WHATSAPP` | Seu telefone E.164 sem + (ex `5515998554455`) |
| `WORKSHOP_GROUP_JID` | JID do grupo de alunos (`120363xxx@g.us`) · descobre em `GET /group/findAllGroups/{instance}` |
| `GITHUB_TOKEN` | https://github.com/settings/tokens · classic, escopo `repo` |
| `GITHUB_REPO` | `GabrielMendesIA/atingehub-stack` (default já configurado) |
| `GOOGLE_SA_EMAIL` | Email da Service Account no Google Cloud |
| `GOOGLE_SA_KEY` | Chave privada da Service Account (cole inteira entre aspas, com `\n` literal) |
| `SHEETS_LEADS_ID` | ID da planilha de leads |
| `SHEETS_SALES_ID` | ID da planilha de vendas |

## Webhook do Mercado Pago

Depois do deploy, configure o webhook no painel MP:

1. Abra https://www.mercadopago.com.br/developers/panel/webhooks
2. Adicione `https://atingehub.com/api/mp-webhook`
3. Marque o evento **Payments**
4. Salve

Se quiser testar em sandbox antes, crie credencial TEST no painel MP, troque o `MP_ACCESS_TOKEN` por TEST-..., e configure outro webhook apontando pro preview do Vercel.

## Planilhas Google (formato esperado)

### Planilha Leads (`SHEETS_LEADS_ID`) — aba `Leads`

Colunas A:H — Timestamp · Nome · Email · WhatsApp · Setor · Prazo · Faturamento · Dor

### Planilha Vendas (`SHEETS_SALES_ID`) — aba `Vendas`

Colunas A:J — Timestamp · Nome · Email · WhatsApp · GitHub · Plano · Data turma · Valor · ID MP · Status GitHub

## Dev local

```bash
npm install
cp .env.example .env.local
# preencha as variáveis
npm run dev
```

Pra testar o webhook MP localmente, use [ngrok](https://ngrok.com) ou um Vercel preview deployment.

## Histórico

- 2026-05-13 · substituição completa do site pela versão sóbria (commit `a5ba634`). Conteúdo anterior preservado em `../atingehub-site-archived-2026-05-13/`.
- 2026-05-13 · backend completo: APIs lead/checkout/webhook, integrações MP/GitHub/Evolution/Sheets/ntfy.
