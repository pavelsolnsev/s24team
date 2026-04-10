<template>
  <div class="flex items-center px-16 relative group h-full">
    <slot />
    <IconCorner
      class="absolute text-purple top-7 right-0 size-7 group-hover:opacity-100 opacity-0 transition"
      :class="[active && 'opacity-100']"
    />
  </div>
</template>
<script setup>
import IconCorner from '~/svg/_common/corner.svg';
defineProps({
  active: { type: Boolean, default: false },
});
</script>
