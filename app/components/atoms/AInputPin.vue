<template>
  <div data-atom="input-pin" class="flex flex-col gap-20">
    <PinInputRoot
      v-model="pinArray"
      :otp="otp"
      :disabled="disabled"
      :required="required"
      :type="type"
      class="flex gap-10 items-center justify-center"
    >
      <PinInputInput
        v-for="(_, i) in length"
        :key="i"
        :index="i"
        class="size-38 lg:size-57 flex items-center justify-center text-center text-18 lg:text-24 leading-[1.3] -tracking-[0.01em] bg-white rounded-16 outline-none transition caret-gray-80"
        :class="error && showError && 'border-1 border-red text-red'"
      />
    </PinInputRoot>

    <div
      v-if="error && showError"
      class="px-10 transition text-red text-16 lg:text-18 leading-[1.2] lg:leading-[1.3] -tracking-[0.01em] text-center"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { PinInputRoot, PinInputInput } from 'radix-vue';
import { z } from 'zod';

const props = defineProps({
  length: { type: Number, default: 6 },
  showError: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  matchValue: { type: String, default: '' },
  matchValueError: { type: String, default: '' },
  otp: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'number' },
});

const modelValue = defineModel({ default: '' });
const error = defineModel('error', { default: '' });

const pinArray = computed({
  get: () => {
    const chars = String(modelValue.value || '').split('');
    return Array.from({ length: props.length }, (_, i) => chars[i] || '');
  },
  set: val => {
    modelValue.value = val.join('');
  },
});

const validate = () => {
  const val = modelValue.value || '';
  const isFilled = val.length === props.length && val.split('').every(c => c !== '');

  const schema = z
    .string()
    .refine(() => !props.required || isFilled, { message: 'Обязательное поле' })
    .refine(() => !props.matchValue || !isFilled || val === props.matchValue, {
      message: props.matchValueError || 'Значения не совпадают',
    });

  const result = schema.safeParse(val);
  if (!result.success) {
    return (error.value = result.error?.issues?.[0]?.message || 'Ошибка');
  }
  return (error.value = '');
};

watch(modelValue, newVal => {
  if (error.value) validate();
});

defineExpose({ validate });
</script>
