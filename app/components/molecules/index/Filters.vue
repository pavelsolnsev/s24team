<template>
  <div class="flex flex-col lg:flex-row gap-10 lg:gap-20">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-20 flex-1">
      <component
        :is="item.type === 1 ? ASelect : AMultiSelect"
        v-for="item in filters"
        :key="item.id"
        class="text-16 lg:text-18 h-60 lg:h-54"
        :options="item.items"
        :placeholder="item.name"
        v-model="item.value"
      />
    </div>

    <AButton class="px-40 h-44 lg:h-54 rounded-30 text-18 lg:text-20" theme="black" @click="reset">
      Сбросить
    </AButton>
  </div>
</template>

<script setup>
import ASelect from '~/components/atoms/ASelect.vue';
import AMultiSelect from '~/components/atoms/AMultiSelect.vue';
import AButton from '~/components/atoms/AButton.vue';

const filters = defineModel({ type: Array, default: () => [] });

const reset = () => {
  filters.value = filters.value.map(i => {
    if (i.default) {
      i.value = i.default;
    } else {
      delete i.value;
    }
    return i;
  });
};
</script>
