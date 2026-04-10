<template>
  <ACheckbox
    trigger="default"
    name="consent"
    class="items-start gap-10 lg:gap-20 text-gray-60"
    triggerClass="mt-2 shrink-0"
    labelClass="text-12 leading-[1.3] -tracking-[0.01em] font-light max-w-220 lg:max-w-450"
    v-bind="$attrs"
  >
    Я даю согласие на обработку моих персональных данных в соответствии с
    <NuxtLink to="#" class="underline underline-offset-2 hover:no-underline">
      Политикой конфиденциальности
    </NuxtLink>
    и
    <NuxtLink to="#" class="underline underline-offset-2 hover:no-underline">
      Пользовательским соглашением</NuxtLink
    >.
  </ACheckbox>
</template>

<script setup>
import ACheckbox from '~/components/atoms/ACheckbox.vue';
</script>
