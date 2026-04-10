<template>
  <section
    class="w-full lg:w-598 mt-20 mb-40 bg-gray-10 px-16 lg:px-24 py-24 lg:py-40 rounded-16 overflow-hidden"
  >
    <Transition
      mode="out-in"
      enter-active-class="transition-[opacity,transform] duration-200 ease-in-out"
      leave-active-class="transition-[opacity,transform] duration-150 ease-in-out"
      enter-from-class="opacity-0 translate-x-8"
      leave-to-class="opacity-0 -translate-x-8"
    >
      <component
        :key="step.component"
        :is="step.component"
        v-model="data"
        :step-error="stepError"
        :time-out="step.timeOut"
        :is-pending="isPending"
        @done="handleDone"
        @resend="handleResend"
      >
        <template v-if="step.component === StepEmail" #oauth="{ disabled }">
          <SocialButton
            icon="yandex"
            :disabled="disabled"
            @click="handleOAuth({ provider: 'yandex' })"
          >
            Регистрация с Яндекс ID
          </SocialButton>

          <SocialButton icon="vk" :disabled="disabled" @click="handleOAuth({ provider: 'vk' })">
            Регистрация с VK ID
          </SocialButton>
        </template>
      </component>
    </Transition>
  </section>
</template>

<script setup>
import { useRegistrationWizard } from '~/composables/useRegistrationWizard.js';
import SocialButton from '~/components/molecules/_common/SocialButton.vue';
import StepEmail from '~/components/molecules/auth/StepEmail.vue';

const { step, data, stepError, isPending, handleDone, handleResend, handleOAuth } =
  useRegistrationWizard();
</script>
