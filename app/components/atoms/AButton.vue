<template>
  <button
    data-atom="button"
    class="flex items-center justify-center cursor-pointer transition disabled:cursor-default"
    :class="[styles[theme] || '']"
    :type="$attrs.type || 'button'"
    :disabled="$attrs.disabled"
  >
    <slot v-if="!loading" />
    <IconSpinner v-else class="size-20" />
  </button>
</template>
<script setup>
import IconSpinner from '~/svg/_common/spinner.svg';

defineProps({
  theme: {
    type: String,
    default: '',
    validator: v =>
      [
        'black',
        'gray',
        'graypurple',
        'darkgray',
        'purple',
        'lightpurple',
        'glass',
        'white',
      ].includes(v),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const styles = {
  black: `bg-primary text-white enabled:hover:bg-purple disabled:opacity-50`,
  white: `bg-white text-primary enabled:hover:bg-purple enabled:hover:text-white disabled:opacity-50`,
  gray: `bg-gray-20 enabled:hover:bg-gray-40 disabled:opacity-50`,
  graypurple: `bg-gray-20 enabled:hover:bg-purple enabled:hover:text-white disabled:opacity-50`,
  darkgray: `bg-gray-90 enabled:hover:bg-gray-100 text-white disabled:opacity-50`,
  purple: `bg-purple text-white enabled:hover:bg-white enabled:hover:text-black disabled:opacity-50`,
  lightpurple: `bg-purple-20 text-white enabled:hover:bg-purple-30 disabled:opacity-50`,
  glass: `bg-glass-30 backdrop-blur-xl text-white enabled:hover:bg-glass-20 disabled:opacity-50`,
};
</script>
