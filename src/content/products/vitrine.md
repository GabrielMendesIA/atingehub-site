---
name: Vitrine
slug: vitrine
slogan: A primeira coisa que o cliente vê de você na internet.
summary: 'Página única que captura dado, registra consentimento e (na variante com checkout) cobra na hora. Sai do "manda pro WhatsApp" e vira porta de entrada digital.'
family: operacional
order: 1
tool_base: HTML/CSS estático ou framework leve + integração com gateway de pagamento (Stripe ou Mercado Pago) + LGPD + webhooks para n8n/CRM.
problem: 'O empresário hoje "manda pro WhatsApp" no anúncio — perde lead que ia comprar online, perde rastreio, perde possibilidade de remarketing.'
deliverable: Página no ar em 3 a 5 semanas, com checkout integrado (na variante com pagamento), pixel e webhooks. Cliente edita texto e imagem sozinho.
versatility: alta
sold_alone: true
dependencies: []
pricing:
  oneshot: "R$ 2,5–7,5k"
  monthly: "opcional R$ 300–500 (manutenção)"
  monthly_required: false
seo:
  title: Vitrine — sua landing de captura
  description: Página única que captura lead, registra LGPD e (com checkout) cobra na hora. Implementação em 3 a 5 semanas pela AtingeHUB.
---

## O que a Vitrine resolve

O anúncio leva pro WhatsApp. Funciona, mas você perde rastreio (não sabe quanto veio do anúncio), perde possibilidade de remarketing (não tem pixel), e fica refém do humor da equipe pra converter cada conversa.

A **Vitrine** é a página única que recebe o tráfego, captura o dado com consentimento LGPD, e — na variante com checkout — fecha a venda ali mesmo. WhatsApp continua como canal de relacionamento, mas o caixa não depende dele.

## O que vem na entrega

- Página no ar em domínio próprio (3 a 5 semanas).
- Formulário com validação + termo LGPD + integração com seu CRM (Chatwoot, planilha, ou n8n).
- Pixel do Meta + Google Tag Manager configurados.
- Variante com checkout: Stripe ou Mercado Pago integrados, com webhook que avisa quando entrou dinheiro.
- Mobile-first sempre — 60% do seu tráfego vai vir de Instagram/WhatsApp.
- Você edita texto, imagem e preço sozinho depois da entrega.

## Quando faz mais sentido

Vitrine é porta de entrada da AtingeHUB. Funciona isolada, e funciona bem. Cliente que tem fluxo de anúncio rodando mas perde lead no caminho ganha em retenção desde a primeira semana.

Combina muito bem com **Engrenagens** (automação que captura o lead da Vitrine e segue ele no WhatsApp) e **Cérebro** (organização do conteúdo que vai virar copy da página).

## Risco e mitigação

"Vitrine" também é nome de plataformas de e-commerce conhecidas (Vtex, Tray). Nas primeiras conversas, qualificamos em material escrito: *"Vitrine by AtingeHUB — sua landing de captura"*. Em call, falamos solto.

---

## Por dentro · stack técnica

### Astro 5 · landing rápida, SEO nativo, deploy estático

A Vitrine roda em **Astro 5** com Tailwind CSS, content collections e SSG (static site generation). Tudo vira HTML+CSS estático na build — **sem servidor, sem manutenção, sem fila de processamento**. Performance Lighthouse acima de 95, mobile-first, acessibilidade desde o setup.

### Anatomia do checkout

```
landing → form (validação inline) → captura LGPD → webhook
                                                       ↓
                                                  ┌─────┐
                                                  │ n8n │ → CRM, planilha, Cérebro
                                                  └─────┘
                                                       ↓
                                              Stripe / Mercado Pago
                                                       ↓
                                                  pagamento aprovado
                                                       ↓
                                              webhook de retorno
                                                       ↓
                                          email + WhatsApp confirmação
```

### Variantes de entrega

**Vitrine Captura** (one-shot menor)
- Página + form + LGPD + integração webhook
- Pixel Meta + Google Tag Manager
- Sem cobrança online — leva o lead pro WhatsApp ou CRM

**Vitrine Checkout** (one-shot maior)
- Tudo da Captura +
- Gateway de pagamento (Stripe ou Mercado Pago — escolhido no setup)
- Recibo + nota fiscal automatizada (via integração com sistema do cliente)
- Webhook de pagamento aprovado dispara fluxo pós-venda

### Hospedagem e domínio

- Deploy estático em **Vercel** (recomendado) ou **Hostinger** (alternativa)
- HTTPS automático com Let's Encrypt
- CDN global incluído
- Editor visual opcional: cliente edita texto e imagem via interface simples (sem mexer no código)

### Entregáveis técnicos

- Página no ar em domínio próprio (3 a 5 semanas)
- Code repository no GitHub do cliente — você fica dono do código
- Variante Captura: form + LGPD + webhook + analytics
- Variante Checkout: Stripe ou Mercado Pago integrado + recibo automático
- Mobile-first sempre — 60% do tráfego vem de WhatsApp/Instagram
- SEO base: sitemap.xml, robots.txt, OG image, JSON-LD Organization, performance Lighthouse 95+
- Treinamento de 1h: cliente aprende a editar texto e imagem sozinho
- Integração nativa com Engrenagens (n8n captura o lead e segue ele)
