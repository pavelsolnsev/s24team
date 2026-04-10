<template>
  <section
    class="flex flex-col gap-16 lg:flex-row lg:justify-between bg-purple px-20 py-16 lg:px-26 lg:py-12 -mx-20 lg:-mx-40 rounded-b-24 text-white"
  >
    <div class="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-20">
      <IconLogoStar class="size-36" />
      <div class="text-20 lg:text-24">
        Размещай свои работы, собирай портфолио и развивайся вместе с другими творцами
      </div>
    </div>

    <AButton theme="lightpurple" class="rounded-30 overflow-hidden h-44">
      <NuxtLink
        :to="{ name: 'project-add' }"
        class="flex justify-center items-center h-full lg:px-32 w-full whitespace-nowrap"
      >
        Cоздать портфолио бесплатно
      </NuxtLink>
    </AButton>
  </section>
</template>
<script setup>
import IconLogoStar from '~/svg/_common/logo-star.svg';
import AButton from '~/components/atoms/AButton.vue';
</script>
