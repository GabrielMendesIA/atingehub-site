// logos.jsx — 12 variações organizadas em 3 famílias
// Família A · Confiável corporativa — geometria sólida, serifada-geometric wordmark
// Família B · Minimalista sofisticada — linhas finas, muito espaço, wordmark leve
// Família C · Tecnológica futurista — nós, pixels, monospace, grid

const ATINGE = {
  ink: '#0B0E14',
  paper: '#F5F3EE',
  // acentos por família
  accentA: 'oklch(0.42 0.13 255)', // azul profundo (confiança)
  accentB: 'oklch(0.55 0.08 60)',  // bronze suave (sofisticação)
  accentC: 'oklch(0.62 0.19 155)', // verde-ciano (tech)
  mute: 'oklch(0.55 0 0)',
};

// ═══════════════════════════════════════════════════════════════
// TIPOGRAFIA
// ═══════════════════════════════════════════════════════════════
function Wordmark({ family, weight, size, letterSpacing, color, accent, children, upper = false }) {
  return (
    <span style={{
      fontFamily: family,
      fontWeight: weight,
      fontSize: size,
      letterSpacing,
      color,
      lineHeight: 1,
      textTransform: upper ? 'uppercase' : 'none',
      display: 'inline-block',
    }}>{children}</span>
  );
}

function Tagline({ color, size = 9, family = "'IBM Plex Mono', monospace", tracking = 2, upper = true, children }) {
  return (
    <span style={{
      fontFamily: family,
      fontSize: size,
      letterSpacing: tracking,
      textTransform: upper ? 'uppercase' : 'none',
      color,
      lineHeight: 1,
      display: 'inline-block',
    }}>{children}</span>
  );
}

// ═══════════════════════════════════════════════════════════════
// FAMÍLIA A — CONFIÁVEL CORPORATIVA
// Traços sólidos, formas bem-fechadas, cor única dominante,
// wordmark serifada-geometric. Sugere instituição, solidez.
// ═══════════════════════════════════════════════════════════════

// A1 — Escudo hexagonal com "A" inscrito
function MarkA1({ size = 40, color = ATINGE.ink, accent = ATINGE.accentA }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 3 L35 11 L35 29 L20 37 L5 29 L5 11 Z" fill={color}/>
      <path d="M20 11 L27 26 L13 26 Z" stroke={ATINGE.paper} strokeWidth="1.8" strokeLinejoin="round"/>
      <line x1="16" y1="22" x2="24" y2="22" stroke={ATINGE.paper} strokeWidth="1.8"/>
      <circle cx="20" cy="11" r="1.8" fill={accent}/>
    </svg>
  );
}

// A2 — Monograma AH sólido em bloco quadrado
function MarkA2({ size = 40, color = ATINGE.ink, accent = ATINGE.accentA }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="2" y="2" width="36" height="36" rx="2" fill={color}/>
      {/* A */}
      <path d="M8 30 L14 10 L20 30 M10.5 23 L17.5 23" stroke={ATINGE.paper} strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" fill="none"/>
      {/* H */}
      <line x1="24" y1="10" x2="24" y2="30" stroke={accent} strokeWidth="2.2"/>
      <line x1="32" y1="10" x2="32" y2="30" stroke={accent} strokeWidth="2.2"/>
      <line x1="24" y1="20" x2="32" y2="20" stroke={accent} strokeWidth="2.2"/>
    </svg>
  );
}

// A3 — Coluna/pilar clássico com capitel
function MarkA3({ size = 40, color = ATINGE.ink, accent = ATINGE.accentA }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect x="6" y="6" width="28" height="4" fill={color}/>
      <rect x="14" y="12" width="12" height="22" fill={color}/>
      <rect x="4" y="32" width="32" height="4" fill={color}/>
      <rect x="17.5" y="14" width="5" height="5" fill={accent}/>
    </svg>
  );
}

// A4 — Losango institucional com barra
function MarkA4({ size = 40, color = ATINGE.ink, accent = ATINGE.accentA }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 4 L36 20 L20 36 L4 20 Z" fill={color}/>
      <rect x="8" y="18" width="24" height="4" fill={ATINGE.paper}/>
      <circle cx="20" cy="20" r="2.5" fill={accent}/>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// FAMÍLIA B — MINIMALISTA SOFISTICADA
// Linhas finas (1–1.2px), muito respiro, sem preenchimentos,
// wordmark leve (300–400). Sugere premium, editorial.
// ═══════════════════════════════════════════════════════════════

// B1 — Círculo aberto com ponto
function MarkB1({ size = 40, color = ATINGE.ink, accent = ATINGE.accentB }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="0.8"/>
      <circle cx="20" cy="20" r="2" fill={accent}/>
      <line x1="20" y1="6" x2="20" y2="8.5" stroke={color} strokeWidth="0.8"/>
    </svg>
  );
}

