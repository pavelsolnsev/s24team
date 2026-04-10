<template>
  <section
    v-if="content"
    v-html="content"
    class="flex flex-col gap-20 lg:pt-24 pb-40 lg:pb-84 text-16 lg:text-18 leading-[1.2] lg:leading-[1.3] -tracking-[0.01em]"
  />
</template>

<script setup>
defineProps({
  content: {
    type: String,
    default: '',
  },
});
</script>
