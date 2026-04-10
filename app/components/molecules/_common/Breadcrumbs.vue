<template>
  <nav class="flex gap-10" v-if="crumbs?.length" aria-label="Breadcrumb">
    <div
      class="flex gap-10 text-14 leading-[1.4] -tracking-[.01em] text-gray-60 last:pointer-events-none last:cursor-default"
      v-for="(item, index) in crumbs"
      :key="item.path"
    >
      <NuxtLink :to="item.path">
        {{ item.title }}
      </NuxtLink>

      <div v-if="index < crumbs.length - 1">/</div>
    </div>
  </nav>
</template>
<script setup>
const { crumbs } = useBreadcrumbs();
</script>