// B2 — Triângulo linha (ápice/auge)
function MarkB2({ size = 40, color = ATINGE.ink, accent = ATINGE.accentB }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 8 L32 32 L8 32 Z" stroke={color} strokeWidth="0.8" strokeLinejoin="round"/>
      <circle cx="20" cy="8" r="1.5" fill={accent}/>
    </svg>
  );
}

// B3 — Dois arcos equilibrados
function MarkB3({ size = 40, color = ATINGE.ink, accent = ATINGE.accentB }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M8 28 A 12 12 0 0 1 32 28" stroke={color} strokeWidth="0.9" fill="none"/>
      <path d="M32 12 A 12 12 0 0 1 8 12" stroke={color} strokeWidth="0.9" fill="none"/>
      <circle cx="20" cy="20" r="1.5" fill={accent}/>
    </svg>
  );
}

// B4 — "A" mínimo — duas linhas diagonais
function MarkB4({ size = 40, color = ATINGE.ink, accent = ATINGE.accentB }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <line x1="12" y1="32" x2="20" y2="8" stroke={color} strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="20" y1="8" x2="28" y2="32" stroke={color} strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="15" y1="23" x2="25" y2="23" stroke={accent} strokeWidth="0.9" strokeLinecap="round"/>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// FAMÍLIA C — TECNOLÓGICA FUTURISTA
// Nós, pixels, grids, monospace wordmark, mais densidade visual.
// Sugere engenharia, IA, plataforma.
// ═══════════════════════════════════════════════════════════════

// C1 — Hub ortogonal com nó central
function MarkC1({ size = 40, color = ATINGE.ink, accent = ATINGE.accentC }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <line x1="20" y1="20" x2="20" y2="4" stroke={color} strokeWidth="1.5"/>
      <line x1="20" y1="20" x2="20" y2="36" stroke={color} strokeWidth="1.5"/>
      <line x1="20" y1="20" x2="4" y2="20" stroke={color} strokeWidth="1.5"/>
      <line x1="20" y1="20" x2="36" y2="20" stroke={color} strokeWidth="1.5"/>
      <circle cx="20" cy="4" r="2.5" fill={color}/>
      <circle cx="20" cy="36" r="2.5" fill={color}/>
      <circle cx="4" cy="20" r="2.5" fill={color}/>
      <circle cx="36" cy="20" r="2.5" fill={color}/>
      <rect x="16" y="16" width="8" height="8" fill={accent}/>
    </svg>
  );
}

// C2 — Rede assimétrica de 6 nós
function MarkC2({ size = 40, color = ATINGE.ink, accent = ATINGE.accentC }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <line x1="8" y1="8" x2="20" y2="20" stroke={color} strokeWidth="1"/>
      <line x1="20" y1="20" x2="32" y2="10" stroke={color} strokeWidth="1"/>
      <line x1="20" y1="20" x2="10" y2="32" stroke={color} strokeWidth="1"/>
      <line x1="20" y1="20" x2="32" y2="30" stroke={color} strokeWidth="1"/>
      <line x1="32" y1="10" x2="32" y2="30" stroke={color} strokeWidth="1" opacity="0.4"/>
      <circle cx="8" cy="8" r="2" fill={color}/>
      <circle cx="32" cy="10" r="2" fill={color}/>
      <circle cx="10" cy="32" r="2" fill={color}/>
      <circle cx="32" cy="30" r="2" fill={color}/>
      <circle cx="20" cy="20" r="4" fill={accent}/>
    </svg>
  );
}

// C3 — Pixels ascendentes (matrix de barras)
function MarkC3({ size = 40, color = ATINGE.ink, accent = ATINGE.accentC }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {/* 4 colunas x 5 linhas de pixels */}
      {[
        [0,0],[0,1],
        [1,0],[1,1],[1,2],
        [2,0],[2,1],[2,2],[2,3],
        [3,0],[3,1],[3,2],[3,3],
      ].map(([c,r],i) => (
        <rect key={i} x={6 + c*8} y={30 - r*7} width="5" height="5" fill={color}/>
      ))}
      <rect x={6 + 3*8} y={30 - 4*7} width="5" height="5" fill={accent}/>
    </svg>
  );
}

