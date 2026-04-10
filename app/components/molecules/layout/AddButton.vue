<template>
  <AButton :theme="$attrs.theme || 'gray'" class="rounded-30 overflow-hidden">
    <NuxtLink
      :to="{ name: 'project-add' }"
      class="flex items-center justify-center gap-10 whitespace-nowrap h-56 lg:h-44 px-32"
    >
      Добавить проект
      <IconAddSquare class="size-16" v-if="icon === 'square'" />
      <IconAddCircle class="size-16" v-if="icon === 'circle'" />
    </NuxtLink>
  </AButton>
</template>
<script setup>
import IconAddCircle from '~/svg/_common/add-circle.svg';
import IconAddSquare from '~/svg/_common/add-square.svg';
import AButton from '~/components/atoms/AButton.vue';

defineProps({
  icon: { type: String, default: 'circle', validator: v => ['circle', 'square'].includes(v) },
});
</script>
