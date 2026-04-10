<template>
  <div class="flex flex-col lg:h-full">
    <Avatar
      :avatar="profile.avatar || null"
      class="size-80 min-w-80 lg:size-136 lg:min-w-136 border-4 lg:border-6 border-white"
    />

    <div class="mt-20 lg:mt-53 flex flex-col flex-1 justify-between">
      <h1
        class="text-24 leading-[1.2] lg:leading-[1.3] -tracking-[0.01em] font-medium whitespace-normal"
      >
        <span>
          <span class="break-words">{{ profile.fullName }}</span>
          <IconStar
            v-if="isExpert"
            class="size-21 text-purple inline-block align-text-bottom -translate-y-3 ml-10"
          />
        </span>
      </h1>

      <div
        class="mt-10 lg:mt-0 flex flex-col gap-5 text-16 leading-[1.25] -tracking-[0.01em] font-light text-gray-10"
      >
        <div>ID: {{ profile.id }}</div>
        <div>@{{ profile.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Avatar from '~/components/molecules/layout/Avatar.vue';
import IconStar from '~/svg/profile/star.svg';

const { profile } = defineProps({
  profile: {
    type: Object,
    required: true,
  },
});

const isExpert = computed(() => {
  return profile?.role === 'expert';
});
</script>
