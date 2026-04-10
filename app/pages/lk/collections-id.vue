<template>
  <div v-if="collection" class="flex flex-col">
    <LazyOrganismsCollectionsSavedProjects hydrate-on-visible :collection="collection" />
  </div>
</template>

<script setup>
import collections from '#shared/mocks/collections.json';
import { useRoute } from 'vue-router';

const route = useRoute();
const collection = collections.items.find(item => item.id === route.params.id);

if (!collection) {
  throw createError({
    statusCode: '404',
    message: 'Collection not found',
  });
}

route.meta.seo ||= {};
route.meta.seo.title = collection.name || '';
route.meta.seo.crumb = collection.name || '';

usePortfolioPageMeta('Подборка проектов (демо).');
</script>
