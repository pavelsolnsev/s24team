<template>
  <section
    class="my-40 p-20 lg:pt-24 lg:pb-44 lg:pl-24 lg:pr-34 relative overflow-hidden rounded-8 lg:rounded-16 text-white bg-black"
  >
    <div
      v-if="data.links?.length > 0"
      class="relative z-1 self-start flex flex-col lg:flex-row lg:flex-nowrap lg:items-stretch lg:justify-between items-start gap-20"
    >
      <div class="flex flex-col gap-10">
        <div
          class="text-32 lg:text-48 leading-[1.1] lg:leading-[1.2] -tracking-[0.01em] font-medium lg:max-w-800"
        >
          {{ data.name }}
        </div>
        <div class="text-18 lg:text-24 leading-[1.3] -tracking-[0.01em] max-w-173 lg:max-w-full">
          {{ data.description }}
        </div>
      </div>
      <div
        class="flex flex-col gap-10 lg:gap-21 w-full lg:w-auto lg:pt-17 text-18 lg:text-20 lg:shrink-0"
        :class="[data.links.length > 1 ? 'lg:justify-start' : 'lg:justify-end']"
      >
        <AButton
          v-for="(link, i) in data.links"
          :key="link.url"
          :theme="i === 0 ? 'purple' : 'darkgray'"
          class="rounded-30 overflow-hidden h-44 lg:h-60 w-full"
        >
          <NuxtLink :to="link.url" class="flex justify-center items-center h-full px-40 w-full">
            {{ link.label }}
          </NuxtLink>
        </AButton>
      </div>
    </div>

    <NuxtImg
      :src="data.imageDesktop"
      class="absolute top-0 right-0 w-full h-full object-cover hidden lg:block"
      loading="lazy"
      alt=""
    />
    <NuxtImg
      :src="data.imageMobile"
      class="absolute top-0 right-0 w-full h-full object-cover lg:hidden"
      loading="lazy"
      alt=""
    />
  </section>
</template>

<script setup>
import AButton from '~/components/atoms/AButton.vue';
import data from '#shared/mocks/platform.json';

// { "url": "/about", "label": "О платформе" }
</script>
