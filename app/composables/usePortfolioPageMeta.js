/**
 * Демо-портфолио: только meta description, без OG/Twitter (глобальные robots в nuxt.config).
 */
export function usePortfolioPageMeta(description) {
  useHead({
    meta: [
      {
        name: 'description',
        content: description || 'Демонстрационный интерфейс для портфолио разработчика.',
      },
    ],
  });
}
