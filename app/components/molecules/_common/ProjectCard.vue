<template>
  <NuxtLink
    v-if="item"
    :to="{ name: 'project', params: { nickname: item.authors[0].name, id: item.id } }"
    class="flex! flex-col gap-10 lg:gap-16 group rounded-t-16 lg:rounded-t-24 overflow-hidden"
  >
    <div class="w-full rounded-16 lg:rounded-24 overflow-hidden relative">
      <div
        class="absolute inset-0 z-1 opacity-0 group-hover:opacity-100 group-has-[[data-ignore]:hover]:opacity-0 transition"
      >
        <div class="absolute inset-0 bg-black/20" />

        <AButton
          class="absolute inset-0 m-auto size-fit h-44 rounded-30 px-32 gap-10"
          theme="black"
        >
          Смотреть
          <IconArrow class="size-16" />
        </AButton>

        <div
          v-if="false"
          class="text-white flex items-center gap-4 text-16 font-300 absolute bottom-16 lg:top-16 lg:bottom-auto right-16"
        >
          <IconEye class="size-24" />
          {{ item.watched }}
        </div>
      </div>

      <div class="absolute top-16 left-16 flex gap-12">
        <div
          class="rounded-8 text-white bg-black/30 px-16 py-4 text-12 font-light whitespace-nowrap"
          v-for="category in item.categories?.slice(0, 3)"
          :key="category"
        >
          {{ category }}
        </div>
      </div>

      <NuxtImg
        class="w-full object-cover object-center"
        :class="imgClass"
        :src="item.image"
        alt=""
        loading="lazy"
      />
    </div>

    <div class="flex flex-col gap-8 flex-1 justify-between">
      <h3 class="font-medium text-20 line-clamp-2">{{ item.name }}</h3>
      <div
        class="flex items-center justify-between w-full gap-20 cursor-default"
        data-ignore
        @click.prevent
      >
        <div
          class="flex gap-8 lg:gap-12 items-center group/1 cursor-pointer"
          v-if="item.authors?.length === 1"
          @click.prevent="
            router.push({ name: 'profile-id', params: { nickname: item.authors[0].name } })
          "
        >
          <Avatar
            class="size-24 min-w-24 lg:size-33 lg:min-w-33"
            :avatar="item.authors[0].avatar"
          />
          <div class="text-16 font-light text-gray-60 group-hover/1:text-gray-80">
            {{ item.authors[0].name }}
          </div>
        </div>
        <AuthorsGroup :authors="item.authors" v-if="item.authors?.length > 1" />

        <div class="flex items-center ml-auto gap-10 text-gray-40">
          <IconFavorites
            v-if="isAuth"
            class="size-24 cursor-pointer"
            :class="
              item.collections?.length ? 'text-purple hover:text-purple/80' : 'hover:text-gray-60'
            "
            @click.prevent="handleAddToCollection(item)"
          />
          <div
            class="flex items-center gap-4 text-16 font-300"
            :class="isAuth ? 'cursor-pointer' : 'cursor-default'"
            @click.prevent="isAuth && handleLike(item)"
          >
            <IconHeart
              class="size-24 transition-colors"
              :class="isAuth ? 'hover:text-gray-60' : ''"
            />
            {{ item.likes }}
          </div>
        </div>
      </div>
    </div>

    <teleport to="body">
      <AModal v-model="modalAdd">
        <AddCollection :item="item" @close="modalAdd = false" @create="modalCreate = true" />
      </AModal>
      <AModal v-model="modalCreate">
        <CreateCollection @close="modalCreate = false" @create="afterCreateCollection" />
      </AModal>
    </teleport>
  </NuxtLink>
</template>

<script setup>
import IconFavorites from '~/svg/_common/favorites.svg';
import IconHeart from '~/svg/_common/heart.svg';
import IconArrow from '~/svg/_common/arrow-right-16.svg';
import IconEye from '~/svg/_common/eye.svg';
import Avatar from '~/components/molecules/layout/Avatar.vue';
import AButton from '~/components/atoms/AButton.vue';
import AModal from '~/components/atoms/AModal.vue';
import AuthorsGroup from '~/components/molecules/_common/AuthorsGroup.vue';
import AddCollection from '~/components/organisms/_common/AddCollection.vue';
import CreateCollection from '~/components/organisms/_common/CreateCollection.vue';
import { useAuthStore } from '~/store/auth';

const emits = defineEmits(['remove-collection']);
const { user, isAuth } = storeToRefs(useAuthStore());

const { item, collectionId, imgClass } = defineProps({
  item: { type: Object, required: true },
  collectionId: { type: [String, Number], default: undefined },
  imgClass: { type: String, default: '' },
});

const modalAdd = ref(false);
const modalCreate = ref(false);
const router = useRouter();

function handleAddToCollection(item) {
  if (collectionId && item.collections?.includes(collectionId)) {
    const data = {
      user_id: user.value?.id || '',
      project_id: item.id,
      collections: item.collections.filter(id => id !== collectionId),
    };
    // TODO: удалить после интеграции с бэкендом
    console.log('[BACKEND] Remove project from collection', data);
    emits('remove-collection', { project_id: item.id, collection_id: collectionId });
    return;
  }
  modalAdd.value = true;
}

function afterCreateCollection() {
  modalCreate.value = false;
  modalAdd.value = true;
}

function handleLike(item) {
  // TODO: интеграция с бэкендом
  console.log('[BACKEND] Like project', { user_id: user.value?.id, project_id: item.id });
}
</script>
