<template>
  <div class="flex flex-col">
    <LazyMoleculesCommonBreadcrumbs hydrate-on-visible />
  </div>
</template>
<script setup>
const data = {
  seo: {
    title: 'Демо-статья',
    description: 'Краткое описание демо-статьи для портфолио.',
  },
};
const route = useRoute();

if (route.params.id !== 'povar') {
  throw createError({
    statusCode: '404',
    message: 'Error',
    fatal: true,
  });
}

route.meta.seo ||= {};
route.meta.seo.title = data?.seo?.title || '';
route.meta.seo.description = data?.seo?.description || '';
route.meta.seo.crumb = data?.seo?.title || '';

usePortfolioPageMeta(data?.seo?.description || '');
</script>
