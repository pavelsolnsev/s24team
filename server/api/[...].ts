import { joinURL } from 'ufo';

export default defineEventHandler(async event => {
  const proxyUrl = String(useRuntimeConfig().public.api || '').trim();
  if (!proxyUrl) {
    throw createError({
      statusCode: 503,
      statusMessage: 'API не настроен: задайте NUXT_PUBLIC_API в .env (см. .env.example).',
    });
  }
  const cleanPath = event.path.replace(/^\/api/, ''); // удаляем лишний /api в запросе
  const target = joinURL(proxyUrl, cleanPath);

  const headers = getProxyRequestHeaders(event);

  return proxyRequest(event, target, {
    headers,
  });
});
