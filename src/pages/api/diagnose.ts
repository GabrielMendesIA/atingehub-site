import type { APIRoute } from 'astro';

export const prerender = false;

type Dor =
  | 'lead-atendente-dormiu'
  | 'cliente-sumiu-no-segundo-contato'
  | 'dados-na-cabeca-do-dono'
  | 'sair-uma-semana-loja-para'
  | 'anuncio-caro-fala-pra-todos'
  | 'concorrente-baixou-preco';

const DOR_PARA_PRODUTO: Record<Dor, { slug: string; nome: string; cor: string }> = {
  'lead-atendente-dormiu': { slug: 'voz', nome: 'Voz', cor: 'voz' },
  'cliente-sumiu-no-segundo-contato': { slug: 'cadencia', nome: 'Cadência', cor: 'cadencia' },
  'dados-na-cabeca-do-dono': { slug: 'cerebro', nome: 'Cérebro', cor: 'cerebro' },
  'sair-uma-semana-loja-para': { slug: 'engrenagens', nome: 'Engrenagens', cor: 'engrenagens' },
  'anuncio-caro-fala-pra-todos': { slug: 'vitrine', nome: 'Vitrine', cor: 'vitrine' },
  'concorrente-baixou-preco': { slug: 'bussola', nome: 'Bússola', cor: 'bussola' },
};

const DOR_FRASE_HUMANA: Record<Dor, string> = {
  'lead-atendente-dormiu': 'O lead chega no WhatsApp e o atendente já dormiu',
  'cliente-sumiu-no-segundo-contato': 'O cliente sumiu no segundo contato e ninguém puxou de volta',
  'dados-na-cabeca-do-dono': 'Seus dados estão na cabeça do dono e em 4 planilhas',
  'sair-uma-semana-loja-para': 'Se você sair uma semana, a loja para',
  'anuncio-caro-fala-pra-todos': 'Anúncio caro porque você fala pra todo mundo',
  'concorrente-baixou-preco': 'O concorrente baixou preço e você precisa baixar junto',
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const dores: Dor[] = Array.isArray(body?.dores) ? body.dores : [];
    const nome = body?.nome || 'comerciante';
    const setor = body?.setor || 'sua loja';
    const cidade = body?.cidade || '';

    // Heurística mock até Claude entrar (Onda C):
    // pega as primeiras 2-3 dores marcadas e mapeia pros produtos correspondentes.
    const produtos = dores
      .slice(0, 3)
      .map((d) => DOR_PARA_PRODUTO[d])
      .filter(Boolean);

    if (produtos.length < 2) {
      produtos.push(DOR_PARA_PRODUTO['dados-na-cabeca-do-dono']);
    }

    const mock = {
      ok: true,
      stage: 'mock',
      prognostico_cliente: {
        saudacao: `Olá ${nome} — aqui o panorama da sua operação em ${setor}${cidade ? ` (${cidade})` : ''}.`,
        leitura: [
          `Você opera no segmento de ${setor}, com a maior parte do cliente entrando por ${body?.canalPrincipal || 'canal a definir'}. Isso pesa muito no diagnóstico: significa que cada conversa é um ponto de virada entre venda e perda.`,
          `As dores marcadas mostram um padrão claro — operação em pé, mas com vazamentos no fluxo. A boa notícia: cada uma dessas dores tem produto AtingeHUB pensado pra destravar, sem virar a chave da loja de cabeça pra baixo.`,
          `O próximo passo não é "decidir se entra em IA". É decidir por qual das frentes começar — qual destrava mais, mais rápido, com menor risco de queima de tempo. Isso a gente desenha na conversa, não no formulário.`,
        ],
        produtos_sugeridos: produtos.map((p, i) => ({
          slug: p.slug,
          nome: p.nome,
          cor: p.cor,
          porque: `Mapeia direto pra dor "${DOR_FRASE_HUMANA[dores[i]] || 'sua dor principal'}".`,
          ganho_concreto: `Conversa que não esfria, registro que fica, dono que sai da operação repetitiva.`,
        })),
        abertura_whatsapp: `Oi Gabriel, fiz o diagnóstico no site. ${produtos.length > 0 ? `Apareceu ${produtos.map((p) => p.nome).join(' + ')} como sugestão.` : ''} Quero entender melhor.`,
      },
      brief_gabriel: {
        perfil_curto: `${nome} · ${setor} · ${cidade} · ${body?.tamanho || 'tamanho não informado'} funcionários · ${body?.faturamento || 'faturamento não informado'}`,
        leitura_analitica: `Mock de leitura analítica — Claude entra na Onda C e gera análise estratégia→processo→ferramenta fiel ao método Kelvin.`,
        produtos_em_ordem: produtos.map((p) => ({
          slug: p.slug,
          razao_tatica: `Stub — Onda C plugará Claude pra gerar racional comercial real.`,
        })),
        abertura_sugerida: `Stub — Onda C plugará Claude pra gerar abertura comercial real.`,
      },
      respostas_brutas: body,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(mock), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'Invalid JSON body',
        detail: err instanceof Error ? err.message : String(err),
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      ok: true,
      stage: 'mock',
      hint: 'POST com JSON { nome, setor, cidade, dores: [...], canalPrincipal, tamanho, faturamento, ... } pra disparar o diagnóstico mock.',
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
