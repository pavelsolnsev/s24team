<template>
  <component :is="currentIcon" class="rounded-full" />
</template>

<script setup>
import IconLike from '~/svg/notifications/like.svg';
import IconRate from '~/svg/notifications/rate.svg';
import IconWarning from '~/svg/notifications/warning.svg';
import IconMessage from '~/svg/notifications/message.svg';

const { icon } = defineProps({
  icon: {
    type: String,
    default: null,
  },
});

const iconMap = {
  like: markRaw(IconLike),
  rate: markRaw(IconRate),
  warning: markRaw(IconWarning),
  message: markRaw(IconMessage),
};

const currentIcon = computed(() => iconMap[icon] || iconMap.message);
</script>
