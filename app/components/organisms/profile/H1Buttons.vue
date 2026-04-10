<template>
  <div
    v-if="profile"
    class="hidden lg:flex flex-nowrap gap-20 justify-between items-center pt-40 pb-20"
  >
    <h1 class="text-48 leading-[1.1] -tracking-[0.01em] font-medium">Мой профиль</h1>
    <div class="flex flex-nowrap gap-10">
      <AButtonShare
        :url="{ name: 'profile-id', params: { nickname: profile?.name } }"
        class="h-44 px-32"
      />
      <AButton theme="gray" class="rounded-30 h-44 px-32">
        <NuxtLink
          class="text-18 leading-[1.3] -tracking-[0.01em] flex items-center gap-10"
          :to="{ name: 'settings' }"
        >
          <span>Редактировать профиль</span>
          <IconPencil class="size-16 shrink-0" />
        </NuxtLink>
      </AButton>
    </div>
  </div>
</template>

<script setup>
import AButtonShare from '~/components/atoms/AButtonShare.vue';
import AButton from '~/components/atoms/AButton.vue';
import IconPencil from '~/svg/_common/pencil.svg';

const props = defineProps({
  profile: {
    type: [Object, null],
    default: null,
  },
});
</script>
