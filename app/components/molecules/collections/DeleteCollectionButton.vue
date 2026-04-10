<template>
  <AButton
    theme="black"
    class="flex rounded-30 h-44 px-32 items-center gap-10 cursor-pointer"
    @click="modalDeleteCollection = true"
  >
    <span>Удалить подборку</span>
    <teleport to="body">
      <AModal v-model="modalDeleteCollection">
        <Confirm
          title="Удалить подборку"
          @ok="deleteCollection"
          @cancel="modalDeleteCollection = false"
        >
          Вы уверены, что хотите удалить подборку "{{ collection.name }}"?
        </Confirm>
      </AModal>
    </teleport>
  </AButton>
</template>
<script setup>
import AButton from '~/components/atoms/AButton.vue';
import AModal from '~/components/atoms/AModal.vue';
import Confirm from '~/components/organisms/_common/Confirm.vue';

const { collection } = defineProps({
  collection: { type: Object, required: true },
});

const modalDeleteCollection = ref(false);

const deleteCollection = () => {
  console.log(`[BACKEND] Delete collection #${collection?.id}: "${collection?.name}"`);
  modalDeleteCollection.value = false;
};
</script>
