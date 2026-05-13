# AtingeHUB Sober

Versão sóbria do site institucional da AtingeHUB.

Teste de arquitetura inspirado em **chaseai.io** — menos prose-manifesto, menos eyebrow colorida em cada seção, formulários com chips + progress indicator + "o que esperar" lateral. Mantém tokens visuais oficiais (fontes Fraunces/Inter/JetBrains Mono, paleta dark + acento Claude `#D97757`, 8 cor-tags dos produtos).

## Estrutura

- `/` — Home: hero → 4 pilares (Atendimento / Campanhas / Decisão / Operação) → processo em 4 passos → form de booking
- `/workshop` — Página do Workshop presencial em Sorocaba, com hero → como funciona → roadmap das 3h → o que você leva → preço/condições → FAQ → form de aplicação
- `/contato` — redireciona pra `/#booking`

## Dev

```
npm install
npm run dev
```

## Diferenças vs. site principal (atingehub-site)

| | atingehub-site (oficial) | atingehub-sober (teste) |
|---|---|---|
| Tom | Manifesto, prose longa, italic Fraunces como ênfase contínua | Direto, funcional, italic só nos heros |
| Captura | 100% WhatsApp link | Form HTML + WhatsApp como fallback |
| Hero | Terminal animado + manifesto | Headline + palavra rotacionada + 2 CTAs |
| Seções | row-header numerado em quase tudo | Headers limpos, sem numeração visível |
| Grid de fundo | Sempre presente, 48px | Removido — fundo sólido |
| Glow cards | Em quase todo card | Só nos serviços principais |
