<template>
  <section
    class="absolute top-full left-0 w-full flex flex-col p-20 gap-32 shadow-top bg-white rounded-16"
  >
    <div class="flex flex-col gap-10" v-if="list?.length">
      <AButton theme="gray" class="rounded-16 overflow-hidden" v-for="item in list" :key="item.id">
        <NuxtLink :to="item.route" class="flex w-full items-center justify-start h-56 px-24">
          {{ item.name }}
        </NuxtLink>
      </AButton>
    </div>

    <AddButton />
  </section>
</template>
<script setup>
import AButton from '~/components/atoms/AButton.vue';
import AddButton from '~/components/molecules/layout/AddButton.vue';

defineProps({
  list: { type: Array, default: () => [] },
});
</script>
