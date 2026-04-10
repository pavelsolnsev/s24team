<template>
  <div class="h-118 lg:h-185 rounded-8 lg:rounded-24 bg-gray-10 overflow-hidden min-h-0 relative">
    <div class="z-1 flex flex-col justify-between gap-10 lg:gap-20 p-7 lg:p-16 w-full h-full">
      <div
        v-if="title"
        class="text-32 lg:text-56 leading-[1.1] -tracking-[0.01em] font-medium text-gray-60"
      >
        {{ title }}
      </div>
      <div
        v-if="text"
        class="text-14 lg:text-24 leading-[1.4] lg:leading-[1.3] -tracking-[0.01em] text-gray-80 lg:max-w-160 break-words"
        :class="[textClass]"
      >
        {{ text }}
      </div>
    </div>
    <NuxtImg
      v-if="image"
      :src="image"
      alt=""
      class="absolute bottom-0 right-0 w-auto h-full object-cover hidden lg:block"
      loading="lazy"
    />
  </div>
</template>

<script setup>
const { title, text, textClass } = defineProps({
  title: { type: [String, Number], default: '' },
  text: { type: [String, Number], default: '' },
  image: { type: String, default: '' },
  textClass: { type: String, default: '' },
});
</script>
