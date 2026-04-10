<template>
  <form
    class="lg:w-598 mt-20 mb-40 flex flex-col gap-20 bg-gray-10 px-16 lg:px-24 py-24 lg:py-40 rounded-16"
    @submit.prevent="submit"
  >
    <h2
      class="text-32 lg:text-40 leading-[1.1] lg:leading-[1.2] -tracking-[0.01em] font-medium text-center"
    >
      Войти в профиль
    </h2>

    <component
      :is="item.component"
      v-for="item in form"
      :key="item.name"
      v-model="item.value"
      v-model:error="item.error"
      v-bind="getFieldProps(item)"
    />

    <AButton
      theme="black"
      :disabled="isPending"
      :loading="isPending"
      class="w-full h-60 rounded-full text-18 lg:text-20 leading-[1.3] lg:leading-[1.4] -tracking-[0.01em]"
      type="submit"
    >
      Войти
    </AButton>

    <NuxtLink
      :to="{ name: 'password' }"
      class="text-16 lg:text-18 leading-[1.2] lg:leading-[1.3] -tracking-[0.01em] text-center text-gray-60"
    >
      Забыли пароль?
    </NuxtLink>

    <div class="flex flex-col gap-10 lg:gap-20">
      <SocialButton
        icon="yandex"
        :disabled="isPending"
        @click="handleOAuth({ provider: 'yandex' })"
      >
        Войти с Яндекс ID
      </SocialButton>

      <SocialButton icon="vk" :disabled="isPending" @click="handleOAuth({ provider: 'vk' })">
        Войти с VK ID
      </SocialButton>
    </div>
  </form>
</template>

<script setup>
import { useForm } from '#imports';
import AInput from '~/components/atoms/AInput.vue';
import AInputPassword from '~/components/atoms/AInputPassword.vue';
import AButton from '~/components/atoms/AButton.vue';
import SocialButton from '~/components/molecules/_common/SocialButton.vue';
import { useLoginForm } from '~/composables/useLoginForm.js';

const { formError, isPending, handleSubmit, handleOAuth } = useLoginForm();

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
  {
    name: 'password',
    placeholder: 'Пароль',
    component: markRaw(AInputPassword),
    value: '',
    required: true,
    error: '',
    api: 'password',
    showError: true,
    autocomplete: 'current-password',
    inputWrapperClass: 'h-56 text-18 leading-[1.3] -tracking-[0.01em]',
  },
]);

const { getData, getFieldProps } = useForm(form);

const submit = async () => {
  const data = await getData();
  if (!data) return;
  await handleSubmit(data);
  form.value[1].error = formError.value ?? '';
};
</script>
