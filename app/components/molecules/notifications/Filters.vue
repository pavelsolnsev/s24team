<template>
  <div class="flex flex-col lg:flex-row lg:flex-nowrap lg:items-center lg:justify-between gap-20">
    <ASelect
      v-for="item in filters"
      :key="item.id"
      v-model="item.value"
      class="text-18 h-56 w-full lg:w-533"
      :options="item.items"
      :placeholder="item.name"
      @update:model-value="onFilter(item)"
    />

    <AButton
      class="px-40 h-56 lg:h-44 rounded-30 text-18 lg:text-20 w-full lg:w-auto lg:shrink-0"
      theme="gray"
      @click="onReadAll"
    >
      Прочитать все
    </AButton>
  </div>
</template>

<script setup>
import ASelect from '~/components/atoms/ASelect.vue';
import AButton from '~/components/atoms/AButton.vue';
import { useAuthStore } from '~/store/auth';
const { user } = storeToRefs(useAuthStore());

const filters = defineModel({ type: Array, default: () => [] });

const onReadAll = () => {
  // TODO: интеграция с бэкендом
  console.log('[BACKEND] Read all notifications for user', user.value?.id);
};

const onFilter = item => {
  // TODO: интеграция с бэкендом
  console.log(
    '[BACKEND] Filter notifications for user',
    user.value?.id,
    'with filter:',
    item.value,
  );
};
</script>
