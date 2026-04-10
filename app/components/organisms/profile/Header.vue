<template>
  <div v-if="profile" class="flex flex-col gap-20 pt-40 lg:pt-0 pb-40">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-20">
      <MainTile :profile="profile" class="lg:col-span-2" :is-my-profile="isMyProfile" />

      <AboutTile :title="about.name" class="hidden lg:flex">
        {{ about.content }}
      </AboutTile>
    </div>

    <ACollapse
      class="lg:hidden"
      :item="about"
      :is-open="aboutOpen"
      @click="aboutOpen = !aboutOpen"
    />

    <div v-if="isCreator" class="grid grid-cols-3 gap-10 lg:gap-20">
      <Tile
        v-for="tile in creatorTiles"
        :key="tile.text"
        v-bind="tile"
        text-class="max-w-82 lg:max-w-160"
      />
    </div>

    <div v-if="isExpert" class="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-20">
      <Tile
        v-for="tile in expertTiles"
        :key="tile.text"
        v-bind="tile"
        text-class="max-w-100 lg:max-w-160"
      />
    </div>
  </div>
</template>

<script setup>
import Tile from '~/components/molecules/profile/Tile.vue';
import ACollapse from '~/components/atoms/ACollapse.vue';
import MainTile from '~/components/molecules/profile/MainTile.vue';
import AboutTile from '~/components/molecules/profile/AboutTile.vue';

const { profile } = defineProps({
  profile: {
    type: [Object, null],
    default: null,
  },
  isMyProfile: {
    type: Boolean,
    default: false,
  },
});

const isCreator = computed(() => profile?.role === 'creator');
const isExpert = computed(() => profile?.role === 'expert');

const creatorTiles = computed(() => [
  {
    title: profile?.countExpertRatings,
    image: '/images/profile/tile-rated.webp',
    text: 'Оценок от экпертов',
  },
  {
    title: profile?.countProjects,
    image: '/images/profile/tile-projects.webp',
    text: 'Количество работ',
  },
  {
    title: profile?.likes,
    image: '/images/profile/tile-likes.webp',
    text: 'Количество лайков',
  },
]);

const expertTiles = computed(() => [
  {
    title: profile?.countRatedProjects,
    text: 'Оценено работ',
    image: '/images/profile/tile-rated.webp',
  },
  {
    title: profile?.countProjects,
    text: 'Работ в портфолио',
    image: '/images/profile/tile-projects.webp',
  },
  {
    title: profile?.likes,
    text: 'Количество лайков',
    image: '/images/profile/tile-likes.webp',
  },
  {
    title: profile?.countArticles,
    text: 'Количество статей',
    image: '/images/profile/tile-articles.webp',
  },
]);

const aboutOpen = ref(false);

const about = computed(() => {
  return {
    name: 'О себе',
    content: (profile?.about || '').slice(0, 1000) + (profile?.about?.length > 1000 ? '...' : ''),
  };
});
</script>
