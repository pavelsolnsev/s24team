<template>
  <NuxtLink
    :to="{ name: 'articles-id', params: { id: item.id } }"
    class="group relative flex! flex-col lg:flex-row lg:flex-nowrap gap-20 bg-gray-10 hover:bg-gray-20 transition-colors duration-200 p-16 lg:p-24 rounded-16 w-full"
  >
    <div :class="[imageSize, 'rounded-16 overflow-hidden relative']">
      <NuxtImg class="w-full h-full object-cover" :src="item.image" alt="" loading="lazy" />
    </div>
    <div class="flex flex-col gap-10 lg:justify-between lg:flex-1 lg:h-full">
      <div class="flex flex-col gap-10">
        <h3 class="text-24 font-medium leading-[1.2] lg:leading-[1.3] -tracking-[0.01em]">
          {{ item.name }}
        </h3>
        <p class="text-16 leading-[1.3] lg:text-18-tracking-[0.01em] text-gray-80">
          {{ item.description }}
        </p>
      </div>
      <div
        class="relative flex gap-10 flex-nowrap justify-start w-full overflow-hidden text-nowrap text-gray-60 text-14 leading-[1.4] font-light -tracking-[0.01em] pr-27"
      >
        <NuxtTime :datetime="item.publishedAt" month="long" day="numeric" />
        <div>|</div>
        <div class="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
          {{ item.author }}
        </div>
        <IconArrow
          class="absolute right-0 top-1/2 -translate-y-1/2 size-24 text-gray-60 opacity-0 translate-x-2 transition duration-200 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
import IconArrow from '~/svg/_common/arrow-right-16.svg';

const { item } = defineProps({
  item: { type: Object, required: true },
  imageSize: { type: String, default: 'w-full h-121 lg:w-186 lg:h-261' },
});
</script>
