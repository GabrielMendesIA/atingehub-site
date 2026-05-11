// contexts.jsx — mockups de contexto de uso por família

function BusinessCard({ family, Mark, dark = false }) {
  const bg = dark ? ATINGE.ink : ATINGE.paper;
  const ink = dark ? ATINGE.paper : ATINGE.ink;
  const mute = dark ? 'rgba(245,243,238,0.55)' : ATINGE.mute;
  const accent = family.accent;
  return (
    <div style={{
      width: 360, height: 210, background: bg, borderRadius: 6, padding: 28,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Mark size={32} color={ink} accent={accent}/>
        <Wordmark family={family.wordmarkFamily} weight={family.wordmarkWeight} size={20} letterSpacing={family.wordmarkLetterSpacing} color={ink}>
          Atinge<span style={{ color: accent }}>HUB</span>
        </Wordmark>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: family.wordmarkFamily, fontSize: 13, fontWeight: 600, color: ink, marginBottom: 2 }}>Fundador</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9.5, color: mute, letterSpacing: 1.5, textTransform: 'uppercase' }}>contato@atingehub.ai</div>
        </div>
        <Tagline color={mute} size={8} tracking={family.taglineTracking}>{family.name} · 2026</Tagline>
      </div>
    </div>
  );
}

function AppIcon({ family, Mark, rounded = 22 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 96, height: 96, background: ATINGE.ink, borderRadius: rounded,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}>
        <Mark size={56} color={ATINGE.paper} accent={family.accent}/>
      </div>
      <div style={{ fontFamily: family.wordmarkFamily, fontSize: 12, color: ATINGE.ink, fontWeight: 500 }}>AtingeHUB</div>
    </div>
  );
}

function AvatarCircle({ family, Mark, dark = true }) {
  const bg = dark ? ATINGE.ink : ATINGE.paper;
  const ink = dark ? ATINGE.paper : ATINGE.ink;
  return (
    <div style={{
      width: 80, height: 80, background: bg, borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
    }}>
      <Mark size={44} color={ink} accent={family.accent}/>
    </div>
  );
}

function WebsiteHeader({ family, Mark }) {
  const accent = family.accent;
  return (
    <div style={{
      width: 560, height: 140, background: ATINGE.paper, borderRadius: 6,
      padding: '22px 32px', display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between', border: '1px solid rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Mark size={26} color={ATINGE.ink} accent={accent}/>
          <Wordmark family={family.wordmarkFamily} weight={family.wordmarkWeight} size={16} letterSpacing={family.wordmarkLetterSpacing} color={ATINGE.ink}>
            Atinge<span style={{ color: accent }}>HUB</span>
          </Wordmark>
        </div>
        <div style={{ display: 'flex', gap: 24, fontFamily: family.wordmarkFamily, fontSize: 12, color: ATINGE.mute, alignItems: 'center' }}>
          <span>Produto</span><span>Casos</span><span>Preços</span>
          <span style={{ background: ATINGE.ink, color: ATINGE.paper, padding: '6px 12px', borderRadius: 3 }}>Fale conosco</span>
        </div>
      </div>
      <div>
        <div style={{ fontFamily: family.wordmarkFamily, fontSize: 20, fontWeight: family.wordmarkWeight, color: ATINGE.ink, letterSpacing: family.wordmarkLetterSpacing, marginBottom: 4 }}>
          IA operacional para PMEs.
        </div>
        <Tagline color={ATINGE.mute} size={9} tracking={family.taglineTracking}>Implementações sob medida · de 30 a 90 dias</Tagline>
      </div>
    </div>
  );
}

function MobileScreen({ family, Mark }) {
  const accent = family.accent;
  return (
    <div style={{
      width: 180, height: 360, background: ATINGE.paper, borderRadius: 22,
      padding: '18px 14px', border: '8px solid #0b0e14', position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', width: 54, height: 5, background: '#0b0e14', borderRadius: 3 }}/>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <Mark size={22} color={ATINGE.ink} accent={accent}/>
        <div style={{ display: 'flex', gap: 4 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: ATINGE.mute }}/>)}
        </div>
      </div>
      <div style={{ marginTop: 22, fontFamily: family.wordmarkFamily, fontSize: 11, fontWeight: family.wordmarkWeight, color: ATINGE.ink, letterSpacing: family.wordmarkLetterSpacing }}>
        Seu Hub de IA
      </div>
      <div style={{ marginTop: 2, fontFamily: "'IBM Plex Mono', monospace", fontSize: 7, color: ATINGE.mute, letterSpacing: 1, textTransform: 'uppercase' }}>
        3 agentes ativos
      </div>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {['Atendimento', 'Vendas', 'Operações'].map((label, i) => (
          <div key={i} style={{
            padding: '10px 12px', background: i === 0 ? ATINGE.ink : 'rgba(0,0,0,0.04)', borderRadius: 6,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontFamily: family.wordmarkFamily, fontSize: 10, fontWeight: 500, color: i === 0 ? ATINGE.paper : ATINGE.ink }}>{label}</span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: i === 0 ? accent : 'rgba(0,0,0,0.2)' }}/>
          </div>
        ))}
      </div>
      <div style={{
        position: 'absolute', bottom: 18, left: 14, right: 14, background: accent,
        color: ATINGE.paper, padding: '10px 0', borderRadius: 6, textAlign: 'center',
        fontFamily: family.wordmarkFamily, fontSize: 10, fontWeight: 600,
      }}>
        Novo agente
      </div>
    </div>
  );
}

function SocialPost({ family, Mark }) {
  const accent = family.accent;
  return (
    <div style={{
      width: 220, height: 220, background: ATINGE.ink, borderRadius: 4, padding: 24,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 20% 80%, ${accent}22 0%, transparent 50%)` }}/>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
        <Mark size={20} color={ATINGE.paper} accent={accent}/>
        <Wordmark family={family.wordmarkFamily} weight={family.wordmarkWeight} size={12} letterSpacing={family.wordmarkLetterSpacing} color={ATINGE.paper}>AtingeHUB</Wordmark>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{
          fontFamily: family.wordmarkFamily, fontSize: 18, fontWeight: family.wordmarkWeight,
          color: ATINGE.paper, letterSpacing: family.wordmarkLetterSpacing, lineHeight: 1.15, marginBottom: 10,
        }}>
          Seu próximo<br/>funcionário é<br/>um agente.
        </div>
        <Tagline color={accent} size={8} tracking={family.taglineTracking}>Case study · Março 26</Tagline>
      </div>
    </div>
  );
}

function DarkLockup({ family, Mark }) {
  return (
    <div style={{ width: 340, height: 180, background: ATINGE.ink, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Lockup family={family} Mark={Mark} size={48} inkColor={ATINGE.paper} muteColor="rgba(245,243,238,0.5)"/>
    </div>
  );
}

Object.assign(window, { BusinessCard, AppIcon, AvatarCircle, WebsiteHeader, MobileScreen, SocialPost, DarkLockup });
