<template>
  <StepTemplate :title="props.title" @submit="submit">
    <component
      :is="item.component"
      v-for="(item, index) in form"
      :key="item.name"
      v-model="item.value"
      v-model:error="item.error"
      v-bind="getFieldProps(item)"
      :class="{ 'lg:mt-20': index === 0 }"
    />

    <AButton
      theme="black"
      :disabled="!consent || props.isPending"
      :loading="props.isPending"
      class="w-full h-60 rounded-full text-18 lg:text-20 leading-[1.3] lg:leading-[1.4] -tracking-[0.01em]"
      type="submit"
    >
      {{ props.submitLabel }}
    </AButton>

    <ConsentCheckbox v-model="consent" />

    <div v-if="$slots.oauth" class="flex flex-col gap-10 lg:gap-20 lg:pt-20">
      <slot name="oauth" :disabled="!consent || props.isPending" />
    </div>
  </StepTemplate>
</template>

<script setup>
import { useForm } from '#imports';
import StepTemplate from '~/components/molecules/auth/StepTemplate.vue';
import AInput from '~/components/atoms/AInput.vue';
import AButton from '~/components/atoms/AButton.vue';
import ConsentCheckbox from '~/components/molecules/_common/ConsentCheckbox.vue';

defineModel({ type: Object, required: true });
const emit = defineEmits(['done']);
const props = defineProps({
  isPending: { type: Boolean, default: false },
  stepError: { type: String, default: null },
  title: { type: String, default: 'Регистрация' },
  submitLabel: { type: String, default: 'Зарегистрироваться' },
});

const form = ref([
  {
    name: 'email',
    placeholder: 'Email',
    component: markRaw(AInput),
    type: 'email',
    value: '',
    required: true,
    error: '',
    api: 'email',
    showError: true,
    autocomplete: 'email',
    inputWrapperClass: 'h-56 text-18 leading-[1.3] -tracking-[0.01em]',
  },
]);

const { getData, getFieldProps } = useForm(form);

const consent = ref(true);

watch(
  () => props.stepError,
  err => {
    form.value[0].error = err ?? '';
  },
);

const submit = async () => {
  const formData = await getData();
  if (!formData) return;

  emit('done', { email: formData.email });
};
</script>
