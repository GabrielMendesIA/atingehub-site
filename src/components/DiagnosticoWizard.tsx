import { useState } from 'react';
import styles from './DiagnosticoWizard.module.css';

/* ─── Tipos ─────────────────────────────────────────────────── */

type Etapa =
  | 'intro'
  | 'setor'
  | 'tamanho'
  | 'dores'
  | 'preview'
  | 'gate'
  | 'maturidade'
  | 'posicionamento'
  | 'gerando'
  | 'resultado'
  | 'erro';

type Respostas = {
  setor: string;
  setorOutro: string;
  tempoOperacao: string;
  tamanho: string;
  faturamento: string;
  canalPrincipal: string;
  dores: string[];
  ondePerde: string;
  nome: string;
  whatsapp: string;
  cidade: string;
  automacao: string;
  tempoRepetitivo: string;
  crm: string;
  diferencial: string;
  primeiroBloqueio: string;
};

type Produto = {
  slug: string;
  nome: string;
  cor: string;
  porque: string;
  ganho_concreto: string;
};

type Resultado = {
  ok: boolean;
  prognostico_cliente: {
    saudacao: string;
    leitura: string[];
    produtos_sugeridos: Produto[];
    abertura_whatsapp: string;
  };
};

/* ─── Catálogos ─────────────────────────────────────────────── */

const SETORES = [
  { id: 'food-service', label: 'Food service', sub: 'delivery, restaurante, padaria, açaí, marmita' },
  { id: 'auto-pecas', label: 'Auto peças / oficina', sub: 'autocenter, mecânica, peças, acessórios' },
  { id: 'confeccao', label: 'Confecção / moda', sub: 'roupa, sapato, acessório, multimarcas' },
  { id: 'pet-shop', label: 'Pet shop / veterinária', sub: 'banho, tosa, ração, clínica vet' },
  { id: 'estetica', label: 'Estética e saúde', sub: 'derma, dentista, fisio, clínica' },
  { id: 'outro', label: 'Outro varejo', sub: 'me conta no campo abaixo' },
];

const TEMPO_OPERACAO = [
  { id: '<2', label: 'Menos de 2 anos' },
  { id: '2-5', label: 'De 2 a 5 anos' },
  { id: '5-10', label: 'De 5 a 10 anos' },
  { id: '10+', label: 'Mais de 10 anos' },
];

const TAMANHO = [
  { id: 'ate-3', label: 'Até 3 funcionários' },
  { id: '4-10', label: '4 a 10' },
  { id: '11-25', label: '11 a 25' },
  { id: '25+', label: 'Mais de 25' },
];

const FATURAMENTO = [
  { id: 'ate-30k', label: 'Até R$ 30 mil / mês' },
  { id: '30-100k', label: 'R$ 30 a 100 mil' },
  { id: '100-300k', label: 'R$ 100 a 300 mil' },
  { id: '300k+', label: 'Acima de R$ 300 mil' },
];

const CANAL = [
  { id: 'fisica', label: 'Passagem física na loja' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'google', label: 'Google (busca ou anúncio)' },
  { id: 'indicacao', label: 'Indicação' },
];

const DORES = [
  { id: 'lead-atendente-dormiu', label: 'O lead chega no WhatsApp e o atendente já dormiu' },
  { id: 'cliente-sumiu-no-segundo-contato', label: 'O cliente sumiu no segundo contato e ninguém puxou de volta' },
  { id: 'dados-na-cabeca-do-dono', label: 'Meus dados estão na cabeça do dono e em 4 planilhas' },
  { id: 'sair-uma-semana-loja-para', label: 'Se eu sair uma semana, a loja para' },
  { id: 'anuncio-caro-fala-pra-todos', label: 'Anúncio caro porque eu falo pra todo mundo' },
  { id: 'concorrente-baixou-preco', label: 'O concorrente baixou preço e eu preciso baixar junto' },
];

const ONDE_PERDE = [
  { id: 'antes-venda', label: 'Antes da venda', sub: 'não chega lead suficiente' },
  { id: 'durante-atendimento', label: 'Durante o atendimento', sub: 'esfria a conversa, demora resposta' },
  { id: 'apos-1o-contato', label: 'Depois do 1º contato', sub: 'cliente sumiu, ninguém puxou de volta' },
  { id: 'apos-venda', label: 'Depois da venda', sub: 'não volta, não fideliza' },
];

