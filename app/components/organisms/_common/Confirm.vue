<template>
  <section
    class="flex flex-col gap-20 w-full bg-gray-10 p-20 max-w-[calc(100dvw-40px)] lg:min-w-695 rounded-20 text-16 lg:text-18"
  >
    <div class="flex items-center gap-30 justify-between">
      <h3 class="font-medium text-24 leading-[1.1] lg:leading-[1.3] -tracking-[0.01em]">
        {{ title }}
      </h3>
      <IconCross class="cursor-pointer size-37.5 text-gray-60" @click="emits('cancel')" />
    </div>

    <p v-if="$slots.default" class="text-gray-60">
      <slot />
    </p>

    <div class="flex flex-col lg:flex-row gap-8 lg:gap-20 w-full text-18 lg:text-20">
      <AButton class="w-full rounded-30 h-56" theme="black" @click="emits('ok')">OK</AButton>
      <AButton class="w-full rounded-30 h-56" theme="gray" @click="emits('cancel')">
        Отмена
      </AButton>
    </div>
  </section>
</template>

<script setup>
import IconCross from '~/svg/_common/cross.svg';
import AButton from '~/components/atoms/AButton.vue';

const { title } = defineProps({
  title: { type: String, required: true },
});

const emits = defineEmits(['ok', 'cancel']);
</script>
