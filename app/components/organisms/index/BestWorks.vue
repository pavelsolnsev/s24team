<template>
  <section class="pt-80 pb-40 flex flex-col gap-40">
    <div class="flex justify-between items-center">
      <h2 class="text-36 lg:text-48 font-medium -tracking-[0.01em]">
        Лучшие работы прошедшей недели
      </h2>

      <div class="lg:flex gap-9 items-center hidden">
        <SwiperControl @click="slidePrev" :disabled="isFirstVisible" />
        <SwiperControl dir="next" @click="slideNext" :disabled="isLastVisible" />
      </div>
    </div>

    <div class="max-w-dvw -mx-20 lg:-mx-40">
      <div ref="containerRef" class="swiper overflow-hidden">
        <div class="swiper-wrapper">
          <ProjectCard
            v-for="item in data.items"
            :key="item.id"
            :item="item"
            img-class="h-358 lg:h-450"
            class="swiper-slide h-auto! w-320! lg:w-908!"
          />
        </div>
      </div>

      <SwiperScrollbar ref="scrollbarRef" class="lg:hidden mx-20 mt-10" />
    </div>
  </section>
</template>
<script setup>
import SwiperControl from '~/components/molecules/_common/SwiperControl.vue';
import SwiperScrollbar from '~/components/molecules/_common/SwiperScrollbar.vue';
import ProjectCard from '~/components/molecules/_common/ProjectCard.vue';
import data from '#shared/mocks/best.json';

const { containerRef, scrollbarRef, isFirstVisible, isLastVisible, slideNext, slidePrev } =
  useSwiperBase({
    slidesPerView: 'auto',
    spaceBetween: 10,
    scrollbar: true,
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    observer: true,
    observeParents: true,
    resizeObserver: true,
    breakpoints: {
      991: {
        loop: true,
        spaceBetween: 20,
      },
    },
  });
</script>
