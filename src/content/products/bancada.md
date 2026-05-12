---
name: Bancada
slug: bancada
slogan: Tarefas internas que se repetem viram trabalho de IA.
summary: Agentes Claude calibrados com o tom do seu negócio, executando tarefas semanais sem você ficar olhando.
family: inteligencia
order: 3
tool_base: Claude Code com CLAUDE.md calibrado (regras + tom + posicionamento + restrições legais do negócio) + 1+ subagente especializado + skills configuradas pra rodar tarefas específicas semanalmente.
problem: O empresário ou alguém da equipe abre o ChatGPT/Claude toda semana, cola contexto na mão, pede pauta de Instagram, ajuste de copy, análise de planilha. Depende de prompt manual repetido.
deliverable: CLAUDE.md calibrado + 1 subagente executando 3 tarefas reais de produção sem intervenção, com o tom e o posicionamento do seu negócio.
versatility: media
sold_alone: true
dependencies: [cerebro]
pricing:
  oneshot: "R$ 3,5–6,5k"
  monthly: "opcional R$ 500–800"
  monthly_required: false
seo:
  title: Bancada — agentes Claude que executam tarefas no seu negócio
  description: Subagentes Claude calibrados pro tom e posicionamento da sua empresa. 3 tarefas semanais reais rodando sem intervenção manual.
---

## O que a Bancada resolve

Você abre o Claude (ou o ChatGPT) toda semana pra mesma coisa: pauta de Instagram, ajuste de copy de anúncio, análise da planilha de vendas. Cola contexto na mão, refaz pergunta, exporta resultado. Quase resolve, mas nunca vira sistema.

A **Bancada** é a oficina de bastidor onde a IA trabalha sozinha. Você calibra uma vez (com a gente), e o agente executa as tarefas semanais com o tom do seu negócio, sem você precisar ficar olhando.

## O que vem na entrega

- `CLAUDE.md` calibrado pro seu negócio: posicionamento, tom de voz, restrições legais, vocabulário aprovado.
- 1 subagente especializado executando 3 tarefas reais (exemplos: "todo domingo, gerar 5 ideias de post baseadas nas vendas da semana"; "toda segunda, revisar copy de anúncio que rodou e sugerir variação A/B").
- Skills configuradas pra cada tarefa.
- Treinamento pra você acionar e revisar.
- Auditoria mensal opcional pra recalibrar.

## Quando faz mais sentido

Bancada exige um pouco de maturidade — funciona muito melhor quando o **Cérebro** já está entregue (o vault vira a fonte de contexto pros agentes). Sem Cérebro, dá pra fazer, mas a IA chuta mais. Cliente precisa ter Claude Pro próprio.

Não é boa porta de entrada — funciona melhor como segunda ou terceira contratação, depois de Vitrine + Cérebro estabelecidos.

## Risco e mitigação

A metáfora de "bancada de oficina" precisa ser explicada 1 vez na primeira call: *"A Bancada é onde a IA trabalha pra você sem você ficar olhando — como uma oficina nos fundos da loja."* Em 30 segundos, o cliente entende.

---

## Por dentro · stack técnica

### Claude Code · um funcionário de IA que conhece a sua empresa

A diferença entre **IA genérica** e **IA do seu negócio** está no contexto. Num documento simples — o `CLAUDE.md`, o "manual da empresa" — você ensina o agente sobre a sua operação: vocabulário, regras, limites, tom de voz. A partir daí ele vira **vários agentes especializados** — um pra marketing, um pra atendimento, um pra gestão, um pra conteúdo — cada um com acesso às ferramentas do seu dia a dia.

O motor é o **Claude Code** (Anthropic), rodado localmente ou em ambiente seu, com:

- `agent:atendimento` — responde WhatsApp (whatsapp · crm · catálogo)
- `agent:marketing` — cria campanha (instagram · copy · landing)
- `agent:gestao` — relatório diário (planilhas · chatwoot · resumo)
- `agent:conteudo` — pauta semanal (obsidian · notebooklm · agenda editorial)

### O Arsenal · +50 habilidades desbloqueadas

Cada agente do seu negócio vem com um **conjunto especializado de skills**. Estas são as skills já prontas do **arsenal AtingeHUB** — testadas, versionadas, prontas pra entrar em produção. Os produtos que você contrata ditam quais agentes entram em campo primeiro e, portanto, quais skills são priorizadas. **Skill nova entra sem custo adicional.**

**agent:marketing-conteúdo** (12 skills) — `copywriting` · `content-strategy` · `marketing-ideas` · `marketing-psychology` · `social-content` · `instagram` · `customer-research` · `competitor-alternatives` · `ai-image-generation` · `ai-video-generation` · `nano-banana-2` · `yt-search`

**agent:segundo-cérebro** (11 skills) — `obsidian-bases` · `obsidian-cli` · `obsidian-markdown` · `vault-sync-architecture` · `json-canvas` · `notebooklm` · `notebooklm-vault` · `defuddle` · `quote-flow` · `brainstorming` · `find-skills`

**agent:automação** (10 skills) — `n8n-workflow-patterns` · `n8n-node-configuration` · `n8n-expression-syntax` · `n8n-code-javascript` · `n8n-code-python` · `n8n-validation-expert` · `n8n-mcp-tools-expert` · `n8n-scope` · `mcp-builder` · `mcp-integration`

**agent:engenharia** (11 skills) — `agent-development` · `agent-browser` · `skill-creator` · `skill-development` · `claude-automation-recommender` · `claude-md-improver` · `adapter-pattern` · `idempotency` · `rbac-guards` · `audit-trail` · `db-conventions`

**agent:produto-web** (5 skills) — `frontend-design` · `web-design-guidelines` · `vercel-react-best-practices` · `supabase-postgres-best-practices` · `stripe-best-practices`

### Entregáveis técnicos

- Manual da empresa (`CLAUDE.md`) calibrado: vocabulário, regras, limites, tom de voz
- 1+ subagente(s) especializado(s) executando 3 tarefas semanais sem intervenção
- Skills configuradas para cada tarefa, versionadas no seu repositório
- Agente conectado ao seu segundo cérebro (Obsidian + NotebookLM do produto Cérebro)
- Travas de segurança: a IA não expõe dado sigiloso e não executa ação destrutiva sem autorização
- Auditoria mensal opcional pra recalibrar com novos aprendizados
