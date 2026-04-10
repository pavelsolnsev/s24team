<template>
  <div class="flex flex-col">
    <LazyOrganismsNotificationsIdHeader hydrate-on-visible :item="item" />
    <LazyOrganismsNotificationsIdContent hydrate-on-visible :content="item.content" />
  </div>
</template>
<script setup>
import Avatar from '~/components/molecules/layout/Avatar.vue';
import data from '#shared/mocks/notifications.json';

const route = useRoute();
const item = computed(() => data.items.find(i => i.id === route.params.id));

if (!item.value) {
  throw createError({
    statusCode: '404',
    message: 'Error',
    fatal: true,
  });
}

route.meta.seo ||= {};
route.meta.seo.title = item.value.title;
route.meta.seo.crumb = item.value.title;

usePortfolioPageMeta('Уведомление (демо).');
</script>
