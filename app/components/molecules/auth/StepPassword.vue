<template>
  <StepTemplate
    :title="props.title"
    :title-class="props.titleClass"
    :subtitle="props.subtitle"
    @submit="submit"
  >
    <div class="flex flex-col gap-10 lg:gap-20">
      <component
        :is="item.component"
        v-for="item in form"
        :key="item.name"
        v-model="item.value"
        v-model:error="item.error"
        v-bind="getFieldProps(item)"
      />
    </div>

    <AButton
      theme="black"
      class="w-full h-60 rounded-full text-18 lg:text-20 leading-[1.3] lg:leading-[1.4] -tracking-[0.01em]"
      :disabled="props.isPending"
      :loading="props.isPending"
      type="submit"
    >
      {{ props.submitLabel }}
    </AButton>
  </StepTemplate>
</template>

<script setup>
import { useForm } from '#imports';
import AInputPassword from '~/components/atoms/AInputPassword.vue';
import AButton from '~/components/atoms/AButton.vue';
import StepTemplate from '~/components/molecules/auth/StepTemplate.vue';

defineModel({ type: Object, required: true });
const emit = defineEmits(['done']);
const props = defineProps({
  isPending: { type: Boolean, default: false },
  stepError: { type: String, default: null },
  title: { type: String, default: 'Придумайте пароль' },
  titleClass: { type: String, default: '' },
  subtitle: { type: String, default: 'Пароль должен быть не короче 12 символов' },
  submitLabel: { type: String, default: 'Зарегистрироваться' },
});

const form = ref([
  {
    name: 'password',
    placeholder: 'Пароль',
    component: markRaw(AInputPassword),
    value: '',
    required: true,
    error: '',
    api: 'password',
    showError: true,
    autocomplete: 'new-password',
    inputWrapperClass: 'h-56 text-18 leading-[1.3] -tracking-[0.01em]',
    minlength: 12,
    minlengthError: 'Пароль должен быть не короче 12 символов',
  },
  {
    name: 'passwordConfirm',
    placeholder: 'Повторите пароль',
    component: markRaw(AInputPassword),
    value: '',
    required: true,
    error: '',
    api: 'passwordConfirm',
    showError: true,
    autocomplete: 'new-password',
    inputWrapperClass: 'h-56 text-18 leading-[1.3] -tracking-[0.01em]',
    minlength: 12,
    minlengthError: 'Пароль должен быть не короче 12 символов',
    matchName: 'password',
    matchError: 'Пароли не совпадают',
  },
]);

const { getData, getFieldProps } = useForm(form);

watch(
  () => props.stepError,
  err => {
    form.value[0].error = err ?? '';
  },
);

const submit = async () => {
  const formData = await getData();
  if (!formData) return;

  emit('done', { password: formData.password });
};
</script>