const AUTOMACAO = [
  { id: 'nao', label: 'Não, nenhuma' },
  { id: 'n8n-zapier', label: 'Já mexo com n8n, Zapier ou Make' },
  { id: 'chatgpt-manual', label: 'Uso ChatGPT manualmente quando preciso' },
  { id: 'agente-automatico', label: 'Já tenho agente automático rodando' },
];

const TEMPO_REPETITIVO = [
  { id: '1h', label: 'Até 1 hora por dia' },
  { id: '2-4h', label: '2 a 4 horas' },
  { id: 'meio-expediente', label: 'Meio expediente' },
  { id: 'dia-inteiro', label: 'Dia inteiro' },
];

const CRM = [
  { id: 'nao', label: 'Não tenho' },
  { id: 'sim-nao-uso', label: 'Tenho mas não uso' },
  { id: 'sim-uso-pouco', label: 'Uso pouco' },
  { id: 'sim-uso-bem', label: 'Tenho e uso bem' },
];

const PREVIEW_POR_DOR: Record<string, string> = {
  'lead-atendente-dormiu':
    'Voz — agente que responde no WhatsApp 24 horas por dia, no tom da sua loja',
  'cliente-sumiu-no-segundo-contato':
    'Cadência — follow-up automático que puxa cliente de volta sem virar invasivo',
  'dados-na-cabeca-do-dono':
    'Cérebro — vault que tira o conhecimento da sua cabeça pra qualquer um da equipe acessar',
  'sair-uma-semana-loja-para':
    'Engrenagens + Bancada — operacional repetitivo virando IA, dono saindo do operacional',
  'anuncio-caro-fala-pra-todos':
    'Vitrine — anúncio filtrado, falando só com quem tem chance de comprar',
  'concorrente-baixou-preco':
    'Bússola — direção mensal estratégica pra você parar de competir só por preço',
};

/* ─── Estado inicial ────────────────────────────────────────── */

const RESPOSTAS_INICIAIS: Respostas = {
  setor: '',
  setorOutro: '',
  tempoOperacao: '',
  tamanho: '',
  faturamento: '',
  canalPrincipal: '',
  dores: [],
  ondePerde: '',
  nome: '',
  whatsapp: '',
  cidade: '',
  automacao: '',
  tempoRepetitivo: '',
  crm: '',
  diferencial: '',
  primeiroBloqueio: '',
};

/* ─── Mapa de etapas pra progresso ──────────────────────────── */

const ETAPAS_VISIVEIS: Etapa[] = ['setor', 'tamanho', 'dores', 'gate', 'maturidade', 'posicionamento'];
const TOTAL_ETAPAS = ETAPAS_VISIVEIS.length;

function passoAtual(etapa: Etapa): number {
  const idx = ETAPAS_VISIVEIS.indexOf(etapa);
  if (idx >= 0) return idx + 1;
  if (etapa === 'preview') return 4; // entre dores e gate
  return 0;
}

/* ─── Componente principal ──────────────────────────────────── */

