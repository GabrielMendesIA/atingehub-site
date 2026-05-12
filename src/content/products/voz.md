---
name: Voz
slug: voz
slogan: A voz da loja respondendo no WhatsApp 24 horas por dia.
summary: IA calibrada com o tom do empresário, respondendo dúvida recorrente fora do horário. Escalada automática pra humano quando necessário.
family: inteligencia
order: 7
tool_base: Claude rodando via n8n, plugado no Chatwoot do Balcão, alimentado por chunks de conhecimento extraídos do Cérebro. Padrão validado em produção (Açaí Algomais, AUTOMAKER).
problem: Dúvidas recorrentes que chegam fora do horário comercial ficam sem resposta. Cliente espera 4 a 8 horas, perde paciência, vai pro concorrente.
deliverable: IA respondendo em produção 7 dias, com o tom do empresário (calibrada via Cérebro). Taxa de handoff humano abaixo de 30%. Relatório mensal de "mensagens IA × escaladas pra humano".
versatility: baixa
sold_alone: false
dependencies: [balcao]
pricing:
  oneshot: "R$ 3,5–6,5k (implementação)"
  monthly: "R$ 800–1,5k/mês (calibração obrigatória)"
  monthly_required: true
seo:
  title: Voz — IA de atendimento no WhatsApp 24h para varejo
  description: IA calibrada no tom do seu negócio, respondendo dúvida recorrente fora do horário. Escalada automática pra humano. Calibração contínua incluída.
---

## O que a Voz resolve

Cliente manda mensagem 22h perguntando se você tem o produto X. Você só vê no dia seguinte às 9h. Ele já perguntou ao concorrente também, que respondeu em 5 minutos. Venda perdida.

A **Voz** é a IA que responde no seu lugar quando você não está. Calibrada no tom da loja (não chatbot genérico) e alimentada pelo seu **Cérebro**, ela cobre o básico recorrente — preço, disponibilidade, horário, prazo de entrega, FAQ. Quando a confiança cai abaixo de um limiar (cliente quer negociar, fazer reclamação, ou pedir algo fora do padrão), passa a conversa pro humano automaticamente, sem deixar a pessoa sentindo que falou com robô.

## O que vem na entrega

- IA respondendo no WhatsApp em produção (4 a 6 semanas).
- Tom calibrado no Cérebro: responde como você responderia.
- Escalada automática pra humano quando confiança < limiar definido.
- Painel de controle no Chatwoot: você vê tudo, audita, ajusta.
- **Calibração mensal obrigatória** — preço muda, oferta muda, mensagem-padrão muda. Não dá pra deixar parado.
- Relatório mensal: mensagens IA × escaladas humanas, dúvidas mais frequentes, oportunidades de ajuste.

## Quando faz mais sentido

Voz **não pode ser vendida isolada** — exige o **Balcão** rodando (Chatwoot é a infra que a IA precisa). **Cérebro** é pré-requisito soft: sem ele, a IA chuta mais; com ele, a IA tem contexto do seu negócio.

É o único produto da AtingeHUB com **mensalidade obrigatória** — porque calibração contínua é parte do produto, não acessório. IA parada vira erro a partir do mês 2.

## Risco e mitigação

"Voz" é palavra curta e pode virar genérica em busca/SEO. Em material escrito, sempre acompanhamos com verbo de ação no slogan, ou qualificamos como *"a Voz, IA de atendimento da AtingeHUB"*. Em call, falamos solto.

---

## Por dentro · stack técnica

### Claude + n8n + Chatwoot · o trio que sustenta a IA de atendimento

A Voz não é um chatbot. É um **agente especializado** rodando dentro da sua infraestrutura — orquestrado pelo n8n, plugado no Chatwoot do Balcão, alimentado por chunks de conhecimento do Cérebro.

### Fluxo de uma mensagem

```
cliente → WhatsApp → Evolution → n8n trigger → Buffer 6s
                                                    ↓
                                            normaliza payload
                                                    ↓
                                          AI Agent (Claude)
                                          ├── contexto: vault
                                          ├── tool: produtos
                                          ├── tool: clientes
                                          └── tool: calculadora
                                                    ↓
                                          confiança < 0.7?
                                          ├── sim → escala humano
                                          └── não → resposta direto
                                                    ↓
                                          format saída → split por tipo
                                                    ↓
                                          Evolution → WhatsApp → cliente
```

### Calibração contínua mensal · não é acessório

A maior diferença entre **agente que envergonha** e **agente que vende** é a calibração contínua. Preço muda, oferta muda, mensagem padrão muda. **Não dá pra deixar parado**. Por isso a Voz tem mensalidade obrigatória — porque calibração contínua é parte do produto, não acessório.

### Componentes da entrega

- **System prompt** calibrado no tom do empresário (extraído do Cérebro)
- **Chunks de conhecimento** — produtos, logística, pagamentos, empresa, regras — versionados em pasta dedicada
- **Triagem** — classificador inicial separa dúvida simples (resolve sozinha) de complexa (escala)
- **Memória de conversa** — Postgres mantém últimas 20 trocas pra contexto
- **Escalada explícita** — quando passa pro humano, vem com resumo do que já foi tratado
- **Confiança quantificada** — score < limiar (0.7 padrão) força handoff

### Padrão herdado do AUTOMAKER

A AtingeHUB usa o padrão Maia/Sofia validado em produção no AUTOMAKER e no Açaí Algomais. **Reuso de arquitetura, calibração nova por cliente.** O time do cliente não precisa de engenheiro pra operar — só preenche campos nos chunks quando preço/oferta muda.

### Entregáveis técnicos

- Agente respondendo em produção, 7 dias sem intervenção (período de homologação)
- Chunks de conhecimento (5+ documentos: produtos, logística, pagamentos, empresa, regras) versionados
- System prompt calibrado, em arquivo editável pelo cliente
- Painel de calibração mensal: mensagens IA × escaladas humanas, dúvidas frequentes, oportunidades de ajuste
- Relatório de impacto: taxa de handoff < 30%, tempo médio de resposta, NPS pós-atendimento
- **Pré-requisito técnico**: Balcão rodando (Chatwoot) + Cérebro recomendado (vault)
- Cliente fica dono de tudo: chunks abertos, prompts auditáveis, sem caixa-preta
