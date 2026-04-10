<template>
  <div
    data-atom="tabs"
    class="relative flex flex-col gap-12 text-14 lg:text-20"
    :style="{
      '--radio-trigger-width': position.width + 'px',
      '--radio-trigger-height': position.height + 'px',
      '--radio-trigger-left': position.x + 'px',
    }"
    ref="el"
  >
    <div data-class="fields" class="flex gap-10">
      <template v-for="item in options" :key="item.id">
        <ARadio
          ref="radio"
          :name="name"
          :modelValue="String(modelValue) === String(item.id)"
          :value="item.id"
          :disabled="item.disabled"
          class="items-center justify-center rounded-16 bg-gray-10 px-40 py-10 w-155 lg:w-290 has-disabled:text-gray-10 has-disabled:cursor-default"
          :class="[
            $attrs.groupFieldClass,
            String(modelValue) === String(item.id) && 'bg-gray-80 text-white',
          ]"
          @update:id="update"
        >
          {{ item.name }}
        </ARadio>
      </template>
    </div>

    <div
      class="absolute content-[''] transition-all w-(--radio-trigger-width) h-3 transform-[translateX(var(--radio-trigger-left))] bg-red rounded-tl-3 rounded-tr-3 left-0 bottom-0"
      v-if="trigger"
    />
  </div>
</template>
<script setup>
import ARadio from '~/components/atoms/ARadio.vue';
import { useElementBounding } from '@vueuse/core';

defineProps({
  name: { type: [String, Number], required: true },
  trigger: { type: Boolean, default: false },
  tabClass: { type: String, default: '' },
});

const modelValue = defineModel();
const options = defineModel('options', { type: Array, default: () => [], required: true });

const el = ref(null);
const radio = ref(null);
const { x } = useElementBounding(el);

const position = reactive({
  x: 0,
  width: 0,
  height: 0,
});

const update = v => {
  modelValue.value = v;
};

watchEffect(() => {
  if (radio?.value && radio?.value?.find(i => i.checked)) {
    position.x = radio.value.find(i => i.checked).left - x.value;
    position.width = radio.value.find(i => i.checked).width;
    position.height = radio.value.find(i => i.checked).height;
  }
});
</script>