export default function DiagnosticoWizard() {
  const [etapa, setEtapa] = useState<Etapa>('intro');
  const [respostas, setRespostas] = useState<Respostas>(RESPOSTAS_INICIAIS);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  function set<K extends keyof Respostas>(key: K, value: Respostas[K]) {
    setRespostas((prev) => ({ ...prev, [key]: value }));
  }

  function toggleDor(dorId: string) {
    setRespostas((prev) => {
      const tem = prev.dores.includes(dorId);
      if (tem) return { ...prev, dores: prev.dores.filter((d) => d !== dorId) };
      if (prev.dores.length >= 3) return prev;
      return { ...prev, dores: [...prev.dores, dorId] };
    });
  }

  function podeProsseguir(): boolean {
    switch (etapa) {
      case 'intro':
        return true;
      case 'setor':
        return (
          !!respostas.setor &&
          (respostas.setor !== 'outro' || !!respostas.setorOutro.trim()) &&
          !!respostas.tempoOperacao
        );
      case 'tamanho':
        return !!respostas.tamanho && !!respostas.faturamento && !!respostas.canalPrincipal;
      case 'dores':
        return respostas.dores.length >= 1 && !!respostas.ondePerde;
      case 'preview':
        return true;
      case 'gate':
        return (
          !!respostas.nome.trim() &&
          /^[\d\s\-\+\(\)]{10,}$/.test(respostas.whatsapp) &&
          !!respostas.cidade.trim()
        );
      case 'maturidade':
        return !!respostas.automacao && !!respostas.tempoRepetitivo && !!respostas.crm;
      case 'posicionamento':
        return true;
      default:
        return true;
    }
  }

  const ORDEM: Etapa[] = [
    'intro',
    'setor',
    'tamanho',
    'dores',
    'preview',
    'gate',
    'maturidade',
    'posicionamento',
  ];

  function proximo() {
    if (!podeProsseguir()) return;
    if (etapa === 'posicionamento') {
      void gerarDiagnostico();
      return;
    }
    const idx = ORDEM.indexOf(etapa);
    if (idx >= 0 && idx < ORDEM.length - 1) {
      setEtapa(ORDEM[idx + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function voltar() {
    const idx = ORDEM.indexOf(etapa);
    if (idx > 0) {
      setEtapa(ORDEM[idx - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  async function gerarDiagnostico() {
    setEtapa('gerando');
    setErro(null);
    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...respostas,
          setorLabel:
            SETORES.find((s) => s.id === respostas.setor)?.label || respostas.setorOutro || '',
        }),
      });
      const data: Resultado = await res.json();
      if (!data.ok) throw new Error('Falha ao gerar diagnóstico');
      setResultado(data);
      setEtapa('resultado');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : 'Erro desconhecido');
      setEtapa('erro');
    }
  }

  /* ─── Preview heurístico (sem chamar IA) ─────────────── */
  function gerarPreviewLocal(): string {
    if (respostas.dores.length === 0) {
      return 'Suas respostas indicam que vale a pena destravar pelo menos uma frente. Continua pra ver qual.';
    }
    const dorPrincipal = respostas.dores[0];
    const dorTexto = DORES.find((d) => d.id === dorPrincipal)?.label || '';
    const sugestao = PREVIEW_POR_DOR[dorPrincipal] || '';
    return `Tua dor mais visível parece ser: "${dorTexto}". Pelo que você marcou, o produto que destrava isso mais rápido na sua operação é ${sugestao}.`;
  }

  /* ─── JSX por etapa ───────────────────────────────────── */

  const passo = passoAtual(etapa);
  const mostrarProgresso = passo > 0 && etapa !== 'gerando' && etapa !== 'resultado' && etapa !== 'erro';

  return (
    <div className={styles.wizard}>
      <div className={styles.shell}>
        {mostrarProgresso && (
          <div className={styles.progress}>
            <span className={styles.progressLabel}>● Diagnóstico AtingeHUB</span>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${(passo / TOTAL_ETAPAS) * 100}%` }} />
            </div>
            <span className={styles.progressStep}>
              {passo.toString().padStart(2, '0')} / {TOTAL_ETAPAS.toString().padStart(2, '0')}
            </span>
          </div>
        )}

        {etapa === 'intro' && <EtapaIntro onContinuar={proximo} />}

        {etapa === 'setor' && (
          <EtapaSetor
            respostas={respostas}
            onSet={set}
          />
        )}

        {etapa === 'tamanho' && (
          <EtapaTamanho
            respostas={respostas}
            onSet={set}
          />
        )}

        {etapa === 'dores' && (
          <EtapaDores
            respostas={respostas}
            onToggleDor={toggleDor}
            onSet={set}
          />
        )}

        {etapa === 'preview' && (
          <EtapaPreview previewTexto={gerarPreviewLocal()} />
        )}

        {etapa === 'gate' && (
          <EtapaGate respostas={respostas} onSet={set} />
        )}

        {etapa === 'maturidade' && (
          <EtapaMaturidade respostas={respostas} onSet={set} />
        )}

        {etapa === 'posicionamento' && (
          <EtapaPosicionamento respostas={respostas} onSet={set} />
        )}

        {etapa === 'gerando' && <EtapaGerando />}

        {etapa === 'resultado' && resultado && (
          <EtapaResultado resultado={resultado} respostas={respostas} />
        )}

        {etapa === 'erro' && (
          <EtapaErro mensagem={erro} onTentarDeNovo={() => setEtapa('posicionamento')} />
        )}

        {etapa !== 'intro' && etapa !== 'gerando' && etapa !== 'resultado' && etapa !== 'erro' && (
          <div className={styles.footer}>
            <button
              className={styles.botaoVoltar}
              onClick={voltar}
              type="button"
            >
              ← Voltar
            </button>
            <button
              className={styles.botaoProximo}
              onClick={proximo}
              disabled={!podeProsseguir()}
              type="button"
            >
              {etapa === 'posicionamento' ? '$ gerar diagnóstico →' : 'Próximo →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Sub-componentes por etapa
   ═══════════════════════════════════════════════════════════════ */

function EtapaIntro({ onContinuar }: { onContinuar: () => void }) {
  return (
    <div className={styles.etapa}>
      <p className={styles.eyebrow}>● Como funciona</p>
      <h2 className={styles.etapaTitulo}>
        15 minutos. <em>Você sai com diagnóstico personalizado.</em>
      </h2>
      <p className={styles.etapaSub}>
        São <strong>15 perguntas</strong> em 6 etapas curtas, no ritmo do método que aplicamos com cada cliente AtingeHUB. Em troca, você recebe uma leitura clara da sua operação, 2 ou 3 produtos sugeridos com ordem de ataque, e um próximo passo concreto. Sem cadastro de mailing, sem ligação fria depois — só o que você quiser pedir.
      </p>
      <div style={{ marginTop: 24 }}>
        <button className={styles.botaoProximo} onClick={onContinuar} type="button">
          $ começar diagnóstico →
        </button>
      </div>
    </div>
  );
}

function EtapaSetor({
  respostas,
  onSet,
}: {
  respostas: Respostas;
  onSet: <K extends keyof Respostas>(k: K, v: Respostas[K]) => void;
}) {
  return (
    <div className={styles.etapa}>
      <p className={styles.eyebrow}>● 01 — Quem é você no varejo</p>
      <h2 className={styles.etapaTitulo}>Em qual setor sua loja atua?</h2>

      <div className={styles.pergunta}>
        <div className={`${styles.opcoes} ${styles.opcoesGrid2}`}>
          {SETORES.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`${styles.opcao} ${respostas.setor === s.id ? styles.opcaoSelecionada : ''}`}
              onClick={() => onSet('setor', s.id)}
            >
              <span className={styles.opcaoCheck} />
              <span className={styles.opcaoTexto}>
                <span className={styles.opcaoTitulo}>{s.label}</span>
                <span className={styles.opcaoSub}>{s.sub}</span>
              </span>
            </button>
          ))}
        </div>
        {respostas.setor === 'outro' && (
          <input
            type="text"
            className={styles.input}
            placeholder="Me conta o setor (ex: livraria, papelaria, joalheria...)"
            value={respostas.setorOutro}
            onChange={(e) => onSet('setorOutro', e.target.value)}
            style={{ marginTop: 14 }}
            maxLength={80}
          />
        )}
      </div>

      <div className={styles.pergunta}>
        <p className={styles.perguntaTexto}>Há quanto tempo a operação existe?</p>
        <div className={`${styles.opcoes} ${styles.opcoesGrid2}`}>
          {TEMPO_OPERACAO.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`${styles.opcao} ${respostas.tempoOperacao === t.id ? styles.opcaoSelecionada : ''}`}
              onClick={() => onSet('tempoOperacao', t.id)}
            >
              <span className={styles.opcaoCheck} />
              <span className={styles.opcaoTexto}>
                <span className={styles.opcaoTitulo}>{t.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EtapaTamanho({
  respostas,
  onSet,
}: {
  respostas: Respostas;
  onSet: <K extends keyof Respostas>(k: K, v: Respostas[K]) => void;
}) {
  return (
    <div className={styles.etapa}>
      <p className={styles.eyebrow}>● 02 — Tamanho e fluxo</p>
      <h2 className={styles.etapaTitulo}>Como é o tamanho da sua operação hoje?</h2>

      <div className={styles.pergunta}>
        <p className={styles.perguntaTexto}>Quantos funcionários você tem?</p>
        <div className={`${styles.opcoes} ${styles.opcoesGrid2}`}>
          {TAMANHO.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`${styles.opcao} ${respostas.tamanho === t.id ? styles.opcaoSelecionada : ''}`}
              onClick={() => onSet('tamanho', t.id)}
            >
              <span className={styles.opcaoCheck} />
              <span className={styles.opcaoTexto}>
                <span className={styles.opcaoTitulo}>{t.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.pergunta}>
        <p className={styles.perguntaTexto}>Faturamento médio mensal?</p>
        <p className={styles.perguntaHint}>
          (esse dado é privado — entra só no seu diagnóstico, não vai pra lugar nenhum)
        </p>
        <div className={`${styles.opcoes} ${styles.opcoesGrid2}`}>
          {FATURAMENTO.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`${styles.opcao} ${respostas.faturamento === f.id ? styles.opcaoSelecionada : ''}`}
              onClick={() => onSet('faturamento', f.id)}
            >
              <span className={styles.opcaoCheck} />
              <span className={styles.opcaoTexto}>
                <span className={styles.opcaoTitulo}>{f.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.pergunta}>
        <p className={styles.perguntaTexto}>De onde vem a maior parte dos clientes hoje?</p>
        <div className={styles.opcoes}>
          {CANAL.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`${styles.opcao} ${respostas.canalPrincipal === c.id ? styles.opcaoSelecionada : ''}`}
              onClick={() => onSet('canalPrincipal', c.id)}
            >
              <span className={styles.opcaoCheck} />
              <span className={styles.opcaoTexto}>
                <span className={styles.opcaoTitulo}>{c.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EtapaDores({
  respostas,
  onToggleDor,
  onSet,
}: {
  respostas: Respostas;
  onToggleDor: (id: string) => void;
  onSet: <K extends keyof Respostas>(k: K, v: Respostas[K]) => void;
}) {
  const maxAtingido = respostas.dores.length >= 3;
  return (
    <div className={styles.etapa}>
      <p className={styles.eyebrow}>● 03 — Onde dói mais</p>
      <h2 className={styles.etapaTitulo}>Quais dessas frases <em>batem com sua loja?</em></h2>
      <p className={styles.etapaSub}>
        Escolha até <strong>3 frases</strong> que mais descrevem onde a operação trava hoje. Essas são as 6 dores mais comuns no varejo — cada uma já tem produto pensado pra destravar.
      </p>

      <div className={styles.pergunta}>
        <div className={styles.opcoes}>
          {DORES.map((d) => {
            const selecionado = respostas.dores.includes(d.id);
            const desabilitado = !selecionado && maxAtingido;
            return (
              <button
                key={d.id}
                type="button"
                className={`${styles.opcao} ${selecionado ? styles.opcaoSelecionada : ''} ${desabilitado ? styles.opcaoDesabilitada : ''}`}
                onClick={() => !desabilitado && onToggleDor(d.id)}
                disabled={desabilitado}
              >
                <span className={`${styles.opcaoCheck} ${styles.opcaoCheckQuadrado}`} />
                <span className={styles.opcaoTexto}>
                  <span className={styles.opcaoTitulo}>"{d.label}"</span>
                </span>
              </button>
            );
          })}
        </div>
        <p className={styles.perguntaHint} style={{ marginTop: 12 }}>
          {respostas.dores.length} de 3 selecionadas {maxAtingido && '· limite atingido'}
        </p>
      </div>

      <div className={styles.pergunta}>
        <p className={styles.perguntaTexto}>Onde você perde mais cliente hoje?</p>
        <div className={`${styles.opcoes} ${styles.opcoesGrid2}`}>
          {ONDE_PERDE.map((o) => (
            <button
              key={o.id}
              type="button"
              className={`${styles.opcao} ${respostas.ondePerde === o.id ? styles.opcaoSelecionada : ''}`}
              onClick={() => onSet('ondePerde', o.id)}
            >
              <span className={styles.opcaoCheck} />
              <span className={styles.opcaoTexto}>
                <span className={styles.opcaoTitulo}>{o.label}</span>
                <span className={styles.opcaoSub}>{o.sub}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EtapaPreview({ previewTexto }: { previewTexto: string }) {
  return (
    <div className={styles.etapa}>
      <p className={styles.eyebrow}>● Leitura inicial</p>
      <h2 className={styles.etapaTitulo}>
        Olha o que <em>já apareceu</em> nas suas respostas.
      </h2>

      <div className={styles.previewBox}>
        <p className={styles.previewLabel}>● Resumo curto</p>
        <p className={styles.previewTexto}>{previewTexto}</p>
      </div>

      <p className={styles.etapaSub}>
        Pra liberar o <strong>diagnóstico completo</strong> — com 2 a 3 produtos sugeridos em ordem de ataque, leitura analítica da sua operação, e abertura concreta pra conversa — deixa só seus dados na próxima tela. Esses dados são pro Gabriel te chamar depois. Não vai pra lista nenhuma, não vai pra ninguém.
      </p>
    </div>
  );
}

function EtapaGate({
  respostas,
  onSet,
}: {
  respostas: Respostas;
  onSet: <K extends keyof Respostas>(k: K, v: Respostas[K]) => void;
}) {
  const whatsappOk = !respostas.whatsapp || /^[\d\s\-\+\(\)]{10,}$/.test(respostas.whatsapp);
  return (
    <div className={styles.etapa}>
      <p className={styles.eyebrow}>● 04 — Quem é você</p>
      <h2 className={styles.etapaTitulo}>Seus dados — <em>só pra te encontrar.</em></h2>
      <p className={styles.etapaSub}>
        O Gabriel pessoalmente vai abrir uma conversa com você no WhatsApp depois do diagnóstico, no momento que você escolher. Não tem SDR, não tem agenda automática, não tem newsletter.
      </p>

      <div className={styles.gateGrid}>
        <div className={styles.pergunta}>
          <label className={styles.perguntaLabel}>Seu nome</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Gabriel"
            value={respostas.nome}
            onChange={(e) => onSet('nome', e.target.value)}
            maxLength={80}
            autoFocus
          />
        </div>
        <div className={styles.pergunta}>
          <label className={styles.perguntaLabel}>WhatsApp (com DDD)</label>
          <input
            type="tel"
            className={`${styles.input} ${!whatsappOk ? styles.inputErro : ''}`}
            placeholder="(15) 99999-9999"
            value={respostas.whatsapp}
            onChange={(e) => onSet('whatsapp', e.target.value)}
            maxLength={20}
          />
          {!whatsappOk && (
            <p className={styles.errosTexto}>WhatsApp precisa ter pelo menos 10 dígitos</p>
          )}
        </div>
      </div>

      <div className={styles.pergunta}>
        <label className={styles.perguntaLabel}>Cidade onde a loja fica</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Sorocaba, SP"
          value={respostas.cidade}
          onChange={(e) => onSet('cidade', e.target.value)}
          maxLength={80}
        />
      </div>
    </div>
  );
}

function EtapaMaturidade({
  respostas,
  onSet,
}: {
  respostas: Respostas;
  onSet: <K extends keyof Respostas>(k: K, v: Respostas[K]) => void;
}) {
  return (
    <div className={styles.etapa}>
      <p className={styles.eyebrow}>● 05 — Maturidade da operação</p>
      <h2 className={styles.etapaTitulo}>Onde você já está com tecnologia hoje?</h2>

      <div className={styles.pergunta}>
        <p className={styles.perguntaTexto}>Já usa alguma automação ou IA no negócio?</p>
        <div className={`${styles.opcoes} ${styles.opcoesGrid2}`}>
          {AUTOMACAO.map((a) => (
            <button
              key={a.id}
              type="button"
              className={`${styles.opcao} ${respostas.automacao === a.id ? styles.opcaoSelecionada : ''}`}
              onClick={() => onSet('automacao', a.id)}
            >
              <span className={styles.opcaoCheck} />
              <span className={styles.opcaoTexto}>
                <span className={styles.opcaoTitulo}>{a.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.pergunta}>
        <p className={styles.perguntaTexto}>Quanto tempo o dono dedica a tarefa repetitiva por dia?</p>
        <div className={`${styles.opcoes} ${styles.opcoesGrid2}`}>
          {TEMPO_REPETITIVO.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`${styles.opcao} ${respostas.tempoRepetitivo === t.id ? styles.opcaoSelecionada : ''}`}
              onClick={() => onSet('tempoRepetitivo', t.id)}
            >
              <span className={styles.opcaoCheck} />
              <span className={styles.opcaoTexto}>
                <span className={styles.opcaoTitulo}>{t.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.pergunta}>
        <p className={styles.perguntaTexto}>Tem CRM ou sistema de cliente organizado?</p>
        <div className={`${styles.opcoes} ${styles.opcoesGrid2}`}>
          {CRM.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`${styles.opcao} ${respostas.crm === c.id ? styles.opcaoSelecionada : ''}`}
              onClick={() => onSet('crm', c.id)}
            >
              <span className={styles.opcaoCheck} />
              <span className={styles.opcaoTexto}>
                <span className={styles.opcaoTitulo}>{c.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EtapaPosicionamento({
  respostas,
  onSet,
}: {
  respostas: Respostas;
  onSet: <K extends keyof Respostas>(k: K, v: Respostas[K]) => void;
}) {
  return (
    <div className={styles.etapa}>
      <p className={styles.eyebrow}>● 06 — Posicionamento (opcional, mas vale ouro)</p>
      <h2 className={styles.etapaTitulo}>Duas perguntas finais — pode pular se quiser.</h2>
      <p className={styles.etapaSub}>
        Essas duas perguntas ajudam o diagnóstico a sair com tom muito mais preciso. Se você não souber agora, deixa em branco — não bloqueia nada.
      </p>

      <div className={styles.pergunta}>
        <label className={styles.perguntaLabel}>
          Em uma frase: por que o cliente escolhe você e não o concorrente?
        </label>
        <textarea
          className={styles.textarea}
          placeholder="Ex: porque entrego na hora, com atendimento próximo, e meu produto é melhor que o do mercado."
          value={respostas.diferencial}
          onChange={(e) => onSet('diferencial', e.target.value)}
          maxLength={200}
        />
      </div>

      <div className={styles.pergunta}>
        <label className={styles.perguntaLabel}>
          Se a operação dobrasse amanhã, qual o primeiro problema operacional?
        </label>
        <textarea
          className={styles.textarea}
          placeholder="Ex: eu não daria conta de responder no WhatsApp, ia perder cliente sem nem saber."
          value={respostas.primeiroBloqueio}
          onChange={(e) => onSet('primeiroBloqueio', e.target.value)}
          maxLength={200}
        />
      </div>
    </div>
  );
}

function EtapaGerando() {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner} />
      <p className={styles.loadingTexto}>Lendo suas respostas...</p>
      <p className={styles.loadingSub}>
        Cruzando o que você marcou com os 8 produtos AtingeHUB e o método de diagnóstico. Leva uns segundos.
      </p>
    </div>
  );
}

function EtapaResultado({
  resultado,
  respostas,
}: {
  resultado: Resultado;
  respostas: Respostas;
}) {
  const p = resultado.prognostico_cliente;
  const whatsappMsg = encodeURIComponent(p.abertura_whatsapp);
  const whatsappUrl = `https://wa.me/5515999999999?text=${whatsappMsg}`;

  return (
    <div className={styles.resultado}>
      <div className={styles.resultadoHero}>
        <p className={styles.eyebrow}>● Seu diagnóstico</p>
        <h2 className={styles.resultadoSaudacao}>{p.saudacao}</h2>
      </div>

      <div className={styles.resultadoLeitura}>
        {p.leitura.map((paragrafo, i) => (
          <p key={i}>{paragrafo}</p>
        ))}
      </div>

      <p className={styles.produtosLabel}>● Onde destravar primeiro</p>
      <div className={styles.produtosGrid}>
        {p.produtos_sugeridos.map((prod) => (
          <a
            key={prod.slug}
            href={`/portfolio/${prod.slug}`}
            className={styles.produtoCard}
            style={{
              ['--prod-color' as any]: `var(--${prod.cor})`,
              ['--prod-glow' as any]: `var(--${prod.cor}-glow)`,
            }}
          >
            <p className={styles.produtoEyebrow}>● {prod.nome}</p>
            <h3 className={styles.produtoNome}>{prod.nome}</h3>
            <p className={styles.produtoPorque}>{prod.porque}</p>
            <p className={styles.produtoGanho}>{prod.ganho_concreto}</p>
          </a>
        ))}
      </div>

      <div className={styles.resultadoCtas}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener"
          className={styles.ctaPrimario}
        >
          $ conversar com o Gabriel →
        </a>
        <button
          type="button"
          className={styles.ctaSecundario}
          onClick={() => window.print()}
        >
          Salvar PDF
        </button>
      </div>
    </div>
  );
}

function EtapaErro({
  mensagem,
  onTentarDeNovo,
}: {
  mensagem: string | null;
  onTentarDeNovo: () => void;
}) {
  return (
    <div className={styles.etapa}>
      <p className={styles.eyebrow}>● Algo travou</p>
      <h2 className={styles.etapaTitulo}>Não consegui gerar agora.</h2>
      <p className={styles.etapaSub}>
        {mensagem || 'Erro desconhecido.'} Tenta de novo em alguns segundos. Se persistir, fala comigo no WhatsApp que a gente resolve.
      </p>
      <div style={{ marginTop: 24 }}>
        <button className={styles.botaoProximo} onClick={onTentarDeNovo} type="button">
          ↻ tentar de novo
        </button>
      </div>
    </div>
  );
}
