<template>
  <section class="flex flex-col gap-20 pb-40">
    <div class="grid gap-20 grid-cols-1 lg:grid-cols-3">
      <NuxtLink
        v-for="collection in collections.items"
        :key="collection.id"
        :to="{ name: 'collections-id', params: { id: collection.id } }"
        class="flex flex-col gap-16"
      >
        <div
          class="w-full h-202 lg:h-298 rounded-16 grid gap-8 lg:gap-16 grid-cols-2 grid-rows-2 grid-flow-col p-8 lg:p-16 bg-gray-10"
        >
          <NuxtImg
            v-for="project in collection.projects?.slice(0, 4)"
            :key="project.id"
            :src="project.image"
            class="w-full h-full object-cover object-center rounded-16"
          />
          <div
            v-for="i in Math.max(0, 4 - (collection.projects?.length || 0))"
            :key="`empty-${i}`"
            class="w-full h-full rounded-16 bg-white"
          />
        </div>
        <div class="flex flex-col">
          <div class="text-20 leading-[1.2] lg:leading-[1.6] -tracking-[0.01em] font-medium">
            {{ collection.name }}
          </div>
          <p class="text-16 lg:text-18 leading-[1.2] lg:leading-[1.3] text-gray-60">
            {{ totalProjectsText(Number(collection.totalProjects)) }}
          </p>
        </div>
      </NuxtLink>
    </div>
    <CreateCollectionButton class="flex lg:hidden" />
  </section>
</template>

<script setup>
import CreateCollectionButton from '~/components/molecules/collections/CreateCollectionButton.vue';
import collections from '#shared/mocks/collections.json';
import useUtils from '~/composables/useUtils.js';
const { pluralNumber } = useUtils();

const totalProjectsText = totalProjects =>
  pluralNumber(totalProjects, ['работа cохранена', 'работы сохранено', 'работ сохранено']);
</script>
