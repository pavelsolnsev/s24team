<template>
  <AButton
    theme="gray"
    class="rounded-30 px-32 text-18 leading-[1.3] -tracking-[0.01em] flex items-center gap-10 transition-colors duration-1000"
    :class="{ [successClass]: copied }"
    v-bind="$attrs"
    @click="share"
  >
    <span>Поделиться</span>
    <IconShare
      class="size-16 shrink-0 pointer-events-none transition-colors duration-1000"
      :class="{ [successClass]: copied }"
    />
  </AButton>
</template>

<script setup>
import AButton from '~/components/atoms/AButton.vue';
import IconShare from '~/svg/_common/share.svg';
import useButtonShare from '~/composables/useButtonShare.js';

const props = defineProps({
  successClass: {
    type: String,
    default: '!bg-green !text-white enabled:hover:!bg-green',
  },
  timeout: {
    type: Number,
    default: 3000,
  },
  url: {
    type: [String, Object],
    default: '',
  },
});

const { copied, share } = useButtonShare(props);
</script>
