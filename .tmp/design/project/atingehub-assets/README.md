# AtingeHUB · Asset Pack v1.0

Pacote final de assets vetoriais da marca **AtingeHUB**, derivado do manual v1.0 e da exploração `AtingeHUB All Black.html`. Todos os arquivos foram gerados a partir de uma **função paramétrica única** — os 3 triângulos da cordilheira compartilham `half / h = 26/48 = 0.5417`. Nenhum desalinhamento entre escalas.

---

## Estrutura

```
atingehub-assets/
├── index.html                         ← showcase visual de TUDO (abra primeiro)
├── README.md                          ← este arquivo
│
├── logos/
│   ├── simbolo/
│   │   ├── logo-s{1,3,4}-claro.svg    ← 3 estilos × fundo claro
│   │   ├── logo-s{1,3,4}-escuro.svg   ← 3 estilos × fundo escuro
│   │   ├── logo-s{1,3,4}-{1024,512,256}.png ← rasterizações
│   │   ├── simbolo-mono-preto.svg     ← favicon-ready 1 cor
│   │   ├── simbolo-mono-branco.svg
│   │   └── simbolo-champagne.svg
│   ├── wordmark/
│   │   └── wordmark-{claro,escuro,champagne}.svg
│   ├── lockup-horizontal/
│   │   └── lockup-horizontal-{claro,escuro}.svg
│   └── lockup-empilhado/
│       └── lockup-empilhado-{claro,escuro}.svg
│
├── icones-favicon/
│   ├── favicon-{16,32,48}.png         ← combine num .ico multi-size
│   ├── apple-touch-icon-180.png       ← com plate preta arredondada (vibe Plaque)
│   └── app-icon-1024.png              ← App Store / Play Store
│
├── sub-produtos/
│   └── badge-{vitrine,cerebro,bancada,engrenagens,
│              cadencia,balcao,voz,bussola}.svg   ← 8 pictogramas 96×96
│
├── papelaria/
│   ├── cartao-visita-s{1,3,4}-{frente,verso}.svg ← 85×55mm
│   ├── envelope-c5.svg                ← 162×229mm
│   └── assinatura-email.html          ← cole no Gmail/Outlook
│
└── templates-instagram/
    ├── post-feed-1080.svg             ← 1080×1080
    ├── story-1080x1920.svg            ← vertical
    └── carrossel-capa.svg             ← cinematográfico
```

---

## Como usar cada arquivo

### Símbolos & logos

| Estilo | Quando usar |
|---|---|
| **S1 Monolito** | **PRIMÁRIO · 80% das aplicações** — site, deck, papelaria, header. |
| **S3 Plaque** | **AVATAR** — Instagram, WhatsApp Business, ícone de app, qualquer lugar com fundo fora de controle. |
| **S4 Champagne** | **PEÇAS CERIMONIAIS** — contrato, página de cases, papelaria premium, e-mail de fechamento de venda. Único acento metálico permitido. |

**Versões claro / escuro:** sempre escolha a que **contrasta** com o fundo. Se o fundo é Papel (`#F5F3EE`), use `-claro`. Se é Tinta (`#0A0A0A`), use `-escuro`.

### Símbolo isolado (sem wordmark)

- `simbolo-mono-preto.svg` → favicon, sinetes, marca-d'água
- `simbolo-mono-branco.svg` → mesmo, em fundo escuro
- `simbolo-champagne.svg` → versão cerimonial

### Favicon

Os 3 PNGs em `icones-favicon/favicon-{16,32,48}.png` devem ser combinados num único `favicon.ico` multi-size. Sugestão de ferramenta: [favicon.io](https://favicon.io/favicon-converter/) ou ImageMagick:
```
magick favicon-16.png favicon-32.png favicon-48.png favicon.ico
```
No `<head>` do site:
```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon-180.png">
```

### Wordmark & lockups

- `wordmark-*.svg` → assinatura de e-mail, footer compacto, papelaria onde o símbolo já apareceu antes.
- `lockup-horizontal-*.svg` → header de site, capa de proposta, primeira tela de deck.
- `lockup-empilhado-*.svg` → quando a largura é restrita (banner vertical, sidebar, stories).

**Atenção tipográfica:** os SVGs usam `<text>` com `@import` do Google Fonts. Para **impressão profissional**, abra no Illustrator/Affinity e converta `Type > Create Outlines` para garantir que Fraunces e IBM Plex Mono fiquem como path.

### Sub-produtos (8 badges)

Cada sub-produto herda a **cor da ferramenta-base** apenas como identificação interna — o pictograma é original, monoline 1.5px round, viewBox 32×32.

| Sub-produto | Cor-tag | Conceito visual |
|---|---|---|
| Vitrine | `#F77848` | Vitrine de loja com toldo |
| Cérebro | `#7C3AED` | Rede de nós conectados |
| Bancada | `#D97757` | Mesa de trabalho com ferramentas |
| Engrenagens | `#EA4B71` | Duas engrenagens entrelaçadas |
| Cadência | `#25D366` | Forma de onda sonora |
| Balcão | `#1F93FF` | Counter de atendimento com pessoa |
| Voz | `#D4A574` | Balão de fala com onda interna |
| Bússola | `#1E3A8A` | Bússola com agulha apontando N |

### Papelaria

- Cartões em `340×220` (escala 1mm = 4px) → exporte como PDF a 300dpi mantendo as dimensões físicas de 85×55mm.
- Envelope C5 em `648×916` → 162×229mm a 4px/mm.
- `assinatura-email.html` → abra, copie tudo entre `<table>...</table>`, cole nas configurações de assinatura do Gmail (Configurações → Geral → Assinatura).

### Templates Instagram

Abra cada SVG em Illustrator/Figma/Sketch para editar o headline e os números. As dimensões já estão corretas para post quadrado (1080×1080), story vertical (1080×1920) e capa de carrossel (1080×1080). Exporte como PNG ou JPG antes de subir no Instagram.

---

## Premissas inegociáveis (do manual)

- Zero gradiente
- Zero sombra colorida, drop-shadow, outer-glow
- Zero rotação / skew do símbolo
- Zero cor fora da paleta (núcleo + champagne + 8 cor-tags)
- Wordmark **sempre** em Fraunces · tagline **sempre** em IBM Plex Mono uppercase tracking 2px

---

## Geometria de referência (caso precise refazer / criar 4ª montanha)

```
viewBox: 0 0 100 80
baseline: y = 64
slope ratio: half / h = 26/48 = 0.5417

M1 · "A" do Auge:  cx=50, half=26, h=48  (apex 50,16 · base 24→76)
M2 · direita:      cx=74, half=14, h=26  (apex 74,38 · base 60→88)
M3 · fundo esq.:   cx=28, half=12, h=22  (apex 28,42 · base 16→40)

Bandeira:  mastro (50,16) → (50,6) · bandeirinha M50 7 L58 9 L50 12 Z
Barra A:   y=44, x=38 → x=62
```

Para criar um 4º triângulo: escolha `h`, calcule `half = round(h × 0.5417)`, plante em `baseY = 64`. Slope idêntico aos 3 oficiais — vetorização sempre alinhada.

---

**Gabriel Mendes · AtingeHUB · 2026**
`mendesofc1@gmail.com` · Sorocaba/SP
