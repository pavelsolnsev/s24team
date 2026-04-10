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
        v-bind="step.props"
        @done="handleDone"
        @resend="handleResend"
      />
    </Transition>
  </section>
</template>

<script setup>
import { useRecoveryWizard } from '~/composables/useRecoveryWizard.js';

const { step, data, stepError, isPending, handleDone, handleResend } = useRecoveryWizard();
</script>
