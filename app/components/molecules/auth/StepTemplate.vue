<template>
  <form class="flex flex-col gap-20" @submit.prevent="emit('submit')">
    <div class="flex flex-col gap-10">
      <h1
        v-if="title"
        :class="[
          'text-32 lg:text-40 leading-[1.1] lg:leading-[1.2] -tracking-[0.01em] font-medium text-center',
          titleClass,
        ]"
      >
        {{ title }}
      </h1>
      <div
        v-if="subtitle || $slots.subtitle"
        class="text-gray-60 text-18 lg:text-24 leading-[1.3] -tracking-[0.01em] text-center lg:pb-20"
      >
        <slot name="subtitle">{{ subtitle }}</slot>
      </div>
    </div>
    <slot />
  </form>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  titleClass: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['submit']);
</script>
