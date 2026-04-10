<template>
  <div
    class="relative bg-black text-white rounded-16 lg:rounded-24 h-auto lg:h-346 lg:max-h-346 overflow-hidden"
  >
    <div
      class="relative z-1 w-full h-full p-20 lg:p-24 flex flex-col gap-32 justify-between lg:flex-row"
    >
      <UserInfo :profile="profile" />

      <div class="flex flex-col gap-32 w-full lg:max-w-380 lg:justify-between">
        <div class="flex flex-col gap-10 items-start lg:items-end">
          <ATag v-for="tag in profile.directions || []" :key="tag" theme="profile-direction">
            <div>{{ tag }}</div>
            <IconDirection class="size-16" />
          </ATag>
        </div>

        <div class="flex flex-wrap gap-10 lg:justify-end">
          <ATag v-for="tag in profile.categories || []" :key="tag" theme="profile-category">
            {{ tag }}
          </ATag>
        </div>
      </div>

      <div class="flex lg:hidden flex-col gap-10">
        <AButton
          v-if="isMyProfile"
          theme="glass"
          class="rounded-30 px-32 flex items-center gap-10 transition-colors duration-1000 h-56 w-full"
        >
          <NuxtLink :to="{ name: 'settings' }" class="text-18 leading-[1.3] -tracking-[0.01em]">
            Редактировать профиль
          </NuxtLink>
        </AButton>
        <AButtonShare
          theme="glass"
          class="h-56 w-full"
          :url="{ name: 'profile-id', params: { nickname: profile?.name } }"
        />
      </div>
    </div>

    <NuxtImg
      src="/images/profile/tile-main-d.webp"
      class="absolute top-0 left-0 w-full h-full object-cover hidden lg:block"
      loading="lazy"
      alt=""
    />

    <NuxtImg
      src="/images/profile/tile-main-m.webp"
      class="absolute top-0 left-0 w-full h-full object-cover lg:hidden"
      loading="lazy"
      alt=""
    />
  </div>
</template>

<script setup>
import AButtonShare from '~/components/atoms/AButtonShare.vue';
import AButton from '~/components/atoms/AButton.vue';
import UserInfo from '~/components/molecules/profile/UserInfo.vue';
import ATag from '~/components/atoms/ATag.vue';
import IconDirection from '~/svg/profile/direction.svg';

const { profile } = defineProps({
  profile: {
    type: Object,
    required: true,
  },
  isMyProfile: {
    type: Boolean,
    default: false,
  },
});
</script>
