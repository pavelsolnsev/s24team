<template>
  <button
    class="flex justify-center items-center h-34 w-62 border rounded-30 bg-primary text-white disabled:text-primary disabled:bg-white enabled:hover:bg-gray-80 enabled:cursor-pointer disabled:cursor-default transition"
    type="button"
  >
    <IconArrow class="size-24" :class="[dir === 'next' && 'rotate-180']" />
  </button>
</template>
<script setup>
import IconArrow from '~/svg/_common/arrow-right.svg';

defineProps({
  dir: { type: String, default: 'prev', validator: v => ['next', 'prev'].includes(v) },
});
</script>
