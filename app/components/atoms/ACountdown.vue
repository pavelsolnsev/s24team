<template>
  <button
    data-atom="countdown"
    type="button"
    :disabled="timer > 0"
    class="cursor-pointer disabled:pointer-events-none disabled:cursor-default"
    @click="emits('click')"
  >
    <slot v-if="timer > 0" />
    <slot name="timeisup" v-else />
  </button>
</template>

<script setup>
const emits = defineEmits(['click']);
const timer = defineModel({ type: Number, default: 0 });

const timerInterval = ref(null);

const stopTimer = () => {
  clearInterval(timerInterval.value);
  timerInterval.value = null;
};

const startTimer = () => {
  stopTimer();
  timerInterval.value = setInterval(() => {
    const next = Math.max(0, timer.value - 1);
    timer.value = next;
    if (next === 0) stopTimer();
  }, 1000);
};

watch(timer, newVal => {
  if (newVal > 0 && !timerInterval.value) startTimer();
});

onMounted(() => {
  if (timer.value > 0) startTimer();
});

onUnmounted(() => {
  stopTimer();
});
</script>
