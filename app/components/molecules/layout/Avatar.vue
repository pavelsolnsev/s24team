<template>
  <div class="flex items-center justify-center rounded-full">
    <IconAvatar class="w-full h-full rounded-full object-cover" v-if="!avatar" />
    <NuxtImg
      class="w-full h-full rounded-full object-cover"
      :src="avatar"
      alt=""
      :preload="{ fetchPriority: 'high' }"
      v-else
    />
  </div>
</template>
<script setup>
import IconAvatar from '~/svg/_common/avavtar.svg';

defineProps({
  avatar: { type: [String, null], default: null },
});
</script>
