<template>
  <header
    class="flex justify-between bg-white px-20 lg:px-40 py-12.5 lg:py-21 rounded-b-24 sticky top-0 shadow-top z-5"
  >
    <div class="flex items-center gap-40">
      <NuxtLink class="flex items-center h-full" :to="{ name: 'index' }" prefetch-on="interaction">
        <IconLogo class="h-30 w-auto text-black" />
      </NuxtLink>

      <!-- Десктоп -->
      <div class="hidden lg:flex gap-10 h-full">
        <NuxtLink :to="item.route" v-for="item in list" :key="item.id" prefetch-on="interaction">
          <ACornerBox :active="isMounted && route.fullPath === router.resolve(item.route).fullPath">
            {{ item.name }}
          </ACornerBox>
        </NuxtLink>
      </div>
    </div>

    <!-- Десктоп -->
    <div class="hidden lg:flex items-center gap-20">
      <NuxtLink
        :to="{ name: 'profile' }"
        prefetch-on="interaction"
        class="flex items-center gap-12 rounded-30 bg-gray-10 h-44 px-20 py-5.5"
        v-if="isAuth"
      >
        <Avatar class="w-full h-full object-cover" :avatar="user.avatar || null" />
        <span class="text-16 text-gray-60" v-if="user?.name">@{{ user.name }}</span>
        <span class="text-16 text-gray-60" v-else-if="user?.email">{{ user.email }}</span>
      </NuxtLink>

      <div class="flex gap-10 h-full" v-if="!isAuth">
        <NuxtLink :to="item.route" v-for="item in list2" :key="item.id" prefetch-on="interaction">
          <ACornerBox :active="isMounted && route.fullPath === router.resolve(item.route).fullPath">
            {{ item.name }}
          </ACornerBox>
        </NuxtLink>
      </div>

      <AddButton />

      <IconLogout class="text-gray-80 size-45 cursor-pointer" v-if="isAuth" @click="logout" />
    </div>

    <!-- Мобилка -->
    <div class="flex lg:hidden gap-10">
      <AButton theme="black" class="h-44 px-20 rounded-68 whitespace-nowrap" v-if="!isAuth"">
        <NuxtLink :to="{ name: 'login' }">
          Войти
        </NuxtLink>
      </AButton>

      <div
        class="flex flex-col items-center justify-center bg-purple rounded-full group p-2.5 cursor-pointer size-45 min-w-45"
        :class="[isOpenLk && 'active']"
        ref="closeTargetLk"
        @click="isOpenLk = !isOpenLk"
        v-else
      >
        <Avatar class="w-full h-full object-cover" :avatar="user.avatar || null" />

        <Transition
          enter-from-class="opacity-0 -translate-y-2"
          enter-active-class="transition duration-300 ease-out"
          enter-to-class="opacity-100 translate-y-0"
          leave-from-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <Lk v-if="isOpenLk" />
        </Transition>
      </div>

      <div
        class="flex flex-col items-center justify-center bg-gray-10 rounded-10 group p-5 cursor-pointer"
        :class="[isOpenBurger && 'active']"
        ref="closeTargetBurger"
        @click="isOpenBurger = !isOpenBurger"
      >
        <IconBurger class="size-35" />
        <Transition
          enter-from-class="opacity-0 -translate-y-2"
          enter-active-class="transition duration-300 ease-out"
          enter-to-class="opacity-100 translate-y-0"
          leave-from-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <Burger :list="burgerList" v-if="isOpenBurger" />
        </Transition>
      </div>
    </div>
  </header>
</template>
<script setup>
import IconLogo from '~/svg/_common/brand-logo.svg';
import IconBurger from '~/svg/layout/burger.svg';
import IconLogout from '~/svg/layout/logout-desktop.svg';
import AButton from '~/components/atoms/AButton.vue';
import ACornerBox from '~/components/atoms/ACornerBox.vue';
import AddButton from '~/components/molecules/layout/AddButton.vue';
import Avatar from '~/components/molecules/layout/Avatar.vue';
import Burger from '~/components/organisms/layout/Burger.vue';
import Lk from '~/components/organisms/layout/Lk.vue';
import { onClickOutside, useEventListener } from '@vueuse/core';
import { useAuthStore } from '~/store/auth.js';
import { useQueryClient } from '@tanstack/vue-query';

const { isAuth, user } = storeToRefs(useAuthStore());
const route = useRoute();
const router = useRouter();

const queryClient = useQueryClient();

const logout = () => {
  user.value = null; // TODO: убрать после интеграции с бэкендом
  queryClient.clear();
  router.push({ name: 'index' });
};

const isOpenBurger = ref(false);
const closeTargetBurger = ref(null);

const isOpenLk = ref(false);
const closeTargetLk = ref(null);

onClickOutside(closeTargetBurger, event => (isOpenBurger.value = false));
onClickOutside(closeTargetLk, event => (isOpenLk.value = false));

const closeAllMenu = () => {
  if (isOpenBurger.value) isOpenBurger.value = false;
  if (isOpenLk.value) isOpenLk.value = false;
};
// useEventListener(window, 'scroll', closeAllMenu, { passive: true });
useEventListener(window, 'resize', closeAllMenu);

const list = ref([
  { id: 1, name: 'Работы', route: { name: 'index', hash: '#gallery' } },
  { id: 2, name: 'О нас', route: { name: 'index' } },
  { id: 3, name: 'Статьи', route: { name: 'articles' } },
]);

const list2 = ref([
  { id: 1, name: 'Зарегистрироваться', route: { name: 'registration' } },
  { id: 2, name: 'Войти', route: { name: 'login' } },
]);

const burgerList = computed(() => {
  const part = isAuth.value ? [] : [list2.value[0]];
  return [...list.value, ...part];
});

const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
</script>
