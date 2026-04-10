<template>
  <div>
    <div
      v-if="projectItems.length > 0"
      class="grid gap-20"
      :class="[isMyProfile ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-4']"
    >
      <ProjectCard
        v-for="item in projectItems"
        :key="item.id"
        :item="item"
        img-class="h-255 lg:h-358 transition-transform duration-300 group-hover:scale-115"
      />
    </div>
    <Dummy v-else>У этого пользователя пока что нет работ</Dummy>
  </div>
</template>

<script setup>
import ProjectCard from '~/components/molecules/_common/ProjectCard.vue';
import Dummy from '~/components/molecules/_common/Dummy.vue';
import projects from '#shared/mocks/gallery.json';
import { useRoute } from 'vue-router';

defineProps({
  isMyProfile: { type: Boolean, default: false },
});

const route = useRoute();

const projectItems = computed(() =>
  route.params.id === '123456' ? [] : projects.items.slice(0, 20),
);
</script>
