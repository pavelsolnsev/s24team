<template>
  <section
    class="absolute lg:sticky top-full lg:top-128 left-0 w-full lg:w-445 flex flex-col p-20 lg:p-24 gap-32 shadow-top lg:shadow-none bg-white lg:bg-gray-10 rounded-16"
  >
    <div class="flex flex-col gap-10 lg:gap-16">
      <AButton
        v-for="item in list"
        :key="item.id"
        theme="graypurple"
        class="rounded-16 overflow-hidden"
      >
        <component
          :is="item.route ? NLink : 'div'"
          :to="item.route"
          prefetch-on="interaction"
          :active-class="
            item.activeClass ??
            'bg-purple text-white [&_.lk-nav-icon]:text-white [&_.lk-nav-text]:text-white'
          "
          exact-active-class="bg-purple text-white cursor-default [&_.lk-nav-icon]:text-white [&_.lk-nav-text]:text-white"
          class="flex w-full items-center justify-start gap-20 h-56 px-24 transition hover:bg-purple hover:[&_.lk-nav-icon]:text-white hover:[&_.lk-nav-text]:text-white"
          @click="item.action"
        >
          <component :is="item.icon" class="lk-nav-icon text-purple min-w-35 size-35" />
          <span class="lk-nav-text text-black">{{ item.name }}</span>
        </component>
      </AButton>
    </div>
  </section>
</template>

<script setup>
import Icon1 from '~/svg/layout/profile.svg';
import Icon2 from '~/svg/layout/collections.svg';
import Icon3 from '~/svg/layout/notification.svg';
import Icon4 from '~/svg/layout/settings.svg';
import Icon5 from '~/svg/layout/logout.svg';
import AButton from '~/components/atoms/AButton.vue';
import { useQueryClient } from '@tanstack/vue-query';
import { useAuthStore } from '~/store/auth.js';

const { user } = storeToRefs(useAuthStore());

const router = useRouter();
const NLink = resolveComponent('NuxtLink');

const queryClient = useQueryClient();

const logout = () => {
  user.value = null; // TODO: убрать после интеграции с бэкендом
  queryClient.clear();
  router.push({ name: 'index' });
};

const list = [
  { id: 1, name: 'Мой профиль', route: { name: 'profile' }, activeClass: '', icon: markRaw(Icon1) },
  { id: 2, name: 'Подборки', route: { name: 'collections' }, icon: markRaw(Icon2) },
  { id: 3, name: 'Уведомления', route: { name: 'notifications' }, icon: markRaw(Icon3) },
  { id: 4, name: 'Настройки', route: { name: 'settings' }, icon: markRaw(Icon4) },
  { id: 5, name: 'Выход', action: logout, icon: markRaw(Icon5) },
];
</script>