// C4 — "A" pixelado com vértice luminoso
function MarkC4({ size = 40, color = ATINGE.ink, accent = ATINGE.accentC }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {/* pixels do "A" */}
      {/* ápice */}
      <rect x="18" y="6" width="4" height="4" fill={accent}/>
      {/* linha 2 */}
      <rect x="15" y="11" width="4" height="4" fill={color}/>
      <rect x="21" y="11" width="4" height="4" fill={color}/>
      {/* linha 3 */}
      <rect x="12" y="16" width="4" height="4" fill={color}/>
      <rect x="24" y="16" width="4" height="4" fill={color}/>
      {/* barra central */}
      <rect x="12" y="21" width="4" height="4" fill={color}/>
      <rect x="17" y="21" width="3" height="4" fill={color}/>
      <rect x="20" y="21" width="3" height="4" fill={color}/>
      <rect x="24" y="21" width="4" height="4" fill={color}/>
      {/* pernas */}
      <rect x="9" y="26" width="4" height="4" fill={color}/>
      <rect x="27" y="26" width="4" height="4" fill={color}/>
      <rect x="6" y="31" width="4" height="4" fill={color}/>
      <rect x="30" y="31" width="4" height="4" fill={color}/>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONFIG DAS FAMÍLIAS
// ═══════════════════════════════════════════════════════════════
const FAMILIES = [
  {
    key: 'A',
    name: 'Confiável',
    subtitle: 'Corporativa · institucional · sólida',
    description: 'Formas fechadas, cor única dominante, wordmark com serifa geométrica. Transmite solidez e autoridade — ideal para PMEs mais tradicionais.',
    accent: ATINGE.accentA,
    accentName: 'Azul institucional',
    wordmarkFamily: "'Fraunces', 'Tiempos', Georgia, serif",
    wordmarkWeight: 600,
    wordmarkLetterSpacing: -0.8,
    taglineTracking: 2,
    marks: [
      { Mark: MarkA1, name: 'A1 · Escudo' },
      { Mark: MarkA2, name: 'A2 · Monograma sólido' },
      { Mark: MarkA3, name: 'A3 · Pilar' },
      { Mark: MarkA4, name: 'A4 · Losango' },
    ],
  },
  {
    key: 'B',
    name: 'Minimalista',
    subtitle: 'Sofisticada · editorial · quieta',
    description: 'Linhas finas, muito respiro, preto/bronze. Wordmark leve em sans geométrico. Transmite maturidade e refinamento — ideal para um posicionamento premium.',
    accent: ATINGE.accentB,
    accentName: 'Bronze suave',
    wordmarkFamily: "'Space Grotesk', 'Neue Haas', sans-serif",
    wordmarkWeight: 400,
    wordmarkLetterSpacing: 0.2,
    taglineTracking: 3,
    marks: [
      { Mark: MarkB1, name: 'B1 · Círculo aberto' },
      { Mark: MarkB2, name: 'B2 · Triângulo linha' },
      { Mark: MarkB3, name: 'B3 · Dois arcos' },
      { Mark: MarkB4, name: 'B4 · A mínimo' },
    ],
  },
  {
    key: 'C',
    name: 'Tecnológica',
    subtitle: 'Futurista · engenharia · plataforma',
    description: 'Nós, pixels, wordmark em monospace/tecnológico. Densidade visual maior, acento em verde-ciano. Transmite sofisticação técnica — ideal para se vender como parceiro de engenharia.',
    accent: ATINGE.accentC,
    accentName: 'Verde-ciano',
    wordmarkFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
    wordmarkWeight: 500,
    wordmarkLetterSpacing: -0.3,
    taglineTracking: 2,
    marks: [
      { Mark: MarkC1, name: 'C1 · Hub ortogonal' },
      { Mark: MarkC2, name: 'C2 · Rede' },
      { Mark: MarkC3, name: 'C3 · Pixels' },
      { Mark: MarkC4, name: 'C4 · A pixelado' },
    ],
  },
];

// Lista linear de todas as marcas para o painel Tweaks
const ALL_MARKS = FAMILIES.flatMap(f => f.marks.map(m => ({ ...m, family: f })));

// ═══════════════════════════════════════════════════════════════
// LOCKUP — respeita tipografia da família
// ═══════════════════════════════════════════════════════════════
function Lockup({ family, Mark, size = 44, inkColor = ATINGE.ink, muteColor = ATINGE.mute, showTagline = true, stacked = false }) {
  const accent = family.accent;
  const word = (
    <Wordmark
      family={family.wordmarkFamily}
      weight={family.wordmarkWeight}
      size={size * 0.62}
      letterSpacing={family.wordmarkLetterSpacing}
      color={inkColor}>
      Atinge<span style={{ color: accent }}>HUB</span>
    </Wordmark>
  );
  const tag = showTagline && (
    <Tagline color={muteColor} tracking={family.taglineTracking}>IA para o seu negócio</Tagline>
  );

  if (stacked) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <Mark size={size} color={inkColor} accent={accent}/>
        <div style={{ textAlign: 'center' }}>
          {word}
          {tag && <div style={{ marginTop: 8 }}>{tag}</div>}
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.35 }}>
      <Mark size={size} color={inkColor} accent={accent}/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {word}
        {tag}
      </div>
    </div>
  );
}

Object.assign(window, { ATINGE, Wordmark, Tagline, FAMILIES, ALL_MARKS, Lockup });
