<template>
  <div class="flex flex-col">
    <section class="flex items-center justify-between gap-20 pt-40 pb-20">
      <h1 class="text-36 lg:text-48 leading-[1.1] -tracking-[0.01em] font-medium">Мои подборки</h1>
      <CreateCollectionButton class="hidden lg:flex" />
    </section>
    <LazyOrganismsCollectionsList hydrate-on-visible />
    <LazyOrganismsCollectionsSavedProjects hydrate-on-visible />
  </div>
</template>

<script setup>
import CreateCollectionButton from '~/components/molecules/collections/CreateCollectionButton.vue';
</script>
