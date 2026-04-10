<template>
  <div class="flex items-center" :class="[styles[theme]]">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
  theme: {
    type: String,
    default: 'profile-category',
    validator: v => ['profile-direction', 'profile-category'].includes(v),
  },
});

const styles = {
  'profile-direction':
    'gap-10 p-10 lg:px-24 lg:py-6 rounded-8 lg:rounded-10 bg-glass-30 backdrop-blur-[5px] text-16 lg:text-18 leading-[1.2] lg:leading-[1.3] -tracking-[0.01em] text-white lg:flex-row-reverse',
  'profile-category':
    'gap-10 px-16 py-4 lg:px-16 rounded-8 bg-glass-30 backdrop-blur-[5px] text-16 lg:text-12 leading-[1.25] lg:leading-[1.3] -tracking-[0.01em] text-white font-light',
};
</script>
