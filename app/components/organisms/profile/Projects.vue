<template>
  <section class="py-40 lg:pb-80 flex flex-col gap-20">
    <div class="flex justify-between items-center">
      <h2 class="text-36 lg:text-40 font-medium leading-[1.1] lg:leading-[1.2] -tracking-[0.01em]">
        Работы
      </h2>

      <AButton
        v-if="isMyProfile && tab === 'portfolio' && authStore.can('create_project')"
        theme="black"
        class="h-40 w-55 lg:h-48 lg:w-66 rounded-full"
      >
        <NuxtLink :to="{ name: 'project-add' }">
          <IconPlus class="size-38 text-white" />
        </NuxtLink>
      </AButton>

      <AButton
        v-if="isMyProfile && tab === 'articles' && authStore.can('create_article')"
        theme="black"
        class="h-40 w-55 lg:h-48 lg:w-66 rounded-full"
      >
        <NuxtLink :to="{ name: 'article-add' }">
          <IconPlus class="size-38 text-white" />
        </NuxtLink>
      </AButton>
    </div>

    <ATabs
      v-if="isExpert"
      v-model="tab"
      v-model:options="tabOptions"
      name="profile-content"
      group-field-class="w-[calc(50%-5px)] lg:w-291"
    />

    <div class="overflow-hidden relative grid [&>*]:col-start-1 [&>*]:row-start-1">
      <Transition
        enter-active-class="transition duration-300 ease-in-out"
        leave-active-class="transition duration-300 ease-in-out"
        :enter-from-class="slideLeft ? 'translate-x-full opacity-0' : '-translate-x-full opacity-0'"
        enter-to-class="translate-x-0 opacity-100"
        leave-from-class="translate-x-0 opacity-100"
        :leave-to-class="slideLeft ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'"
      >
        <Portfolio v-if="tab === 'portfolio'" key="portfolio" :is-my-profile="isMyProfile" />
        <Articles v-else key="articles" />
      </Transition>
    </div>
  </section>
</template>

<script setup>
import ATabs from '~/components/atoms/ATabs.vue';
import AButton from '~/components/atoms/AButton.vue';
import Portfolio from './Portfolio.vue';
import Articles from './Articles.vue';
import IconPlus from '~/svg/_common/plus.svg';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();

const props = defineProps({
  role: { type: String, default: 'creator' },
  isMyProfile: { type: Boolean, default: false },
});

const tabOptions = ref([
  { id: 'portfolio', name: 'Портфолио' },
  { id: 'articles', name: 'Статьи' },
]);
const tabOrder = computed(() => tabOptions.value.map(item => item.id));
const tab = ref('portfolio');
const slideLeft = ref(false);

watch(tab, (newVal, oldVal) => {
  slideLeft.value = tabOrder.value.indexOf(newVal) > tabOrder.value.indexOf(oldVal);
});

const isExpert = computed(() => props.role === 'expert');
</script>
