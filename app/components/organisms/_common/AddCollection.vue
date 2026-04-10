<template>
  <section
    class="flex flex-col gap-20 w-full bg-gray-10 p-16 lg:p-20 max-w-[calc(100dvw-40px)] lg:min-w-695 rounded-20 text-16 lg:text-18 max-h-[calc(100dvh-40px)]"
  >
    <div class="flex items-center gap-30 justify-between">
      <h3 class="font-medium text-24 leading-[1.1] lg:leading-[1.3] -tracking-[0.01em]">
        Добавить в подборку
      </h3>
      <IconCross class="cursor-pointer size-37.5 text-gray-60" @click="emits('close')" />
    </div>

    <OverlayScrollbars
      v-if="collections?.items?.length"
      element="div"
      :options="{
        scrollbars: { autoHide: 'scroll', visibility: 'auto' },
        overflow: { x: 'hidden' },
      }"
      class="overflow-y-auto min-h-0 os-scroll os-scroll-outside"
    >
      <div class="flex flex-col gap-20">
        <a
          v-for="collection in collections.items"
          :key="collection.id"
          href="#"
          class="flex flex-nowrap items-center gap-20 p-16 lg:py-24 rounded-16 bg-white ring-1 ring-inset"
          :class="isInCollection(collection.id) ? 'ring-green-600' : 'ring-white'"
          @click.prevent="toggleCollection(collection.id)"
        >
          <Transition
            mode="out-in"
            enter-active-class="transition duration-200 ease-out"
            leave-active-class="transition duration-150 ease-in"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
          >
            <NuxtImg
              v-if="collection.projects[0]?.image"
              :key="collection.projects[0].id"
              :src="collection.projects[0].image"
              :alt="collection.name"
              class="size-64 rounded-16 shrink-0"
            />
            <div v-else key="placeholder" class="size-64 rounded-16 bg-gray-20 shrink-0"></div>
          </Transition>
          <div class="flex flex-col flex-1 min-w-0">
            <span
              class="text-20 leading-[1.2] lg:leading-[1.6] -tracking-[0.01em] font-medium truncate"
            >
              {{ collection.name }}
            </span>
            <span
              class="text-16 lg:text-18 leading-[1.2] lg:leading-[1.3] -tracking-[0.01em] text-gray-60 truncate"
            >
              {{ totalProjectsText(Number(collection.totalProjects)) }}
            </span>
          </div>
          <Transition
            mode="out-in"
            enter-active-class="transition duration-200 ease-out"
            leave-active-class="transition duration-150 ease-in"
            enter-from-class="opacity-0 rotate-90 scale-50"
            leave-to-class="opacity-0 -rotate-90 scale-50"
          >
            <IconCheck
              v-if="isInCollection(collection.id)"
              key="check"
              class="hidden lg:block size-38 shrink-0 text-green-600"
            />
            <IconPlus v-else key="plus" class="hidden lg:block size-38 shrink-0" />
          </Transition>
        </a>
      </div>
    </OverlayScrollbars>

    <div class="flex flex-col lg:flex-row gap-8 lg:gap-20 w-full text-18 lg:text-20">
      <AButton
        class="w-full rounded-30 h-56"
        theme="black"
        :disabled="!collectionIds?.length"
        @click="applyValue"
      >
        Добавить
      </AButton>
      <AButton class="w-full rounded-30 h-56" theme="white" @click="create">
        <div class="flex items-center justify-center gap-10">
          <span>Создать новую</span>
          <IconAddSquare class="size-16 shrink-0" />
        </div>
      </AButton>
    </div>
  </section>
</template>

<script setup>
import IconCross from '~/svg/_common/cross.svg';
import IconPlus from '~/svg/_common/plus.svg';
import IconCheck from '~/svg/_common/check.svg';
import IconAddSquare from '~/svg/_common/add-square.svg';
import AButton from '~/components/atoms/AButton.vue';
import collections from '#shared/mocks/collections.json';
import { useAuthStore } from '~/store/auth.js';
import useUtils from '~/composables/useUtils.js';

const { user } = storeToRefs(useAuthStore());
const { pluralNumber } = useUtils();

const { item } = defineProps({
  item: { type: Object, required: true },
});

const collectionIds = ref(item.collections || []);
const emits = defineEmits(['close', 'create']);

const toggleCollection = collectionId => {
  const collection = collections.items.find(collection => collection.id === collectionId);
  if (!collection) return;
  if (collectionIds.value.includes(collectionId)) {
    collectionIds.value = collectionIds.value.filter(id => id !== collectionId);
    collection.totalProjects--;
    collection.projects = collection.projects.filter(project => project.id !== item.id);
  } else {
    collectionIds.value.push(collectionId);
    collection.totalProjects++;
    collection.projects.push({ id: item.id, image: item.image });
  }
};

const isInCollection = collectionId => collectionIds.value.includes(collectionId);
const totalProjectsText = totalProjects =>
  pluralNumber(totalProjects, ['работа cохранена', 'работы сохранено', 'работ сохранено']);
const applyValue = () => {
  const data = {
    user_id: user.value.id,
    project_id: item.id,
    collections: [...collectionIds.value],
  };
  console.log('[BACKEND] Add project to collections:', data);
  emits('close');
};

const create = () => {
  emits('create');
  emits('close');
};
</script>
