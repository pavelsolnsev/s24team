<template>
  <div class="flex flex-col">
    <LazyOrganismsCommonBreadcrumbsShare hydrate-on-visible />
    <LazyOrganismsProfileHeader hydrate-on-visible :profile="profile" />
    <LazyOrganismsProfileProjects hydrate-on-visible :role="profile?.role || 'creator'" />
  </div>
</template>

<script setup>
import profiles from '#shared/mocks/profiles.json';

const route = useRoute();

const profile = computed(() => profiles.find(p => p.name === route.params.nickname) || null);

if (!profile.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Profile not found',
    fatal: true,
  });
}

route.meta.seo ||= {};
route.meta.seo.title = profile.value?.fullName || '';
route.meta.seo.crumb = profile.value?.fullName || '';

usePortfolioPageMeta('Карточка профиля участника (демо).');
</script>
