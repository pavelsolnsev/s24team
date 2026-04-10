<template>
  <AButton
    theme="white"
    class="w-full h-44 lg:h-60 rounded-full text-14 lg:text-20 leading-[1.4] -tracking-[0.01em] flex items-center justify-center gap-10"
    v-bind="$attrs"
  >
    <component :is="icons[icon]" :class="iconSizes[icon]" />
    <slot />
  </AButton>
</template>

<script setup>
import AButton from '~/components/atoms/AButton.vue';
import IconYandex from '~/svg/social/yandex.svg';
import IconVk from '~/svg/social/vk.svg';

defineProps({
  icon: {
    type: String,
    required: true,
    validator: v => ['yandex', 'vk'].includes(v),
  },
});

const icons = {
  yandex: markRaw(IconYandex),
  vk: markRaw(IconVk),
};

const iconSizes = {
  yandex: 'size-30',
  vk: 'size-25',
};
</script>
