<template>
  <section
    class="bg-primary px-20 pb-20 pt-40 lg:px-40 lg:pt-70 lg:pb-40 -mt-20 -mx-20 lg:-mt-30 lg:-mx-40 text-white relative"
  >
    <div class="flex flex-col lg:items-start gap-286 lg:gap-55 max-w-811 relative z-1">
      <div
        class="flex flex-col gap-10 leading-none lg:block lg:leading-[1.1] font-medium text-40 lg:text-56"
      >
        Пространство для творчества, роста
        <span class="text-20 font-normal leading-[1.2] lg:leading-[1.1] lg:text-56 lg:font-medium">
          и первых профессиональных возможностей
        </span>
      </div>
      <AButton class="rounded-30 h-56 lg:h-60 text-20 overflow-hidden" theme="purple">
        <NuxtLink
          :to="{ name: 'index', hash: '#gallery' }"
          class="flex justify-center items-center h-full px-40 w-full"
        >
          Смотреть работы
        </NuxtLink>
      </AButton>
    </div>

    <NuxtImg
      src="/images/index/intro-d.webp"
      class="absolute top-0 left-0 w-full h-full object-cover hidden lg:block"
      :preload="{ fetchPriority: 'high' }"
      alt=""
    />

    <NuxtImg
      src="/images/index/intro-m.webp"
      class="absolute top-0 left-0 w-full h-full object-cover lg:hidden"
      :preload="{ fetchPriority: 'high' }"
      alt=""
    />
  </section>
</template>
<script setup>
import AButton from '~/components/atoms/AButton.vue';
</script>
