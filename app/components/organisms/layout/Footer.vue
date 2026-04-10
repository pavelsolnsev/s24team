<template>
  <footer
    class="flex flex-col gap-40 lg:flex-row justify-between bg-primary px-20 py-24 lg:px-40 lg:py-26 rounded-t-24 text-white"
  >
    <div class="flex flex-col gap-20 lg:min-w-300">
      <NuxtLink class="flex items-start h-full" :to="{ name: 'index' }" prefetch-on="interaction">
        <IconLogo class="h-30 w-auto" />
      </NuxtLink>
    </div>

    <div
      class="grid grid-cols-1 lg:grid-flow-col lg:grid-rows-2 justify-items-start lg:gap-x-134 gap-y-10"
    >
      <template v-for="item in list" :key="item.id">
        <NuxtLink
          class="flex-inline w-full lg:w-auto justify-start"
          prefetch-on="interaction"
          :to="item.route"
          v-if="!item.hidden"
        >
          <ACornerBox
            class="py-10"
            :active="isMounted && route.fullPath === router.resolve(item.route).fullPath"
          >
            {{ item.name }}
          </ACornerBox>
        </NuxtLink>
      </template>
    </div>

    <div class="flex flex-col lg:items-end gap-20">
      <div class="flex flex-col lg:flex-row gap-10 lg:gap-20">
        <!-- <AButton theme="purple" class="px-32 h-44 rounded-30">Стать ПРО</AButton> -->
        <AddButton theme="darkgray" icon="square" />
      </div>
      <div class="flex gap-58 text-gray-40 text-12 lg:text-18 font-light">
        <NuxtLink
          to="https://example.com/privacy-demo"
          external
          rel="nofollow noopener"
          class="hover:text-white transition"
        >
          Политика конфиденциальности (пример)
        </NuxtLink>
        <div>© Демо портфолио <NuxtTime :datetime="Date.now()" year="numeric" /></div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import IconLogo from '~/svg/_common/brand-logo.svg';
import ACornerBox from '~/components/atoms/ACornerBox.vue';
import AButton from '~/components/atoms/AButton.vue';
import AddButton from '~/components/molecules/layout/AddButton.vue';
import { useAuthStore } from '~/store/auth.js';

const route = useRoute();
const router = useRouter();
const { isAuth } = storeToRefs(useAuthStore());

const list = computed(() => [
  { id: 1, name: 'О демо', route: { name: 'about' } },
  { id: 2, name: 'Контакты', route: { name: 'index' } },
  { id: 3, name: 'FAQ', route: { name: 'articles' } },
  { id: 4, name: 'Поддержка', route: { name: 'articles' } },
  {
    id: 5,
    name: 'Зарегистрироваться',
    route: { name: 'registration' },
    hidden: isAuth.value,
  },
]);

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
</script>
