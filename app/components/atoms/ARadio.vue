<template>
  <label
    data-atom="radio"
    class="flex group relative transition-colors cursor-pointer gap-12"
    ref="el"
  >
    <input
      class="hidden peer"
      :checked="modelValue"
      type="radio"
      :disabled="$attrs.disabled"
      :name="$attrs.name"
      :value="$attrs.value"
      @input="update"
    />
    <div
      class="size-20 min-w-20 rounded-full border border-gray-20 transition peer-checked:border-red peer-checked:border-6"
      v-if="trigger === 'default'"
    />
    <div class="transition-colors" v-if="$slots.default">
      <slot />
    </div>
  </label>
</template>

<script setup>
import { useElementBounding } from '@vueuse/core';

defineProps({
  trigger: {
    type: String,
    default: '',
    validator: v => ['', 'default'].includes(v),
  },
});

const modelValue = defineModel();
const el = ref(null);
const { x: left, width, height } = useElementBounding(el);

const emits = defineEmits(['update:modelValue', 'update:id']);

const update = v => {
  v.target.checked = modelValue.value;
  emits('update:id', v.target.value);
};

defineExpose({ left, width, height, checked: computed(() => modelValue.value) });
</script>
