<template>
  <section class="py-40 flex flex-col gap-20 lg:gap-40">
    <div class="flex justify-between items-center">
      <h2 class="text-36 lg:text-48 leading-[1.1] lg:leading-[1.2] font-medium -tracking-[0.01em]">
        Интересно знать
      </h2>

      <div class="lg:flex gap-9 items-center hidden">
        <SwiperControl @click="slidePrev" :disabled="isFirstVisible" />
        <SwiperControl dir="next" @click="slideNext" :disabled="isLastVisible" />
      </div>
    </div>

    <div class="max-w-dvw -mx-20 lg:mx-0">
      <div ref="containerRef" class="swiper overflow-hidden">
        <div class="swiper-wrapper">
          <ArticleCard
            v-for="item in items"
            :key="item.id"
            :item="item"
            image-size="w-full h-121 lg:w-186 lg:h-261"
            class="swiper-slide h-328! lg:h-309! max-[990px]:!w-320 lg:w-auto h-full"
          />
        </div>
      </div>

      <SwiperScrollbar ref="scrollbarRef" class="lg:hidden mx-20 mt-10" />
    </div>

    <div class="flex justify-center">
      <AButton theme="black" class="rounded-30 overflow-hidden h-56 px-40">
        <NuxtLink :to="{ name: 'articles' }"> Смотреть больше </NuxtLink>
      </AButton>
    </div>
  </section>
</template>

<script setup>
import data from '#shared/mocks/interesting.json';
import ArticleCard from '~/components/molecules/_common/ArticleCard.vue';
import AButton from '~/components/atoms/AButton.vue';
import SwiperControl from '~/components/molecules/_common/SwiperControl.vue';
import SwiperScrollbar from '~/components/molecules/_common/SwiperScrollbar.vue';

const items = computed(() => data.items);

const { containerRef, scrollbarRef, isFirstVisible, isLastVisible, slideNext, slidePrev } =
  useSwiperBase({
    slidesPerView: 'auto',
    spaceBetween: 10,
    scrollbar: true,
    loop: false,
    grabCursor: true,
    centeredSlides: true,
    observer: true,
    observeParents: true,
    resizeObserver: true,
    breakpoints: {
      991: {
        loop: false,
        centeredSlides: false,
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
</script>
