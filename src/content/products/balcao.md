---
name: Balcão
slug: balcao
slogan: Todo atendimento humano no mesmo painel.
summary: CRM multicanal self-hosted que centraliza WhatsApp, Instagram, email e chat. Pipeline visível, histórico, atribuição de vendedor.
family: operacional
order: 6
tool_base: Chatwoot (CRM de atendimento self-hosted, open-source) rodando em VPS própria do cliente, com 2+ inboxes ativos (WhatsApp, Instagram, email, chat do site), pipeline visível, labels customizadas, time treinado pra operar.
problem: Empresário hoje "não sabe quem respondeu o quê" — atendimento disperso entre 3 celulares, 2 vendedores, sem histórico, sem atribuição. Cliente pergunta a mesma coisa pra pessoas diferentes.
deliverable: Chatwoot instalado em domínio próprio (com whitelabel — suas cores e nome), 2+ inboxes ativos, pipeline visível, time operando 5 dias sem precisar perguntar nada técnico.
versatility: alta
sold_alone: true
dependencies: []
pricing:
  oneshot: "R$ 3,5–5,5k"
  monthly: "opcional R$ 300–600 (manutenção)"
  monthly_required: false
seo:
  title: Balcão — CRM multicanal Chatwoot self-hosted para varejo
  description: Centraliza WhatsApp, Instagram, email e chat num painel só. Histórico completo, pipeline visível, time atendendo no ritmo. Stack aberta, cliente fica dono.
---

## O que o Balcão resolve

Hoje você tem WhatsApp em 3 celulares, Instagram que 1 funcionária responde, email no Gmail que ninguém abre, e cada vendedor lembra (ou não) do que conversou com cada cliente. Cliente pergunta a mesma coisa 3 vezes. Vendedor que sai leva o contexto junto. Você não sabe quem fechou venda na semana.

O **Balcão** é o lugar onde tudo isso encontra. Igual ao balcão de uma loja física: o cliente chega, o vendedor sabe quem ele é, o histórico está ali.

## O que vem na entrega

- Chatwoot instalado em domínio próprio (3 a 5 semanas).
- Whitelabel completo — suas cores, sua marca, seu nome.
- 2+ inboxes ativos (WhatsApp, Instagram, email, chat do site — você escolhe).
- Pipeline com status + labels customizadas pra seu fluxo de venda.
- Time treinado em 1 a 2 sessões — opera 5 dias sem perguntar nada técnico.
- VPS configurada (incluída no one-shot).

## Quando faz mais sentido

Balcão é case real de cliente que quer organizar só o time humano antes de pensar em IA. Funciona isolado, e funciona bem. Em muitos casos é o primeiro passo que destrava a operação.

É também **pré-requisito técnico obrigatório da Voz** (IA de atendimento). Sem Chatwoot rodando, a IA não tem onde se plugar. Quem fecha só o Balcão hoje pode subir pra Voz quando estiver pronto.

## Risco e mitigação

Cliente pode fechar só o Balcão e nunca subir pra Voz — risco intencional. O discovery força a pergunta certa: *"Você quer só organizar o time humano OU também quer IA respondendo?"*. Se a resposta hoje é "só humano", fechamos o Balcão limpo e mantemos a conversa aberta pra IA depois.

---

## Por dentro · stack técnica

### Chatwoot · suporte e vendas num painel só

Seja **suporte** ou **vendas** — os dois usos mais comuns — o dono do negócio passa a ter visão do time inteiro em tempo real. Você vê quem está atendendo o quê, pode **reatribuir conversa pro colaborador certo** num clique, entrar no atendimento junto quando o caso for delicado, ou passar do humano pra IA (e vice-versa) sem o cliente perceber o handoff.

**Multicanal de verdade:** WhatsApp, Instagram DM, Facebook Messenger, e-mail, chat do site, chat do seu app — tudo numa caixa só. O cliente manda onde prefere; vocês respondem no mesmo lugar, com histórico unificado.

### Arquitetura da implementação

```
Chatwoot self-hosted (Docker)
   ├── Postgres (banco)
   ├── Redis (cache + queues)
   ├── Sidekiq (workers)
   └── Rails web app
        ↓ webhooks
    Evolution API (WhatsApp)
    Instagram Business API
    Facebook Pages API
    SMTP / IMAP (email)
    Chat widget (site)
```

Tudo roda **no seu servidor** (VPS própria, incluída no one-shot). Sem dependência de SaaS terceiro, sem risco de fechar conta, sem aumento surpresa de preço por agente.

### Pipeline visual e atribuição

- **Status customizado** — desenhado pra sua operação: novo, em atendimento, aguardando cliente, fechado, ganho, perdido
- **Labels** — etiquetas por origem (anúncio, indicação, retorno), por nicho, por urgência
- **Custom attributes** — campos próprios do seu negócio (CNPJ, segmento, ticket histórico, observação)
- **Atribuição automática** — round-robin entre atendentes, ou por regra (quem fala inglês recebe lead gringo)
- **Auto-resolução** — conversa sem atividade por X dias fecha sozinha com mensagem padrão

### Whitelabel completo

- Subdomínio no seu domínio (`atendimento.seunegocio.com.br`)
- Logo + cores + nome da sua empresa
- E-mails transacionais com seu domínio remetente
- O cliente nem percebe que tem Chatwoot por baixo

### Entregáveis técnicos

- Chatwoot instalado em domínio próprio, 3 a 5 semanas
- 2+ inboxes ativos (você escolhe quais canais)
- Pipeline com status + labels customizadas pro seu fluxo
- Custom attributes pros campos que importam ao seu negócio
- Time treinado em 1 a 2 sessões — opera 5 dias sem perguntar nada técnico
- VPS configurada com Docker, backups automáticos diários, Postgres dimensionado
- Documentação interna: como cadastrar atendente novo, como mudar regra de atribuição, como exportar conversa
- **Pré-requisito técnico obrigatório pra Voz** — sem Chatwoot rodando, a IA não tem onde se plugar
