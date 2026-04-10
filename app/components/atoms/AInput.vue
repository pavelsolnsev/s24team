<template>
  <div data-atom="input" class="relative group flex flex-col text-16 lg:text-18">
    <label
      class="w-full transition flex items-center relative overflow-hidden rounded-16 bg-white px-16 py-20 lg:p-16 gap-8"
      :class="[
        $attrs.inputWrapperClass,
        error && showError && !$attrs.readonly && 'shadow-border-red',
      ]"
    >
      <slot name="prev" />
      <span class="text-12 text-gray-80" v-if="label">{{ label }}</span>
      <input
        ref="inputRef"
        class="w-full transition peer resize-none focus:ring-0 focus:outline-none placeholder:text-gray-60 placeholder:opacity-100"
        :class="[$attrs.inputClass]"
        :value="localValue"
        :placeholder="placeholder"
        :type="$attrs.type || 'text'"
        v-maska="mask"
        :autocomplete="$attrs.autocomplete || 'off'"
        :name="$attrs.name"
        :readonly="$attrs.readonly"
        :required="$attrs.required"
        @input="inputHandler"
        @blur="emits('blur')"
      />
      <slot name="next" />
    </label>

    <div class="transition text-red mt-10" v-if="error && showError && !$attrs.readonly">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { z } from 'zod';
import { vMaska } from 'maska/vue';
import { useDebounceFn } from '@vueuse/core';
import {
  validateINNIndividual,
  validateSNILS,
  validateMilitaryID,
  validateDate,
  validateYear,
  validateMonthYear,
} from '#shared/utils/validation';

const { maska, delay, validator } = defineProps({
  placeholder: { type: String, default: '' },
  showError: { type: Boolean, default: false },
  maska: { type: String },
  delay: { type: Number, default: 0 },
  label: { type: String, default: '' },
  validator: { type: Object, default: null },
});

const error = defineModel('error', { default: '' });

const inputValue = defineModel({ default: '' });
const localValue = ref(inputValue.value);
const maskCompleted = defineModel('maskCompleted', { type: Boolean, default: false });

watch(inputValue, next => {
  localValue.value = next;
  emits('typing', !!next);
});

const inputRef = ref(null);
const emits = defineEmits(['update:maskCompleted', 'typing', 'blur']);

const mask = computed(() =>
  maska
    ? {
        mask: maska,
        eager: true,
        tokens: {
          '@': { pattern: /[а-яА-ЯёЁ]/, multiple: false },
          'N': { pattern: /\d/, multiple: true }, // только цифры
          'A': { pattern: /[a-zA-Z]/, multiple: true }, // только латинские буквы
          'L': { pattern: /[a-zA-Zа-яёА-ЯЁ]/, multiple: true }, // только буквы латиницы и кириллицы
        },
        onMaska: ({ completed }) => {
          maskCompleted.value = completed;
        },
      }
    : null,
);

const update = val => {
  inputValue.value = val;
};

const debounceFunc = useDebounceFn(val => {
  update(val);
}, delay);

const inputHandler = async e => {
  const val = e.target.value;
  localValue.value = val;
  emits('typing', !!val);
  await debounceFunc(localValue.value);
};

const attrs = useAttrs();

const validate = newVal => {
  const val = newVal !== undefined ? newVal.trim() : localValue.value.trim();
  const isEmpty = (val === undefined || val === null || val === '') && val !== 0;

  let schema = z
    .any()
    .refine(() => !attrs.required || !isEmpty, {
      message: 'Обязательное поле',
    })
    .refine(() => !maska || maskCompleted.value || isEmpty, {
      message: 'Неверный формат',
    })
    .refine(
      val => {
        if (attrs.type !== 'email' || isEmpty) return true;
        return z.email().safeParse(val).success;
      },
      {
        message: 'Неверный адрес электронной почты',
      },
    )
    .refine(
      val => {
        if (attrs.type !== 'url' || isEmpty) return true;
        return z.url().safeParse(val).success;
      },
      { message: 'Неверный формат ссылки' },
    )
    .refine(val => attrs.type !== 'year' || isEmpty || validateYear(val), {
      message: 'Некорректный год',
    })
    .refine(val => attrs.type !== 'year2' || isEmpty || validateYear(val, true), {
      message: 'Некорректный год',
    })
    .refine(val => attrs.type !== 'month-year' || isEmpty || validateMonthYear(val), {
      message: 'Некорректная дата',
    })
    .refine(val => attrs.type !== 'dates' || isEmpty || validateDate(val), {
      message: 'Некорректная дата',
    })
    .refine(val => attrs.type !== 'inn' || isEmpty || validateINNIndividual(val), {
      message: 'Неверный формат ИНН',
    })
    .refine(val => attrs.type !== 'snils' || isEmpty || validateSNILS(val), {
      message: 'Неверный номер СНИЛС',
    })
    .refine(val => attrs.type !== 'military' || isEmpty || validateMilitaryID(val), {
      message: 'Неверный формат номера военного билета',
    })
    .refine(val => !attrs.matchValue || isEmpty || val === attrs.matchValue, {
      message: attrs.matchError || 'Значения не совпадают',
    })
    .refine(val => !attrs.minlength || isEmpty || val.length >= Number(attrs.minlength), {
      message: attrs.minlengthError || `Минимум ${attrs.minlength} символов`,
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

watch(localValue, newVal => {
  if (error.value) validate(newVal);
});

onMounted(() => {
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.dispatchEvent(new Event('input'));
    }
  });
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
