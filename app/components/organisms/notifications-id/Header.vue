<template>
  <section class="flex flex-col gap-20 pt-40 pb-20 lg:flex-row lg:items-stretch relative">
    <NuxtLink
      class="absolute top-40 right-0 size-37 cursor-pointer rounded-full hover:bg-gray-10 transition-colors duration-300"
      :to="{ name: 'notifications' }"
    >
      <IconClose class="w-full h-full text-gray-60" />
    </NuxtLink>

    <div class="lg:shrink-0">
      <NotificationsIcon :icon="item.icon" class="size-67" />
    </div>
    <div class="flex flex-col gap-5 lg:flex-1 lg:justify-between">
      <h1 class="text-24 font-medium leading-[1.1] lg:leading-[1.3] -tracking-[0.01em]">
        {{ item.title }}
      </h1>
      <NuxtTime
        :datetime="item.createdAt"
        month="numeric"
        day="numeric"
        year="numeric"
        class="text-16 leading-[1.2] -tracking-[0.01em] text-gray-60"
      />
    </div>
  </section>
</template>
<script setup>
import NotificationsIcon from '~/components/molecules/notifications/Icon.vue';
import IconClose from '~/svg/_common/cross.svg';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
