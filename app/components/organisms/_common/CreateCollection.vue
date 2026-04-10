<template>
  <section
    class="flex flex-col gap-20 w-full bg-gray-10 p-20 max-w-[calc(100dvw-40px)] lg:min-w-695 rounded-20 text-16 lg:text-18"
  >
    <div class="flex flex-col gap-10">
      <div class="flex items-center gap-30 justify-between">
        <h3 class="font-medium text-24 leading-[1.1] lg:leading-[1.3] -tracking-[0.01em]">
          Создать подборку
        </h3>
        <IconCross class="cursor-pointer size-37.5 text-gray-60" @click="emits('close')" />
      </div>

      <div class="text-gray-60">
        Вы сможете поделиться своей подборкой с другими людьми, скопировав ссылку.
      </div>
    </div>

    <AInput name="title" v-model="title" placeholder="Название подборки" />

    <AButton
      class="text-18 lg:text-20 w-full rounded-30 h-56 lg:h-48"
      theme="black"
      :disabled="!title"
      @click="applyValue"
    >
      Создать
    </AButton>
  </section>
</template>

<script setup>
import IconCross from '~/svg/_common/cross.svg';
import AButton from '~/components/atoms/AButton.vue';
import AInput from '~/components/atoms/AInput.vue';

const title = ref('');
const emits = defineEmits(['close', 'create']);

const applyValue = () => {
  console.log('[BACKEND] Create collection', title.value);
  emits('create');
};
</script>
