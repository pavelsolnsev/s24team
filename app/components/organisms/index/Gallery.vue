<template>
  <section class="py-40 lg:pb-80 flex flex-col gap-20 lg:gap-40">
    <h2 class="text-36 lg:text-48 leading-[1.1] lg:leading-[1.2] font-medium -tracking-[0.01em]">
      Галерея работ
    </h2>

    <Filters v-model="filters" />

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-x-20 gap-y-20 lg:gap-y-40">
      <ProjectCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        img-class="h-255 lg:h-358 transition-transform duration-300 group-hover:scale-115"
      />
    </div>

    <ALoader class="mx-auto" />
  </section>
</template>

<script setup>
import Filters from '~/components/molecules/index/Filters.vue';
import ProjectCard from '~/components/molecules/_common/ProjectCard.vue';
import ALoader from '~/components/atoms/ALoader.vue';
import data from '#shared/mocks/gallery.json';

const filters = ref(
  data.filters.map(i => {
    if (i.default) i.value = i.default;
    return i;
  }),
);

const items = computed(() => data.items.slice(0, 20));

watch(
  filters,
  next => {
    console.log(next);
  },
  { deep: true },
);
</script>
