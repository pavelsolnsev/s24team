<template>
  <div>
    <div v-if="articleItems.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
      <ArticleCard
        v-for="item in articleItems"
        :key="item.id"
        :item="item"
        image-size="w-full h-121 lg:size-186"
      />
    </div>
    <Dummy v-else>У этого пользователя пока что нет статей</Dummy>
  </div>
</template>

<script setup>
import ArticleCard from '~/components/molecules/_common/ArticleCard.vue';
import Dummy from '~/components/molecules/_common/Dummy.vue';
import articles from '#shared/mocks/articles.json';
import { useRoute } from 'vue-router';

const route = useRoute();

const articleItems = computed(() => (route.params.id === '123456' ? [] : articles.items));
</script>
