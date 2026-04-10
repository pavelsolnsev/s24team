<template>
  <div
    class="flex flex-col relative group/2 cursor-pointer"
    ref="closeTarget"
    v-if="authors?.length"
  >
    <div
      class="flex gap-8 lg:gap-12 items-center"
      @click.prevent="isOpen = !isOpen"
      ref="reference"
    >
      <div class="flex">
        <Avatar
          v-for="item in authors.slice(0, 3)"
          :key="item.id"
          class="size-24 min-w-24 lg:size-33 lg:min-w-33 not-first:-ml-12 lg:not-first:-ml-16"
          :avatar="item.avatar"
        />
      </div>

      <div class="text-16 font-light text-gray-60 group-hover/2:text-gray-80 whitespace-nowrap">
        Группа авторов
      </div>

      <IconArrow class="text-gray-60 size-24 transition" :class="[isOpen && 'rotate-180']" />
    </div>

    <Teleport to="body">
      <div
        ref="floating"
        :style="floatingStyles"
        class="bg-gray-10 rounded-16 shadow-select w-full z-2 overflow-hidden"
        v-if="isOpen"
      >
        <OverlayScrollbars
          element="div"
          :options="{
            scrollbars: { autoHide: 'scroll', visibility: 'auto' },
            overflow: { x: 'hidden' },
          }"
          class="overflow-y-auto max-h-224 lg:max-h-325 os-scroll"
        >
          <div
            class="px-10 lg:px-14 py-16 cursor-pointer flex items-center gap-12 hover:bg-gray-20 transition"
            @click.prevent="router.push({ name: 'profile-id', params: { nickname: item.name } })"
            v-for="item in authors"
            :key="item.id"
          >
            <Avatar class="size-24 min-w-24 lg:size-33 lg:min-w-33" :avatar="item.avatar" />
            <div class="text-14 font-light text-gray-60 truncate">
              {{ item.name }}
            </div>
          </div>
        </OverlayScrollbars>
      </div>
    </Teleport>
  </div>
</template>
<script setup>
import IconArrow from '~/svg/_common/arrow-down.svg';
import Avatar from '~/components/molecules/layout/Avatar.vue';
import { onClickOutside, useEventListener } from '@vueuse/core';
import { useFloating, offset, flip, shift, autoUpdate, size } from '@floating-ui/vue';

defineProps({
  authors: { type: Array, required: true },
});

const router = useRouter();
const closeTarget = ref(null);
const isOpen = ref(false);
const reference = ref(null);
const floating = ref(null);

const close = () => {
  isOpen.value = false;
};
onClickOutside(closeTarget, close, { ignore: [floating] });
useEventListener(window, 'resize', close);
useEventListener(window, 'orientationchange', close);

const { floatingStyles } = useFloating(reference, floating, {
  placement: 'bottom-start',
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(5),
    flip(),
    shift(),
    size({
      apply({ rects, elements }) {
        Object.assign(elements.floating.style, {
          width: `${rects.reference.width}px`,
        });
      },
    }),
  ],
});
</script>
