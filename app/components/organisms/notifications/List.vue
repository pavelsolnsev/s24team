<template>
  <section class="flex flex-col gap-20 pt-20 lg:pt-40 pb-40 lg:pb-80">
    <Filters v-model="filters" />

    <div class="flex flex-col gap-10 lg:gap-20">
      <NuxtLink
        v-for="item in data.items"
        :to="{ name: 'notifications-id', params: { id: item.id } }"
        :key="item.id"
        class="h-105 lg:h-115 rounded-16 bg-gray-10 p-16 lg:p-24 flex flex-nowrap items-stretch gap-10 lg:gap-20 overflow-hidden hover:bg-gray-20 transition-colors duration-300"
      >
        <div class="shrink-0">
          <NotificationsIcon :icon="item.icon" class="size-49 lg:size-67" />
        </div>
        <div class="flex flex-col gap-5 justify-between grow">
          <div class="relative lg:flex lg:items-center">
            <span
              class="text-20 font-medium leading-[1.2] lg:leading-[1.6] -tracking-[0.01em] line-clamp-2 hyphens-auto"
              :class="[!item.is_read && 'pr-15 lg:pr-0']"
            >
              {{ item.title }}
            </span>
            <span
              v-if="!item.is_read"
              class="absolute right-0 top-0 lg:static lg:shrink-0 lg:ml-15 size-10 bg-purple rounded-full"
            />
          </div>
          <p
            class="text-16 font-light leading-[1.2] -tracking-[0.01em] text-gray-80 line-clamp-1 break-all"
          >
            {{ item.preview }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
import Filters from '~/components/molecules/notifications/Filters.vue';
import NotificationsIcon from '~/components/molecules/notifications/Icon.vue';
import data from '#shared/mocks/notifications.json';

const filters = ref(data.filters);
</script>
