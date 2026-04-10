<template>
  <div class="flex flex-col rounded-8 bg-gray-10 p-16 cursor-pointer" v-if="item">
    <div class="flex items-center justify-between gap-24">
      <div class="title5">
        {{ item.name }}
      </div>
      <IconArrow class="text-gray-80 transition size-24" :class="[isOpen && 'rotate-180']" />
    </div>

    <div
      class="grid grid-rows-[0fr] md:pr-42 lg:pr-93 transition-all duration-300 ease-out text5"
      :class="[isOpen && 'grid-rows-[1fr]']"
    >
      <div class="overflow-hidden">
        <div class="pt-16 text-16 text-gray-80" v-html="item.content" />
      </div>
    </div>
  </div>
</template>
<script setup>
import IconArrow from '~/svg/_common/arrow-down.svg';

defineProps({
  item: { type: Object, required: true },
  isOpen: { type: Boolean, default: false },
});
</script>
