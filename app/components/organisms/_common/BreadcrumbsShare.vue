<template>
  <section class="hidden lg:flex items-center justify-between gap-20 pt-40 pb-20">
    <Breadcrumbs />
    <AButtonShare theme="gray" class="h-44" />
  </section>
</template>

<script setup>
import AButtonShare from '~/components/atoms/AButtonShare.vue';
import Breadcrumbs from '~/components/molecules/_common/Breadcrumbs.vue';
</script>
