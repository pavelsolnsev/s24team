<template>
  <div
    v-if="show"
    data-atom="modal"
    class="scrollbar-hidden fixed inset-0 flex top-0 l-0 items-center justify-center min-h-screen overflow-x-hidden overflow-y-auto z-1000 transition-colors duration-300 ease-in-out"
    :class="visible ? 'bg-black/30' : 'bg-transparent'"
    @click.self="handleClose"
  >
    <div
      class="w-auto flex flex-col relative transition-all duration-300 ease-in-out"
      :class="visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'"
    >
      <!-- <IconCross class="absolute top-16 lg:top-20 right-16 lg:right-20 cursor-pointer size-37.5 text-gray-60" @click.self="handleClose" /> -->
      <slot />
    </div>
  </div>
</template>
<script setup>
// import IconCross from '~/svg/_common/cross.svg';
import useUtils from '~/composables/useUtils';

const { toggleStopScrolling } = useUtils();

const props = defineProps({ modelValue: { type: Boolean, default: false } });
const emits = defineEmits(['update:modelValue']);

const show = ref(false);
const visible = ref(false);

let rafId = null;
let timeoutId = null;

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      show.value = true;
      rafId = requestAnimationFrame(() => {
        visible.value = true;
        rafId = null;
      });
    } else {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      visible.value = false;
      timeoutId = setTimeout(() => {
        show.value = false;
        timeoutId = null;
      }, 300);
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId);
  if (timeoutId) clearTimeout(timeoutId);
});

watch(show, (val) => toggleStopScrolling(val));

function handleClose() {
  emits('update:modelValue', false);
}
</script>
