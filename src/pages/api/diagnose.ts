import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    return new Response(
      JSON.stringify({
        ok: true,
        stage: 'stub',
        message: 'Endpoint vivo. Claude ainda não plugado — Onda C.',
        echo: body,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
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
      stage: 'stub',
      hint: 'POST com JSON { respostas } pra disparar o diagnóstico.',
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
