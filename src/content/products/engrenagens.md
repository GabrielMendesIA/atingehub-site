---
name: Engrenagens
slug: engrenagens
slogan: WhatsApp, follow-up e relatório rodando sozinhos.
summary: "3 workflows operacionais em n8n que tiram trabalho manual — captura de lead, follow-up automático, relatório diário."
family: operacional
order: 4
tool_base: n8n (orquestrador de fluxos visuais, self-hosted) + Evolution API (gateway WhatsApp não-oficial) + VPS própria do cliente. Roda em Docker.
problem: Processos repetitivos do dia a dia (captura de lead, follow-up, relatório) dependem de pessoa ou simplesmente não acontecem.
deliverable: 3 workflows em produção rodando 7 dias sem intervenção. Logs limpos, custos de API previsíveis.
versatility: alta
sold_alone: true
dependencies: []
pricing:
  oneshot: "R$ 4,5–7,5k"
  monthly: "opcional R$ 400–700 (manutenção)"
  monthly_required: false
seo:
  title: Engrenagens — automações operacionais para o seu varejo
  description: 3 workflows n8n rodando 7 dias sem intervenção. Captura de lead, follow-up automático e relatório diário. Stack aberta, cliente fica dono.
---

## O que as Engrenagens resolvem

Tem 3 coisas que travam o operacional de uma loja todo dia: alguém precisa anotar o lead que chegou pelo WhatsApp na planilha. Alguém precisa lembrar de mandar follow-up no cliente que não respondeu. Alguém precisa fechar o dia mandando relatório pro dono.

Quando isso depende de pessoa, falha. Quando funcionário sai, para. Quando dia é corrido, esquece.

As **Engrenagens** são 3 workflows que encaixam essas peças e fazem o operacional rodar sozinho.

## O que vem na entrega

- **Workflow 1** — Captura WhatsApp → planilha/CRM com tag automática (segmento, origem, urgência).
- **Workflow 2** — Follow-up automático após X horas sem resposta, com mensagem personalizada por contexto.
- **Workflow 3** — Relatório diário no fim do expediente: leads novos, conversas em aberto, dinheiro entrando.
- VPS configurada com Docker (incluído no one-shot).
- Evolution API conectada ao seu WhatsApp.
- Logs limpos + custos de API previsíveis.

## Quando faz mais sentido

Engrenagens é uma das melhores portas de entrada da AtingeHUB. Não depende de Cérebro nem de IA generativa — é automação clássica, previsível, robusta. Qualquer negócio com volume mínimo de WhatsApp ganha em organização desde a primeira semana.

É a base técnica que a **Cadência** (prospecção ativa) e a **Voz** (IA de atendimento) usam depois. Sem Engrenagens, esses dois sobem com menos qualidade.

## Risco e mitigação

O plural "Engrenagens" é pesado em copy curta. Em call e proposta, falamos "o módulo Engrenagens" ou "as Engrenagens" — nunca "a Engrenagens".

---

## Por dentro · stack técnica

### n8n · a cola que faz seus sistemas conversarem entre si

Todo negócio tem ferramentas que **deveriam** conversar e não conversam: a planilha que não fala com o CRM, o ERP que não avisa o financeiro, o formulário do site que vira e-mail perdido. O **n8n** é a cola visual de baixo custo que liga uma coisa na outra — planilhas, ERPs, e-mail, agenda, APIs internas, WhatsApp, qualquer sistema que tenha jeito de puxar ou empurrar dado.

E mais: é o **motor pra criar soluções novas sem virar projeto de TI**. Precisa avisar o financeiro toda vez que a venda passa de X? n8n. Quer puxar o estoque do fornecedor e atualizar seu catálogo? n8n. Quer que o agente de IA responda também no Telegram e no Instagram? n8n. Tudo rodando **no seu próprio servidor**, sem depender de plataforma que pode subir preço ou fechar conta.

### Anatomia de um workflow operacional

```
trigger → buffer → edit fields → ai agent → formato saída → output
  ⚡          ⧗          ✎             ◎              ✂              💬
WhatsApp   6s         normaliza   claude+vault   split tipo    Evolution
```

Cada nó conversa com tools laterais: model `claude`, memory `postgres`, tools `produtos / clientes / calculadora`. A mesma estrutura serve pros 3 workflows operacionais.

### Os 3 workflows da entrega

1. **Captura WhatsApp → planilha/CRM**
   - Trigger: nova mensagem entrando via Evolution API
   - Edit Fields: normaliza payload (nome, telefone, primeira mensagem)
   - Output: linha em Google Sheets + tag em Chatwoot/CRM

2. **Follow-up automático**
   - Schedule trigger: a cada hora
   - Condição: leads que não receberam resposta em X horas
   - AI Agent: gera mensagem contextual baseada no histórico
   - Output: envia via Evolution API + atualiza status

3. **Relatório diário operacional**
   - Schedule trigger: 18h ou fim do expediente
   - Coleta: leads do dia, conversas em aberto, valor entrado
   - AI Agent: resume em texto humano (não tabela seca)
   - Output: WhatsApp pro dono + e-mail backup

### Entregáveis técnicos

- 3 workflows n8n em produção, rodando 7 dias sem intervenção manual
- VPS configurada com Docker (incluída no one-shot)
- Evolution API conectada e mantida no seu WhatsApp Business
- Postgres para memória persistente dos agentes
- Logs limpos e custos de API previsíveis (Anthropic + Evolution)
- Senhas, credenciais e acessos organizados, testados e documentados — **você fica dono**
- Opcional: agente conectado ao motor de automação pra você pedir nova automação em português (alimenta a Bancada)
