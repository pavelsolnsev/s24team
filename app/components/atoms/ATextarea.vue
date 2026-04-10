<template>
  <div data-atom="textarea" class="relative group text-16 lg:text-18">
    <label
      class="w-full transition flex flex-col gap-10 relative overflow-hidden rounded-16 bg-white px-16 py-20 lg:p-16"
      :class="[error && showError && !$attrs.readonly && 'shadow-border-red']"
    >
      <span class="text-12 text-gray-80" v-if="label">{{ label }}</span>
      <textarea
        ref="inputRef"
        v-model="inputValue"
        :readonly="$attrs.readonly"
        :required="$attrs.required"
        :placeholder="placeholder"
        :type="$attrs.type || ''"
        :rows="$attrs.rows || 3"
        :autocomplete="$attrs.autocomplete || 'off'"
        :name="$attrs.name"
        :maxlength="$attrs.maxlength"
        class="w-full transition peer focus:ring-0 focus:outline-none placeholder:text-gray-60 placeholder:opacity-100"
        :class="[$attrs.readonly && 'resize-none']"
        @blur="emits('blur')"
      />
      <slot name="icon" v-if="$slots.icon" />

      <div class="text-gray-60 self-end" v-if="$attrs.maxlength">
        {{ inputValue.length }} / {{ $attrs.maxlength }}
      </div>
    </label>

    <div
      data-class="textarea-error"
      class="transition text-red mt-10"
      v-if="error && showError && !$attrs.readonly"
    >
      {{ error }}
    </div>
  </div>
</template>
<script setup>
import { z } from 'zod';

const { validator } = defineProps({
  placeholder: { type: String, default: '' },
  showError: { type: Boolean, default: false },
  label: { type: String, default: '' },
  validator: { type: Object, default: null },
});

const error = defineModel('error', { default: '' });
const inputValue = defineModel({ default: '' });
const inputRef = ref(null);

const emits = defineEmits(['blur']);

const attrs = useAttrs();

const validate = newVal => {
  const val = newVal !== undefined ? newVal.trim() : inputValue.value.trim();
  const isEmpty = (val === undefined || val === null || val === '') && val !== 0;

  let schema = z.any().refine(() => !attrs.required || !isEmpty, {
    message: 'Обязательное поле',
  });

  if (validator) {
    schema = schema.and(validator);
  }

  const result = schema.safeParse(val);

  if (!result.success) {
    return (error.value = result.error?.issues?.[0]?.message || 'Ошибка');
  }
  return (error.value = '');
};

watch(inputValue, newVal => {
  if (error.value) validate(newVal);
});

const focusInput = () => {
  inputRef.value?.focus();
};

const blurInput = () => {
  inputRef.value?.blur();
};

defineExpose({
  focusInput,
  blurInput,
  validate,
});

onUnmounted(() => {
  if (error.value) error.value = '';
});
</script>
