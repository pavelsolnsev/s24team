<template>
  <AButton
    theme="black"
    class="rounded-30 h-56 lg:h-44 px-32 items-center gap-10 cursor-pointer"
    @click="modalCreateCollection = true"
  >
    <span>Создать подборку</span>
    <IconAddSquare class="size-24" />
    <teleport to="body">
      <AModal v-model="modalCreateCollection">
        <CreateCollection
          @close="modalCreateCollection = false"
          @create="modalCreateCollection = false"
        />
      </AModal>
    </teleport>
  </AButton>
</template>

<script setup>
import AButton from '~/components/atoms/AButton.vue';
import IconAddSquare from '~/svg/_common/add-square.svg';
import AModal from '~/components/atoms/AModal.vue';
import CreateCollection from '~/components/organisms/_common/CreateCollection.vue';

const modalCreateCollection = ref(false);
</script>
