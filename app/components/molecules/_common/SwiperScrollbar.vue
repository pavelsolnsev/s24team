<template>
  <div v-bind="$attrs" class="h-6 bg-gray-20 rounded-20 overflow-hidden">
    <div class="swiper-scrollbar-drag rounded-10 bg-gray-60! text-gray-60! cursor-pointer" />
  </div>
</template>
<script setup>
defineOptions({
  inheritAttrs: false,
});
</script>
