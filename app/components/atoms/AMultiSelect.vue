<template>
  <div data-atom="multiselect" ref="closeTarget" class="relative">
    <div
      class="flex h-full w-full items-center rounded-16 bg-gray-10 py-16 px-24 cursor-pointer min-w-0"
      :class="[
        error && showError && !$attrs.readonly && 'shadow-border-red',
        $attrs.readonly && 'cursor-default!',
      ]"
      ref="reference"
      @click.stop="toggle"
    >
      <div class="flex flex-col gap-2 flex-1 truncate">
        <div class="text-12 font-normal text-gray-40 truncate" v-if="label">
          {{ label }}
        </div>
        <div class="truncate" :class="[!selectValue?.length && 'text-gray-40']">
          {{ selectName }}
        </div>
      </div>
      <IconArrow
        class="text-gray-40 transition size-24"
        :class="[isOpen && 'rotate-180']"
        v-if="!$attrs.readonly"
      />
    </div>

    <Teleport to="body">
      <div
        ref="floating"
        :style="floatingStyles"
        class="w-full z-5 flex flex-col gap-5"
        v-if="isOpen && !$attrs.readonly && options?.length"
      >
        <OverlayScrollbars
          element="div"
          :options="{
            scrollbars: { autoHide: 'scroll', visibility: 'auto' },
            overflow: { x: 'hidden' },
          }"
          class="overflow-y-auto max-h-268 os-scroll bg-gray-10 shadow-select rounded-20"
        >
          <ACheckbox
            class="px-24 py-13 lg:py-16 w-full cursor-pointer flex justify-between items-center hover:bg-gray-20 transition"
            triggerClass="order-2"
            :class="[templateValue.includes(String(item.id) || String(item)) && 'cursor-default!']"
            :modelValue="templateValue.includes(String(item.id) || String(item))"
            :id="item.id || item"
            trigger="default"
            @update:modelValue="select(item)"
            v-for="item in options"
            :key="item.id || item"
          >
            <div>{{ item.item || item.name || item }}</div>
          </ACheckbox>
        </OverlayScrollbars>

        <AButton class="h-44 rounded-30 w-full shadow-btn" theme="black" @click="applyValues">
          Готово
        </AButton>
      </div>
    </Teleport>

    <div class="transition text-red mt-10" v-if="error && showError && !$attrs.readonly">
      {{ error }}
    </div>
  </div>
</template>
<script setup>
import ACheckbox from '~/components/atoms/ACheckbox.vue';
import AButton from '~/components/atoms/AButton.vue';
import IconArrow from '~/svg/_common/arrow-down.svg';
import { onClickOutside, useEventListener } from '@vueuse/core';
import { z } from 'zod';
import { useUtils } from '#imports';
import { useFloating, offset, flip, shift, autoUpdate, size } from '@floating-ui/vue';

const { options, placeholder, validator } = defineProps({
  options: { type: Array, default: () => [], required: true },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  showError: { type: Boolean, default: false },
  validator: { type: Object, default: null },
});

const error = defineModel('error', { default: '' });
const { cloneDeep } = useUtils();

const selectValue = defineModel({ default: () => [] });
const templateValue = ref([]);

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

const emits = defineEmits(['active']);

const attrs = useAttrs();

const toggle = () => {
  if (!options?.length) return;
  isOpen.value = !isOpen.value;
};

const select = item => {
  if (attrs.readonly) return;
  const id = item.id || item;
  if (templateValue.value.includes(id)) {
    templateValue.value = templateValue.value.filter(i => i !== id);
  } else {
    templateValue.value.push(id);
  }
};

const applyValues = () => {
  const valueToEmit = cloneDeep(templateValue.value);
  selectValue.value = valueToEmit;
  isOpen.value = false;
  emits(
    'active',
    options?.filter(i => selectValue.value.includes(i.id)),
  );
};

const validate = newVal => {
  const val = newVal !== undefined ? newVal : selectValue.value;
  const isEmpty = !val?.length;

  let schema = z.any().refine(() => !attrs.required || !isEmpty, {
    message: 'Обязательное поле',
  });

  if (validator) {
    schema = schema.and(validator);
  }

  const result = schema.safeParse(val);

  if (!result.success) {
    return (error.value = result.error?.issues?.[0]?.message || 'Ошибка');
  }
  return (error.value = '');
};

const selectName = computed(() =>
  selectValue.value?.length
    ? options
        ?.filter(i => selectValue.value.includes(i.id))
        .map(i => i.item || i.name || i)
        .join(', ')
    : placeholder,
);

watch(
  selectValue,
  newVal => {
    templateValue.value = cloneDeep(selectValue.value);
    if (error.value) validate(newVal);
  },
  { immediate: true },
);

defineExpose({
  validate,
});

onUnmounted(() => {
  if (error.value) error.value = '';
});
</script>
