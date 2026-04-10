<template>
  <div class="flex flex-col">
    <LazyOrganismsProfileH1Buttons hydrate-on-visible :profile="profile" />
    <LazyOrganismsProfileHeader hydrate-on-visible :profile="profile" is-my-profile />
    <LazyOrganismsProfileProjects
      hydrate-on-visible
      :role="profile?.role || 'creator'"
      is-my-profile
    />
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const { user: profile } = storeToRefs(authStore);

usePortfolioPageMeta('Личный кабинет (демо).');
</script>
