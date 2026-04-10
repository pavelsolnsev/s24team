<template>
  <section class="py-40 lg:pb-80 flex flex-col gap-20">
    <div class="flex flex-col lg:flex-row items-start lg:justify-between gap-20">
      <div v-if="collection" class="flex flex-col gap-8">
        <h1 class="text-36 lg:text-48 leading-[1.1] -tracking-[0.01em] font-medium">
          {{ collection.name }}
        </h1>
        <p class="text-gray-60 text-18 lg:text-24 leading-[1.3] -tracking-[0.01em]">
          {{ totalProjectsText }}
        </p>
      </div>
      <h2
        v-else
        class="text-36 lg:text-40 leading-[1.1] lg:leading-[1.2] font-medium -tracking-[0.01em]"
      >
        Все сохраненные работы
      </h2>
      <DeleteCollectionButton v-if="collection" :collection="collection" />
    </div>

    <TransitionGroup
      v-if="items.length"
      tag="div"
      class="grid grid-cols-1 lg:grid-cols-3 gap-20"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-x-4"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-4"
      move-class="transition-all duration-300"
    >
      <ProjectCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        :collection-id="collection?.id"
        img-class="h-254 lg:h-354 transition-transform duration-300 group-hover:scale-115"
        @remove-collection="removeFromCollection"
      />
    </TransitionGroup>
    <Dummy v-else>В этой подборке пока что нет работ</Dummy>
  </section>
</template>

<script setup>
import DeleteCollectionButton from '~/components/molecules/collections/DeleteCollectionButton.vue';
import ProjectCard from '~/components/molecules/_common/ProjectCard.vue';
import Dummy from '~/components/molecules/_common/Dummy.vue';
import projectsMock from '#shared/mocks/gallery.json';
import useUtils from '~/composables/useUtils.js';

const { pluralNumber, cloneDeep } = useUtils();

const projects = ref(cloneDeep(projectsMock.items));

const { collection } = defineProps({
  collection: {
    type: Object,
    default: undefined,
  },
});

const items = computed(() =>
  projects.value.filter(
    item =>
      item.collections?.length > 0 &&
      (collection?.id ? item.collections.includes(collection?.id) : true),
  ),
);

const deleteCollection = () => {
  console.log('[BACKEND] Delete collection #', collection?.id);
};

// TODO: удалить после интеграции с бэкендом
const totalProjects = ref(Number(collection?.totalProjects) || 0);

const totalProjectsText = computed(() =>
  pluralNumber(totalProjects.value, ['работа сохранена', 'работы сохранены', 'работ сохранено']),
);

const removeFromCollection = ({ project_id, collection_id }) => {
  projects.value.forEach(item => {
    if (item.id === project_id) {
      item.collections = item.collections.filter(id => id !== collection_id);
      totalProjects.value--;
    }
  });
};
</script>
