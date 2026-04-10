// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2026-03-05',
  devtools: { enabled: true },
  features: {
    devLogs: false,
  },
  vite: {
    optimizeDeps: {
      include: ['overlayscrollbars', 'overlayscrollbars-vue'],
      esbuildOptions: {
        define: {
          global: 'window',
        },
      },
    },
    plugins: [svgLoader({ svgo: false }), tailwindcss()],
    css: {
      transformer: 'lightningcss',
    },
    build: {
      cssMinify: 'lightningcss',
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  runtimeConfig: {
    public: {
      // NUXT_PUBLIC_API — URL бэкенда для прокси; пусто = прокси не используется
      api: '',
    },
  },
  app: {
    head: {
      titleTemplate: '%s | Демо портфолио',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'viewport-fit=cover, width=device-width, initial-scale=1, user-scalable=1, minimum-scale=1, maximum-scale=5',
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#fff' },
        { name: 'robots', content: 'noindex, nofollow' },
        {
          name: 'description',
          content: 'Демонстрационный фронтенд для портфолио разработчика.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg', sizes: 'any' },
        {
          rel: 'alternate icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
          media: '(prefers-color-scheme: light)',
        },
        {
          rel: 'alternate icon',
          type: 'image/x-icon',
          href: '/favicon-dark.ico',
          media: '(prefers-color-scheme: dark)',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/icon-180.png',
          media: '(prefers-color-scheme: light)',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/icon-180-dark.png',
          media: '(prefers-color-scheme: dark)',
        },
        { rel: 'manifest', href: '/manifest.json' },
      ],
    },
    pageTransition: false,
    layoutTransition: false,
  },
  css: ['~/assets/styles.css'],
  modules: ['@pinia/nuxt', '@peterbud/nuxt-query', '@nuxt/image', 'radix-vue/nuxt'],
  // image: {
  //   format: ['avif', 'webp'], // AVIF приоритетнее в 2026 году
  //   screens: {
  //     sm: 360,
  //     md: 767,
  //     lg: 1025,
  //     xl: 1920,
  //   },
  // },
  nuxtQuery: {
    autoImports: ['useQuery', 'useMutation'],
    devtools: true,
    queryClientOptions: {
      defaultOptions: {
        queries: {
          networkMode: 'always',
          retry: 1,
          retryDelay: 1000,
          staleTime: 60000 * 60 * 12,
          refetchOnWindowFocus: false,
        },
        mutations: {
          networkMode: 'always',
        },
      },
    },
  },
  typescript: {
    strict: true,
  },
  spaLoadingTemplate: false,
  experimental: {
    // Улучшает производительность навигации, извлекая данные страниц в JSON
    payloadExtraction: true,
    // Включает типизированные роуты (автодополнение для NuxtLink)
    typedPages: true,
  },
});
