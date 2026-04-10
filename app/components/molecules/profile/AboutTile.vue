<template>
  <div
    class="h-346 max-h-346 rounded-8 lg:rounded-24 bg-gray-10 overflow-hidden min-h-0 flex flex-col justify-between gap-10 lg:gap-20 p-7 lg:p-16"
  >
    <div v-if="title" class="text-20 leading-[1.6] -tracking-[0.01em] font-medium">
      {{ title }}
    </div>
    <OverlayScrollbars
      v-if="$slots.default"
      element="div"
      :options="{
        scrollbars: { autoHide: 'scroll', visibility: 'auto' },
        overflow: { x: 'hidden' },
      }"
      class="text-18 leading-[1.3] -tracking-[0.01em] text-gray-80 overflow-y-auto break-words w-full os-scroll os-scroll-flush"
    >
      <slot />
    </OverlayScrollbars>
  </div>
</template>

<script setup>
const { title } = defineProps({
  title: { type: [String, Number], default: '' },
});
</script>
